import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_EMAIL = 'ziaulhoquejp@gmail.com'

export async function POST(req: Request) {
try {
const body = await req.json()
const { companyName, companyNameJP, contactName, email, phone, industry, location, jobType, salary, japaneseRequired, numberOfPositions, jobDescription, requirements, benefits } = body

// Supabase に保存
await supabase.from('companies').insert({
name: companyNameJP || companyName,
name_en: companyName,
email: email,
industry: industry,
location: location,
job_types: [jobType],
japanese_required: japaneseRequired,
description: jobDescription,
is_active: false, // 承認後に有効化
})

// 管理者に通知
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: ADMIN_EMAIL,
subject: `新規求人掲載申請: ${companyNameJP || companyName}`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<h2 style="color: #C42020;">新規求人掲載申請</h2>
<table style="width: 100%; border-collapse: collapse;">
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">会社名（日本語）</td><td style="padding: 8px; font-weight: bold;">${companyNameJP}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Company Name</td><td style="padding: 8px;">${companyName}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">担当者</td><td style="padding: 8px;">${contactName}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">メール</td><td style="padding: 8px;">${email}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">電話</td><td style="padding: 8px;">${phone}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">業種</td><td style="padding: 8px;">${industry}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">所在地</td><td style="padding: 8px;">${location}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">雇用形態</td><td style="padding: 8px;">${jobType}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">給与</td><td style="padding: 8px;">${salary}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">日本語要件</td><td style="padding: 8px;">${japaneseRequired}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">募集人数</td><td style="padding: 8px;">${numberOfPositions}</td></tr>
</table>
<h3 style="margin-top: 16px;">仕事内容</h3>
<p style="background: #f5f5f5; padding: 12px; border-radius: 8px;">${jobDescription}</p>
<h3>応募要件</h3>
<p style="background: #f5f5f5; padding: 12px; border-radius: 8px;">${requirements}</p>
<h3>待遇・福利厚生</h3>
<p style="background: #f5f5f5; padding: 12px; border-radius: 8px;">${benefits}</p>
</div>
`,
})

// 企業に確認メール
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: email,
subject: '求人掲載申請を受け付けました - Japan Life Guide',
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
<p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">有料職業紹介・登録支援機関</p>
</div>
<div style="padding: 30px;">
<p>${contactName} 様</p>
<p>この度は求人掲載のお申し込みをいただき、誠にありがとうございます。</p>
<p>内容を確認の上、<strong>2営業日以内</strong>にご連絡いたします。</p>
<div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 20px 0;">
<p><strong>会社名:</strong> ${companyNameJP || companyName}</p>
<p><strong>業種:</strong> ${industry}</p>
<p><strong>雇用形態:</strong> ${jobType}</p>
<p><strong>募集人数:</strong> ${numberOfPositions}</p>
</div>
<p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
<p>📧 hello@japanlifeguide.app</p>
<hr/>
<p style="color: #999; font-size: 12px;">Japan Life Guide | 有料職業紹介事業許可 | 登録支援機関 | japanlifeguide.app</p>
</div>
</div>
`,
})

return NextResponse.json({ success: true })
} catch (error) {
console.error('Company register error:', error)
return NextResponse.json({ error: 'Failed to register' }, { status: 500 })
}
}