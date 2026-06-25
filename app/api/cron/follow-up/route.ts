import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
try {
// Vercel Cron 認証チェック
const authHeader = req.headers.get('authorization')
if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

const now = new Date()
const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

// 3日前に登録したユーザーを取得
const { data: newUsers } = await supabase
.from('profiles')
.select('*')
.gte('created_at', threeDaysAgo.toISOString())
.lte('created_at', new Date(threeDaysAgo.getTime() + 24 * 60 * 60 * 1000).toISOString())

// 7日前に登録してまだ Pro でないユーザーを取得
const { data: freeUsers } = await supabase
.from('profiles')
.select('*')
.gte('created_at', sevenDaysAgo.toISOString())
.lte('created_at', new Date(sevenDaysAgo.getTime() + 24 * 60 * 60 * 1000).toISOString())
.eq('plan', 'free')

let emailsSent = 0

// 3日後フォローアップ
for (const user of newUsers || []) {
if (!user.email) continue

// アプリケーションがあるか確認
const { data: apps } = await supabase
.from('applications')
.select('id')
.eq('user_id', user.id)

const hasApplied = apps && apps.length > 0

await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: user.email,
subject: hasApplied ? 'Your Japan journey is going great! 🌸' : 'Have you found your perfect school yet? 🏫',
html: hasApplied ? `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
</div>
<div style="padding: 30px;">
<h2>Great progress, ${user.full_name || 'Student'}! 🎉</h2>
<p>You've already submitted a school application. Here's what to do next:</p>
<ul>
<li>📋 Check your application status</li>
<li>🛂 Review visa requirements</li>
<li>💬 Ask Sakura AI any questions</li>
</ul>
<a href="https://japanlifeguide.app/applications" style="background: #C42020; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 16px;">
View My Applications
</a>
</div>
</div>
` : `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
</div>
<div style="padding: 30px;">
<h2>Hi ${user.full_name || 'Student'}! 👋</h2>
<p>You joined Japan Life Guide 3 days ago. Have you found your perfect school yet?</p>
<p>We have <strong>724+ verified Japanese language schools</strong> waiting for you!</p>
<ul>
<li>🏫 Browse schools by city and budget</li>
<li>🧮 Use our Cost Calculator</li>
<li>🌸 Ask Sakura AI for personalized advice</li>
</ul>
<a href="https://japanlifeguide.app/schools" style="background: #C42020; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 16px;">
Browse Schools Now
</a>
</div>
</div>
`,
})
emailsSent++
}

// 7日後 Pro アップグレード促進
for (const user of freeUsers || []) {
if (!user.email) continue

await resend.emails.send({
from: 'Japan Life Guide <noreply@japanlifeguide.app>',
to: user.email,
subject: 'Unlock unlimited access to Japan Life Guide 💎',
html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
<div style="background: #C42020; padding: 20px; text-align: center;">
<h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
</div>
<div style="padding: 30px;">
<h2>Hi ${user.full_name || 'Student'}! 🌸</h2>
<p>You've been using Japan Life Guide for a week. Ready to take your Japan journey to the next level?</p>
<h3>With Pro you get:</h3>
<ul>
<li>🌸 Unlimited Sakura AI chat</li>
<li>📝 Unlimited school applications</li>
<li>❤️ Unlimited favorite schools</li>
<li>🔄 Compare up to 4 schools</li>
</ul>
<p><strong>Only ¥980/month</strong> - less than a cup of coffee per day!</p>
<a href="https://japanlifeguide.app/pricing" style="background: #C42020; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 16px;">
Upgrade to Pro 💎
</a>
</div>
</div>
`,
})
emailsSent++
}

return NextResponse.json({
success: true,
emailsSent,
newUsers: newUsers?.length || 0,
freeUsers: freeUsers?.length || 0,
})

} catch (error) {
console.error('Cron error:', error)
return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
}
}