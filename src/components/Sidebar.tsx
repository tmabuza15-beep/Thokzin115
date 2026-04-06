import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Zap, 
  History, 
  BookOpen, 
  Settings, 
  HelpCircle,
  BarChart3,
  Target
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
        : "text-slate-400 hover:text-white hover:bg-white/5"
    )}
  >
    <span className={cn(
      "transition-transform duration-200 group-hover:scale-110",
      active ? "text-brand-primary" : "text-slate-500 group-hover:text-white"
    )}>
      {icon}
    </span>
    <span className="text-sm font-medium tracking-wide">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(0,255,157,0.6)]" />}
  </button>
);

export const Sidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 border-r border-border-subtle bg-bg-dark h-[calc(100vh-64px)] p-4 flex flex-col gap-8 sticky top-16 overflow-y-auto">
      <div className="space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Main Menu</p>
        <NavItem 
          icon={<Target className="w-5 h-5" />} 
          label="Thokozani's Analyzer" 
          active={activeTab === 'analyzer'} 
          onClick={() => setActiveTab('analyzer')}
        />
        <NavItem 
          icon={<LayoutDashboard className="w-5 h-5" />} 
          label="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
        />
        <NavItem icon={<TrendingUp className="w-5 h-5" />} label="Market Overview" />
        <NavItem icon={<Zap className="w-5 h-5" />} label="Signal Room" />
        <NavItem icon={<History className="w-5 h-5" />} label="Trade History" />
      </div>

      <div className="space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Analysis Tools</p>
        <NavItem icon={<BarChart3 className="w-5 h-5" />} label="Technical Analysis" />
        <NavItem 
          icon={<BookOpen className="w-5 h-5" />} 
          label="Trading Academy" 
          active={activeTab === 'academy'}
          onClick={() => setActiveTab('academy')}
        />
      </div>

      <div className="mt-auto space-y-1">
        <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
        <NavItem icon={<HelpCircle className="w-5 h-5" />} label="Support" />
      </div>

      <div className="bg-gradient-to-br from-brand-primary/20 to-transparent p-4 rounded-2xl border border-brand-primary/10 mt-4">
        <p className="text-xs font-bold text-brand-primary mb-1">PRO VERSION</p>
        <p className="text-[10px] text-slate-400 leading-relaxed mb-3">Unlock advanced synthetic index algorithms and AI signals.</p>
        <button className="w-full py-2 bg-brand-primary text-bg-dark text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
          UPGRADE NOW
        </button>
      </div>
    </aside>
  );
};
