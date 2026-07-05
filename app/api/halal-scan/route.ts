import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
try {
const { image } = await req.json()

const response = await anthropic.messages.create({
model: 'claude-sonnet-4-6',
max_tokens: 1000,
messages: [{
role: 'user',
content: [
{
type: 'image',
source: {
type: 'base64',
media_type: 'image/jpeg',
data: image,
},
},
{
type: 'text',
text: `You are a Halal food expert. Analyze this image of a food product's ingredients list and determine if it is Halal, Haram, or Doubtful according to Islamic dietary laws.

Please analyze the ingredients and respond in JSON format:
{
"status": "halal" | "haram" | "doubtful",
"explanation": "Brief explanation of the verdict in English (2-3 sentences)",
"ingredients": ["list", "of", "all", "detected", "ingredients"],
"haram_found": ["list of haram ingredients found"],
"doubtful_found": ["list of doubtful ingredients found"],
"advice": "Practical advice for the user"
}

Haram ingredients include: pork, pig, lard, gelatin (from pork), alcohol, wine, beer, sake, mirin (みりん), 豚, 豚肉, ラード, アルコール, 酒, ワイン, ビール, 日本酒
Doubtful ingredients include: emulsifier (乳化剤), natural flavoring (香料), glycerin (グリセリン), carmine (カルミン), rennet, L-cysteine

If the image doesn't show ingredients clearly, explain what you can see and give your best assessment.

Respond with JSON only, no markdown.`
}
],
}]
})

const text = (response.content[0] as any).text
let result
try {
const jsonMatch = text.match(/\{[\s\S]*\}/)
result = jsonMatch ? JSON.parse(jsonMatch[0]) : {
status: 'doubtful',
explanation: text,
ingredients: [],
haram_found: [],
doubtful_found: [],
advice: 'Could not fully analyze. Please consult with a local Islamic authority.'
}
} catch {
result = {
status: 'doubtful',
explanation: 'Could not analyze ingredients clearly. Please try a clearer photo.',
ingredients: [],
haram_found: [],
doubtful_found: [],
advice: 'Take a clear, well-lit photo of the ingredients list.'
}
}

return NextResponse.json(result)
} catch (error) {
console.error('Halal scan error:', error)
return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 })
}
}

