import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '1rem'
};

const center = {
  lat: 28.6139, // Default to New Delhi
  lng: 77.2090
};

/**
 * BoothLocator Component
 * Renders a Google Map to help voters find their polling station.
 * Requires VITE_GOOGLE_MAPS_API_KEY in the environment.
 */
export const BoothLocator: React.FC = () => {
  const apiKey = (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || '';

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
      
      {apiKey && apiKey !== 'YOUR_API_KEY_HERE' ? (
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner" aria-label="Interactive Google Map">
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >
              <Marker position={center} title="Your Polling Booth" />
            </GoogleMap>
          </LoadScript>
        </div>
      ) : (
        <div className="w-full h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden" role="region" aria-label="Map Placeholder">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <MapPin className="h-16 w-16 text-blue-500 mb-4 animate-bounce z-10" />
          <p className="text-slate-700 font-bold text-xl z-10">Google Maps Integration Ready</p>
          <p className="text-sm text-slate-500 mt-2 max-w-md text-center z-10">
            For security, the API key is not bundled. To view the live map, add <code className="bg-white px-2 py-1 rounded text-pink-600 font-mono">VITE_GOOGLE_MAPS_API_KEY</code> to your environment.
          </p>
        </div>
      )}
    </div>
  );
};

