import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { emails, subject, content, type } = body

    if (!emails || !subject || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0D0907;color:white;padding:0;border-radius:16px;overflow:hidden;">
        <div style="background:#C42020;padding:32px;text-align:center;">
          <div style="width:50px;height:50px;border-radius:50%;background:white;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
            <span style="color:#C42020;font-size:24px;">🌸</span>
          </div>
          <h1 style="color:white;font-size:24px;margin:0;">Japan Life Guide</h1>
          <p style="color:rgba(255,255,255,0.8);font-size:14px;margin-top:8px;">Your Japan Journey Companion</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:white;font-size:20px;margin-bottom:16px;">${subject}</h2>
          <div style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;">
            ${content}
          </div>
          <div style="margin-top:32px;text-align:center;">
            <a href="https://japanlifeguide.app" style="background:#C42020;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">
              Visit Japan Life Guide
            </a>
          </div>
        </div>
        <div style="background:#1A2035;padding:20px;text-align:center;">
          <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0;">
            Japan Life Guide · japanlifeguide.app
          </p>
          <p style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:8px;">
            You received this email because you registered at Japan Life Guide.
          </p>
        </div>
      </div>
    `

    const results = await Promise.all(
      emails.map((email: string) =>
        resend.emails.send({
          from: 'Japan Life Guide <onboarding@resend.dev>',
          to: email,
          subject: subject,
          html: html,
        })
      )
    )

    return NextResponse.json({ success: true, sent: results.length })

  } catch (err: unknown) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}