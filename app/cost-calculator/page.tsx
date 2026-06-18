'use client'
import { useState } from 'react'

const CITIES = [
  {name:'Tokyo',rent:{share:50000,private:75000,dorm:40000},food:{budget:25000,average:35000,comfort:50000},transport:12000,utilities:10000},
  {name:'Osaka',rent:{share:40000,private:60000,dorm:30000},food:{budget:22000,average:30000,comfort:45000},transport:9000,utilities:9000},
  {name:'Kyoto',rent:{share:40000,private:60000,dorm:30000},food:{budget:22000,average:30000,comfort:45000},transport:8000,utilities:9000},
  {name:'Sapporo',rent:{share:30000,private:48000,dorm:25000},food:{budget:20000,average:28000,comfort:40000},transport:7000,utilities:12000},
  {name:'Fukuoka',rent:{share:30000,private:48000,dorm:25000},food:{budget:19000,average:27000,comfort:38000},transport:7000,utilities:8000},
  {name:'Nagoya',rent:{share:35000,private:55000,dorm:28000},food:{budget:21000,average:29000,comfort:42000},transport:8000,utilities:9000},
  {name:'Sendai',rent:{share:30000,private:45000,dorm:24000},food:{budget:19000,average:27000,comfort:38000},transport:7000,utilities:11000},
  {name:'Hiroshima',rent:{share:30000,private:46000,dorm:24000},food:{budget:19000,average:27000,comfort:38000},transport:7000,utilities:9000},
]

export default function CostCalculatorPage() {
  const [city, setCity] = useState('Tokyo')
  const [housing, setHousing] = useState<'share'|'private'|'dorm'>('share')
  const [foodStyle, setFoodStyle] = useState<'budget'|'average'|'comfort'>('average')
  const [hasPhone, setHasPhone] = useState(true)
  const [hasInternet, setHasInternet] = useState(true)
  const [entertainment, setEntertainment] = useState(10000)
  const [schoolFee, setSchoolFee] = useState(600000)
  const [workHours, setWorkHours] = useState(20)
  const [wage, setWage] = useState(1100)

  const selectedCity = CITIES.find(c=>c.name===city) || CITIES[0]

  const rent = selectedCity.rent[housing]
  const food = selectedCity.food[foodStyle]
  const transport = selectedCity.transport
  const utilities = housing === 'share' ? 0 : selectedCity.utilities
  const phone = hasPhone ? 3000 : 0
  const internet = hasInternet && housing !== 'share' ? 4000 : 0
  const total = rent + food + transport + utilities + phone + internet + entertainment
  const monthlySchoolFee = Math.round(schoolFee / 12)
  const totalWithSchool = total + monthlySchoolFee
  const monthlyIncome = workHours * 4.3 * wage
  const monthlyBalance = monthlyIncome - totalWithSchool

  const items = [
    {label:'Rent',value:rent,color:'#C42020',icon:'🏠'},
    {label:'Food & Groceries',value:food,color:'#F0A830',icon:'🍱'},
    {label:'Transportation',value:transport,color:'#4A8EFF',icon:'🚃'},
    {label:'Utilities',value:utilities,color:'#2EC87A',icon:'💡'},
    {label:'Phone',value:phone,color:'#A855F7',icon:'📱'},
    {label:'Internet',value:internet,color:'#FF8070',icon:'🌐'},
    {label:'Entertainment',value:entertainment,color:'#F0A830',icon:'🎮'},
  ].filter(item=>item.value > 0)

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Cost of Living Calculator</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Calculate your monthly expenses in Japan</p>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>

          {/* Left - Settings */}
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>📍 City</h2>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                {CITIES.map(c=>(
                  <button key={c.name} onClick={()=>setCity(c.name)} style={{background:city===c.name?'#C42020':'#0D0907',border:'1px solid ' + (city===c.name?'#C42020':'rgba(255,255,255,0.1)'),borderRadius:'8px',padding:'8px',color:'white',fontSize:'12px',cursor:'pointer',fontWeight:city===c.name?'700':'400'}}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>🏠 Housing Type</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {[
                  {key:'share' as const,label:'Share House',desc:'Bills included, no guarantor',price:'¥' + selectedCity.rent.share.toLocaleString()},
                  {key:'dorm' as const,label:'School Dormitory',desc:'Cheapest option',price:'¥' + selectedCity.rent.dorm.toLocaleString()},
                  {key:'private' as const,label:'Private Apartment',desc:'Most privacy',price:'¥' + selectedCity.rent.private.toLocaleString()},
                ].map(h=>(
                  <button key={h.key} onClick={()=>setHousing(h.key)} style={{background:housing===h.key?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (housing===h.key?'#C42020':'rgba(255,255,255,0.1)'),borderRadius:'8px',padding:'12px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{textAlign:'left'}}>
                      <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{h.label}</div>
                      <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{h.desc}</div>
                    </div>
                    <div style={{color:'#F0A830',fontSize:'13px',fontWeight:'700'}}>{h.price}/mo</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>🍱 Food Style</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {[
                  {key:'budget' as const,label:'Budget',desc:'Cook at home, supermarket',price:'¥' + selectedCity.food.budget.toLocaleString()},
                  {key:'average' as const,label:'Average',desc:'Mix of cooking and eating out',price:'¥' + selectedCity.food.average.toLocaleString()},
                  {key:'comfort' as const,label:'Comfortable',desc:'Eat out often',price:'¥' + selectedCity.food.comfort.toLocaleString()},
                ].map(f=>(
                  <button key={f.key} onClick={()=>setFoodStyle(f.key)} style={{background:foodStyle===f.key?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (foodStyle===f.key?'#C42020':'rgba(255,255,255,0.1)'),borderRadius:'8px',padding:'12px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{textAlign:'left'}}>
                      <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{f.label}</div>
                      <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{f.desc}</div>
                    </div>
                    <div style={{color:'#F0A830',fontSize:'13px',fontWeight:'700'}}>{f.price}/mo</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>📱 Other Expenses</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {[
                  {label:'Phone Plan (¥3,000/mo)',checked:hasPhone,set:setHasPhone},
                  {label:'Home Internet (¥4,000/mo)',checked:hasInternet,set:setHasInternet},
                ].map(item=>(
                  <button key={item.label} onClick={()=>item.set(!item.checked)} style={{background:item.checked?'rgba(46,200,122,0.1)':'#0D0907',border:'1px solid ' + (item.checked?'rgba(46,200,122,0.3)':'rgba(255,255,255,0.1)'),borderRadius:'8px',padding:'10px',cursor:'pointer',display:'flex',gap:'10px',alignItems:'center'}}>
                    <span style={{fontSize:'16px'}}>{item.checked?'✅':'⬜'}</span>
                    <span style={{color:'white',fontSize:'13px'}}>{item.label}</span>
                  </button>
                ))}
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Entertainment & Personal: ¥{entertainment.toLocaleString()}/mo</label>
                  <input type="range" min="0" max="50000" step="1000" value={entertainment} onChange={e=>setEntertainment(parseInt(e.target.value))} style={{width:'100%',accentColor:'#C42020'}}/>
                </div>
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>🏫 School Fees</h2>
              <div>
                <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Annual Fee: ¥{schoolFee.toLocaleString()}</label>
                <input type="range" min="300000" max="900000" step="10000" value={schoolFee} onChange={e=>setSchoolFee(parseInt(e.target.value))} style={{width:'100%',accentColor:'#C42020'}}/>
                <div style={{display:'flex',justifyContent:'space-between',color:'rgba(255,255,255,0.3)',fontSize:'11px',marginTop:'4px'}}>
                  <span>¥300,000</span><span>¥900,000</span>
                </div>
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>💼 Part-time Work</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Hours per week: {workHours} hrs (max 28 on student visa)</label>
                  <input type="range" min="0" max="28" step="1" value={workHours} onChange={e=>setWorkHours(parseInt(e.target.value))} style={{width:'100%',accentColor:'#2EC87A'}}/>
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Hourly wage: ¥{wage}</label>
                  <input type="range" min="900" max="2000" step="50" value={wage} onChange={e=>setWage(parseInt(e.target.value))} style={{width:'100%',accentColor:'#2EC87A'}}/>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Results */}
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'2px solid #C42020',position:'sticky',top:'80px'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'20px',textAlign:'center'}}>Monthly Budget Summary</h2>

              <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'16px'}}>
                {items.map(item=>(
                  <div key={item.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px',background:'#0D0907',borderRadius:'6px'}}>
                    <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                      <span>{item.icon}</span>
                      <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{item.label}</span>
                    </div>
                    <span style={{color:item.color,fontSize:'13px',fontWeight:'600'}}>¥{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div style={{borderTop:'2px solid rgba(255,255,255,0.1)',paddingTop:'12px',marginBottom:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>Living Total</span>
                  <span style={{color:'white',fontSize:'14px',fontWeight:'700'}}>¥{total.toLocaleString()}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>School Fee (monthly)</span>
                  <span style={{color:'white',fontSize:'14px',fontWeight:'700'}}>¥{monthlySchoolFee.toLocaleString()}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',padding:'10px',background:'rgba(196,32,32,0.1)',borderRadius:'8px',marginTop:'8px'}}>
                  <span style={{color:'white',fontSize:'14px',fontWeight:'700'}}>Total Monthly Cost</span>
                  <span style={{color:'#C42020',fontSize:'18px',fontWeight:'800'}}>¥{totalWithSchool.toLocaleString()}</span>
                </div>
              </div>

              <div style={{background:monthlyBalance>=0?'rgba(46,200,122,0.1)':'rgba(196,32,32,0.1)',borderRadius:'10px',padding:'16px',border:'1px solid ' + (monthlyBalance>=0?'rgba(46,200,122,0.3)':'rgba(196,32,32,0.3)'),marginBottom:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                  <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>Part-time Income ({workHours}hrs/week)</span>
                  <span style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700'}}>+¥{monthlyIncome.toLocaleString()}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span style={{color:'white',fontSize:'14px',fontWeight:'700'}}>Monthly Balance</span>
                  <span style={{color:monthlyBalance>=0?'#2EC87A':'#C42020',fontSize:'18px',fontWeight:'800'}}>
                    {monthlyBalance>=0?'+':''}¥{monthlyBalance.toLocaleString()}
                  </span>
                </div>
              </div>

              <div style={{background:'#0D0907',borderRadius:'8px',padding:'12px',marginBottom:'16px'}}>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'8px',textAlign:'center'}}>Annual Cost Estimate</p>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>Living (12 months)</span>
                  <span style={{color:'white',fontSize:'12px',fontWeight:'600'}}>¥{(total*12).toLocaleString()}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>School Fee</span>
                  <span style={{color:'white',fontSize:'12px',fontWeight:'600'}}>¥{schoolFee.toLocaleString()}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:'6px',paddingTop:'6px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                  <span style={{color:'white',fontSize:'13px',fontWeight:'700'}}>Total Annual</span>
                  <span style={{color:'#C42020',fontSize:'15px',fontWeight:'800'}}>¥{(total*12+schoolFee).toLocaleString()}</span>
                </div>
              </div>

              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px',borderRadius:'8px',fontSize:'12px',fontWeight:'700',flex:1,textAlign:'center'}}>Find Schools</a>
                <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px',borderRadius:'8px',fontSize:'12px',flex:1,textAlign:'center',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}