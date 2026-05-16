import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',textAlign:'center',padding:'20px'}}>
      <div>
        <div style={{fontSize:'80px',marginBottom:'16px'}}>🗾</div>
        <h1 style={{color:'white',fontSize:'48px',fontWeight:'700',marginBottom:'8px'}}>404</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'18px',marginBottom:'8px'}}>Page Not Found</p>
        <p style={{color:'rgba(255,255,255,0.3)',fontSize:'14px',marginBottom:'32px'}}>このページは見つかりませんでした</p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontWeight:'700'}}>
            🏠 Go Home
          </Link>
          <Link href="/schools" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px'}}>
            🏫 Browse Schools
          </Link>
        </div>
      </div>
    </main>
  )
}