'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [favorites, setFavorites] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { window.location.href = '/login'; return }
      setUser(userData.user)

      const [profileData, favData, appData, revData] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userData.user.id).single(),
        supabase.from('favorites').select('school_id, schools(name_en, city, icon, rating, annual_fee_jpy)').eq('user_id', userData.user.id),
        supabase.from('applications').select('*, schools(name_en, city, icon)').eq('user_id', userData.user.id).order('created_at', { ascending: false }),
        supabase.from('reviews').select('*, schools(name_en, icon)').eq('user_id', userData.user.id),
      ])

      if (profileData.data) setProfile(profileData.data)
      if (favData.data) setFavorites(favData.data)
      if (appData.data) setApplications(appData.data)
      if (revData.data) setReviews(revData.data)
      setLoading(false)
    }
    getData()
  }, [])

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  const isPro = profile?.plan === 'pro' || profile?.plan === 'lifetime'

  const visaSteps = [
    {step:1,label:'Choose School',done:favorites.length > 0},
    {step:2,label:'Submit Application',done:applications.length > 0},
    {step:3,label:'Get Acceptance',done:applications.some(a=>a.status==='accepted')},
    {step:4,label:'Apply for COE',done:false},
    {step:5,label:'Get Visa',done:false},
    {step:6,label:'Book Flight',done:false},
  ]

  const completedSteps = visaSteps.filter(s=>s.done).length
  const progress = Math.round((completedSteps / visaSteps.length) * 100)

  const statusColors: any = {
    pending: '#F0A830',
    applied: '#4A8EFF',
    accepted: '#2EC87A',
    rejected: '#C42020',
    withdrawn: 'rgba(255,255,255,0.3)',
  }

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'linear-gradient(135deg,#1A2035,#0D1520)',padding:'32px 40px',borderBottom:'3px solid #C42020'}}>
        <div style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap',marginBottom:'20px'}}>
          <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',fontWeight:'700',color:'white',flexShrink:0,boxShadow:'0 0 20px rgba(196,32,32,0.4)'}}>
            {user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
          </div>
          <div style={{flex:1}}>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'2px'}}>{greeting()}! 🌸</p>
            <h1 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'2px'}}>
              {user?.user_metadata?.full_name || 'Student'}
            </h1>
            <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>{user?.email}</p>
              {isPro ? (
                <span style={{background:'rgba(240,168,48,0.2)',color:'#F0A830',padding:'2px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>💎 Pro Member</span>
              ) : (
                <span style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.4)',padding:'2px 8px',borderRadius:'20px',fontSize:'11px'}}>Free Plan</span>
              )}
            </div>
          </div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            <a href="/profile" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Edit Profile</a>
            <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Find Schools</a>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))',gap:'10px'}}>
          {[
            {icon:'❤️',label:'Favorites',value:favorites.length,color:'#C42020',href:'/profile'},
            {icon:'📝',label:'Applications',value:applications.length,color:'#4A8EFF',href:'/applications'},
            {icon:'⭐',label:'Reviews',value:reviews.length,color:'#F0A830',href:'/reviews'},
            {icon:'📊',label:'Visa Progress',value:progress + '%',color:'#2EC87A',href:'#visa'},
          ].map(stat=>(
            <a key={stat.label} href={stat.href} style={{background:'rgba(255,255,255,0.06)',borderRadius:'10px',padding:'14px',textAlign:'center',textDecoration:'none',border:'1px solid rgba(255,255,255,0.08)',display:'block'}}>
              <div style={{fontSize:'22px',marginBottom:'6px'}}>{stat.icon}</div>
              <div style={{color:stat.color,fontSize:'20px',fontWeight:'700',marginBottom:'2px'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{stat.label}</div>
            </a>
          ))}
        </div>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Visa Progress */}
        <div id="visa" style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px',flexWrap:'wrap',gap:'8px'}}>
            <h2 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>🗾 Japan Journey Progress</h2>
            <span style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700'}}>{progress}% Complete</span>
          </div>
          <div style={{height:'8px',background:'rgba(255,255,255,0.1)',borderRadius:'4px',overflow:'hidden',marginBottom:'14px'}}>
            <div style={{height:'100%',width:progress + '%',background:'linear-gradient(90deg,#C42020,#2EC87A)',borderRadius:'4px',transition:'width 0.5s'}}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:'8px'}}>
            {visaSteps.map(step=>(
              <div key={step.step} style={{background:step.done?'rgba(46,200,122,0.1)':'#0D0907',borderRadius:'8px',padding:'10px',border:'1px solid ' + (step.done?'rgba(46,200,122,0.3)':'rgba(255,255,255,0.06)')}}>
                <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                  <div style={{width:'22px',height:'22px',borderRadius:'50%',background:step.done?'#2EC87A':'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',flexShrink:0,color:'white',fontWeight:'700'}}>
                    {step.done ? '✓' : step.step}
                  </div>
                  <span style={{color:step.done?'#2EC87A':'rgba(255,255,255,0.5)',fontSize:'11px',fontWeight:'600'}}>{step.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:'16px',marginBottom:'20px'}}>

          {/* Applications */}
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
              <h2 style={{color:'white',fontSize:'15px',fontWeight:'700'}}>📝 My Applications</h2>
              <a href="/applications" style={{color:'#C42020',fontSize:'12px',textDecoration:'none'}}>View All →</a>
            </div>
            {applications.length === 0 ? (
              <div style={{textAlign:'center',padding:'16px'}}>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'10px'}}>No applications yet!</p>
                <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'700'}}>Browse Schools</a>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {applications.slice(0,4).map((app:any)=>(
                  <div key={app.id} style={{background:'#0D0907',borderRadius:'8px',padding:'10px',display:'flex',gap:'10px',alignItems:'center'}}>
                    <span style={{fontSize:'22px'}}>{app.schools?.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{app.schools?.name_en}</div>
                      <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{app.schools?.city}</div>
                    </div>
                    <span style={{background:statusColors[app.status]+'20',color:statusColors[app.status],padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',textTransform:'capitalize'}}>{app.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favorites */}
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
              <h2 style={{color:'white',fontSize:'15px',fontWeight:'700'}}>❤️ Favorite Schools</h2>
              <a href="/schools" style={{color:'#C42020',fontSize:'12px',textDecoration:'none'}}>Browse →</a>
            </div>
            {favorites.length === 0 ? (
              <div style={{textAlign:'center',padding:'16px'}}>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'10px'}}>No favorites yet!</p>
                <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'700'}}>Browse Schools</a>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {favorites.slice(0,4).map((fav:any)=>(
                  <a key={fav.school_id} href={'/schools/' + fav.school_id} style={{background:'#0D0907',borderRadius:'8px',padding:'10px',display:'flex',gap:'10px',alignItems:'center',textDecoration:'none'}}>
                    <span style={{fontSize:'22px'}}>{fav.schools?.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{fav.schools?.name_en}</div>
                      <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{fav.schools?.city}</div>
                    </div>
                    <span style={{color:'#F0A830',fontSize:'11px'}}>⭐ {fav.schools?.rating}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>⚡ Quick Actions</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))',gap:'8px'}}>
            {[
              {href:'/schools',icon:'🏫',label:'Find Schools'},
              {href:'/visa-calculator',icon:'🧮',label:'Visa Check'},
              {href:'/cost-calculator',icon:'💰',label:'Cost Calc'},
              {href:'/chat',icon:'🌸',label:'Ask Sakura'},
              {href:'/compare',icon:'🔄',label:'Compare'},
              {href:'/applications',icon:'📝',label:'Applications'},
              {href:'/scholarships',icon:'🎓',label:'Scholarships'},
              {href:'/jobs',icon:'💼',label:'Jobs'},
              {href:'/jlpt-test',icon:'📝',label:'JLPT Test'},
              {href:'/calendar',icon:'📅',label:'Calendar'},
              {href:'/ranking',icon:'🏆',label:'Rankings'},
              {href:'/affiliate',icon:'💰',label:'Earn Money'},
            ].map(action=>(
              <a key={action.href} href={action.href} style={{background:'#0D0907',color:'white',textDecoration:'none',padding:'12px',borderRadius:'8px',textAlign:'center',display:'block',border:'1px solid rgba(255,255,255,0.06)',transition:'border-color 0.2s'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.3)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.06)')}>
                <div style={{fontSize:'20px',marginBottom:'4px'}}>{action.icon}</div>
                <div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>{action.label}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Pro Upgrade Banner */}
        {!isPro && (
          <div style={{background:'linear-gradient(135deg, #C42020, #8B0000)',borderRadius:'12px',padding:'24px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
            <h3 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>Upgrade to Pro 💎</h3>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'14px',marginBottom:'16px'}}>Unlimited AI chat, unlimited favorites, unlimited applications!</p>
            <a href="/pricing" style={{background:'white',color:'#C42020',textDecoration:'none',padding:'12px 32px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>
              Upgrade Now — ¥980/month
            </a>
          </div>
        )}

        {isPro && (
          <div style={{background:'linear-gradient(135deg,rgba(240,168,48,0.2),rgba(196,32,32,0.2))',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(240,168,48,0.3)'}}>
            <p style={{color:'#F0A830',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>💎 You are a Pro Member!</p>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>Enjoy unlimited access to all features.</p>
          </div>
        )}
      </div>
    </main>
  )
}