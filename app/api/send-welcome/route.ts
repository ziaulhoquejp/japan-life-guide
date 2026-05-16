import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = body.email
    const name = body.name

    const html = '<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0D0907;color:white;padding:40px;border-radius:16px;"><h1 style="color:white;text-align:center;">Welcome to Japan Life Guide! 🌸</h1><p style="color:rgba(255,255,255,0.7);font-size:16px;line-height:1.7;">Hi ' + name + '! Your journey to Japan starts now.</p><div style="background:#1A2035;border-radius:12px;padding:24px;margin:24px 0;"><h2 style="color:white;">Get Started:</h2><ul style="color:rgba(255,255,255,0.7);line-height:2;"><li>Browse 90+ language schools</li><li>Ask Sakura AI your questions</li><li>Track your visa progress</li><li>Join our community</li></ul></div><div style="text-align:center;margin-top:32px;"><a href="https://japan-life-guide-b0fwt9xhw.ziaulhoquejps-projects.vercel.app" style="background:#C42020;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;">Start Your Japan Journey</a></div></div>'

    const { data, error } = await resend.emails.send({
      from: 'Japan Life Guide <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Japan Life Guide! 🌸',
      html: html,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ data })

  } catch (err: unknown) {
    console.error('Email Error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}