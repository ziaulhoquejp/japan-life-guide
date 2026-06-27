'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const ADMIN_EMAILS = ['ziaulhoquejp@gmail.com', 'sacrifice4ever@gmail.com']

type TabType = 'overview' | 'users' | 'applications' | 'feedback' | 'newsletter' | 'crm' | 'jobseekers' | 'analytics'


function JobSeekersTab() {
const [seekers, setSeekers] = useState<any[]>([])
const [loading, setLoading] = useState(true)
const [sending, setSending] = useState<string|null>(null)

useEffect(() => {
supabase.from('job_seekers').select('*').order('created_at', { ascending: false }).then(({ data }) => {
if (data) setSeekers(data)
setLoading(false)
})
}, [])

async function sendOutreach(seekerId: string) {
setSending(seekerId)
try {
const res = await fetch('/api/company-outreach', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ jobSeekerId: seekerId }),
})
const data = await res.json()
alert(`✅ ${data.emailsSent}社に営業メールを送信しました！`)
setSeekers(prev => prev.map(s => s.id === seekerId ? {...s, status: 'contacted'} : s))
} catch (error) {
alert('エラーが発生しました')
}
setSending(null)
}

if (loading) return <div style={{color:'white',padding:'20px'}}>Loading...</div>

return (
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
<h2 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>💼 Job Seekers ({seekers.length})</h2>
<span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{seekers.filter(s=>s.status==='new').length} new</span>
</div>
{seekers.length === 0 ? (
<div style={{textAlign:'center',padding:'48px',background:'#1A2035',borderRadius:'12px'}}>
<p style={{color:'rgba(255,255,255,0.4)'}}>No job seekers yet</p>
</div>
) : seekers.map(seeker => (
<div key={seeker.id} style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid ' + (seeker.status==='new' ? 'rgba(196,32,32,0.3)' : 'rgba(255,255,255,0.08)')}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'10px',marginBottom:'10px'}}>
<div>
<div style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{seeker.full_name}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{seeker.email} · {seeker.country}</div>
</div>
<div style={{display:'flex',gap:'8px',alignItems:'center'}}>
<span style={{background: seeker.status==='new' ? 'rgba(196,32,32,0.2)' : 'rgba(46,200,122,0.2)',color: seeker.status==='new' ? '#FF8070' : '#2EC87A',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>
{seeker.status === 'new' ? '🆕 New' : '✅ Contacted'}
</span>
{seeker.status === 'new' && (
<button onClick={()=>sendOutreach(seeker.id)} disabled={sending===seeker.id} style={{background:'#C42020',color:'white',border:'none',borderRadius:'6px',padding:'6px 12px',fontSize:'11px',fontWeight:'700',cursor:'pointer'}}>
{sending===seeker.id ? '送信中...' : '🤖 企業に営業メール送信'}
</button>
)}
</div>
</div>
<div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
<span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.5)',padding:'2px 8px',borderRadius:'4px',fontSize:'11px'}}>{seeker.job_type}</span>
<span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.5)',padding:'2px 8px',borderRadius:'4px',fontSize:'11px'}}>日本語: {seeker.japanese_level || 'N/A'}</span>
<span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.5)',padding:'2px 8px',borderRadius:'4px',fontSize:'11px'}}>{new Date(seeker.created_at).toLocaleDateString()}</span>
</div>
{seeker.experience && (
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'8px',lineHeight:'1.5'}}>{seeker.experience.slice(0,150)}{seeker.experience.length > 150 ? '...' : ''}</p>
)}
</div>
))}
</div>
)
}

export default function AdminPage() {
const [user, setUser] = useState<any>(null)
const [stats, setStats] = useState<any>({})
const [users, setUsers] = useState<any[]>([])
const [feedback, setFeedback] = useState<any[]>([])
const [applications, setApplications] = useState<any[]>([])
const [activeTab, setActiveTab] = useState<TabType>('overview')
const [loading, setLoading] = useState(true)
const [newsletter, setNewsletter] = useState({subject:'',message:''})
const [sending, setSending] = useState(false)
const [sent, setSent] = useState(false)

useEffect(() => {
async function load() {
const { data: userData } = await supabase.auth.getUser()
if (!userData.user || !ADMIN_EMAILS.includes(userData.user.email || '')) {
window.location.href = '/'
return
}
setUser(userData.user)

const [profilesData, feedbackData, appsData, schoolsData] = await Promise.all([
supabase.from('profiles').select('*').order('created_at', { ascending: false }),
supabase.from('feedback').select('*').order('created_at', { ascending: false }),
supabase.from('applications').select('*, schools(name_en), profiles(id)').order('created_at', { ascending: false }),
supabase.from('schools').select('id', { count: 'exact', head: true }),
])

const profiles = profilesData.data || []
setUsers(profiles)
setFeedback(feedbackData.data || [])
setApplications(appsData.data || [])

setStats({
totalUsers: profiles.length,
proUsers: profiles.filter(p => p.plan === 'pro' || p.plan === 'lifetime').length,
totalSchools: schoolsData.count || 0,
totalApplications: appsData.data?.length || 0,
totalFeedback: feedbackData.data?.length || 0,
newUsersToday: profiles.filter(p => new Date(p.created_at).toDateString() === new Date().toDateString()).length,
})
setLoading(false)
}
load()
}, [])

async function sendNewsletter() {
if (!newsletter.subject || !newsletter.message) return
setSending(true)
try {
await fetch('/api/send-newsletter', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
subject: newsletter.subject,
message: newsletter.message,
emails: users.map(u => u.email).filter(Boolean),
}),
})
setSent(true)
setNewsletter({subject:'',message:''})
} catch (error) {
console.error('Newsletter error:', error)
}
setSending(false)
}

async function updateApplicationStatus(id: string, status: string) {
await supabase.from('applications').update({ status }).eq('id', id)
setApplications(prev => prev.map(a => a.id === id ? {...a, status} : a))
}

if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading Admin...</div>

const statusColors: any = {
pending: '#F0A830',
applied: '#4A8EFF',
accepted: '#2EC87A',
rejected: '#C42020',
withdrawn: 'rgba(255,255,255,0.3)',
}

const TABS: {key: TabType, label: string}[] = [
{key:'overview', label:'📊 Overview'},
{key:'users', label:`👤 Users (${stats.totalUsers})`},
{key:'applications', label:`📝 Applications (${stats.totalApplications})`},
{key:'feedback', label:`💬 Feedback (${stats.totalFeedback})`},
{key:'newsletter', label:'📧 Newsletter'},
{key:'crm', label:'📊 CRM'},
{key:'jobseekers', label:'💼 Job Seekers'},
{key:'analytics' as TabType, label:'📈 Analytics'},
]

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'linear-gradient(135deg,#1A2035,#0D1520)',padding:'32px 20px',borderBottom:'3px solid #C42020'}}>
<div style={{maxWidth:'1200px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
<div>
<h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>🛠 Admin Dashboard</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Welcome back, {user?.email}</p>
</div>
<a href="/" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>← Back to Site</a>
</div>
</div>

<div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>

{/* Stats */}
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'12px',marginBottom:'24px'}}>
{[
{label:'Total Users',value:stats.totalUsers,color:'#4A8EFF',icon:'👤'},
{label:'Pro Members',value:stats.proUsers,color:'#F0A830',icon:'💎'},
{label:'New Today',value:stats.newUsersToday,color:'#2EC87A',icon:'🆕'},
{label:'Total Schools',value:stats.totalSchools,color:'#C42020',icon:'🏫'},
{label:'Applications',value:stats.totalApplications,color:'#A855F7',icon:'📝'},
{label:'Feedback',value:stats.totalFeedback,color:'#FF8070',icon:'💬'},
].map(stat => (
<div key={stat.label} style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
<div style={{fontSize:'24px',marginBottom:'6px'}}>{stat.icon}</div>
<div style={{color:stat.color,fontSize:'24px',fontWeight:'800',marginBottom:'2px'}}>{stat.value}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{stat.label}</div>
</div>
))}
</div>

{/* Tabs */}
<div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
{TABS.map(tab => (
<button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{background:activeTab===tab.key?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
{tab.label}
</button>
))}
</div>

{/* Overview */}
{activeTab === 'overview' && (
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>📊 User Plan Distribution</h3>
{[
{plan:'Free',count:stats.totalUsers-stats.proUsers,color:'#4A8EFF'},
{plan:'Pro',count:stats.proUsers,color:'#F0A830'},
].map(item => (
<div key={item.plan} style={{marginBottom:'12px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
<span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{item.plan}</span>
<span style={{color:item.color,fontSize:'13px',fontWeight:'700'}}>{item.count}</span>
</div>
<div style={{height:'6px',background:'rgba(255,255,255,0.08)',borderRadius:'3px',overflow:'hidden'}}>
<div style={{width: stats.totalUsers > 0 ? (item.count/stats.totalUsers*100)+'%' : '0%',height:'100%',background:item.color,borderRadius:'3px'}}/>
</div>
</div>
))}
</div>
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>📝 Recent Applications</h3>
{applications.slice(0,5).map(app => (
<div key={app.id} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
<span style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1}}>{app.schools?.name_en || 'Unknown School'}</span>
<span style={{background:statusColors[app.status]+'20',color:statusColors[app.status],padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',marginLeft:'8px',flexShrink:0,textTransform:'capitalize'}}>{app.status}</span>
</div>
))}
</div>
</div>
)}

{/* Users */}
{activeTab === 'users' && (
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>👤 All Users</h3>
<div style={{overflowX:'auto'}}>
<table style={{width:'100%',borderCollapse:'collapse'}}>
<thead>
<tr>
{['Email','Country','Plan','Joined'].map(h => (
<th key={h} style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',textAlign:'left',padding:'8px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>{h}</th>
))}
</tr>
</thead>
<tbody>
{users.slice(0,20).map(u => (
<tr key={u.id}>
<td style={{color:'white',fontSize:'12px',padding:'10px 8px',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>{u.email || 'N/A'}</td>
<td style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',padding:'10px 8px',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>{u.country || 'N/A'}</td>
<td style={{padding:'10px 8px',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
<span style={{background: u.plan==='pro'||u.plan==='lifetime' ? 'rgba(240,168,48,0.2)' : 'rgba(255,255,255,0.06)',color: u.plan==='pro'||u.plan==='lifetime' ? '#F0A830' : 'rgba(255,255,255,0.4)',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',textTransform:'capitalize'}}>
{u.plan || 'free'}
</span>
</td>
<td style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',padding:'10px 8px',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>{new Date(u.created_at).toLocaleDateString()}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
)}

{/* Applications */}
{activeTab === 'applications' && (
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{applications.length === 0 ? (
<div style={{textAlign:'center',padding:'48px',background:'#1A2035',borderRadius:'12px'}}>
<p style={{color:'rgba(255,255,255,0.4)'}}>No applications yet</p>
</div>
) : applications.map(app => (
<div key={app.id} style={{background:'#1A2035',borderRadius:'12px',padding:'16px',display:'flex',gap:'14px',alignItems:'center',flexWrap:'wrap',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{flex:1}}>
<div style={{color:'white',fontSize:'13px',fontWeight:'600',marginBottom:'2px'}}>{app.schools?.name_en || 'Unknown School'}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{app.full_name} · {app.email} · {new Date(app.created_at).toLocaleDateString()}</div>
</div>
<select value={app.status} onChange={e=>updateApplicationStatus(app.id, e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'6px 12px',color:'white',fontSize:'12px',cursor:'pointer',outline:'none'}}>
{['pending','applied','accepted','rejected','withdrawn'].map(s => (
<option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
))}
</select>
</div>
))}
</div>
)}

{/* Feedback */}
{activeTab === 'feedback' && (
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{feedback.length === 0 ? (
<div style={{textAlign:'center',padding:'48px',background:'#1A2035',borderRadius:'12px'}}>
<p style={{color:'rgba(255,255,255,0.4)'}}>No feedback yet</p>
</div>
) : feedback.map(item => (
<div key={item.id} style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
<span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>{item.type || 'feedback'}</span>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{new Date(item.created_at).toLocaleDateString()}</span>
</div>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6',whiteSpace:'pre-wrap'}}>{item.message}</p>
</div>
))}
</div>
)}

{/* Newsletter */}
{activeTab === 'newsletter' && (
<div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>📧 Send Newsletter</h3>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'16px'}}>Send to {users.length} registered users</p>
{sent ? (
<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'10px',padding:'20px',textAlign:'center',border:'1px solid rgba(46,200,122,0.3)'}}>
<p style={{color:'#2EC87A',fontWeight:'700',fontSize:'15px'}}>✅ Newsletter sent successfully!</p>
</div>
) : (
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
<input value={newsletter.subject} onChange={e=>setNewsletter(prev=>({...prev,subject:e.target.value}))} placeholder="Email subject..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
<textarea value={newsletter.message} onChange={e=>setNewsletter(prev=>({...prev,message:e.target.value}))} placeholder="Newsletter message..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'150px'}}/>
<button onClick={sendNewsletter} disabled={sending||!newsletter.subject||!newsletter.message} style={{background: newsletter.subject&&newsletter.message ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: newsletter.subject&&newsletter.message ? 'pointer' : 'not-allowed'}}>
{sending ? 'Sending...' : `Send to ${users.length} Users`}
</button>
</div>
)}
</div>
)}

{/* CRM */}
{activeTab === 'crm' && (
<div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px'}}>
{[
{label:'Total Users',value:stats.totalUsers,color:'#4A8EFF',icon:'👤'},
{label:'Pro Members',value:stats.proUsers,color:'#F0A830',icon:'💎'},
{label:'Conversion Rate',value: stats.totalUsers > 0 ? Math.round((stats.proUsers/stats.totalUsers)*100)+'%' : '0%',color:'#2EC87A',icon:'📈'},
{label:'Applications',value:stats.totalApplications,color:'#C42020',icon:'📝'},
].map(stat => (
<div key={stat.label} style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
<div style={{fontSize:'24px',marginBottom:'6px'}}>{stat.icon}</div>
<div style={{color:stat.color,fontSize:'22px',fontWeight:'800',marginBottom:'2px'}}>{stat.value}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{stat.label}</div>
</div>
))}
</div>
<div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>📊 User Journey Funnel</h3>
{[
{stage:'Registered',count:stats.totalUsers,color:'#4A8EFF'},
{stage:'Applied to School',count:stats.totalApplications,color:'#F0A830'},
{stage:'Upgraded to Pro',count:stats.proUsers,color:'#2EC87A'},
].map(item => (
<div key={item.stage} style={{marginBottom:'14px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
<span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{item.stage}</span>
<span style={{color:item.color,fontSize:'13px',fontWeight:'700'}}>{item.count}</span>
</div>
<div style={{height:'8px',background:'rgba(255,255,255,0.06)',borderRadius:'4px',overflow:'hidden'}}>
<div style={{width: stats.totalUsers > 0 ? (item.count/stats.totalUsers*100)+'%' : '0%',height:'100%',background:item.color,borderRadius:'4px'}}/>
</div>
</div>
))}
</div>
<div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>🕐 Recent Users</h3>
<div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
{users.slice(0,10).map(u => (
<div key={u.id} style={{display:'flex',gap:'12px',alignItems:'center',padding:'8px',background:'#0D0907',borderRadius:'8px'}}>
<div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:'700',flexShrink:0}}>
{u.full_name?.[0]?.toUpperCase() || '?'}
</div>
<div style={{flex:1}}>
<div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{u.full_name || u.email}</div>
<div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{u.country || 'Unknown'} · {new Date(u.created_at).toLocaleDateString()}</div>
</div>
<span style={{background: u.plan==='pro'||u.plan==='lifetime' ? 'rgba(240,168,48,0.2)' : 'rgba(255,255,255,0.06)',color: u.plan==='pro'||u.plan==='lifetime' ? '#F0A830' : 'rgba(255,255,255,0.3)',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',textTransform:'capitalize'}}>
{u.plan || 'free'}
</span>
</div>
))}
</div>
</div>
</div>
)}

{/* Job Seekers */}
{activeTab === 'jobseekers' && <JobSeekersTab />}
{/* Analytics */}
{activeTab === 'analytics' && (
<div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
<div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>📈 Google Analytics</h3>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'16px'}}>View detailed analytics in Google Analytics dashboard.</p>
<a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" style={{background:'#4A8EFF',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'inline-block',marginBottom:'24px'}}>
Open Google Analytics →
</a>

<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px',marginBottom:'20px'}}>
{[
{label:'GA Property ID',value:process.env.NEXT_PUBLIC_GA_ID || 'Not set',color:'#4A8EFF',icon:'🔑'},
{label:'Total Users (DB)',value:stats.totalUsers,color:'#2EC87A',icon:'👤'},
{label:'Total Applications',value:stats.totalApplications,color:'#F0A830',icon:'📝'},
{label:'Pro Members',value:stats.proUsers,color:'#A855F7',icon:'💎'},
].map(item => (
<div key={item.label} style={{background:'#0D0907',borderRadius:'10px',padding:'14px'}}>
<div style={{fontSize:'20px',marginBottom:'6px'}}>{item.icon}</div>
<div style={{color:item.color,fontSize:'16px',fontWeight:'700',marginBottom:'2px'}}>{item.value}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{item.label}</div>
</div>
))}
</div>

<div style={{background:'rgba(74,142,255,0.1)',borderRadius:'10px',padding:'16px',border:'1px solid rgba(74,142,255,0.2)'}}>
<h4 style={{color:'#4A8EFF',fontSize:'13px',fontWeight:'700',marginBottom:'12px'}}>📊 Key Pages to Track</h4>
<div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
{[
{page:'/schools',label:'School Search'},
{page:'/apply',label:'Apply Page'},
{page:'/chat',label:'Sakura AI Chat'},
{page:'/pricing',label:'Pricing Page'},
{page:'/register',label:'Registration'},
{page:'/jobs',label:'Jobs Page'},
{page:'/visa-consult',label:'Visa Consultation'},
{page:'/recruit',label:'Company Recruitment'},
].map(item => (
<div key={item.page} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
<span style={{color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>{item.label}</span>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{item.page}</span>
</div>
))}
</div>
</div>
</div>

<div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>🎯 Conversion Goals</h3>
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{[
{label:'Registration → School Apply',rate: stats.totalUsers > 0 ? Math.round((stats.totalApplications/stats.totalUsers)*100) + '%' : '0%',color:'#F0A830'},
{label:'Free → Pro Conversion',rate: stats.totalUsers > 0 ? Math.round((stats.proUsers/stats.totalUsers)*100) + '%' : '0%',color:'#2EC87A'},
{label:'Total Pro Members',rate: stats.proUsers + ' users',color:'#A855F7'},
].map(item => (
<div key={item.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#0D0907',borderRadius:'8px',padding:'12px'}}>
<span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{item.label}</span>
<span style={{color:item.color,fontSize:'14px',fontWeight:'700'}}>{item.rate}</span>
</div>
))}
</div>
</div>
</div>
)}


</div>
</main>
)
}

