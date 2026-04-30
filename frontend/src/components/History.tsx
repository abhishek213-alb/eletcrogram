import React, { useEffect, useRef, useState } from 'react';
import { Landmark, Users, Globe, BookOpen, Scroll } from 'lucide-react';

const timelineEvents = [
  {
    year: '1950',
    title: 'The Republic & First President',
    desc: 'On January 26, 1950, the Constitution of India came into effect. Dr. Rajendra Prasad took office as the first President of independent India, establishing the democratic framework.',
    icon: <Scroll className="h-6 w-6" />,
    color: 'from-orange-400 to-red-500',
    image: 'https://images.unsplash.com/photo-1594833241513-e74f76269661?auto=format&fit=crop&q=80&w=800'
  },
  {
    year: '1951-1952',
    title: 'The First General Elections',
    desc: 'The Election Commission, under Sukumar Sen, conducted the first massive democratic exercise. Over 173 million voters participated. Jawaharlal Nehru became the first democratically elected Prime Minister.',
    icon: <Landmark className="h-6 w-6" />,
    color: 'from-[#FF9933] to-orange-500',
    image: 'https://images.unsplash.com/photo-1540653571635-956277907997?auto=format&fit=crop&q=80&w=800'
  },
  {
    year: '1982',
    title: 'The EVM Revolution',
    desc: 'Electronic Voting Machines (EVMs) were first used on an experimental basis in Kerala. By 2004, EVMs completely replaced ballot boxes across the entire country, ending the era of paper ballot stuffing.',
    icon: <Globe className="h-6 w-6" />,
    color: 'from-blue-500 to-[#000080]',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
  },
  {
    year: '2013',
    title: 'VVPAT Introduction',
    desc: 'Voter Verifiable Paper Audit Trail (VVPAT) system was introduced to ensure absolute transparency, allowing voters to visually verify that their electronic vote was cast correctly.',
    icon: <BookOpen className="h-6 w-6" />,
    color: 'from-green-500 to-[#138808]'
  },
  {
    year: '2024',
    title: 'Modern Digital Era',
    desc: 'With over 900 million registered voters, India utilizes AI, digital portals (like this one), and real-time monitoring to secure its position as the largest democracy globally.',
    icon: <Users className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-500'
  }
];

export const History: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => (prev.includes(index) ? prev : [...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="history" className="relative overflow-hidden py-24 bg-gradient-to-b from-orange-50/50 via-white to-green-50/50">
      <div className="max-w-6xl w-full mx-auto px-4 z-10 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-slate-800 to-[#138808] tracking-tight pb-2">Our Historic Journey</h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto font-medium">Explore the chronological milestones, legendary leaders, and monumental events that shaped the world's largest democracy.</p>
        </div>

        <div className="relative pb-24" ref={containerRef}>
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#FF9933] via-slate-300 to-[#138808] transform md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)]"></div>

          {timelineEvents.map((event, index) => {
            const isVisible = visibleItems.includes(index);
            const isEven = index % 2 === 0;

            return (
              <div 
                key={index} 
                data-index={index}
                className={`timeline-item relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              >
                {/* Icon Marker */}
                <div className={`absolute left-4 md:left-1/2 w-14 h-14 rounded-full border-4 border-white shadow-2xl bg-gradient-to-br ${event.color} flex items-center justify-center text-white transform -translate-x-1/2 md:group-hover:scale-[1.3] transition-transform duration-500 z-20`}>
                  {event.icon}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${isEven ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'}`}>
                  <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group-hover:-translate-y-2 duration-500 border border-white/50">
                    <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-2 h-full bg-gradient-to-b ${event.color}`}></div>
                    
                    {/* Historic Image */}
                    {event.image && (
                      <div className="w-full h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                        />
                        <span className={`absolute bottom-4 ${isEven ? 'right-6' : 'left-6'} z-20 inline-block py-1 px-4 rounded-full text-sm font-bold text-slate-900 bg-white/90 shadow-lg backdrop-blur-sm`}>
                          {event.year}
                        </span>
                      </div>
                    )}
                    
                    <div className="p-8">
                      {!event.image && (
                        <span className={`inline-block py-1.5 px-4 rounded-full text-sm font-bold text-white bg-gradient-to-r ${event.color} mb-4 shadow-md`}>
                          {event.year}
                        </span>
                      )}
                      <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">{event.title}</h3>
                      <p className="text-slate-600 text-lg leading-relaxed font-medium">{event.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
