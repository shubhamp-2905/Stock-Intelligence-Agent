import { StockData } from '@shared/schema';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface StockCardProps {
  stockData: StockData;
  color: 'green' | 'blue';
}

export default function StockCard({ stockData, color }: StockCardProps) {
  const isPositive = stockData.change >= 0;
  const colorClasses = {
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600'
  };

  const formatCurrency = (value?: number) => {
    if (!value) return 'N/A';
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  const formatNumber = (value?: number) => {
    if (!value) return 'N/A';
    return value.toFixed(2);
  };

  const formatPercentage = (value?: number) => {
    if (!value) return '0.00%';
    return `${value.toFixed(2)}%`;
  };

  const getAnalystRating = (rating?: string) => {
    if (!rating || rating === 'N/A') return { stars: 0, text: 'N/A' };
    
    const ratingMap: Record<string, { stars: number; text: string }> = {
      'Strong Buy': { stars: 5, text: 'Strong Buy' },
      'Buy': { stars: 4, text: 'Buy' },
      'Hold': { stars: 3, text: 'Hold' },
      'Sell': { stars: 2, text: 'Sell' },
      'Strong Sell': { stars: 1, text: 'Strong Sell' }
    };
    
    return ratingMap[rating] || { stars: 0, text: rating };
  };

  const analystRating = getAnalystRating(stockData.analystRating);
  const currentPrice = stockData.yearLow && stockData.yearHigh ? 
    ((stockData.price - stockData.yearLow) / (stockData.yearHigh - stockData.yearLow)) * 100 : 50;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className={`${colorClasses[color]} p-6 text-white`}>
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-2xl font-bold" data-testid={`stock-symbol-${stockData.symbol}`}>
              {stockData.symbol}
            </h4>
            <p className={`${color === 'green' ? 'text-green-100' : 'text-blue-100'}`} data-testid={`stock-name-${stockData.symbol}`}>
              {stockData.name}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold" data-testid={`stock-price-${stockData.symbol}`}>
              {formatCurrency(stockData.price)}
            </div>
            <div className="flex items-center space-x-1" data-testid={`stock-change-${stockData.symbol}`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">
                {isPositive ? '+' : ''}{stockData.change.toFixed(2)} ({isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Market Cap</div>
            <div className="text-lg font-semibold" data-testid={`market-cap-${stockData.symbol}`}>
              {formatCurrency(stockData.marketCap)}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">P/E Ratio</div>
            <div className="text-lg font-semibold" data-testid={`pe-ratio-${stockData.symbol}`}>
              {formatNumber(stockData.peRatio)}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Dividend Yield</div>
            <div className="text-lg font-semibold" data-testid={`dividend-yield-${stockData.symbol}`}>
              {formatPercentage(stockData.dividendYield)}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">P/B Ratio</div>
            <div className="text-lg font-semibold" data-testid={`pb-ratio-${stockData.symbol}`}>
              {formatNumber(stockData.pbRatio)}
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h5 className="font-semibold mb-3">52-Week Range</h5>
          <div className="flex items-center space-x-4">
            <div>
              <div className="text-xs text-gray-600">Low</div>
              <div className="font-semibold" data-testid={`year-low-${stockData.symbol}`}>
                {formatCurrency(stockData.yearLow)}
              </div>
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
              <div 
                className={`h-2 rounded-full ${color === 'green' ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${currentPrice}%` }}
              ></div>
              <div 
                className={`absolute top-0 w-3 h-3 rounded-full transform -translate-y-0.5 ${color === 'green' ? 'bg-green-600' : 'bg-blue-600'}`}
                style={{ right: `${100 - currentPrice}%` }}
              ></div>
            </div>
            <div>
              <div className="text-xs text-gray-600">High</div>
              <div className="font-semibold" data-testid={`year-high-${stockData.symbol}`}>
                {formatCurrency(stockData.yearHigh)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Analyst Rating</span>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1" data-testid={`analyst-stars-${stockData.symbol}`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= analystRating.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold" data-testid={`analyst-rating-${stockData.symbol}`}>
                {analystRating.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
