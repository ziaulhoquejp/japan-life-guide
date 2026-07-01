import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
try {
const { visaType, missingDocs, checkedDocs, additionalInfo } = await req.json()

const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 1000,
messages: [{
role: 'user',
content: `You are a Japanese visa expert. Check this applicant's document status and provide advice.

Visa Type: ${visaType}
Documents Ready: ${checkedDocs.join(', ') || 'None'}
Missing Documents: ${missingDocs.join(', ') || 'None'}
Additional Info: ${additionalInfo || 'None'}

Respond in JSON format:
{
"assessment": "Overall assessment (2 sentences)",
"advice": "Specific advice about missing or problematic documents. If bank statement mentioned, advise on minimum amount needed. If COE mentioned, explain the process.",
"nextSteps": "3-4 concrete next steps numbered list",
"urgency": "low/medium/high"
}

Be specific, helpful, and encouraging. JSON only.`
}]
})

const text = (response.content[0] as any).text
let result
try {
const jsonMatch = text.match(/\{[\s\S]*\}/)
result = jsonMatch ? JSON.parse(jsonMatch[0]) : { assessment: text, advice: '', nextSteps: '' }
} catch {
result = { assessment: text, advice: '', nextSteps: '' }
}

return NextResponse.json(result)
} catch (error) {
console.error('Visa check error:', error)
return NextResponse.json({ error: 'Failed to check documents' }, { status: 500 })
}
}
