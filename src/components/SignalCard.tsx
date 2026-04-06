import React from 'react';
import { TrendingUp, TrendingDown, Clock, Target, ShieldAlert, ArrowRight } from 'lucide-react';
import { Signal } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SignalCardProps {
  signal: Signal;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  const isBuy = signal.type === 'BUY';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-panel p-5 flex flex-col gap-4 group transition-all hover:border-brand-primary/30"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center border",
            isBuy ? "bg-brand-primary/10 border-brand-primary/20 text-brand-primary" : "bg-brand-secondary/10 border-brand-secondary/20 text-brand-secondary"
          )}>
            {isBuy ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-brand-primary transition-colors">{signal.asset}</h4>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                isBuy ? "bg-brand-primary/20 text-brand-primary" : "bg-brand-secondary/20 text-brand-secondary"
              )}>
                {signal.type}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                CONFIDENCE: {signal.confidence}%
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] font-mono">2m ago</span>
          </div>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-widest",
            signal.status === 'ACTIVE' ? "text-brand-primary" : "text-slate-500"
          )}>
            {signal.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 py-2 border-y border-border-subtle/50">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Entry</span>
          <span className="text-xs font-mono text-white">{signal.entry.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Target</span>
          <span className="text-xs font-mono text-brand-primary">{signal.tp.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Stop Loss</span>
          <span className="text-xs font-mono text-brand-secondary">{signal.sl.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3 h-3 text-slate-500" />
          <span className="text-[10px] text-slate-500 italic">Risk: 1:2.5 Ratio</span>
        </div>
        <button className="flex items-center gap-1 text-[10px] font-bold text-brand-primary hover:gap-2 transition-all">
          VIEW ANALYSIS <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};
