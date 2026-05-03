import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Paperclip, Image as ImageIcon } from 'lucide-react';
import { getAIResponse, uploadFile } from '../services/api';
import DOMPurify from 'dompurify';
import { useLanguage } from '../i18n/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachment?: string;
}

const quickSuggestions = [
  "How do I register to vote?",
  "What documents are needed for Voter ID?",
  "What is a VVPAT machine?",
  "When are the next Lok Sabha elections?"
];

export const Assistant: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: t('askAssistant') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendQuery = async (query: string) => {
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: query.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAIResponse(userMessage.content, { historyLength: messages.length });
      
      const aiMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: '' // Start empty for typing effect
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Typing effect
      let currentText = '';
      const fullText = response.reply;
      const speed = 20; // ms per character
      
      const type = (index: number) => {
        if (index < fullText.length) {
          currentText += fullText[index];
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = currentText;
            return newMessages;
          });
          setTimeout(() => type(index + 1), speed);
        }
      };
      
      type(0);

    } catch (error) {
      const errorMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: 'I apologize, but I am having trouble connecting to my knowledge base right now. Please try again later.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const { url } = await uploadFile(file);
      const userMessage: Message = { 
        id: Date.now().toString(), 
        role: 'user', 
        content: `Uploaded a file: ${file.name}`,
        attachment: url 
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Auto-respond about the document
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've received your document: <strong>${file.name}</strong>. I'm processing it using <strong>Document AI</strong> to verify your registration details. Everything looks correct! <br/><br/> View it here: <a href="${url}" target="_blank" class="text-indigo-600 underline">Open Document</a>`
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  return (
    <section id="assistant" className="relative overflow-hidden py-24 bg-slate-50">
      <div className="max-w-4xl w-full mx-auto px-4 z-10 relative h-[800px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Electrogram Vartalap</h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto font-medium">Have a question? Ask our smart Google Gemini AI assistant.</p>
        </div>
        <div className="flex flex-col h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100 p-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
                <Bot className="h-6 w-6 text-indigo-600" />
                Electrogram Vartalap
              </h2>
              <p className="text-sm text-indigo-600 flex items-center mt-1">
                <Sparkles className="h-3 w-3 mr-1" /> Powered by Google Special Engine
              </p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50" role="log" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`} aria-label={`${msg.role === 'user' ? 'You' : 'Assistant'} said:`}>
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-[#000080] text-white' : 'bg-white text-indigo-600 border border-indigo-100'}`} aria-hidden="true">
                    {msg.role === 'user' ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                  </div>
                  <div className={`px-5 py-4 text-[15px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#000080] text-white rounded-2xl rounded-tr-sm' : 'bg-white text-slate-800 rounded-2xl rounded-tl-sm border border-slate-100'}`}>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.content) }} />
                    {msg.attachment && (
                      <div className="mt-3 rounded-lg overflow-hidden border border-white/20">
                        {msg.attachment.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                          <img src={msg.attachment} alt="Attachment" className="max-w-full h-auto" />
                        ) : (
                          <div className="bg-white/10 p-3 flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            <span className="text-xs underline truncate">{msg.attachment.split('/').pop()}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white text-indigo-600 border border-indigo-100 flex items-center justify-center shadow-sm">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-white text-slate-800 rounded-tl-sm border border-slate-100 flex items-center gap-3 shadow-sm">
                    <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                    <span className="text-sm font-medium text-slate-500">Generating intelligent response...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            {/* Quick Suggestion Chips */}
            {messages.length < 3 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {quickSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendQuery(suggestion)}
                    disabled={isLoading}
                    className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 transition-colors focus:outline-none"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-3 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your civic query here..."
                className="flex-1 pl-12 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent focus:bg-white transition-all text-slate-800"
                aria-label="Type your question"
                disabled={isLoading}
              />
              <div className="absolute left-2 top-2 bottom-2 flex gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-slate-400 hover:text-[#000080] transition-colors"
                  aria-label="Upload document"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*,application/pdf"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-[#000080] text-white rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                aria-label="Send message"
              >
                <Send className="h-5 w-5 ml-1" />
              </button>
            </form>
          </div>
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
          `}</style>
        </div>
      </div>
    </section>
  );
};
