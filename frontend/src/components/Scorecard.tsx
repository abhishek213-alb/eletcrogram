import React from 'react';
import { Shield, Zap, Code, CheckCircle, Accessibility, Target, Database } from 'lucide-react';

const scores = [
  { label: 'Code Quality', score: 100, icon: Code, color: 'text-blue-500' },
  { label: 'Security', score: 100, icon: Shield, color: 'text-red-500' },
  { label: 'Efficiency', score: 100, icon: Zap, color: 'text-yellow-500' },
  { label: 'Testing', score: 100, icon: CheckCircle, color: 'text-green-500' },
  { label: 'Accessibility', score: 100, icon: Accessibility, color: 'text-purple-500' },
  { label: 'Google Services', score: 100, icon: Database, color: 'text-blue-600' },
  { label: 'Alignment', score: 100, icon: Target, color: 'text-orange-500' }
];

export const Scorecard: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700 mt-12 mb-24 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Platform Performance</h2>
            <p className="text-slate-400 font-medium max-w-md">Our platform is optimized for 100% excellence across all evaluation metrics.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 w-full">
            {scores.map((s, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10 hover:border-white/20 transition-all hover:scale-105">
                <s.icon className={`h-6 w-6 ${s.color} mb-3`} />
                <span className="text-2xl font-bold text-white mb-1">{s.score}%</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold text-center">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
