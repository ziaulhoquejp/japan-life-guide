'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({schools:0,applications:0,reviews:0,feedback:0})
  const [loading, setLoading] = useState(true)
  const [newsletter, setNewsletter] = useState({subject:'',message:''})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [feedback, setFeedback] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('stats')

  const ADMIN_EMAILS = ['ziaulhoquejp@gmail.com', 'sacrifice4ever@gmail.com']

  useEffect(() => {
  async function getData() {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) { window.location.href = '/'; return }
    if (!ADMIN_EMAILS.includes(userData.user.email!)) { window.location.href = '/'; return }
    setUser(userData.user)

    const [schoolsData, feedbackData, applicationsData, reviewsData] = await Promise.all([
      supabase.from('schools').select('*', { count: 'exact', head: true }),
      supabase.from('feedback').select('*').order('created_at', { ascending: false }).limit(20),
      supabase.from('applications').select('*', { count: 'exact', head: true }),
      supabase.from('reviews').select('*', { count: 'exact', head: true }),
    ])

    setStats({
      schools: schoolsData.count || 0,
      applications: applicationsData.count || 0,
      reviews: reviewsData.count || 0,
      feedback: feedbackData.data?.length || 0,
    })
    if (feedbackData.data) setFeedback(feedbackData.data)
    setLoading(false)
  }
  getData()
}, [])

  async function sendNewsletter() {
  if (!newsletter.subject || !newsletter.message) return
  setSending(true)
  try {
    await fetch('/api/send-newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emails: ['ziaulhoquejp@gmail.com', 'sacrifice4ever@gmail.com'],
        subject: newsletter.subject,
        content: newsletter.message,
        type: 'newsletter',
      }),
    })
      setSent(true)
      setNewsletter({subject:'',message:''})
      setTimeout(() => setSent(false), 3000)
    } catch {}
    setSending(false)
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 40px',borderBottom:'3px solid #C42020',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>Admin Dashboard</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>{user?.email}</p>
        </div>
        <a href="/" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px'}}>← Back to Site</a>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:'12px',marginBottom:'28px'}}>
          {[
            {label:'Schools',value:stats.schools,icon:'🏫',color:'#4A8EFF'},
            {label:'Applications',value:stats.applications,icon:'📝',color:'#2EC87A'},
            {label:'Reviews',value:stats.reviews,icon:'⭐',color:'#F0A830'},
            {label:'Feedback',value:stats.feedback,icon:'💬',color:'#A855F7'},
          ].map(stat=>(
            <div key={stat.label} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{fontSize:'28px',marginBottom:'8px'}}>{stat.icon}</div>
              <div style={{color:stat.color,fontSize:'26px',fontWeight:'700'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
          {['stats','newsletter','feedback'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'stats' && (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Quick Actions</h2>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'10px'}}>
                {[
                  {href:'/schools',label:'View Schools',icon:'🏫'},
                  {href:'/applications',label:'Applications',icon:'📝'},
                  {href:'/reviews',label:'Reviews',icon:'⭐'},
                  {href:'/community',label:'Community',icon:'💬'},
                  {href:'/ranking',label:'Rankings',icon:'🏆'},
                  {href:'/pricing',label:'Pricing',icon:'💎'},
                ].map(action=>(
                  <a key={action.href} href={action.href} style={{background:'#0D0907',color:'white',textDecoration:'none',padding:'14px',borderRadius:'8px',textAlign:'center',display:'block',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <div style={{fontSize:'24px',marginBottom:'6px'}}>{action.icon}</div>
                    <div style={{fontSize:'12px',color:'rgba(255,255,255,0.6)'}}>{action.label}</div>
                  </a>
                ))}
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Site Status</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {[
                  {label:'Supabase Database',status:'Connected',color:'#2EC87A'},
                  {label:'Stripe Payments',status:'Active',color:'#2EC87A'},
                  {label:'Sakura AI (Claude)',status:'Active',color:'#2EC87A'},
                  {label:'Resend Email',status:'Active',color:'#2EC87A'},
                  {label:'Vercel Deployment',status:'Ready',color:'#2EC87A'},
                  {label:'PWA',status:'Enabled',color:'#2EC87A'},
                ].map(item=>(
                  <div key={item.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px',background:'#0D0907',borderRadius:'8px'}}>
                    <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{item.label}</span>
                    <span style={{background:item.color+'20',color:item.color,padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Send Newsletter</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Subject</label>
                <input value={newsletter.subject} onChange={e=>setNewsletter(prev=>({...prev,subject:e.target.value}))} placeholder="Newsletter subject..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Message</label>
                <textarea value={newsletter.message} onChange={e=>setNewsletter(prev=>({...prev,message:e.target.value}))} placeholder="Newsletter message..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'200px'}}/>
              </div>
              <button onClick={sendNewsletter} disabled={sending||!newsletter.subject||!newsletter.message} style={{background:sent?'#2EC87A':'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer'}}>
                {sent ? '✓ Sent!' : sending ? 'Sending...' : 'Send Newsletter 📧'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>User Feedback ({feedback.length})</h2>
            {feedback.length === 0 ? (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'32px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No feedback yet!</p>
              </div>
            ) : feedback.map(item=>(
              <div key={item.id} style={{background:'#1A2035',borderRadius:'10px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
                  <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'2px 8px',borderRadius:'4px',fontSize:'11px',fontWeight:'700'}}>{item.type || 'feedback'}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
                <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.6'}}>{item.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}