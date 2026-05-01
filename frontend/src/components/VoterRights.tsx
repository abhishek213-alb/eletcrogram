import React from 'react';
import { Scale, Heart, Handshake, ShieldCheck } from 'lucide-react';

const rights = [
  {
    title: 'Right to Know',
    desc: 'You have the right to know about the background, assets, and criminal records (if any) of candidates in your constituency.',
    icon: Scale
  },
  {
    title: 'Secret Ballot',
    desc: 'The privacy of your vote is absolute. No one, including election officers, has the right to know whom you voted for.',
    icon: ShieldCheck
  },
  {
    title: 'Right to NOTA',
    desc: 'If you do not find any candidate suitable, you have the right to choose "None of the Above" (NOTA) on the EVM.',
    icon: Heart
  },
  {
    title: 'Assisted Voting',
    desc: 'Voters with disabilities or senior citizens have the right to priority access and assistance (companion) at the booth.',
    icon: Handshake
  }
];

export const VoterRights: React.FC = () => {
  return (
    <section id="rights" className="py-24" aria-labelledby="rights-heading">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="rights-heading" className="text-4xl font-extrabold text-slate-900 mb-4">Voter Rights & Responsibilities</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Every Indian citizen is empowered by constitutional rights to ensure a free and fair democratic process.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rights.map((right, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-50 hover:border-indigo-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <right.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{right.title}</h3>
              <p className="text-slate-600 leading-relaxed">{right.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
