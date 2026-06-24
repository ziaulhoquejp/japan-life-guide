import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
apiVersion: '2026-05-27.dahlia',
})

const LIFETIME_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID

export async function POST(req: Request) {
try {
const body = await req.json()
const { priceId, userId, email } = body

if (!priceId) {
return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
}

const isLifetime = priceId === LIFETIME_PRICE_ID

const session = await stripe.checkout.sessions.create({
payment_method_types: ['card'],
mode: isLifetime ? 'payment' : 'subscription',
line_items: [
{
price: priceId,
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