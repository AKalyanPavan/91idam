import React, { useState } from 'react';
import { 
  FileJson, 
  Settings, 
  Play, 
  BarChart3, 
  RefreshCw,
  Check,
  ExternalLink,
  Home
} from 'lucide-react';

// Import the page components (you'll need to create these as separate files)
import AuthenticationPage from './AuthenticationPage';
import FileConfigurationPage from './FileConfigurationPage';
import ExtractionProgressPage from './ExtractionProgressPage';
import ResultsPage from './ResultsPage';

const FigmaExtractorLayout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [authToken, setAuthToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [extractionConfig, setExtractionConfig] = useState(null);
  const [extractionResults, setExtractionResults] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);

  // Navigation items
  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: Home,
      description: 'Overview and quick start'
    },
    {
      id: 'auth',
      name: 'Authentication',
      icon: Settings,
      description: 'Setup Figma API token'
    },
    {
      id: 'configure',
      name: 'Configure',
      icon: Play,
      description: 'File settings and options',
      disabled: !isAuthenticated
    },
    {
      id: 'extract',
      name: 'Extract',
      icon: RefreshCw,
      description: 'Run extraction process',
      disabled: !extractionConfig
    },
    {
      id: 'results',
      name: 'Results',
      icon: BarChart3,
      description: 'View and download results',
      disabled: !extractionResults
    }
  ];

  const handleAuthSuccess = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
    // Auto-navigate to configuration if coming from auth
    if (currentPage === 'auth') {
      setCurrentPage('configure');
    }
  };

  const handleConfigComplete = (config) => {
    setExtractionConfig(config);
    setCurrentPage('extract');
  };

  const handleExtractionComplete = (results) => {
    setExtractionResults(results);
    setCurrentPage('results');
  };

  const handleNewExtraction = () => {
    setExtractionConfig(null);
    setExtractionResults(null);
    setCurrentPage('configure');
  };

  const formatTimeRemaining = () => {
    if (!tokenExpiry) return '';
    const diff = tokenExpiry - new Date();
    const minutes = Math.floor(diff / 60000);
    return minutes > 0 ? `${minutes}m remaining` : 'Expired';
  };

  const DashboardPage = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-blue-100 rounded-lg p-3">
            <FileJson className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Figma JSON Extractor</h1>
            <p className="text-gray-600 mt-1">
              Extract and beautify Figma designs for AI-powered React component generation
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2">🎯 Precise Extraction</h3>
            <p className="text-sm text-gray-600">Extract complete design data from Figma files with full fidelity</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-2">🤖 AI-Ready Format</h3>
            <p className="text-sm text-gray-600">Beautified JSON output optimized for AI tools and React generation</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <h3 className="font-semibold text-gray-900 mb-2">⚡ Developer Friendly</h3>
            <p className="text-sm text-gray-600">Individual component downloads and copy-paste ready prompts</p>
          </div>
        </div>
      </div>

      {/* Quick Start Steps */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Start Guide</h2>
        
        <div className="space-y-4">
          <div className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-colors ${
            isAuthenticated ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isAuthenticated ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {isAuthenticated ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Setup Authentication</h3>
              <p className="text-sm text-gray-600">Connect with your Figma API token</p>
            </div>
            <button
              onClick={() => setCurrentPage('auth')}
              className={`px-4 py-2 rounded-lg ${
                isAuthenticated 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isAuthenticated ? 'Connected' : 'Setup'}
            </button>
          </div>

          <div className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-colors ${
            extractionConfig ? 'border-green-200 bg-green-50' : 
            isAuthenticated ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              extractionConfig ? 'bg-green-500 text-white' : 
              isAuthenticated ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {extractionConfig ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Configure Extraction</h3>
              <p className="text-sm text-gray-600">Set file key, name, and extraction options</p>
            </div>
            <button
              onClick={() => setCurrentPage('configure')}
              disabled={!isAuthenticated}
              className={`px-4 py-2 rounded-lg ${
                extractionConfig ? 'bg-green-100 text-green-700' :
                isAuthenticated ? 'bg-blue-600 text-white hover:bg-blue-700' : 
                'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {extractionConfig ? 'Configured' : 'Configure'}
            </button>
          </div>

          <div className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-colors ${
            extractionResults ? 'border-green-200 bg-green-50' : 
            extractionConfig ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              extractionResults ? 'bg-green-500 text-white' : 
              extractionConfig ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {extractionResults ? <Check className="w-4 h-4" /> : '3'}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Run Extraction</h3>
              <p className="text-sm text-gray-600">Process your Figma file and generate JSON</p>
            </div>
            <button
              onClick={() => setCurrentPage('extract')}
              disabled={!extractionConfig}
              className={`px-4 py-2 rounded-lg ${
                extractionResults ? 'bg-green-100 text-green-700' :
                extractionConfig ? 'bg-blue-600 text-white hover:bg-blue-700' : 
                'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {extractionResults ? 'Completed' : 'Extract'}
            </button>
          </div>

          <div className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-colors ${
            extractionResults ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              extractionResults ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              4
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">View Results</h3>
              <p className="text-sm text-gray-600">Download components and generate React code</p>
            </div>
            <button
              onClick={() => setCurrentPage('results')}
              disabled={!extractionResults}
              className={`px-4 py-2 rounded-lg ${
                extractionResults ? 'bg-blue-600 text-white hover:bg-blue-700' : 
                'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              View Results
            </button>
          </div>
        </div>
      </div>

      {/* Current Status */}
      {isAuthenticated && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Authentication</h3>
              <div className="flex items-center space-x-2 text-green-700">
                <Check className="w-4 h-4" />
                <span className="text-sm">Connected • {formatTimeRemaining()}</span>
              </div>
            </div>
            
            {extractionConfig && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Last Configuration</h3>
                <div className="text-sm text-gray-600">
                  <p>Document: {extractionConfig.documentName}</p>
                  <p>Mode: {extractionConfig.extractionMode}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'auth':
        return <AuthenticationPage onAuthSuccess={handleAuthSuccess} />;
      case 'configure':
        return (
          <FileConfigurationPage
            authToken={authToken}
            onConfigComplete={handleConfigComplete}
            initialConfig={extractionConfig}
          />
        );
      case 'extract':
        return (
          <ExtractionProgressPage
            extractionConfig={extractionConfig}
            authToken={authToken}
            onComplete={handleExtractionComplete}
            onCancel={() => setCurrentPage('configure')}
          />
        );
      case 'results':
        return (
          <ResultsPage
            extractionResults={extractionResults}
            onNewExtraction={handleNewExtraction}
          />
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FileJson className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Figma JSON Extractor</h1>
              </div>
              
              {isAuthenticated && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  <Check className="w-4 h-4" />
                  <span>Connected</span>
                  <span className="text-green-600">•</span>
                  <span className="text-green-600">{formatTimeRemaining()}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <button
                  onClick={() => window.open('https://www.figma.com/developers/api#authentication', '_blank')}
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Renew Token</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const isDisabled = item.disabled;
              
              return (
                <button
                  key={item.id}
                  onClick={() => !isDisabled && setCurrentPage(item.id)}
                  disabled={isDisabled}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : isDisabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
};

export default FigmaExtractorLayout;