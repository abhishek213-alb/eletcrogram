import React, { useState } from 'react';
import { Landmark, Users, ScrollText, Flag, CalendarDays, Vote } from 'lucide-react';

const parliamentData = [
  {
    name: 'Lok Sabha',
    alias: 'House of the People',
    seats: 543,
    term: '5 Years',
    election: 'Directly elected by citizens',
    color: 'from-green-500 to-emerald-700'
  },
  {
    name: 'Rajya Sabha',
    alias: 'Council of States',
    seats: 245,
    term: '6 Years (1/3 retire every 2 years)',
    election: 'Elected by State Legislatures',
    color: 'from-red-500 to-rose-700'
  }
];

const partiesData = [
  {
    name: 'Bharatiya Janata Party (BJP)',
    established: '1980',
    symbol: 'Lotus',
    founder: 'Atal Bihari Vajpayee & L.K. Advani',
    color: 'bg-orange-50 border-orange-200 text-orange-900',
    badge: 'bg-orange-100 text-orange-800'
  },
  {
    name: 'Indian National Congress (INC)',
    established: '1885',
    symbol: 'Hand',
    founder: 'Allan Octavian Hume',
    color: 'bg-sky-50 border-sky-200 text-sky-900',
    badge: 'bg-sky-100 text-sky-800'
  },
  {
    name: 'Aam Aadmi Party (AAP)',
    established: '2012',
    symbol: 'Broom',
    founder: 'Arvind Kejriwal',
    color: 'bg-blue-50 border-blue-200 text-blue-900',
    badge: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Bahujan Samaj Party (BSP)',
    established: '1984',
    symbol: 'Elephant',
    founder: 'Kanshi Ram',
    color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    badge: 'bg-indigo-100 text-indigo-800'
  },
  {
    name: 'Communist Party of India (Marxist)',
    established: '1964',
    symbol: 'Hammer, Sickle and Star',
    founder: 'E. M. S. Namboodiripad',
    color: 'bg-red-50 border-red-200 text-red-900',
    badge: 'bg-red-100 text-red-800'
  },
  {
    name: "National People's Party (NPP)",
    established: '2013',
    symbol: 'Book',
    founder: 'P. A. Sangma',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    badge: 'bg-yellow-100 text-yellow-800'
  }
];

export const Guides: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'parliament' | 'parties' | 'process'>('parliament');

  return (
    <section id="guides" className="relative overflow-hidden py-24 bg-gradient-to-br from-indigo-50/50 via-white to-orange-50/50">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl mb-6 shadow-inner border border-white">
            <ScrollText className="h-10 w-10 text-indigo-700" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 tracking-tight pb-2">
            Election Reference Guide
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            Explore the structure of the Indian Parliament and learn about the national political parties that shape the democracy.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveTab('parliament')}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === 'parliament' ? 'bg-[#000080] text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              <Landmark className="inline-block w-4 h-4 mr-2 -mt-0.5" />
              Parliament Seats
            </button>
            <button
              onClick={() => setActiveTab('parties')}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === 'parties' ? 'bg-[#FF9933] text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              <Flag className="inline-block w-4 h-4 mr-2 -mt-0.5" />
              National Parties
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === 'process' ? 'bg-[#138808] text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              <Vote className="inline-block w-4 h-4 mr-2 -mt-0.5" />
              EVM & Process
            </button>
          </div>
        </div>

        {/* Tab Content: Parliament */}
        {activeTab === 'parliament' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
            {parliamentData.map((house, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${house.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform duration-700`}></div>
                
                <h2 className="text-3xl font-black text-slate-900 mb-1">{house.name}</h2>
                <p className="text-slate-500 font-medium italic mb-8">{house.alias}</p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mr-4 shadow-sm border border-slate-100">
                      <Users className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Seats</p>
                      <p className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${house.color}`}>{house.seats}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mr-4 shadow-sm border border-slate-100">
                      <CalendarDays className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Term Length</p>
                      <p className="text-lg font-bold text-slate-800">{house.term}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mr-4 shadow-sm border border-slate-100">
                      <Vote className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Election Process</p>
                      <p className="text-lg font-bold text-slate-800">{house.election}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Parties */}
        {activeTab === 'parties' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {partiesData.map((party, idx) => (
              <div key={idx} className={`rounded-3xl p-6 shadow-md border ${party.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold leading-tight pr-4">{party.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${party.badge}`}>
                    Est. {party.established}
                  </span>
                </div>
                
                <div className="space-y-4 bg-white/50 p-4 rounded-2xl mt-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Election Symbol</p>
                    <p className="font-bold text-lg">{party.symbol}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Key Founders/Leaders</p>
                    <p className="font-medium text-sm">{party.founder}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Tab Content: EVM & Process */}
        {activeTab === 'process' && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-green-100 animate-fade-in-up">
            <h3 className="text-3xl font-black text-slate-900 mb-6 text-center">Inside the Polling Booth</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-xl font-bold text-green-900 mb-2">1. Verification</h4>
                <p className="text-slate-700">Present your EPIC (Voter ID) or other approved identity document to the First Polling Officer. They will verify your identity against the Electoral Roll.</p>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-xl font-bold text-green-900 mb-2">2. Inking & Signature</h4>
                <p className="text-slate-700">The Second Polling Officer will mark your left index finger with indelible ink, take your signature or thumb impression on the register, and issue a voter slip.</p>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-xl font-bold text-green-900 mb-2">3. Voting (EVM)</h4>
                <p className="text-slate-700">Hand the slip to the Third Polling Officer and proceed to the voting compartment. Press the blue button on the EVM next to your chosen candidate's symbol.</p>
              </div>
            </div>

            <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h4 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <Vote className="mr-2 text-[#138808]" />
                Understanding EVM & VVPAT
              </h4>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start">
                  <span className="font-bold text-indigo-700 mr-2">EVM:</span> 
                  Electronic Voting Machines consist of a Control Unit and a Balloting Unit. They are standalone, non-networked machines, ensuring total security against hacking.
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-700 mr-2">VVPAT:</span> 
                  Voter Verifiable Paper Audit Trail allows you to verify that your vote was cast correctly. After pressing the EVM button, a paper slip showing the candidate's serial number, name, and symbol will be visible behind the glass window for 7 seconds before falling into the sealed drop box.
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-700 mr-2">NOTA:</span> 
                  "None of the Above" is an option on the EVM if you do not wish to vote for any of the candidates.
                </li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
