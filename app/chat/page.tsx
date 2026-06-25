'use client'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../lib/supabase'

const SUGGESTED_QUESTIONS = [
'How do I apply for a student visa to Japan?',
'What is the SSW visa and how to apply?',
'How much does it cost to study in Japan?',
'What are the best Japanese language schools in Tokyo?',
'How to find halal food in Japan?',
'What is JLPT and which level do I need?',
'Can I work part-time on a student visa?',
'How much money do I need in my bank for a visa?',
]

const FREE_LIMIT = 10

export default function ChatPage() {
const [messages, setMessages] = useState<any[]>([
{
role: 'assistant',
content: 'こんにちは！Hello! নমস্কার! नमस्ते!\n\nI am Sakura AI, your personal guide for studying and working in Japan! 🌸\n\nI can help you with:\n• 🏫 Finding the right language school\n• 🛂 Visa guidance (Student, SSW, Engineer)\n• 💰 Cost of living estimates\n• 🕌 Halal food and Muslim life in Japan\n• 💼 Jobs and scholarships\n• 📝 JLPT preparation tips\n\nAsk me anything in English, Bengali (বাংলা), Nepali (नेपाली), or Japanese (日本語)!',
}
])
const [input, setInput] = useState('')
const [loading, setLoading] = useState(false)
const [user, setUser] = useState<any>(null)
const [isPro, setIsPro] = useState(false)
const [messageCount, setMessageCount] = useState(0)
const [language, setLanguage] = useState<'en'|'bn'|'ne'|'jp'>('en')
const messagesEndRef = useRef<HTMLDivElement>(null)

useEffect(() => {
supabase.auth.getUser().then(({ data }) => {
if (data.user) {
setUser(data.user)
supabase.from('profiles').select('plan').eq('id', data.user.id).single().then(({ data: profile }) => {
setIsPro(profile?.plan === 'pro' || profile?.plan === 'lifetime')
})
}
})
const saved = localStorage.getItem('sakura_message_count')
const savedDate = localStorage.getItem('sakura_message_date')
const today = new Date().toDateString()
if (savedDate === today && saved) {
setMessageCount(parseInt(saved))
} else {
localStorage.setItem('sakura_message_date', today)
localStorage.setItem('sakura_message_count', '0')
}
}, [])

useEffect(() => {
messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [messages])

async function sendMessage(text?: string) {
const messageText = text || input.trim()
if (!messageText) return
if (!isPro && messageCount >= FREE_LIMIT) return

setInput('')
setLoading(true)

const newCount = messageCount + 1
setMessageCount(newCount)
localStorage.setItem('sakura_message_count', newCount.toString())

const userMessage = { role: 'user', content: messageText }
const updatedMessages = [...messages, userMessage]
setMessages(updatedMessages)

try {
const response = await fetch('/api/chat', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
messages: updatedMessages.map((m: any) => ({ role: m.role, content: m.content })),
userId: user?.id || null,
}),
})
const data = await response.json()
setMessages(prev => [...prev, {
role: 'assistant',
content: data.content || 'Sorry, I could not generate a response. Please try again.',
}])
} catch (error) {
setMessages(prev => [...prev, {
role: 'assistant',
content: 'Sorry, there was an error. Please try again.',
}])
}
setLoading(false)
}

const langLabels: any = {
en: { flag: '🇬🇧', placeholder: 'Ask Sakura AI anything about Japan...' },
bn: { flag: '🇧🇩', placeholder: 'Japan সম্পর্কে যেকোনো প্রশ্ন করুন...' },
ne: { flag: '🇳🇵', placeholder: 'Japan बारे जे सोध्नुस्...' },
jp: { flag: '🇯🇵', placeholder: '日本についての質問をどうぞ...' },
}

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',flexDirection:'column'}}>
<div style={{background:'#1A2035',padding:'16px 20px',borderBottom:'2px solid #C42020',display:'flex',alignItems:'center',gap:'12px',flexShrink:0}}>
<div style={{width:'40px',height:'40px',borderRadius:'50%',background:'linear-gradient(135deg,#C42020,#FF8070)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>
🌸
</div>
<div style={{flex:1}}>
<h1 style={{color:'white',fontSize:'16px',fontWeight:'700',margin:0}}>Sakura AI</h1>
<span style={{color:'#2EC87A',fontSize:'11px',fontWeight:'600'}}>Online · Powered by Japan Life Guide AI</span>
</div>
<div style={{display:'flex',gap:'6px'}}>
{(['en','bn','ne','jp'] as const).map(lang => (
<button key={lang} onClick={()=>setLanguage(lang)} style={{background:language===lang?'rgba(196,32,32,0.3)':'rgba(255,255,255,0.06)',border:language===lang?'1px solid #C42020':'1px solid transparent',borderRadius:'6px',padding:'4px 8px',color:'white',fontSize:'14px',cursor:'pointer'}}>
{langLabels[lang].flag}
</button>
))}
</div>
{!isPro && (
<div style={{background:'rgba(240,168,48,0.1)',border:'1px solid rgba(240,168,48,0.2)',borderRadius:'6px',padding:'4px 10px',fontSize:'11px',color:'#F0A830',whiteSpace:'nowrap'}}>
{messageCount}/{FREE_LIMIT} today
</div>
)}
</div>

<div style={{flex:1,overflowY:'auto',padding:'20px',display:'flex',flexDirection:'column',gap:'14px',maxWidth:'800px',width:'100%',margin:'0 auto'}}>
{messages.map((msg, i) => (
<div key={i} style={{display:'flex',gap:'10px',justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'}}>
{msg.role === 'assistant' && (
<div style={{width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg,#C42020,#FF8070)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',flexShrink:0,marginTop:'4px'}}>🌸</div>
)}
<div style={{maxWidth:'75%',background: msg.role === 'user' ? '#C42020' : '#1A2035',borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',padding:'12px 16px',border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none'}}>
<p style={{color:'white',fontSize:'14px',lineHeight:'1.7',margin:0,whiteSpace:'pre-wrap'}}>{msg.content}</p>
</div>
{msg.role === 'user' && (
<div style={{width:'32px',height:'32px',borderRadius:'50%',background:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:'700',color:'white',flexShrink:0,marginTop:'4px'}}>
{user?.user_metadata?.full_name?.[0]?.toUpperCase() || '👤'}
</div>
)}
</div>
))}

{loading && (
<div style={{display:'flex',gap:'10px'}}>
<div style={{width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg,#C42020,#FF8070)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>🌸</div>
<div style={{background:'#1A2035',borderRadius:'16px 16px 16px 4px',padding:'14px 18px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',gap:'4px',alignItems:'center'}}>
{[0,1,2].map(i => (
<div key={i} style={{width:'6px',height:'6px',borderRadius:'50%',background:'#C42020',animation:`bounce 1s infinite ${i*0.2}s`}}/>
))}
</div>
</div>
</div>
)}
<div ref={messagesEndRef}/>
</div>

{messages.length === 1 && (
<div style={{padding:'0 20px 10px',maxWidth:'800px',width:'100%',margin:'0 auto'}}>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',marginBottom:'8px'}}>Suggested questions:</p>
<div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
{SUGGESTED_QUESTIONS.slice(0,4).map((q,i) => (
<button key={i} onClick={()=>sendMessage(q)} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'20px',padding:'6px 12px',color:'rgba(255,255,255,0.7)',fontSize:'11px',cursor:'pointer',textAlign:'left'}}>
{q}
</button>
))}
</div>
</div>
)}

{!isPro && messageCount >= FREE_LIMIT && (
<div style={{padding:'12px 20px',background:'rgba(196,32,32,0.1)',borderTop:'1px solid rgba(196,32,32,0.2)',textAlign:'center',flexShrink:0}}>
<p style={{color:'#FF8070',fontSize:'13px',marginBottom:'8px'}}>Daily limit reached. Upgrade to Pro for unlimited chat!</p>
<a href="/pricing" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Upgrade to Pro</a>
</div>
)}

<div style={{background:'#1A2035',padding:'16px 20px',borderTop:'1px solid rgba(255,255,255,0.08)',flexShrink:0}}>
<div style={{maxWidth:'800px',margin:'0 auto'}}>
<div style={{display:'flex',gap:'10px',alignItems:'flex-end'}}>
<textarea
value={input}
onChange={e=>setInput(e.target.value)}
onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}}}
placeholder={langLabels[language].placeholder}
disabled={!isPro && messageCount >= FREE_LIMIT}
rows={1}
style={{flex:1,background:'#0D0907',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'12px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none',resize:'none',maxHeight:'120px',lineHeight:'1.5',opacity: (!isPro && messageCount >= FREE_LIMIT) ? 0.5 : 1}}
/>
<button
onClick={()=>sendMessage()}
disabled={loading||!input.trim()||(!isPro&&messageCount>=FREE_LIMIT)}
style={{background: loading||!input.trim()||(!isPro&&messageCount>=FREE_LIMIT) ? 'rgba(255,255,255,0.1)' : '#C42020',color:'white',border:'none',borderRadius:'12px',padding:'12px 20px',fontSize:'20px',cursor:'pointer',flexShrink:0}}>
{loading ? '⏳' : '➤'}
</button>
</div>
<p style={{color:'rgba(255,255,255,0.2)',fontSize:'11px',textAlign:'center',marginTop:'8px'}}>
Sakura AI is powered by Japan Life Guide AI · Not a substitute for official advice
</p>
</div>
</div>

<style>{`
@keyframes bounce {
0%, 60%, 100% { transform: translateY(0); }
30% { transform: translateY(-6px); }
}
`}</style>
</main>
)
}