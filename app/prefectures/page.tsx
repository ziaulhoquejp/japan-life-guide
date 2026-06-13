'use client'
import { useState } from 'react'

const PREFECTURES = [
  {id:1,name:'Tokyo',jp:'東京都',region:'Kanto',icon:'🗼',capital:'Shinjuku',population:'14M',schools:80,avgRent:'¥70,000-90,000',highlights:['Capital city','Most schools','Best jobs','International'],desc:'The capital of Japan. Most language schools and best job opportunities.'},
  {id:2,name:'Osaka',jp:'大阪府',region:'Kansai',icon:'🏯',capital:'Osaka',population:'8.8M',schools:45,avgRent:'¥45,000-65,000',highlights:['Great food','Affordable','Friendly people','Kansai hub'],desc:'Japan\'s kitchen. Affordable and vibrant city life.'},
  {id:3,name:'Kyoto',jp:'京都府',region:'Kansai',icon:'⛩️',capital:'Kyoto',population:'2.6M',schools:25,avgRent:'¥45,000-65,000',highlights:['Traditional culture','Temples','University city','Beautiful'],desc:'Ancient capital with temples, shrines and traditional culture.'},
  {id:4,name:'Kanagawa',jp:'神奈川県',region:'Kanto',icon:'🌊',capital:'Yokohama',population:'9.2M',schools:30,avgRent:'¥55,000-75,000',highlights:['Near Tokyo','Port city','International','Cosmopolitan'],desc:'Home to Yokohama, Japan\'s second largest city near Tokyo.'},
  {id:5,name:'Aichi',jp:'愛知県',region:'Chubu',icon:'🚗',capital:'Nagoya',population:'7.5M',schools:20,avgRent:'¥45,000-60,000',highlights:['Toyota HQ','Manufacturing','SSW jobs','Central location'],desc:'Manufacturing hub, home to Toyota. Great for SSW visa workers.'},
  {id:6,name:'Saitama',jp:'埼玉県',region:'Kanto',icon:'🏙️',capital:'Saitama',population:'7.3M',schools:15,avgRent:'¥50,000-65,000',highlights:['Near Tokyo','Affordable','Good transport','Quiet'],desc:'Residential prefecture near Tokyo with lower rent.'},
  {id:7,name:'Chiba',jp:'千葉県',region:'Kanto',icon:'🌊',capital:'Chiba',population:'6.3M',schools:12,avgRent:'¥48,000-65,000',highlights:['Near Tokyo','Narita Airport','Affordable','Quiet'],desc:'Near Tokyo with Narita Airport. More affordable than central Tokyo.'},
  {id:8,name:'Hyogo',jp:'兵庫県',region:'Kansai',icon:'🏰',capital:'Kobe',population:'5.5M',schools:15,avgRent:'¥45,000-65,000',highlights:['Kobe city','International port','Fashion','Beef!'],desc:'Home to Kobe, famous for Kobe beef and international atmosphere.'},
  {id:9,name:'Hokkaido',jp:'北海道',region:'Hokkaido',icon:'🏔️',capital:'Sapporo',population:'5.3M',schools:20,avgRent:'¥35,000-55,000',highlights:['Snow festival','Fresh seafood','Cheapest rent','Nature'],desc:'Japan\'s northernmost island. Cheapest living costs, amazing nature.'},
  {id:10,name:'Fukuoka',jp:'福岡県',region:'Kyushu',icon:'🍜',capital:'Fukuoka',population:'5.1M',schools:18,avgRent:'¥35,000-55,000',highlights:['Cheapest major city','Ramen','Near Korea','Growing tech'],desc:'Most affordable major city in Japan. Famous for ramen.'},
  {id:11,name:'Shizuoka',jp:'静岡県',region:'Chubu',icon:'🗻',capital:'Shizuoka',population:'3.6M',schools:8,avgRent:'¥40,000-55,000',highlights:['Mt Fuji view','Green tea','Affordable','Between Tokyo-Nagoya'],desc:'Famous for green tea and views of Mt. Fuji. Between Tokyo and Nagoya.'},
  {id:12,name:'Ibaraki',jp:'茨城県',region:'Kanto',icon:'🌿',capital:'Mito',population:'2.9M',schools:6,avgRent:'¥35,000-50,000',highlights:['Near Tokyo','Very affordable','Nature','Tsukuba Science City'],desc:'Very affordable prefecture near Tokyo with Tsukuba Science City.'},
  {id:13,name:'Hiroshima',jp:'広島県',region:'Chugoku',icon:'🕊️',capital:'Hiroshima',population:'2.8M',schools:10,avgRent:'¥38,000-55,000',highlights:['Peace Memorial','Affordable','Oysters','Historical'],desc:'Known for Peace Memorial and beautiful Inland Sea scenery.'},
  {id:14,name:'Kyushu',jp:'熊本県',region:'Kyushu',icon:'🐻',capital:'Kumamoto',population:'1.8M',schools:8,avgRent:'¥32,000-48,000',highlights:['Affordable','Kumamoto Castle','Hot springs','Nature'],desc:'Central Kyushu prefecture with beautiful castle and hot springs.'},
  {id:15,name:'Miyagi',jp:'宮城県',region:'Tohoku',icon:'🌸',capital:'Sendai',population:'2.3M',schools:8,avgRent:'¥35,000-50,000',highlights:['Sendai city','Tanabata festival','Affordable','Nature'],desc:'Largest city in Tohoku region. Famous for Tanabata festival.'},
  {id:16,name:'Nagano',jp:'長野県',region:'Chubu',icon:'🏔️',capital:'Nagano',population:'2.0M',schools:5,avgRent:'¥35,000-50,000',highlights:['Mountains','Skiing','Fresh air','Olympics 1998'],desc:'Mountain prefecture famous for skiing and clean mountain air.'},
  {id:17,name:'Gifu',jp:'岐阜県',region:'Chubu',icon:'🏯',capital:'Gifu',population:'2.0M',schools:5,avgRent:'¥33,000-48,000',highlights:['Traditional villages','Affordable','Nature','Hot springs'],desc:'Traditional Japanese villages and beautiful mountain scenery.'},
  {id:18,name:'Tochigi',jp:'栃木県',region:'Kanto',icon:'🌿',capital:'Utsunomiya',population:'1.9M',schools:5,avgRent:'¥35,000-50,000',highlights:['Nikko shrine','Affordable','Nature','Near Tokyo'],desc:'Famous for Nikko shrine and strawberries. Near Tokyo.'},
  {id:19,name:'Gunma',jp:'群馬県',region:'Kanto',icon:'🏔️',capital:'Maebashi',population:'2.0M',schools:5,avgRent:'¥33,000-48,000',highlights:['Hot springs','Affordable','Nature','Near Tokyo'],desc:'Famous hot springs and nature. Very affordable near Tokyo.'},
  {id:20,name:'Okayama',jp:'岡山県',region:'Chugoku',icon:'🍑',capital:'Okayama',population:'1.9M',schools:6,avgRent:'¥35,000-50,000',highlights:['Sunny weather','Peaches','Affordable','Kenroku Garden'],desc:'Known for sunshine, peaches and beautiful Korakuen Garden.'},
  {id:21,name:'Mie',jp:'三重県',region:'Chubu',icon:'⛩️',capital:'Tsu',population:'1.8M',schools:4,avgRent:'¥33,000-48,000',highlights:['Ise Shrine','Affordable','Seafood','Nature'],desc:'Home to Ise Grand Shrine, Japan\'s most sacred Shinto shrine.'},
  {id:22,name:'Niigata',jp:'新潟県',region:'Chubu',icon:'🌾',capital:'Niigata',population:'2.2M',schools:5,avgRent:'¥32,000-47,000',highlights:['Best rice','Affordable','Snow country','Sake'],desc:'Famous for Japan\'s best rice and sake. Snow country in winter.'},
  {id:23,name:'Kagoshima',jp:'鹿児島県',region:'Kyushu',icon:'🌋',capital:'Kagoshima',population:'1.6M',schools:5,avgRent:'¥30,000-45,000',highlights:['Sakurajima volcano','Affordable','Warm climate','Sweet potatoes'],desc:'Active volcano city with warm climate and sweet potato shochu.'},
  {id:24,name:'Ehime',jp:'愛媛県',region:'Shikoku',icon:'🍊',capital:'Matsuyama',population:'1.4M',schools:4,avgRent:'¥30,000-45,000',highlights:['Citrus fruits','Dogo Onsen','Affordable','Cycling'],desc:'Famous for mandarin oranges and ancient Dogo Onsen hot spring.'},
  {id:25,name:'Okinawa',jp:'沖縄県',region:'Okinawa',icon:'🏝️',capital:'Naha',population:'1.5M',schools:10,avgRent:'¥38,000-55,000',highlights:['Tropical','Beaches','Unique culture','US bases'],desc:'Subtropical island with beautiful beaches and unique Ryukyu culture.'},
  {id:26,name:'Nara',jp:'奈良県',region:'Kansai',icon:'🦌',capital:'Nara',population:'1.3M',schools:5,avgRent:'¥38,000-55,000',highlights:['Deer park','Ancient temples','Near Osaka','Affordable'],desc:'Ancient capital with friendly deer and UNESCO World Heritage sites.'},
  {id:27,name:'Yamaguchi',jp:'山口県',region:'Chugoku',icon:'🌊',capital:'Yamaguchi',population:'1.3M',schools:4,avgRent:'¥28,000-42,000',highlights:['Affordable','Nature','Hot springs','Historical'],desc:'Westernmost Honshu prefecture. Affordable with beautiful nature.'},
  {id:28,name:'Nagasaki',jp:'長崎県',region:'Kyushu',icon:'🕊️',capital:'Nagasaki',population:'1.3M',schools:5,avgRent:'¥28,000-42,000',highlights:['Historical','International port','Affordable','Hilly city'],desc:'International port city with rich history and beautiful harbor views.'},
  {id:29,name:'Toyama',jp:'富山県',region:'Chubu',icon:'🏔️',capital:'Toyama',population:'1.0M',schools:3,avgRent:'¥28,000-42,000',highlights:['Affordable','Mountains','Seafood','Clean water'],desc:'Known for fresh seafood, tulips and spectacular mountain scenery.'},
  {id:30,name:'Fukushima',jp:'福島県',region:'Tohoku',icon:'🌸',capital:'Fukushima',population:'1.8M',schools:4,avgRent:'¥28,000-42,000',highlights:['Affordable','Nature','Sake','Recovery'],desc:'Beautiful nature and famous sake. Recovering and rebuilding strongly.'},
  {id:31,name:'Ishikawa',jp:'石川県',region:'Chubu',icon:'🎨',capital:'Kanazawa',population:'1.1M',schools:4,avgRent:'¥30,000-45,000',highlights:['Traditional arts','Kenroku-en','Affordable','Seafood'],desc:'Kanazawa is famous for traditional crafts and beautiful gardens.'},
  {id:32,name:'Akita',jp:'秋田県',region:'Tohoku',icon:'🍚',capital:'Akita',population:'0.9M',schools:3,avgRent:'¥25,000-38,000',highlights:['Cheapest rent','Rice','Traditional festivals','Nature'],desc:'Cheapest rent in Japan. Famous for rice, sake and Kanto festival.'},
  {id:33,name:'Yamagata',jp:'山形県',region:'Tohoku',icon:'🍒',capital:'Yamagata',population:'1.1M',schools:3,avgRent:'¥26,000-40,000',highlights:['Cherries','Affordable','Mountains','Skiing'],desc:'Famous for cherries and Zao ski resort. Very affordable.'},
  {id:34,name:'Iwate',jp:'岩手県',region:'Tohoku',icon:'🌊',capital:'Morioka',population:'1.2M',schools:3,avgRent:'¥25,000-38,000',highlights:['Very affordable','Nature','Wanko soba','Samurai history'],desc:'Large and affordable prefecture with beautiful nature and history.'},
  {id:35,name:'Aomori',jp:'青森県',region:'Tohoku',icon:'🍎',capital:'Aomori',population:'1.3M',schools:3,avgRent:'¥25,000-38,000',highlights:['Apples','Nebuta festival','Affordable','Nature'],desc:'Famous for apples and spectacular Nebuta lantern festival.'},
  {id:36,name:'Wakayama',jp:'和歌山県',region:'Kansai',icon:'🌊',capital:'Wakayama',population:'0.9M',schools:3,avgRent:'¥28,000-42,000',highlights:['Affordable','Nature','Pilgrimage route','Onsen'],desc:'Famous Kumano Kodo pilgrimage route and beautiful Kinosaki Onsen.'},
  {id:37,name:'Tokushima',jp:'徳島県',region:'Shikoku',icon:'💃',capital:'Tokushima',population:'0.7M',schools:2,avgRent:'¥25,000-38,000',highlights:['Awa dance','Affordable','Nature','Whirlpools'],desc:'Famous for Awa Odori dance festival and Naruto whirlpools.'},
  {id:38,name:'Kochi',jp:'高知県',region:'Shikoku',icon:'🐟',capital:'Kochi',population:'0.7M',schools:2,avgRent:'¥25,000-38,000',highlights:['Katsuobushi','Affordable','Nature','Ryoma Sakamoto'],desc:'Famous for bonito fish and historical hero Ryoma Sakamoto.'},
  {id:39,name:'Saga',jp:'佐賀県',region:'Kyushu',icon:'🍜',capital:'Saga',population:'0.8M',schools:2,avgRent:'¥25,000-38,000',highlights:['Very affordable','Pottery','Hot air balloons','Near Fukuoka'],desc:'Most affordable Kyushu prefecture. Famous for pottery and balloons.'},
  {id:40,name:'Miyazaki',jp:'宮崎県',region:'Kyushu',icon:'🌴',capital:'Miyazaki',population:'1.1M',schools:3,avgRent:'¥26,000-40,000',highlights:['Tropical','Affordable','Surfing','Mythology'],desc:'Sunny subtropical climate with beautiful beaches and ancient myths.'},
  {id:41,name:'Oita',jp:'大分県',region:'Kyushu',icon:'♨️',capital:'Oita',population:'1.1M',schools:3,avgRent:'¥26,000-40,000',highlights:['Most hot springs','Affordable','Nature','Beppu'],desc:'Most hot springs in Japan. Beppu is world famous for onsen.'},
  {id:42,name:'Tottori',jp:'鳥取県',region:'Chugoku',icon:'🏜️',capital:'Tottori',population:'0.5M',schools:2,avgRent:'¥22,000-35,000',highlights:['Sand dunes','Cheapest','Nature','Crab'],desc:'Least populated prefecture. Famous for sand dunes and fresh crab.'},
  {id:43,name:'Shimane',jp:'島根県',region:'Chugoku',icon:'🕊️',capital:'Matsue',population:'0.7M',schools:2,avgRent:'¥22,000-35,000',highlights:['Very affordable','Ancient shrines','Nature','Izumo'],desc:'Ancient land of the gods. Home to Izumo Grand Shrine.'},
  {id:44,name:'Fukui',jp:'福井県',region:'Chubu',icon:'🦕',capital:'Fukui',population:'0.8M',schools:2,avgRent:'¥24,000-37,000',highlights:['Dinosaurs','Affordable','Seafood','Eyeglasses'],desc:'Famous for dinosaur fossils and producing 90% of Japan\'s eyeglass frames.'},
  {id:45,name:'Yamanashi',jp:'山梨県',region:'Chubu',icon:'🗻',capital:'Kofu',population:'0.8M',schools:2,avgRent:'¥28,000-42,000',highlights:['Mt Fuji view','Grapes','Affordable','Nature'],desc:'Best views of Mt Fuji. Famous for grapes, wine and peaches.'},
  {id:46,name:'Kagawa',jp:'香川県',region:'Shikoku',icon:'🍜',capital:'Takamatsu',population:'0.9M',schools:3,avgRent:'¥26,000-40,000',highlights:['Sanuki udon','Affordable','Art islands','Small and accessible'],desc:'Udon kingdom of Japan. Beautiful Setouchi islands and art scene.'},
  {id:47,name:'Shiga',jp:'滋賀県',region:'Kansai',icon:'🏯',capital:'Otsu',population:'1.4M',schools:3,avgRent:'¥32,000-48,000',highlights:['Lake Biwa','Near Kyoto/Osaka','Affordable','Nature'],desc:'Home to Lake Biwa, Japan\'s largest lake. Near Kyoto and Osaka.'},
]

const REGIONS = ['All', 'Kanto', 'Kansai', 'Kyushu', 'Hokkaido', 'Tohoku', 'Chubu', 'Chugoku', 'Shikoku', 'Okinawa']

export default function PrefecturesPage() {
  const [selected, setSelected] = useState<any>(null)
  const [region, setRegion] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = PREFECTURES.filter(p => {
    const matchRegion = region === 'All' || p.region === region
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.jp.includes(search)
    return matchRegion && matchSearch
  })

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>All 47 Prefectures of Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'20px'}}>Find the perfect prefecture for your Japan journey</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search prefectures..." style={{width:'100%',maxWidth:'400px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px',justifyContent:'center'}}>
          {REGIONS.map(r=>(
            <button key={r} onClick={()=>setRegion(r)} style={{background:region===r?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {r}
            </button>
          ))}
        </div>

        <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',marginBottom:'16px',textAlign:'center'}}>{filtered.length} prefectures found</p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))',gap:'12px'}}>
          {filtered.map(pref=>(
            <div key={pref.id} onClick={()=>setSelected(selected?.id===pref.id?null:pref)} style={{background:selected?.id===pref.id?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (selected?.id===pref.id?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'14px',padding:'18px',cursor:'pointer',transition:'all 0.2s'}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor=selected?.id===pref.id?'#C42020':'rgba(255,255,255,0.08)')}>
              <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'10px'}}>
                <span style={{fontSize:'32px'}}>{pref.icon}</span>
                <div>
                  <h2 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'2px'}}>{pref.name}</h2>
                  <p style={{color:'#C42020',fontSize:'11px',marginBottom:'2px'}}>{pref.jp}</p>
                  <p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{pref.region}</p>
                </div>
              </div>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.5',marginBottom:'10px'}}>{pref.desc}</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',marginBottom:'10px'}}>
                {[
                  {label:'Schools',value:pref.schools + '+'},
                  {label:'Avg Rent',value:pref.avgRent.split('-')[0]},
                ].map(stat=>(
                  <div key={stat.label} style={{background:'#0D0907',borderRadius:'6px',padding:'6px',textAlign:'center'}}>
                    <div style={{color:'#F0A830',fontSize:'11px',fontWeight:'700'}}>{stat.value}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'10px'}}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {selected?.id===pref.id && (
                <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'12px',marginTop:'4px'}}>
                  <div style={{marginBottom:'10px'}}>
                    <p style={{color:'#2EC87A',fontSize:'11px',fontWeight:'700',marginBottom:'6px'}}>HIGHLIGHTS</p>
                    {pref.highlights.map((h:string)=>(
                      <div key={h} style={{display:'flex',gap:'6px',color:'rgba(255,255,255,0.6)',fontSize:'11px',marginBottom:'3px'}}>
                        <span style={{color:'#2EC87A'}}>✓</span>{h}
                      </div>
                    ))}
                  </div>
                  <div style={{marginBottom:'10px'}}>
                    <p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',marginBottom:'4px'}}>Capital: {pref.capital}</p>
                    <p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',marginBottom:'4px'}}>Population: {pref.population}</p>
                    <p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Avg Rent: {pref.avgRent}/month</p>
                  </div>
                  <div style={{display:'flex',gap:'8px'}}>
                    <a href={'/schools?region=' + pref.region} style={{background:'#C42020',color:'white',textDecoration:'none',padding:'7px 12px',borderRadius:'6px',fontSize:'11px',fontWeight:'700',flex:1,textAlign:'center'}}>Find Schools</a>
                    <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'7px 12px',borderRadius:'6px',fontSize:'11px',flex:1,textAlign:'center',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura</a>
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