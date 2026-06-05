'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const SAMPLE_NOTIFICATIONS = [
  {id:1,type:'visa',icon:'🛂',title:'Visa Application Reminder',message:'Your student visa application deadline is approaching. Make sure all documents are ready!',time:'2 hours ago',read:false,urgent:true},
  {id:2,type:'school',icon:'🏫',title:'New Schools Added',message:'50 new language schools have been added to our database. Check them out!',time:'1 day ago',read:false,urgent:false},
  {id:3,type:'news',icon:'📰',title:'MEXT Scholarship Opens',message:'The Japanese Government MEXT scholarship for 2026 is now accepting applications. Deadline: June 30.',time:'2 days ago',read:true,urgent:true},
  {id:4,type:'community',icon:'💬',title:'New Reply to Your Post',message:'Someone replied to your post in the community forum.',time:'3 days ago',read:true,urgent:false},
  {id:5,type:'system',icon:'🌸',title:'Welcome to Japan Life Guide!',message:'Thank you for joining! Start by browsing our 500+ language schools.',time:'1 week ago',read:true,urgent:false},
]

export default function NotificationsPage() {
  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { window.location.href = '/login'; return }
      setUser(userData.user)
      setLoading(false)
    }
    getData()
  }, [])

  function markAsRead(id: number) {
    setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n))
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({...n, read: true})))
  }

  function deleteNotification(id: number) {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter)
  const unreadCount = notifications.filter(n => !n.read).length

  const typeColors: any = {
    visa: '#4A8EFF',
    school: '#2EC87A',
    news: '#F0A830',
    community: '#A855F7',
    system: '#C42020',
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'32px 40px',borderBottom:'3px solid #C42020',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>Notifications</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',cursor:'pointer'}}>
            Mark All Read
          </button>
        )}
      </div>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
          {['all','unread','visa','school','news','community'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {f === 'all' ? 'All' : f === 'unread' ? `Unread (${unreadCount})` : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{background:'#1A2035',borderRadius:'14px',padding:'48px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🔔</div>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>No notifications</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>You are all caught up!</p>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {filtered.map(notif=>(
              <div key={notif.id} onClick={()=>markAsRead(notif.id)} style={{background:notif.read?'#1A2035':'rgba(196,32,32,0.08)',borderRadius:'12px',padding:'18px',border:'1px solid ' + (notif.read?'rgba(255,255,255,0.08)':'rgba(196,32,32,0.2)'),cursor:'pointer',display:'flex',gap:'14px',alignItems:'flex-start'}}>
                <div style={{width:'44px',height:'44px',borderRadius:'50%',background:typeColors[notif.type] + '20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0,border:'1px solid ' + typeColors[notif.type] + '40'}}>
                  {notif.icon}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px',flexWrap:'wrap'}}>
                    <h3 style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{notif.title}</h3>
                    {notif.urgent && <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'2px 6px',borderRadius:'4px',fontSize:'10px',fontWeight:'700'}}>URGENT</span>}
                    {!notif.read && <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C42020',flexShrink:0}}/>}
                  </div>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6',marginBottom:'8px'}}>{notif.message}</p>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{notif.time}</span>
                </div>
                <button onClick={e=>{e.stopPropagation();deleteNotification(notif.id)}} style={{background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:'16px',flexShrink:0,padding:'4px'}}>✕</button>
              </div>
            ))}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>Notification Settings</h3>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {[
              {label:'Visa deadline reminders',enabled:true},
              {label:'New school announcements',enabled:true},
              {label:'Scholarship deadlines',enabled:true},
              {label:'Community replies',enabled:false},
              {label:'Weekly digest email',enabled:true},
            ].map((setting,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px',background:'#0D0907',borderRadius:'8px'}}>
                <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{setting.label}</span>
                <div style={{width:'40px',height:'22px',borderRadius:'11px',background:setting.enabled?'#2EC87A':'rgba(255,255,255,0.2)',position:'relative',cursor:'pointer'}}>
                  <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'white',position:'absolute',top:'2px',left:setting.enabled?'20px':'2px',transition:'left 0.2s'}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}