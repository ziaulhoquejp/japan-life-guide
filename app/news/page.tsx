'use client'
import { useState } from 'react'

const NEWS = [
  {id:1,icon:'🎌',category:'Visa',title:'Japan Expands SSW Visa to New Industries in 2025',date:'May 15, 2025',source:'Japan Immigration',urgent:true,desc:'Japan has announced expansion of the Specified Skilled Worker visa program to include 4 new industries. This opens new opportunities for workers from Bangladesh and Nepal.',tags:['SSW','Visa','2025']},
  {id:2,icon:'🏫',category:'Education',title:'MEXT Scholarship Applications Open for 2026',date:'May 12, 2025',source:'MEXT Japan',urgent:true,desc:'The Japanese Government (MEXT) scholarship for 2026 is now accepting applications. Deadline is June 30, 2025. Full scholarship covering tuition and living expenses.',tags:['MEXT','Scholarship','2026']},
  {id:3,icon:'💴',category:'Finance',title:'Japan Raises Minimum Wage to 1,500 Yen per Hour',date:'May 10, 2025',source:'Ministry of Labor',urgent:false,desc:'Japan has announced a new national minimum wage of 1,500 Yen per hour effective October 2025. This affects all workers including international students.',tags:['Minimum Wage','Work','2025']},
  {id:4,icon:'🛂',category:'Visa',title:'New Fast-Track Visa Processing for Language School Students',date:'May 8, 2025',source:'Immigration Bureau',urgent:false,desc:'Japan Immigration Bureau announces new 3-week fast-track COE processing for accredited language school applicants starting July 2025.',tags:['Visa','COE','Language School']},
  {id:5,icon:'🌸',category:'Community',title:'Bangladesh-Japan Student Exchange Program Launched',date:'May 5, 2025',source:'Bangladesh Embassy Tokyo',urgent:false,desc:'A new student exchange program between Bangladesh and Japan has been launched, offering 500 scholarships for Bangladeshi students to study in Japan.',tags:['Bangladesh','Scholarship','Exchange']},
  {id:6,icon:'🇳🇵',category:'Community',title:'Nepal Government Signs New Education Agreement with Japan',date:'May 3, 2025',source:'Nepal Ministry of Education',urgent:false,desc:'Nepal and Japan have signed a new education cooperation agreement making it easier for Nepali students to get Japanese student visas and scholarships.',tags:['Nepal','Education','Agreement']},
  {id:7,icon:'🏠',category:'Life',title:'Japan Introduces New Housing Support for International Students',date:'April 30, 2025',source:'Ministry of Land',urgent:false,desc:'New government program provides housing guarantor services for international students who have difficulty finding apartments in Japan.',tags:['Housing','International Students','Support']},
  {id:8,icon:'💻',category:'Technology',title:'Japan Opens 10,000 New IT Visas for Engineers',date:'April 28, 2025',source:'METI Japan',urgent:false,desc:'Japan announces a new program to attract 10,000 IT engineers from South and Southeast Asia with expedited visa processing and salary incentives.',tags:['IT','Engineer Visa','2025']},
  {id:9,icon:'🎓',category:'Education',title:'JLPT Registration Now Open for December 2025',date:'April 25, 2025',source:'JLPT Official',urgent:true,desc:'Registration for the December 2025 Japanese Language Proficiency Test (JLPT) is now open. Register early as spots fill up quickly in Bangladesh and Nepal.',tags:['JLPT','Language Test','December']},
  {id:10,icon:'✈️',category:'Travel',title:'New Direct Flights Between Dhaka and Tokyo',date:'April 22, 2025',source:'Biman Bangladesh',urgent:false,desc:'Biman Bangladesh Airlines announces new direct flights between Dhaka and Tokyo starting September 2025, reducing travel time and costs.',tags:['Bangladesh','Tokyo','Flight']},
  {id:11,icon:'🏭',category:'Work',title:'SSW Visa Holders Can Now Change Employers Freely',date:'April 20, 2025',source:'Immigration Bureau',urgent:false,desc:'New rules allow SSW visa holders to change employers within the same industry without reapplying for a new visa. Effective June 2025.',tags:['SSW','Work','Employer Change']},
  {id:12,icon:'📱',category:'Technology',title:'Japan Launches New My Number Card for Foreign Residents',date:'April 18, 2025',source:'Digital Agency Japan',urgent:false,desc:'Japan introduces enhanced My Number card for foreign residents with new digital features for banking, healthcare, and government services access.',tags:['My Number','Digital','Foreign Residents']},
]

export default function NewsPage() {
  const [category, setCategory] = useState('All')
  const [urgentOnly, setUrgentOnly] = useState(false)

  const categories = ['All', 'Visa', 'Education', 'Finance', 'Community', 'Life', 'Technology', 'Work', 'Travel']

  const filtered = NEWS.filter(n => {
    const matchCategory = category === 'All' || n.category === category
    const matchUrgent = !urgentOnly || n.urgent
    return matchCategory && matchUrgent
  })

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Japan Study News</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Latest updates for Bangladesh and Nepal students going to Japan</p>
      </div>

      <div style={{background:'#141E35',padding:'16px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',flex:1}}>
          {categories.map(c=>(
            <button key={c} onClick={()=>setCategory(c)} style={{background:category===c?'#C42020':'#0D0907',border:'1px solid ' + (category===c?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'20px',padding:'6px 14px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={()=>setUrgentOnly(!urgentOnly)} style={{background:urgentOnly?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (urgentOnly?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'8px 14px',color:urgentOnly?'#FF8070':'rgba(255,255,255,0.6)',fontSize:'12px',fontWeight:'600',cursor:'pointer',flexShrink:0}}>
          Urgent Only
        </button>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px',display:'flex',flexDirection:'column',gap:'14px'}}>
        {filtered.map(news=>(
          <div key={news.id} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid ' + (news.urgent?'rgba(196,32,32,0.3)':'rgba(255,255,255,0.08)')}}>
            <div style={{display:'flex',gap:'16px',alignItems:'flex-start'}}>
              <div style={{fontSize:'36px',flexShrink:0}}>{news.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'8px',flexWrap:'wrap'}}>
                  {news.urgent && (
                    <span style={{background:'#C42020',color:'white',padding:'2px 8px',borderRadius:'4px',fontSize:'10px',fontWeight:'700'}}>URGENT</span>
                  )}
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
                <a href="/chat" style={{color:'#C42020',fontSize:'12px',textDecoration:'none'}}>
                  Ask Sakura AI about this news →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}