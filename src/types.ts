export interface MarketData {
  time: string;
  price: number;
  volume: number;
}

export interface Signal {
  id: string;
  asset: string;
  type: 'BUY' | 'SELL';
  entry: number;
  tp: number;
  sl: number;
  confidence: number;
  timestamp: string;
  status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
}

export interface MarketStats {
  asset: string;
  price: number;
  change: number;
  volatility: 'LOW' | 'MEDIUM' | 'HIGH';
}
