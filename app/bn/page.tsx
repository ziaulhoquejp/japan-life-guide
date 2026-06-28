'use client'
import Link from 'next/link'

export const metadata = {
title: 'জাপান লাইফ গাইড - বাংলাদেশি শিক্ষার্থীদের জন্য',
description: 'জাপানে পড়াশোনা ও কাজের সম্পূর্ণ গাইড। ৭২৪+ জাপানি ভাষা স্কুল, ভিসা গাইড এবং AI সহকারী।',
}

export default function BengaliPage() {
return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'linear-gradient(135deg,#1A2035,#0D1520)',padding:'80px 20px',textAlign:'center',borderBottom:'3px solid #C42020'}}>
<div style={{maxWidth:'800px',margin:'0 auto'}}>
<div style={{fontSize:'48px',marginBottom:'16px'}}>🌸</div>
<h1 style={{color:'white',fontSize:'clamp(24px,5vw,48px)',fontWeight:'800',lineHeight:'1.3',marginBottom:'16px'}}>
জাপানে পড়াশোনা ও কাজের<br/>
<span style={{color:'#C42020'}}>সম্পূর্ণ গাইড</span>
</h1>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'clamp(14px,2vw,18px)',lineHeight:'1.8',marginBottom:'32px'}}>
৭২৪+ যাচাইকৃত জাপানি ভাষা স্কুল খুঁজুন, ভিসার গাইড পান এবং বাংলায় Sakura AI-এর সাথে কথা বলুন। সম্পূর্ণ বিনামূল্যে!
</p>
<div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'32px'}}>
<Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'10px',fontSize:'16px',fontWeight:'700'}}>
🌸 বিনামূল্যে শুরু করুন
</Link>
<Link href="/chat" style={{background:'rgba(255,255,255,0.1)',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'10px',fontSize:'16px',border:'1px solid rgba(255,255,255,0.2)'}}>
🤖 Sakura AI-এর সাথে কথা বলুন
</Link>
</div>
<div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
<Link href="/ne" style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none'}}>🇳🇵 नेपाली</Link>
<Link href="/" style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none'}}>🇬🇧 English</Link>
</div>
</div>
</div>

<div style={{maxWidth:'1000px',margin:'0 auto',padding:'60px 20px'}}>

{/* Stats */}
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'16px',marginBottom:'60px'}}>
{[
{icon:'🏫',value:'৭২৪+',label:'যাচাইকৃত স্কুল'},
{icon:'🛂',value:'৪৭',label:'প্রিফেকচার'},
{icon:'🌸',value:'২৪/৭',label:'AI সহকারী'},
{icon:'🆓',value:'বিনামূল্যে',label:'যোগ দিন'},
].map(stat => (
<div key={stat.label} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{fontSize:'28px',marginBottom:'8px'}}>{stat.icon}</div>
<div style={{color:'#C42020',fontSize:'24px',fontWeight:'800',marginBottom:'4px'}}>{stat.value}</div>
<div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>{stat.label}</div>
</div>
))}
</div>

{/* Features */}
<h2 style={{color:'white',fontSize:'24px',fontWeight:'700',textAlign:'center',marginBottom:'32px'}}>আপনার জন্য কী আছে?</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px',marginBottom:'60px'}}>
{[
{icon:'🏫',title:'স্কুল খুঁজুন',desc:'৭২৪+ যাচাইকৃত জাপানি ভাষা স্কুল ব্রাউজ করুন। শহর, ফি এবং সুযোগ-সুবিধা অনুযায়ী ফিল্টার করুন।',href:'/schools'},
{icon:'🛂',title:'ভিসা গাইড',desc:'স্টুডেন্ট ভিসা, SSW ভিসা এবং ইঞ্জিনিয়ার ভিসার জন্য ধাপে ধাপে গাইড।',href:'/visa'},
{icon:'🌸',title:'Sakura AI',desc:'বাংলায় যেকোনো প্রশ্ন করুন। ভিসা, স্কুল, খরচ - সব বিষয়ে সাহায্য পান।',href:'/chat'},
{icon:'💼',title:'চাকরি খুঁজুন',desc:'জাপানে বাংলাদেশিদের জন্য চাকরির সুযোগ। SSW, ইঞ্জিনিয়ার, পার্ট-টাইম।',href:'/jobs'},
{icon:'🕌',title:'হালাল গাইড',desc:'জাপানের সব শহরে হালাল রেস্টুরেন্ট, মসজিদ এবং মুসলিম-বান্ধব তথ্য।',href:'/halal'},
{icon:'💰',title:'খরচ ক্যালকুলেটর',desc:'টোকিও থেকে ফুকুওকা - সব শহরে মাসিক খরচের হিসাব করুন।',href:'/cost-calculator'},
{icon:'📝',title:'JLPT প্র্যাকটিস',desc:'বিনামূল্যে N5, N4, N3 প্র্যাকটিস টেস্ট এবং ব্যাখ্যাসহ।',href:'/jlpt-test'},
{icon:'🎓',title:'বৃত্তি',desc:'MEXT, JASSO এবং বেসরকারি বৃত্তির সম্পূর্ণ তালিকা।',href:'/scholarships'},
].map(feature => (
<Link key={feature.href} href={feature.href} style={{background:'#1A2035',borderRadius:'14px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none',display:'block'}}
onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
<div style={{fontSize:'32px',marginBottom:'10px'}}>{feature.icon}</div>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>{feature.title}</h3>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>{feature.desc}</p>
</Link>
))}
</div>

{/* Steps */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',marginBottom:'40px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'24px',textAlign:'center'}}>কীভাবে শুরু করবেন?</h2>
<div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
{[
{step:'১',title:'বিনামূল্যে অ্যাকাউন্ট খুলুন',desc:'মাত্র ২ মিনিটে রেজিস্ট্রেশন করুন। ক্রেডিট কার্ড লাগবে না।'},
{step:'২',title:'স্কুল বা চাকরি খুঁজুন',desc:'৭২৪+ স্কুল এবং AI চাকরি ম্যাচিং সিস্টেম ব্যবহার করুন।'},
{step:'৩',title:'Sakura AI-কে জিজ্ঞাসা করুন',desc:'যেকোনো প্রশ্ন বাংলায় করুন এবং তাৎক্ষণিক উত্তর পান।'},
{step:'৪',title:'আবেদন করুন',desc:'সরাসরি Japan Life Guide থেকে স্কুল বা চাকরিতে আবেদন করুন।'},
].map(item => (
<div key={item.step} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
<div style={{width:'36px',height:'36px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'16px',fontWeight:'700',flexShrink:0}}>{item.step}</div>
<div>
<div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{item.title}</div>
<div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>{item.desc}</div>
</div>
</div>
))}
</div>
</div>

{/* CTA */}
<div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.2),rgba(139,0,0,0.1))',borderRadius:'16px',padding:'40px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
<h2 style={{color:'white',fontSize:'24px',fontWeight:'800',marginBottom:'8px'}}>আজই জাপান যাত্রা শুরু করুন! 🌸</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px'}}>হাজার হাজার বাংলাদেশি শিক্ষার্থীর সাথে যোগ দিন</p>
<Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 36px',borderRadius:'10px',fontSize:'16px',fontWeight:'700',display:'inline-block'}}>
বিনামূল্যে যোগ দিন 🌸
</Link>
</div>
</div>
</main>
)
}

