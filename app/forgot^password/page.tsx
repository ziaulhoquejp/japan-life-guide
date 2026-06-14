'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleReset() {
    if (!email) { setError('Please enter your email!'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://japanlifeguide.app/reset-password',
    })
    if (err) { setError(err.message); setLoading(false); return }
    setSent(true)
    setLoading(false)
  }

  if (sent) return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',padding:'20px'}}>
      <div style={{textAlign:'center',maxWidth:'400px'}}>
        <div style={{fontSize:'64px',marginBottom:'16px'}}>📧</div>
        <h1 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'12px'}}>Check Your Email!</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'8px'}}>We sent a password reset link to:</p>
        <p style={{color:'#C42020',fontSize:'16px',fontWeight:'700',marginBottom:'24px'}}>{email}</p>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'24px'}}>Click the link in the email to reset your password. Check spam folder if not received.</p>
        <a href="/login" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 28px',borderRadius:'8px',fontWeight:'700',fontSize:'14px'}}>Back to Login</a>
      </div>
    </main>
  )

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'48px',marginBottom:'12px'}}>🔐</div>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'8px'}}>Forgot Password?</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Enter your email and we will send a reset link</p>
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)',marginBottom:'16px'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div>
              <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Email Address</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" onKeyDown={e=>e.key==='Enter'&&handleReset()} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
            </div>
            {error && (
              <div style={{background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'10px 14px'}}>
                <p style={{color:'#FF6B6B',fontSize:'13px',margin:0}}>{error}</p>
              </div>
            )}
            <button onClick={handleReset} disabled={loading} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',opacity:loading?0.7:1}}>
              {loading ? 'Sending...' : 'Send Reset Link 🌸'}
            </button>
          </div>
        </div>

        <div style={{textAlign:'center'}}>
          <a href="/login" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none',fontSize:'13px'}}>
            ← Back to Login
          </a>
        </div>
      </div>
    </main>
  )
}