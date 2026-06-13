// ============================================================
// MindShield AI — Type Definitions
// ============================================================

export type ExamType = 'NEET' | 'JEE' | 'CUET' | 'CAT' | 'GATE' | 'UPSC' | 'BOARD';

export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'awful';

export type BurnoutLevel = 'low' | 'moderate' | 'high' | 'critical';

export type InsightType = 'trigger' | 'mood_driver' | 'blocker' | 'achievement';

export type InsightSeverity = 'info' | 'warning' | 'critical';

// ---- User Profile ----
export interface UserProfile {
  id: string;
  name: string;
  examType: ExamType;
  targetDate: string;
  weakSubjects: string[];
  studyGoals: string[];
  stressTriggers: string[];
  createdAt: string;
}

// ---- Journal ----
export interface JournalAnalysis {
  emotionalState: string;
  stressLevel: number;
  anxietyIndicators: string[];
  confidenceScore: number;
  burnoutSignals: string[];
  negativePatterns: string[];
  hiddenTriggers: string[];
  emotionalSummary: string;
  triggerAnalysis: string[];
  suggestedActions: string[];
  crisisDetected: boolean;
}

export interface JournalEntry {
  id: string;
  content: string;
  date: string;
  aiAnalysis: JournalAnalysis | null;
  createdAt: string;
}

// ---- Mood ----
export interface MoodEntry {
  id: string;
  mood: MoodType;
  emoji: string;
  intensity: number;
  factors: string[];
  studyHours: number;
  sleepHours: number;
  note: string;
  date: string;
  createdAt: string;
}

// ---- Burnout ----
export interface BurnoutFactors {
  journalSentiment: number;
  moodTrend: number;
  studyLoad: number;
  sleepQuality: number;
  emotionalFatigue: number;
}

export interface BurnoutAssessment {
  riskLevel: BurnoutLevel;
  score: number;
  factors: BurnoutFactors;
  explanation: string;
  recommendations: string[];
  date: string;
}

// ---- AI Coach ----
export interface CoachMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// ---- AI Insights ----
export interface AIInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  severity: InsightSeverity;
  date: string;
  icon: string;
}

// ---- Stress Forecast ----
export interface StressForecast {
  period: string;
  riskLevel: BurnoutLevel;
  predictedScore: number;
  factors: string[];
  recommendations: string[];
}

// ---- Recovery Plan ----
export interface RecoveryPlan {
  id: string;
  sleepRecommendation: string;
  studyAdjustment: string;
  mindfulnessExercises: string[];
  focusSessions: string[];
  motivationActivities: string[];
  duration: string;
  generatedAt: string;
}

// ---- Wellness Exercise ----
export interface WellnessExercise {
  id: string;
  name: string;
  type: 'breathing' | 'meditation' | 'reflection' | 'visualization' | 'micro-goal';
  duration: string;
  description: string;
  steps: string[];
  targetState: string;
  icon: string;
}

// ---- Mood Emoji Map ----
export const MOOD_EMOJIS: Record<MoodType, string> = {
  great: '😄',
  good: '🙂',
  okay: '😐',
  low: '😔',
  awful: '😢',
};

export const MOOD_COLORS: Record<MoodType, string> = {
  great: '#34D399',
  good: '#2EC4B6',
  okay: '#FBBF24',
  low: '#F97316',
  awful: '#F87171',
};

export const BURNOUT_COLORS: Record<BurnoutLevel, string> = {
  low: '#34D399',
  moderate: '#FBBF24',
  high: '#F97316',
  critical: '#EF4444',
};

export const EXAM_SUBJECTS: Record<ExamType, string[]> = {
  NEET: ['Physics', 'Chemistry', 'Biology', 'Zoology', 'Botany'],
  JEE: ['Physics', 'Chemistry', 'Mathematics'],
  CUET: ['English', 'General Test', 'Domain Subject'],
  CAT: ['Verbal Ability', 'DILR', 'Quantitative Aptitude'],
  GATE: ['Engineering Mathematics', 'Core Subject', 'General Aptitude'],
  UPSC: ['GS Paper I', 'GS Paper II', 'GS Paper III', 'GS Paper IV', 'Optional'],
  BOARD: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'],
};
