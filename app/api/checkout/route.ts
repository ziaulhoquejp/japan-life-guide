import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const priceId = body.priceId

    console.log('Price ID:', priceId)

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/dashboard?success=true',
      cancel_url: 'http://localhost:3000/pricing',
    })

    return NextResponse.json({ url: session.url })

  } catch (err: unknown) {
    console.error('Stripe Error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}