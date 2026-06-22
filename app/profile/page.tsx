'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [favorites, setFavorites] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    async function getData() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { window.location.href = '/login'; return }
      setUser(userData.user)
      setName(userData.user.user_metadata?.full_name || '')
      setPhone(userData.user.user_metadata?.phone || '')
      setCountry(userData.user.user_metadata?.country || '')

      const [favData, appData, revData] = await Promise.all([
        supabase.from('favorites').select('school_id, schools(name_en, name_jp, city, icon, annual_fee_jpy, rating)').eq('user_id', userData.user.id),
        supabase.from('applications').select('*, schools(name_en, city, icon)').eq('user_id', userData.user.id).order('created_at', { ascending: false }),
        supabase.from('reviews').select('*, schools(name_en, icon)').eq('user_id', userData.user.id),
      ])
      if (favData.data) setFavorites(favData.data)
      if (appData.data) setApplications(appData.data)
      if (revData.data) setReviews(revData.data)
      setLoading(false)
    }
    getData()
  }, [])

  async function updateProfile() {
    await supabase.auth.updateUser({ data: { full_name: name, phone, country } })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function removeFavorite(schoolId: string) {
    await supabase.from('favorites').delete().eq('user_id', user.id).eq('school_id', schoolId)
    setFavorites(prev => prev.filter((f: any) => f.school_id !== schoolId))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const statusColors: any = {
    pending: '#F0A830',
    applied: '#4A8EFF',
    accepted: '#2EC87A',
    rejected: '#C42020',
    withdrawn: 'rgba(255,255,255,0.3)',
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  const tabs = ['profile', 'favorites', 'applications', 'reviews']

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <div style={{display:'flex',alignItems:'center',gap:'20px',flexWrap:'wrap'}}>
          <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px',fontWeight:'700',color:'white',flexShrink:0,boxShadow:'0 0 20px rgba(196,32,32,0.4)'}}>
            {name ? name[0].toUpperCase() : user?.email?.[0]?.toUpperCase() || '?'}
          </div>
          <div style={{flex:1}}>
            <h1 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'4px'}}>{name || 'My Profile'}</h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'4px'}}>{user?.email}</p>
            <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
              <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>Member since {new Date(user?.created_at).toLocaleDateString()}</span>
              {country && <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>🌍 {country}</span>}
            </div>
          </div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            <a href="/dashboard" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Dashboard</a>
            <button onClick={handleLogout} style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'8px 16px',fontSize:'13px',cursor:'pointer'}}>Sign Out</button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginTop:'24px'}}>
          {[
            {icon:'❤️',label:'Favorites',value:favorites.length},
            {icon:'📝',label:'Applications',value:applications.length},
            {icon:'⭐',label:'Reviews',value:reviews.length},
            {icon:'✅',label:'Accepted',value:applications.filter(a=>a.status==='accepted').length},
          ].map(stat=>(
            <div key={stat.label} style={{background:'rgba(255,255,255,0.05)',borderRadius:'10px',padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:'20px',marginBottom:'4px'}}>{stat.icon}</div>
              <div style={{color:'white',fontSize:'20px',fontWeight:'700'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {tabs.map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Edit Profile</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Full Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Phone Number</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+880 1XXX XXXXXX" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Country</label>
                <div style={{display:'flex',gap:'8px'}}>
                  {[{code:'Bangladesh',flag:'🇧🇩'},{code:'Nepal',flag:'🇳🇵'},{code:'Other',flag:'🌍'}].map(c=>(
                    <button key={c.code} onClick={()=>setCountry(c.code)} style={{flex:1,background:country===c.code?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (country===c.code?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'10px',color:'white',fontSize:'12px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
                      <span style={{fontSize:'20px'}}>{c.flag}</span>
                      <span>{c.code}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Email Address</label>
                <input value={user?.email} disabled style={{width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'12px',color:'rgba(255,255,255,0.4)',fontSize:'14px',outline:'none',cursor:'not-allowed'}}/>
              </div>
              <button onClick={updateProfile} style={{background:saved?'#2EC87A':'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
                {saved ? '✓ Saved!' : 'Save Profile'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700'}}>Favorite Schools ({favorites.length})</h2>
              <a href="/schools" style={{color:'#C42020',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>+ Add More</a>
            </div>
            {favorites.length === 0 ? (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'48px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontSize:'48px',marginBottom:'16px'}}>❤️</div>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>No favorites yet!</p>
                <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Browse Schools</a>
              </div>
            ) : favorites.map((fav:any)=>(
              <div key={fav.school_id} style={{background:'#1A2035',borderRadius:'10px',padding:'16px',display:'flex',alignItems:'center',gap:'14px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontSize:'32px'}}>{fav.schools?.icon}</div>
                <div style={{flex:1}}>
                  <div style={{color:'white',fontSize:'14px',fontWeight:'600'}}>{fav.schools?.name_en}</div>
                  <div style={{color:'#C42020',fontSize:'11px',marginBottom:'2px'}}>{fav.schools?.name_jp}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{fav.schools?.city}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{color:'#F0A830',fontSize:'13px',fontFamily:'monospace'}}>¥{fav.schools?.annual_fee_jpy?.toLocaleString()}</div>
                  <div style={{color:'#F0A830',fontSize:'12px'}}>⭐ {fav.schools?.rating}</div>
                </div>
                <div style={{display:'flex',gap:'6px'}}>
                  <a href={'/schools/' + fav.school_id} style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',textDecoration:'none',padding:'6px 12px',borderRadius:'6px',fontSize:'12px',fontWeight:'600'}}>View</a>
                  <button onClick={()=>removeFavorite(fav.school_id)} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)',border:'none',padding:'6px 12px',borderRadius:'6px',fontSize:'12px',cursor:'pointer'}}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'applications' && (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700'}}>My Applications ({applications.length})</h2>
              <a href="/apply" style={{color:'#C42020',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>+ New Application</a>
            </div>
            {applications.length === 0 ? (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'48px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontSize:'48px',marginBottom:'16px'}}>📝</div>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>No applications yet!</p>
                <a href="/apply" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Apply Now</a>
              </div>
            ) : applications.map((app:any)=>(
              <div key={app.id} style={{background:'#1A2035',borderRadius:'10px',padding:'16px',display:'flex',alignItems:'center',gap:'14px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontSize:'32px'}}>{app.schools?.icon}</div>
                <div style={{flex:1}}>
                  <div style={{color:'white',fontSize:'14px',fontWeight:'600'}}>{app.schools?.name_en}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{app.schools?.city}</div>
                  <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Applied: {new Date(app.created_at).toLocaleDateString()}</div>
                </div>
                <span style={{background:statusColors[app.status]+'20',color:statusColors[app.status],padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',textTransform:'capitalize'}}>{app.status}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>My Reviews ({reviews.length})</h2>
            {reviews.length === 0 ? (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'48px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontSize:'48px',marginBottom:'16px'}}>⭐</div>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>No reviews yet!</p>
                <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Review a School</a>
              </div>
            ) : reviews.map((review:any)=>(
              <div key={review.id} style={{background:'#1A2035',borderRadius:'10px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
                  <div style={{fontSize:'28px'}}>{review.schools?.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px',flexWrap:'wrap',gap:'8px'}}>
                      <span style={{color:'white',fontSize:'14px',fontWeight:'600'}}>{review.schools?.name_en}</span>
                      <div>
                        <span style={{color:'#F0A830',fontSize:'16px'}}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                        <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',marginLeft:'8px'}}>{new Date(review.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Delete Account */}
<div style={{background:'rgba(196,32,32,0.1)',borderRadius:'12px',padding:'20px',marginTop:'24px',border:'1px solid rgba(196,32,32,0.2)'}}>
  <h3 style={{color:'#FF8070',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>⚠️ Danger Zone</h3>
  <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'14px'}}>Permanently delete your account and all associated data. This action cannot be undone.</p>
  <button onClick={async()=>{
    if(confirm('Are you sure you want to delete your account? This cannot be undone.')){
      await supabase.from('profiles').delete().eq('id',user?.id)
      await supabase.auth.signOut()
      window.location.href='/'
    }
  }} style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
    Delete My Account
  </button>
</div>
    </main>
  )
}