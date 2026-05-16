'use client'

import { useState } from 'react'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)
  const url = 'https://japan-life-guide-b0fwt9xhw.ziaulhoquejps-projects.vercel.app'
  const text = 'Check out Japan Life Guide - the complete guide for studying and working in Japan!'

  function copyLink() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const twitterUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url)
  const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)
  const whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + url)

  return (
    <div style={{display:'flex',gap:'8px',flexWrap:'wrap',justifyContent:'center'}}>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={{background:'#1DA1F2',color:'white',textDecoration:'none',padding:'10px 18px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
        X Twitter
      </a>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" style={{background:'#1877F2',color:'white',textDecoration:'none',padding:'10px 18px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
        Facebook
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{background:'#25D366',color:'white',textDecoration:'none',padding:'10px 18px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
        WhatsApp
      </a>
      <button onClick={copyLink} style={{background:copied?'#2EC87A':'rgba(255,255,255,0.1)',color:'white',border:'1px solid rgba(255,255,255,0.2)',padding:'10px 18px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}