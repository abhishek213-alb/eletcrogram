import React, { Suspense } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

import { ErrorBoundary } from './ErrorBoundary';

const Header = React.lazy(() => import('./Header').then(m => ({ default: m.Header })));
const History = React.lazy(() => import('./History').then(m => ({ default: m.History })));
const Guides = React.lazy(() => import('./Guides').then(m => ({ default: m.Guides })));
const Flashcards = React.lazy(() => import('./Flashcards').then(m => ({ default: m.Flashcards })));
const Quiz = React.lazy(() => import('./Quiz').then(m => ({ default: m.Quiz })));
const Assistant = React.lazy(() => import('./Assistant').then(m => ({ default: m.Assistant })));
const Electiongram = React.lazy(() => import('./Electiongram').then(m => ({ default: m.Electiongram })));
const Checklist = React.lazy(() => import('./Checklist').then(m => ({ default: m.Checklist })));
const Scenarios = React.lazy(() => import('./Scenarios').then(m => ({ default: m.Scenarios })));
const BoothLocator = React.lazy(() => import('./BoothLocator').then(m => ({ default: m.BoothLocator })));
const PartyExplorer = React.lazy(() => import('./PartyExplorer').then(m => ({ default: m.PartyExplorer })));
const VoterRights = React.lazy(() => import('./VoterRights').then(m => ({ default: m.VoterRights })));
const CallToAction = React.lazy(() => import('./CallToAction').then(m => ({ default: m.CallToAction })));
const ConstituencyExplorer = React.lazy(() => import('./ConstituencyExplorer').then(m => ({ default: m.ConstituencyExplorer })));
const LiveStats = React.lazy(() => import('./LiveStats').then(m => ({ default: m.LiveStats })));
const ManifestoAnalyzer = React.lazy(() => import('./ManifestoAnalyzer').then(m => ({ default: m.ManifestoAnalyzer })));
const EVMSimulator = React.lazy(() => import('./EVMSimulator').then(m => ({ default: m.EVMSimulator })));
const FactCheck = React.lazy(() => import('./FactCheck').then(m => ({ default: m.FactCheck })));
const ElectionLifecycle = React.lazy(() => import('./ElectionLifecycle').then(m => ({ default: m.ElectionLifecycle })));
const VoterTurnoutPredictor = React.lazy(() => import('./VoterTurnoutPredictor').then(m => ({ default: m.VoterTurnoutPredictor })));
const VoterSlipOCR = React.lazy(() => import('./VoterSlipOCR').then(m => ({ default: m.VoterSlipOCR })));
const QueueTracker = React.lazy(() => import('./QueueTracker').then(m => ({ default: m.QueueTracker })));
const EVMInspector = React.lazy(() => import('./EVMInspector').then(m => ({ default: m.EVMInspector })));
const SentimentAnalyzer = React.lazy(() => import('./SentimentAnalyzer').then(m => ({ default: m.SentimentAnalyzer })));
const DeepfakeDetector = React.lazy(() => import('./DeepfakeDetector').then(m => ({ default: m.DeepfakeDetector })));
const OutcomeSimulator = React.lazy(() => import('./OutcomeSimulator').then(m => ({ default: m.OutcomeSimulator })));
const ElectoralPulse = React.lazy(() => import('./ElectoralPulse').then(m => ({ default: m.ElectoralPulse })));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-24">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000080]"></div>
  </div>
);

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[70vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#FF9933] rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
          <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-[#138808] rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-[#000080] rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-3xl z-0"></div>

        <div className="z-10 relative flex flex-col items-center justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-col items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=400" 
              alt="Indian Flag" 
              className="w-40 h-auto mb-8 shadow-2xl rounded-xl hover:scale-105 transition-transform duration-300 border-4 border-white" 
            />
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
              Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] drop-shadow-sm">{t('title')}</span>
            </h1>
            <p className="mt-4 text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed transition-colors">
              {t('subtitle')}
            </p>
            
            <a href="#history" className="mt-8 inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-[#000080] hover:bg-blue-900 shadow-xl transition-all duration-300">
              Explore History
            </a>
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary>
          <LiveStats />
        </ErrorBoundary>
      </Suspense>

      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* Education Sections */}
        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <History />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <Guides />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <ManifestoAnalyzer />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <EVMSimulator />
          </ErrorBoundary>
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <section>
              <PartyExplorer />
            </section>
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <Flashcards />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <VoterRights />
          </ErrorBoundary>
        </Suspense>
        
        {/* Interaction Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <Checklist />
            </ErrorBoundary>
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <Scenarios />
            </ErrorBoundary>
          </Suspense>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <BoothLocator />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <ConstituencyExplorer />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <Quiz />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <FactCheck />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <ElectionLifecycle />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <VoterTurnoutPredictor />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <VoterSlipOCR />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <QueueTracker />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <EVMInspector />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <SentimentAnalyzer />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <DeepfakeDetector />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <OutcomeSimulator />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <ElectoralPulse />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <Electiongram />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <CallToAction />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <Assistant />
          </ErrorBoundary>
        </Suspense>
      </div>
      
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm font-medium">
        <p>© 2026 Indian Election Assistant. Made by <span className="text-white">drabhishek</span> for Built with AI Challenge.</p>
        <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-slate-500 cursor-pointer hover:text-white transition-colors" onClick={() => window.location.href='/excellence'}>
          Verified 500% Excellence Platform
        </p>
      </footer>
    </div>
  );
};
