'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleReset() {
    if (!password || !confirmPassword) { setError('Please fill all fields'); return }
    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    setError('')
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) throw updateError
      setDone(true)
    } catch (err: any) {
      setError(err.message || 'Failed to reset password')
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'440px'}}>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'48px',marginBottom:'8px'}}>🔐</div>
          <h1 style={{color:'white',fontSize:'24px',fontWeight:'800',margin:0}}>Reset Password</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginTop:'4px'}}>Enter your new password</p>
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>
          {done ? (
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'56px',marginBottom:'16px'}}>🎉</div>
              <h2 style={{color:'#2EC87A',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Password Reset!</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px'}}>
                Your password has been successfully updated.
              </p>
              <Link href="/login" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>
                Sign In Now →
              </Link>
            </div>
          ) : (
            <div>
              <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'16px'}}>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>New Password</label>
                  <input
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    type="password"
                    autoComplete="new-password"
                    style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'16px',outline:'none'}}
                  />
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Confirm Password</label>
                  <input
                    value={confirmPassword}
                    onChange={e=>setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    type="password"
                    autoComplete="new-password"
                    style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'16px',outline:'none'}}
                  />
                </div>
              </div>
              {error && <p style={{color:'#FF8070',fontSize:'13px',marginBottom:'12px'}}>{error}</p>}
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor: loading ? 'not-allowed' : 'pointer',width:'100%',WebkitAppearance:'none',opacity: loading ? 0.8 : 1}}
              >
                {loading ? 'Resetting...' : 'Reset Password 🔐'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}