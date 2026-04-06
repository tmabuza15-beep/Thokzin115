import React from 'react';
import { BookOpen, Target, Zap, ShieldCheck, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

const LessonCard = ({ icon: Icon, title, description, level }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="glass-panel p-6 space-y-4 cursor-pointer group"
  >
    <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center border border-brand-primary/20 group-hover:bg-brand-primary/20 transition-all">
      <Icon className="w-6 h-6 text-brand-primary" />
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">{level}</span>
        <div className="h-[1px] flex-1 bg-border-subtle" />
      </div>
      <h3 className="font-bold text-white group-hover:text-brand-primary transition-colors">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed mt-2">{description}</p>
    </div>
    <button className="text-[10px] font-bold text-slate-500 group-hover:text-white transition-colors flex items-center gap-2">
      START LESSON <Zap className="w-3 h-3" />
    </button>
  </motion.div>
);

export const Academy: React.FC = () => {
  return (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto">
      <div className="max-w-4xl space-y-4">
        <h2 className="text-3xl font-bold text-white tracking-tight">Trading Academy</h2>
        <p className="text-slate-400 leading-relaxed">
          Master the art of synthetic index trading. Our curriculum is designed to take you from 
          market basics to high-probability 'Synthetix Killer' strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LessonCard 
          icon={BookOpen}
          title="Synthetic Foundations"
          description="Understand how synthetic indices are generated and why they differ from traditional markets."
          level="Beginner"
        />
        <LessonCard 
          icon={BarChart3}
          title="Price Action Mastery"
          description="Learn to read the raw movement of price without relying on lagging indicators."
          level="Intermediate"
        />
        <LessonCard 
          icon={Target}
          title="The Killer Strategy"
          description="Our signature high-probability setup for Volatility and Crash/Boom indices."
          level="Advanced"
        />
        <LessonCard 
          icon={ShieldCheck}
          title="Risk Architecture"
          description="How to protect your capital and manage drawdowns like a professional hedge fund."
          level="Essential"
        />
        <LessonCard 
          icon={TrendingUp}
          title="Trend Continuation"
          description="Identifying and riding strong trends in high-volatility environments."
          level="Intermediate"
        />
        <LessonCard 
          icon={Zap}
          title="Scalping Synthetics"
          description="High-frequency trading techniques for 1-minute and 5-minute timeframes."
          level="Advanced"
        />
      </div>

      <div className="glass-panel p-8 bg-gradient-to-r from-brand-primary/10 to-transparent border-brand-primary/20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-white">Ready for the Pro Exam?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Complete all core modules to unlock the Pro Certification and gain access to 
              our exclusive institutional-grade trading algorithms.
            </p>
            <button className="px-6 py-3 bg-brand-primary text-bg-dark font-bold rounded-xl hover:opacity-90 transition-opacity">
              TAKE CERTIFICATION
            </button>
          </div>
          <div className="w-48 h-48 bg-bg-dark rounded-full border-4 border-brand-primary/20 flex items-center justify-center relative">
            <div className="absolute inset-0 border-4 border-brand-primary border-t-transparent rounded-full animate-spin duration-[3s]" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">65%</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
