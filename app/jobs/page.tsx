'use client'
import { useState } from 'react'

const JOB_CATEGORIES = [
{
id: 'ssw',
icon: '🏭',
title: 'Specified Skilled Worker (SSW)',
titleJP: '特定技能',
color: '#C42020',
desc: 'Work in Japan with SSW visa. 16 industries available for foreign workers.',
industries: ['Food Manufacturing', 'Restaurant/Food Service', 'Building Cleaning', 'Industrial Machinery', 'Electrical/Electronics', 'Construction', 'Shipbuilding', 'Automobile Repair', 'Aviation', 'Lodging', 'Agriculture', 'Fishery', 'Nursing Care'],
avgSalary: '¥180,000 - ¥250,000/month',
requirement: 'JLPT N4 + Skills Test',
links: [
{label:'JOPUS (SSW Jobs)', url:'https://jopus.net/en/'},
{label:'Japan SSW Job Board', url:'https://ssw.go.jp/'},
{label:'ハローワーク外国人向け', url:'https://www.hellowork.mhlw.go.jp/'},
]
},
{
id: 'parttime',
icon: '⏰',
title: 'Part-time Jobs (Students)',
titleJP: 'アルバイト',
color: '#4A8EFF',
desc: 'Work up to 28 hours/week on student visa. Many options available.',
industries: ['Convenience Store', 'Restaurant/Cafe', 'Factory', 'Delivery', 'Hotel/Hospitality', 'Retail Shop', 'English Teaching', 'IT Support'],
avgSalary: '¥1,000 - ¥1,500/hour',
requirement: 'Student Visa + 資格外活動許可',
links: [
{label:'Townwork (求人サイト)', url:'https://townwork.net/'},
{label:'Baitoru (バイトル)', url:'https://www.baitoru.com/'},
{label:'Indeed Japan', url:'https://jp.indeed.com/'},
]
},
{
id: 'engineer',
icon: '💻',
title: 'Engineer / IT Jobs',
titleJP: '技術・人文知識・国際業務',
color: '#2EC87A',
desc: 'Work as engineer, IT specialist, or international business professional.',
industries: ['Software Development', 'Web Development', 'Network Engineer', 'Data Analysis', 'International Sales', 'Interpreter/Translator'],
avgSalary: '¥250,000 - ¥450,000/month',
requirement: 'Degree in relevant field + Job offer',
links: [
{label:'Daijob (外資・グローバル)', url:'https://www.daijob.com/'},
{label:'Gaijinpot Jobs', url:'https://jobs.gaijinpot.com/'},
{label:'LinkedIn Japan', url:'https://www.linkedin.com/jobs/'},
]
},
{
id: 'nursing',
icon: '🏥',
title: 'Nursing Care (介護)',
titleJP: '介護',
color: '#A855F7',
desc: 'Japan needs nursing care workers urgently. Good salary and career path.',
industries: ['Elderly Care Facility', 'Home Care', 'Hospital Support', 'Rehabilitation Center'],
avgSalary: '¥200,000 - ¥280,000/month',
requirement: 'JLPT N4 + Care Worker Certificate',
links: [
{label:'介護求人ナビ', url:'https://www.kaigo-kyuujin.com/'},
{label:'カイゴジョブ', url:'https://carejob.ansinc.co.jp/'},
]
},
{
id: 'construction',
icon: '🏗️',
title: 'Construction (建設)',
titleJP: '建設',
color: '#F0A830',
desc: 'Construction industry in Japan has many opportunities for foreign workers.',
industries: ['General Construction', 'Carpentry', 'Plumbing', 'Electrical Work', 'Painting', 'Welding'],
avgSalary: '¥200,000 - ¥320,000/month',
requirement: 'SSW Type 1 or Technical Intern',
links: [
{label:'建設業求人サイト', url:'https://www.kensetsu-job.com/'},
{label:'Indeed 建設', url:'https://jp.indeed.com/建設-求人'},
]
},
{
id: 'factory',
icon: '🔧',
title: 'Factory / Manufacturing',
titleJP: '製造業',
color: '#FF8070',
desc: 'Stable factory work with good benefits. Popular among Bangladeshi and Nepali workers.',
industries: ['Food Processing', 'Electronics Assembly', 'Auto Parts', 'Packaging', 'Printing'],
avgSalary: '¥190,000 - ¥270,000/month',
requirement: 'SSW Type 1 or Student Visa (part-time)',
links: [
{label:'工場求人.com', url:'https://www.factory-job.com/'},
{label:'スタッフサービス', url:'https://www.staffservice.co.jp/'},
]
},
]

const USEFUL_SITES = [
{name:'ハローワーク', nameEN:'Hello Work (Official)', url:'https://www.hellowork.mhlw.go.jp/', desc:'Official Japanese government job center', icon:'🏛️'},
{name:'Indeed Japan', nameEN:'Indeed Japan', url:'https://jp.indeed.com/', desc:'Japan\'s largest job search engine', icon:'🔍'},
{name:'JOPUS', nameEN:'JOPUS (Foreign Workers)', url:'https://jopus.net/en/', desc:'Specialized for foreign workers in Japan', icon:'🌏'},
{name:'Gaijinpot Jobs', nameEN:'Gaijinpot', url:'https://jobs.gaijinpot.com/', desc:'Jobs for foreigners in Japan', icon:'💼'},
{name:'Japan SSW Portal', nameEN:'SSW Official Portal', url:'https://ssw.go.jp/', desc:'Official SSW visa job portal', icon:'🛂'},
]

function ResumeForm() {
const [form, setForm] = useState({
fullName: '', email: '', country: '', jobType: '', japaneseLevel: '', experience: ''
})
const [pdfFile, setPdfFile] = useState<File|null>(null)
const [submitting, setSubmitting] = useState(false)
const [submitted, setSubmitted] = useState(false)
const [result, setResult] = useState<any>(null)
const [uploadProgress, setUploadProgress] = useState('')

async function handleSubmit() {
if (!form.fullName || !form.email || !form.jobType) return
setSubmitting(true)
setUploadProgress('Uploading...')
try {
let resumeUrl = ''
if (pdfFile) {
const { createClient } = await import('@supabase/supabase-js')
const supabaseClient = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
const fileName = `${Date.now()}_${form.fullName.replace(/\s/g,'_')}.pdf`
const { data: uploadData, error } = await supabaseClient.storage
.from('resumes')
.upload(fileName, pdfFile)
if (!error && uploadData) resumeUrl = uploadData.path
}
setUploadProgress('AI analyzing...')
const res = await fetch('/api/submit-resume', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({...form, resumeUrl}),
})
const data = await res.json()
setResult(data.analysis)
setSubmitted(true)
} catch (error) {
console.error(error)
}
setSubmitting(false)
setUploadProgress('')
}

if (submitted) {
return (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(46,200,122,0.3)',textAlign:'center'}}>
<div style={{fontSize:'56px',marginBottom:'16px'}}>🎉</div>
<h2 style={{color:'#2EC87A',fontSize:'22px',fontWeight:'700',marginBottom:'8px'}}>Resume Submitted!</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px'}}>Our team will contact you within 2 business days.</p>
{result && (
<div style={{background:'#0D0907',borderRadius:'12px',padding:'20px',marginBottom:'20px',textAlign:'left'}}>
<h3 style={{color:'#F0A830',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>🤖 AI Job Match Analysis</h3>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginBottom:'8px'}}><strong style={{color:'white'}}>Best matching jobs:</strong> {result.suitable_jobs?.join(', ')}</p>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginBottom:'8px'}}><strong style={{color:'white'}}>Recommended visa:</strong> {result.visa_recommendation}</p>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}><strong style={{color:'white'}}>Assessment:</strong> {result.overall_assessment}</p>
</div>
)}
<a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>Ask Sakura AI 🌸</a>
</div>
)
}

return (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>📄 Submit Your Resume</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px'}}>Our AI will match you with the best job opportunities in Japan.</p>
<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'10px',padding:'16px',marginBottom:'24px',border:'1px solid rgba(46,200,122,0.2)'}}>
<p style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>✅ 完全無料 / Completely Free</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>有料職業紹介許可・登録支援機関許可取得済み</p>
</div>
<div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Full Name *</label>
<input value={form.fullName} onChange={e=>setForm(p=>({...p,fullName:e.target.value}))} placeholder="Your full name" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Email *</label>
<input value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="your@email.com" type="email" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Country</label>
<select value={form.country} onChange={e=>setForm(p=>({...p,country:e.target.value}))} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select country...</option>
<option value="Bangladesh">🇧🇩 Bangladesh</option>
<option value="Nepal">🇳🇵 Nepal</option>
<option value="Other">🌍 Other</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Job Type *</label>
<select value={form.jobType} onChange={e=>setForm(p=>({...p,jobType:e.target.value}))} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select job type...</option>
<option value="SSW特定技能">SSW (特定技能)</option>
<option value="エンジニア・IT">Engineer/IT</option>
<option value="介護">Nursing Care (介護)</option>
<option value="製造・工場">Factory/Manufacturing</option>
<option value="建設">Construction</option>
<option value="飲食・サービス">Restaurant/Service</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Japanese Level</label>
<select value={form.japaneseLevel} onChange={e=>setForm(p=>({...p,japaneseLevel:e.target.value}))} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select level...</option>
<option value="なし・初心者">None / Beginner</option>
<option value="N5">JLPT N5</option>
<option value="N4">JLPT N4</option>
<option value="N3">JLPT N3</option>
<option value="N2以上">JLPT N2 or above</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Work Experience & Skills</label>
<textarea value={form.experience} onChange={e=>setForm(p=>({...p,experience:e.target.value}))} placeholder="Describe your experience, skills, certifications..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'100px'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Resume PDF (Optional)</label>
<div style={{background:'#0D0907',border:'2px dashed rgba(255,255,255,0.2)',borderRadius:'8px',padding:'20px',textAlign:'center',cursor:'pointer'}}
onClick={()=>document.getElementById('pdf-upload')?.click()}
onDragOver={e=>e.preventDefault()}
onDrop={e=>{e.preventDefault(); const file = e.dataTransfer.files[0]; if(file?.type==='application/pdf') setPdfFile(file)}}>
<input id="pdf-upload" type="file" accept=".pdf" style={{display:'none'}} onChange={e=>{const file = e.target.files?.[0]; if(file) setPdfFile(file)}}/>
{pdfFile ? (
<div>
<p style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700'}}>✅ {pdfFile.name}</p>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{(pdfFile.size/1024/1024).toFixed(2)} MB</p>
<button onClick={e=>{e.stopPropagation(); setPdfFile(null)}} style={{background:'none',border:'none',color:'#FF8070',cursor:'pointer',fontSize:'12px',marginTop:'4px'}}>Remove</button>
</div>
) : (
<div>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'4px'}}>📄 Click or drag & drop PDF here</p>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>Max 10MB · PDF only</p>
</div>
)}
</div>
</div>
</div>
{submitting && uploadProgress && (
<div style={{background:'rgba(196,32,32,0.1)',borderRadius:'8px',padding:'10px',marginBottom:'12px',textAlign:'center'}}>
<p style={{color:'#FF8070',fontSize:'13px'}}>⏳ {uploadProgress}</p>
</div>
)}
<button onClick={handleSubmit} disabled={submitting||!form.fullName||!form.email||!form.jobType} style={{background: form.fullName&&form.email&&form.jobType ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: form.fullName&&form.email&&form.jobType ? 'pointer' : 'not-allowed',width:'100%'}}>
{submitting ? '🤖 AI is analyzing...' : 'Submit & Get AI Match 🌸'}
</button>
</div>
)
}

export default function JobsPage() {
const [selectedCategory, setSelectedCategory] = useState<any>(null)
const [activeTab, setActiveTab] = useState<'jobs'|'resume'|'consult'>('jobs')

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Jobs in Japan</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>Find the right job opportunity in Japan</p>
<p style={{color:'#2EC87A',fontSize:'13px'}}>✅ 有料職業紹介許可 · ✅ 登録支援機関許可 · 🌸 Japan Life Guide</p>
</div>

<div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
<div style={{display:'flex',gap:'8px',marginBottom:'24px'}}>
{[
{key:'jobs' as const, label:'💼 Job Categories'},
{key:'resume' as const, label:'📄 Submit Resume'},
{key:'consult' as const, label:'👨‍💼 Career Consult'},
].map(tab => (
<button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{background:activeTab===tab.key?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
{tab.label}
</button>
))}
</div>

{activeTab === 'jobs' && (
<div>
{selectedCategory ? (
<div>
<button onClick={()=>setSelectedCategory(null)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'14px',marginBottom:'16px'}}>
← Back to categories
</button>
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap'}}>
<span style={{fontSize:'48px'}}>{selectedCategory.icon}</span>
<div>
<h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>{selectedCategory.title}</h2>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'8px'}}>{selectedCategory.titleJP}</p>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.6'}}>{selectedCategory.desc}</p>
</div>
</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'20px'}}>
<div style={{background:'#0D0907',borderRadius:'10px',padding:'14px'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>Average Salary</p>
<p style={{color:'#2EC87A',fontSize:'15px',fontWeight:'700'}}>{selectedCategory.avgSalary}</p>
</div>
<div style={{background:'#0D0907',borderRadius:'10px',padding:'14px'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>Requirements</p>
<p style={{color:'#F0A830',fontSize:'13px',fontWeight:'600'}}>{selectedCategory.requirement}</p>
</div>
</div>
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>Available Industries</h3>
<div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'20px'}}>
{selectedCategory.industries.map((ind: string) => (
<span key={ind} style={{background:selectedCategory.color+'15',color:selectedCategory.color,padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'600'}}>{ind}</span>
))}
</div>
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>🔗 Job Search Sites</h3>
<div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'20px'}}>
{selectedCategory.links.map((link: any) => (
<a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" style={{background:'#0D0907',borderRadius:'8px',padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',textDecoration:'none',border:'1px solid rgba(255,255,255,0.06)'}}>
<span style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{link.label}</span>
<span style={{color:'#C42020',fontSize:'12px'}}>Visit →</span>
</a>
))}
</div>
<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
<button onClick={()=>setActiveTab('resume')} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
Submit Your Resume 📄
</button>
<button onClick={()=>setActiveTab('consult')} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'12px 24px',fontSize:'13px',cursor:'pointer'}}>
Get Career Advice 👨‍💼
</button>
</div>
</div>
</div>
) : (
<div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'14px',marginBottom:'32px'}}>
{JOB_CATEGORIES.map(cat => (
<div key={cat.id} onClick={()=>setSelectedCategory(cat)} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)',cursor:'pointer'}}
onMouseEnter={e=>(e.currentTarget.style.borderColor=cat.color+'60')}
onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
<div style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'12px'}}>
<span style={{fontSize:'36px'}}>{cat.icon}</span>
<div>
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{cat.title}</h3>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{cat.titleJP}</p>
</div>
</div>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6',marginBottom:'12px'}}>{cat.desc}</p>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<span style={{color:cat.color,fontSize:'12px',fontWeight:'700'}}>{cat.avgSalary}</span>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>View jobs →</span>
</div>
</div>
))}
</div>

<div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>🔍 Job Search Websites</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'10px'}}>
{USEFUL_SITES.map(site => (
<a key={site.url} href={site.url} target="_blank" rel="noopener noreferrer" style={{background:'#0D0907',borderRadius:'10px',padding:'14px',textDecoration:'none',border:'1px solid rgba(255,255,255,0.06)',display:'block'}}>
<div style={{fontSize:'24px',marginBottom:'6px'}}>{site.icon}</div>
<div style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'2px'}}>{site.nameEN}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{site.desc}</div>
</a>
))}
</div>
</div>

<div style={{background:'linear-gradient(135deg,rgba(46,200,122,0.15),rgba(46,200,122,0.05))',borderRadius:'12px',padding:'24px',border:'1px solid rgba(46,200,122,0.3)',textAlign:'center'}}>
<p style={{color:'#2EC87A',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>🌸 Japan Life Guide - Licensed Recruitment Agency</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'16px',lineHeight:'1.7'}}>
有料職業紹介許可・登録支援機関許可取得済み<br/>
We support Bangladesh and Nepal workers throughout their entire Japan work journey
</p>
<div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
<button onClick={()=>setActiveTab('resume')} style={{background:'#2EC87A',color:'#0D0907',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
Submit Your Resume 📄
</button>
<button onClick={()=>setActiveTab('consult')} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'12px 24px',fontSize:'13px',cursor:'pointer'}}>
Free Career Consultation
</button>
</div>
</div>
</div>
)}
</div>
)}

{activeTab === 'resume' && <ResumeForm />}

{activeTab === 'consult' && (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
<div style={{fontSize:'56px',marginBottom:'16px'}}>👨‍💼</div>
<h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'8px'}}>Free Career Consultation</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px',lineHeight:'1.7',maxWidth:'500px',margin:'0 auto 24px'}}>
Get personalized career advice from our Japan employment specialists.
</p>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px',marginBottom:'24px',textAlign:'left'}}>
{[
{icon:'🛂',title:'Visa Guidance',desc:'Which visa is right for you'},
{icon:'🏭',title:'Job Matching',desc:'Find jobs matching your skills'},
{icon:'📝',title:'Document Support',desc:'Resume and application help'},
{icon:'🌸',title:'Full Support',desc:'End-to-end support'},
].map((item,i) => (
<div key={i} style={{background:'#0D0907',borderRadius:'10px',padding:'14px',border:'1px solid rgba(255,255,255,0.06)'}}>
<div style={{fontSize:'24px',marginBottom:'6px'}}>{item.icon}</div>
<div style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{item.title}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{item.desc}</div>
</div>
))}
</div>
<a href="/visa-consult" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'14px 32px',borderRadius:'10px',fontSize:'15px',fontWeight:'700',display:'inline-block'}}>
Get Free Consultation 🌸
</a>
</div>
)}
</div>
</main>
)
}

