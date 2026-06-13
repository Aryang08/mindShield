import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getMoods, saveMood, getJournals, saveJournal } from './storage';

describe('Storage Module', () => {
  beforeEach(() => {
    // Mock window and localStorage
    vi.stubGlobal('window', {});
    const store: Record<string, string> = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value.toString(); },
      clear: () => { Object.keys(store).forEach(key => delete store[key]); }
    });
    localStorage.clear();
  });

  it('handles moods correctly', () => {
    expect(getMoods()).toEqual([]);
    
    saveMood({
      id: '1',
      date: '2023-10-01',
      mood: 'happy',
      intensity: 8,
      notes: 'Good day'
    });
    
    const moods = getMoods();
    expect(moods.length).toBe(1);
    expect(moods[0].mood).toBe('happy');
  });

  it('handles journals correctly', () => {
    expect(getJournals()).toEqual([]);
    
    saveJournal({
      id: 'j1',
      date: '2023-10-01',
      title: 'Exam Prep',
      content: 'Studied for 4 hours.',
      analysis: null
    });
    
    const journals = getJournals();
    expect(journals.length).toBe(1);
    expect(journals[0].title).toBe('Exam Prep');
  });
});
