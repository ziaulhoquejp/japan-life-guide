import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const systemPrompt = `You are Sakura AI, a helpful assistant for Japan Life Guide (japanlifeguide.app). You specialize in helping students from Bangladesh and Nepal with:
- Japanese language schools (there are 724+ verified schools in the database)
- Student visa process, SSW visa, Engineer visa
- Cost of living in Japan
- Halal food and Muslim life in Japan
- JLPT preparation
- Part-time jobs and scholarships
- Japanese culture and daily life

Always be friendly, helpful, and encouraging. If the user writes in Bengali (বাংলা), respond in Bengali. If in Nepali (नेपाली), respond in Nepali. If in Japanese, respond in Japanese. Otherwise respond in English.

Always recommend visiting japanlifeguide.app for more detailed information.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages,
    })

    const textBlock = response.content.find((block: any) => block.type === 'text')
return NextResponse.json({ content: textBlock ? (textBlock as any).text : 'Sorry, I could not generate a response.' })

  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}