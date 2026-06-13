'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3, TrendingUp, Brain, Lightbulb, Calendar,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, Cell, LineChart, Line,
} from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// Generate sample data
function genTrendData(days: number) {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      stress: Math.floor(Math.random() * 35) + 30 + (i % 7 === 0 ? 15 : 0),
      confidence: Math.floor(Math.random() * 25) + 50 - (i % 5 === 0 ? 10 : 0),
    });
  }
  return data;
}

const triggerData = [
  { trigger: 'Mock Test Scores', count: 18, fill: '#f97316' },
  { trigger: 'Peer Comparison', count: 14, fill: '#f87171' },
  { trigger: 'Sleep Deprivation', count: 11, fill: '#a78bfa' },
  { trigger: 'Time Pressure', count: 9, fill: '#fbbf24' },
  { trigger: 'Difficult Topics', count: 7, fill: '#2ec4b6' },
];

const weeklyStress = [
  { week: 'Week 1', stress: 45, sleep: 7.2 },
  { week: 'Week 2', stress: 52, sleep: 6.5 },
  { week: 'Week 3', stress: 38, sleep: 7.8 },
  { week: 'Week 4', stress: 61, sleep: 5.9 },
];

// Mood heatmap data
function genHeatmap() {
  const moods = ['great', 'good', 'okay', 'low', 'awful'] as const;
  const colors: Record<string, string> = { great: '#34d399', good: '#2ec4b6', okay: '#fbbf24', low: '#f97316', awful: '#f87171' };
  const weeks: { day: string; mood: string; color: string; intensity: number }[][] = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (let w = 0; w < 5; w++) {
    const week = days.map((day) => {
      const m = moods[Math.floor(Math.random() * moods.length)];
      return { day, mood: m, color: colors[m], intensity: Math.floor(Math.random() * 5) + 5 };
    });
    weeks.push(week);
  }
  return { weeks, days };
}

const aiPatterns = [
  { icon: '📊', title: 'Post-Test Anxiety', desc: 'You feel most anxious after Physics mock tests. Stress levels spike by 35% on test days.', color: '#f97316' },
  { icon: '📅', title: 'Sunday Blues', desc: 'Your stress consistently spikes on Sunday evenings before the new study week begins.', color: '#a78bfa' },
  { icon: '😴', title: 'Sleep-Stress Link', desc: 'Better sleep correlates with 23% lower stress scores. Aim for 7+ hours consistently.', color: '#2ec4b6' },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');
  const trendData = genTrendData(range === '7d' ? 7 : range === '30d' ? 30 : 90);
  const heatmap = genHeatmap();

  const tooltipStyle = {
    contentStyle: { background: '#1a1f35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e2e8f0', fontSize: '12px' },
    labelStyle: { color: '#94a3b8' },
  };

  return (
    <DashboardLayout>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-6xl space-y-6">
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#a78bfa]" /> Emotional Analytics
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Understand your emotional patterns and triggers</p>
          </div>
          <div className="flex rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] p-0.5">
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${range === r ? 'bg-[#2ec4b6]/20 text-[#2ec4b6]' : 'text-[var(--text-secondary)] hover:text-[var(--text-secondary)]'}`}
              >{r}</button>
            ))}
          </div>
        </motion.div>

        {/* Emotional Trend */}
        <motion.div variants={fadeUp} className="p-5 rounded-2xl bg-[var(--glass-bg-medium)] backdrop-blur-xl border border-[var(--border-default)]">
          <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2ec4b6]" /> Emotional Trends
          </h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ec4b6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2ec4b6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} interval={range === '7d' ? 0 : range === '30d' ? 4 : 10} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="stress" stroke="#a78bfa" fill="url(#stressGrad)" strokeWidth={2} name="Stress" />
                <Area type="monotone" dataKey="confidence" stroke="#2ec4b6" fill="url(#confGrad)" strokeWidth={2} name="Confidence" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Heatmap */}
          <motion.div variants={fadeUp} className="p-5 rounded-2xl bg-[var(--glass-bg-medium)] backdrop-blur-xl border border-[var(--border-default)]">
            <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#fbbf24]" /> Mood Heatmap
            </h2>
            <div className="space-y-2">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1.5">
                {heatmap.days.map((d) => (
                  <span key={d} className="text-center text-[9px] text-[var(--text-secondary)] font-medium">{d}</span>
                ))}
              </div>
              {/* Cells */}
              {heatmap.weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-1.5">
                  {week.map((cell, ci) => (
                    <motion.div
                      key={ci}
                      whileHover={{ scale: 1.2 }}
                      className="aspect-square rounded-md cursor-pointer transition-all"
                      style={{ backgroundColor: cell.color + '40', border: `1px solid ${cell.color}30` }}
                      title={`${cell.day}: ${cell.mood} (${cell.intensity}/10)`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              {[
                { label: 'Great', color: '#34d399' },
                { label: 'Good', color: '#2ec4b6' },
                { label: 'Okay', color: '#fbbf24' },
                { label: 'Low', color: '#f97316' },
                { label: 'Awful', color: '#f87171' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color + '60' }} />
                  <span className="text-[9px] text-[var(--text-secondary)]">{l.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trigger Analysis */}
          <motion.div variants={fadeUp} className="p-5 rounded-2xl bg-[var(--glass-bg-medium)] backdrop-blur-xl border border-[var(--border-default)]">
            <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#f97316]" /> Top Stress Triggers
            </h2>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={triggerData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="trigger" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={120} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16} name="Occurrences">
                    {triggerData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Stress Progression */}
        <motion.div variants={fadeUp} className="p-5 rounded-2xl bg-[var(--glass-bg-medium)] backdrop-blur-xl border border-[var(--border-default)]">
          <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">Weekly Stress vs Sleep</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyStress}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="stress" stroke="#a78bfa" strokeWidth={2.5} dot={{ r: 5, fill: '#a78bfa' }} name="Stress Level" />
                <Line type="monotone" dataKey="sleep" stroke="#2ec4b6" strokeWidth={2.5} dot={{ r: 5, fill: '#2ec4b6' }} name="Sleep (hrs)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Pattern Insights */}
        <motion.div variants={fadeUp}>
          <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#fbbf24]" /> AI-Discovered Patterns
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {aiPatterns.map((p, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] hover:border-white/[0.12] transition-all"
              >
                <span className="text-2xl mb-3 block">{p.icon}</span>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">{p.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
