import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Stock Analysis Schemas
export const stockAnalysisRequestSchema = z.object({
  symbol1: z.string().min(1).max(10).transform(s => s.toUpperCase()),
  symbol2: z.string().min(1).max(10).transform(s => s.toUpperCase()),
  apiKey: z.string().min(1),
});

export const stockDataSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  price: z.number(),
  change: z.number(),
  changePercent: z.number(),
  marketCap: z.number().optional(),
  peRatio: z.number().optional(),
  dividendYield: z.number().optional(),
  pbRatio: z.number().optional(),
  yearLow: z.number().optional(),
  yearHigh: z.number().optional(),
  analystRating: z.string().optional(),
});

export const aiAnalysisSchema = z.object({
  recommendation: z.object({
    recommendedStock: z.string(),
    reasoning: z.string(),
    confidence: z.number().min(0).max(1),
  }),
  allocation: z.object({
    stock1Percentage: z.number().min(0).max(100),
    stock2Percentage: z.number().min(0).max(100),
    rationale: z.string(),
  }),
  riskAssessment: z.object({
    overallRisk: z.enum(['Low', 'Medium', 'High']),
    volatility: z.enum(['Low', 'Medium', 'High']),
    riskFactors: z.array(z.string()),
  }),
  timeline: z.object({
    recommendedHoldingPeriod: z.string(),
    milestones: z.array(z.object({
      timeframe: z.string(),
      description: z.string(),
    })),
  }),
  keyInsights: z.array(z.object({
    category: z.string(),
    insight: z.string(),
  })),
});

export const stockAnalysisResponseSchema = z.object({
  stock1: stockDataSchema,
  stock2: stockDataSchema,
  aiAnalysis: aiAnalysisSchema,
});

export type StockAnalysisRequest = z.infer<typeof stockAnalysisRequestSchema>;
export type StockData = z.infer<typeof stockDataSchema>;
export type AIAnalysis = z.infer<typeof aiAnalysisSchema>;
export type StockAnalysisResponse = z.infer<typeof stockAnalysisResponseSchema>;
