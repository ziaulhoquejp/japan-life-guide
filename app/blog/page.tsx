'use client'
import { useState } from 'react'

const POSTS = [
  {id:1,icon:'🛂',category:'Visa Guide',title:'Complete Student Visa Guide 2025',desc:'Everything you need to know about getting a Japanese student visa from Bangladesh and Nepal.',date:'May 10, 2025',readTime:'8 min read',tags:['Visa','Student','2025']},
  {id:2,icon:'🏫',category:'Schools',title:'Top 10 Japanese Language Schools in Tokyo',desc:'Our comprehensive review of the best language schools in Tokyo for international students.',date:'May 8, 2025',readTime:'6 min read',tags:['Tokyo','Schools','Review']},
  {id:3,icon:'💰',category:'Finance',title:'How Much Money Do You Need to Study in Japan?',desc:'Bank statements, living costs, part-time work — everything about finances for studying in Japan.',date:'May 5, 2025',readTime:'5 min read',tags:['Finance','Budget','Tips']},
  {id:4,icon:'🌸',category:'Life in Japan',title:'First Week in Japan: What to Do',desc:'City hall registration, bank account, SIM card, transport — your complete first week checklist.',date:'May 3, 2025',readTime:'7 min read',tags:['Life','Tokyo','Tips']},
  {id:5,icon:'💼',category:'Work',title:'Part-time Work Rules for Student Visa Holders',desc:'Working 28 hours per week, permitted jobs, how to get work permission — complete guide.',date:'Apr 30, 2025',readTime:'5 min read',tags:['Work','Visa','Rules']},
  {id:6,icon:'🎓',category:'Scholarship',title:'MEXT Scholarship Guide for Bangladesh Students',desc:'Step-by-step guide to applying for the Japanese government scholarship from Bangladesh.',date:'Apr 28, 2025',readTime:'10 min read',tags:['Scholarship','MEXT','Bangladesh']},
]

export default function BlogPage() {
  const [selected, setSelected] = useState('All')
  const categories = ['All', 'Visa Guide', 'Schools', 'Finance', 'Life in Japan', 'Work', 'Scholarship']
  const filtered = selected === 'All' ? POSTS : POSTS.filter(p => p.category === selected)

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Japan Life Guide Blog</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Tips, guides, and stories for your Japan journey</p>
      </div>

      <div style={{padding:'20px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'8px',flexWrap:'wrap',justifyContent:'center'}}>
        {categories.map(cat=>(
          <button key={cat} onClick={()=>setSelected(cat)} style={{background:selected===cat?'#C42020':'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'20px',padding:'8px 18px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'40px 20px',display:'flex',flexDirection:'column',gap:'16px'}}>
        {filtered.map(post=>(
          <div key={post.id} style={{background:'#1A2035',borderRadius:'14px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'20px',alignItems:'flex-start',cursor:'pointer',transition:'border-color 0.2s'}}
            onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
            onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
            <div style={{fontSize:'40px',flexShrink:0}}>{post.icon}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'8px',flexWrap:'wrap'}}>
                <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{post.category}</span>
                <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{post.date}</span>
                <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{post.readTime}</span>
              </div>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>{post.title}</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',lineHeight:'1.6',marginBottom:'12px'}}>{post.desc}</p>
              <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                {post.tags.map(tag=>(
                  <span key={tag} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)',padding:'3px 8px',borderRadius:'4px',fontSize:'11px'}}>#{tag}</span>
                ))}
              </div>
            </div>
            <div style={{color:'#C42020',fontSize:'20px',flexShrink:0}}>→</div>
          </div>
        ))}
      </div>
    </main>
  )
}