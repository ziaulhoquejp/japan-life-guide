'use client'
import { useState } from 'react'

const VISA_DOCUMENTS: any = {
student: {
title: 'Student Visa (留学ビザ)',
required: [
{id:'passport', label:'Valid passport (6+ months validity)', jp:'有効なパスポート（6ヶ月以上）'},
{id:'acceptance', label:'Acceptance letter from Japanese school', jp:'日本語学校の入学許可証'},
{id:'coe', label:'Certificate of Eligibility (COE)', jp:'在留資格認定証明書'},
{id:'bank', label:'Bank statement (¥2,000,000+ recommended)', jp:'銀行残高証明書（200万円以上推奨）'},
{id:'photo', label:'Photos (4.5cm × 4.5cm, white background)', jp:'証明写真（4.5×4.5cm、白背景）'},
{id:'application', label:'Visa application form', jp:'査証申請書'},
{id:'education', label:'Educational certificates (SSC, HSC, Degree)', jp:'最終学歴証明書'},
{id:'transcript', label:'Academic transcripts', jp:'成績証明書'},
{id:'sponsor', label:'Sponsor letter (if applicable)', jp:'身元保証書（該当する場合）'},
]
},
ssw: {
title: 'SSW Visa (特定技能)',
required: [
{id:'passport', label:'Valid passport', jp:'有効なパスポート'},
{id:'jlpt', label:'JLPT N4 certificate or JFT-Basic', jp:'JLPT N4合格証明書またはJFT-Basic'},
{id:'skills_test', label:'SSW skills test certificate', jp:'特定技能評価試験合格証明書'},
{id:'job_offer', label:'Job offer letter from Japanese employer', jp:'雇用条件書'},
{id:'contract', label:'Employment contract', jp:'雇用契約書'},
{id:'photo', label:'Photos (4.5cm × 4.5cm)', jp:'証明写真'},
{id:'application', label:'Visa application form', jp:'査証申請書'},
{id:'health', label:'Health certificate', jp:'健康診断書'},
{id:'criminal', label:'Criminal record clearance', jp:'犯罪経歴証明書'},
]
},
engineer: {
title: 'Engineer Visa (技術・人文知識・国際業務)',
required: [
{id:'passport', label:'Valid passport', jp:'有効なパスポート'},
{id:'degree', label:'University degree certificate', jp:'大学卒業証明書'},
{id:'transcript', label:'Academic transcripts', jp:'成績証明書'},
{id:'job_offer', label:'Job offer letter from Japanese company', jp:'採用通知書'},
{id:'contract', label:'Employment contract', jp:'雇用契約書'},
{id:'company_docs', label:'Company registration documents', jp:'会社の登記事項証明書'},
{id:'photo', label:'Photos (4.5cm × 4.5cm)', jp:'証明写真'},
{id:'application', label:'Visa application form', jp:'査証申請書'},
{id:'coe', label:'Certificate of Eligibility (COE)', jp:'在留資格認定証明書'},
]
},
}

export default function VisaCheckPage() {
const [visaType, setVisaType] = useState('')
const [checkedDocs, setCheckedDocs] = useState<string[]>([])
const [additionalInfo, setAdditionalInfo] = useState('')
const [checking, setChecking] = useState(false)
const [result, setResult] = useState<any>(null)

function toggleDoc(id: string) {
setCheckedDocs(prev =>
prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
)
}

async function checkDocuments() {
if (!visaType) return
setChecking(true)
try {
const docs = VISA_DOCUMENTS[visaType]
const missing = docs.required.filter((d: any) => !checkedDocs.includes(d.id))
const checked = docs.required.filter((d: any) => checkedDocs.includes(d.id))

const response = await fetch('/api/visa-document-check', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
visaType,
missingDocs: missing.map((d: any) => d.label),
checkedDocs: checked.map((d: any) => d.label),
additionalInfo,
}),
})
const data = await response.json()
setResult({ ...data, missing, checked })
} catch (error) {
console.error(error)
}
setChecking(false)
}

const docs = visaType ? VISA_DOCUMENTS[visaType] : null
const completionRate = docs ? Math.round((checkedDocs.filter(id => docs.required.find((d: any) => d.id === id)).length / docs.required.length) * 100) : 0

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>✅ AI Visa Document Checker</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>Check if your visa documents are complete with AI assistance</p>
<p style={{color:'#2EC87A',fontSize:'13px'}}>🤖 AI-powered · 🛂 Student, SSW, Engineer · 🆓 Free</p>
</div>

<div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>

{/* Visa Type Selection */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>1. Select Visa Type</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'10px'}}>
{[
{id:'student', icon:'🎓', label:'Student Visa', sublabel:'留学ビザ'},
{id:'ssw', icon:'🏭', label:'SSW Visa', sublabel:'特定技能'},
{id:'engineer', icon:'💻', label:'Engineer Visa', sublabel:'技術・人文知識'},
].map(type => (
<button key={type.id} onClick={()=>{setVisaType(type.id); setCheckedDocs([]); setResult(null)}} style={{background: visaType===type.id ? 'rgba(196,32,32,0.2)' : '#0D0907',border:'2px solid ' + (visaType===type.id ? '#C42020' : 'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'18px',cursor:'pointer',textAlign:'center'}}>
<div style={{fontSize:'32px',marginBottom:'8px'}}>{type.icon}</div>
<div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{type.label}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{type.sublabel}</div>
</button>
))}
</div>
</div>

{/* Document Checklist */}
{docs && (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',flexWrap:'wrap',gap:'8px'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700'}}>2. Check Your Documents</h2>
<span style={{color: completionRate === 100 ? '#2EC87A' : '#F0A830',fontSize:'14px',fontWeight:'700'}}>{completionRate}% Complete</span>
</div>

{/* Progress Bar */}
<div style={{height:'8px',background:'rgba(255,255,255,0.1)',borderRadius:'4px',overflow:'hidden',marginBottom:'20px'}}>
<div style={{width:completionRate+'%',height:'100%',background: completionRate===100 ? '#2EC87A' : '#C42020',borderRadius:'4px',transition:'width 0.3s'}}/>
</div>

<div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px'}}>
{docs.required.map((doc: any) => {
const isChecked = checkedDocs.includes(doc.id)
return (
<div key={doc.id} onClick={()=>toggleDoc(doc.id)} style={{background: isChecked ? 'rgba(46,200,122,0.1)' : '#0D0907',borderRadius:'10px',padding:'14px',display:'flex',gap:'12px',alignItems:'flex-start',cursor:'pointer',border:'1px solid ' + (isChecked ? 'rgba(46,200,122,0.3)' : 'rgba(255,255,255,0.06)'),transition:'all 0.2s'}}>
<div style={{width:'22px',height:'22px',borderRadius:'50%',border:'2px solid ' + (isChecked ? '#2EC87A' : 'rgba(255,255,255,0.3)'),background: isChecked ? '#2EC87A' : 'none',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',flexShrink:0,marginTop:'1px'}}>
{isChecked ? '✓' : ''}
</div>
<div style={{flex:1}}>
<p style={{color: isChecked ? '#2EC87A' : 'white',fontSize:'13px',fontWeight:'600',marginBottom:'2px'}}>{doc.label}</p>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{doc.jp}</p>
</div>
</div>
)
})}
</div>

<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Additional information (optional)</label>
<textarea value={additionalInfo} onChange={e=>setAdditionalInfo(e.target.value)} placeholder="Any specific concerns or questions about your documents?" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'13px',outline:'none',resize:'vertical',minHeight:'80px'}}/>
</div>
</div>
)}

{docs && (
<button onClick={checkDocuments} disabled={checking} style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'16px',fontSize:'15px',fontWeight:'700',cursor:'pointer',width:'100%',marginBottom:'24px'}}>
{checking ? '🤖 AI is checking your documents...' : 'Check My Documents with AI ✅'}
</button>
)}

{/* Results */}
{result && (
<div>
{/* Status */}
<div style={{background: result.missing.length === 0 ? 'rgba(46,200,122,0.1)' : 'rgba(240,168,48,0.1)',borderRadius:'16px',padding:'24px',marginBottom:'16px',border:'1px solid ' + (result.missing.length === 0 ? 'rgba(46,200,122,0.3)' : 'rgba(240,168,48,0.3)'),textAlign:'center'}}>
<div style={{fontSize:'40px',marginBottom:'12px'}}>{result.missing.length === 0 ? '✅' : '⚠️'}</div>
<h3 style={{color: result.missing.length === 0 ? '#2EC87A' : '#F0A830',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>
{result.missing.length === 0 ? 'All documents ready!' : `${result.missing.length} document${result.missing.length!==1?'s':''} missing!`}
</h3>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.7'}}>{result.assessment}</p>
</div>

{/* Missing Documents */}
{result.missing.length > 0 && (
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginBottom:'16px',border:'1px solid rgba(196,32,32,0.2)'}}>
<h3 style={{color:'#FF8070',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>❌ Missing Documents</h3>
{result.missing.map((doc: any) => (
<div key={doc.id} style={{display:'flex',gap:'10px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
<span style={{color:'#FF8070',fontSize:'14px'}}>✗</span>
<div>
<p style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{doc.label}</p>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{doc.jp}</p>
</div>
</div>
))}
</div>
)}

{/* AI Advice */}
{result.advice && (
<div style={{background:'rgba(74,142,255,0.1)',borderRadius:'12px',padding:'20px',marginBottom:'16px',border:'1px solid rgba(74,142,255,0.2)'}}>
<h3 style={{color:'#4A8EFF',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>🤖 AI Advice</h3>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.8',whiteSpace:'pre-wrap'}}>{result.advice}</p>
</div>
)}

{/* Next Steps */}
{result.nextSteps && (
<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'12px',padding:'20px',marginBottom:'16px',border:'1px solid rgba(46,200,122,0.2)'}}>
<h3 style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>📋 Next Steps</h3>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.8',whiteSpace:'pre-wrap'}}>{result.nextSteps}</p>
</div>
)}

<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
<a href="/visa-consult" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',flex:1,textAlign:'center'}}>
Get Visa Consultation 👨‍💼
</a>
<a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)',flex:1,textAlign:'center'}}>
Ask Sakura AI 🌸
</a>
</div>
</div>
)}
</div>
</main>
)
}

