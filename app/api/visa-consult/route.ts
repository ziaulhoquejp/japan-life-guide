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
const { userName, userEmail, userCountry, visaType, situation, japaneseLevel } = await req.json()

// 行政書士を取得
const { data: lawyers } = await supabase
.from('gyoseishoshi')
.select('*')
.eq('is_active', true)

// AI で最適な行政書士を選択してメッセージ生成
const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 1500,
messages: [{
role: 'user',
content: `A student needs visa consultation. Generate:
1. A brief analysis of their situation
2. A professional referral email to an immigration lawyer

Student Information:
- Name: ${userName}
- Country: ${userCountry}
- Email: ${userEmail}
- Visa Type Needed: ${visaType}
- Japanese Level: ${japaneseLevel}
- Situation: ${situation}

Available Lawyers: ${JSON.stringify(lawyers)}

Respond in JSON format:
{
"analysis": "Brief analysis of student situation",
"recommendedLawyer": "lawyer name",
"emailToLawyer": "Professional email content",
"adviceToStudent": "What student should prepare"
}`
}]
})

const textContent = (response.content[0] as any).text
let result
try {
result = JSON.parse(textContent)
} catch {
result = {
analysis: textContent,
recommendedLawyer: lawyers?.[0]?.name || 'Japan Visa Support',
emailToLawyer: `Dear Immigration Specialist,\n\nI am writing to refer a student who needs ${visaType} visa assistance.\n\nStudent: ${userName}\nCountry: ${userCountry}\nSituation: ${situation}`,
adviceToStudent: 'Please prepare your passport, academic certificates, and bank statements.'
}
}

const recommendedLawyer = lawyers?.find(l => l.name === result.recommendedLawyer) || lawyers?.[0]

// 行政書士にメール送信
if (recommendedLawyer?.email) {
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: recommendedLawyer.email,
replyTo: userEmail,
subject: `Visa Consultation Request - ${userName} (${userCountry})`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
<p style="color: rgba(255,255,255,0.8);">Visa Consultation Referral</p>
</div>
<div style="padding: 30px;">
<h2>New Client Referral</h2>
<p><strong>Name:</strong> ${userName}</p>
<p><strong>Country:</strong> ${userCountry}</p>
<p><strong>Email:</strong> ${userEmail}</p>
<p><strong>Visa Type:</strong> ${visaType}</p>
<p><strong>Japanese Level:</strong> ${japaneseLevel}</p>
<p><strong>Situation:</strong> ${situation}</p>
<hr/>
<h3>AI Analysis:</h3>
<p>${result.analysis}</p>
<hr/>
<p style="color: #999; font-size: 12px;">Referred via Japan Life Guide | japanlifeguide.app</p>
</div>
</div>
`,
})
}

// 学生に確認メール
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: userEmail,
subject: `Visa Consultation Request Received 🌸`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
</div>
<div style="padding: 30px;">
<h2>Your visa consultation request has been received!</h2>
<p>Dear ${userName},</p>
<p>We have matched you with <strong>${recommendedLawyer?.name}</strong> for your ${visaType} visa consultation.</p>
<p>They will contact you at <strong>${userEmail}</strong> shortly.</p>
<hr/>
<h3>What to prepare:</h3>
<p>${result.adviceToStudent}</p>
<hr/>
<p style="color: #999; font-size: 12px;">Japan Life Guide | japanlifeguide.app</p>
</div>
</div>
`,
})

// 管理者に通知
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: ADMIN_EMAIL,
subject: `New Visa Consultation: ${userName} → ${recommendedLawyer?.name}`,
html: `
<div style="font-family: sans-serif; padding: 20px;">
<h2>New Visa Consultation Request</h2>
<p><strong>Student:</strong> ${userName} (${userCountry})</p>
<p><strong>Email:</strong> ${userEmail}</p>
<p><strong>Visa Type:</strong> ${visaType}</p>
<p><strong>Matched with:</strong> ${recommendedLawyer?.name}</p>
<p><strong>AI Analysis:</strong> ${result.analysis}</p>
</div>
`,
})

return NextResponse.json({
success: true,
analysis: result.analysis,
recommendedLawyer: recommendedLawyer?.name,
advice: result.adviceToStudent
})

} catch (error) {
console.error('Visa consult error:', error)
return NextResponse.json({ error: 'Failed to process consultation' }, { status: 500 })
}
}