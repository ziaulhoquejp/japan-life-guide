'use client'
import { useState } from 'react'

export default function EmergencyPage() {
  const [activeTab, setActiveTab] = useState('numbers')

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'linear-gradient(135deg,#8B0000,#C42020)',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'12px'}}>🆘</div>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Emergency Guide</h1>
        <p style={{color:'rgba(255,255,255,0.8)',fontSize:'16px',marginBottom:'16px'}}>Important emergency information for international students in Japan</p>
        <div style={{background:'rgba(0,0,0,0.3)',borderRadius:'10px',padding:'12px 20px',display:'inline-block'}}>
          <p style={{color:'white',fontSize:'18px',fontWeight:'800'}}>🚑 Ambulance: 119 | 🚔 Police: 110</p>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {['numbers','embassies','disaster','medical','legal'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {tab === 'numbers' ? '📞 Emergency Numbers' : tab === 'embassies' ? '🏛 Embassies' : tab === 'disaster' ? '🌊 Disaster Guide' : tab === 'medical' ? '🏥 Medical Emergency' : '⚖️ Legal Help'}
            </button>
          ))}
        </div>

        {activeTab === 'numbers' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px',marginBottom:'8px'}}>
              {[
                {number:'119',label:'Ambulance & Fire',desc:'Medical emergencies and fire',color:'#C42020',icon:'🚑'},
                {number:'110',label:'Police',desc:'Crime, accidents, lost items',color:'#4A8EFF',icon:'🚔'},
                {number:'118',label:'Coast Guard',desc:'Sea emergencies',color:'#2EC87A',icon:'⛵'},
                {number:'#7119',label:'Medical Advice',desc:'Non-emergency medical questions',color:'#F0A830',icon:'💊'},
                {number:'0120-46-1997',label:'Disaster Hotline',desc:'Disaster prevention info',color:'#A855F7',icon:'🌊'},
                {number:'03-3501-0110',label:'Consumer Hotline',desc:'Consumer fraud and complaints',color:'#FF8070',icon:'⚖️'},
              ].map(em=>(
                <div key={em.number} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div style={{fontSize:'28px',marginBottom:'8px'}}>{em.icon}</div>
                  <div style={{color:em.color,fontSize:'22px',fontWeight:'800',marginBottom:'4px'}}>{em.number}</div>
                  <div style={{color:'white',fontSize:'13px',fontWeight:'600',marginBottom:'4px'}}>{em.label}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{em.desc}</div>
                </div>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>📞 Multilingual Support Lines</h2>
              {[
                {name:'AMDA Medical Information Center',number:'03-6233-9266',lang:'Multiple languages including Bengali',hours:'Mon-Fri 9am-8pm, Sat 9am-5pm'},
                {name:'Japan Helpline',number:'0120-461-997',lang:'English 24/7',hours:'24 hours / 7 days'},
                {name:'Tokyo English Lifeline (TELL)',number:'03-5774-0992',lang:'English',hours:'9am-11pm daily'},
                {name:'Inbound Safety Call Center',number:'0120-56-2561',lang:'Multiple languages',hours:'24 hours'},
                {name:'Immigration Information Center',number:'0570-013-904',lang:'Multiple languages',hours:'Mon-Fri 8:30am-5:15pm'},
              ].map((line,i)=>(
                <div key={i} style={{padding:'14px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'8px',marginBottom:'4px'}}>
                    <h3 style={{color:'white',fontSize:'14px',fontWeight:'600'}}>{line.name}</h3>
                    <span style={{color:'#C42020',fontSize:'14px',fontWeight:'700'}}>{line.number}</span>
                  </div>
                  <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                    <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>🌍 {line.lang}</span>
                    <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>⏰ {line.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'embassies' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>🇧🇩 Bangladesh Embassy in Japan</h2>
              {[
                {label:'Address',value:'4-33-9 Higashi Gotanda, Shinagawa-ku, Tokyo'},
                {label:'Phone',value:'+81-3-5793-8000'},
                {label:'Emergency',value:'+81-80-3567-9736'},
                {label:'Email',value:'mission.tokyo@mofa.gov.bd'},
                {label:'Website',value:'www.bdembassytokyo.org'},
                {label:'Hours',value:'Mon-Fri 9:00am - 5:00pm'},
                {label:'Nearest Station',value:'Gotanda Station (5 min walk)'},
              ].map(item=>(
                <div key={item.label} style={{display:'flex',gap:'12px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',flexWrap:'wrap'}}>
                  <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',minWidth:'120px'}}>{item.label}:</span>
                  <span style={{color:'white',fontSize:'13px'}}>{item.value}</span>
                </div>
              ))}
              <div style={{marginTop:'14px',display:'flex',gap:'10px',flexWrap:'wrap'}}>
                <a href="https://www.bdembassytokyo.org" target="_blank" rel="noopener noreferrer" style={{background:'#2EC87A',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Visit Website</a>
                <a href="https://www.google.com/maps/search/Bangladesh+Embassy+Tokyo" target="_blank" rel="noopener noreferrer" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>View on Map</a>
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>🇳🇵 Nepal Embassy in Japan</h2>
              {[
                {label:'Address',value:'7-14-9 Todoroki, Setagaya-ku, Tokyo'},
                {label:'Phone',value:'+81-3-3705-5558'},
                {label:'Emergency',value:'+81-80-3567-5588'},
                {label:'Email',value:'nepembjapan@gmail.com'},
                {label:'Website',value:'jp.nepalembassy.gov.np'},
                {label:'Hours',value:'Mon-Fri 9:30am - 5:30pm'},
                {label:'Nearest Station',value:'Todoroki Station (5 min walk)'},
              ].map(item=>(
                <div key={item.label} style={{display:'flex',gap:'12px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',flexWrap:'wrap'}}>
                  <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',minWidth:'120px'}}>{item.label}:</span>
                  <span style={{color:'white',fontSize:'13px'}}>{item.value}</span>
                </div>
              ))}
              <div style={{marginTop:'14px',display:'flex',gap:'10px',flexWrap:'wrap'}}>
                <a href="https://jp.nepalembassy.gov.np" target="_blank" rel="noopener noreferrer" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Visit Website</a>
                <a href="https://www.google.com/maps/search/Nepal+Embassy+Tokyo" target="_blank" rel="noopener noreferrer" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>View on Map</a>
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>📋 When to Contact Your Embassy</h2>
              {[
                'Lost or stolen passport',
                'Serious accident or hospitalization',
                'Arrest or detention by police',
                'Death of a family member in Japan',
                'Natural disaster affecting your safety',
                'Visa or immigration problems',
                'Need for emergency travel documents',
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px'}}>
                  <span style={{color:'#C42020',flexShrink:0}}>→</span>
                  <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'disaster' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{background:'rgba(196,32,32,0.1)',borderRadius:'12px',padding:'16px',border:'1px solid rgba(196,32,32,0.3)'}}>
              <p style={{color:'#FF8070',fontSize:'13px',fontWeight:'700'}}>⚠️ Japan is prone to earthquakes, typhoons, and tsunamis. Download the Safety tips app and register for local disaster alerts!</p>
            </div>

            {[
              {
                title:'🌋 Earthquake',color:'#C42020',
                steps:['DROP to hands and knees immediately','COVER your head and neck under a sturdy desk or table','HOLD ON until shaking stops','Stay away from windows and heavy furniture','Do NOT use elevators','After shaking stops, check for injuries and hazards','Evacuate if building is damaged','Follow instructions from authorities'],
              },
              {
                title:'🌊 Tsunami',color:'#4A8EFF',
                steps:['If near the coast and earthquake occurs, evacuate immediately','Do NOT wait for official warning','Move to high ground or inland','Stay away from coast until all-clear given','Never return to coast to watch tsunami waves','Listen to emergency radio for updates'],
              },
              {
                title:'🌀 Typhoon',color:'#A855F7',
                steps:['Monitor weather forecasts - typhoons are predictable','Stock 3-5 days of food and water','Stay indoors - do not go out during typhoon','Secure windows and avoid near windows','Keep phone charged','Follow evacuation orders if issued','Avoid flooded roads and rivers'],
              },
              {
                title:'🔥 Fire',color:'#F0A830',
                steps:['Call 119 immediately','Alert neighbors by shouting "Kaji! Kaji!" (Fire! Fire!)','Evacuate building immediately','Do NOT use elevator','Close doors to slow fire spread','Meet at designated assembly point','Do not re-enter burning building'],
              },
            ].map((disaster,i)=>(
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>{disaster.title}</h2>
                {disaster.steps.map((step,j)=>(
                  <div key={j} style={{display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:'8px'}}>
                    <div style={{width:'22px',height:'22px',borderRadius:'50%',background:disaster.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'10px',fontWeight:'700',flexShrink:0}}>{j+1}</div>
                    <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.6'}}>{step}</span>
                  </div>
                ))}
              </div>
            ))}

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>📱 Essential Apps for Emergencies</h3>
              {[
                {app:'Safety tips',desc:'Official Japan disaster alert app - available in English, Bengali, Nepali'},
                {app:'NHK World',desc:'English emergency broadcasts and disaster news'},
                {app:'Google Maps',desc:'Download offline maps of your area'},
                {app:'Yahoo Japan Disaster',desc:'Detailed disaster info (Japanese)'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px',padding:'8px',background:'#0D0907',borderRadius:'6px'}}>
                  <span style={{color:'#2EC87A',flexShrink:0}}>📱</span>
                  <div>
                    <span style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{item.app}: </span>
                    <span style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>🚑 Medical Emergency Steps</h2>
              {[
                {step:'1',title:'Call 119',desc:'Say "Kyukyu desu" (救急です) - I need an ambulance. Give your address and describe the emergency.'},
                {step:'2',title:'Stay on the Line',desc:'Operator will guide you. Keep the phone line open until ambulance arrives.'},
                {step:'3',title:'Prepare Documents',desc:'Get ready: Insurance card (保険証), Residence card, Passport, list of medications if any.'},
                {step:'4',title:'Meet the Ambulance',desc:'If possible, have someone wait at the building entrance to guide the ambulance.'},
                {step:'5',title:'At the Hospital',desc:'Show your insurance card. You pay 30% of costs. Ask for English assistance if needed.'},
                {step:'6',title:'Contact School',desc:'Inform your language school about the hospitalization. They can help with translation and support.'},
              ].map(item=>(
                <div key={item.step} style={{display:'flex',gap:'14px',alignItems:'flex-start',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'13px',fontWeight:'700',flexShrink:0}}>{item.step}</div>
                  <div>
                    <div style={{color:'white',fontSize:'14px',fontWeight:'600',marginBottom:'4px'}}>{item.title}</div>
                    <div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>🗣 Useful Japanese Phrases for Medical Emergency</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {[
                  {jp:'救急です (Kyukyu desu)',en:'It is an emergency'},
                  {jp:'助けてください (Tasukete kudasai)',en:'Please help me'},
                  {jp:'痛いです (Itai desu)',en:'It hurts'},
                  {jp:'気分が悪いです (Kibun ga warui desu)',en:'I feel sick'},
                  {jp:'アレルギーがあります (Arerugii ga arimasu)',en:'I have an allergy'},
                  {jp:'英語が話せますか (Eigo ga hanasemasu ka)',en:'Can you speak English?'},
                  {jp:'保険証はあります (Hokensho wa arimasu)',en:'I have health insurance'},
                  {jp:'学校に連絡してください (Gakko ni renraku shite kudasai)',en:'Please contact my school'},
                ].map((phrase,i)=>(
                  <div key={i} style={{background:'#0D0907',borderRadius:'8px',padding:'10px',display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}}>
                    <span style={{color:'#C42020',fontSize:'13px',fontWeight:'600',flex:1}}>{phrase.jp}</span>
                    <span style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',flex:1}}>{phrase.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>⚖️ Legal Help in Japan</h2>
              {[
                {name:'Japan Legal Support Center',number:'0570-078374',desc:'Free legal consultation in multiple languages',url:'https://www.houterasu.or.jp/en/'},
                {name:'Tokyo Bar Association',number:'03-3581-2201',desc:'Lawyer referral service',url:'https://www.toben.or.jp'},
                {name:'Immigration Legal Support',number:'0570-013-904',desc:'Immigration related legal help',url:'https://www.moj.go.jp'},
                {name:'Labor Standards Inspection',number:'0570-085-085',desc:'Work related problems and disputes',url:'https://www.mhlw.go.jp'},
              ].map((org,i)=>(
                <div key={i} style={{padding:'14px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'8px',marginBottom:'4px'}}>
                    <h3 style={{color:'white',fontSize:'14px',fontWeight:'600'}}>{org.name}</h3>
                    <span style={{color:'#C42020',fontSize:'13px',fontWeight:'700'}}>{org.number}</span>
                  </div>
                  <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginBottom:'6px'}}>{org.desc}</p>
                  <a href={org.url} target="_blank" rel="noopener noreferrer" style={{color:'#4A8EFF',fontSize:'11px',textDecoration:'none'}}>Visit Website →</a>
                </div>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>📋 Know Your Rights in Japan</h2>
              {[
                'You have the right to remain silent when arrested',
                'You have the right to an interpreter at no cost',
                'You have the right to contact your embassy',
                'You have the right to legal representation',
                'Police can detain you for up to 23 days without charges',
                'Work-related disputes can be reported to Labor Standards',
                'Discrimination in housing is illegal in Japan',
                'Your employer must follow minimum wage laws',
              ].map((right,i)=>(
                <div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px'}}>
                  <span style={{color:'#2EC87A',flexShrink:0}}>✓</span>
                  <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{right}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.2),rgba(139,0,0,0.2))',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
          <p style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>🆘 Remember in any emergency:</p>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',marginBottom:'12px'}}>Ambulance: 119 | Police: 110 | Contact your school and embassy</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/insurance" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Insurance Guide</a>
          </div>
        </div>
      </div>
    </main>
  )
}