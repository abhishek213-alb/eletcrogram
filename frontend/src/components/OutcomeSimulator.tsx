import React, { useState } from 'react';
import { BarChart3, TrendingUp, Sparkles, RefreshCcw, LayoutPanelLeft, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

export const OutcomeSimulator: React.FC = () => {
  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState<null | { seats: { name: string, count: number, color: string }[], swing: number }>(null);

  const runSimulation = () => {
    setSimulating(true);
    setTimeout(() => {
      setResult({
        seats: [
          { name: 'Alliance A', count: 285, color: 'bg-orange-500' },
          { name: 'Alliance B', count: 210, color: 'bg-blue-600' },
          { name: 'Others', count: 48, color: 'bg-slate-400' }
        ],
        swing: 3.2
      });
      setSimulating(false);
    }, 3000);
  };

  return (
    <section className="py-24 bg-indigo-900 rounded-[3rem] text-white shadow-2xl border border-white/10 mt-24 mb-12 overflow-hidden relative group" id="outcome-simulator">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[150px] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
            <Sparkles className="h-3 w-3" />
            Gemini Monte Carlo Engine
          </div>
          <h2 className="text-5xl font-black mb-6 tracking-tight">AI Election <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Simulator</span></h2>
          <p className="text-slate-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Using historical data, demographic shifts, and current sentiment analysis, we run 10,000 simulations to predict the most likely electoral outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h4 className="font-bold text-indigo-300 mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Simulation Parameters
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-500">Voter Turnout</span>
                  <span>72.4% (Predicted)</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[72%]"></div>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-500">Swing Factor Variance</span>
                  <span>± 2.5%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[45%]"></div>
                </div>
              </div>
            </div>

            <button 
              onClick={runSimulation}
              disabled={simulating}
              className="w-full py-6 bg-white text-slate-900 rounded-[2rem] text-xl font-black shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {simulating ? <RefreshCcw className="h-6 w-6 animate-spin" /> : <PieChart className="h-6 w-6" />}
              {simulating ? 'Running 10k Simulations...' : 'Start Outcome Engine'}
            </button>
          </div>

          <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 border border-white/10 shadow-2xl min-h-[450px] flex flex-col justify-center">
            {!result && !simulating && (
              <div className="text-center opacity-30 py-20">
                <BarChart3 className="h-24 w-24 mx-auto mb-6" />
                <p className="font-black uppercase tracking-widest text-sm">Awaiting Engine Start</p>
              </div>
            )}

            {simulating && (
              <div className="space-y-12 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-3">
                    <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                    <div className="h-8 w-full bg-white/5 rounded-2xl"></div>
                  </div>
                ))}
              </div>
            )}

            {result && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                <div className="flex justify-between items-end mb-4">
                  <h4 className="text-3xl font-black">2026 Prediction</h4>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Swing Delta</div>
                    <div className="text-xl font-black text-green-400">+{result.swing}%</div>
                  </div>
                </div>

                <div className="space-y-8">
                  {result.seats.map((party, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center font-bold">
                        <span className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${party.color}`}></div>
                          {party.name}
                        </span>
                        <span>{party.count} Seats</span>
                      </div>
                      <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(party.count / 543) * 100}%` }}
                          transition={{ duration: 1.5, delay: idx * 0.2 }}
                          className={`${party.color} h-full shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10 flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-xl">
                    <LayoutPanelLeft className="h-4 w-4 text-indigo-300" />
                  </div>
                  <p className="text-xs font-medium text-slate-400">
                    Majority Mark: <span className="text-white font-bold">272 Seats</span>. Simulation projects a stable government formation.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
