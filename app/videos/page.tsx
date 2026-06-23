'use client'
import { useState } from 'react'

const VIDEOS = [
  {
    id:'1',
    title:'How to Apply for Japanese Student Visa from Bangladesh',
    channel:'Japan Life Guide',
    duration:'15:23',
    category:'Visa',
    thumbnail:'🛂',
    youtubeId:'dQw4w9WgXcQ',
    description:'Complete step-by-step guide for applying for a Japanese student visa from Bangladesh. Documents, bank requirements, and timeline explained.',
    tags:['visa','student','bangladesh'],
  },
  {
    id:'2',
    title:'Japanese Language Schools: How to Choose the Right One',
    channel:'Japan Life Guide',
    duration:'12:45',
    category:'Schools',
    thumbnail:'🏫',
    youtubeId:'dQw4w9WgXcQ',
    description:'How to evaluate and choose the best Japanese language school for your goals, budget, and location preferences.',
    tags:['school','jlpt','tokyo'],
  },
  {
    id:'3',
    title:'Cost of Living in Japan for Students - Full Breakdown',
    channel:'Japan Life Guide',
    duration:'18:30',
    category:'Finance',
    thumbnail:'💰',
    youtubeId:'dQw4w9WgXcQ',
    description:'Realistic breakdown of monthly expenses including rent, food, transport, and entertainment in Tokyo, Osaka, and smaller cities.',
    tags:['cost','living','budget'],
  },
  {
    id:'4',
    title:'SSW Visa Explained: How to Work in Japan from Nepal',
    channel:'Japan Life Guide',
    duration:'20:15',
    category:'Visa',
    thumbnail:'💼',
    youtubeId:'dQw4w9WgXcQ',
    description:'Everything you need to know about the Specified Skilled Worker (SSW) visa - requirements, skills test, and application process.',
    tags:['ssw','visa','nepal','work'],
  },
  {
    id:'5',
    title:'Halal Food in Japan: Complete Muslim Student Guide',
    channel:'Japan Life Guide',
    duration:'14:20',
    category:'Muslim Life',
    thumbnail:'🕌',
    youtubeId:'dQw4w9WgXcQ',
    description:'Where to find halal food, mosques, and Muslim-friendly resources across major Japanese cities.',
    tags:['halal','muslim','food'],
  },
  {
    id:'6',
    title:'JLPT N4 Study Plan: Pass in 6 Months',
    channel:'Japan Life Guide',
    duration:'22:10',
    category:'JLPT',
    thumbnail:'📝',
    youtubeId:'dQw4w9WgXcQ',
    description:'Proven 6-month study plan to pass JLPT N4 using Genki textbook, Anki flashcards, and daily practice.',
    tags:['jlpt','n4','study'],
  },
  {
    id:'7',
    title:'Part-time Jobs in Japan for Students',
    channel:'Japan Life Guide',
    duration:'16:45',
    category:'Jobs',
    thumbnail:'🏭',
    youtubeId:'dQw4w9WgXcQ',
    description:'How to find part-time jobs in Japan as an international student. Convenience store, factory, restaurant, and more.',
    tags:['jobs','part-time','work'],
  },
  {
    id:'8',
    title:'Japanese Culture Shock: What to Expect',
    channel:'Japan Life Guide',
    duration:'19:05',
    category:'Culture',
    thumbnail:'🌸',
    youtubeId:'dQw4w9WgXcQ',
    description:'Common culture shocks for Bangladesh and Nepal students in Japan. Etiquette, daily life, and how to adapt.',
    tags:['culture','life','japan'],
  },
]

const OFFICIAL_CHANNELS = [
  {name:'JASSO Official',url:'https://www.youtube.com/@jasso_japan',desc:'Official channel for studying in Japan information',icon:'🎓'},
  {name:'Japan Foundation',url:'https://www.youtube.com/@japanfoundation',desc:'Japanese language learning resources',icon:'🌸'},
  {name:'Immigration Services Agency',url:'https://www.youtube.com/@isa_japan',desc:'Official visa and immigration guides',icon:'🛂'},
  {name:'NHK World Japan',url:'https://www.youtube.com/@NHKWorldJapan',desc:'Learn about Japan culture and news',icon:'📺'},
]

const CATEGORIES = ['All', 'Visa', 'Schools', 'Finance', 'Muslim Life', 'JLPT', 'Jobs', 'Culture']

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [search, setSearch] = useState('')

  const filtered = VIDEOS.filter(v => {
    const matchCategory = selectedCategory === 'All' || v.category === selectedCategory
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.tags.some(t => t.includes(search.toLowerCase()))
    return matchCategory && matchSearch
  })

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Video Guides</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'16px'}}>Watch detailed video guides about studying and working in Japan</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search videos..." style={{width:'100%',maxWidth:'400px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={()=>setSelectedCategory(cat)} style={{background:selectedCategory===cat?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {cat}
            </button>
          ))}
        </div>

        {selectedVideo && (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(196,32,32,0.3)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',flex:1}}>{selectedVideo.title}</h2>
              <button onClick={()=>setSelectedVideo(null)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'20px',marginLeft:'12px'}}>✕</button>
            </div>
            <div style={{background:'#0D0907',borderRadius:'12px',aspectRatio:'16/9',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'16px',overflow:'hidden'}}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{borderRadius:'12px'}}
              />
            </div>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.7'}}>{selectedVideo.description}</p>
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px',marginBottom:'32px'}}>
          {filtered.map(video => (
            <div key={video.id} onClick={()=>setSelectedVideo(video)} style={{background:'#1A2035',borderRadius:'12px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)',cursor:'pointer'}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
              <div style={{background:'#0D1520',aspectRatio:'16/9',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                <span style={{fontSize:'48px'}}>{video.thumbnail}</span>
                <div style={{position:'absolute',bottom:'8px',right:'8px',background:'rgba(0,0,0,0.8)',color:'white',padding:'2px 8px',borderRadius:'4px',fontSize:'11px',fontWeight:'600'}}>
                  {video.duration}
                </div>
                <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0)',transition:'background 0.2s'}}>
                  <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'rgba(196,32,32,0.9)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>▶</div>
                </div>
              </div>
              <div style={{padding:'14px'}}>
                <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',marginBottom:'8px',display:'inline-block'}}>{video.category}</span>
                <h3 style={{color:'white',fontSize:'13px',fontWeight:'700',lineHeight:'1.5',marginBottom:'6px'}}>{video.title}</h3>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{video.channel}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'48px'}}>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No videos found. Try a different search.</p>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>📺 Official YouTube Channels</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'10px'}}>
            {OFFICIAL_CHANNELS.map((channel,i) => (
              <a key={i} href={channel.url} target="_blank" rel="noopener noreferrer" style={{background:'#0D0907',borderRadius:'10px',padding:'14px',textDecoration:'none',display:'flex',gap:'12px',alignItems:'center',border:'1px solid rgba(255,255,255,0.06)'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.3)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.06)')}>
                <span style={{fontSize:'28px'}}>{channel.icon}</span>
                <div>
                  <div style={{color:'white',fontSize:'13px',fontWeight:'700'}}>{channel.name}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{channel.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}