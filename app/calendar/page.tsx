'use client'
import { useState } from 'react'

const DEADLINES = [
  {id:1,title:'MEXT Scholarship Application',date:'2025-06-30',category:'Scholarship',priority:'high',desc:'Japanese Government scholarship deadline. Apply through Japanese Embassy in your country.',done:false},
  {id:2,title:'JLPT December Registration',date:'2025-08-31',category:'JLPT',priority:'high',desc:'Register for December JLPT exam. Limited seats available in Bangladesh and Nepal.',done:false},
  {id:3,title:'April 2026 School Application',date:'2025-10-01',category:'School',priority:'high',desc:'Apply to language schools for April 2026 intake. Start at least 6 months before.',done:false},
  {id:4,title:'JASSO Scholarship Application',date:'2025-09-30',category:'Scholarship',priority:'medium',desc:'Japan Student Services Organization scholarship. Apply through your chosen school.',done:false},
  {id:5,title:'JLPT December Exam',date:'2025-12-07',category:'JLPT',priority:'high',desc:'Japanese Language Proficiency Test December session.',done:false},
  {id:6,title:'January 2026 School Application',date:'2025-07-01',category:'School',priority:'medium',desc:'Apply to language schools for January 2026 intake.',done:false},
  {id:7,title:'Passport Renewal Check',date:'2025-07-15',category:'Documents',priority:'medium',desc:'Check passport expiry. Must have at least 1 year validity when applying for visa.',done:false},
  {id:8,title:'Bank Statement Preparation',date:'2025-08-01',category:'Documents',priority:'high',desc:'Prepare bank statement showing 2,000,000+ Yen for 3-6 months.',done:false},
  {id:9,title:'SSW Skills Test Registration',date:'2025-07-31',category:'SSW',priority:'medium',desc:'Register for Specified Skilled Worker skills test in your chosen industry.',done:false},
  {id:10,title:'JLPT June Registration',date:'2025-03-31',category:'JLPT',priority:'medium',desc:'Register for June JLPT exam.',done:false},
  {id:11,title:'October 2025 School Application',date:'2025-04-01',category:'School',priority:'low',desc:'Apply to language schools for October 2025 intake.',done:false},
  {id:12,title:'COE Application Follow-up',date:'2025-11-01',category:'Visa',priority:'high',desc:'Follow up with school on Certificate of Eligibility application status.',done:false},
]

export default function CalendarPage() {
  const [deadlines, setDeadlines] = useState(DEADLINES)
  const [filter, setFilter] = useState('all')
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newCategory, setNewCategory] = useState('School')
  const [newPriority, setNewPriority] = useState('medium')
  const [newDesc, setNewDesc] = useState('')

  function toggleDone(id: number) {
    setDeadlines(prev => prev.map(d => d.id === id ? {...d, done: !d.done} : d))
  }

  function addDeadline() {
    if (!newTitle || !newDate) return
    const deadline = {
      id: deadlines.length + 1,
      title: newTitle,
      date: newDate,
      category: newCategory,
      priority: newPriority,
      desc: newDesc,
      done: false,
    }
    setDeadlines(prev => [...prev, deadline].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    setNewTitle(''); setNewDate(''); setNewDesc(''); setShowAdd(false)
  }

  function deleteDeadline(id: number) {
    setDeadlines(prev => prev.filter(d => d.id !== id))
  }

  const today = new Date()
  const filtered = deadlines
    .filter(d => {
      if (filter === 'upcoming') return !d.done && new Date(d.date) >= today
      if (filter === 'done') return d.done
      if (filter === 'overdue') return !d.done && new Date(d.date) < today
      return true
    })
    .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const priorityColors: any = { high: '#C42020', medium: '#F0A830', low: '#2EC87A' }
  const categoryColors: any = {
    Scholarship: '#A855F7', JLPT: '#4A8EFF', School: '#2EC87A',
    Documents: '#F0A830', SSW: '#FF8070', Visa: '#C42020',
  }

  function getDaysUntil(date: string) {
    const diff = Math.ceil((new Date(date).getTime() - today.getTime()) / (1000*60*60*24))
    if (diff < 0) return { text: `${Math.abs(diff)} days overdue`, color: '#C42020' }
    if (diff === 0) return { text: 'TODAY!', color: '#C42020' }
    if (diff <= 7) return { text: `${diff} days left`, color: '#F0A830' }
    if (diff <= 30) return { text: `${diff} days left`, color: '#F0A830' }
    return { text: `${diff} days left`, color: '#2EC87A' }
  }

  const upcomingCount = deadlines.filter(d=>!d.done && new Date(d.date)>=today).length
  const overdueCount = deadlines.filter(d=>!d.done && new Date(d.date)<today).length
  const doneCount = deadlines.filter(d=>d.done).length

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 40px',borderBottom:'3px solid #C42020',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>Deadline Calendar</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Track important dates for your Japan journey</p>
        </div>
        <button onClick={()=>setShowAdd(!showAdd)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
          + Add Deadline
        </button>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',marginBottom:'24px'}}>
          {[
            {label:'Upcoming',value:upcomingCount,color:'#4A8EFF',filter:'upcoming'},
            {label:'Overdue',value:overdueCount,color:'#C42020',filter:'overdue'},
            {label:'Completed',value:doneCount,color:'#2EC87A',filter:'done'},
          ].map(stat=>(
            <div key={stat.label} onClick={()=>setFilter(filter===stat.filter?'all':stat.filter)} style={{background:filter===stat.filter?stat.color+'20':'#1A2035',borderRadius:'12px',padding:'16px',textAlign:'center',border:'2px solid ' + (filter===stat.filter?stat.color:'rgba(255,255,255,0.08)'),cursor:'pointer'}}>
              <div style={{color:stat.color,fontSize:'28px',fontWeight:'700'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {showAdd && (
          <div style={{background:'#1A2035',borderRadius:'14px',padding:'24px',marginBottom:'20px',border:'1px solid rgba(196,32,32,0.3)'}}>
            <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Add New Deadline</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="Deadline title..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px',color:'white',fontSize:'13px',outline:'none'}}/>
              <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                <input type="date" value={newDate} onChange={e=>setNewDate(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px',color:'white',fontSize:'13px',outline:'none',flex:1}}/>
                <select value={newCategory} onChange={e=>setNewCategory(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer',flex:1}}>
                  {['School','Scholarship','JLPT','Documents','SSW','Visa','Other'].map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <select value={newPriority} onChange={e=>setNewPriority(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer',flex:1}}>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
              <textarea value={newDesc} onChange={e=>setNewDesc(e.target.value)} placeholder="Description (optional)..." style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px',color:'white',fontSize:'13px',outline:'none',resize:'vertical',minHeight:'60px'}}/>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={addDeadline} disabled={!newTitle||!newDate} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer',flex:2}}>Add Deadline</button>
                <button onClick={()=>setShowAdd(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'10px',fontSize:'13px',cursor:'pointer',flex:1}}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div style={{display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap'}}>
          {['all','upcoming','overdue','done'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {f}
            </button>
          ))}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {filtered.map(deadline=>{
            const daysInfo = getDaysUntil(deadline.date)
            return (
              <div key={deadline.id} style={{background:deadline.done?'rgba(255,255,255,0.03)':'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid ' + (deadline.done?'rgba(255,255,255,0.05)':deadline.priority==='high'?'rgba(196,32,32,0.2)':'rgba(255,255,255,0.08)'),opacity:deadline.done?0.6:1}}>
                <div style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                  <button onClick={()=>toggleDone(deadline.id)} style={{width:'24px',height:'24px',borderRadius:'50%',border:'2px solid ' + (deadline.done?'#2EC87A':'rgba(255,255,255,0.3)'),background:deadline.done?'#2EC87A':'transparent',cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',marginTop:'2px'}}>
                    {deadline.done?'✓':''}
                  </button>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px',flexWrap:'wrap'}}>
                      <h3 style={{color:deadline.done?'rgba(255,255,255,0.4)':'white',fontSize:'14px',fontWeight:'700',textDecoration:deadline.done?'line-through':'none'}}>{deadline.title}</h3>
                      <span style={{background:categoryColors[deadline.category]+'20',color:categoryColors[deadline.category],padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>{deadline.category}</span>
                      <span style={{background:priorityColors[deadline.priority]+'20',color:priorityColors[deadline.priority],padding:'2px 8px',borderRadius:'4px',fontSize:'10px',fontWeight:'700',textTransform:'uppercase'}}>{deadline.priority}</span>
                    </div>
                    <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.5',marginBottom:'8px'}}>{deadline.desc}</p>
                    <div style={{display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}}>
                      <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>📅 {new Date(deadline.date).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</span>
                      {!deadline.done && (
                        <span style={{color:daysInfo.color,fontSize:'12px',fontWeight:'700'}}>{daysInfo.text}</span>
                      )}
                    </div>
                  </div>
                  <button onClick={()=>deleteDeadline(deadline.id)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.2)',cursor:'pointer',fontSize:'16px',flexShrink:0,padding:'4px'}}>✕</button>
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div style={{textAlign:'center',padding:'48px'}}>
              <div style={{fontSize:'48px',marginBottom:'16px'}}>📅</div>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>No deadlines found!</p>
            </div>
          )}
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need help with deadlines or visa process?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}