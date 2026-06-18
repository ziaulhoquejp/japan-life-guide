'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [maxFee, setMaxFee] = useState('')
  const [dorm, setDorm] = useState(false)
  const [jlpt, setJlpt] = useState(false)
  const [scholar, setScholar] = useState(false)
  const [sortBy, setSortBy] = useState('rating')
  const [favorites, setFavorites] = useState<string[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [view, setView] = useState<'grid'|'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function init() {
      const { data: userData } = await supabase.auth.getUser()
      if (userData.user) {
        setUserId(userData.user.id)
        const { data: favData } = await supabase.from('favorites').select('school_id').eq('user_id', userData.user.id)
        if (favData) setFavorites(favData.map((f:any) => f.school_id))
      }
      const { data } = await supabase.from('schools').select('*').order('rating', { ascending: false })
      if (data) { setSchools(data); setFiltered(data) }
      setLoading(false)
    }
    init()
  }, [])

  useEffect(() => {
    let result = schools
    if (search) result = result.filter((s:any) => s.name_en.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase()) || s.name_jp.includes(search))
    if (city) result = result.filter((s:any) => s.city.includes(city))
    if (region) result = result.filter((s:any) => s.region === region)
    if (maxFee) result = result.filter((s:any) => s.annual_fee_jpy <= parseInt(maxFee))
    if (dorm) result = result.filter((s:any) => s.has_dorm)
    if (jlpt) result = result.filter((s:any) => s.jlpt_prep)
    if (scholar) result = result.filter((s:any) => s.scholarship)
    if (sortBy === 'rating') result = [...result].sort((a,b) => b.rating - a.rating)
    if (sortBy === 'fee_low') result = [...result].sort((a,b) => a.annual_fee_jpy - b.annual_fee_jpy)
    if (sortBy === 'fee_high') result = [...result].sort((a,b) => b.annual_fee_jpy - a.annual_fee_jpy)
    if (sortBy === 'name') result = [...result].sort((a,b) => a.name_en.localeCompare(b.name_en))
    setFiltered(result)
  }, [search, city, region, maxFee, dorm, jlpt, scholar, sortBy, schools])

  async function toggleFavorite(e: React.MouseEvent, schoolId: string) {
    e.preventDefault()
    if (!userId) { window.location.href = '/login'; return }
    if (favorites.includes(schoolId)) {
      await supabase.from('favorites').delete().eq('user_id', userId).eq('school_id', schoolId)
      setFavorites(prev => prev.filter(id => id !== schoolId))
    } else {
      await supabase.from('favorites').insert({ user_id: userId, school_id: schoolId })
      setFavorites(prev => [...prev, schoolId])
    }
  }

  function resetFilters() {
    setSearch(''); setCity(''); setRegion(''); setMaxFee('')
    setDorm(false); setJlpt(false); setScholar(false); setSortBy('rating')
  }

  const regions = ['Kanto', 'Kansai', 'Kyushu', 'Hokkaido', 'Tohoku', 'Chubu', 'Chugoku', 'Shikoku', 'Okinawa']
  const cities = ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo', 'Fukuoka', 'Nagoya', 'Yokohama', 'Sendai', 'Hiroshima', 'Naha']

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 40px',borderBottom:'3px solid #C42020'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px',marginBottom:'16px'}}>
          <div>
            <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'4px'}}>Language Schools</h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>{filtered.length} of {schools.length} schools</p>
            <div style={{background:'rgba(240,168,48,0.1)',border:'1px solid rgba(240,168,48,0.2)',borderRadius:'8px',padding:'10px 16px',marginTop:'8px',display:'inline-flex',gap:'8px',alignItems:'center'}}>
  <span>⚠️</span>
  <p style={{color:'#F0A830',fontSize:'12px',margin:0}}>School data is for reference only. Always verify directly with schools before applying.</p>
</div>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button onClick={()=>setView('grid')} style={{background:view==='grid'?'#C42020':'rgba(255,255,255,0.08)',border:'none',borderRadius:'8px',padding:'8px 14px',color:'white',fontSize:'13px',cursor:'pointer'}}>Grid</button>
            <button onClick={()=>setView('list')} style={{background:view==='list'?'#C42020':'rgba(255,255,255,0.08)',border:'none',borderRadius:'8px',padding:'8px 14px',color:'white',fontSize:'13px',cursor:'pointer'}}>List</button>
            <button onClick={()=>setShowFilters(!showFilters)} style={{background:showFilters?'rgba(196,32,32,0.2)':'rgba(255,255,255,0.08)',border:'1px solid ' + (showFilters?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'8px 14px',color:showFilters?'#FF8070':'white',fontSize:'13px',cursor:'pointer'}}>
              Filters {showFilters?'▲':'▼'}
            </button>
          </div>
        </div>

        <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search schools, cities..." style={{flex:1,minWidth:'200px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
            <option value="rating">Sort: Best Rating</option>
            <option value="fee_low">Sort: Lowest Fee</option>
            <option value="fee_high">Sort: Highest Fee</option>
            <option value="name">Sort: Name A-Z</option>
          </select>
          {(search||city||region||maxFee||dorm||jlpt||scholar) && (
            <button onClick={resetFilters} style={{background:'rgba(196,32,32,0.2)',border:'1px solid #C42020',borderRadius:'8px',padding:'10px 16px',color:'#FF8070',fontSize:'13px',cursor:'pointer',fontWeight:'600'}}>
              Clear All
            </button>
          )}
        </div>

        {showFilters && (
          <div style={{marginTop:'16px',padding:'16px',background:'rgba(255,255,255,0.04)',borderRadius:'10px',display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
            <select value={region} onChange={e=>setRegion(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
              <option value="">All Regions</option>
              {regions.map(r=><option key={r} value={r}>{r}</option>)}
            </select>
            <select value={city} onChange={e=>setCity(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
              <option value="">All Cities</option>
              {cities.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <select value={maxFee} onChange={e=>setMaxFee(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
              <option value="">Any Budget</option>
              <option value="400000">Under ¥400,000</option>
              <option value="500000">Under ¥500,000</option>
              <option value="600000">Under ¥600,000</option>
              <option value="700000">Under ¥700,000</option>
              <option value="800000">Under ¥800,000</option>
            </select>
            {[
              {label:'🛏 Dorm',val:dorm,set:setDorm},
              {label:'📝 JLPT',val:jlpt,set:setJlpt},
              {label:'🎓 Scholarship',val:scholar,set:setScholar},
            ].map(f=>(
              <button key={f.label} onClick={()=>f.set(!f.val)} style={{background:f.val?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (f.val?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'10px 14px',color:f.val?'#FF8070':'rgba(255,255,255,0.6)',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{padding:'24px 40px',maxWidth:'1400px',margin:'0 auto'}}>
        {view === 'grid' ? (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))',gap:'16px'}}>
            {filtered.map((school:any)=>(
              <a key={school.id} href={'/schools/' + school.id} style={{textDecoration:'none'}}>
                <div style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',overflow:'hidden',position:'relative',cursor:'pointer',height:'100%'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
                  <button onClick={e=>toggleFavorite(e,school.id)} style={{position:'absolute',top:'12px',right:'12px',background:'rgba(0,0,0,0.5)',border:'none',borderRadius:'50%',width:'32px',height:'32px',cursor:'pointer',fontSize:'16px',zIndex:1}}>
                    {favorites.includes(school.id) ? '❤️' : '🤍'}
                  </button>
                  <div style={{background:'rgba(196,32,32,0.08)',padding:'28px',textAlign:'center',fontSize:'44px'}}>{school.icon}</div>
                  <div style={{padding:'16px'}}>
                    <h2 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'3px'}}>{school.name_en}</h2>
                    <p style={{color:'#C42020',fontSize:'11px',marginBottom:'6px'}}>{school.name_jp}</p>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'8px'}}>📍 {school.city} · {school.region}</p>
                    <div style={{display:'flex',gap:'5px',flexWrap:'wrap',marginBottom:'10px'}}>
                      {school.has_dorm&&<span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'2px 7px',borderRadius:'4px',fontSize:'10px'}}>🛏 Dorm</span>}
                      {school.jlpt_prep&&<span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'2px 7px',borderRadius:'4px',fontSize:'10px'}}>📝 JLPT</span>}
                      {school.scholarship&&<span style={{background:'rgba(240,168,48,0.1)',color:'#F0A830',padding:'2px 7px',borderRadius:'4px',fontSize:'10px'}}>🎓 Scholar</span>}
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',paddingTop:'10px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                      <span style={{color:'#F0A830',fontFamily:'monospace',fontSize:'12px'}}>¥{school.annual_fee_jpy.toLocaleString()}/yr</span>
                      <span style={{color:'#F0A830',fontSize:'12px'}}>⭐ {school.rating}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {filtered.map((school:any)=>(
              <a key={school.id} href={'/schools/' + school.id} style={{textDecoration:'none'}}>
                <div style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',padding:'16px',display:'flex',gap:'16px',alignItems:'center',cursor:'pointer'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
                  <div style={{fontSize:'36px',flexShrink:0}}>{school.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap',marginBottom:'4px'}}>
                      <h2 style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{school.name_en}</h2>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{school.name_jp}</span>
                    </div>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'6px'}}>📍 {school.city} · {school.region}</p>
                    <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>
                      {school.has_dorm&&<span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'2px 7px',borderRadius:'4px',fontSize:'10px'}}>🛏 Dorm</span>}
                      {school.jlpt_prep&&<span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'2px 7px',borderRadius:'4px',fontSize:'10px'}}>📝 JLPT</span>}
                      {school.scholarship&&<span style={{background:'rgba(240,168,48,0.1)',color:'#F0A830',padding:'2px 7px',borderRadius:'4px',fontSize:'10px'}}>🎓 Scholar</span>}
                    </div>
                  </div>
                  <div style={{textAlign:'right',flexShrink:0}}>
                    <div style={{color:'#F0A830',fontSize:'14px',fontWeight:'700',fontFamily:'monospace'}}>¥{school.annual_fee_jpy.toLocaleString()}</div>
                    <div style={{color:'#F0A830',fontSize:'12px',marginBottom:'8px'}}>⭐ {school.rating}</div>
                    <button onClick={e=>toggleFavorite(e,school.id)} style={{background:'rgba(0,0,0,0.3)',border:'none',borderRadius:'6px',padding:'4px 8px',cursor:'pointer',fontSize:'14px'}}>
                      {favorites.includes(school.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'60px 20px'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🔍</div>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>No schools found</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>Try adjusting your filters</p>
            <button onClick={resetFilters} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}