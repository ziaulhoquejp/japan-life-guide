'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit() {
    if (!name || !email || !message) return
    setSent(true)
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Contact Us</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>We respond within 24 hours</p>
      </div>
      <div style={{maxWidth:'600px',margin:'0 auto',padding:'48px 20px'}}>
        {sent ? (
          <div style={{textAlign:'center',padding:'48px'}}>
            <div style={{fontSize:'64px',marginBottom:'16px'}}>🌸</div>
            <h2 style={{color:'#2EC87A',fontSize:'24px',fontWeight:'700',marginBottom:'8px'}}>Message Sent!</h2>
            <p style={{color:'rgba(255,255,255,0.6)'}}>We will get back to you within 24 hours.</p>
            <a href="/" style={{display:'inline-block',marginTop:'24px',background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontWeight:'700'}}>Back to Home</a>
          </div>
        ) : (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'36px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="How can we help?" style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'120px'}}/>
              <button onClick={handleSubmit} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer'}}>
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}