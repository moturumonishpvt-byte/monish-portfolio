import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';
import { ContactMessage } from '../../types';

// ── EmailJS credentials ──────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_j3swlho';
const EMAILJS_TEMPLATE_ID = 'template_ly6k0eq';
const EMAILJS_PUBLIC_KEY  = 'wpl9een8d-a5V2g7X';

interface ContactSectionProps {
  onOpenInbox?: () => void;
  onNewMessageAdded?: (msg: ContactMessage) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNewMessageAdded,
}) => {
  const { content } = usePortfolioContent();
  const { personalInfo } = content;

  const [name,    setName]    = useState('');
  const [company, setCompany] = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError,   setSubmitError]   = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const resetForm = () => {
    setName(''); setCompany(''); setEmail(''); setMessage('');
    setSubmitError('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    // Template params must match your EmailJS template variables exactly
    const templateParams = {
      name:    name.trim(),
      company: company.trim() || 'Not provided',
      email:   email.trim(),
      message: message.trim(),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      // Also notify internal portal if wired up
      if (onNewMessageAdded) {
        onNewMessageAdded({
          id:        Date.now().toString(),
          name:      templateParams.name,
          email:     templateParams.email,
          company:   company.trim() || undefined,
          text:      templateParams.message,
          timestamp: new Date().toISOString(),
          status:    'unread',
        });
      }

      setSubmitSuccess(true);
      resetForm();
    } catch (err) {
      console.error('EmailJS error:', err);
      setSubmitError(
        'Failed to send your message. Please try emailing directly or try again in a moment.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 border-b border-gray-150 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black" />
              CHAPTER 11 • CONTACT &amp; INQUIRY
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
              LET'S BUILD SOMETHING EXTRAORDINARY.
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
            [ WHAT HAPPENS NEXT? ]
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left — Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-sans text-neutral-900 tracking-tight">
                Get In Direct Touch
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed font-normal">
                I am actively seeking SDE &amp; AI Software Engineering roles. Whether you have a
                challenging systems architecture problem, an engineering sprint, or an open role,
                my inbox is open.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-3xl border border-gray-200 hover:border-neutral-900 bg-white transition-all shadow-xs group"
              >
                <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <span className="text-sm font-bold text-neutral-900">{personalInfo.email}</span>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-3xl border border-gray-200 hover:border-neutral-900 bg-white transition-all shadow-xs group"
              >
                <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Phone / WhatsApp
                  </span>
                  <span className="text-sm font-bold text-neutral-900">{personalInfo.phone}</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-3xl border border-gray-200 bg-white shadow-xs">
                <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="text-sm font-bold text-neutral-900">{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — EmailJS Form */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            <AnimatePresence mode="wait">
              {/* ── SUCCESS STATE ── */}
              {submitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-8"
                >
                  <div className="mx-auto h-14 w-14 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-sm">
                    <CheckCircle2 size={26} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold font-sans text-neutral-900 tracking-tight">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                      Your inquiry has been delivered to my Gmail inbox. I'll get back to you
                      shortly.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="flex-1 max-w-xs py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2"
                    >
                      Open Mail App <ArrowUpRight size={14} />
                    </a>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="py-3.5 px-6 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-bold uppercase tracking-wider rounded-2xl transition-colors cursor-pointer"
                    >
                      Send Another
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── FORM STATE ── */
                <motion.form
                  key="contact-form"
                  ref={formRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Roodra Vilohit"
                        disabled={isSubmitting}
                        className="w-full text-sm rounded-xl border border-gray-200 bg-neutral-50 px-4 py-3 outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black transition-all disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1.5">
                        Company / Firm (Optional)
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Google / Tech Startup"
                        disabled={isSubmitting}
                        className="w-full text-sm rounded-xl border border-gray-200 bg-neutral-50 px-4 py-3 outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@organization.com"
                      disabled={isSubmitting}
                      className="w-full text-sm rounded-xl border border-gray-200 bg-neutral-50 px-4 py-3 outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black transition-all disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1.5">
                      Your Message / Inquiry *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="I saw your Academic Monitor on-device face recognition architecture and would like to discuss..."
                      disabled={isSubmitting}
                      className="w-full text-sm rounded-xl border border-gray-200 bg-neutral-50 px-4 py-3 outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black transition-all resize-none disabled:opacity-60"
                    />
                  </div>

                  {/* Error message */}
                  {submitError && (
                    <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700 leading-relaxed">{submitError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !email.trim() || !message.trim()}
                    className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Transmit Inquiry
                        <Send
                          size={14}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
