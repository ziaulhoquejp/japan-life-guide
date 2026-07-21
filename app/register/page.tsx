'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

function RegisterForm() {
  const [step, setStep] = useState(1)
  const searchParams = useSearchParams()
  const refCode = searchParams.get('ref') || ''
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    country: '',
    purpose: '',
    japanese_level: '',
  })

  function update(field: string, value: string) {
    setForm(prev => ({...prev, [field]: value}))
    setError('')
  }

  function goToStep2() {
    if (!form.full_name || !form.email || !form.password) {
      setError('Please fill all fields')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setError('')
    setStep(2)
  }

  function goToStep3() {
    if (!form.country || !form.purpose) {
      setError('Please select country and goal')
      return
    }
    setError('')
    setStep(3)
  }

  async function handleRegister() {
    if (!form.japanese_level) {
      setError('Please select your Japanese level')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.full_name,
            country: form.country,
          }
        }
      })

      if (signUpError) throw signUpError

      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: form.email,
          full_name: form.full_name,
          country: form.country,
          purpose: form.purpose,
          japanese_level: form.japanese_level,
          plan: 'free',
          referred_by: refCode || null,
        })

        await fetch('/api/send-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            name: form.full_name,
            country: form.country,
            referralCode: 'JLG' + data.user.id.slice(0, 8).toUpperCase(),
          }),
        })

        setStep(4)
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'480px'}}>

        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'48px',marginBottom:'8px'}}>🌸</div>
          <h1 style={{color:'white',fontSize:'24px',fontWeight:'800',margin:0}}>Japan Life Guide</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginTop:'4px'}}>Start your Japan journey today</p>
        </div>

        {/* Progress */}
        {step < 4 && (
          <div style={{display:'flex',gap:'8px',marginBottom:'24px'}}>
            {[1,2,3].map(s => (
              <div key={s} style={{flex:1,height:'4px',borderRadius:'2px',background: s <= step ? '#C42020' : 'rgba(255,255,255,0.1)'}}/>
            ))}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'6px'}}>Create your account</h2>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'20px'}}>Step 1 of 3 · Free forever, no credit card needed</p>
              <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Full Name</label>
                  <input
                    value={form.full_name}
                    onChange={e=>update('full_name', e.target.value)}
                    placeholder="Your full name"
                    autoComplete="name"
                    style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'16px',outline:'none'}}
                  />
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Email Address</label>
                  <input
                    value={form.email}
                    onChange={e=>update('email', e.target.value)}
                    placeholder="your@email.com"
                    type="email"
                    autoComplete="email"
                    style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'16px',outline:'none'}}
                  />
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Password</label>
                  <input
                    value={form.password}
                    onChange={e=>update('password', e.target.value)}
                    placeholder="Minimum 6 characters"
                    type="password"
                    autoComplete="new-password"
                    style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'16px',outline:'none'}}
                  />
                </div>
              </div>
              {error && <p style={{color:'#FF8070',fontSize:'13px',marginBottom:'12px'}}>{error}</p>}
              <button
                type="button"
                onClick={goToStep2}
                style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'16px',fontSize:'16px',fontWeight:'700',cursor:'pointer',width:'100%',WebkitAppearance:'none'}}
              >
                Continue →
              </button>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textAlign:'center',marginTop:'16px'}}>
                Already have an account? <Link href="/login" style={{color:'#C42020',textDecoration:'none'}}>Sign in</Link>
              </p>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'6px'}}>Tell us about yourself</h2>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'20px'}}>Step 2 of 3 · Helps us personalize your experience</p>
              <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Your Country</label>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                    {[
                      {value:'Bangladesh',flag:'🇧🇩',label:'Bangladesh'},
                      {value:'Nepal',flag:'🇳🇵',label:'Nepal'},
                      {value:'India',flag:'🇮🇳',label:'India'},
                      {value:'Other',flag:'🌍',label:'Other'},
                    ].map(c => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={()=>update('country', c.value)}
                        style={{background: form.country===c.value ? 'rgba(196,32,32,0.2)' : '#0D0907',border:'2px solid ' + (form.country===c.value ? '#C42020' : 'rgba(255,255,255,0.15)'),borderRadius:'8px',padding:'12px',color:'white',cursor:'pointer',fontSize:'14px',fontWeight: form.country===c.value ? '700' : '400',WebkitAppearance:'none'}}
                      >
                        {c.flag} {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Your Goal in Japan</label>
                  <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                    {[
                      {value:'study',icon:'🎓',label:'Study at language school'},
                      {value:'work_ssw',icon:'🏭',label:'Work with SSW visa'},
                      {value:'work_engineer',icon:'💻',label:'Work as IT/Engineer'},
                      {value:'explore',icon:'🔍',label:'Just exploring options'},
                    ].map(p => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={()=>update('purpose', p.value)}
                        style={{background: form.purpose===p.value ? 'rgba(196,32,32,0.2)' : '#0D0907',border:'2px solid ' + (form.purpose===p.value ? '#C42020' : 'rgba(255,255,255,0.15)'),borderRadius:'8px',padding:'12px 16px',color:'white',cursor:'pointer',fontSize:'14px',fontWeight: form.purpose===p.value ? '700' : '400',textAlign:'left',display:'flex',gap:'10px',alignItems:'center',WebkitAppearance:'none'}}
                      >
                        <span>{p.icon}</span>{p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {error && <p style={{color:'#FF8070',fontSize:'13px',marginBottom:'12px'}}>{error}</p>}
              <div style={{display:'flex',gap:'10px'}}>
                <button
                  type="button"
                  onClick={()=>setStep(1)}
                  style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',cursor:'pointer',flex:1,WebkitAppearance:'none'}}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={goToStep3}
                  style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:2,WebkitAppearance:'none'}}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'6px'}}>Your Japanese level?</h2>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'20px'}}>Step 3 of 3 · We'll recommend the right schools</p>
              <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'20px'}}>
                {[
                  {value:'none',icon:'🔰',label:'Complete Beginner',desc:'Never studied Japanese'},
                  {value:'n5',icon:'⭐',label:'JLPT N5',desc:'Basic level'},
                  {value:'n4',icon:'⭐⭐',label:'JLPT N4',desc:'Elementary level'},
                  {value:'n3',icon:'⭐⭐⭐',label:'JLPT N3',desc:'Intermediate level'},
                  {value:'n2_above',icon:'🏆',label:'N2 or above',desc:'Advanced level'},
                ].map(l => (
                  <button
                    key={l.value}
                    type="button"
                    onClick={()=>update('japanese_level', l.value)}
                    style={{background: form.japanese_level===l.value ? 'rgba(196,32,32,0.2)' : '#0D0907',border:'2px solid ' + (form.japanese_level===l.value ? '#C42020' : 'rgba(255,255,255,0.15)'),borderRadius:'8px',padding:'12px 16px',color:'white',cursor:'pointer',textAlign:'left',display:'flex',gap:'12px',alignItems:'center',WebkitAppearance:'none'}}
                  >
                    <span style={{fontSize:'20px'}}>{l.icon}</span>
                    <div>
                      <div style={{fontSize:'14px',fontWeight:'700'}}>{l.label}</div>
                      <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)'}}>{l.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              {error && <p style={{color:'#FF8070',fontSize:'13px',marginBottom:'12px'}}>{error}</p>}
              <div style={{display:'flex',gap:'10px'}}>
                <button
                  type="button"
                  onClick={()=>setStep(2)}
                  style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',cursor:'pointer',flex:1,WebkitAppearance:'none'}}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={loading}
                  style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: loading ? 'not-allowed' : 'pointer',flex:2,WebkitAppearance:'none',opacity: loading ? 0.8 : 1}}
                >
                  {loading ? 'Creating account...' : 'Create Account 🌸'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'64px',marginBottom:'16px'}}>🎉</div>
              <h2 style={{color:'#2EC87A',fontSize:'22px',fontWeight:'700',marginBottom:'8px'}}>Welcome to Japan Life Guide!</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'8px'}}>Your account has been created successfully!</p>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'24px'}}>Check your email for a confirmation link.</p>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'14px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'block',textAlign:'center'}}>
                  🏫 Browse 724+ Schools
                </a>
                <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'14px',borderRadius:'8px',fontSize:'14px',display:'block',textAlign:'center',border:'1px solid rgba(255,255,255,0.15)'}}>
                  🌸 Ask Sakura AI
                </a>
                <a href="/dashboard" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none',fontSize:'13px',display:'block',textAlign:'center',marginTop:'4px'}}>
                  Go to Dashboard →
                </a>
              </div>
            </div>
          )}
        </div>

        {step < 4 && (
          <div style={{display:'flex',gap:'16px',justifyContent:'center',marginTop:'20px',flexWrap:'wrap'}}>
            {['🔒 Secure','🆓 Free Forever','🌸 AI Powered'].map(badge => (
              <span key={badge} style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{badge}</span>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  )
}