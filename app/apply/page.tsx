'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Bangladesh',
    japaneseLevel: 'N5',
    budget: '500000',
    preferredCity: 'Tokyo',
    startDate: 'April 2025',
    hasDorm: false,
    needScholarship: false,
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function update(key: string, value: any) {
    setForm(prev => ({...prev, [key]: value}))
  }

  async function handleSubmit() {
    setLoading(true)
    await supabase.from('feedback').insert({
      message: JSON.stringify(form),
      type: 'application',
    })
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center',padding:'48px'}}>
        <div style={{fontSize:'80px',marginBottom:'16px'}}>🎌</div>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Application Submitted!</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'32px'}}>We will match you with the best schools within 24 hours.</p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontWeight:'700'}}>Browse Schools</a>
          <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura</a>
        </div>
      </div>
    </main>
  )

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Apply to Japan Schools</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Tell us about yourself and we will find the perfect school!</p>
        <div style={{display:'flex',justifyContent:'center',gap:'8px',marginTop:'20px'}}>
          {[1,2,3].map(s=>(
            <div key={s} style={{width:'32px',height:'32px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:'700',background:step>=s?'#C42020':'rgba(255,255,255,0.1)',color:'white'}}>
              {s}
            </div>
          ))}
        </div>
      </div>

      <div style={{maxWidth:'600px',margin:'0 auto',padding:'40px 20px'}}>
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>

          {step === 1 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Personal Information</h2>
              <input value={form.fullName} onChange={e=>update('fullName',e.target.value)} placeholder="Full Name" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              <input type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="Email Address" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              <input value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="Phone Number" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              <select value={form.country} onChange={e=>update('country',e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
                <option value="Other">Other</option>
              </select>
              <button onClick={()=>setStep(2)} disabled={!form.fullName||!form.email} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',marginTop:'8px'}}>
                Next Step →
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>School Preferences</h2>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Japanese Level</label>
                <select value={form.japaneseLevel} onChange={e=>update('japaneseLevel',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                  <option value="N5">N5 - Beginner</option>
                  <option value="N4">N4 - Elementary</option>
                  <option value="N3">N3 - Intermediate</option>
                  <option value="N2">N2 - Upper Intermediate</option>
                  <option value="N1">N1 - Advanced</option>
                  <option value="None">No Japanese</option>
                </select>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Budget (Annual)</label>
                <select value={form.budget} onChange={e=>update('budget',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                  <option value="500000">Under 500,000 Yen</option>
                  <option value="600000">Under 600,000 Yen</option>
                  <option value="700000">Under 700,000 Yen</option>
                  <option value="800000">Under 800,000 Yen</option>
                  <option value="any">Any Budget</option>
                </select>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Preferred City</label>
                <select value={form.preferredCity} onChange={e=>update('preferredCity',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                  <option value="Tokyo">Tokyo</option>
                  <option value="Osaka">Osaka</option>
                  <option value="Kyoto">Kyoto</option>
                  <option value="Sapporo">Sapporo</option>
                  <option value="Fukuoka">Fukuoka</option>
                  <option value="Any">Any City</option>
                </select>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Start Date</label>
                <select value={form.startDate} onChange={e=>update('startDate',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                  <option value="April 2025">April 2025</option>
                  <option value="July 2025">July 2025</option>
                  <option value="October 2025">October 2025</option>
                  <option value="January 2026">January 2026</option>
                  <option value="April 2026">April 2026</option>
                </select>
              </div>
              <div style={{display:'flex',gap:'12px'}}>
                <button onClick={()=>setStep(1)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'14px',fontSize:'15px',cursor:'pointer',flex:1}}>
                  Back
                </button>
                <button onClick={()=>setStep(3)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',flex:2}}>
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Final Details</h2>
              <div style={{display:'flex',gap:'12px'}}>
                <button onClick={()=>update('hasDorm',!form.hasDorm)} style={{background:form.hasDorm?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (form.hasDorm?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'12px',color:form.hasDorm?'#FF8070':'rgba(255,255,255,0.6)',fontSize:'13px',fontWeight:'600',cursor:'pointer',flex:1}}>
                  Need Dormitory
                </button>
                <button onClick={()=>update('needScholarship',!form.needScholarship)} style={{background:form.needScholarship?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (form.needScholarship?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'12px',color:form.needScholarship?'#FF8070':'rgba(255,255,255,0.6)',fontSize:'13px',fontWeight:'600',cursor:'pointer',flex:1}}>
                  Need Scholarship
                </button>
              </div>
              <textarea value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Any additional information or questions..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'100px'}}/>

              <div style={{background:'#0D0907',borderRadius:'8px',padding:'16px'}}>
                <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>Application Summary</h3>
                {[
                  {label:'Name',value:form.fullName},
                  {label:'Country',value:form.country},
                  {label:'Japanese Level',value:form.japaneseLevel},
                  {label:'Budget',value:'Yen ' + parseInt(form.budget).toLocaleString()},
                  {label:'City',value:form.preferredCity},
                  {label:'Start Date',value:form.startDate},
                ].map(item=>(
                  <div key={item.label} style={{display:'flex',justifyContent:'space-between',marginBottom:'6px',fontSize:'13px'}}>
                    <span style={{color:'rgba(255,255,255,0.4)'}}>{item.label}</span>
                    <span style={{color:'white'}}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div style={{display:'flex',gap:'12px'}}>
                <button onClick={()=>setStep(2)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'14px',fontSize:'15px',cursor:'pointer',flex:1}}>
                  Back
                </button>
                <button onClick={handleSubmit} disabled={loading} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',flex:2}}>
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}