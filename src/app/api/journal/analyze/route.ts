import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt, buildJournalAnalysisPrompt } from '@/lib/ai/prompts';
import { callGemini, extractJSON, fallbackJournalAnalysis } from '@/lib/ai/gemini';
import { detectCrisis } from '@/lib/ai/safety';
import type { JournalAnalysis, MoodEntry, UserProfile } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { content, recentMoods, profile } = (await request.json()) as {
      content: string;
      recentMoods: MoodEntry[];
      profile: UserProfile | null;
    };

    if (!content || content.trim().length < 10) {
      return NextResponse.json({ error: 'Journal entry too short' }, { status: 400 });
    }
    if (content.length > 5000) {
      return NextResponse.json({ error: 'Journal entry exceeds maximum length (5000 characters)' }, { status: 413 });
    }

    // Crisis check first
    const crisisCheck = detectCrisis(content);

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = buildSystemPrompt(profile);
        const userPrompt = buildJournalAnalysisPrompt(content, recentMoods);
        const response = await callGemini(systemPrompt, userPrompt, apiKey);
        const analysis = extractJSON<JournalAnalysis>(response);
        analysis.crisisDetected = analysis.crisisDetected || crisisCheck;
        return NextResponse.json(analysis);
      } catch {
        // Fall through to fallback
      }
    }

    const analysis = fallbackJournalAnalysis(content);
    analysis.crisisDetected = analysis.crisisDetected || crisisCheck;
    return NextResponse.json(analysis);
  } catch {
    return NextResponse.json(
      { error: 'Failed to analyze journal' },
      { status: 500 }
    );
  }
}
