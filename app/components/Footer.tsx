import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{background:'#0D0907',borderTop:'1px solid rgba(255,255,255,0.08)',padding:'48px 40px 24px',fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))',gap:'32px',marginBottom:'40px'}}>

          <div>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
              <div style={{width:'24px',height:'24px',borderRadius:'50%',background:'#C42020'}}/>
              <span style={{color:'white',fontSize:'16px',fontWeight:'700'}}>Japan Life Guide</span>
            </div>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',lineHeight:'1.7',marginBottom:'16px'}}>Your complete guide to studying and working in Japan.</p>
            <div style={{display:'flex',gap:'8px'}}>
              {[
                {label:'BD',color:'#006A4E'},
                {label:'NP',color:'#003893'},
                {label:'JP',color:'#BC002D'},
              ].map(flag=>(
                <span key={flag.label} style={{background:flag.color,color:'white',padding:'3px 8px',borderRadius:'4px',fontSize:'10px',fontWeight:'700'}}>{flag.label}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'12px',letterSpacing:'1px'}}>EXPLORE</h4>
            {[
              {href:'/schools',label:'Language Schools'},
              {href:'/visa',label:'Visa Guide'},
              {href:'/chat',label:'Sakura AI'},
              {href:'/community',label:'Community'},
              {href:'/blog',label:'Blog'},
            ].map(link=>(
              <Link key={link.href} href={link.href} style={{display:'block',color:'rgba(255,255,255,0.4)',textDecoration:'none',fontSize:'13px',marginBottom:'8px'}}>{link.label}</Link>
            ))}
          </div>

          <div>
            <h4 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'12px',letterSpacing:'1px'}}>ACCOUNT</h4>
            {[
              {href:'/login',label:'Sign In'},
              {href:'/register',label:'Create Account'},
              {href:'/pricing',label:'Pricing'},
              {href:'/dashboard',label:'Dashboard'},
            ].map(link=>(
              <Link key={link.href} href={link.href} style={{display:'block',color:'rgba(255,255,255,0.4)',textDecoration:'none',fontSize:'13px',marginBottom:'8px'}}>{link.label}</Link>
            ))}
          </div>

          <div>
            <h4 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'12px',letterSpacing:'1px'}}>SUPPORT</h4>
            {[
              {href:'/contact',label:'Contact Us'},
              {href:'/privacy',label:'Privacy Policy'},
              {href:'/terms',label:'Terms of Service'},
              {href:'/admin',label:'Admin'},
            ].map(link=>(
              <Link key={link.href} href={link.href} style={{display:'block',color:'rgba(255,255,255,0.4)',textDecoration:'none',fontSize:'13px',marginBottom:'8px'}}>{link.label}</Link>
            ))}
          </div>

          <div>
            <h4 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'12px',letterSpacing:'1px'}}>CONTACT</h4>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {[
                {icon:'📧',label:'hello@japanlifeguide.com'},
                {icon:'🌸',label:'Sakura AI Chat'},
                {icon:'💬',label:'Community Forum'},
              ].map(item=>(
                <div key={item.label} style={{display:'flex',gap:'8px',alignItems:'center',color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'24px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
          <p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>
            2025 Japan Life Guide. All rights reserved.
          </p>
          <p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>
            Made with for Bangladesh and Nepal communities
          </p>
          <div style={{display:'flex',gap:'12px'}}>
            <Link href="/privacy" style={{color:'rgba(255,255,255,0.3)',textDecoration:'none',fontSize:'12px'}}>Privacy</Link>
            <Link href="/terms" style={{color:'rgba(255,255,255,0.3)',textDecoration:'none',fontSize:'12px'}}>Terms</Link>
            <Link href="/contact" style={{color:'rgba(255,255,255,0.3)',textDecoration:'none',fontSize:'12px'}}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}