'use client'
import { useState, useEffect } from 'react'

const NOTIFICATION_EXAMPLES = [
{ title: '📝 JLPT Registration Open!', body: 'JLPT December test registration is now open. Register before September 30.' },
{ title: '🏫 New Schools Added!', body: '15 new verified Japanese language schools added to Japan Life Guide.' },
{ title: '🛂 Visa Update', body: 'Japan has updated student visa processing times. Check the latest guide.' },
{ title: '🌸 Sakura AI Updated!', body: 'Sakura AI now supports more detailed visa questions in Bengali and Nepali.' },
]

export default function PushNotification() {
const [permission, setPermission] = useState<string>('default')
const [show, setShow] = useState(false)
const [subscribed, setSubscribed] = useState(false)

useEffect(() => {
if (typeof window === 'undefined' || !('Notification' in window)) return

const currentPermission = Notification.permission
setPermission(currentPermission)

const dismissed = localStorage.getItem('push_notification_dismissed')
const subscribedStored = localStorage.getItem('push_notification_subscribed')

if (subscribedStored === 'true') {
setSubscribed(true)
return
}

if (currentPermission === 'default' && !dismissed) {
setTimeout(() => setShow(true), 5000)
}
}, [])

async function subscribe() {
try {
const result = await Notification.requestPermission()
setPermission(result)
if (result === 'granted') {
setSubscribed(true)
setShow(false)
localStorage.setItem('push_notification_subscribed', 'true')

// ウェルカム通知
new Notification('🌸 Japan Life Guide', {
body: 'You will now receive visa deadlines, school updates, and JLPT reminders!',
icon: '/icon-192.png',
})

// 5秒後にサンプル通知
setTimeout(() => {
const example = NOTIFICATION_EXAMPLES[0]
new Notification(example.title, {
body: example.body,
icon: '/icon-192.png',
})
}, 5000)
}
} catch (err) {
console.error('Notification error:', err)
}
}

function dismiss() {
setShow(false)
localStorage.setItem('push_notification_dismissed', 'true')
}

if (!show || permission !== 'default') return null

return (
<div style={{
position:'fixed',
bottom:'90px',
left:'20px',
background:'linear-gradient(135deg,#1A2035,#0D1520)',
border:'1px solid rgba(196,32,32,0.3)',
borderRadius:'16px',
padding:'20px',
maxWidth:'300px',
zIndex:50,
boxShadow:'0 8px 32px rgba(0,0,0,0.5)',
animation:'slideIn 0.3s ease'
}}>
<style>{`
@keyframes slideIn {
from { transform: translateY(20px); opacity: 0; }
to { transform: translateY(0); opacity: 1; }
}
`}</style>
<button onClick={dismiss} style={{position:'absolute',top:'10px',right:'12px',background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:'16px'}}>✕</button>
<div style={{fontSize:'32px',marginBottom:'10px'}}>🔔</div>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'6px'}}>Stay Updated! 🌸</h3>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6',marginBottom:'12px'}}>
Get notified about:
</p>
<div style={{display:'flex',flexDirection:'column',gap:'4px',marginBottom:'14px'}}>
{['📝 JLPT registration deadlines','🏫 New schools added','🛂 Visa policy updates','🎓 Scholarship opportunities'].map(item => (
<p key={item} style={{color:'rgba(255,255,255,0.6)',fontSize:'11px'}}>{item}</p>
))}
</div>
<div style={{display:'flex',gap:'8px'}}>
<button onClick={subscribe} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 16px',fontSize:'12px',fontWeight:'700',cursor:'pointer',flex:2}}>
🔔 Enable Notifications
</button>
<button onClick={dismiss} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.5)',border:'none',borderRadius:'8px',padding:'10px',fontSize:'12px',cursor:'pointer',flex:1}}>
Later
</button>
</div>
</div>
)
}
