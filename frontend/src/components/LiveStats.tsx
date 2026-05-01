import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Activity, Globe } from 'lucide-react';

export const LiveStats: React.FC = () => {
  const [voters, setVoters] = useState(2800000);
  const [activeUsers, setActiveUsers] = useState(1420);

  // Simulate real-time data updates
  useEffect(() => {
    const voterInterval = setInterval(() => {
      setVoters(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);

    const userInterval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    return () => {
      clearInterval(voterInterval);
      clearInterval(userInterval);
    };
  }, []);

  return (
    <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-8 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Live Election Pulse</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Real-time Platform Activity</h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="h-4 w-4 text-indigo-500" />
                <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                  {(voters / 1000000).toFixed(2)}M+
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Registered Voters</p>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-slate-800"></div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                  {voters.toLocaleString()}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Total Registrations</p>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-slate-800"></div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Globe className="h-4 w-4 text-blue-500" />
                <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                  {activeUsers.toLocaleString()}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Active Users</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
