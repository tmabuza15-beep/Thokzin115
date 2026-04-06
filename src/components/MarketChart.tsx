import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { MarketData } from '../types';

interface MarketChartProps {
  data: MarketData[];
  assetName: string;
}

export const MarketChart: React.FC<MarketChartProps> = ({ data, assetName }) => {
  return (
    <div className="chart-container flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-brand-primary rounded-full" />
          <div>
            <h3 className="text-lg font-bold text-white">{assetName}</h3>
            <p className="text-xs text-slate-500 font-mono">REAL-TIME PERFORMANCE</p>
          </div>
        </div>
        <div className="flex gap-2">
          {['1M', '5M', '15M', '1H', '4H', '1D'].map((tf) => (
            <button 
              key={tf} 
              className={`px-3 py-1 text-[10px] font-bold rounded-md border transition-all ${
                tf === '15M' 
                  ? 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary' 
                  : 'border-border-subtle text-slate-500 hover:text-white hover:border-slate-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2128" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              domain={['auto', 'auto']}
              tickFormatter={(val) => val.toLocaleString()}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#14161a', 
                border: '1px solid #2d3139',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#00ff9d' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#00ff9d" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
