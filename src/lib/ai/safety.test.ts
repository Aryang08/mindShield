import { describe, it, expect } from 'vitest';
import { detectCrisis } from './safety';

describe('Safety Module - Crisis Detection', () => {
  it('returns true for explicit self-harm statements', () => {
    expect(detectCrisis('I want to kill myself')).toBe(true);
    expect(detectCrisis('I am thinking about suicide')).toBe(true);
    expect(detectCrisis('There is no reason to live anymore')).toBe(true);
    expect(detectCrisis('I feel like I want to end it all')).toBe(true);
  });

  it('returns false for general stress or anxiety', () => {
    expect(detectCrisis('I am so stressed about my exams')).toBe(false);
    expect(detectCrisis('I failed my mock test and I feel terrible')).toBe(false);
    expect(detectCrisis('I am overwhelmed with studies')).toBe(false);
  });

  it('is case insensitive', () => {
    expect(detectCrisis('SUICIDE')).toBe(true);
    expect(detectCrisis('I WANT TO DIE')).toBe(true);
  });

  it('handles empty strings', () => {
    expect(detectCrisis('')).toBe(false);
  });
});
