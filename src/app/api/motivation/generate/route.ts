import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt, buildMotivationPrompt } from '@/lib/ai/prompts';
import { callGemini, fallbackMotivation } from '@/lib/ai/gemini';
import type { JournalEntry, MoodEntry, UserProfile } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { journals, moods, profile } = (await request.json()) as {
      journals: JournalEntry[];
      moods: MoodEntry[];
      profile: UserProfile | null;
    };

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = buildSystemPrompt(profile);
        const userPrompt = buildMotivationPrompt(profile, journals, moods);
        const response = await callGemini(systemPrompt, userPrompt, apiKey);
        return NextResponse.json({ message: response.trim() });
      } catch {
        // Fall through
      }
    }

    return NextResponse.json({ message: fallbackMotivation() });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate motivation' },
      { status: 500 }
    );
  }
}
