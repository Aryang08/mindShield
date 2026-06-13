'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen, Sparkles, AlertTriangle, CheckCircle, Loader2,
  ChevronDown, ChevronUp, Phone, Heart, Brain, TrendingUp,
  Calendar, Trash2,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getJournals, saveJournal, getMoods, getProfile, generateId, deleteJournal } from '@/lib/storage';
import type { JournalEntry, JournalAnalysis } from '@/lib/types';

function CircularGauge({ value, max = 100, color, size = 80 }: { value: number; max?: number; color: string; size?: number }) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-[var(--text-primary)]">{value}</span>
      </div>
    </div>
  );
}

export default function JournalPage() {
  const [content, setContent] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<JournalAnalysis | null>(null);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJournals(getJournals());
  }, []);

  const handleAnalyze = async () => {
    if (content.trim().length < 10) return;
    setAnalyzing(true);
    setAnalysis(null);

    try {
      const res = await fetch('/api/journal/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          recentMoods: getMoods().slice(0, 7),
          profile: getProfile(),
        }),
      });
      const data: JournalAnalysis = await res.json();
      setAnalysis(data);

      const entry: JournalEntry = {
        id: generateId(),
        content,
        date: new Date().toISOString().split('T')[0],
        aiAnalysis: data,
        createdAt: new Date().toISOString(),
      };
      saveJournal(entry);
      setJournals(getJournals());
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDelete = (id: string) => {
    deleteJournal(id);
    setJournals(getJournals());
  };

  const stressColor = (level: number) =>
    level > 70 ? '#f87171' : level > 50 ? '#f97316' : level > 30 ? '#fbbf24' : '#34d399';

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <DashboardLayout>
      <div className="max-w-6xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-[var(--brand-teal)]" /> Daily Journal
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1.5" suppressHydrationWarning>{today}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Editor */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="How are you feeling today? Write about your study session, emotions, challenges, or anything on your mind..."
                className="w-full h-48 bg-transparent text-[var(--text-primary)] text-sm leading-relaxed placeholder:text-[var(--text-secondary)] resize-none focus:outline-none"
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border-default)]">
                <span className="text-xs text-[var(--text-secondary)]">{content.length} characters</span>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing || content.trim().length < 10}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-lavender)] text-white disabled:opacity-40 hover:opacity-90 transition-opacity shadow-md"
                >
                  {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {analyzing ? 'Analyzing...' : 'Analyze with AI'}
                </button>
              </div>
            </div>

            {/* Past Entries */}
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">Past Entries</h2>
              <div className="space-y-3">
                {journals.length === 0 && (
                  <p className="text-sm text-[var(--text-secondary)] text-center py-8">No journal entries yet. Start writing above!</p>
                )}
                {journals.map((entry) => (
                  <motion.div key={entry.id} layout className="rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] overflow-hidden">
                    <button
                      onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-3 h-3 text-[var(--text-secondary)]" />
                          <span className="text-xs text-[var(--text-secondary)]">{entry.date}</span>
                          {entry.aiAnalysis && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{
                              backgroundColor: stressColor(entry.aiAnalysis.stressLevel) + '20',
                              color: stressColor(entry.aiAnalysis.stressLevel),
                            }}>
                              Stress: {entry.aiAnalysis.stressLevel}/100
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] truncate">{entry.content.substring(0, 100)}...</p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                          className="p-1 rounded hover:bg-[var(--glass-bg-medium)] text-[var(--text-secondary)] hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {expandedId === entry.id ? <ChevronUp className="w-4 h-4 text-[var(--text-secondary)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {expandedId === entry.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="border-t border-[var(--border-default)] overflow-hidden"
                        >
                          <div className="p-4 space-y-3">
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{entry.content}</p>
                            {entry.aiAnalysis && (
                              <div className="pt-3 border-t border-[var(--border-default)]">
                                <p className="text-xs text-[#a78bfa] font-semibold mb-2">AI Analysis</p>
                                <p className="text-xs text-[var(--text-secondary)]">{entry.aiAnalysis.emotionalSummary}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Analysis Panel */}
          <div className="lg:col-span-2 space-y-5">
            {!analysis && !analyzing && (
              <div className="p-8 rounded-2xl bg-[var(--glass-bg-medium)] border border-dashed border-[var(--border-default)] text-center">
                <Brain className="w-10 h-10 text-[var(--text-secondary)] mx-auto mb-3" />
                <p className="text-sm text-[var(--text-secondary)]">Write a journal entry and click &ldquo;Analyze with AI&rdquo; to see insights</p>
              </div>
            )}

            {analyzing && (
              <div className="p-8 rounded-2xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] text-center">
                <Loader2 className="w-8 h-8 text-[#2ec4b6] mx-auto mb-3 animate-spin" />
                <p className="text-sm text-[var(--text-secondary)]">AI is analyzing your journal...</p>
              </div>
            )}

            <AnimatePresence>
              {analysis && !analyzing && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {/* Crisis Alert */}
                  {analysis.crisisDetected && (
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                      className="p-5 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <h3 className="text-sm font-bold text-red-400">We&apos;re Here For You</h3>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mb-3">
                        Your entry suggests you may be going through a very difficult time. Please reach out to someone who can help:
                      </p>
                      <div className="space-y-2">
                        {[
                          { name: 'iCall', phone: '9152987821' },
                          { name: 'Vandrevala Foundation', phone: '1860-2662-345' },
                          { name: 'NIMHANS', phone: '080-46110007' },
                          { name: 'AASRA', phone: '9820466726' },
                        ].map((r) => (
                          <div key={r.name} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                            <Phone className="w-3 h-3 text-red-400" />
                            <span className="font-medium text-[var(--text-secondary)]">{r.name}:</span> {r.phone}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-3">You matter. Please talk to a trusted parent, teacher, or counselor. ❤️</p>
                    </motion.div>
                  )}

                  {/* Emotional Summary */}
                  <div className="p-4 rounded-2xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)]">
                    <h3 className="text-xs font-semibold text-[#a78bfa] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Emotional Summary
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{analysis.emotionalSummary}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] flex flex-col items-center">
                      <CircularGauge value={analysis.stressLevel} color={stressColor(analysis.stressLevel)} />
                      <span className="text-[10px] text-[var(--text-secondary)] mt-1">Stress Level</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] flex flex-col items-center">
                      <CircularGauge value={analysis.confidenceScore} color="#a78bfa" />
                      <span className="text-[10px] text-[var(--text-secondary)] mt-1">Confidence</span>
                    </div>
                  </div>

                  {/* Hidden Triggers */}
                  {analysis.hiddenTriggers.length > 0 && (
                    <div className="p-4 rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)]">
                      <h3 className="text-xs font-semibold text-[#f97316] mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Hidden Triggers
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.hiddenTriggers.map((t, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Negative Patterns */}
                  {analysis.negativePatterns.length > 0 && (
                    <div className="p-4 rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)]">
                      <h3 className="text-xs font-semibold text-[#f87171] mb-2 flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5" /> Negative Thinking Patterns
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.negativePatterns.map((p, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#f87171]/10 text-[#f87171] border border-[#f87171]/20">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Actions */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#2ec4b6]/5 to-[#34d399]/5 border border-[var(--border-default)]">
                    <h3 className="text-xs font-semibold text-[#34d399] mb-3 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5" /> Suggested Actions
                    </h3>
                    <div className="space-y-2">
                      {analysis.suggestedActions.map((a, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#34d399] mt-0.5 shrink-0" />
                          <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Emotional State Badge */}
                  <div className="p-4 rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] text-center">
                    <TrendingUp className="w-5 h-5 text-[#2ec4b6] mx-auto mb-2" />
                    <p className="text-xs text-[var(--text-secondary)]">Emotional State</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">{analysis.emotionalState}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
