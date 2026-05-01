import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, Mic, Globe2, UserCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [isListening, setIsListening] = useState(false);

  const triggerGoogleTranslate = (langCode: string) => {
    setLanguage(langCode as any);
    const googleCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (googleCombo) {
      googleCombo.value = langCode;
      googleCombo.dispatchEvent(new Event('change'));
    } else {
      // Fallback if script is slow to load
      setTimeout(() => triggerGoogleTranslate(langCode), 500);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm tricolor-border dark:bg-slate-900/70 dark:border-slate-800">
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

        <nav aria-label="Sections" className="hidden lg:flex items-center gap-8 border-x border-slate-100 dark:border-slate-800 px-8 mx-4">
          <button onClick={() => navigate('/history')} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#000080] transition-colors" aria-label="View Election History">History</button>
          <button onClick={() => navigate('/guides')} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#000080] transition-colors" aria-label="View Voter Guides">Guides</button>
          <button onClick={() => navigate('/flashcards')} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#000080] transition-colors" aria-label="View Flashcards">Flashcards</button>
          <button onClick={() => navigate('/quiz')} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#000080] transition-colors" aria-label="Take Election Quiz">Quiz</button>
          <button onClick={() => navigate('/assistant')} className="text-sm font-bold text-indigo-600 hover:text-indigo-400 transition-colors flex items-center gap-1" aria-label="Open AI Assistant">
            <Sparkles className="h-3 w-3" /> Assistant
          </button>
        </nav>

        <nav aria-label="Global Options">
          <ul className="flex items-center gap-2 sm:gap-4">
            <li>
              <div className="relative group">
                <button 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#000080] text-slate-600 dark:text-slate-400 text-sm font-medium"
                  aria-label="Select Language"
                  title="Multi-language Support"
                >
                  <Globe2 className="h-4 w-4 text-[#000080] dark:text-blue-400" aria-hidden="true" />
                  <span className="hidden sm:inline">{translations[language].language}</span>
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 max-h-64 overflow-y-auto py-2">
                  <button onClick={() => triggerGoogleTranslate('en')} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-bold border-b border-slate-50 dark:border-slate-700" aria-label="Switch to English">English</button>
                  <button onClick={() => triggerGoogleTranslate('hi')} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium" aria-label="Switch to Hindi">हिन्दी (Hindi)</button>
                  <button onClick={() => triggerGoogleTranslate('mr')} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium" aria-label="Switch to Marathi">मराठी (Marathi)</button>
                  <button onClick={() => triggerGoogleTranslate('bn')} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium" aria-label="Switch to Bengali">বাংলা (Bengali)</button>
                  <button onClick={() => triggerGoogleTranslate('te')} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium" aria-label="Switch to Telugu">తెలుగు (Telugu)</button>
                  <button onClick={() => triggerGoogleTranslate('ta')} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium" aria-label="Switch to Tamil">தமிழ் (Tamil)</button>
                  <button onClick={() => triggerGoogleTranslate('gu')} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium" aria-label="Switch to Gujarati">ગુજરાતી (Gujarati)</button>
                  <button onClick={() => triggerGoogleTranslate('kn')} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium rounded-b-xl" aria-label="Switch to Kannada">ಕನ್ನಡ (Kannada)</button>
                </div>
              </div>
            </li>
            <li>
              <button 
                className={`relative p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9933] group mic-button ${isListening ? 'bg-[#FF9933]/20' : 'hover:bg-slate-100'}`}
                aria-label={isListening ? "Stop Voice Assistant" : "Activate Voice Assistant"}
                title="Voice Assistant Mode"
                onClick={() => {
                  setIsListening(!isListening);
                  if (!isListening) {
                    const utterance = new SpeechSynthesisUtterance("Namaste! I am your election assistant. How can I help you today?");
                    utterance.lang = 'hi-IN';
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                {isListening && <div className="absolute inset-0 bg-[#FF9933] rounded-full animate-ping opacity-50"></div>}
                <Mic className={`h-5 w-5 ${isListening ? 'text-[#FF9933]' : 'text-[#FF9933]'} relative z-10`} />
              </button>
            </li>
            <li>
              <button 
                className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-600 dark:text-slate-400"
                aria-label="Toggle Dark Mode"
                title="Toggle Dark Mode"
                onClick={() => {
                  document.documentElement.classList.toggle('dark');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden dark:block" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 block dark:hidden" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </button>
            </li>
            <li className="pl-2 border-l border-slate-200 dark:border-slate-700">
              <button 
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
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
