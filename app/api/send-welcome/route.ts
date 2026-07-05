import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
try {
const body = await req.json()
const { email, name, country, referralCode } = body

const countryGreeting = country === 'Bangladesh'
? 'আপনাকে স্বাগতম! 🇧🇩'
: country === 'Nepal'
? 'तपाईंलाई स्वागत छ! 🇳🇵'
: 'Welcome! 🌸'

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

<!-- Header -->
<div style="background:linear-gradient(135deg,#C42020,#8B0000);padding:40px;text-align:center;">
<div style="font-size:48px;margin-bottom:12px;">🌸</div>
<h1 style="color:white;font-size:26px;font-weight:700;margin:0 0 8px;">Welcome to Japan Life Guide!</h1>
<p style="color:rgba(255,255,255,0.9);font-size:18px;margin:0 0 4px;">${countryGreeting}</p>
<p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0;">Your Japan journey starts here 🗾</p>
</div>

<!-- Greeting -->
<div style="padding:32px 40px 0;">
<p style="color:rgba(255,255,255,0.8);font-size:16px;line-height:1.8;margin-bottom:24px;">
こんにちは ${name || 'Friend'}! 🌸<br><br>
Welcome to Japan Life Guide! You've joined <strong style="color:white;">thousands of students</strong> from Bangladesh and Nepal who are pursuing their dreams in Japan.
${country === 'Bangladesh' ? '<br><br>আমরা আপনাকে জাপানে পড়াশোনা ও কাজের স্বপ্ন পূরণ করতে সাহায্য করব!' : ''}
${country === 'Nepal' ? '<br><br>हामी तपाईंलाई जापानमा पढ्ने र काम गर्ने सपना पूरा गर्न मद्दत गर्नेछौं!' : ''}
</p>
</div>

<!-- Features Grid -->
<div style="padding:0 40px 24px;">
<h2 style="color:white;font-size:18px;font-weight:700;margin:0 0 16px;">🚀 What you can do now:</h2>
<div style="display:grid;gap:10px;">
${[
{icon:'🏫', title:'Browse 724+ Verified Schools', desc:'Find your perfect Japanese language school with filters, reviews and direct application', url:'https://japanlifeguide.app/schools'},
{icon:'🌸', title:'Chat with Sakura AI', desc:'Ask anything in Bengali, Nepali, or English - available 24/7!', url:'https://japanlifeguide.app/chat'},
{icon:'🛂', title:'Check Visa Eligibility', desc:'Use our visa calculator to find the right visa for your situation', url:'https://japanlifeguide.app/visa-calculator'},
{icon:'💼', title:'Browse Jobs in Japan', desc:'Find SSW, Engineer, and Part-time jobs with our licensed recruitment service', url:'https://japanlifeguide.app/jobs'},
{icon:'🎤', title:'Practice Job Interviews', desc:'AI-powered interview practice with feedback in Bengali and Nepali', url:'https://japanlifeguide.app/interview-practice'},
{icon:'🏭', title:'SSW Skills Test Practice', desc:'Practice for Specified Skilled Worker exam for all 13 industries', url:'https://japanlifeguide.app/ssw-test'},
{icon:'📝', title:'Generate Motivation Letter', desc:'AI writes your Japanese motivation letter for school or job applications', url:'https://japanlifeguide.app/motivation-letter'},
{icon:'✅', title:'Visa Document Checker', desc:'Make sure all your visa documents are ready with AI assistance', url:'https://japanlifeguide.app/visa-check'},
].map(item => `
<a href="${item.url}" style="display:flex;gap:14px;align-items:flex-start;padding:14px;background:#1A2035;border-radius:10px;text-decoration:none;border:1px solid rgba(255,255,255,0.08);">
<span style="font-size:24px;flex-shrink:0;">${item.icon}</span>
<div>
<div style="color:white;font-size:13px;font-weight:700;margin-bottom:3px;">${item.title}</div>
<div style="color:rgba(255,255,255,0.4);font-size:12px;line-height:1.5;">${item.desc}</div>
</div>
</a>
`).join('')}
</div>
</div>

<!-- CTA Button -->
<div style="padding:0 40px 32px;text-align:center;">
<a href="https://japanlifeguide.app" style="display:inline-block;background:#C42020;color:white;text-decoration:none;padding:16px 48px;border-radius:10px;font-size:16px;font-weight:700;box-shadow:0 4px 15px rgba(196,32,32,0.4);">
Start Your Japan Journey 🌸
</a>
</div>

<!-- Mobile App -->
<div style="margin:0 40px 24px;background:#1A2035;border-radius:12px;padding:20px;border:1px solid rgba(46,200,122,0.2);text-align:center;">
<p style="color:#2EC87A;font-size:14px;font-weight:700;margin:0 0 8px;">📱 Download Our Mobile App!</p>
<p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 12px;">Available on Android. iOS coming soon!</p>
<a href="https://play.google.com/store" style="display:inline-block;background:#2EC87A;color:#0D0907;text-decoration:none;padding:10px 24px;border-radius:8px;font-size:13px;font-weight:700;">
📱 Download on Google Play
</a>
</div>

<!-- Referral Program -->
${referralCode ? `
<div style="margin:0 40px 24px;background:linear-gradient(135deg,rgba(240,168,48,0.1),rgba(240,168,48,0.05));border-radius:12px;padding:20px;border:1px solid rgba(240,168,48,0.3);">
<p style="color:#F0A830;font-size:14px;font-weight:700;margin:0 0 8px;">🎁 Share & Earn Rewards!</p>
<p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 12px;">Invite friends and earn free Pro access! 5 referrals = 1 month Pro FREE!</p>
<p style="color:white;font-size:13px;font-weight:700;margin:0 0 8px;">Your referral link:</p>
<a href="https://japanlifeguide.app/register?ref=${referralCode}" style="color:#F0A830;font-size:12px;word-break:break-all;">
https://japanlifeguide.app/register?ref=${referralCode}
</a>
</div>
` : ''}

<!-- Tips -->
<div style="margin:0 40px 32px;background:#1A2035;border-radius:12px;padding:20px;border-left:4px solid #C42020;">
<h3 style="color:white;font-size:15px;font-weight:700;margin:0 0 12px;">💡 Quick Tips for New Members</h3>
<ul style="color:rgba(255,255,255,0.6);font-size:13px;line-height:2;margin:0;padding-left:16px;">
<li>Use the <strong style="color:white;">Visa Calculator</strong> to check which visa is right for you</li>
<li>Compare up to 4 schools side-by-side with our <strong style="color:white;">Compare Schools</strong> tool</li>
<li>Ask <strong style="color:white;">Sakura AI</strong> any question in Bengali, Nepali, or English</li>
<li>Track your visa documents with our <strong style="color:white;">Document Tracker</strong></li>
<li>Practice for SSW exam with <strong style="color:white;">AI-generated questions</strong></li>
<li>Submit your resume for <strong style="color:white;">free job matching</strong> service</li>
</ul>
</div>

<!-- Contact -->
<div style="padding:0 40px 32px;">
<p style="color:rgba(255,255,255,0.5);font-size:13px;line-height:1.7;margin:0;">
Questions? Chat with Sakura AI 24/7 at
<a href="https://japanlifeguide.app/chat" style="color:#C42020;">japanlifeguide.app/chat</a>
or email us at
<a href="mailto:hello@japanlifeguide.app" style="color:#C42020;">hello@japanlifeguide.app</a>
</p>
</div>

<!-- Footer -->
<div style="background:#1A2035;padding:24px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
<p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0 0 4px;">Japan Life Guide · japanlifeguide.app</p>
<p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0 0 12px;">有料職業紹介許可 · 登録支援機関許可取得済み</p>
<div style="display:flex;gap:16px;justify-content:center;">
<a href="https://japanlifeguide.app/privacy" style="color:rgba(255,255,255,0.3);font-size:11px;text-decoration:none;">Privacy Policy</a>
<a href="https://japanlifeguide.app/terms" style="color:rgba(255,255,255,0.3);font-size:11px;text-decoration:none;">Terms of Service</a>
<a href="https://japanlifeguide.app/referral" style="color:rgba(255,255,255,0.3);font-size:11px;text-decoration:none;">Referral Program</a>
</div>
</div>
</div>
</div>
</body>
</html>`

const { data, error } = await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: email,
subject: `Welcome to Japan Life Guide! ${countryGreeting}`,
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

