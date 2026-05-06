'use client'

export default function VisaPage() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>
          Visa Guide
        </h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>
          Step-by-step guide for all visa types
        </p>
      </div>

      <div style={{padding:'40px',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'16px'}}>
          {[
            {icon:'🏫',name:'Student Visa',jp:'留学ビザ',dur:'Up to 2 years',work:'28 hrs/week',color:'#4A8EFF'},
            {icon:'🏭',name:'SSW Visa',jp:'特定技能',dur:'Up to 5 years',work:'Full-time',color:'#C42020'},
            {icon:'💻',name:'Engineer Visa',jp:'技術・人文',dur:'1-5 years',work:'Full-time',color:'#2EC87A'},
            {icon:'🌏',name:'Work Visa',jp:'就労ビザ',dur:'1-3 years',work:'Full-time',color:'#F0A830'},
            {icon:'✈️',name:'Tourist Visa',jp:'短期滞在',dur:'15-90 days',work:'No work',color:'#A855F7'},
            {icon:'🏠',name:'Permanent Residency',jp:'永住権',dur:'Permanent',work:'Unlimited',color:'#2EC87A'},
          ].map(v=>(
            <div key={v.name} style={{background:'#1A2035',borderTop:`3px solid ${v.color}`,borderRadius:'12px',padding:'22px'}}>
              <div style={{fontSize:'28px',marginBottom:'10px'}}>{v.icon}</div>
              <div style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'4px'}}>{v.name}</div>
              <div style={{color:v.color,fontSize:'12px',marginBottom:'14px'}}>{v.jp}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                <div style={{background:'#0D0907',borderRadius:'6px',padding:'8px',textAlign:'center'}}>
                  <div style={{color:'white',fontSize:'12px',fontWeight:'600'}}>{v.dur}</div>
                  <div style={{color:'rgba(255,255,255,0.3)',fontSize:'10px'}}>Duration</div>
                </div>
                <div style={{background:'#0D0907',borderRadius:'6px',padding:'8px',textAlign:'center'}}>
                  <div style={{color:v.color,fontSize:'12px',fontWeight:'600'}}>{v.work}</div>
                  <div style={{color:'rgba(255,255,255,0.3)',fontSize:'10px'}}>Work</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{color:'white',fontSize:'24px',margin:'40px 0 20px'}}>Student Visa Steps</h2>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {[
            {n:'1',t:'Apply to School',d:'Submit application with bank statement 2000000 JPY and certificates',s:'done'},
            {n:'2',t:'Receive Acceptance',d:'School sends official acceptance letter',s:'done'},
            {n:'3',t:'COE Processing',d:'School applies to Japan Immigration. Wait 4 to 8 weeks.',s:'current'},
            {n:'4',t:'Apply at Embassy',d:'Take COE to Japanese Embassy in your country',s:'upcoming'},
            {n:'5',t:'Receive Visa',d:'Passport returned with Student Visa stamp',s:'upcoming'},
            {n:'6',t:'Fly to Japan',d:'Register at city hall within 14 days of arrival',s:'upcoming'},
          ].map((step,i)=>(
            <div key={i} style={{display:'flex',gap:'16px',alignItems:'flex-start'}}>
              <div style={{width:'36px',height:'36px',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700',background:step.s==='done'?'#2EC87A':step.s==='current'?'#C42020':'#1A2035',color:'white',border:step.s==='upcoming'?'2px solid rgba(255,255,255,0.2)':'none'}}>
                {step.s==='done'?'✓':step.n}
              </div>
              <div>
                <div style={{color:step.s==='done'?'#2EC87A':step.s==='current'?'#C42020':'white',fontSize:'15px',fontWeight:'700',marginBottom:'4px'}}>{step.t}</div>
                <div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>{step.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}