import { GoogleGenAI } from "@google/genai";
import { StockData, AIAnalysis } from '@shared/schema';

export async function generateStockAnalysis(
  stock1: StockData, 
  stock2: StockData, 
  apiKey: string
): Promise<AIAnalysis> {
  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are a professional financial analyst with expertise in stock analysis and investment recommendations. 
Analyze the provided stock data and provide comprehensive investment analysis in the exact JSON format specified.
Consider fundamental analysis, market conditions, risk factors, and investment timelines.
Be objective, data-driven, and provide actionable insights.`;

    const prompt = `Analyze these two stocks and provide detailed investment recommendations:

Stock 1 - ${stock1.symbol} (${stock1.name}):
- Current Price: $${stock1.price}
- Change: ${stock1.change >= 0 ? '+' : ''}${stock1.change} (${stock1.changePercent >= 0 ? '+' : ''}${stock1.changePercent.toFixed(2)}%)
- Market Cap: ${stock1.marketCap ? '$' + (stock1.marketCap / 1e9).toFixed(2) + 'B' : 'N/A'}
- P/E Ratio: ${stock1.peRatio || 'N/A'}
- Dividend Yield: ${stock1.dividendYield ? stock1.dividendYield.toFixed(2) + '%' : '0%'}
- P/B Ratio: ${stock1.pbRatio || 'N/A'}
- 52-Week Range: $${stock1.yearLow || 'N/A'} - $${stock1.yearHigh || 'N/A'}
- Analyst Rating: ${stock1.analystRating || 'N/A'}

Stock 2 - ${stock2.symbol} (${stock2.name}):
- Current Price: $${stock2.price}
- Change: ${stock2.change >= 0 ? '+' : ''}${stock2.change} (${stock2.changePercent >= 0 ? '+' : ''}${stock2.changePercent.toFixed(2)}%)
- Market Cap: ${stock2.marketCap ? '$' + (stock2.marketCap / 1e9).toFixed(2) + 'B' : 'N/A'}
- P/E Ratio: ${stock2.peRatio || 'N/A'}
- Dividend Yield: ${stock2.dividendYield ? stock2.dividendYield.toFixed(2) + '%' : '0%'}
- P/B Ratio: ${stock2.pbRatio || 'N/A'}
- 52-Week Range: $${stock2.yearLow || 'N/A'} - $${stock2.yearHigh || 'N/A'}
- Analyst Rating: ${stock2.analystRating || 'N/A'}

Please provide:
1. Which stock you recommend and why (with confidence level 0-1)
2. Suggested portfolio allocation percentages (must total 100%)
3. Risk assessment (Low/Medium/High for overall risk and volatility)
4. Investment timeline recommendation
5. Key insights for investors

Focus on fundamental analysis, market position, financial health, growth prospects, and risk factors.`;

    const responseSchema = {
      type: "object",
      properties: {
        recommendation: {
          type: "object",
          properties: {
            recommendedStock: { type: "string" },
            reasoning: { type: "string" },
            confidence: { type: "number", minimum: 0, maximum: 1 }
          },
          required: ["recommendedStock", "reasoning", "confidence"]
        },
        allocation: {
          type: "object",
          properties: {
            stock1Percentage: { type: "number", minimum: 0, maximum: 100 },
            stock2Percentage: { type: "number", minimum: 0, maximum: 100 },
            rationale: { type: "string" }
          },
          required: ["stock1Percentage", "stock2Percentage", "rationale"]
        },
        riskAssessment: {
          type: "object",
          properties: {
            overallRisk: { type: "string", enum: ["Low", "Medium", "High"] },
            volatility: { type: "string", enum: ["Low", "Medium", "High"] },
            riskFactors: {
              type: "array",
              items: { type: "string" },
              minItems: 1,
              maxItems: 5
            }
          },
          required: ["overallRisk", "volatility", "riskFactors"]
        },
        timeline: {
          type: "object",
          properties: {
            recommendedHoldingPeriod: { type: "string" },
            milestones: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  timeframe: { type: "string" },
                  description: { type: "string" }
                },
                required: ["timeframe", "description"]
              },
              minItems: 3,
              maxItems: 3
            }
          },
          required: ["recommendedHoldingPeriod", "milestones"]
        },
        keyInsights: {
          type: "array",
          items: {
            type: "object",
            properties: {
              category: { type: "string" },
              insight: { type: "string" }
            },
            required: ["category", "insight"]
          },
          minItems: 3,
          maxItems: 3
        }
      },
      required: ["recommendation", "allocation", "riskAssessment", "timeline", "keyInsights"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
      contents: prompt,
    });

    const rawJson = response.text;

    if (!rawJson) {
      throw new Error("Empty response from Gemini AI. Please check your API key and try again.");
    }

    try {
      const analysisData: AIAnalysis = JSON.parse(rawJson);
      
      // Validate that allocation percentages add up to 100
      const totalAllocation = analysisData.allocation.stock1Percentage + analysisData.allocation.stock2Percentage;
      if (Math.abs(totalAllocation - 100) > 1) {
        // Normalize to 100%
        const ratio = 100 / totalAllocation;
        analysisData.allocation.stock1Percentage = Math.round(analysisData.allocation.stock1Percentage * ratio);
        analysisData.allocation.stock2Percentage = 100 - analysisData.allocation.stock1Percentage;
      }

      // Ensure confidence is between 0 and 1
      analysisData.recommendation.confidence = Math.max(0, Math.min(1, analysisData.recommendation.confidence));

      return analysisData;
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", rawJson);
      throw new Error("Invalid response format from AI analysis. Please try again.");
    }

  } catch (error) {
    console.error("Gemini AI analysis error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error("Invalid Google Gemini API key. Please check your API key and try again.");
      }
      if (error.message.includes('quota') || error.message.includes('limit')) {
        throw new Error("API quota exceeded. Please check your Gemini AI usage limits and try again later.");
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error("Network error connecting to Gemini AI. Please check your internet connection and try again.");
      }
      // Re-throw our custom error messages
      if (error.message.includes('Empty response') || error.message.includes('Invalid response format')) {
        throw error;
      }
    }
    
    throw new Error("Failed to generate AI analysis. Please try again or contact support if the issue persists.");
  }
}
