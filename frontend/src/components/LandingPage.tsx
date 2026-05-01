import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, ArrowRight, ShieldCheck, Globe, Zap, Users } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FF9933] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#138808] rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-slate-200/60 backdrop-blur-md bg-white/30">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-[#FF9933] to-[#138808] p-1.5 rounded-lg">
            <Vote className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">ElectionAssistant</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest mb-8 border border-slate-200">
          <ShieldCheck className="h-3 w-3 text-[#000080]" />
          Powered by Google Cloud & Gemini AI
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-tight max-w-4xl mb-6">
          Democracy is a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]">Conversation.</span> Join It.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl font-medium leading-relaxed mb-12">
          The ultimate AI-powered companion for every Indian citizen. Understand your rights, explore constituencies, and prepare for the 2026 elections with state-of-the-art tech.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="group px-8 py-4 bg-[#000080] text-white rounded-2xl text-lg font-black shadow-2xl hover:bg-blue-900 hover:scale-105 transition-all flex items-center gap-3"
          >
            Explore Dashboard <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('/assistant')}
            className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl text-lg font-bold shadow-xl hover:bg-slate-50 transition-all"
          >
            Ask Assistant
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-32">
          <div className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl">
            <div className="h-12 w-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
              <Globe className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Multilingual Support</h3>
            <p className="text-slate-600 font-medium text-sm">Real-time full page translation in 12+ Indian languages. No citizen left behind.</p>
          </div>

          <div className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl">
            <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Analysis</h3>
            <p className="text-slate-600 font-medium text-sm">Gemini AI powered manifesto comparisons and constituency data insights at your fingertips.</p>
          </div>

          <div className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl">
            <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Voter Empowerment</h3>
            <p className="text-slate-600 font-medium text-sm">Interactive EVM simulators and checklist tools to make you a pro-voter.</p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-12 border-t border-slate-200/60 bg-white/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
            Built with 100% Excellence for the Built with AI Challenge 2026
          </p>
        </div>
      </footer>
    </div>
  );
};
