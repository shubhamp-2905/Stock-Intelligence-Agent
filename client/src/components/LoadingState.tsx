import { Download, Brain, BarChart3 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-200 text-center">
        <div className="animate-spin w-16 h-16 border-4 border-gray-200 border-t-black rounded-full mx-auto mb-6"></div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Stocks</h3>
        <p className="text-gray-600 mb-6">
          Our AI is processing real-time market data and generating comprehensive investment analysis...
        </p>
        <div className="flex justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2" data-testid="loading-fetch-data">
            <Download className="w-4 h-4 animate-pulse" />
            <span>Fetching market data</span>
          </div>
          <div className="flex items-center space-x-2" data-testid="loading-ai-analysis">
            <Brain className="w-4 h-4 animate-pulse" />
            <span>Running AI analysis</span>
          </div>
          <div className="flex items-center space-x-2" data-testid="loading-generate-insights">
            <BarChart3 className="w-4 h-4 animate-pulse" />
            <span>Generating insights</span>
          </div>
        </div>
      </div>
    </div>
  );
}
