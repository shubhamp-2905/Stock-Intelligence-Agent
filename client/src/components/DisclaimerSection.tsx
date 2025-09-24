import { AlertTriangle } from 'lucide-react';

export default function DisclaimerSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-yellow-800 mb-2">Investment Disclaimer</h4>
            <p className="text-sm text-yellow-700 leading-relaxed" data-testid="disclaimer-text">
              The information provided by this AI analysis is for educational and informational purposes only and should not be considered as financial advice. Stock investments carry inherent risks, and past performance does not guarantee future results. Always consult with a qualified financial advisor before making investment decisions. The AI recommendations are based on current market data and algorithmic analysis, which may not account for all market factors or personal financial situations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
