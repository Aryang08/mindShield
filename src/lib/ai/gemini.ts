// ============================================================
// MindShield AI — Gemini API Client + Fallback Engine
// ============================================================

import type { JournalAnalysis, BurnoutAssessment, StressForecast } from '@/lib/types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

export async function callGemini(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string
): Promise<string> {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.status} — ${errText}`);
  }

  const data: GeminiResponse = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');
  return text;
}

export function extractJSON<T>(text: string): T {
  // Try to find JSON in the response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  throw new Error('No JSON found in response');
}

// ============================================================
// Fallback Responses (when API key not configured)
// ============================================================

export function fallbackJournalAnalysis(content: string): JournalAnalysis {
  const lower = content.toLowerCase();
  const stressWords = ['stress', 'anxious', 'worried', 'scared', 'afraid', 'overwhelm', 'can\'t', 'failing', 'behind', 'pressure', 'panic'];
  const burnoutWords = ['tired', 'exhausted', 'burnout', 'can\'t focus', 'no energy', 'give up', 'pointless'];
  const negativeWords = ['everyone', 'never', 'always', 'worst', 'stupid', 'useless', 'not good enough', 'failure'];
  const positiveWords = ['happy', 'good', 'great', 'improved', 'better', 'confident', 'progress', 'proud'];

  const stressCount = stressWords.filter(w => lower.includes(w)).length;
  const burnoutCount = burnoutWords.filter(w => lower.includes(w)).length;
  const negativeCount = negativeWords.filter(w => lower.includes(w)).length;
  const positiveCount = positiveWords.filter(w => lower.includes(w)).length;

  const stressLevel = Math.min(100, Math.max(10, stressCount * 15 + burnoutCount * 20 + negativeCount * 10 - positiveCount * 10 + 30));
  const confidenceScore = Math.max(5, Math.min(95, 70 - stressCount * 10 - negativeCount * 8 + positiveCount * 15));

  const hiddenTriggers: string[] = [];
  if (lower.includes('everyone') || lower.includes('others') || lower.includes('behind')) hiddenTriggers.push('Comparison anxiety');
  if (lower.includes('perfect') || lower.includes('not good enough')) hiddenTriggers.push('Perfectionism');
  if (lower.includes('imposter') || lower.includes('don\'t deserve') || lower.includes('fraud')) hiddenTriggers.push('Impostor syndrome');
  if (lower.includes('fail') || lower.includes('what if')) hiddenTriggers.push('Fear of failure');
  if (hiddenTriggers.length === 0) hiddenTriggers.push('General exam pressure');

  const crisisWords = ['suicide', 'kill myself', 'end it all', 'self harm', 'self-harm', 'don\'t want to live', 'no reason to live', 'cutting myself'];
  const crisisDetected = crisisWords.some(w => lower.includes(w));

  return {
    emotionalState: stressLevel > 70 ? 'High Anxiety & Stress' : stressLevel > 40 ? 'Moderate Stress' : 'Relatively Calm',
    stressLevel,
    anxietyIndicators: stressWords.filter(w => lower.includes(w)).map(w => `Mentioned "${w}"`),
    confidenceScore,
    burnoutSignals: burnoutWords.filter(w => lower.includes(w)).map(w => `Detected: "${w}"`),
    negativePatterns: negativeCount > 0
      ? ['All-or-nothing thinking', 'Catastrophizing', 'Negative self-talk'].slice(0, negativeCount + 1)
      : [],
    hiddenTriggers,
    emotionalSummary: stressLevel > 70
      ? `Your entry shows signs of significant stress and anxiety. You're carrying a heavy emotional load, and it's important to acknowledge that what you're feeling is valid. The pressure of exam preparation can be overwhelming, but recognizing these feelings is the first step.`
      : stressLevel > 40
        ? `Your journal reflects a moderate level of stress. While you're managing, there are signs that the pressure is building. It's healthy that you're expressing these feelings through journaling.`
        : `Your entry suggests you're in a relatively stable emotional state. There may be minor concerns, but overall you seem to be coping well with your preparation.`,
    triggerAnalysis: hiddenTriggers,
    suggestedActions: [
      stressLevel > 60 ? 'Take a 15-minute mindful break — try the 4-7-8 breathing technique' : 'Continue your current study routine with regular breaks',
      'Focus on your own progress rather than comparing with others',
      'Break today\'s study goals into 3 micro-tasks for a sense of accomplishment',
      burnoutCount > 0 ? 'Consider reducing study hours today and prioritizing sleep' : 'Maintain your current sleep schedule',
      'Write down 3 things you learned today, no matter how small',
    ],
    crisisDetected,
  };
}

export function fallbackBurnoutAssessment(): BurnoutAssessment {
  return {
    riskLevel: 'moderate',
    score: 45,
    factors: {
      journalSentiment: 50,
      moodTrend: 40,
      studyLoad: 55,
      sleepQuality: 35,
      emotionalFatigue: 45,
    },
    explanation: 'Based on your recent entries, you\'re showing moderate signs of stress accumulation. Your study load appears manageable but emotional patterns suggest building pressure. This is a common pattern during exam preparation.',
    recommendations: [
      'Ensure 7-8 hours of sleep consistently',
      'Take a 30-minute outdoor break daily',
      'Practice the 4-7-8 breathing technique before study sessions',
      'Set realistic daily goals — aim for 3 focused tasks',
      'Connect with a friend or family member today',
    ],
    date: new Date().toISOString().split('T')[0],
  };
}

export function fallbackStressForecast(): StressForecast[] {
  return [
    {
      period: 'Next 2-3 days',
      riskLevel: 'moderate',
      predictedScore: 55,
      factors: ['Approaching study deadlines', 'Accumulated fatigue from recent sessions'],
      recommendations: ['Front-load easier topics', 'Schedule a reward activity for day 3'],
    },
    {
      period: 'This week',
      riskLevel: 'moderate',
      predictedScore: 50,
      factors: ['Ongoing exam preparation pressure', 'Potential mock test stress'],
      recommendations: ['Plan one complete rest day', 'Practice mindfulness for 10 min daily', 'Review progress weekly instead of daily'],
    },
  ];
}

export function fallbackMotivation(): string {
  const messages = [
    "Your consistency in journaling shows real self-awareness — that's a skill many students overlook. The fact that you're actively monitoring your mental health during preparation puts you ahead in ways that matter beyond exam scores.",
    "Looking at your recent study pattern, you've been showing up consistently even on tough days. That discipline will compound — trust the process and give yourself credit for showing up.",
    "Remember: exam preparation is a marathon, not a sprint. The students who maintain their mental health alongside their studies are the ones who perform best when it matters most.",
    "Your recent entries show you're processing your emotions rather than suppressing them. That emotional intelligence is a strength that will serve you well beyond any exam.",
    "Every concept you've mastered this week was once something you didn't know. That's real, measurable progress. Focus on how far you've come, not just how far you have to go.",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function fallbackCoachResponse(message: string): string {
  const lower = message.toLowerCase();
  
  if (lower.includes('stress') || lower.includes('anxious') || lower.includes('worried')) {
    return "I hear you — exam stress can feel overwhelming, and it's completely valid to feel this way. Here's what I'd suggest right now:\n\n1. **Pause & breathe** — Try 3 rounds of box breathing (4 seconds each: inhale, hold, exhale, hold)\n2. **Ground yourself** — Name 5 things you can see, 4 you can touch, 3 you can hear\n3. **Reframe** — Instead of 'I'm behind,' try 'I'm working on catching up, and every hour counts'\n\nWould you like me to guide you through a specific breathing exercise, or would you prefer to talk about what's causing the most stress right now?";
  }
  
  if (lower.includes('can\'t focus') || lower.includes('distracted') || lower.includes('concentrate')) {
    return "Focus issues during exam prep are incredibly common — your brain might be signaling that it needs a different approach. Try this:\n\n1. **Pomodoro Reset** — Study for just 25 minutes, then take a 5-minute break\n2. **Change your environment** — Even moving to a different room can help\n3. **Start with the easiest task** — Momentum builds focus\n4. **Put your phone in another room** — Physical distance helps more than apps\n\nIf focus has been consistently difficult for several days, it might be your body asking for rest. When did you last take a full day off?";
  }
  
  if (lower.includes('motivat') || lower.includes('give up') || lower.includes('pointless')) {
    return "Feeling unmotivated doesn't mean you're failing — it means you're human. Motivation naturally fluctuates, especially during long preparation periods. Here's what helps:\n\n1. **Reconnect with your WHY** — Why did you choose this exam? What's the life you're working toward?\n2. **Micro-goals** — Instead of 'study physics,' try 'solve 3 problems from chapter 5'\n3. **Reward yourself** — After each study block, do something you enjoy for 10 minutes\n4. **Progress journal** — Write down one thing you learned today\n\nRemember: consistency beats intensity. Even 2 focused hours today is better than 0.";
  }

  return "Thank you for sharing that with me. I want you to know that whatever you're going through, it's okay to feel this way during exam preparation.\n\nHere are a few things that might help right now:\n\n1. **Take a mindful break** — Even 5 minutes of deep breathing can reset your mental state\n2. **Write it down** — Try journaling about what's on your mind (you can use the Journal page)\n3. **Track your mood** — Logging how you feel helps identify patterns over time\n\nWhat specific area would you like to focus on? I can help with stress management, study planning, motivation, or just listen.";
}
