import axios from 'axios';
import { StockData } from '@shared/schema';

export class StockService {
  private getHeaders() {
    return {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    };
  }

  async getStockData(symbol: string): Promise<StockData> {
    try {
      // Get basic chart data
      const chartResponse = await axios.get(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
        { 
          headers: this.getHeaders(),
          timeout: 10000
        }
      );
      
      const chartData = chartResponse.data;
      
      if (!chartData.chart?.result?.[0]) {
        throw new Error(`Stock symbol ${symbol} not found`);
      }

      const result = chartData.chart.result[0];
      const meta = result.meta;
      
      const currentPrice = meta.regularMarketPrice || 0;
      const previousClose = meta.previousClose || currentPrice;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;

      // Try to get additional data from summary endpoint with fallbacks
      let summaryData: any = null;
      try {
        const summaryResponse = await axios.get(
          `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=summaryStatistics,financialData,defaultKeyStatistics`,
          { 
            headers: this.getHeaders(),
            timeout: 10000
          }
        );
        summaryData = summaryResponse.data?.quoteSummary?.result?.[0];
      } catch (summaryError) {
        console.warn(`Could not fetch detailed data for ${symbol}, using basic data only:`, summaryError);
        // Continue with basic data only
      }

      const stockData: StockData = {
        symbol: symbol.toUpperCase(),
        name: meta.longName || meta.shortName || symbol,
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        marketCap: summaryData?.summaryStatistics?.marketCap?.raw || meta.marketCap,
        peRatio: summaryData?.summaryStatistics?.trailingPE?.raw || meta.trailingPE,
        dividendYield: summaryData?.summaryStatistics?.dividendYield?.raw 
          ? summaryData.summaryStatistics.dividendYield.raw * 100 
          : (meta.dividendYield ? meta.dividendYield * 100 : 0),
        pbRatio: summaryData?.defaultKeyStatistics?.priceToBook?.raw || meta.priceToBook,
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
