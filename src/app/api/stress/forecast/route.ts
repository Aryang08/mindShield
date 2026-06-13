import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt, buildStressForecastPrompt } from '@/lib/ai/prompts';
import { callGemini, extractJSON, fallbackStressForecast } from '@/lib/ai/gemini';
import type { JournalEntry, MoodEntry, UserProfile, StressForecast } from '@/lib/types';

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
        const userPrompt = buildStressForecastPrompt(profile, journals, moods);
        const response = await callGemini(systemPrompt, userPrompt, apiKey);
        const data = extractJSON<{ forecasts: StressForecast[] }>(response);
        return NextResponse.json({ forecasts: data.forecasts });
      } catch {
        // Fall through
      }
    }

    return NextResponse.json({ forecasts: fallbackStressForecast() });
  } catch {
    return NextResponse.json(
      { error: 'Failed to forecast stress' },
      { status: 500 }
    );
  }
}
