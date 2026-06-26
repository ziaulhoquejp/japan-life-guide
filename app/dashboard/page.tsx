'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function DashboardPage() {
const [user, setUser] = useState<any>(null)
const [profile, setProfile] = useState<any>(null)
const [applications, setApplications] = useState<any[]>([])
const [favorites, setFavorites] = useState<any[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
async function load() {
const { data: userData } = await supabase.auth.getUser()
if (!userData.user) { window.location.href = '/login'; return }
setUser(userData.user)

const [profileData, appsData, favsData] = await Promise.all([
supabase.from('profiles').select('*').eq('id', userData.user.id).single(),
supabase.from('applications').select('*, schools(name_en, icon, city)').eq('user_id', userData.user.id).order('created_at', { ascending: false }).limit(5),
supabase.from('favorites').select('*, schools(name_en, icon, city, annual_fee_jpy)').eq('user_id', userData.user.id).limit(4),
])

if (profileData.data) setProfile(profileData.data)
if (appsData.data) setApplications(appsData.data)
if (favsData.data) setFavorites(favsData.data)
setLoading(false)
}
load()
}, [])

if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

const isPro = profile?.plan === 'pro' || profile?.plan === 'lifetime'

const statusColors: any = {
pending: '#F0A830',
applied: '#4A8EFF',
accepted: '#2EC87A',
rejected: '#C42020',
withdrawn: 'rgba(255,255,255,0.3)',
}

const QUICK_ACTIONS = [
{href:'/schools', icon:'🏫', label:'Browse Schools'},
{href:'/chat', icon:'🌸', label:'Ask Sakura AI'},
{href:'/visa-calculator', icon:'🛂', label:'Visa Calculator'},
{href:'/cost-calculator', icon:'💰', label:'Cost Calculator'},
{href:'/jlpt-test', icon:'📝', label:'JLPT Practice'},
{href:'/visa-consult', icon:'👨‍💼', label:'Free Visa Consult'},
{href:'/scholarships', icon:'🎓', label:'Scholarships'},
{href:'/compare', icon:'⚖️', label:'Compare Schools'},
]

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
{/* Header */}
<div style={{background:'linear-gradient(135deg,#1A2035,#0D1520)',padding:'32px 20px',borderBottom:'3px solid #C42020'}}>
<div style={{maxWidth:'1000px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'16px'}}>
<div>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'4px'}}>Welcome back,</p>
<h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'8px'}}>{profile?.full_name || user?.email} 🌸</h1>
<div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
<span style={{background: isPro ? 'rgba(240,168,48,0.2)' : 'rgba(255,255,255,0.08)',color: isPro ? '#F0A830' : 'rgba(255,255,255,0.5)',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>
{isPro ? '💎 Pro Member' : '🆓 Free Plan'}
</span>
{profile?.country && (
<span style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.5)',padding:'4px 12px',borderRadius:'20px',fontSize:'12px'}}>
{profile.country === 'Bangladesh' ? '🇧🇩' : profile.country === 'Nepal' ? '🇳🇵' : '🌍'} {profile.country}
</span>
)}
{profile?.japanese_level && (
<span style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.5)',padding:'4px 12px',borderRadius:'20px',fontSize:'12px'}}>
📝 JLPT {profile.japanese_level.toUpperCase()}
</span>
)}
</div>
</div>
<a href="/profile" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>
Edit Profile →
</a>
</div>
</div>

<div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>

{/* Pro Banner */}
{!isPro && (
<div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.2),rgba(139,0,0,0.1))',borderRadius:'12px',padding:'20px',marginBottom:'24px',border:'1px solid rgba(196,32,32,0.3)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
<div>
<p style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'4px'}}>💎 Upgrade to Pro</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>Unlock unlimited AI chat, applications, and more!</p>
</div>
<a href="/pricing" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 24px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',whiteSpace:'nowrap'}}>
Upgrade Now →
</a>
</div>
)}

{/* Stats */}
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'12px',marginBottom:'24px'}}>
{[
{label:'Applications',value:applications.length,icon:'📝',color:'#C42020',href:'/applications'},
{label:'Saved Schools',value:favorites.length,icon:'❤️',color:'#F0A830',href:'/schools'},
{label:'Plan',value: isPro ? 'Pro' : 'Free',icon:'💎',color: isPro ? '#F0A830' : '#4A8EFF',href:'/pricing'},
{label:'JLPT Level',value: profile?.japanese_level?.toUpperCase() || 'N/A',icon:'📝',color:'#2EC87A',href:'/jlpt-test'},
].map(stat => (
<a key={stat.label} href={stat.href} style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center',textDecoration:'none',display:'block'}}
onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.3)')}
onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
<div style={{fontSize:'24px',marginBottom:'6px'}}>{stat.icon}</div>
<div style={{color:stat.color,fontSize:'20px',fontWeight:'800',marginBottom:'2px'}}>{stat.value}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{stat.label}</div>
</a>
))}
</div>

{/* Quick Actions */}
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>⚡ Quick Actions</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))',gap:'8px'}}>
{QUICK_ACTIONS.map(action => (
<a key={action.href} href={action.href} style={{background:'#0D0907',borderRadius:'10px',padding:'14px 8px',textAlign:'center',textDecoration:'none',border:'1px solid rgba(255,255,255,0.06)',display:'block'}}
onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.3)')}
onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.06)')}>
<div style={{fontSize:'24px',marginBottom:'6px'}}>{action.icon}</div>
<div style={{color:'rgba(255,255,255,0.7)',fontSize:'11px',fontWeight:'600',lineHeight:'1.3'}}>{action.label}</div>
</a>
))}
</div>
</div>

<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'24px'}}>

{/* Recent Applications */}
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
<h2 style={{color:'white',fontSize:'15px',fontWeight:'700'}}>📝 My Applications</h2>
<a href="/applications" style={{color:'#C42020',fontSize:'12px',textDecoration:'none'}}>View all →</a>
</div>
{applications.length === 0 ? (
<div style={{textAlign:'center',padding:'20px'}}>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',marginBottom:'12px'}}>No applications yet</p>
<a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'700'}}>Browse Schools</a>
</div>
) : applications.map(app => (
<div key={app.id} style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
<span style={{fontSize:'20px'}}>{app.schools?.icon || '🏫'}</span>
<div style={{flex:1}}>
<div style={{color:'white',fontSize:'12px',fontWeight:'600',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{app.schools?.name_en}</div>
<div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{app.schools?.city}</div>
</div>
<span style={{background:statusColors[app.status]+'20',color:statusColors[app.status],padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',textTransform:'capitalize',flexShrink:0}}>
{app.status}
</span>
</div>
))}
</div>

{/* Saved Schools */}
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
<h2 style={{color:'white',fontSize:'15px',fontWeight:'700'}}>❤️ Saved Schools</h2>
<a href="/schools" style={{color:'#C42020',fontSize:'12px',textDecoration:'none'}}>Browse more →</a>
</div>
{favorites.length === 0 ? (
<div style={{textAlign:'center',padding:'20px'}}>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',marginBottom:'12px'}}>No saved schools yet</p>
<a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'700'}}>Browse Schools</a>
</div>
) : favorites.map(fav => (
<a key={fav.id} href={'/schools/' + fav.school_id} style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',textDecoration:'none'}}>
<span style={{fontSize:'20px'}}>{fav.schools?.icon || '🏫'}</span>
<div style={{flex:1}}>
<div style={{color:'white',fontSize:'12px',fontWeight:'600',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{fav.schools?.name_en}</div>
<div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{fav.schools?.city} · ¥{fav.schools?.annual_fee_jpy?.toLocaleString()}</div>
</div>
</a>
))}
</div>
</div>

{/* Visa Progress */}
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>🛂 Your Japan Journey Progress</h2>
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
{[
{step:'Create Account', done:true, href:'/dashboard'},
{step:'Browse Schools', done:applications.length > 0 || favorites.length > 0, href:'/schools'},
{step:'Apply to a School', done:applications.length > 0, href:'/apply'},
{step:'Check Visa Requirements', done:false, href:'/visa'},
{step:'Free Visa Consultation', done:false, href:'/visa-consult'},
].map((item, i) => (
<a key={i} href={item.href} style={{display:'flex',gap:'12px',alignItems:'center',textDecoration:'none'}}>
<div style={{width:'24px',height:'24px',borderRadius:'50%',background: item.done ? '#2EC87A' : 'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',color:'white',flexShrink:0}}>
{item.done ? '✓' : i+1}
</div>
<div style={{flex:1,height:'2px',background: item.done ? '#2EC87A' : 'rgba(255,255,255,0.1)',borderRadius:'1px'}}/>
<span style={{color: item.done ? '#2EC87A' : 'rgba(255,255,255,0.5)',fontSize:'13px',whiteSpace:'nowrap'}}>{item.step}</span>
</a>
))}
</div>
</div>

{/* Recommended Actions */}
<div style={{background:'rgba(46,200,122,0.05)',borderRadius:'12px',padding:'20px',border:'1px solid rgba(46,200,122,0.2)'}}>
<h2 style={{color:'#2EC87A',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>💡 Recommended Next Steps</h2>
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{applications.length === 0 && (
<a href="/schools" style={{display:'flex',gap:'12px',alignItems:'center',textDecoration:'none',background:'rgba(255,255,255,0.04)',borderRadius:'8px',padding:'12px'}}>
<span style={{fontSize:'20px'}}>🏫</span>
<div>
<div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>Find your perfect school</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>Browse 724+ verified Japanese language schools</div>
</div>
</a>
)}
<a href="/chat" style={{display:'flex',gap:'12px',alignItems:'center',textDecoration:'none',background:'rgba(255,255,255,0.04)',borderRadius:'8px',padding:'12px'}}>
<span style={{fontSize:'20px'}}>🌸</span>
<div>
<div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>Ask Sakura AI</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>Get personalized advice in Bengali, Nepali, or English</div>
</div>
</a>
<a href="/visa-consult" style={{display:'flex',gap:'12px',alignItems:'center',textDecoration:'none',background:'rgba(255,255,255,0.04)',borderRadius:'8px',padding:'12px'}}>
<span style={{fontSize:'20px'}}>👨‍💼</span>
<div>
<div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>Free Visa Consultation</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>Get matched with an immigration specialist</div>
</div>
</a>
</div>
</div>
</div>
</main>
)
}