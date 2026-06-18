'use client'
import { useState } from 'react'

const INSURANCE_TYPES = [
  {
    id:1, icon:'🏥', name:'National Health Insurance', jp:'国民健康保険',
    color:'#2EC87A', required:true, cost:'¥1,500-3,000/month',
    desc:'Mandatory health insurance for all residents in Japan including international students. Covers 70% of medical costs.',
    coverage:['Doctor visits (70% covered)','Hospital stays (70% covered)','Prescriptions (70% covered)','Surgery (70% covered)','Emergency treatment'],
    notCovered:['Cosmetic surgery','Some dental procedures','Childbirth (separate coverage)','Pre-existing conditions (some)'],
    howToEnroll:'Enroll at your city hall (市役所) within 14 days of registering your address. Bring your residence card and My Number card.',
    tips:['Enroll as soon as possible to avoid penalties','Monthly premium based on previous year income','Students often pay minimum premium','Keep insurance card with you at all times'],
  },
  {
    id:2, icon:'🦷', name:'Dental Insurance', jp:'歯科保険',
    color:'#4A8EFF', required:false, cost:'¥500-2,000/month',
    desc:'Basic dental care is covered by National Health Insurance. Private dental insurance covers additional procedures.',
    coverage:['Basic tooth cleaning','Cavity fillings','Tooth extraction','Root canal treatment'],
    notCovered:['Teeth whitening','Cosmetic dental work','Premium materials','Orthodontics (braces)'],
    howToEnroll:'Dental care is included in National Health Insurance. Private dental insurance available from insurance companies.',
    tips:['National Health Insurance covers basic dental','Cosmetic work not covered','Find dentist with English support','Regular checkups recommended every 6 months'],
  },
  {
    id:3, icon:'🏠', name:'Renters Insurance', jp:'火災保険',
    color:'#F0A830', required:true, cost:'¥1,500-3,000/year',
    desc:'Required by most landlords when renting in Japan. Covers fire, water damage, and liability.',
    coverage:['Fire damage','Water damage','Theft','Liability to neighbors','Natural disasters'],
    notCovered:['Earthquake damage (separate policy)','Intentional damage','Pre-existing damage'],
    howToEnroll:'Usually arranged through your real estate agent when signing apartment contract. Can also buy from insurance companies.',
    tips:['Required for most rental contracts','Very affordable - usually ¥1,500-3,000 per year','Earthquake insurance sold separately','Share houses usually include this in rent'],
  },
  {
    id:4, icon:'🌍', name:'Travel Insurance', jp:'海外旅行保険',
    color:'#A855F7', required:false, cost:'¥500-2,000/month',
    desc:'Recommended for the period between leaving your home country and enrolling in National Health Insurance.',
    coverage:['Emergency medical treatment','Evacuation','Trip cancellation','Lost baggage','Personal liability'],
    notCovered:['Pre-existing conditions','Extreme sports','War zones','Pandemic related (some policies)'],
    howToEnroll:'Buy before leaving your home country. Available from Bangladeshi/Nepali insurance companies or online.',
    tips:['Buy before arriving in Japan','Covers gap before National Health Insurance','Essential for first 2 weeks','Check if school requires it'],
  },
  {
    id:5, icon:'🦺', name:'Personal Accident Insurance', jp:'傷害保険',
    color:'#FF8070', required:false, cost:'¥300-1,000/month',
    desc:'Covers accidents and injuries not fully covered by National Health Insurance. Good for active students.',
    coverage:['Accidents at school','Sports injuries','Commuting accidents','Disability from accident','Death benefit'],
    notCovered:['Illness (health insurance covers)','Self-inflicted injuries','Pre-existing conditions'],
    howToEnroll:'Available from Japanese insurance companies or through your school.',
    tips:['Many schools offer group accident insurance','Very affordable','Good for students who play sports','Can be bought at convenience stores'],
  },
]

const HOSPITALS = [
  {name:'Tokyo Medical and Surgical Clinic',area:'Tokyo',lang:'English',url:'https://www.tmsc.jp'},
  {name:'International Clinic Osaka',area:'Osaka',lang:'English/Arabic',url:'https://www.icosakamedical.com'},
  {name:'AMDA International Medical Information Center',area:'Nationwide',lang:'Multiple languages',url:'https://www.amdamedicalcenter.com'},
  {name:'Japan Helpline',area:'Nationwide',lang:'English 24/7',url:'https://www.jhelp.com'},
]

export default function InsurancePage() {
  const [selected, setSelected] = useState<any>(INSURANCE_TYPES[0])
  const [activeTab, setActiveTab] = useState('types')

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Insurance in Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'16px'}}>Complete guide to health and other insurance for international students</p>
        <div style={{background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'12px 20px',display:'inline-block'}}>
          <p style={{color:'#FF8070',fontSize:'13px',fontWeight:'700'}}>⚠️ National Health Insurance is MANDATORY for all residents in Japan!</p>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {['types','howto','hospitals'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {tab === 'types' ? '🏥 Insurance Types' : tab === 'howto' ? '📋 How to Enroll' : '🏨 Find Hospital'}
            </button>
          ))}
        </div>

        {activeTab === 'types' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'12px',marginBottom:'24px'}}>
              {INSURANCE_TYPES.map(ins=>(
                <div key={ins.id} onClick={()=>setSelected(ins)} style={{background:selected.id===ins.id?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (selected.id===ins.id?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'16px',cursor:'pointer',textAlign:'center'}}>
                  <div style={{fontSize:'32px',marginBottom:'8px'}}>{ins.icon}</div>
                  <div style={{color:'white',fontSize:'12px',fontWeight:'700',marginBottom:'4px'}}>{ins.name}</div>
                  <div style={{color:ins.color,fontSize:'11px',marginBottom:'6px'}}>{ins.cost}</div>
                  {ins.required && <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>REQUIRED</span>}
                </div>
              ))}
            </div>

            {selected && (
              <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'2px solid ' + selected.color + '40'}}>
                <div style={{display:'flex',gap:'16px',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap'}}>
                  <span style={{fontSize:'48px'}}>{selected.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'4px',flexWrap:'wrap'}}>
                      <h2 style={{color:'white',fontSize:'22px',fontWeight:'700'}}>{selected.name}</h2>
                      {selected.required && <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>REQUIRED</span>}
                    </div>
                    <p style={{color:selected.color,fontSize:'13px',marginBottom:'8px'}}>{selected.jp} · {selected.cost}</p>
                    <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.7'}}>{selected.desc}</p>
                  </div>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}}>
                  <div>
                    <h3 style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700',marginBottom:'10px'}}>✓ What is Covered</h3>
                    {selected.coverage.map((c:string,i:number)=>(
                      <div key={i} style={{display:'flex',gap:'8px',color:'rgba(255,255,255,0.6)',fontSize:'13px',marginBottom:'6px'}}>
                        <span style={{color:'#2EC87A',flexShrink:0}}>✓</span>{c}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 style={{color:'#C42020',fontSize:'13px',fontWeight:'700',marginBottom:'10px'}}>✗ Not Covered</h3>
                    {selected.notCovered.map((c:string,i:number)=>(
                      <div key={i} style={{display:'flex',gap:'8px',color:'rgba(255,255,255,0.6)',fontSize:'13px',marginBottom:'6px'}}>
                        <span style={{color:'#C42020',flexShrink:0}}>✗</span>{c}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'10px',padding:'14px',marginBottom:'14px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <p style={{color:'#4A8EFF',fontSize:'12px',fontWeight:'700',marginBottom:'6px'}}>📋 How to Enroll</p>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{selected.howToEnroll}</p>
                </div>

                <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'10px',padding:'14px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <p style={{color:'#F0A830',fontSize:'12px',fontWeight:'700',marginBottom:'8px'}}>💡 Tips</p>
                  {selected.tips.map((tip:string,i:number)=>(
                    <div key={i} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
                      <span style={{color:'#F0A830',flexShrink:0}}>→</span>
                      <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'howto' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>🏥 How to Enroll in National Health Insurance</h2>
              {[
                {step:'1',title:'Arrive in Japan',desc:'Get your residence card at the airport immigration counter'},
                {step:'2',title:'Register at City Hall',desc:'Go to your local city hall (市役所) within 14 days. Bring residence card and passport'},
                {step:'3',title:'Apply for Health Insurance',desc:'At city hall, apply for National Health Insurance (国民健康保険). Bring residence card and My Number card'},
                {step:'4',title:'Receive Insurance Card',desc:'Insurance card arrives by mail within 1-2 weeks. Keep it with you at all times'},
                {step:'5',title:'Pay Monthly Premium',desc:'Premium bill arrives monthly. Pay at convenience store or bank. Students usually pay ¥1,500-3,000/month'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:'14px',alignItems:'flex-start',padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'13px',fontWeight:'700',flexShrink:0}}>{item.step}</div>
                  <div>
                    <div style={{color:'white',fontSize:'14px',fontWeight:'600',marginBottom:'4px'}}>{item.title}</div>
                    <div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>💊 How to Use Health Insurance</h2>
              {[
                {icon:'🏥',title:'Find a Clinic',desc:'Search for 内科 (internal medicine) or 病院 (hospital). Many have English support.'},
                {icon:'📋',title:'At Reception',desc:'Show your insurance card (保険証). Fill out a form. Some clinics require appointment.'},
                {icon:'👨‍⚕️',title:'See the Doctor',desc:'Consultation usually takes 10-30 minutes. Bring a translation app for Japanese clinics.'},
                {icon:'💊',title:'Get Prescription',desc:'Take prescription to nearby pharmacy (薬局). Insurance covers 70% of medicine cost too.'},
                {icon:'💴',title:'Pay',desc:'You pay 30% of the total cost. Emergency room visits are more expensive.'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:'12px',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <span style={{fontSize:'24px',flexShrink:0}}>{item.icon}</span>
                  <div>
                    <div style={{color:'white',fontSize:'14px',fontWeight:'600',marginBottom:'2px'}}>{item.title}</div>
                    <div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:'rgba(196,32,32,0.1)',borderRadius:'12px',padding:'20px',border:'1px solid rgba(196,32,32,0.2)'}}>
              <h3 style={{color:'#FF8070',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>🆘 Emergency Numbers in Japan</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'10px'}}>
                {[
                  {number:'119',label:'Ambulance & Fire',color:'#C42020'},
                  {number:'110',label:'Police',color:'#4A8EFF'},
                  {number:'#7119',label:'Medical Advice',color:'#2EC87A'},
                  {number:'03-5285-8181',label:'AMDA Medical Info',color:'#F0A830'},
                ].map(em=>(
                  <div key={em.number} style={{background:'#0D0907',borderRadius:'8px',padding:'12px',textAlign:'center'}}>
                    <div style={{color:em.color,fontSize:'20px',fontWeight:'800',marginBottom:'4px'}}>{em.number}</div>
                    <div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px'}}>{em.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hospitals' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>English-Friendly Hospitals & Clinics</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>These hospitals have English-speaking staff or translation services</p>
            {HOSPITALS.map((hospital,i)=>(
              <a key={i} href={hospital.url} target="_blank" rel="noopener noreferrer" style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none',display:'flex',gap:'16px',alignItems:'center',flexWrap:'wrap'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
                <div style={{fontSize:'32px'}}>🏥</div>
                <div style={{flex:1}}>
                  <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{hospital.name}</h3>
                  <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                    <span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'2px 8px',borderRadius:'20px',fontSize:'11px'}}>📍 {hospital.area}</span>
                    <span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'2px 8px',borderRadius:'20px',fontSize:'11px'}}>🌍 {hospital.lang}</span>
                  </div>
                </div>
                <span style={{color:'#4A8EFF',fontSize:'12px',flexShrink:0}}>Visit →</span>
              </a>
            ))}

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>💡 Tips for Finding a Hospital</h3>
              {[
                'Use Google Maps to search for "内科" (internal medicine) near you',
                'Ask your language school - most have recommended hospitals',
                'Download the "JNTO" app for hospital information in English',
                'AMDA Medical Information Center: 03-6233-9266 (multilingual)',
                'Bring your insurance card and residence card to every visit',
                'University hospitals often have interpretation services',
              ].map((tip,i)=>(
                <div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px'}}>
                  <span style={{color:'#C42020',flexShrink:0}}>→</span>
                  <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Have questions about insurance in Japan?</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/emergency" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Emergency Guide</a>
          </div>
        </div>
      </div>
    </main>
  )
}