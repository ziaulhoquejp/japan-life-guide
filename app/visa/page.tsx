'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

const VISA_TYPES = [
{
id: 'student',
icon: '🎓',
title: 'Student Visa',
titleJP: '留学ビザ',
color: '#4A8EFF',
desc: 'For studying at Japanese language schools or universities',
requirements: [
'Acceptance letter from Japanese school',
'Certificate of Eligibility (COE)',
'Valid passport (2+ years)',
'Bank statement (¥2,000,000+ recommended)',
'Academic certificates (SSC, HSC, Degree)',
'Photos (4.5cm × 4.5cm)',
'Visa application form',
],
steps: [
{title:'Apply to Language School',desc:'Submit application to your chosen school via Japan Life Guide',days:'1-2 weeks'},
{title:'School Reviews Application',desc:'School reviews your documents and academic background',days:'1-2 weeks'},
{title:'COE Application',desc:'School applies for Certificate of Eligibility on your behalf',days:'2-3 months'},
{title:'Receive COE',desc:'COE is sent to you by mail or courier',days:'1 week'},
{title:'Apply for Visa',desc:'Submit visa application at Japanese Embassy in your country',days:'5-10 days'},
{title:'Receive Visa',desc:'Visa is stamped in your passport',days:'1 week'},
{title:'Fly to Japan',desc:'Book your flight and prepare for departure',days:''},
],
processingTime: '3-5 months total',
cost: '¥0 (Free)',
validity: '1-2 years (renewable)',
workLimit: '28 hours/week',
},
{
id: 'ssw',
icon: '🏭',
title: 'SSW Visa Type 1',
titleJP: '特定技能1号',
color: '#C42020',
desc: 'For working in Japan in 16 designated industries',
requirements: [
'SSW skills test certificate',
'JLPT N4 or JFT-Basic certificate',
'Job offer from registered Japanese employer',
'Valid passport',
'No criminal record',
'Age 18 or above',
'Health certificate',
],
steps: [
{title:'Pass JLPT N4 or JFT-Basic',desc:'Study and pass Japanese language test',days:'3-6 months prep'},
{title:'Pass SSW Skills Test',desc:'Pass the skills test for your chosen industry',days:'1-3 months prep'},
{title:'Find Employer',desc:'Find a registered SSW employer in Japan',days:'1-3 months'},
{title:'Employer Applies for COE',desc:'Your employer applies for Certificate of Eligibility',days:'2-3 months'},
{title:'Apply for Visa',desc:'Submit visa application at Japanese Embassy',days:'5-10 days'},
{title:'Start Working',desc:'Arrive in Japan and begin your new job',days:''},
],
processingTime: '6-12 months total',
cost: '¥0 (Free)',
validity: 'Up to 5 years',
workLimit: 'Full-time',
},
{
id: 'engineer',
icon: '💻',
title: 'Engineer Visa',
titleJP: '技術・人文知識・国際業務',
color: '#2EC87A',
desc: 'For IT engineers, international business, and specialists',
requirements: [
'University degree in relevant field',
'Job offer from Japanese company',
'Valid passport',
'Company registration documents',
'Employment contract',
'Employer letter of guarantee',
],
steps: [
{title:'Get University Degree',desc:'Bachelor\'s degree in relevant field (IT, Engineering, Business)',days:'Already done'},
{title:'Find Job in Japan',desc:'Apply to Japanese companies via LinkedIn, Gaijinpot, or Japan Life Guide',days:'1-6 months'},
{title:'Receive Job Offer',desc:'Get official job offer from Japanese company',days:'1-2 months'},
{title:'Employer Applies for COE',desc:'Company applies for Certificate of Eligibility',days:'2-3 months'},
{title:'Apply for Visa',desc:'Submit visa application at Japanese Embassy',days:'5-10 days'},
{title:'Start Working',desc:'Arrive in Japan and begin your career',days:''},
],
processingTime: '3-9 months total',
cost: '¥0 (Free)',
validity: '1-5 years (renewable)',
workLimit: 'Full-time',
},
]

const TRACKER_STEPS: any = {
student: [
{id:'s1', title:'Choose a school', icon:'🏫', link:'/schools'},
{id:'s2', title:'Apply to school', icon:'📝', link:'/apply'},
{id:'s3', title:'Receive acceptance letter', icon:'📨', link:null},
{id:'s4', title:'Wait for COE', icon:'⏳', link:null},
{id:'s5', title:'Apply for visa', icon:'🛂', link:null},
{id:'s6', title:'Book flight to Japan', icon:'✈️', link:null},
{id:'s7', title:'Arrive in Japan! 🎉', icon:'🌸', link:null},
],
ssw: [
{id:'w1', title:'Study Japanese (N4)', icon:'📚', link:'/learn-japanese'},
{id:'w2', title:'Pass JLPT N4', icon:'📝', link:'/jlpt-test'},
{id:'w3', title:'Pass SSW skills test', icon:'🏭', link:null},
{id:'w4', title:'Find SSW employer', icon:'💼', link:'/jobs'},
{id:'w5', title:'Employer applies for COE', icon:'⏳', link:null},
{id:'w6', title:'Apply for visa', icon:'🛂', link:null},
{id:'w7', title:'Start working in Japan! 🎉', icon:'🌸', link:null},
],
engineer: [
{id:'e1', title:'Prepare resume/CV', icon:'📄', link:'/jobs'},
{id:'e2', title:'Apply to Japanese companies', icon:'💻', link:'/jobs'},
{id:'e3', title:'Receive job offer', icon:'📨', link:null},
{id:'e4', title:'Employer applies for COE', icon:'⏳', link:null},
{id:'e5', title:'Apply for visa', icon:'🛂', link:null},
{id:'e6', title:'Start career in Japan! 🎉', icon:'🌸', link:null},
],
}

export default function VisaPage() {
const [selectedVisa, setSelectedVisa] = useState<any>(null)
const [activeTab, setActiveTab] = useState<'overview'|'steps'|'tracker'|'requirements'>('overview')
const [completedSteps, setCompletedSteps] = useState<string[]>([])
const [user, setUser] = useState<any>(null)

useEffect(() => {
supabase.auth.getUser().then(({ data }) => {
if (data.user) {
setUser(data.user)
// Load saved progress
const saved = localStorage.getItem(`visa_progress_${data.user.id}`)
if (saved) setCompletedSteps(JSON.parse(saved))
}
})
}, [])

function toggleStep(stepId: string) {
const newCompleted = completedSteps.includes(stepId)
? completedSteps.filter(id => id !== stepId)
: [...completedSteps, stepId]
setCompletedSteps(newCompleted)
if (user) {
localStorage.setItem(`visa_progress_${user.id}`, JSON.stringify(newCompleted))
}
}

const trackerSteps = selectedVisa ? TRACKER_STEPS[selectedVisa.id] || [] : []
const progress = trackerSteps.length > 0 ? Math.round((completedSteps.filter(id => trackerSteps.find((s: any) => s.id === id)).length / trackerSteps.length) * 100) : 0

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Japan Visa Guide</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'16px'}}>Complete visa information and progress tracker</p>
<div style={{display:'flex',gap:'8px',justifyContent:'center',flexWrap:'wrap'}}>
{VISA_TYPES.map(visa => (
<button key={visa.id} onClick={()=>{setSelectedVisa(visa); setActiveTab('overview')}} style={{background: selectedVisa?.id===visa.id ? visa.color : 'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'20px',padding:'8px 18px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
{visa.icon} {visa.title}
</button>
))}
</div>
</div>

<div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>

{!selectedVisa ? (
<div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px',marginBottom:'32px'}}>
{VISA_TYPES.map(visa => (
<div key={visa.id} onClick={()=>setSelectedVisa(visa)} style={{background:'#1A2035',borderRadius:'14px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)',cursor:'pointer'}}
onMouseEnter={e=>(e.currentTarget.style.borderColor=visa.color+'60')}
onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
<div style={{fontSize:'40px',marginBottom:'12px'}}>{visa.icon}</div>
<h3 style={{color:'white',fontSize:'17px',fontWeight:'700',marginBottom:'4px'}}>{visa.title}</h3>
<p style={{color:visa.color,fontSize:'12px',marginBottom:'10px'}}>{visa.titleJP}</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6',marginBottom:'16px'}}>{visa.desc}</p>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
<div style={{background:'#0D0907',borderRadius:'8px',padding:'8px'}}>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'10px',marginBottom:'2px'}}>Processing Time</p>
<p style={{color:visa.color,fontSize:'11px',fontWeight:'700'}}>{visa.processingTime}</p>
</div>
<div style={{background:'#0D0907',borderRadius:'8px',padding:'8px'}}>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'10px',marginBottom:'2px'}}>Work Limit</p>
<p style={{color:visa.color,fontSize:'11px',fontWeight:'700'}}>{visa.workLimit}</p>
</div>
</div>
</div>
))}
</div>

<div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'12px'}}>Not sure which visa is right for you?</p>
<div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
<Link href="/visa-calculator" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
Use Visa Calculator 🧮
</Link>
<Link href="/visa-consult" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>
Free Visa Consultation 👨‍💼
</Link>
</div>
</div>
</div>
) : (
<div>
<button onClick={()=>setSelectedVisa(null)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'14px',marginBottom:'16px',display:'flex',alignItems:'center',gap:'6px'}}>
← Back to all visas
</button>

<div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'20px',flexWrap:'wrap'}}>
<span style={{fontSize:'40px'}}>{selectedVisa.icon}</span>
<div>
<h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'2px'}}>{selectedVisa.title}</h2>
<p style={{color:selectedVisa.color,fontSize:'14px'}}>{selectedVisa.titleJP}</p>
</div>
</div>

{/* Tabs */}
<div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
{[
{key:'overview' as const, label:'📋 Overview'},
{key:'requirements' as const, label:'📄 Requirements'},
{key:'steps' as const, label:'📍 Process Steps'},
{key:'tracker' as const, label:'✅ My Progress'},
].map(tab => (
<button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{background:activeTab===tab.key?selectedVisa.color:'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
{tab.label}
</button>
))}
</div>

{/* Overview */}
{activeTab === 'overview' && (
<div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.8'}}>{selectedVisa.desc}</p>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'12px'}}>
{[
{label:'Processing Time',value:selectedVisa.processingTime,icon:'⏱️'},
{label:'Application Cost',value:selectedVisa.cost,icon:'💴'},
{label:'Validity',value:selectedVisa.validity,icon:'📅'},
{label:'Work Limit',value:selectedVisa.workLimit,icon:'💼'},
].map(item => (
<div key={item.label} style={{background:'#1A2035',borderRadius:'10px',padding:'14px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{fontSize:'20px',marginBottom:'6px'}}>{item.icon}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>{item.label}</div>
<div style={{color:selectedVisa.color,fontSize:'13px',fontWeight:'700'}}>{item.value}</div>
</div>
))}
</div>
<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
<button onClick={()=>setActiveTab('tracker')} style={{background:selectedVisa.color,color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
Start Tracking My Progress ✅
</button>
<Link href="/visa-consult" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>
Get Free Consultation 👨‍💼
</Link>
</div>
</div>
)}

{/* Requirements */}
{activeTab === 'requirements' && (
<div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>📄 Required Documents</h3>
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{selectedVisa.requirements.map((req: string, i: number) => (
<div key={i} style={{display:'flex',gap:'12px',alignItems:'center',padding:'10px',background:'#0D0907',borderRadius:'8px'}}>
<div style={{width:'24px',height:'24px',borderRadius:'50%',background:selectedVisa.color+'20',display:'flex',alignItems:'center',justifyContent:'center',color:selectedVisa.color,fontSize:'12px',fontWeight:'700',flexShrink:0}}>{i+1}</div>
<span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{req}</span>
</div>
))}
</div>
<div style={{background:'rgba(240,168,48,0.1)',borderRadius:'10px',padding:'14px',marginTop:'16px',border:'1px solid rgba(240,168,48,0.2)'}}>
<p style={{color:'#F0A830',fontSize:'12px',lineHeight:'1.7'}}>
⚠️ Requirements may vary by embassy. Always check with your local Japanese Embassy for the most current requirements.
</p>
</div>
</div>
)}

{/* Process Steps */}
{activeTab === 'steps' && (
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
{selectedVisa.steps.map((step: any, i: number) => (
<div key={i} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
<div style={{width:'36px',height:'36px',borderRadius:'50%',background:selectedVisa.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'14px',fontWeight:'700',flexShrink:0}}>{i+1}</div>
{i < selectedVisa.steps.length - 1 && <div style={{width:'2px',flex:1,background:'rgba(255,255,255,0.1)',margin:'4px 0',minHeight:'30px'}}/>}
</div>
<div style={{background:'#1A2035',borderRadius:'10px',padding:'14px',flex:1,border:'1px solid rgba(255,255,255,0.08)',marginBottom:'4px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'8px'}}>
<h4 style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{step.title}</h4>
{step.days && <span style={{background:selectedVisa.color+'20',color:selectedVisa.color,padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',whiteSpace:'nowrap'}}>{step.days}</span>}
</div>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6',marginTop:'4px'}}>{step.desc}</p>
</div>
</div>
))}
</div>
)}

{/* Progress Tracker */}
{activeTab === 'tracker' && (
<div>
{!user && (
<div style={{background:'rgba(240,168,48,0.1)',borderRadius:'10px',padding:'14px',marginBottom:'16px',border:'1px solid rgba(240,168,48,0.2)'}}>
<p style={{color:'#F0A830',fontSize:'13px'}}>⚠️ <Link href="/login" style={{color:'#F0A830'}}>Sign in</Link> to save your progress across devices!</p>
</div>
)}

{/* Progress Bar */}
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
<span style={{color:'white',fontSize:'14px',fontWeight:'700'}}>Your Progress</span>
<span style={{color:selectedVisa.color,fontSize:'14px',fontWeight:'700'}}>{progress}%</span>
</div>
<div style={{height:'8px',background:'rgba(255,255,255,0.1)',borderRadius:'4px',overflow:'hidden'}}>
<div style={{width:progress+'%',height:'100%',background:selectedVisa.color,borderRadius:'4px',transition:'width 0.5s ease'}}/>
</div>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'8px'}}>
{completedSteps.filter(id => trackerSteps.find((s: any) => s.id === id)).length} of {trackerSteps.length} steps completed
</p>
</div>

<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{trackerSteps.map((step: any) => {
const isCompleted = completedSteps.includes(step.id)
return (
<div key={step.id} style={{background:'#1A2035',borderRadius:'10px',padding:'14px',display:'flex',gap:'12px',alignItems:'center',border:'1px solid ' + (isCompleted ? selectedVisa.color + '40' : 'rgba(255,255,255,0.08)')}}>
<button onClick={()=>toggleStep(step.id)} style={{width:'24px',height:'24px',borderRadius:'50%',border:'2px solid ' + (isCompleted ? selectedVisa.color : 'rgba(255,255,255,0.3)'),background: isCompleted ? selectedVisa.color : 'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',flexShrink:0}}>
{isCompleted ? '✓' : ''}
</button>
<span style={{fontSize:'20px'}}>{step.icon}</span>
<span style={{color: isCompleted ? 'rgba(255,255,255,0.5)' : 'white',fontSize:'14px',flex:1,textDecoration: isCompleted ? 'line-through' : 'none'}}>{step.title}</span>
{step.link && !isCompleted && (
<Link href={step.link} style={{color:selectedVisa.color,fontSize:'12px',textDecoration:'none',fontWeight:'600',whiteSpace:'nowrap'}}>
Go →
</Link>
)}
</div>
)
})}
</div>

{progress === 100 && (
<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'12px',padding:'20px',marginTop:'16px',textAlign:'center',border:'1px solid rgba(46,200,122,0.3)'}}>
<p style={{fontSize:'32px',marginBottom:'8px'}}>🎉</p>
<p style={{color:'#2EC87A',fontSize:'16px',fontWeight:'700'}}>Congratulations! All steps completed! 🌸</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginTop:'4px'}}>Welcome to Japan! Your journey starts here!</p>
</div>
)}
</div>
)}
</div>
)}
</div>
</main>
)
}