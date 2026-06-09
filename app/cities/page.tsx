'use client'
import { useState } from 'react'

const CITIES = [
  {
    id:1, name:'Tokyo', jp:'東京', icon:'🗼', region:'Kanto',
    population:'14 million', schools:80, avgRent:'¥70,000-80,000',
    climate:'Humid subtropical', bestFor:'Career & International life',
    color:'#C42020',
    desc:'The capital and largest city of Japan. Best for career opportunities, international lifestyle, and the widest selection of language schools.',
    pros:['Most schools (80+)','Best job market','International community','World-class transport','Entertainment hub'],
    cons:['Most expensive','Crowded','High competition','Small apartments'],
    areas:[
      {name:'Shinjuku',desc:'Major transport hub, many language schools, entertainment'},
      {name:'Shibuya',desc:'Youth culture, fashion, tech companies'},
      {name:'Akihabara',desc:'Electronics, anime, tech culture'},
      {name:'Ueno',desc:'Museums, parks, affordable living'},
      {name:'Ikebukuro',desc:'Shopping, student-friendly, affordable'},
    ],
    costs:{rent:'¥60,000-90,000',food:'¥35,000-50,000',transport:'¥10,000-15,000',total:'¥120,000-160,000'},
    halal:'Excellent - Many halal restaurants in Ueno, Shinjuku, Akihabara',
    mosque:'Tokyo Camii (Yoyogi) - Largest mosque in Japan',
  },
  {
    id:2, name:'Osaka', jp:'大阪', icon:'🏯', region:'Kansai',
    population:'8.8 million', schools:45, avgRent:'¥50,000-60,000',
    climate:'Humid subtropical', bestFor:'Budget & Food culture',
    color:'#4A8EFF',
    desc:'Japan\'s kitchen and entertainment capital. More affordable than Tokyo with friendly locals and amazing food scene.',
    pros:['More affordable','Friendly people','Amazing food','Lower competition','Great nightlife'],
    cons:['Smaller job market','Dialect different','Less international'],
    areas:[
      {name:'Namba',desc:'Entertainment, food, shopping center'},
      {name:'Umeda',desc:'Business district, major station'},
      {name:'Shinsaibashi',desc:'Fashion, shopping, youth culture'},
      {name:'Tennoji',desc:'Affordable, good transport links'},
      {name:'Dotonbori',desc:'Famous food street, tourist area'},
    ],
    costs:{rent:'¥45,000-70,000',food:'¥28,000-40,000',transport:'¥8,000-12,000',total:'¥90,000-130,000'},
    halal:'Good - Halal restaurants in Namba and Shinsaibashi areas',
    mosque:'Osaka Ibaraki Mosque - Main mosque in Kansai',
  },
  {
    id:3, name:'Kyoto', jp:'京都', icon:'⛩️', region:'Kansai',
    population:'1.5 million', schools:25, avgRent:'¥50,000-65,000',
    climate:'Humid subtropical', bestFor:'Culture & Traditional Japan',
    color:'#A855F7',
    desc:'The ancient capital full of temples, shrines, and traditional Japanese culture. Perfect for students who want to experience authentic Japan.',
    pros:['Beautiful temples','Traditional culture','University city','Manageable size','Near Osaka'],
    cons:['Smaller job market','Tourist crowds','Fewer international schools'],
    areas:[
      {name:'Gion',desc:'Traditional geisha district, temples'},
      {name:'Kawaramachi',desc:'Shopping, restaurants, nightlife'},
      {name:'Fushimi',desc:'Famous shrine, quiet residential'},
      {name:'Kyoto Station',desc:'Transport hub, shopping'},
      {name:'Arashiyama',desc:'Bamboo groves, nature'},
    ],
    costs:{rent:'¥45,000-70,000',food:'¥26,000-38,000',transport:'¥7,000-10,000',total:'¥88,000-125,000'},
    halal:'Moderate - Some halal restaurants near Kyoto Station and Kawaramachi',
    mosque:'Kyoto Masjid - Small mosque near Kyoto University',
  },
  {
    id:4, name:'Sapporo', jp:'札幌', icon:'🏔️', region:'Hokkaido',
    population:'2 million', schools:15, avgRent:'¥40,000-55,000',
    climate:'Humid continental (cold winters)', bestFor:'Budget & Nature',
    color:'#2EC87A',
    desc:'Hokkaido\'s capital famous for snow festivals, fresh seafood, and the most affordable cost of living among major cities.',
    pros:['Cheapest major city','Snow festival','Fresh seafood','Clean air','Less crowded'],
    cons:['Very cold winters','Far from Tokyo','Fewer schools','Less job variety'],
    areas:[
      {name:'Odori',desc:'City center, park, events'},
      {name:'Susukino',desc:'Entertainment, nightlife'},
      {name:'Hokkaido University',desc:'University area, student life'},
      {name:'Sapporo Station',desc:'Transport hub, shopping'},
      {name:'Maruyama',desc:'Quiet, residential, nature nearby'},
    ],
    costs:{rent:'¥35,000-55,000',food:'¥23,000-33,000',transport:'¥6,000-9,000',total:'¥75,000-110,000'},
    halal:'Limited - A few halal restaurants, check Muslim Pro app',
    mosque:'Sapporo Islamic Center - Main mosque in Hokkaido',
  },
  {
    id:5, name:'Fukuoka', jp:'福岡', icon:'🍜', region:'Kyushu',
    population:'1.6 million', schools:18, avgRent:'¥40,000-55,000',
    climate:'Humid subtropical', bestFor:'Budget & Relaxed lifestyle',
    color:'#F0A830',
    desc:'The most affordable major city in Japan. Famous for ramen, a relaxed lifestyle, and growing as an international hub.',
    pros:['Cheapest major city','Great ramen','Close to Korea','Growing tech scene','Relaxed lifestyle'],
    cons:['Smaller international community','Less job variety','Fewer schools'],
    areas:[
      {name:'Hakata',desc:'Main station, business district'},
      {name:'Tenjin',desc:'Shopping, entertainment, youth'},
      {name:'Yakuin',desc:'Trendy, cafes, restaurants'},
      {name:'Momochi',desc:'Beach, modern development'},
      {name:'Dazaifu',desc:'Historic shrine, day trip spot'},
    ],
    costs:{rent:'¥35,000-55,000',food:'¥22,000-32,000',transport:'¥6,000-9,000',total:'¥73,000-105,000'},
    halal:'Good - Hakata Halal Ramen famous! Muslim-friendly restaurants increasing',
    mosque:'Fukuoka Masjid - Serves Kyushu region',
  },
  {
    id:6, name:'Nagoya', jp:'名古屋', icon:'🗻', region:'Chubu',
    population:'2.3 million', schools:20, avgRent:'¥45,000-60,000',
    climate:'Humid subtropical', bestFor:'Manufacturing & Jobs',
    color:'#FF8070',
    desc:'Japan\'s manufacturing center between Tokyo and Osaka. Home to Toyota and many manufacturing companies. Good for SSW visa workers.',
    pros:['Manufacturing hub','Toyota HQ','Lower cost than Tokyo','Central location','SSW job opportunities'],
    cons:['Less tourist-friendly','Conservative culture','Fewer language schools'],
    areas:[
      {name:'Sakae',desc:'City center, entertainment, shopping'},
      {name:'Nagoya Station',desc:'Major hub, business area'},
      {name:'Osu',desc:'Electronics, vintage, youth culture'},
      {name:'Kanayama',desc:'Transport hub, affordable'},
      {name:'Fushimi',desc:'Business district, quiet'},
    ],
    costs:{rent:'¥40,000-65,000',food:'¥25,000-35,000',transport:'¥7,000-10,000',total:'¥82,000-120,000'},
    halal:'Moderate - Some halal restaurants, growing Muslim community',
    mosque:'Nagoya Mosque - Central Nagoya location',
  },
]

export default function CitiesPage() {
  const [selected, setSelected] = useState<any>(CITIES[0])
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>City Guide</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Find the perfect city for your Japan journey</p>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:'12px',marginBottom:'28px'}}>
          {CITIES.map(city=>(
            <div key={city.id} onClick={()=>{setSelected(city);setActiveSection('overview')}} style={{background:selected.id===city.id?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (selected.id===city.id?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'14px',padding:'16px',cursor:'pointer',textAlign:'center',transition:'all 0.2s'}}>
              <div style={{fontSize:'36px',marginBottom:'8px'}}>{city.icon}</div>
              <div style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{city.name}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'6px'}}>{city.jp}</div>
              <div style={{background:city.color+'20',color:city.color,padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'600'}}>{city.schools}+ schools</div>
            </div>
          ))}
        </div>

        {selected && (
          <div>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'2px solid ' + selected.color + '40'}}>
              <div style={{display:'flex',gap:'16px',alignItems:'flex-start',flexWrap:'wrap',marginBottom:'20px'}}>
                <span style={{fontSize:'56px'}}>{selected.icon}</span>
                <div style={{flex:1}}>
                  <h2 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>{selected.name}</h2>
                  <p style={{color:selected.color,fontSize:'16px',marginBottom:'8px'}}>{selected.jp} · {selected.region}</p>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.7'}}>{selected.desc}</p>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:'10px'}}>
                {[
                  {label:'Population',value:selected.population},
                  {label:'Language Schools',value:selected.schools + '+'},
                  {label:'Avg Monthly Rent',value:selected.avgRent},
                  {label:'Best For',value:selected.bestFor},
                ].map(info=>(
                  <div key={info.label} style={{background:'#0D0907',borderRadius:'8px',padding:'10px',textAlign:'center'}}>
                    <div style={{color:selected.color,fontSize:'12px',fontWeight:'700',marginBottom:'2px'}}>{info.value}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'10px'}}>{info.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
              {['overview','areas','costs','halal'].map(section=>(
                <button key={section} onClick={()=>setActiveSection(section)} style={{background:activeSection===section?selected.color:'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
                  {section === 'halal' ? 'Muslim & Halal' : section}
                </button>
              ))}
            </div>

            {activeSection === 'overview' && (
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
                <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <h3 style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700',marginBottom:'14px',letterSpacing:'1px'}}>HIGHLIGHTS</h3>
                  {selected.pros.map((p:string)=>(
                    <div key={p} style={{display:'flex',gap:'8px',alignItems:'flex-start',marginBottom:'8px',color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>
                      <span style={{color:'#2EC87A',flexShrink:0}}>✓</span>{p}
                    </div>
                  ))}
                </div>
                <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <h3 style={{color:'#C42020',fontSize:'14px',fontWeight:'700',marginBottom:'14px',letterSpacing:'1px'}}>CHALLENGES</h3>
                  {selected.cons.map((c:string)=>(
                    <div key={c} style={{display:'flex',gap:'8px',alignItems:'flex-start',marginBottom:'8px',color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>
                      <span style={{color:'#C42020',flexShrink:0}}>→</span>{c}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'areas' && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Key Areas in {selected.name}</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {selected.areas.map((area:any,i:number)=>(
                    <div key={i} style={{background:'#0D0907',borderRadius:'8px',padding:'14px',display:'flex',gap:'12px',alignItems:'center'}}>
                      <div style={{width:'32px',height:'32px',borderRadius:'50%',background:selected.color+'20',color:selected.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:'700',flexShrink:0}}>{i+1}</div>
                      <div>
                        <div style={{color:'white',fontSize:'14px',fontWeight:'600',marginBottom:'2px'}}>{area.name}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{area.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'costs' && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Monthly Living Costs in {selected.name}</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px'}}>
                  {[
                    {label:'Rent (share house)',value:selected.costs.rent,icon:'🏠'},
                    {label:'Food & Groceries',value:selected.costs.food,icon:'🍱'},
                    {label:'Transport',value:selected.costs.transport,icon:'🚇'},
                    {label:'Total Estimate',value:selected.costs.total,icon:'💰',highlight:true},
                  ].map(cost=>(
                    <div key={cost.label} style={{background:cost.highlight?selected.color+'20':'#0D0907',borderRadius:'8px',padding:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',border:cost.highlight?'1px solid ' + selected.color + '40':'none'}}>
                      <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                        <span style={{fontSize:'18px'}}>{cost.icon}</span>
                        <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{cost.label}</span>
                      </div>
                      <span style={{color:cost.highlight?selected.color:'#F0A830',fontSize:'14px',fontWeight:'700',fontFamily:'monospace'}}>{cost.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                  <a href="/cost-calculator" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Use Cost Calculator</a>
                  <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura AI</a>
                </div>
              </div>
            )}

            {activeSection === 'halal' && (
              <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'12px'}}>Halal Food in {selected.name}</h3>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.7',marginBottom:'16px'}}>{selected.halal}</p>
                  <a href="/halal" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'inline-block'}}>View Halal Guide</a>
                </div>
                <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'12px'}}>Mosque in {selected.name}</h3>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.7',marginBottom:'16px'}}>{selected.mosque}</p>
                  <a href="/halal" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)',display:'inline-block'}}>View All Mosques</a>
                </div>
              </div>
            )}

            <div style={{display:'flex',gap:'10px',marginTop:'20px',flexWrap:'wrap'}}>
              <a href={'/schools?city=' + selected.name} style={{background:selected.color,color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',flex:1,textAlign:'center'}}>
                Find Schools in {selected.name}
              </a>
              <a href="/compare" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)',flex:1,textAlign:'center'}}>
                Compare Schools
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}