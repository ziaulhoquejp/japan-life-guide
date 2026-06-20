'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const CITIES = [
  {
    name:'Tokyo', icon:'🗼', tagline:'Japan\'s vibrant capital',
    overview:'Tokyo offers the most schools, jobs, and international community but comes with higher living costs. Best for those wanting maximum opportunities.',
    areas:['Shinjuku - Business and entertainment hub','Shibuya - Youth culture and fashion','Ikebukuro - Affordable, diverse area','Asakusa - Traditional culture'],
    avgRent:'¥60,000-80,000/month',
    avgTotal:'¥120,000-160,000/month',
    pros:['Most job opportunities','Best public transport','Largest international community','Most schools to choose from'],
    cons:['Highest cost of living','Crowded','Competitive'],
    halal:'Excellent - Tokyo Camii and many halal restaurants in Shinjuku, Ueno areas',
  },
  {
    name:'Osaka', icon:'🏯', tagline:'Affordable alternative with amazing food',
    overview:'Osaka offers a great balance of city life, job opportunities, and lower costs than Tokyo. Known for friendly locals and incredible food culture.',
    areas:['Namba - Shopping and entertainment','Umeda - Business district','Tennoji - Affordable residential area'],
    avgRent:'¥45,000-65,000/month',
    avgTotal:'¥90,000-130,000/month',
    pros:['20-30% cheaper than Tokyo','Friendly local culture','Great food scene','Good job market'],
    cons:['Fewer schools than Tokyo','Smaller international community than Tokyo'],
    halal:'Good - Several halal restaurants in Namba and Nipponbashi areas',
  },
  {
    name:'Kyoto', icon:'⛩️', tagline:'Traditional culture meets education',
    overview:'Kyoto combines deep traditional Japanese culture with a strong academic environment, home to many universities and language schools.',
    areas:['Kyoto Station area - Central, convenient','Demachiyanagi - Student area near universities'],
    avgRent:'¥45,000-65,000/month',
    avgTotal:'¥90,000-130,000/month',
    pros:['Rich cultural experience','Many universities nearby','Beautiful temples and nature','Good student community'],
    cons:['Tourist crowds in central areas','Limited nightlife compared to Tokyo/Osaka'],
    halal:'Growing - halal options near Kyoto Station and university areas',
  },
  {
    name:'Fukuoka', icon:'🍜', tagline:'Affordable city with growing opportunities',
    overview:'Fukuoka is becoming a popular choice for international students and entrepreneurs due to its affordability and growing startup scene.',
    areas:['Tenjin - Central shopping and business','Hakata - Transport hub'],
    avgRent:'¥30,000-50,000/month',
    avgTotal:'¥75,000-110,000/month',
    pros:['Very affordable','Growing job market','Close to South Korea','Friendly community'],
    cons:['Fewer schools than major cities','Smaller international community'],
    halal:'Growing - Hakata halal ramen and Muslim restaurants in Tenjin area',
  },
  {
    name:'Nagoya', icon:'🗻', tagline:'Industrial hub with strong job market',
    overview:'Nagoya is a major manufacturing center with strong ties to companies like Toyota, offering excellent job prospects for engineering students.',
    areas:['Sakae - Central business and shopping','Nagoya Station - Transport and business hub'],
    avgRent:'¥35,000-55,000/month',
    avgTotal:'¥85,000-120,000/month',
    pros:['Strong manufacturing job market','Reasonable cost of living','Good transport access'],
    cons:['Less internationally diverse','Quieter nightlife'],
    halal:'Good - Several halal restaurants in Sakae area',
  },
  {
    name:'Sapporo', icon:'🏔️', tagline:'Nature lovers paradise',
    overview:'Sapporo offers a unique experience with beautiful nature, snow festivals, and lower cost of living, perfect for those who love outdoor activities.',
    areas:['Susukino - Entertainment district','Odori - Central park area'],
    avgRent:'¥30,000-48,000/month',
    avgTotal:'¥75,000-105,000/month',
    pros:['Beautiful nature','Affordable','Famous snow festival','Friendly community'],
    cons:['Very cold winters','Fewer job opportunities','Smaller international community'],
    halal:'Limited but growing - halal ramen options in Susukino',
  },
]

export default function CitiesPage() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [activeTab, setActiveTab] = useState('overview')
  const [schoolCount, setSchoolCount] = useState(0)

  useEffect(() => {
    async function loadCount() {
      const { count } = await supabase.from('schools').select('*', { count: 'exact', head: true }).eq('city', selectedCity.name)
      setSchoolCount(count || 0)
    }
    loadCount()
  }, [selectedCity])

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>City Guide</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Find the perfect city in Japan for your studies</p>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>

        {/* City Selector */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'10px',marginBottom:'24px'}}>
          {CITIES.map(city => (
            <button key={city.name} onClick={()=>{setSelectedCity(city); setActiveTab('overview')}} style={{background: selectedCity.name===city.name ? 'rgba(196,32,32,0.15)' : '#1A2035',border:'2px solid ' + (selectedCity.name===city.name ? '#C42020' : 'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'14px',cursor:'pointer',textAlign:'center'}}>
              <div style={{fontSize:'28px',marginBottom:'6px'}}>{city.icon}</div>
              <div style={{color:'white',fontSize:'12px',fontWeight:'700'}}>{city.name}</div>
            </button>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',gap:'16px',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap'}}>
            <span style={{fontSize:'48px'}}>{selectedCity.icon}</span>
            <div style={{flex:1}}>
              <h2 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'4px'}}>{selectedCity.name}</h2>
              <p style={{color:'#C42020',fontSize:'14px',marginBottom:'8px'}}>{selectedCity.tagline}</p>
              {schoolCount > 0 && (
                <a href={'/schools?city=' + encodeURIComponent(selectedCity.name)} style={{color:'#2EC87A',fontSize:'12px',textDecoration:'none',fontWeight:'600'}}>
                  {schoolCount} schools available →
                </a>
              )}
            </div>
          </div>

          <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
            {['overview','costs','areas','halal'].map(tab => (
              <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'rgba(255,255,255,0.06)',border:'none',borderRadius:'20px',padding:'7px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
                {tab === 'overview' ? '📋 Overview' : tab === 'costs' ? '💰 Costs' : tab === 'areas' ? '📍 Areas' : '🕌 Halal'}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div>
              <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.8',marginBottom:'20px'}}>{selectedCity.overview}</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
                <div>
                  <h3 style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700',marginBottom:'10px'}}>✓ Pros</h3>
                  {selectedCity.pros.map((p,i) => (
                    <div key={i} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
                      <span style={{color:'#2EC87A',flexShrink:0}}>✓</span>
                      <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{p}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 style={{color:'#C42020',fontSize:'13px',fontWeight:'700',marginBottom:'10px'}}>✗ Cons</h3>
                  {selectedCity.cons.map((c,i) => (
                    <div key={i} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
                      <span style={{color:'#C42020',flexShrink:0}}>✗</span>
                      <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'costs' && (
            <div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
                <div style={{background:'#0D0907',borderRadius:'10px',padding:'16px'}}>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'4px'}}>Average Rent</p>
                  <p style={{color:'#F0A830',fontSize:'18px',fontWeight:'700'}}>{selectedCity.avgRent}</p>
                </div>
                <div style={{background:'#0D0907',borderRadius:'10px',padding:'16px'}}>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'4px'}}>Total Monthly Cost</p>
                  <p style={{color:'#C42020',fontSize:'18px',fontWeight:'700'}}>{selectedCity.avgTotal}</p>
                </div>
              </div>
              <a href="/cost-calculator" style={{display:'inline-block',background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
                Get Detailed Cost Estimate →
              </a>
            </div>
          )}

          {activeTab === 'areas' && (
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {selectedCity.areas.map((area,i) => (
                <div key={i} style={{background:'#0D0907',borderRadius:'10px',padding:'14px',display:'flex',gap:'10px',alignItems:'center'}}>
                  <span style={{color:'#C42020',fontSize:'18px'}}>📍</span>
                  <span style={{color:'white',fontSize:'13px'}}>{area}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'halal' && (
            <div style={{background:'rgba(46,200,122,0.1)',borderRadius:'10px',padding:'16px',border:'1px solid rgba(46,200,122,0.2)'}}>
              <p style={{color:'#2EC87A',fontSize:'13px',lineHeight:'1.7'}}>{selectedCity.halal}</p>
              <a href="/halal" style={{display:'inline-block',marginTop:'12px',color:'#2EC87A',fontSize:'12px',textDecoration:'none',fontWeight:'600'}}>
                View Full Halal Guide →
              </a>
            </div>
          )}
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need help choosing the right city?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}