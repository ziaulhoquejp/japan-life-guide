'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const PREFECTURES = [
  {name:'Hokkaido',region:'Hokkaido',icon:'🏔️',desc:'Famous for snow, seafood, and spacious nature. Lower cost of living than Tokyo.',highlight:'Great for nature lovers, lower living costs'},
  {name:'Aomori',region:'Tohoku',icon:'🌸',desc:'Known for apples and beautiful cherry blossoms. Quiet, traditional Japanese life.'},
  {name:'Iwate',region:'Tohoku',icon:'🌸',desc:'Mountainous region with hot springs and traditional culture.'},
  {name:'Miyagi',region:'Tohoku',icon:'🌸',desc:'Home to Sendai, a major city with good balance of urban life and affordability.',highlight:'Sendai is popular with students'},
  {name:'Akita',region:'Tohoku',icon:'🌸',desc:'Known for rice, sake, and beautiful lake scenery.'},
  {name:'Yamagata',region:'Tohoku',icon:'🌸',desc:'Famous for cherries, hot springs, and mountain scenery.'},
  {name:'Fukushima',region:'Tohoku',icon:'🌸',desc:'Recovering region with affordable living and friendly communities.'},
  {name:'Ibaraki',region:'Kanto',icon:'🗼',desc:'Close to Tokyo with lower costs, good for commuting students.'},
  {name:'Tochigi',region:'Kanto',icon:'🗼',desc:'Home to Nikko, famous historical temples and natural beauty.'},
  {name:'Gunma',region:'Kanto',icon:'🗼',desc:'Mountain region with hot springs, affordable cost of living.'},
  {name:'Saitama',region:'Kanto',icon:'🗼',desc:'Major suburb of Tokyo with good transport links and lower rent.',highlight:'Affordable Tokyo commute option'},
  {name:'Chiba',region:'Kanto',icon:'🗼',desc:'Home to Narita Airport, Tokyo Disneyland, and beautiful coastline.'},
  {name:'Tokyo',region:'Kanto',icon:'🗼',desc:'Japan\'s capital with the most schools, jobs, and opportunities. Higher cost of living.',highlight:'Most schools and job opportunities'},
  {name:'Kanagawa',region:'Kanto',icon:'🗼',desc:'Home to Yokohama, second largest city with international atmosphere.',highlight:'Yokohama has large international community'},
  {name:'Niigata',region:'Chubu',icon:'🗻',desc:'Famous for rice, sake, and ski resorts. Affordable living.'},
  {name:'Toyama',region:'Chubu',icon:'🗻',desc:'Beautiful mountain views and affordable cost of living.'},
  {name:'Ishikawa',region:'Chubu',icon:'🗻',desc:'Home to Kanazawa, historical city with traditional culture.'},
  {name:'Fukui',region:'Chubu',icon:'🗻',desc:'Quiet prefecture known for dinosaur fossils and traditional crafts.'},
  {name:'Yamanashi',region:'Chubu',icon:'🗻',desc:'Home to Mount Fuji views, wine region, affordable living.'},
  {name:'Nagano',region:'Chubu',icon:'🗻',desc:'Mountain region famous for skiing and clean nature.'},
  {name:'Shizuoka',region:'Chubu',icon:'🗻',desc:'Coastal prefecture with Mount Fuji views, good balance of city and nature.',highlight:'Has verified schools in Shizuoka City'},
  {name:'Aichi',region:'Chubu',icon:'🗻',desc:'Home to Nagoya, major industrial city with strong job market.',highlight:'Strong manufacturing job market'},
  {name:'Gifu',region:'Chubu',icon:'🗻',desc:'Traditional region with historical villages and affordable living.'},
  {name:'Mie',region:'Chubu',icon:'🗻',desc:'Home to Ise Shrine, one of Japan\'s most important Shinto sites.'},
  {name:'Shiga',region:'Kansai',icon:'🏯',desc:'Home to Lake Biwa, Japan\'s largest lake, close to Kyoto and Osaka.'},
  {name:'Kyoto',region:'Kansai',icon:'🏯',desc:'Japan\'s ancient capital with rich traditional culture and many universities.',highlight:'Rich in culture, many universities'},
  {name:'Osaka',region:'Kansai',icon:'🏯',desc:'Major commercial city, more affordable than Tokyo with great food culture.',highlight:'Affordable alternative to Tokyo'},
  {name:'Hyogo',region:'Kansai',icon:'🏯',desc:'Home to Kobe, international port city with diverse community.'},
  {name:'Nara',region:'Kansai',icon:'🏯',desc:'Ancient capital known for temples and friendly deer parks.'},
  {name:'Wakayama',region:'Kansai',icon:'🏯',desc:'Coastal prefecture with hot springs and pilgrimage routes.'},
  {name:'Tottori',region:'Chugoku',icon:'🕊️',desc:'Smallest population prefecture, known for sand dunes.'},
  {name:'Shimane',region:'Chugoku',icon:'🕊️',desc:'Quiet rural prefecture with ancient shrines.'},
  {name:'Okayama',region:'Chugoku',icon:'🕊️',desc:'Mild climate region known for fruit and traditional crafts.'},
  {name:'Hiroshima',region:'Chugoku',icon:'🕊️',desc:'Historic city with important peace memorials, affordable living.'},
  {name:'Yamaguchi',region:'Chugoku',icon:'🕊️',desc:'Western tip of Honshu, close to Kyushu, coastal scenery.'},
  {name:'Tokushima',region:'Shikoku',icon:'🍜',desc:'Known for traditional dance festivals and indigo dyeing.'},
  {name:'Kagawa',region:'Shikoku',icon:'🍜',desc:'Smallest prefecture, famous for udon noodles.'},
  {name:'Ehime',region:'Shikoku',icon:'🍜',desc:'Citrus growing region with beautiful coastal scenery.'},
  {name:'Kochi',region:'Shikoku',icon:'🍜',desc:'Rural prefecture known for nature and seafood.'},
  {name:'Fukuoka',region:'Kyushu',icon:'🍜',desc:'Major Kyushu city, growing tech hub with affordable living.',highlight:'Growing tech and startup scene'},
  {name:'Saga',region:'Kyushu',icon:'🍜',desc:'Known for pottery traditions and rural charm.'},
  {name:'Nagasaki',region:'Kyushu',icon:'🍜',desc:'Historic port city with international heritage.'},
  {name:'Kumamoto',region:'Kyushu',icon:'🍜',desc:'Famous for castle and volcanic landscape, affordable.'},
  {name:'Oita',region:'Kyushu',icon:'🍜',desc:'Known as Japan\'s hot spring capital.'},
  {name:'Miyazaki',region:'Kyushu',icon:'🍜',desc:'Warm climate, beautiful beaches and surfing culture.'},
  {name:'Kagoshima',region:'Kyushu',icon:'🍜',desc:'Southern tip of Kyushu with volcanic scenery.'},
  {name:'Okinawa',region:'Okinawa',icon:'🏝️',desc:'Tropical islands with unique culture, warm climate year-round.',highlight:'Tropical climate, unique culture'},
]

const REGIONS = ['All','Hokkaido','Tohoku','Kanto','Chubu','Kansai','Chugoku','Shikoku','Kyushu','Okinawa']

export default function PrefecturesPage() {
  const [schoolCounts, setSchoolCounts] = useState<any>({})
  const [region, setRegion] = useState('All')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string|null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('schools').select('city')
      if (data) {
        const counts: any = {}
        data.forEach(s => {
          counts[s.city] = (counts[s.city] || 0) + 1
        })
        setSchoolCounts(counts)
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = PREFECTURES.filter(p => {
    const matchRegion = region === 'All' || p.region === region
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchSearch
  })

  function getSchoolCount(prefName: string) {
    // Try exact match first, then partial match
    if (schoolCounts[prefName]) return schoolCounts[prefName]
    const key = Object.keys(schoolCounts).find(k => k.includes(prefName) || prefName.includes(k))
    return key ? schoolCounts[key] : 0
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>47 Prefectures of Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'16px'}}>Explore where to study across all of Japan</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search prefecture..." style={{width:'100%',maxWidth:'400px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {REGIONS.map(r => (
            <button key={r} onClick={()=>setRegion(r)} style={{background:region===r?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {r}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'14px'}}>
          {filtered.map(pref => {
            const count = getSchoolCount(pref.name)
            const isExpanded = expanded === pref.name
            return (
              <div key={pref.name} onClick={()=>setExpanded(isExpanded ? null : pref.name)} style={{background:'#1A2035',borderRadius:'14px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)',cursor:'pointer'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                  <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                    <span style={{fontSize:'28px'}}>{pref.icon}</span>
                    <div>
                      <h3 style={{color:'white',fontSize:'15px',fontWeight:'700'}}>{pref.name}</h3>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{pref.region}</span>
                    </div>
                  </div>
                  {!loading && count > 0 && (
                    <span style={{background:'rgba(46,200,122,0.15)',color:'#2EC87A',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',whiteSpace:'nowrap'}}>
                      {count} schools
                    </span>
                  )}
                </div>

                {pref.highlight && (
                  <div style={{background:'rgba(196,32,32,0.1)',borderRadius:'6px',padding:'6px 10px',marginBottom:'10px'}}>
                    <p style={{color:'#FF8070',fontSize:'11px',fontWeight:'600'}}>✨ {pref.highlight}</p>
                  </div>
                )}

                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6'}}>
                  {isExpanded ? pref.desc : pref.desc.slice(0,80) + '...'}
                </p>

                {isExpanded && count > 0 && (
                  <a href={'/schools?city=' + encodeURIComponent(pref.name)} onClick={e=>e.stopPropagation()} style={{display:'inline-block',marginTop:'12px',background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'700'}}>
                    View {count} Schools →
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'48px'}}>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No prefectures found matching your search</p>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Not sure which area is right for you?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}