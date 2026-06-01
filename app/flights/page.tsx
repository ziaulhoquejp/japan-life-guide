'use client'
import { useState } from 'react'

const AIRLINES = [
  {name:'Biman Bangladesh Airlines',flag:'🇧🇩',routes:['Dhaka to Tokyo (Narita)','Dhaka to Osaka'],duration:'7-8 hours',frequency:'3x per week',avgPrice:'BDT 45,000 - 80,000',direct:true,tips:'Most affordable direct option from Bangladesh'},
  {name:'Japan Airlines (JAL)',flag:'🇯🇵',routes:['Dhaka to Tokyo (Narita)'],duration:'7 hours',frequency:'Daily',avgPrice:'BDT 70,000 - 120,000',direct:true,tips:'Most reliable with excellent service'},
  {name:'All Nippon Airways (ANA)',flag:'🇯🇵',routes:['Dhaka to Tokyo (Haneda)'],duration:'7 hours',frequency:'Daily',avgPrice:'BDT 65,000 - 110,000',direct:true,tips:'Haneda airport is closer to central Tokyo'},
  {name:'Thai Airways',flag:'🇹🇭',routes:['Dhaka to Tokyo via Bangkok'],duration:'10-12 hours',frequency:'Daily',avgPrice:'BDT 40,000 - 70,000',direct:false,tips:'Good stopover option with shorter layover'},
  {name:'Singapore Airlines',flag:'🇸🇬',routes:['Dhaka to Tokyo via Singapore'],duration:'11-13 hours',frequency:'Daily',avgPrice:'BDT 50,000 - 90,000',direct:false,tips:'Excellent service with Singapore stopover'},
  {name:'Nepal Airlines',flag:'🇳🇵',routes:['Kathmandu to Tokyo (Narita)'],duration:'7-8 hours',frequency:'2x per week',avgPrice:'NPR 80,000 - 150,000',direct:true,tips:'Most affordable direct from Nepal'},
  {name:'Qatar Airways',flag:'🇶🇦',routes:['Kathmandu/Dhaka to Tokyo via Doha'],duration:'12-14 hours',frequency:'Daily',avgPrice:'NPR 90,000 - 160,000',direct:false,tips:'Premium service with Doha stopover'},
]

const AIRPORTS = [
  {name:'Narita International Airport',code:'NRT',city:'Tokyo',distance:'60km from central Tokyo',transport:'Narita Express (NEX): 60 min, 3,070 Yen | Limousine Bus: 90 min, 3,200 Yen | Taxi: 120 min, 20,000+ Yen',tips:'Most international flights land here. Book train tickets in advance.'},
  {name:'Haneda Airport',code:'HND',city:'Tokyo',distance:'20km from central Tokyo',transport:'Monorail: 30 min, 490 Yen | Keikyu Line: 35 min, 300 Yen | Taxi: 40 min, 5,000-7,000 Yen',tips:'More convenient for central Tokyo. Some international flights use this airport.'},
  {name:'Kansai International Airport',code:'KIX',city:'Osaka/Kyoto/Kobe',distance:'50km from Osaka center',transport:'Haruka Express: 75 min to Kyoto | Nankai Rapid: 40 min to Namba | Limousine Bus: 60 min',tips:'Best airport for Osaka, Kyoto, and Kobe destinations.'},
  {name:'Chitose Airport',code:'CTS',city:'Sapporo',distance:'40km from Sapporo center',transport:'JR Rapid Aiport: 37 min, 1,150 Yen | Taxi: 60 min, 6,000 Yen',tips:'Main airport for Hokkaido region.'},
  {name:'Fukuoka Airport',code:'FUK',city:'Fukuoka',distance:'5km from city center',transport:'Subway: 5 min, 260 Yen | Taxi: 15 min, 1,500 Yen',tips:'Closest major airport to city center in Japan. Very convenient!'},
]

const TIPS = [
  {icon:'📅',title:'Best Time to Book',desc:'Book 2-3 months in advance for best prices. Avoid Golden Week (late April-early May), Obon (mid-August), and New Year holidays.'},
  {icon:'💰',title:'Save Money on Flights',desc:'Use Google Flights, Skyscanner, or Kayak to compare prices. Tuesday and Wednesday are usually cheapest days to fly.'},
  {icon:'🧳',title:'Baggage Allowance',desc:'Most airlines allow 23kg checked baggage for international flights. Bring warm clothes if going to Tokyo in winter. Label all bags clearly.'},
  {icon:'🛂',title:'At Immigration',desc:'You need: passport, COE (Certificate of Eligibility), school acceptance letter, and cash (Yen). Immigration officers may ask about your plans.'},
  {icon:'📱',title:'Before You Land',desc:'Download Google Maps offline for your city. Get a SIM card at the airport (cheaper than roaming). Have your school address written in Japanese.'},
  {icon:'🏠',title:'First Night',desc:'Book your first night accommodation before flying. Your school dormitory or share house may not be available immediately upon arrival.'},
]

export default function FlightsPage() {
  const [country, setCountry] = useState('Bangladesh')
  const [tab, setTab] = useState('airlines')

  const filteredAirlines = country === 'Bangladesh'
    ? AIRLINES.filter(a => a.routes.some(r => r.includes('Dhaka')))
    : AIRLINES.filter(a => a.routes.some(r => r.includes('Kathmandu')))

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Flight Guide to Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Everything you need to know about flying to Japan</p>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
          {['airlines','airports','tips'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'10px 20px',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {t === 'airlines' ? 'Airlines' : t === 'airports' ? 'Japan Airports' : 'Travel Tips'}
            </button>
          ))}
        </div>

        {tab === 'airlines' && (
          <>
            <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
              <button onClick={()=>setCountry('Bangladesh')} style={{background:country==='Bangladesh'?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (country==='Bangladesh'?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'8px 16px',color:'white',fontSize:'13px',cursor:'pointer',fontWeight:'600'}}>
                🇧🇩 From Bangladesh
              </button>
              <button onClick={()=>setCountry('Nepal')} style={{background:country==='Nepal'?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (country==='Nepal'?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'8px 16px',color:'white',fontSize:'13px',cursor:'pointer',fontWeight:'600'}}>
                🇳🇵 From Nepal
              </button>
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {filteredAirlines.map((airline,i)=>(
                <div key={i} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div style={{display:'flex',gap:'12px',alignItems:'flex-start',flexWrap:'wrap'}}>
                    <div style={{fontSize:'36px'}}>{airline.flag}</div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'8px',flexWrap:'wrap'}}>
                        <h2 style={{color:'white',fontSize:'15px',fontWeight:'700'}}>{airline.name}</h2>
                        <span style={{background:airline.direct?'rgba(46,200,122,0.15)':'rgba(240,168,48,0.15)',color:airline.direct?'#2EC87A':'#F0A830',padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>
                          {airline.direct ? 'Direct' : 'Via Stopover'}
                        </span>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:'4px',marginBottom:'10px'}}>
                        {airline.routes.map((r,j)=>(
                          <p key={j} style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>✈️ {r}</p>
                        ))}
                      </div>
                      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:'8px',marginBottom:'10px'}}>
                        {[
                          {label:'Duration',value:airline.duration},
                          {label:'Frequency',value:airline.frequency},
                          {label:'Avg Price',value:airline.avgPrice},
                        ].map(info=>(
                          <div key={info.label} style={{background:'#0D0907',borderRadius:'6px',padding:'8px'}}>
                            <div style={{color:'rgba(255,255,255,0.3)',fontSize:'10px',marginBottom:'2px'}}>{info.label}</div>
                            <div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{info.value}</div>
                          </div>
                        ))}
                      </div>
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',fontStyle:'italic'}}>{airline.tips}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'airports' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {AIRPORTS.map((airport,i)=>(
              <div key={i} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'12px'}}>
                  <div style={{background:'#C42020',borderRadius:'8px',padding:'8px 12px',fontFamily:'monospace',color:'white',fontSize:'16px',fontWeight:'700',flexShrink:0}}>{airport.code}</div>
                  <div>
                    <h2 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'2px'}}>{airport.name}</h2>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>📍 {airport.city} · {airport.distance}</p>
                  </div>
                </div>
                <div style={{background:'#0D0907',borderRadius:'8px',padding:'12px',marginBottom:'10px'}}>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>TRANSPORT TO CITY</p>
                  <p style={{color:'rgba(255,255,255,0.7)',fontSize:'12px',lineHeight:'1.6'}}>{airport.transport}</p>
                </div>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',fontStyle:'italic'}}>{airport.tips}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'14px'}}>
            {TIPS.map(tip=>(
              <div key={tip.title} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontSize:'28px',marginBottom:'10px'}}>{tip.icon}</div>
                <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>{tip.title}</h3>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>{tip.desc}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need help planning your trip to Japan?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}