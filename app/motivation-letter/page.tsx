'use client'
import { useState } from 'react'

const LETTER_TYPES = [
{id:'school', icon:'🏫', title:'Language School Application', titleJP:'語学学校入学志望動機書', desc:'For applying to Japanese language schools'},
{id:'ssw', icon:'🏭', title:'SSW Visa Application', titleJP:'特定技能ビザ申請書類', desc:'For Specified Skilled Worker visa application'},
{id:'engineer', icon:'💻', title:'Job Application (Engineer)', titleJP:'エンジニア職志望動機書', desc:'For IT/Engineer job applications in Japan'},
{id:'university', icon:'🎓', title:'University Application', titleJP:'大学院・大学志望動機書', desc:'For Japanese university applications'},
]

export default function MotivationLetterPage() {
const [letterType, setLetterType] = useState('')
const [generating, setGenerating] = useState(false)
const [generated, setGenerated] = useState(false)
const [result, setResult] = useState<any>(null)
const [form, setForm] = useState({
fullName: '',
country: '',
age: '',
education: '',
workExperience: '',
japaneseLevel: '',
targetSchoolOrCompany: '',
intendedStart: '',
motivation: '',
futureGoals: '',
hobbies: '',
strengths: '',
})
const [language, setLanguage] = useState<'japanese'|'english'|'both'>('both')
const [copied, setCopied] = useState(false)

function update(field: string, value: string) {
setForm(prev => ({...prev, [field]: value}))
}

async function generateLetter() {
if (!letterType || !form.fullName || !form.motivation) return
setGenerating(true)
try {
const response = await fetch('/api/generate-letter', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ letterType, form, language }),
})
const data = await response.json()
setResult(data)
setGenerated(true)
} catch (error) {
console.error(error)
}
setGenerating(false)
}

function copyToClipboard(text: string) {
navigator.clipboard.writeText(text)
setCopied(true)
setTimeout(() => setCopied(false), 2000)
}

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>📝 AI Motivation Letter Generator</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>Generate professional Japanese motivation letters with AI</p>
<p style={{color:'#2EC87A',fontSize:'13px'}}>🤖 AI-powered · 🇯🇵 Japanese & English · ✅ Ready to use</p>
</div>

<div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>

{!generated ? (
<div>
{/* Letter Type */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>1. Select Letter Type</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'10px'}}>
{LETTER_TYPES.map(type => (
<button key={type.id} onClick={()=>setLetterType(type.id)} style={{background: letterType===type.id ? 'rgba(196,32,32,0.2)' : '#0D0907',border:'2px solid ' + (letterType===type.id ? '#C42020' : 'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'16px',cursor:'pointer',textAlign:'left'}}>
<div style={{fontSize:'28px',marginBottom:'8px'}}>{type.icon}</div>
<div style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{type.title}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>{type.titleJP}</div>
<div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{type.desc}</div>
</button>
))}
</div>
</div>

{/* Personal Info */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>2. Your Information</h2>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'12px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Full Name *</label>
<input value={form.fullName} onChange={e=>update('fullName',e.target.value)} placeholder="Your full name" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Country</label>
<select value={form.country} onChange={e=>update('country',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select...</option>
<option value="Bangladesh">🇧🇩 Bangladesh</option>
<option value="Nepal">🇳🇵 Nepal</option>
<option value="Other">🌍 Other</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Age</label>
<input value={form.age} onChange={e=>update('age',e.target.value)} placeholder="25" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Japanese Level</label>
<select value={form.japaneseLevel} onChange={e=>update('japaneseLevel',e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select...</option>
<option value="Beginner (no experience)">Beginner (no experience)</option>
<option value="JLPT N5">JLPT N5</option>
<option value="JLPT N4">JLPT N4</option>
<option value="JLPT N3">JLPT N3</option>
<option value="JLPT N2">JLPT N2</option>
<option value="JLPT N1">JLPT N1</option>
</select>
</div>
</div>
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Education Background</label>
<input value={form.education} onChange={e=>update('education',e.target.value)} placeholder="e.g. Bachelor's in Computer Science, Dhaka University 2022" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Work Experience</label>
<input value={form.workExperience} onChange={e=>update('workExperience',e.target.value)} placeholder="e.g. 2 years as software developer at XYZ company" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Target School / Company</label>
<input value={form.targetSchoolOrCompany} onChange={e=>update('targetSchoolOrCompany',e.target.value)} placeholder="e.g. Tokyo Japanese Language School" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Your Strengths</label>
<input value={form.strengths} onChange={e=>update('strengths',e.target.value)} placeholder="e.g. hardworking, adaptable, good communication skills" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Why do you want to study/work in Japan? * (Most Important)</label>
<textarea value={form.motivation} onChange={e=>update('motivation',e.target.value)} placeholder="Explain your motivation in detail. Why Japan? Why this school/company? What are your goals?" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'100px'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Future Goals after Japan</label>
<textarea value={form.futureGoals} onChange={e=>update('futureGoals',e.target.value)} placeholder="What do you plan to do after studying/working in Japan?" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'70px'}}/>
</div>
</div>
</div>

{/* Language Selection */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>3. Output Language</h2>
<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
{[
{key:'japanese' as const, label:'🇯🇵 Japanese Only'},
{key:'english' as const, label:'🇬🇧 English Only'},
{key:'both' as const, label:'🇯🇵+🇬🇧 Both Languages'},
].map(lang => (
<button key={lang.key} onClick={()=>setLanguage(lang.key)} style={{background: language===lang.key ? 'rgba(196,32,32,0.2)' : '#0D0907',border:'2px solid ' + (language===lang.key ? '#C42020' : 'rgba(255,255,255,0.08)'),borderRadius:'10px',padding:'12px 20px',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
{lang.label}
</button>
))}
</div>
</div>

<button onClick={generateLetter} disabled={!letterType||!form.fullName||!form.motivation||generating} style={{background: letterType&&form.fullName&&form.motivation ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'10px',padding:'16px',fontSize:'15px',fontWeight:'700',cursor: letterType&&form.fullName&&form.motivation ? 'pointer' : 'not-allowed',width:'100%'}}>
{generating ? '🤖 AI is writing your letter...' : 'Generate Motivation Letter 📝'}
</button>
</div>
) : (
<div>
<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'12px',padding:'16px',marginBottom:'20px',border:'1px solid rgba(46,200,122,0.2)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
<p style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700'}}>✅ Your motivation letter is ready!</p>
<div style={{display:'flex',gap:'8px'}}>
<button onClick={()=>setGenerated(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'8px 16px',fontSize:'12px',cursor:'pointer'}}>
← Edit
</button>
<button onClick={()=>generateLetter()} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'8px 16px',fontSize:'12px',fontWeight:'700',cursor:'pointer'}}>
🔄 Regenerate
</button>
</div>
</div>

{result?.japanese && (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
<h3 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>🇯🇵 Japanese Version</h3>
<button onClick={()=>copyToClipboard(result.japanese)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'8px 14px',fontSize:'12px',cursor:'pointer'}}>
{copied ? '✅ Copied!' : '📋 Copy'}
</button>
</div>
<div style={{background:'#0D0907',borderRadius:'10px',padding:'20px',whiteSpace:'pre-wrap',color:'rgba(255,255,255,0.8)',fontSize:'14px',lineHeight:'2',fontFamily:'serif'}}>
{result.japanese}
</div>
</div>
)}

{result?.english && (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
<h3 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>🇬🇧 English Version</h3>
<button onClick={()=>copyToClipboard(result.english)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'8px 14px',fontSize:'12px',cursor:'pointer'}}>
{copied ? '✅ Copied!' : '📋 Copy'}
</button>
</div>
<div style={{background:'#0D0907',borderRadius:'10px',padding:'20px',whiteSpace:'pre-wrap',color:'rgba(255,255,255,0.8)',fontSize:'14px',lineHeight:'1.8'}}>
{result.english}
</div>
</div>
)}

{result?.tips && (
<div style={{background:'rgba(240,168,48,0.1)',borderRadius:'12px',padding:'20px',marginBottom:'16px',border:'1px solid rgba(240,168,48,0.2)'}}>
<h3 style={{color:'#F0A830',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>💡 Tips for your application</h3>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7',whiteSpace:'pre-wrap'}}>{result.tips}</p>
</div>
)}

<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
<a href="/apply" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'14px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',flex:1,textAlign:'center'}}>
Apply to School Now 🏫
</a>
<a href="/jobs" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'14px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)',flex:1,textAlign:'center'}}>
Find Jobs 💼
</a>
</div>
</div>
)}
</div>
</main>
)
}

