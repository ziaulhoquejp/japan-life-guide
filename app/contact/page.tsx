'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!name || !email || !message) return
    setLoading(true)
    await supabase.from('feedback').insert({
      message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`,
      type: 'contact',
    })
    try {
      await fetch('/api/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'ziaulhoquejp@gmail.com',
          name: 'Admin',
          subject: `New Contact: ${subject || 'General Inquiry'} from ${name}`,
          message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        }),
      })
    } catch {}
    setSent(true)
    setLoading(false)
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
            <p style={{color:'rgba(255,255,255,0.6)',marginBottom:'8px'}}>We will get back to you within 24 hours.</p>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'24px'}}>Check your email for confirmation.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
              <a href="/" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontWeight:'700'}}>Back to Home</a>
              <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura AI</a>
            </div>
          </div>
        ) : (
          <div>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'36px',border:'1px solid rgba(255,255,255,0.08)',marginBottom:'20px'}}>
              <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                <div>
                  <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Your Name *</label>
                  <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Email Address *</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Subject</label>
                  <select value={subject} onChange={e=>setSubject(e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                    <option value="">Select a topic...</option>
                    <option value="School Application">School Application Help</option>
                    <option value="Visa Question">Visa Question</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Billing">Billing & Payment</option>
                    <option value="Partnership">School Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Message *</label>
                  <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="How can we help you?" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'140px'}}/>
                </div>
                <button onClick={handleSubmit} disabled={loading||!name||!email||!message} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',opacity:loading?0.7:1}}>
                  {loading ? 'Sending...' : 'Send Message 🌸'}
                </button>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'12px'}}>
              {[
                {icon:'📧',label:'Email',value:'hello@japanlifeguide.app'},
                {icon:'🌸',label:'AI Chat',value:'Ask Sakura AI 24/7'},
                {icon:'⏰',label:'Response Time',value:'Within 24 hours'},
                {icon:'🌍',label:'Languages',value:'EN / Bengali / Nepali'},
              ].map(item=>(
                <div key={item.label} style={{background:'#1A2035',borderRadius:'10px',padding:'14px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div style={{fontSize:'24px',marginBottom:'6px'}}>{item.icon}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>{item.label}</div>
                  <div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}