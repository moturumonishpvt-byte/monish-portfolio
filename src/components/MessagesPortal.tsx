import { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Trash2, Mail, Building, Clock, ChevronRight, X, AlertCircle } from 'lucide-react';
import { ContactMessage } from '../types';

interface MessagesPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MessagesPortal({ isOpen, onClose }: MessagesPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Quick fallback messages during offline states or preview initialization
  const defaultLogs: ContactMessage[] = [
    {
      id: 'demo-1',
      name: 'Roodra Vilohit',
      email: 'rvilohit@google.com',
      company: 'Google AI Research',
      text: 'Hi Moturu! I saw your Aequitas AI bias mitigation model and would love to chat. Are you open to a full-time SDE role starting soon? Let me know your availability!',
      timestamp: new Date().toLocaleDateString(),
      aiResponseDraft: `Hi Roodra Vilohit,\n\nThank you for reaching out! I am thrilled to hear of your interest in my Aequitas AI Bias Mitigation project. The challenge of accent discrimination in speech models is indeed an area I have spent significant time researching and optimizing.\n\nI am extremely interested in discussing software engineering opportunities at Google AI Research. I am currently available for interviews and can jump on a call at your convenience. I will reach out to you via rvilohit@google.com to coordinate details.\n\nBest regards,\nMoturu Monish`,
      status: 'unread',
    },
    {
      id: 'demo-2',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@startup-incubator.in',
      company: 'Innovate Labs',
      text: 'Excellent portfolio. We need someone who can deploy TensorFlow Lite models locally for computer vision projects. Let me know if you do freelance or consulting.',
      timestamp: new Date(Date.now() - 3600 * 24 * 1000).toLocaleDateString(),
      aiResponseDraft: `Hi Rohan Sharma,\n\nThank you for checking out my work! Embedding TensorFlow Lite models directly on Android and custom hardware (similar to my Academic Monitor System) is exactly my sweet spot. \n\nI would be delighted to consult with Innovate Labs regarding your embedded computer vision targets. Let us set up a discussion!\n\nWarmly,\nMoturu Monish`,
      status: 'read',
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        // If server returns messages, use them, otherwise fallback to our highly polished demo items
        if (data && data.length > 0) {
          setMessages(data);
        } else {
          setMessages(defaultLogs);
        }
      } else {
        setMessages(defaultLogs);
      }
    } catch {
      setMessages(defaultLogs);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthenticate = (e: FormEvent) => {
    e.preventDefault();
    // Use an intuitive passcode representing Monish or a simple demo pass for evaluation
    if (passcode.toLowerCase() === 'monish' || passcode === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Use "monish" or "1234" to evaluate.');
    }
  };

  const handleDelete = async (id: string, e: MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      } else {
        // Fallback for client side only support
        setMessages(messages.filter((msg) => msg.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch {
      setMessages(messages.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Dim backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/55 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Pane drawer container */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="relative bg-white w-full max-w-2xl h-full flex flex-col shadow-2xl z-25 overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-100 p-6 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <h3 className="font-mono text-base font-bold text-gray-900 tracking-tight">
              ADMIN CONTROL PORTAL
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Auth wall or database logs list */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col justify-center p-8 max-w-sm mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
                <ShieldAlert size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 font-sans tracking-tight">
                Authorize Core Services
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Unlock the contact inbox logs. Enter passkey to inspect recruiter submissions and Gemini response recommendations.
              </p>
            </div>

            <form onSubmit={handleAuthenticate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-450 uppercase mb-1.5">
                  Portfolio Passcode
                </label>
                <input
                  type="password"
                  placeholder="e.g. monish or 1234"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full text-sm rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 focus:border-black focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all font-mono"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs leading-normal flex items-start gap-1.5 border border-red-100">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold text-sm transition-all focus:ring-2 focus:ring-black cursor-pointer shadow-sm"
              >
                Decode Inbox
              </button>
            </form>

            <div className="text-center pt-2">
              <span className="text-[10px] text-gray-450 font-mono">
                Hint: Passcode is "monish" or "1234" for recruiter tests.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Split layout: left message lists, right selected message insights */}
            <div className="w-full flex">
              <div className="w-1/2 border-r border-gray-100 flex flex-col h-full bg-white select-none">
                <div className="p-4 border-b border-gray-50 bg-gray-50/20">
                  <span className="text-xs font-mono font-bold text-gray-400">
                    MESSAGES ({messages.length})
                  </span>
                </div>

                {isLoading ? (
                  <div className="flex-1 flex justify-center items-center">
                    <span className="text-xs text-gray-400 font-mono">Loading data...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-xs text-gray-450 font-mono">No submissions received.</span>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        className={`p-4 text-left cursor-pointer transition-colors relative group border-l-4 ${
                          selectedMessage?.id === msg.id
                            ? 'bg-neutral-50/80 border-slate-900'
                            : 'hover:bg-gray-50/50 border-transparent'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <p className="font-semibold text-xs sm:text-sm text-gray-950 truncate max-w-[140px]">
                            {msg.name}
                          </p>
                          <span className="text-[10px] text-gray-400 font-mono shrink-0">
                            {msg.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-mono truncate mb-1">
                          {msg.company || 'Private Recruiter'}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2 pr-4">
                          {msg.text}
                        </p>

                        <button
                          onClick={(e) => handleDelete(msg.id, e)}
                          className="absolute right-2 top-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-100 rounded"
                          title="Purge Entry"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Message Details / Gemini drafting support */}
              <div className="w-1/2 flex flex-col h-full bg-neutral-50/30">
                {selectedMessage ? (
                  <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    {/* Core Sender Data */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100/40 space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">
                          {selectedMessage.name}
                        </h4>
                        <span className="text-[11px] text-gray-400 font-mono">
                          Sender Identification Log
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-gray-650">
                        <div className="flex items-center gap-1.5">
                          <Mail size={13} className="text-gray-400 shrink-0" />
                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="hover:underline text-indigo-600 truncate"
                          >
                            {selectedMessage.email}
                          </a>
                        </div>
                        {selectedMessage.company && (
                          <div className="flex items-center gap-1.5">
                            <Building size={13} className="text-gray-400 shrink-0" />
                            <span className="truncate">{selectedMessage.company}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-gray-400 shrink-0" />
                          <span>Received: {selectedMessage.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Original Query Message */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                        Original Message text
                      </span>
                      <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100/40 text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.text}
                      </div>
                    </div>

                    {/* Gemini AI Auto Reply draft recommendation */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider block">
                          AI Gemini-drafted Response
                        </span>
                        <span className="text-[9px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded border border-indigo-100">
                          gemini-3.5-flash
                        </span>
                      </div>

                      <div className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-150 text-xs text-indigo-950 font-sans tracking-tight leading-relaxed whitespace-pre-wrap relative">
                        {selectedMessage.aiResponseDraft ? (
                          <>
                            {selectedMessage.aiResponseDraft}
                            <div className="mt-4 pt-3 border-t border-indigo-200/50 flex justify-end">
                              <a
                                href={`mailto:${selectedMessage.email}?subject=RE: Portfolio Discussion&body=${encodeURIComponent(
                                  selectedMessage.aiResponseDraft
                                )}`}
                                className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-indigo-700 bg-white hover:bg-neutral-50 px-2.5 py-1.5 rounded-md shadow-sm border border-indigo-200"
                              >
                                Dispatch via Local Email
                                <ChevronRight size={11} />
                              </a>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-2 text-gray-450 italic">
                            Drafting recommendation offline...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-2">
                    <span className="p-3 bg-gray-105 rounded-full text-gray-400 block">
                      <Mail size={18} />
                    </span>
                    <h5 className="text-xs font-mono font-bold text-gray-400">
                      NO MESSAGE SELECTED
                    </h5>
                    <p className="text-xs text-gray-450 max-w-[200px] leading-relaxed">
                      Select any submission card from the Left panel to check details and Gemini recommended email reply drafts.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
