import React, { useState } from 'react';
import { RefreshCw, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const flashcardsData = [
  { term: "EVM", definition: "Electronic Voting Machine. Used in Indian elections to record and tally votes securely." },
  { term: "VVPAT", definition: "Voter Verifiable Paper Audit Trail. Provides feedback to voters using a slip of paper to verify their vote." },
  { term: "NOTA", definition: "None Of The Above. A ballot option allowing voters to indicate disapproval of all candidates." },
  { term: "MCC", definition: "Model Code of Conduct. Guidelines issued by the Election Commission to regulate political parties and candidates prior to elections." },
  { term: "EPIC", definition: "Electors Photo Identity Card. Commonly known as the Voter ID card." }
];

export const Flashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
    }, 200);
  };

  return (
    <section id="flashcards" className="relative overflow-hidden py-24 bg-slate-50">
      {/* Decorative background */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FF9933] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#138808] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
      
      <div className="max-w-4xl w-full mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-2xl mb-4">
            <BookOpen className="h-8 w-8 text-[#138808]" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Election Glossary</h2>
          <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto">Master the vocabulary of the world's largest democracy. Tap the card to reveal the definition.</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center perspective-1000">
          
          {/* Progress Indicators */}
          <div className="flex gap-2 mb-8">
            {flashcardsData.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[#000080]' : 'w-2 bg-slate-300'}`}
              ></div>
            ))}
          </div>

          <div 
            className={`relative w-full max-w-lg aspect-[4/3] transition-transform duration-700 transform-style-3d cursor-pointer shadow-2xl rounded-3xl hover:scale-105 ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsFlipped(!isFlipped); }}
            role="button"
            tabIndex={0}
            aria-label="Election glossary card, tap to flip"
          >
            {/* Front of Card */}
            <div className="absolute w-full h-full backface-hidden bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center p-10 group">
              <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-t-3xl opacity-50"></div>
              <span className="text-sm font-bold text-[#FF9933] uppercase tracking-[0.2em] mb-6">Term</span>
              <h2 className="text-6xl font-black text-slate-900 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">{flashcardsData[currentIndex].term}</h2>
              <div className="absolute bottom-8 text-slate-400 flex items-center text-sm font-medium group-hover:text-[#000080] transition-colors">
                <RefreshCw className="h-4 w-4 mr-2 group-hover:animate-spin" /> Tap to flip
              </div>
            </div>

            {/* Back of Card */}
            <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-[#000080] to-blue-900 text-white rounded-3xl flex flex-col items-center justify-center p-10 rotate-y-180 shadow-inner border border-blue-800">
              <span className="text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-6">Definition</span>
              <p className="text-2xl text-center leading-relaxed font-medium">{flashcardsData[currentIndex].definition}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-12">
            <button 
              onClick={handlePrev}
              className="p-4 rounded-full bg-white shadow-lg text-slate-700 hover:text-[#000080] hover:scale-110 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2 border border-slate-100"
              aria-label="Previous card"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-slate-500 font-bold tracking-widest bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100">
              {currentIndex + 1} / {flashcardsData.length}
            </span>
            <button 
              onClick={handleNext}
              className="p-4 rounded-full bg-white shadow-lg text-slate-700 hover:text-[#000080] hover:scale-110 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2 border border-slate-100"
              aria-label="Next card"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
