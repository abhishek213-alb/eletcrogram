import React, { useState } from 'react';
import { Search, MapPin, User, Landmark, Info } from 'lucide-react';

const mockConstituencies = [
  { id: '1', name: 'Lucknow', state: 'Uttar Pradesh', mp: 'Rajnath Singh', party: 'BJP', population: '2.8M' },
  { id: '2', name: 'Mumbai South', state: 'Maharashtra', mp: 'Arvind Sawant', party: 'Shiv Sena', population: '1.2M' },
  { id: '3', name: 'Chennai Central', state: 'Tamil Nadu', mp: 'Dayanidhi Maran', party: 'DMK', population: '1.5M' },
  { id: '4', name: 'New Delhi', state: 'Delhi', mp: 'Bansuri Swaraj', party: 'BJP', population: '1.4M' }
];

export const ConstituencyExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(mockConstituencies[0]);

  const filtered = mockConstituencies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="constituency-explorer" className="py-24 bg-slate-900 rounded-[3rem] text-white p-8 md:p-16 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-4xl font-extrabold mb-4">Constituency Explorer</h2>
            <p className="text-slate-400 text-lg">Search for your constituency to learn about your representative and local voting demographics.</p>
          </div>
          
          <div className="w-full max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input 
              type="text"
              placeholder="Search constituency (e.g. Lucknow)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {searchTerm && filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl z-50 overflow-hidden">
                {filtered.map(c => (
                  <button 
                    key={c.id}
                    onClick={() => { setSelected(c); setSearchTerm(''); }}
                    className="w-full text-left px-6 py-3 hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-0"
                  >
                    {c.name}, {c.state}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-blue-500/20 rounded-2xl">
                <Landmark className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">{selected.name}</h3>
                <p className="text-slate-400">{selected.state}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                  <User className="h-4 w-4" />
                  <span className="text-xs uppercase font-bold tracking-widest">Current MP</span>
                </div>
                <p className="text-xl font-bold">{selected.mp}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">{selected.party}</span>
              </div>
              
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs uppercase font-bold tracking-widest">Electoral Strength</span>
                </div>
                <p className="text-xl font-bold">{selected.population} Voters</p>
                <div className="mt-4 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-green-500 h-full w-[85%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 shadow-xl">
            <div className="bg-white/20 rounded-2xl p-4 mb-6">
              <Info className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-4">Did you know?</h4>
            <p className="text-blue-100 leading-relaxed mb-6">Your representative is accountable to you. You can check their attendance, parliamentary questions, and debate participation on the PRSLegislative website.</p>
            <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              View Detailed Analytics
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
