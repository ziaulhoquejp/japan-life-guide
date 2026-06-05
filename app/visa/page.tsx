'use client'
import { useState } from 'react'

const VISA_TYPES = [
  {
    id:1,
    icon:'🎓',
    name:'Student Visa',
    jp:'留学ビザ',
    color:'#4A8EFF',
    duration:'Up to 2 years (renewable)',
    work:'28 hours/week',
    difficulty:'Medium',
    popular:true,
    desc:'The most common visa for language school students. Allows you to study Japanese and work part-time.',
    requirements:[
      'Acceptance letter from Japanese language school',
      'Certificate of Eligibility (COE) from school',
      'Valid passport (1+ year validity)',
      'Bank statement showing 2,000,000+ Yen',
      'Academic certificates',
      'Medical certificate',
      'Passport photos',
      'Visa application form',
    ],
    steps:[
      {step:1,title:'Choose & Apply to School',desc:'Research schools on Japan Life Guide and submit application. Takes 2-4 weeks.',time:'2-4 weeks'},
      {step:2,title:'Receive Acceptance Letter',desc:'School sends acceptance letter after reviewing your application.',time:'2-4 weeks'},
      {step:3,title:'School Applies for COE',desc:'School submits COE application to Japanese Immigration on your behalf.',time:'4-8 weeks'},
      {step:4,title:'Receive COE',desc:'COE arrives by mail or email. This is your key document for visa.',time:'1-2 weeks'},
      {step:5,title:'Apply at Japanese Embassy',desc:'Submit visa application with COE at Japanese Embassy in your country.',time:'1-2 weeks'},
      {step:6,title:'Receive Visa & Book Flight',desc:'Passport returned with visa sticker. Book your flight to Japan!',time:'1-2 weeks'},
    ],
    tips:[
      'Start the process at least 6 months before your intended start date',
      'Bank statement must show funds for at least 3-6 months before application',
      'Your school will guide you through most of the process',
      'You can work up to 28 hours per week (40 hours during school holidays)',
      'Apply for work permit at immigration office after arriving in Japan',
    ]
  },
  {
    id:2,
    icon:'🏭',
    name:'SSW Visa (Type 1)',
    jp:'特定技能1号',
    color:'#2EC87A',
    duration:'Up to 5 years total',
    work:'Full-time',
    difficulty:'Medium',
    popular:true,
    desc:'Specified Skilled Worker visa for 14 designated industries. Full-time work in Japan without a degree.',
    requirements:[
      'SSW Skills Test certificate in chosen industry',
      'JLPT N4 or higher (or JFT-Basic)',
      'Employment contract with registered SSW employer',
      'Valid passport',
      'Health certificate',
      'No criminal record',
    ],
    steps:[
      {step:1,title:'Choose Your Industry',desc:'Select from 14 industries: factory, food service, nursing, construction, etc.',time:'Research'},
      {step:2,title:'Pass Skills Test',desc:'Take the industry-specific skills test. Available in Bangladesh and Nepal.',time:'Preparation'},
      {step:3,title:'Pass JLPT N4',desc:'Pass Japanese Language Proficiency Test N4 level or higher.',time:'6-12 months'},
      {step:4,title:'Find SSW Employer',desc:'Find a registered SSW employer in Japan. Use job agencies or online platforms.',time:'1-3 months'},
      {step:5,title:'Apply for Visa',desc:'Employer sponsors your visa application at Japanese Immigration.',time:'2-3 months'},
      {step:6,title:'Arrive & Start Work',desc:'Arrive in Japan and begin your employment.',time:'Start date'},
    ],
    tips:[
      'SSW Type 1 does NOT allow bringing family to Japan',
      'Can change employers within the same industry',
      'Maximum 5 years total on SSW Type 1',
      'Some industries allow upgrading to SSW Type 2 (can bring family)',
      'Prepare for skills test by studying industry-specific vocabulary',
    ]
  },
  {
    id:3,
    icon:'💻',
    name:'Engineer Visa',
    jp:'技術・人文知識・国際業務',
    color:'#F0A830',
    duration:'1-5 years (renewable)',
    work:'Full-time in specialty',
    difficulty:'High',
    popular:false,
    desc:'For IT engineers, business professionals, and specialists. Requires university degree or 10 years experience.',
    requirements:[
      'Job offer from Japanese company',
      'University degree in related field (or 10 years experience)',
      'Valid passport',
      'Company registration documents',
      'Employment contract',
      'Degree certificate',
    ],
    steps:[
      {step:1,title:'Get University Degree',desc:'Degree in IT, engineering, business, or related field required.',time:'4 years'},
      {step:2,title:'Find Japanese Job',desc:'Apply to Japanese companies via LinkedIn, GaijinPot, or Japan job fairs.',time:'3-12 months'},
      {step:3,title:'Receive Job Offer',desc:'Company sends official job offer letter.',time:'1-2 months'},
      {step:4,title:'Company Applies for COE',desc:'Japanese company applies for your Certificate of Eligibility.',time:'1-3 months'},
      {step:5,title:'Apply for Visa',desc:'Apply at Japanese Embassy with COE and job offer.',time:'2-4 weeks'},
      {step:6,title:'Start Working in Japan',desc:'Arrive in Japan and begin your career!',time:'Start date'},
    ],
    tips:[
      'N2 or higher Japanese is strongly recommended',
      'IT skills are in very high demand in Japan',
      'Salary must meet minimum requirements set by company',
      'Can renew visa indefinitely if employed',
      'Path to Permanent Residency after 10 years',
    ]
  },
  {
    id:4,
    icon:'✈️',
    name:'Tourist Visa',
    jp:'短期滞在ビザ',
    color:'#A855F7',
    duration:'15, 30, or 90 days',
    work:'No work allowed',
    difficulty:'Easy',
    popular:false,
    desc:'For tourism and short visits. Cannot work or study on this visa. Good for exploring Japan before deciding.',
    requirements:[
      'Valid passport',
      'Bank statement (funds for stay)',
      'Return flight ticket',
      'Hotel booking or invitation letter',
      'Travel itinerary',
      'Proof of employment or enrollment in home country',
    ],
    steps:[
      {step:1,title:'Prepare Documents',desc:'Gather all required documents including bank statement and flight tickets.',time:'1-2 weeks'},
      {step:2,title:'Apply at Embassy',desc:'Submit application at Japanese Embassy in your country.',time:'1-2 weeks'},
      {step:3,title:'Receive Visa',desc:'Passport returned with tourist visa sticker.',time:'3-7 days'},
      {step:4,title:'Travel to Japan',desc:'Enjoy your visit! Maximum stay is 90 days.',time:'Trip duration'},
    ],
    tips:[
      'Bangladesh and Nepal citizens need to apply at Japanese Embassy',
      'Cannot extend tourist visa inside Japan',
      'Cannot enroll in language school on tourist visa',
      'Good opportunity to visit schools before applying',
      'Show sufficient funds: at least 100,000 Yen per week',
    ]
  },
]

export default function VisaPage() {
  const [selected, setSelected] = useState<any>(VISA_TYPES[0])
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Japan Visa Guide</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'20px'}}>Complete visa information for Bangladesh and Nepal students</p>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/visa-calculator" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Visa Calculator</a>
          <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura AI</a>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))',gap:'12px',marginBottom:'28px'}}>
          {VISA_TYPES.map(visa=>(
            <div key={visa.id} onClick={()=>{setSelected(visa);setActiveSection('overview')}} style={{background:selected.id===visa.id?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (selected.id===visa.id?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'14px',padding:'18px',cursor:'pointer',transition:'all 0.2s'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                <span style={{fontSize:'32px'}}>{visa.icon}</span>
                {visa.popular && <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>POPULAR</span>}
              </div>
              <h2 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{visa.name}</h2>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'8px'}}>{visa.jp}</p>
              <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                <span style={{background:visa.color + '15',color:visa.color,padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'600'}}>{visa.duration}</span>
                <span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)',padding:'2px 8px',borderRadius:'20px',fontSize:'10px'}}>Work: {visa.work}</span>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'2px solid ' + selected.color + '40'}}>
              <div style={{display:'flex',gap:'16px',alignItems:'flex-start',marginBottom:'16px',flexWrap:'wrap'}}>
                <span style={{fontSize:'48px'}}>{selected.icon}</span>
                <div style={{flex:1}}>
                  <h2 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'4px'}}>{selected.name}</h2>
                  <p style={{color:selected.color,fontSize:'14px',marginBottom:'8px'}}>{selected.jp}</p>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.7'}}>{selected.desc}</p>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:'10px'}}>
                {[
                  {label:'Duration',value:selected.duration},
                  {label:'Work Rights',value:selected.work},
                  {label:'Difficulty',value:selected.difficulty},
                ].map(info=>(
                  <div key={info.label} style={{background:'#0D0907',borderRadius:'8px',padding:'10px',textAlign:'center'}}>
                    <div style={{color:selected.color,fontSize:'13px',fontWeight:'700'}}>{info.value}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',marginTop:'2px'}}>{info.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
              {['overview','steps','requirements','tips'].map(section=>(
                <button key={section} onClick={()=>setActiveSection(section)} style={{background:activeSection===section?selected.color:'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
                  {section}
                </button>
              ))}
            </div>

            {activeSection === 'overview' && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Quick Overview</h3>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                  {[
                    {label:'Best For',value:selected.id===1?'Language school students':selected.id===2?'Factory/food/care workers':selected.id===3?'IT/business professionals':'Short-term visitors'},
                    {label:'Min Japanese',value:selected.id===1?'None required':selected.id===2?'JLPT N4':selected.id===3?'N2 recommended':'None required'},
                    {label:'Degree Required',value:selected.id===3?'Yes (or 10 yrs exp)':'No'},
                    {label:'Family Allowed',value:selected.id===2?'No (Type 1)':selected.id===4?'N/A':'Dependent visa'},
                    {label:'Path to PR',value:selected.id===4?'No':'Yes (10 years)'},
                    {label:'Processing Time',value:selected.id===1?'3-6 months':selected.id===2?'4-8 months':selected.id===3?'2-4 months':'2-4 weeks'},
                  ].map(item=>(
                    <div key={item.label} style={{background:'#0D0907',borderRadius:'8px',padding:'12px'}}>
                      <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>{item.label}</div>
                      <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'steps' && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'20px'}}>Step by Step Process</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  {selected.steps.map((step:any)=>(
                    <div key={step.step} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                      <div style={{width:'32px',height:'32px',borderRadius:'50%',background:selected.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'13px',fontWeight:'700',flexShrink:0}}>{step.step}</div>
                      <div style={{flex:1,background:'#0D0907',borderRadius:'10px',padding:'14px'}}>
                        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px',flexWrap:'wrap',gap:'8px'}}>
                          <h4 style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{step.title}</h4>
                          <span style={{background:selected.color + '20',color:selected.color,padding:'2px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>{step.time}</span>
                        </div>
                        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'requirements' && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Required Documents</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {selected.requirements.map((req:string,i:number)=>(
                    <div key={i} style={{display:'flex',gap:'12px',alignItems:'center',padding:'12px',background:'#0D0907',borderRadius:'8px'}}>
                      <div style={{width:'24px',height:'24px',borderRadius:'50%',background:selected.color + '20',color:selected.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',flexShrink:0}}>{i+1}</div>
                      <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'tips' && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Important Tips</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {selected.tips.map((tip:string,i:number)=>(
                    <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',padding:'12px',background:'#0D0907',borderRadius:'8px'}}>
                      <span style={{color:selected.color,fontSize:'16px',flexShrink:0}}>✓</span>
                      <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.6'}}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{display:'flex',gap:'10px',marginTop:'20px',flexWrap:'wrap'}}>
              <a href="/visa-calculator" style={{background:selected.color,color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',flex:1,textAlign:'center'}}>
                Check Visa Eligibility
              </a>
              <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)',flex:1,textAlign:'center'}}>
                Ask Sakura AI
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}