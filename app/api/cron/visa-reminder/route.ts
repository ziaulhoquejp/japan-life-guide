import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const today = new Date()
    const in30Days = new Date(today)
    in30Days.setDate(today.getDate() + 30)
    const in7Days = new Date(today)
    in7Days.setDate(today.getDate() + 7)

    // 30日前のリマインダー
    const { data: docs30 } = await supabase
      .from('visa_tracker')
      .select('*, profiles(email, full_name)')
      .eq('notified_30days', false)
      .lte('expiry_date', in30Days.toISOString().split('T')[0])
      .gte('expiry_date', today.toISOString().split('T')[0])

    // 7日前のリマインダー
    const { data: docs7 } = await supabase
      .from('visa_tracker')
      .select('*, profiles(email, full_name)')
      .eq('notified_7days', false)
      .lte('expiry_date', in7Days.toISOString().split('T')[0])
      .gte('expiry_date', today.toISOString().split('T')[0])

    let sent30 = 0
    let sent7 = 0

    // 30日前メール送信
    for (const doc of docs30 || []) {
      if (!doc.profiles?.email) continue
      try {
        await resend.emails.send({
          from: 'Japan Life Guide <noreply@japanlifeguide.app>',
          to: doc.profiles.email,
          subject: `⚠️ Document Expiry Reminder: ${doc.document_type} expires in 30 days`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #C42020; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
              </div>
              <div style="padding: 30px; background: #f9f9f9;">
                <h2>⚠️ Document Expiry Reminder</h2>
                <p>Hi ${doc.profiles.full_name || 'Friend'},</p>
                <p>Your <strong>${doc.document_type}</strong> will expire in <strong>30 days</strong> on <strong>${new Date(doc.expiry_date).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'})}</strong>.</p>
                <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 16px; margin: 20px 0;">
                  <p style="margin: 0; color: #856404;"><strong>⚠️ Action Required:</strong> Please renew your ${doc.document_type} as soon as possible to avoid any issues with your status in Japan.</p>
                </div>
                ${doc.notes ? `<p><strong>Notes:</strong> ${doc.notes}</p>` : ''}
                <a href="https://japanlifeguide.app/visa-tracker" style="display: inline-block; background: #C42020; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; margin: 16px 0;">
                  View Document Tracker
                </a>
                <p>If you need help with renewal, our <a href="https://japanlifeguide.app/visa-consult" style="color: #C42020;">free visa consultation service</a> is available!</p>
                <hr/>
                <p style="color: #999; font-size: 12px;">Japan Life Guide | japanlifeguide.app</p>
              </div>
            </div>
          `,
        })
        await supabase.from('visa_tracker').update({ notified_30days: true }).eq('id', doc.id)
        sent30++
      } catch (err) {
        console.error('30day reminder error:', err)
      }
    }

    // 7日前メール送信
    for (const doc of docs7 || []) {
      if (!doc.profiles?.email) continue
      try {
        await resend.emails.send({
          from: 'Japan Life Guide <noreply@japanlifeguide.app>',
          to: doc.profiles.email,
          subject: `🚨 URGENT: ${doc.document_type} expires in 7 days!`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #8B0000; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">🌸 Japan Life Guide</h1>
              </div>
              <div style="padding: 30px; background: #f9f9f9;">
                <h2 style="color: #8B0000;">🚨 URGENT: Document Expiring Soon!</h2>
                <p>Hi ${doc.profiles.full_name || 'Friend'},</p>
                <p>Your <strong>${doc.document_type}</strong> will expire in only <strong>7 days</strong> on <strong>${new Date(doc.expiry_date).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'})}</strong>.</p>
                <div style="background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; padding: 16px; margin: 20px 0;">
                  <p style="margin: 0; color: #721c24;"><strong>🚨 URGENT ACTION REQUIRED:</strong> You must renew your ${doc.document_type} immediately. Overstaying your visa status in Japan is illegal and can result in deportation.</p>
                </div>
                ${doc.notes ? `<p><strong>Notes:</strong> ${doc.notes}</p>` : ''}
                <a href="https://japanlifeguide.app/visa-consult" style="display: inline-block; background: #8B0000; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; margin: 16px 0;">
                  Get Emergency Visa Help Now
                </a>
                <a href="https://japanlifeguide.app/visa-tracker" style="display: inline-block; background: #C42020; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; margin: 8px;">
                  View Document Tracker
                </a>
                <hr/>
                <p style="color: #999; font-size: 12px;">Japan Life Guide | japanlifeguide.app</p>
              </div>
            </div>
          `,
        })
        await supabase.from('visa_tracker').update({ notified_7days: true }).eq('id', doc.id)
        sent7++
      } catch (err) {
        console.error('7day reminder error:', err)
      }
    }

    return NextResponse.json({
      success: true,
      sent30DayReminders: sent30,
      sent7DayReminders: sent7,
    })

  } catch (error) {
    console.error('Visa reminder cron error:', error)
    return NextResponse.json({ error: 'Failed to send reminders' }, { status: 500 })
  }
}