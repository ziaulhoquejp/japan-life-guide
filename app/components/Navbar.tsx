'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const SEARCH_ITEMS = [
  {icon:'🏫',label:'Find Language Schools',href:'/schools',category:'Schools',keywords:['school','language','japanese']},
  {icon:'🛂',label:'Student Visa Guide',href:'/visa',category:'Visa',keywords:['visa','student','study']},
  {icon:'🧮',label:'Visa Calculator',href:'/visa-calculator',category:'Visa',keywords:['visa','calculator','eligible']},
  {icon:'💼',label:'Jobs in Japan',href:'/jobs',category:'Jobs',keywords:['job','work','part-time','ssw']},
  {icon:'🎓',label:'Scholarships',href:'/scholarships',category:'Scholarships',keywords:['scholarship','mext','money']},
  {icon:'🌸',label:'Sakura AI Chat',href:'/chat',category:'AI',keywords:['ai','chat','sakura','question']},
  {icon:'💬',label:'Community',href:'/community',category:'Community',keywords:['community','forum','students']},
  {icon:'🏠',label:'Housing Guide',href:'/housing',category:'Life',keywords:['housing','apartment','share']},
  {icon:'💰',label:'Cost Calculator',href:'/cost-calculator',category:'Finance',keywords:['cost','money','budget']},
  {icon:'🕌',label:'Halal Guide',href:'/halal',category:'Muslim',keywords:['halal','mosque','muslim','food']},
  {icon:'📝',label:'JLPT Practice Test',href:'/jlpt-test',category:'Study',keywords:['jlpt','test','n5','n4','n3']},
  {icon:'🗾',label:'Prefectures Guide',href:'/prefectures',category:'Guide',keywords:['prefecture','city','tokyo','osaka']},
  {icon:'✈️',label:'Flights to Japan',href:'/flights',category:'Travel',keywords:['flight','airline','biman','nepal']},
  {icon:'💱',label:'Currency Converter',href:'/currency',category:'Finance',keywords:['currency','yen','bdt','npr']},
  {icon:'🆘',label:'Emergency Guide',href:'/emergency',category:'Safety',keywords:['emergency','ambulance','police']},
  {icon:'🏥',label:'Insurance Guide',href:'/insurance',category:'Life',keywords:['insurance','health','medical']},
  {icon:'🏆',label:'School Rankings',href:'/ranking',category:'Schools',keywords:['ranking','best','top']},
  {icon:'🔄',label:'Compare Schools',href:'/compare',category:'Schools',keywords:['compare','difference']},
  {icon:'📅',label:'Deadline Calendar',href:'/calendar',category:'Study',keywords:['calendar','deadline','schedule']},
  {icon:'🌍',label:'Culture Guide',href:'/culture',category:'Guide',keywords:['culture','etiquette','custom']},
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = '/'
  }

  const mainLinks = [
    {href:'/schools',label:'Schools'},
    {href:'/visa',label:'Visa'},
    {href:'/jobs',label:'Jobs'},
    {href:'/scholarships',label:'Scholarships'},
    {href:'/chat',label:'Sakura AI'},
    {href:'/community',label:'Community'},
    {href:'/pricing',label:'Pricing'},
  ]

  const moreLinks = [
    {href:'/ranking',label:'School Ranking'},
    {href:'/visa-calculator',label:'Visa Calculator'},
    {href:'/cost-calculator',label:'Cost Calculator'},
    {href:'/compare',label:'Compare Schools'},
    {href:'/apply',label:'Apply to School'},
    {href:'/applications',label:'My Applications'},
    {href:'/dashboard',label:'Dashboard'},
    {href:'/housing',label:'Housing'},
    {href:'/prefectures',label:'Prefectures'},
    {href:'/cities',label:'City Guide'},
    {href:'/learn-japanese',label:'Learn Japanese'},
    {href:'/jlpt-test',label:'JLPT Test'},
    {href:'/calendar',label:'Deadline Calendar'},
    {href:'/reviews',label:'All Reviews'},
    {href:'/news',label:'News'},
    {href:'/blog',label:'Blog'},
    {href:'/videos',label:'Video Guides'},
    {href:'/faq',label:'FAQ'},
    {href:'/halal',label:'Halal Guide'},
    {href:'/culture',label:'Culture Guide'},
    {href:'/emergency',label:'Emergency'},
    {href:'/currency',label:'Currency'},
    {href:'/flights',label:'Flights'},
    {href:'/insurance',label:'Insurance'},
    {href:'/notifications',label:'Notifications'},
    {href:'/affiliate',label:'Affiliate Program'},
    {href:'/contact',label:'Contact'},
    {href:'/admin',label:'Admin'},
    {href:'/recruit', label:'企業様へ（求人掲載）'},
    {href:'/interview-practice', label:'🎤 Interview Practice'},
  ]

  const filteredSearch = SEARCH_ITEMS.filter(item =>
    searchQuery.length > 0 && (
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((k:string) => k.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  ).slice(0, 6)

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; gap: 8px; align-items: center; }
        .nav-mobile-btn { display: none; background: none; border: none; color: white; font-size: 28px; cursor: pointer; padding: 4px 8px; }
        .nav-search-bar { display: flex; position: relative; align-items: center; }
        @media (max-width: 768px) {
          .nav-desktop { display: none; }
          .nav-mobile-btn { display: block; }
          .nav-search-bar { display: none; }
        }
      `}</style>

      <nav style={{background:'#0D0907',borderBottom:'2px solid #C42020',padding:'0 20px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,gap:'12px'}}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none',flexShrink:0}}>
          <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#C42020',flexShrink:0}}/>
          <span style={{color:'white',fontSize:'15px',fontWeight:'700'}}>Japan Life Guide</span>
        </Link>

        {/* Search Bar */}
        <div className="nav-search-bar">
          <input
            type="text"
            placeholder="🔍 Search..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setShowSearch(e.target.value.length > 0) }}
            onKeyDown={e => {
              if (e.key === 'Enter' && searchQuery) {
                window.location.href = '/schools?search=' + encodeURIComponent(searchQuery)
                setSearchQuery('')
                setShowSearch(false)
              }
              if (e.key === 'Escape') { setSearchQuery(''); setShowSearch(false) }
            }}
            style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'6px 12px',color:'white',fontSize:'12px',outline:'none',width:'180px'}}
          />
          {showSearch && filteredSearch.length > 0 && (
            <div style={{position:'absolute',top:'36px',left:0,background:'#1A2035',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',padding:'8px',minWidth:'280px',zIndex:200,boxShadow:'0 8px 32px rgba(0,0,0,0.4)'}}>
              {filteredSearch.map((item,i) => (
                <a key={i} href={item.href} onClick={() => { setSearchQuery(''); setShowSearch(false) }}
                  style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 12px',borderRadius:'6px',textDecoration:'none',color:'white',fontSize:'13px'}}
                  onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.06)')}
                  onMouseLeave={e=>(e.currentTarget.style.background='none')}>
                  <span style={{fontSize:'18px'}}>{item.icon}</span>
                  <div>
                    <div style={{fontWeight:'600',fontSize:'13px'}}>{item.label}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{item.category}</div>
                  </div>
                </a>
              ))}
              <a href={'/schools?search=' + encodeURIComponent(searchQuery)}
                onClick={() => { setSearchQuery(''); setShowSearch(false) }}
                style={{display:'block',padding:'8px 12px',color:'#C42020',fontSize:'12px',textDecoration:'none',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:'4px',fontWeight:'600'}}>
                Search "{searchQuery}" →
              </a>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="nav-desktop"> {/* Language Switcher */}
<div style={{display:'flex',gap:'4px',marginRight:'4px'}}>
{[
{href:'/',label:'EN',flag:'🇬🇧'},
{href:'/bn',label:'বাং',flag:'🇧🇩'},
{href:'/ne',label:'नेप',flag:'🇳🇵'},
].map(lang => (
<a key={lang.href} href={lang.href} style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'4px 8px',borderRadius:'6px',fontSize:'11px',fontWeight:'600',whiteSpace:'nowrap'}}>
{lang.flag} {lang.label}
</a>
))}
</div>

          {mainLinks.map(l=>(
            <Link key={l.href} href={l.href} style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'11px',fontWeight:'500',whiteSpace:'nowrap'}}>{l.label}</Link>
          ))}
          <div style={{position:'relative'}}>
            <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:'rgba(255,255,255,0.08)',border:'none',borderRadius:'6px',padding:'5px 10px',color:'white',fontSize:'11px',cursor:'pointer',whiteSpace:'nowrap'}}>
              More ▼
            </button>
            {menuOpen && (
              <div style={{position:'absolute',top:'36px',right:0,background:'#1A2035',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',padding:'8px',minWidth:'200px',zIndex:200,maxHeight:'400px',overflowY:'auto'}}>
                {moreLinks.map(l=>(
                  <Link key={l.href} href={l.href} onClick={()=>setMenuOpen(false)} style={{display:'block',color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'12px',padding:'8px 12px',borderRadius:'6px'}}
                    onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.06)')}
                    onMouseLeave={e=>(e.currentTarget.style.background='none')}>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {user ? (
            <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
              <Link href="/dashboard" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',fontSize:'11px',padding:'7px 12px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.15)',whiteSpace:'nowrap'}}>
                👤 {user.user_metadata?.full_name?.split(' ')[0] || 'My Account'}
              </Link>
              <button onClick={handleLogout} style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'7px 12px',fontSize:'11px',cursor:'pointer',whiteSpace:'nowrap'}}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{display:'flex',gap:'6px'}}>
              <Link href="/login" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',fontSize:'11px',padding:'7px 12px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.15)',whiteSpace:'nowrap'}}>
                Login
              </Link>
              <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',fontSize:'11px',fontWeight:'700',padding:'7px 12px',borderRadius:'8px',whiteSpace:'nowrap'}}>
                Join Free
              </Link>
            </div>
          )}
        </div>

        <button className="nav-mobile-btn" onClick={()=>setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {open && (
        <div style={{position:'fixed',top:'60px',left:0,right:0,bottom:0,background:'#0D0907',padding:'16px',display:'flex',flexDirection:'column',gap:'4px',zIndex:99,overflowY:'auto'}}>
          {/* Mobile Search */}
          <div style={{position:'relative',marginBottom:'8px'}}>
            <input
              type="text"
              placeholder="🔍 Search pages..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setShowSearch(e.target.value.length > 0) }}
              onKeyDown={e => {
                if (e.key === 'Enter' && searchQuery) {
                  window.location.href = '/schools?search=' + encodeURIComponent(searchQuery)
                  setOpen(false)
                }
              }}
              style={{width:'100%',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'14px',outline:'none'}}
            />
            {showSearch && filteredSearch.length > 0 && (
              <div style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',padding:'8px',marginTop:'4px'}}>
                {filteredSearch.map((item,i) => (
                  <a key={i} href={item.href} onClick={() => { setSearchQuery(''); setShowSearch(false); setOpen(false) }}
                    style={{display:'flex',gap:'10px',alignItems:'center',padding:'10px 12px',borderRadius:'6px',textDecoration:'none',color:'white',fontSize:'14px'}}>
                    <span style={{fontSize:'20px'}}>{item.icon}</span>
                    <div>
                      <div style={{fontWeight:'600'}}>{item.label}</div>
                      <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{item.category}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
              <Link href="/dashboard" onClick={()=>setOpen(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',fontSize:'14px',fontWeight:'700',padding:'12px',borderRadius:'8px',textAlign:'center',flex:1,border:'1px solid rgba(255,255,255,0.15)'}}>
                👤 My Account
              </Link>
              <button onClick={handleLogout} style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'12px',fontSize:'14px',cursor:'pointer',flex:1}}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
              <Link href="/login" onClick={()=>setOpen(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',fontSize:'14px',fontWeight:'700',padding:'12px',borderRadius:'8px',textAlign:'center',flex:1,border:'1px solid rgba(255,255,255,0.15)'}}>
                Login
              </Link>
              <Link href="/register" onClick={()=>setOpen(false)} style={{background:'#C42020',color:'white',textDecoration:'none',fontSize:'14px',fontWeight:'700',padding:'12px',borderRadius:'8px',textAlign:'center',flex:1}}>
                🌸 Join Free
              </Link>
            </div>
          )}
          {[...mainLinks,...moreLinks].map(l=>(
            <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} style={{color:'white',textDecoration:'none',fontSize:'14px',padding:'12px 8px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'block'}}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}