'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const JOB_CATEGORIES = [
{id:'all', label:'All Jobs', icon:'💼'},
{id:'SSW特定技能', label:'SSW (特定技能)', icon:'🏭'},
{id:'エンジニア・IT', label:'Engineer/IT', icon:'💻'},
{id:'介護', label:'Nursing Care', icon:'🏥'},
{id:'アルバイト', label:'Part-time', icon:'⏰'},
]

const SALARY_RANGES = [
{label:'All', min:0, max:9999999},
{label:'¥150,000+', min:150000, max:9999999},
{label:'¥200,000+', min:200000, max:9999999},
{label:'¥250,000+', min:250000, max:9999999},
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
const [jobs, setJobs] = useState<any[]>([])
const [loading, setLoading] = useState(true)
const [selectedCategory, setSelectedCategory] = useState('all')
const [selectedSalary, setSelectedSalary] = useState(0)
const [search, setSearch] = useState('')
const [selectedJob, setSelectedJob] = useState<any>(null)
const [activeTab, setActiveTab] = useState<'browse'|'resume'|'consult'>('browse')

useEffect(() => {
async function load() {
const { data } = await supabase
.from('jobs')
.select('*')
.eq('is_active', true)
.order('is_featured', { ascending: false })
.order('created_at', { ascending: false })
if (data) setJobs(data)
setLoading(false)
}
load()
}, [])

const filtered = jobs.filter(job => {
const matchCategory = selectedCategory === 'all' || job.job_type === selectedCategory
const matchSalary = job.salary_min >= SALARY_RANGES[selectedSalary].min
const matchSearch = !search || job.title?.toLowerCase().includes(search.toLowerCase()) || job.company_name?.toLowerCase().includes(search.toLowerCase()) || job.location?.toLowerCase().includes(search.toLowerCase())
return matchCategory && matchSalary && matchSearch
})

const featuredJobs = filtered.filter(j => j.is_featured)
const regularJobs = filtered.filter(j => !j.is_featured)

function getJobTypeColor(type: string) {
const colors: any = {
'SSW特定技能': '#C42020',
'エンジニア・IT': '#2EC87A',
'介護': '#A855F7',
'アルバイト': '#4A8EFF',
'製造・工場': '#F0A830',
'建設': '#FF8070',
}
return colors[type] || '#4A8EFF'
}

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Jobs in Japan 💼</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>Find real job opportunities in Japan</p>
<p style={{color:'#2EC87A',fontSize:'13px'}}>✅ 有料職業紹介許可 · ✅ 登録支援機関許可 · 🌸 Japan Life Guide</p>
</div>

<div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>

{/* Tabs */}
<div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
{[
{key:'browse' as const, label:'🔍 Browse Jobs'},
{key:'resume' as const, label:'📄 Submit Resume'},
{key:'consult' as const, label:'👨‍💼 Career Consult'},
].map(tab => (
<button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{background:activeTab===tab.key?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
{tab.label}
</button>
))}
</div>

{/* Browse Jobs */}
{activeTab === 'browse' && (
<div>
{/* Search & Filters */}
<div style={{display:'flex',gap:'10px',marginBottom:'16px',flexWrap:'wrap'}}>
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search jobs, companies, locations..." style={{flex:1,minWidth:'200px',background:'#1A2035',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>

<div style={{display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap'}}>
{JOB_CATEGORIES.map(cat => (
<button key={cat.id} onClick={()=>setSelectedCategory(cat.id)} style={{background:selectedCategory===cat.id?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
{cat.icon} {cat.label}
</button>
))}
</div>

<div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
{SALARY_RANGES.map((range,i) => (
<button key={i} onClick={()=>setSelectedSalary(i)} style={{background:selectedSalary===i?'rgba(240,168,48,0.2)':'#1A2035',border:'1px solid ' + (selectedSalary===i?'#F0A830':'rgba(255,255,255,0.08)'),borderRadius:'20px',padding:'6px 14px',color:selectedSalary===i?'#F0A830':'rgba(255,255,255,0.5)',fontSize:'12px',cursor:'pointer'}}>
{range.label}
</button>
))}
</div>

{loading ? (
<div style={{textAlign:'center',padding:'48px',color:'rgba(255,255,255,0.4)'}}>Loading jobs...</div>
) : selectedJob ? (
<div>
<button onClick={()=>setSelectedJob(null)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'14px',marginBottom:'16px'}}>← Back to jobs</button>
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap'}}>
<div style={{flex:1}}>
{selectedJob.is_featured && <span style={{background:'rgba(240,168,48,0.2)',color:'#F0A830',padding:'3px 10px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',display:'inline-block',marginBottom:'8px'}}>⭐ FEATURED</span>}
<h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>{selectedJob.title}</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'8px'}}>{selectedJob.title_jp}</p>
<div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'12px'}}>
<span style={{background:getJobTypeColor(selectedJob.job_type)+'20',color:getJobTypeColor(selectedJob.job_type),padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>{selectedJob.job_type}</span>
<span style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>📍 {selectedJob.location}</span>
<span style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700'}}>💴 ¥{selectedJob.salary_min?.toLocaleString()} - ¥{selectedJob.salary_max?.toLocaleString()}/month</span>
</div>
</div>
</div>

<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'20px'}}>
<div style={{background:'#0D0907',borderRadius:'10px',padding:'14px'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>Company</p>
<p style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{selectedJob.company_name}</p>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{selectedJob.company_name_jp}</p>
</div>
<div style={{background:'#0D0907',borderRadius:'10px',padding:'14px'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>Japanese Required</p>
<p style={{color:'#F0A830',fontSize:'14px',fontWeight:'700'}}>{selectedJob.japanese_required}</p>
</div>
</div>

{selectedJob.description && (
<div style={{marginBottom:'16px'}}>
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>Job Description</h3>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.8'}}>{selectedJob.description}</p>
</div>
)}

{selectedJob.requirements && (
<div style={{background:'rgba(74,142,255,0.1)',borderRadius:'10px',padding:'14px',marginBottom:'16px',border:'1px solid rgba(74,142,255,0.2)'}}>
<h3 style={{color:'#4A8EFF',fontSize:'13px',fontWeight:'700',marginBottom:'8px'}}>📋 Requirements</h3>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>{selectedJob.requirements}</p>
</div>
)}

{selectedJob.benefits && (
<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'10px',padding:'14px',marginBottom:'16px',border:'1px solid rgba(46,200,122,0.2)'}}>
<h3 style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700',marginBottom:'8px'}}>✅ Benefits</h3>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>{selectedJob.benefits}</p>
</div>
)}

<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
<button onClick={()=>setActiveTab('resume')} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:2}}>
Submit Resume & Apply 📄
</button>
<a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'14px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)',flex:1,textAlign:'center'}}>
Ask Sakura AI 🌸
</a>
</div>
</div>
</div>
) : (
<div>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'16px'}}>
Showing <strong style={{color:'white'}}>{filtered.length}</strong> jobs
</p>

{/* Featured Jobs */}
{featuredJobs.length > 0 && (
<div style={{marginBottom:'24px'}}>
<h2 style={{color:'#F0A830',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>⭐ Featured Jobs</h2>
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{featuredJobs.map(job => (
<div key={job.id} onClick={()=>setSelectedJob(job)} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'2px solid rgba(240,168,48,0.3)',cursor:'pointer'}}
onMouseEnter={e=>(e.currentTarget.style.borderColor='#F0A830')}
onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(240,168,48,0.3)')}>
<div style={{display:'flex',gap:'12px',alignItems:'flex-start',flexWrap:'wrap'}}>
<div style={{flex:1}}>
<div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap',marginBottom:'6px'}}>
<span style={{background:'rgba(240,168,48,0.2)',color:'#F0A830',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>⭐ FEATURED</span>
<span style={{background:getJobTypeColor(job.job_type)+'20',color:getJobTypeColor(job.job_type),padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>{job.job_type}</span>
</div>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'2px'}}>{job.title}</h3>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'6px'}}>{job.company_name} · {job.location}</p>
<div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
<span style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700'}}>¥{job.salary_min?.toLocaleString()} - ¥{job.salary_max?.toLocaleString()}/mo</span>
<span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>🗣 {job.japanese_required}</span>
</div>
</div>
<span style={{color:'#C42020',fontSize:'12px',fontWeight:'600',whiteSpace:'nowrap'}}>View →</span>
</div>
</div>
))}
</div>
</div>
)}

{/* Regular Jobs */}
{regularJobs.length > 0 && (
<div>
<h2 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>All Jobs</h2>
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{regularJobs.map(job => (
<div key={job.id} onClick={()=>setSelectedJob(job)} style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)',cursor:'pointer'}}
onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.3)')}
onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
<div style={{display:'flex',gap:'12px',alignItems:'flex-start',flexWrap:'wrap'}}>
<div style={{flex:1}}>
<div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px',flexWrap:'wrap'}}>
<span style={{background:getJobTypeColor(job.job_type)+'20',color:getJobTypeColor(job.job_type),padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>{job.job_type}</span>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>📍 {job.location}</span>
</div>
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{job.title}</h3>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'6px'}}>{job.company_name} · {job.company_name_jp}</p>
<div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
<span style={{color:'#2EC87A',fontSize:'12px',fontWeight:'700'}}>¥{job.salary_min?.toLocaleString()} - ¥{job.salary_max?.toLocaleString()}/mo</span>
<span style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>🗣 {job.japanese_required}</span>
</div>
</div>
<span style={{color:'#C42020',fontSize:'12px',fontWeight:'600',whiteSpace:'nowrap'}}>View →</span>
</div>
</div>
))}
</div>
</div>
)}

{filtered.length === 0 && (
<div style={{textAlign:'center',padding:'48px',background:'#1A2035',borderRadius:'12px'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'12px'}}>No jobs found</p>
<button onClick={()=>{setSelectedCategory('all'); setSearch(''); setSelectedSalary(0)}} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',cursor:'pointer'}}>Clear Filters</button>
</div>
)}

{/* License Banner */}
<div style={{background:'linear-gradient(135deg,rgba(46,200,122,0.15),rgba(46,200,122,0.05))',borderRadius:'12px',padding:'24px',marginTop:'24px',border:'1px solid rgba(46,200,122,0.3)',textAlign:'center'}}>
<p style={{color:'#2EC87A',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>🌸 Japan Life Guide - Licensed Recruitment Agency</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'16px'}}>有料職業紹介許可・登録支援機関許可取得済み</p>
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

