import { describe, it, expect } from 'vitest';
import { 
  buildSystemPrompt, 
  buildJournalAnalysisPrompt, 
  buildMotivationPrompt 
} from './prompts';
import type { UserProfile, MoodEntry, JournalEntry } from '../types';

describe('Prompts module', () => {
  const mockProfile: UserProfile = {
    id: '1',
    name: 'TestUser',
    examType: 'NEET',
    targetDate: '2024-05-05',
    weakSubjects: ['Physics'],
    studyGoals: ['Study 10 hours'],
    stressTriggers: ['Mock Tests'],
    createdAt: new Date().toISOString()
  };

  it('buildSystemPrompt includes profile info when provided', () => {
    const prompt = buildSystemPrompt(mockProfile);
    expect(prompt).toContain('NEET');
    expect(prompt).toContain('Physics');
  });

  it('buildSystemPrompt handles null profile gracefully', () => {
    const prompt = buildSystemPrompt(null);
    expect(prompt).toContain('student');
    expect(prompt).not.toContain('undefined');
  });

  it('buildJournalAnalysisPrompt includes content and moods', () => {
    const moods: MoodEntry[] = [{
      id: 'm1',
      mood: 'great',
      emoji: '😄',
      intensity: 8,
      factors: ['study'],
      studyHours: 4,
      sleepHours: 8,
      note: '',
      date: '2023-10-01',
      createdAt: '2023-10-01T12:00:00Z'
    }];
    const prompt = buildJournalAnalysisPrompt('I am feeling good.', moods);
    expect(prompt).toContain('I am feeling good.');
    expect(prompt).toContain('great');
    expect(prompt).toContain('8/10');
  });

  it('buildMotivationPrompt includes burnout risk', () => {
    const moods: MoodEntry[] = [];
    const journals: JournalEntry[] = [];
    const prompt = buildMotivationPrompt('high', moods, journals);
    expect(prompt).toContain('motivational message');
  });
});
