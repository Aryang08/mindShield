'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import {
  Shield, ArrowRight, BookOpen, Brain, Heart, Sparkles,
  Target, TrendingUp, Star, Users, Clock, ChevronRight,
  CheckCircle,
} from 'lucide-react';

// ─── Animation Variants ───
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ─── Animated Counter ───
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-white">{count.toLocaleString()}{suffix}</div>;
}

// ─── Features Data ───
const features = [
  { icon: '📝', title: 'AI Journal Analyzer', desc: 'Write daily journals and let AI extract emotional states, stress levels, anxiety indicators, and hidden triggers from your entries.' },
  { icon: '😊', title: 'Smart Mood Tracking', desc: 'Track your mood with emoji input and intensity scales. Visualize weekly trends, monthly patterns, and emotional heatmaps.' },
  { icon: '🔥', title: 'Burnout Prediction', desc: 'AI-powered risk scoring analyzes journal sentiment, mood history, study hours, and sleep to predict burnout before it happens.' },
  { icon: '🤖', title: 'AI Wellness Coach', desc: '24/7 conversational AI that remembers your exam type, goals, and emotional history for personalized guidance.' },
  { icon: '🧘', title: 'Adaptive Mindfulness', desc: 'Personalized breathing exercises and meditation dynamically selected based on your current emotional state.' },
  { icon: '💡', title: 'Smart Motivation', desc: 'Context-aware motivational messages based on your actual progress data — never generic platitudes.' },
  { icon: '🔮', title: 'Stress Forecast', desc: 'Predict future stress periods based on upcoming exams, mock schedules, and historical patterns.' },
  { icon: '🏥', title: 'Recovery Plans', desc: 'Personalized recovery roadmaps with sleep recommendations, study adjustments, and mindfulness plans.' },
];

const testimonials = [
  { name: 'Priya S.', exam: 'NEET', quote: 'MindShield AI helped me realize I was burnt out before it got worse. The breathing exercises before mock tests changed everything.', rating: 5 },
  { name: 'Arjun M.', exam: 'JEE', quote: 'The AI journal analysis caught my comparison anxiety pattern. Once I saw it clearly, I could work on it. My focus improved dramatically.', rating: 5 },
  { name: 'Kavya R.', exam: 'UPSC', quote: 'Having an AI coach that understands the UPSC journey is incredible. It gave me study-specific advice, not generic wellness tips.', rating: 5 },
];

import { ThemeToggle } from '@/components/ThemeToggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="MindShield AI Home" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--brand-teal)] to-[var(--brand-lavender)] flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">MindShield AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" aria-label="Go to Features section" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Features</a>
            <a href="#how-it-works" aria-label="Go to How It Works section" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">How It Works</a>
            <a href="#testimonials" aria-label="Go to Testimonials section" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/dashboard" aria-label="Get Started with Dashboard" className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-lavender)] text-white hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 w-full overflow-hidden">
        {/* Ambient Blobs */}
        <div className="blob-bg bg-primary w-[40vw] h-[40vw] top-[-10vw] left-[-10vw]"></div>
        <div className="blob-bg bg-tertiary-fixed-dim w-[30vw] h-[30vw] top-[10%] right-[-5vw]" style={{ animationDelay: '2s' }}></div>
        <div className="blob-bg bg-secondary w-[50vw] h-[50vw] bottom-[-20vh] left-[20vw]" style={{ animationDelay: '4s' }}></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto w-full flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs text-primary font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Powered by Generative AI
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-display-lg md:text-[56px] md:leading-[64px] font-display-lg text-on-surface mb-6"
          >
            Your AI-Powered{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-tertiary-container">
              Mental Wellness
            </span>{' '}
            Companion for Exam Success
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Go beyond simple tracking. Understanding emotions through natural language journals. Detecting hidden stress patterns. Identifying emotional triggers. Predicting burnout for students preparing for high-stakes examinations such as NEET, JEE, CUET, CAT, GATE, UPSC, and Board Exams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            <Link href="/dashboard" className="bg-gradient-to-r from-primary to-secondary text-on-primary font-label-md px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1 text-center font-semibold flex items-center gap-2">
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#features" className="glass-card text-on-surface font-label-md px-8 py-4 rounded-full transition-all hover:bg-white/80 text-center font-semibold flex items-center justify-center gap-2">
              See How It Works
            </a>
          </motion.div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden md:flex absolute -left-8 top-1/3 px-4 py-2.5 rounded-xl glass-card text-on-surface text-sm items-center gap-1 shadow-xl"
          >
            <span className="text-tertiary">✓</span> Stress Level: <span className="text-tertiary-fixed-dim font-bold">Low</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="hidden md:flex absolute -right-4 top-1/2 px-4 py-2.5 rounded-xl glass-card ai-border text-on-surface text-sm items-center gap-1 shadow-xl"
          >
            🧠 Burnout Risk: <span className="text-error font-bold">Moderate</span>
          </motion.div>
        </div>
      </section>

      {/* ─── Exam Types ─── */}
      <section className="py-12 border-y border-[var(--border-default)] w-full flex flex-col items-center">
        <div className="max-w-5xl mx-auto px-4 w-full flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {['NEET', 'JEE', 'UPSC', 'CAT', 'GATE', 'CUET', 'Board Exams'].map((exam) => (
            <span key={exam} className="text-sm md:text-base text-[var(--text-muted)] font-semibold tracking-wide">{exam}</span>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-24 px-4 w-full flex flex-col items-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Everything You Need for{' '}
              <span className="bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-lavender)] bg-clip-text text-transparent">Mental Wellness</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">Powered by advanced Generative AI to understand, predict, and support your emotional well-being.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-[var(--glass-bg-medium)] backdrop-blur-sm border border-[var(--border-default)] hover:border-[var(--border-strong)] hover:bg-[var(--glass-bg-heavy)] transition-all duration-300 group"
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-24 px-4 bg-[var(--bg-secondary)] w-full flex flex-col items-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-[var(--text-secondary)] text-lg">Three simple steps to better mental wellness</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-lavender)] opacity-30" />
            {[
              { step: '01', title: 'Write', desc: 'Express your feelings in a daily journal. No filters, no judgments — just you.', icon: BookOpen, color: '#2ec4b6' },
              { step: '02', title: 'Analyze', desc: 'AI analyzes your entries for emotions, stress triggers, burnout signals, and hidden patterns.', icon: Brain, color: '#a78bfa' },
              { step: '03', title: 'Thrive', desc: 'Get personalized coping strategies, mindfulness exercises, and coaching tailored to you.', icon: TrendingUp, color: '#34d399' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } } }}
                  className="text-center relative"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br mx-auto mb-5 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${s.color}20, ${s.color}10)`, border: `1px solid ${s.color}30` }}>
                    <Icon className="w-8 h-8" style={{ color: s.color }} />
                  </div>
                  <span className="text-xs font-bold text-[var(--text-muted)] tracking-widest">{s.step}</span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1 mb-2">{s.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-20 px-4 w-full flex flex-col items-center">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 10000, suffix: '+', label: 'Students Helped', icon: Users },
            { value: 92, suffix: '%', label: 'Felt Calmer', icon: Heart },
            { value: 85, suffix: '%', label: 'Improved Focus', icon: Target },
            { value: 24, suffix: '/7', label: 'Always Available', icon: Clock },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.5 } } }}
                className="text-center"
              >
                <Icon className="w-6 h-6 mx-auto mb-3 text-[var(--brand-teal)] opacity-60" />
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-[var(--text-secondary)] mt-2">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── AI Demo ─── */}
      <section className="py-24 px-4 bg-[var(--bg-secondary)] w-full flex flex-col items-center">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">See AI Analysis in Action</h2>
            <p className="text-[var(--text-secondary)]">Watch how MindShield AI understands your emotions</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Journal Input */}
            <div className="p-6 rounded-2xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)]">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[var(--brand-teal)]" />
                <span className="text-sm font-semibold text-[var(--text-secondary)]">Student Journal Entry</span>
              </div>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed italic">
                &ldquo;I studied 10 hours today but still feel like I am behind everyone preparing for JEE.
                My mock scores are not improving despite putting in so much effort. I don&apos;t know if I&apos;m
                good enough. Sometimes I think about just giving up because the pressure is too much.&rdquo;
              </p>
            </div>
            {/* AI Analysis */}
            <div className="p-6 rounded-2xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)]">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[var(--brand-lavender)]" />
                <span className="text-sm font-semibold text-[var(--text-secondary)]">AI Analysis Result</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Emotional State</span>
                  <span className="text-[var(--status-warning)] font-medium">High Anxiety & Stress</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Stress Level</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-[var(--border-default)] overflow-hidden">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[var(--status-warning)] to-[var(--status-error)]" />
                    </div>
                    <span className="text-[var(--status-error)] font-medium">78/100</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Confidence</span>
                  <span className="text-[var(--status-error)] font-medium">25/100</span>
                </div>
                <div className="pt-2 border-t border-[var(--border-default)]">
                  <p className="text-xs text-[var(--text-muted)] mb-2">Hidden Triggers Detected:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Comparison Anxiety', 'Perfectionism', 'Fear of Failure'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--status-warning)]/10 text-[var(--status-warning)] border border-[var(--status-warning)]/20">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-[var(--border-default)]">
                  <p className="text-xs text-[var(--text-muted)] mb-2">Suggested Actions:</p>
                  <div className="space-y-1.5">
                    {['Focus on progress over rank', 'Take a 15-minute mindful break', 'Review mistakes rather than scores'].map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle className="w-3 h-3 text-[var(--status-success)] mt-0.5 shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-24 px-4 w-full flex flex-col items-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Loved by Students</h2>
            <p className="text-[var(--text-secondary)]">Real stories from real exam warriors</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] hover:border-[var(--border-strong)] hover:bg-[var(--glass-bg-heavy)] transition-all"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[var(--status-warning)] fill-[var(--status-warning)]" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] border border-[var(--brand-teal)]/20">{t.exam}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-4 relative overflow-hidden w-full flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-container)] to-[var(--color-tertiary-fixed)] opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[var(--color-secondary)] opacity-[0.06] blur-[100px]" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Start Your Wellness Journey Today</h2>
          <p className="text-on-surface-variant text-lg mb-8">Your mental health matters more than any exam score. Let MindShield AI be your trusted companion.</p>
          <Link href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-primary to-tertiary-container shadow-lg shadow-primary/25 hover:shadow-primary/40 text-on-primary hover:-translate-y-1 transition-all"
          >
            Get Started Free <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-4 border-t border-[var(--border-default)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[var(--brand-teal)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">MindShield AI</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Dashboard</Link>
              <Link href="/journal" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Journal</Link>
              <Link href="/wellness" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Wellness</Link>
              <Link href="/coach" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">AI Coach</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[var(--border-default)] text-center">
            <p className="text-xs text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
              ⚠️ MindShield AI is a wellness support tool, not a replacement for professional mental health services.
              If you are in crisis, please reach out to a mental health professional or call a helpline.
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-3">© {new Date().getFullYear()} MindShield AI. Built for student wellness.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
