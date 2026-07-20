'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [visaDocs, setVisaDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { window.location.href = '/login'; return }
      setUser(userData.user)

      const [profileData, appsData, favsData, visaData] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userData.user.id).single(),
        supabase.from('applications').select('*, schools(name_en, city, icon)').eq('user_id', userData.user.id).order('created_at', { ascending: false }).limit(5),
        supabase.from('favorites').select('*, schools(name_en, city, icon)').eq('user_id', userData.user.id).limit(5),
        supabase.from('visa_tracker').select('*').eq('user_id', userData.user.id).order('expiry_date', { ascending: true }).limit(5),
      ])

      if (profileData.data) setProfile(profileData.data)
      if (appsData.data) setApplications(appsData.data)
      if (favsData.data) setFavorites(favsData.data)
      if (visaData.data) setVisaDocs(visaData.data)
      setLoading(false)
    }
    load()
  }, [])

  function getDaysUntil(dateStr: string) {
    const today = new Date()
    today.setHours(0,0,0,0)
    const expiry = new Date(dateStr)
    return Math.ceil((expiry.getTime() - today.getTime()) / (1000*60*60*24))
  }

  function getStatusColor(days: number) {
    if (days < 0) return '#FF8070'
    if (days <= 30) return '#C42020'
    if (days <= 90) return '#F0A830'
    return '#2EC87A'
  }

  const isPro = profile?.plan === 'pro' || profile?.plan === 'lifetime'

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1A2035,#0D1520)',padding:'40px 20px',borderBottom:'3px solid #C42020'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{display:'flex',gap:'16px',alignItems:'center',marginBottom:'20px',flexWrap:'wrap'}}>
            <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'linear-gradient(135deg,#C42020,#FF8070)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px',fontWeight:'700',flexShrink:0}}>
              {profile?.full_name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h1 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'4px'}}>
                Welcome back, {profile?.full_name?.split(' ')[0] || 'Friend'}! 🌸
              </h1>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                <span style={{background: isPro ? 'rgba(240,168,48,0.2)' : 'rgba(255,255,255,0.1)',color: isPro ? '#F0A830' : 'rgba(255,255,255,0.5)',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>
                  {isPro ? '💎 Pro Member' : '🆓 Free Plan'}
                </span>
                {profile?.country && (
                  <span style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.5)',padding:'3px 10px',borderRadius:'20px',fontSize:'11px'}}>
                    {profile.country === 'Bangladesh' ? '🇧🇩' : profile.country === 'Nepal' ? '🇳🇵' : '🌍'} {profile.country}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'12px'}}>
            {[
              {icon:'📝',label:'Applications',value:applications.length,color:'#C42020',href:'/applications'},
              {icon:'❤️',label:'Saved Schools',value:favorites.length,color:'#FF8070',href:'/schools'},
              {icon:'🪪',label:'Documents',value:visaDocs.length,color:'#A855F7',href:'/visa-tracker'},
              {icon:'💎',label:'Plan',value: isPro ? 'Pro' : 'Free',color:'#F0A830',href:'/pricing'},
            ].map(stat => (
              <Link key={stat.label} href={stat.href} style={{background:'rgba(255,255,255,0.06)',borderRadius:'12px',padding:'14px',textDecoration:'none',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center',display:'block'}}>
                <div style={{fontSize:'24px',marginBottom:'4px'}}>{stat.icon}</div>
                <div style={{color:stat.color,fontSize:'20px',fontWeight:'800'}}>{stat.value}</div>
                <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{stat.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Urgent Visa Alerts */}
        {visaDocs.filter(d => getDaysUntil(d.expiry_date) <= 30).length > 0 && (
          <div style={{background:'rgba(196,32,32,0.15)',borderRadius:'12px',padding:'16px',marginBottom:'24px',border:'1px solid rgba(196,32,32,0.4)'}}>
            <p style={{color:'#FF8070',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>🚨 Urgent: Documents expiring soon!</p>
            {visaDocs.filter(d => getDaysUntil(d.expiry_date) <= 30).map(doc => {
              const days = getDaysUntil(doc.expiry_date)
              return (
                <p key={doc.id} style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',marginBottom:'4px'}}>
                  🪪 {doc.document_type} - {days < 0 ? 'EXPIRED!' : `${days} days left`}
                </p>
              )
            })}
            <Link href="/visa-tracker" style={{color:'#FF8070',fontSize:'12px',fontWeight:'700',textDecoration:'none'}}>Manage Documents →</Link>
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>

          {/* Quick Actions */}
          <div style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>🚀 Quick Actions</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {[
                {icon:'🏫',label:'Browse Schools',href:'/schools',color:'#C42020'},
                {icon:'🌸',label:'Ask Sakura AI',href:'/chat',color:'#FF8070'},
                {icon:'💼',label:'Browse Jobs',href:'/jobs',color:'#2EC87A'},
                {icon:'🛂',label:'Visa Guide',href:'/visa',color:'#4A8EFF'},
                {icon:'📝',label:'JLPT Practice',href:'/jlpt-test',color:'#F0A830'},
                {icon:'🏭',label:'SSW Test',href:'/ssw-test',color:'#A855F7'},
                {icon:'🎤',label:'Interview Practice',href:'/interview-practice',color:'#2EC87A'},
                {icon:'📄',label:'Motivation Letter',href:'/motivation-letter',color:'#F0A830'},
                {icon:'✅',label:'Visa Checker',href:'/visa-check',color:'#4A8EFF'},
                {icon:'🕌',label:'Halal Scanner',href:'/halal-scanner',color:'#2EC87A'},
              ].map(action => (
                <Link key={action.href} href={action.href} style={{display:'flex',gap:'10px',alignItems:'center',padding:'10px',background:'#0D0907',borderRadius:'8px',textDecoration:'none',border:'1px solid rgba(255,255,255,0.04)'}}>
                  <span style={{fontSize:'18px'}}>{action.icon}</span>
                  <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{action.label}</span>
                  <span style={{color:action.color,marginLeft:'auto',fontSize:'12px'}}>→</span>
                </Link>
              ))}
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

            {/* Recent Applications */}
            <div style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
                <h2 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>📝 Applications</h2>
                <Link href="/applications" style={{color:'#C42020',fontSize:'12px',textDecoration:'none'}}>View all →</Link>
              </div>
              {applications.length === 0 ? (
                <div style={{textAlign:'center',padding:'20px'}}>
                  <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',marginBottom:'10px'}}>No applications yet</p>
                  <Link href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'700'}}>Browse Schools</Link>
                </div>
              ) : applications.map(app => (
                <div key={app.id} style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                  <span style={{fontSize:'20px'}}>{app.schools?.icon || '🏫'}</span>
                  <div style={{flex:1}}>
                    <p style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{app.schools?.name_en || 'School'}</p>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{app.schools?.city}</p>
                  </div>
                  <span style={{background: app.status === 'applied' ? 'rgba(74,142,255,0.2)' : 'rgba(46,200,122,0.2)',color: app.status === 'applied' ? '#4A8EFF' : '#2EC87A',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Visa Documents */}
            <div style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
                <h2 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>🪪 Documents</h2>
                <Link href="/visa-tracker" style={{color:'#C42020',fontSize:'12px',textDecoration:'none'}}>Manage →</Link>
              </div>
              {visaDocs.length === 0 ? (
                <div style={{textAlign:'center',padding:'20px'}}>
                  <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',marginBottom:'10px'}}>No documents tracked</p>
                  <Link href="/visa-tracker" style={{background:'#A855F7',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'700'}}>Add Document</Link>
                </div>
              ) : visaDocs.map(doc => {
                const days = getDaysUntil(doc.expiry_date)
                const color = getStatusColor(days)
                return (
                  <div key={doc.id} style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <span style={{fontSize:'18px'}}>🪪</span>
                    <div style={{flex:1}}>
                      <p style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{doc.document_type}</p>
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{new Date(doc.expiry_date).toLocaleDateString()}</p>
                    </div>
                    <span style={{color,fontSize:'11px',fontWeight:'700'}}>{days < 0 ? 'Expired!' : `${days}d`}</span>
                  </div>
                )
              })}
            </div>

            {/* Upgrade to Pro */}
            {!isPro && (
              <div style={{background:'linear-gradient(135deg,rgba(240,168,48,0.2),rgba(240,168,48,0.05))',borderRadius:'14px',padding:'22px',border:'1px solid rgba(240,168,48,0.3)',textAlign:'center'}}>
                <div style={{fontSize:'32px',marginBottom:'8px'}}>💎</div>
                <h3 style={{color:'#F0A830',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>Upgrade to Pro</h3>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginBottom:'14px',lineHeight:'1.6'}}>
                  Unlimited AI chat, priority support, and exclusive features
                </p>
                <Link href="/pricing" style={{background:'#F0A830',color:'#0D0907',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'inline-block'}}>
                  View Plans →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Saved Schools */}
        {favorites.length > 0 && (
          <div style={{background:'#1A2035',borderRadius:'14px',padding:'22px',marginTop:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>❤️ Saved Schools</h2>
              <Link href="/schools" style={{color:'#C42020',fontSize:'12px',textDecoration:'none'}}>Browse more →</Link>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'10px'}}>
              {favorites.map(fav => (
                <Link key={fav.id} href={`/schools/${fav.school_id}`} style={{background:'#0D0907',borderRadius:'10px',padding:'12px',textDecoration:'none',border:'1px solid rgba(255,255,255,0.06)',display:'block'}}>
                  <div style={{fontSize:'24px',marginBottom:'6px'}}>{fav.schools?.icon || '🏫'}</div>
                  <p style={{color:'white',fontSize:'12px',fontWeight:'600',marginBottom:'2px'}}>{fav.schools?.name_en}</p>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>📍 {fav.schools?.city}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}