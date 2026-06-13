'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Heart,
  MessageCircle,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/journal', label: 'Journal', icon: BookOpen },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/wellness', label: 'Wellness', icon: Heart },
  { href: '/coach', label: 'AI Coach', icon: MessageCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex text-[var(--text-primary)]">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] flex flex-col
          bg-[var(--bg-surface)] border-r border-[var(--border-default)]
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[var(--border-default)]">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--brand-teal)] via-[var(--brand-blue)] to-[var(--brand-lavender)] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-[var(--text-primary)] tracking-tight leading-tight">MindShield AI</h1>
            <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest mt-0.5">Wellness Companion</p>
          </div>
          <button
            className="ml-auto lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg-medium)] transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest px-3 mb-3">Menu</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${isActive
                    ? 'bg-[var(--brand-teal)]/12 text-[var(--brand-teal)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg-medium)]'
                  }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[var(--brand-teal)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}`} />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--brand-teal)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="px-4 pb-5 flex flex-col gap-4 border-t border-[var(--border-default)] pt-4">
          <div className="p-4 rounded-lg bg-[var(--glass-bg-medium)] border border-[var(--border-default)]">
            <p className="text-xs text-[var(--text-muted)] mb-0.5">Preparing for</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">JEE Advanced</p>
            <div className="flex items-center gap-2 mt-2.5">
              <div className="w-2 h-2 rounded-full bg-[var(--status-success)] animate-pulse" />
              <span className="text-xs text-[var(--status-success)] font-medium">AI Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-[var(--text-muted)] font-medium">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Bar (mobile) */}
        <header className="sticky top-0 z-30 lg:hidden flex items-center justify-between px-4 py-3 bg-[var(--bg-surface)]/95 backdrop-blur-xl border-b border-[var(--border-default)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg-medium)] transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[var(--brand-teal)]" />
            <span className="text-sm font-bold text-[var(--text-primary)]">MindShield AI</span>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-4 py-5 sm:px-6 md:px-8 lg:px-10 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto content-shell"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
