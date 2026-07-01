'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const DOCUMENT_TYPES = [
{id:'zairyu', label:'在留カード (Residence Card)', icon:'🪪', color:'#C42020'},
{id:'passport', label:'パスポート (Passport)', icon:'📘', color:'#4A8EFF'},
{id:'student_visa', label:'学生ビザ (Student Visa)', icon:'🎓', color:'#2EC87A'},
{id:'ssw_visa', label:'特定技能ビザ (SSW Visa)', icon:'🏭', color:'#F0A830'},
{id:'engineer_visa', label:'就労ビザ (Work Visa)', icon:'💻', color:'#A855F7'},
{id:'health_insurance', label:'健康保険証 (Health Insurance)', icon:'🏥', color:'#FF8070'},
{id:'other', label:'その他 (Other)', icon:'📄', color:'rgba(255,255,255,0.5)'},
]

export default function VisaTrackerPage() {
const [user, setUser] = useState<any>(null)
const [documents, setDocuments] = useState<any[]>([])
const [loading, setLoading] = useState(true)
const [showForm, setShowForm] = useState(false)
const [saving, setSaving] = useState(false)
const [form, setForm] = useState({
document_type: '',
expiry_date: '',
notes: '',
})

useEffect(() => {
async function load() {
const { data: userData } = await supabase.auth.getUser()
if (!userData.user) { window.location.href = '/login'; return }
setUser(userData.user)
const { data } = await supabase
.from('visa_tracker')
.select('*')
.eq('user_id', userData.user.id)
.order('expiry_date', { ascending: true })
if (data) setDocuments(data)
setLoading(false)
}
load()
}, [])

async function saveDocument() {
if (!form.document_type || !form.expiry_date) return
setSaving(true)
const { data } = await supabase.from('visa_tracker').insert({
user_id: user.id,
document_type: form.document_type,
expiry_date: form.expiry_date,
notes: form.notes,
}).select().single()
if (data) setDocuments(prev => [...prev, data].sort((a,b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime()))
setForm({ document_type: '', expiry_date: '', notes: '' })
setShowForm(false)
setSaving(false)
}

async function deleteDocument(id: string) {
await supabase.from('visa_tracker').delete().eq('id', id)
setDocuments(prev => prev.filter(d => d.id !== id))
}

function getDaysUntil(dateStr: string) {
const today = new Date()
today.setHours(0,0,0,0)
const expiry = new Date(dateStr)
return Math.ceil((expiry.getTime() - today.getTime()) / (1000*60*60*24))
}

function getStatusColor(days: number) {
if (days < 0) return '#FF8070'
if (days <= 7) return '#C42020'
if (days <= 30) return '#F0A830'
if (days <= 90) return '#4A8EFF'
return '#2EC87A'
}

function getStatusLabel(days: number) {
if (days < 0) return '❌ Expired!'
if (days === 0) return '⚠️ Expires Today!'
if (days <= 7) return `🚨 ${days} days left!`
if (days <= 30) return `⚠️ ${days} days left`
if (days <= 90) return `📅 ${days} days left`
return `✅ ${days} days left`
}

const getDocType = (id: string) => DOCUMENT_TYPES.find(d => d.id === id) || DOCUMENT_TYPES[DOCUMENT_TYPES.length-1]

const urgentDocs = documents.filter(d => getDaysUntil(d.expiry_date) <= 30)

if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
<div style={{maxWidth:'800px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'12px'}}>
<div>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>🪪 Visa & Document Tracker</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Never miss a visa or document expiry date</p>
</div>
<button onClick={()=>setShowForm(!showForm)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
+ Add Document
</button>
</div>
</div>

<div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>

{/* Urgent Alert */}
{urgentDocs.length > 0 && (
<div style={{background:'rgba(196,32,32,0.15)',borderRadius:'12px',padding:'16px',marginBottom:'24px',border:'1px solid rgba(196,32,32,0.4)'}}>
<p style={{color:'#FF8070',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>🚨 Urgent: {urgentDocs.length} document{urgentDocs.length!==1?'s':''} expiring soon!</p>
{urgentDocs.map(doc => {
const docType = getDocType(doc.document_type)
const days = getDaysUntil(doc.expiry_date)
return (
<p key={doc.id} style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',marginBottom:'4px'}}>
{docType.icon} {docType.label} - {days < 0 ? 'EXPIRED' : `${days} days left`}
</p>
)
})}
</div>
)}

{/* Add Form */}
{showForm && (
<div style={{background:'#1A2035',borderRadius:'14px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(196,32,32,0.3)'}}>
<h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Add Document</h2>
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Document Type *</label>
<select value={form.document_type} onChange={e=>setForm(p=>({...p,document_type:e.target.value}))} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select document...</option>
{DOCUMENT_TYPES.map(d => (
<option key={d.id} value={d.id}>{d.icon} {d.label}</option>
))}
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Expiry Date *</label>
<input value={form.expiry_date} onChange={e=>setForm(p=>({...p,expiry_date:e.target.value}))} type="date" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Notes (optional)</label>
<input value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="e.g. Need to renew at immigration office" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div style={{display:'flex',gap:'10px'}}>
<button onClick={saveDocument} disabled={saving||!form.document_type||!form.expiry_date} style={{background: form.document_type&&form.expiry_date ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:2}}>
{saving ? 'Saving...' : 'Save Document'}
</button>
<button onClick={()=>setShowForm(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'14px',cursor:'pointer',flex:1}}>
Cancel
</button>
</div>
</div>
</div>
)}

{/* Documents List */}
{documents.length === 0 ? (
<div style={{textAlign:'center',padding:'60px',background:'#1A2035',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{fontSize:'48px',marginBottom:'16px'}}>🪪</div>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>No documents tracked yet</p>
<button onClick={()=>setShowForm(true)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
+ Add Your First Document
</button>
</div>
) : (
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
{documents.map(doc => {
const docType = getDocType(doc.document_type)
const days = getDaysUntil(doc.expiry_date)
const statusColor = getStatusColor(days)
return (
<div key={doc.id} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid ' + (days <= 30 ? statusColor+'40' : 'rgba(255,255,255,0.08)')}}>
<div style={{display:'flex',gap:'14px',alignItems:'center',flexWrap:'wrap'}}>
<div style={{width:'44px',height:'44px',borderRadius:'50%',background:docType.color+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0}}>
{docType.icon}
</div>
<div style={{flex:1}}>
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{docType.label}</h3>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>
Expires: {new Date(doc.expiry_date).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'})}
</p>
{doc.notes && <p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',marginTop:'2px'}}>{doc.notes}</p>}
</div>
<div style={{textAlign:'right',flexShrink:0}}>
<span style={{background:statusColor+'20',color:statusColor,padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700',display:'block',marginBottom:'8px',whiteSpace:'nowrap'}}>
{getStatusLabel(days)}
</span>
<button onClick={()=>deleteDocument(doc.id)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.2)',cursor:'pointer',fontSize:'12px'}}>
✕ Remove
</button>
</div>
</div>

{/* Progress bar */}
{days > 0 && days <= 365 && (
<div style={{marginTop:'12px'}}>
<div style={{height:'4px',background:'rgba(255,255,255,0.06)',borderRadius:'2px',overflow:'hidden'}}>
<div style={{width: Math.min(100, ((365-days)/365*100))+'%',height:'100%',background:statusColor,borderRadius:'2px'}}/>
</div>
</div>
)}
</div>
)
})}
</div>
)}

{/* Tips */}
<div style={{background:'rgba(74,142,255,0.1)',borderRadius:'12px',padding:'20px',marginTop:'24px',border:'1px solid rgba(74,142,255,0.2)'}}>
<h3 style={{color:'#4A8EFF',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>💡 Important Reminders</h3>
<div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
{[
'🪪 在留カード (Residence Card) must be renewed before expiry at immigration office',
'📘 Passport renewal takes 2-4 weeks at your country\'s embassy in Japan',
'🎓 Student visa is tied to school enrollment - notify school if changing',
'⚠️ Working without valid visa status is illegal in Japan',
].map((tip,i) => (
<p key={i} style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',lineHeight:'1.6'}}>{tip}</p>
))}
</div>
</div>

<div style={{textAlign:'center',marginTop:'20px'}}>
<a href="/visa-consult" style={{color:'#C42020',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>
Need help with visa renewal? Get free consultation →
</a>
</div>
</div>
</main>
)
}

