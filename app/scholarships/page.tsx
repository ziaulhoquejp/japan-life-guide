'use client'
import { useState } from 'react'

const SCHOLARSHIPS = [
  {
    id:1,
    icon:'🏛',
    name:'MEXT Scholarship',
    jp:'文部科学省奨学金',
    type:'Government',
    amount:'¥117,000/month + tuition waived',
    deadline:'June 2025 (varies by country)',
    difficulty:'Very High',
    color:'#F0A830',
    popular:true,
    desc:'The most prestigious Japanese government scholarship. Full funding including tuition, living expenses, and return airfare. Highly competitive.',
    eligibility:[
      'Under 35 years old at time of application',
      'Bachelor degree or equivalent',
      'Strong academic record',
      'Apply through Japanese Embassy in your country',
      'JLPT N2 or higher recommended',
    ],
    benefits:[
      'Monthly stipend ¥117,000',
      'Full tuition waived',
      'Return airfare covered',
      'Arrival allowance ¥25,000',
      'Housing support',
    ],
    howToApply:'Apply at the Japanese Embassy in Bangladesh or Nepal. Check embassy website for annual deadlines (usually April-June).',
    url:'https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm',
  },
  {
    id:2,
    icon:'🎓',
    name:'JASSO Scholarship',
    jp:'日本学生支援機構',
    type:'Semi-Government',
    amount:'¥48,000/month',
    deadline:'Apply through your school',
    difficulty:'Medium',
    color:'#4A8EFF',
    popular:true,
    desc:'Japan Student Services Organization scholarship available to enrolled students. Apply through your language school or university.',
    eligibility:[
      'Enrolled in accredited Japanese institution',
      'Strong academic performance',
      'Financial need',
      'Good Japanese language ability',
      'Recommendation from school',
    ],
    benefits:[
      'Monthly stipend ¥48,000',
      'No repayment required',
      'Available for language school students',
      'Renewable each year',
    ],
    howToApply:'Apply through your Japanese language school. Ask your school\'s student support office for application details.',
    url:'https://www.jasso.or.jp/en/',
  },
  {
    id:3,
    icon:'🌸',
    name:'JLPT Scholarship',
    jp:'日本語能力試験奨学金',
    type:'Private',
    amount:'¥30,000-100,000 (one-time)',
    deadline:'Varies',
    difficulty:'Low-Medium',
    color:'#2EC87A',
    popular:false,
    desc:'Various scholarships available for students who pass JLPT exams. N3 or higher usually required.',
    eligibility:[
      'JLPT N3 or higher certificate',
      'Enrolled in Japanese institution',
      'Good academic record',
    ],
    benefits:[
      'One-time payment',
      'Recognition of Japanese ability',
      'No repayment required',
    ],
    howToApply:'Search for JLPT-related scholarships through your school or JASSO scholarship database.',
    url:'https://www.jasso.or.jp/en/',
  },
  {
    id:4,
    icon:'🏢',
    name:'Private Foundation Scholarships',
    jp:'民間財団奨学金',
    type:'Private',
    amount:'¥30,000-150,000/month',
    deadline:'Varies by foundation',
    difficulty:'High',
    color:'#A855F7',
    popular:false,
    desc:'Many private Japanese companies and foundations offer scholarships to international students. Highly competitive but generous amounts.',
    eligibility:[
      'Varies by foundation',
      'Usually requires good Japanese (N2+)',
      'Strong academic record',
      'Community involvement',
      'Essay and interview required',
    ],
    benefits:[
      'Monthly stipend',
      'Networking opportunities',
      'Career support',
      'Cultural exchange programs',
    ],
    howToApply:'Search the JASSO scholarship database or ask your school for available private foundation scholarships.',
    url:'https://www.jasso.or.jp/en/',
  },
  {
    id:5,
    icon:'🇧🇩',
    name:'Bangladesh Government Scholarship',
    jp:'バングラデシュ政府奨学金',
    type:'Government',
    amount:'Varies',
    deadline:'Check BOESL website',
    difficulty:'Medium',
    color:'#2EC87A',
    popular:false,
    desc:'Bangladesh government scholarships for studying abroad including Japan. Check BOESL (Bureau of Manpower) for current opportunities.',
    eligibility:[
      'Bangladeshi citizen',
      'Strong academic record',
      'Age requirements vary',
      'Bangladesh Embassy approval',
    ],
    benefits:[
      'Government support',
      'Tuition assistance',
      'Living allowance',
    ],
    howToApply:'Check the Bangladesh Embassy in Tokyo or BOESL website for current scholarship opportunities for Japan.',
    url:'https://www.boesl.gov.bd',
  },
  {
    id:6,
    icon:'🇳🇵',
    name:'Nepal Government Scholarship',
    jp:'ネパール政府奨学金',
    type:'Government',
    amount:'Varies',
    deadline:'Check Nepal Embassy',
    difficulty:'Medium',
    color:'#C42020',
    popular:false,
    desc:'Nepal government scholarships for studying in Japan. Contact Nepal Embassy in Tokyo or Ministry of Education Nepal.',
    eligibility:[
      'Nepali citizen',
      'Strong academic record',
      'Ministry of Education approval',
    ],
    benefits:[
      'Government backing',
      'Tuition support',
      'Living allowance',
    ],
    howToApply:'Contact Nepal Embassy in Tokyo or Ministry of Education Nepal for current scholarship opportunities.',
    url:'https://jp.nepalembassy.gov.np',
  },
  {
    id:7,
    icon:'🏫',
    name:'School Direct Scholarships',
    jp:'学校独自奨学金',
    type:'School',
    amount:'10-50% tuition reduction',
    deadline:'At time of application',
    difficulty:'Low-Medium',
    color:'#FF8070',
    popular:true,
    desc:'Many Japanese language schools offer their own scholarships or tuition reductions for excellent students.',
    eligibility:[
      'High JLPT score',
      'Excellent academic record',
      'Financial need',
      'Early application',
    ],
    benefits:[
      'Tuition reduction 10-50%',
      'No separate application',
      'Apply when enrolling',
    ],
    howToApply:'Ask your chosen school directly about scholarship opportunities when you apply. Many schools offer early-bird discounts.',
    url:'https://japanlifeguide.app/schools',
  },
  {
    id:8,
    icon:'🌏',
    name:'JICA Scholarship',
    jp:'JICA奨学金',
    type:'Government',
    amount:'Full funding',
    deadline:'Varies by program',
    difficulty:'Very High',
    color:'#4A8EFF',
    popular:false,
    desc:'Japan International Cooperation Agency scholarships for students from developing countries including Bangladesh and Nepal.',
    eligibility:[
      'From developing country',
      'Related to development work',
      'Under 40 years old',
      'Government nomination required',
    ],
    benefits:[
      'Full tuition',
      'Monthly stipend',
      'Airfare covered',
      'Research support',
    ],
    howToApply:'Apply through JICA office in Bangladesh or Nepal. Usually requires government nomination.',
    url:'https://www.jica.go.jp/english/',
  },
]

export default function ScholarshipsPage() {
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const types = ['All', 'Government', 'Semi-Government', 'Private', 'School']

  const filtered = SCHOLARSHIPS.filter(s => {
    const matchFilter = filter === 'All' || s.type === filter
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const difficultyColor: any = {
    'Low': '#2EC87A',
    'Low-Medium': '#2EC87A',
    'Medium': '#F0A830',
    'High': '#FF8070',
    'Very High': '#C42020',
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Scholarships for Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'16px'}}>Find scholarships for Bangladesh and Nepal students studying in Japan</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search scholarships..." style={{width:'100%',maxWidth:'400px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
          {types.map(t=>(
            <button key={t} onClick={()=>setFilter(t)} style={{background:filter===t?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {t}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'16px'}}>
          {filtered.map(scholarship=>(
            <div key={scholarship.id} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid ' + (selected?.id===scholarship.id?scholarship.color:'rgba(255,255,255,0.08)'),cursor:'pointer'}}
              onClick={()=>setSelected(selected?.id===scholarship.id?null:scholarship)}
              onMouseEnter={e=>(e.currentTarget.style.borderColor=scholarship.color+'80')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor=selected?.id===scholarship.id?scholarship.color:'rgba(255,255,255,0.08)')}>
              <div style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'12px'}}>
                <span style={{fontSize:'32px'}}>{scholarship.icon}</span>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'4px'}}>
                    <h2 style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{scholarship.name}</h2>
                    {scholarship.popular && <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'2px 6px',borderRadius:'4px',fontSize:'10px',fontWeight:'700',flexShrink:0}}>POPULAR</span>}
                  </div>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'6px'}}>{scholarship.jp}</p>
                  <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                    <span style={{background:scholarship.color+'20',color:scholarship.color,padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>{scholarship.type}</span>
                    <span style={{background:difficultyColor[scholarship.difficulty]+'20',color:difficultyColor[scholarship.difficulty],padding:'2px 8px',borderRadius:'20px',fontSize:'10px'}}>{scholarship.difficulty}</span>
                  </div>
                </div>
              </div>

              <div style={{background:'#0D0907',borderRadius:'8px',padding:'10px',marginBottom:'10px'}}>
                <div style={{color:scholarship.color,fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{scholarship.amount}</div>
                <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Deadline: {scholarship.deadline}</div>
              </div>

              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6',marginBottom:'10px'}}>{scholarship.desc}</p>

              {selected?.id === scholarship.id && (
                <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'16px',marginTop:'4px'}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'14px'}}>
                    <div>
                      <h4 style={{color:'#2EC87A',fontSize:'12px',fontWeight:'700',marginBottom:'8px'}}>✓ Benefits</h4>
                      {scholarship.benefits.map((b:string,i:number)=>(
                        <div key={i} style={{display:'flex',gap:'6px',color:'rgba(255,255,255,0.6)',fontSize:'11px',marginBottom:'4px'}}>
                          <span style={{color:'#2EC87A',flexShrink:0}}>✓</span>{b}
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 style={{color:'#4A8EFF',fontSize:'12px',fontWeight:'700',marginBottom:'8px'}}>📋 Eligibility</h4>
                      {scholarship.eligibility.slice(0,4).map((e:string,i:number)=>(
                        <div key={i} style={{display:'flex',gap:'6px',color:'rgba(255,255,255,0.6)',fontSize:'11px',marginBottom:'4px'}}>
                          <span style={{color:'#4A8EFF',flexShrink:0}}>→</span>{e}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'8px',padding:'12px',marginBottom:'12px'}}>
                    <p style={{color:'#F0A830',fontSize:'11px',fontWeight:'700',marginBottom:'4px'}}>📝 How to Apply</p>
                    <p style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',lineHeight:'1.6'}}>{scholarship.howToApply}</p>
                  </div>

                  <a href={scholarship.url} target="_blank" rel="noopener noreferrer" style={{background:scholarship.color,color:'white',textDecoration:'none',padding:'10px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'block',textAlign:'center'}}>
                    Apply Now →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need help finding the right scholarship?</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/schools" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Browse Schools</a>
          </div>
        </div>
      </div>
    </main>
  )
}