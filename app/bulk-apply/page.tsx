'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function BulkApplyPage() {
const [user, setUser] = useState<any>(null)
const [schools, setSchools] = useState<any[]>([])
const [selected, setSelected] = useState<string[]>([])
const [loading, setLoading] = useState(true)
const [sending, setSending] = useState(false)
const [sent, setSent] = useState(false)
const [results, setResults] = useState<any[]>([])
const [search, setSearch] = useState('')
const [form, setForm] = useState({
fullName: '',
email: '',
country: '',
japaneseLevel: '',
intendedStart: '',
motivation: '',
})

useEffect(() => {
async function load() {
const { data: userData } = await supabase.auth.getUser()
if (!userData.user) { window.location.href = '/login'; return }
setUser(userData.user)
setForm(prev => ({
...prev,
fullName: userData.user.user_metadata?.full_name || '',
email: userData.user.email || '',
country: userData.user.user_metadata?.country || '',
}))

const { data } = await supabase
.from('schools')
.select('id, name_en, name_jp, city, region, icon, annual_fee_jpy, contact_email, has_dorm, jlpt_prep')
.eq('data_verified', true)
.not('contact_email', 'is', null)
.order('rating', { ascending: false })
.limit(200)
if (data) setSchools(data)
setLoading(false)
}
load()
}, [])

function toggleSchool(id: string) {
if (selected.includes(id)) {
setSelected(prev => prev.filter(s => s !== id))
} else if (selected.length < 10) {
setSelected(prev => [...prev, id])
}
}

async function handleBulkSend() {
if (selected.length === 0 || !form.fullName || !form.email) return
setSending(true)
try {
const response = await fetch('/api/bulk-inquiry', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
schoolIds: selected,
studentInfo: form,
}),
})
const data = await response.json()
setResults(data.results || [])
setSent(true)
} catch (error) {
console.error(error)
}
setSending(false)
}

const filtered = schools.filter(s =>
!search || s.name_en?.toLowerCase().includes(search.toLowerCase()) || s.city?.toLowerCase().includes(search.toLowerCase())
)

if (sent) {
return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
<div style={{background:'#1A2035',borderRadius:'16px',padding:'40px',maxWidth:'560px',width:'100%',textAlign:'center',border:'1px solid rgba(46,200,122,0.3)'}}>
<div style={{fontSize:'56px',marginBottom:'16px'}}>🎉</div>
<h2 style={{color:'#2EC87A',fontSize:'22px',fontWeight:'700',marginBottom:'8px'}}>Inquiries Sent!</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px'}}>
Successfully sent to {results.filter(r => r.success).length} schools!
</p>
<div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'24px',textAlign:'left'}}>
{results.map((result, i) => (
<div key={i} style={{display:'flex',gap:'10px',alignItems:'center',background:'#0D0907',borderRadius:'8px',padding:'10px 14px'}}>
<span style={{color: result.success ? '#2EC87A' : '#FF8070',fontSize:'16px'}}>{result.success ? '✅' : '❌'}</span>
<span style={{color:'white',fontSize:'13px',flex:1}}>{result.schoolName}</span>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{result.success ? 'Sent' : 'Failed'}</span>
</div>
))}
</div>
<div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
<a href="/applications" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>
View Applications
</a>
<a href="/schools" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)'}}>
Browse More Schools
</a>
</div>
</div>
</main>
)
}

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>📨 Bulk School Inquiry</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>Send inquiries to multiple schools at once with AI-generated personalized emails</p>
<div style={{display:'inline-flex',gap:'12px',flexWrap:'wrap',justifyContent:'center'}}>
<span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>✅ AI Personalized</span>
<span style={{background:'rgba(74,142,255,0.2)',color:'#4A8EFF',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>📧 Auto Email</span>
<span style={{background:'rgba(240,168,48,0.2)',color:'#F0A830',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>🏫 Up to 10 schools</span>
</div>
</div>

<div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px',display:'grid',gridTemplateColumns:'1fr 340px',gap:'24px'}}>

{/* Schools List */}
<div>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px',flexWrap:'wrap',gap:'8px'}}>
<h2 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>Select Schools ({selected.length}/10)</h2>
{selected.length > 0 && (
<button onClick={()=>setSelected([])} style={{background:'none',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'6px 14px',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'12px'}}>
Clear all
</button>
)}
</div>

<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search schools..." style={{width:'100%',background:'#1A2035',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none',marginBottom:'14px'}}/>

{loading ? (
<div style={{textAlign:'center',padding:'48px',color:'rgba(255,255,255,0.4)'}}>Loading schools with contact info...</div>
) : (
<div style={{display:'flex',flexDirection:'column',gap:'8px',maxHeight:'600px',overflowY:'auto'}}>
{filtered.length === 0 ? (
<div style={{textAlign:'center',padding:'32px',color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No schools found</div>
) : filtered.map(school => {
const isSelected = selected.includes(school.id)
const isDisabled = !isSelected && selected.length >= 10
return (
<div key={school.id} onClick={()=>!isDisabled && toggleSchool(school.id)} style={{background: isSelected ? 'rgba(196,32,32,0.1)' : '#1A2035',borderRadius:'10px',padding:'12px 14px',border:'2px solid ' + (isSelected ? '#C42020' : 'rgba(255,255,255,0.06)'),cursor: isDisabled ? 'not-allowed' : 'pointer',opacity: isDisabled ? 0.5 : 1,display:'flex',gap:'12px',alignItems:'center'}}>
<div style={{width:'22px',height:'22px',borderRadius:'50%',border:'2px solid ' + (isSelected ? '#C42020' : 'rgba(255,255,255,0.3)'),background: isSelected ? '#C42020' : 'none',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'11px',flexShrink:0}}>
{isSelected ? '✓' : ''}
</div>
<span style={{fontSize:'22px'}}>{school.icon || '🏫'}</span>
<div style={{flex:1}}>
<div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{school.name_en}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>📍 {school.city} · {school.annual_fee_jpy ? '¥'+school.annual_fee_jpy.toLocaleString() : 'Contact school'}</div>
</div>
<div style={{display:'flex',gap:'4px',flexWrap:'wrap',justifyContent:'flex-end'}}>
{school.has_dorm && <span style={{background:'rgba(74,142,255,0.15)',color:'#4A8EFF',padding:'2px 6px',borderRadius:'4px',fontSize:'9px',fontWeight:'700'}}>DORM</span>}
{school.jlpt_prep && <span style={{background:'rgba(46,200,122,0.15)',color:'#2EC87A',padding:'2px 6px',borderRadius:'4px',fontSize:'9px',fontWeight:'700'}}>JLPT</span>}
<span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'2px 6px',borderRadius:'4px',fontSize:'9px',fontWeight:'700'}}>📧</span>
</div>
</div>
)
})}
</div>
)}
</div>

{/* Form */}
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
<div style={{background:'#1A2035',borderRadius:'14px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)',position:'sticky',top:'80px'}}>
<h2 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>Your Information</h2>
<div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',display:'block',marginBottom:'4px'}}>Full Name *</label>
<input value={form.fullName} onChange={e=>setForm(p=>({...p,fullName:e.target.value}))} placeholder="Your name" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'6px',padding:'10px',color:'white',fontSize:'13px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',display:'block',marginBottom:'4px'}}>Email *</label>
<input value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="your@email.com" type="email" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'6px',padding:'10px',color:'white',fontSize:'13px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',display:'block',marginBottom:'4px'}}>Country</label>
<select value={form.country} onChange={e=>setForm(p=>({...p,country:e.target.value}))} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'6px',padding:'10px',color:'white',fontSize:'13px',outline:'none'}}>
<option value="">Select...</option>
<option value="Bangladesh">🇧🇩 Bangladesh</option>
<option value="Nepal">🇳🇵 Nepal</option>
<option value="Other">🌍 Other</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',display:'block',marginBottom:'4px'}}>Japanese Level</label>
<select value={form.japaneseLevel} onChange={e=>setForm(p=>({...p,japaneseLevel:e.target.value}))} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'6px',padding:'10px',color:'white',fontSize:'13px',outline:'none'}}>
<option value="">Select...</option>
<option value="Beginner">Beginner</option>
<option value="N5">JLPT N5</option>
<option value="N4">JLPT N4</option>
<option value="N3">JLPT N3</option>
<option value="N2+">JLPT N2+</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',display:'block',marginBottom:'4px'}}>Intended Start</label>
<select value={form.intendedStart} onChange={e=>setForm(p=>({...p,intendedStart:e.target.value}))} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'6px',padding:'10px',color:'white',fontSize:'13px',outline:'none'}}>
<option value="">Select...</option>
<option value="January">January Intake</option>
<option value="April">April Intake</option>
<option value="July">July Intake</option>
<option value="October">October Intake</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',display:'block',marginBottom:'4px'}}>Motivation</label>
<textarea value={form.motivation} onChange={e=>setForm(p=>({...p,motivation:e.target.value}))} placeholder="Why do you want to study in Japan?" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'6px',padding:'10px',color:'white',fontSize:'13px',outline:'none',resize:'vertical',minHeight:'70px'}}/>
</div>
</div>

{selected.length > 0 && (
<div style={{background:'rgba(196,32,32,0.1)',borderRadius:'8px',padding:'10px',marginBottom:'12px'}}>
<p style={{color:'#FF8070',fontSize:'12px',fontWeight:'700',marginBottom:'6px'}}>Selected Schools ({selected.length}):</p>
{selected.map(id => {
const school = schools.find(s => s.id === id)
return school ? (
<p key={id} style={{color:'rgba(255,255,255,0.6)',fontSize:'11px',marginBottom:'2px'}}>• {school.name_en}</p>
) : null
})}
</div>
)}

<button onClick={handleBulkSend} disabled={selected.length===0||!form.fullName||!form.email||sending} style={{background: selected.length>0&&form.fullName&&form.email ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: selected.length>0&&form.fullName&&form.email ? 'pointer' : 'not-allowed',width:'100%'}}>
{sending ? '🤖 Sending...' : `Send to ${selected.length} School${selected.length!==1?'s':''} 📨`}
</button>

<p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',textAlign:'center',marginTop:'8px'}}>
Only schools with contact emails shown
</p>
</div>
</div>
</div>
</main>
)
}

