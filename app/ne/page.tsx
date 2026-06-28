'use client'
import Link from 'next/link'

export default function NepaliPage() {
return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'linear-gradient(135deg,#1A2035,#0D1520)',padding:'80px 20px',textAlign:'center',borderBottom:'3px solid #C42020'}}>
<div style={{maxWidth:'800px',margin:'0 auto'}}>
<div style={{fontSize:'48px',marginBottom:'16px'}}>🌸</div>
<h1 style={{color:'white',fontSize:'clamp(24px,5vw,48px)',fontWeight:'800',lineHeight:'1.3',marginBottom:'16px'}}>
जापानमा पढ्ने र काम गर्ने<br/>
<span style={{color:'#C42020'}}>सम्पूर्ण गाइड</span>
</h1>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'clamp(14px,2vw,18px)',lineHeight:'1.8',marginBottom:'32px'}}>
७२४+ प्रमाणित जापानी भाषा स्कुलहरू खोज्नुस्, भिसा गाइड पाउनुस् र नेपालीमा Sakura AI सँग कुरा गर्नुस्। सम्पूर्ण निःशुल्क!
</p>
<div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'32px'}}>
<Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'10px',fontSize:'16px',fontWeight:'700'}}>
🌸 निःशुल्क सुरु गर्नुस्
</Link>
<Link href="/chat" style={{background:'rgba(255,255,255,0.1)',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'10px',fontSize:'16px',border:'1px solid rgba(255,255,255,0.2)'}}>
🤖 Sakura AI सँग कुरा गर्नुस्
</Link>
</div>
<div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
<Link href="/bn" style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none'}}>🇧🇩 বাংলা</Link>
<Link href="/" style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none'}}>🇬🇧 English</Link>
</div>
</div>
</div>

<div style={{maxWidth:'1000px',margin:'0 auto',padding:'60px 20px'}}>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'16px',marginBottom:'60px'}}>
{[
{icon:'🏫',value:'७२४+',label:'प्रमाणित स्कुलहरू'},
{icon:'🛂',value:'४७',label:'प्रिफेक्चरहरू'},
{icon:'🌸',value:'२४/७',label:'AI सहायक'},
{icon:'🆓',value:'निःशुल्क',label:'सामेल हुनुस्'},
].map(stat => (
<div key={stat.label} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{fontSize:'28px',marginBottom:'8px'}}>{stat.icon}</div>
<div style={{color:'#C42020',fontSize:'24px',fontWeight:'800',marginBottom:'4px'}}>{stat.value}</div>
<div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>{stat.label}</div>
</div>
))}
</div>

<h2 style={{color:'white',fontSize:'24px',fontWeight:'700',textAlign:'center',marginBottom:'32px'}}>तपाईंका लागि के छ?</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px',marginBottom:'60px'}}>
{[
{icon:'🏫',title:'स्कुल खोज्नुस्',desc:'७२४+ प्रमाणित जापानी भाषा स्कुलहरू ब्राउज गर्नुस्।',href:'/schools'},
{icon:'🛂',title:'भिसा गाइड',desc:'विद्यार्थी भिसा, SSW भिसाका लागि चरण-दर-चरण गाइड।',href:'/visa'},
{icon:'🌸',title:'Sakura AI',desc:'नेपालीमा जुनसुकै प्रश्न सोध्नुस्।',href:'/chat'},
{icon:'💼',title:'काम खोज्नुस्',desc:'जापानमा नेपालीहरूका लागि रोजगारी।',href:'/jobs'},
{icon:'🕌',title:'हलाल गाइड',desc:'हलाल रेस्टुरेन्ट, मस्जिद र मुस्लिम-मैत्री जानकारी।',href:'/halal'},
{icon:'💰',title:'खर्च क्याल्कुलेटर',desc:'मासिक खर्चको हिसाब गर्नुस्।',href:'/cost-calculator'},
{icon:'📝',title:'JLPT अभ्यास',desc:'निःशुल्क N5, N4, N3 अभ्यास परीक्षण।',href:'/jlpt-test'},
{icon:'🎓',title:'छात्रवृत्ति',desc:'MEXT, JASSO छात्रवृत्तिको सम्पूर्ण सूची।',href:'/scholarships'},
].map(feature => (
<Link key={feature.href} href={feature.href} style={{background:'#1A2035',borderRadius:'14px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none',display:'block'}}>
<div style={{fontSize:'32px',marginBottom:'10px'}}>{feature.icon}</div>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>{feature.title}</h3>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>{feature.desc}</p>
</Link>
))}
</div>

<div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.2),rgba(139,0,0,0.1))',borderRadius:'16px',padding:'40px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
<h2 style={{color:'white',fontSize:'24px',fontWeight:'800',marginBottom:'8px'}}>आज नै जापान यात्रा सुरु गर्नुस्! 🌸</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px'}}>हजारौं नेपाली विद्यार्थीहरूसँग सामेल हुनुस्</p>
<Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 36px',borderRadius:'10px',fontSize:'16px',fontWeight:'700',display:'inline-block'}}>
निःशुल्क सामेल हुनुस् 🌸
</Link>
</div>
</div>
</main>
)
}