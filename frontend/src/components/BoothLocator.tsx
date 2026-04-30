import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * BoothLocator Component
 * Renders a Google Map to help voters find their polling station.
 */
export const BoothLocator: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 mt-8 mb-8" id="booth-locator" aria-label="Polling Booth Locator">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-xl" aria-hidden="true">
          <MapPin className="text-blue-700 h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Find Your Polling Booth</h2>
          <p className="text-slate-600">Locate your designated voting station based on your Electoral Roll registration.</p>
        </div>
      </div>
      
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner h-[400px]" aria-label="Interactive Google Map">
        <iframe
          title="Polling Booth Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.11482718425!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
        ></iframe>
      </div>
    </div>
  );
};
