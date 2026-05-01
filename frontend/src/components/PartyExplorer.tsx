import React from 'react';
import { ExternalLink, Info } from 'lucide-react';

const parties = [
  { 
    name: 'Bharatiya Janata Party', 
    symbol: '🪷', 
    color: 'from-orange-500 to-orange-600',
    description: 'The ruling party of India, focused on nationalist and development policies.',
    founded: '1980'
  },
  { 
    name: 'Indian National Congress', 
    symbol: '✋', 
    color: 'from-blue-500 to-blue-600',
    description: 'One of the oldest political parties in India, representing center-left ideologies.',
    founded: '1885'
  },
  { 
    name: 'Aam Aadmi Party', 
    symbol: '🧹', 
    color: 'from-blue-400 to-cyan-500',
    description: 'A party focused on anti-corruption and social welfare programs.',
    founded: '2012'
  },
  { 
    name: 'Communist Party of India (M)', 
    symbol: '⚒️', 
    color: 'from-red-600 to-red-700',
    description: 'A left-wing party based on Marxist-Leninist principles.',
    founded: '1964'
  }
];

export const PartyExplorer: React.FC = () => {
  return (
    <div className="py-24" id="parties">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-sm mb-4">
          <Info className="h-4 w-4" />
          Political Awareness
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Political Party Explorer</h2>
        <p className="text-slate-600 max-w-2xl text-lg font-medium">Learn about the major national parties and their historical contributions to Indian democracy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {parties.map((party, idx) => (
          <div key={idx} className="group relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${party.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`}></div>
            
            <div className="relative z-10">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block">{party.symbol}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{party.name}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{party.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Est. {party.founded}</span>
                <button className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
