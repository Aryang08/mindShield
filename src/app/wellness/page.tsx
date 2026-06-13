'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, Wind, Clock, Play, Pause, RotateCcw, Sparkles,
  Sun, Eye, Target, Pencil, Moon, Coffee, BookOpen,
  Dumbbell,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

// ─── Breathing Exercise Component ───
type BreathingPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'idle';

interface BreathingConfig {
  name: string;
  description: string;
  difficulty: string;
  phases: { name: string; duration: number }[];
  totalDuration: string;
  gradient: string;
}

const breathingExercises: BreathingConfig[] = [
  {
    name: 'Box Breathing',
    description: 'Equal intervals of inhale, hold, exhale, and hold. Used by Navy SEALs for calm focus.',
    difficulty: 'Beginner',
    phases: [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 4 },
      { name: 'Exhale', duration: 4 },
      { name: 'Hold', duration: 4 },
    ],
    totalDuration: '4 minutes',
    gradient: 'from-[#2ec4b6] to-[#0d9488]',
  },
  {
    name: '4-7-8 Breathing',
    description: 'A natural tranquilizer for the nervous system. Reduces anxiety and helps you fall asleep.',
    difficulty: 'Intermediate',
    phases: [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 7 },
      { name: 'Exhale', duration: 8 },
    ],
    totalDuration: '5 minutes',
    gradient: 'from-[#8b5cf6] to-[#6d28d9]',
  },
  {
    name: 'Deep Breathing',
    description: 'Simple deep breaths to activate your parasympathetic nervous system and reduce stress.',
    difficulty: 'Beginner',
    phases: [
      { name: 'Inhale', duration: 5 },
      { name: 'Exhale', duration: 5 },
    ],
    totalDuration: '3 minutes',
    gradient: 'from-[#3b82f6] to-[#1d4ed8]',
  },
];

function BreathingCard({ config }: { config: BreathingConfig }) {
  const [active, setActive] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [cycles, setCycles] = useState(0);

  const phase = config.phases[phaseIdx];
  const phaseName = active ? phase?.name || '' : 'Ready';

  const scale = active
    ? phase?.name === 'Inhale' ? 1.3 : phase?.name === 'Exhale' ? 0.8 : 1.1
    : 1;

  const reset = useCallback(() => {
    setActive(false);
    setPhaseIdx(0);
    setCountdown(0);
    setCycles(0);
  }, []);

  useEffect(() => {
    if (!active) return;
    setCountdown(config.phases[phaseIdx].duration);
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          const nextIdx = (phaseIdx + 1) % config.phases.length;
          if (nextIdx === 0) setCycles((prev) => prev + 1);
          setPhaseIdx(nextIdx);
          return config.phases[nextIdx].duration;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [active, phaseIdx, config.phases]);

  useEffect(() => {
    if (cycles >= 4) reset();
  }, [cycles, reset]);

  return (
    <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">{config.name}</h3>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--glass-bg-medium)] text-[var(--text-muted)]">{config.difficulty}</span>
        </div>
        <div className="flex items-center gap-1 text-[var(--text-secondary)]">
          <Clock className="w-3 h-3" />
          <span className="text-[10px]">{config.totalDuration}</span>
        </div>
      </div>

      {/* Breathing Circle */}
      <div className="relative w-40 h-40 flex items-center justify-center my-4">
        <motion.div
          animate={{ scale }}
          transition={{ duration: phase?.duration || 4, ease: 'easeInOut' }}
          className={`w-32 h-32 rounded-full bg-gradient-to-br ${config.gradient} opacity-20 absolute`}
        />
        <motion.div
          animate={{ scale: active ? scale * 0.85 : 0.85 }}
          transition={{ duration: phase?.duration || 4, ease: 'easeInOut' }}
          className={`w-24 h-24 rounded-full bg-gradient-to-br ${config.gradient} opacity-40 absolute`}
        />
        <div className="relative z-10 text-center">
          <p className="text-lg font-bold text-[var(--text-primary)]">{phaseName}</p>
          {active && <p className="text-3xl font-extrabold text-[var(--text-primary)] mt-1">{countdown}</p>}
          {!active && <Wind className="w-6 h-6 text-[var(--text-secondary)] mx-auto mt-2" />}
        </div>
      </div>

      {active && <p className="text-[10px] text-[var(--text-secondary)] mb-3">Cycle {cycles + 1}/4</p>}
      <p className="text-xs text-[var(--text-secondary)] text-center mb-4 leading-relaxed">{config.description}</p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setActive(!active)}
          className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${active
            ? 'bg-[var(--glass-bg-medium)] text-[var(--text-primary)] hover:bg-[var(--glass-bg-heavy)]'
            : `bg-gradient-to-r ${config.gradient} text-white hover:opacity-90`
          }`}
        >
          {active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {active ? 'Pause' : 'Start'}
        </button>
        {active && (
          <button onClick={reset} className="p-2 rounded-lg bg-[var(--glass-bg-medium)] text-[var(--text-secondary)] hover:text-[var(--text-secondary)]">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Mindfulness Exercises ───
const mindfulnessExercises = [
  { icon: Pencil, title: 'Gratitude Journaling', duration: '5 min', desc: 'Write down 3 things you are grateful for today. Shifts focus from stress to appreciation.', color: '#34d399' },
  { icon: Eye, title: 'Body Scan Meditation', duration: '10 min', desc: 'Progressively relax each body part from head to toe. Releases physical tension from study sessions.', color: '#2ec4b6' },
  { icon: Dumbbell, title: 'Progressive Muscle Relaxation', duration: '8 min', desc: 'Tense and release muscle groups systematically. Great for physical stress relief.', color: '#a78bfa' },
  { icon: Sun, title: 'Success Visualization', duration: '5 min', desc: 'Visualize yourself succeeding in your exam. Build confidence through positive mental imagery.', color: '#fbbf24' },
  { icon: Target, title: 'Micro-Goal Planning', duration: '3 min', desc: 'Break your next study session into 3 tiny achievable goals. Build momentum through small wins.', color: '#3b82f6' },
];

// ─── Recovery Plan ───
const recoveryPlan = [
  { icon: Moon, title: 'Sleep Optimization', items: ['Go to bed by 10:30 PM for the next 3 days', 'No screens 30 minutes before sleep', 'Try 4-7-8 breathing before bed'] },
  { icon: BookOpen, title: 'Study Adjustment', items: ['Reduce study hours to 6h/day this week', 'Focus on revision, not new topics', 'Take 15-min breaks every 90 minutes'] },
  { icon: Heart, title: 'Daily Mindfulness', items: ['Morning: 5-min gratitude journaling', 'Afternoon: Box breathing before study', 'Evening: Body scan before sleep'] },
  { icon: Coffee, title: 'Recovery Activities', items: ['30-min outdoor walk daily', 'Call a friend or family member', 'Listen to your favorite music for 20 min'] },
];

export default function WellnessPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial="hidden" animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        className="max-w-6xl space-y-8"
      >
        {/* Header */}
        <motion.div variants={fadeUp}>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-[#f87171]" /> Wellness Hub
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1.5">Personalized exercises for your mental well-being</p>
        </motion.div>

        {/* Current State Banner */}
        <motion.div variants={fadeUp}
          className="p-5 rounded-2xl bg-gradient-to-r from-[#2ec4b6]/10 to-[#8b5cf6]/10 border border-[var(--border-default)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#a78bfa]" />
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Based on your recent data, we recommend:</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">Current stress level: <span className="text-[#fbbf24] font-medium">Moderate (45/100)</span></p>
            </div>
          </div>
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#2ec4b6]/20 text-[#2ec4b6] border border-[#2ec4b6]/20">
            Breathing Exercises Recommended
          </span>
        </motion.div>

        {/* Breathing Exercises */}
        <motion.div variants={fadeUp}>
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <Wind className="w-5 h-5 text-[var(--brand-teal)]" /> Breathing Exercises
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {breathingExercises.map((ex) => (
              <BreathingCard key={ex.name} config={ex} />
            ))}
          </div>
        </motion.div>

        {/* Mindfulness Exercises */}
        <motion.div variants={fadeUp}>
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <Sun className="w-5 h-5 text-[#fbbf24]" /> Mindfulness Exercises
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mindfulnessExercises.map((ex, i) => {
              const Icon = ex.icon;
              return (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }}
                  className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="w-5 h-5" style={{ color: ex.color }} />
                    <span className="text-[10px] text-[var(--text-secondary)] flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {ex.duration}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">{ex.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">{ex.desc}</p>
                  <button className="text-xs font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1">
                    <Play className="w-3 h-3" /> Start Exercise
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recovery Plan */}
        <motion.div variants={fadeUp}>
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#f87171]" /> Personalized Recovery Plan
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-5">Generated based on your elevated stress levels this week</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {recoveryPlan.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div key={i} variants={fadeUp}
                  className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-[#a78bfa]" />
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{plan.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {plan.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2ec4b6] mt-1.5 shrink-0" />
                        <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
