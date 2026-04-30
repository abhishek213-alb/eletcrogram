import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronRight, XCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

interface Scenario {
  id: string;
  title: string;
  description: string;
  options: { text: string; correct: boolean; explanation: string }[];
}

const mockScenarios: Scenario[] = [
  {
    id: 's1',
    title: 'Missing Name on Slip',
    description: 'You arrive at the polling booth, but the officer says your name is not on the voter slip provided by the political party outside. What do you do?',
    options: [
      { text: 'Go back home without voting.', correct: false, explanation: 'The party slip is not official. You must check the official Electoral Roll inside the booth.' },
      { text: 'Check the official Electoral Roll with the Presiding Officer.', correct: true, explanation: 'Correct! The official Electoral Roll is the only valid document to verify your eligibility.' }
    ]
  },
  {
    id: 's2',
    title: 'EVM Machine Malfunction',
    description: 'After pressing the button on the EVM, you do not hear a beep and the VVPAT slip does not show your candidate. What is the immediate next step?',
    options: [
      { text: 'Immediately alert the Presiding Officer before leaving the compartment.', correct: true, explanation: 'Correct! Under Rule 49MA, you can report a VVPAT mismatch immediately to the Presiding Officer.' },
      { text: 'Press another button to see if it works.', correct: false, explanation: 'Never press multiple buttons. Alert the officer immediately.' }
    ]
  }
];

export const Scenarios: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const userId = 'guest_user';

  const handleSelect = async (optionIndex: number, isCorrect: boolean) => {
    setSelectedOption(optionIndex);
    
    if (isCorrect) {
      try {
        await axios.post(`${API_URL}/journey/${userId}/scenario`, {
          scenarioId: mockScenarios[activeScenario].id,
          passed: true
        });
      } catch (err) {
        console.error('Failed to save scenario progress', err);
      }
    }
  };

  const nextScenario = () => {
    if (activeScenario < mockScenarios.length - 1) {
      setActiveScenario(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 mt-8 text-center" id="scenarios">
        <CheckCircle className="h-16 w-16 text-[#138808] mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Simulation Complete!</h2>
        <p className="text-slate-600 mb-6">You are now fully prepared for unexpected situations at the polling booth.</p>
        <button 
          onClick={() => { setActiveScenario(0); setCompleted(false); setSelectedOption(null); }}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition"
        >
          Restart Simulation
        </button>
      </div>
    );
  }

  const scenario = mockScenarios[activeScenario];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl shadow-2xl p-8 text-white mt-8" id="scenarios">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="text-[#FF9933]" />
        <h2 className="text-3xl font-bold">Interactive Scenario Simulation</h2>
      </div>
      
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
        <h3 className="text-xl font-bold mb-2">Scenario {activeScenario + 1}: {scenario.title}</h3>
        <p className="text-slate-200 text-lg">{scenario.description}</p>
      </div>

      <div className="space-y-4">
        {scenario.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-300 font-medium ";
          
          if (selectedOption === null) {
            btnClass += "bg-white/5 border-white/10 hover:bg-white/20";
          } else if (isSelected) {
            btnClass += opt.correct ? "bg-green-500/20 border-green-500 text-green-100" : "bg-red-500/20 border-red-500 text-red-100";
          } else {
            btnClass += "opacity-50 cursor-not-allowed bg-white/5 border-white/10";
          }

          return (
            <div key={idx}>
              <button 
                disabled={selectedOption !== null}
                onClick={() => handleSelect(idx, opt.correct)}
                className={btnClass}
              >
                {opt.text}
              </button>
              {isSelected && (
                <div className={`mt-2 p-3 rounded-lg text-sm ${opt.correct ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                  {opt.correct ? <CheckCircle className="inline h-4 w-4 mr-1" /> : <XCircle className="inline h-4 w-4 mr-1" />}
                  {opt.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className="mt-8 flex justify-end">
          <button 
            onClick={nextScenario}
            className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 rounded-full font-bold hover:bg-slate-100 transition shadow-lg"
          >
            {activeScenario < mockScenarios.length - 1 ? 'Next Scenario' : 'Finish Simulation'}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};
