'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type School = {
  id: string
  name_en: string
  name_jp: string
  city: string
  region: string
  annual_fee_jpy: number
  has_dorm: boolean
  jlpt_prep: boolean
  scholarship: boolean
  rating: number
  icon: string
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [filtered, setFiltered] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [maxFee, setMaxFee] = useState('')
  const [dorm, setDorm] = useState(false)
  const [jlpt, setJlpt] = useState(false)
  const [scholar, setScholar] = useState(false)

  useEffect(() => {
    async function getSchools() {
      const { data } = await supabase
        .from('schools')
        .select('*')
        .order('rating', { ascending: false })
      if (data) {
        setSchools(data)
        setFiltered(data)
      }
      setLoading(false)
    }
    getSchools()
  }, [])

  useEffect(() => {
    let result = schools
    if (search) result = result.filter(s => s.name_en.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase()))
    if (city) result = result.filter(s => s.city.includes(city))
    if (maxFee) result = result.filter(s => s.annual_fee_jpy <= parseInt(maxFee))
    if (dorm) result = result.filter(s => s.has_dorm)
    if (jlpt) result = result.filter(s => s.jlpt_prep)
    if (scholar) result = result.filter(s => s.scholarship)
    setFiltered(result)
  }, [search, city, maxFee, dorm, jlpt, scholar, schools])

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>
      🌸 Loading schools...
    </div>
  )

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 40px',borderBottom:'3px solid #C42020'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>🏫 Language Schools</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>{filtered.length} schools found</p>
      </div>

      <div style={{background:'#141E35',padding:'16px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search schools..."
          style={{flex:1,minWidth:'200px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}
        />
        <select
          value={city}
          onChange={e => setCity(e.target.value)}
          style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}
        >
          <option value="">All Cities</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Osaka">Osaka</option>
          <option value="Kyoto">Kyoto</option>
          <option value="Sapporo">Sapporo</option>
          <option value="Fukuoka">Fukuoka</option>
          <option value="Nagoya">Nagoya</option>
          <option value="Yokohama">Yokohama</option>
        </select>
        <select
          value={maxFee}
          onChange={e => setMaxFee(e.target.value)}
          style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}
        >
          <option value="">Any Budget</option>
          <option value="500000">Under 500K</option>
          <option value="600000">Under 600K</option>
          <option value="700000">Under 700K</option>
        </select>
        {[
          {label:'🛏 Dorm',val:dorm,set:setDorm},
          {label:'📝 JLPT',val:jlpt,set:setJlpt},
          {label:'🎓 Scholarship',val:scholar,set:setScholar},
        ].map(f => (
          <button
            key={f.label}
            onClick={() => f.set(!f.val)}
            style={{background:f.val?'rgba(196,32,32,0.2)':'#0D0907',border:`1px solid ${f.val?'#C42020':'rgba(255,255,255,0.2)'}`,borderRadius:'8px',padding:'10px 14px',color:f.val?'#FF8070':'rgba(255,255,255,0.6)',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{padding:'24px 40px',display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'16px',maxWidth:'1400px',margin:'0 auto'}}>
        {filtered.map(school => (
          <div key={school.id} style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',overflow:'hidden',transition:'transform 0.2s',cursor:'pointer'}}
            onMouseEnter={e => (e.currentTarget.style.transform='translateY(-4px)')}
            onMouseLeave={e => (e.currentTarget.style.transform='translateY(0)')}>
            <div style={{background:'rgba(196,32,32,0.08)',padding:'28px',textAlign:'center',fontSize:'44px'}}>{school.icon}</div>
            <div style={{padding:'16px'}}>
              <h2 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'3px'}}>{school.name_en}</h2>
              <p style={{color:'#C42020',fontSize:'11px',letterSpacing:'1px',marginBottom:'6px'}}>{school.name_jp}</p>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'12px'}}>📍 {school.city}</p>
              <div style={{display:'flex',gap:'5px',flexWrap:'wrap',marginBottom:'12px'}}>
                {school.has_dorm&&<span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'2px 8px',borderRadius:'4px',fontSize:'10px'}}>🛏 Dorm</span>}
                {school.jlpt_prep&&<span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'2px 8px',borderRadius:'4px',fontSize:'10px'}}>📝 JLPT</span>}
                {school.scholarship&&<span style={{background:'rgba(240,168,48,0.1)',color:'#F0A830',padding:'2px 8px',borderRadius:'4px',fontSize:'10px'}}>🎓 Scholarship</span>}
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'12px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                <span style={{color:'#F0A830',fontFamily:'monospace',fontSize:'13px'}}>¥{school.annual_fee_jpy.toLocaleString()}/yr</span>
                <span style={{color:'#F0A830',fontSize:'13px'}}>⭐ {school.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}