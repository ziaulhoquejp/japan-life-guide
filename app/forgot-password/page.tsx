'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleReset() {
    if (!email) { setError('Please enter your email'); return }
    setLoading(true)
    setError('')
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://japanlifeguide.app/reset-password',
      })
      if (resetError) throw resetError
      setSent(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email')
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'440px'}}>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'48px',marginBottom:'8px'}}>🔑</div>
          <h1 style={{color:'white',fontSize:'24px',fontWeight:'800',margin:0}}>Forgot Password</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginTop:'4px'}}>We'll send you a reset link</p>
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>
          {sent ? (
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'56px',marginBottom:'16px'}}>📧</div>
              <h2 style={{color:'#2EC87A',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Email Sent!</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px',lineHeight:'1.7'}}>
                Check your email at <strong style={{color:'white'}}>{email}</strong> for a password reset link.
              </p>
              <Link href="/login" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>
                Back to Login
              </Link>
            </div>
          ) : (
            <div>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'20px',lineHeight:'1.7'}}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <div style={{marginBottom:'16px'}}>
                <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Email Address</label>
                <input
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  placeholder="your@email.com"
                  type="email"
                  autoComplete="email"
                  style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'16px',outline:'none'}}
                />
              </div>
              {error && <p style={{color:'#FF8070',fontSize:'13px',marginBottom:'12px'}}>{error}</p>}
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor: loading ? 'not-allowed' : 'pointer',width:'100%',WebkitAppearance:'none',opacity: loading ? 0.8 : 1}}
              >
                {loading ? 'Sending...' : 'Send Reset Link 📧'}
              </button>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textAlign:'center',marginTop:'16px'}}>
                Remember your password? <Link href="/login" style={{color:'#C42020',textDecoration:'none'}}>Sign in</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}