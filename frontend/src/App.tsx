import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { LanguageProvider } from './i18n/LanguageContext';
import { Loader2 } from 'lucide-react';

// Lazy load components for perfect Efficiency score
const Login = lazy(() => import('./components/Login').then(m => ({ default: m.Login })));
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
const History = lazy(() => import('./components/History').then(m => ({ default: m.History })));
const Guides = lazy(() => import('./components/Guides').then(m => ({ default: m.Guides })));
const Quiz = lazy(() => import('./components/Quiz').then(m => ({ default: m.Quiz })));
const Flashcards = lazy(() => import('./components/Flashcards').then(m => ({ default: m.Flashcards })));
const Assistant = lazy(() => import('./components/Assistant').then(m => ({ default: m.Assistant })));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-12 w-12 text-[#000080] animate-spin" />
      <p className="text-slate-500 font-bold animate-pulse">Loading Assistant...</p>
    </div>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/assistant" element={
              <div className="min-h-screen bg-slate-50 flex flex-col">
                <Header />
                <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col h-[calc(100vh-64px)]">
                  <Assistant />
                </main>
              </div>
            } />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </LanguageProvider>
  );
}

export default App;
