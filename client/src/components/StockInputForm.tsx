import { useState } from 'react';
import { TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StockInputFormProps {
  onAnalyze: (symbol1: string, symbol2: string) => void;
  isLoading: boolean;
}

export default function StockInputForm({ onAnalyze, isLoading }: StockInputFormProps) {
  const [symbol1, setSymbol1] = useState('GOOGL');
  const [symbol2, setSymbol2] = useState('MSFT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol1.trim() && symbol2.trim() && !isLoading) {
      onAnalyze(symbol1.trim().toUpperCase(), symbol2.trim().toUpperCase());
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Compare Stocks</h3>
          <p className="text-gray-600 text-lg">Enter two stock symbols to get AI-powered investment analysis and recommendations</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="stock1" className="block text-sm font-medium text-gray-700">
                First Stock Symbol
              </Label>
              <div className="relative">
                <Input
                  id="stock1"
                  type="text"
                  placeholder="e.g., AAPL"
                  value={symbol1}
                  onChange={(e) => setSymbol1(e.target.value.toUpperCase())}
                  className="uppercase"
                  maxLength={10}
                  data-testid="stock1-input"
                />
                {symbol1 && (
                  <div className="absolute right-3 top-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
              {symbol1 && (
                <p className="text-sm text-green-600" data-testid="stock1-validation">
                  ✓ Valid symbol
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock2" className="block text-sm font-medium text-gray-700">
                Second Stock Symbol
              </Label>
              <div className="relative">
                <Input
                  id="stock2"
                  type="text"
                  placeholder="e.g., MSFT"
                  value={symbol2}
                  onChange={(e) => setSymbol2(e.target.value.toUpperCase())}
                  className="uppercase"
                  maxLength={10}
                  data-testid="stock2-input"
                />
                {symbol2 && (
                  <div className="absolute right-3 top-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
              {symbol2 && (
                <p className="text-sm text-green-600" data-testid="stock2-validation">
                  ✓ Valid symbol
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={isLoading || !symbol1.trim() || !symbol2.trim()}
              className="px-8 py-4 bg-black text-white hover:bg-gray-800 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              data-testid="analyze-button"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              {isLoading ? 'Analyzing...' : 'Generate AI Analysis'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
