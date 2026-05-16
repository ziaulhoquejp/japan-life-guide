'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{background:'#0D0907',borderBottom:'2px solid #C42020',padding:'0 20px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
      <Link href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
        <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#C42020',boxShadow:'0 0 10px rgba(196,32,32,0.5)',flexShrink:0}}/>
        <span style={{color:'white',fontSize:'16px',fontWeight:'700',fontFamily:'sans-serif'}}>Japan Life Guide</span>
      </Link>

      <div style={{display:'flex',gap:'14px',alignItems:'center'}} className="desktop-menu">
        <Link href="/schools" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>Schools</Link>
        <Link href="/visa" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>Visa</Link>
        <Link href="/chat" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>Sakura AI</Link>
        <Link href="/community" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>Community</Link>
        <Link href="/dashboard" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>Dashboard</Link>
        <Link href="/blog" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>Blog</Link>
        <Link href="/contact" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>Contact</Link>
        <Link href="/pricing" style={{color:'#F0A830',textDecoration:'none',fontSize:'13px',fontWeight:'700'}}>Pricing</Link>
        <Link href="/login" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>Login</Link>
        <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',fontSize:'12px',fontWeight:'700',padding:'7px 16px',borderRadius:'8px'}}>Join Free</Link>
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)} style={{display:'none',background:'none',border:'none',color:'white',fontSize:'24px',cursor:'pointer'}} className="mobile-btn">
        {menuOp