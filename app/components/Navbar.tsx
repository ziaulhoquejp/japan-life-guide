'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mainLinks = [
    {href:'/schools',label:'Schools'},
    {href:'/visa',label:'Visa'},
    {href:'/jobs',label:'Jobs'},
    {href:'/scholarships',label:'Scholarships'},
    {href:'/chat',label:'Sakura AI'},
    {href:'/community',label:'Community'},
    {href:'/pricing',label:'Pricing'},
    {href:'/profile',label:'Profile'},
    {href:'/login',label:'Login'},
  ]

  const moreLinks = [
    {href:'/ranking',label:'School Ranking'},
    {href:'/visa-calculator',label:'Visa Calculator'},
    {href:'/cost-calculator',label:'Cost Calculator'},
    {href:'/compare',label:'Compare Schools'},
    {href:'/apply',label:'Apply to School'},
    {href:'/applications',label:'My Applications'},
    {href:'/dashboard',label:'Dashboard'},
    {href:'/housing',label:'Housing'},
    {href:'/prefectures',label:'Prefectures'},
    {href:'/cities',label:'City Guide'},
    {href:'/learn-japanese',label:'Learn Japanese'},
    {href:'/jlpt-test',label:'JLPT Test'},
    {href:'/calendar',label:'Deadline Calendar'},
    {href:'/reviews',label:'All Reviews'},
    {href:'/news',label:'News'},
    {href:'/blog',label:'Blog'},
    {href:'/videos',label:'Video Guides'},
    {href:'/faq',label:'FAQ'},
    {href:'/halal',label:'Halal Guide'},
    {href:'/culture',label:'Culture Guide'},
    {href:'/emergency',label:'Emergency'},
    {href:'/currency',label:'Currency'},
    {href:'/flights',label:'Flights'},
    {href:'/insurance',label:'Insurance'},
    {href:'/notifications',label:'Notifications'},
    {href:'/affiliate',label:'Affiliate Program'},
    {href:'/contact',label:'Contact'},
    {href:'/admin',label:'Admin'},
  ]

  const langs = [
    {code:'en',flag:'🇬🇧'},
    {code:'bn',flag:'🇧🇩'},
    {code:'ne',flag:'🇳🇵'},
    {code:'jp',flag:'🇯🇵'},
  ]

  if (!mounted) return (
    <nav style={{background:'#0D0907',borderBottom:'2px solid #C42020',padding:'0 20px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
      <Link href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
        <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#C42020',flexShrink:0}}/>
        <span style={{color:'white',fontSize:'16px',fontWeight:'700'}}>Japan Life Guide</span>
      </Link>
    </nav>
  )

  return (
    <nav style={{background:'#0D0907',borderBottom:'2px solid #C42020',padding:'0 20px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
      <Link href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
        <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#C42020',flexShrink:0}}/>
        <span style={{color:'white',fontSize:'16px',fontWeight:'700'}}>Japan Life Guide</span>
      </Link>

      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        {mainLinks.map(l=>(
          <Link key={l.href} href={l.href} style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'11px',fontWeight:'500'}}>{l.label}</Link>
        ))}
        <div style={{position:'relative'}}>
          <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:'rgba(255,255,255,0.08)',border:'none',borderRadius:'6px',padding:'5px 10px',color:'white',fontSize:'11px',cursor:'pointer'}}>
            More ▼
          </button>
          {menuOpen && (
            <div style={{position:'absolute',top:'36px',right:0,background:'#1A2035',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',padding:'8px',minWidth:'200px',zIndex:200,maxHeight:'400px',overflowY:'auto'}}>
              {moreLinks.map(l=>(
                <Link key={l.href} href={l.href} onClick={()=>setMenuOpen(false)} style={{display:'block',color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'12px',padding:'8px 12px',borderRadius:'6px'}}>
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div style={{display:'flex',gap:'4px'}}>
          {langs.map(l=>(
            <button key={l.code} onClick={()=>setLang(l.code)} style={{background:lang===l.code?'rgba(196,32,32,0.3)':'none',border:lang===l.code?'1px solid #C42020':'1px solid transparent',borderRadius:'6px',padding:'4px 6px',cursor:'pointer',fontSize:'14px'}}>
              {l.flag}
            </button>
          ))}
        </div>
        <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',fontSize:'11px',fontWeight:'700',padding:'7px 12px',borderRadius:'8px'}}>Join Free</Link>
      </div>

      <button onClick={()=>setOpen(!open)} style={{background:'none',border:'none',color:'white',fontSize:'24px',cursor:'pointer',display:'none'}}>
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div style={{position:'fixed',top:'60px',left:0,right:0,background:'#0D0907',borderBottom:'2px solid #C42020',padding:'20px',display:'flex',flexDirection:'column',gap:'8px',zIndex:99,maxHeight:'80vh',overflowY:'auto'}}>
          {[...mainLinks,...moreLinks].map(l=>(
            <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} style={{color:'white',textDecoration:'none',fontSize:'15px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>{l.label}</Link>
          ))}
          <div style={{display:'flex',gap:'8px',padding:'10px 0'}}>
            {langs.map(l=>(
              <button key={l.code} onClick={()=>setLang(l.code)} style={{background:lang===l.code?'rgba(196,32,32,0.3)':'rgba(255,255,255,0.08)',border:lang===l.code?'1px solid #C42020':'1px solid transparent',borderRadius:'6px',padding:'6px 10px',cursor:'pointer',fontSize:'18px'}}>
                {l.flag}
              </button>
            ))}
          </div>
          <Link href="/register" onClick={()=>setOpen(false)} style={{background:'#C42020',color:'white',textDecoration:'none',fontSize:'15px',fontWeight:'700',padding:'12px',borderRadius:'8px',textAlign:'center',marginTop:'8px'}}>Join Free</Link>
        </div>
      )}
    </nav>
  )
}