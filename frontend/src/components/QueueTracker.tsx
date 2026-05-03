import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Users, Timer, Info, Search, Loader2 } from 'lucide-react';

const mockBooths = [
  { id: 1, name: 'St. Mary School, Booth 1', distance: '0.4 km', waitTime: 12, status: 'low', crowd: 15 },
  { id: 2, name: 'St. Mary School, Booth 2', distance: '0.4 km', waitTime: 45, status: 'high', crowd: 58 },
  { id: 3, name: 'Public Library Hall', distance: '1.2 km', waitTime: 25, status: 'medium', crowd: 32 },
  { id: 4, name: 'Govt. Dispensary Room', distance: '1.8 km', waitTime: 8, status: 'low', crowd: 5 },
];

export const QueueTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [booths, setBooths] = useState(mockBooths);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBooths(prev => prev.map(b => ({
        ...b,
        waitTime: Math.max(2, b.waitTime + (Math.random() > 0.5 ? 1 : -1)),
        crowd: Math.max(1, b.crowd + (Math.random() > 0.5 ? 2 : -2))
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-slate-50 rounded-[3rem] border border-slate-200 mt-24 mb-12 overflow-hidden relative" id="queue-tracker">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest mb-4">
              <Clock className="h-3 w-3" />
              Live Queue Tracking
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Polling Booth <span className="text-green-600">Wait Times</span></h2>
            <p className="text-slate-500 font-medium">Real-time crowdsourced and AI-verified wait times for your local polling station.</p>
          </div>
          
          <form onSubmit={handleSearch} className="w-full md:w-96 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Enter Pincode or Locality..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-lg shadow-slate-200/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-green-600 mb-4" />
              <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Locating nearby booths...</p>
            </div>
          ) : (
            booths.map((booth) => (
              <div key={booth.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl hover:shadow-2xl transition-all group hover:-translate-y-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    booth.status === 'low' ? 'bg-green-100 text-green-700' : 
                    booth.status === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {booth.status} wait
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 mb-1 truncate" title={booth.name}>{booth.name}</h3>
                <p className="text-xs font-bold text-slate-400 mb-6 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {booth.distance} away
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase mb-1">
                      <Timer className="h-3 w-3" /> Time
                    </div>
                    <div className="text-xl font-black text-slate-900">{booth.waitTime}m</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase mb-1">
                      <Users className="h-3 w-3" /> Queue
                    </div>
                    <div className="text-xl font-black text-slate-900">{booth.crowd}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 bg-white/50 backdrop-blur-md rounded-3xl p-4 flex items-center gap-4 border border-white max-w-2xl mx-auto">
          <div className="bg-indigo-600 p-2 rounded-full">
            <Info className="h-4 w-4 text-white" />
          </div>
          <p className="text-xs font-bold text-slate-600">
            <span className="text-indigo-600">Pro Tip:</span> Early morning (7 AM - 9 AM) and late afternoon (4 PM - 6 PM) usually have the shortest wait times.
          </p>
        </div>
      </div>
    </section>
  );
};
