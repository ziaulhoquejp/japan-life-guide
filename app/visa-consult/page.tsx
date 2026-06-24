'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function VisaConsultPage() {
const [user, setUser] = useState<any>(null)
const [step, setStep] = useState(1)
const [submitting, setSubmitting] = useState(false)
const [submitted, setSubmitted] = useState(false)
const [result, setResult] = useState<any>(null)
const [form, setForm] = useState({
userName: '',
userEmail: '',
userCountry: '',
visaType: '',
japaneseLevel: '',
situation: '',
})

useEffect(() => {
supabase.auth.getUser().then(({ data }) => {
if (data.user) {
setUser(data.user)
setForm(prev => ({
...prev,
userName: data.user.user_metadata?.full_name || '',
userEmail: data.user.email || '',
userCountry: data.user.user_metadata?.country || '',
}))
}
})
}, [])

function update(field: string, value: string) {
setForm(prev => ({...prev, [field]: value}))
}

async function handleSubmit() {
setSubmitting(true)
try {
const response = await fetch('/api/visa-consult', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(form),
})
const data = await response.json()
setResult(data)
setSubmitted(true)
} catch (error) {
console.error('Error:', error)
}
setSubmitting(false)
}

if (submitted && result) {
return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
<div style={{background:'#1A2035',borderRadius:'16px',padding:'40px',maxWidth:'560px',width:'100%',border:'1px solid rgba(46,200,122,0.3)'}}>
<div style={{textAlign:'center',marginBottom:'24px'}}>
<div style={{fontSize:'56px',marginBottom:'12px'}}>🌸</div>
<h2 style={{color:'#2EC87A',fontSize:'22px',fontWeight:'700',marginBottom:'8px'}}>Consultation Request Sent!</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px'}}>We have matched you with an immigration specialist</p>
</div>

<div style={{background:'#0D0907',borderRadius:'12px',padding:'20px',marginBottom:'16px'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'4px'}}>Matched Specialist</p>
<p style={{color:'white',fontSize:'16px',fontWeight:'700'}}>👨‍💼 {result.recommendedLawyer}</p>
</div>

<div style={{background:'rgba(74,142,255,0.1)',borderRadius:'12px',padding:'16px',marginBottom:'16px',border:'1px solid rgba(74,142,255,0.2)'}}>
<p style={{color:'#4A8EFF',fontSize:'12px',fontWeight:'700',marginBottom:'8px'}}>🤖 AI Analysis</p>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>{result.analysis}</p>
</div>

<div style={{background:'rgba(240,168,48,0.1)',borderRadius:'12px',padding:'16px',marginBottom:'24px',border:'1px solid rgba(240,168,48,0.2)'}}>
<p style={{color:'#F0A830',fontSize:'12px',fontWeight:'700',marginBottom:'8px'}}>📋 What to Prepare</p>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>{result.advice}</p>
</div>

<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textAlign:'center',marginBottom:'16px'}}>
Check your email at <strong style={{color:'white'}}>{form.userEmail}</strong> for confirmation
</p>

<div style={{display:'flex',gap:'10px'}}>
<a href="/visa" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px',borderRadius:'8px',fontSize:'13px',flex:1,textAlign:'center',border:'1px solid rgba(255,255,255,0.15)'}}>Visa Guide</a>
<a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',flex:2,textAlign:'center'}}>Ask Sakura AI 🌸</a>
</div>
</div>
</main>
)
}

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Free Visa Consultation</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>Get matched with a Japan immigration specialist</p>
<p style={{color:'#2EC87A',fontSize:'13px'}}>🤖 AI-powered matching · 📧 Auto email · 👨‍💼 Expert advice</p>
</div>

<div style={{maxWidth:'600px',margin:'0 auto',padding:'32px 20px'}}>

{/* Progress */}
<div style={{display:'flex',gap:'8px',marginBottom:'28px'}}>
{[1,2,3].map(s => (
<div key={s} style={{flex:1,height:'4px',borderRadius:'2px',background: s <= step ? '#C42020' : 'rgba(255,255,255,0.1)'}}/>
))}
</div>

<div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>

{/* Step 1: Personal Info */}
{step === 1 && (
<div>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>1. Your Information</h2>
<div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
<input value={form.userName} onChange={e=>update('userName', e.target.value)} placeholder="Full Name" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
<input value={form.userEmail} onChange={e=>update('userEmail', e.target.value)} placeholder="Email Address" type="email" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
<select value={form.userCountry} onChange={e=>update('userCountry', e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select Country...</option>
<option value="Bangladesh">🇧🇩 Bangladesh</option>
<option value="Nepal">🇳🇵 Nepal</option>
<option value="Other">Other</option>
</select>
</div>
<button onClick={()=>setStep(2)} disabled={!form.userName||!form.userEmail||!form.userCountry} style={{background: form.userName&&form.userEmail&&form.userCountry ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: form.userName&&form.userEmail&&form.userCountry ? 'pointer' : 'not-allowed',width:'100%'}}>
Continue →
</button>
</div>
)}

{/* Step 2: Visa Type */}
{step === 2 && (
<div>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>2. Visa Information</h2>
<div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Visa Type Needed</label>
<select value={form.visaType} onChange={e=>update('visaType', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select visa type...</option>
<option value="Student Visa">🎓 Student Visa (留学ビザ)</option>
<option value="SSW Visa Type 1">🏭 SSW Visa Type 1 (特定技能1号)</option>
<option value="SSW Visa Type 2">⭐ SSW Visa Type 2 (特定技能2号)</option>
<option value="Engineer Visa">💻 Engineer/Specialist Visa</option>
<option value="Work Visa">💼 Work Visa</option>
<option value="PR">🏠 Permanent Residency</option>
<option value="Other">❓ Not sure / Other</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Japanese Language Level</label>
<select value={form.japaneseLevel} onChange={e=>update('japaneseLevel', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select level...</option>
<option value="None">Complete Beginner</option>
<option value="N5">JLPT N5</option>
<option value="N4">JLPT N4</option>
<option value="N3">JLPT N3</option>
<option value="N2">JLPT N2</option>
<option value="N1">JLPT N1</option>
</select>
</div>
</div>
<div style={{display:'flex',gap:'10px'}}>
<button onClick={()=>setStep(1)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',cursor:'pointer',flex:1}}>← Back</button>
<button onClick={()=>setStep(3)} disabled={!form.visaType||!form.japaneseLevel} style={{background: form.visaType&&form.japaneseLevel ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: form.visaType&&form.japaneseLevel ? 'pointer' : 'not-allowed',flex:2}}>
Continue →
</button>
</div>
</div>
)}

{/* Step 3: Situation */}
{step === 3 && (
<div>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>3. Your Situation</h2>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'16px'}}>Describe your current situation and what help you need</p>
<textarea value={form.situation} onChange={e=>update('situation', e.target.value)} placeholder="Example: I graduated from university in Bangladesh and want to work in Japan as an IT engineer. I have N3 Japanese and a job offer from a Tokyo company..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'140px',marginBottom:'16px'}}/>

<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'10px',padding:'14px',marginBottom:'16px',border:'1px solid rgba(46,200,122,0.2)'}}>
<p style={{color:'#2EC87A',fontSize:'12px',lineHeight:'1.6'}}>
🤖 Our AI will analyze your situation and match you with the best immigration specialist. A confirmation email will be sent to you and the specialist automatically.
</p>
</div>

<div style={{display:'flex',gap:'10px'}}>
<button onClick={()=>setStep(2)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',cursor:'pointer',flex:1}}>← Back</button>
<button onClick={handleSubmit} disabled={submitting||!form.situation} style={{background: form.situation&&!submitting ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: form.situation&&!submitting ? 'pointer' : 'not-allowed',flex:2}}>
{submitting ? '🤖 AI is processing...' : 'Get Matched Now 🌸'}
</button>
</div>
</div>
)}
</div>

<div style={{background:'rgba(255,255,255,0.04)',borderRadius:'12px',padding:'16px',marginTop:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.06)'}}>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>
This service is free. Japan Life Guide connects you with immigration specialists.
Always verify credentials before making payments to any specialist.
</p>
</div>
</div>
</main>
)
}