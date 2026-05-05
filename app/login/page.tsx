'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin() {
    setLoading(true)
    setError('')
    const result = await supabase.auth.signInWithPassword({ email, password })
    if (result.error) {
      setError(result.error.message)
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',borderRadius:'20px',padding:'40px',width:'100%',maxWidth:'420px'}}>
        <h1 style={{color:'white',fontSize:'24px',textAlign:'center',marginBottom:'24px'}}>Welcome Back 🌸</h1>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{padding:'12px',borderRadius:'8px',border:'none',fontSize:'14px'}}/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" onKeyDown={e=>e.key==='Enter'&&handleLogin()} style={{padding:'12px',borderRadius:'8px',border:'none',fontSize:'14px'}}/>
          {error&&<p style={{color:'#FF6B6B',fontSize:'13px',textAlign:'center'}}>{error}</p>}
          <button onClick={handleLogin} disabled={loading} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer'}}>
            {loading?'Signing in...':'Sign In 🌸'}
          </button>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textAlign:'center'}}>No account? <a href="/register" style={{color:'#C42020'}}>Create one</a></p>
        </div>
      </div>
    </main>
  )
}