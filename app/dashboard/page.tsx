'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [favorites, setFavorites] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { window.location.href = '/login'; return }
      setUser(userData.user)

      const [favData, revData] = await Promise.all([
        supabase.from('favorites').select('school_id, schools(name_en, city, icon, rating, annual_fee_jpy)').eq('user_id', userData.user.id),
        supabase.from('reviews').select('*, schools(name_en, icon)').eq('user_id', userData.user.id),
      ])
      if (favData.data) setFavorites(favData.data)
      if (revData.data) setReviews(revData.data)
      setLoading(false)
    }
    getData()
  }, [])

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  const visaSteps = [
    {step:1,label:'Choose School',done:favorites.length > 0},
    {step:2,label:'Submit Application',done:false},
    {step:3,label:'Get Acceptance Letter',done:false},
    {step:4,label:'Apply for COE',done:false},
    {step:5,label:'Apply for Visa',done:false},
    {step:6,label:'Book Flight',done:false},
  ]

  const completedSteps = visaSteps.filter(s=>s.done).length
  const progress = Math.round((completedSteps / visaSteps.length) * 100)

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 40px',borderBottom:'3px solid #C42020'}}>
        <div style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
          <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:'700',color:'white',flexShrink:0}}>
            {user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <h1 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'2px'}}>
              Welcome back, {user?.user_metadata?.full_name || 'Student'}!
            </h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>{user?.email}</p>
          </div>
          <div style={{marginLeft:'auto',display:'flex',gap:'8px'}}>
            <a href="/profile" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Edit Profile</a>
            <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Find Schools</a>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))',gap:'12px',marginBottom:'28px'}}>
          {[
            {icon:'❤️',label:'Favorite Schools',value:favorites.length,color:'#C42020',href:'/profile'},
            {icon:'⭐',label:'Reviews Written',value:reviews.length,color:'#F0A830',href:'/schools'},
            {icon:'📊',label:'Visa Progress',value:progress + '%',color:'#2EC87A',href:'#visa'},
            {icon:'🌸',label:'AI Chats',value:'Unlimited',color:'#4A8EFF',href:'/chat'},
          ].map(stat=>(
            <a key={stat.label} href={stat.href} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none',display:'block'}}>
              <div style={{fontSize:'28px',marginBottom:'8px'}}>{stat.icon}</div>
              <div style={{color:stat.color,fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{stat.label}</div>
            </a>
          ))}
        </div>

        <div id="visa" style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Visa Application Progress</h2>
          <div style={{marginBottom:'16px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
              <span style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>{completedSteps} of {visaSteps.length} steps completed</span>
              <span style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700'}}>{progress}%</span>
            </div>
            <div style={{height:'8px',background:'rgba(255,255,255,0.1)',borderRadius:'4px',overflow:'hidden'}}>
              <div style={{height:'100%',width:progress + '%',background:'#2EC87A',borderRadius:'4px',transition:'width 0.5s'}}/>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:'8px'}}>
            {visaSteps.map(step=>(
              <div key={step.step} style={{background:step.done?'rgba(46,200,122,0.1)':'#0D0907',borderRadius:'8px',padding:'12px',border:'1px solid ' + (step.done?'rgba(46,200,122,0.3)':'rgba(255,255,255,0.06)')}}>
                <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                  <div style={{width:'24px',height:'24px',borderRadius:'50%',background:step.done?'#2EC87A':'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',flexShrink:0}}>
                    {step.done ? '✓' : step.step}
                  </div>
                  <span style={{color:step.done?'#2EC87A':'rgba(255,255,255,0.5)',fontSize:'12px',fontWeight:'600'}}>{step.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:'16px',marginBottom:'20px'}}>
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Favorite Schools ({favorites.length})</h2>
            {favorites.length === 0 ? (
              <div style={{textAlign:'center',padding:'20px'}}>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'12px'}}>No favorites yet!</p>
                <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Browse Schools</a>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {favorites.slice(0,4).map((fav:any)=>(
                  <a key={fav.school_id} href={'/schools/' + fav.school_id} style={{background:'#0D0907',borderRadius:'8px',padding:'10px',display:'flex',gap:'10px',alignItems:'center',textDecoration:'none'}}>
                    <span style={{fontSize:'24px'}}>{fav.schools?.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{fav.schools?.name_en}</div>
                      <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{fav.schools?.city}</div>
                    </div>
                    <span style={{color:'#F0A830',fontSize:'12px'}}>⭐ {fav.schools?.rating}</span>
                  </a>
                ))}
                {favorites.length > 4 && (
                  <a href="/profile" style={{color:'#C42020',fontSize:'12px',textDecoration:'none',textAlign:'center',padding:'8px'}}>View all {favorites.length} favorites →</a>
                )}
              </div>
            )}
          </div>

          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Quick Actions</h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
              {[
                {href:'/schools',icon:'🏫',label:'Find Schools'},
                {href:'/visa-calculator',icon:'🧮',label:'Visa Calculator'},
                {href:'/cost-calculator',icon:'💰',label:'Cost Calculator'},
                {href:'/chat',icon:'🌸',label:'Ask Sakura'},
                {href:'/compare',icon:'🔄',label:'Compare Schools'},
                {href:'/apply',icon:'📝',label:'Apply Now'},
                {href:'/scholarships',icon:'🎓',label:'Scholarships'},
                {href:'/jobs',icon:'💼',label:'Jobs'},
              ].map(action=>(
                <a key={action.href} href={action.href} style={{background:'#0D0907',color:'white',textDecoration:'none',padding:'12px',borderRadius:'8px',textAlign:'center',display:'block'}}>
                  <div style={{fontSize:'20px',marginBottom:'4px'}}>{action.icon}</div>
                  <div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)'}}>{action.label}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{background:'linear-gradient(135deg, #C42020, #8B0000)',borderRadius:'12px',padding:'24px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
          <h3 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>Upgrade to Pro 💎</h3>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:'14px',marginBottom:'16px'}}>Get unlimited AI chat, priority school matching, and exclusive visa guidance!</p>
          <a href="/pricing" style={{background:'white',color:'#C42020',textDecoration:'none',padding:'12px 32px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>
            Upgrade Now — ¥980/month
          </a>
        </div>
      </div>
    </main>
  )
}