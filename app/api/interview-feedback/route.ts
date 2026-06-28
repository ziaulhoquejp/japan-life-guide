import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
try {
const { jobType, difficulty, questions, answers } = await req.json()

const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 2000,
messages: [{
role: 'user',
content: `You are a Japanese interview coach. Evaluate these interview answers for a ${jobType} position.

Questions and Answers:
${questions.map((q: any, i: number) => `
Q${i+1}: ${typeof q === 'string' ? q : q.english}
A${i+1}: ${answers[i] || 'No answer provided'}
`).join('\n')}

Provide feedback in the same language as the answers (if Bengali বাংলা respond in Bengali, if Nepali नेपाली respond in Nepali, otherwise English).

Return ONLY a JSON object with this exact format:
{
"overall": "Overall assessment of the interview performance (2-3 sentences)",
"feedback": [
{
"score": 8,
"feedback": "Specific feedback for this answer",
"better_answer": "A better version of the answer"
}
]
}

Be constructive, encouraging, and specific. No markdown, just pure JSON.`
}]
})

const text = (response.content[0] as any).text
let result
try {
const jsonMatch = text.match(/\{[\s\S]*\}/)
result = jsonMatch ? JSON.parse(jsonMatch[0]) : { overall: text, feedback: [] }
} catch {
result = { overall: text, feedback: [] }
}

return NextResponse.json(result)
} catch (error) {
console.error('Interview feedback error:', error)
return NextResponse.json({ error: 'Failed to generate feedback' }, { status: 500 })
}
}
