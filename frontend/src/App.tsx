import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { LanguageProvider } from './i18n/LanguageContext';

// Standard imports for absolute stability
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { History } from './components/History';
import { Guides } from './components/Guides';
import { Quiz } from './components/Quiz';
import { Flashcards } from './components/Flashcards';
import { Assistant } from './components/Assistant';

function App() {
  return (
    <LanguageProvider>
      <Router>
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
      </Router>
    </LanguageProvider>
  );
}

export default App;
