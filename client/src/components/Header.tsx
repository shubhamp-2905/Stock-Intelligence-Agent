import { TrendingUp, Shield, Bot, Clock } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-black text-white py-6 shadow-2xl" data-testid="header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <TrendingUp className="text-black text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" data-testid="app-title">StockAI</h1>
              <p className="text-gray-300 text-sm">Professional Investment Analysis Platform</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-full">
              <Shield className="w-3 h-3" />
              <span className="text-xs font-medium">Secure</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-600 px-3 py-1 rounded-full">
              <Bot className="w-3 h-3" />
              <span className="text-xs font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-600 px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-medium">Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
