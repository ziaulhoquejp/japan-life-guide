import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_EMAIL = 'ziaulhoquejp@gmail.com'

export async function POST(req: Request) {
try {
const { schoolIds, studentInfo } = await req.json()

// 学校情報を取得
const { data: schools } = await supabase
.from('schools')
.select('id, name_en, name_jp, city, contact_email')
.in('id', schoolIds)

if (!schools || schools.length === 0) {
return NextResponse.json({ error: 'No schools found' }, { status: 404 })
}

const results = []

for (const school of schools) {
if (!school.contact_email) {
results.push({ schoolName: school.name_en, success: false, reason: 'No email' })
continue
}

try {
// AI でパーソナライズメールを生成
const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 600,
messages: [{
role: 'user',
content: `Write a professional inquiry email from a student to a Japanese language school.

Student:
- Name: ${studentInfo.fullName}
- Country: ${studentInfo.country}
- Japanese Level: ${studentInfo.japaneseLevel}
- Intended Start: ${studentInfo.intendedStart}
- Motivation: ${studentInfo.motivation || 'Interested in studying Japanese'}

School: ${school.name_en} (${school.name_jp || ''}) in ${school.city}

Write a polite, professional email in English (under 250 words) that:
1. Introduces the student
2. Shows specific interest in THIS school
3. Mentions Japanese level and intended start
4. Asks about enrollment process and fees
5. Asks about dormitory

Email body only, no subject line.`
}]
})

const emailBody = (response.content[0] as any).text

// 学校にメール送信
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: school.contact_email,
replyTo: studentInfo.email,
subject: `Student Inquiry from ${studentInfo.country} - ${studentInfo.fullName}`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0; font-size: 18px;">🌸 Japan Life Guide</h1>
<p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 12px;">Student Inquiry</p>
</div>
<div style="padding: 30px; background: #f9f9f9;">
<p style="color: #666; font-size: 13px;">This inquiry was sent via Japan Life Guide (japanlifeguide.app)</p>
<hr/>
<div style="white-space: pre-wrap; font-size: 15px; line-height: 1.8; color: #333;">${emailBody}</div>
<hr/>
<p style="color: #999; font-size: 12px;">
Student: ${studentInfo.fullName} | ${studentInfo.email} | ${studentInfo.country}<br/>
Sent via Japan Life Guide | japanlifeguide.app
</p>
</div>
</div>
`,
})

// Supabase に記録
await supabase.from('applications').insert({
user_id: null,
school_id: school.id,
status: 'applied',
full_name: studentInfo.fullName,
email: studentInfo.email,
country: studentInfo.country,
notes: JSON.stringify({ japanese_level: studentInfo.japaneseLevel, intended_start: studentInfo.intendedStart }),
})

results.push({ schoolName: school.name_en, success: true })

} catch (err) {
results.push({ schoolName: school.name_en, success: false, reason: 'Send failed' })
}

// レート制限対策
await new Promise(resolve => setTimeout(resolve, 500))
}

// 管理者に通知
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: ADMIN_EMAIL,
subject: `一括問い合わせ: ${studentInfo.fullName} → ${results.filter(r=>r.success).length}校`,
html: `
<div style="font-family: sans-serif; padding: 20px;">
<h2>一括問い合わせ通知</h2>
<p><strong>学生:</strong> ${studentInfo.fullName} (${studentInfo.country})</p>
<p><strong>メール:</strong> ${studentInfo.email}</p>
<p><strong>成功:</strong> ${results.filter(r=>r.success).length}校</p>
<p><strong>失敗:</strong> ${results.filter(r=>!r.success).length}校</p>
<h3>詳細:</h3>
${results.map(r=>`<p>${r.success?'✅':'❌'} ${r.schoolName}</p>`).join('')}
</div>
`,
})

// 学生に確認メール
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: studentInfo.email,
subject: `Your inquiries have been sent to ${results.filter(r=>r.success).length} schools! 🌸`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
</div>
<div style="padding: 30px;">
<h2>Your inquiries have been sent! 🎉</h2>
<p>Dear ${studentInfo.fullName},</p>
<p>We have sent personalized inquiries to <strong>${results.filter(r=>r.success).length} schools</strong> on your behalf.</p>
<h3>Results:</h3>
${results.map(r=>`<p>${r.success?'✅':'❌'} ${r.schoolName}</p>`).join('')}
<p>Schools will contact you directly at <strong>${studentInfo.email}</strong>.</p>
<hr/>
<p style="color: #999; font-size: 12px;">Japan Life Guide | japanlifeguide.app</p>
</div>
</div>
`,
})

return NextResponse.json({ success: true, results })

} catch (error) {
console.error('Bulk inquiry error:', error)
return NextResponse.json({ error: 'Failed to send inquiries' }, { status: 500 })
}
}

