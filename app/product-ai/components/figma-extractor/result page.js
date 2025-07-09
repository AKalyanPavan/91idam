import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Eye, 
  EyeOff,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Square,
  Frame,
  FileText,
  Layers,
  Image,
  Clock,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const ResultsPage = ({ extractionResults, onNewExtraction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showJSONPreview, setShowJSONPreview] = useState({});
  const [expandedComponents, setExpandedComponents] = useState({});
  const [copySuccess, setCopySuccess] = useState('');

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

  const copyToClipboard = async (text, componentName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(componentName);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const toggleJSONPreview = (componentId) => {
    setShowJSONPreview(prev => ({
      ...prev,
      [componentId]: !prev[componentId]
    }));
  };

  const toggleComponentExpansion = (componentId) => {
    setExpandedComponents(prev => ({
      ...prev,
      [componentId]: !prev[componentId]
    }));
  };

  const getFilteredComponents = (components) => {
    if (!components) return [];
    
    return components.filter(component => {
      const matchesSearch = searchTerm === '' || 
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || component.type === filterType;
      
      return matchesSearch && matchesFilter;
    });
  };

  const getUniqueTypes = (components) => {
    if (!components) return [];
    return [...new Set(components.map(c => c.type))].sort();
  };

  const getAIPromptTemplate = (component) => {
    return `Create a React component based on this Figma design data:

Component Name: ${component.name}
Component Type: ${component.type}

Design Data:
\`\`\`json
${JSON.stringify(component, null, 2)}
\`\`\`

Please create:
1. A functional React component with TypeScript
2. Responsive CSS using Tailwind
3. Proper component structure and props
4. Accessibility attributes
5. Clean, production-ready code

Focus on matching the design specifications exactly, including colors, spacing, typography, and layout.`;
  };

  const ComponentCard = ({ component, level = 0 }) => {
    const componentId = component.id || Math.random().toString();
    const isJSONVisible = showJSONPreview[componentId];
    const isExpanded = expandedComponents[componentId];
    const componentJSON = JSON.stringify(component, null, 2);
    const hasChildren = component.children && component.children.length > 0;
    const aiPrompt = getAIPromptTemplate(component);
    
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-4 mb-3 ${level > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {hasChildren && (
              <button
                onClick={() => toggleComponentExpansion(componentId)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
            
            <div className="flex items-center space-x-2">
              {component.type === 'COMPONENT' && <Square className="w-4 h-4 text-blue-500" />}
              {component.type === 'FRAME' && <Frame className="w-4 h-4 text-green-500" />}
              {component.type === 'TEXT' && <FileText className="w-4 h-4 text-purple-500" />}
              {component.type === 'GROUP' && <Layers className="w-4 h-4 text-orange-500" />}
              <span className="font-medium text-gray-900">{component.name}</span>
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                {component.type}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleJSONPreview(componentId)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
              title="Toggle JSON Preview"
            >
              {isJSONVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => copyToClipboard(componentJSON, component.name)}
              className={`p-2 rounded ${
                copySuccess === component.name 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title="Copy JSON for AI Processing"
            >
              {copySuccess === component.name ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => copyToClipboard(aiPrompt, `${component.name}_prompt`)}
              className={`p-2 text-xs px-3 py-1 rounded ${
                copySuccess === `${component.name}_prompt`
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
              title="Copy AI Prompt"
            >
              {copySuccess === `${component.name}_prompt` ? '✓ Copied' : 'AI Prompt'}
            </button>
            
            <button
              onClick={() => downloadJSON(component, `${component.name.replace(/\s+/g, '_')}.json`)}
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"
              title="Download Component JSON"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Component Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
          <div>
            <span className="font-medium">ID:</span> {component.id}
          </div>
          {component.children && (
            <div>
              <span className="font-medium">Children:</span> {component.children.length}
            </div>
          )}
          {component.absoluteBoundingBox && (
            <>
              <div>
                <span className="font-medium">Size:</span> {Math.round(component.absoluteBoundingBox.width)}×{Math.round(component.absoluteBoundingBox.height)}
              </div>
              <div>
                <span className="font-medium">Position:</span> {Math.round(component.absoluteBoundingBox.x)},{Math.round(component.absoluteBoundingBox.y)}
              </div>
            </>
          )}
        </div>
        
        {/* JSON Preview */}
        {isJSONVisible && (
          <div className="bg-gray-50 rounded border p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">JSON Structure</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(componentJSON, component.name)}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Copy JSON
                </button>
                <button
                  onClick={() => copyToClipboard(aiPrompt, `${component.name}_prompt`)}
                  className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                >
                  Copy AI Prompt
                </button>
              </div>
            </div>
            <pre className="text-xs text-gray-800 overflow-x-auto max-h-40 overflow-y-auto bg-white p-3 rounded border">
              {componentJSON}
            </pre>
          </div>
        )}
        
        {/* Child Components */}
        {hasChildren && isExpanded && (
          <div className="mt-4 space-y-2">
            {component.children.map((child, index) => (
              <ComponentCard key={index} component={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!extractionResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Available</h3>
          <p className="text-gray-600 mb-4">
            Complete an extraction to view and download results.
          </p>
          {onNewExtraction && (
            <button
              onClick={onNewExtraction}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Start New Extraction
            </button>
          )}
        </div>
      </div>
    );
  }

  const allComponents = extractionResults.document?.children || [];
  const filteredComponents = getFilteredComponents(allComponents);
  const uniqueTypes = getUniqueTypes(allComponents);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Extraction Results</h2>
            <p className="text-gray-600 mt-1">
              {extractionResults.name} • {extractionResults.extractionMode} extraction
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => downloadJSON(extractionResults, `${extractionResults.name.replace(/\s+/g, '_')}_complete.json`)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete JSON</span>
            </button>
            
            {onNewExtraction && (
              <button
                onClick={onNewExtraction}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                New Extraction
              </button>
            )}
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <span className="text-sm text-orange-800">Extracted</span>
            </div>
            <p className="text-sm font-bold text-orange-900">
              {new Date(extractionResults.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* AI Processing Guide */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="bg-purple-100 rounded-lg p-2">
            <ExternalLink className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Ready for AI Processing</h3>
            <p className="text-purple-800 mb-3">
              Each component below is optimized for AI tools. Use the "AI Prompt" button to get a complete prompt for React component generation.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">✓ Copy JSON for data</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">✓ Copy AI Prompt for generation</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">✓ Download individual components</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search components by name or type..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredComponents.length} of {allComponents.length} components
        </div>
      </div>

      {/* Components List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Component Structure for AI Processing
        </h3>
        
        {filteredComponents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No components match your search criteria.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredComponents.map((component, index) => (
              <ComponentCard key={index} component={component} />
            ))}
          </div>
        )}
      </div>

      {/* Success Message */}
      {copySuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          ✓ Copied {copySuccess} to clipboard!
        </div>
      )}
    </div>
  );
};

export default ResultsPage;