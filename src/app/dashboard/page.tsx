'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Zap, BookOpen, ArrowRight, BarChart3, Flame, Sparkles, Target, AlertTriangle, Trophy, Wind, MessageCircle, TrendingUp
} from 'lucide-react';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('recharts').then((mod) => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then((mod) => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((mod) => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((mod) => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then((mod) => mod.ResponsiveContainer), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then((mod) => mod.CartesianGrid), { ssr: false });
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getMoods, saveMood, getJournals, generateId } from '@/lib/storage';
import type { MoodType } from '@/lib/types';
import { MOOD_EMOJIS } from '@/lib/types';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

// SVG circular gauge component
function CircularGauge({ value, max = 100, color, label, size = 110 }: { value: number; max?: number; color: string; label: string; size?: number }) {
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);
  return (
    <div className="flex flex-col items-center gap-2 relative">
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border-default)" strokeWidth="8" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="8"
            strokeLinecap="round" strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[var(--text-primary)]">{value}</span>
        </div>
      </div>
      <span className="text-xs text-[var(--text-muted)] font-medium">{label}</span>
    </div>
  );
}

// Empty state placeholder component
function EmptyState({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[var(--text-muted)]" />
      </div>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{title}</h3>
      <p className="text-xs text-[var(--text-muted)] max-w-xs leading-relaxed">{description}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [moodSaved, setMoodSaved] = useState(false);
  const [moodEntries, setMoodEntries] = useState<ReturnType<typeof getMoods>>([]);
  const [journalCount, setJournalCount] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const moods = getMoods();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMoodEntries(moods);
    const todayMood = moods.find((m) => m.date === today);
    if (todayMood) {
      setSelectedMood(todayMood.mood);
      setMoodSaved(true);
    }
    setJournalCount(getJournals().length);
  }, []);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setMoodSaved(false);
  };

  const handleSaveMood = () => {
    if (!selectedMood) return;
    const newMood = {
      id: generateId(),
      mood: selectedMood,
      emoji: MOOD_EMOJIS[selectedMood],
      intensity,
      factors: [],
      studyHours: 0,
      sleepHours: 0,
      note: '',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    saveMood(newMood);
    setMoodEntries(getMoods());
    setMoodSaved(true);
  };

  const hasData = moodEntries.length > 0;
  const hasJournals = journalCount > 0;
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Build chart data from real mood entries (last 7)
  const weekData = hasData
    ? moodEntries.slice(-7).map((m) => ({
        day: new Date(m.createdAt).toLocaleDateString('en-IN', { weekday: 'short' }),
        mood: m.intensity,
        stress: Math.max(10 - m.intensity, 1) * 10,
      }))
    : [];

  return (
    <DashboardLayout>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8 max-w-6xl">
        {/* Welcome */}
        <motion.div variants={fadeUp}>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Welcome back! 👋</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1.5" suppressHydrationWarning>{today}</p>
          <p className="text-[var(--text-secondary)] text-sm mt-1 italic">&quot;Every hour of focused study is progress. Trust the process.&quot;</p>
        </motion.div>

        {/* Quick Mood Check */}
        <motion.div variants={fadeUp} className="p-6 md:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm">
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">How are you feeling right now?</h2>
          <div className="flex flex-wrap items-center gap-3">
            {(Object.keys(MOOD_EMOJIS) as MoodType[]).map((mood) => (
              <button
                key={mood}
                onClick={() => handleMoodSelect(mood)}
                className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl transition-all duration-200 min-w-[72px]
                  ${selectedMood === mood
                    ? 'bg-[var(--brand-teal)]/15 ring-2 ring-[var(--brand-teal)]/40 scale-105'
                    : 'bg-[var(--glass-bg-medium)] border border-[var(--border-default)] hover:bg-[var(--glass-bg-heavy)] hover:scale-105'}`}
              >
                <span className="text-2xl leading-none">{MOOD_EMOJIS[mood]}</span>
                <span className="text-[11px] text-[var(--text-secondary)] capitalize font-medium">{mood}</span>
              </button>
            ))}
          </div>
          {selectedMood && !moodSaved && (
            <div className="flex flex-wrap items-center gap-5 mt-5 pt-5 border-t border-[var(--border-default)]">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="intensity-slider" className="text-xs text-[var(--text-muted)] font-medium">Intensity: {intensity}/10</label>
                <input
                  id="intensity-slider"
                  type="range" min="1" max="10" value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-32 accent-[var(--brand-teal)]"
                />
              </div>
              <button onClick={handleSaveMood} className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-lavender)] text-white hover:opacity-90 transition-opacity shadow-md">
                Save Mood
              </button>
            </div>
          )}
          {moodSaved && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-[var(--status-success)] font-medium">✓ Mood logged for today!</span>
            </div>
          )}
        </motion.div>

        {/* Metrics Grid */}
        <motion.div variants={fadeUp}>
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[var(--brand-teal)]" /> Your Stats
          </h2>
          {hasData ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Stress Score */}
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
                <CircularGauge value={Math.round(moodEntries.slice(-1)[0]?.intensity * 10 || 0)} color="var(--color-primary)" label="Stress Score" />
              </div>
              {/* Burnout Risk */}
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-3">
                <div className="text-sm text-on-surface-variant font-medium">Burnout Risk</div>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[var(--status-warning)]/20 text-[var(--status-warning)]">
                  {moodEntries.length < 3 ? 'Insufficient Data' : 'Moderate'}
                </span>
                <div className="w-full h-2.5 rounded-full bg-[var(--glass-bg-medium)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--status-success)] via-[var(--status-warning)] to-[var(--status-error)]"
                    initial={{ width: 0 }}
                    animate={{ width: moodEntries.length < 3 ? '10%' : '45%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
              {/* Confidence */}
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
                <CircularGauge value={Math.round(moodEntries.slice(-1)[0]?.intensity * 10 || 0)} color="var(--color-secondary)" label="Confidence" />
              </div>
              {/* Streak */}
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-3">
                <div className="text-sm text-on-surface-variant font-medium">Journal Streak</div>
                <div className="flex items-center gap-2">
                  <Flame className="w-7 h-7 text-[var(--status-warning)]" />
                  <span className="text-3xl font-bold text-[var(--text-primary)]">{journalCount}</span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">{journalCount === 1 ? 'entry' : 'entries'} total</span>
              </div>
            </div>
          ) : (
            <div className="glass-card p-6 rounded-2xl">
              <EmptyState
                icon={BarChart3}
                title="No stats yet"
                description="Log your first mood above to start seeing your stress score, burnout risk, and confidence metrics here."
              />
            </div>
          )}
        </motion.div>

        {/* AI Insight Cards */}
        <motion.div variants={fadeUp}>
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--brand-lavender)]" /> AI Insights
          </h2>
          {hasJournals ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { type: 'trigger', icon: AlertTriangle, title: 'Biggest Trigger', desc: 'Write more journal entries to discover your stress triggers.', color: 'var(--status-warning)', bg: 'from-orange-500/10 to-red-500/10' },
                { type: 'mood', icon: Sparkles, title: 'Mood Driver', desc: 'Patterns in your mood will appear after a few entries.', color: 'var(--brand-teal)', bg: 'from-teal-500/10 to-cyan-500/10' },
                { type: 'blocker', icon: Zap, title: 'Productivity Blocker', desc: 'AI will identify blockers as you journal more.', color: 'var(--brand-lavender)', bg: 'from-violet-500/10 to-purple-500/10' },
                { type: 'achievement', icon: Trophy, title: 'Achievement', desc: `${journalCount} journal ${journalCount === 1 ? 'entry' : 'entries'}! Keep going.`, color: 'var(--status-success)', bg: 'from-emerald-500/10 to-green-500/10' },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.type}
                    variants={fadeUp}
                    className="glass-card ai-border ai-glow p-6 rounded-2xl transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <Icon className="w-5 h-5 mb-3" style={{ color: card.color }} />
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{card.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{card.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm">
              <EmptyState
                icon={Sparkles}
                title="AI insights will appear here"
                description="Write your first journal entry and let AI analyze your emotions, triggers, and patterns. Insights get smarter with each entry."
              />
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeUp}>
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { href: '/journal', icon: BookOpen, label: 'Write in Journal', desc: 'Express your thoughts', gradient: 'from-[#2ec4b6] to-[#0d9488]' },
              { href: '/wellness', icon: Wind, label: 'Try Breathing', desc: 'Calm your mind', gradient: 'from-[#8b5cf6] to-[#6d28d9]' },
              { href: '/coach', icon: MessageCircle, label: 'Talk to AI Coach', desc: 'Get personalized support', gradient: 'from-[#3b82f6] to-[#1d4ed8]' },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${action.gradient} cursor-pointer group relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                    <Icon className="w-7 h-7 text-white mb-3" />
                    <h3 className="text-base font-bold text-white mb-1">{action.label}</h3>
                    <p className="text-sm text-white/70">{action.desc}</p>
                    <ArrowRight className="w-5 h-5 text-white/50 absolute bottom-6 right-6 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Weekly Mood Chart */}
        <motion.div variants={fadeUp} className="p-6 md:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm">
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-5">Weekly Overview</h2>
          {hasData && weekData.length >= 2 ? (
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weekData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
                  <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '12px', color: 'var(--text-primary)' }}
                    labelStyle={{ color: 'var(--text-muted)' }}
                  />
                  <Line type="monotone" dataKey="mood" stroke="var(--brand-teal)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--brand-teal)' }} name="Mood" />
                  <Line type="monotone" dataKey="stress" stroke="var(--brand-lavender)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--brand-lavender)' }} name="Stress" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState
              icon={TrendingUp}
              title="Your mood trends will appear here"
              description="Log your mood for a few days to see trends and patterns visualized in a beautiful chart."
            />
          )}
        </motion.div>

        {/* Stress Forecast Preview */}
        <motion.div variants={fadeUp} className="p-6 md:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Target className="w-5 h-5 text-[var(--brand-lavender)]" /> Stress Forecast
            </h2>
            {hasData && <span className="text-xs text-[var(--text-muted)]">Next 7 days</span>}
          </div>
          {hasData && hasJournals ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)]">
                <p className="text-xs text-[var(--text-muted)] mb-2">Next 2-3 Days</p>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--status-warning)]/20 text-[var(--status-warning)]">Moderate Risk</span>
                <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">Stress may increase due to upcoming mock test schedule.</p>
              </div>
              <div className="p-5 rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)]">
                <p className="text-xs text-[var(--text-muted)] mb-2">This Week</p>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--status-success)]/20 text-[var(--status-success)]">Low Risk</span>
                <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">Overall trajectory looks positive. Maintain your sleep schedule.</p>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={Target}
              title="Stress predictions coming soon"
              description="Log a few moods and write journal entries so AI can predict your future stress patterns and help you prepare."
            />
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
