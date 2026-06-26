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
const { jobSeekerId } = await req.json()

// 求職者情報を取得
const { data: seeker } = await supabase
.from('job_seekers')
.select('*')
.eq('id', jobSeekerId)
.single()

if (!seeker) {
return NextResponse.json({ error: 'Job seeker not found' }, { status: 404 })
}

// マッチする企業を取得
const { data: companies } = await supabase
.from('companies')
.select('*')
.eq('is_active', true)
.contains('job_types', [seeker.job_type])

if (!companies || companies.length === 0) {
return NextResponse.json({ message: 'No matching companies found' })
}

let emailsSent = 0

for (const company of companies) {
if (!company.email) continue

// AI で日本語営業メールを生成
const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 800,
messages: [{
role: 'user',
content: `あなたは有料職業紹介会社「Japan Life Guide」の担当者です。
以下の求職者情報をもとに、企業への日本語営業メール本文を作成してください。

求職者情報：
- 出身国: ${seeker.country}
- 希望職種: ${seeker.job_type}
- 日本語レベル: ${seeker.japanese_level}
- 経験・スキル: ${seeker.experience}

企業情報：
- 企業名: ${company.name}
- 業種: ${company.industry}
- 所在地: ${company.location}

メール要件：
- 丁寧なビジネス日本語
- 求職者の強みをアピール
- Japan Life Guide の紹介
- 有料職業紹介許可取得済みであることを明記
- 登録支援機関許可取得済みであることを明記
- 面談の打診
- 200〜300字程度

メール本文のみを出力してください。件名は不要です。`
}]
})

const emailBody = (response.content[0] as any).text

// 企業にメール送信
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: company.email,
subject: `【人材紹介】${seeker.country}出身 ${seeker.job_type} 求職者のご紹介 - Japan Life Guide`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0; font-size: 20px;">🌸 Japan Life Guide</h1>
<p style="color: rgba(255,255,255,0.8); margin: 5px 0 0; font-size: 13px;">有料職業紹介・登録支援機関</p>
</div>
<div style="padding: 30px; background: #fff;">
<p>${company.name} 御中</p>
<p>採用ご担当者様</p>
<br/>
<div style="white-space: pre-wrap; font-size: 15px; line-height: 1.8; color: #333;">
${emailBody}
</div>
<br/>
<hr style="border: none; border-top: 1px solid #eee;"/>
<div style="margin-top: 20px; font-size: 13px; color: #666;">
<p><strong>Japan Life Guide</strong></p>
<p>有料職業紹介事業許可番号：[許可番号を入力]</p>
<p>登録支援機関登録番号：[登録番号を入力]</p>
<p>Email: hello@japanlifeguide.app</p>
<p>Web: https://japanlifeguide.app</p>
</div>
</div>
</div>
`,
})

emailsSent++

// Admin に通知
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: ADMIN_EMAIL,
subject: `営業メール送信完了: ${seeker.full_name} → ${company.name}`,
html: `
<div style="font-family: sans-serif; padding: 20px;">
<h2>営業メール送信通知</h2>
<p><strong>求職者:</strong> ${seeker.full_name} (${seeker.country})</p>
<p><strong>送信先企業:</strong> ${company.name}</p>
<p><strong>職種:</strong> ${seeker.job_type}</p>
<hr/>
<h3>送信メール内容:</h3>
<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
${emailBody}
</div>
</div>
`,
})
}

// 求職者のステータスを更新
await supabase
.from('job_seekers')
.update({ status: 'contacted' })
.eq('id', jobSeekerId)

return NextResponse.json({
success: true,
emailsSent,
companiesContacted: companies.length,
})

} catch (error) {
console.error('Company outreach error:', error)
return NextResponse.json({ error: 'Failed to send outreach emails' }, { status: 500 })
}
}

