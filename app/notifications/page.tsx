'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const SAMPLE_NOTIFICATIONS = [
  {id:'1', type:'school', title:'New school added in Tokyo!', message:'Tokyo International Language Academy has been added to our database with verified data.', time:'2 hours ago', read:false, icon:'🏫', link:'/schools'},
  {id:'2', type:'visa', title:'Student Visa Process Update', message:'Japan has updated the COE processing time. Average wait is now 6-8 weeks.', time:'1 day ago', read:false, icon:'🛂', link:'/visa'},
  {id:'3', type:'jlpt', title:'JLPT Registration Now Open!', message:'JLPT December test registration is now open. Register before September 30.', time:'2 days ago', read:true, icon:'📝', link:'/jlpt-test'},
  {id:'4', type:'scholarship', title:'MEXT Scholarship Deadline Approaching', message:'MEXT Scholarship application deadline is in 30 days. Start your application now!', time:'3 days ago', read:true, icon:'🎓', link:'/scholarships'},
  {id:'5', type:'community', title:'New reply to your post', message:'Someone replied to your community post about student visa requirements.', time:'4 days ago', read:true, icon:'💬', link:'/community'},
  {id:'6', type:'system', title:'Welcome to Japan Life Guide! 🌸', message:'Thank you for joining! Browse 724+ verified schools and start your Japan journey.', time:'1 week ago', read:true, icon:'🌸', link:'/schools'},
]

const TYPE_COLORS: any = {
  school: '#4A8EFF',
  visa: '#C42020',
  jlpt: '#F0A830',
  scholarship: '#A855F7',
  community: '#2EC87A',
  system: '#FF8070',
}

export default function NotificationsPage() {
  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user)
      else window.location.href = '/login'
    })
  }, [])

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({...n, read: true})))
  }

  function markRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n))
  }

  function deleteNotification(id: string) {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const filtered = filter === 'all' ? notifications :
    filter === 'unread' ? notifications.filter(n => !n.read) :
    notifications.filter(n => n.type === filter)

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>
              Notifications
              {unreadCount > 0 && <span style={{background:'#C42020',color:'white',borderRadius:'50%',padding:'2px 8px',fontSize:'14px',fontWeight:'700',marginLeft:'10px'}}>{unreadCount}</span>}
            </h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Stay updated with latest news and updates</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',cursor:'pointer'}}>
              Mark all as read
            </button>
          )}
        </div>
      </div>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
          {['all','unread','school','visa','jlpt','scholarship','community'].map(f => (
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {f === 'all' ? 'All' : f === 'unread' ? `Unread (${unreadCount})` : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px',background:'#1A2035',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🔔</div>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No notifications found</p>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {filtered.map(notification => (
              <div key={notification.id} style={{background: notification.read ? '#1A2035' : 'rgba(196,32,32,0.05)',borderRadius:'12px',padding:'18px',border:'1px solid ' + (notification.read ? 'rgba(255,255,255,0.08)' : 'rgba(196,32,32,0.2)'),display:'flex',gap:'14px',alignItems:'flex-start'}}
                onClick={()=>markRead(notification.id)}>
                <div style={{width:'40px',height:'40px',borderRadius:'50%',background:TYPE_COLORS[notification.type]+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>
                  {notification.icon}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'4px',flexWrap:'wrap',gap:'8px'}}>
                    <h3 style={{color:'white',fontSize:'14px',fontWeight: notification.read ? '500' : '700'}}>{notification.title}</h3>
                    <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                      {!notification.read && <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C42020',flexShrink:0}}/>}
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',whiteSpace:'nowrap'}}>{notification.time}</span>
                    </div>
                  </div>
                  <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6',marginBottom:'8px'}}>{notification.message}</p>
                  <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                    <span style={{background:TYPE_COLORS[notification.type]+'20',color:TYPE_COLORS[notification.type],padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',textTransform:'capitalize'}}>{notification.type}</span>
                    <a href={notification.link} style={{color:'#C42020',fontSize:'11px',textDecoration:'none',fontWeight:'600'}}>View →</a>
                    <button onClick={(e)=>{e.stopPropagation();deleteNotification(notification.id)}} style={{background:'none',border:'none',color:'rgba(255,255,255,0.2)',cursor:'pointer',fontSize:'14px',marginLeft:'auto'}}>✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>🔔 Notification Settings</h3>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {[
              {label:'School updates and new schools', key:'schools'},
              {label:'Visa policy changes', key:'visa'},
              {label:'JLPT test registration reminders', key:'jlpt'},
              {label:'Scholarship deadlines', key:'scholarship'},
              {label:'Community replies', key:'community'},
            ].map(setting => (
              <div key={setting.key} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{setting.label}</span>
                <div style={{width:'36px',height:'20px',borderRadius:'10px',background:'#C42020',position:'relative',cursor:'pointer'}}>
                  <div style={{width:'16px',height:'16px',borderRadius:'50%',background:'white',position:'absolute',right:'2px',top:'2px'}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}