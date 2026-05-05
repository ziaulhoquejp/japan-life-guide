'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleRegister() {
    if (!email || !password || !name) {
      setError('Please fill in all fields!')
      return
    }
    setLoading(true)
    setError('')
    const result = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })
    if (result.error) {
      setError(result.error.message)
    } else {
      setMessage('Registration successful! Check your email. 🌸')
    }
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0D0907', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#1A2035', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '420px' }}>
        <h1 style={{ color: 'white', fontSize: '24px', textAlign: 'center', marginBottom: '24px' }}>
          Join Japan Life Guide 🌸
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
          日本への旅を始めましょう
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full Name"
            style={{ padding: '12px', borderRadius: '8px', border: 'none', fontSize: '14px' }}
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            style={{ padding: '12px', borderRadius: '8px', border: 'none', fontSize: '14px' }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            style={{ padding: '12px', borderRadius: '8px', border: 'none', fontSize: '14px' }}
          />
          {error && (
            <p style={{ color: '#FF6B6B', fontSize: '13px', textAlign: 'center' }}>
              {error}
            </p>
          )}
          {message && (
            <p style={{ color: '#2EC87A', fontSize: '13px', textAlign: 'center' }}>
              {message}
            </p>
          )}
          <button
            onClick={handleRegister}
            disabled={loading}
            style={{ background: '#C42020', color: 'white', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}
          >
            {loading ? 'Creating...' : 'Create Account 🌸'}
          </button>
        </div>
      </div>
    </main>
  )
}