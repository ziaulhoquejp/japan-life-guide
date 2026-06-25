import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
try {
const { messages, userId } = await req.json()

// ユーザー情報を取得
let userContext = ''
if (userId) {
const { data: profile } = await supabase
.from('profiles')
.select('*')
.eq('id', userId)
.single()

if (profile) {
userContext = `
Current user information:
- Name: ${profile.full_name || 'Unknown'}
- Country: ${profile.country || 'Unknown'}
- Japanese Level: ${profile.japanese_level || 'Unknown'}
- Plan: ${profile.plan || 'free'}
`
}
}

// 最後のメッセージから学校検索が必要か判断
const lastMessage = messages[messages.length - 1]?.content || ''
let schoolContext = ''

const schoolKeywords = ['school', 'tokyo', 'osaka', 'kyoto', 'nagoya', 'fukuoka', 'sapporo', 'shizuoka', 'cheap', 'affordable', 'dorm', 'scholarship']
const needsSchoolData = schoolKeywords.some(keyword => lastMessage.toLowerCase().includes(keyword))

if (needsSchoolData) {
const { data: schools } = await supabase
.from('schools')
.select('name_en, city, region, annual_fee_jpy, has_dorm, scholarship, jlpt_prep, rating, website_url')
.eq('data_verified', true)
.order('rating', { ascending: false })
.limit(10)

if (schools && schools.length > 0) {
schoolContext = `
Relevant schools from Japan Life Guide database (top rated verified schools):
${schools.map(s => `- ${s.name_en} in ${s.city} (${s.region}): ¥${s.annual_fee_jpy?.toLocaleString()}/year, Dorm: ${s.has_dorm ? 'Yes' : 'No'}, JLPT: ${s.jlpt_prep ? 'Yes' : 'No'}, Scholarship: ${s.scholarship ? 'Yes' : 'No'}, Rating: ${s.rating}`).join('\n')}
`
}
}

const systemPrompt = `You are Sakura AI, a helpful and friendly assistant for Japan Life Guide (japanlifeguide.app). You specialize in helping students from Bangladesh and Nepal study and work in Japan.

${userContext}

${schoolContext}

Your expertise includes:
- Japanese language schools (724+ verified schools in our database)
- Student visa process, SSW visa (特定技能), Engineer visa
- Cost of living in Japan (Tokyo, Osaka, Kyoto, etc.)
- Halal food and Muslim life in Japan
- JLPT preparation (N5, N4, N3, N2, N1)
- Part-time jobs (up to 28 hours/week on student visa)
- Scholarships (MEXT, JASSO, private foundations)
- Japanese culture and daily life tips
- Housing options (share house, dormitory, apartment)

Language rules:
- If user writes in Bengali (বাংলা), respond in Bengali
- If user writes in Nepali (नेपाली), respond in Nepali
- If user writes in Japanese (日本語), respond in Japanese
- Otherwise respond in English

Important guidelines:
- Be warm, encouraging, and supportive
- Give specific, actionable advice
- Always recommend visiting japanlifeguide.app for more details
- Mention specific tools: Visa Calculator, Cost Calculator, School Search
- If recommending schools, mention ones from our database when relevant
- Keep responses concise but helpful (under 300 words unless detailed explanation needed)
- Use emojis occasionally to make responses friendly 🌸`

const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 1000,
system: systemPrompt,
messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
})

const textBlock = response.content.find((block: any) => block.type === 'text')
return NextResponse.json({ content: textBlock ? (textBlock as any).text : 'Sorry, I could not generate a response.' })

} catch (error) {
console.error('Chat error:', error)
return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
}
}