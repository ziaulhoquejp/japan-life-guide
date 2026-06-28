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
const { fullName, email, country, jobType, japaneseLevel, experience, resumeUrl } = await req.json()

// PDF の内容を取得して分析
let pdfContent = ''
if (resumeUrl) {
try {
const { data: fileData } = await supabase.storage
.from('resumes')
.download(resumeUrl)

if (fileData) {
const arrayBuffer = await fileData.arrayBuffer()
const base64 = Buffer.from(arrayBuffer).toString('base64')

// Claude で PDF を読み取り
const pdfResponse = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 1000,
messages: [{
role: 'user',
content: [
{
type: 'document',
source: {
type: 'base64',
media_type: 'application/pdf',
data: base64,
},
},
{
type: 'text',
text: 'Please extract and summarize the key information from this resume: name, skills, work experience, education, and any certifications. Be concise.',
}
],
}]
})
pdfContent = (pdfResponse.content[0] as any).text
}
} catch (err) {
console.error('PDF read error:', err)
}
}

// AI で総合分析
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
${pdfContent ? `\nPDF履歴書から抽出した情報:\n${pdfContent}` : ''}

以下の形式でJSON回答してください：
{
"suitable_jobs": ["最適な職種1", "最適な職種2", "最適な職種3"],
"visa_recommendation": "推奨ビザタイプ",
"japanese_advice": "日本語に関するアドバイス",
"overall_assessment": "総合評価（日本語で）",
"action_items": ["アクション1", "アクション2", "アクション3"],
"strengths": ["強み1", "強み2"],
"areas_to_improve": ["改善点1", "改善点2"]
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
experience: experience + (pdfContent ? '\n\nPDF Content:\n' + pdfContent : ''),
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
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666; width: 40%;">氏名</td><td style="padding: 8px; font-weight: bold;">${fullName}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">メール</td><td style="padding: 8px;">${email}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">出身国</td><td style="padding: 8px;">${country}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">希望職種</td><td style="padding: 8px;">${jobType}</td></tr>
<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">日本語レベル</td><td style="padding: 8px;">${japaneseLevel}</td></tr>
${resumeUrl ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">PDF履歴書</td><td style="padding: 8px;">✅ アップロード済み</td></tr>` : ''}
</table>
${aiResult ? `
<h3 style="color: #C42020; margin-top: 20px;">AI分析結果</h3>
<p><strong>推奨職種:</strong> ${aiResult.suitable_jobs?.join(', ')}</p>
<p><strong>推奨ビザ:</strong> ${aiResult.visa_recommendation}</p>
<p><strong>総合評価:</strong> ${aiResult.overall_assessment}</p>
<p><strong>強み:</strong> ${aiResult.strengths?.join(', ')}</p>
<p><strong>改善点:</strong> ${aiResult.areas_to_improve?.join(', ')}</p>
` : ''}
${pdfContent ? `
<h3>PDF履歴書内容:</h3>
<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap; font-size: 13px;">${pdfContent}</div>
` : ''}
</div>
`,
})

// 求職者に確認メール
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
<p>Your resume has been received and analyzed by our AI!</p>
<p>Our team will contact you within <strong>2 business days</strong>.</p>
${aiResult ? `
<div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 20px 0;">
<h3>🤖 AI Job Match Analysis</h3>
<p><strong>Best matching jobs:</strong> ${aiResult.suitable_jobs?.join(', ')}</p>
<p><strong>Recommended visa:</strong> ${aiResult.visa_recommendation}</p>
<p><strong>Your strengths:</strong> ${aiResult.strengths?.join(', ')}</p>
<p><strong>Assessment:</strong> ${aiResult.overall_assessment}</p>
</div>
` : ''}
<hr/>
<p style="color: #999; font-size: 12px;">Japan Life Guide | Licensed Recruitment Agency | japanlifeguide.app</p>
</div>
</div>
`,
})

return NextResponse.json({
success: true,
analysis: aiResult,
pdfRead: !!pdfContent,
})

} catch (error) {
console.error('Resume submit error:', error)
return NextResponse.json({ error: 'Failed to submit resume' }, { status: 500 })
}
}

