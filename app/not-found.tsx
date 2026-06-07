import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',textAlign:'center',padding:'20px'}}>
      <div style={{maxWidth:'500px'}}>
        <div style={{fontSize:'80px',marginBottom:'16px'}}>🗾</div>
        <h1 style={{color:'white',fontSize:'64px',fontWeight:'800',marginBottom:'8px',fontFamily:'monospace'}}>404</h1>
        <h2 style={{color:'rgba(255,255,255,0.7)',fontSize:'22px',fontWeight:'600',marginBottom:'8px'}}>Page Not Found</h2>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'4px'}}>このページは見つかりませんでした</p>
        <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',marginBottom:'32px'}}>The page you are looking for does not exist or has been moved.</p>

        <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap',marginBottom:'32px'}}>
          <Link href="/" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontWeight:'700',fontSize:'14px'}}>
            🏠 Go Home
          </Link>
          <Link href="/schools" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)'}}>
            🏫 Browse Schools
          </Link>
          <Link href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)'}}>
            🌸 Ask Sakura
          </Link>
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'12px'}}>Looking for something specific?</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            {[
              {href:'/visa',label:'Visa Guide'},
              {href:'/jobs',label:'Jobs in Japan'},
              {href:'/scholarships',label:'Scholarships'},
              {href:'/faq',label:'FAQ'},
              {href:'/blog',label:'Blog'},
              {href:'/contact',label:'Contact Us'},
            ].map(link=>(
              <Link key={link.href} href={link.href} style={{background:'#0D0907',color:'rgba(255,255,255,0.6)',textDecoration:'none',padding:'8px 12px',borderRadius:'6px',fontSize:'12px',display:'block',border:'1px solid rgba(255,255,255,0.06)'}}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}