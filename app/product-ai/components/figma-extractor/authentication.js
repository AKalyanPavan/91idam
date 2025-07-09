import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, ExternalLink, Info, RefreshCw } from 'lucide-react';

const AuthenticationPage = ({ onAuthSuccess }) => {
  const [authToken, setAuthToken] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [error, setError] = useState('');

  // Load saved token on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem('figma_auth_token');
    const savedExpiry = localStorage.getItem('figma_token_expiry');
    
    if (savedToken && savedExpiry) {
      const expiryTime = new Date(savedExpiry);
      if (expiryTime > new Date()) {
        setAuthToken(savedToken);
        setTokenExpiry(expiryTime);
        setIsTokenValid(true);
        if (onAuthSuccess) {
          onAuthSuccess(savedToken);
        }
      } else {
        localStorage.removeItem('figma_auth_token');
        localStorage.removeItem('figma_token_expiry');
      }
    }
  }, [onAuthSuccess]);

  // Check token expiry every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (tokenExpiry && new Date() >= tokenExpiry) {
        setIsTokenValid(false);
        localStorage.removeItem('figma_auth_token');
        localStorage.removeItem('figma_token_expiry');
        setError('Token expired. Please authenticate again.');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [tokenExpiry]);

  const handleTokenSubmit = async () => {
    if (!authToken.trim()) return;
    
    setIsValidating(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/validate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: authToken })
      });
      
      if (response.ok) {
        const result = await response.json();
        setIsTokenValid(true);
        const expiry = new Date(Date.now() + result.expires_in * 1000);
        setTokenExpiry(expiry);
        localStorage.setItem('figma_auth_token', authToken);
        localStorage.setItem('figma_token_expiry', expiry.toISOString());
        
        if (onAuthSuccess) {
          onAuthSuccess(authToken);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid token');
      }
    } catch (error) {
      console.error('Token validation error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const formatTimeRemaining = () => {
    if (!tokenExpiry) return '';
    const diff = tokenExpiry - new Date();
    const minutes = Math.floor(diff / 60000);
    return minutes > 0 ? `${minutes}m remaining` : 'Expired';
  };

  const clearToken = () => {
    setAuthToken('');
    setIsTokenValid(false);
    setTokenExpiry(null);
    localStorage.removeItem('figma_auth_token');
    localStorage.removeItem('figma_token_expiry');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Figma API Authentication</h2>
          {isTokenValid && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
              <Check className="w-4 h-4" />
              <span>Connected</span>
              <span className="text-green-600">•</span>
              <span className="text-green-600">{formatTimeRemaining()}</span>
            </div>
          )}
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Figma API Token
            </label>
            <div className="flex space-x-3">
              <input
                type="password"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                placeholder="Paste your Figma API token here..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isValidating}
              />
              <button
                onClick={handleTokenSubmit}
                disabled={!authToken.trim() || isValidating}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isValidating && <RefreshCw className="w-4 h-4 animate-spin" />}
                <span>{isValidating ? 'Validating...' : 'Validate'}</span>
              </button>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800 mb-2">
                  How to get your API token:
                </p>
                <ol className="text-sm text-blue-700 space-y-1 mb-3">
                  <li>1. Go to Figma and log in to your account</li>
                  <li>2. Navigate to Account Settings → Personal Access Tokens</li>
                  <li>3. Click "Create new token" and give it a descriptive name</li>
                  <li>4. Copy the generated token and paste it above</li>
                  <li>5. Token expires after 1 hour for security</li>
                </ol>
                <a
                  href="https://www.figma.com/developers/api#authentication"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                >
                  <span>Open Figma Developer Settings</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Success State */}
          {isTokenValid && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Token is valid and active</p>
                    <p className="text-sm text-green-700">
                      Token expires in {formatTimeRemaining()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearToken}
                  className="text-sm text-green-700 hover:text-green-900 underline"
                >
                  Use Different Token
                </button>
              </div>
            </div>
          )}

          {/* Token Renewal */}
          {isTokenValid && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Token Renewal</p>
                  <p className="text-sm text-yellow-700 mb-2">
                    Your token will expire automatically after 1 hour. You'll need to generate a new one.
                  </p>
                  <a
                    href="https://www.figma.com/developers/api#authentication"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-yellow-700 hover:text-yellow-900 text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Generate New Token</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;