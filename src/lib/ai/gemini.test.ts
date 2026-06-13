import { describe, it, expect } from 'vitest';
import { extractJSON } from './gemini';

describe('Gemini AI Module', () => {
  it('extracts JSON from markdown code blocks', () => {
    const rawResponse = `
Here is your analysis:
\`\`\`json
{
  "score": 85,
  "status": "Good"
}
\`\`\`
    `;
    const result = extractJSON<{ score: number, status: string }>(rawResponse);
    expect(result.score).toBe(85);
    expect(result.status).toBe('Good');
  });

  it('extracts JSON directly without markdown', () => {
    const rawResponse = `{ "score": 90 }`;
    const result = extractJSON<{ score: number }>(rawResponse);
    expect(result.score).toBe(90);
  });

  it('throws an error on invalid JSON', () => {
    const rawResponse = `Not a JSON string at all`;
    expect(() => extractJSON(rawResponse)).toThrow();
  });
});
