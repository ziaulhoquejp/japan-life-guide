import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
try {
const { jobType, difficulty } = await req.json()

const difficultyMap: any = {
beginner: 'Generate questions in English only. Simple and clear.',
intermediate: 'Generate questions in both English and Japanese. Mix of basic and intermediate level.',
advanced: 'Generate questions primarily in Japanese with English translation. Advanced level.',
}

const jobMap: any = {
ssw_food: 'Food service / Restaurant worker (SSW visa)',
ssw_factory: 'Factory / Manufacturing worker (SSW visa)',
ssw_care: 'Nursing care worker (SSW visa)',
ssw_construction: 'Construction worker (SSW visa)',
engineer: 'IT Engineer / Software Developer',
student: 'Japanese language school student applicant',
parttime: 'Part-time job (convenience store / restaurant)',
}

const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 1500,
messages: [{
role: 'user',
content: `Generate 5 realistic Japanese job interview questions for: ${jobMap[jobType] || jobType}

Difficulty: ${difficultyMap[difficulty]}

Return ONLY a JSON array with this exact format:
[
{
"english": "English version of the question",
"japanese": "日本語版の質問（if intermediate or advanced）",
"tip": "Brief tip for answering this question"
}
]

Make questions realistic and commonly asked in Japanese interviews. No markdown, just pure JSON array.`
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
console.error('Interview questions error:', error)
return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 })
}
}

