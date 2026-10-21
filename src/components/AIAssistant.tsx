import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi there! I am Monish's AI Representative. Ask me anything about his technical skillsets, projects (like the BLE Academic Monitor or Aequitas Bias Auditor), his coursework, or full-time career availability!",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Is Monish open for full-time roles?',
    'Tell me about the BLE Attendance System.',
    'What technical skills does he have?',
    'Has Monish won any awards?',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setErrorText('');

    try {
      // Map previous message structures if needed by the server
      const chatHistory = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: chatHistory,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const serverMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'model',
          text: data.reply || "I'm having trouble retrieving a smart reply right now.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, serverMsg]);
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Server error occurred');
      }
    } catch (err: any) {
      console.error(err);
      // Fallback response for offline status or server bootstrapping delays
      const fallbackMsgs: Record<string, string> = {
        'Is Monish open for full-time roles?': 'Yes! Moturu Monish is actively seeking full-time Software Engineering (SDE) roles starting immediately. He is based in East Coast/India and open to remote or relativistic relocations as needed.',
        'Tell me about the BLE Attendance System.': 'Monish built the Academic Monitor System from Jan. 2026 – Present. It is a dual-app Bluetooth Low Energy (BLE) matching system combining TensorFlow Lite on-device face matching, on-host proximity, and OTP rolling sequences.',
        'What technical skills does he have?': 'Monish is skilled in Python, Java, TypeScript, SQL (PostgreSQL), and HTML/CSS. His ML focus is on scikit-learn, TensorFlow Lite, OpenCV, and Flask or FastAPI backend architectures.',
        'Has Monish won any awards?': 'Yes! Monish was a National Finalist in the National Entrepreneurship Challenge, 2025 at IIT Bombay, ranking in the top 0.6% out of 1000+ teams nationwide.',
      };

      const matchedFallback = fallbackMsgs[messageText];
      if (matchedFallback) {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-err-${Date.now()}`,
            role: 'model',
            text: matchedFallback,
            timestamp: new Date(),
          },
        ]);
      } else {
        setErrorText('Connection timeout. Use quick prompts for offline simulation.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 35 }}
            className="bg-white w-[320px] sm:w-[380px] h-[520px] rounded-2xl shadow-3xl overflow-hidden flex flex-col border border-gray-150 mb-4"
          >
            {/* Panel Head */}
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gray-800 text-indigo-400 rounded-lg">
                  <Sparkles size={16} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-none tracking-tight">Monish AI</h4>
                  <span className="text-[10px] text-gray-400 font-mono">Autonomous Recruiter Aid</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/40">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 max-w-[85%] ${
                    m.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                      m.role === 'user' ? 'bg-black text-white' : 'bg-indigo-50 border border-indigo-100 text-indigo-700'
                    }`}
                  >
                    {m.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                  </div>

                  <div className="space-y-1">
                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-black text-white rounded-tr-none'
                          : 'bg-white text-gray-800 rounded-tl-none border border-gray-150/60 shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    </div>
                    <span className="text-[9px] text-gray-450 font-mono block pl-1">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 max-w-[85%]">
                  <div className="h-7 w-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 animate-pulse">
                    <Bot size={13} />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-150 shadow-xs flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {errorText && (
                <div className="bg-amber-50 text-amber-800 p-2.5 rounded-lg border border-amber-150 text-[11px] flex gap-1.5">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{errorText}</span>
                </div>
              )}

              <div ref={scrollRef} />
            </div>

            {/* Quick Prompts Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-[10px] text-gray-700 bg-white hover:bg-black hover:text-white border border-gray-250 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-gray-150 flex gap-2 bg-white"
            >
              <input
                type="text"
                placeholder="Ask about my projects, availability..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 text-xs sm:text-sm rounded-lg border border-gray-200 px-3 py-2 focus:border-black outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-black hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-black text-white rounded-lg transition-colors cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Toggle Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 rounded-full bg-black text-white flex items-center justify-center shadow-2xl relative cursor-pointer group z-50 hover:bg-gray-800 transition-colors"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="absolute shrink-0"
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="absolute shrink-0 flex items-center justify-center"
            >
              <MessageSquare size={22} />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-indigo-600 text-[8px] font-bold text-white leading-none">
                AI
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
