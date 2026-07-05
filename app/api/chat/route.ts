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
const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''

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
Current user:
- Name: ${profile.full_name || 'Unknown'}
- Country: ${profile.country || 'Unknown'}
- Japanese Level: ${profile.japanese_level || 'Unknown'}
- Plan: ${profile.plan || 'free'}
- Purpose: ${profile.purpose || 'Unknown'}
`
}
}

// 学校検索
let schoolContext = ''
const schoolKeywords = ['school', 'language school', 'tokyo', 'osaka', 'kyoto', 'nagoya', 'fukuoka', 'sapporo', 'shizuoka', 'cheap', 'affordable', 'dorm', 'scholarship', 'スクール', '学校', '安い', '寮']
if (schoolKeywords.some(k => lastMessage.includes(k))) {
let query = supabase.from('schools').select('name_en, name_jp, city, region, annual_fee_jpy, has_dorm, scholarship, jlpt_prep, rating, website_url').eq('data_verified', true)
if (lastMessage.includes('cheap') || lastMessage.includes('affordable') || lastMessage.includes('安い')) query = query.order('annual_fee_jpy', { ascending: true })
else if (lastMessage.includes('dorm') || lastMessage.includes('寮')) query = query.eq('has_dorm', true)
else if (lastMessage.includes('scholarship') || lastMessage.includes('奨学金')) query = query.eq('scholarship', true)
else query = query.order('rating', { ascending: false })
const { data: schools } = await query.limit(8)
if (schools?.length) {
schoolContext = `
Top matching schools from Japan Life Guide database:
${schools.map(s => `- ${s.name_en} (${s.name_jp || ''}) in ${s.city}: ¥${s.annual_fee_jpy?.toLocaleString() || 'N/A'}/year | Dorm: ${s.has_dorm ? '✅' : '❌'} | JLPT: ${s.jlpt_prep ? '✅' : '❌'} | Scholarship: ${s.scholarship ? '✅' : '❌'} | Rating: ${s.rating || 'N/A'} | ${s.website_url || ''}`).join('\n')}
`
}
}

// 求人検索
let jobContext = ''
const jobKeywords = ['job', 'work', 'ssw', 'engineer', 'part-time', 'salary', 'recruit', '仕事', '求人', '特定技能', 'アルバイト', '働く', '就職']
if (jobKeywords.some(k => lastMessage.includes(k))) {
const { data: jobs } = await supabase
.from('jobs')
.select('title, company_name, location, job_type, salary_min, salary_max, japanese_required')
.eq('is_active', true)
.order('is_featured', { ascending: false })
.limit(6)
if (jobs?.length) {
jobContext = `
Available jobs in Japan Life Guide:
${jobs.map(j => `- ${j.title} at ${j.company_name} in ${j.location}: ¥${j.salary_min?.toLocaleString()}-¥${j.salary_max?.toLocaleString()}/mo | Type: ${j.job_type} | Japanese: ${j.japanese_required}`).join('\n')}
`
}
}

// ビザ情報
let visaContext = ''
const visaKeywords = ['visa', 'coe', 'certificate of eligibility', 'student visa', 'ssw visa', 'engineer visa', 'ビザ', '在留資格', '留学']
if (visaKeywords.some(k => lastMessage.includes(k))) {
visaContext = `
Japan Visa Information:
1. Student Visa (留学ビザ): For language school/university students. Requires COE from school. Processing: 3-5 months. Work: up to 28hrs/week.
2. SSW Type 1 (特定技能1号): For working in 16 industries. Requires JLPT N4 + skills test. Up to 5 years. Full-time work.
3. Engineer Visa (技術・人文知識・国際業務): For IT/business professionals. Requires degree + job offer. Renewable.
Key steps: Apply to school/company → They apply for COE → You apply for visa at Japanese Embassy → Come to Japan!
`
}

// SSW 情報
let sswContext = ''
const sswKeywords = ['ssw', 'specified skilled', '特定技能', 'skills test', 'jft', 'jlpt n4']
if (sswKeywords.some(k => lastMessage.includes(k))) {
sswContext = `
SSW (Specified Skilled Worker) Information:
- 13 eligible industries: Food manufacturing, Restaurant, Nursing care, Building cleaning, Industrial machinery, Electronics, Construction, Automobile repair, Aviation, Lodging, Agriculture, Fishery, Shipbuilding
- Requirements: JLPT N4 OR JFT-Basic + Industry skills test
- Benefits: Work full-time, bring family (Type 2), earn ¥180,000-¥280,000/month
- Practice SSW skills test at: japanlifeguide.app/ssw-test
`
}

// コスト情報
let costContext = ''
const costKeywords = ['cost', 'money', 'budget', 'expensive', 'cheap', 'fee', 'tuition', 'living', '費用', '生活費', 'お金']
if (costKeywords.some(k => lastMessage.includes(k))) {
costContext = `
Japan Cost Information:
- Tokyo: ¥80,000-120,000/month (rent ¥50,000-80,000 + food ¥30,000-50,000)
- Osaka: ¥70,000-100,000/month
- Nagoya: ¥65,000-90,000/month
- Fukuoka: ¥60,000-85,000/month (cheapest major city)
- Language school fees: ¥600,000-¥1,500,000/year
- Part-time income: ¥1,000-1,500/hour × 28hrs/week = ~¥112,000-168,000/month
- Bank statement needed: ¥2,000,000+ recommended for student visa
`
}

const systemPrompt = `You are Sakura AI 🌸, a warm and knowledgeable assistant for Japan Life Guide (japanlifeguide.app). You help students and workers from Bangladesh and Nepal navigate studying and working in Japan.

${userContext}
${schoolContext}
${jobContext}
${visaContext}
${sswContext}
${costContext}

Your personality:
- Warm, encouraging, and supportive like a helpful senior student
- Give specific, actionable advice with real numbers and steps
- Use emojis occasionally to be friendly 🌸
- Be honest about challenges while staying encouraging

Your expertise:
- 724+ verified Japanese language schools
- Visa processes (Student, SSW, Engineer, Dependent)
- Cost of living in different Japanese cities
- JLPT preparation (N5 to N1)
- SSW skills tests for 13 industries
- Part-time jobs for students (28hrs/week limit)
- Scholarships (MEXT, JASSO, private)
- Halal food and Muslim life in Japan
- Japanese culture, etiquette, daily life
- Housing (share house, dormitory, apartment)

Japan Life Guide tools to recommend:
- 🏫 /schools - Browse 724+ verified schools
- 🧮 /visa-calculator - Check visa eligibility
- 💰 /cost-calculator - Calculate monthly costs
- 🔄 /compare - Compare schools side by side
- 🎤 /interview-practice - Practice job interviews
- 🏭 /ssw-test - Practice SSW skills test
- 📝 /motivation-letter - Generate motivation letter
- ✅ /visa-check - Check visa documents
- 💼 /jobs - Browse job opportunities
- 👨‍💼 /visa-consult - Free visa consultation

Language rules (VERY IMPORTANT):
- Bengali text (বাংলা) → respond ENTIRELY in Bengali
- Nepali text (नेपली) → respond ENTIRELY in Nepali
- Japanese text (日本語) → respond in Japanese
- Mixed or English → respond in English
- Always match the user's language!

Response guidelines:
- Keep responses under 300 words unless detailed explanation needed
- Use numbered lists for steps
- Bold important information
- Always end with a helpful next step or tool recommendation
- Never make up information - if unsure, say so`

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
