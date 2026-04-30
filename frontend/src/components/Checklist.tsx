import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export const Checklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 'guest_user'; // In a real app, get from Auth

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const response = await axios.get(`${API_URL}/journey/${userId}`);
        setItems(response.data.checklist);
      } catch (err) {
        console.error('Failed to fetch checklist', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJourney();
  }, []);

  const toggleItem = async (id: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      setItems(items.map(item => item.id === id ? { ...item, completed: newStatus } : item));
      await axios.post(`${API_URL}/journey/${userId}/checklist`, {
        itemId: id,
        completed: newStatus
      });
    } catch (err) {
      console.error('Failed to update checklist', err);
      // Revert on failure
      setItems(items.map(item => item.id === id ? { ...item, completed: currentStatus } : item));
    }
  };

  const progress = items.length > 0 ? (items.filter(i => i.completed).length / items.length) * 100 : 0;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 mt-8" id="checklist">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Voter Readiness Checklist</h2>
      <p className="text-slate-600 mb-6">Track your preparation for the upcoming election.</p>
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-4 mb-8 overflow-hidden">
        <div 
          className="bg-[#138808] h-4 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {items.map(item => (
            <li 
              key={item.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                item.completed ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
              onClick={() => toggleItem(item.id, item.completed)}
            >
              {item.completed ? (
                <CheckCircle2 className="h-6 w-6 text-[#138808]" />
              ) : (
                <Circle className="h-6 w-6 text-slate-400" />
              )}
              <span className={`text-lg font-medium ${item.completed ? 'text-green-800 line-through opacity-70' : 'text-slate-700'}`}>
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
