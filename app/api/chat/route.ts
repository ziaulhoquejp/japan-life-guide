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
    const schoolKeywords = ['school', 'language school', 'tokyo', 'osaka', 'kyoto', 'nagoya', 'fukuoka', 'sapporo', 'shizuoka', 'cheap', 'affordable', 'dorm', 'scholarship', 'スクール', '学校', '安い', '寮', 'hokkaido', 'okinawa', 'hiroshima', 'sendai']
    if (schoolKeywords.some(k => lastMessage.includes(k))) {
      let query = supabase.from('schools').select('name_en, name_jp, city, region, annual_fee_jpy, has_dorm, scholarship, jlpt_prep, rating, website_url').eq('data_verified', true)
      if (lastMessage.includes('cheap') || lastMessage.includes('affordable') || lastMessage.includes('安い')) {
        query = query.order('annual_fee_jpy', { ascending: true })
      } else if (lastMessage.includes('dorm') || lastMessage.includes('寮')) {
        query = query.eq('has_dorm', true).order('rating', { ascending: false })
      } else if (lastMessage.includes('scholarship') || lastMessage.includes('奨学金')) {
        query = query.eq('scholarship', true).order('rating', { ascending: false })
      } else if (lastMessage.includes('jlpt')) {
        query = query.eq('jlpt_prep', true).order('rating', { ascending: false })
      } else {
        query = query.order('rating', { ascending: false })
      }
      const { data: schools } = await query.limit(8)
      if (schools?.length) {
        schoolContext = `
Top matching schools from Japan Life Guide database (724+ verified schools):
${schools.map(s => `- ${s.name_en} (${s.name_jp || ''}) in ${s.city}, ${s.region}: ¥${s.annual_fee_jpy?.toLocaleString() || 'N/A'}/year | Dorm: ${s.has_dorm ? '✅' : '❌'} | JLPT: ${s.jlpt_prep ? '✅' : '❌'} | Scholarship: ${s.scholarship ? '✅' : '❌'} | Rating: ${s.rating || 'N/A'} | ${s.website_url || ''}`).join('\n')}
`
      }
    }

    // 求人検索
    let jobContext = ''
    const jobKeywords = ['job', 'work', 'ssw', 'engineer', 'part-time', 'salary', 'recruit', '仕事', '求人', '特定技能', 'アルバイト', '働く', '就職', 'nursing', 'factory', 'construction', 'agriculture']
    if (jobKeywords.some(k => lastMessage.includes(k))) {
      const { data: jobs } = await supabase
        .from('jobs')
        .select('title, company_name, location, job_type, salary_min, salary_max, japanese_required, description')
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
    const visaKeywords = ['visa', 'coe', 'certificate of eligibility', 'student visa', 'ssw visa', 'engineer visa', 'ビザ', '在留資格', '留学', 'residence card', '在留カード', 'zairyu']
    if (visaKeywords.some(k => lastMessage.includes(k))) {
      visaContext = `
Japan Visa Detailed Information:

1. STUDENT VISA (留学ビザ):
- For: Japanese language schools, universities, vocational schools
- Requirements: COE from school, valid passport, bank statement (¥2M+ recommended), academic certificates
- Processing: 3-5 months total (COE: 2-3 months + visa: 1-2 weeks)
- Work permission: Up to 28 hours/week (資格外活動許可)
- Renewal: Every 1-2 years

2. SSW TYPE 1 (特定技能1号):
- For: Working in 16 designated industries
- Requirements: JLPT N4 OR JFT-Basic + Industry skills test + Job offer
- Salary: ¥180,000-¥280,000/month
- Duration: Up to 5 years total
- No family: Cannot bring family

3. SSW TYPE 2 (特定技能2号):
- For: Advanced workers in specific industries
- Requirements: Higher skills test + Job offer
- Can bring family, path to permanent residence

4. ENGINEER VISA (技術・人文知識・国際業務):
- For: IT engineers, international business, specialists
- Requirements: University degree in relevant field + Job offer
- Salary: ¥250,000-¥450,000/month
- Can bring family

Key steps for all visas:
Apply to school/company → They apply for COE → Receive COE → Apply at Japanese Embassy → Come to Japan
`
    }

    // SSW情報
    let sswContext = ''
    const sswKeywords = ['ssw', 'specified skilled', '特定技能', 'skills test', 'jft', 'jlpt n4', 'food manufacturing', 'nursing care', 'construction', 'agriculture', 'lodging', 'aviation']
    if (sswKeywords.some(k => lastMessage.includes(k))) {
      sswContext = `
SSW (Specified Skilled Worker) Detailed Guide:

16 Eligible Industries:
1. Food Manufacturing (食品製造) - ¥185,000-220,000/mo
2. Restaurant/Food Service (外食業) - ¥180,000-210,000/mo
3. Nursing Care (介護) - ¥200,000-280,000/mo
4. Building Cleaning (ビルクリーニング) - ¥175,000-200,000/mo
5. Industrial Machinery (産業機械製造) - ¥190,000-240,000/mo
6. Electronics (電気・電子) - ¥190,000-240,000/mo
7. Construction (建設) - ¥200,000-320,000/mo
8. Shipbuilding (造船) - ¥200,000-280,000/mo
9. Automobile Repair (自動車整備) - ¥200,000-260,000/mo
10. Aviation (航空) - ¥200,000-280,000/mo
11. Lodging (宿泊) - ¥185,000-215,000/mo
12. Agriculture (農業) - ¥175,000-200,000/mo
13. Fishery (漁業) - ¥175,000-205,000/mo

Requirements:
- JLPT N4 OR JFT-Basic (Japanese test)
- Industry-specific skills test
- Age 18 or above
- No criminal record
- Health certificate

Practice SSW skills test: japanlifeguide.app/ssw-test
`
    }

    // コスト情報
    let costContext = ''
    const costKeywords = ['cost', 'money', 'budget', 'expensive', 'cheap', 'fee', 'tuition', 'living', '費用', '生活費', 'お金', 'rent', 'food', 'monthly']
    if (costKeywords.some(k => lastMessage.includes(k))) {
      costContext = `
Japan Cost of Living Guide:

TOKYO: ¥130,000-180,000/month
- Rent (share house): ¥50,000-80,000
- Food: ¥30,000-50,000
- Transport: ¥10,000-20,000
- Utilities: ¥10,000-15,000

OSAKA: ¥110,000-150,000/month
- Rent: ¥40,000-65,000
- Food: ¥25,000-40,000

NAGOYA: ¥100,000-140,000/month
- Rent: ¥35,000-60,000

FUKUOKA: ¥90,000-130,000/month (Cheapest major city!)
- Rent: ¥30,000-55,000

SAPPORO: ¥85,000-120,000/month
- Rent: ¥28,000-50,000

Language School Fees: ¥600,000-¥1,500,000/year
Part-time income (student): ¥1,000-1,500/hour × 28hrs/week = ¥112,000-168,000/month
Bank statement needed for visa: ¥2,000,000+ recommended
`
    }

    // JLPT情報
    let jlptContext = ''
    const jlptKeywords = ['jlpt', 'n1', 'n2', 'n3', 'n4', 'n5', 'japanese test', 'japanese exam', 'hiragana', 'katakana', 'kanji', '日本語能力試験']
    if (jlptKeywords.some(k => lastMessage.includes(k))) {
      jlptContext = `
JLPT (Japanese Language Proficiency Test) Guide:

N5 (Beginner): Basic Japanese, ~800 vocabulary words
N4 (Elementary): Basic Japanese conversation, required for SSW visa
N3 (Intermediate): Everyday Japanese understanding
N2 (Upper Intermediate): Near-fluent, required for many jobs
N1 (Advanced): Native-level, highest certification

Exam dates: Usually July and December
Registration: Usually April-May (July exam), September-October (December exam)
Fee: Approximately ¥5,500-6,000

Practice free at: japanlifeguide.app/jlpt-test
`
    }

    // ハラール情報
    let halalContext = ''
    const halalKeywords = ['halal', 'muslim', 'mosque', 'prayer', 'eid', 'ramadan', 'halal food', 'islamic', 'ハラール', 'モスク', 'イスラム']
    if (halalKeywords.some(k => lastMessage.includes(k))) {
      halalContext = `
Halal & Muslim Life in Japan:

Major Mosques:
- Tokyo Camii (東京ジャーミイ) - Largest mosque in Japan, Yoyogi-Uehara
- Masjid Otsuka - Toshima, Tokyo
- Osaka Ibaraki Mosque - Osaka
- Nagoya Mosque - Nagoya

Halal Food Apps/Resources:
- Japan Life Guide Halal Scanner (scan ingredients!)
- HalalGourmet Japan
- Halal Navi app

Prayer:
- Many airports have prayer rooms
- Some shopping malls have prayer spaces
- Tokyo, Osaka have many halal restaurants

Ramadan in Japan:
- Halal restaurants usually offer iftar sets
- Major cities have Muslim communities

Use our Halal Scanner: japanlifeguide.app/halal-scanner
`
    }

    const systemPrompt = `You are Sakura AI 🌸, the warm and knowledgeable AI assistant for Japan Life Guide (japanlifeguide.app). You are specifically designed to help students and workers from Bangladesh and Nepal navigate studying and working in Japan.

${userContext}
${schoolContext}
${jobContext}
${visaContext}
${sswContext}
${costContext}
${jlptContext}
${halalContext}

YOUR PERSONALITY:
- Warm, encouraging, and supportive like a helpful senior student (senpai)
- Give specific, actionable advice with real numbers and concrete steps
- Be honest about challenges while staying encouraging
- Use emojis occasionally to be friendly 🌸
- Never make up information - if unsure, say "I'm not 100% sure, please verify with..."

YOUR EXPERTISE:
- 724+ verified Japanese language schools in our database
- Complete visa processes (Student, SSW Type 1 & 2, Engineer, Dependent)
- Cost of living in all major Japanese cities
- JLPT preparation (N5 to N1) and SSW skills tests
- Part-time jobs for students (28hrs/week limit strictly enforced)
- Scholarships (MEXT government scholarship, JASSO, private foundations)
- Halal food, mosques, and Muslim life throughout Japan
- Japanese culture, etiquette, manners, and daily life
- Housing options (share house, dormitory, apartment, weekly mansion)
- Banking, SIM cards, health insurance, pension in Japan
- Bangladesh and Nepal specific advice and cultural context

JAPAN LIFE GUIDE TOOLS TO RECOMMEND:
- 🏫 /schools - Browse 724+ verified schools with filters
- 🧮 /visa-calculator - Check visa eligibility instantly
- 💰 /cost-calculator - Calculate monthly living costs by city
- 🔄 /compare - Compare up to 4 schools side by side
- 🎤 /interview-practice - AI interview practice with feedback
- 🏭 /ssw-test - SSW skills test practice for 13 industries
- 📝 /motivation-letter - AI generates Japanese motivation letter
- ✅ /visa-check - Check if visa documents are complete
- 💼 /jobs - Browse real job listings in Japan
- 🕌 /halal-scanner - Scan food ingredients for halal check
- 🪪 /visa-tracker - Track visa and document expiry dates
- 👨‍💼 /visa-consult - Free consultation with immigration specialist
- 📨 /bulk-apply - Send inquiry to multiple schools at once
- 🎁 /referral - Refer friends and earn rewards

LANGUAGE RULES (CRITICAL - ALWAYS FOLLOW):
- If user writes in Bengali (বাংলা অক্ষর) → respond ENTIRELY in Bengali
- If user writes in Nepali (नेपाली अक्षर) → respond ENTIRELY in Nepali  
- If user writes in Japanese (日本語) → respond in Japanese
- Mixed language or English → respond in English
- ALWAYS match the user's language! This is very important!

RESPONSE FORMAT:
- Keep responses under 300 words unless detailed step-by-step is needed
- Use numbered lists for steps (1. 2. 3.)
- Highlight important numbers and facts
- Always end with a helpful next step or tool recommendation
- For school recommendations, always mention specific schools from our database when available`

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