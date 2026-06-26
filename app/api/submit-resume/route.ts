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
const { fullName, email, country, jobType, japaneseLevel, experience } = await req.json()

// AI で履歴書を分析
const analysis = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 1000,
messages: [{
role: 'user',
content: `求職者の情報を分析して、日本での就職可能性と最適な求人タイプを教えてください。

求職者情報：
- 名前: ${fullName}
- 出身国: ${country}
- 希望職種: ${jobType}
- 日本語レベル: ${japaneseLevel}
- 経験・スキル: ${experience}

以下の形式でJSON回答してください：
{
"suitable_jobs": ["最適な職種1", "最適な職種2", "最適な職種3"],
"visa_recommendation": "推奨ビザタイプ",
"japanese_advice": "日本語に関するアドバイス",
"overall_assessment": "総合評価（日本語で）",
"action_items": ["アクション1", "アクション2", "アクション3"]
}`
}]
})

const textContent = (analysis.content[0] as any).text
let aiResult
try {
const jsonMatch = textContent.match(/\{[\s\S]*\}/)
aiResult = jsonMatch ? JSON.parse(jsonMatch[0]) : null
} catch {
aiResult = null
}

// Supabase に保存
await supabase.from('job_seekers').insert({
full_name: fullName,
email: email,
country: country,
job_type: jobType,
japanese_level: japaneseLevel,
experience: experience,
ai_analysis: textContent,
status: 'new',
})

// 管理者に日本語通知メール
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: ADMIN_EMAIL,
subject: `新規求職者登録: ${fullName} (${country})`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<h2 style="color: #C42020;">新規求職者登録通知</h2>
<table style="width: 100%; border-collapse: collapse;">
<tr style="border-bottom: 1px solid #eee;">
<td style="padding: 8px; color: #666; width: 40%;">氏名</td>
<td style="padding: 8px; font-weight: bold;">${fullName}</td>
</tr>
<tr style="border-bottom: 1px solid #eee;">
<td style="padding: 8px; color: #666;">メールアドレス</td>
<td style="padding: 8px;">${email}</td>
</tr>
<tr style="border-bottom: 1px solid #eee;">
<td style="padding: 8px; color: #666;">出身国</td>
<td style="padding: 8px;">${country}</td>
</tr>
<tr style="border-bottom: 1px solid #eee;">
<td style="padding: 8px; color: #666;">希望職種</td>
<td style="padding: 8px;">${jobType}</td>
</tr>
<tr style="border-bottom: 1px solid #eee;">
<td style="padding: 8px; color: #666;">日本語レベル</td>
<td style="padding: 8px;">${japaneseLevel}</td>
</tr>
<tr style="border-bottom: 1px solid #eee;">
<td style="padding: 8px; color: #666;">経験・スキル</td>
<td style="padding: 8px;">${experience}</td>
</tr>
</table>
<h3 style="color: #C42020; margin-top: 20px;">AI分析結果</h3>
${aiResult ? `
<p><strong>推奨職種:</strong> ${aiResult.suitable_jobs?.join(', ')}</p>
<p><strong>推奨ビザ:</strong> ${aiResult.visa_recommendation}</p>
<p><strong>総合評価:</strong> ${aiResult.overall_assessment}</p>
<p><strong>アクション:</strong> ${aiResult.action_items?.join(', ')}</p>
` : `<p>${textContent}</p>`}
<hr/>
<p style="color: #999; font-size: 12px;">Japan Life Guide 求職者管理システム</p>
</div>
`,
})

// 求職者に確認メール（英語）
await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: email,
subject: `Your job application received! 🌸 - Japan Life Guide`,
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
</div>
<div style="padding: 30px;">
<h2>Hi ${fullName}! 🎉</h2>
<p>Your resume has been received successfully!</p>
<p>Our team will review your profile and contact you within <strong>2 business days</strong>.</p>
${aiResult ? `
<div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 20px 0;">
<h3>AI Job Match Analysis</h3>
<p><strong>Best matching jobs:</strong> ${aiResult.suitable_jobs?.join(', ')}</p>
<p><strong>Recommended visa:</strong> ${aiResult.visa_recommendation}</p>
<p><strong>Assessment:</strong> ${aiResult.overall_assessment}</p>
</div>
` : ''}
<p>While you wait, you can:</p>
<ul>
<li>🌸 <a href="https://japanlifeguide.app/chat">Ask Sakura AI</a> for personalized advice</li>
<li>📝 <a href="https://japanlifeguide.app/jlpt-test">Practice JLPT</a></li>
<li>🛂 <a href="https://japanlifeguide.app/visa">Check visa requirements</a></li>
</ul>
<hr/>
<p style="color: #999; font-size: 12px;">Japan Life Guide | Licensed Recruitment Agency | japanlifeguide.app</p>
</div>
</div>
`,
})

return NextResponse.json({
success: true,
analysis: aiResult,
})

} catch (error) {
console.error('Resume submit error:', error)
return NextResponse.json({ error: 'Failed to submit resume' }, { status: 500 })
}
}

