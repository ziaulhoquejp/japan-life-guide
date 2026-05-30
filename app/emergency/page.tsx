export default function EmergencyPage() {
  const emergencyNumbers = [
    {icon:'🚨',number:'110',name:'Police',jp:'警察',desc:'For crime, theft, accidents involving crime. Available 24/7.',color:'#C42020'},
    {icon:'🚑',number:'119',name:'Ambulance & Fire',jp:'救急・消防',desc:'For medical emergencies and fires. Available 24/7.',color:'#C42020'},
    {icon:'🏥',number:'#7119',name:'Medical Advice Hotline',jp:'救急安心センター',desc:'For non-emergency medical questions. Some areas have English support.',color:'#F0A830'},
    {icon:'☎️',number:'03-3501-0110',name:'Police English Hotline',jp:'警察英語ホットライン',desc:'Tokyo Metropolitan Police English assistance line.',color:'#4A8EFF'},
    {icon:'🌍',number:'0570-010-007',name:'JNTO Tourist Hotline',jp:'観光案内',desc:'Japan National Tourism Organization. Help in English 24/7.',color:'#2EC87A'},
    {icon:'🏛️',number:'0570-090-911',name:'Immigration Hotline',jp:'出入国在留管理庁',desc:'For visa and immigration questions. English available.',color:'#A855F7'},
  ]

  const embassies = [
    {country:'Bangladesh',icon:'🇧🇩',phone:'03-3234-5801',address:'3-29 Kioicho, Chiyoda City, Tokyo',hours:'Mon-Fri 9AM-5PM',emergency:'Available for emergencies'},
    {country:'Nepal',icon:'🇳🇵',phone:'03-3713-6241',address:'20-28 6Chome, Shimomeguro, Meguro City, Tokyo',hours:'Mon-Fri 9AM-5PM',emergency:'Available for emergencies'},
  ]

  const disasterInfo = [
    {icon:'🌊',title:'Tsunami Warning',desc:'If you hear a tsunami warning, go to high ground immediately. Do not return until the all-clear is given.'},
    {icon:'🌋',title:'Earthquake',desc:'During earthquake: drop, cover, hold on. Stay away from windows. Do not use elevators. After shaking stops, check for gas leaks.'},
    {icon:'🌀',title:'Typhoon',desc:'Stay indoors during typhoon. Follow evacuation orders from local government. Store emergency supplies.'},
    {icon:'📻',title:'Emergency Alerts',desc:'Download NHK World app for English emergency alerts. Register your phone number for local disaster alerts.'},
  ]

  const supplies = [
    'Water (3 liters per person per day, 3 days supply)',
    'Emergency food (3 day supply)',
    'First aid kit',
    'Flashlight and batteries',
    'Portable radio',
    'Cash (ATMs may not work in disasters)',
    'Copy of passport and residence card',
    'Medications if needed',
    'Warm clothes and rain gear',
    'Emergency contact list (written, not just in phone)',
  ]

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#C42020',padding:'40px',borderBottom:'3px solid #8B0000',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'12px'}}>🆘</div>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Emergency Information</h1>
        <p style={{color:'rgba(255,255,255,0.8)',fontSize:'16px'}}>Save these numbers before you need them!</p>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'16px'}}>Emergency Numbers</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'12px',marginBottom:'40px'}}>
          {emergencyNumbers.map(num=>(
            <div key={num.number} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'2px solid ' + num.color + '40',borderLeft:'4px solid ' + num.color}}>
              <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'10px'}}>
                <span style={{fontSize:'28px'}}>{num.icon}</span>
                <div>
                  <div style={{color:num.color,fontSize:'22px',fontWeight:'700',fontFamily:'monospace'}}>{num.number}</div>
                  <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{num.name}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{num.jp}</div>
                </div>
              </div>
              <p style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',lineHeight:'1.5'}}>{num.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'16px'}}>Your Embassy in Japan</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'12px',marginBottom:'40px'}}>
          {embassies.map(emb=>(
            <div key={emb.country} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'12px'}}>
                <span style={{fontSize:'36px'}}>{emb.icon}</span>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700'}}>{emb.country} Embassy</h3>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                  <span style={{color:'#C42020',fontSize:'14px'}}>📞</span>
                  <span style={{color:'white',fontSize:'14px',fontFamily:'monospace',fontWeight:'600'}}>{emb.phone}</span>
                </div>
                <div style={{display:'flex',gap:'8px',alignItems:'flex-start'}}>
                  <span style={{color:'#C42020',fontSize:'14px'}}>📍</span>
                  <span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>{emb.address}</span>
                </div>
                <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                  <span style={{color:'#C42020',fontSize:'14px'}}>🕐</span>
                  <span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>{emb.hours}</span>
                </div>
                <div style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'6px 10px',borderRadius:'6px',fontSize:'11px',marginTop:'4px'}}>
                  {emb.emergency}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'16px'}}>Natural Disaster Guide</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))',gap:'12px',marginBottom:'40px'}}>
          {disasterInfo.map(d=>(
            <div key={d.title} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{fontSize:'32px',marginBottom:'10px'}}>{d.icon}</div>
              <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>{d.title}</h3>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6'}}>{d.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'16px'}}>Emergency Supply Checklist</h2>
        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            {supplies.map((item,i)=>(
              <div key={i} style={{display:'flex',gap:'8px',alignItems:'center',color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>
                <span style={{color:'#2EC87A',flexShrink:0}}>✓</span>{item}
              </div>
            ))}
          </div>
        </div>

        <div style={{background:'rgba(196,32,32,0.1)',border:'2px solid #C42020',borderRadius:'12px',padding:'24px',textAlign:'center'}}>
          <h3 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>Save This Page!</h3>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginBottom:'16px'}}>Screenshot this page and save it to your phone. You may need it without internet access.</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/community" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Community Help</a>
          </div>
        </div>
      </div>
    </main>
  )
}