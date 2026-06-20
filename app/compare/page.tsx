'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ComparePage() {
  const [schools, setSchools] = useState<any[]>([])
  const [selected, setSelected] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (userData.user) {
        const { data: profile } = await supabase.from('profiles').select('plan').eq('id', userData.user.id).single()
        setIsPro(profile?.plan === 'pro' || profile?.plan === 'lifetime')
      }
      const { data } = await supabase.from('schools').select('*').order('rating', { ascending: false })
      if (data) setSchools(data)
      setLoading(false)
    }
    load()
  }, [])

  const maxSchools = isPro ? 4 : 2

  function addSchool(school: any) {
    if (selected.length >= maxSchools) return
    if (selected.find(s => s.id === school.id)) return
    setSelected(prev => [...prev, school])
    setShowPicker(false)
    setSearch('')
  }

  function removeSchool(id: string) {
    setSelected(prev => prev.filter(s => s.id !== id))
  }

  const filtered = schools.filter(s =>
    s.name_en?.toLowerCase().includes(search.toLowerCase()) &&
    !selected.find(sel => sel.id === s.id)
  ).slice(0, 8)

  const compareFields = [
    { key: 'city', label: 'Location', icon: '📍' },
    { key: 'annual_fee_jpy', label: 'Annual Fee', icon: '💴', format: (v:any) => v ? '¥' + v.toLocaleString() : 'N/A' },
    { key: 'rating', label: 'Rating', icon: '⭐', format: (v:any) => v ? v + ' / 5.0' : 'N/A' },
    { key: 'has_dorm', label: 'Dormitory', icon: '🏠', format: (v:any) => v ? '✅ Available' : '❌ Not Available' },
    { key: 'jlpt_prep', label: 'JLPT Prep', icon: '📝', format: (v:any) => v ? '✅ Yes' : '❌ No' },
    { key: 'scholarship', label: 'Scholarship', icon: '🎓', format: (v:any) => v ? '✅ Available' : '❌ Not Available' },
    { key: 'data_verified', label: 'Data Verified', icon: '✅', format: (v:any) => v ? '✅ Verified' : '⚠️ Unverified' },
  ]

  function findBestValue(field: string) {
    if (selected.length < 2) return null
    if (field === 'annual_fee_jpy') {
      const min = Math.min(...selected.map(s => s[field] || Infinity))
      return selected.find(s => s[field] === min)?.id
    }
    if (field === 'rating') {
      const max = Math.max(...selected.map(s => s[field] || 0))
      return selected.find(s => s[field] === max)?.id
    }
    return null
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Compare Schools</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>
          Compare up to {maxSchools} schools side by side {!isPro && '(Pro members can compare up to 4)'}
        </p>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Selected School Slots */}
        <div style={{display:'grid',gridTemplateColumns:`repeat(${maxSchools}, 1fr)`,gap:'12px',marginBottom:'24px'}}>
          {Array.from({length: maxSchools}).map((_, i) => {
            const school = selected[i]
            return (
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)',minHeight:'140px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative'}}>
                {school ? (
                  <>
                    <button onClick={()=>removeSchool(school.id)} style={{position:'absolute',top:'8px',right:'8px',background:'rgba(196,32,32,0.2)',border:'none',borderRadius:'50%',width:'22px',height:'22px',color:'#FF8070',cursor:'pointer',fontSize:'12px'}}>✕</button>
                    <span style={{fontSize:'32px',marginBottom:'8px'}}>{school.icon || '🏫'}</span>
                    <p style={{color:'white',fontSize:'12px',fontWeight:'700',textAlign:'center'}}>{school.name_en}</p>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{school.city}</p>
                  </>
                ) : (
                  <button onClick={()=>setShowPicker(true)} style={{background:'none',border:'2px dashed rgba(255,255,255,0.2)',borderRadius:'8px',padding:'20px',color:'rgba(255,255,255,0.4)',cursor:'pointer',width:'100%',height:'100%'}}>
                    <div style={{fontSize:'24px',marginBottom:'4px'}}>+</div>
                    <div style={{fontSize:'12px'}}>Add School</div>
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* School Picker */}
        {showPicker && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginBottom:'24px',border:'1px solid rgba(196,32,32,0.3)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
              <h3 style={{color:'white',fontSize:'14px',fontWeight:'700'}}>Select a School</h3>
              <button onClick={()=>setShowPicker(false)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer'}}>✕</button>
            </div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search schools by name..." autoFocus style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none',marginBottom:'12px'}}/>
            <div style={{display:'flex',flexDirection:'column',gap:'6px',maxHeight:'300px',overflowY:'auto'}}>
              {filtered.map(school => (
                <button key={school.id} onClick={()=>addSchool(school)} style={{background:'#0D0907',border:'none',borderRadius:'8px',padding:'12px',display:'flex',gap:'10px',alignItems:'center',cursor:'pointer',textAlign:'left'}}>
                  <span style={{fontSize:'24px'}}>{school.icon || '🏫'}</span>
                  <div>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{school.name_en}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{school.city} · ⭐ {school.rating}</div>
                  </div>
                </button>
              ))}
              {search && filtered.length === 0 && (
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textAlign:'center',padding:'12px'}}>No schools found</p>
              )}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selected.length >= 2 ? (
          <div style={{background:'#1A2035',borderRadius:'12px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <tbody>
                  {compareFields.map((field, fi) => {
                    const bestId = findBestValue(field.key)
                    return (
                      <tr key={field.key} style={{borderBottom: fi < compareFields.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'}}>
                        <td style={{padding:'14px 16px',color:'rgba(255,255,255,0.5)',fontSize:'12px',fontWeight:'600',whiteSpace:'nowrap',background:'#0D0907'}}>
                          {field.icon} {field.label}
                        </td>
                        {selected.map(school => (
                          <td key={school.id} style={{padding:'14px 16px',color: bestId === school.id ? '#2EC87A' : 'white',fontSize:'13px',fontWeight: bestId === school.id ? '700' : '400',textAlign:'center'}}>
                            {field.format ? field.format(school[field.key]) : (school[field.key] || 'N/A')}
                            {bestId === school.id && ' 🏆'}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                  <tr>
                    <td style={{padding:'14px 16px',background:'#0D0907'}}></td>
                    {selected.map(school => (
                      <td key={school.id} style={{padding:'14px 16px',textAlign:'center'}}>
                        <a href={'/schools/' + school.id} style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'700',display:'inline-block'}}>
                          View Details
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{textAlign:'center',padding:'48px',background:'#1A2035',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🔄</div>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Add at least 2 schools to start comparing</p>
          </div>
        )}

        {!isPro && (
          <div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.15),rgba(139,0,0,0.15))',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
            <p style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>💎 Upgrade to Pro</p>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Compare up to 4 schools at once with Pro membership</p>
            <a href="/pricing" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 20px',borderRadius:'8px',fontSize:'12px',fontWeight:'700'}}>Upgrade Now</a>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need help choosing between schools?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}