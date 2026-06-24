import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = 'ziaulhoquejp@gmail.com'

export async function POST(req: Request) {
try {
const { studentName, studentEmail, studentCountry, schoolName, schoolEmail, japaneseLevel, intendedStart, motivation } = await req.json()

// AI でメール文を生成
const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 1000,
messages: [{
role: 'user',
content: `Write a professional inquiry email from a student to a Japanese language school.

Student Information:
- Name: ${studentName}
- Country: ${studentCountry}
- Japanese Level: ${japaneseLevel}
- Intended Start: ${intendedStart}
- Motivation: ${motivation || 'Interested in studying Japanese'}

School: ${schoolName}

Write a polite, professional email in English that:
1. Introduces the student
2. Expresses interest in the school
3. Mentions their Japanese level and intended start date
4. Asks about enrollment process and fees
5. Asks about dormitory availability

Keep it under 300 words. Professional and friendly tone.`
}]
})

const emailBody = (response.content[0] as any).text

// 学校にメール送信（学校のメールがある場合）
if (schoolEmail) {
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: schoolEmail,
replyTo: studentEmail,
subject: `Student Inquiry from ${studentCountry} - ${studentName}`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
<p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">Student Inquiry</p>
</div>
<div style="padding: 30px; background: #f9f9f9;">
<p style="color: #666; font-size: 14px;">This inquiry was sent via Japan Life Guide (japanlifeguide.app)</p>
<hr/>
<div style="white-space: pre-wrap; font-size: 15px; line-height: 1.7; color: #333;">
${emailBody}
</div>
<hr/>
<p style="color: #999; font-size: 12px;">
Student: ${studentName} | ${studentEmail} | ${studentCountry}<br/>
Sent via Japan Life Guide | japanlifeguide.app
</p>
</div>
</div>
`,
})
}

// 管理者に通知
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: ADMIN_EMAIL,
subject: `New Inquiry: ${studentName} → ${schoolName}`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<h2>New School Inquiry</h2>
<p><strong>Student:</strong> ${studentName} (${studentCountry})</p>
<p><strong>Email:</strong> ${studentEmail}</p>
<p><strong>School:</strong> ${schoolName}</p>
<p><strong>Japanese Level:</strong> ${japaneseLevel}</p>
<p><strong>Intended Start:</strong> ${intendedStart}</p>
<hr/>
<h3>AI Generated Email:</h3>
<div style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 8px;">
${emailBody}
</div>
</div>
`,
})

// 学生に確認メール
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: studentEmail,
subject: `Your inquiry to ${schoolName} has been sent! 🌸`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
</div>
<div style="padding: 30px;">
<h2>Your inquiry has been sent!</h2>
<p>Dear ${studentName},</p>
<p>Your inquiry to <strong>${schoolName}</strong> has been sent successfully.</p>
<p>The school will contact you directly at <strong>${studentEmail}</strong>.</p>
<hr/>
<h3>Here's what we sent:</h3>
<div style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 14px;">
${emailBody}
</div>
<hr/>
<p style="color: #999; font-size: 12px;">
Track your applications at japanlifeguide.app/applications
</p>
</div>
</div>
`,
})

return NextResponse.json({ success: true, emailBody })

} catch (error) {
console.error('Inquiry error:', error)
return NextResponse.json({ error: 'Failed to send inquiry' }, { status: 500 })
}
}