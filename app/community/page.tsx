'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const SAMPLE_POSTS = [
  {id:'1',title:'How I got accepted to Tokyo Language School in 3 months!',content:'I want to share my experience applying to Japanese language schools from Bangladesh. First, I prepared all documents 6 months in advance. The key is to have your bank statement ready early...',author:'Rahman from Dhaka',country:'🇧🇩',category:'Success Story',likes:45,replies:[
    {id:'r1',author:'Karim',country:'🇧🇩',content:'Thank you for sharing! Which school did you apply to?',time:'1 hour ago'},
    {id:'r2',author:'Priya',country:'🇳🇵',content:'Very helpful! How much did you have in your bank account?',time:'2 hours ago'},
  ],time:'2 hours ago'},
  {id:'2',title:'JLPT N4 passed! Here is my study plan',content:'After 8 months of studying, I finally passed JLPT N4! I used Genki textbook and Anki flashcards every day for 2 hours. Here is my complete study plan...',author:'Priya from Kathmandu',country:'🇳🇵',category:'JLPT',likes:38,replies:[
    {id:'r3',author:'Bikash',country:'🇳🇵',content:'Congratulations! Did you use any online resources?',time:'3 hours ago'},
  ],time:'5 hours ago'},
  {id:'3',title:'Best halal restaurants in Tokyo - my top 10 list',content:'As a Muslim student in Tokyo, finding halal food was my biggest worry. After 1 year here, I have found amazing places. Here is my complete list...',author:'Karim from Chittagong',country:'🇧🇩',category:'Halal & Muslim',likes:67,replies:[],time:'1 day ago'},
  {id:'4',title:'SSW visa process from Nepal - complete guide',content:'I successfully got my SSW visa for the food service industry. Here is everything I did step by step. The most important thing is the JLPT N4...',author:'Bikash from Pokhara',country:'🇳🇵',category:'Visa',likes:52,replies:[],time:'2 days ago'},
  {id:'5',title:'Living in Osaka vs Tokyo - honest comparison',content:'I lived in Tokyo for 1 year and now in Osaka for 6 months. Here is my honest comparison for students. Osaka is much cheaper but Tokyo has more jobs...',author:'Fatima from Sylhet',country:'🇧🇩',category:'Life in Japan',likes:41,replies:[],time:'3 days ago'},
]

const CATEGORIES = ['All','Success Story','Visa','JLPT','Life in Japan','Finance','Halal & Muslim','Housing','Work','Culture']

export default function CommunityPage() {
  const [posts, setPosts] = useState(SAMPLE_POSTS)
  const [user, setUser] = useState<any>(null)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [newPost, setNewPost] = useState({title:'',content:'',category:'Life in Japan'})
  const [likes, setLikes] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [expandedPost, setExpandedPost] = useState<string|null>(null)
  const [replyText, setReplyText] = useState<{[key:string]:string}>({})
  const [showReply, setShowReply] = useState<string|null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({data}) => {
      if (data.user) setUser(data.user)
    })
  }, [])

  function toggleLike(postId: string) {
    if (!user) { window.location.href = '/login'; return }
    if (likes.includes(postId)) {
      setLikes(prev => prev.filter(id => id !== postId))
      setPosts(prev => prev.map(p => p.id === postId ? {...p, likes: p.likes - 1} : p))
    } else {
      setLikes(prev => [...prev, postId])
      setPosts(prev => prev.map(p => p.id === postId ? {...p, likes: p.likes + 1} : p))
    }
  }

  async function submitPost() {
    if (!user) { window.location.href = '/login'; return }
    if (!newPost.title || !newPost.content) return
    setSubmitting(true)
    const post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
      country: user.user_metadata?.country === 'Nepal' ? '🇳🇵' : '🇧🇩',
      category: newPost.category,
      likes: 0,
      replies: [],
      time: 'Just now',
    }
    setPosts(prev => [post, ...prev])
    setNewPost({title:'',content:'',category:'Life in Japan'})
    setShowForm(false)
    setSubmitting(false)
  }

  function submitReply(postId: string) {
    if (!user) { window.location.href = '/login'; return }
    const text = replyText[postId]
    if (!text?.trim()) return
    const reply = {
      id: 'r' + Date.now(),
      author: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
      country: user.user_metadata?.country === 'Nepal' ? '🇳🇵' : '🇧🇩',
      content: text,
      time: 'Just now',
    }
    setPosts(prev => prev.map(p => p.id === postId ? {...p, replies: [...p.replies, reply]} : p))
    setReplyText(prev => ({...prev, [postId]: ''}))
    setShowReply(null)
  }

  const filtered = posts.filter(p => {
    const matchCategory = category === 'All' || p.category === category
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const categoryColors: any = {
    'Success Story': '#2EC87A',
    'Visa': '#4A8EFF',
    'JLPT': '#F0A830',
    'Life in Japan': '#C42020',
    'Finance': '#A855F7',
    'Halal & Muslim': '#2EC87A',
    'Housing': '#FF8070',
    'Work': '#4A8EFF',
    'Culture': '#F0A830',
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'12px',marginBottom:'16px'}}>
          <div>
            <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Community</h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Connect with Bangladesh & Nepal students in Japan</p>
          </div>
          <button onClick={()=>user?setShowForm(!showForm):window.location.href='/login'} style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
            + Share Story
          </button>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search community posts..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        {showForm && (
          <div style={{background:'#1A2035',borderRadius:'14px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(196,32,32,0.3)'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Share Your Story</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <input value={newPost.title} onChange={e=>setNewPost(prev=>({...prev,title:e.target.value}))} placeholder="Title of your post..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              <select value={newPost.category} onChange={e=>setNewPost(prev=>({...prev,category:e.target.value}))} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                {CATEGORIES.filter(c=>c!=='All').map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <textarea value={newPost.content} onChange={e=>setNewPost(prev=>({...prev,content:e.target.value}))} placeholder="Share your experience, tips, or questions..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'120px'}}/>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={submitPost} disabled={submitting||!newPost.title||!newPost.content} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:2}}>
                  {submitting?'Posting...':'Post Story'}
                </button>
                <button onClick={()=>setShowForm(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'14px',cursor:'pointer',flex:1}}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'20px'}}>
          {CATEGORIES.map(cat=>(
            <button key={cat} onClick={()=>setCategory(cat)} style={{background:category===cat?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          {filtered.map(post=>(
            <div key={post.id} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'10px',flexWrap:'wrap'}}>
                <span style={{background:categoryColors[post.category]+'20'||'rgba(255,255,255,0.1)',color:categoryColors[post.category]||'white',padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{post.category}</span>
                <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{post.country} {post.author}</span>
                <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px',marginLeft:'auto'}}>{post.time}</span>
              </div>

              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'8px',cursor:'pointer'}} onClick={()=>setExpandedPost(expandedPost===post.id?null:post.id)}>
                {post.title}
              </h2>

              <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7',marginBottom:'12px'}}>
                {expandedPost===post.id ? post.content : post.content.slice(0,150) + (post.content.length>150?'...':'')}
              </p>

              {post.content.length > 150 && (
                <button onClick={()=>setExpandedPost(expandedPost===post.id?null:post.id)} style={{background:'none',border:'none',color:'#C42020',fontSize:'12px',cursor:'pointer',padding:'0',marginBottom:'12px'}}>
                  {expandedPost===post.id?'Show less ▲':'Read more ▼'}
                </button>
              )}

              {/* Replies */}
              {post.replies.length > 0 && (
                <div style={{background:'#0D0907',borderRadius:'8px',padding:'12px',marginBottom:'12px'}}>
                  <p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',marginBottom:'8px'}}>💬 {post.replies.length} replies</p>
                  {post.replies.map((reply:any)=>(
                    <div key={reply.id} style={{padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                      <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'4px'}}>
                        <span style={{color:'#C42020',fontSize:'12px',fontWeight:'600'}}>{reply.country} {reply.author}</span>
                        <span style={{color:'rgba(255,255,255,0.2)',fontSize:'11px'}}>{reply.time}</span>
                      </div>
                      <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',margin:0}}>{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              {showReply === post.id && (
                <div style={{display:'flex',gap:'8px',marginBottom:'12px'}}>
                  <input
                    value={replyText[post.id] || ''}
                    onChange={e=>setReplyText(prev=>({...prev,[post.id]:e.target.value}))}
                    placeholder="Write a reply..."
                    style={{flex:1,background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px',color:'white',fontSize:'13px',outline:'none'}}
                    onKeyDown={e=>e.key==='Enter'&&submitReply(post.id)}
                  />
                  <button onClick={()=>submitReply(post.id)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 16px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
                    Reply
                  </button>
                  <button onClick={()=>setShowReply(null)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'10px',fontSize:'13px',cursor:'pointer'}}>
                    Cancel
                  </button>
                </div>
              )}

              <div style={{display:'flex',gap:'12px',alignItems:'center',paddingTop:'12px',borderTop:'1px solid rgba(255,255,255,0.06)',flexWrap:'wrap'}}>
                <button onClick={()=>toggleLike(post.id)} style={{background:'none',border:'none',color:likes.includes(post.id)?'#C42020':'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',gap:'4px',padding:'4px 0'}}>
                  {likes.includes(post.id)?'❤️':'🤍'} {post.likes}
                </button>
                <button onClick={()=>setShowReply(showReply===post.id?null:post.id)} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.5)',border:'none',borderRadius:'6px',padding:'6px 12px',fontSize:'12px',cursor:'pointer'}}>
                  💬 Reply ({post.replies.length})
                </button>
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'12px'}}>Join the community to share your story!</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
              <a href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Join Free</a>
              <a href="/login" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Sign In</a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}