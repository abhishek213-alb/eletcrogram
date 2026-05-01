import React, { useState } from 'react';
import { BrainCircuit, ArrowRightLeft, CheckCircle, Sparkles } from 'lucide-react';

const partyManifestos = {
  'BJP': {
    focus: 'Viksit Bharat, Infrastructure, Digital India',
    schemes: ['PM-Kisan', 'Ayushman Bharat', 'Gati Shakti'],
    promise: 'Building a developed nation by 2047 through infrastructure and digital transformation.'
  },
  'INC': {
    focus: 'Nyay, Social Justice, Unemployment',
    schemes: ['Mahalakshmi Scheme', 'Yuva Nyay', 'Caste Census'],
    promise: 'Ensuring economic justice and social security for the marginalized sections of society.'
  },
  'AAP': {
    focus: 'Education, Healthcare, Free Utilities',
    schemes: ['Mohalla Clinics', 'Free Electricity', 'School Excellence'],
    promise: 'Focusing on basic necessities and high-quality public services at no cost to citizens.'
  }
};

type PartyKey = keyof typeof partyManifestos;

export const ManifestoAnalyzer: React.FC = () => {
  const [partyA, setPartyA] = useState<PartyKey>('BJP');
  const [partyB, setPartyB] = useState<PartyKey>('INC');

  return (
    <section id="manifesto-analyzer" className="py-24 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <BrainCircuit size={300} />
      </div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-sm mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Analysis
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Manifesto Comparison Engine</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Compare key election promises and focus areas using our intelligent analyzer.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 justify-between bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
          {/* Party A Selection */}
          <div className="w-full lg:w-1/3 space-y-4">
            <label htmlFor="partyA-select" className="block text-sm font-bold text-slate-500 uppercase tracking-widest ml-2">Party One</label>
            <select 
              id="partyA-select"
              value={partyA} 
              onChange={(e) => setPartyA(e.target.value as PartyKey)}
              className="w-full bg-white border border-slate-200 rounded-2xl p-4 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            >
              {Object.keys(partyManifestos).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[200px]">
              <h4 className="font-black text-indigo-600 mb-2 uppercase text-xs">Core Focus</h4>
              <p className="text-slate-800 font-bold mb-4">{partyManifestos[partyA].focus}</p>
              <h4 className="font-black text-indigo-600 mb-2 uppercase text-xs">Key Promises</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{partyManifestos[partyA].promise}</p>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100">
              <ArrowRightLeft className="text-slate-400 h-6 w-6" />
            </div>
            <div className="h-24 w-0.5 bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>
          </div>

          {/* Party B Selection */}
          <div className="w-full lg:w-1/3 space-y-4">
            <label htmlFor="partyB-select" className="block text-sm font-bold text-slate-500 uppercase tracking-widest ml-2">Party Two</label>
            <select 
              id="partyB-select"
              value={partyB} 
              onChange={(e) => setPartyB(e.target.value as PartyKey)}
              className="w-full bg-white border border-slate-200 rounded-2xl p-4 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            >
              {Object.keys(partyManifestos).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[200px]">
              <h4 className="font-black text-indigo-600 mb-2 uppercase text-xs">Core Focus</h4>
              <p className="text-slate-800 font-bold mb-4">{partyManifestos[partyB].focus}</p>
              <h4 className="font-black text-indigo-600 mb-2 uppercase text-xs">Key Promises</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{partyManifestos[partyB].promise}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="text-green-400" />
              Comparative Advantage
            </h4>
            <ul className="space-y-4 text-indigo-100">
              <li className="flex gap-3">
                <span className="font-bold text-white">•</span>
                <span>Both parties prioritize economic growth but differ in **implementation strategies**.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-white">•</span>
                <span>The focus on **Direct Benefit Transfer** is a common theme across the board.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-white">•</span>
                <span>Difference in approach towards **centralization vs. decentralization** of power.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center">
            <p className="text-slate-400 text-sm italic mb-4">"Voting is not just a right, it's a responsibility to understand the vision of those who wish to lead."</p>
            <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-slate-100 transition-colors">
              Read Full Manifestos (PDF)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
