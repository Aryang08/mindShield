// ============================================================
// MindShield AI — Crisis Detection & Safety Framework
// ============================================================

export interface CrisisResource {
  name: string;
  phone: string;
  description: string;
  available: string;
}

export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: 'iCall',
    phone: '9152987821',
    description: 'Psychosocial helpline by TISS',
    available: 'Mon-Sat, 8am-10pm',
  },
  {
    name: 'Vandrevala Foundation',
    phone: '1860-2662-345',
    description: '24/7 mental health support',
    available: '24/7',
  },
  {
    name: 'NIMHANS',
    phone: '080-46110007',
    description: 'National Institute of Mental Health',
    available: 'Mon-Sat, 9am-5pm',
  },
  {
    name: 'AASRA',
    phone: '9820466726',
    description: 'Crisis intervention center',
    available: '24/7',
  },
  {
    name: 'Snehi',
    phone: '044-24640050',
    description: 'Emotional support helpline',
    available: '24/7',
  },
];

const CRISIS_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'end it all',
  'self harm', 'self-harm', 'hurt myself', 'cutting myself',
  'don\'t want to live', 'no reason to live', 'better off dead',
  'want to die', 'can\'t go on', 'can\'t take it anymore',
  'nobody cares', 'disappear', 'worthless',
];

export function detectCrisis(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lower.includes(keyword));
}

export function getCrisisSafetyMessage(): string {
  return `I can see you're going through a really difficult time, and I want you to know that your feelings are valid. You matter, and you don't have to face this alone.

I'm an AI wellness companion, and while I'm here to support you, I'm not a trained counselor. Right now, the most important thing is that you talk to someone who can truly help.

Please reach out to one of these resources:

📞 iCall: 9152987821 (Mon-Sat, 8am-10pm)
📞 Vandrevala Foundation: 1860-2662-345 (24/7)
📞 NIMHANS: 080-46110007 (Mon-Sat, 9am-5pm)
📞 AASRA: 9820466726 (24/7)

You can also talk to a parent, teacher, school counselor, or any trusted adult. You are not alone in this, and asking for help is a sign of strength, not weakness.

Your exam preparation is important, but YOUR LIFE and well-being are more important than any exam. ❤️`;
}
