'use client'

import { useState } from 'react'

type Message = {
  role: 'user' | 'ai'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'こんにちは！I\'m Sakura 🌸 — your Japan Life Guide AI! Ask me anything about schools, visas, jobs, or life in Japan!',
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('en')

  async function sendMessage() {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, language }),
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'ai', content: data.message }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: 'Sorry, something went wrong. Please try again!',
      }])
    }

    setLoading(false)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0D0907',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
    }}>
      {/* ヘッダー */}
      <div style={{
        background: '#1A2035',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #C42020, #FF6040)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
        }}>
          🌸
        </div>
        <div>
          <div style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>
            Sakura AI
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
            Powered by Claude · Online
          </div>
        </div>

        {/* 言語選択 */}
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          style={{
            marginLeft: 'auto',
            background: '#0D0907',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          <option value="en">🇬🇧 English</option>
          <option value="jp">🇯🇵 日本語</option>
          <option value="bn">🇧🇩 বাংলা</option>
          <option value="ne">🇳🇵 नेपाली</option>
        </select>
      </div>

      {/* メッセージ */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '24px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            gap: '10px',
            alignItems: 'flex-end',
          }}>
            {msg.role === 'ai' && (
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #C42020, #FF6040)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                flexShrink: 0,
              }}>
                🌸
              </div>
            )}
            <div style={{
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: '16px',
              fontSize: '14px',
              lineHeight: '1.6',
              background: msg.role === 'user' ? '#C42020' : '#1A2035',
              color: 'white',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
              borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '16px',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-end',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #C42020, #FF6040)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}>
              🌸
            </div>
            <div style={{
              background: '#1A2035',
              padding: '12px 16px',
              borderRadius: '16px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
            }}>
              Sakura is thinking... 🌸
            </div>
          </div>
        )}
      </div>

      {/* 入力エリア */}
      <div style={{
        background: '#1A2035',
        padding: '16px 40px',
        display: 'flex',
        gap: '12px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask Sakura anything about Japan... 🌸"
          style={{
            flex: 1,
            background: '#0D0907',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '12px 16px',
            color: 'white',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            background: '#C42020',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '700',
          }}
        >
          ➤
        </button>
      </div>
    </main>
  )
}