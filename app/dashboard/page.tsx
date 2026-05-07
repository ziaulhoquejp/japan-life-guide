'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>
      🌸 Loading...
    </div>
  )

  if (!user) return (
    <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',flexDirection:'column',gap:'16px'}}>
      <div style={{color:'white',fontSize:'24px',fontWeight:'700'}}>Please login first</div>
      <a href="/login" style={{background:'#C42020',color:'white',padding:'12px 24px',borderRadius:'8px',textDecoration:'none',fontWeight:'700'}}>
        Sign In 🌸
      </a>
    </div>
  )

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>
          My Dashboard 📊
        </h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>
          Welcome back, {user.user_metadata?.full_name || user.email}! 🌸
        </p>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',gap:'16px',marginBottom:'32px'}}>
          {[
            {icon:'📋',label:'Applications',value:'3',color:'#4A8EFF'},
            {icon:'🛂',label:'Visa Step',value:'3/6',color:'#C42020'},
            {icon:'📄',label:'Documents Ready',value:'5/7',color:'#2EC87A'},
            {icon:'💰',label:'Days to Deadline',value:'47',color:'#F0A830'},
          ].map(kpi => (
            <div key={kpi.label} style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:`1px solid ${kpi.color}30`,borderTop:`3px solid ${kpi.color}`}}>
              <div style={{fontSize:'28px',marginBottom:'8px'}}>{kpi.icon}</div>
              <div style={{color:'white',fontSize:'32px',fontWeight:'700',fontFamily:'monospace'}}>{kpi.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginTop:'4px'}}>{kpi.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>🛂 Visa Progress</h3>
            {[
              {n:'1',t:'Applied to School',s:'done'},
              {n:'2',t:'Received Acceptance',s:'done'},
              {n:'3',t:'COE Processing',s:'current'},
              {n:'4',t:'Apply at Embassy',s:'upcoming'},
              {n:'5',t:'Receive Visa',s:'upcoming'},
              {n:'6',t:'Fly to Japan',s:'upcoming'},
            ].map((step,i) => (
              <div key={i} style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'12px'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'700',flexShrink:0,background:step.s==='done'?'#2EC87A':step.s==='current'?'#C42020':'#0D0907',color:'white',border:step.s==='upcoming'?'2px solid rgba(255,255,255,0.2)':'none'}}>
                  {step.s==='done'?'✓':step.n}
                </div>
                <div style={{color:step.s==='done'?'#2EC87A':step.s==='current'?'#C42020':'rgba(255,255,255,0.5)',fontSize:'13px',fontWeight:step.s==='current'?'700':'400'}}>
                  {step.t}
                </div>
              </div>
            ))}
          </div>

          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>🔔 Alerts</h3>
            {[
              {icon:'⚠️',title:'Document Missing',text:'Health certificate needed by May 1st',color:'rgba(196,32,32,0.15)'},
              {icon:'📅',title:'Interview Scheduled',text:'Tokyo JLS - May 10 at 10AM',color:'rgba(240,168,48,0.15)'},
              {icon:'✅',title:'COE Confirmed',text:'Application submitted successfully',color:'rgba(46,200,122,0.15)'},
            ].map((alert,i) => (
              <div key={i} style={{background:alert.color,borderRadius:'8px',padding:'12px',marginBottom:'10px',display:'flex',gap:'10px',alignItems:'flex-start'}}>
                <div style={{fontSize:'18px'}}>{alert.icon}</div>
                <div>
                  <div style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'2px'}}>{alert.title}</div>
                  <div style={{color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>{alert.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:'16px',background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>📋 My Applications</h3>
          {[
            {school:'Tokyo Japanese Language School',status:'COE Processing',pct:60,color:'#4A8EFF'},
            {school:'Osaka Nihongo Center',status:'Missing Documents',pct:20,color:'#C42020'},
            {school:'Kyoto Language Academy',status:'Interview May 10',pct:80,color:'#F0A830'},
          ].map((app,i) => (
            <div key={i} style={{marginBottom:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                <span style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{app.school}</span>
                <span style={{color:app.color,fontSize:'12px'}}>{app.status}</span>
              </div>
              <div style={{height:'6px',background:'rgba(255,255,255,0.1)',borderRadius:'3px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${app.pct}%`,background:app.color,borderRadius:'3px'}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}