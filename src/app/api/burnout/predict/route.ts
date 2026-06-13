import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt, buildBurnoutPredictionPrompt } from '@/lib/ai/prompts';
import { callGemini, extractJSON, fallbackBurnoutAssessment } from '@/lib/ai/gemini';
import type { BurnoutAssessment, JournalEntry, MoodEntry, UserProfile } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { journals, moods, profile } = (await request.json()) as {
      journals: JournalEntry[];
      moods: MoodEntry[];
      profile: UserProfile | null;
    };

    if (journals?.length > 30 || moods?.length > 30) {
      return NextResponse.json({ error: 'Payload exceeds maximum allowed records' }, { status: 413 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = buildSystemPrompt(profile);
        const userPrompt = buildBurnoutPredictionPrompt(journals, moods);
        const response = await callGemini(systemPrompt, userPrompt, apiKey);
        const assessment = extractJSON<BurnoutAssessment>(response);
        assessment.date = new Date().toISOString().split('T')[0];
        return NextResponse.json(assessment);
      } catch {
        // Fall through to fallback
      }
    }

    return NextResponse.json(fallbackBurnoutAssessment());
  } catch {
    return NextResponse.json(
      { error: 'Failed to predict burnout' },
      { status: 500 }
    );
  }
}
