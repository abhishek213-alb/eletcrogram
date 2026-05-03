import React, { useState, useEffect } from 'react';
import { Activity, Users, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const ElectoralPulse: React.FC = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(Math.floor(Math.random() * 20) + 80);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const regions = [
    { name: 'North India', energy: 94, status: 'High' },
    { name: 'South India', energy: 88, status: 'Active' },
    { name: 'West India', energy: 91, status: 'Growing' },
    { name: 'East India', energy: 85, status: 'Active' },
    { name: 'North East', energy: 97, status: 'Surging' }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="pulse">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest mb-6 border border-red-100">
              <Activity className="h-3 w-3 animate-pulse" />
              Real-time Voter Energy
            </div>
            <h2 className="text-5xl font-black mb-6 tracking-tight text-slate-900">Electoral <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Pulse 2026</span></h2>
            <p className="text-slate-600 text-xl font-medium leading-relaxed mb-10">
              Our AI engine monitors social sentiment, search trends, and registration spikes to visualize the "Democratic Heatmap" of the nation.
            </p>

            <div className="space-y-6">
              {regions.map((region, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group hover:border-red-200 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-slate-800">{region.name}</span>
                    <span className="text-xs font-black uppercase text-red-600 bg-red-50 px-2 py-1 rounded-md">{region.status}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${region.energy}%` }}
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
              
              <div className="relative z-10 text-center py-20">
                <div className="inline-flex flex-col items-center gap-4">
                  <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 leading-none">
                    {pulse}
                  </div>
                  <div className="text-sm font-black uppercase tracking-[0.3em] text-red-500 flex items-center gap-2">
                    <Zap className="h-4 w-4 fill-current" />
                    Pulse Index
                  </div>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <Users className="h-6 w-6 text-blue-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold">12.4M</div>
                    <div className="text-[10px] uppercase font-black text-slate-500">Active Signals</div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold">+18%</div>
                    <div className="text-[10px] uppercase font-black text-slate-500">Hourly Spike</div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center gap-2">
                  <div className="w-12 h-1 bg-red-600 rounded-full animate-pulse"></div>
                  <div className="w-4 h-1 bg-white/20 rounded-full"></div>
                  <div className="w-4 h-1 bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
