import React, { useState } from 'react';
import { BarChart, Brain, RefreshCcw, Sparkles, TrendingUp, Users } from 'lucide-react';

export const VoterTurnoutPredictor: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { turnout: number, confidence: number, drivers: string[] }>(null);

  const runAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    
    // Simulate Gemini AI Analysis
    setTimeout(() => {
      setResult({
        turnout: 72.4,
        confidence: 94.8,
        drivers: [
          'High youth registration in urban clusters',
          'Increased digital literacy in rural districts',
          'Intense competition in key swing constituencies'
        ]
      });
      setAnalyzing(false);
    }, 2500);
  };

  return (
    <section className="py-24 bg-slate-900 rounded-[3rem] text-white shadow-2xl border border-slate-700 mt-24 mb-12 overflow-hidden relative group">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/30">
              <Sparkles className="h-3 w-3" />
              AI Predictive Engine
            </div>
            <h2 className="text-5xl font-black mb-6 tracking-tight">Voter Turnout <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Insight</span></h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
              Using Gemini AI and historical electoral data, we analyze current trends to predict participation levels across different demographics.
            </p>
            
            <button 
              onClick={runAnalysis}
              disabled={analyzing}
              className="px-8 py-4 bg-white text-slate-900 rounded-2xl text-lg font-black shadow-xl hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {analyzing ? <RefreshCcw className="h-6 w-6 animate-spin" /> : <Brain className="h-6 w-6" />}
              {analyzing ? 'Analyzing Data...' : 'Run Prediction Engine'}
            </button>
          </div>

          <div className="md:w-1/2 w-full">
            <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl min-h-[400px] flex flex-col items-center justify-center text-center">
              {!result && !analyzing && (
                <div className="opacity-40 flex flex-col items-center">
                  <BarChart className="h-20 w-20 mb-6" />
                  <p className="font-bold uppercase tracking-widest text-sm">Ready to analyze 2026 data</p>
                </div>
              )}

              {analyzing && (
                <div className="flex flex-col items-center">
                  <div className="relative h-24 w-24 mb-8">
                    <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-xl font-bold animate-pulse text-blue-400">Processing Demographic Patterns...</p>
                </div>
              )}

              {result && (
                <div className="w-full animate-fade-in">
                  <div className="flex justify-between items-end mb-12">
                    <div className="text-left">
                      <div className="text-5xl md:text-7xl font-black text-white">{result.turnout}%</div>
                      <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mt-2">Predicted Turnout</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-green-400">{result.confidence}%</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Confidence Score</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-left mb-2 flex items-center gap-2">
                      <TrendingUp className="h-3 w-3" />
                      Key Drivers Identified
                    </div>
                    {result.drivers.map((driver, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 text-left text-sm font-medium">
                        <Users className="h-4 w-4 text-purple-400" />
                        {driver}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
