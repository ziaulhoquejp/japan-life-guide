'use client'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      setDark(false)
      document.documentElement.style.setProperty('--bg', '#F5F5F5')
      document.documentElement.style.setProperty('--card', '#FFFFFF')
      document.documentElement.style.setProperty('--text', '#1A1A1A')
    }
  }, [])

  function toggleTheme() {
    const newDark = !dark
    setDark(newDark)
    if (newDark) {
      localStorage.setItem('theme', 'dark')
      document.documentElement.style.setProperty('--bg', '#0D0907')
      document.documentElement.style.setProperty('--card', '#1A2035')
      document.documentElement.style.setProperty('--text', '#FFFFFF')
    } else {
      localStorage.setItem('theme', 'light')
      document.documentElement.style.setProperty('--bg', '#F5F5F5')
      document.documentElement.style.setProperty('--card', '#FFFFFF')
      document.documentElement.style.setProperty('--text', '#1A1A1A')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      style={{
        position:'fixed',
        bottom:'24px',
        left:'24px',
        background:'#1A2035',
        border:'1px solid rgba(255,255,255,0.15)',
        borderRadius:'50%',
        width:'44px',
        height:'44px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        cursor:'pointer',
        fontSize:'20px',
        zIndex:49,
        boxShadow:'0 4px 12px rgba(0,0,0,0.3)',
      }}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}