'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AffiliatePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [referrals, setReferrals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function getData() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { window.location.href = '/login'; return }
      setUser(userData.user)

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.user.id)
        .single()

      if (!profileData?.referral_code) {
        const code = userData.user.email?.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g,'') + Math.random().toString(36).slice(2,6)
        await supabase.from('profiles').upsert({
          id: userData.user.id,
          referral_code: code,
          referral_count: 0,
          referral_earnings: 0,
        })
        setProfile({...profileData, referral_code: code})
      } else {
        setProfile(profileData)
      }

      const { data: referralData } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', userData.user.id)
        .order('created_at', { ascending: false })

      if (referralData) setReferrals(referralData)
      setLoading(false)
    }
    getData()
  }, [])

  function copyLink() {
    const link = `https://japanlifeguide.app?ref=${profile?.referral_code}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function shareOnTwitter() {
    const text = `I found the best resource for studying in Japan! 🌸 700+ language schools, visa guides, and AI assistant in Bengali & Nepali. Check it out!`
    const url = `https://japanlifeguide.app?ref=${profile?.referral_code}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }

  function shareOnFacebook() {
    const url = `https://japanlifeguide.app?ref=${profile?.referral_code}`
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  }

  function shareOnWhatsApp() {
    const text = `Japan Life Guide - Best resource for BD & NP students going to Japan! 🎌 700+ schools, visa guide, AI chat! ${`https://japanlifeguide.app?ref=${profile?.referral_code}`}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  const referralLink = `https://japanlifeguide.app?ref=${profile?.referral_code}`
  const pendingCount = referrals.filter(r=>r.status==='pending').length
  const completedCount = referrals.filter(r=>r.status==='completed').length
  const totalEarnings = completedCount * 500

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'linear-gradient(135deg,#1A2035,#0D1520)',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'12px'}}>💰</div>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Affiliate Program</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'4px'}}>Refer friends and earn ¥500 for every Pro signup!</p>
        <p style={{color:'#F0A830',fontSize:'14px',fontWeight:'600'}}>Your referrals: {profile?.referral_count || 0} · Total earned: ¥{totalEarnings.toLocaleString()}</p>
      </div>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:'12px',marginBottom:'24px'}}>
          {[
            {icon:'👥',label:'Total Referrals',value:referrals.length,color:'#4A8EFF'},
            {icon:'⏳',label:'Pending',value:pendingCount,color:'#F0A830'},
            {icon:'✅',label:'Completed',value:completedCount,color:'#2EC87A'},
            {icon:'💴',label:'Total Earned',value:'¥' + totalEarnings.toLocaleString(),color:'#F0A830'},
          ].map(stat=>(
            <div key={stat.label} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{fontSize:'24px',marginBottom:'8px'}}>{stat.icon}</div>
              <div style={{color:stat.color,fontSize:'20px',fontWeight:'700'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Your Referral Link</h2>
          <div style={{background:'#0D0907',borderRadius:'10px',padding:'14px 16px',marginBottom:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'10px',flexWrap:'wrap',border:'1px solid rgba(255,255,255,0.1)'}}>
            <span style={{color:'#4A8EFF',fontSize:'13px',fontFamily:'monospace',wordBreak:'break-all'}}>{referralLink}</span>
            <button onClick={copyLink} style={{background:copied?'#2EC87A':'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'8px 16px',fontSize:'13px',fontWeight:'700',cursor:'pointer',flexShrink:0}}>
              {copied ? '✓ Copied!' : 'Copy Link'}
            </button>
          </div>

          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'16px'}}>Share this link with friends. When they sign up and upgrade to Pro, you earn ¥500!</p>

          <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>Share on Social Media</h3>
          <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
            <button onClick={shareOnTwitter} style={{background:'#1DA1F2',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer',flex:1,minWidth:'100px'}}>
              🐦 Twitter/X
            </button>
            <button onClick={shareOnFacebook} style={{background:'#4267B2',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer',flex:1,minWidth:'100px'}}>
              📘 Facebook
            </button>
            <button onClick={shareOnWhatsApp} style={{background:'#25D366',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer',flex:1,minWidth:'100px'}}>
              💬 WhatsApp
            </button>
          </div>
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>How It Works</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {[
              {step:'1',title:'Share Your Link',desc:'Share your unique referral link with friends from Bangladesh and Nepal who want to study in Japan.',icon:'🔗'},
              {step:'2',title:'Friend Signs Up',desc:'Your friend clicks your link and creates a free account on Japan Life Guide.',icon:'👤'},
              {step:'3',title:'Friend Upgrades to Pro',desc:'When your friend upgrades to Pro plan (¥980/month), you earn ¥500!',icon:'💎'},
              {step:'4',title:'Earn Rewards',desc:'Rewards are credited to your account. Withdraw when you reach ¥5,000 minimum.',icon:'💴'},
            ].map(item=>(
              <div key={item.step} style={{display:'flex',gap:'14px',alignItems:'flex-start',padding:'14px',background:'#0D0907',borderRadius:'10px'}}>
                <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'14px',fontWeight:'700',flexShrink:0}}>{item.step}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'4px'}}>
                    <span style={{fontSize:'18px'}}>{item.icon}</span>
                    <h3 style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{item.title}</h3>
                  </div>
                  <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Referral History ({referrals.length})</h2>
          {referrals.length === 0 ? (
            <div style={{textAlign:'center',padding:'32px'}}>
              <div style={{fontSize:'48px',marginBottom:'12px'}}>👥</div>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>No referrals yet! Start sharing your link!</p>
              <button onClick={copyLink} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
                Copy Referral Link
              </button>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {referrals.map(ref=>(
                <div key={ref.id} style={{background:'#0D0907',borderRadius:'8px',padding:'12px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                  <div>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{ref.referred_email || 'Anonymous'}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{new Date(ref.created_at).toLocaleDateString()}</div>
                  </div>
                  <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                    <span style={{background:ref.status==='completed'?'rgba(46,200,122,0.2)':'rgba(240,168,48,0.2)',color:ref.status==='completed'?'#2EC87A':'#F0A830',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',textTransform:'capitalize'}}>{ref.status}</span>
                    {ref.status==='completed' && <span style={{color:'#F0A830',fontSize:'13px',fontWeight:'700'}}>+¥500</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.2),rgba(139,0,0,0.2))',borderRadius:'12px',padding:'24px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
          <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>Earn More! 🌟</h3>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'16px'}}>Share in Facebook groups for Bangladesh and Nepal students going to Japan to maximize your earnings!</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={copyLink} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
              {copied?'✓ Copied!':'Copy Link'}
            </button>
            <button onClick={shareOnWhatsApp} style={{background:'#25D366',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
              Share on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}