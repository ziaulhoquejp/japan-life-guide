'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function RankingPage() {
  const [schools, setSchools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('overall')

  useEffect(() => {
    supabase.from('schools').select('*').order('rating', { ascending: false }).limit(50).then(({ data }) => {
      if (data) setSchools(data)
      setLoading(false)
    })
  }, [])

  const categories = [
    {key:'overall',label:'Overall Best',icon:'🏆'},
    {key:'tokyo',label:'Best in Tokyo',icon:'🗼'},
    {key:'osaka',label:'Best in Osaka',icon:'🏯'},
    {key:'budget',label:'Best Budget',icon:'💰'},
    {key:'dorm',label:'Best with Dorm',icon:'🛏'},
    {key:'jlpt',label:'Best JLPT Prep',icon:'📝'},
    {key:'scholarship',label:'Best Scholarships',icon:'🎓'},
  ]

  function getRanked() {
    let result = [...schools]
    switch(category) {
      case 'tokyo': result = result.filter(s=>s.city.includes('Tokyo')); break
      case 'osaka': result = result.filter(s=>s.city.includes('Osaka')); break
      case 'budget': result = result.sort((a,b)=>a.annual_fee_jpy-b.annual_fee_jpy); break
      case 'dorm': result = result.filter(s=>s.has_dorm); break
      case 'jlpt': result = result.filter(s=>s.jlpt_prep); break
      case 'scholarship': result = result.filter(s=>s.scholarship); break
      default: result = result.sort((a,b)=>b.rating-a.rating)
    }
    return result.slice(0,20)
  }

  const ranked = getRanked()

  const medalColors = ['#FFD700','#C0C0C0','#CD7F32']
  const medals = ['🥇','🥈','🥉']

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'linear-gradient(135deg,#1A2035,#0D0907)',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'12px'}}>🏆</div>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>School Rankings</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Top Japanese language schools ranked by our community</p>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'28px',justifyContent:'center'}}>
          {categories.map(cat=>(
            <button key={cat.key} onClick={()=>setCategory(cat.key)} style={{background:category===cat.key?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {ranked.map((school,i)=>(
            <a key={school.id} href={'/schools/' + school.id} style={{textDecoration:'none'}}>
              <div style={{background:i<3?'linear-gradient(135deg,#1A2035,#1A2535)':'#1A2035',borderRadius:'14px',padding:'18px',border:'1px solid ' + (i===0?'rgba(255,215,0,0.3)':i===1?'rgba(192,192,192,0.3)':i===2?'rgba(205,127,50,0.3)':'rgba(255,255,255,0.08)'),display:'flex',gap:'16px',alignItems:'center',cursor:'pointer',transition:'all 0.2s'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor=i===0?'rgba(255,215,0,0.3)':i===1?'rgba(192,192,192,0.3)':i===2?'rgba(205,127,50,0.3)':'rgba(255,255,255,0.08)')}>
                <div style={{width:'48px',height:'48px',borderRadius:'50%',background:i<3?medalColors[i]+'20':'rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:i<3?'24px':'18px',fontWeight:'700',color:i<3?medalColors[i]:'rgba(255,255,255,0.4)',flexShrink:0,border:'2px solid ' + (i<3?medalColors[i]:'rgba(255,255,255,0.1)')}}>
                  {i<3?medals[i]:'#' + (i+1)}
                </div>
                <div style={{fontSize:'36px',flexShrink:0}}>{school.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'4px',flexWrap:'wrap'}}>
                    <h2 style={{color:'white',fontSize:'15px',fontWeight:'700'}}>{school.name_en}</h2>
                    {i<3 && <span style={{background:medalColors[i]+'20',color:medalColors[i],padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>TOP {i+1}</span>}
                  </div>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'6px'}}>📍 {school.city} · {school.region}</p>
                  <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                    {school.has_dorm&&<span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'2px 7px',borderRadius:'4px',fontSize:'10px'}}>🛏 Dorm</span>}
                    {school.jlpt_prep&&<span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'2px 7px',borderRadius:'4px',fontSize:'10px'}}>📝 JLPT</span>}
                    {school.scholarship&&<span style={{background:'rgba(240,168,48,0.1)',color:'#F0A830',padding:'2px 7px',borderRadius:'4px',fontSize:'10px'}}>🎓 Scholar</span>}
                  </div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{color:'#F0A830',fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>⭐ {school.rating}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',fontFamily:'monospace'}}>¥{school.annual_fee_jpy.toLocaleString()}</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {ranked.length === 0 && (
          <div style={{textAlign:'center',padding:'48px'}}>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>No schools found in this category</p>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Want personalized school recommendations?</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/compare" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Compare Schools</a>
          </div>
        </div>
      </div>
    </main>
  )
}