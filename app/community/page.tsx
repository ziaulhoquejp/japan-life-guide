'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const CATEGORIES = ['All', 'Visa Help', 'School Life', 'Jobs', 'Housing', 'Halal Food', 'JLPT Study', 'Culture', 'General']

export default function CommunityPage() {
const [user, setUser] = useState<any>(null)
const [profile, setProfile] = useState<any>(null)
const [posts, setPosts] = useState<any[]>([])
const [matches, setMatches] = useState<any[]>([])
const [loading, setLoading] = useState(true)
const [activeTab, setActiveTab] = useState<'feed'|'matches'|'new'>('feed')
const [selectedCategory, setSelectedCategory] = useState('All')
const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General' })
const [posting, setPosting] = useState(false)
const [replyText, setReplyText] = useState<any>({})
const [expandedPost, setExpandedPost] = useState<string|null>(null)

useEffect(() => {
async function load() {
const { data: userData } = await supabase.auth.getUser()
if (userData.user) {
setUser(userData.user)
const { data: profileData } = await supabase.from('profiles').select('*').eq('id', userData.user.id).single()
if (profileData) {
setProfile(profileData)
// Find matches
if (profileData.country) {
const { data: matchData } = await supabase
.from('profiles')
.select('id, full_name, country, japanese_level, purpose, created_at')
.eq('country', profileData.country)
.neq('id', userData.user.id)
.limit(6)
if (matchData) setMatches(matchData)
}
}
}
const { data: postsData } = await supabase
.from('community_posts')
.select('*, profiles(full_name, country)')
.order('created_at', { ascending: false })
.limit(30)
if (postsData) setPosts(postsData)
setLoading(false)
}
load()
}, [])

async function submitPost() {
if (!user) { window.location.href = '/login'; return }
if (!newPost.title || !newPost.content) return
setPosting(true)
const { data } = await supabase.from('community_posts').insert({
user_id: user.id,
title: newPost.title,
content: newPost.content,
category: newPost.category,
}).select('*, profiles(full_name, country)').single()
if (data) setPosts(prev => [data, ...prev])
setNewPost({ title: '', content: '', category: 'General' })
setPosting(false)
setActiveTab('feed')
}

async function submitReply(postId: string) {
if (!user || !replyText[postId]) return
await supabase.from('community_replies').insert({
post_id: postId,
user_id: user.id,
content: replyText[postId],
})
setReplyText((prev: any) => ({...prev, [postId]: ''}))
}

async function likePost(postId: string) {
if (!user) return
await supabase.from('community_likes').insert({ post_id: postId, user_id: user.id })
setPosts(prev => prev.map(p => p.id === postId ? {...p, likes: (p.likes || 0) + 1} : p))
}

const filtered = posts.filter(p => selectedCategory === 'All' || p.category === selectedCategory)

const countryFlag: any = { Bangladesh: '🇧🇩', Nepal: '🇳🇵', Japan: '🇯🇵', Other: '🌍' }

if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Community 🌸</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'16px'}}>Connect with Bangladesh & Nepal students in Japan</p>
<div style={{display:'flex',gap:'8px',justifyContent:'center',flexWrap:'wrap'}}>
{[
{key:'feed' as const, label:'📋 Feed'},
{key:'matches' as const, label:`🤝 Student Matches ${matches.length > 0 ? '('+matches.length+')' : ''}`},
{key:'new' as const, label:'✏️ New Post'},
].map(tab => (
<button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{background:activeTab===tab.key?'#C42020':'rgba(255,255,255,0.08)',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
{tab.label}
</button>
))}
</div>
</div>

<div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>

{/* Feed Tab */}
{activeTab === 'feed' && (
<div>
<div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
{CATEGORIES.map(cat => (
<button key={cat} onClick={()=>setSelectedCategory(cat)} style={{background:selectedCategory===cat?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'6px 14px',color:'white',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
{cat}
</button>
))}
</div>

{filtered.length === 0 ? (
<div style={{textAlign:'center',padding:'48px',background:'#1A2035',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>No posts yet. Be the first to post!</p>
<button onClick={()=>setActiveTab('new')} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
Write First Post ✏️
</button>
</div>
) : (
<div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
{filtered.map(post => (
<div key={post.id} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:'12px'}}>
<div style={{width:'36px',height:'36px',borderRadius:'50%',background:'linear-gradient(135deg,#C42020,#FF8070)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'14px',fontWeight:'700',flexShrink:0}}>
{post.profiles?.full_name?.[0]?.toUpperCase() || '?'}
</div>
<div style={{flex:1}}>
<div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap',marginBottom:'4px'}}>
<span style={{color:'white',fontSize:'13px',fontWeight:'700'}}>{post.profiles?.full_name || 'Anonymous'}</span>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{countryFlag[post.profiles?.country] || '🌍'} {post.profiles?.country}</span>
<span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>{post.category}</span>
</div>
<span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{new Date(post.created_at).toLocaleDateString()}</span>
</div>
</div>

<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>{post.title}</h3>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7',marginBottom:'14px'}}>{post.content}</p>

<div style={{display:'flex',gap:'10px',alignItems:'center'}}>
<button onClick={()=>likePost(post.id)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',gap:'4px'}}>
❤️ {post.likes || 0}
</button>
<button onClick={()=>setExpandedPost(expandedPost===post.id?null:post.id)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'13px'}}>
💬 Reply
</button>
</div>

{expandedPost === post.id && (
<div style={{marginTop:'12px',display:'flex',gap:'8px'}}>
<input
value={replyText[post.id] || ''}
onChange={e=>setReplyText((prev: any)=>({...prev,[post.id]:e.target.value}))}
placeholder="Write a reply..."
style={{flex:1,background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px',color:'white',fontSize:'13px',outline:'none'}}
/>
<button onClick={()=>submitReply(post.id)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 16px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
Send
</button>
</div>
)}
</div>
))}
</div>
)}
</div>
)}

{/* Matches Tab */}
{activeTab === 'matches' && (
<div>
<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'12px',padding:'16px',marginBottom:'20px',border:'1px solid rgba(46,200,122,0.2)'}}>
<p style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>🤝 Student Matching</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6'}}>
{user ? `We found ${matches.length} students from ${profile?.country || 'your country'} on Japan Life Guide!` : 'Sign in to see student matches from your country!'}
</p>
</div>

{!user ? (
<div style={{textAlign:'center',padding:'40px',background:'#1A2035',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)'}}>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'16px'}}>Sign in to see students from your country!</p>
<a href="/login" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>Sign In</a>
</div>
) : matches.length === 0 ? (
<div style={{textAlign:'center',padding:'40px',background:'#1A2035',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No matches found yet. Invite friends to join!</p>
</div>
) : (
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'12px'}}>
{matches.map(match => (
<div key={match.id} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
<div style={{width:'48px',height:'48px',borderRadius:'50%',background:'linear-gradient(135deg,#C42020,#FF8070)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'20px',fontWeight:'700',margin:'0 auto 10px'}}>
{match.full_name?.[0]?.toUpperCase() || '?'}
</div>
<p style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{match.full_name || 'Student'}</p>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'8px'}}>
{countryFlag[match.country] || '🌍'} {match.country}
</p>
<div style={{display:'flex',gap:'6px',justifyContent:'center',flexWrap:'wrap',marginBottom:'12px'}}>
{match.japanese_level && (
<span style={{background:'rgba(240,168,48,0.15)',color:'#F0A830',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>JLPT {match.japanese_level.toUpperCase()}</span>
)}
{match.purpose && (
<span style={{background:'rgba(74,142,255,0.15)',color:'#4A8EFF',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>{match.purpose}</span>
)}
</div>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Joined {new Date(match.created_at).toLocaleDateString()}</p>
</div>
))}
</div>
)}

<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Connect with the community! Share your experience.</p>
<button onClick={()=>setActiveTab('new')} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
Write a Post ✏️
</button>
</div>
</div>
)}

{/* New Post Tab */}
{activeTab === 'new' && (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'20px'}}>✏️ Write a Post</h2>
{!user ? (
<div style={{textAlign:'center',padding:'32px'}}>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'16px'}}>Sign in to post!</p>
<a href="/login" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>Sign In</a>
</div>
) : (
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Category</label>
<select value={newPost.category} onChange={e=>setNewPost(p=>({...p,category:e.target.value}))} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
{CATEGORIES.filter(c=>c!=='All').map(cat => (
<option key={cat} value={cat}>{cat}</option>
))}
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Title *</label>
<input value={newPost.title} onChange={e=>setNewPost(p=>({...p,title:e.target.value}))} placeholder="What's your question or topic?" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Content *</label>
<textarea value={newPost.content} onChange={e=>setNewPost(p=>({...p,content:e.target.value}))} placeholder="Share your experience, question, or advice..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'120px'}}/>
</div>
<button onClick={submitPost} disabled={posting||!newPost.title||!newPost.content} style={{background: newPost.title&&newPost.content ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: newPost.title&&newPost.content ? 'pointer' : 'not-allowed'}}>
{posting ? 'Posting...' : 'Post to Community 🌸'}
</button>
</div>
)}
</div>
)}
</div>
</main>
)
}

