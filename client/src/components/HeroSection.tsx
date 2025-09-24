import { Brain, BarChart3, Scale } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-black via-gray-900 to-black text-white" data-testid="hero-section">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-float">
            Smart Investment Analysis
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Compare stocks side-by-side with AI-powered insights. Get professional investment recommendations backed by real-time market data and advanced analytics.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="glass-effect rounded-2xl p-6 text-center">
              <Brain className="w-12 h-12 mb-4 text-green-400 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-300">Advanced machine learning algorithms analyze market patterns and fundamentals</p>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center">
              <BarChart3 className="w-12 h-12 mb-4 text-blue-400 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Real-time Data</h3>
              <p className="text-sm text-gray-300">Live market data and comprehensive financial metrics updated continuously</p>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center">
              <Scale className="w-12 h-12 mb-4 text-purple-400 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
              <p className="text-sm text-gray-300">Professional risk evaluation with personalized investment timelines</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
