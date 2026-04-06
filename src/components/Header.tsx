import React from 'react';
import { Activity, Shield, Bell, User, Search } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-border-subtle bg-bg-dark/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center border border-brand-primary/20">
          <Shield className="w-6 h-6 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">SYNTHETIX KILLER</h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-12 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search assets, signals, indices..." 
            className="w-full bg-bg-card border border-border-subtle rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/5 rounded-full relative transition-colors">
          <Bell className="w-5 h-5 text-slate-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-secondary rounded-full border-2 border-bg-dark" />
        </button>
        <div className="h-8 w-[1px] bg-border-subtle mx-2" />
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white group-hover:text-brand-primary transition-colors">Trader Alpha</p>
            <p className="text-[10px] text-slate-500 font-mono">PRO ACCOUNT</p>
          </div>
          <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center border border-border-subtle overflow-hidden">
            <User className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
};
