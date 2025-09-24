import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ApiKeyInput from '@/components/ApiKeyInput';
import StockInputForm from '@/components/StockInputForm';
import LoadingState from '@/components/LoadingState';
import StockCard from '@/components/StockCard';
import AIRecommendations from '@/components/AIRecommendations';
import DisclaimerSection from '@/components/DisclaimerSection';
import Footer from '@/components/Footer';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { StockAnalysisResponse, StockAnalysisRequest } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [apiKey, setApiKey] = useState('AIzaSyAldFnftwMnpxW1olKXFsg3zDSpnnkY4Xs');
  const [analysisResult, setAnalysisResult] = useState<StockAnalysisResponse | null>(null);
  const { toast } = useToast();

  const analysisMutation = useMutation({
    mutationFn: async (data: StockAnalysisRequest) => {
      const response = await apiRequest('POST', '/api/analyze', data);
      return response.json() as Promise<StockAnalysisResponse>;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast({
        title: "Analysis Complete",
        description: "Your stock comparison analysis has been generated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = (symbol1: string, symbol2: string) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Google Gemini API key to proceed.",
        variant: "destructive",
      });
      return;
    }

    analysisMutation.mutate({ symbol1, symbol2, apiKey });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <HeroSection />
      
      <main className="container mx-auto px-4 py-16">
        <ApiKeyInput 
          apiKey={apiKey} 
          onApiKeyChange={setApiKey} 
          data-testid="api-key-section"
        />
        
        <StockInputForm 
          onAnalyze={handleAnalyze} 
          isLoading={analysisMutation.isPending}
          data-testid="stock-input-form"
        />
        
        {analysisMutation.isPending && (
          <LoadingState data-testid="loading-state" />
        )}
        
        {analysisResult && (
          <>
            <div className="max-w-6xl mx-auto mb-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Stock Comparison Analysis</h3>
                <p className="text-gray-600">Real-time data and comprehensive metrics for informed investment decisions</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <StockCard 
                  stockData={analysisResult.stock1} 
                  color="green"
                  data-testid={`stock-card-${analysisResult.stock1.symbol}`}
                />
                <StockCard 
                  stockData={analysisResult.stock2} 
                  color="blue"
                  data-testid={`stock-card-${analysisResult.stock2.symbol}`}
                />
              </div>
            </div>
            
            <AIRecommendations 
              aiAnalysis={analysisResult.aiAnalysis}
              stock1Symbol={analysisResult.stock1.symbol}
              stock2Symbol={analysisResult.stock2.symbol}
              data-testid="ai-recommendations"
            />
          </>
        )}
        
        <DisclaimerSection data-testid="disclaimer-section" />
      </main>
      
      <Footer />
    </div>
  );
}
