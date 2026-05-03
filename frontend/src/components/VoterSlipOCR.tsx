import React, { useState, useRef } from 'react';
import { Scan, FileText, CheckCircle, ShieldCheck, AlertCircle, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VoterSlipOCR: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [data, setData] = useState<null | { name: string, partNo: string, serialNo: string, booth: string }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setData(null);
    }
  };

  const startOCR = () => {
    setScanning(true);
    // Simulate Document AI Processing
    setTimeout(() => {
      setData({
        name: 'DR ABHISHEK',
        partNo: '142',
        serialNo: '894',
        booth: 'Primary School, South Block, Room 4'
      });
      setScanning(false);
    }, 3000);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setData(null);
  };

  return (
    <section className="py-24 bg-white rounded-[3rem] shadow-2xl border border-slate-100 mt-24 mb-12 overflow-hidden relative" id="ocr-verify">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-white to-green-600"></div>
      
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-100">
              <Scan className="h-3 w-3" />
              Document AI Integration
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Smart Voter Slip <span className="text-indigo-600">Verification</span></h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed mb-10">
              Upload your digital or scanned voter slip. Our AI will automatically extract your polling booth details and verify your registration status in real-time.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-2xl">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Secure Processing</h4>
                  <p className="text-slate-500 text-sm">Documents are processed using encrypted GCP pipelines.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-2xl">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Auto-Extraction</h4>
                  <p className="text-slate-500 text-sm">No manual entry needed for Serial Numbers or Part Numbers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200 shadow-inner relative overflow-hidden min-h-[450px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {!file && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center"
                  >
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-110 hover:border-indigo-300 transition-all group"
                    >
                      <Upload className="h-10 w-10 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <p className="text-lg font-bold text-slate-700 mb-2">Upload Voter Slip</p>
                    <p className="text-slate-400 text-sm font-medium">Supports PDF, PNG, JPG (Max 5MB)</p>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*,application/pdf" 
                    />
                  </motion.div>
                )}

                {file && !data && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full flex flex-col items-center"
                  >
                    <div className="relative w-full max-w-sm aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-8 group">
                      {preview && <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-60" />}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {scanning ? (
                          <div className="w-full relative">
                            <div className="h-1 w-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.8)] animate-scan"></div>
                            <p className="text-indigo-600 font-black text-xs tracking-widest mt-4 bg-white/90 px-3 py-1 rounded-full">AI ANALYSIS IN PROGRESS...</p>
                          </div>
                        ) : (
                          <button 
                            onClick={startOCR}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-2"
                          >
                            <Scan className="h-5 w-5" /> Analyze Document
                          </button>
                        )}
                      </div>
                      <button onClick={reset} className="absolute top-2 right-2 p-1 bg-white/80 rounded-full text-slate-600 hover:bg-white transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {data && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full space-y-4"
                  >
                    <div className="bg-green-500 text-white p-4 rounded-2xl flex items-center gap-3 mb-6 shadow-lg shadow-green-500/20">
                      <CheckCircle className="h-6 w-6" />
                      <span className="font-bold">Verification Successful — 100% Match Found</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-100">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Voter Name</div>
                        <div className="font-bold text-slate-900">{data.name}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Serial Number</div>
                        <div className="font-bold text-slate-900">{data.serialNo}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Part Number</div>
                        <div className="font-bold text-slate-900">{data.partNo}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Constituency</div>
                        <div className="font-bold text-slate-900">Delhi North</div>
                      </div>
                    </div>

                    <div className="bg-indigo-900 text-white p-6 rounded-2xl border border-white/10 shadow-xl mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-orange-400" />
                        <span className="text-xs font-bold uppercase tracking-widest">Your Assigned Booth</span>
                      </div>
                      <p className="text-lg font-bold">{data.booth}</p>
                    </div>

                    <button 
                      onClick={reset}
                      className="w-full py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors"
                    >
                      Clear and Upload Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-scan {
          position: absolute;
          width: 100%;
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
