import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Enable JSON body requests
app.use(express.json());

// Initialize server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// In-memory message logs database
interface ServerContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  text: string;
  timestamp: string;
  aiResponseDraft?: string;
  status: 'unread' | 'read' | 'replied';
}

const messageLogs: ServerContactMessage[] = [
  {
    id: 'msg-recruiter-demo',
    name: 'Roodra Vilohit',
    email: 'rvilohit@google.com',
    company: 'Google AI Research',
    text: 'Hi Moturu! I saw your Aequitas AI bias mitigation model and would love to chat. Are you open to a full-time SDE role starting soon? Let me know your availability!',
    timestamp: new Date().toLocaleDateString(),
    aiResponseDraft: `Hi Roodra Vilohit,\n\nThank you for reaching out! I am thrilled to hear of your interest in my Aequitas AI Bias Mitigation project. The challenge of accent discrimination in speech models is indeed an area I have spent significant time researching and optimizing.\n\nI am extremely interested in discussing software engineering opportunities at Google AI Research. I am currently available for interviews and can jump on a call at your convenience. I will reach out to you via rvilohit@google.com to coordinate details.\n\nBest regards,\nMoturu Monish`,
    status: 'unread',
  }
];

// Context dataset about Moturu Monish to preload Gemini requests
const monishResumedb = `
Name: Moturu Monish
Title: Software Engineer (SDE) | Full Stack & AI/ML Systems
Location: Visakhapatnam, Andhra Pradesh, India
Phone: +91 6303636530
Email: moturumonishofcl@gmail.com
LinkedIn: linkedin.com/in/moturu-monish-joyboy
GitHub: github.com/moturumonishpvt-byte

Education:
- Vignan's Institute of Information Technology (Sept. 2023 - Present)
- Degree: Bachelor of Technology in Computer Science (Data Science)
- Cumulative GPA: 8.64 / 10.0

Technical Skills:
- Languages: Python, Java, TypeScript, JavaScript, SQL, Kotlin
- AI / ML & Edge: TensorFlow Lite, ONNX Runtime, Scikit-learn, Gemma, LLM Integration, Pandas, NumPy, Prompt Engineering
- Full Stack / Web: React.js, React Native, Node.js, Express.js, FastAPI, Flask, REST APIs, WebSockets, Tailwind CSS, MUI
- Databases & Tools: PostgreSQL, Supabase, SQLite, Docker, Git, GitHub Actions, Playwright, Vercel

Core Projects:
1. Academic Monitor System (Jan. 2026 - Present):
   - Tech: React Native, Kotlin, TensorFlow Lite, ONNX, BLE, Node.js, Supabase
   - Built a 3-app offline-first attendance suite (Student, Faculty, Admin).
   - Utilizes on-device MobileFaceNet TensorFlow Lite (128-D embeddings, cosine threshold 0.60) and RSSI-gated P2P BLE handshakes (threshold > -85 dBm).
   - Native Kotlin modules accelerate inference by 25–40x (reducing latency from ~6,000ms to ~200ms).
   - Admin client features ArcFace ResNet-100 INT8 ONNX (512-D embeddings, 52 FPS, 187ms latency, 89MB RAM), 11-tab console, Supabase WebSocket locks, and Playwright ERP sync.

2. Aequitas — AI Bias Mitigation Platform (2026):
   - Tech: Python, Flask, Gemma, Perspective API, Supabase (PostgreSQL), Docker
   - AI auditing platform for detecting and mitigating accent-based bias in automated video/audio interview scoring across 200+ applicant profiles.
   - Post-hoc score calibration keeps demographic parity variance under <7%.
   - Ingests 500-record batch chunks into Supabase with SynthID-style cryptographic watermarking for audit trails.

3. PhishGuard AI — Threat Detection Suite (Dec. 2025):
   - Tech: Python, FastAPI, Scikit-learn, React, Chrome MV3 Extension, SQLite
   - Threat detection suite evaluating 11,431 URLs across 88 structural and lexical features with a 200-estimator Random Forest classifier.
   - Hybrid scoring model (70% ML, 30% heuristic) with guard.js DOM observer for credential-harvesting mismatch and Levenshtein distance (<2) against 13 global targets.

4. Skill Connect — Campus Collaboration Hub (Jan. 2025):
   - Tech: React, TypeScript, Supabase, Tailwind CSS, WebSockets
   - Campus collaboration hub spanning 22 routes, 8 database tables, and ~4,150 lines of TypeScript.
   - Features real-time WebSocket feeds, role-based matchmaking, strict Row-Level Security, and automated peer-review reputation recalculation.

Leadership & Achievements:
- National Finalist, National Entrepreneurship Challenge (NEC) 2025, IIT Bombay: Top 0.6% out of 1,000+ teams across India.
- Web Development Lead, E-Cell VIIT (Aug. 2024 - Dec. 2025): Maintained 99.9% uptime handling 500+ participant registrations, mentored 5 junior devs.
- Campus Ambassador, GUESSS India • IIT Mandi (Aug. 2025 - Dec. 2025): Gathered 100+ validated survey responses across South India.
- Academic Standing: 8.64 / 10.0 CGPA at Vignan's Institute in CS (Data Science).
`;

// AI Assistant Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message payload is required' });
  }

  try {
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role,
      parts: [{ text: h.parts?.[0]?.text || h.text || '' }]
    }));

    const systemPrompt = `You are the autonomous AI Representative of Moturu Monish, a master Software Engineer. State your coordinates concisely, speak with stellar technical accuracy, and answer recruiter checks directly in first-person (or on behalf of Monish) using this portfolio context:\n${monishResumedb}\n\nKeep answers friendly, professional, high-impact, and short (under 3-4 lines). Do not make up facts.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: message,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Gemini Chat error:', error);
    res.status(500).json({ error: error.message || 'Gemini processing failed.' });
  }
});

// Contact Form submission & Auto Reply Generator
app.post('/api/contact', async (req, res) => {
  const { name, email, company, text } = req.body;
  if (!name || !email || !text) {
    return res.status(400).json({ error: 'Name, email, and message body are required' });
  }

  try {
    // 1. Generate customized draft recommendation reply using Gemini
    const systemPrompt = `You are Moturu Monish's automated email reply assistant. Review the recruiter's message and write a highly professional, polite, and persuasive direct mail draft response from Monish's perspective. Acknowledge their company, and reference Monish's specific projects or skills that correspond to their requirements.\n\nMonish's Profile context:\n${monishResumedb}\n\nKeep the draft friendly, concise, and structured. Sign off with 'Best regards,\nMoturu Monish'. Do not include markdown brackets or instructions—output ONLY the plain text of the email.`;

    const userPrompt = `Name of Recruiter: ${name}\nEmail: ${email}\nCompany: ${company || 'Unspecified'}\nInquiry Message: "${text}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const draftReply = response.text || 'Thank you for your contact! I will follow up shortly.';

    // 2. Append message to database logs
    const newMsg: ServerContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      company,
      text,
      timestamp: new Date().toLocaleDateString(),
      aiResponseDraft: draftReply,
      status: 'unread',
    };
    messageLogs.unshift(newMsg);

    res.json({
      status: 'ok',
      draftReply,
    });
  } catch (error: any) {
    console.error('Contact Form Analysis error:', error);
    // Simple offline fallback log insertion on error
    const fallbackReply = `Hi ${name},\n\nThank you for reaching out via my portfolio! I have received your message regarding: "${text.substring(0, 40)}...". I am very interested, and I will check back and email you shortly at ${email}.\n\nBest regards,\nMoturu Monish`;

    const newMsg: ServerContactMessage = {
      id: `msg-fallback-${Date.now()}`,
      name,
      email,
      company,
      text,
      timestamp: new Date().toLocaleDateString(),
      aiResponseDraft: fallbackReply,
      status: 'unread',
    };
    messageLogs.unshift(newMsg);

    res.json({
      status: 'ok',
      draftReply: fallbackReply,
    });
  }
});

// Admin Message retrieval
app.get('/api/messages', (req, res) => {
  res.json(messageLogs);
});

// Purge individual Message logs
app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const index = messageLogs.findIndex((m) => m.id === id);
  if (index !== -1) {
    messageLogs.splice(index, 1);
    return res.json({ status: 'ok' });
  }
  res.status(404).json({ error: 'Message log not matched' });
});

// Mounting static assets or Vite middleware depending on production targets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express Portfolio Server successfully started on http://0.0.0.0:${PORT}`);
  });
}

startServer();
