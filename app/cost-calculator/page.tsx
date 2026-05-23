'use client'
import { useState } from 'react'

export default function CostCalculatorPage() {
  const [city, setCity] = useState('Tokyo')
  const [lifestyle, setLifestyle] = useState('moderate')
  const [hasPartTime, setHasPartTime] = useState(false)
  const [result, setResult] = useState<any>(null)

  const cityData: any = {
    Tokyo: { rent: 75000, transport: 12000, food: 35000, utilities: 8000 },
    Osaka: { rent: 55000, transport: 9000, food: 30000, utilities: 7000 },
    Kyoto: { rent: 55000, transport: 8000, food: 28000, utilities: 7000 },
    Sapporo: { rent: 45000, transport: 7000, food: 25000, utilities: 9000 },
    Fukuoka: { rent: 45000, transport: 7000, food: 25000, utilities: 7000 },
    Nagoya: { rent: 50000, transport: 8000, food: 27000, utilities: 7000 },
    Sendai: { rent: 40000, transport: 6000, food: 23000, utilities: 8000 },
    Hiroshima: { rent: 42000, transport: 6000, food: 24000, utilities: 7000 },
  }

  const lifestyleMultiplier: any = {
    budget: 0.7,
    moderate: 1.0,
    comfortable: 1.4,
  }

  function calculate() {
    const base = cityData[city]
    const multiplier = lifestyleMultiplier[lifestyle]

    const rent = Math.round(base.rent * multiplier)
    const transport = Math.round(base.transport * multiplier)
    const food = Math.round(base.food * multiplier)
    const utilities = Math.round(base.utilities * multiplier)
    const phone = 3000
    const entertainment = Math.round(10000 * multiplier)
    const miscellaneous = Math.round(8000 * multiplier)
    const schoolFee = Math.round(55000)

    const totalExpenses = rent + transport + food + utilities + phone + entertainment + miscellaneous + schoolFee
    const partTimeIncome = hasPartTime ? 80000 : 0
    const netCost = totalExpenses - partTimeIncome

    setResult({
      breakdown: [
        {label:'School Fee (monthly)', amount:schoolFee, color:'#C42020'},
        {label:'Rent', amount:rent, color:'#4A8EFF'},
        {label:'Food', amount:food, color:'#2EC87A'},
        {label:'Transport', amount:transport, color:'#F0A830'},
        {label:'Utilities', amount:utilities, color:'#A855F7'},
        {label:'Phone', amount:phone, color:'#4A8EFF'},
        {label:'Entertainment', amount:entertainment, color:'#F0A830'},
        {label:'Miscellaneous', amount:miscellaneous, color:'#2EC87A'},
      ],
      totalExpenses,
      partTimeIncome,
      netCost,
      annualCost: netCost * 12,
      savingsNeeded: netCost * 6,
    })
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Living Cost Calculator</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Calculate how much you need to live in Japan</p>
      </div>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'40px 20px'}}>
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'20px'}}>Your Settings</h2>

          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            <div>
              <label style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',display:'block',marginBottom:'8px'}}>City</label>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                {Object.keys(cityData).map(c=>(
                  <button key={c} onClick={()=>setCity(c)} style={{background:city===c?'#C42020':'#0D0907',border:'1px solid ' + (city===c?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'8px 16px',color:'white',fontSize:'13px',cursor:'pointer',fontWeight:city===c?'700':'400'}}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',display:'block',marginBottom:'8px'}}>Lifestyle</label>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                {[
                  {value:'budget',label:'Budget',desc:'Cook at home, public transport'},
                  {value:'moderate',label:'Moderate',desc:'Mix of eating out and cooking'},
                  {value:'comfortable',label:'Comfortable',desc:'Eat out often, convenience'},
                ].map(l=>(
                  <button key={l.value} onClick={()=>setLifestyle(l.value)} style={{background:lifestyle===l.value?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (lifestyle===l.value?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'10px 16px',color:'white',fontSize:'13px',cursor:'pointer',textAlign:'left'}}>
                    <div style={{fontWeight:'700',marginBottom:'2px'}}>{l.label}</div>
                    <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)'}}>{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',display:'block',marginBottom:'8px'}}>Part-time Work</label>
              <button onClick={()=>setHasPartTime(!hasPartTime)} style={{background:hasPartTime?'rgba(46,200,122,0.2)':'#0D0907',border:'1px solid ' + (hasPartTime?'#2EC87A':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'12px 20px',color:hasPartTime?'#2EC87A':'white',fontSize:'13px',cursor:'pointer',fontWeight:'600'}}>
                {hasPartTime ? 'Yes - Working part-time (approx 80,000 Yen/month)' : 'No part-time work'}
              </button>
            </div>

            <button onClick={calculate} style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer'}}>
              Calculate My Budget
            </button>
          </div>
        </div>

        {result && (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'2px solid #C42020'}}>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'20px',textAlign:'center'}}>Monthly Budget for {city}</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
                {result.breakdown.map((item:any)=>(
                  <div key={item.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 14px',background:'#0D0907',borderRadius:'8px'}}>
                    <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{item.label}</span>
                    <span style={{color:item.color,fontSize:'14px',fontWeight:'700',fontFamily:'monospace'}}>Yen {item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div style={{borderTop:'2px solid rgba(255,255,255,0.1)',paddingTop:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                  <span style={{color:'rgba(255,255,255,0.6)',fontSize:'14px'}}>Total Expenses</span>
                  <span style={{color:'#C42020',fontSize:'16px',fontWeight:'700',fontFamily:'monospace'}}>Yen {result.totalExpenses.toLocaleString()}</span>
                </div>
                {result.partTimeIncome > 0 && (
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                    <span style={{color:'rgba(255,255,255,0.6)',fontSize:'14px'}}>Part-time Income</span>
                    <span style={{color:'#2EC87A',fontSize:'16px',fontWeight:'700',fontFamily:'monospace'}}>- Yen {result.partTimeIncome.toLocaleString()}</span>
                  </div>
                )}
                <div style={{display:'flex',justifyContent:'space-between',padding:'12px',background:'rgba(196,32,32,0.1)',borderRadius:'8px',marginTop:'8px'}}>
                  <span style={{color:'white',fontSize:'15px',fontWeight:'700'}}>Monthly Net Cost</span>
                  <span style={{color:'white',fontSize:'18px',fontWeight:'700',fontFamily:'monospace'}}>Yen {result.netCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:'12px'}}>
              {[
                {label:'Annual Cost',value:'Yen ' + result.annualCost.toLocaleString(),color:'#C42020',icon:'📅'},
                {label:'Savings Needed (6 months)',value:'Yen ' + result.savingsNeeded.toLocaleString(),color:'#F0A830',icon:'💰'},
                {label:'In BDT (approx)',value:'BDT ' + Math.round(result.netCost * 0.75).toLocaleString(),color:'#2EC87A',icon:'🇧🇩'},
                {label:'In NPR (approx)',value:'NPR ' + Math.round(result.netCost * 8.5).toLocaleString(),color:'#4A8EFF',icon:'🇳🇵'},
              ].map(stat=>(
                <div key={stat.label} style={{background:'#1A2035',borderRadius:'12px',padding:'16px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div style={{fontSize:'24px',marginBottom:'8px'}}>{stat.icon}</div>
                  <div style={{color:stat.color,fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{stat.value}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Want personalized advice on budgeting in Japan?</p>
              <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}