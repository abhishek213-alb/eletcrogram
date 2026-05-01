import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export const FactCheck: React.FC = () => {
  const facts = [
    {
      myth: "EVMs can be hacked via Bluetooth or Wi-Fi.",
      fact: "EVMs are stand-alone machines with no wireless communication capability (No Bluetooth/Wi-Fi/Internet).",
      status: 'myth'
    },
    {
      myth: "VVPAT slips are counted for all booths.",
      fact: "VVPAT slips are mandatory for all booths, but physical counting is done for 5 randomly selected booths per assembly segment.",
      status: 'fact'
    },
    {
      myth: "Only Voter ID is allowed for voting.",
      fact: "You can vote using any of the 12 approved ID documents (Aadhaar, PAN, DL, etc.) if your name is in the Electoral Roll.",
      status: 'myth'
    },
    {
      myth: "If NOTA wins, the election is canceled.",
      fact: "Currently in India, even if NOTA gets the most votes, the candidate with the next highest votes is declared the winner.",
      status: 'myth'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-700 mt-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
          <ShieldAlert className="text-red-600 dark:text-red-400 h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Fact vs. Myth</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Busting common electoral misinformation with verified facts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facts.map((item, index) => (
          <div key={index} className="group p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-900 transition-all bg-slate-50/50 dark:bg-slate-900/30">
            <div className="flex items-start gap-4 mb-4">
              <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-slate-800 dark:text-slate-200 font-bold italic line-through decoration-red-500/30">{item.myth}</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700 dark:text-slate-300 font-medium">{item.fact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
