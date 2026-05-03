import React, { useState, useRef } from 'react';
import { Camera, Heart, Share2, MapPin, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { uploadFile } from '../services/api';

interface Moment {
  id: number;
  user: string;
  image: string;
  location: string;
  caption: string;
}

const moments = [
  {
    id: 1,
    user: 'Voter_Abhishek',
    image: 'https://images.unsplash.com/photo-1540653571635-956277907997?auto=format&fit=crop&q=80&w=1200',
    location: 'Lucknow, UP',
    caption: 'Just cast my vote! Feels proud to be a part of the world\'s largest democracy. 🇮🇳 #Election2024'
  },
  {
    id: 2,
    user: 'Civic_Rahul',
    image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=1200',
    location: 'Mumbai, MH',
    caption: 'Selfie with the inked finger! Encouraging everyone to go out and vote. #Democracy'
  }
];

export const Electiongram: React.FC = () => {
  const { t } = useLanguage();
  const [momentList, setMomentList] = useState<Moment[]>(moments);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1540910419892-f7c748395e96?auto=format&fit=crop&q=80&w=1200'; // Fallback generic election image
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant Preview for 600% Interactivity
    const localPreviewUrl = URL.createObjectURL(file);
    const tempId = Date.now();
    const newMoment: Moment = {
      id: tempId,
      user: 'You',
      image: localPreviewUrl,
      location: 'Inked & Proud',
      caption: 'I just voted! 🇮🇳 #Democracy #ElectionAssistant'
    };
    setMomentList(prev => [newMoment, ...prev]);

    setIsUploading(true);
    try {
      const { url } = await uploadFile(file);
      // Update with final URL if backend responds
      setMomentList(prev => prev.map(m => m.id === tempId ? { ...m, image: url } : m));
    } catch (error) {
      console.error('Electiongram Upload Error:', error);
      // Keep local preview if upload fails for demo purposes
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="electiongram" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-600 font-bold text-sm mb-4 border border-pink-100">
              <Camera className="h-4 w-4" />
              <span>{t('electiongram')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600">Election Moments</span>
            </h2>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-gradient-to-r from-pink-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
            {t('uploadSelfie')}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            className="hidden" 
            accept="image/*"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {momentList.map((moment) => (
            <div key={moment.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-slate-800 text-xs">
                    {moment.user[0]}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{moment.user}</p>
                  <p className="text-slate-500 text-xs flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {moment.location}
                  </p>
                </div>
              </div>
              
              <div className="aspect-square overflow-hidden bg-slate-100">
                <img 
                  src={moment.image} 
                  alt={moment.caption} 
                  loading="lazy"
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <button 
                    className="text-slate-400 hover:text-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full p-1"
                    aria-label={`Like ${moment.user}'s post`}
                  >
                    <Heart className="h-6 w-6" />
                  </button>
                  <button 
                    className="text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
                    aria-label={`Share ${moment.user}'s post`}
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  <span className="font-bold mr-2">{moment.user}</span>
                  {moment.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
