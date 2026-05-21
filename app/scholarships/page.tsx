'use client'
import { useState } from 'react'

const SCHOLARSHIPS = [
  {id:1,icon:'🎌',name:'MEXT Scholarship',org:'Japanese Government',amount:'147,000 - 153,000',currency:'Yen/month',deadline:'May 2025',type:'Full',country:'All',level:'Undergraduate & Graduate',desc:'The most prestigious Japanese government scholarship. Covers tuition, living expenses, and round-trip airfare.',tags:['Full Scholarship','Government','Prestigious'],link:'https://www.mext.go.jp'},
  {id:2,icon:'🌸',name:'JASSO Scholarship',org:'Japan Student Services Organization',amount:'48,000',currency:'Yen/month',deadline:'April 2025',type:'Partial',country:'All',level:'Language School',desc:'Available for international students at Japanese language schools. Application through your school.',tags:['Language School','JASSO','Monthly'],link:''},
  {id:3,icon:'🏫',name:'School-based Scholarship',org:'Various Language Schools',amount:'10 - 50',currency:'% tuition reduction',deadline:'Varies',type:'Partial',country:'All',level:'Language School',desc:'Many language schools offer their own scholarships. Check with each school directly.',tags:['School Scholarship','Tuition Reduction','Various'],link:''},
  {id:4,icon:'🇧🇩',name:'Bangladesh Government Scholarship',org:'Ministry of Education Bangladesh',amount:'Full',currency:'coverage',deadline:'March 2025',type:'Full',country:'Bangladesh',level:'Graduate',desc:'Bangladesh government scholarship for studying in Japan. Contact Ministry of Education for details.',tags:['Bangladesh','Government','Full'],link:''},
  {id:5,icon:'🇳🇵',name:'Nepal Government Scholarship',org:'Ministry of Education Nepal',amount:'Full',currency:'coverage',deadline:'February 2025',type:'Full',country:'Nepal',level:'Graduate',desc:'Nepal government scholarship for studying abroad including Japan. Limited seats available.',tags:['Nepal','Government','Limited'],link:''},
  {id:6,icon:'🏢',name:'Rotary Foundation Scholarship',org:'Rotary International',amount:'30,000',currency:'USD',deadline:'November 2025',type:'Full',country:'All',level:'Graduate',desc:'Prestigious international scholarship for graduate studies. Strong community service focus required.',tags:['International','Prestigious','Graduate'],link:''},
  {id:7,icon:'🌍',name:'ADB-Japan Scholarship',org:'Asian Development Bank',amount:'Full',currency:'coverage',deadline:'August 2025',type:'Full',country:'Asia',level:'Graduate',desc:'For citizens of ADB developing member countries including Bangladesh and Nepal.',tags:['ADB','Asia','Full'],link:''},
  {id:8,icon:'🎓',name:'University Scholarship',org:'Various Japanese Universities',amount:'Varies',currency:'',deadline:'Varies',type:'Partial',country:'All',level:'Undergraduate & Graduate',desc:'Many Japanese universities offer scholarships to international students. Apply directly.',tags:['University','Various','Direct Apply'],link:''},
]

export default function ScholarshipsPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [country, setCountry] = useState('All')

  const filtered = SCHOLARSHIPS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.org.toLowerCase().includes(search.toLowerCase())
    const matchType = type === 'All' || s.type === type
    const matchCountry = country === 'All' || s.country === country || s.country === 'All'
    return matchSearch && matchType && matchCountry
  })

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Scholarships</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>{filtered.length} scholarships available</p>
      </div>

      <div style={{background:'#141E35',padding:'16px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search scholarships..." style={{flex:1,minWidth:'200px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
        <select value={type} onChange={e=>setType(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
          <option value="All">All Types</option>
          <option value="Full">Full Scholarship</option>
          <option value="Partial">Partial Scholarship</option>
        </select>
        <select value={country} onChange={e=>setCountry(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
          <option value="All">All Countries</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Nepal">Nepal</option>
        </select>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px',display:'flex',flexDirection:'column',gap:'14px'}}>
        {filtered.map(s=>(
          <div key={s.id} style={{background:'#1A2035',borderRadius:'14px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{display:'flex',gap:'16px',alignItems:'flex-start'}}>
              <div style={{fontSize:'40px',flexShrink:0}}>{s.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px',flexWrap:'wrap'}}>
                  <h2 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>{s.name}</h2>
                  <span style={{background:s.type==='Full'?'rgba(46,200,122,0.15)':'rgba(240,168,48,0.15)',color:s.type==='Full'?'#2EC87A':'#F0A830',padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{s.type}</span>
                </div>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'4px'}}>{s.org}</p>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'8px'}}>Level: {s.level}</p>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6',marginBottom:'12px'}}>{s.desc}</p>
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'12px'}}>
                  {s.tags.map(tag=>(
                    <span key={tag} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)',padding:'3px 8px',borderRadius:'4px',fontSize:'11px'}}>#{tag}</span>
                  ))}
                </div>
                <div style={{display:'flex',gap:'16px',alignItems:'center',flexWrap:'wrap'}}>
                  <span style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700'}}>{s.amount} {s.currency}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>Deadline: {s.deadline}</span>
                  <span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'4px 10px',borderRadius:'6px',fontSize:'11px'}}>{s.country === 'All' ? 'All Countries' : s.country}</span>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px',flexShrink:0}}>
                <button style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
                  Apply Now
                </button>
                <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',textDecoration:'none',textAlign:'center'}}>
                  Ask Sakura
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}