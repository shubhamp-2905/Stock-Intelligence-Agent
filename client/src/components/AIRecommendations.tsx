import { AIAnalysis } from '@shared/schema';
import { Bot, Lightbulb, PieChart, Shield, Clock, Key, TrendingUp, Coins, Scale } from 'lucide-react';

interface AIRecommendationsProps {
  aiAnalysis: AIAnalysis;
  stock1Symbol: string;
  stock2Symbol: string;
}

export default function AIRecommendations({ aiAnalysis, stock1Symbol, stock2Symbol }: AIRecommendationsProps) {
  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl text-white overflow-hidden">
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-glow">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-3xl font-bold">AI Investment Analysis</h3>
              <p className="text-gray-300">Powered by Google Gemini AI • Generated in real-time</p>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Investment Recommendation */}
            <div className="space-y-6">
              <div className="glass-effect rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span>Investment Recommendation</span>
                </h4>
                <div className="space-y-4">
                  <div className="bg-green-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Recommended Pick</span>
                      <span className="text-yellow-400 text-2xl">🏆</span>
                    </div>
                    <div className="text-2xl font-bold" data-testid="recommended-stock">
                      {aiAnalysis.recommendation.recommendedStock}
                    </div>
                    <div className="text-sm text-green-100">
                      Confidence: {Math.round(aiAnalysis.recommendation.confidence * 100)}%
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed" data-testid="recommendation-reasoning">
                    {aiAnalysis.recommendation.reasoning}
                  </p>
                </div>
              </div>
              
              <div className="glass-effect rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  <span>Portfolio Allocation</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>{stock1Symbol} Allocation</span>
                    <span className="font-bold" data-testid="stock1-allocation">
                      {aiAnalysis.allocation.stock1Percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${aiAnalysis.allocation.stock1Percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{stock2Symbol} Allocation</span>
                    <span className="font-bold" data-testid="stock2-allocation">
                      {aiAnalysis.allocation.stock2Percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${aiAnalysis.allocation.stock2Percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4" data-testid="allocation-rationale">
                    {aiAnalysis.allocation.rationale}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Risk Assessment & Timeline */}
            <div className="space-y-6">
              <div className="glass-effect rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  <span>Risk Assessment</span>
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400" data-testid="overall-risk">
                        {aiAnalysis.riskAssessment.overallRisk}
                      </div>
                      <div className="text-sm text-gray-400">Overall Risk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400" data-testid="volatility-risk">
                        {aiAnalysis.riskAssessment.volatility}
                      </div>
                      <div className="text-sm text-gray-400">Volatility</div>
                    </div>
                  </div>
                  <div className="border-t border-gray-600 pt-4">
                    <h5 className="font-semibold mb-3">Risk Factors:</h5>
                    <ul className="space-y-2 text-sm text-gray-300" data-testid="risk-factors">
                      {aiAnalysis.riskAssessment.riskFactors.map((factor, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-yellow-400 mt-0.5">⚠</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>Investment Timeline</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-600 bg-opacity-20 rounded-lg border border-green-500">
                    <div>
                      <div className="font-semibold" data-testid="recommended-holding-period">
                        {aiAnalysis.timeline.recommendedHoldingPeriod}
                      </div>
                      <div className="text-sm text-gray-300">Recommended holding period</div>
                    </div>
                    <span className="text-green-400 text-xl">✓</span>
                  </div>
                  <div className="space-y-3" data-testid="timeline-milestones">
                    {aiAnalysis.timeline.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-green-400' : 'bg-purple-400'
                        }`}></div>
                        <span className="text-sm">
                          {milestone.timeframe}: {milestone.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Insights */}
          <div className="mt-8 glass-effect rounded-xl p-6">
            <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Key className="w-5 h-5 text-yellow-400" />
              <span>Key Investment Insights</span>
            </h4>
            <div className="grid md:grid-cols-3 gap-6" data-testid="key-insights">
              {aiAnalysis.keyInsights.map((insight, index) => {
                const icons = [TrendingUp, Coins, Scale];
                const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500'];
                const IconComponent = icons[index % icons.length];
                
                return (
                  <div key={index} className="text-center">
                    <div className={`w-12 h-12 ${colors[index % colors.length]} bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className={`w-5 h-5 ${
                        index === 0 ? 'text-green-400' : index === 1 ? 'text-blue-400' : 'text-purple-400'
                      }`} />
                    </div>
                    <h5 className="font-semibold mb-2">{insight.category}</h5>
                    <p className="text-sm text-gray-300">{insight.insight}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
