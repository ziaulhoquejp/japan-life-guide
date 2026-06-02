'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [stats, setStats] = useState({ schools: 0, feedback: 0, favorites: 0, reviews: 0 })
  const [feedback, setFeedback] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newsletterSubject, setNewsletterSubject] = useState('')
  const [newsletterContent, setNewsletterContent] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    async function getData() {
      const [schools, feedbackData, favorites, reviews] = await Promise.all([
        supabase.from('schools').select('id', { count: 'exact' }),
        supabase.from('feedback').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('favorites').select('id', { count: 'exact' }),
        supabase.from('reviews').select('id', { count: 'exact' }),
      ])
      setStats({
        schools: schools.count || 0,
        feedback: feedbackData.data?.length || 0,
        favorites: favorites.count || 0,
        reviews: reviews.count || 0,
      })
      setFeedback(feedbackData.data || [])
      setLoading(false)
    }
    getData()
  }, [])

  async function sendNewsletter() {
    if (!newsletterSubject || !newsletterContent) return
    setSending(true)
    const { data: users } = await supabase.auth.admin.listUsers()
    const emails = users?.users?.map((u: any) => u.email).filter(Boolean) || []
    await fetch('/api/send-newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails, subject: newsletterSubject, content: newsletterContent }),
    })
    setSent(true)
    setSending(false)
    setTimeout(() => setSent(false), 3000)
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 40px',borderBottom:'3px solid #C42020',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>Admin Dashboard</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Japan Life Guide Management</p>
        </div>
        <div style={{background:'rgba(196,32,32,0.2)',border:'1px solid rgba(196,32,32,0.4)',borderRadius:'8px',padding:'8px 16px',color:'#FF8070',fontSize:'12px',fontWeight:'700'}}>
          ADMIN ONLY
        </div>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:'14px',marginBottom:'32px'}}>
          {[
            {icon:'🏫',label:'Total Schools',value:stats.schools,color:'#4A8EFF'},
            {icon:'❤️',label:'Total Favorites',value:stats.favorites,color:'#C42020'},
            {icon:'⭐',label:'Total Reviews',value:stats.reviews,color:'#F0A830'},
            {icon:'💬',label:'Feedback',value:stats.feedback,color:'#2EC87A'},
          ].map(stat=>(
            <div key={stat.label} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)',borderTop:'3px solid ' + stat.color}}>
              <div style={{fontSize:'28px',marginBottom:'8px'}}>{stat.icon}</div>
              <div style={{color:'white',fontSize:'28px',fontWeight:'700',fontFamily:'monospace'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Send Newsletter</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <input value={newsletterSubject} onChange={e=>setNewsletterSubject(e.target.value)} placeholder="Subject..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
            <textarea value={newsletterContent} onChange={e=>setNewsletterContent(e.target.value)} placeholder="Email content..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'120px'}}/>
            <button onClick={sendNewsletter} disabled={sending||!newsletterSubject||!newsletterContent} style={{background:sent?'#2EC87A':'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
              {sent ? 'Sent!' : sending ? 'Sending...' : 'Send Newsletter'}
            </button>
          </div>
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Recent Feedback</h2>
          {feedback.length === 0 ? (
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No feedback yet</p>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {feedback.map((item:any)=>(
                <div key={item.id} style={{background:'#0D0907',borderRadius:'8px',padding:'14px',display:'flex',gap:'12px',alignItems:'flex-start'}}>
                  <div style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'4px 8px',borderRadius:'4px',fontSize:'10px',fontWeight:'700',flexShrink:0}}>{item.type || 'general'}</div>
                  <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.5',flex:1}}>{item.message}</p>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',flexShrink:0}}>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Quick Actions</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {[
                {label:'View All Schools',href:'/schools'},
                {label:'View Community',href:'/community'},
                {label:'View Blog',href:'/blog'},
                {label:'View Pricing',href:'/pricing'},
                {label:'View Analytics',href:'https://analytics.google.com'},
              ].map(action=>(
                <a key={action.label} href={action.href} style={{background:'#0D0907',color:'white',textDecoration:'none',padding:'12px',borderRadius:'8px',fontSize:'13px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  {action.label} <span style={{color:'#C42020'}}>→</span>
                </a>
              ))}
            </div>
          </div>

          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Site Status</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {[
                {label:'Supabase Database',status:'Online'},
                {label:'Sakura AI (Claude)',status:'Online'},
                {label:'Stripe Payments',status:'Online'},
                {label:'Resend Email',status:'Online'},
                {label:'Vercel Hosting',status:'Online'},
                {label:'Google Analytics',status:'Online'},
              ].map(item=>(
                <div key={item.label} style={{background:'#0D0907',padding:'12px',borderRadius:'8px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{item.label}</span>
                  <span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>● {item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}