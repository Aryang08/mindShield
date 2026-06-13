// ============================================================
// MindShield AI — Storage Layer
// ============================================================

import type {
  UserProfile,
  JournalEntry,
  MoodEntry,
  BurnoutAssessment,
  CoachMessage,
  AIInsight,
} from '@/lib/types';

const KEYS = {
  PROFILE: 'mindshield_profile',
  JOURNALS: 'mindshield_journals',
  MOODS: 'mindshield_moods',
  BURNOUT: 'mindshield_burnout',
  COACH: 'mindshield_coach',
  INSIGHTS: 'mindshield_insights',
  ONBOARDED: 'mindshield_onboarded',
} as const;

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

// ---- Profile ----
export function getProfile(): UserProfile | null {
  return getItem<UserProfile | null>(KEYS.PROFILE, null);
}

export function saveProfile(profile: UserProfile): void {
  setItem(KEYS.PROFILE, profile);
}

export function isOnboarded(): boolean {
  return getItem<boolean>(KEYS.ONBOARDED, false);
}

export function setOnboarded(value: boolean): void {
  setItem(KEYS.ONBOARDED, value);
}

// ---- Journals ----
export function getJournals(): JournalEntry[] {
  return getItem<JournalEntry[]>(KEYS.JOURNALS, []);
}

export function saveJournal(entry: JournalEntry): void {
  const journals = getJournals();
  const idx = journals.findIndex((j) => j.id === entry.id);
  if (idx >= 0) {
    journals[idx] = entry;
  } else {
    journals.unshift(entry);
  }
  setItem(KEYS.JOURNALS, journals);
}

export function deleteJournal(id: string): void {
  const journals = getJournals().filter((j) => j.id !== id);
  setItem(KEYS.JOURNALS, journals);
}

// ---- Moods ----
export function getMoods(): MoodEntry[] {
  return getItem<MoodEntry[]>(KEYS.MOODS, []);
}

export function saveMood(entry: MoodEntry): void {
  const moods = getMoods();
  moods.unshift(entry);
  setItem(KEYS.MOODS, moods);
}

export function getTodayMood(): MoodEntry | null {
  const today = new Date().toISOString().split('T')[0];
  return getMoods().find((m) => m.date === today) || null;
}

// ---- Burnout ----
export function getBurnoutHistory(): BurnoutAssessment[] {
  return getItem<BurnoutAssessment[]>(KEYS.BURNOUT, []);
}

export function saveBurnout(assessment: BurnoutAssessment): void {
  const history = getBurnoutHistory();
  history.unshift(assessment);
  setItem(KEYS.BURNOUT, history);
}

export function getLatestBurnout(): BurnoutAssessment | null {
  const history = getBurnoutHistory();
  return history.length > 0 ? history[0] : null;
}

// ---- Coach Messages ----
export function getCoachMessages(): CoachMessage[] {
  return getItem<CoachMessage[]>(KEYS.COACH, []);
}

export function saveCoachMessage(message: CoachMessage): void {
  const messages = getCoachMessages();
  messages.push(message);
  setItem(KEYS.COACH, messages);
}

export function clearCoachMessages(): void {
  setItem(KEYS.COACH, []);
}

// ---- AI Insights ----
export function getInsights(): AIInsight[] {
  return getItem<AIInsight[]>(KEYS.INSIGHTS, []);
}

export function saveInsight(insight: AIInsight): void {
  const insights = getInsights();
  insights.unshift(insight);
  // Keep max 50 insights
  if (insights.length > 50) insights.pop();
  setItem(KEYS.INSIGHTS, insights);
}

export function saveInsights(newInsights: AIInsight[]): void {
  setItem(KEYS.INSIGHTS, newInsights);
}

// ---- Utility ----
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function clearAllData(): void {
  Object.values(KEYS).forEach((key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  });
}
