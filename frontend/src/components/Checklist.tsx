import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { updateChecklist, fetchJourney } from '../services/api';

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export const Checklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 'guest_user';

  useEffect(() => {
    const loadChecklist = async () => {
      try {
        const data = await fetchJourney(userId);
        if (data && data.checklist) {
          setItems(data.checklist);
        }
      } catch (err) {
        console.error('Failed to load checklist', err);
        // Fallback items if API fails
        setItems([
          { id: '1', title: 'Register to vote', completed: false },
          { id: '2', title: 'Check name in roll', completed: false }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadChecklist();
  }, []);

  const toggleItem = async (id: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      setItems(prev => prev.map(item => item.id === id ? { ...item, completed: newStatus } : item));
      await updateChecklist(userId, id, newStatus);
    } catch (err) {
      console.error('Failed to update checklist', err);
      // Revert state on error
      setItems(prev => prev.map(item => item.id === id ? { ...item, completed: currentStatus } : item));
    }
  };

  const progress = (items && Array.isArray(items) && items.length > 0) 
    ? (items.filter(i => i?.completed).length / items.length) * 100 
    : 0;

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
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#000080]" />
        </div>
      ) : (
        <div className="space-y-4">
          {(items || []).map((item) => {
            if (!item) return null;
            return (
              <button 
                key={item.id || Math.random().toString()}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  item.completed ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
                onClick={() => toggleItem(item.id, !!item.completed)}
                type="button"
              >
                {item.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-[#138808]" />
                ) : (
                  <Circle className="h-6 w-6 text-slate-400" />
                )}
                <span className={`text-lg font-medium text-left ${item.completed ? 'text-green-800 line-through opacity-70' : 'text-slate-700'}`}>
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
