'use client'
import { useState } from 'react'

const VIDEOS = [
  {id:1,category:'Visa',title:'How to Apply for Japanese Student Visa from Bangladesh',thumbnail:'🎬',duration:'12:34',views:'45K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'Complete step-by-step guide to applying for a Japanese student visa from Bangladesh.'},
  {id:2,category:'Visa',title:'SSW Visa Process from Nepal - Complete Guide',thumbnail:'🎬',duration:'15:22',views:'32K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'How to apply for the Specified Skilled Worker visa from Nepal.'},
  {id:3,category:'Schools',title:'Top 5 Japanese Language Schools in Tokyo',thumbnail:'🎬',duration:'8:45',views:'28K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'Our honest review of the top 5 language schools in Tokyo.'},
  {id:4,category:'Life in Japan',title:'First Day in Japan - What to Do',thumbnail:'🎬',duration:'10:15',views:'67K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'Your complete guide to the first day in Japan.'},
  {id:5,category:'Life in Japan',title:'Living in Japan on a Student Budget',thumbnail:'🎬',duration:'9:30',views:'41K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'How to live comfortably in Japan on a tight budget.'},
  {id:6,category:'JLPT',title:'How to Pass JLPT N4 in 6 Months',thumbnail:'🎬',duration:'18:45',views:'89K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'Complete study plan for JLPT N4.'},
  {id:7,category:'Work',title:'Part-time Jobs for International Students in Japan',thumbnail:'🎬',duration:'11:20',views:'35K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'How to find and apply for part-time jobs in Japan.'},
  {id:8,category:'Muslim Life',title:'Muslim Life in Japan - Halal Food Guide',thumbnail:'🎬',duration:'14:10',views:'52K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'Finding halal food, mosques, and Muslim-friendly places in Japan.'},
  {id:9,category:'Housing',title:'Finding an Apartment in Japan as a Foreigner',thumbnail:'🎬',duration:'13:25',views:'29K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'Share houses, guest houses, and apartments in Japan.'},
  {id:10,category:'Scholarship',title:'MEXT Scholarship Application Guide 2025',thumbnail:'🎬',duration:'20:15',views:'44K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'Complete guide to applying for the MEXT scholarship.'},
  {id:11,category:'Culture',title:'Japanese Culture Tips for South Asian Students',thumbnail:'🎬',duration:'7:55',views:'38K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'Essential Japanese culture tips for students from Bangladesh and Nepal.'},
  {id:12,category:'Finance',title:'How to Send Money from Bangladesh to Japan',thumbnail:'🎬',duration:'6:45',views:'23K',channel:'Japan Life Guide',youtubeId:'jNQXAC9IVRw',desc:'Best money transfer services from Bangladesh to Japan.'},
]

const USEFUL_LINKS = [
  {title:'JLPT Official Registration',url:'https://www.jlpt.jp/e/application/index.html',icon:'📝',desc:'Register for official JLPT exam'},
  {title:'Japan Student Visa Guide',url:'https://www.mofa.go.jp/j_info/visit/visa/index.html',icon:'🛂',desc:'Official Japanese Ministry of Foreign Affairs visa information'},
  {title:'MEXT Scholarship',url:'https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm',icon:'🎓',desc:'Japanese Government scholarship official page'},
  {title:'JASSO Scholarship',url:'https://www.jasso.or.jp/en/',icon:'💴',desc:'Japan Student Services Organization'},
  {title:'SSW Visa Information',url:'https://www.moj.go.jp/isa/applications/status/ssw.html',icon:'🏭',desc:'Specified Skilled Worker visa official info'},
  {title:'Japan Immigration Bureau',url:'https://www.moj.go.jp/isa/index.html',icon:'✈️',desc:'Official immigration services portal'},
  {title:'Bangladesh Embassy Tokyo',url:'https://www.bdembassytokyo.org',icon:'🇧🇩',desc:'Bangladesh Embassy in Japan'},
  {title:'Nepal Embassy Tokyo',url:'https://jp.nepalembassy.gov.np',icon:'🇳🇵',desc:'Nepal Embassy in Japan'},
]

export default function VideosPage() {
  const [selected, setSelected] = useState<any>(null)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [activeSection, setActiveSection] = useState('videos')

  const categories = ['All', 'Visa', 'Schools', 'Life in Japan', 'JLPT', 'Work', 'Muslim Life', 'Housing', 'Scholarship', 'Culture', 'Finance']

  const filtered = VIDEOS.filter(v => {
    const matchCategory = category === 'All' || v.category === category
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Video Guides & Resources</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'20px'}}>Watch, learn, and find official resources for your Japan journey</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search videos..." style={{width:'100%',maxWidth:'500px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'10px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none'}}/>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px'}}>
          {['videos','links'].map(s=>(
            <button key={s} onClick={()=>setActiveSection(s)} style={{background:activeSection===s?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'10px 24px',color:'white',fontSize:'13px',fontWeight:'700',cursor:'pointer',textTransform:'capitalize'}}>
              {s === 'videos' ? '🎬 Video Guides' : '🔗 Official Links'}
            </button>
          ))}
        </div>

        {activeSection === 'videos' && (
          <>
            {selected && (
              <div style={{background:'#1A2035',borderRadius:'16px',overflow:'hidden',marginBottom:'28px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{position:'relative',paddingBottom:'56.25%',height:0}}>
                  <iframe
                    src={'https://www.youtube.com/embed/' + selected.youtubeId + '?autoplay=1'}
                    style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div style={{padding:'20px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'12px'}}>
                    <div>
                      <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',marginBottom:'8px',display:'inline-block'}}>{selected.category}</span>
                      <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'4px'}}>{selected.title}</h2>
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'8px'}}>{selected.views} views · {selected.duration}</p>
                      <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{selected.desc}</p>
                    </div>
                    <button onClick={()=>setSelected(null)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'8px 16px',fontSize:'13px',cursor:'pointer',flexShrink:0}}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'20px'}}>
              {categories.map(c=>(
                <button key={c} onClick={()=>setCategory(c)} style={{background:category===c?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                  {c}
                </button>
              ))}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'16px'}}>
              {filtered.map(video=>(
                <div key={video.id} onClick={()=>setSelected(video)} style={{background:'#1A2035',borderRadius:'14px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)',cursor:'pointer',transition:'border-color 0.2s'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
                  <div style={{background:'rgba(196,32,32,0.1)',height:'160px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                    <div style={{fontSize:'48px'}}>{video.thumbnail}</div>
                    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'rgba(196,32,32,0.9)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>▶</div>
                    </div>
                    <div style={{position:'absolute',bottom:'8px',right:'8px',background:'rgba(0,0,0,0.8)',color:'white',padding:'2px 6px',borderRadius:'4px',fontSize:'11px',fontWeight:'700'}}>{video.duration}</div>
                  </div>
                  <div style={{padding:'14px'}}>
                    <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',marginBottom:'6px',display:'inline-block'}}>{video.category}</span>
                    <h3 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'6px',lineHeight:'1.4'}}>{video.title}</h3>
                    <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{video.channel}</span>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>· {video.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === 'links' && (
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Official Resources & Links</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>Important official websites for your Japan journey</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'12px'}}>
              {USEFUL_LINKS.map((link,i)=>(
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none',display:'block',transition:'border-color 0.2s'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
                  <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
                    <span style={{fontSize:'28px',flexShrink:0}}>{link.icon}</span>
                    <div>
                      <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{link.title}</h3>
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',lineHeight:'1.5',marginBottom:'8px'}}>{link.desc}</p>
                      <span style={{color:'#4A8EFF',fontSize:'11px'}}>Visit Official Site →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}