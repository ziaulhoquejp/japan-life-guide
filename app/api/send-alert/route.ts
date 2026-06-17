import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = body.email
    const name = body.name
    const alertType = body.alertType || 'general'

    let subject = 'Japan Life Guide Alert'
    let content = ''

    if (alertType === 'visa_deadline') {
      subject = 'Visa Application Deadline Reminder'
      content = 'Your visa application deadline is approaching. Please make sure all documents are ready.'
    } else if (alertType === 'document_missing') {
      subject = 'Missing Document Alert'
      content = 'You have missing documents for your school application. Please upload them as soon as possible.'
    } else if (alertType === 'school_accepted') {
      subject = 'Congratulations! School Application Accepted'
      content = 'Your school application has been accepted! Please check your dashboard for next steps.'
    } else if (alertType === 'weekly_digest') {
      subject = 'Your Weekly Japan Life Guide Update'
      content = 'Here is your weekly update with new schools, visa tips, and community highlights.'
    }

    const html = '<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0D0907;color:white;padding:40px;border-radius:16px;"><div style="text-align:center;margin-bottom:32px;"><div style="width:60px;height:60px;border-radius:50%;background:#C42020;margin:0 auto 16px;"></div><h1 style="color:white;font-size:24px;margin:0;">' + subject + '</h1></div><p style="color:rgba(255,255,255,0.7);font-size:16px;line-height:1.7;">Hi ' + name + '!</p><p style="color:rgba(255,255,255,0.7);font-size:16px;line-height:1.7;">' + content + '</p><div style="text-align:center;margin-top:32px;"><a href="https://japanlifeguide.app/dashboard" style="background:#C42020;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;">Go to Dashboard</a></div><p style="color:rgba(255,255,255,0.3);font-size:12px;text-align:center;margin-top:32px;">Japan Life Guide - japanlifeguide.app</p></div>'

    const { data, error } = await resend.emails.send({
      from: 'Japan Life Guide <noreply@japanlifeguide.app>',
      to: email,
      subject: subject,
      html: html,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ data })

  } catch (err: unknown) {
    console.error('Email Error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}