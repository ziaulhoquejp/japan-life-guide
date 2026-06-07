'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ComparePage() {
  const [schools, setSchools] = useState<any[]>([])
  const [selected, setSelected] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [region, setRegion] = useState('')

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

  const regions = ['Kanto', 'Kansai', 'Kyushu', 'Hokkaido', 'Tohoku', 'Chubu', 'Okinawa']

  const filtered = schools.filter(s => {
    const matchSearch = s.name_en.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase())
    const matchRegion = !region || s.region === region
    return matchSearch && matchRegion
  })

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Compare Schools</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Select up to 3 schools to compare side by side</p>
        <p style={{color:'#C42020',fontSize:'14px',marginTop:'8px',fontWeight:'600'}}>{selected.length}/3 schools selected</p>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 20px'}}>
        {selected.length > 0 && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)',overflowX:'auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700'}}>Comparison Results</h2>
              <button onClick={()=>setSelected([])} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',padding:'8px 16px',borderRadius:'6px',fontSize:'13px',cursor:'pointer'}}>
                Clear All
              </button>
            </div>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'500px'}}>
              <thead>
                <tr>
                  <th style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',padding:'10px',textAlign:'left',borderBottom:'1px solid rgba(255,255,255,0.08)',width:'150px'}}>Feature</th>
                  {selected.map(s=>(
                    <th key={s.id} style={{color:'white',fontSize:'13px',padding:'10px',textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                      <div style={{fontSize:'28px',marginBottom:'6px'}}>{s.icon}</div>
                      <div style={{fontWeight:'700',marginBottom:'2px'}}>{s.name_en}</div>
                      <div style={{color:'#C42020',fontSize:'11px',fontWeight:'400',marginBottom:'4px'}}>{s.city}</div>
                      <div style={{display:'flex',gap:'4px',justifyContent:'center',flexWrap:'wrap'}}>
                        {s.has_dorm && <span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'2px 6px',borderRadius:'4px',fontSize:'10px'}}>Dorm</span>}
                        {s.jlpt_prep && <span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'2px 6px',borderRadius:'4px',fontSize:'10px'}}>JLPT</span>}
                        {s.scholarship && <span style={{background:'rgba(240,168,48,0.1)',color:'#F0A830',padding:'2px 6px',borderRadius:'4px',fontSize:'10px'}}>Scholar</span>}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {label:'Annual Fee',key:'annual_fee_jpy',format:(v:any)=>'¥' + v.toLocaleString(),best:'low'},
                  {label:'Monthly Fee',key:'annual_fee_jpy',format:(v:any)=>'¥' + Math.round(v/12).toLocaleString(),best:'low'},
                  {label:'Rating',key:'rating',format:(v:any)=>v + ' ⭐',best:'high'},
                  {label:'Region',key:'region',format:(v:any)=>v,best:'none'},
                  {label:'City',key:'city',format:(v:any)=>v,best:'none'},
                  {label:'Dormitory',key:'has_dorm',format:(v:any)=>v?'✓ Yes':'✗ No',best:'true'},
                  {label:'JLPT Prep',key:'jlpt_prep',format:(v:any)=>v?'✓ Yes':'✗ No',best:'true'},
                  {label:'Scholarship',key:'scholarship',format:(v:any)=>v?'✓ Yes':'✗ No',best:'true'},
                ].map(row=>(
                  <tr key={row.label}>
                    <td style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',padding:'12px 10px',borderBottom:'1px solid rgba(255,255,255,0.06)',fontWeight:'600'}}>{row.label}</td>
                    {selected.map(s=>{
                      const val = s[row.key]
                      const isBoolean = row.key==='has_dorm'||row.key==='jlpt_prep'||row.key==='scholarship'
                      const isBest = row.best === 'high' ? val === Math.max(...selected.map((x:any)=>x[row.key])) :
                                     row.best === 'low' ? val === Math.min(...selected.map((x:any)=>x[row.key])) :
                                     row.best === 'true' ? val === true : false
                      const cellColor = isBoolean ? (val?'#2EC87A':'rgba(255,255,255,0.3)') : isBest ? '#2EC87A' : 'white'
                      return (
                        <td key={s.id} style={{fontSize:'13px',padding:'12px 10px',textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.06)',color:cellColor,fontWeight:isBest?'700':'400',background:isBest?'rgba(46,200,122,0.05)':'transparent'}}>
                          {row.format(val)}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{display:'flex',gap:'10px',marginTop:'20px',flexWrap:'wrap'}}>
              {selected.map(s=>(
                <div key={s.id} style={{display:'flex',gap:'8px',flex:1,minWidth:'150px'}}>
                  <a href={'/schools/' + s.id} style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 16px',borderRadius:'6px',fontSize:'13px',fontWeight:'700',flex:1,textAlign:'center'}}>
                    View {s.name_en.split(' ')[0]}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{display:'flex',gap:'10px',marginBottom:'16px',flexWrap:'wrap'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search schools to compare..." style={{flex:1,minWidth:'200px',background:'#1A2035',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none'}}/>
          <select value={region} onChange={e=>setRegion(e.target.value)} style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
            <option value="">All Regions</option>
            {regions.map(r=><option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',marginBottom:'16px'}}>{filtered.length} schools available</p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',gap:'12px'}}>
          {filtered.map(school=>{
            const isSelected = selected.find(s=>s.id===school.id)
            const isDisabled = selected.length>=3&&!isSelected
            return (
              <div key={school.id} onClick={()=>!isDisabled&&toggleSchool(school)} style={{background:isSelected?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (isSelected?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'16px',cursor:isDisabled?'not-allowed':'pointer',opacity:isDisabled?0.4:1,transition:'all 0.2s'}}>
                <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'10px'}}>
                  <div style={{fontSize:'28px'}}>{school.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'700'}}>{school.name_en}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{school.city} · {school.region}</div>
                  </div>
                  {isSelected && <div style={{color:'#C42020',fontSize:'18px',flexShrink:0}}>✓</div>}
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginBottom:'8px'}}>
                  <span style={{color:'#F0A830'}}>¥{school.annual_fee_jpy.toLocaleString()}</span>
                  <span style={{color:'#F0A830'}}>⭐ {school.rating}</span>
                </div>
                <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
                  {school.has_dorm && <span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'2px 6px',borderRadius:'4px',fontSize:'10px'}}>Dorm</span>}
                  {school.jlpt_prep && <span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'2px 6px',borderRadius:'4px',fontSize:'10px'}}>JLPT</span>}
                  {school.scholarship && <span style={{background:'rgba(240,168,48,0.1)',color:'#F0A830',padding:'2px 6px',borderRadius:'4px',fontSize:'10px'}}>Scholar</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}