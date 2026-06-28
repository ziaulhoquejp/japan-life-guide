'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ComparePage() {
const [schools, setSchools] = useState<any[]>([])
const [selected, setSelected] = useState<any[]>([])
const [search, setSearch] = useState('')
const [loading, setLoading] = useState(true)
const [showComparison, setShowComparison] = useState(false)

useEffect(() => {
async function load() {
const { data } = await supabase
.from('schools')
.select('*')
.eq('data_verified', true)
.order('rating', { ascending: false })
.limit(100)
if (data) setSchools(data)
setLoading(false)
}
load()
}, [])

function toggleSelect(school: any) {
if (selected.find(s => s.id === school.id)) {
setSelected(prev => prev.filter(s => s.id !== school.id))
} else if (selected.length < 4) {
setSelected(prev => [...prev, school])
}
}

const filtered = schools.filter(s =>
!search || s.name_en?.toLowerCase().includes(search.toLowerCase()) || s.city?.toLowerCase().includes(search.toLowerCase())
)

const COMPARE_FIELDS = [
{label:'Location',key:'city'},
{label:'Region',key:'region'},
{label:'Annual Fee',key:'annual_fee_jpy', format:(v: any) => v ? '¥' + v.toLocaleString() : 'Contact school'},
{label:'Rating',key:'rating', format:(v: any) => v ? '⭐ ' + v : 'N/A'},
{label:'Dormitory',key:'has_dorm', format:(v: any) => v ? '✅ Available' : '❌ Not Available'},
{label:'JLPT Prep',key:'jlpt_prep', format:(v: any) => v ? '✅ Yes' : '❌ No'},
{label:'Scholarship',key:'scholarship', format:(v: any) => v ? '✅ Available' : '❌ Not Available'},
{label:'Data Status',key:'data_verified', format:(v: any) => v ? '✅ Verified' : '⚠️ Reference'},
]

function getBestValue(key: string) {
if (selected.length < 2) return null
if (key === 'annual_fee_jpy') {
const min = Math.min(...selected.filter(s => s[key]).map(s => s[key]))
return min
}
if (key === 'rating') {
const max = Math.max(...selected.filter(s => s[key]).map(s => s[key]))
return max
}
return null
}

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Compare Schools</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>Select up to 4 schools to compare side by side</p>
{selected.length > 0 && (
<div style={{display:'flex',gap:'8px',justifyContent:'center',flexWrap:'wrap',marginTop:'12px'}}>
{selected.map(s => (
<span key={s.id} style={{background:'rgba(196,32,32,0.2)',color:'white',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',display:'flex',alignItems:'center',gap:'6px'}}>
{s.icon || '🏫'} {s.name_en}
<button onClick={()=>toggleSelect(s)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'14px',padding:'0'}}>✕</button>
</span>
))}
{selected.length >= 2 && (
<button onClick={()=>setShowComparison(!showComparison)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'20px',padding:'4px 16px',fontSize:'12px',fontWeight:'700',cursor:'pointer'}}>
{showComparison ? 'Hide' : 'Compare'} →
</button>
)}
</div>
)}
</div>

<div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>

{/* Comparison Table */}
{showComparison && selected.length >= 2 && (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',marginBottom:'32px',border:'1px solid rgba(196,32,32,0.3)',overflowX:'auto'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'20px'}}>📊 Comparison Result</h2>
<table style={{width:'100%',borderCollapse:'collapse',minWidth:'600px'}}>
<thead>
<tr>
<th style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',textAlign:'left',padding:'10px',borderBottom:'1px solid rgba(255,255,255,0.08)',width:'140px'}}>Feature</th>
{selected.map(s => (
<th key={s.id} style={{color:'white',fontSize:'12px',textAlign:'center',padding:'10px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{fontSize:'20px',marginBottom:'4px'}}>{s.icon || '🏫'}</div>
<div style={{fontWeight:'700',lineHeight:'1.3'}}>{s.name_en}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontWeight:'400',fontSize:'11px'}}>{s.city}</div>
</th>
))}
</tr>
</thead>
<tbody>
{COMPARE_FIELDS.map((field,i) => {
const bestValue = getBestValue(field.key)
return (
<tr key={field.key} style={{background: i%2===0 ? 'transparent' : 'rgba(255,255,255,0.02)'}}>
<td style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',padding:'12px',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>{field.label}</td>
{selected.map(s => {
const value = s[field.key]
const displayValue = field.format ? field.format(value) : (value || 'N/A')
const isBest = bestValue !== null && value === bestValue
return (
<td key={s.id} style={{textAlign:'center',padding:'12px',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
<span style={{color: isBest ? '#2EC87A' : 'white',fontSize:'13px',fontWeight: isBest ? '700' : '400'}}>
{displayValue}
{isBest && <span style={{color:'#2EC87A',fontSize:'10px',display:'block'}}>★ Best</span>}
</span>
</td>
)
})}
</tr>
)
})}
</tbody>
</table>

{/* Best Value Recommendation */}
<div style={{marginTop:'20px',background:'rgba(46,200,122,0.1)',borderRadius:'10px',padding:'16px',border:'1px solid rgba(46,200,122,0.2)'}}>
<p style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700',marginBottom:'8px'}}>🤖 AI Recommendation</p>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>
{selected.reduce((best, s) => {
if (!best) return s
const bestScore = (best.rating || 0) * 10 - (best.annual_fee_jpy || 1000000) / 100000
const sScore = (s.rating || 0) * 10 - (s.annual_fee_jpy || 1000000) / 100000
return sScore > bestScore ? s : best
}, null)?.name_en} appears to offer the best overall value based on rating and fees.
{' '}Consider dormitory availability and JLPT preparation when making your final decision.
</p>
</div>

<div style={{display:'flex',gap:'10px',marginTop:'16px',flexWrap:'wrap'}}>
{selected.map(s => (
<a key={s.id} href={'/schools/' + s.id} style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
Apply to {s.name_en.split(' ')[0]} →
</a>
))}
</div>
</div>
)}

{/* Search */}
<div style={{marginBottom:'20px'}}>
<input
value={search}
onChange={e=>setSearch(e.target.value)}
placeholder="🔍 Search schools by name or city..."
style={{width:'100%',background:'#1A2035',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none'}}
/>
</div>

<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px',flexWrap:'wrap',gap:'8px'}}>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>
{selected.length}/4 schools selected
</p>
{selected.length > 0 && (
<button onClick={()=>setSelected([])} style={{background:'none',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'6px 14px',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'12px'}}>
Clear all
</button>
)}
</div>

{loading ? (
<div style={{textAlign:'center',padding:'48px',color:'rgba(255,255,255,0.4)'}}>Loading schools...</div>
) : (
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'12px'}}>
{filtered.map(school => {
const isSelected = selected.find(s => s.id === school.id)
const isDisabled = !isSelected && selected.length >= 4
return (
<div key={school.id} onClick={()=>!isDisabled && toggleSelect(school)} style={{background: isSelected ? 'rgba(196,32,32,0.15)' : '#1A2035',borderRadius:'12px',padding:'16px',border:'2px solid ' + (isSelected ? '#C42020' : 'rgba(255,255,255,0.08)'),cursor: isDisabled ? 'not-allowed' : 'pointer',opacity: isDisabled ? 0.5 : 1,position:'relative'}}>
{isSelected && (
<div style={{position:'absolute',top:'10px',right:'10px',width:'20px',height:'20px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:'700'}}>✓</div>
)}
<div style={{display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:'10px'}}>
<span style={{fontSize:'28px'}}>{school.icon || '🏫'}</span>
<div style={{flex:1}}>
<h3 style={{color:'white',fontSize:'13px',fontWeight:'700',lineHeight:'1.4',marginBottom:'2px'}}>{school.name_en}</h3>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>📍 {school.city}</p>
</div>
</div>
<div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'8px'}}>
{school.has_dorm && <span style={{background:'rgba(74,142,255,0.15)',color:'#4A8EFF',padding:'2px 6px',borderRadius:'4px',fontSize:'9px',fontWeight:'700'}}>DORM</span>}
{school.jlpt_prep && <span style={{background:'rgba(46,200,122,0.15)',color:'#2EC87A',padding:'2px 6px',borderRadius:'4px',fontSize:'9px',fontWeight:'700'}}>JLPT</span>}
{school.scholarship && <span style={{background:'rgba(168,85,247,0.15)',color:'#A855F7',padding:'2px 6px',borderRadius:'4px',fontSize:'9px',fontWeight:'700'}}>SCHOLARSHIP</span>}
</div>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<span style={{color:'#F0A830',fontSize:'12px',fontWeight:'700'}}>
{school.annual_fee_jpy ? '¥' + school.annual_fee_jpy.toLocaleString() : 'Contact school'}
</span>
<span style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>⭐ {school.rating || 'N/A'}</span>
</div>
</div>
)
})}
</div>
)}

<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need help choosing? Ask Sakura AI!</p>
<a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI 🌸</a>
</div>
</div>
</main>
)
}
