import { MarketData, Signal, MarketStats } from './types';

export const MOCK_MARKET_DATA: MarketData[] = Array.from({ length: 50 }, (_, i) => ({
  time: `${10 + Math.floor(i / 6)}:${(i % 6) * 10}`,
  price: 15000 + Math.random() * 500 - 250,
  volume: Math.floor(Math.random() * 1000),
}));

export const MOCK_SIGNALS: Signal[] = [
  {
    id: '1',
    asset: 'Volatility 100 (1s) Index',
    type: 'BUY',
    entry: 15240.50,
    tp: 15350.00,
    sl: 15180.00,
    confidence: 85,
    timestamp: '2026-04-06T13:00:00Z',
    status: 'ACTIVE',
  },
  {
    id: '2',
    asset: 'Crash 500 Index',
    type: 'SELL',
    entry: 8420.20,
    tp: 8300.00,
    sl: 8480.00,
    confidence: 92,
    timestamp: '2026-04-06T13:15:00Z',
    status: 'ACTIVE',
  },
  {
    id: '3',
    asset: 'Boom 1000 Index',
    type: 'BUY',
    entry: 12100.00,
    tp: 12300.00,
    sl: 12050.00,
    confidence: 78,
    timestamp: '2026-04-06T12:45:00Z',
    status: 'COMPLETED',
  },
];

export const MOCK_STATS: MarketStats[] = [
  { asset: 'Volatility 100', price: 15245.20, change: 1.2, volatility: 'HIGH' },
  { asset: 'Volatility 75', price: 8420.50, change: -0.8, volatility: 'MEDIUM' },
  { asset: 'Crash 500', price: 8422.10, change: -2.4, volatility: 'HIGH' },
  { asset: 'Boom 1000', price: 12105.40, change: 0.5, volatility: 'LOW' },
];
