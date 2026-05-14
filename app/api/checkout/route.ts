import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
try {
console.log("SECRET:", process.env.STRIPE_SECRET_KEY);
console.log("PRICE:", process.env.STRIPE_PRO_PRICE_ID);

const session = await stripe.checkout.sessions.create({
payment_method_types: ["card"],
mode: "subscription",
line_items: [
{
price: process.env.STRIPE_PRO_PRICE_ID!,
quantity: 1,
},
],
success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
});

console.log("SESSION:", session);

return Response.json({
url: session.url,
});

} catch (error: any) {
console.log("STRIPE ERROR:", error);

return Response.json({
error: error.message,
});
}
}