import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any
      const userId = session.metadata?.userId
      const email = session.customer_email

      if (userId) {
        await supabase.from('profiles').upsert({
          id: userId,
          plan: 'pro',
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          status: 'active',
          updated_at: new Date().toISOString(),
        })
      }

      if (email) {
        try {
          await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/send-alert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              name: 'Member',
              alertType: 'pro_upgrade',
            }),
          })
        } catch {}
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as any
      const customerId = subscription.customer as string

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (profile) {
        await supabase.from('profiles').update({
          plan: 'free',
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        }).eq('id', profile.id)
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as any
      const customerId = invoice.customer as string

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (profile) {
        await supabase.from('profiles').update({
          status: 'past_due',
          updated_at: new Date().toISOString(),
        }).eq('id', profile.id)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}