// ============================================================
// MindShield AI — AI Prompt Templates
// ============================================================

import type { UserProfile, JournalEntry, MoodEntry } from '@/lib/types';

export function buildSystemPrompt(profile: UserProfile | null): string {
  const examContext = profile
    ? `The student is preparing for ${profile.examType} exam${profile.targetDate ? ` with target date ${profile.targetDate}` : ''}. Their weak subjects are: ${profile.weakSubjects.join(', ') || 'not specified'}. Their study goals: ${profile.studyGoals.join(', ') || 'not specified'}. Known stress triggers: ${profile.stressTriggers.join(', ') || 'not specified'}.`
    : 'The student has not yet specified their exam details.';

  return `You are MindShield AI, an empathetic, intelligent mental wellness companion for students preparing for competitive exams in India. You combine the expertise of a clinical psychologist, wellness coach, and supportive mentor.

IMPORTANT RULES:
1. You are NOT a therapist. Never diagnose conditions or prescribe treatment.
2. If you detect signs of self-harm, suicidal ideation, or severe distress, ALWAYS respond with crisis resources and encourage the student to reach out to trusted adults or professionals. Include: iCall (9152987821), Vandrevala Foundation (1860-2662-345), NIMHANS (080-46110007).
3. Never give generic motivational quotes. Always reference the student's specific data, progress, and context.
4. Be warm, understanding, and evidence-based. Use cognitive behavioral techniques, mindfulness principles, and positive psychology.
5. Always explain WHY you're making a recommendation, referencing specific patterns or data points.
6. Validate emotions before offering solutions.

STUDENT CONTEXT:
${examContext}`;
}

export function buildJournalAnalysisPrompt(content: string, recentMoods: MoodEntry[]): string {
  const moodContext = recentMoods.length > 0
    ? `Recent mood history (last ${recentMoods.length} entries): ${recentMoods.map(m => `${m.date}: ${m.mood} (intensity ${m.intensity}/10, study ${m.studyHours}h, sleep ${m.sleepHours}h)`).join('; ')}`
    : 'No recent mood data available.';

  return `Analyze the following student journal entry for emotional and mental wellness indicators.

JOURNAL ENTRY:
"${content}"

${moodContext}

Respond in STRICT JSON format with these fields:
{
  "emotionalState": "primary emotional state in 2-3 words",
  "stressLevel": <number 0-100>,
  "anxietyIndicators": ["list of anxiety signs detected"],
  "confidenceScore": <number 0-100>,
  "burnoutSignals": ["list of burnout indicators"],
  "negativePatterns": ["list of negative thinking patterns like catastrophizing, all-or-nothing thinking, etc."],
  "hiddenTriggers": ["underlying triggers like comparison anxiety, perfectionism, impostor syndrome"],
  "emotionalSummary": "2-3 sentence empathetic summary of their emotional state",
  "triggerAnalysis": ["specific triggers identified from the text"],
  "suggestedActions": ["3-5 specific, actionable recommendations tailored to their situation"],
  "crisisDetected": <boolean - true ONLY if self-harm/suicidal indicators present>
}

Be specific and evidence-based. Reference exact phrases from the journal. Never minimize their feelings.`;
}

export function buildBurnoutPredictionPrompt(
  journals: JournalEntry[],
  moods: MoodEntry[]
): string {
  const journalSummary = journals.slice(0, 7).map(j =>
    `${j.date}: "${j.content.substring(0, 150)}..." ${j.aiAnalysis ? `(stress: ${j.aiAnalysis.stressLevel}/100)` : ''}`
  ).join('\n');

  const moodSummary = moods.slice(0, 14).map(m =>
    `${m.date}: ${m.mood} (intensity ${m.intensity}/10, study ${m.studyHours}h, sleep ${m.sleepHours}h)`
  ).join('\n');

  return `Analyze this student's burnout risk based on their recent data.

RECENT JOURNALS (last 7 days):
${journalSummary || 'No journal entries yet.'}

RECENT MOODS (last 14 days):
${moodSummary || 'No mood entries yet.'}

Respond in STRICT JSON format:
{
  "riskLevel": "low" | "moderate" | "high" | "critical",
  "score": <number 0-100>,
  "factors": {
    "journalSentiment": <0-100, higher = more negative>,
    "moodTrend": <0-100, higher = worse trend>,
    "studyLoad": <0-100, higher = overloaded>,
    "sleepQuality": <0-100, higher = worse sleep>,
    "emotionalFatigue": <0-100, higher = more fatigued>
  },
  "explanation": "2-3 sentence explanation of why this risk level was assigned, referencing specific data points",
  "recommendations": ["3-5 specific recommendations to reduce burnout risk"]
}`;
}

export function buildCoachPrompt(
  profile: UserProfile | null,
  recentJournals: JournalEntry[],
  recentMoods: MoodEntry[],
  conversationHistory: { role: string; content: string }[],
  userMessage: string
): string {
  const journalContext = recentJournals.slice(0, 3).map(j =>
    `${j.date}: stress=${j.aiAnalysis?.stressLevel || 'unknown'}/100, state="${j.aiAnalysis?.emotionalState || 'unknown'}"`
  ).join('; ');

  const moodContext = recentMoods.slice(0, 5).map(m =>
    `${m.date}: ${m.mood} (${m.intensity}/10)`
  ).join('; ');

  return `You are having a supportive conversation with a student.

RECENT CONTEXT:
- Journals: ${journalContext || 'None yet'}
- Moods: ${moodContext || 'None yet'}

CONVERSATION SO FAR:
${conversationHistory.slice(-6).map(m => `${m.role}: ${m.content}`).join('\n')}

STUDENT'S MESSAGE:
"${userMessage}"

Respond as a warm, empathetic wellness coach. Be conversational and natural. Keep response under 200 words. Reference their specific data when relevant. If they seem distressed, validate first, then offer gentle guidance.`;
}

export function buildMotivationPrompt(
  profile: UserProfile | null,
  recentJournals: JournalEntry[],
  recentMoods: MoodEntry[]
): string {
  return `Generate a personalized, data-driven motivational message for a student preparing for ${profile?.examType || 'competitive exams'}.

Recent data points:
- Last mood: ${recentMoods[0] ? `${recentMoods[0].mood} (${recentMoods[0].intensity}/10)` : 'unknown'}
- Recent journal sentiment: ${recentJournals[0]?.aiAnalysis?.emotionalState || 'unknown'}
- Study hours recently: ${recentMoods.slice(0, 3).map(m => m.studyHours).join(', ') || 'unknown'}

RULES:
- NEVER use generic quotes like "You can do it!" or "Stay positive!"
- Reference SPECIFIC progress or data points
- Be genuine and specific to their situation
- Keep it 2-3 sentences max
- Make them feel seen and understood

Respond with just the motivational message text, nothing else.`;
}

export function buildStressForecastPrompt(
  profile: UserProfile | null,
  recentJournals: JournalEntry[],
  recentMoods: MoodEntry[]
): string {
  return `Based on this student's patterns, predict their stress levels for the coming week.

Student: Preparing for ${profile?.examType || 'competitive exams'}
Target date: ${profile?.targetDate || 'Not set'}
Recent stress levels: ${recentJournals.slice(0, 7).map(j => `${j.date}: ${j.aiAnalysis?.stressLevel || '?'}/100`).join(', ') || 'No data'}
Recent moods: ${recentMoods.slice(0, 7).map(m => `${m.date}: ${m.mood}`).join(', ') || 'No data'}

Respond in STRICT JSON format:
{
  "forecasts": [
    {
      "period": "Next 2-3 days",
      "riskLevel": "low" | "moderate" | "high" | "critical",
      "predictedScore": <0-100>,
      "factors": ["factors that might increase stress"],
      "recommendations": ["preventive actions"]
    },
    {
      "period": "This week",
      "riskLevel": "low" | "moderate" | "high" | "critical",
      "predictedScore": <0-100>,
      "factors": ["factors"],
      "recommendations": ["actions"]
    }
  ]
}`;
}
