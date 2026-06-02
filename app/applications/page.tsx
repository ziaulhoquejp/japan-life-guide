'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS_COLORS: any = {
  pending: '#F0A830',
  applied: '#4A8EFF',
  accepted: '#2EC87A',
  rejected: '#C42020',
  withdrawn: 'rgba(255,255,255,0.3)',
}

const STATUS_LABELS: any = {
  pending: 'Pending',
  applied: 'Applied',
  accepted: 'Accepted',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn',
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [schools, setSchools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState('')
  const [notes, setNotes] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function getData() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { window.location.href = '/login'; return }
      setUser(userData.user)

      const [appsData, schoolsData] = await Promise.all([
        supabase.from('applications').select('*, schools(name_en, name_jp, city, icon, annual_fee_jpy)').eq('user_id', userData.user.id).order('created_at', { ascending: false }),
        supabase.from('schools').select('id, name_en, city, icon').order('rating', { ascending: false }).limit(50),
      ])
      if (appsData.data) setApplications(appsData.data)
      if (schoolsData.data) setSchools(schoolsData.data)
      setLoading(false)
    }
    getData()
  }, [])

  async function addApplication() {
    if (!selectedSchool) return
    const { data } = await supabase.from('applications').insert({
      user_id: user.id,
      school_id: selectedSchool,
      notes,
      status: 'pending',
    }).select('*, schools(name_en, name_jp, city, icon, annual_fee_jpy)').single()
    if (data) setApplications(prev => [data, ...prev])
    setShowAdd(false)
    setSelectedSchool('')
    setNotes('')
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('applications').update({ status }).eq('id', id)
    setApplications(prev => prev.map(a => a.id === id ? {...a, status} : a))
  }

  async function deleteApplication(id: string) {
    await supabase.from('applications').delete().eq('id', id)
    setApplications(prev => prev.filter(a => a.id !== id))
  }

  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter)

  const stats = {
    total: applications.length,
    pending: applications.filter(a=>a.status==='pending').length,
    applied: applications.filter(a=>a.status==='applied').length,
    accepted: applications.filter(a=>a.status==='accepted').length,
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 40px',borderBottom:'3px solid #C42020',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>My Applications</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Track your school applications</p>
        </div>
        <button onClick={()=>setShowAdd(!showAdd)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
          + Add Application
        </button>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))',gap:'12px',marginBottom:'24px'}}>
          {[
            {label:'Total',value:stats.total,color:'#4A8EFF'},
            {label:'Pending',value:stats.pending,color:'#F0A830'},
            {label:'Applied',value:stats.applied,color:'#4A8EFF'},
            {label:'Accepted',value:stats.accepted,color:'#2EC87A'},
          ].map(stat=>(
            <div key={stat.label} style={{background:'#1A2035',borderRadius:'10px',padding:'16px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{color:stat.color,fontSize:'28px',fontWeight:'700'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {showAdd && (
          <div style={{background:'#1A2035',borderRadius:'14px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(196,32,32,0.3)'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Add New Application</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <select value={selectedSchool} onChange={e=>setSelectedSchool(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                <option value="">Select a school...</option>
                {schools.map(s=>(
                  <option key={s.id} value={s.id}>{s.icon} {s.name_en} - {s.city}</option>
                ))}
              </select>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes (optional)..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'80px'}}/>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={addApplication} disabled={!selectedSchool} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:2}}>
                  Add Application
                </button>
                <button onClick={()=>setShowAdd(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'14px',cursor:'pointer',flex:1}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap'}}>
          {['all','pending','applied','accepted','rejected'].map(s=>(
            <button key={s} onClick={()=>setFilter(s)} style={{background:filter===s?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {s === 'all' ? 'All' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{background:'#1A2035',borderRadius:'14px',padding:'48px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>📝</div>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>No applications yet!</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>Start tracking your school applications</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
              <button onClick={()=>setShowAdd(true)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
                Add Application
              </button>
              <a href="/schools" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>
                Browse Schools
              </a>
            </div>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {filtered.map(app=>(
              <div key={app.id} style={{background:'#1A2035',borderRadius:'14px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{display:'flex',gap:'14px',alignItems:'flex-start',flexWrap:'wrap'}}>
                  <div style={{fontSize:'36px',flexShrink:0}}>{app.schools?.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px',flexWrap:'wrap'}}>
                      <h2 style={{color:'white',fontSize:'15px',fontWeight:'700'}}>{app.schools?.name_en}</h2>
                      <span style={{background:STATUS_COLORS[app.status] + '20',color:STATUS_COLORS[app.status],padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{STATUS_LABELS[app.status]}</span>
                    </div>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'6px'}}>📍 {app.schools?.city}</p>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'8px'}}>Applied: {new Date(app.created_at).toLocaleDateString()}</p>
                    {app.notes && <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'8px'}}>{app.notes}</p>}
                    <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                      {['pending','applied','accepted','rejected','withdrawn'].map(status=>(
                        <button key={status} onClick={()=>updateStatus(app.id, status)} style={{background:app.status===status?STATUS_COLORS[status]:'rgba(255,255,255,0.06)',color:app.status===status?'white':'rgba(255,255,255,0.4)',border:'none',borderRadius:'6px',padding:'4px 10px',fontSize:'11px',cursor:'pointer',fontWeight:'600',textTransform:'capitalize'}}>
                          {STATUS_LABELS[status]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'6px',flexShrink:0}}>
                    <a href={'/schools/' + app.school_id} style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',textDecoration:'none',padding:'6px 12px',borderRadius:'6px',fontSize:'12px',fontWeight:'600',textAlign:'center'}}>View</a>
                    <button onClick={()=>deleteApplication(app.id)} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.3)',border:'none',padding:'6px 12px',borderRadius:'6px',fontSize:'12px',cursor:'pointer'}}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}