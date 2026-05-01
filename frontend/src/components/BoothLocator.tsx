import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * BoothLocator Component
 * Renders a Google Map to help voters find their polling station.
 */
export const BoothLocator: React.FC = () => {
  const [search, setSearch] = React.useState('Election Commission of India, New Delhi');

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 mt-8 mb-8" id="booth-locator" aria-label="Polling Booth Locator">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-xl" aria-hidden="true">
            <MapPin className="text-blue-700 h-6 w-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Find Your Polling Booth</h2>
            <p className="text-slate-600">Locate your designated voting station instantly.</p>
          </div>
        </div>
        
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Enter your area or city..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-800"
            />
            <button className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <MapPin className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner h-[450px]" aria-label="Interactive Google Map">
        <iframe
          title="Polling Booth Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${encodeURIComponent(search)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
        ></iframe>
      </div>
      <p className="mt-4 text-sm text-slate-500 italic font-medium">Note: For exact booth details, cross-reference with your Voter ID on the official ECI portal.</p>
    </div>
  );
};
