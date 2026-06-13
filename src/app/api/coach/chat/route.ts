import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt, buildCoachPrompt } from '@/lib/ai/prompts';
import { callGemini, fallbackCoachResponse } from '@/lib/ai/gemini';
import { detectCrisis } from '@/lib/ai/safety';
import type { UserProfile } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { message, history, profile } = (await request.json()) as {
      message: string;
      history: { role: string; content: string }[];
      profile: UserProfile | null;
    };

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is empty' }, { status: 400 });
    }

    const crisisDetected = detectCrisis(message);

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = buildSystemPrompt(profile);
        const userPrompt = buildCoachPrompt(profile, [], [], history, message);
        const response = await callGemini(systemPrompt, userPrompt, apiKey);
        return NextResponse.json({
          response: response.trim(),
          crisisDetected,
        });
      } catch {
        // Fall through
      }
    }

    return NextResponse.json({
      response: fallbackCoachResponse(message),
      crisisDetected,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
