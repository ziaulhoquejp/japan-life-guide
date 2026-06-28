import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
try {
const { industry } = await req.json()

const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 2000,
messages: [{
role: 'user',
content: `Generate 10 multiple choice practice questions for the Japanese SSW (Specified Skilled Worker) skills test for the ${industry.title} (${industry.titleJP}) industry.

Questions should test:
- Industry-specific knowledge and skills
- Safety procedures
- Work processes and standards
- Japanese workplace rules
- Technical vocabulary

Return ONLY a JSON array:
[
{
"english": "English version of the question",
"japanese": "日本語版の質問",
"options": ["Option A", "Option B", "Option C", "Option D"],
"correctAnswer": 0,
"explanation": "Brief explanation of why this answer is correct"
}
]

Make questions realistic and similar to actual SSW exam questions. correctAnswer is the index (0-3) of the correct option. No markdown, just pure JSON array.`
}]
})

const text = (response.content[0] as any).text
let questions
try {
const jsonMatch = text.match(/\[[\s\S]*\]/)
questions = jsonMatch ? JSON.parse(jsonMatch[0]) : []
} catch {
questions = []
}

return NextResponse.json({ questions })
} catch (error) {
console.error('SSW questions error:', error)
return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 })
}
}
