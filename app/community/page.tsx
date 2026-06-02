'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const CATEGORIES = ['All', 'Visa', 'Schools', 'Life in Japan', 'Jobs', 'Housing', 'General']

const SAMPLE_POSTS = [
  {id:1,category:'Visa',title:'My Student Visa Approved in 3 Weeks!',content:'I just got my student visa approved! Here is my experience and timeline. Applied at Japanese Embassy Dhaka on April 1, got COE from school in 3 weeks, submitted visa application April 25, approved May 3.',author:'Rahman_BD',country:'🇧🇩',likes:45,comments:12,time:'2 hours ago'},
  {id:2,category:'Schools',title:'Tokyo vs Osaka - Which is Better for Students?',content:'I have been researching both cities for 3 months. Tokyo has more schools and jobs but is expensive. Osaka is cheaper and people are friendlier. What do you think?',author:'Sharma_NP',country:'🇳🇵',likes:38,comments:24,time:'5 hours ago'},
  {id:3,category:'Life in Japan',title:'First Month in Japan - Complete Guide',content:'I arrived in Tokyo last month. Here is everything I wish I knew before coming: SIM card, bank account, city hall registration, garbage rules, and more!',author:'Islam_BD',country:'🇧🇩',likes:67,comments:18,time:'1 day ago'},
  {id:4,category:'Jobs',title:'Found Part-time Job at Convenience Store!',content:'After 2 months of looking, I finally got a job at 7-Eleven near my school. The interview was in Japanese but my N4 was enough. Salary is 1,100 Yen per hour.',author:'Tamang_NP',country:'🇳🇵',likes:29,comments:8,time:'2 days ago'},
  {id:5,category:'Housing',title:'Share House Review - Sakura House Tokyo',content:'Living at Sakura House in Shinjuku for 3 months. Rent is 55,000 Yen including WiFi and utilities. Very international community. Recommended!',author:'Hasan_BD',country:'🇧🇩',likes:41,comments:15,time:'3 days ago'},
  {id:6,category:'General',title:'Halal Food Guide for Muslim Students in Tokyo',content:'Finding halal food in Tokyo is easier than I thought! Here are my favorite places in Ueno, Shinjuku, and Akihabara areas. All verified halal certified.',author:'Karim_BD',country:'🇧🇩',likes:55,comments:20,time:'4 days ago'},
  {id:7,category:'Visa',title:'SSW Visa Process from Nepal - My Experience',content:'I passed the SSW skills test for food service and JLPT N4. The visa process took 4 months total. Happy to answer questions about the SSW visa from Nepal.',author:'Gurung_NP',country:'🇳🇵',likes:33,comments:16,time:'5 days ago'},
  {id:8,category:'Schools',title:'JLPT N3 Passed After 1 Year at Language School',content:'I passed JLPT N3 after studying for 1 year at Tokyo Japanese Language School. My tips: study every day, watch Japanese TV, make Japanese friends.',author:'Ahmed_BD',country:'🇧🇩',likes:72,comments:28,time:'1 week ago'},
]

export default function CommunityPage() {
  const [category, setCategory] = useState('All')
  const [posts, setPosts] = useState(SAMPLE_POSTS)
  const [liked, setLiked] = useState<number[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newPost, setNewPost] = useState({title:'',content:'',category:'General'})
  const [user, setUser] = useState<any>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({data}) => {
      if (data.user) setUser(data.user)
    })
  }, [])

  function toggleLike(id: number) {
    if (liked.includes(id)) {
      setLiked(prev => prev.filter(l => l !== id))
      setPosts(prev => prev.map(p => p.id === id ? {...p, likes: p.likes - 1} : p))
    } else {
      setLiked(prev => [...prev, id])
      setPosts(prev => prev.map(p => p.id === id ? {...p, likes: p.likes + 1} : p))
    }
  }

  function submitPost() {
    if (!newPost.title || !newPost.content) return
    const post = {
      id: posts.length + 1,
      category: newPost.category,
      title: newPost.title,
      content: newPost.content,
      author: user?.email?.split('@')[0] || 'Anonymous',
      country: '🌍',
      likes: 0,
      comments: 0,
      time: 'Just now',
    }
    setPosts(prev => [post, ...prev])
    setNewPost({title:'',content:'',category:'General'})
    setShowForm(false)
  }

  const filtered = posts.filter(p => {
    const matchCategory = category === 'All' || p.category === category
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Community</h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Connect with Bangladesh and Nepal students in Japan</p>
          </div>
          <button onClick={()=>setShowForm(!showForm)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
            + New Post
          </button>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        {showForm && (
          <div style={{background:'#1A2035',borderRadius:'14px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(196,32,32,0.3)'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Create New Post</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <select value={newPost.category} onChange={e=>setNewPost(prev=>({...prev,category:e.target.value}))} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
                {CATEGORIES.filter(c=>c!=='All').map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <input value={newPost.title} onChange={e=>setNewPost(prev=>({...prev,title:e.target.value}))} placeholder="Post title..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              <textarea value={newPost.content} onChange={e=>setNewPost(prev=>({...prev,content:e.target.value}))} placeholder="Share your experience or question..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'100px'}}/>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={submitPost} disabled={!newPost.title||!newPost.content} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:2}}>
                  Post
                </button>
                <button onClick={()=>setShowForm(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'14px',cursor:'pointer',flex:1}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap'}}>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setCategory(c)} style={{background:category===c?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {c}
            </button>
          ))}
        </div>

        <div style={{marginBottom:'16px'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search posts..." style={{width:'100%',background:'#1A2035',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none'}}/>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          {filtered.map(post=>(
            <div key={post.id} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'10px',flexWrap:'wrap'}}>
                <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{post.category}</span>
                <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{post.time}</span>
              </div>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>{post.title}</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.7',marginBottom:'14px'}}>{post.content}</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                  <span style={{fontSize:'18px'}}>{post.country}</span>
                  <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',fontWeight:'600'}}>@{post.author}</span>
                </div>
                <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
                  <button onClick={()=>toggleLike(post.id)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',color:liked.includes(post.id)?'#C42020':'rgba(255,255,255,0.4)',fontSize:'13px'}}>
                    {liked.includes(post.id)?'❤️':'🤍'} {post.likes}
                  </button>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'13px'}}>💬 {post.comments}</span>
                  <a href="/chat" style={{color:'#4A8EFF',fontSize:'12px',textDecoration:'none'}}>Ask Sakura →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}