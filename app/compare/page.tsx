'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ComparePage() {
  const [schools, setSchools] = useState<any[]>([])
  const [selected, setSelected] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('schools').select('*').order('rating', { ascending: false }).then(({ data }) => {
      if (data) setSchools(data)
      setLoading(false)
    })
  }, [])

  function toggleSchool(school: any) {
    if (selected.find(s => s.id === school.id)) {
      setSelected(prev => prev.filter(s => s.id !== school.id))
    } else if (selected.length < 3) {
      setSelected(prev => [...prev, school])
    }
  }

  const filtered = schools.filter(s => s.name_en.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase()))

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Compare Schools</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Select up to 3 schools to compare side by side</p>
        <p style={{color:'#C42020',fontSize:'14px',marginTop:'8px'}}>{selected.length}/3 schools selected</p>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>
        {selected.length > 0 && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)',overflowX:'auto'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'20px'}}>Comparison</h2>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'500px'}}>
              <thead>
                <tr>
                  <th style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',padding:'10px',textAlign:'left',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>Feature</th>
                  {selected.map(s=>(
                    <th key={s.id} style={{color:'white',fontSize:'13px',padding:'10px',textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                      <div style={{fontSize:'24px',marginBottom:'4px'}}>{s.icon}</div>
                      <div style={{fontWeight:'700'}}>{s.name_en}</div>
                      <div style={{color:'#C42020',fontSize:'11px',fontWeight:'400'}}>{s.city}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {label:'Annual Fee',key:'annual_fee_jpy',format:(v:any)=>'Yen ' + v.toLocaleString()},
                  {label:'Rating',key:'rating',format:(v:any)=>v + ' stars'},
                  {label:'Region',key:'region',format:(v:any)=>v},
                  {label:'Dormitory',key:'has_dorm',format:(v:any)=>v?'Yes':'No'},
                  {label:'JLPT Prep',key:'jlpt_prep',format:(v:any)=>v?'Yes':'No'},
                  {label:'Scholarship',key:'scholarship',format:(v:any)=>v?'Yes':'No'},
                ].map(row=>(
                  <tr key={row.label}>
                    <td style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',padding:'12px 10px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>{row.label}</td>
                    {selected.map(s=>(
                      <td key={s.id} style={{color:'white',fontSize:'13px',padding:'12px 10px',textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.06)',color:row.key==='has_dorm'||row.key==='jlpt_prep'||row.key==='scholarship'?(s[row.key]?'#2EC87A':'rgba(255,255,255,0.3)'):'white'}}>
                        {row.format(s[row.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{display:'flex',gap:'10px',marginTop:'16px',flexWrap:'wrap'}}>
              {selected.map(s=>(
                <a key={s.id} href={'/schools/' + s.id} style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'6px',fontSize:'13px',fontWeight:'700'}}>
                  Apply to {s.name_en.split(' ')[0]}
                </a>
              ))}
              <button onClick={()=>setSelected([])} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',padding:'8px 16px',borderRadius:'6px',fontSize:'13px',cursor:'pointer'}}>
                Clear All
              </button>
            </div>
          </div>
        )}

        <div style={{marginBottom:'16px'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search schools to compare..." style={{width:'100%',background:'#1A2035',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none'}}/>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',gap:'12px'}}>
          {filtered.map(school=>{
            const isSelected = selected.find(s=>s.id===school.id)
            return (
              <div key={school.id} onClick={()=>toggleSchool(school)} style={{background:isSelected?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (isSelected?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'16px',cursor:'pointer',transition:'all 0.2s',opacity:selected.length>=3&&!isSelected?0.5:1}}>
                <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'10px'}}>
                  <div style={{fontSize:'28px'}}>{school.icon}</div>
                  <div>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'700'}}>{school.name_en}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{school.city}</div>
                  </div>
                  {isSelected && <div style={{marginLeft:'auto',color:'#C42020',fontSize:'18px'}}>✓</div>}
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px'}}>
                  <span style={{color:'#F0A830'}}>Yen {school.annual_fee_jpy.toLocaleString()}</span>
                  <span style={{color:'#F0A830'}}>{school.rating} stars</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}