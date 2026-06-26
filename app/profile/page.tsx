'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ProfilePage() {
const [user, setUser] = useState<any>(null)
const [profile, setProfile] = useState<any>(null)
const [loading, setLoading] = useState(true)
const [saving, setSaving] = useState(false)
const [saved, setSaved] = useState(false)
const [activeTab, setActiveTab] = useState<'profile'|'security'|'danger'>('profile')
const [form, setForm] = useState({
full_name: '',
country: '',
japanese_level: '',
purpose: '',
phone: '',
bio: '',
})
const [passwordForm, setPasswordForm] = useState({
newPassword: '',
confirmPassword: '',
})
const [passwordMsg, setPasswordMsg] = useState('')

useEffect(() => {
async function load() {
const { data: userData } = await supabase.auth.getUser()
if (!userData.user) { window.location.href = '/login'; return }
setUser(userData.user)
const { data: profileData } = await supabase.from('profiles').select('*').eq('id', userData.user.id).single()
if (profileData) {
setProfile(profileData)
setForm({
full_name: profileData.full_name || '',
country: profileData.country || '',
japanese_level: profileData.japanese_level || '',
purpose: profileData.purpose || '',
phone: profileData.phone || '',
bio: profileData.bio || '',
})
}
setLoading(false)
}
load()
}, [])

function update(field: string, value: string) {
setForm(prev => ({...prev, [field]: value}))
}

async function saveProfile() {
setSaving(true)
await supabase.from('profiles').update({
full_name: form.full_name,
country: form.country,
japanese_level: form.japanese_level,
purpose: form.purpose,
phone: form.phone,
bio: form.bio,
}).eq('id', user.id)
setSaved(true)
setSaving(false)
setTimeout(() => setSaved(false), 3000)
}

async function changePassword() {
if (passwordForm.newPassword !== passwordForm.confirmPassword) {
setPasswordMsg('Passwords do not match!')
return
}
if (passwordForm.newPassword.length < 6) {
setPasswordMsg('Password must be at least 6 characters!')
return
}
const { error } = await supabase.auth.updateUser({ password: passwordForm.newPassword })
if (error) {
setPasswordMsg('Error: ' + error.message)
} else {
setPasswordMsg('Password updated successfully!')
setPasswordForm({ newPassword: '', confirmPassword: '' })
}
}

async function deleteAccount() {
if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
await supabase.from('profiles').delete().eq('id', user?.id)
await supabase.auth.signOut()
window.location.href = '/'
}
}

if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

const isPro = profile?.plan === 'pro' || profile?.plan === 'lifetime'

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'32px 20px',borderBottom:'3px solid #C42020'}}>
<div style={{maxWidth:'700px',margin:'0 auto',display:'flex',gap:'16px',alignItems:'center',flexWrap:'wrap'}}>
<div style={{width:'64px',height:'64px',borderRadius:'50%',background:'linear-gradient(135deg,#C42020,#FF8070)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',fontWeight:'700',color:'white',flexShrink:0}}>
{form.full_name?.[0]?.toUpperCase() || '👤'}
</div>
<div style={{flex:1}}>
<h1 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>{form.full_name || 'My Profile'}</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'6px'}}>{user?.email}</p>
<span style={{background: isPro ? 'rgba(240,168,48,0.2)' : 'rgba(255,255,255,0.08)',color: isPro ? '#F0A830' : 'rgba(255,255,255,0.4)',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>
{isPro ? '💎 Pro Member' : '🆓 Free Plan'}
</span>
</div>
{!isPro && (
<a href="/pricing" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
Upgrade to Pro 💎
</a>
)}
</div>
</div>

<div style={{maxWidth:'700px',margin:'0 auto',padding:'32px 20px'}}>
<div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
{[
{key:'profile' as const, label:'👤 Profile'},
{key:'security' as const, label:'🔒 Security'},
{key:'danger' as const, label:'⚠️ Danger Zone'},
].map(tab => (
<button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{background:activeTab===tab.key?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
{tab.label}
</button>
))}
</div>

{/* Profile Tab */}
{activeTab === 'profile' && (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'20px'}}>Personal Information</h2>
<div style={{display:'flex',flexDirection:'column',gap:'14px',marginBottom:'20px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Full Name</label>
<input value={form.full_name} onChange={e=>update('full_name', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Email Address</label>
<input value={user?.email} disabled style={{width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'12px',color:'rgba(255,255,255,0.4)',fontSize:'14px',outline:'none',cursor:'not-allowed'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Phone Number</label>
<input value={form.phone} onChange={e=>update('phone', e.target.value)} placeholder="+880 or +977..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Country</label>
<select value={form.country} onChange={e=>update('country', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select country...</option>
<option value="Bangladesh">🇧🇩 Bangladesh</option>
<option value="Nepal">🇳🇵 Nepal</option>
<option value="India">🇮🇳 India</option>
<option value="Other">🌍 Other</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Japanese Level</label>
<select value={form.japanese_level} onChange={e=>update('japanese_level', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select level...</option>
<option value="none">Complete Beginner</option>
<option value="n5">JLPT N5</option>
<option value="n4">JLPT N4</option>
<option value="n3">JLPT N3</option>
<option value="n2">JLPT N2</option>
<option value="n1">JLPT N1</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Goal in Japan</label>
<select value={form.purpose} onChange={e=>update('purpose', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">Select goal...</option>
<option value="study">🎓 Study at language school</option>
<option value="work_ssw">🏭 Work with SSW visa</option>
<option value="work_engineer">💻 Work as IT/Engineer</option>
<option value="explore">🔍 Just exploring</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Bio (Optional)</label>
<textarea value={form.bio} onChange={e=>update('bio', e.target.value)} placeholder="Tell us about yourself..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'80px'}}/>
</div>
</div>

{saved && (
<div style={{background:'rgba(46,200,122,0.1)',border:'1px solid rgba(46,200,122,0.3)',borderRadius:'8px',padding:'10px',marginBottom:'12px',textAlign:'center'}}>
<p style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700'}}>✅ Profile saved successfully!</p>
</div>
)}

<button onClick={saveProfile} disabled={saving} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',width:'100%'}}>
{saving ? 'Saving...' : 'Save Profile'}
</button>
</div>
)}

{/* Security Tab */}
{activeTab === 'security' && (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'20px'}}>🔒 Change Password</h2>
<div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'16px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>New Password</label>
<input value={passwordForm.newPassword} onChange={e=>setPasswordForm(prev=>({...prev,newPassword:e.target.value}))} type="password" placeholder="Minimum 6 characters" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Confirm New Password</label>
<input value={passwordForm.confirmPassword} onChange={e=>setPasswordForm(prev=>({...prev,confirmPassword:e.target.value}))} type="password" placeholder="Repeat new password" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
</div>
{passwordMsg && (
<p style={{color: passwordMsg.includes('success') ? '#2EC87A' : '#FF8070',fontSize:'13px',marginBottom:'12px'}}>{passwordMsg}</p>
)}
<button onClick={changePassword} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',width:'100%'}}>
Update Password
</button>

<div style={{marginTop:'24px',padding:'16px',background:'rgba(255,255,255,0.04)',borderRadius:'10px'}}>
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>Account Info</h3>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'4px'}}>Email: {user?.email}</p>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'4px'}}>Member since: {new Date(user?.created_at).toLocaleDateString()}</p>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>Plan: <span style={{color: isPro ? '#F0A830' : 'rgba(255,255,255,0.6)',fontWeight:'700'}}>{isPro ? 'Pro' : 'Free'}</span></p>
</div>
</div>
)}

{/* Danger Zone Tab */}
{activeTab === 'danger' && (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'1px solid rgba(196,32,32,0.3)'}}>
<h2 style={{color:'#FF8070',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>⚠️ Danger Zone</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'24px',lineHeight:'1.7'}}>
Actions here are permanent and cannot be undone. Please be careful.
</p>

<div style={{background:'rgba(196,32,32,0.1)',borderRadius:'12px',padding:'20px',border:'1px solid rgba(196,32,32,0.2)'}}>
<h3 style={{color:'#FF8070',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>Delete Account</h3>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'16px',lineHeight:'1.6'}}>
This will permanently delete your account, all applications, saved schools, and personal data.
</p>
<button onClick={deleteAccount} style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'12px 24px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
Delete My Account
</button>
</div>
</div>
)}
</div>
</main>
)
}