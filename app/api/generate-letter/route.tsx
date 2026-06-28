import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
try {
const { letterType, form, language } = await req.json()

const typeMap: any = {
school: '日本語学校入学申請用志望動機書',
ssw: '特定技能ビザ申請用志望動機書',
engineer: 'エンジニア職応募用志望動機書',
university: '大学・大学院入学申請用志望動機書',
}

const prompt = `あなたはプロの日本語ライターです。以下の情報を基に、${typeMap[letterType] || '志望動機書'}を作成してください。

申請者情報：
- 氏名: ${form.fullName}
- 出身国: ${form.country}
- 年齢: ${form.age}
- 学歴: ${form.education}
- 職歴: ${form.workExperience}
- 日本語レベル: ${form.japaneseLevel}
- 志望先: ${form.targetSchoolOrCompany}
- 強み: ${form.strengths}
- 志望動機: ${form.motivation}
- 将来の目標: ${form.futureGoals}

以下の形式でJSONで回答してください：
{
${language === 'both' || language === 'japanese' ? '"japanese": "日本語版の志望動機書（800-1200字）",' : ''}
${language === 'both' || language === 'english' ? '"english": "English version of motivation letter (400-600 words)",' : ''}
"tips": "3-4 specific tips for this application"
}

日本語版は：
- 丁寧な敬語を使用
- 具体的なエピソードを含める
- 日本への強い思いを表現
- 将来のビジョンを明確に

JSONのみ返答してください。マークダウン不要。`

const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 2000,
messages: [{ role: 'user', content: prompt }]
})

const text = (response.content[0] as any).text
let result
try {
const jsonMatch = text.match(/\{[\s\S]*\}/)
result = jsonMatch ? JSON.parse(jsonMatch[0]) : { japanese: text, tips: '' }
} catch {
result = { japanese: text, english: text, tips: '' }
}

return NextResponse.json(result)
} catch (error) {
console.error('Generate letter error:', error)
return NextResponse.json({ error: 'Failed to generate letter' }, { status: 500 })
}
}

