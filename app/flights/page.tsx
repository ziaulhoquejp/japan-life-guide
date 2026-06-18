'use client'
import { useState } from 'react'

const AIRLINES = [
  {
    id:1, icon:'🇧🇩', name:'Biman Bangladesh Airlines', code:'BG',
    color:'#2EC87A', from:'Bangladesh',
    routes:['Dhaka (DAC) → Tokyo Narita (NRT)','Dhaka (DAC) → Osaka Kansai (KIX)'],
    frequency:'3-4 times per week',
    duration:'7-8 hours direct',
    avgPrice:'¥60,000-100,000 (one way)',
    tips:['National carrier of Bangladesh','Halal meals available','Book early for best prices','Check excess baggage rules'],
    url:'https://www.biman-airlines.com',
  },
  {
    id:2, icon:'✈️', name:'Japan Airlines (JAL)', code:'JL',
    color:'#C42020', from:'Bangladesh & Nepal',
    routes:['Dhaka → Tokyo Narita','Kathmandu → Tokyo Narita (via connecting city)'],
    frequency:'Daily',
    duration:'8-12 hours',
    avgPrice:'¥80,000-150,000 (one way)',
    tips:['Premium service','Good baggage allowance','Halal meals on request','Frequent flyer miles program'],
    url:'https://www.jal.com',
  },
  {
    id:3, icon:'✈️', name:'All Nippon Airways (ANA)', code:'NH',
    color:'#4A8EFF', from:'Bangladesh & Nepal',
    routes:['Dhaka → Tokyo via hub','Kathmandu → Tokyo Narita via hub'],
    frequency:'Daily via hubs',
    duration:'8-14 hours',
    avgPrice:'¥75,000-140,000 (one way)',
    tips:['Award winning service','Good for luggage','Star Alliance member','Book 3+ months ahead'],
    url:'https://www.ana.co.jp/en',
  },
  {
    id:4, icon:'🇶🇦', name:'Qatar Airways', code:'QR',
    color:'#8B0000', from:'Bangladesh & Nepal',
    routes:['Dhaka → Tokyo via Doha','Kathmandu → Tokyo via Doha'],
    frequency:'Daily',
    duration:'12-14 hours via Doha',
    avgPrice:'¥60,000-110,000 (one way)',
    tips:['Often cheapest option','Halal meals standard','Long layover in Doha','Good business class'],
    url:'https://www.qatarairways.com',
  },
  {
    id:5, icon:'🇦🇪', name:'Emirates', code:'EK',
    color:'#C4A020', from:'Bangladesh & Nepal',
    routes:['Dhaka → Tokyo via Dubai','Kathmandu → Tokyo via Dubai'],
    frequency:'Daily',
    duration:'12-15 hours via Dubai',
    avgPrice:'¥65,000-120,000 (one way)',
    tips:['Excellent service','Halal meals available','Dubai stopover option','Good luggage allowance'],
    url:'https://www.emirates.com',
  },
  {
    id:6, icon:'🇳🇵', name:'Nepal Airlines', code:'RA',
    color:'#C42020', from:'Nepal',
    routes:['Kathmandu (KTM) → Tokyo Narita (NRT)','Kathmandu → Osaka'],
    frequency:'2-3 times per week',
    duration:'7-8 hours',
    avgPrice:'¥55,000-95,000 (one way)',
    tips:['National carrier of Nepal','Direct flights available','Book early for best prices','Check baggage allowance'],
    url:'https://www.nepalairlines.com.np',
  },
]

const AIRPORTS = [
  {name:'Tokyo Narita (NRT)',jp:'成田国際空港',desc:'Main international airport. 60-90 min from central Tokyo by Narita Express.',transport:'Narita Express ¥3,000 | Limousine Bus ¥3,200 | Keisei Skyliner ¥2,570'},
  {name:'Tokyo Haneda (HND)',jp:'東京国際空港',desc:'Closer to central Tokyo. Some international flights. 30-45 min from central Tokyo.',transport:'Monorail ¥500 | Keikyu Line ¥600 | Taxi ¥5,000-8,000'},
  {name:'Osaka Kansai (KIX)',jp:'関西国際空港',desc:'Main airport for Osaka, Kyoto, Kobe. 50-75 min from Osaka city.',transport:'Haruka Express ¥2,830 | Limousine Bus ¥1,800'},
  {name:'Nagoya Centrair (NGO)',jp:'中部国際空港',desc:'Airport for Nagoya and central Japan. 28 min from Nagoya by train.',transport:'Meitetsu Limited Express ¥870'},
  {name:'Sapporo New Chitose (CTS)',jp:'新千歳空港',desc:'Main airport for Hokkaido. 40 min from Sapporo.',transport:'JR Airport Express ¥1,150'},
  {name:'Fukuoka (FUK)',jp:'福岡空港',desc:'One of the closest airports to city center in Japan. 5 min by subway.',transport:'Subway ¥260'},
]

export default function FlightsPage() {
  const [activeTab, setActiveTab] = useState('airlines')
  const [selected, setSelected] = useState<any>(AIRLINES[0])
  const [from, setFrom] = useState('Bangladesh')

  const filtered = AIRLINES.filter(a => a.from.includes(from) || a.from === 'Bangladesh & Nepal')

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Flights to Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'16px'}}>Airlines, airports, and travel tips for Bangladesh and Nepal students</p>
        <div style={{display:'flex',gap:'8px',justifyContent:'center'}}>
          {['Bangladesh','Nepal'].map(c=>(
            <button key={c} onClick={()=>setFrom(c)} style={{background:from===c?'#C42020':'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'20px',padding:'8px 20px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
              {c === 'Bangladesh' ? '🇧🇩' : '🇳🇵'} {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {['airlines','airports','tips'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {tab === 'airlines' ? '✈️ Airlines' : tab === 'airports' ? '🏢 Airports' : '💡 Travel Tips'}
            </button>
          ))}
        </div>

        {activeTab === 'airlines' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'12px',marginBottom:'24px'}}>
              {filtered.map(airline=>(
                <div key={airline.id} onClick={()=>setSelected(airline)} style={{background:selected.id===airline.id?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (selected.id===airline.id?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'16px',cursor:'pointer',textAlign:'center'}}>
                  <div style={{fontSize:'32px',marginBottom:'8px'}}>{airline.icon}</div>
                  <div style={{color:'white',fontSize:'12px',fontWeight:'700',marginBottom:'4px'}}>{airline.name}</div>
                  <div style={{color:airline.color,fontSize:'11px',marginBottom:'4px'}}>{airline.avgPrice}</div>
                  <div style={{color:'rgba(255,255,255,0.3)',fontSize:'10px'}}>{airline.duration}</div>
                </div>
              ))}
            </div>

            {selected && (
              <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'2px solid ' + selected.color + '30'}}>
                <div style={{display:'flex',gap:'16px',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap'}}>
                  <span style={{fontSize:'48px'}}>{selected.icon}</span>
                  <div style={{flex:1}}>
                    <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>{selected.name}</h2>
                    <p style={{color:selected.color,fontSize:'13px',marginBottom:'8px'}}>{selected.code} · {selected.duration} · {selected.avgPrice}</p>
                  </div>
                </div>

                <div style={{marginBottom:'16px'}}>
                  <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>📍 Routes</h3>
                  {selected.routes.map((route:string,i:number)=>(
                    <div key={i} style={{background:'#0D0907',borderRadius:'8px',padding:'10px',marginBottom:'6px',color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>
                      ✈️ {route}
                    </div>
                  ))}
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
                  <div style={{background:'#0D0907',borderRadius:'8px',padding:'12px',textAlign:'center'}}>
                    <div style={{color:selected.color,fontSize:'14px',fontWeight:'700'}}>{selected.frequency}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Frequency</div>
                  </div>
                  <div style={{background:'#0D0907',borderRadius:'8px',padding:'12px',textAlign:'center'}}>
                    <div style={{color:selected.color,fontSize:'14px',fontWeight:'700'}}>{selected.avgPrice}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Average Price</div>
                  </div>
                </div>

                <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'10px',padding:'14px',marginBottom:'14px'}}>
                  <p style={{color:'#F0A830',fontSize:'12px',fontWeight:'700',marginBottom:'8px'}}>💡 Tips</p>
                  {selected.tips.map((tip:string,i:number)=>(
                    <div key={i} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
                      <span style={{color:'#F0A830',flexShrink:0}}>→</span>
                      <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{tip}</span>
                    </div>
                  ))}
                </div>

                <a href={selected.url} target="_blank" rel="noopener noreferrer" style={{background:selected.color,color:'white',textDecoration:'none',padding:'12px 20px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'block',textAlign:'center'}}>
                  Book on {selected.name} →
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'airports' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Major Airports in Japan</h2>
            {AIRPORTS.map((airport,i)=>(
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'12px'}}>
                  <span style={{fontSize:'28px'}}>🛬</span>
                  <div>
                    <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'2px'}}>{airport.name}</h3>
                    <p style={{color:'#C42020',fontSize:'12px',marginBottom:'6px'}}>{airport.jp}</p>
                    <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'8px'}}>{airport.desc}</p>
                    <div style={{background:'#0D0907',borderRadius:'6px',padding:'8px'}}>
                      <p style={{color:'#2EC87A',fontSize:'11px',fontWeight:'700',marginBottom:'2px'}}>🚆 Transport to City</p>
                      <p style={{color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>{airport.transport}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {[
              {icon:'📅',title:'When to Book',tips:['Book 2-3 months in advance for best prices','Avoid Japanese holidays (Golden Week, Obon, New Year)','Tuesday and Wednesday are usually cheapest days to fly','Use Google Flights to track price changes']},
              {icon:'🧳',title:'Baggage Tips',tips:['Most airlines allow 23kg checked baggage for students','Carry important documents in hand luggage','Bring 2-3 sets of clothes in carry-on in case of delay','Pack medicines and essentials in hand luggage','Check airline baggage policy before packing']},
              {icon:'📋',title:'Required Documents',tips:['Valid passport (6+ months validity)','Student visa or COE','Acceptance letter from school','Return ticket or proof of onward travel','Sufficient funds proof','Travel insurance (recommended)']},
              {icon:'🕌',title:'Muslim Travel Tips',tips:['Request halal meal when booking (select MOML)','Carry prayer mat and compass','Doha and Dubai airports have prayer rooms','Most airlines accommodate prayer times','Pack any halal snacks for arrival period']},
              {icon:'🏢',title:'At the Airport',tips:['Arrive 3 hours before international departure','Have all documents ready for immigration','Download offline maps before landing','Get a pocket WiFi or SIM card at airport','Exchange small amount of Yen at airport']},
              {icon:'🇯🇵',title:'Arriving in Japan',tips:['Fill in arrival card on the plane','Immigration queue can be long - allow 1 hour','Collect residence card at airport if staying 3+ months','Get IC card (Suica/Pasmo) for trains','Buy pocket WiFi or SIM at arrival hall']},
            ].map((section,i)=>(
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>{section.icon} {section.title}</h2>
                {section.tips.map((tip,j)=>(
                  <div key={j} style={{display:'flex',gap:'10px',marginBottom:'8px'}}>
                    <span style={{color:'#C42020',flexShrink:0}}>→</span>
                    <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{tip}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Have questions about flying to Japan?</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/visa" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Visa Guide</a>
          </div>
        </div>
      </div>
    </main>
  )
}