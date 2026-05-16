'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
  const [school, setSchool] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('schools').select('*').eq('id', params.id).single().then(({ data }) => {
      if (data) setSchool(data)
      setLoading(false)
    })
  }, [params.id])

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>
  if (!school) return <div style={{minHeight:'100vh',background:'#0D0907',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>Not found</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',padding:'40px'}}>
      <a href="/schools" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none',display:'block',marginBottom:'24px'}}>Back to Schools</a>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{school.icon}</div>
      <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>{school.name_en}</h1>
      <p style={{color:'#C42020',fontSize:'14px',marginBottom:'8px'}}>{school.name_jp}</p>
      <p style={{color:'rgba(255,255,255,0.4)',marginBottom:'32px'}}>Location: {school.city}</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:'12px',marginBottom:'32px'}}>
        <div style={{background:'#1A2035',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
          <div style={{color:'#F0A830',fontSize:'18px',fontWeight:'700'}}>Annual Fee</div>
          <div style={{color:'white',fontSize:'16px'}}>Yen {school.annual_fee_jpy.toLocaleString()}</div>
        </div>
        <div style={{background:'#1A2035',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
          <div style={{color:'#F0A830',fontSize:'18px',fontWeight:'700'}}>Rating</div>
          <div style={{color:'white',fontSize:'16px'}}>{school.rating} stars</div>
        </div>
        <div style={{background:'#1A2035',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
          <div style={{color:'#4A8EFF',fontSize:'18px',fontWeight:'700'}}>Region</div>
          <div style={{color:'white',fontSize:'16px'}}>{school.region}</div>
        </div>
      </div>
      <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'32px'}}>
        {school.has_dorm && <span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'6px 12px',borderRadius:'6px',fontSize:'13px'}}>Dormitory Available</span>}
        {school.jlpt_prep && <span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'6px 12px',borderRadius:'6px',fontSize:'13px'}}>JLPT Prep</span>}
        {school.scholarship && <span style={{background:'rgba(240,168,48,0.1)',color:'#F0A830',padding:'6px 12px',borderRadius:'6px',fontSize:'13px'}}>Scholarship</span>}
      </div>
      <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
        <button style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'14px 28px',fontSize:'15px',fontWeight:'700',cursor:'pointer'}}>
          Apply Now
        </button>
        <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'14px 28px',fontSize:'15px',textDecoration:'none'}}>
          Ask Sakura
        </a>
      </div>
    </main>
  )
}