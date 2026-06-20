'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const DEFAULT_DEADLINES = [
  {title:'April Intake School Application Deadline',date:'2026-12-15',category:'School',icon:'🏫',isDefault:true},
  {title:'JLPT December Test Registration',date:'2026-09-01',category:'JLPT',icon:'📝',isDefault:true},
  {title:'JLPT December Test Date',date:'2026-12-07',category:'JLPT',icon:'📝',isDefault:true},
  {title:'MEXT Scholarship Application Period',date:'2026-04-01',category:'Scholarship',icon:'🎓',isDefault:true},
  {title:'July Intake School Application Deadline',date:'2026-03-15',category:'School',icon:'🏫',isDefault:true},
  {title:'JLPT July Test Registration',date:'2026-04-01',category:'JLPT',icon:'📝',isDefault:true},
  {title:'JLPT July Test Date',date:'2026-07-06',category:'JLPT',icon:'📝',isDefault:true},
]

const CATEGORIES = [
  {key:'School',icon:'🏫',color:'#4A8EFF'},
  {key:'Visa',icon:'🛂',color:'#C42020'},
  {key:'JLPT',icon:'📝',color:'#F0A830'},
  {key:'Scholarship',icon:'🎓',color:'#A855F7'},
  {key:'Other',icon:'📌',color:'#2EC87A'},
]

export default function CalendarPage() {
  const [user, setUser] = useState<any>(null)
  const [customDeadlines, setCustomDeadlines] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newDeadline, setNewDeadline] = useState({title:'',date:'',category:'Other'})
  const [completedIds, setCompletedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (userData.user) {
        setUser(userData.user)
        const { data } = await supabase.from('deadlines').select('*').eq('user_id', userData.user.id).order('date')
        if (data) setCustomDeadlines(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  async function addDeadline() {
    if (!newDeadline.title || !newDeadline.date) return
    if (!user) { window.location.href = '/login'; return }
    const { data } = await supabase.from('deadlines').insert({
      user_id: user.id,
      title: newDeadline.title,
      date: newDeadline.date,
      category: newDeadline.category,
    }).select().single()
    if (data) setCustomDeadlines(prev => [...prev, data])
    setNewDeadline({title:'',date:'',category:'Other'})
    setShowForm(false)
  }

  async function deleteDeadline(id: string) {
    await supabase.from('deadlines').delete().eq('id', id)
    setCustomDeadlines(prev => prev.filter(d => d.id !== id))
  }

  function toggleComplete(id: string) {
    setCompletedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const allDeadlines = [
    ...DEFAULT_DEADLINES.map((d,i) => ({...d, id: 'default-'+i})),
    ...customDeadlines.map(d => ({...d, isDefault: false, icon: CATEGORIES.find(c=>c.key===d.category)?.icon || '📌'})),
  ].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const today = new Date()
  today.setHours(0,0,0,0)

  function getDaysUntil(dateStr: string) {
    const date = new Date(dateStr)
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000*60*60*24))
    return diff
  }

  const upcoming = allDeadlines.filter(d => getDaysUntil(d.date) >= 0 && !completedIds.includes(d.id))
  const completed = allDeadlines.filter(d => completedIds.includes(d.id))
  const past = allDeadlines.filter(d => getDaysUntil(d.date) < 0 && !completedIds.includes(d.id))

  function getCategoryColor(category: string) {
    return CATEGORIES.find(c => c.key === category)?.color || '#C42020'
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Deadline Calendar</h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Never miss an important date for your Japan journey</p>
          </div>
          <button onClick={()=>user?setShowForm(!showForm):window.location.href='/login'} style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
            + Add Deadline
          </button>
        </div>
      </div>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>

        {showForm && (
          <div style={{background:'#1A2035',borderRadius:'14px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(196,32,32,0.3)'}}>
            <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Add Your Own Deadline</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <input value={newDeadline.title} onChange={e=>setNewDeadline(prev=>({...prev,title:e.target.value}))} placeholder="Deadline title..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                <input value={newDeadline.date} onChange={e=>setNewDeadline(prev=>({...prev,date:e.target.value}))} type="date" style={{flex:1,minWidth:'150px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
                <select value={newDeadline.category} onChange={e=>setNewDeadline(prev=>({...prev,category:e.target.value}))} style={{flex:1,minWidth:'150px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
                  {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.icon} {c.key}</option>)}
                </select>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={addDeadline} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:2}}>Add</button>
                <button onClick={()=>setShowForm(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'14px',cursor:'pointer',flex:1}}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming */}
        <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>📅 Upcoming Deadlines</h2>
        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'28px'}}>
          {upcoming.length === 0 ? (
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textAlign:'center',padding:'24px'}}>No upcoming deadlines</p>
          ) : upcoming.map(deadline => {
            const daysUntil = getDaysUntil(deadline.date)
            const isUrgent = daysUntil <= 14
            return (
              <div key={deadline.id} style={{background:'#1A2035',borderRadius:'12px',padding:'16px',display:'flex',gap:'14px',alignItems:'center',border:'1px solid ' + (isUrgent ? 'rgba(196,32,32,0.3)' : 'rgba(255,255,255,0.08)')}}>
                <button onClick={()=>toggleComplete(deadline.id)} style={{width:'24px',height:'24px',borderRadius:'50%',border:'2px solid rgba(255,255,255,0.2)',background:'none',cursor:'pointer',flexShrink:0}}/>
                <span style={{fontSize:'24px'}}>{deadline.icon}</span>
                <div style={{flex:1}}>
                  <div style={{color:'white',fontSize:'14px',fontWeight:'600'}}>{deadline.title}</div>
                  <div style={{display:'flex',gap:'8px',alignItems:'center',marginTop:'2px'}}>
                    <span style={{color:getCategoryColor(deadline.category),fontSize:'11px',fontWeight:'600'}}>{deadline.category}</span>
                    <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>· {new Date(deadline.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <span style={{background: isUrgent ? 'rgba(196,32,32,0.2)' : 'rgba(255,255,255,0.06)',color: isUrgent ? '#FF8070' : 'rgba(255,255,255,0.5)',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',whiteSpace:'nowrap'}}>
                  {daysUntil === 0 ? 'Today!' : daysUntil + ' days'}
                </span>
                {!deadline.isDefault && (
                  <button onClick={()=>deleteDeadline(deadline.id)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:'16px'}}>✕</button>
                )}
              </div>
            )
          })}
        </div>

        {/* Past */}
        {past.length > 0 && (
          <>
            <h2 style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',fontWeight:'700',marginBottom:'14px'}}>⏳ Past Deadlines</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'28px'}}>
              {past.slice(0,5).map(deadline => (
                <div key={deadline.id} style={{background:'#1A2035',borderRadius:'10px',padding:'12px',display:'flex',gap:'12px',alignItems:'center',opacity:0.5}}>
                  <span style={{fontSize:'18px'}}>{deadline.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{color:'white',fontSize:'13px'}}>{deadline.title}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{new Date(deadline.date).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <>
            <h2 style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700',marginBottom:'14px'}}>✅ Completed</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'28px'}}>
              {completed.map(deadline => (
                <div key={deadline.id} style={{background:'rgba(46,200,122,0.05)',borderRadius:'10px',padding:'12px',display:'flex',gap:'12px',alignItems:'center'}}>
                  <button onClick={()=>toggleComplete(deadline.id)} style={{width:'20px',height:'20px',borderRadius:'50%',border:'none',background:'#2EC87A',color:'white',cursor:'pointer',fontSize:'10px',flexShrink:0}}>✓</button>
                  <span style={{fontSize:'18px'}}>{deadline.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',textDecoration:'line-through'}}>{deadline.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!user && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Sign in to add your own custom deadlines!</p>
            <a href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Join Free</a>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need help planning your timeline?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}