'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../../lib/supabase'

function ApplyForm() {
  const searchParams = useSearchParams()
  const schoolIdParam = searchParams.get('school')

  const [user, setUser] = useState<any>(null)
  const [isPro, setIsPro] = useState(false)
  const [schools, setSchools] = useState<any[]>([])
  const [applicationCount, setApplicationCount] = useState(0)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    school_id: schoolIdParam || '',
    full_name: '',
    email: '',
    phone: '',
    country: '',
    date_of_birth: '',
    current_education: '',
    japanese_level: 'none',
    intended_start: '',
    motivation: '',
    funding_source: '',
  })

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) {
        window.location.href = '/login'
        return
      }
      setUser(userData.user)
      setForm(prev => ({
        ...prev,
        full_name: userData.user.user_metadata?.full_name || '',
        email: userData.user.email || '',
        country: userData.user.user_metadata?.country || '',
      }))

      const [profileData, schoolsData, appsData] = await Promise.all([
        supabase.from('profiles').select('plan').eq('id', userData.user.id).single(),
        supabase.from('schools').select('id, name_en, city, icon, annual_fee_jpy').order('name_en'),
        supabase.from('applications').select('id', { count: 'exact' }).eq('user_id', userData.user.id),
      ])

      if (profileData.data) setIsPro(profileData.data.plan === 'pro' || profileData.data.plan === 'lifetime')
      if (schoolsData.data) setSchools(schoolsData.data)
      setApplicationCount(appsData.data?.length || 0)
      setLoading(false)
    }
    load()
  }, [])

  function update(field: string, value: string) {
    setForm(prev => ({...prev, [field]: value}))
  }

  async function handleSubmit() {
    setSubmitting(true)
    await supabase.from('applications').insert({
      user_id: user.id,
      school_id: form.school_id,
      status: 'pending',
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      country: form.country,
      notes: JSON.stringify({
        date_of_birth: form.date_of_birth,
        current_education: form.current_education,
        japanese_level: form.japanese_level,
        intended_start: form.intended_start,
        motivation: form.motivation,
        funding_source: form.funding_source,
      }),
    })
    setSubmitting(false)
    setSubmitted(true)
  }

  const limitReached = !isPro && applicationCount >= 1

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  if (limitReached) {
    return (
      <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'40px',maxWidth:'440px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
          <div style={{fontSize:'48px',marginBottom:'16px'}}>🔒</div>
          <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'12px'}}>Application Limit Reached</h2>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px',lineHeight:'1.6'}}>
            Free members can submit 1 application. Upgrade to Pro for unlimited school applications.
          </p>
          <a href="/pricing" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 28px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>
            Upgrade to Pro 💎
          </a>
        </div>
      </main>
    )
  }

  if (submitted) {
    return (
      <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'40px',maxWidth:'440px',textAlign:'center',border:'1px solid rgba(46,200,122,0.3)'}}>
          <div style={{fontSize:'56px',marginBottom:'16px'}}>🌸</div>
          <h2 style={{color:'#2EC87A',fontSize:'22px',fontWeight:'700',marginBottom:'12px'}}>Application Submitted!</h2>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px',lineHeight:'1.6'}}>
            Your application has been received. You can track its status on your Applications page.
          </p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/applications" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>View Applications</a>
            <a href="/schools" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)'}}>Browse More Schools</a>
          </div>
        </div>
      </main>
    )
  }

  const selectedSchool = schools.find(s => s.id === form.school_id)

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Apply to School</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Submit your application in just a few steps</p>
      </div>

      <div style={{maxWidth:'700px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Progress */}
        <div style={{display:'flex',gap:'8px',marginBottom:'28px'}}>
          {[1,2,3,4].map(s => (
            <div key={s} style={{flex:1,height:'4px',borderRadius:'2px',background: s <= step ? '#C42020' : 'rgba(255,255,255,0.1)'}}/>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>

          {/* Step 1: School Selection */}
          {step === 1 && (
            <div>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>1. Choose a School</h2>
              <select value={form.school_id} onChange={e=>update('school_id', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',marginBottom:'16px'}}>
                <option value="">Select a school...</option>
                {schools.map(s => (
                  <option key={s.id} value={s.id}>{s.name_en} - {s.city}</option>
                ))}
              </select>
              {selectedSchool && (
                <div style={{background:'#0D0907',borderRadius:'10px',padding:'16px',display:'flex',gap:'12px',alignItems:'center',marginBottom:'16px'}}>
                  <span style={{fontSize:'32px'}}>{selectedSchool.icon || '🏫'}</span>
                  <div>
                    <div style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{selectedSchool.name_en}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{selectedSchool.city} · ¥{selectedSchool.annual_fee_jpy?.toLocaleString()}/year</div>
                  </div>
                </div>
              )}
              <button onClick={()=>setStep(2)} disabled={!form.school_id} style={{background: form.school_id ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: form.school_id ? 'pointer' : 'not-allowed',width:'100%'}}>
                Continue →
              </button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>2. Personal Information</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'16px'}}>
                <input value={form.full_name} onChange={e=>update('full_name', e.target.value)} placeholder="Full Name" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
                <input value={form.email} onChange={e=>update('email', e.target.value)} placeholder="Email" type="email" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
                <input value={form.phone} onChange={e=>update('phone', e.target.value)} placeholder="Phone Number" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
                <select value={form.country} onChange={e=>update('country', e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
                  <option value="">Select Country...</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Other">Other</option>
                </select>
                <input value={form.date_of_birth} onChange={e=>update('date_of_birth', e.target.value)} type="date" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(1)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'14px',fontSize:'14px',cursor:'pointer',flex:1}}>← Back</button>
                <button onClick={()=>setStep(3)} disabled={!form.full_name||!form.email} style={{background: form.full_name&&form.email ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: form.full_name&&form.email ? 'pointer' : 'not-allowed',flex:2}}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Academic Info */}
          {step === 3 && (
            <div>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>3. Academic Background</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'16px'}}>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Current Education Level</label>
                  <select value={form.current_education} onChange={e=>update('current_education', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
                    <option value="">Select...</option>
                    <option value="HSC/A-Level">HSC / A-Level (High School)</option>
                    <option value="Bachelor">Bachelor's Degree</option>
                    <option value="Master">Master's Degree</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Japanese Language Level</label>
                  <select value={form.japanese_level} onChange={e=>update('japanese_level', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
                    <option value="none">Complete Beginner</option>
                    <option value="n5">JLPT N5</option>
                    <option value="n4">JLPT N4</option>
                    <option value="n3">JLPT N3</option>
                    <option value="n2">JLPT N2 or higher</option>
                  </select>
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Intended Start Date</label>
                  <select value={form.intended_start} onChange={e=>update('intended_start', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
                    <option value="">Select...</option>
                    <option value="January">January Intake</option>
                    <option value="April">April Intake</option>
                    <option value="July">July Intake</option>
                    <option value="October">October Intake</option>
                  </select>
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>How will you fund your studies?</label>
                  <select value={form.funding_source} onChange={e=>update('funding_source', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
                    <option value="">Select...</option>
                    <option value="self">Self-funded / Family support</option>
                    <option value="loan">Education Loan</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="mixed">Mixed funding</option>
                  </select>
                </div>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(2)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'14px',fontSize:'14px',cursor:'pointer',flex:1}}>← Back</button>
                <button onClick={()=>setStep(4)} disabled={!form.current_education} style={{background: form.current_education ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: form.current_education ? 'pointer' : 'not-allowed',flex:2}}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Motivation */}
          {step === 4 && (
            <div>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>4. Your Motivation</h2>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'12px'}}>Tell the school why you want to study in Japan (recommended, not required)</p>
              <textarea value={form.motivation} onChange={e=>update('motivation', e.target.value)} placeholder="Why do you want to study Japanese? What are your goals in Japan?" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'120px',marginBottom:'16px'}}/>

              <div style={{background:'rgba(240,168,48,0.1)',border:'1px solid rgba(240,168,48,0.2)',borderRadius:'8px',padding:'12px',marginBottom:'16px'}}>
                <p style={{color:'#F0A830',fontSize:'12px',lineHeight:'1.6'}}>⚠️ This application will be sent through Japan Life Guide. The school will contact you directly to continue the process and request official documents.</p>
              </div>

              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(3)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'14px',fontSize:'14px',cursor:'pointer',flex:1}}>← Back</button>
                <button onClick={handleSubmit} disabled={submitting} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:2}}>
                  {submitting ? 'Submitting...' : 'Submit Application 🌸'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>}>
      <ApplyForm />
    </Suspense>
  )
}