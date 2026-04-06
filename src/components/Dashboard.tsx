import React, { useState } from 'react';
import { MarketChart } from './MarketChart';
import { SignalCard } from './SignalCard';
import { MOCK_MARKET_DATA, MOCK_SIGNALS, MOCK_STATS } from '../constants';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  ShieldCheck, 
  BrainCircuit,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

export const Dashboard: React.FC = () => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Analyze the current synthetic index market (Volatility 100, Crash 500, Boom 1000) and provide a high-probability trading signal for 'Synthetix Killer' platform. Keep it professional, data-driven, and concise. Format with markdown. Include Entry, TP, SL, and Risk/Reward ratio.",
      });
      setAiAnalysis(response.text || "Analysis unavailable.");
    } catch (error) {
      console.error("AI Analysis failed:", error);
      setAiAnalysis("Failed to connect to AI Analysis engine. Please check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((stat, i) => (
          <motion.div 
            key={stat.asset}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-4 flex items-center justify-between group cursor-pointer hover:border-brand-primary/30 transition-all"
          >
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.asset}</p>
              <p className="text-xl font-mono font-bold text-white tracking-tighter">{stat.price.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-1">
                {stat.change > 0 ? (
                  <ArrowUpRight className="w-3 h-3 text-brand-primary" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-brand-secondary" />
                )}
                <span className={`text-[10px] font-bold ${stat.change > 0 ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                  {stat.change > 0 ? '+' : ''}{stat.change}%
                </span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
              stat.change > 0 ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary' : 'bg-brand-secondary/10 border-brand-secondary/20 text-brand-secondary'
            }`}>
              <Activity className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="xl:col-span-2 space-y-6">
          <MarketChart data={MOCK_MARKET_DATA} assetName="Volatility 100 (1s) Index" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-primary" />
                  <h3 className="font-bold text-white">Risk Management</h3>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">SAFE MODE: ON</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Daily Drawdown Limit</span>
                  <span className="text-white font-mono">2.5%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-brand-primary" />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Max Open Positions</span>
                  <span className="text-white font-mono">3 / 5</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[60%] h-full bg-brand-primary" />
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-brand-primary" />
                  <h3 className="font-bold text-white">Quick Trade</h3>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                  <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-bold text-xs rounded-xl hover:bg-brand-primary hover:text-bg-dark transition-all">
                  BUY MARKET
                </button>
                <button className="py-3 bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary font-bold text-xs rounded-xl hover:bg-brand-secondary hover:text-white transition-all">
                  SELL MARKET
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Analysis Area */}
        <div className="space-y-6">
          {/* AI Analysis Section */}
          <div className="glass-panel p-6 space-y-4 border-brand-primary/20 bg-gradient-to-b from-brand-primary/5 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-brand-primary" />
                <h3 className="font-bold text-white">Synthetic Killer AI</h3>
              </div>
              <button 
                onClick={runAiAnalysis}
                disabled={isAnalyzing}
                className="p-1.5 hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 text-brand-primary ${isAnalyzing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            <div className="min-h-[200px] text-xs text-slate-400 leading-relaxed font-mono">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-[200px] gap-3">
                  <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                  <p className="animate-pulse">Analyzing market patterns...</p>
                </div>
              ) : aiAnalysis ? (
                <div className="markdown-body prose prose-invert prose-xs max-w-none">
                  <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center gap-4">
                  <p>Ready to analyze synthetic indices for high-probability setups.</p>
                  <button 
                    onClick={runAiAnalysis}
                    className="px-4 py-2 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary rounded-lg hover:bg-brand-primary/20 transition-all"
                  >
                    GENERATE SIGNAL
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Active Signals List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Active Signals</h3>
              <span className="text-[10px] font-mono text-brand-primary">LIVE UPDATES</span>
            </div>
            <div className="space-y-4">
              {MOCK_SIGNALS.filter(s => s.status === 'ACTIVE').map(signal => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
