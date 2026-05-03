import React, { useState } from 'react';
import { TrendingUp, MessageSquare, Brain, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const mockData = {
  sentiment: { positive: 45, neutral: 35, negative: 20 },
  topIssues: ['Inflation', 'Employment', 'Infrastructure', 'Healthcare'],
  engagement: 'High (82% active)'
};

export const SentimentAnalyzer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | typeof mockData>(null);

  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 2500);
  };

  return (
    <section className="py-24 bg-white rounded-[3rem] shadow-2xl border border-slate-100 mt-24 mb-12 overflow-hidden relative" id="sentiment-analysis">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest mb-4 border border-purple-100">
              <Brain className="h-3 w-3" />
              Constituency NLP Analysis
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Digital Pulse <span className="text-purple-600">Sentiment</span></h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed mb-10">
              AI-driven analysis of public sentiment and trending electoral issues in your constituency based on digital discourse and historical patterns.
            </p>
            <button 
              onClick={analyze}
              disabled={loading}
              className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-black shadow-xl hover:bg-purple-700 transition-all flex items-center gap-3"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <TrendingUp className="h-5 w-5" />}
              {loading ? 'Analyzing Pulse...' : 'Generate Sentiment Report'}
            </button>
          </div>

          <div className="md:w-1/2 w-full">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200 shadow-inner min-h-[400px] flex flex-col items-center justify-center">
              {!data && !loading && (
                <div className="text-center opacity-30">
                  <MessageSquare className="h-20 w-20 mx-auto mb-4" />
                  <p className="font-bold uppercase tracking-widest text-xs">Awaiting Constituency Data</p>
                </div>
              )}

              {loading && (
                <div className="text-center">
                  <div className="h-16 w-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-lg font-bold text-purple-600 animate-pulse">Aggregating Social Signals...</p>
                </div>
              )}

              {data && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="text-lg font-black text-slate-900">Sentiment Overview</h4>
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">{data.engagement} Engagement</span>
                  </div>

                  <div className="flex gap-2 h-12 mb-10 rounded-2xl overflow-hidden shadow-inner">
                    <div className="bg-green-500 flex-1 flex items-center justify-center text-[10px] font-black text-white" style={{ width: `${data.sentiment.positive}%` }}>{data.sentiment.positive}% POS</div>
                    <div className="bg-slate-300 flex-1 flex items-center justify-center text-[10px] font-black text-slate-600" style={{ width: `${data.sentiment.neutral}%` }}>{data.sentiment.neutral}% NEU</div>
                    <div className="bg-red-400 flex-1 flex items-center justify-center text-[10px] font-black text-white" style={{ width: `${data.sentiment.negative}%` }}>{data.sentiment.negative}% NEG</div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Sparkles className="h-3 w-3" /> Top Concerns Identified
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {data.topIssues.map((issue, idx) => (
                        <div key={idx} className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-700 shadow-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                          {issue}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
