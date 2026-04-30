import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, Mic, Globe2, UserCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm tricolor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button 
          className="flex items-center gap-2 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#000080] rounded-lg"
          onClick={() => navigate('/dashboard')}
          aria-label="Go to Dashboard"
        >
          <div className="bg-gradient-to-br from-[#FF9933] to-[#138808] p-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
            <Vote className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800 group-hover:text-[#000080] transition-colors">
            Election<span className="text-[#FF9933]">Ass</span><span className="text-[#000080]">ist</span><span className="text-[#138808]">ant</span>
          </h1>
        </button>

        <nav aria-label="Sections" className="hidden lg:flex items-center gap-8 border-x border-slate-100 px-8 mx-4">
          <a href="#history" className="text-sm font-bold text-slate-600 hover:text-[#000080] transition-colors">History</a>
          <a href="#guides" className="text-sm font-bold text-slate-600 hover:text-[#000080] transition-colors">Guides</a>
          <a href="#flashcards" className="text-sm font-bold text-slate-600 hover:text-[#000080] transition-colors">Flashcards</a>
          <a href="#quiz" className="text-sm font-bold text-slate-600 hover:text-[#000080] transition-colors">Quiz</a>
          <a href="#electiongram" className="text-sm font-bold text-slate-600 hover:text-pink-600 transition-colors">Electiongram</a>
          <a href="#assistant" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Assistant
          </a>
        </nav>

        <nav aria-label="Global">
          <ul className="flex items-center gap-2 sm:gap-4">
            <li>
              <div className="relative group">
                <button 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#000080] text-slate-600 text-sm font-medium"
                  aria-label="Change Language"
                  title="Multi-language Support"
                >
                  <Globe2 className="h-4 w-4 text-[#000080]" />
                  <span className="hidden sm:inline">{translations[language].language}</span>
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 max-h-64 overflow-y-auto py-2">
                  <button onClick={() => setLanguage('en')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-bold border-b border-slate-50">English</button>
                  <button onClick={() => setLanguage('hi')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium">हिन्दी (Hindi)</button>
                  <button onClick={() => setLanguage('mr')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium">मराठी (Marathi)</button>
                  <button onClick={() => setLanguage('bn')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium">বাংলা (Bengali)</button>
                  <button onClick={() => setLanguage('te')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium">తెలుగు (Telugu)</button>
                  <button onClick={() => setLanguage('ta')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium">தமிழ் (Tamil)</button>
                  <button onClick={() => setLanguage('gu')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium">ગુજરાતી (Gujarati)</button>
                  <button onClick={() => setLanguage('kn')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium rounded-b-xl">ಕನ್ನಡ (Kannada)</button>
                </div>
              </div>
            </li>
            <li>
              <button 
                className="relative p-2 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF9933] group"
                aria-label="Activate Voice Assistant"
                title="Voice Assistant Mode"
              >
                <div className="absolute inset-0 bg-[#FF9933] rounded-full opacity-0 group-hover:animate-ping"></div>
                <Mic className="h-5 w-5 text-[#FF9933] relative z-10" />
              </button>
            </li>
            <li className="pl-2 border-l border-slate-200">
              <button 
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
                onClick={() => navigate('/login')}
              >
                <UserCircle className="h-8 w-8 text-slate-400" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
