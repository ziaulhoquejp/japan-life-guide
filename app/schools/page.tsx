'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useParams } from 'next/navigation'

export default function SchoolDetailPage() {
  const params = useParams()
  const [school, setSchool] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getSchool() {
      const { data } = await supabase.from('schools').select('*').eq('id', params.id).single()
      if (data) setSchool(data)
      setLoading(false)
    }
    getSchool()
  }, [params.id])

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>🌸 Loading...</div>

  if (!school) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>School not found</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <a href="/schools" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none',fontSize:'13px',marginBottom:'16px',display:'block'}}>← Back to Schools</a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',flexWrap:'wrap'}}>
          <div style={{fontSize:'64px'}}>{school.icon}</div>
          <div>
            <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'4px'}}>{school.name_en}</h1>
            <p style={{color:'#C42020',fontSize:'16px',letterSpacing:'2px',marginBottom:'8px'}}>{school.name_jp}</p>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>📍 {school.city} · {school.region}</p>
          </div>
        </div>
      </div>
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'40px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))',gap:'14px',marginBottom:'32px'}}>
          {[
            {label:'Annual Fee',value:'¥' + school.annual_fee_jpy.toLocaleString(),color:'#F0A830'},
            {label:'Rating',value:'⭐ ' + school.rating,color:'#F0A830'},
            {label:'Region',value:school.region,color:'#4A8EFF'},
            {label:'Status',value:school.status,color:'#2EC87A'},
          ].map(stat=>(
            <div key={stat.label} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{color:stat.color,fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Features</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
            {[
              {icon:'🛏',label:'Dormitory',val:school.has_dorm},
              {icon:'📝',label:'JLPT Prep',val:school.jlpt_prep},
              {icon:'🎓',label:'Scholarship',val:school.scholarship},
              {icon:'✅',label:'MEXT Accredited',val:true},
            ].map(f=>(
              <div key=