'use client'
import { useState } from 'react'

const HOUSING = [
  {id:1,icon:'🏠',type:'Share House',name:'Tokyo Share House Network',location:'Various, Tokyo',price:'40,000 - 80,000',deposit:'0 - 1 month',minStay:'1 month',desc:'Furnished rooms with shared kitchen, bathroom, and common areas. Great for making friends!',features:['Furnished','WiFi Included','No Guarantor','International Friendly'],rating:4.5},
  {id:2,icon:'🏢',type:'Dormitory',name:'School Dormitory',location:'Near your school',price:'25,000 - 50,000',deposit:'1 month',minStay:'6 months',desc:'Offered by language schools. Cheapest option with meals sometimes included.',features:['Cheapest Option','Near School','Meals Available','Safe'],rating:4.3},
  {id:3,icon:'🏘️',type:'Apartment',name:'Monthly Apartment (Mansion)',location:'Various Cities',price:'60,000 - 120,000',deposit:'2-3 months',minStay:'6 months',desc:'Your own private apartment. More expensive but most privacy. Need guarantor.',features:['Private','Kitchen','Your Own Space','Long Term'],rating:4.2},
  {id:4,icon:'🌸',type:'Guest House',name:'Sakura House',location:'Tokyo & Osaka',price:'45,000 - 75,000',deposit:'0',minStay:'1 month',desc:'International guest houses with no deposit and no guarantor required. Perfect for new arrivals.',features:['No Deposit','No Guarantor','International','Furnished'],rating:4.6},
  {id:5,icon:'🏡',type:'Homestay',name:'Japanese Family Homestay',location:'Nationwide',price:'70,000 - 100,000',deposit:'0',minStay:'1 month',desc:'Live with a Japanese family. Meals included. Best way to improve Japanese!',features:['Meals Included','Japanese Practice','Cultural Experience','Safe'],rating:4.7},
  {id:6,icon:'🏗️',type:'UR Housing',name:'UR Rental Housing',location:'Major Cities',price:'50,000 - 90,000',deposit:'0',minStay:'No minimum',desc:'Government-managed housing. No guarantor needed, no deposit, no agency fee!',features:['No Guarantor','No Deposit','Government Managed','Affordable'],rating:4.4},
]

const TIPS = [
  {icon:'📋',title:'Documents Needed',desc:'Passport, residence card, school enrollment certificate, bank account, and guarantor letter (if required).'},
  {icon:'💰',title:'Typical Costs',desc:'Rent + deposit + key money + agency fee can cost 3-5 months rent upfront. Budget carefully!'},
  {icon:'🔍',title:'Where to Search',desc:'Suumo, Homes.jp, Leopalace21, and GaijinPot Housing are good websites for foreigner-friendly housing.'},
  {icon:'🤝',title:'Guarantor (Hoshounin)',desc:'Many apartments require a Japanese guarantor. Your school may help, or use a guarantor company for a fee.'},
  {icon:'🚉',title:'Location Tips',desc:'Living 30-40 minutes from school by train can save 20,000-30,000 Yen per month on rent.'},
  {icon:'📱',title:'Useful Apps',desc:'Suumo, LIFULL HOME\'S, and AtHome are the top housing apps in Japan. Available in English.'},
]

export default function HousingPage() {
  const [type, setType] = useState('All')
  const [maxPrice, setMaxPrice] = useState('')

  const types = ['All', 'Share House', 'Dormitory', 'Apartment', 'Guest House', 'Homestay', 'UR Housing']

  const filtered = HOUSING.filter(h => {
    const matchType = type === 'All' || h.type === type
    const price = parseInt(h.price.split(' - ')[0].replace(',',''))
    const matchPrice = !maxPrice || price <= parseInt(maxPrice)
    return matchType && matchPrice
  })

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Housing in Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Find the perfect place to live during your Japan journey</p>
      </div>

      <div style={{background:'#141E35',padding:'16px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
        <select value={type} onChange={e=>setType(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
          {types.map(t=><option key={t} value={t}>{t}</option>)}
        </select>
        <select value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
          <option value="">Any Price</option>
          <option value="50000">Under 50,000 Yen</option>
          <option value="70000">Under 70,000 Yen</option>
          <option value="90000">Under 90,000 Yen</option>
        </select>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'16px',marginBottom:'40px'}}>
          {filtered.map(house=>(
            <div key={house.id} style={{background:'#1A2035',borderRadius:'14px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{background:'rgba(196,32,32,0.08)',padding:'24px',textAlign:'center'}}>
                <div style={{fontSize:'48px',marginBottom:'8px'}}>{house.icon}</div>
                <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{house.type}</span>
              </div>
              <div style={{padding:'18px'}}>
                <h2 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'4px'}}>{house.name}</h2>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'8px'}}>📍 {house.location}</p>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',lineHeight:'1.6',marginBottom:'12px'}}>{house.desc}</p>
                <div style={{display:'flex',gap:'4px',flexWrap:'wrap',marginBottom:'12px'}}>
                  {house.features.map(f=>(
                    <span key={f} style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'2px 7px',borderRadius:'4px',fontSize:'10px'}}>{f}</span>
                  ))}
                </div>
                <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'12px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                    <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>Monthly Rent</span>
                    <span style={{color:'#F0A830',fontSize:'13px',fontWeight:'700'}}>Yen {house.price}</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                    <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>Deposit</span>
                    <span style={{color:'white',fontSize:'12px'}}>{house.deposit}</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'12px'}}>
                    <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>Min Stay</span>
                    <span style={{color:'white',fontSize:'12px'}}>{house.minStay}</span>
                  </div>
                  <button style={{width:'100%',background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
                    Inquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'20px'}}>Housing Tips</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'14px'}}>
          {TIPS.map(tip=>(
            <div key={tip.title} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{fontSize:'28px',marginBottom:'10px'}}>{tip.icon}</div>
              <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>{tip.title}</h3>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>{tip.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h3 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>Need help finding housing?</h3>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'16px'}}>Ask Sakura AI for personalized housing recommendations!</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}