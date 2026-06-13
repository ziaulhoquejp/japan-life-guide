'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [user, setUser] = useState<any>(null)
  const [schools, setSchools] = useState<any[]>([])
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Bangladesh',
    dateOfBirth: '',
    passportNumber: '',
    japaneseLevel: 'None',
    jlptLevel: 'None',
    education: 'High School',
    budget: '500000',
    preferredCity: 'Tokyo',
    preferredSchool: '',
    startDate: 'April 2026',
    hasDorm: false,
    needScholarship: false,
    hasPassport: false,
    hasBankStatement: false,
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      const params = new URLSearchParams(window.location.search)
const schoolId = params.get('school')
if (schoolId) setForm(prev=>({...prev, preferredSchool: schoolId}))

      const { data: userData } = await supabase.auth.getUser()
      if (userData.user) {
        setUser(userData.user)
        setForm(prev => ({
          ...prev,
          fullName: userData.user.user_metadata?.full_name || '',
          email: userData.user.email || '',
        }))
      }
      const { data: schoolsData } = await supabase.from('schools').select('id, name_en, city, icon, annual_fee_jpy').order('rating', { ascending: false }).limit(100)
      if (schoolsData) setSchools(schoolsData)
    }
    getData()
  }, [])

  function update(key: string, value: any) {
    setForm(prev => ({...prev, [key]: value}))
  }

  async function handleSubmit() {
    setLoading(true)
    await supabase.from('feedback').insert({
      message: JSON.stringify({...form, userId: user?.id, submittedAt: new Date().toISOString()}),
      type: 'application',
      user_id: user?.id || null,
    })
    if (form.preferredSchool && user) {
      await supabase.from('applications').insert({
        user_id: user.id,
        school_id: form.preferredSchool,
        status: 'pending',
        notes: form.message,
      })
    }
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',padding:'20px'}}>
      <div style={{textAlign:'center',maxWidth:'500px'}}>
        <div style={{fontSize:'80px',marginBottom:'20px'}}>🎌</div>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'12px'}}>Application Submitted!</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'8px'}}>Thank you for your application!</p>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'32px'}}>We will review your application and match you with the best schools within 24-48 hours. Check your email for updates.</p>
        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>Next Steps</h3>
          {[
            {step:'1',label:'We review your application',time:'Within 24 hours'},
            {step:'2',label:'School matching recommendations',time:'Within 48 hours'},
            {step:'3',label:'School application submission',time:'Week 1-2'},
            {step:'4',label:'COE application by school',time:'4-8 weeks'},
          ].map(item=>(
            <div key={item.step} style={{display:'flex',gap:'12px',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{width:'24px',height:'24px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'11px',fontWeight:'700',flexShrink:0}}>{item.step}</div>
              <div style={{flex:1}}>
                <div style={{color:'white',fontSize:'13px'}}>{item.label}</div>
                <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/applications" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontWeight:'700',fontSize:'14px'}}>Track Application</a>
          <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )

  const totalSteps = 4

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Apply to Japan Schools</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'20px'}}>Complete your application in 4 easy steps</p>
        <div style={{display:'flex',justifyContent:'center',gap:'8px',alignItems:'center'}}>
          {Array.from({length:totalSteps}).map((_,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:step>i+1?'#2EC87A':step===i+1?'#C42020':'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'13px',fontWeight:'700'}}>
                {step>i+1?'✓':i+1}
              </div>
              {i < totalSteps-1 && <div style={{width:'32px',height:'2px',background:step>i+1?'#2EC87A':'rgba(255,255,255,0.1)'}}/>}
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:'32px',marginTop:'8px'}}>
          {['Personal Info','Education','Preferences','Documents'].map((label,i)=>(
            <span key={i} style={{color:step===i+1?'white':'rgba(255,255,255,0.3)',fontSize:'11px',fontWeight:step===i+1?'700':'400'}}>{label}</span>
          ))}
        </div>
      </div>

      <div style={{maxWidth:'600px',margin:'0 auto',padding:'40px 20px'}}>
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>

          {step === 1 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>Personal Information</h2>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Full Name</label>
                <input value={form.fullName} onChange={e=>update('fullName',e.target.value)} placeholder="Your full name" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Email Address</label>
                <input type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="your@email.com" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Phone Number</label>
                <input value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="+880 1XXX XXXXXX" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Date of Birth</label>
                <input type="date" value={form.dateOfBirth} onChange={e=>update('dateOfBirth',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Your Country</label>
                <div style={{display:'flex',gap:'8px'}}>
                  {[{code:'Bangladesh',flag:'🇧🇩'},{code:'Nepal',flag:'🇳🇵'},{code:'Other',flag:'🌍'}].map(c=>(
                    <button key={c.code} onClick={()=>update('country',c.code)} style={{flex:1,background:form.country===c.code?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (form.country===c.code?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'10px',color:'white',fontSize:'12px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
                      <span style={{fontSize:'20px'}}>{c.flag}</span>
                      <span>{c.code}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={()=>setStep(2)} disabled={!form.fullName||!form.email} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',marginTop:'8px'}}>
                Next Step →
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>Education & Japanese Level</h2>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Highest Education Level</label>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {['High School','Diploma','Bachelor Degree','Master Degree','PhD'].map(edu=>(
                    <button key={edu} onClick={()=>update('education',edu)} style={{background:form.education===edu?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (form.education===edu?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',cursor:'pointer',textAlign:'left'}}>
                      {edu}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Japanese Level</label>
                <select value={form.japaneseLevel} onChange={e=>update('japaneseLevel',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                  <option value="None">No Japanese</option>
                  <option value="Beginner">Beginner (Hiragana/Katakana)</option>
                  <option value="N5">N5 - Basic</option>
                  <option value="N4">N4 - Elementary</option>
                  <option value="N3">N3 - Intermediate</option>
                  <option value="N2">N2 - Upper Intermediate</option>
                  <option value="N1">N1 - Advanced</option>
                </select>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>JLPT Certificate (if any)</label>
                <select value={form.jlptLevel} onChange={e=>update('jlptLevel',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                  <option value="None">No JLPT Certificate</option>
                  <option value="N5">JLPT N5</option>
                  <option value="N4">JLPT N4</option>
                  <option value="N3">JLPT N3</option>
                  <option value="N2">JLPT N2</option>
                  <option value="N1">JLPT N1</option>
                </select>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(1)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',cursor:'pointer',flex:1}}>Back</button>
                <button onClick={()=>setStep(3)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',flex:2}}>Next Step →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>School Preferences</h2>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Preferred School (optional)</label>
                <select value={form.preferredSchool} onChange={e=>update('preferredSchool',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                  <option value="">No preference - help me choose!</option>
                  {schools.map(s=>(
                    <option key={s.id} value={s.id}>{s.icon} {s.name_en} - {s.city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Preferred City</label>
                <select value={form.preferredCity} onChange={e=>update('preferredCity',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                  {['Tokyo','Osaka','Kyoto','Sapporo','Fukuoka','Nagoya','Any City'].map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Annual Budget</label>
                <select value={form.budget} onChange={e=>update('budget',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                  <option value="400000">Under ¥400,000</option>
                  <option value="500000">Under ¥500,000</option>
                  <option value="600000">Under ¥600,000</option>
                  <option value="700000">Under ¥700,000</option>
                  <option value="any">Any Budget</option>
                </select>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Preferred Start Date</label>
                <select value={form.startDate} onChange={e=>update('startDate',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                  {['October 2025','January 2026','April 2026','July 2026','October 2026'].map(d=><option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>update('hasDorm',!form.hasDorm)} style={{background:form.hasDorm?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (form.hasDorm?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'12px',color:form.hasDorm?'#FF8070':'rgba(255,255,255,0.6)',fontSize:'13px',cursor:'pointer',flex:1,fontWeight:'600'}}>
                  🛏 Need Dormitory
                </button>
                <button onClick={()=>update('needScholarship',!form.needScholarship)} style={{background:form.needScholarship?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (form.needScholarship?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'12px',color:form.needScholarship?'#FF8070':'rgba(255,255,255,0.6)',fontSize:'13px',cursor:'pointer',flex:1,fontWeight:'600'}}>
                  🎓 Need Scholarship
                </button>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(2)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',cursor:'pointer',flex:1}}>Back</button>
                <button onClick={()=>setStep(4)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',flex:2}}>Next Step →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>Documents & Final Details</h2>
              <div style={{background:'#0D0907',borderRadius:'10px',padding:'16px'}}>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginBottom:'12px'}}>Please confirm which documents you currently have:</p>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {[
                    {key:'hasPassport',label:'Valid Passport (1+ year validity)'},
                    {key:'hasBankStatement',label:'Bank Statement (2,000,000+ Yen equivalent)'},
                  ].map(doc=>(
                    <button key={doc.key} onClick={()=>update(doc.key,!form[doc.key as keyof typeof form])} style={{background:(form[doc.key as keyof typeof form] as boolean)?'rgba(46,200,122,0.1)':'#1A2035',border:'1px solid ' + ((form[doc.key as keyof typeof form] as boolean)?'rgba(46,200,122,0.3)':'rgba(255,255,255,0.1)'),borderRadius:'8px',padding:'12px',color:'white',fontSize:'13px',cursor:'pointer',display:'flex',gap:'10px',alignItems:'center',textAlign:'left'}}>
                      <span style={{fontSize:'18px'}}>{(form[doc.key as keyof typeof form] as boolean)?'✅':'⬜'}</span>
                      {doc.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Additional Message (optional)</label>
                <textarea value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Any special requirements or questions?" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'80px'}}/>
              </div>

              <div style={{background:'#0D0907',borderRadius:'10px',padding:'16px'}}>
                <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>Application Summary</h3>
                {[
                  {label:'Name',value:form.fullName},
                  {label:'Country',value:form.country},
                  {label:'Education',value:form.education},
                  {label:'Japanese Level',value:form.japaneseLevel},
                  {label:'Preferred City',value:form.preferredCity},
                  {label:'Budget',value:'¥' + parseInt(form.budget||'0').toLocaleString()},
                  {label:'Start Date',value:form.startDate},
                ].map(item=>(
                  <div key={item.label} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',fontSize:'13px'}}>
                    <span style={{color:'rgba(255,255,255,0.4)'}}>{item.label}</span>
                    <span style={{color:'white',fontWeight:'600'}}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(3)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',cursor:'pointer',flex:1}}>Back</button>
                <button onClick={handleSubmit} disabled={loading} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',flex:2}}>
                  {loading ? 'Submitting...' : 'Submit Application 🌸'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}