'use client'
import { useState } from 'react'

const HOUSING_TYPES = [
  {
    id:1, icon:'🏠', name:'Share House', jp:'シェアハウス',
    color:'#2EC87A',
    desc:'The most popular option for international students. Shared kitchen, bathroom, and common areas with other residents.',
    pros:['No guarantor needed','Bills included','Meet other students','Flexible contracts','Fully furnished'],
    cons:['Less privacy','Shared facilities','Noise from others','Limited storage'],
    avgCost:'¥30,000 - ¥60,000/month',
    deposit:'1 month deposit',
    recommended:true,
    tips:'Best option for new arrivals. Many share houses are foreigner-friendly and include WiFi, utilities, and furniture.',
  },
  {
    id:2, icon:'🏢', name:'Apartment (1K/1R)', jp:'アパート・マンション',
    color:'#4A8EFF',
    desc:'Your own private apartment. More expensive but more privacy. Requires guarantor and larger initial fees.',
    pros:['Full privacy','Your own space','Freedom to cook','Quiet environment'],
    cons:['Requires guarantor','High initial costs','Need to buy furniture','Bills separate'],
    avgCost:'¥40,000 - ¥80,000/month',
    deposit:'2-3 months deposit + key money',
    recommended:false,
    tips:'Consider using a guarantor service (保証会社) if you do not have a Japanese guarantor. Initial costs can be 4-6x monthly rent.',
  },
  {
    id:3, icon:'🏫', name:'School Dormitory', jp:'学校の寮',
    color:'#F0A830',
    desc:'Dormitory provided by your language school. Most convenient option with school support.',
    pros:['Cheapest option','School support','Safe environment','Close to school','Community life'],
    cons:['Strict rules','Curfew possible','Less freedom','Limited availability'],
    avgCost:'¥20,000 - ¥45,000/month',
    deposit:'Varies by school',
    recommended:true,
    tips:'Apply for school dormitory when you apply to the school. Spots fill up quickly, especially in Tokyo and Osaka.',
  },
  {
    id:4, icon:'🛏', name:'Guest House', jp:'ゲストハウス',
    color:'#A855F7',
    desc:'Budget accommodation with private or shared rooms. Good for short-term stays when you first arrive.',
    pros:['No deposit','Very flexible','Social atmosphere','Central locations'],
    cons:['More expensive long-term','Less private','Tourist atmosphere','Noisy'],
    avgCost:'¥1,500 - ¥4,000/night',
    deposit:'No deposit',
    recommended:false,
    tips:'Good for your first 1-2 weeks while you search for permanent housing. Book in advance for popular cities.',
  },
  {
    id:5, icon:'🏘', name:'UR Housing', jp:'UR賃貸住宅',
    color:'#C42020',
    desc:'Government-managed public housing. No guarantor needed and reasonable prices. Available in many cities.',
    pros:['No guarantor needed','No key money','Stable rent','Well maintained','Pet friendly'],
    cons:['Long waiting list','Older buildings','Suburban locations','Age restrictions some'],
    avgCost:'¥35,000 - ¥70,000/month',
    deposit:'2 months deposit',
    recommended:false,
    tips:'UR Housing does not require a guarantor or key money, making it foreigner-friendly. Apply at ur-net.go.jp',
  },
]

const CITY_COSTS = [
  {city:'Tokyo',avgRent:'¥60,000-80,000',shareHouse:'¥40,000-60,000',dorm:'¥30,000-50,000'},
  {city:'Osaka',avgRent:'¥45,000-65,000',shareHouse:'¥30,000-50,000',dorm:'¥25,000-40,000'},
  {city:'Kyoto',avgRent:'¥45,000-65,000',shareHouse:'¥30,000-50,000',dorm:'¥25,000-40,000'},
  {city:'Sapporo',avgRent:'¥35,000-55,000',shareHouse:'¥25,000-40,000',dorm:'¥20,000-35,000'},
  {city:'Fukuoka',avgRent:'¥35,000-55,000',shareHouse:'¥25,000-40,000',dorm:'¥20,000-35,000'},
  {city:'Nagoya',avgRent:'¥40,000-60,000',shareHouse:'¥28,000-45,000',dorm:'¥22,000-38,000'},
]

const USEFUL_SITES = [
  {name:'GaijinPot Apartments',url:'https://apartments.gaijinpot.com',desc:'English-friendly apartment search for foreigners in Japan',icon:'🏠'},
  {name:'Sakura House',url:'https://www.sakura-house.com',desc:'Popular share house chain for international students',icon:'🌸'},
  {name:'UR Housing',url:'https://www.ur-net.go.jp/en/',desc:'Government housing - no guarantor needed',icon:'🏢'},
  {name:'Suumo',url:'https://suumo.jp',desc:'Japan\'s largest property listing site (Japanese)',icon:'🔍'},
  {name:'Leopalace21',url:'https://www.leopalace21.com/en/',desc:'Furnished apartments with short-term contracts',icon:'🛋'},
  {name:'Monthly Mansion',url:'https://www.monthly.co.jp',desc:'Short-term furnished apartments',icon:'📅'},
]

export default function HousingPage() {
  const [selected, setSelected] = useState<any>(HOUSING_TYPES[0])
  const [activeTab, setActiveTab] = useState('types')

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Housing in Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'16px'}}>Complete guide to finding accommodation in Japan as an international student</p>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/cost-calculator" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Cost Calculator</a>
          <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura AI</a>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {['types','costs','tips','sites'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {tab === 'types' ? '🏠 Housing Types' : tab === 'costs' ? '💰 City Costs' : tab === 'tips' ? '💡 Tips' : '🔗 Useful Sites'}
            </button>
          ))}
        </div>

        {activeTab === 'types' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'12px',marginBottom:'24px'}}>
              {HOUSING_TYPES.map(h=>(
                <div key={h.id} onClick={()=>setSelected(h)} style={{background:selected.id===h.id?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (selected.id===h.id?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'16px',cursor:'pointer',textAlign:'center'}}>
                  <div style={{fontSize:'32px',marginBottom:'8px'}}>{h.icon}</div>
                  <div style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{h.name}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'8px'}}>{h.jp}</div>
                  {h.recommended && <span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>RECOMMENDED</span>}
                </div>
              ))}
            </div>

            {selected && (
              <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'2px solid ' + selected.color + '40'}}>
                <div style={{display:'flex',gap:'16px',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap'}}>
                  <span style={{fontSize:'48px'}}>{selected.icon}</span>
                  <div style={{flex:1}}>
                    <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>{selected.name}</h2>
                    <p style={{color:selected.color,fontSize:'13px',marginBottom:'8px'}}>{selected.jp}</p>
                    <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.7'}}>{selected.desc}</p>
                  </div>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'20px'}}>
                  <div style={{background:'#0D0907',borderRadius:'8px',padding:'12px'}}>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>Monthly Cost</p>
                    <p style={{color:'#F0A830',fontSize:'14px',fontWeight:'700'}}>{selected.avgCost}</p>
                  </div>
                  <div style={{background:'#0D0907',borderRadius:'8px',padding:'12px'}}>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>Initial Deposit</p>
                    <p style={{color:'#F0A830',fontSize:'14px',fontWeight:'700'}}>{selected.deposit}</p>
                  </div>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}}>
                  <div>
                    <h3 style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700',marginBottom:'10px'}}>✓ PROS</h3>
                    {selected.pros.map((p:string)=>(
                      <div key={p} style={{display:'flex',gap:'8px',color:'rgba(255,255,255,0.6)',fontSize:'13px',marginBottom:'6px'}}>
                        <span style={{color:'#2EC87A',flexShrink:0}}>✓</span>{p}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 style={{color:'#C42020',fontSize:'13px',fontWeight:'700',marginBottom:'10px'}}>✗ CONS</h3>
                    {selected.cons.map((c:string)=>(
                      <div key={c} style={{display:'flex',gap:'8px',color:'rgba(255,255,255,0.6)',fontSize:'13px',marginBottom:'6px'}}>
                        <span style={{color:'#C42020',flexShrink:0}}>✗</span>{c}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'10px',padding:'14px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <p style={{color:'#F0A830',fontSize:'12px',fontWeight:'700',marginBottom:'6px'}}>💡 Pro Tip</p>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{selected.tips}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'costs' && (
          <div>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'16px'}}>Average Monthly Rent by City</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
              {CITY_COSTS.map(city=>(
                <div key={city.city} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'12px'}}>📍 {city.city}</h3>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'10px'}}>
                    {[
                      {label:'Private Apartment',value:city.avgRent,color:'#4A8EFF'},
                      {label:'Share House',value:city.shareHouse,color:'#2EC87A'},
                      {label:'School Dormitory',value:city.dorm,color:'#F0A830'},
                    ].map(item=>(
                      <div key={item.label} style={{background:'#0D0907',borderRadius:'8px',padding:'10px',textAlign:'center'}}>
                        <div style={{color:item.color,fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{item.value}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:'rgba(196,32,32,0.1)',borderRadius:'12px',padding:'16px',border:'1px solid rgba(196,32,32,0.2)'}}>
              <p style={{color:'#FF8070',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>💡 Important Note</p>
              <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>These are average estimates. Actual costs vary depending on location, size, and condition. Always budget extra for utilities (¥5,000-15,000/month) and internet (¥3,000-5,000/month).</p>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {[
              {icon:'📋',title:'Before You Arrive',tips:['Research accommodation options before leaving your country','Contact your school about dormitory availability','Prepare documents: passport copy, enrollment letter, bank statement','Save money for initial costs (deposit + 1st month rent)','Book a guest house for your first week']},
              {icon:'🔍',title:'Finding Housing in Japan',tips:['Ask your language school for help - many have partnerships with housing agencies','Use foreigner-friendly sites like GaijinPot and Sakura House','Visit the property in person before signing','Use a guarantor service if you do not have a Japanese guarantor','Check if utilities are included in the rent']},
              {icon:'📝',title:'Signing a Contract',tips:['Read the contract carefully (or ask your school to help translate)','Check the notice period for moving out (usually 1-2 months)','Understand the deposit return policy','Check if there are any restrictions (no pets, no visitors, etc.)','Keep copies of all documents']},
              {icon:'🏠',title:'Living in Japan',tips:['Register at the city hall within 14 days of moving in','Follow the garbage sorting rules carefully','Be quiet after 10pm - Japanese apartments have thin walls','Get renters insurance (火災保険) - usually required','Inform your school of your new address'],},
              {icon:'🕌',title:'Muslim-Friendly Housing',tips:['Share houses are generally more flexible about Muslim lifestyle','Look for housing with a kitchen to cook halal food','Some share houses have prayer room or quiet spaces','Check if the area has halal shops or mosques nearby','Ask Japan Life Guide community for recommendations']},
            ].map((section,i)=>(
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>{section.icon} {section.title}</h2>
                {section.tips.map((tip,j)=>(
                  <div key={j} style={{display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:'8px'}}>
                    <span style={{color:'#C42020',flexShrink:0,marginTop:'2px'}}>→</span>
                    <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{tip}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sites' && (
          <div>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'16px'}}>Useful Housing Websites</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'12px',marginBottom:'24px'}}>
              {USEFUL_SITES.map((site,i)=>(
                <a key={i} href={site.url} target="_blank" rel="noopener noreferrer" style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none',display:'block'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
                  <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
                    <span style={{fontSize:'28px'}}>{site.icon}</span>
                    <div>
                      <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{site.name}</h3>
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',lineHeight:'1.5',marginBottom:'8px'}}>{site.desc}</p>
                      <span style={{color:'#4A8EFF',fontSize:'11px'}}>Visit Website →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>💡 Housing Search Tips</h3>
              {[
                'Start searching at least 2 months before your move-in date',
                'Share houses are easiest for foreigners - no guarantor needed',
                'Ask your language school for housing recommendations',
                'Use the Japan Life Guide community to ask other students',
                'Consider location carefully - close to school saves time and money on transport',
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
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Have questions about housing in Japan?</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/community" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Community</a>
          </div>
        </div>
      </div>
    </main>
  )
}