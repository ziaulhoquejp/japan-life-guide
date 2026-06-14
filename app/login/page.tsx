'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    if (!email || !password) { setError('Please fill in all fields!'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }
    window.location.href = '/dashboard'
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'48px',marginBottom:'12px'}}>🌸</div>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'8px'}}>Welcome Back!</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Sign in to your Japan Life Guide account</p>
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)',marginBottom:'16px'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div>
              <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Email Address</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" onKeyDown={e=>e.key==='Enter'&&handleLogin()} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
            </div>
            <div>
              <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password" onKeyDown={e=>e.key==='Enter'&&handleLogin()} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
            </div>
            <div style={{textAlign:'right',marginTop:'-8px'}}>
  <a href="/forgot-password" style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',textDecoration:'none'}}>
    Forgot Password?
  </a>
</div>
            {error && (
              <div style={{background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'10px 14px'}}>
                <p style={{color:'#FF6B6B',fontSize:'13px',margin:0}}>{error}</p>
              </div>
            )}
            <button onClick={handleLogin} disabled={loading} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',opacity:loading?0.7:1}}>
              {loading ? 'Signing In...' : 'Sign In 🌸'}
            </button>
          </div>
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)',marginBottom:'16px'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {[
              {icon:'🏫',label:'Access 500+ language schools'},
              {icon:'🌸',label:'Unlimited Sakura AI chat'},
              {icon:'📊',label:'Track your applications'},
              {icon:'❤️',label:'Save favorite schools'},
            ].map(item=>(
              <div key={item.label} style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <span style={{fontSize:'16px'}}>{item.icon}</span>
                <span style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:'center',display:'flex',flexDirection:'column',gap:'8px'}}>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>
            Don not have an account?{' '}
            <a href="/register" style={{color:'#C42020',textDecoration:'none',fontWeight:'600'}}>Create Free Account</a>
          </p>
          <a href="/schools" style={{color:'rgba(255,255,255,0.3)',textDecoration:'none',fontSize:'12px'}}>
            Browse schools without signing in →
          </a>
        </div>
      </div>
    </main>
  )
}