import React, { useState } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const parties = [
  { 
    id: 'p1', 
    name: 'Party A', 
    color: 'bg-orange-500',
    manifesto: {
      education: 'Free higher education for all citizens.',
      healthcare: 'Universal health coverage with 100% subsidy.',
      infrastructure: 'High-speed rail connecting all Tier-2 cities.',
      economy: '5% GDP growth target via digital exports.'
    }
  },
  { 
    id: 'p2', 
    name: 'Party B', 
    color: 'bg-blue-600',
    manifesto: {
      education: 'Focus on vocational training and skill centers.',
      healthcare: 'Private-public partnership in rural hospitals.',
      infrastructure: 'Expansion of expressways and smart villages.',
      economy: 'Tax incentives for manufacturing and MSMEs.'
    }
  }
];

const categories = ['education', 'healthcare', 'infrastructure', 'economy'];

export const ManifestoAnalyzer: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const startAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowAnalysis(true);
    }, 2000);
  };

  return (
    <section id="manifesto-analyzer" className="py-24 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="h-3 w-3" />
              Gemini AI Comparison
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Party <span className="text-indigo-600">Manifesto</span> Analyzer</h2>
            <p className="text-slate-500 mt-2 font-medium">Use AI to compare key policy promises across political parties side-by-side.</p>
          </div>
          <button 
            onClick={startAnalysis}
            disabled={analyzing}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-3"
          >
            {analyzing ? <Loader2 className="h-5 w-5 animate-spin" /> : <TrendingUp className="h-5 w-5" />}
            {analyzing ? 'AI Processing...' : 'Generate AI Comparison'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {parties.map((party) => (
            <div key={party.id} className={`rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 w-32 h-32 ${party.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity`}></div>
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${party.color}`}></div>
                {party.name} Key Promises
              </h3>
              
              <div className="space-y-6">
                {categories.map((cat) => (
                  <div key={cat} className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{cat}</div>
                    <p className="text-slate-700 font-bold leading-relaxed">{(party.manifesto as any)[cat]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {showAnalysis && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="h-8 w-8 text-indigo-400 opacity-30" />
              </div>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                AI Insight: Policy Impact Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-indigo-300 text-sm mb-2 uppercase tracking-widest">Sustainability</h4>
                  <p className="text-sm text-slate-400">Party A focuses on debt-driven public infrastructure, while Party B leans towards private capital efficiency.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-green-300 text-sm mb-2 uppercase tracking-widest">Job Creation</h4>
                  <p className="text-sm text-slate-400">AI predicts Party B's manufacturing focus may yield faster urban employment, whereas Party A's digital goal is long-term.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-orange-300 text-sm mb-2 uppercase tracking-widest">Social Equity</h4>
                  <p className="text-sm text-slate-400">Party A's healthcare model shows higher impact on marginalized demographics based on historical census data.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAnalysis(false)}
                className="mt-8 text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
              >
                Dismiss Analysis
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
