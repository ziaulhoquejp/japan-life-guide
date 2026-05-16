'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [dorm, setDorm] = useState(false)
  const [jlpt, setJlpt] = useState(false)
  const [scholar, setScholar] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [userId, setUserId] = useState<string | null>(null)

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
    if (search) result = result.filter((s:any) => s.name_en.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase()))
    if (city) result = result.filter((s:any) => s.city.includes(city))
    if (dorm) result = result.filter((s:any) => s.has_dorm)
    if (jlpt) result = result.filter((s:any) => s.jlpt_prep)
    if (scholar) result = result.filter((s:any) => s.scholarship)
    setFiltered(result)
  }, [search, city, dorm, jlpt, scholar, schools])

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

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 40px',borderBottom:'3px solid #C42020'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Language Schools</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>{filtered.length} schools found</p>
      </div>
      <div style={{background:'#141E35',padding:'16px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search schools..." style={{flex:1,minWidth:'200px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
        <select value={city} onChange={e=>setCity(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
          <option value="">All Cities</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Osaka">Osaka</option>
          <option value="Kyoto">Kyoto</option>
          <option value="Sapporo">Sapporo</option>
          <option value="Fukuoka">Fukuoka</option>
          <option value="Nagoya">Nagoya</option>
        </select>
        {[{label:'Dorm',val:dorm,set:setDorm},{label:'JLPT',val:jlpt,set:setJlpt},{label:'Scholarship',val:scholar,set:setScholar}].map(f=>(
          <button key={f.label} onClick={()=>f.set(!f.val)} style={{background:f.val?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (f.val?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'10px 14px',color:f.val?'#FF8070':'rgba(255,255,255,0.6)',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{padding:'24px 40px',display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'16px',maxWidth:'1400px',margin:'0 auto'}}>
        {filtered.map((school:any)=>(
          <a key={school.id} href={'/schools/' + school.id} style={{textDecoration:'none'}}>
            <div style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',overflow:'hidden',position:'relative',cursor:'pointer'}}>
              <button onClick={e=>toggleFavorite(e,school.id)} style={{position:'absolute',top:'12px',right:'12px',background:'rgba(0,0,0,0.5)',border:'none',borderRadius:'50%',width:'32px',height:'32px',cursor:'pointer',fontSize:'16px',zIndex:1}}>
                {favorites.includes(school.id) ? 'fav' : 'unfav'}
              </button>
              <div style={{background:'rgba(196,32,32,0.08)',padding:'28px',textAlign:'center',fontSize:'44px'}}>{school.icon}</div>
              <div style={{padding:'16px'}}>
                <h2 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'3px'}}>{school.name_en}</h2>
                <p style={{color:'#C42020',fontSize:'11px',marginBottom:'6px'}}>{school.name_jp}</p>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'12px'}}>{school.city}</p>
                <div style={{display:'flex',justifyContent:'space-between',paddingTop:'12px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                  <span style={{color:'#F0A830',fontFamily:'monospace',fontSize:'13px'}}>Yen {school.annual_fee_jpy.toLocaleString()}</span>
                  <span style={{color:'#F0A830',fontSize:'13px'}}>{school.rating} stars</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}