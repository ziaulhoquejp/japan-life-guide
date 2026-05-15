'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>

      {/* HERO */}
      <div style={{background:'linear-gradient(135deg, #0D0907 0%, #1A0F0F 100%)',padding:'80px 40px',textAlign:'center',position:'relative',overflow:'hidden',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{position:'absolute',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle, rgba(196,32,32,0.15) 0%, transparent 70%)',top:'-100px',left:'50%',transform:'translateX(-50%)'}}/> 
        <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'#C42020',boxShadow:'0 0 60px rgba(196,32,32,0.6)',margin:'0 auto 24px',position:'relative'}}/>
        <div style={{color:'rgba(255,255,255,0.3)',fontSize:'12px',letterSpacing:'4px',marginBottom:'16px',position:'relative'}}>JAPAN LIFE GUIDE · 日本生活ガイド</div>
        <h1 style={{color:'white',fontSize:'clamp(32px, 6vw, 64px)',fontWeight:'700',lineHeight:'1.1',marginBottom:'16px',position:'relative'}}>
          Your Journey to<br/>
          <span style={{color:'#C42020'}}>Japan</span> Starts Here
        </h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'18px',maxWidth:'560px',margin:'0 auto 40px',lineHeight:'1.7',position:'relative'}}>
          Find language schools, navigate visas, get AI guidance — everything you need to study and work in Japan.
        </p>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',position:'relative'}}>
          <Link href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'10px',fontSize:'16px',fontWeight:'700'}}>
            🏫 Find Schools
          </Link>
          <Link href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'10px',fontSize:'16px',fontWeight:'600',border:'1px solid rgba(255,255,255,0.15)'}}>
            🌸 Ask Sakura AI
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:'#141E35',padding:'32px 40px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:'0',maxWidth:'800px',margin:'0 auto'}}>
          {[
            {val:'90+',label:'Language Schools'},
            {val:'14K+',label:'Community Members'},
            {val:'4',label:'Languages'},
            {val:'47',label:'Prefectures'},
            {val:'AI',label:'Powered by Claude'},
          ].map(stat => (
            <div key={stat.label} style={{textAlign:'center',padding:'16px',borderRight:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{color:'#C42020',fontSize:'28px',fontWeight:'700'}}>{stat.val}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{padding:'64px 40px',maxWidth:'1200px',margin:'0 auto'}}>
        <h2 style={{color:'white',fontSize:'32px',fontWeight:'700',textAlign:'center',marginBottom:'8px'}}>Everything You Need</h2>
        <p style={{color:'rgba(255,255,255,0.4)',textAlign:'center',marginBottom:'48px',fontSize:'16px'}}>One platform for your entire Japan journey</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'16px'}}>
          {[
            {icon:'🏫',title:'90+ Language Schools',desc:'Browse verified schools across all 47 prefectures. Filter by city, budget, dorm, JLPT prep, and scholarship.',href:'/schools',color:'#4A8EFF'},
            {icon:'🌸',title:'Sakura AI Assistant',desc:'Ask anything about Japan in English, Japanese, Bengali, or Nepali. Powered by Claude AI.',href:'/chat',color:'#C42020'},
            {icon:'🛂',title:'Visa Guide',desc:'Step-by-step student visa roadmap. From application to arrival in Japan.',href:'/visa',color:'#2EC87A'},
            {icon:'💬',title:'Community Forum',desc:'Connect with 14,000+ students from Bangladesh, Nepal, and beyond who are going to Japan.',href:'/community',color:'#F0A830'},
            {icon:'📊',title:'Personal Dashboard',desc:'Track your visa progress, manage documents, and monitor school applications.',href:'/dashboard',color:'#A855F7'},
            {icon:'💎',title:'Pro Plan ¥980/mo',desc:'Unlimited AI, document tracker, priority matching, and email reminders.',href:'/pricing',color:'#F0A830'},
          ].map(feature => (
            <Link key={feature.title} href={feature.href} style={{textDecoration:'none'}}>
              <div style={{background:'#1A2035',borderRadius:'14px',padding:'24px',border:`1px solid ${feature.color}20`,borderTop:`3px solid ${feature.color}`,cursor:'pointer',height:'100%',display:'block',transition:'transform 0.2s'}}
                onMouseEnter={e => (e.currentTarget.style.transform='translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform='translateY(0)')}>
                <div style={{fontSize:'32px',marginBottom:'12px'}}>{feature.icon}</div>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>{feature.title}</h3>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.7'}}>{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{background:'linear-gradient(135deg, #1A0F0F, #0D0907)',padding:'64px 40px',textAlign:'center',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'#C42020',boxShadow:'0 0 40px rgba(196,32,32,0.5)',margin:'0 auto 24px'}}/>
        <h2 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'12px'}}>Ready to Go to Japan? 🇯🇵</h2>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'32px',maxWidth:'480px',margin:'0 auto 32px'}}>
          Join thousands of students from Bangladesh and Nepal who are already on their Japan journey.
        </p>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'10px',fontSize:'16px',fontWeight:'700'}}>
            Start Free Today 🌸
          </Link>
          <Link href="/schools" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'10px',fontSize:'16px',border:'1px solid rgba(255,255,255,0.15)'}}>
            Browse Schools →
          </Link>
        </div>
      </div>

    </main>
  )
}