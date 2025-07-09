import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Clock, 
  FileText,
  Download,
  Image,
  Layers
} from 'lucide-react';

const ExtractionProgressPage = ({ 
  extractionConfig, 
  authToken, 
  onComplete, 
  onCancel 
}) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [extractionStatus, setExtractionStatus] = useState('idle'); // idle, running, completed, error
  const [error, setError] = useState('');
  const [extractionResults, setExtractionResults] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(null);

  // Progress polling effect
  useEffect(() => {
    let interval;
    if (isExtracting) {
      interval = setInterval(async () => {
        try {
          const response = await fetch('http://localhost:5000/api/extraction-status');
          if (response.ok) {
            const status = await response.json();
            setProgress(status.progress || 0);
            setCurrentStep(status.step || '');
            
            // Calculate estimated time remaining
            if (startTime && status.progress > 0) {
              const elapsed = Date.now() - startTime;
              const estimated = (elapsed / status.progress) * (100 - status.progress);
              setEstimatedTimeRemaining(Math.ceil(estimated / 1000));
            }
            
            if (status.status === 'completed') {
              setIsExtracting(false);
              setExtractionStatus('completed');
              setExtractionResults(status.results);
              if (onComplete) {
                onComplete(status.results);
              }
              clearInterval(interval);
            } else if (status.status === 'error') {
              setIsExtracting(false);
              setExtractionStatus('error');
              setError(status.error || 'Unknown error occurred');
              clearInterval(interval);
            }
          }
        } catch (err) {
          console.error('Error polling extraction status:', err);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isExtracting, startTime, onComplete]);

  const startExtraction = async () => {
    setIsExtracting(true);
    setExtractionStatus('running');
    setProgress(0);
    setCurrentStep('Starting extraction...');
    setError('');
    setExtractionResults(null);
    setStartTime(Date.now());
    
    try {
      const response = await fetch('http://localhost:5000/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: authToken,
          fileKey: extractionConfig.fileKey,
          documentName: extractionConfig.documentName,
          extractionMode: extractionConfig.extractionMode,
          includeImages: extractionConfig.includeImages,
          selectedNodes: extractionConfig.selectedNodes || []
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start extraction');
      }
      
      // Extraction status will be polled by useEffect
    } catch (error) {
      console.error('Extraction error:', error);
      setError(error.message);
      setIsExtracting(false);
      setExtractionStatus('error');
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const formatElapsedTime = () => {
    if (!startTime) return '';
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return formatTime(elapsed);
  };

  const downloadJSON = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const ProgressStep = ({ step, isActive, isCompleted, description }) => (
    <div className="flex items-center space-x-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isCompleted ? 'bg-green-500 text-white' : 
        isActive ? 'bg-blue-500 text-white' : 
        'bg-gray-200 text-gray-500'
      }`}>
        {isCompleted ? (
          <CheckCircle className="w-4 h-4" />
        ) : isActive ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <span className="text-sm font-medium">{step}</span>
        )}
      </div>
      <div className={`${isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-500'}`}>
        <p className="font-medium">{description}</p>
      </div>
    </div>
  );

  const getProgressSteps = () => {
    const steps = [
      { id: 1, description: 'Validating API token' },
      { id: 2, description: 'Fetching file data' },
      { id: 3, description: 'Processing components' },
      { id: 4, description: extractionConfig.includeImages ? 'Downloading images' : 'Organizing structure' },
      { id: 5, description: 'Finalizing JSON output' }
    ];

    const currentStepIndex = Math.floor((progress / 100) * steps.length);
    
    return steps.map((step, index) => ({
      ...step,
      isActive: index === currentStepIndex && isExtracting,
      isCompleted: index < currentStepIndex || extractionStatus === 'completed'
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Extraction Progress</h2>
            <p className="text-gray-600 mt-1">
              Extracting: <span className="font-medium">{extractionConfig.documentName}</span>
            </p>
          </div>
          
          {extractionStatus === 'idle' && (
            <button
              onClick={startExtraction}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Play className="w-5 h-5" />
              <span>Start Extraction</span>
            </button>
          )}
          
          {(extractionStatus === 'completed' || extractionStatus === 'error') && onCancel && (
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Back to Configuration
            </button>
          )}
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Extraction Configuration</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-800 font-medium">Mode</p>
            <p className="text-lg font-bold text-blue-900 capitalize">{extractionConfig.extractionMode}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-sm text-green-800 font-medium">Images</p>
            <p className="text-lg font-bold text-green-900">{extractionConfig.includeImages ? 'Included' : 'Excluded'}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-sm text-purple-800 font-medium">File Key</p>
            <p className="text-sm font-bold text-purple-900 truncate">{extractionConfig.fileKey}</p>
          </div>
          {extractionConfig.extractionMode === 'selective' && (
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-sm text-orange-800 font-medium">Selected Items</p>
              <p className="text-lg font-bold text-orange-900">{extractionConfig.selectedNodes?.length || 0}</p>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-red-800 font-medium">Extraction Failed</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Section */}
      {(isExtracting || extractionStatus === 'completed') && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Extraction Progress</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {startTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Elapsed: {formatElapsedTime()}</span>
                </div>
              )}
              {estimatedTimeRemaining && isExtracting && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Est. remaining: {formatTime(estimatedTimeRemaining)}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{currentStep}</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  extractionStatus === 'completed' ? 'bg-green-500' : 
                  extractionStatus === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step Progress */}
          <div className="space-y-4">
            {getProgressSteps().map((step) => (
              <ProgressStep 
                key={step.id}
                step={step.id}
                description={step.description}
                isActive={step.isActive}
                isCompleted={step.isCompleted}
              />
            ))}
          </div>
        </div>
      )}

      {/* Success/Results Section */}
      {extractionStatus === 'completed' && extractionResults && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">Extraction Completed!</h3>
            </div>
            <button
              onClick={() => downloadJSON(extractionResults, `${extractionResults.name.replace(/\s+/g, '_')}_${extractionResults.extractionMode}_${new Date().toISOString().split('T')[0]}.json`)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              <span>Download JSON</span>
            </button>
          </div>
          
          {/* Results Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-800">Components</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {extractionResults.components?.length || 0}
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Image className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-800">Images</span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {extractionResults.imageCount || 0}
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-800">File Size</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {extractionResults.fileSize}
              </p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-orange-800">Duration</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">
                {formatElapsedTime()}
              </p>
            </div>
          </div>
          
          {/* File Location */}
          {extractionResults.savedFilePath && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">File saved to:</p>
              <p className="text-sm font-mono text-gray-800 break-all">
                {extractionResults.savedFilePath}
              </p>
            </div>
          )}
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              ✅ <strong>Next step:</strong> Go to the Results page to view and download individual components for AI processing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtractionProgressPage;