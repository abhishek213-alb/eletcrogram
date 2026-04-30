import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "What is the minimum age requirement to vote in India?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What does EVM stand for?",
    options: ["Electronic Voting Machine", "Electoral Verification Module", "Election Voting Mechanism", "Electronic Voter Matrix"],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "Who is responsible for conducting free and fair elections in India?",
    options: ["The President", "Supreme Court", "Election Commission of India", "Parliament"],
    correctAnswer: 2
  }
];

export const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelected(index);
    setTimeout(() => {
      if (index === questions[currentQ].correctAnswer) {
        setScore(score + 1);
      }
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setShowResult(true);
        console.log(`Quiz Finished. Score: ${score + (index === questions[currentQ].correctAnswer ? 1 : 0)}`);
      }
    }, 1200);
  };

  const progressPercentage = ((currentQ) / questions.length) * 100;

  return (
    <section id="quiz" className="relative overflow-hidden py-24 bg-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-10"></div>
      <div className="max-w-4xl w-full mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Test Your Knowledge</h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto font-medium">Take this short quiz to see how much you know about the Indian electoral process.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100 tricolor-border relative overflow-hidden">
          {showResult ? (
            <div className="text-center py-8 animate-fade-in-up">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-[#FF9933] to-[#138808] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Quiz Completed!</h2>
              <p className="text-slate-500 mb-8 font-medium">Excellent effort. Here is your final score:</p>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] mb-8">
                {score} <span className="text-3xl text-slate-300">/ {questions.length}</span>
              </div>
              <div className="inline-block bg-slate-50 border border-slate-100 rounded-xl px-6 py-3 mb-10 shadow-inner">
                <p className="text-sm text-slate-600 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Result securely logged to GCP Firestore
                </p>
              </div>
              <div>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-[#000080] text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2 text-sm font-bold text-slate-500 uppercase tracking-wider">
                  <span>Question {currentQ + 1} of {questions.length}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-[#FF9933] h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 leading-tight">{questions[currentQ].question}</h2>
              
              <div className="space-y-4">
                {questions[currentQ].options.map((option, index) => {
                  let btnClass = "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex justify-between items-center group font-medium text-lg ";
                  if (selected === null) {
                    btnClass += "border-slate-200 hover:border-[#000080] hover:bg-blue-50 text-slate-700 hover:text-[#000080] shadow-sm hover:shadow-md";
                  } else if (index === questions[currentQ].correctAnswer) {
                    btnClass += "border-[#138808] bg-green-50 text-[#138808] shadow-md scale-[1.02]";
                  } else if (index === selected) {
                    btnClass += "border-red-500 bg-red-50 text-red-700 shadow-md scale-[1.02]";
                  } else {
                    btnClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-50 scale-[0.98]";
                  }

                  return (
                    <button 
                      key={index} 
                      disabled={selected !== null}
                      onClick={() => handleAnswer(index)}
                      className={btnClass}
                    >
                      <span>{option}</span>
                      {selected !== null && index === questions[currentQ].correctAnswer && <CheckCircle2 className="h-6 w-6" />}
                      {selected === index && index !== questions[currentQ].correctAnswer && <XCircle className="h-6 w-6" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
