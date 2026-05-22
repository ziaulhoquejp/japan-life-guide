'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('en')

  const links = [
    {href:'/schools',label:'Schools'},
    {href:'/compare',label:'Compare'},
    {href:'/visa',label:'Visa'},
    {href:'/visa-calculator',label:'Visa Calc'},
    {href:'/jobs',label:'Jobs'},
    {href:'/scholarships',label:'Scholarships'},
    {href:'/chat',label:'Sakura AI'},
    {href:'/community',label:'Community'},
    {href:'/blog',label:'Blog'},
    {href:'/pricing',label:'Pricing'},
    {href:'/profile',label:'Profile'},
    {href:'/login',label:'Login'},
  ]

  const langs = [
    {code:'en',flag:'🇬🇧'},
    {code:'bn',flag:'🇧🇩'},
    {code:'ne',flag:'🇳🇵'},
    {code:'jp',flag:'🇯🇵'},
  ]

  return (
    <nav style={{background:'#0D0907',borderBottom:'2px solid #C42020',padding:'0 20px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
      <Link href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
        <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#C42020',flexShrink:0}}/>
        <span style={{color:'white',fontSize:'16px',fontWeight:'700'}}>Japan Life Guide</span>
      </Link>

      <div style={{display:'flex',gap:'10px',alignItems:'center'}} className="desktop-menu">
        {links.map(l=>(
          <Link key={l.href} href={l.href} style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'11px',fontWeight:'500'}}>{l.label}</Link>
        ))}
        <div style={{display:'flex',gap:'4px'}}>
          {langs.map(l=>(
            <button key={l.code} onClick={()=>setLang(l.code)} style={{background:lang===l.code?'rgba(196,32,32,0.3)':'none',border:lang===l.code?'1px solid #C42020':'1px solid transparent',borderRadius:'6px',padding:'4px 6px',cursor:'pointer',fontSize:'14px'}}>
              {l.flag}
            </button>
          ))}
        </div>
        <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',fontSize:'11px',fontWeight:'700',padding:'7px 12px',borderRadius:'8px'}}>Join Free</Link>
      </div>

      <button onClick={()=>setOpen(!open)} style={{display:'none',background:'none',border:'none',color:'white',fontSize:'24px',cursor:'pointer'}} className="mobile-btn">
        {open ? 'X' : '☰'}
      </button>

      {open && (
        <div style={{position:'fixed',top:'60px',left:0,right:0,background:'#0D0907',borderBottom:'2px solid #C42020',padding:'20px',display:'flex',flexDirection:'column',gap:'12px',zIndex:99}} className="mobile-menu">
          {links.map(l=>(
            <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} style={{color:'white',textDecoration:'none',fontSize:'16px',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>{l.label}</Link>
          ))}
          <div style={{display:'flex',gap:'8px',padding:'10px 0'}}>
            {langs.map(l=>(
              <button key={l.code} onClick={()=>setLang(l.code)} style={{background:lang===l.code?'rgba(196,32,32,0.3)':'rgba(255,255,255,0.08)',border:lang===l.code?'1px solid #C42020':'1px solid transparent',borderRadius:'6px',padding:'6px 10px',cursor:'pointer',fontSize:'18px'}}>
                {l.flag}
              </button>
            ))}
          </div>
          <Link href="/register" onClick={()=>setOpen(false)} style={{background:'#C42020',color:'white',textDecoration:'none',fontSize:'15px',fontWeight:'700',padding:'12px',borderRadius:'8px',textAlign:'center'}}>Join Free</Link>
        </div>
      )}
    </nav>
  )
}