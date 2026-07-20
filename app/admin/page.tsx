'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type TabType = 'overview' | 'users' | 'applications' | 'jobs' | 'jobseekers' | 'schools' | 'analytics'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    totalSchools: 0,
    totalJobs: 0,
    totalJobSeekers: 0,
    proUsers: 0,
    newUsersToday: 0,
    newApplicationsToday: 0,
  })
  const [users, setUsers] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [jobs, setJobs] = useState<any[]>([])
  const [jobSeekers, setJobSeekers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const today = new Date().toISOString().split('T')[0]

      const [
        usersData, appsData, schoolsData, jobsData,
        jobSeekersData, proUsersData, newUsersData, newAppsData
      ] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('applications').select('*, schools(name_en)').order('created_at', { ascending: false }).limit(50),
        supabase.from('schools').select('id', { count: 'exact', head: true }),
        supabase.from('jobs').select('*').order('created_at', { ascending: false }),
        supabase.from('job_seekers').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).in('plan', ['pro', 'lifetime']),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', today),
        supabase.from('applications').select('id', { count: 'exact', head: true }).gte('created_at', today),
      ])

      setStats({
        totalUsers: usersData.data?.length || 0,
        totalApplications: appsData.data?.length || 0,
        totalSchools: schoolsData.count || 0,
        totalJobs: jobsData.data?.length || 0,
        totalJobSeekers: jobSeekersData.data?.length || 0,
        proUsers: proUsersData.count || 0,
        newUsersToday: newUsersData.count || 0,
        newApplicationsToday: newAppsData.count || 0,
      })

      if (usersData.data) setUsers(usersData.data)
      if (appsData.data) setApplications(appsData.data)
      if (jobsData.data) setJobs(jobsData.data)
      if (jobSeekersData.data) setJobSeekers(jobSeekersData.data)
      setLoading(false)
    }
    load()
  }, [])

  async function updateJobStatus(jobId: string, isActive: boolean) {
    await supabase.from('jobs').update({ is_active: isActive }).eq('id', jobId)
    setJobs(prev => prev.map(j => j.id === jobId ? {...j, is_active: isActive} : j))
  }

  async function updateJobSeekerStatus(id: string, status: string) {
    await supabase.from('job_seekers').update({ status }).eq('id', id)
    setJobSeekers(prev => prev.map(j => j.id === id ? {...j, status} : j))
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  const TABS = [
    {key:'overview' as TabType, label:'📊 Overview'},
    {key:'users' as TabType, label:`👤 Users (${stats.totalUsers})`},
    {key:'applications' as TabType, label:`📝 Applications (${stats.totalApplications})`},
    {key:'jobs' as TabType, label:`💼 Jobs (${stats.totalJobs})`},
    {key:'jobseekers' as TabType, label:`🔍 Job Seekers (${stats.totalJobSeekers})`},
    {key:'schools' as TabType, label:`🏫 Schools (${stats.totalSchools})`},
    {key:'analytics' as TabType, label:'📈 Analytics'},
  ]

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 20px',borderBottom:'3px solid #C42020'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'20px'}}>🛠️ Admin Dashboard</h1>

          {/* Stats Grid */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'12px',marginBottom:'20px'}}>
            {[
              {label:'Total Users',value:stats.totalUsers,color:'#4A8EFF',icon:'👤'},
              {label:'New Today',value:stats.newUsersToday,color:'#2EC87A',icon:'🆕'},
              {label:'Pro Members',value:stats.proUsers,color:'#F0A830',icon:'💎'},
              {label:'Applications',value:stats.totalApplications,color:'#C42020',icon:'📝'},
              {label:'New Apps Today',value:stats.newApplicationsToday,color:'#FF8070',icon:'📋'},
              {label:'Job Seekers',value:stats.totalJobSeekers,color:'#A855F7',icon:'🔍'},
              {label:'Active Jobs',value:jobs.filter(j=>j.is_active).length,color:'#2EC87A',icon:'💼'},
              {label:'Schools',value:stats.totalSchools,color:'#4A8EFF',icon:'🏫'},
            ].map(stat => (
              <div key={stat.label} style={{background:'rgba(255,255,255,0.06)',borderRadius:'10px',padding:'14px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontSize:'20px',marginBottom:'4px'}}>{stat.icon}</div>
                <div style={{color:stat.color,fontSize:'22px',fontWeight:'800'}}>{stat.value}</div>
                <div style={{color:'rgba(255,255,255,0.4)',fontSize:'10px',marginTop:'2px'}}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {TABS.map(tab => (
              <button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{background:activeTab===tab.key?'#C42020':'rgba(255,255,255,0.08)',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'24px 20px'}}>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            {/* Recent Users */}
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>👤 Recent Users</h3>
              {users.slice(0,5).map(user => (
                <div key={user.id} style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg,#C42020,#FF8070)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:'700',flexShrink:0}}>
                    {user.full_name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div style={{flex:1}}>
                    <p style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{user.full_name || 'Unknown'}</p>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'10px'}}>{user.country} · {user.plan || 'free'}</p>
                  </div>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'10px'}}>{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>

            {/* Recent Applications */}
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>📝 Recent Applications</h3>
              {applications.slice(0,5).map(app => (
                <div key={app.id} style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                  <span style={{fontSize:'20px'}}>🏫</span>
                  <div style={{flex:1}}>
                    <p style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{app.schools?.name_en || 'School'}</p>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'10px'}}>{app.full_name} · {app.country}</p>
                  </div>
                  <span style={{background:'rgba(74,142,255,0.2)',color:'#4A8EFF',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>{app.status}</span>
                </div>
              ))}
            </div>

            {/* Recent Job Seekers */}
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>🔍 Recent Job Seekers</h3>
              {jobSeekers.slice(0,5).map(seeker => (
                <div key={seeker.id} style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                  <span style={{fontSize:'20px'}}>💼</span>
                  <div style={{flex:1}}>
                    <p style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{seeker.full_name}</p>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'10px'}}>{seeker.job_type} · {seeker.country}</p>
                  </div>
                  <span style={{background: seeker.status === 'new' ? 'rgba(196,32,32,0.2)' : 'rgba(46,200,122,0.2)',color: seeker.status === 'new' ? '#FF8070' : '#2EC87A',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>{seeker.status}</span>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>🔗 Quick Links</h3>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {[
                  {label:'View Live Site',href:'https://japanlifeguide.app',icon:'🌐'},
                  {label:'Supabase Dashboard',href:'https://supabase.com',icon:'🗄️'},
                  {label:'Vercel Dashboard',href:'https://vercel.com',icon:'▲'},
                  {label:'Google Analytics',href:'https://analytics.google.com',icon:'📈'},
                  {label:'Google Search Console',href:'https://search.google.com/search-console',icon:'🔍'},
                  {label:'App Store Connect',href:'https://appstoreconnect.apple.com',icon:'🍎'},
                  {label:'Google Play Console',href:'https://play.google.com/console',icon:'🤖'},
                  {label:'Resend Dashboard',href:'https://resend.com',icon:'📧'},
                ].map(link => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 12px',background:'#0D0907',borderRadius:'8px',textDecoration:'none',border:'1px solid rgba(255,255,255,0.04)'}}>
                    <span style={{fontSize:'16px'}}>{link.icon}</span>
                    <span style={{color:'rgba(255,255,255,0.7)',fontSize:'12px'}}>{link.label}</span>
                    <span style={{color:'#C42020',marginLeft:'auto',fontSize:'12px'}}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>👤 All Users</h3>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',minWidth:'600px'}}>
                <thead>
                  <tr style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
                    {['Name','Email','Country','Japanese','Plan','Joined'].map(h => (
                      <th key={h} style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',textAlign:'left',padding:'8px 12px',fontWeight:'600'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                      <td style={{padding:'10px 12px',color:'white',fontSize:'12px',fontWeight:'600'}}>{user.full_name || 'Unknown'}</td>
                      <td style={{padding:'10px 12px',color:'rgba(255,255,255,0.5)',fontSize:'11px'}}>{user.email}</td>
                      <td style={{padding:'10px 12px',color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>{user.country === 'Bangladesh' ? '🇧🇩' : user.country === 'Nepal' ? '🇳🇵' : '🌍'} {user.country}</td>
                      <td style={{padding:'10px 12px',color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>{user.japanese_level || 'N/A'}</td>
                      <td style={{padding:'10px 12px'}}>
                        <span style={{background: user.plan === 'pro' || user.plan === 'lifetime' ? 'rgba(240,168,48,0.2)' : 'rgba(255,255,255,0.06)',color: user.plan === 'pro' || user.plan === 'lifetime' ? '#F0A830' : 'rgba(255,255,255,0.4)',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>
                          {user.plan || 'free'}
                        </span>
                      </td>
                      <td style={{padding:'10px 12px',color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>📝 All Applications</h3>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',minWidth:'600px'}}>
                <thead>
                  <tr style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
                    {['Student','School','Country','Status','Date'].map(h => (
                      <th key={h} style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',textAlign:'left',padding:'8px 12px',fontWeight:'600'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                      <td style={{padding:'10px 12px',color:'white',fontSize:'12px',fontWeight:'600'}}>{app.full_name || 'Unknown'}</td>
                      <td style={{padding:'10px 12px',color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>{app.schools?.name_en || 'N/A'}</td>
                      <td style={{padding:'10px 12px',color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>{app.country}</td>
                      <td style={{padding:'10px 12px'}}>
                        <span style={{background:'rgba(74,142,255,0.2)',color:'#4A8EFF',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>{app.status}</span>
                      </td>
                      <td style={{padding:'10px 12px',color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{new Date(app.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>💼 Job Listings Management</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {jobs.map(job => (
                <div key={job.id} style={{background:'#0D0907',borderRadius:'10px',padding:'14px',display:'flex',gap:'14px',alignItems:'center',border:'1px solid rgba(255,255,255,0.06)',flexWrap:'wrap'}}>
                  <div style={{flex:1}}>
                    <p style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'2px'}}>{job.title}</p>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{job.company_name} · {job.location} · {job.job_type}</p>
                    <p style={{color:'#2EC87A',fontSize:'11px',marginTop:'2px'}}>¥{job.salary_min?.toLocaleString()}-¥{job.salary_max?.toLocaleString()}/mo</p>
                  </div>
                  <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                    {job.is_featured && <span style={{background:'rgba(240,168,48,0.2)',color:'#F0A830',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>⭐ Featured</span>}
                    <button onClick={()=>updateJobStatus(job.id, !job.is_active)} style={{background: job.is_active ? 'rgba(46,200,122,0.2)' : 'rgba(196,32,32,0.2)',color: job.is_active ? '#2EC87A' : '#FF8070',border:'none',borderRadius:'20px',padding:'4px 12px',fontSize:'11px',cursor:'pointer',fontWeight:'700'}}>
                      {job.is_active ? '✅ Active' : '❌ Inactive'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job Seekers Tab */}
        {activeTab === 'jobseekers' && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>🔍 Job Seekers</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {jobSeekers.map(seeker => (
                <div key={seeker.id} style={{background:'#0D0907',borderRadius:'10px',padding:'16px',border:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{display:'flex',gap:'12px',alignItems:'flex-start',flexWrap:'wrap'}}>
                    <div style={{flex:1}}>
                      <p style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{seeker.full_name}</p>
                      <p style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',marginBottom:'2px'}}>📧 {seeker.email} · {seeker.country === 'Bangladesh' ? '🇧🇩' : '🇳🇵'} {seeker.country}</p>
                      <p style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',marginBottom:'2px'}}>💼 {seeker.job_type} · 🗣️ {seeker.japanese_level}</p>
                      <p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{new Date(seeker.created_at).toLocaleDateString()}</p>
                    </div>
                    <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                      {['new','contacted','matched','placed'].map(status => (
                        <button key={status} onClick={()=>updateJobSeekerStatus(seeker.id, status)} style={{background: seeker.status === status ? '#C42020' : 'rgba(255,255,255,0.06)',color:'white',border:'none',borderRadius:'6px',padding:'4px 10px',fontSize:'10px',cursor:'pointer',fontWeight: seeker.status === status ? '700' : '400'}}>
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                  {seeker.ai_analysis && (
                    <div style={{background:'rgba(74,142,255,0.1)',borderRadius:'8px',padding:'10px',marginTop:'10px',border:'1px solid rgba(74,142,255,0.2)'}}>
                      <p style={{color:'#4A8EFF',fontSize:'10px',fontWeight:'700',marginBottom:'4px'}}>🤖 AI Analysis</p>
                      <p style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',lineHeight:'1.6'}}>{seeker.ai_analysis.slice(0,200)}...</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schools Tab */}
        {activeTab === 'schools' && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
            <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>🏫 Schools Database</h3>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'16px'}}>
              {stats.totalSchools} verified schools in database
            </p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" style={{background:'#2EC87A',color:'#0D0907',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
                Manage in Supabase →
              </a>
              <a href="/schools" target="_blank" rel="noopener noreferrer" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>
                View Schools Page →
              </a>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>📈 Analytics</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px',marginBottom:'20px'}}>
                {[
                  {label:'Total Users',value:stats.totalUsers,color:'#4A8EFF',icon:'👤'},
                  {label:'Pro Members',value:stats.proUsers,color:'#F0A830',icon:'💎'},
                  {label:'Conversion Rate',value: stats.totalUsers > 0 ? Math.round((stats.proUsers/stats.totalUsers)*100)+'%' : '0%',color:'#2EC87A',icon:'📊'},
                  {label:'Total Applications',value:stats.totalApplications,color:'#C42020',icon:'📝'},
                  {label:'Job Seekers',value:stats.totalJobSeekers,color:'#A855F7',icon:'🔍'},
                  {label:'Active Jobs',value:jobs.filter(j=>j.is_active).length,color:'#2EC87A',icon:'💼'},
                ].map(item => (
                  <div key={item.label} style={{background:'#0D0907',borderRadius:'10px',padding:'14px'}}>
                    <div style={{fontSize:'20px',marginBottom:'6px'}}>{item.icon}</div>
                    <div style={{color:item.color,fontSize:'20px',fontWeight:'700',marginBottom:'2px'}}>{item.value}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{item.label}</div>
                  </div>
                ))}
              </div>
              <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" style={{background:'#4A8EFF',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'inline-block'}}>
                Open Google Analytics →
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}