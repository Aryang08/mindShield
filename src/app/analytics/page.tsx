'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Brain, Calendar, ClipboardList, Lightbulb, Moon, TrendingUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/layout/DashboardLayout';

const AreaChart = dynamic(() => import('recharts').then((mod) => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then((mod) => mod.Area), { ssr: false });
const BarChart = dynamic(() => import('recharts').then((mod) => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then((mod) => mod.Bar), { ssr: false });
const Cell = dynamic(() => import('recharts').then((mod) => mod.Cell), { ssr: false });
const LineChart = dynamic(() => import('recharts').then((mod) => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then((mod) => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((mod) => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((mod) => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then((mod) => mod.ResponsiveContainer), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then((mod) => mod.CartesianGrid), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

const baseTrend = Array.from({ length: 90 }, (_, index) => {
  const day = index + 1;
  return {
    date: `D${day}`,
    stress: 42 + ((day * 7) % 28) + (day % 9 === 0 ? 12 : 0),
    confidence: 72 - ((day * 5) % 24) + (day % 8 === 0 ? 8 : 0),
  };
});

const triggerData = [
  { trigger: 'Mock Scores', count: 18, fill: '#f97316' },
  { trigger: 'Comparison', count: 14, fill: '#f87171' },
  { trigger: 'Poor Sleep', count: 11, fill: '#a78bfa' },
  { trigger: 'Time Pressure', count: 9, fill: '#fbbf24' },
  { trigger: 'Difficult Topics', count: 7, fill: '#2ec4b6' },
];

const weeklyStress = [
  { week: 'Week 1', stress: 45, sleep: 7.2 },
  { week: 'Week 2', stress: 52, sleep: 6.5 },
  { week: 'Week 3', stress: 38, sleep: 7.8 },
  { week: 'Week 4', stress: 61, sleep: 5.9 },
];

const heatmap = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  weeks: [
    ['good', 'great', 'okay', 'good', 'low', 'okay', 'great'],
    ['okay', 'good', 'low', 'good', 'awful', 'okay', 'good'],
    ['great', 'good', 'good', 'okay', 'low', 'good', 'great'],
    ['good', 'okay', 'low', 'okay', 'good', 'great', 'good'],
    ['okay', 'good', 'great', 'good', 'okay', 'low', 'good'],
  ],
};

const moodColors: Record<string, string> = {
  great: '#34d399',
  good: '#2ec4b6',
  okay: '#fbbf24',
  low: '#f97316',
  awful: '#f87171',
};

const aiPatterns = [
  { icon: BarChart3, title: 'Post-Test Anxiety', desc: 'Stress rises most after Physics mock tests. Add a short decompression routine after each paper.', color: 'var(--status-warning)' },
  { icon: ClipboardList, title: 'Sunday Planning Load', desc: 'Sunday evenings carry extra pressure before the new study week. Plan earlier in the day.', color: 'var(--brand-lavender)' },
  { icon: Moon, title: 'Sleep-Stress Link', desc: 'Weeks with 7+ hours of sleep show steadier confidence and lower stress spikes.', color: 'var(--brand-teal)' },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');
  const trendData = useMemo(() => baseTrend.slice(range === '7d' ? -7 : range === '30d' ? -30 : -90), [range]);

  const tooltipStyle = {
    contentStyle: { background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '12px' },
    labelStyle: { color: 'var(--text-muted)' },
  };

  return (
    <DashboardLayout>
      <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-black text-[var(--text-primary)]">
              <BarChart3 className="h-6 w-6 text-[var(--brand-lavender)]" /> Emotional Analytics
            </h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Understand your emotional patterns and study triggers.</p>
          </div>
          <div className="flex rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-1">
            {(['7d', '30d', '90d'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`rounded-md px-4 py-2 text-xs font-bold transition-colors ${range === item ? 'bg-[var(--brand-teal)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--glass-bg-medium)]'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.section variants={fadeUp} className="glass-card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)]">
            <TrendingUp className="h-4 w-4 text-[var(--brand-teal)]" /> Emotional Trends
          </h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ec4b6" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#2ec4b6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} interval={range === '7d' ? 0 : range === '30d' ? 4 : 12} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="stress" stroke="#a78bfa" fill="url(#stressGrad)" strokeWidth={2} name="Stress" />
                <Area type="monotone" dataKey="confidence" stroke="#2ec4b6" fill="url(#confGrad)" strokeWidth={2} name="Confidence" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.section variants={fadeUp} className="glass-card p-5">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)]">
              <Calendar className="h-4 w-4 text-[var(--status-warning)]" /> Mood Heatmap
            </h2>
            <div className="space-y-2">
              <div className="grid grid-cols-7 gap-2">
                {heatmap.days.map((day) => (
                  <span key={day} className="text-center text-[10px] font-bold text-[var(--text-muted)]">{day}</span>
                ))}
              </div>
              {heatmap.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-2">
                  {week.map((mood, dayIndex) => (
                    <div key={`${weekIndex}-${dayIndex}`} className="aspect-square rounded-md border" style={{ backgroundColor: `${moodColors[mood]}40`, borderColor: `${moodColors[mood]}55` }} title={mood} />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {Object.entries(moodColors).map(([label, color]) => (
                <span key={label} className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--text-secondary)]">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />
                  {label}
                </span>
              ))}
            </div>
          </motion.section>

          <motion.section variants={fadeUp} className="glass-card p-5">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)]">
              <Brain className="h-4 w-4 text-[var(--status-warning)]" /> Top Stress Triggers
            </h2>
            <div className="h-[245px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={triggerData} layout="vertical" margin={{ left: 4, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="trigger" type="category" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} width={98} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16} name="Occurrences">
                    {triggerData.map((entry) => (
                      <Cell key={entry.trigger} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.section>
        </div>

        <motion.section variants={fadeUp} className="glass-card p-5">
          <h2 className="mb-4 text-sm font-bold text-[var(--text-secondary)]">Weekly Stress vs Sleep</h2>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyStress}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
                <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="stress" stroke="#a78bfa" strokeWidth={2.5} dot={{ r: 4, fill: '#a78bfa' }} name="Stress Level" />
                <Line type="monotone" dataKey="sleep" stroke="#2ec4b6" strokeWidth={2.5} dot={{ r: 4, fill: '#2ec4b6' }} name="Sleep (hrs)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section variants={fadeUp}>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)]">
            <Lightbulb className="h-4 w-4 text-[var(--status-warning)]" /> AI-Discovered Patterns
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {aiPatterns.map((pattern) => {
              const Icon = pattern.icon;
              return (
                <article key={pattern.title} className="glass-card p-5">
                  <Icon className="mb-3 h-5 w-5" style={{ color: pattern.color }} />
                  <h3 className="text-sm font-black text-[var(--text-primary)]">{pattern.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[var(--text-secondary)]">{pattern.desc}</p>
                </article>
              );
            })}
          </div>
        </motion.section>
      </motion.div>
    </DashboardLayout>
  );
}
