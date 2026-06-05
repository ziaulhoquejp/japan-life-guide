import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, name } = body

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Japan Life Guide</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#0D0907;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.3);">
      
      <div style="background:linear-gradient(135deg,#C42020,#8B0000);padding:40px;text-align:center;">
        <div style="width:60px;height:60px;border-radius:50%;background:white;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:28px;">🌸</div>
        <h1 style="color:white;font-size:28px;font-weight:700;margin:0 0 8px;">Welcome to Japan Life Guide!</h1>
        <p style="color:rgba(255,255,255,0.8);font-size:16px;margin:0;">Your Japan journey starts here</p>
      </div>

      <div style="padding:40px;">
        <p style="color:rgba(255,255,255,0.8);font-size:16px;line-height:1.7;margin-bottom:24px;">
          Konnichiwa ${name || 'Friend'}! 🌸<br><br>
          Welcome to Japan Life Guide! We are so excited to have you join our community of students from Bangladesh and Nepal who are pursuing their dreams in Japan.
        </p>

        <div style="background:#1A2035;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid rgba(255,255,255,0.1);">
          <h2 style="color:white;font-size:18px;font-weight:700;margin:0 0 16px;">Get Started Today</h2>
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${[
              {icon:'🏫',title:'Browse 500+ Schools',desc:'Find your perfect Japanese language school'},
              {icon:'🛂',title:'Check Visa Requirements',desc:'Use our visa calculator to check eligibility'},
              {icon:'🌸',title:'Ask Sakura AI',desc:'Get instant answers in Bengali, Nepali & English'},
              {icon:'💬',title:'Join the Community',desc:'Connect with other BD & NP students in Japan'},
            ].map(item => `
              <div style="display:flex;gap:12px;align-items:center;padding:12px;background:rgba(255,255,255,0.05);border-radius:8px;">
                <span style="font-size:24px;">${item.icon}</span>
                <div>
                  <div style="color:white;font-size:14px;font-weight:600;">${item.title}</div>
                  <div style="color:rgba(255,255,255,0.5);font-size:12px;">${item.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="text-align:center;margin-bottom:32px;">
          <a href="https://japanlifeguide.app" style="display:inline-block;background:#C42020;color:white;text-decoration:none;padding:16px 40px;border-radius:10px;font-size:16px;font-weight:700;box-shadow:0 4px 15px rgba(196,32,32,0.4);">
            Start Your Japan Journey 🌸
          </a>
        </div>

        <div style="background:#1A2035;border-radius:12px;padding:20px;margin-bottom:24px;border-left:4px solid #C42020;">
          <h3 style="color:white;font-size:15px;font-weight:700;margin:0 0 8px;">Quick Tips for New Members</h3>
          <ul style="color:rgba(255,255,255,0.6);font-size:13px;line-height:1.8;margin:0;padding-left:16px;">
            <li>Use the Visa Calculator to check which visa is right for you</li>
            <li>Save favorite schools to compare them later</li>
            <li>Ask Sakura AI any question - available 24/7!</li>
            <li>Join the community to connect with other students</li>
            <li>Check our scholarship listings for funding opportunities</li>
          </ul>
        </div>

        <p style="color:rgba(255,255,255,0.5);font-size:13px;line-height:1.7;margin:0;">
          If you have any questions, our Sakura AI is available 24/7 at 
          <a href="https://japanlifeguide.app/chat" style="color:#C42020;">japanlifeguide.app/chat</a>
          or contact us at 
          <a href="mailto:hello@japanlifeguide.app" style="color:#C42020;">hello@japanlifeguide.app</a>
        </p>
      </div>

      <div style="background:#1A2035;padding:24px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
        <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0 0 8px;">
          Japan Life Guide · japanlifeguide.app
        </p>
        <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">
          You received this email because you registered at Japan Life Guide.
        </p>
        <div style="margin-top:12px;display:flex;gap:16px;justify-content:center;">
          <a href="https://japanlifeguide.app/privacy" style="color:rgba(255,255,255,0.3);font-size:11px;">Privacy Policy</a>
          <a href="https://japanlifeguide.app/terms" style="color:rgba(255,255,255,0.3);font-size:11px;">Terms of Service</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`

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
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}