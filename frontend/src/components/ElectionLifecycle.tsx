import React, { useState } from 'react';
import { Calendar, UserCheck, Megaphone, Vote, BarChart3, Trophy, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    id: 'notification',
    title: 'Election Notification',
    icon: Calendar,
    color: 'bg-orange-500',
    description: 'The President or Governor issues the notification. The Model Code of Conduct (MCC) immediately comes into effect.',
    details: [
      'Official schedule announced by ECI',
      'Filing of nominations begins',
      'Electoral roll finalized'
    ]
  },
  {
    id: 'nomination',
    title: 'Nominations & Scrutiny',
    icon: UserCheck,
    color: 'bg-blue-500',
    description: 'Candidates file their nomination papers and affidavits. ECI officers scrutinize the validity of these papers.',
    details: [
      'Security deposit payment',
      'Affidavits on assets/criminal record',
      'Withdrawal of candidature period'
    ]
  },
  {
    id: 'campaign',
    title: 'Campaigning Phase',
    icon: Megaphone,
    color: 'bg-purple-500',
    description: 'Political parties and candidates reach out to voters. Campaigns must stop 48 hours before the polling ends.',
    details: [
      'Public meetings and rallies',
      'Manifesto releases',
      'Strict monitoring of election expenditure'
    ]
  },
  {
    id: 'polling',
    title: 'Polling Day',
    icon: Vote,
    color: 'bg-green-600',
    description: 'The most critical day where citizens cast their votes using Electronic Voting Machines (EVMs).',
    details: [
      'Voter identity verification',
      'Inking of the finger',
      'VVPAT verification of the vote'
    ]
  },
  {
    id: 'counting',
    title: 'Counting of Votes',
    icon: BarChart3,
    color: 'bg-indigo-600',
    description: 'EVMs are brought from strong rooms. Votes are counted in multiple rounds under high security.',
    details: [
      'Round-by-round EVM data extraction',
      'VVPAT slip matching for 5 random booths per constituency',
      'Candidate agents verification at every table',
      'Real-time data entry into the ENCORE portal',
      'Postal ballot counting under strict CCTV surveillance'
    ]
  },
  {
    id: 'results',
    title: 'Declaration of Results',
    icon: Trophy,
    color: 'bg-yellow-600',
    description: 'The Returning Officer declares the winner and issues the Certificate of Election.',
    details: [
      'Official gazette notification',
      'Formation of the new house',
      'MCC ends'
    ]
  }
];

export const ElectionLifecycle: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative" id="lifecycle">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100 rounded-full -ml-32 -mb-32 opacity-50 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Democratic Journey</h2>
          <p className="text-slate-500 mt-4 text-xl font-medium">Follow the step-by-step lifecycle of the world's largest election process.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Progress Timeline (Left Side on Desktop) */}
          <div className="lg:col-span-4 space-y-4">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border ${
                  activeStep === idx 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105' 
                    : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeStep === idx ? 'bg-white/20' : 'bg-slate-100'}`}>
                  <step.icon className={`h-5 w-5 ${activeStep === idx ? 'text-white' : 'text-slate-500'}`} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold uppercase tracking-widest opacity-60">Step {idx + 1}</div>
                  <div className="font-bold">{step.title}</div>
                </div>
                {activeStep === idx && <ChevronRight className="ml-auto h-5 w-5" />}
              </button>
            ))}
          </div>

          {/* Active Step Content (Right Side) */}
          <div className="lg:col-span-8 bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-inner relative min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-1"
              >
                <div className={`inline-flex p-5 rounded-[2rem] ${steps[activeStep].color} text-white mb-8 shadow-2xl ring-4 ring-white/20 animate-bounce-subtle`}>
                  {(() => {
                    const StepIcon = steps[activeStep].icon;
                    return <StepIcon className="h-14 w-14" />;
                  })()}
                </div>
                
                <h3 className="text-4xl font-black text-slate-900 mb-6">{steps[activeStep].title}</h3>
                <p className="text-xl text-slate-600 leading-relaxed mb-10">
                  {steps[activeStep].description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {steps[activeStep].details.map((detail, dIdx) => (
                    <div key={dIdx} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
                      <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                      <span className="font-bold text-slate-700">{detail}</span>
                    </div>
                  ))}
                </div>

                {activeStep === 4 && (
                  <div className="mt-8 p-6 bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl animate-pulse-slow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Live Simulation</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">Table #14 - Round 7</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">EVM Verification</span>
                        <span className="text-xs font-bold text-green-400">Success</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-[85%]"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">VVPAT Synchronization</span>
                        <span className="text-xs font-bold text-blue-400">Syncing...</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[62%] animate-progress"></div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-200">
              <button 
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="flex items-center gap-2 font-bold text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-5 w-5" /> Previous
              </button>
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${activeStep === i ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`}></div>
                ))}
              </div>
              <button 
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={activeStep === steps.length - 1}
                className="flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next Step <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
