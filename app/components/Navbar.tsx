'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{
      background: '#0D0907',
      borderBottom: '2px solid #C42020',
      padding: '0 40px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#C42020', boxShadow: '0 0 10px rgba(196,32,32,0.5)' }}/>
        <span style={{ color: 'white', fontSize: '18px', fontWeight: '700', fontFamily: 'sans-serif' }}>
          Japan Life Guide
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="/schools" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          🏫 Schools
        </Link>
        <Link href="/visa" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          🛂 Visa
        </Link>
        <Link href="/chat" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          🌸 Sakura AI
        </Link>
        <Link href="/community" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          💬 Community
        </Link>
        <Link href="/login" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          🔑 Login
        </Link>
        <Link href="/register" style={{
          background: '#C42020',
          color: 'white',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: '700',
          padding: '8px 18px',
          borderRadius: '8px',
        }}>
          Join Free 🌸
        </Link>
      </div>
    </nav>
  )
}