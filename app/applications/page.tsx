'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ApplicationsPage() {
  const [user, setUser] = useState<any>(null)
  const [isPro, setIsPro] = useState(false)
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string|null>(null)

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { window.location.href = '/login'; return }
      setUser(userData.user)

      const [profileData, appsData] = await Promise.all([
        supabase.from('profiles').select('plan').eq('id', userData.user.id).single(),
        supabase.from('applications').select('*, schools(name_en, city, icon, annual_fee_jpy, website_url)').eq('user_id', userData.user.id).order('created_at', { ascending: false }),
      ])

      if (profileData.data) setIsPro(profileData.data.plan === 'pro' || profileData.data.plan === 'lifetime')
      if (appsData.data) setApplications(appsData.data)
      setLoading(false)
    }
    load()
  }, [])

  async function withdrawApplication(id: string) {
    if (!confirm('Are you sure you want to withdraw this application?')) return
    await supabase.from('applications').update({ status: 'withdrawn' }).eq('id', id)
    setApplications(prev => prev.map(a => a.id === id ? {...a, status: 'withdrawn'} : a))
  }

  const statusConfig: any = {
    pending: { color: '#F0A830', icon: '⏳', label: 'Pending Review' },
    applied: { color: '#4A8EFF', icon: '📨', label: 'Submitted' },
    accepted: { color: '#2EC87A', icon: '✅', label: 'Accepted' },
    rejected: { color: '#C42020', icon: '❌', label: 'Not Accepted' },
    withdrawn: { color: 'rgba(255,255,255,0.4)', icon: '🚫', label: 'Withdrawn' },
  }

  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter)

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending' || a.status === 'applied').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'16px'}}>
          <div>
            <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>My Applications</h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Track your school application status</p>
          </div>
          <a href="/apply" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'10px',fontSize:'14px',fontWeight:'700'}}>
            + New Application
          </a>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'12px',marginBottom:'24px'}}>
          {[
            {label:'Total Applications',value:stats.total,color:'#4A8EFF'},
            {label:'In Progress',value:stats.pending,color:'#F0A830'},
            {label:'Accepted',value:stats.accepted,color:'#2EC87A'},
          ].map(stat => (
            <div key={stat.label} style={{background:'#1A2035',borderRadius:'10px',padding:'16px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{color:stat.color,fontSize:'24px',fontWeight:'800'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
          {['all','pending','applied','accepted','rejected','withdrawn'].map(f => (
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {f === 'all' ? 'All' : statusConfig[f]?.label || f}
            </button>
          ))}
        </div>

        {!isPro && applications.length >= 1 && (
          <div style={{background:'rgba(240,168,48,0.1)',border:'1px solid rgba(240,168,48,0.2)',borderRadius:'10px',padding:'14px',marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
            <p style={{color:'#F0A830',fontSize:'13px'}}>Free plan: 1 application limit reached</p>
            <a href="/pricing" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'700'}}>Upgrade for Unlimited</a>
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px 20px',background:'#1A2035',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>📝</div>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>No applications yet</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>Start your journey by applying to a Japanese language school</p>
            <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>Browse Schools</a>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {filtered.map(app => {
              const status = statusConfig[app.status] || statusConfig.pending
              const notes = app.notes ? (() => { try { return JSON.parse(app.notes) } catch { return null } })() : null
              const isExpanded = expandedId === app.id

              return (
                <div key={app.id} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid ' + (app.status==='accepted' ? 'rgba(46,200,122,0.3)' : 'rgba(255,255,255,0.08)')}}>
                  <div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'12px',cursor:'pointer'}} onClick={()=>setExpandedId(isExpanded ? null : app.id)}>
                    <span style={{fontSize:'32px'}}>{app.schools?.icon || '🏫'}</span>
                    <div style={{flex:1}}>
                      <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'4px'}}>{app.schools?.name_en}</h3>
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{app.schools?.city} · Applied {new Date(app.created_at).toLocaleDateString()}</p>
                    </div>
                    <span style={{background:status.color+'20',color:status.color,padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',whiteSpace:'nowrap'}}>
                      {status.icon} {status.label}
                    </span>
                  </div>

                  {isExpanded && (
                    <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'14px',marginTop:'4px'}}>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'14px'}}>
                        <div style={{background:'#0D0907',borderRadius:'8px',padding:'10px'}}>
                          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'2px'}}>Annual Fee</p>
                          <p style={{color:'white',fontSize:'13px',fontWeight:'600'}}>¥{app.schools?.annual_fee_jpy?.toLocaleString() || 'N/A'}</p>
                        </div>
                        {notes?.intended_start && (
                          <div style={{background:'#0D0907',borderRadius:'8px',padding:'10px'}}>
                            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'2px'}}>Intended Start</p>
                            <p style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{notes.intended_start} Intake</p>
                          </div>
                        )}
                        {notes?.japanese_level && (
                          <div style={{background:'#0D0907',borderRadius:'8px',padding:'10px'}}>
                            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'2px'}}>Japanese Level</p>
                            <p style={{color:'white',fontSize:'13px',fontWeight:'600',textTransform:'uppercase'}}>{notes.japanese_level}</p>
                          </div>
                        )}
                        {notes?.current_education && (
                          <div style={{background:'#0D0907',borderRadius:'8px',padding:'10px'}}>
                            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'2px'}}>Education</p>
                            <p style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{notes.current_education}</p>
                          </div>
                        )}
                      </div>

                      <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                        {app.schools?.website_url && (
                          <a href={app.schools.website_url} target="_blank" rel="noopener noreferrer" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'8px 14px',borderRadius:'8px',fontSize:'12px',border:'1px solid rgba(255,255,255,0.15)'}}>
                            Visit School Website
                          </a>
                        )}
                        {(app.status === 'pending' || app.status === 'applied') && (
                          <button onClick={(e)=>{e.stopPropagation(); withdrawApplication(app.id)}} style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'8px 14px',fontSize:'12px',cursor:'pointer'}}>
                            Withdraw Application
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <button onClick={()=>setExpandedId(isExpanded ? null : app.id)} style={{background:'none',border:'none',color:'#C42020',fontSize:'11px',cursor:'pointer',padding:0,marginTop: isExpanded ? '12px' : '0'}}>
                    {isExpanded ? 'Show less ▲' : 'Show details ▼'}
                  </button>
                </div>
              )
            })}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Questions about your application status?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}