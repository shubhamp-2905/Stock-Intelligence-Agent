import { TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-16" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <TrendingUp className="text-black w-4 h-4" />
              </div>
              <span className="text-xl font-bold">StockAI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional AI-powered investment analysis platform for modern investors.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Features</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>AI Stock Analysis</li>
              <li>Real-time Data</li>
              <li>Risk Assessment</li>
              <li>Portfolio Optimization</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Security</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Encrypted Data</li>
              <li>Secure API Keys</li>
              <li>Privacy Protection</li>
              <li>No Data Storage</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Contact Support</li>
              <li>Status Page</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 StockAI Platform. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">Powered by Google Gemini AI</span>
            <span className="text-xs text-gray-500">Real-time by Yahoo Finance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
