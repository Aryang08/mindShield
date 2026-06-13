import { NextRequest, NextResponse } from 'next/server';
import { detectCrisis, getCrisisSafetyMessage, CRISIS_RESOURCES } from '@/lib/ai/safety';

export async function POST(request: NextRequest) {
  try {
    const { text } = (await request.json()) as { text: string };

    const crisisDetected = detectCrisis(text);

    if (crisisDetected) {
      return NextResponse.json({
        crisisDetected: true,
        message: getCrisisSafetyMessage(),
        resources: CRISIS_RESOURCES,
      });
    }

    return NextResponse.json({
      crisisDetected: false,
      message: null,
      resources: [],
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to check crisis status' },
      { status: 500 }
    );
  }
}
