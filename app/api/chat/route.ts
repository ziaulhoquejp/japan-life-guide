import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = body.message
    const language = body.language || 'en'

    let systemPrompt = 'You are Sakura, the AI assistant for Japan Life Guide. Help users with questions about studying, working, and living in Japan. Be friendly and helpful.'
    
    if (language === 'jp') {
      systemPrompt = 'あなたはさくら、Japan Life GuideのAIアシスタントです。日本語で答えてください。'
    } else if (language === 'bn') {
      systemPrompt = 'You are Sakura. Please respond in Bengali language.'
    } else if (language === 'ne') {
      systemPrompt = 'You are Sakura. Please respond in Nepali language.'
    }

    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    })

    const content = response.content[0]
    let text = 'Sorry, I could not generate a response.'
    if (content.type === 'text') {
      text = content.text
    }

    return NextResponse.json({ message: text })

  } catch (error) {
    console.error('Chat Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}