'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, Shield, User, Sparkles, Phone, AlertTriangle,
  Wind, BookOpen, Loader2,
} from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getCoachMessages, saveCoachMessage, getProfile, generateId } from '@/lib/storage';
import type { CoachMessage } from '@/lib/types';

const suggestions = [
  "I'm feeling stressed about my upcoming exam",
  "I can't focus on studying today",
  "I need help with motivation",
  "How can I manage exam anxiety?",
];

export default function CoachPage() {
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [crisisAlert, setCrisisAlert] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = getCoachMessages();
    if (saved.length === 0) {
      const welcome: CoachMessage = {
        id: generateId(),
        role: 'assistant',
        content: "Hi! I'm your MindShield AI wellness coach. 🛡️\n\nI'm here to listen, support, and guide you through your exam preparation journey. Whether you're feeling stressed, unmotivated, or just need someone to talk to — I'm available 24/7.\n\nHow are you feeling today?",
        timestamp: new Date().toISOString(),
      };
      saveCoachMessage(welcome);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages([welcome]);
    } else {
      setMessages(saved);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: CoachMessage = {
      id: generateId(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    saveCoachMessage(userMsg);
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setCrisisAlert(false);

    try {
      const history = messages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history,
          profile: getProfile(),
        }),
      });

      const data = await res.json();

      const assistantMsg: CoachMessage = {
        id: generateId(),
        role: 'assistant',
        content: data.response || "I'm sorry, I couldn't process that. Could you try rephrasing?",
        timestamp: new Date().toISOString(),
      };

      saveCoachMessage(assistantMsg);
      setMessages((prev) => [...prev, assistantMsg]);

      if (data.crisisDetected) {
        setCrisisAlert(true);
      }
    } catch {
      const errorMsg: CoachMessage = {
        id: generateId(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment. If you're in distress, please reach out to iCall at 9152987821 or Vandrevala Foundation at 1860-2662-345.",
        timestamp: new Date().toISOString(),
      };
      saveCoachMessage(errorMsg);
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const formatTime = (ts: string) => {
    return new Date(ts).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const hasUserMessages = messages.some((m) => m.role === 'user');

  return (
    <DashboardLayout>
      <div className="max-w-5xl h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#a78bfa]" /> AI Wellness Coach
            </h1>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
              <span className="text-xs text-[#34d399]">Online</span>
              <span className="text-xs text-[var(--text-secondary)] ml-1">• Your 24/7 empathetic companion</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/wellness"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] bg-[var(--glass-bg-medium)] border border-[var(--border-default)] hover:bg-[var(--glass-bg-medium)] transition-all"
            >
              <Wind className="w-3 h-3" /> Breathing
            </Link>
            <Link href="/journal"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] bg-[var(--glass-bg-medium)] border border-[var(--border-default)] hover:bg-[var(--glass-bg-medium)] transition-all"
            >
              <BookOpen className="w-3 h-3" /> Journal
            </Link>
          </div>
        </div>

        {/* Crisis Alert */}
        <AnimatePresence>
          {crisisAlert && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 shrink-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold text-red-400">You&apos;re Not Alone — Help is Available</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'iCall', phone: '9152987821' },
                  { name: 'Vandrevala Foundation', phone: '1860-2662-345' },
                  { name: 'AASRA', phone: '9820466726' },
                ].map((r) => (
                  <div key={r.name} className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                    <Phone className="w-3 h-3 text-red-400" />
                    <span className="font-medium">{r.name}:</span> {r.phone}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 pb-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2.5 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-[#2ec4b6] to-[#8b5cf6]'
                    : 'bg-[var(--glass-bg-medium)] border border-white/[0.1]'
                }`}>
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-[var(--text-primary)]" /> : <Shield className="w-3.5 h-3.5 text-[#2ec4b6]" />}
                </div>
                {/* Message */}
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-[#2ec4b6] to-[#8b5cf6] text-[var(--text-primary)]'
                    : 'bg-[var(--glass-bg-medium)] border border-[var(--border-default)] text-[var(--text-secondary)] border-l-2 border-l-[#2ec4b6]/40'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-[9px] mt-2 ${msg.role === 'user' ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)]'}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[var(--glass-bg-medium)] border border-white/[0.1] flex items-center justify-center shrink-0">
                <Shield className="w-3.5 h-3.5 text-[#2ec4b6]" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)]">
                <div className="flex items-center gap-1">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-[#2ec4b6]" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-[#2ec4b6]" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-[#2ec4b6]" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Suggestion Chips */}
          {!hasUserMessages && (
            <div className="flex flex-wrap gap-2 pt-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="px-3 py-2 text-xs text-[var(--text-secondary)] rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] hover:bg-[var(--glass-bg-medium)] hover:text-[var(--text-secondary)] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="shrink-0 pt-3 border-t border-[var(--border-default)]">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
                rows={1}
                className="w-full px-4 py-3 text-sm text-[var(--text-primary)] bg-[var(--glass-bg-medium)] border border-[var(--border-default)] rounded-xl resize-none focus:outline-none focus:border-[#2ec4b6] focus:ring-2 focus:ring-[#2ec4b6]/20 placeholder:text-[var(--text-secondary)] disabled:opacity-50"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-[#2ec4b6] to-[#8b5cf6] text-[var(--text-primary)] disabled:opacity-30 hover:opacity-90 transition-opacity shrink-0"
              aria-label="Send message"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[9px] text-[var(--text-secondary)] text-center mt-2">
            MindShield AI is not a therapist. For professional help, contact iCall: 9152987821
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
