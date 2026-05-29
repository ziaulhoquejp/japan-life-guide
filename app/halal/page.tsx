'use client'
import { useState } from 'react'

const HALAL_RESTAURANTS = [
  {city:'Tokyo',places:[
    {name:'Naritaya Halal Ramen',area:'Asakusa',type:'Ramen',rating:4.8},
    {name:'Halal Wagyu Tokyo',area:'Shibuya',type:'Wagyu Beef',rating:4.9},
    {name:'Tokyo Halal Restaurant',area:'Shinjuku',type:'Various',rating:4.6},
    {name:'Ayam-Ya Halal',area:'Akihabara',type:'Japanese',rating:4.5},
    {name:'Shawarma King Tokyo',area:'Ueno',type:'Middle Eastern',rating:4.4},
  ]},
  {city:'Osaka',places:[
    {name:'Osaka Halal Kitchen',area:'Namba',type:'Japanese',rating:4.7},
    {name:'Muslim-Friendly Kushikatsu',area:'Dotonbori',type:'Kushikatsu',rating:4.6},
    {name:'Halal Takoyaki',area:'Shinsaibashi',type:'Takoyaki',rating:4.5},
    {name:'Al-Salam Restaurant',area:'Tennoji',type:'Middle Eastern',rating:4.4},
  ]},
  {city:'Kyoto',places:[
    {name:'Kyoto Halal Food',area:'Gion',type:'Japanese',rating:4.6},
    {name:'Muslim-Friendly Kaiseki',area:'Higashiyama',type:'Kaiseki',rating:4.8},
    {name:'Halal Ramen Kyoto',area:'Kawaramachi',type:'Ramen',rating:4.5},
  ]},
  {city:'Sapporo',places:[
    {name:'Sapporo Halal Ramen',area:'Susukino',type:'Ramen',rating:4.5},
    {name:'Hokkaido Halal Kitchen',area:'Odori',type:'Various',rating:4.4},
  ]},
  {city:'Fukuoka',places:[
    {name:'Hakata Halal Ramen',area:'Hakata',type:'Ramen',rating:4.7},
    {name:'Fukuoka Muslim Kitchen',area:'Tenjin',type:'Various',rating:4.5},
  ]},
]

const MOSQUES = [
  {name:'Tokyo Camii',city:'Tokyo',area:'Yoyogi',capacity:'1000+',time:'5 prayers daily',note:'Largest mosque in Japan'},
  {name:'Otsuka Mosque',city:'Tokyo',area:'Otsuka',capacity:'300',time:'5 prayers daily',note:'Near JR Otsuka station'},
  {name:'Osaka Ibaraki Mosque',city:'Osaka',area:'Ibaraki',capacity:'500',time:'5 prayers daily',note:'Main mosque in Kansai'},
  {name:'Kobe Muslim Mosque',city:'Kobe',area:'Kita-ku',capacity:'400',time:'5 prayers daily',note:'Oldest mosque in Japan (1935)'},
  {name:'Nagoya Mosque',city:'Nagoya',area:'Naka-ku',capacity:'300',time:'5 prayers daily',note:'Central Nagoya location'},
  {name:'Fukuoka Masjid',city:'Fukuoka',area:'Hakata',capacity:'200',time:'5 prayers daily',note:'Serves Kyushu region'},
  {name:'Sapporo Islamic Center',city:'Sapporo',area:'Chuo',capacity:'150',time:'5 prayers daily',note:'Hokkaido main mosque'},
  {name:'Sendai Mosque',city:'Sendai',area:'Aoba',capacity:'100',time:'5 prayers daily',note:'Tohoku region mosque'},
]

const PRAYER_TIMES = [
  {name:'Fajr',jp:'ファジュル',time:'~4:30 AM',icon:'🌙'},
  {name:'Dhuhr',jp:'ドゥフル',time:'~12:00 PM',icon:'☀️'},
  {name:'Asr',jp:'アスル',time:'~3:30 PM',icon:'🌤️'},
  {name:'Maghrib',jp:'マグリブ',time:'~6:30 PM',icon:'🌅'},
  {name:'Isha',jp:'イシャー',time:'~8:00 PM',icon:'🌙'},
]

const TIPS = [
  {icon:'🥩',title:'Finding Halal Meat',desc:'Look for halal butchers in areas with Muslim communities. Tokyo has many in Ueno and Shinjuku areas. Online delivery also available.'},
  {icon:'🏪',title:'Convenience Store Tips',desc:'7-Eleven, Lawson and FamilyMart have some halal-friendly options. Look for items without pork or alcohol. Onigiri with tuna or plum are usually safe.'},
  {icon:'🍜',title:'Ramen Tips',desc:'Most ramen contains pork broth. Look for chicken or seafood ramen. Some restaurants offer halal ramen - always ask "Halal desu ka?"'},
  {icon:'📱',title:'Useful Apps',desc:'Muslim Pro app shows prayer times anywhere in Japan. HalalNavi and Halal Gourmet Japan apps help find halal restaurants.'},
  {icon:'🛒',title:'Halal Supermarkets',desc:'Several halal supermarkets in Tokyo (Shin-Okubo area), Osaka, and Nagoya. Import halal meat from Southeast Asia.'},
  {icon:'🗣️',title:'Useful Japanese Phrases',desc:'"Halal desu ka?" (Is this halal?), "Buta niku nashi" (No pork), "Arukoru nashi" (No alcohol)'},
]

export default function HalalPage() {
  const [tab, setTab] = useState('restaurants')
  const [selectedCity, setSelectedCity] = useState('Tokyo')

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'12px'}}>🕌</div>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Muslim Guide to Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Halal food, mosques, and prayer times across Japan</p>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {[
            {key:'restaurants',label:'Halal Restaurants'},
            {key:'mosques',label:'Mosques'},
            {key:'prayer',label:'Prayer Times'},
            {key:'tips',label:'Muslim Tips'},
          ].map(t=>(
            <button key={t.key} onClick={()=>setTab(t.key)} style={{background:tab===t.key?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'10px 20px',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'restaurants' && (
          <div>
            <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
              {HALAL_RESTAURANTS.map(c=>(
                <button key={c.city} onClick={()=>setSelectedCity(c.city)} style={{background:selectedCity===c.city?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (selectedCity===c.city?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'8px 16px',color:'white',fontSize:'13px',cursor:'pointer'}}>
                  {c.city}
                </button>
              ))}
            </div>
            {HALAL_RESTAURANTS.filter(c=>c.city===selectedCity).map(city=>(
              <div key={city.city} style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {city.places.map((place,i)=>(
                  <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'4px'}}>{place.name}</h3>
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'4px'}}>📍 {place.area} · {place.type}</p>
                      <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                        <span style={{background:'rgba(46,200,122,0.15)',color:'#2EC87A',padding:'2px 8px',borderRadius:'4px',fontSize:'11px',fontWeight:'700'}}>HALAL</span>
                      </div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{color:'#F0A830',fontSize:'16px',fontWeight:'700'}}>{place.rating} ★</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab === 'mosques' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'14px'}}>
            {MOSQUES.map((mosque,i)=>(
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontSize:'32px',marginBottom:'10px'}}>🕌</div>
                <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'4px'}}>{mosque.name}</h3>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'4px'}}>📍 {mosque.area}, {mosque.city}</p>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'4px'}}>👥 Capacity: {mosque.capacity}</p>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'8px'}}>🕐 {mosque.time}</p>
                <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'3px 8px',borderRadius:'4px',fontSize:'11px'}}>{mosque.note}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'prayer' && (
          <div>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'4px'}}>Prayer Times in Japan</h2>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'20px'}}>Times vary by season and location. Use Muslim Pro app for exact times.</p>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {PRAYER_TIMES.map(prayer=>(
                  <div key={prayer.name} style={{background:'#0D0907',borderRadius:'10px',padding:'16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
                      <span style={{fontSize:'24px'}}>{prayer.icon}</span>
                      <div>
                        <div style={{color:'white',fontSize:'15px',fontWeight:'700'}}>{prayer.name}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{prayer.jp}</div>
                      </div>
                    </div>
                    <div style={{color:'#F0A830',fontSize:'15px',fontWeight:'700'}}>{prayer.time}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'12px',padding:'20px'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>Important Notes</h3>
              <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:'6px'}}>
                {['Prayer times change daily - use Muslim Pro app for exact times','Many language schools allow prayer breaks - inform your teacher','Some workplaces have prayer rooms - ask HR','Jumu\'ah (Friday prayer) at 12:30 PM - many mosques accommodate students'].map((note,i)=>(
                  <li key={i} style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',display:'flex',gap:'8px'}}>
                    <span style={{color:'#C42020',flexShrink:0}}>→</span>{note}
                  </li>
                ))}
              </ul>
            </div>
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
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need more info about Muslim life in Japan?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}