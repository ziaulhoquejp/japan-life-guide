'use client'
import { useState, useEffect } from 'react'

export default function PushNotification() {
  const [permission, setPermission] = useState<string>('default')
  const [subscribed, setSubscribed] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission)
      if (Notification.permission === 'default') {
        setTimeout(() => setShow(true), 3000)
      }
    }
  }, [])

  async function subscribe() {
    try {
      const permission = await Notification.requestPermission()
      setPermission(permission)
      if (permission === 'granted') {
        setSubscribed(true)
        setShow(false)
        new Notification('Japan Life Guide', {
          body: 'You will now receive visa deadlines and school updates!',
          icon: '/favicon.ico',
        })
      }
    } catch (err) {
      console.error('Notification error:', err)
    }
  }

  if (!show || permission !== 'default') return null

  return (
    <div style={{position:'fixed',bottom:'80px',left:'20px',background:'#1A2035',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'14px',padding:'20px',maxWidth:'300px',zIndex:50,boxShadow:'0 8px 32px rgba(0,0,0,0.4)'}}>
      <button onClick={()=>setShow(false)} style={{position:'absolute',top:'10px',right:'12px',background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'16px'}}>X</button>
      <div style={{fontSize:'32px',marginBottom:'10px'}}>🔔</div>
      <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'6px'}}>Stay Updated!</h3>
      <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.5',marginBottom:'14px'}}>
        Get notified about visa deadlines, new schools, and community updates!
      </p>
      <div style={{display:'flex',gap:'8px'}}>
        <button onClick={subscribe} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'8px 16px',fontSize:'12px',fontWeight:'700',cursor:'pointer',flex:1}}>
          Enable
        </button>
        <button onClick={()=>setShow(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'8px 16px',fontSize:'12px',cursor:'pointer'}}>
          Later
        </button>
      </div>
    </div>
  )
}