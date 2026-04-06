import React, { useState, useRef } from 'react';
import { Upload, Target, Calculator, DollarSign, Percent, Activity, BrainCircuit, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

export const IndexAnalyzer: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [risk, setRisk] = useState<number>(1.0);
  const [indexName, setIndexName] = useState<string>("Dynamic 100");
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  const [slPoints, setSlPoints] = useState<number>(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeTrade = async () => {
    if (!imagePreview || !imageFile) return;
    
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const base64Data = imagePreview.split(',')[1];
      
      const prompt = `Act as a Senior Technical Analyst. I am looking for a high-probability entry on ${indexName}. Analyze the current market structure and provide an entry plan based on these steps:
- Multi-Timeframe Alignment: Check if the H4 trend matches the H1 and M15 momentum.
- Key Zones: Identify the nearest Order Block, Support/Resistance, or Supply/Demand zone.
- Indicator Confluence: Confirm if RSI is overbought/oversold and if there is any EMA crossover (20/50).
- Entry Signal: Look for specific candlestick patterns (Engulfing, Pin Bar, or Hammer) at the zone.
- Risk Management: Calculate a precise Entry Price, Stop Loss (below the last swing), and Take Profit (1:3 Risk/Reward).
If any of these factors are missing, flag the setup as 'Low Probability' and tell me what to wait for.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: {
          parts: [
            { text: prompt },
            { 
              inlineData: { 
                data: base64Data, 
                mimeType: imageFile.type 
              } 
            }
          ]
        }
      });
      
      setAnalysisResult(response.text || "No analysis generated.");
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysisResult("Failed to analyze the chart. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const riskAmount = balance * (risk / 100);
  const lotSize = slPoints > 0 ? (riskAmount / slPoints).toFixed(4) : "0.0000";

  return (
    <div className="flex flex-col h-full bg-bg-dark">
      {/* Top Toolbar */}
      <div className="h-16 border-b border-border-subtle bg-bg-card/50 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center border border-brand-primary/20">
              <Target className="w-4 h-4 text-brand-primary" />
            </div>
            <h2 className="font-bold text-white tracking-tight hidden md:block">Analyzer</h2>
          </div>
          
          <div className="h-6 w-[1px] bg-border-subtle hidden md:block" />
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-bg-dark px-3 py-1.5 rounded-lg border border-border-subtle focus-within:border-brand-primary/50 transition-colors">
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text" 
                value={indexName}
                onChange={(e) => setIndexName(e.target.value)}
                className="bg-transparent border-none text-sm text-white focus:outline-none w-28 font-medium"
                placeholder="Index Name"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-bg-dark px-3 py-1.5 rounded-lg border border-border-subtle focus-within:border-brand-primary/50 transition-colors">
              <DollarSign className="w-3.5 h-3.5 text-slate-500" />
              <input 
                type="number" 
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="bg-transparent border-none text-sm text-white focus:outline-none w-20 font-mono"
                placeholder="Balance"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-bg-dark px-3 py-1.5 rounded-lg border border-border-subtle focus-within:border-brand-primary/50 transition-colors">
              <Percent className="w-3.5 h-3.5 text-slate-500" />
              <input 
                type="number" 
                step="0.1"
                value={risk}
                onChange={(e) => setRisk(Number(e.target.value))}
                className="bg-transparent border-none text-sm text-white focus:outline-none w-14 font-mono"
                placeholder="Risk"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={analyzeTrade}
          disabled={!imagePreview || isAnalyzing}
          className="px-6 py-2 bg-brand-primary text-bg-dark font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(0,255,157,0.2)]"
        >
          {isAnalyzing ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /> ANALYZING...</>
          ) : (
            <><BrainCircuit className="w-4 h-4" /> ANALYZE TRADE</>
          )}
        </button>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chart Area */}
        <div className="flex-1 p-6 flex flex-col bg-bg-dark overflow-y-auto relative">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/png, image/jpeg, image/jpg" 
            className="hidden" 
          />
          
          {imagePreview ? (
            <div className="flex-1 relative group rounded-xl overflow-hidden border border-border-subtle bg-bg-card flex items-center justify-center">
              <img src={imagePreview} alt="Chart Preview" className="max-w-full max-h-full object-contain" />
              <div className="absolute inset-0 bg-bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" /> REPLACE CHART
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 border-2 border-dashed border-border-subtle rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all group"
            >
              <div className="w-16 h-16 bg-bg-card rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl border border-border-subtle group-hover:border-brand-primary/30">
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-brand-primary transition-colors" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-1">Upload MT5 Screenshot</h3>
                <p className="text-sm text-slate-500">Drag and drop or click to browse (PNG, JPG)</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Analysis & Calculator */}
        <div className="w-[450px] border-l border-border-subtle flex flex-col bg-bg-card/30 shrink-0">
          <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-bg-card/50 shrink-0">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-brand-primary" /> AI Analysis Results
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {isAnalyzing ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-400">
                <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                <p className="font-mono text-sm animate-pulse text-center">Analyzing market structure<br/>and key zones...</p>
              </div>
            ) : analysisResult ? (
              <div className="markdown-body prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{analysisResult}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-slate-500 text-center">
                <Target className="w-12 h-12 opacity-20" />
                <p className="text-sm">Upload a chart and click Analyze Trade to generate a high-probability entry plan.</p>
              </div>
            )}
          </div>

          {/* Lot Size Calculator */}
          <div className="p-6 border-t border-border-subtle bg-bg-card/80 shrink-0">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-4">
              <Calculator className="w-4 h-4 text-brand-primary" /> Lot Size Calculator
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-bg-dark p-3 rounded-lg border border-border-subtle focus-within:border-brand-primary/50 transition-colors">
                <span className="text-xs text-slate-400 font-bold uppercase">Stop Loss Points</span>
                <input 
                  type="number" 
                  value={slPoints || ''}
                  onChange={(e) => setSlPoints(Number(e.target.value))}
                  placeholder="e.g., 250"
                  className="bg-transparent border-none text-right text-white focus:outline-none w-24 font-mono font-bold"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-dark p-3 rounded-lg border border-border-subtle">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Risk Amount</span>
                  <span className="text-lg font-mono text-brand-secondary font-bold">${riskAmount.toFixed(2)}</span>
                </div>
                <div className="bg-brand-primary/10 p-3 rounded-lg border border-brand-primary/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/10 rounded-full blur-xl -mr-8 -mt-8" />
                  <span className="text-[10px] text-brand-primary/70 uppercase font-bold tracking-widest block mb-1 relative z-10">Lot Size</span>
                  <span className="text-lg font-mono text-brand-primary font-bold relative z-10">{lotSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

