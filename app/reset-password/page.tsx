'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleReset() {
    if (!password || !confirm) { setError('Please fill in all fields!'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters!'); return }
    if (password !== confirm) { setError('Passwords do not match!'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.updateUser({ password })
    if (err) { setError(err.message); setLoading(false); return }
    setDone(true)
    setLoading(false)
  }

  if (done) return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',padding:'20px'}}>
      <div style={{textAlign:'center',maxWidth:'400px'}}>
        <div style={{fontSize:'64px',marginBottom:'16px'}}>🎉</div>
        <h1 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'12px'}}>Password Reset!</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px'}}>Your password has been updated successfully.</p>
        <a href="/login" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 28px',borderRadius:'8px',fontWeight:'700',fontSize:'14px'}}>Sign In Now</a>
      </div>
    </main>
  )

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'48px',marginBottom:'12px'}}>🔑</div>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'8px'}}>Reset Password</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Enter your new password below</p>
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)',marginBottom:'16px'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div>
              <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>New Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Minimum 6 characters" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
            </div>
            <div>
              <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Confirm Password</label>
              <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Enter password again" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
            </div>
            {error && (
              <div style={{background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'10px 14px'}}>
                <p style={{color:'#FF6B6B',fontSize:'13px',margin:0}}>{error}</p>
              </div>
            )}
            <button onClick={handleReset} disabled={loading} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',opacity:loading?0.7:1}}>
              {loading ? 'Updating...' : 'Reset Password 🌸'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}