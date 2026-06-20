'use client'
import { useState, useRef, useEffect } from 'react'
import { useProStatus } from '../../lib/useProStatus'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  'How do I apply for a student visa to Japan?',
  'What documents do I need for a language school?',
  'How much money do I need in my bank account?',
  'What is the JLPT and how do I prepare?',
  'Can I work part-time on a student visa?',
  'What is the SSW visa?',
  'How much does it cost to live in Tokyo?',
  'What are the best schools in Osaka?',
  'How do I find halal food in Japan?',
  'What is the COE and how long does it take?',
]

const SYSTEM_PROMPTS: any = {
  en: `You are Sakura, a friendly and knowledgeable AI assistant for Japan Life Guide. You help students from Bangladesh and Nepal who want to study or work in Japan.`,
  bn: `You are Sakura, a helpful AI assistant for Japan Life Guide. Help Bangladeshi students with Japan study and work information.`,
  ne: `You are Sakura, a helpful AI assistant for Japan Life Guide. Help Nepali students with Japan study and work information.`,
  jp: `You are Sakura, a helpful AI assistant for Japan Life Guide. Help students with Japan study information.`,
}

const FREE_LIMIT = 10

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState('en')
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isPro } = useProStatus()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: lang === 'bn'
        ? 'Assalamu Alaikum! Ami Sakura, Japan Life Guide-er AI assistant. Japan-e porar ba kajer jonno apnake help korbo! Ki jante chai?'
        : lang === 'ne'
        ? 'Namaste! Ma Sakura hun, Japan Life Guide ko AI assistant. Japan-ma padhna wa kaam garna tapailai help garnchu!'
        : lang === 'jp'
        ? 'Konnichiwa! Watashi wa Sakura desu, Japan Life Guide no AI assistant desu!'
        : 'Hello! I am Sakura, your AI guide for Japan Life Guide. I can help you with everything about studying and working in Japan!'
    }])
  }, [lang])

  async function sendMessage(content?: string) {
    const messageText = content || input.trim()
    if (!messageText || loading) return
    if (!isPro && messageCount >= FREE_LIMIT) return

    const userMessage: Message = { role: 'user', content: messageText }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setMessageCount(prev => prev + 1)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          language: lang,
          systemPrompt: SYSTEM_PROMPTS[lang],
        }),
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Sorry, I could not process that. Please try again.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error. Please try again.' }])
    }
    setLoading(false)
  }

  const langs = [
    {code:'en',flag:'🇬🇧',label:'English'},
    {code:'bn',flag:'🇧🇩',label:'Bengali'},
    {code:'ne',flag:'🇳🇵',label:'Nepali'},
    {code:'jp',flag:'🇯🇵',label:'Japanese'},
  ]

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',flexDirection:'column'}}>
      <div style={{background:'#1A2035',padding:'20px 24px',borderBottom:'3px solid #C42020',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'44px',height:'44px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',boxShadow:'0 0 20px rgba(196,32,32,0.4)'}}>🌸</div>
          <div>
            <h1 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'2px'}}>Sakura AI</h1>
            <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#2EC87A'}}/>
              <span style={{color:'#2EC87A',fontSize:'11px',fontWeight:'600'}}>Online · Powered by Japan Life Guide AI</span>
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:'6px'}}>
          {langs.map(l=>(
            <button key={l.code} onClick={()=>setLang(l.code)} style={{background:lang===l.code?'rgba(196,32,32,0.3)':'rgba(255,255,255,0.08)',border:lang===l.code?'1px solid #C42020':'1px solid transparent',borderRadius:'8px',padding:'6px 10px',cursor:'pointer',fontSize:'16px',display:'flex',alignItems:'center',gap:'4px'}}>
              <span>{l.flag}</span>
              <span style={{color:'white',fontSize:'11px',display:lang===l.code?'block':'none'}}>{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{flex:1,overflowY:'auto',padding:'20px 24px',maxWidth:'800px',width:'100%',margin:'0 auto'}}>
        {!isPro && (
          <div style={{background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.2)',borderRadius:'8px',padding:'10px 16px',marginBottom:'12px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <span style={{color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>
              Free: {messageCount}/{FREE_LIMIT} messages used
            </span>
            <a href="/pricing" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'6px 12px',borderRadius:'6px',fontSize:'12px',fontWeight:'700'}}>
              Upgrade to Pro 💎
            </a>
          </div>
        )}

        {!isPro && messageCount >= FREE_LIMIT && (
          <div style={{background:'rgba(196,32,32,0.15)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'12px',padding:'20px',textAlign:'center',marginBottom:'16px'}}>
            <p style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>Free limit reached!</p>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Upgrade to Pro for unlimited Sakura AI chat</p>
            <a href="/pricing" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>
              Upgrade to Pro — ¥980/month
            </a>
          </div>
        )}

        {messages.length <= 1 && (
          <div style={{marginBottom:'24px'}}>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',textAlign:'center',marginBottom:'12px'}}>Suggested Questions</p>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',justifyContent:'center'}}>
              {SUGGESTED_QUESTIONS.slice(0,6).map((q,i)=>(
                <button key={i} onClick={()=>sendMessage(q)} style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'20px',padding:'8px 14px',color:'rgba(255,255,255,0.7)',fontSize:'12px',cursor:'pointer',textAlign:'left'}}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {messages.map((msg, i) => (
            <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',flexDirection:msg.role==='user'?'row-reverse':'row'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:msg.role==='user'?'#4A8EFF':'#C42020',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',flexShrink:0}}>
                {msg.role === 'user' ? '👤' : '🌸'}
              </div>
              <div style={{background:msg.role==='user'?'#4A8EFF':'#1A2035',borderRadius:msg.role==='user'?'16px 4px 16px 16px':'4px 16px 16px 16px',padding:'12px 16px',maxWidth:'75%',border:'1px solid rgba(255,255,255,0.08)'}}>
                <p style={{color:'white',fontSize:'14px',lineHeight:'1.7',margin:0,whiteSpace:'pre-wrap'}}>{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px'}}>🌸</div>
              <div style={{background:'#1A2035',borderRadius:'4px 16px 16px 16px',padding:'12px 16px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                  {[0,1,2].map(i=>(
                    <div key={i} style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C42020'}}/>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}/>
        </div>
      </div>

      <div style={{background:'#1A2035',borderTop:'1px solid rgba(255,255,255,0.08)',padding:'16px 24px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',display:'flex',gap:'10px'}}>
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&sendMessage()}
            placeholder={lang==='bn'?'Apnar proshno likhun...':lang==='ne'?'Tapainko prashna lekhnus...':'Ask Sakura anything about Japan...'}
            style={{flex:1,background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'12px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none'}}
            disabled={loading || (!isPro && messageCount >= FREE_LIMIT)}
          />
          <button
            onClick={()=>sendMessage()}
            disabled={loading||!input.trim()||(!isPro&&messageCount>=FREE_LIMIT)}
            style={{background:'#C42020',color:'white',border:'none',borderRadius:'12px',padding:'12px 20px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flexShrink:0,opacity:loading||!input.trim()?0.5:1}}
          >
            Send
          </button>
        </div>
        <p style={{color:'rgba(255,255,255,0.2)',fontSize:'11px',textAlign:'center',marginTop:'8px'}}>
          Sakura AI is powered by Japan Life Guide AI · Not a substitute for official advice
        </p>
      </div>
    </main>
  )
}