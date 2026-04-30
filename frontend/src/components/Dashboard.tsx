import React from 'react';
import { Header } from './Header';
import { History } from './History';
import { Guides } from './Guides';
import { Flashcards } from './Flashcards';
import { Quiz } from './Quiz';
import { Assistant } from './Assistant';
import { Electiongram } from './Electiongram';
import { Checklist } from './Checklist';
import { Scenarios } from './Scenarios';
import { useLanguage } from '../i18n/LanguageContext';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-16">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#FF9933] rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
          <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-[#138808] rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-[#000080] rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-3xl z-0"></div>

        <div className="z-10 relative flex flex-col items-center justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Flag Animation Hero Section */}
          <div className="text-center flex flex-col items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg" 
              alt="Animated Indian Flag" 
              className="w-48 h-auto mb-8 shadow-2xl rounded-sm hover:scale-105 transition-transform duration-300" 
              style={{ animation: 'wave 3s infinite ease-in-out' }}
            />
            <style>{`
              @keyframes wave {
                0%, 100% { transform: rotate(-2deg); }
                50% { transform: rotate(2deg); }
              }
              @keyframes blob {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0px, 0px) scale(1); }
              }
              .animation-delay-2000 { animation-delay: 2s; }
              .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-4">
              Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] drop-shadow-sm">{t('title')}</span>
            </h1>
            <p className="mt-6 text-xl text-slate-700 max-w-3xl mx-auto font-medium leading-relaxed">
              {t('subtitle')}
            </p>
            
            <a href="#history" className="mt-12 inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-[#000080] hover:bg-blue-900 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-bounce">
              Explore History
            </a>
          </div>

          {/* GCP Banner */}
          <div className="mt-24 bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 text-center text-white relative overflow-hidden shadow-2xl border border-slate-700 w-full max-w-4xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 tracking-wide">Built with AI - PromptWars Challenge</h2>
              <p className="text-slate-300 mx-auto font-medium">
                Made by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-indigo-400 font-bold">drabhishek</span> for built with ai promptwars challenge. Utilizing Firebase, Firestore, Pub/Sub, and Vertex AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Sections */}
      <History />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <Guides />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <Flashcards />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Checklist />
        <Scenarios />
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <Quiz />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <Electiongram />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <Assistant />
      
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm font-medium">
        <p>© 2026 Indian Election Assistant. Made by <span className="text-white">drabhishek</span> for Built with AI Challenge.</p>
      </footer>
    </div>
  );
};
