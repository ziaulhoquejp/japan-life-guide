'use client'
import { useState } from 'react'

const CITIES_HALAL = [
  {
    city:'Tokyo', icon:'🗼',
    restaurants:[
      {name:'Halal Ramen Naritake',area:'Akihabara',type:'Ramen',price:'¥800-1,200',note:'Famous halal ramen'},
      {name:'Masjid Camii Restaurant',area:'Yoyogi',type:'Turkish/Middle Eastern',price:'¥1,000-2,000',note:'Near Tokyo Camii mosque'},
      {name:'Halal Food Ueno',area:'Ueno',type:'Various',price:'¥600-1,500',note:'Many halal options in Ueno area'},
      {name:'Gyumon Halal',area:'Shinjuku',type:'Japanese BBQ',price:'¥2,000-4,000',note:'Halal Japanese BBQ'},
      {name:'Muslim-friendly Sushi',area:'Various',type:'Sushi',price:'¥1,500-3,000',note:'Increasing halal sushi options'},
    ],
    mosques:[
      {name:'Tokyo Camii & Turkish Culture Center',area:'Yoyogi-Uehara',times:'Open daily, Friday prayer 12:30pm',note:'Largest mosque in Japan'},
      {name:'Masjid Otsuka',area:'Otsuka',times:'Open daily, Friday prayer 12:30pm',note:'Near Otsuka Station'},
      {name:'Islamic Cultural Center Tokyo',area:'Setagaya',times:'Open daily',note:'Large community mosque'},
    ],
  },
  {
    city:'Osaka', icon:'🏯',
    restaurants:[
      {name:'Halal Gyoza',area:'Namba',type:'Gyoza',price:'¥600-1,000',note:'Famous halal gyoza shop'},
      {name:'Muslim-friendly Takoyaki',area:'Dotonbori',type:'Street food',price:'¥500-800',note:'Check for halal certification'},
      {name:'Arab Street Osaka',area:'Nipponbashi',type:'Middle Eastern',price:'¥800-1,500',note:'Several halal restaurants'},
      {name:'Halal Ramen Osaka',area:'Shinsaibashi',type:'Ramen',price:'¥900-1,300',note:'Growing halal ramen scene'},
    ],
    mosques:[
      {name:'Masjid Osaka Ibaraki',area:'Ibaraki (near Osaka)',times:'Open daily, Friday prayer 12:30pm',note:'Largest mosque in Kansai'},
      {name:'Islamic Center of Osaka',area:'Namba',times:'Open daily',note:'Central Osaka location'},
    ],
  },
  {
    city:'Nagoya', icon:'🗻',
    restaurants:[
      {name:'Halal Kitchen Nagoya',area:'Sakae',type:'Various',price:'¥800-1,500',note:'Popular halal restaurant'},
      {name:'Muslim Restaurant Nagoya',area:'Nagoya Station',type:'Malaysian/Indonesian',price:'¥700-1,300',note:'Near main station'},
    ],
    mosques:[
      {name:'Nagoya Mosque',area:'Central Nagoya',times:'Open daily, Friday prayer 12:30pm',note:'Main mosque in Nagoya'},
    ],
  },
  {
    city:'Sapporo', icon:'🏔️',
    restaurants:[
      {name:'Halal Ramen Sapporo',area:'Susukino',type:'Ramen',price:'¥900-1,400',note:'Halal miso ramen'},
      {name:'Muslim-friendly Genghis Khan',area:'Central',type:'BBQ',price:'¥1,500-2,500',note:'Lamb BBQ - often halal'},
    ],
    mosques:[
      {name:'Sapporo Islamic Center',area:'Central Sapporo',times:'Friday prayer 12:30pm',note:'Contact ahead for visiting'},
    ],
  },
  {
    city:'Fukuoka', icon:'🍜',
    restaurants:[
      {name:'Hakata Halal Ramen',area:'Hakata',type:'Ramen',price:'¥800-1,200',note:'Famous halal tonkotsu ramen'},
      {name:'Muslim Restaurant Fukuoka',area:'Tenjin',type:'Various',price:'¥700-1,400',note:'Growing halal scene'},
    ],
    mosques:[
      {name:'Fukuoka Masjid',area:'Central Fukuoka',times:'Friday prayer 12:30pm',note:'Main mosque in Kyushu'},
    ],
  },
  {
    city:'Kyoto', icon:'⛩️',
    restaurants:[
      {name:'Halal Ramen Kyoto',area:'Kyoto Station',type:'Ramen',price:'¥900-1,300',note:'Near main station'},
      {name:'Muslim-friendly Kaiseki',area:'Gion',type:'Traditional Japanese',price:'¥3,000-8,000',note:'Book in advance, inform halal'},
    ],
    mosques:[
      {name:'Kyoto Masjid',area:'Near Kyoto University',times:'Friday prayer 12:30pm',note:'University area mosque'},
    ],
  },
]

const HALAL_TIPS = [
  {
    icon:'🔍',
    title:'Finding Halal Food',
    tips:[
      'Use HalalNavi app - specifically for halal food in Japan',
      'Search Google Maps for "halal" + city name',
      'Look for Muslim-owned restaurants in international districts',
      'Indian and Bangladeshi restaurants are often halal',
      'Ask your language school for recommendations',
      'Join Japan Life Guide community for student recommendations',
    ]
  },
  {
  icon:'🛒',
  title:'Halal Grocery Shopping',
  tips:[
    'SHIZUOKA MART (静岡マート) - Top recommended! Indonesian, Bangladeshi, Pakistani, Nepali, Thai, Filipino groceries. Online orders available at www.shizuokamart.com',
    'Don Don Don Ki (ドン・キホーテ) has halal section in major stores',
      'Yamaya and international supermarkets carry halal products',
      'Tokyu Department Store food halls have halal options',
      'Muslim-owned grocery stores in major cities',
      'Online: Amazon Japan, Rakuten for halal products',
      'Niku (meat) labeled "ハラール" is halal certified',
    ]
  },
  {
    icon:'🏪',
    title:'Convenience Store Tips',
    tips:[
      'Many onigiri (rice balls) with tuna or vegetable are okay',
      'Avoid pork-containing products: 豚肉 (butaniku) means pork',
      'Vegetarian options are generally safe',
      'Some stores have halal labels - look for ハラール',
      'Egg and dairy products are generally acceptable',
      'Avoid mirin (みりん) - it contains alcohol',
    ]
  },
  {
    icon:'🍣',
    title:'Eating at Regular Restaurants',
    tips:[
      'Sushi with fish/seafood is generally okay if not cooked in wine',
      'Tell staff you cannot eat pork: "Buta wa tabemasen"',
      'Tell staff no alcohol: "Osake wa dame desu"',
      'Tempura and sashimi are often okay',
      'Vegetarian ramen options available at many shops',
      'Download Google Translate for menu translation',
    ]
  },
  {
    icon:'🕌',
    title:'Prayer in Japan',
    tips:[
      'Download Muslim Pro app for prayer times and qibla direction',
      'Many airports and shopping malls have prayer rooms',
      'Department stores increasingly have Muslim prayer rooms',
      'Mosques welcome visitors - dress modestly',
      'Friday prayers are important - inform school in advance',
      'Carry a small prayer mat when traveling',
    ]
  },
  {
    icon:'🌙',
    title:'Ramadan in Japan',
    tips:[
      'Inform your school about Ramadan schedule',
      'Suhoor (pre-dawn meal) timing varies by season',
      'Some mosques provide iftar (breaking fast) meals',
      'Halal delivery services available in major cities',
      'Japanese colleagues are generally understanding',
      'Plan exam schedule around Ramadan if possible',
    ]
  },
]

const USEFUL_APPS = [
  {name:'HalalNavi',desc:'Find halal restaurants and certified stores in Japan',icon:'🍽'},
  {name:'Muslim Pro',desc:'Prayer times, qibla direction, Quran, halal restaurants worldwide',icon:'🕌'},
  {name:'Zabihah',desc:'Halal restaurant finder worldwide including Japan',icon:'🔍'},
  {name:'Google Maps',desc:'Search "halal restaurant" near your location',icon:'🗺'},
]

export default function HalalPage() {
  const [selectedCity, setSelectedCity] = useState(CITIES_HALAL[0])
  const [activeTab, setActiveTab] = useState('cities')

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'linear-gradient(135deg,#1A2035,#0D1520)',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'12px'}}>🕌</div>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Muslim & Halal Guide Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Complete guide for Muslim students from Bangladesh and Nepal in Japan</p>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {['cities','tips','apps'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {tab === 'cities' ? '🗺 Halal by City' : tab === 'tips' ? '💡 Halal Tips' : '📱 Useful Apps'}
            </button>
          ))}
        </div>

        {activeTab === 'cities' && (
          <div>
            <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
              {CITIES_HALAL.map(c=>(
                <button key={c.city} onClick={()=>setSelectedCity(c)} style={{background:selectedCity.city===c.city?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
                  {c.icon} {c.city}
                </button>
              ))}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>🍽 Halal Restaurants in {selectedCity.city}</h2>
                {selectedCity.restaurants.map((r,i)=>(
                  <div key={i} style={{background:'#0D0907',borderRadius:'8px',padding:'12px',marginBottom:'8px'}}>
                    <h3 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{r.name}</h3>
                    <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'4px'}}>
                      <span style={{background:'rgba(196,32,32,0.1)',color:'#FF8070',padding:'1px 6px',borderRadius:'4px',fontSize:'10px'}}>{r.type}</span>
                      <span style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>📍 {r.area}</span>
                      <span style={{color:'#F0A830',fontSize:'11px'}}>{r.price}</span>
                    </div>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{r.note}</p>
                  </div>
                ))}
              </div>

              <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>🕌 Mosques in {selectedCity.city}</h2>
                {selectedCity.mosques.map((m,i)=>(
                  <div key={i} style={{background:'#0D0907',borderRadius:'8px',padding:'12px',marginBottom:'8px'}}>
                    <h3 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{m.name}</h3>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'2px'}}>📍 {m.area}</p>
                    <p style={{color:'#2EC87A',fontSize:'11px',marginBottom:'2px'}}>⏰ {m.times}</p>
                    <p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{m.note}</p>
                  </div>
                ))}

                <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'8px',padding:'12px',marginTop:'12px'}}>
                  <p style={{color:'#F0A830',fontSize:'11px',fontWeight:'700',marginBottom:'6px'}}>💡 Mosque Etiquette</p>
                  {['Remove shoes before entering','Dress modestly','Be quiet and respectful','Women should cover hair','Men and women have separate areas'].map((tip,i)=>(
                    <div key={i} style={{display:'flex',gap:'6px',marginBottom:'4px'}}>
                      <span style={{color:'#2EC87A',fontSize:'10px'}}>✓</span>
                      <span style={{color:'rgba(255,255,255,0.5)',fontSize:'11px'}}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'16px'}}>
            {HALAL_TIPS.map((section,i)=>(
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h2 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>{section.icon} {section.title}</h2>
                {section.tips.map((tip,j)=>(
                  <div key={j} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                    <span style={{color:'#C42020',flexShrink:0,fontSize:'12px'}}>→</span>
                    <span style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',lineHeight:'1.6'}}>{tip}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'apps' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>📱 Useful Apps for Muslim Students in Japan</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:'12px',marginBottom:'20px'}}>
              {USEFUL_APPS.map((app,i)=>(
                <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div style={{fontSize:'32px',marginBottom:'10px'}}>{app.icon}</div>
                  <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'6px'}}>{app.name}</h3>
                  <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6'}}>{app.desc}</p>
                </div>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>🌙 Islamic Calendar & Important Dates in Japan</h3>
              {[
                {event:'Friday Prayer (Jumu\'ah)',desc:'Most important weekly prayer. Inform school in advance. Usually 12:30pm.'},
                {event:'Ramadan',desc:'Inform school about fasting. Exam schedules may be adjusted. Community iftars at mosques.'},
                {event:'Eid al-Fitr',desc:'Major holiday. Most mosques hold Eid prayer. Check local mosque for schedule.'},
                {event:'Eid al-Adha',desc:'Some mosques arrange Qurbani (sacrifice). Check local Muslim community.'},
              ].map((item,i)=>(
                <div key={i} style={{padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <h4 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{item.event}</h4>
                  <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6'}}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div style={{background:'rgba(196,32,32,0.1)',borderRadius:'12px',padding:'20px',border:'1px solid rgba(196,32,32,0.2)'}}>
              <h3 style={{color:'#FF8070',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>🤝 Muslim Community in Japan</h3>
              <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7',marginBottom:'12px'}}>
                Japan has a growing Muslim community of over 200,000 people. Most major cities have mosques, halal restaurants, and Muslim community groups. Bangladesh and Nepal communities are particularly active in Tokyo, Osaka, and Nagoya.
              </p>
              <a href="/community" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'inline-block'}}>Join Our Community</a>
            </div>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need more help finding halal food or mosques?</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/community" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Community</a>
          </div>
        </div>
      </div>
    </main>
  )
}