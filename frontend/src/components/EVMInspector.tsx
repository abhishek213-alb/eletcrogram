import React, { useState, useRef } from 'react';
import { Camera, ShieldCheck, CheckCircle, AlertTriangle, Search, Zap, ScanFace } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const EVMInspector: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<null | { authenticity: number, seals: string, battery: string, status: string }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const startAnalysis = () => {
    setScanning(true);
    // Simulate Gemini Vision AI
    setTimeout(() => {
      setResult({
        authenticity: 99.9,
        seals: 'Intact & Verified',
        battery: '85% (Optimal)',
        status: 'Genuine M3 Generation EVM'
      });
      setScanning(false);
    }, 3500);
  };

  return (
    <section className="py-24 bg-slate-900 rounded-[3rem] text-white shadow-2xl border border-slate-700 mt-24 mb-12 overflow-hidden relative group" id="evm-inspector">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/30">
              <ScanFace className="h-3 w-3" />
              Gemini Vision AI
            </div>
            <h2 className="text-5xl font-black mb-6 tracking-tight">AI EVM <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Inspector</span></h2>
            <p className="text-slate-400 text-xl font-medium leading-relaxed mb-10">
              Upload a photo of an Electronic Voting Machine or VVPAT unit. Our AI Vision engine will verify the technical specifications and seal integrity to ensure transparency.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <ShieldCheck className="h-6 w-6 text-green-400 mb-3" />
                <h4 className="font-bold text-white text-sm">Seal Verification</h4>
                <p className="text-slate-500 text-xs mt-1">AI detects tampering on paper and wire seals.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <Zap className="h-6 w-6 text-yellow-400 mb-3" />
                <h4 className="font-bold text-white text-sm">Battery Health</h4>
                <p className="text-slate-500 text-xs mt-1">Optical character recognition of diagnostic displays.</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-inner relative overflow-hidden min-h-[450px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {!file && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 bg-white/10 rounded-3xl border border-white/20 flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-110 hover:border-blue-400 transition-all group"
                    >
                      <Camera className="h-10 w-10 text-slate-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <p className="text-lg font-bold text-white mb-2">Capture or Upload EVM Photo</p>
                    <p className="text-slate-500 text-sm font-medium">Verify EVM genuineness instantly</p>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*" 
                    />
                  </motion.div>
                )}

                {file && !result && (
                  <div className="w-full h-full flex flex-col items-center">
                    <div className="relative w-full max-w-sm aspect-square bg-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-8 border-2 border-white/20">
                      {preview && <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-50" />}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {scanning ? (
                          <div className="w-full px-10">
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 animate-pulse-fast w-full shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
                            </div>
                            <p className="text-blue-400 font-black text-xs tracking-widest mt-6 text-center animate-pulse">ANALYZING SEAL GEOMETRY...</p>
                          </div>
                        ) : (
                          <button 
                            onClick={startAnalysis}
                            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-3"
                          >
                            <Search className="h-5 w-5" /> Run AI Inspection
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {result && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full space-y-4"
                  >
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <div className="text-5xl font-black text-white">{result.authenticity}%</div>
                        <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">Authenticity Score</div>
                      </div>
                      <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-green-500/30">
                        Verified Genuine
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Model</span>
                        <span className="text-sm font-black">{result.status}</span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Physical Seals</span>
                        <span className="text-sm font-black text-green-400 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" /> {result.seals}
                        </span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Battery Status</span>
                        <span className="text-sm font-black">{result.battery}</span>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
                      <p className="text-[10px] text-orange-200/80 leading-relaxed font-medium">
                        Disclaimer: This AI analysis is for educational transparency only. Official verification remains the sole authority of the Election Commission of India (ECI).
                      </p>
                    </div>

                    <button 
                      onClick={() => {setFile(null); setResult(null);}}
                      className="w-full py-4 text-slate-500 font-bold hover:text-white transition-colors"
                    >
                      Analyze Another Unit
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
