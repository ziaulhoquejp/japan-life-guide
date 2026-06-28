'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ReferralPage() {
const [user, setUser] = useState<any>(null)
const [profile, setProfile] = useState<any>(null)
const [referralCode, setReferralCode] = useState('')
const [referralCount, setReferralCount] = useState(0)
const [copied, setCopied] = useState(false)
const [loading, setLoading] = useState(true)

useEffect(() => {
async function load() {
const { data: userData } = await supabase.auth.getUser()
if (!userData.user) { window.location.href = '/login'; return }
setUser(userData.user)

const { data: profileData } = await supabase
.from('profiles')
.select('*')
.eq('id', userData.user.id)
.single()

if (profileData) {
setProfile(profileData)
// Generate referral code from user ID
const code = 'JLG' + userData.user.id.slice(0, 8).toUpperCase()
setReferralCode(code)

// Count referrals
const { count } = await supabase
.from('profiles')
.select('id', { count: 'exact', head: true })
.eq('referred_by', code)
setReferralCount(count || 0)
}
setLoading(false)
}
load()
}, [])

const referralLink = `https://japanlifeguide.app/register?ref=${referralCode}`

function copyLink() {
navigator.clipboard.writeText(referralLink)
setCopied(true)
setTimeout(() => setCopied(false), 2000)
}

function shareWhatsApp() {
const message = `🌸 Join Japan Life Guide - The best platform for studying and working in Japan!\n\nFind 724+ verified Japanese language schools, get visa guidance, and chat with Sakura AI in Bengali & Nepali.\n\n👉 ${referralLink}\n\n#Japan #StudyInJapan`
window.open(`https://wa.me/?text=${encodeURIComponent(message)}`)
}

function shareFacebook() {
window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`)
}

function shareTwitter() {
const text = `🌸 Join Japan Life Guide - Study & Work in Japan! 724+ verified schools, visa guide, Sakura AI in Bengali & Nepali. Free to join! ${referralLink} #StudyInJapan #Japan`
window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`)
}

const isPro = profile?.plan === 'pro' || profile?.plan === 'lifetime'
const pointsNeeded = 5
const progress = Math.min(referralCount, pointsNeeded)

if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'linear-gradient(135deg,#1A2035,#0D1520)',padding:'60px 20px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<div style={{fontSize:'56px',marginBottom:'16px'}}>🎁</div>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'800',marginBottom:'8px'}}>Refer Friends & Earn Rewards!</h1>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'16px'}}>
Invite friends to Japan Life Guide and earn free Pro access!
</p>
<div style={{display:'inline-flex',gap:'16px',flexWrap:'wrap',justifyContent:'center'}}>
<span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'6px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:'700'}}>✅ Free to share</span>
<span style={{background:'rgba(240,168,48,0.2)',color:'#F0A830',padding:'6px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:'700'}}>💎 Win Pro access</span>
</div>
</div>

<div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>

{/* How it works */}
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'12px',marginBottom:'32px'}}>
{[
{step:'1',icon:'🔗',title:'Share your link',desc:'Send your unique referral link to friends'},
{step:'2',icon:'👥',title:'Friend joins',desc:'Friend registers using your link'},
{step:'3',icon:'⭐',title:'Earn points',desc:'You get 1 point per referral'},
{step:'4',icon:'💎',title:'Win Pro!',desc:'5 referrals = 1 month Pro FREE!'},
].map(item => (
<div key={item.step} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{fontSize:'28px',marginBottom:'8px'}}>{item.icon}</div>
<div style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{item.title}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',lineHeight:'1.5'}}>{item.desc}</div>
</div>
))}
</div>

{/* Progress */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',flexWrap:'wrap',gap:'8px'}}>
<div>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'4px'}}>Your Progress</h2>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>{referralCount} friend{referralCount!==1?'s':''} joined using your link</p>
</div>
<div style={{textAlign:'center'}}>
<div style={{color:'#F0A830',fontSize:'36px',fontWeight:'800'}}>{referralCount}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>referrals</div>
</div>
</div>

<div style={{marginBottom:'12px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
<span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>Progress to free Pro</span>
<span style={{color:'#F0A830',fontSize:'12px',fontWeight:'700'}}>{progress}/{pointsNeeded}</span>
</div>
<div style={{height:'10px',background:'rgba(255,255,255,0.1)',borderRadius:'5px',overflow:'hidden'}}>
<div style={{width:(progress/pointsNeeded*100)+'%',height:'100%',background:'linear-gradient(90deg,#F0A830,#C42020)',borderRadius:'5px',transition:'width 0.5s ease'}}/>
</div>
</div>

{referralCount >= pointsNeeded ? (
<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'10px',padding:'14px',border:'1px solid rgba(46,200,122,0.3)',textAlign:'center'}}>
<p style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700'}}>🎉 Congratulations! You earned 1 month Pro FREE!</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginTop:'4px'}}>Contact us at hello@japanlifeguide.app to claim your reward!</p>
</div>
) : (
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>
{pointsNeeded - referralCount} more referral{pointsNeeded-referralCount!==1?'s':''} needed for 1 month Pro FREE!
</p>
)}
</div>

{/* Referral Link */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>🔗 Your Referral Link</h2>

<div style={{background:'#0D0907',borderRadius:'10px',padding:'14px',display:'flex',gap:'10px',alignItems:'center',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.1)'}}>
<span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{referralLink}</span>
<button onClick={copyLink} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'8px 16px',fontSize:'12px',fontWeight:'700',cursor:'pointer',flexShrink:0}}>
{copied ? '✅ Copied!' : '📋 Copy'}
</button>
</div>

<div style={{background:'#0D0907',borderRadius:'10px',padding:'12px',marginBottom:'16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>Your referral code:</span>
<span style={{color:'#F0A830',fontSize:'16px',fontWeight:'800',letterSpacing:'2px'}}>{referralCode}</span>
</div>

{/* Share Buttons */}
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>Share via:</h3>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'10px'}}>
<button onClick={shareWhatsApp} style={{background:'#25D366',color:'white',border:'none',borderRadius:'10px',padding:'12px',fontSize:'13px',fontWeight:'700',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
💬 WhatsApp
</button>
<button onClick={shareFacebook} style={{background:'#1877F2',color:'white',border:'none',borderRadius:'10px',padding:'12px',fontSize:'13px',fontWeight:'700',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
📘 Facebook
</button>
<button onClick={shareTwitter} style={{background:'#1DA1F2',color:'white',border:'none',borderRadius:'10px',padding:'12px',fontSize:'13px',fontWeight:'700',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
🐦 Twitter/X
</button>
<button onClick={copyLink} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'12px',fontSize:'13px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
🔗 Copy Link
</button>
</div>
</div>

{/* Share Messages */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>💬 Ready-to-use Messages</h2>

{[
{
lang:'🇬🇧 English',
text:`🌸 Want to study or work in Japan? Join Japan Life Guide!\n\n✅ 724+ verified Japanese schools\n✅ Visa guide (Student, SSW, Engineer)\n✅ Sakura AI assistant in Bengali & Nepali\n✅ Free to join!\n\n👉 ${referralLink}`
},
{
lang:'🇧🇩 Bengali',
text:`🌸 জাপানে পড়তে বা কাজ করতে চান? Japan Life Guide-এ যোগ দিন!\n\n✅ ৭২৪+ যাচাইকৃত জাপানি সল\n✅ ভিসা গাইড (স্টুডেন্ট, SSW, ইঞ্জিনিয়ার)\n✅ বাংলায় Sakura AI সহকারী\n✅ বিনামূল্যে যোগ দিন!\n\n👉 ${referralLink}`
},
{
lang:'🇳🇵 Nepali',
text:`🌸 जापानमा पढ्न वा काम गर्न चाहनुहुन्छ? Japan Life Guide म सामेल हुनस्!\n\n✅ ७२४+ प्रमाणित जपानी स्कुलहरू\n✅ भिसा गाइड (Student, SSW, Engineer)\n✅ नेपालीमा Sakura AI सहायक\n✅ निःशुल्क सामेल हुनुस्!\n\n👉 ${referralLink}`
},
].map(msg => (
<div key={msg.lang} style={{background:'#0D0907',borderRadius:'10px',padding:'16px',marginBottom:'12px',border:'1px solid rgba(255,255,255,0.06)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
<span style={{color:'white',fontSize:'13px',fontWeight:'700'}}>{msg.lang}</span>
<button onClick={()=>{ navigator.clipboard.writeText(msg.text); setCopied(true); setTimeout(()=>setCopied(false),2000) }} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'6px',padding:'4px 12px',fontSize:'11px',cursor:'pointer'}}>
📋 Copy
</button>
</div>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.7',whiteSpace:'pre-wrap'}}>{msg.text}</p>
</div>
))}
</div>

{/* Rewards Table */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>🏆 Reward Tiers</h2>
<div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
{[
{referrals:1, reward:'Sakura AI unlimited for 3 days', color:'#2EC87A'},
{referrals:3, reward:'Sakura AI unlimited for 1 week', color:'#4A8EFF'},
{referrals:5, reward:'1 month Pro FREE! 💎', color:'#F0A830'},
{referrals:10, reward:'3 months Pro FREE! 🌟', color:'#C42020'},
{referrals:20, reward:'Lifetime access FREE! 👑', color:'#A855F7'},
].map(tier => (
<div key={tier.referrals} style={{display:'flex',gap:'14px',alignItems:'center',padding:'12px',background: referralCount >= tier.referrals ? 'rgba(46,200,122,0.05)' : '#0D0907',borderRadius:'10px',border:'1px solid ' + (referralCount >= tier.referrals ? 'rgba(46,200,122,0.2)' : 'rgba(255,255,255,0.04)')}}>
<div style={{width:'36px',height:'36px',borderRadius:'50%',background: referralCount >= tier.referrals ? '#2EC87A' : 'rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'13px',fontWeight:'700',flexShrink:0}}>
{referralCount >= tier.referrals ? '✓' : tier.referrals}
</div>
<div style={{flex:1}}>
<span style={{color:tier.color,fontSize:'13px',fontWeight:'700'}}>{tier.reward}</span>
</div>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px',whiteSpace:'nowrap'}}>{tier.referrals} friends</span>
</div>
))}
</div>
</div>
</div>
</main>
)
}

