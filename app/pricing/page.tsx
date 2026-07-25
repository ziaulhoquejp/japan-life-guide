'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function PricingPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
        supabase.from('profiles').select('*').eq('id', data.user.id).single().then(({ data: p }) => {
          if (p) setProfile(p)
        })
      }
    })
  }, [])

  const isPro = profile?.plan === 'pro' || profile?.plan === 'lifetime'

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'60px 20px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'800',marginBottom:'8px'}}>Japan Life Guide</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'18px',marginBottom:'16px'}}>All features available for free!</p>
        <span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'6px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:'700'}}>✅ 100% Free to use</span>
      </div>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'48px 20px'}}>

        {isPro && (
          <div style={{background:'rgba(240,168,48,0.1)',borderRadius:'12px',padding:'16px',marginBottom:'24px',border:'1px solid rgba(240,168,48,0.3)',textAlign:'center'}}>
            <p style={{color:'#F0A830',fontSize:'15px',fontWeight:'700'}}>💎 You have Pro access! Enjoy all features!</p>
          </div>
        )}

        {/* All Features Free */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',marginBottom:'24px',border:'1px solid rgba(46,200,122,0.3)'}}>
          <div style={{textAlign:'center',marginBottom:'24px'}}>
            <div style={{fontSize:'48px',marginBottom:'12px'}}>🌸</div>
            <h2 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'8px'}}>All Features Included</h2>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px'}}>Everything you need to study and work in Japan</p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'24px'}}>
            {[
              '✅ Browse 724+ verified schools',
              '✅ Sakura AI in Bengali & Nepali',
              '✅ Complete visa guidance',
              '✅ JLPT practice tests',
              '✅ SSW skills test practice',
              '✅ AI interview practice',
              '✅ Motivation letter generator',
              '✅ Visa document checker',
              '✅ Halal scanner',
              '✅ Job listings',
              '✅ Offline JLPT practice',
              '✅ Document expiry tracker',
            ].map((feature, i) => (
              <p key={i} style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.6'}}>{feature}</p>
            ))}
          </div>

          {!user ? (
            <div style={{textAlign:'center'}}>
              <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 36px',borderRadius:'12px',fontSize:'16px',fontWeight:'700',display:'inline-block'}}>
                🌸 Get Started Free
              </Link>
            </div>
          ) : (
            <div style={{textAlign:'center'}}>
              <Link href="/dashboard" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 36px',borderRadius:'12px',fontSize:'16px',fontWeight:'700',display:'inline-block'}}>
                Go to Dashboard →
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'14px',marginBottom:'32px'}}>
          {[
            {icon:'🏫',title:'724+ Schools',desc:'Browse verified Japanese language schools across Japan'},
            {icon:'🌸',title:'Sakura AI',desc:'AI assistant in Bengali, Nepali, and English 24/7'},
            {icon:'🛂',title:'Visa Guide',desc:'Complete guidance for Student, SSW, and Engineer visas'},
            {icon:'💼',title:'Job Matching',desc:'Find real jobs in Japan with our recruitment service'},
            {icon:'📝',title:'JLPT Practice',desc:'Free practice tests for N5, N4, N3 with explanations'},
            {icon:'📷',title:'Halal Scanner',desc:'Scan food ingredients to check halal compliance'},
          ].map((feature, i) => (
            <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{fontSize:'28px',marginBottom:'8px'}}>{feature.icon}</div>
              <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{feature.title}</h3>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',lineHeight:'1.5'}}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.06)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'8px'}}>Questions? Ask Sakura AI or contact us!</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
              Ask Sakura AI 🌸
            </Link>
            <a href="mailto:hello@japanlifeguide.app" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>
              Contact Us 📧
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}