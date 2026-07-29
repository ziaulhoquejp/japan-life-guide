'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { window.location.href = '/login'; return }
      setUser(data.user)
    })
  }, [])

  async function deleteAccount() {
    if (confirmText !== 'DELETE') {
      alert('Please type DELETE to confirm')
      return
    }
    setLoading(true)
    try {
      await supabase.from('profiles').delete().eq('id', user?.id)
      await supabase.from('applications').delete().eq('user_id', user?.id)
      await supabase.from('favorites').delete().eq('user_id', user?.id)
      await supabase.from('visa_tracker').delete().eq('user_id', user?.id)
      await supabase.auth.signOut()
      setDeleted(true)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (deleted) {
    return (
      <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:'sans-serif'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'56px',marginBottom:'16px'}}>✅</div>
          <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Account Deleted</h2>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px'}}>Your account and all data have been permanently deleted.</p>
          <Link href="/" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>
            Go to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px 20px',borderBottom:'3px solid #C42020'}}>
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>⚙️ Settings</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Manage your account settings</p>
        </div>
      </div>

      <div style={{maxWidth:'600px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Account Info */}
        <div style={{background:'#1A2035',borderRadius:'14px',padding:'22px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>👤 Account Information</h2>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'8px'}}>Email: <span style={{color:'white'}}>{user?.email}</span></p>
          <div style={{display:'flex',gap:'10px',marginTop:'14px'}}>
            <Link href="/profile" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 16px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.1)'}}>
              Edit Profile →
            </Link>
            <Link href="/dashboard" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 16px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.1)'}}>
              Dashboard →
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{background:'#1A2035',borderRadius:'14px',padding:'22px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>🔗 Quick Links</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {[
              {href:'/privacy',label:'Privacy Policy 🔒'},
              {href:'/visa-tracker',label:'Document Tracker 🪪'},
              {href:'/chat',label:'Sakura AI 🌸'},
            ].map(link => (
              <Link key={link.href} href={link.href} style={{color:'rgba(255,255,255,0.6)',textDecoration:'none',fontSize:'13px',padding:'10px',background:'#0D0907',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.04)'}}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Sign Out */}
        <div style={{background:'#1A2035',borderRadius:'14px',padding:'22px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>🚪 Sign Out</h2>
          <button
            type="button"
            onClick={async () => { await supabase.auth.signOut(); window.location.href = '/' }}
            style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'12px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer',WebkitAppearance:'none'}}
          >
            Sign Out
          </button>
        </div>

        {/* DELETE ACCOUNT - Most Prominent */}
        <div style={{background:'rgba(196,32,32,0.1)',borderRadius:'14px',padding:'24px',border:'2px solid rgba(196,32,32,0.5)'}}>
          <h2 style={{color:'#FF8070',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>🗑️ Delete Account</h2>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7',marginBottom:'16px'}}>
            Permanently delete your account and all associated data including your profile, school applications, saved schools, and visa documents. <strong style={{color:'#FF8070'}}>This action cannot be undone.</strong>
          </p>

          {!showConfirm ? (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer',WebkitAppearance:'none',width:'100%'}}
            >
              🗑️ Delete My Account
            </button>
          ) : (
            <div>
              <div style={{background:'rgba(196,32,32,0.15)',borderRadius:'8px',padding:'14px',marginBottom:'14px',border:'1px solid rgba(196,32,32,0.3)'}}>
                <p style={{color:'#FF8070',fontSize:'13px',fontWeight:'700',marginBottom:'8px'}}>⚠️ This will permanently delete:</p>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>• Your profile and personal information</p>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>• All school applications</p>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>• Saved schools and favorites</p>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>• Visa documents and reminders</p>
              </div>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'8px'}}>Type <strong style={{color:'#FF8070'}}>DELETE</strong> to confirm:</p>
              <input
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
                placeholder="Type DELETE here"
                style={{width:'100%',background:'#0D0907',border:'1px solid rgba(196,32,32,0.4)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',marginBottom:'12px'}}
              />
              <div style={{display:'flex',gap:'10px'}}>
                <button
                  type="button"
                  onClick={() => { setShowConfirm(false); setConfirmText('') }}
                  style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'13px',cursor:'pointer',flex:1,WebkitAppearance:'none'}}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={deleteAccount}
                  disabled={loading || confirmText !== 'DELETE'}
                  style={{background: confirmText === 'DELETE' ? '#C42020' : 'rgba(196,32,32,0.3)',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'13px',fontWeight:'700',cursor: confirmText === 'DELETE' ? 'pointer' : 'not-allowed',flex:2,WebkitAppearance:'none'}}
                >
                  {loading ? 'Deleting...' : '🗑️ Permanently Delete Account'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}