import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const subscription = body.subscription
    const userId = body.userId

    if (!subscription) {
      return NextResponse.json({ error: 'No subscription provided' }, { status: 400 })
    }

    const { error } = await supabase.from('push_subscriptions').insert({
      user_id: userId || null,
      subscription: JSON.stringify(subscription),
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error('Supabase error:', error)
    }

    return NextResponse.json({ success: true })

  } catch (err: unknown) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}