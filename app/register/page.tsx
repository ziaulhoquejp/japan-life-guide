'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [purpose, setPurpose] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleRegister() {
    if (!email || !password || !name) { setError('Please fill in all fields!'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters!'); return }
    setLoading(true)
    setError('')

    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          country: country,
          purpose: purpose,
        }
      }
    })

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    try {
      await fetch('/api/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
    } catch {}

    setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',padding:'20px'}}>
      <div style={{textAlign:'center',maxWidth:'480px'}}>
        <div style={{fontSize:'80px',marginBottom:'20px'}}>🌸</div>
        <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'12px'}}>Welcome to Japan Life Guide!</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'8px'}}>Account created successfully!</p>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'32px'}}>Check your email for a welcome message. Please verify your email to access all features.</p>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/login" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 28px',borderRadius:'8px',fontWeight:'700',fontSize:'14px'}}>Sign In Now</a>
          <a href="/schools" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 28px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)'}}>Browse Schools</a>
        </div>
      </div>
    </main>
  )

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'480px'}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'48px',marginBottom:'12px'}}>🌸</div>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'8px'}}>Join Japan Life Guide</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Free account · No credit card needed</p>
        </div>

        <div style={{display:'flex',justifyContent:'center',gap:'8px',marginBottom:'24px'}}>
          {[1,2].map(s=>(
            <div key={s} style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:step>=s?'#C42020':'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'13px',fontWeight:'700'}}>
                {step>s?'✓':s}
              </div>
              {s < 2 && <div style={{width:'40px',height:'2px',background:step>s?'#C42020':'rgba(255,255,255,0.1)'}}/>}
            </div>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>
          {step === 1 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'4px'}}>Create Your Account</h2>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Full Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Email Address</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Password</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Minimum 6 characters" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              {error && <p style={{color:'#FF6B6B',fontSize:'13px'}}>{error}</p>}
              <button onClick={()=>{if(!name||!email||!password){setError('Please fill in all fields!');return}if(password.length<6){setError('Password must be at least 6 characters!');return}setError('');setStep(2)}} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer'}}>
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'4px'}}>Tell Us About You</h2>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Your Country</label>
                <div style={{display:'flex',gap:'8px'}}>
                  {[
                    {code:'Bangladesh',flag:'🇧🇩'},
                    {code:'Nepal',flag:'🇳🇵'},
                    {code:'Other',flag:'🌍'},
                  ].map(c=>(
                    <button key={c.code} onClick={()=>setCountry(c.code)} style={{flex:1,background:country===c.code?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (country===c.code?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'12px',color:'white',fontSize:'13px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
                      <span style={{fontSize:'24px'}}>{c.flag}</span>
                      <span>{c.code}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Your Goal in Japan</label>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {[
                    {value:'study',icon:'🏫',label:'Study at Language School'},
                    {value:'work_ssw',icon:'🏭',label:'Work (SSW Visa)'},
                    {value:'work_engineer',icon:'💻',label:'Work (Engineer Visa)'},
                    {value:'explore',icon:'🌸',label:'Just Exploring'},
                  ].map(p=>(
                    <button key={p.value} onClick={()=>setPurpose(p.value)} style={{background:purpose===p.value?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (purpose===p.value?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'12px 16px',color:'white',fontSize:'13px',cursor:'pointer',display:'flex',alignItems:'center',gap:'10px',textAlign:'left'}}>
                      <span style={{fontSize:'20px'}}>{p.icon}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              {error && <p style={{color:'#FF6B6B',fontSize:'13px'}}>{error}</p>}
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(1)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',cursor:'pointer',flex:1}}>
                  Back
                </button>
                <button onClick={handleRegister} disabled={loading} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',flex:2}}>
                  {loading ? 'Creating Account...' : 'Create Account 🌸'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{marginTop:'20px',textAlign:'center'}}>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>
            Already have an account?{' '}
            <a href="/login" style={{color:'#C42020',textDecoration:'none',fontWeight:'600'}}>Sign In</a>
          </p>
        </div>

        <div style={{marginTop:'24px',background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.06)'}}>
          <p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',textAlign:'center',marginBottom:'12px'}}>What you get for FREE</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            {['500+ Schools','Sakura AI Chat','Visa Guide','Community','Job Listings','Scholarships'].map(feature=>(
              <div key={feature} style={{display:'flex',gap:'6px',alignItems:'center',color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>
                <span style={{color:'#2EC87A'}}>✓</span>{feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}