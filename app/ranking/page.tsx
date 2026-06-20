'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const CATEGORIES = [
  {key:'rating', label:'Top Rated', icon:'⭐', desc:'Highest rated by students', color:'#F0A830'},
  {key:'affordable', label:'Most Affordable', icon:'💰', desc:'Best value for money', color:'#2EC87A'},
  {key:'dorm', label:'Best Dormitories', icon:'🏠', desc:'Schools with dormitory housing', color:'#4A8EFF'},
  {key:'scholarship', label:'Scholarship Available', icon:'🎓', desc:'Schools offering scholarships', color:'#A855F7'},
  {key:'jlpt', label:'Best JLPT Prep', icon:'📝', desc:'Strong JLPT preparation programs', color:'#FF8070'},
  {key:'verified', label:'Verified Schools', icon:'✅', desc:'Schools with verified data', color:'#2EC87A'},
  {key:'tokyo', label:'Top in Tokyo', icon:'🗼', desc:'Best schools in Tokyo', color:'#C42020'},
]

export default function RankingPage() {
  const [schools, setSchools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('rating')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('schools').select('*')
      if (data) setSchools(data)
      setLoading(false)
    }
    load()
  }, [])

  function getRankedSchools() {
    let filtered = [...schools]

    switch(activeCategory) {
      case 'rating':
        return filtered.sort((a,b) => (b.rating||0) - (a.rating||0)).slice(0,10)
      case 'affordable':
        return filtered.filter(s => s.annual_fee_jpy).sort((a,b) => a.annual_fee_jpy - b.annual_fee_jpy).slice(0,10)
      case 'dorm':
        return filtered.filter(s => s.has_dorm).sort((a,b) => (b.rating||0) - (a.rating||0)).slice(0,10)
      case 'scholarship':
        return filtered.filter(s => s.scholarship).sort((a,b) => (b.rating||0) - (a.rating||0)).slice(0,10)
      case 'jlpt':
        return filtered.filter(s => s.jlpt_prep).sort((a,b) => (b.rating||0) - (a.rating||0)).slice(0,10)
      case 'verified':
        return filtered.filter(s => s.data_verified).sort((a,b) => (b.rating||0) - (a.rating||0)).slice(0,10)
      case 'tokyo':
        return filtered.filter(s => s.city === 'Tokyo').sort((a,b) => (b.rating||0) - (a.rating||0)).slice(0,10)
      default:
        return filtered.slice(0,10)
    }
  }

  const ranked = getRankedSchools()
  const category = CATEGORIES.find(c => c.key === activeCategory)

  function getMedal(index: number) {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return null
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>School Rankings</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Top Japanese language schools by category</p>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Category Selector */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:'10px',marginBottom:'28px'}}>
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={()=>setActiveCategory(cat.key)} style={{background: activeCategory===cat.key ? cat.color+'20' : '#1A2035',border: '2px solid ' + (activeCategory===cat.key ? cat.color : 'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'14px',cursor:'pointer',textAlign:'center'}}>
              <div style={{fontSize:'24px',marginBottom:'6px'}}>{cat.icon}</div>
              <div style={{color: activeCategory===cat.key ? cat.color : 'white',fontSize:'12px',fontWeight:'700'}}>{cat.label}</div>
            </button>
          ))}
        </div>

        {category && (
          <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'20px'}}>
            <span style={{fontSize:'28px'}}>{category.icon}</span>
            <div>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700'}}>{category.label}</h2>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>{category.desc}</p>
            </div>
          </div>
        )}

        {/* Rankings List */}
        {ranked.length === 0 ? (
          <div style={{textAlign:'center',padding:'48px',background:'#1A2035',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No schools found in this category yet</p>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {ranked.map((school, i) => {
              const medal = getMedal(i)
              return (
                <a key={school.id} href={'/schools/' + school.id} style={{background: i<3 ? '#1A2035' : '#1A2035',borderRadius:'12px',padding:'16px',display:'flex',gap:'16px',alignItems:'center',textDecoration:'none',border: '1px solid ' + (i<3 ? (category?.color+'40') : 'rgba(255,255,255,0.08)')}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor=category?.color+'80' || 'rgba(196,32,32,0.4)')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor= i<3 ? (category?.color+'40') : 'rgba(255,255,255,0.08)')}>
                  <div style={{width:'36px',textAlign:'center',flexShrink:0}}>
                    {medal ? <span style={{fontSize:'28px'}}>{medal}</span> : <span style={{color:'rgba(255,255,255,0.3)',fontSize:'18px',fontWeight:'700'}}>{i+1}</span>}
                  </div>
                  <span style={{fontSize:'32px',flexShrink:0}}>{school.icon || '🏫'}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{school.name_en}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{school.city}</div>
                  </div>
                  <div style={{textAlign:'right',flexShrink:0}}>
                    {activeCategory === 'affordable' ? (
                      <div style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700'}}>¥{school.annual_fee_jpy?.toLocaleString()}</div>
                    ) : (
                      <div style={{color:'#F0A830',fontSize:'14px',fontWeight:'700'}}>⭐ {school.rating}</div>
                    )}
                    {school.data_verified && <div style={{color:'#2EC87A',fontSize:'10px'}}>✓ Verified</div>}
                  </div>
                </a>
              )
            })}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Want to see all 724 schools?</p>
          <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Browse All Schools</a>
        </div>
      </div>
    </main>
  )
}