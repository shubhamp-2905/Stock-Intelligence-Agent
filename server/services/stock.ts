import axios from 'axios';
import { StockData } from '@shared/schema';

export class StockService {
  async getStockData(symbol: string): Promise<StockData> {
    try {
      // Using yfinance through a Python service or yfinance API
      const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
      const data = response.data;
      
      if (!data.chart?.result?.[0]) {
        throw new Error(`Stock symbol ${symbol} not found`);
      }

      const result = data.chart.result[0];
      const meta = result.meta;
      const quote = result.indicators?.quote?.[0];
      
      const currentPrice = meta.regularMarketPrice || 0;
      const previousClose = meta.previousClose || currentPrice;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;

      // Get additional data from summary endpoint
      const summaryResponse = await axios.get(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=summaryStatistics,financialData,defaultKeyStatistics`);
      const summaryData = summaryResponse.data?.quoteSummary?.result?.[0];

      const stockData: StockData = {
        symbol: symbol.toUpperCase(),
        name: meta.longName || meta.shortName || symbol,
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        marketCap: summaryData?.summaryStatistics?.marketCap?.raw,
        peRatio: summaryData?.summaryStatistics?.trailingPE?.raw,
        dividendYield: summaryData?.summaryStatistics?.dividendYield?.raw ? summaryData.summaryStatistics.dividendYield.raw * 100 : 0,
        pbRatio: summaryData?.defaultKeyStatistics?.priceToBook?.raw,
        yearLow: meta.fiftyTwoWeekLow,
        yearHigh: meta.fiftyTwoWeekHigh,
        analystRating: this.getAnalystRating(summaryData?.financialData?.recommendationMean?.raw),
      };

      return stockData;
    } catch (error) {
      console.error(`Error fetching stock data for ${symbol}:`, error);
      throw new Error(`Failed to fetch stock data for ${symbol}. Please verify the symbol is correct.`);
    }
  }

  private getAnalystRating(meanRating?: number): string {
    if (!meanRating) return 'N/A';
    
    if (meanRating <= 1.5) return 'Strong Buy';
    if (meanRating <= 2.5) return 'Buy';
    if (meanRating <= 3.5) return 'Hold';
    if (meanRating <= 4.5) return 'Sell';
    return 'Strong Sell';
  }

  async validateSymbol(symbol: string): Promise<boolean> {
    try {
      await this.getStockData(symbol);
      return true;
    } catch {
      return false;
    }
  }
}
