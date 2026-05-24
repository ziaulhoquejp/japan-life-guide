'use client'
import { useState } from 'react'

const PREFECTURES = [
  {id:1,name:'Tokyo',jp:'東京',region:'Kanto',icon:'🗼',population:'14M',schools:30,avgRent:75000,climate:'Humid subtropical',highlights:['Capital city','Most schools','Best job market','International hub'],cons:['Most expensive','Crowded','High rent'],desc:'The capital and largest city. Best for career opportunities and international lifestyle.'},
  {id:2,name:'Osaka',jp:'大阪',region:'Kansai',icon:'🏯',population:'8.8M',schools:20,avgRent:55000,climate:'Humid subtropical',highlights:['Great food','Friendly people','Lower cost than Tokyo','Good nightlife'],cons:['Dialect different','Less international'],desc:'Japan\'s kitchen and entertainment capital. Friendly locals and amazing food scene.'},
  {id:3,name:'Kyoto',jp:'京都',region:'Kansai',icon:'⛩️',population:'1.5M',schools:12,avgRent:55000,climate:'Humid subtropical',highlights:['Cultural capital','Beautiful temples','Traditional Japan','UNESCO sites'],cons:['Smaller job market','Tourist crowds'],desc:'The ancient capital full of temples, shrines, and traditional Japanese culture.'},
  {id:4,name:'Sapporo',jp:'札幌',region:'Hokkaido',icon:'🏔️',population:'2M',schools:8,avgRent:45000,climate:'Humid continental',highlights:['Snow festival','Low cost','Fresh seafood','Clean air'],cons:['Cold winters','Far from Tokyo','Less international'],desc:'Hokkaido\'s capital famous for snow festivals, fresh seafood, and affordable living.'},
  {id:5,name:'Fukuoka',jp:'福岡',region:'Kyushu',icon:'🍜',population:'1.6M',schools:10,avgRent:45000,climate:'Humid subtropical',highlights:['Cheapest major city','Great ramen','Close to Korea','Growing tech scene'],cons:['Smaller international community','Less job variety'],desc:'The most affordable major city in Japan. Famous for ramen and a relaxed lifestyle.'},
  {id:6,name:'Nagoya',jp:'名古屋',region:'Chubu',icon:'🗻',population:'2.3M',schools:9,avgRent:50000,climate:'Humid subtropical',highlights:['Manufacturing hub','Toyota HQ','Lower cost','Central location'],cons:['Less tourist-friendly','Conservative'],desc:'Japan\'s manufacturing center between Tokyo and Osaka. Home to Toyota.'},
  {id:7,name:'Hiroshima',jp:'広島',region:'Chugoku',icon:'🕊️',population:'1.2M',schools:6,avgRent:42000,climate:'Humid subtropical',highlights:['Historical significance','Affordable','Oysters','Peace Park'],cons:['Smaller city','Less job opportunities'],desc:'A resilient city known for its Peace Memorial and delicious okonomiyaki.'},
  {id:8,name:'Sendai',jp:'仙台',region:'Tohoku',icon:'🌸',population:'1.1M',schools:5,avgRent:40000,climate:'Humid continental',highlights:['Affordable','University city','Tanabata festival','Nature nearby'],cons:['Cold winters','Smaller job market'],desc:'The largest city in Tohoku, known for universities and the famous Tanabata festival.'},
  {id:9,name:'Yokohama',jp:'横浜',region:'Kanto',icon:'🌊',population:'3.7M',schools:8,avgRent:65000,climate:'Humid subtropical',highlights:['Near Tokyo','Chinatown','Port city','International'],cons:['High rent','Commute to Tokyo'],desc:'Japan\'s second largest city and major port, close to Tokyo with a cosmopolitan atmosphere.'},
  {id:10,name:'Kobe',jp:'神戸',region:'Kansai',icon:'🏰',population:'1.5M',schools:5,avgRent:55000,climate:'Humid subtropical',highlights:['International atmosphere','Fashion','Mountains and sea','Beef!'],cons:['Smaller than Osaka','Limited schools'],desc:'An elegant port city famous for Kobe beef, fashion, and its international community.'},
  {id:11,name:'Naha',jp:'那覇',region:'Okinawa',icon:'🏝️',population:'320K',schools:4,avgRent:45000,climate:'Tropical',highlights:['Tropical climate','Beautiful beaches','Unique culture','Affordable'],cons:['Remote','Limited job market','Small city'],desc:'The capital of Okinawa with a unique Ryukyu culture, beautiful beaches and warm weather.'},
  {id:12,name:'Kanazawa',jp:'金沢',region:'Chubu',icon:'🎨',population:'460K',schools:3,avgRent:45000,climate:'Humid continental',highlights:['Traditional crafts','Kenroku-en garden','Affordable','Seafood'],cons:['Small city','Limited international community'],desc:'A beautifully preserved castle town famous for its traditional arts and Kenroku-en garden.'},
]

export default function PrefecturesPage() {
  const [selected, setSelected] = useState<any>(null)
  const [region, setRegion] = useState('All')

  const regions = ['All', 'Kanto', 'Kansai', 'Kyushu', 'Hokkaido', 'Tohoku', 'Chubu', 'Chugoku', 'Okinawa']
  const filtered = region === 'All' ? PREFECTURES : PREFECTURES.filter(p => p.region === region)

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Japan Prefectures Guide</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Find the best city for your Japan journey</p>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px',justifyContent:'center'}}>
          {regions.map(r=>(
            <button key={r} onClick={()=>setRegion(r)} style={{background:region===r?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {r}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))',gap:'14px'}}>
          {filtered.map(pref=>(
            <div key={pref.id} onClick={()=>setSelected(selected?.id===pref.id?null:pref)} style={{background:selected?.id===pref.id?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (selected?.id===pref.id?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'14px',padding:'20px',cursor:'pointer',transition:'all 0.2s'}}>
              <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'12px'}}>
                <div style={{fontSize:'36px'}}>{pref.icon}</div>
                <div>
                  <h2 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>{pref.name}</h2>
                  <p style={{color:'#C42020',fontSize:'12px'}}>{pref.jp} · {pref.region}</p>
                </div>
              </div>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6',marginBottom:'12px'}}>{pref.desc}</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',marginBottom:'12px'}}>
                {[
                  {label:'Schools',value:pref.schools + '+'},
                  {label:'Avg Rent',value:'Yen ' + pref.avgRent.toLocaleString()},
                  {label:'Population',value:pref.population},
                  {label:'Climate',value:pref.climate.split(' ')[0]},
                ].map(stat=>(
                  <div key={stat.label} style={{background:'#0D0907',borderRadius:'6px',padding:'8px',textAlign:'center'}}>
                    <div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{stat.value}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'10px'}}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {selected?.id===pref.id && (
                <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'12px',marginTop:'4px'}}>
                  <div style={{marginBottom:'10px'}}>
                    <p style={{color:'#2EC87A',fontSize:'11px',fontWeight:'700',marginBottom:'6px'}}>HIGHLIGHTS</p>
                    {pref.highlights.map(h=>(
                      <div key={h} style={{display:'flex',gap:'6px',alignItems:'center',color:'rgba(255,255,255,0.6)',fontSize:'12px',marginBottom:'3px'}}>
                        <span style={{color:'#2EC87A'}}>✓</span>{h}
                      </div>
                    ))}
                  </div>
                  <div style={{marginBottom:'12px'}}>
                    <p style={{color:'#C42020',fontSize:'11px',fontWeight:'700',marginBottom:'6px'}}>CONS</p>
                    {pref.cons.map(c=>(
                      <div key={c} style={{display:'flex',gap:'6px',alignItems:'center',color:'rgba(255,255,255,0.6)',fontSize:'12px',marginBottom:'3px'}}>
                        <span style={{color:'#C42020'}}>✗</span>{c}
                      </div>
                    ))}
                  </div>
                  <div style={{display:'flex',gap:'8px'}}>
                    <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 14px',borderRadius:'6px',fontSize:'12px',fontWeight:'700',flex:1,textAlign:'center'}}>Find Schools</a>
                    <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'8px 14px',borderRadius:'6px',fontSize:'12px',border:'1px solid rgba(255,255,255,0.15)',flex:1,textAlign:'center'}}>Ask Sakura</a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}