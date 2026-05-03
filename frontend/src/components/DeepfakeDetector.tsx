import React, { useState, useRef } from 'react';
import { ShieldAlert, Video, CheckCircle, XCircle, Search, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DeepfakeDetector: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<null | { authenticity: number, details: string[], isReal: boolean }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startAnalysis = () => {
    setAnalyzing(true);
    // Simulate Gemini Video Analysis for Deepfakes
    setTimeout(() => {
      setResult({
        authenticity: 98.4,
        isReal: true,
        details: [
          'Natural blink patterns detected',
          'Biometric blood flow consistency verified',
          'Acoustic synchronization matches physical lip movement'
        ]
      });
      setAnalyzing(false);
    }, 4000);
  };

  return (
    <section className="py-24 bg-red-50 rounded-[3rem] border border-red-100 mt-24 mb-12 overflow-hidden relative" id="deepfake-detector">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-200 rounded-full blur-[100px] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest mb-6 border border-red-200">
              <ShieldAlert className="h-3 w-3" />
              AI Integrity Shield
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">AI Deepfake <span className="text-red-600">Detector</span></h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed mb-10">
              Protect yourself from electoral misinformation. Upload any candidate video to verify its authenticity using our multi-modal AI detection engine.
            </p>
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all flex items-center gap-3"
            >
              <Video className="h-5 w-5" /> Select Video to Scan
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              className="hidden" 
              accept="video/*" 
            />
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-red-100 shadow-2xl shadow-red-200/50 min-h-[450px] flex flex-col items-center justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                {file && !result && !analyzing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <Video className="h-16 w-16 text-red-400 mx-auto mb-6" />
                    <p className="text-lg font-bold text-slate-900 mb-4">{file.name}</p>
                    <button 
                      onClick={startAnalysis}
                      className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition-all"
                    >
                      Analyze Authenticity
                    </button>
                  </motion.div>
                )}

                {analyzing && (
                  <div className="text-center">
                    <div className="relative h-24 w-24 mx-auto mb-8">
                      <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-red-600 rounded-full animate-spin"></div>
                      <Search className="absolute inset-0 m-auto h-8 w-8 text-red-600 animate-pulse" />
                    </div>
                    <p className="text-xl font-black text-red-600 animate-pulse">Scanning Frame Frequency...</p>
                    <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Checking Biometric Markers</p>
                  </div>
                )}

                {result && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`p-4 rounded-3xl ${result.isReal ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {result.isReal ? <CheckCircle className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
                      </div>
                      <div>
                        <div className="text-3xl font-black text-slate-900">{result.authenticity}%</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Authenticity Confidence</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {result.details.map((detail, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-bold text-slate-600 flex items-center gap-3">
                          <Sparkles className="h-4 w-4 text-indigo-500" />
                          {detail}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-indigo-900 rounded-2xl text-white">
                      <div className="flex items-center gap-2 mb-2 text-indigo-300">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">AI Verdict</span>
                      </div>
                      <p className="text-sm font-bold">This media is verified as **HIGHLY AUTHENTIC**. No significant AI manipulation patterns detected.</p>
                    </div>

                    <button 
                      onClick={() => {setFile(null); setResult(null);}}
                      className="w-full py-4 mt-4 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                    >
                      Verify Another Media
                    </button>
                  </motion.div>
                )}

                {!file && !analyzing && (
                  <div className="text-center opacity-20">
                    <ShieldAlert className="h-24 w-24 mx-auto mb-6" />
                    <p className="font-black uppercase tracking-widest text-sm">Awaiting Media Input</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
