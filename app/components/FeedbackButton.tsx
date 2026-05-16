'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function FeedbackButton() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('general')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit() {
    if (!message.trim()) return
    setLoading(true)
    const { data: userData } = await supabase.auth.getUser()
    await supabase.from('feedback').insert({ message, type, user_id: userData.user?.id || null })
    setSent(true)
    setLoading(false)
    setTimeout(() => { setOpen(false); setSent(false); setMessage('') }, 2000)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} style={{position:'fixed',bottom:'24px',right:'24px',background:'#C42020',color:'white',border:'none',borderRadius:'50px',padding:'12px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer',boxShadow:'0 4px 20px rgba(196,32,32,0.4)',zIndex:50}}>
        Feedback
      </button>

      {open && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',width:'100%',maxWidth:'420px',border:'1px solid rgba(255,255,255,0.1)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h3 style={{color:'white',fontSize:'18px',fontWeight:'700'}}>Send Feedback</h3>
              <button onClick={() => setOpen(false)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.5)',fontSize:'20px',cursor:'pointer'}}>X</button>
            </div>
            {sent ? (
              <div style={{textAlign:'center',padding:'24px 0'}}>
                <p style={{color:'#2EC87A',fontSize:'16px',fontWeight:'700'}}>Thank you for your feedback!</p>
              </div>
            ) : (
              <>
                <select value={type} onChange={e=>setType(e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',marginBottom:'12px',cursor:'pointer'}}>
                  <option value="general">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="school">School Information</option>
                  <option value="visa">Visa Information</option>
                </select>
                <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Share your thoughts..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'13px',outline:'none',resize:'vertical',minHeight:'100px',marginBottom:'12px'}}/>
                <button onClick={handleSubmit} disabled={loading||!message.trim()} style={{width:'100%',background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
                  {loading ? 'Sending...' : 'Send Feedback'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}