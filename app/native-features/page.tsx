'use client'
import { useState, useEffect } from 'react'

export default function NativeFeaturesPage() {
  const [location, setLocation] = useState<any>(null)
  const [locationError, setLocationError] = useState('')
  const [notificationPermission, setNotificationPermission] = useState('')
  const [shared, setShared] = useState(false)
  const [isNative, setIsNative] = useState(false)

  useEffect(() => {
    // Check if running as native app
    const isCapacitor = typeof (window as any).Capacitor !== 'undefined'
    setIsNative(isCapacitor)

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  async function requestLocation() {
    try {
      if (typeof (window as any).Capacitor !== 'undefined') {
        const { Geolocation } = await import('@capacitor/geolocation')
        const position = await Geolocation.getCurrentPosition()
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      } else {
        navigator.geolocation.getCurrentPosition(
          (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => setLocationError('Location access denied')
        )
      }
    } catch (err) {
      setLocationError('Location access denied')
    }
  }

  async function requestNotifications() {
    try {
      if (typeof (window as any).Capacitor !== 'undefined') {
        const { PushNotifications } = await import('@capacitor/push-notifications')
        const permission = await PushNotifications.requestPermissions()
        setNotificationPermission(permission.receive)
      } else {
        const permission = await Notification.requestPermission()
        setNotificationPermission(permission)
        if (permission === 'granted') {
          new Notification('🌸 Japan Life Guide', {
            body: 'Notifications enabled! You will receive visa deadline reminders.',
          })
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function shareApp() {
    try {
      if (typeof (window as any).Capacitor !== 'undefined') {
        const { Share } = await import('@capacitor/share')
        await Share.share({
          title: 'Japan Life Guide',
          text: 'The best app for studying and working in Japan! 🌸',
          url: 'https://japanlifeguide.app',
        })
      } else {
        if (navigator.share) {
          await navigator.share({
            title: 'Japan Life Guide',
            text: 'The best app for studying and working in Japan! 🌸',
            url: 'https://japanlifeguide.app',
          })
        }
      }
      setShared(true)
    } catch (err) {
      console.error(err)
    }
  }

  async function triggerHaptic() {
    try {
      if (typeof (window as any).Capacitor !== 'undefined') {
        const { Haptics, ImpactStyle } = await import('@capacitor/haptics')
        await Haptics.impact({ style: ImpactStyle.Medium })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>📱 Native Features</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Japan Life Guide native app features</p>
        <div style={{marginTop:'12px'}}>
          <span style={{background: isNative ? 'rgba(46,200,122,0.2)' : 'rgba(255,255,255,0.1)',color: isNative ? '#2EC87A' : 'rgba(255,255,255,0.5)',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>
            {isNative ? '📱 Running as Native App' : '🌐 Running as Web App'}
          </span>
        </div>
      </div>

      <div style={{maxWidth:'600px',margin:'0 auto',padding:'32px 20px',display:'flex',flexDirection:'column',gap:'16px'}}>

        {/* Push Notifications */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'16px'}}>
            <span style={{fontSize:'36px'}}>🔔</span>
            <div>
              <h2 style={{color:'white',fontSize:'17px',fontWeight:'700',marginBottom:'4px'}}>Push Notifications</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>
                Get notified about visa deadlines, new schools, and JLPT registration dates.
              </p>
            </div>
          </div>
          <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
            <button onClick={requestNotifications} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
              {notificationPermission === 'granted' ? '✅ Enabled' : 'Enable Notifications'}
            </button>
            {notificationPermission === 'granted' && (
              <span style={{color:'#2EC87A',fontSize:'12px'}}>Notifications are active!</span>
            )}
          </div>
        </div>

        {/* Location */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'16px'}}>
            <span style={{fontSize:'36px'}}>📍</span>
            <div>
              <h2 style={{color:'white',fontSize:'17px',fontWeight:'700',marginBottom:'4px'}}>Location Services</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>
                Find nearby halal restaurants, mosques, and Japanese language schools.
              </p>
            </div>
          </div>
          {location ? (
            <div style={{background:'rgba(46,200,122,0.1)',borderRadius:'8px',padding:'12px',marginBottom:'12px',border:'1px solid rgba(46,200,122,0.2)'}}>
              <p style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700'}}>✅ Location accessed!</p>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}</p>
            </div>
          ) : locationError ? (
            <div style={{background:'rgba(196,32,32,0.1)',borderRadius:'8px',padding:'12px',marginBottom:'12px'}}>
              <p style={{color:'#FF8070',fontSize:'12px'}}>{locationError}</p>
            </div>
          ) : null}
          <div style={{display:'flex',gap:'10px'}}>
            <button onClick={requestLocation} style={{background:'#4A8EFF',color:'white',border:'none',borderRadius:'8px',padding:'12px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
              Get My Location
            </button>
            {location && (
              <a href={`/halal?lat=${location.lat}&lng=${location.lng}`} style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>
                Find Halal Food 🕌
              </a>
            )}
          </div>
        </div>

        {/* Camera / Halal Scanner */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'16px'}}>
            <span style={{fontSize:'36px'}}>📷</span>
            <div>
              <h2 style={{color:'white',fontSize:'17px',fontWeight:'700',marginBottom:'4px'}}>Halal Scanner</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>
                Scan food ingredients with your camera to check if it's halal.
              </p>
            </div>
          </div>
          <a href="/halal-scanner" onClick={triggerHaptic} style={{background:'#2EC87A',color:'#0D0907',textDecoration:'none',padding:'12px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'inline-block'}}>
            Open Halal Scanner 🔍
          </a>
        </div>

        {/* Share */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'16px'}}>
            <span style={{fontSize:'36px'}}>🔗</span>
            <div>
              <h2 style={{color:'white',fontSize:'17px',fontWeight:'700',marginBottom:'4px'}}>Share App</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>
                Share Japan Life Guide with friends from Bangladesh and Nepal.
              </p>
            </div>
          </div>
          <button onClick={shareApp} style={{background:'#F0A830',color:'#0D0907',border:'none',borderRadius:'8px',padding:'12px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
            {shared ? '✅ Shared!' : 'Share App 📤'}
          </button>
        </div>

        {/* Visa Tracker */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'16px'}}>
            <span style={{fontSize:'36px'}}>🪪</span>
            <div>
              <h2 style={{color:'white',fontSize:'17px',fontWeight:'700',marginBottom:'4px'}}>Visa Document Tracker</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>
                Track your visa and residence card expiry dates with local reminders.
              </p>
            </div>
          </div>
          <a href="/visa-tracker" style={{background:'#A855F7',color:'white',textDecoration:'none',padding:'12px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'inline-block'}}>
            Open Visa Tracker 📅
          </a>
        </div>

        {/* JLPT Practice */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'16px'}}>
            <span style={{fontSize:'36px'}}>📝</span>
            <div>
              <h2 style={{color:'white',fontSize:'17px',fontWeight:'700',marginBottom:'4px'}}>JLPT Practice Tests</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>
                Practice Japanese language tests offline with AI-generated questions.
              </p>
            </div>
          </div>
          <a href="/jlpt-test" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'inline-block'}}>
            Start JLPT Practice 🎯
          </a>
        </div>

      </div>
    </main>
  )
}