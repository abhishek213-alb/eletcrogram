import React, { useState } from 'react';
import { Vote, Power, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const EVMSimulator: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const steps = [
    { title: 'Activation', desc: 'The Presiding Officer activates the EVM for your vote.', icon: Power },
    { title: 'Selection', desc: 'Choose your candidate by pressing the blue button.', icon: Vote },
    { title: 'Verification', desc: 'Check the VVPAT slip for 7 seconds.', icon: ShieldCheck },
    { title: 'Confirmation', desc: 'A long beep confirms your vote is cast.', icon: CheckCircle2 }
  ];

  return (
    <section id="evm-simulator" className="py-24 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50"></div>
      
      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Interactive EVM Simulator</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Experience the secure voting process of an Indian Polling Booth in 4 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          {steps.map((s, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border transition-all duration-500 ${step >= idx ? 'bg-blue-600/20 border-blue-500' : 'bg-white/5 border-white/10 opacity-40'}`}>
              <s.icon className={`h-8 w-8 mb-4 ${step >= idx ? 'text-blue-400' : 'text-slate-500'}`} />
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-[2rem] p-8 border border-slate-700 shadow-2xl max-w-2xl mx-auto">
          {step === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                <Power className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4">EVM Ready</h4>
              <button 
                onClick={() => setStep(1)}
                className="px-8 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Proceed to Vote
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold mb-6 text-center">Press the blue button next to your candidate</h4>
              {['Candidate A', 'Candidate B', 'Candidate C', 'NOTA'].map((c) => (
                <button 
                  key={c}
                  onClick={() => { setSelectedCandidate(c); setStep(2); }}
                  className="w-full flex items-center justify-between p-4 bg-slate-700 rounded-xl border border-slate-600 hover:border-blue-500 hover:bg-slate-600 transition group"
                >
                  <span className="font-bold">{c}</span>
                  <div className="w-8 h-8 bg-blue-600 rounded-md shadow-[0_0_10px_rgba(59,130,246,0.3)] group-active:scale-90 transition-transform"></div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5 animate-pulse">
              <div className="w-24 h-32 bg-slate-300 rounded-md mx-auto mb-6 flex flex-col items-center justify-center text-slate-900 p-2 border-4 border-slate-400">
                <div className="text-[10px] font-bold uppercase mb-1 border-b border-slate-900 w-full text-center">VVPAT SLIP</div>
                <div className="text-xs font-black">{selectedCandidate}</div>
                <div className="text-[8px] mt-2">SYMBOL PROOF</div>
              </div>
              <p className="text-blue-400 font-bold mb-2">Verifying VVPAT...</p>
              <p className="text-xs text-slate-500">Wait for 7 seconds to confirm your selection</p>
              {setTimeout(() => setStep(3), 3000) && null}
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-2 text-green-400 font-mono tracking-tighter uppercase">BEEP!</h4>
              <p className="text-slate-400 mb-8">Vote Successfully Recorded</p>
              <button 
                onClick={() => { setStep(0); setSelectedCandidate(null); }}
                className="text-sm font-bold text-blue-400 hover:underline"
              >
                Reset Simulation
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
