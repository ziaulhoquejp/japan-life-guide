'use client'

import { useState } from 'react'

export default function PricingPage() {
  const [loading, setLoading] = useState(false)

  async function handleCheckout(priceId: string) {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: unknown) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Choose Your Plan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Start free. Upgrade when ready.</p>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'48px 20px',display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'20px'}}>
        
        {/* Free Plan */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.1)'}}>
          <div style={{fontSize:'32px',marginBottom:'12px'}}>🌱</div>
          <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>Free</h2>
          <div style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'4px'}}>¥0</div>
          <div style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'24px'}}>Forever free</div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
            {['Browse 90+ schools','10 AI messages/day','Basic visa guide','Community access'].map(f => (
              <div key={f} style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <span style={{color:'#2EC87A',fontSize:'14px'}}>✓</span>
                <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{f}</span>
              </div>
            ))}
          </div>
          <a href="/register" style={{display:'block',background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',textAlign:'center',padding:'12px',borderRadius:'8px',fontWeight:'700',fontSize:'14px'}}>
            Get Started Free
          </a>
        </div>

        {/* Pro Plan */}
        <div style={{background:'linear-gradient(135deg, #1A2035, #2A1520)',borderRadius:'16px',padding:'32px',border:'2px solid #C42020',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'16px',right:'16px',background:'#C42020',color:'white',fontSize:'11px',fontWeight:'700',padding:'4px 10px',borderRadius:'20px'}}>POPULAR</div>
          <div style={{fontSize:'32px',marginBottom:'12px'}}>🌸</div>
          <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>Pro</h2>
          <div style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'4px'}}>¥980<span style={{fontSize:'16px',color:'rgba(255,255,255,0.4)'}}>/mo</span></div>
          <div style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'24px'}}>Billed monthly</div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
            {['Everything in Free','Unlimited AI messages','Visa document tracker','Priority school matching','Application tracker','Email reminders'].map(f => (
              <div key={f} style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <span style={{color:'#C42020',fontSize:'14px'}}>✓</span>
                <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{f}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleCheckout('price_1TW5Bh0IwTjQCsgWP6btOq8j')}
            disabled={loading}
            style={{width:'100%',background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontWeight:'700',fontSize:'15px',cursor:'pointer'}}
          >
            {loading ? 'Loading...' : 'Start Pro 🌸'}
          </button>
        </div>

        {/* Lifetime Plan */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(240,168,48,0.3)'}}>
          <div style={{fontSize:'32px',marginBottom:'12px'}}>👑</div>
          <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>Lifetime</h2>
          <div style={{color:'#F0A830',fontSize:'36px',fontWeight:'700',marginBottom:'4px'}}>¥14,800</div>
          <div style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'24px'}}>One-time payment</div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
            {['Everything in Pro','Lifetime access','Future features included','Priority support','Early access to new tools'].map(f => (
              <div key={f} style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <span style={{color:'#F0A830',fontSize:'14px'}}>✓</span>
                <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{f}</span>
              </div>
            ))}
          </div>
          <button
            style={{width:'100%',background:'rgba(240,168,48,0.15)',color:'#F0A830',border:'1px solid rgba(240,168,48,0.3)',borderRadius:'8px',padding:'14px',fontWeight:'700',fontSize:'15px',cursor:'pointer'}}
          >
            Get Lifetime 👑
          </button>
        </div>
      </div>
    </main>
  )
}