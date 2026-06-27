'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

export default function HomePage() {
const [stats, setStats] = useState({
schools: 724,
users: 0,
applications: 0,
countries: 40,
})
const [displayStats, setDisplayStats] = useState({
schools: 0,
users: 0,
applications: 0,
countries: 0,
})
const [loading, setLoading] = useState(true)

useEffect(() => {
async function loadStats() {
const [usersData, appsData] = await Promise.all([
supabase.from('profiles').select('id', { count: 'exact', head: true }),
supabase.from('applications').select('id', { count: 'exact', head: true }),
])
const newStats = {
schools: 724,
users: usersData.count || 0,
applications: appsData.count || 0,
countries: 40,
}
setStats(newStats)
setLoading(false)

// アニメーションカウンター
const duration = 2000
const steps = 60
const interval = duration / steps
let step = 0
const timer = setInterval(() => {
step++
const progress = step / steps
const eased = 1 - Math.pow(1 - progress, 3)
setDisplayStats({
schools: Math.round(newStats.schools * eased),
users: Math.round(newStats.users * eased),
applications: Math.round(newStats.applications * eased),
countries: Math.round(newStats.countries * eased),
})
if (step >= steps) clearInterval(timer)
}, interval)
}
loadStats()
}, [])

const FEATURES = [
{icon:'🏫',title:'724+ Verified Schools',desc:'Browse real Japanese language schools across all 47 prefectures with official website links',href:'/schools'},
{icon:'🛂',title:'Visa Guidance',desc:'Step-by-step guidance for Student, SSW, and Engineer visas with eligibility calculator',href:'/visa'},
{icon:'🌸',title:'Sakura AI Assistant',desc:'24/7 AI assistant in Bengali, Nepali, Japanese, and English powered by Japan Life Guide AI',href:'/chat'},
{icon:'💼',title:'Job Matching',desc:'Find jobs in Japan with our AI-powered matching system. Licensed recruitment agency.',href:'/jobs'},
{icon:'🕌',title:'Halal & Muslim Guide',desc:'Find halal food, mosques, and Muslim-friendly resources across Japan',href:'/halal'},
{icon:'🎓',title:'Scholarships',desc:'Discover MEXT, JASSO, and private scholarships available for international students',href:'/scholarships'},
{icon:'📝',title:'JLPT Practice',desc:'Free practice tests for N5, N4, and N3 with detailed explanations',href:'/jlpt-test'},
{icon:'👨‍💼',title:'Free Visa Consult',desc:'Get matched with immigration specialists. AI-powered matching system.',href:'/visa-consult'},
]

const TESTIMONIALS = [
{name:'Rahman A.',country:'🇧🇩 Bangladesh',text:'Japan Life Guide helped me find the perfect language school in Tokyo. The Sakura AI answered all my questions in Bengali!',role:'Student in Tokyo'},
{name:'Priya S.',country:'🇳🇵 Nepal',text:'I got my SSW visa with help from Japan Life Guide. The visa calculator was so helpful!',role:'Working in Osaka'},
{name:'Karim M.',country:'🇧🇩 Bangladesh',text:'The halal food guide is amazing. I found halal restaurants near my school easily.',role:'Student in Nagoya'},
]

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>

{/* Hero Section */}
<div style={{background:'linear-gradient(135deg,#1A2035 0%,#0D1520 50%,#1A0A0A 100%)',padding:'80px 20px',textAlign:'center',borderBottom:'3px solid #C42020',position:'relative',overflow:'hidden'}}>
<div style={{position:'absolute',top:0,left:0,right:0,bottom:0,opacity:0.05,backgroundImage:'radial-gradient(circle at 20% 50%, #C42020 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4A8EFF 0%, transparent 40%)'}}/>
<div style={{position:'relative',maxWidth:'800px',margin:'0 auto'}}>
<div style={{display:'inline-flex',gap:'8px',background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'20px',padding:'6px 16px',marginBottom:'20px'}}>
<span style={{color:'#FF8070',fontSize:'12px',fontWeight:'700'}}>🌸 #1 Japan Study Guide for BD & NP Students</span>
</div>
<h1 style={{color:'white',fontSize:'clamp(28px,5vw,52px)',fontWeight:'800',lineHeight:'1.2',marginBottom:'16px'}}>
Your Complete Guide to<br/>
<span style={{color:'#C42020'}}>Study & Work in Japan</span>
</h1>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'clamp(14px,2vw,18px)',lineHeight:'1.7',marginBottom:'32px',maxWidth:'600px',margin:'0 auto 32px'}}>
Find 724+ verified Japanese language schools, get visa guidance, and chat with Sakura AI in Bengali (বাংলা), Nepali (नेपाली), and English. 完全無料！
</p>
<div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'32px'}}>
<Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'10px',fontSize:'16px',fontWeight:'700',display:'inline-block'}}>
🌸 Get Started Free
</Link>
<Link href="/schools" style={{background:'rgba(255,255,255,0.1)',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'10px',fontSize:'16px',border:'1px solid rgba(255,255,255,0.2)',display:'inline-block'}}>
🏫 Browse Schools
</Link>
</div>
<div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
{['🆓 Free to join','🤖 AI-powered','🇧🇩 Bengali support','🇳🇵 Nepali support'].map(badge => (
<span key={badge} style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{badge}</span>
))}
</div>
</div>
</div>

{/* Stats Section */}
<div style={{background:'#1A2035',padding:'40px 20px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'20px'}}>
{[
{label:'Verified Schools',value:displayStats.schools,suffix:'+',color:'#C42020',icon:'🏫'},
{label:'Students Registered',value:displayStats.users,suffix:'+',color:'#2EC87A',icon:'👤'},
{label:'Applications Submitted',value:displayStats.applications,suffix:'+',color:'#F0A830',icon:'📝'},
{label:'Countries Reached',value:displayStats.countries,suffix:'+',color:'#4A8EFF',icon:'🌏'},
].map(stat => (
<div key={stat.label} style={{textAlign:'center'}}>
<div style={{fontSize:'28px',marginBottom:'6px'}}>{stat.icon}</div>
<div style={{color:stat.color,fontSize:'clamp(28px,4vw,40px)',fontWeight:'800',lineHeight:'1'}}>
{stat.value.toLocaleString()}{stat.suffix}
</div>
<div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginTop:'4px'}}>{stat.label}</div>
</div>
))}
</div>
</div>

{/* Features Grid */}
<div style={{maxWidth:'1100px',margin:'0 auto',padding:'60px 20px'}}>
<h2 style={{color:'white',fontSize:'28px',fontWeight:'700',textAlign:'center',marginBottom:'8px'}}>Everything You Need</h2>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',textAlign:'center',marginBottom:'40px'}}>All the tools and information to make your Japan dream a reality</p>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'16px'}}>
{FEATURES.map(feature => (
<Link key={feature.href} href={feature.href} style={{background:'#1A2035',borderRadius:'14px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none',display:'block'}}
onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
<div style={{fontSize:'36px',marginBottom:'12px'}}>{feature.icon}</div>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>{feature.title}</h3>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>{feature.desc}</p>
</Link>
))}
</div>
</div>

{/* For Companies */}
<div style={{background:'#1A2035',padding:'60px 20px',borderTop:'1px solid rgba(255,255,255,0.08)',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'center'}}>
<div>
<span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',display:'inline-block',marginBottom:'16px'}}>FOR COMPANIES 企業様へ</span>
<h2 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'12px'}}>外国人材採用をサポート</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',lineHeight:'1.8',marginBottom:'20px'}}>
バングラデシュ・ネパールの優秀な人材をご紹介します。有料職業紹介許可・登録支援機関許可取得済み。成功報酬型なので採用が決まるまで費用ゼロ。
</p>
<div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'24px'}}>
{['✅ 有料職業紹介許可取得済み','✅ 登録支援機関許可取得済み','✅ 成功報酬型・採用後のみ費用発生','✅ ビザ手続き・登録支援サポート'].map(item => (
<p key={item} style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{item}</p>
))}
</div>
<Link href="/recruit" style={{background:'#2EC87A',color:'#0D0907',textDecoration:'none',padding:'14px 28px',borderRadius:'10px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>
求人を掲載する →
</Link>
</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
{[
{icon:'🏭',label:'製造業'},
{icon:'🍜',label:'飲食業'},
{icon:'🏥',label:'介護'},
{icon:'🏗️',label:'建設業'},
{icon:'💻',label:'IT'},
{icon:'🌾',label:'農業'},
].map(item => (
<div key={item.label} style={{background:'#0D0907',borderRadius:'10px',padding:'16px',textAlign:'center',border:'1px solid rgba(255,255,255,0.06)'}}>
<div style={{fontSize:'28px',marginBottom:'6px'}}>{item.icon}</div>
<div style={{color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>{item.label}</div>
</div>
))}
</div>
</div>
</div>

{/* Testimonials */}
<div style={{maxWidth:'1000px',margin:'0 auto',padding:'60px 20px'}}>
<h2 style={{color:'white',fontSize:'28px',fontWeight:'700',textAlign:'center',marginBottom:'8px'}}>Student Stories</h2>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',textAlign:'center',marginBottom:'40px'}}>From Bangladesh and Nepal to Japan 🌸</p>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px'}}>
{TESTIMONIALS.map((t,i) => (
<div key={i} style={{background:'#1A2035',borderRadius:'14px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<p style={{color:'rgba(255,255,255,0.7)',fontSize:'14px',lineHeight:'1.7',marginBottom:'16px',fontStyle:'italic'}}>"{t.text}"</p>
<div style={{display:'flex',gap:'10px',alignItems:'center'}}>
<div style={{width:'36px',height:'36px',borderRadius:'50%',background:'linear-gradient(135deg,#C42020,#FF8070)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'14px',fontWeight:'700'}}>
{t.name[0]}
</div>
<div>
<div style={{color:'white',fontSize:'13px',fontWeight:'700'}}>{t.name} <span>{t.country}</span></div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{t.role}</div>
</div>
</div>
</div>
))}
</div>
</div>

{/* CTA Section */}
<div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.2),rgba(139,0,0,0.1))',padding:'60px 20px',textAlign:'center',borderTop:'1px solid rgba(196,32,32,0.3)'}}>
<h2 style={{color:'white',fontSize:'clamp(22px,4vw,36px)',fontWeight:'800',marginBottom:'12px'}}>
Start Your Japan Journey Today! 🌸
</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'32px'}}>
Join {stats.users > 0 ? stats.users.toLocaleString() + '+' : 'thousands of'} students from Bangladesh and Nepal
</p>
<div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
<Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 36px',borderRadius:'10px',fontSize:'16px',fontWeight:'700',display:'inline-block'}}>
🌸 Join Free Now
</Link>
<Link href="/chat" style={{background:'rgba(255,255,255,0.1)',color:'white',textDecoration:'none',padding:'16px 36px',borderRadius:'10px',fontSize:'16px',border:'1px solid rgba(255,255,255,0.2)',display:'inline-block'}}>
Ask Sakura AI
</Link>
</div>
</div>
</main>
)
}

