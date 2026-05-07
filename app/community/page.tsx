'use client'

import { useState } from 'react'

const POSTS = [
  {id:1,avatar:'👨‍💼',name:'Rahul Ahmed',flag:'🇧🇩',time:'1 week ago',title:'I Finally Got My Student Visa!',text:'After 6 months of planning, I am now in Tokyo! The bank statement was the hardest part. Ask me anything!',likes:456,comments:34,tags:['Success','Visa']},
  {id:2,avatar:'👩‍🎓',name:'Priya Sharma',flag:'🇳🇵',time:'3 days ago',title:'MEXT Scholarship Tips for Nepal Students',text:'Contact the professor FIRST before applying. This made all the difference in getting my scholarship!',likes:198,comments:27,tags:['Scholarship','Nepal']},
  {id:3,avatar:'👨‍🏫',name:'Kenji Tanaka',flag:'🇯🇵',time:'2 days ago',title:'Student Visa Guide 2025 - Complete',text:'Bank statement must show 2000000 JPY. COE takes 4 to 8 weeks. Here is everything you need to know...',likes:284,comments:42,tags:['Official','Visa']},
  {id:4,avatar:'👩‍💻',name:'Fatima Begum',flag:'🇧🇩',time:'5 days ago',title:'Life in Tokyo as a Student from Bangladesh',text:'Living costs, part time jobs, transport everything you need to know before coming to Japan!',likes:312,comments:56,tags:['Life','Tokyo']},
]

export default function CommunityPage() {
  const [liked, setLiked] = useState<number[]>([])
  const [newPost, setNewPost] = useState('')
  const [showForm, setShowForm] = useState(false)

  function toggleLike(id: number) {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Community Forum</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>14,000+ members helping each other go to Japan</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}
        >
          + New Post
        </button>
      </div>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>
        {showForm && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.1)'}}>
            <h3 style={{color:'white',marginBottom:'12px'}}>Share your experience</h3>
            <textarea
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="Share your Japan journey story..."
              style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'100px'}}
            />
            <div style={{display:'flex',gap:'10px',marginTop:'12px'}}>
              <button
                onClick={() => { setShowForm(false); setNewPost('') }}
                style={{background:'#2EC87A',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}
              >
                Post
              </button>
              <button
                onClick={() => setShowForm(false)}
                style={{background:'transparent',color:'rgba(255,255,255,0.5)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',cursor:'pointer'}}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {POSTS.map(post => (
          <div key={post.id} style={{background:'#1A2035',borderRadius:'12px',marginBottom:'16px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{padding:'16px 18px 0',display:'flex',gap:'12px',alignItems:'flex-start'}}>
              <div style={{fontSize:'32px'}}>{post.avatar}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{color:'white',fontWeight:'700',fontSize:'14px'}}>{post.name}</span>
                  <span style={{fontSize:'16px'}}>{post.flag}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px',marginLeft:'auto'}}>{post.time}</span>
                </div>
              </div>
            </div>
            <div style={{padding:'12px 18px'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>{post.title}</h3>
              <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{post.text}</p>
              <div style={{display:'flex',gap:'6px',marginTop:'10px'}}>
                {post.tags.map(tag => (
                  <span key={tag} style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'3px 9px',borderRadius:'4px',fontSize:'11px',fontWeight:'600'}}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{padding:'10px 18px 14px',display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
              <button
                onClick={() => toggleLike(post.id)}
                style={{display:'flex',alignItems:'center',gap:'5px',padding:'6px 12px',borderRadius:'8px',background:'none',border:'none',color:liked.includes(post.id)?'#FF6B6B':'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'13px',fontWeight:'600'}}
              >
                {liked.includes(post.id) ? '❤️' : '🤍'} {post.likes + (liked.includes(post.id) ? 1 : 0)}
              </button>
              <button style={{display:'flex',alignItems:'center',gap:'5px',padding:'6px 12px',borderRadius:'8px',background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'13px',fontWeight:'600'}}>
                💬 {post.comments}
              </button>
              <button style={{display:'flex',alignItems:'center',gap:'5px',padding:'6px 12px',borderRadius:'8px',background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'13px',fontWeight:'600'}}>
                ↗ Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}