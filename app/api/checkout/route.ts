import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, email } = body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRO_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: process.env.NEXT_PUBLIC_APP_URL + '/dashboard?success=true',
      cancel_url: process.env.NEXT_PUBLIC_APP_URL + '/pricing?canceled=true',
      metadata: {
        userId: userId || '',
        email: email || '',
      },
      customer_email: email,
    })

    return NextResponse.json({ url: session.url })

  } catch (err: unknown) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}