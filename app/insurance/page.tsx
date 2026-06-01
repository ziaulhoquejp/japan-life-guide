'use client'
import { useState } from 'react'

const INSURANCE_TYPES = [
  {
    id:1,
    icon:'🏥',
    name:'National Health Insurance',
    jp:'国民健康保険',
    type:'Mandatory',
    cost:'2,000 - 5,000 Yen/month',
    coverage:'70% of medical costs',
    color:'#C42020',
    desc:'All foreign residents staying more than 3 months MUST enroll. Sign up at your city hall within 14 days of arrival.',
    covers:['Doctor visits','Hospital stays','Surgery','Prescriptions','Dental (basic)','Mental health visits'],
    doesNotCover:['100% of costs (you pay 30%)','Cosmetic procedures','Some dental treatments','Overseas medical costs'],
    howToGet:'Go to your city hall (Shiyakusho) with your passport and residence card. It is free to enroll.',
  },
  {
    id:2,
    icon:'🎒',
    name:'Student Accident Insurance',
    jp:'学生教育研究災害傷害保険',
    type:'Recommended',
    cost:'1,500 - 3,000 Yen/year',
    coverage:'Accidents at school and during commute',
    color:'#F0A830',
    desc:'Many language schools require this insurance. Covers accidents that happen during school activities and commuting.',
    covers:['Accidents at school','Injuries during club activities','Accidents while commuting to school','Basic liability'],
    doesNotCover:['Illness','Non-school related accidents','Dental injuries from illness'],
    howToGet:'Usually arranged through your language school. Ask your school office.',
  },
  {
    id:3,
    icon:'✈️',
    name:'Travel Insurance',
    jp:'海外旅行保険',
    type:'Recommended',
    cost:'3,000 - 10,000 Yen/month',
    coverage:'Comprehensive coverage for travel',
    color:'#4A8EFF',
    desc:'Get travel insurance from your home country BEFORE arriving in Japan. Covers the gap period before National Health Insurance starts.',
    covers:['Emergency medical evacuation','Trip cancellation','Lost luggage','Accident coverage','Illness while traveling'],
    doesNotCover:['Pre-existing conditions (usually)','Extreme sports','War zones'],
    howToGet:'Buy from your home country insurance company before departing. Bangladesh: Green Delta, Pragati. Nepal: Nepal Insurance.',
  },
  {
    id:4,
    icon:'🏠',
    name:'Renters Insurance',
    jp:'火災保険・家財保険',
    type:'Often Required',
    cost:'1,500 - 3,000 Yen/year',
    coverage:'Fire, water damage, theft',
    color:'#2EC87A',
    desc:'Most landlords require renters insurance when signing an apartment contract. Covers fire damage and theft.',
    covers:['Fire damage','Water damage from above','Theft','Natural disaster damage','Accidental damage to neighbors'],
    doesNotCover:['Your own valuables above limit','Earthquake damage (need separate)','Car accidents'],
    howToGet:'Usually arranged through your real estate agency when signing apartment contract. Some schools also arrange this.',
  },
  {
    id:5,
    icon:'🌋',
    name:'Earthquake Insurance',
    jp:'地震保険',
    type:'Optional but Recommended',
    cost:'2,000 - 5,000 Yen/year',
    coverage:'Earthquake damage to belongings',
    color:'#A855F7',
    desc:'Japan has frequent earthquakes. Standard renters insurance does NOT cover earthquake damage. Consider adding this.',
    covers:['Earthquake damage to belongings','Tsunami damage','Fire caused by earthquake','Landslide from earthquake'],
    doesNotCover:['The building structure (landlord responsibility)','Losses above policy limit'],
    howToGet:'Add to your renters insurance policy. Available through major insurance companies like Tokio Marine, Sompo Japan.',
  },
]

const TIPS = [
  {icon:'📋',title:'Enroll in Health Insurance First',desc:'Within 14 days of arriving in Japan, go to city hall and enroll in National Health Insurance. Bring your passport and residence card.'},
  {icon:'💊',title:'How to Use Health Insurance',desc:'Show your insurance card (Hoken-shou) at any clinic or hospital. You pay only 30% of costs. Always carry your card!'},
  {icon:'🦷',title:'Dental Care',desc:'Basic dental is covered by National Health Insurance. However, cosmetic dental work is not covered. Get basic dental work done before coming to Japan.'},
  {icon:'🧾',title:'Keep All Receipts',desc:'Keep all medical receipts. If your total medical costs are very high in one year, you may be able to claim a tax deduction.'},
  {icon:'🌐',title:'International Clinics',desc:'Tokyo, Osaka, and other major cities have international clinics with English-speaking doctors. These are more expensive but easier for foreigners.'},
  {icon:'📞',title:'Medical Emergency',desc:'Call 119 for ambulance. The service is free. At the hospital, show your residence card and insurance card immediately.'},
]

export default function InsurancePage() {
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState('All')

  const filters = ['All', 'Mandatory', 'Recommended', 'Often Required', 'Optional but Recommended']
  const filtered = filter === 'All' ? INSURANCE_TYPES : INSURANCE_TYPES.filter(i => i.type === filter)

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Insurance Guide</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Everything you need to know about insurance in Japan</p>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{background:'rgba(196,32,32,0.1)',border:'2px solid #C42020',borderRadius:'12px',padding:'16px 20px',marginBottom:'24px',display:'flex',gap:'12px',alignItems:'center'}}>
          <span style={{fontSize:'24px'}}>⚠️</span>
          <p style={{color:'white',fontSize:'14px',fontWeight:'600'}}>National Health Insurance is MANDATORY for all foreign residents staying more than 3 months. Enroll within 14 days of arrival!</p>
        </div>

        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
          {filters.map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 14px',color:'white',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
              {f}
            </button>
          ))}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'14px',marginBottom:'40px'}}>
          {filtered.map(ins=>(
            <div key={ins.id} style={{background:'#1A2035',borderRadius:'14px',border:'1px solid rgba(255,255,255,0.08)',overflow:'hidden'}}>
              <div onClick={()=>setSelected(selected?.id===ins.id?null:ins)} style={{padding:'22px',cursor:'pointer',display:'flex',gap:'16px',alignItems:'flex-start'}}>
                <div style={{fontSize:'36px',flexShrink:0}}>{ins.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px',flexWrap:'wrap'}}>
                    <h2 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>{ins.name}</h2>
                    <span style={{background:ins.color + '20',color:ins.color,padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{ins.type}</span>
                  </div>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'8px'}}>{ins.jp}</p>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6',marginBottom:'10px'}}>{ins.desc}</p>
                  <div style={{display:'flex',gap:'16px',flexWrap:'wrap'}}>
                    <div>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Cost: </span>
                      <span style={{color:'#F0A830',fontSize:'13px',fontWeight:'600'}}>{ins.cost}</span>
                    </div>
                    <div>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Coverage: </span>
                      <span style={{color:'#2EC87A',fontSize:'13px',fontWeight:'600'}}>{ins.coverage}</span>
                    </div>
                  </div>
                </div>
                <span style={{color:'#C42020',fontSize:'20px',flexShrink:0}}>{selected?.id===ins.id?'−':'+'}</span>
              </div>

              {selected?.id===ins.id && (
                <div style={{padding:'0 22px 22px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px',marginTop:'16px'}}>
                    <div>
                      <p style={{color:'#2EC87A',fontSize:'11px',fontWeight:'700',marginBottom:'8px'}}>WHAT IT COVERS</p>
                      {ins.covers.map((c,i)=>(
                        <div key={i} style={{display:'flex',gap:'6px',color:'rgba(255,255,255,0.6)',fontSize:'12px',marginBottom:'4px'}}>
                          <span style={{color:'#2EC87A',flexShrink:0}}>✓</span>{c}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p style={{color:'#C42020',fontSize:'11px',fontWeight:'700',marginBottom:'8px'}}>WHAT IT DOES NOT COVER</p>
                      {ins.doesNotCover.map((c,i)=>(
                        <div key={i} style={{display:'flex',gap:'6px',color:'rgba(255,255,255,0.6)',fontSize:'12px',marginBottom:'4px'}}>
                          <span style={{color:'#C42020',flexShrink:0}}>✗</span>{c}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{background:'#0D0907',borderRadius:'8px',padding:'12px'}}>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>HOW TO GET IT</p>
                    <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.5'}}>{ins.howToGet}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'16px'}}>Insurance Tips</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'14px',marginBottom:'24px'}}>
          {TIPS.map(tip=>(
            <div key={tip.title} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{fontSize:'28px',marginBottom:'10px'}}>{tip.icon}</div>
              <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>{tip.title}</h3>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>{tip.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Have questions about insurance in Japan?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}