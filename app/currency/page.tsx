'use client'
import { useState } from 'react'

export default function CurrencyPage() {
  const [amount, setAmount] = useState('100000')
  const [from, setFrom] = useState('JPY')

  const rates: any = {
    JPY: 1,
    BDT: 0.75,
    NPR: 8.5,
    USD: 0.0067,
    EUR: 0.0062,
    GBP: 0.0053,
    INR: 0.56,
    SGD: 0.0090,
    AUD: 0.010,
    CAD: 0.0091,
  }

  const currencies = [
    {code:'JPY',name:'Japanese Yen',flag:'🇯🇵',symbol:'¥'},
    {code:'BDT',name:'Bangladeshi Taka',flag:'🇧🇩',symbol:'৳'},
    {code:'NPR',name:'Nepali Rupee',flag:'🇳🇵',symbol:'₨'},
    {code:'USD',name:'US Dollar',flag:'🇺🇸',symbol:'$'},
    {code:'EUR',name:'Euro',flag:'🇪🇺',symbol:'€'},
    {code:'GBP',name:'British Pound',flag:'🇬🇧',symbol:'£'},
    {code:'INR',name:'Indian Rupee',flag:'🇮🇳',symbol:'₹'},
    {code:'SGD',name:'Singapore Dollar',flag:'🇸🇬',symbol:'S$'},
    {code:'AUD',name:'Australian Dollar',flag:'🇦🇺',symbol:'A$'},
    {code:'CAD',name:'Canadian Dollar',flag:'🇨🇦',symbol:'C$'},
  ]

  function convert(to: string) {
    const amountNum = parseFloat(amount) || 0
    const inJPY = from === 'JPY' ? amountNum : amountNum / rates[from]
    if (to === 'JPY') return inJPY.toLocaleString('en', {maximumFractionDigits:0})
    return (inJPY * rates[to]).toLocaleString('en', {maximumFractionDigits:2})
  }

  const commonAmounts = [1000, 5000, 10000, 50000, 100000, 500000, 1000000]

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Currency Converter</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Convert between Japanese Yen and world currencies</p>
      </div>

      <div style={{maxWidth:'700px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',gap:'12px',marginBottom:'20px',flexWrap:'wrap'}}>
            <div style={{flex:1,minWidth:'150px'}}>
              <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Amount</label>
              <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'16px',outline:'none',fontFamily:'monospace'}}/>
            </div>
            <div style={{flex:1,minWidth:'150px'}}>
              <label style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',display:'block',marginBottom:'6px'}}>From Currency</label>
              <select value={from} onChange={e=>setFrom(e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                {currencies.map(c=>(
                  <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'8px'}}>
            {commonAmounts.map(amt=>(
              <button key={amt} onClick={()=>setAmount(amt.toString())} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'6px',padding:'5px 10px',color:'rgba(255,255,255,0.6)',fontSize:'11px',cursor:'pointer',fontFamily:'monospace'}}>
                {amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
          {currencies.filter(c=>c.code!==from).map(currency=>(
            <div key={currency.code} style={{background:'#1A2035',borderRadius:'12px',padding:'16px 20px',border:'1px solid rgba(255,255,255,0.08)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                <span style={{fontSize:'24px'}}>{currency.flag}</span>
                <div>
                  <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{currency.code}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{currency.name}</div>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{color:'#F0A830',fontSize:'18px',fontWeight:'700',fontFamily:'monospace'}}>
                  {currency.symbol}{convert(currency.code)}
                </div>
                <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>
                  1 JPY = {currency.symbol}{rates[currency.code]}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>Common Japan Costs</h3>
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {[
              {item:'Monthly school fee',jpy:55000},
              {item:'Monthly rent (share house)',jpy:50000},
              {item:'Monthly food budget',jpy:30000},
              {item:'Train pass (monthly)',jpy:10000},
              {item:'Required bank balance',jpy:2000000},
              {item:'Annual school fee',jpy:660000},
            ].map(cost=>(
              <div key={cost.item} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{cost.item}</span>
                <div style={{textAlign:'right'}}>
                  <span style={{color:'#F0A830',fontSize:'13px',fontFamily:'monospace',fontWeight:'600'}}>¥{cost.jpy.toLocaleString()}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',marginLeft:'8px'}}>
                    ৳{Math.round(cost.jpy * rates.BDT).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'10px',padding:'14px',textAlign:'center'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>Exchange rates are approximate. Check your bank for actual rates before transferring money.</p>
        </div>
      </div>
    </main>
  )
}