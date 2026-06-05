'use client'
import { useState } from 'react'

const POSTS = [
  {id:1,icon:'🛂',category:'Visa Guide',title:'Complete Student Visa Guide 2025',desc:'Everything you need to know about getting a Japanese student visa from Bangladesh and Nepal. Step by step process, documents, and timeline.',date:'May 10, 2025',readTime:'8 min read',tags:['Visa','Student','2025'],featured:true},
  {id:2,icon:'🏫',category:'Schools',title:'Top 10 Japanese Language Schools in Tokyo',desc:'Our comprehensive review of the best language schools in Tokyo for international students. Fees, locations, and student reviews.',date:'May 8, 2025',readTime:'6 min read',tags:['Tokyo','Schools','Review'],featured:true},
  {id:3,icon:'💰',category:'Finance',title:'How Much Money Do You Need to Study in Japan?',desc:'Bank statements, living costs, part-time work — everything about finances for studying in Japan from Bangladesh and Nepal.',date:'May 5, 2025',readTime:'5 min read',tags:['Finance','Budget','Tips'],featured:false},
  {id:4,icon:'🌸',category:'Life in Japan',title:'First Week in Japan: Complete Checklist',desc:'City hall registration, bank account, SIM card, transport IC card — your complete first week in Japan checklist.',date:'May 3, 2025',readTime:'7 min read',tags:['Life','Tokyo','Tips'],featured:false},
  {id:5,icon:'💼',category:'Work',title:'Part-time Work Rules for Student Visa Holders',desc:'Working 28 hours per week, permitted jobs, how to get work permission — complete guide for international students.',date:'Apr 30, 2025',readTime:'5 min read',tags:['Work','Visa','Rules'],featured:false},
  {id:6,icon:'🎓',category:'Scholarship',title:'MEXT Scholarship Guide for Bangladesh Students',desc:'Step-by-step guide to applying for the Japanese government MEXT scholarship from Bangladesh. Deadlines and requirements.',date:'Apr 28, 2025',readTime:'10 min read',tags:['Scholarship','MEXT','Bangladesh'],featured:true},
  {id:7,icon:'🕌',category:'Muslim Life',title:'Muslim Life in Japan: Complete Guide',desc:'Halal food, mosques, prayer times, and tips for Muslim students living and studying in Japan.',date:'Apr 25, 2025',readTime:'6 min read',tags:['Halal','Muslim','Life'],featured:false},
  {id:8,icon:'🇳🇵',category:'Nepal',title:'SSW Visa Guide for Nepal Students',desc:'Complete guide to applying for the Specified Skilled Worker visa from Nepal. Skills tests, JLPT requirements, and job search.',date:'Apr 22, 2025',readTime:'8 min read',tags:['SSW','Nepal','Work'],featured:false},
  {id:9,icon:'🏠',category:'Housing',title:'Finding an Apartment in Japan as a Foreigner',desc:'Share houses, guest houses, UR housing — how to find accommodation in Japan without a Japanese guarantor.',date:'Apr 20, 2025',readTime:'6 min read',tags:['Housing','Apartment','Tips'],featured:false},
  {id:10,icon:'📱',category:'Life in Japan',title:'Essential Apps for Living in Japan',desc:'LINE, Google Maps, PayPay, Suica — the must-have apps for daily life in Japan as an international student.',date:'Apr 18, 2025',readTime:'4 min read',tags:['Apps','Life','Technology'],featured:false},
  {id:11,icon:'🎌',category:'Culture',title:'Japanese Culture Tips for Bangladesh & Nepal Students',desc:'Bowing, removing shoes, garbage sorting, train etiquette — essential cultural tips for new arrivals in Japan.',date:'Apr 15, 2025',readTime:'5 min read',tags:['Culture','Etiquette','Tips'],featured:false},
  {id:12,icon:'🏥',category:'Health',title:'Healthcare in Japan: National Health Insurance Guide',desc:'How to enroll in National Health Insurance, how to use it, and what it covers for international students.',date:'Apr 12, 2025',readTime:'5 min read',tags:['Health','Insurance','Guide'],featured:false},
  {id:13,icon:'✈️',category:'Travel',title:'Flying to Japan from Bangladesh: Best Airlines & Tips',desc:'Biman Bangladesh, JAL, ANA — best airlines, cheapest times to book, and what to bring on your flight to Japan.',date:'Apr 10, 2025',readTime:'4 min read',tags:['Flight','Bangladesh','Travel'],featured:false},
  {id:14,icon:'📝',category:'JLPT',title:'How to Pass JLPT N4 in 6 Months',desc:'Study plan, best resources, practice tests — a complete guide to passing JLPT N4 from zero Japanese knowledge.',date:'Apr 8, 2025',readTime:'7 min read',tags:['JLPT','Study','N4'],featured:true},
  {id:15,icon:'💴',category:'Finance',title:'Sending Money from Bangladesh to Japan',desc:'Best ways to transfer money from Bangladesh to Japan. Exchange rates, fees, and which services to use.',date:'Apr 5, 2025',readTime:'4 min read',tags:['Money','Transfer','Bangladesh'],featured:false},
]

export default function BlogPage() {
  const [selected, setSelected] = useState('All')
  const [search, setSearch] = useState('')
  const [showFeatured, setShowFeatured] = useState(false)

  const categories = ['All', 'Visa Guide', 'Schools', 'Finance', 'Life in Japan', 'Work', 'Scholarship', 'Muslim Life', 'Nepal', 'Housing', 'Culture', 'Health', 'Travel', 'JLPT']

  const filtered = POSTS.filter(p => {
    const matchCategory = selected === 'All' || p.category === selected
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
    const matchFeatured = !showFeatured || p.featured
    return matchCategory && matchSearch && matchFeatured
  })

  const featuredPosts = POSTS.filter(p => p.featured)

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Japan Life Guide Blog</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'20px'}}>Tips, guides, and stories for your Japan journey</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search articles..." style={{width:'100%',maxWidth:'500px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'10px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none'}}/>
      </div>

      {!search && selected === 'All' && !showFeatured && (
        <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px 0'}}>
          <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'16px'}}>Featured Articles</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'14px',marginBottom:'32px'}}>
            {featuredPosts.map(post=>(
              <div key={post.id} style={{background:'linear-gradient(135deg, #1A2035, #0D1520)',borderRadius:'14px',padding:'22px',border:'2px solid rgba(196,32,32,0.3)',cursor:'pointer'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='#C42020')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.3)')}>
                <div style={{fontSize:'36px',marginBottom:'12px'}}>{post.icon}</div>
                <span style={{background:'#C42020',color:'white',padding:'3px 8px',borderRadius:'4px',fontSize:'10px',fontWeight:'700',marginBottom:'8px',display:'inline-block'}}>FEATURED</span>
                <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'8px',lineHeight:'1.4'}}>{post.title}</h3>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6',marginBottom:'12px'}}>{post.desc}</p>
                <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{post.date}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>· {post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'0 20px 20px'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'16px',paddingTop:'20px',alignItems:'center'}}>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap',flex:1}}>
            {categories.map(cat=>(
              <button key={cat} onClick={()=>setSelected(cat)} style={{background:selected===cat?'#C42020':'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'20px',padding:'6px 14px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                {cat}
              </button>
            ))}
          </div>
          <button onClick={()=>setShowFeatured(!showFeatured)} style={{background:showFeatured?'rgba(196,32,32,0.2)':'rgba(255,255,255,0.08)',color:showFeatured?'#FF8070':'rgba(255,255,255,0.6)',border:'1px solid ' + (showFeatured?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'6px 14px',fontSize:'12px',cursor:'pointer',flexShrink:0}}>
            Featured Only
          </button>
        </div>

        <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',marginBottom:'16px'}}>{filtered.length} articles found</p>

        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          {filtered.map(post=>(
            <div key={post.id} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'18px',alignItems:'flex-start',cursor:'pointer'}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
              <div style={{fontSize:'40px',flexShrink:0}}>{post.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'8px',flexWrap:'wrap'}}>
                  {post.featured && <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'2px 6px',borderRadius:'4px',fontSize:'10px',fontWeight:'700'}}>FEATURED</span>}
                  <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{post.category}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{post.date}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>· {post.readTime}</span>
                </div>
                <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'8px',lineHeight:'1.4'}}>{post.title}</h2>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.7',marginBottom:'10px'}}>{post.desc}</p>
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

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginTop:'32px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h3 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>Want Personalized Advice?</h3>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'16px'}}>Ask Sakura AI any question about studying in Japan!</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}