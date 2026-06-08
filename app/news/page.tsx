'use client'
import { useState, useEffect } from 'react'

const NEWS = [
  {id:1,icon:'🎌',category:'Visa',title:'Japan Expands SSW Visa to New Industries in 2025',date:'May 15, 2025',source:'Japan Immigration',urgent:true,desc:'Japan has announced expansion of the Specified Skilled Worker visa program to include 4 new industries. This opens new opportunities for workers from Bangladesh and Nepal.',tags:['SSW','Visa','2025'],link:'https://www.moj.go.jp'},
  {id:2,icon:'🏫',category:'Education',title:'MEXT Scholarship Applications Open for 2026',date:'May 12, 2025',source:'MEXT Japan',urgent:true,desc:'The Japanese Government MEXT scholarship for 2026 is now accepting applications. Deadline is June 30, 2025. Full scholarship covering tuition and living expenses.',tags:['MEXT','Scholarship','2026'],link:'https://www.mext.go.jp'},
  {id:3,icon:'💴',category:'Finance',title:'Japan Raises Minimum Wage to 1,500 Yen per Hour',date:'May 10, 2025',source:'Ministry of Labor',urgent:false,desc:'Japan has announced a new national minimum wage of 1,500 Yen per hour effective October 2025. This affects all workers including international students.',tags:['Minimum Wage','Work','2025'],link:''},
  {id:4,icon:'🛂',category:'Visa',title:'New Fast-Track Visa Processing for Language School Students',date:'May 8, 2025',source:'Immigration Bureau',urgent:false,desc:'Japan Immigration Bureau announces new 3-week fast-track COE processing for accredited language school applicants starting July 2025.',tags:['Visa','COE','Language School'],link:''},
  {id:5,icon:'🌸',category:'Community',title:'Bangladesh-Japan Student Exchange Program Launched',date:'May 5, 2025',source:'Bangladesh Embassy Tokyo',urgent:false,desc:'A new student exchange program between Bangladesh and Japan has been launched, offering 500 scholarships for Bangladeshi students to study in Japan.',tags:['Bangladesh','Scholarship','Exchange'],link:''},
  {id:6,icon:'🇳🇵',category:'Community',title:'Nepal Government Signs New Education Agreement with Japan',date:'May 3, 2025',source:'Nepal Ministry of Education',urgent:false,desc:'Nepal and Japan have signed a new education cooperation agreement making it easier for Nepali students to get Japanese student visas and scholarships.',tags:['Nepal','Education','Agreement'],link:''},
  {id:7,icon:'🏠',category:'Life',title:'Japan Introduces New Housing Support for International Students',date:'April 30, 2025',source:'Ministry of Land',urgent:false,desc:'New government program provides housing guarantor services for international students who have difficulty finding apartments in Japan.',tags:['Housing','International Students','Support'],link:''},
  {id:8,icon:'💻',category:'Technology',title:'Japan Opens 10,000 New IT Visas for Engineers',date:'April 28, 2025',source:'METI Japan',urgent:false,desc:'Japan announces a new program to attract 10,000 IT engineers from South and Southeast Asia with expedited visa processing and salary incentives.',tags:['IT','Engineer Visa','2025'],link:''},
  {id:9,icon:'🎓',category:'Education',title:'JLPT Registration Now Open for December 2025',date:'April 25, 2025',source:'JLPT Official',urgent:true,desc:'Registration for the December 2025 Japanese Language Proficiency Test is now open. Register early as spots fill up quickly in Bangladesh and Nepal.',tags:['JLPT','Language Test','December'],link:'https://www.jlpt.jp'},
  {id:10,icon:'✈️',category:'Travel',title:'New Direct Flights Between Dhaka and Tokyo',date:'April 22, 2025',source:'Biman Bangladesh',urgent:false,desc:'Biman Bangladesh Airlines announces new direct flights between Dhaka and Tokyo starting September 2025, reducing travel time and costs.',tags:['Bangladesh','Tokyo','Flight'],link:''},
  {id:11,icon:'🏭',category:'Work',title:'SSW Visa Holders Can Now Change Employers Freely',date:'April 20, 2025',source:'Immigration Bureau',urgent:false,desc:'New rules allow SSW visa holders to change employers within the same industry without reapplying for a new visa. Effective June 2025.',tags:['SSW','Work','Employer Change'],link:''},
  {id:12,icon:'📱',category:'Technology',title:'Japan Launches New My Number Card for Foreign Residents',date:'April 18, 2025',source:'Digital Agency Japan',urgent:false,desc:'Japan introduces enhanced My Number card for foreign residents with new digital features for banking, healthcare, and government services access.',tags:['My Number','Digital','Foreign Residents'],link:''},
]

export default function NewsPage() {
  const [category, setCategory] = useState('All')
  const [urgentOnly, setUrgentOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [savedNews, setSavedNews] = useState<number[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const categories = ['All', 'Visa', 'Education', 'Finance', 'Community', 'Life', 'Technology', 'Work', 'Travel']

  const filtered = NEWS.filter(n => {
    const matchCategory = category === 'All' || n.category === category
    const matchUrgent = !urgentOnly || n.urgent
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.desc.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchUrgent && matchSearch
  })

  function toggleSave(id: number) {
    setSavedNews(prev => prev.includes(id) ? prev.filter(n=>n!==id) : [...prev, id])
  }

  const urgentCount = NEWS.filter(n=>n.urgent).length

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'12px',marginBottom:'16px'}}>
          <div>
            <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Japan Study News</h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Latest updates for Bangladesh and Nepal students</p>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'4px'}}>{currentTime.toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</div>
            {urgentCount > 0 && (
              <div style={{background:'rgba(196,32,32,0.2)',border:'1px solid rgba(196,32,32,0.4)',borderRadius:'8px',padding:'6px 12px',display:'inline-flex',alignItems:'center',gap:'6px'}}>
                <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C42020'}}/>
                <span style={{color:'#FF8070',fontSize:'12px',fontWeight:'700'}}>{urgentCount} Urgent Updates</span>
              </div>
            )}
          </div>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search news..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
      </div>

      <div style={{background:'#141E35',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'8px',flexWrap:'wrap',alignItems:'center'}}>
        <div style={{display:'flex',gap:'6px',flexWrap:'wrap',flex:1}}>
          {categories.map(c=>(
            <button key={c} onClick={()=>setCategory(c)} style={{background:category===c?'#C42020':'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'20px',padding:'6px 14px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={()=>setUrgentOnly(!urgentOnly)} style={{background:urgentOnly?'rgba(196,32,32,0.2)':'rgba(255,255,255,0.08)',color:urgentOnly?'#FF8070':'rgba(255,255,255,0.6)',border:'1px solid ' + (urgentOnly?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'6px 14px',fontSize:'12px',cursor:'pointer',fontWeight:'600',flexShrink:0}}>
          Urgent Only
        </button>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px',display:'flex',flexDirection:'column',gap:'14px'}}>
        <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px'}}>{filtered.length} articles found</p>
        {filtered.map(news=>(
          <div key={news.id} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid ' + (news.urgent?'rgba(196,32,32,0.3)':'rgba(255,255,255,0.08)')}}>
            <div style={{display:'flex',gap:'16px',alignItems:'flex-start'}}>
              <div style={{fontSize:'36px',flexShrink:0}}>{news.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'8px',flexWrap:'wrap'}}>
                  {news.urgent && <span style={{background:'#C42020',color:'white',padding:'2px 8px',borderRadius:'4px',fontSize:'10px',fontWeight:'700'}}>URGENT</span>}
                  <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{news.category}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{news.date}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>· {news.source}</span>
                </div>
                <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>{news.title}</h2>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.7',marginBottom:'12px'}}>{news.desc}</p>
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'12px'}}>
                  {news.tags.map(tag=>(
                    <span key={tag} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)',padding:'3px 8px',borderRadius:'4px',fontSize:'11px'}}>#{tag}</span>
                  ))}
                </div>
                <div style={{display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}}>
                  {news.link && (
                    <a href={news.link} target="_blank" rel="noopener noreferrer" style={{color:'#4A8EFF',fontSize:'12px',textDecoration:'none',fontWeight:'600'}}>
                      Read Official Source →
                    </a>
                  )}
                  <a href="/chat" style={{color:'#C42020',fontSize:'12px',textDecoration:'none'}}>Ask Sakura AI →</a>
                  <button onClick={()=>toggleSave(news.id)} style={{background:'none',border:'none',cursor:'pointer',color:savedNews.includes(news.id)?'#F0A830':'rgba(255,255,255,0.3)',fontSize:'12px',marginLeft:'auto'}}>
                    {savedNews.includes(news.id)?'★ Saved':'☆ Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'48px'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>📰</div>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>No news found for your search</p>
          </div>
        )}
      </div>
    </main>
  )
}