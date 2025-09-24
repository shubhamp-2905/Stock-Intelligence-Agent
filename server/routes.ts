import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { StockService } from "./services/stock";
import { generateStockAnalysis } from "./services/gemini";
import { stockAnalysisRequestSchema } from "@shared/schema";
import { ZodError } from "zod";

const stockService = new StockService();

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Stock analysis endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { symbol1, symbol2, apiKey } = stockAnalysisRequestSchema.parse(req.body);

      // Validate API key exists
      if (!apiKey || apiKey.length < 10) {
        return res.status(400).json({ 
          error: "Invalid API key. Please provide a valid Google Gemini API key." 
        });
      }

      // Validate stock symbols
      const [isSymbol1Valid, isSymbol2Valid] = await Promise.all([
        stockService.validateSymbol(symbol1),
        stockService.validateSymbol(symbol2)
      ]);

      if (!isSymbol1Valid) {
        return res.status(400).json({ 
          error: `Invalid stock symbol: ${symbol1}. Please check the symbol and try again.` 
        });
      }

      if (!isSymbol2Valid) {
        return res.status(400).json({ 
          error: `Invalid stock symbol: ${symbol2}. Please check the symbol and try again.` 
        });
      }

      // Fetch stock data
      const [stock1Data, stock2Data] = await Promise.all([
        stockService.getStockData(symbol1),
        stockService.getStockData(symbol2)
      ]);

      // Generate AI analysis
      const aiAnalysis = await generateStockAnalysis(stock1Data, stock2Data, apiKey);

      const response = {
        stock1: stock1Data,
        stock2: stock2Data,
        aiAnalysis: aiAnalysis
      };

      res.json(response);

    } catch (error) {
      console.error("Analysis error:", error);

      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Invalid request data",
          details: error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
        });
      }

      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return res.status(401).json({ error: error.message });
        }
        if (error.message.includes('Failed to fetch')) {
          return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: error.message });
      }

      res.status(500).json({ 
        error: "An unexpected error occurred while processing your request. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
