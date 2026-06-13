'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  HeartPulse,
  MessageCircle,
  Shield,
  Sparkles,
  Target,
  Wind,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const features = [
  { icon: BookOpen, title: 'Journal Analysis', text: 'Reflect freely and get structured signals for stress, confidence, and emotional patterns.' },
  { icon: BarChart3, title: 'Mood Trends', text: 'Track how sleep, study load, and exam pressure affect your weekly baseline.' },
  { icon: Brain, title: 'Burnout Signals', text: 'Spot risk patterns early so recovery becomes part of preparation, not a last resort.' },
  { icon: MessageCircle, title: 'AI Wellness Coach', text: 'Talk through hard study days with a coach tuned for high-pressure exam routines.' },
  { icon: Wind, title: 'Breathing Tools', text: 'Use short guided exercises before mock tests, revision blocks, or sleep.' },
  { icon: Target, title: 'Recovery Plans', text: 'Convert insights into small next steps for sleep, focus, rest, and study pacing.' },
];

const exams = ['NEET', 'JEE', 'UPSC', 'CAT', 'GATE', 'CUET', 'Board Exams'];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <nav className="fixed inset-x-0 top-0 z-50 glass-navbar">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="MindShield AI home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-teal)] via-[var(--brand-blue)] to-[var(--brand-lavender)]">
              <Shield className="h-4.5 w-4.5 text-white" />
            </span>
            <span className="text-base font-extrabold tracking-tight">MindShield AI</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <a className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]" href="#features">Features</a>
            <a className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]" href="#workflow">Workflow</a>
            <a className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]" href="#safety">Safety</a>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/dashboard" className="btn-primary min-h-10 px-4 py-2 text-sm">
              Start
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-auto grid min-h-[92vh] max-w-6xl items-center gap-10 px-4 pb-12 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-teal)]">
              <Sparkles className="h-3.5 w-3.5" />
              AI support for exam wellness
            </div>
            <h1 className="max-w-3xl font-[var(--font-display)] text-4xl font-black leading-[1.08] tracking-normal text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              MindShield AI
              <span className="block gradient-text">keeps your mind in the study plan.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
              A focused wellness workspace for students preparing for high-stakes exams. Log moods, write journals, understand stress patterns, and get practical recovery guidance before burnout takes over.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="btn-primary">
                Open Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="btn-secondary">
                Explore Features
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {exams.map((exam) => (
                <span key={exam} className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-bold text-[var(--text-muted)]">
                  {exam}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="glass-card p-4 sm:p-5"
          >
            <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">Today</p>
                  <h2 className="mt-1 text-lg font-extrabold">Stress forecast</h2>
                </div>
                <span className="rounded-lg bg-[var(--status-warning)]/15 px-3 py-1.5 text-xs font-bold text-[var(--status-warning)]">Moderate</span>
              </div>
              <div className="mt-5 space-y-4">
                {[
                  ['Mock test pressure', '72%'],
                  ['Sleep recovery', '58%'],
                  ['Confidence baseline', '64%'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-1.5 flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--glass-bg-heavy)]">
                      <div className="h-2 rounded-full bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-lavender)]" style={{ width: value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { icon: HeartPulse, label: 'Mood logged', value: 'Good' },
                { icon: BookOpen, label: 'Journal streak', value: '4 days' },
                { icon: Wind, label: 'Next action', value: 'Box breathing' },
                { icon: CheckCircle, label: 'Focus plan', value: 'Ready' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
                    <Icon className="mb-3 h-5 w-5 text-[var(--brand-teal)]" />
                    <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
                    <p className="mt-1 text-sm font-extrabold">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section id="features" className="section-padding border-y border-[var(--border-default)] bg-[var(--bg-surface)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--brand-teal)]">Features</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">A calmer system for serious preparation.</h2>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.article key={feature.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="glass-card glass-card-hover p-5">
                    <Icon className="h-5 w-5 text-[var(--brand-lavender)]" />
                    <h3 className="mt-4 text-base font-extrabold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{feature.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="workflow" className="section-padding">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
            {[
              ['01', 'Write honestly', 'Use the journal and mood check-in to record what is actually happening.'],
              ['02', 'See the pattern', 'AI turns scattered reflections into readable stress, trigger, and confidence signals.'],
              ['03', 'Act smaller', 'Choose one recovery action that fits today instead of trying to overhaul everything.'],
            ].map(([step, title, text]) => (
              <div key={step} className="border-l-2 border-[var(--brand-teal)] bg-[var(--bg-surface)] p-5">
                <p className="text-xs font-black text-[var(--brand-teal)]">{step}</p>
                <h3 className="mt-3 text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="safety" className="bg-[var(--bg-secondary)] px-4 py-12 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black">Wellness support, with clear boundaries.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                MindShield AI is not a therapist or emergency service. Crisis language is treated seriously and the app surfaces helpline guidance when needed.
              </p>
            </div>
            <Link href="/dashboard" className="btn-primary shrink-0">
              Continue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
