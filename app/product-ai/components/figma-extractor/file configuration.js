import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  AlertCircle, 
  FileText, 
  Folder, 
  Frame, 
  CheckSquare,
  Info,
  Eye
} from 'lucide-react';

const FileConfigurationPage = ({ 
  authToken, 
  onConfigComplete,
  initialConfig = {}
}) => {
  const [documentName, setDocumentName] = useState(initialConfig.documentName || '');
  const [fileKey, setFileKey] = useState(initialConfig.fileKey || '');
  const [extractionMode, setExtractionMode] = useState(initialConfig.extractionMode || 'full');
  const [includeImages, setIncludeImages] = useState(initialConfig.includeImages !== undefined ? initialConfig.includeImages : true);
  const [selectedNodes, setSelectedNodes] = useState(initialConfig.selectedNodes || []);
  
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [fileStructure, setFileStructure] = useState(null);
  const [error, setError] = useState('');
  const [fileInfo, setFileInfo] = useState(null);

  const handleFileStructureLoad = async () => {
    if (!fileKey.trim()) {
      setError('Please enter a file key first');
      return;
    }
    
    setIsLoadingPreview(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/list-pages-frames', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token: authToken, 
          fileKey: fileKey 
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        setFileStructure(result.structure);
        
        // Extract file info from structure
        const docNode = result.structure.find(item => item.type === 'DOCUMENT');
        if (docNode) {
          setFileInfo({
            name: docNode.name,
            totalItems: result.structure.length,
            pages: result.structure.filter(item => item.type === 'CANVAS').length,
            frames: result.structure.filter(item => item.type === 'FRAME').length
          });
          
          // Auto-fill document name if empty
          if (!documentName && docNode.name !== 'Document Root') {
            setDocumentName(docNode.name);
          }
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to load file structure');
      }
    } catch (error) {
      console.error('File structure loading error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleNodeSelection = (nodeId) => {
    setSelectedNodes(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(id => id !== nodeId);
      } else {
        return [...prev, nodeId];
      }
    });
  };

  const handleSelectAll = () => {
    if (!fileStructure) return;
    
    // Select all selectable items (exclude document root)
    const selectableNodes = fileStructure
      .filter(item => item.type !== 'DOCUMENT')
      .map(item => item.id);
    
    setSelectedNodes(selectableNodes);
  };

  const handleClearSelection = () => {
    setSelectedNodes([]);
  };

  const isConfigValid = () => {
    if (!documentName.trim() || !fileKey.trim()) return false;
    if (extractionMode === 'selective' && selectedNodes.length === 0) return false;
    return true;
  };

  const handleProceed = () => {
    if (!isConfigValid()) return;
    
    const config = {
      documentName: documentName.trim(),
      fileKey: fileKey.trim(),
      extractionMode,
      includeImages,
      selectedNodes,
      fileInfo
    };
    
    if (onConfigComplete) {
      onConfigComplete(config);
    }
  };

  const extractFileKeyFromUrl = (url) => {
    const match = url.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const handleFileUrlPaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    const extractedKey = extractFileKeyFromUrl(pastedText);
    
    if (extractedKey) {
      setFileKey(extractedKey);
      setError('');
    } else if (pastedText.includes('figma.com')) {
      setError('Invalid Figma URL format. Please check the URL and try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
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

      {/* Step 1: Basic Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 1: Basic Configuration</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Name *
            </label>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="e.g., Design System Components"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              This will be used for the output JSON filename
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Figma File Key *
            </label>
            <div className="space-y-3">
              <input
                type="text"
                value={fileKey}
                onChange={(e) => setFileKey(e.target.value)}
                onPaste={handleFileUrlPaste}
                placeholder="Paste file key or full Figma URL..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleFileStructureLoad}
                disabled={!fileKey.trim() || isLoadingPreview}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingPreview ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>{isLoadingPreview ? 'Loading...' : 'Load File Structure'}</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-800 mb-1">How to get your file key:</p>
              <p className="text-sm text-yellow-700">
                You can paste either the file key or the complete Figma URL. For example:
              </p>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• <strong>Full URL:</strong> https://www.figma.com/file/<span className="bg-yellow-100 px-1">abc123def456</span>/My-Design</li>
                <li>• <strong>Just the key:</strong> abc123def456</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* File Information */}
      {fileInfo && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">File Information</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-800 font-medium">File Name</p>
              <p className="text-lg font-bold text-blue-900">{fileInfo.name}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-800 font-medium">Total Items</p>
              <p className="text-lg font-bold text-green-900">{fileInfo.totalItems}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-sm text-purple-800 font-medium">Pages</p>
              <p className="text-lg font-bold text-purple-900">{fileInfo.pages}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-sm text-orange-800 font-medium">Frames</p>
              <p className="text-lg font-bold text-orange-900">{fileInfo.frames}</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Extraction Options */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 2: Extraction Options</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Extraction Mode
            </label>
            <div className="space-y-3">
              <label className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="extractionMode"
                  value="full"
                  checked={extractionMode === 'full'}
                  onChange={(e) => setExtractionMode(e.target.value)}
                  className="text-blue-600 mt-1"
                />
                <div>
                  <span className="font-medium">Extract entire file</span>
                  <p className="text-sm text-gray-600">
                    Extract all pages, frames, and components from the file
                  </p>
                </div>
              </label>
              
              <label className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="extractionMode"
                  value="selective"
                  checked={extractionMode === 'selective'}
                  onChange={(e) => setExtractionMode(e.target.value)}
                  className="text-blue-600 mt-1"
                />
                <div>
                  <span className="font-medium">Extract specific components</span>
                  <p className="text-sm text-gray-600">
                    Choose specific pages and frames to extract (requires file structure to be loaded)
                  </p>
                </div>
              </label>
            </div>
          </div>
          
          <div>
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={includeImages}
                onChange={(e) => setIncludeImages(e.target.checked)}
                className="text-blue-600 mt-1"
              />
              <div>
                <span className="font-medium">Download images</span>
                <p className="text-sm text-gray-600">
                  Include all images referenced in the design files (will increase processing time)
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Step 3: Component Selection (Selective Mode) */}
      {extractionMode === 'selective' && fileStructure && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Step 3: Select Components</h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSelectAll}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Select All
              </button>
              <button
                onClick={handleClearSelection}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear Selection
              </button>
            </div>
          </div>
          
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Click on the items below to select them for extraction. Selected items will be highlighted in blue.
            </p>
          </div>
          
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {fileStructure.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedNodes.includes(item.id) ? 'bg-blue-50 border-blue-300' : 'bg-white'
                } ${
                  item.type === 'DOCUMENT' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => item.type !== 'DOCUMENT' && handleNodeSelection(item.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {item.type !== 'DOCUMENT' && (
                      selectedNodes.includes(item.id) ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                      )
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.type === 'DOCUMENT' && <FileText className="w-4 h-4 text-gray-600" />}
                    {item.type === 'CANVAS' && <Folder className="w-4 h-4 text-blue-500" />}
                    {item.type === 'FRAME' && <Frame className="w-4 h-4 text-green-500" />}
                    <span className="text-sm">{item.name}</span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {item.type}
                    </span>
                  </div>
                </div>
                
                <span className="text-xs text-gray-500">ID: {item.id}</span>
              </div>
            ))}
          </div>
          
          {selectedNodes.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✅ {selectedNodes.length} item(s) selected for extraction
              </p>
            </div>
          )}
        </div>
      )}

      {/* Proceed Button */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Ready to Extract?</h3>
            <p className="text-sm text-gray-600 mt-1">
              {isConfigValid() 
                ? 'Configuration is complete. Click to proceed with extraction.'
                : 'Please complete the configuration above to proceed.'
              }
            </p>
          </div>
          
          <button
            onClick={handleProceed}
            disabled={!isConfigValid()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Extraction
          </button>
        </div>
        
        {/* Configuration Summary */}
        {isConfigValid() && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Configuration Summary:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Document:</span>
                <span className="ml-2 font-medium">{documentName}</span>
              </div>
              <div>
                <span className="text-gray-500">Mode:</span>
                <span className="ml-2 font-medium capitalize">{extractionMode}</span>
              </div>
              <div>
                <span className="text-gray-500">Images:</span>
                <span className="ml-2 font-medium">{includeImages ? 'Included' : 'Excluded'}</span>
              </div>
              {extractionMode === 'selective' && (
                <div>
                  <span className="text-gray-500">Selected:</span>
                  <span className="ml-2 font-medium">{selectedNodes.length} items</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileConfigurationPage;