'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [filter, setFilter] = useState('all')
  const [isProRequired, setIsProRequired] = useState(false)

  useEffect(() => {
    async function getData() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { window.location.href = '/login'; return }
      setUser(userData.user)

      const { data: profileData } = await supabase.from('profiles').select('plan').eq('id', userData.user.id).single()
      const isPro = profileData?.plan === 'pro' || profileData?.plan === 'lifetime'

      const { data: appData } = await supabase
        .from('applications')
        .select('*, schools(name_en, name_jp, city, icon, annual_fee_jpy, website_url, region)')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false })

      if (appData) {
        setApplications(appData)
        if (!isPro && appData.length >= 1) {
          setIsProRequired(true)
        }
      }
      setLoading(false)
    }
    getData()
  }, [])

  async function updateStatus(id: string, status: string) {
    await supabase.from('applications').update({ status }).eq('id', id)
    setApplications(prev => prev.map(a => a.id === id ? {...a, status} : a))
  }

  async function deleteApplication(id: string) {
    await supabase.from('applications').delete().eq('id', id)
    setApplications(prev => prev.filter(a => a.id !== id))
  }

  const statusColors: any = {
    pending: '#F0A830',
    applied: '#4A8EFF',
    accepted: '#2EC87A',
    rejected: '#C42020',
    withdrawn: 'rgba(255,255,255,0.3)',
  }

  const statusSteps = ['pending', 'applied', 'accepted']
  const filtered = applications.filter(a => filter === 'all' || a.status === filter)

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 40px',borderBottom:'3px solid #C42020',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>My Applications</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>{applications.length} total applications</p>
        </div>
        <a href="/apply" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'10px',fontSize:'14px',fontWeight:'700'}}>
          + New Application
        </a>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        {isProRequired && (
          <div style={{background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'10px',padding:'16px',marginBottom:'16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <p style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>Free Plan Limit Reached!</p>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>Upgrade to Pro for unlimited applications</p>
            </div>
            <a href="/pricing" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Upgrade to Pro 💎</a>
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'10px',marginBottom:'24px'}}>
          {[
            {label:'Total',value:applications.length,color:'#4A8EFF'},
            {label:'Pending',value:applications.filter(a=>a.status==='pending').length,color:'#F0A830'},
            {label:'Applied',value:applications.filter(a=>a.status==='applied').length,color:'#4A8EFF'},
            {label:'Accepted',value:applications.filter(a=>a.status==='accepted').length,color:'#2EC87A'},
            {label:'Rejected',value:applications.filter(a=>a.status==='rejected').length,color:'#C42020'},
          ].map(stat=>(
            <div key={stat.label} style={{background:'#1A2035',borderRadius:'10px',padding:'14px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{color:stat.color,fontSize:'22px',fontWeight:'700'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
          {['all','pending','applied','accepted','rejected','withdrawn'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'48px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>📝</div>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>No applications yet!</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>Start applying to Japanese language schools!</p>
            <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>Browse Schools</a>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {filtered.map(app=>(
              <div key={app.id} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{display:'flex',gap:'16px',alignItems:'flex-start',flexWrap:'wrap'}}>
                  <div style={{fontSize:'40px',flexShrink:0}}>{app.schools?.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'8px',marginBottom:'8px'}}>
                      <div>
                        <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'2px'}}>{app.schools?.name_en}</h2>
                        <p style={{color:'#C42020',fontSize:'11px',marginBottom:'4px'}}>{app.schools?.name_jp}</p>
                        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>📍 {app.schools?.city} · {app.schools?.region}</p>
                      </div>
                      <span style={{background:statusColors[app.status]+'20',color:statusColors[app.status],padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'700',textTransform:'capitalize',border:'1px solid ' + statusColors[app.status] + '40'}}>
                        {app.status}
                      </span>
                    </div>

                    <div style={{display:'flex',gap:'8px',marginBottom:'14px',flexWrap:'wrap'}}>
                      {statusSteps.map((step,i)=>(
                        <div key={step} style={{display:'flex',alignItems:'center',gap:'4px'}}>
                          <div style={{width:'20px',height:'20px',borderRadius:'50%',background:statusSteps.indexOf(app.status)>=i?statusColors[step]||'#2EC87A':'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',color:'white',fontWeight:'700'}}>
                            {statusSteps.indexOf(app.status)>=i?'✓':i+1}
                          </div>
                          <span style={{color:statusSteps.indexOf(app.status)>=i?'white':'rgba(255,255,255,0.3)',fontSize:'11px',textTransform:'capitalize'}}>{step}</span>
                          {i < statusSteps.length-1 && <div style={{width:'20px',height:'2px',background:statusSteps.indexOf(app.status)>i?'#2EC87A':'rgba(255,255,255,0.1)'}}/>}
                        </div>
                      ))}
                    </div>

                    <div style={{display:'flex',gap:'6px',flexWrap:'wrap',alignItems:'center'}}>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Applied: {new Date(app.created_at).toLocaleDateString()}</span>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>·</span>
                      <span style={{color:'#F0A830',fontSize:'11px',fontFamily:'monospace'}}>¥{app.schools?.annual_fee_jpy?.toLocaleString()}/yr</span>
                    </div>

                    {app.notes && (
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'8px',fontStyle:'italic'}}>{app.notes}</p>
                    )}
                  </div>
                </div>

                <div style={{display:'flex',gap:'8px',marginTop:'16px',paddingTop:'16px',borderTop:'1px solid rgba(255,255,255,0.06)',flexWrap:'wrap'}}>
                  <a href={'/schools/' + app.school_id} style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'8px 14px',borderRadius:'6px',fontSize:'12px',border:'1px solid rgba(255,255,255,0.15)'}}>
                    View School
                  </a>
                  {app.schools?.website_url && (
                    <a href={app.schools.website_url} target="_blank" rel="noopener noreferrer" style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',textDecoration:'none',padding:'8px 14px',borderRadius:'6px',fontSize:'12px',border:'1px solid rgba(46,200,122,0.2)'}}>
                      Official Site
                    </a>
                  )}
                  <select value={app.status} onChange={e=>updateStatus(app.id,e.target.value)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'6px',padding:'8px 12px',fontSize:'12px',cursor:'pointer',outline:'none'}}>
                    <option value="pending">Pending</option>
                    <option value="applied">Applied</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="withdrawn">Withdrawn</option>
                  </select>
                  <button onClick={()=>deleteApplication(app.id)} style={{background:'rgba(196,32,32,0.1)',color:'#FF8070',border:'1px solid rgba(196,32,32,0.2)',borderRadius:'6px',padding:'8px 14px',fontSize:'12px',cursor:'pointer',marginLeft:'auto'}}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need help with your application?</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/visa" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Visa Guide</a>
          </div>
        </div>
      </div>
    </main>
  )
}