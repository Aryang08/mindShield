'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--border-default)] flex items-center justify-center opacity-50" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-xl bg-white/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 absolute transition-all text-slate-800 dark:text-white dark:scale-0 dark:-rotate-90 scale-100 rotate-0" />
      <Moon className="h-4 w-4 absolute transition-all text-slate-800 dark:text-white dark:scale-100 dark:rotate-0 scale-0 rotate-90" />
    </button>
  );
}
