import React from 'react';
import { Phone, ExternalLink, Download } from 'lucide-react';

export const CallToAction: React.FC = () => {
  return (
    <section className="bg-[#000080] rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl mt-24 mb-24 mx-4 sm:mx-0">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF9933]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="text-center md:text-left max-w-2xl">
          <h2 className="text-4xl font-extrabold mb-4">Be the Voice of Democracy</h2>
          <p className="text-blue-100 text-lg mb-8">Download the official Voter Helpline App or call the toll-free number for any election-related queries.</p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a 
              href="https://voters.eci.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-[#000080] px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition shadow-lg flex items-center gap-2"
            >
              Voter Portal <ExternalLink className="h-4 w-4" />
            </a>
            <a 
              href="tel:1950" 
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition flex items-center gap-2"
            >
              <Phone className="h-4 w-4" /> Call 1950
            </a>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 flex flex-col items-center">
          <div className="bg-white p-4 rounded-2xl mb-4">
            <Download className="h-12 w-12 text-[#000080]" />
          </div>
          <span className="font-bold text-center">Get the Voter Helpline App</span>
          <p className="text-xs text-blue-200 mt-2 text-center opacity-70">Available on Play Store & App Store</p>
        </div>
      </div>
    </section>
  );
};
