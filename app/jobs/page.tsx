'use client'
import { useState } from 'react'

const JOBS = [
  {id:1,icon:'🏭',title:'Factory Worker (SSW)',company:'Toyota Manufacturing',location:'Toyota, Aichi',salary:'200,000 - 250,000',type:'Full-time',visa:'SSW Visa',category:'Manufacturing',tags:['SSW','Factory','Aichi']},
  {id:2,icon:'🍽️',title:'Restaurant Staff',company:'Yoshinoya Chain',location:'Tokyo',salary:'150,000 - 180,000',type:'Part-time',visa:'Student Visa OK',category:'Food',tags:['Student OK','Tokyo','Food']},
  {id:3,icon:'🏥',title:'Care Worker (Kaigo)',company:'Sakura Care Home',location:'Osaka',salary:'220,000 - 280,000',type:'Full-time',visa:'SSW Visa',category:'Healthcare',tags:['SSW','Healthcare','Osaka']},
  {id:4,icon:'💻',title:'IT Engineer',company:'Rakuten Group',location:'Tokyo',salary:'350,000 - 500,000',type:'Full-time',visa:'Engineer Visa',category:'IT',tags:['IT','Tokyo','High Salary']},
  {id:5,icon:'🏗️',title:'Construction Worker',company:'Shimizu Corporation',location:'Yokohama',salary:'280,000 - 350,000',type:'Full-time',visa:'SSW Visa',category:'Construction',tags:['SSW','Construction','Yokohama']},
  {id:6,icon:'🛒',title:'Convenience Store Staff',company:'7-Eleven Japan',location:'Nationwide',salary:'120,000 - 150,000',type:'Part-time',visa:'Student Visa OK',category:'Retail',tags:['Student OK','Nationwide','Easy Apply']},
  {id:7,icon:'🌾',title:'Agricultural Worker',company:'Hokkaido Farm Co.',location:'Hokkaido',salary:'180,000 - 220,000',type:'Seasonal',visa:'SSW Visa',category:'Agriculture',tags:['SSW','Hokkaido','Seasonal']},
  {id:8,icon:'🚢',title:'Shipbuilding Worker',company:'Mitsubishi Shipbuilding',location:'Nagasaki',salary:'250,000 - 300,000',type:'Full-time',visa:'SSW Visa',category:'Manufacturing',tags:['SSW','Nagasaki','Manufacturing']},
  {id:9,icon:'🍜',title:'Kitchen Staff',company:'Ichiran Ramen',location:'Fukuoka',salary:'140,000 - 170,000',type:'Part-time',visa:'Student Visa OK',category:'Food',tags:['Student OK','Fukuoka','Food']},
  {id:10,icon:'🏨',title:'Hotel Staff',company:'APA Hotel Group',location:'Tokyo',salary:'200,000 - 240,000',type:'Full-time',visa:'Work Visa',category:'Hospitality',tags:['Hospitality','Tokyo','Hotel']},
  {id:11,icon:'🚗',title:'Taxi Driver',company:'Nihon Kotsu',location:'Tokyo',salary:'250,000 - 350,000',type:'Full-time',visa:'Work Visa',category:'Transport',tags:['Transport','Tokyo','Driver']},
  {id:12,icon:'📦',title:'Warehouse Worker',company:'Amazon Japan',location:'Chiba',salary:'160,000 - 200,000',type:'Part-time',visa:'Student Visa OK',category:'Logistics',tags:['Student OK','Chiba','Logistics']},
]

export default function JobsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [visaType, setVisaType] = useState('All')

  const categories = ['All', 'Manufacturing', 'Food', 'Healthcare', 'IT', 'Construction', 'Retail', 'Agriculture', 'Hospitality', 'Transport', 'Logistics']
  const visaTypes = ['All', 'SSW Visa', 'Student Visa OK', 'Engineer Visa', 'Work Visa']

  const filtered = JOBS.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.location.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || job.category === category
    const matchVisa = visaType === 'All' || job.visa === visaType
    return matchSearch && matchCategory && matchVisa
  })

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Jobs in Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>{filtered.length} jobs available</p>
      </div>

      <div style={{background:'#141E35',padding:'16px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search jobs, companies, locations..." style={{flex:1,minWidth:'200px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
        <select value={category} onChange={e=>setCategory(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
          {categories.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <select value={visaType} onChange={e=>setVisaType(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
          {visaTypes.map(v=><option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px',display:'flex',flexDirection:'column',gap:'14px'}}>
        {filtered.map(job=>(
          <div key={job.id} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'16px',alignItems:'flex-start'}}>
            <div style={{fontSize:'40px',flexShrink:0}}>{job.icon}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px',flexWrap:'wrap'}}>
                <h2 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>{job.title}</h2>
                <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{job.type}</span>
              </div>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'4px'}}>{job.company}</p>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'10px'}}>Location: {job.location}</p>
              <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'10px'}}>
                {job.tags.map(tag=>(
                  <span key={tag} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)',padding:'3px 8px',borderRadius:'4px',fontSize:'11px'}}>#{tag}</span>
                ))}
              </div>
              <div style={{display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}}>
                <span style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700'}}>Yen {job.salary}/month</span>
                <span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'4px 10px',borderRadius:'6px',fontSize:'11px',fontWeight:'600'}}>{job.visa}</span>
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
        ))}
      </div>
    </main>
  )
}