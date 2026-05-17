'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function getData() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { window.location.href = '/login'; return }
      setUser(userData.user)
      setName(userData.user.user_metadata?.full_name || '')
      const { data: favData } = await supabase.from('favorites').select('school_id, schools(name_en, name_jp, city, icon, annual_fee_jpy, rating)').eq('user_id', userData.user.id)
      if (favData) setFavorites(favData)
      setLoading(false)
    }
    getData()
  }, [])

  async function updateProfile() {
    await supabase.auth.updateUser({ data: { full_name: name } })
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

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <div style={{display:'flex',alignItems:'center',gap:'20px',flexWrap:'wrap'}}>
          <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',fontWeight:'700',color:'white',flexShrink:0}}>
            {name ? name[0].toUpperCase() : '?'}
          </div>
          <div>
            <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>{name || 'My Profile'}</h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>{user?.email}</p>
            <p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px',marginTop:'4px'}}>Member since {new Date(user?.created_at).toLocaleDateString()}</p>
          </div>
          <button onClick={handleLogout} style={{marginLeft:'auto',background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.6)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',cursor:'pointer'}}>
            Sign Out
          </button>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px',display:'flex',flexDirection:'column',gap:'20px'}}>
        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Edit Profile</h2>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" style={{flex:1,minWidth:'200px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
            <button onClick={updateProfile} style={{background:saved?'#2EC87A':'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
              {saved ? 'Saved!' : 'Save'}
            </button>
          </div>
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>
            My Favorite Schools {favorites.length > 0 && <span style={{color:'#C42020',fontSize:'14px'}}>({favorites.length})</span>}
          </h2>
          {favorites.length === 0 ? (
            <div style={{textAlign:'center',padding:'32px'}}>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>No favorites yet!</p>
              <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Browse Schools</a>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {favorites.map((fav:any)=>(
                <div key={fav.school_id} style={{background:'#0D0907',borderRadius:'10px',padding:'14px',display:'flex',alignItems:'center',gap:'14px'}}>
                  <div style={{fontSize:'28px'}}>{fav.schools?.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{color:'white',fontSize:'14px',fontWeight:'600'}}>{fav.schools?.name_en}</div>
                    <div style={{color:'#C42020',fontSize:'11px',marginBottom:'2px'}}>{fav.schools?.name_jp}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{fav.schools?.city}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{color:'#F0A830',fontSize:'13px',fontFamily:'monospace'}}>Yen {fav.schools?.annual_fee_jpy?.toLocaleString()}</div>
                    <div style={{color:'#F0A830',fontSize:'12px'}}>{fav.schools?.rating} stars</div>
                  </div>
                  <div style={{display:'flex',gap:'8px'}}>
                    <a href={'/schools/' + fav.school_id} style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',textDecoration:'none',padding:'6px 12px',borderRadius:'6px',fontSize:'12px',fontWeight:'600'}}>View</a>
                    <button onClick={()=>removeFavorite(fav.school_id)} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)',border:'none',padding:'6px 12px',borderRadius:'6px',fontSize:'12px',cursor:'pointer'}}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Quick Links</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:'10px'}}>
            {[
              {href:'/dashboard',icon:'📊',label:'Dashboard'},
              {href:'/schools',icon:'🏫',label:'Browse Schools'},
              {href:'/chat',icon:'🌸',label:'Sakura AI'},
              {href:'/pricing',icon:'💎',label:'Upgrade to Pro'},
            ].map(link=>(
              <a key={link.href} href={link.href} style={{background:'#0D0907',color:'white',textDecoration:'none',padding:'14px',borderRadius:'8px',textAlign:'center',display:'block'}}>
                <div style={{fontSize:'24px',marginBottom:'6px'}}>{link.icon}</div>
                <div style={{fontSize:'13px'}}>{link.label}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}