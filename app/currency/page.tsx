'use client'
import { useState } from 'react'

const CURRENCIES = [
  {code:'JPY',name:'Japanese Yen',flag:'🇯🇵',symbol:'¥'},
  {code:'BDT',name:'Bangladeshi Taka',flag:'🇧🇩',symbol:'৳'},
  {code:'NPR',name:'Nepalese Rupee',flag:'🇳🇵',symbol:'₨'},
  {code:'USD',name:'US Dollar',flag:'🇺🇸',symbol:'$'},
  {code:'EUR',name:'Euro',flag:'🇪🇺',symbol:'€'},
  {code:'GBP',name:'British Pound',flag:'🇬🇧',symbol:'£'},
]

const RATES: any = {
  JPY: { BDT: 0.72, NPR: 0.84, USD: 0.0067, EUR: 0.0062, GBP: 0.0053 },
  BDT: { JPY: 1.39, NPR: 1.17, USD: 0.0093, EUR: 0.0086, GBP: 0.0074 },
  NPR: { JPY: 1.19, BDT: 0.86, USD: 0.0075, EUR: 0.0070, GBP: 0.0060 },
  USD: { JPY: 149.5, BDT: 107.5, NPR: 133.2, EUR: 0.93, GBP: 0.79 },
  EUR: { JPY: 161.2, BDT: 115.8, NPR: 143.5, USD: 1.08, GBP: 0.85 },
  GBP: { JPY: 189.7, BDT: 136.2, NPR: 168.8, USD: 1.27, EUR: 1.18 },
}

const MONEY_TRANSFER = [
  {name:'Wise (TransferWise)',icon:'💚',fee:'Low (0.5-1%)',speed:'1-2 days',url:'https://wise.com',recommended:true,desc:'Best exchange rates with low fees. Very popular for sending money to Bangladesh and Nepal.'},
  {name:'Western Union',icon:'💛',fee:'Medium (varies)',speed:'Minutes to days',url:'https://www.westernunion.com',recommended:false,desc:'Available worldwide including Bangladesh and Nepal. Cash pickup option available.'},
  {name:'Remitly',icon:'💙',fee:'Low-Medium',speed:'Minutes to 3 days',url:'https://www.remitly.com',recommended:true,desc:'Good rates for Bangladesh and Nepal. Express and Economy options available.'},
  {name:'SBI Remit',icon:'🏦',fee:'Low',speed:'Same day',url:'https://www.sbiremit.com',recommended:false,desc:'Japan-based service popular with Asian workers. Good for sending from Japan to BD/NP.'},
  {name:'Japan Post Bank',icon:'📮',fee:'Medium',speed:'3-5 days',url:'https://www.jp-bank.japanpost.jp',recommended:false,desc:'Available at all post offices in Japan. Reliable but slower and more expensive.'},
]

const JAPAN_PRICES = [
  {item:'Convenience store meal',price:'¥500-800',usd:'$3-5'},
  {item:'Ramen bowl',price:'¥800-1,200',usd:'$5-8'},
  {item:'McDonald\'s set meal',price:'¥600-800',usd:'$4-5'},
  {item:'Supermarket bento',price:'¥300-600',usd:'$2-4'},
  {item:'Coffee at cafe',price:'¥400-600',usd:'$3-4'},
  {item:'Train ticket (short)',price:'¥150-300',usd:'$1-2'},
  {item:'Monthly transport pass',price:'¥5,000-15,000',usd:'$33-100'},
  {item:'Mobile phone plan',price:'¥2,000-5,000',usd:'$13-33'},
  {item:'Utility bills',price:'¥5,000-15,000',usd:'$33-100'},
  {item:'Haircut',price:'¥1,000-3,000',usd:'$7-20'},
  {item:'Movie ticket',price:'¥1,800-2,000',usd:'$12-13'},
  {item:'Gym membership',price:'¥5,000-10,000',usd:'$33-67'},
]

export default function CurrencyPage() {
  const [amount, setAmount] = useState('10000')
  const [from, setFrom] = useState('JPY')
  const [to, setTo] = useState('BDT')
  const [activeTab, setActiveTab] = useState('converter')

  function convert() {
    const num = parseFloat(amount) || 0
    if (from === to) return num.toFixed(2)
    const rate = RATES[from]?.[to]
    if (!rate) return '0'
    return (num * rate).toFixed(2)
  }

  function swap() {
    setFrom(to)
    setTo(from)
  }

  const result = convert()
  const fromCurrency = CURRENCIES.find(c=>c.code===from)
  const toCurrency = CURRENCIES.find(c=>c.code===to)

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Currency Converter</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Convert between JPY, BDT, NPR and more</p>
        <p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px',marginTop:'8px'}}>* Rates are approximate. Check current rates before transferring money.</p>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {['converter','transfer','prices'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {tab === 'converter' ? '💱 Converter' : tab === 'transfer' ? '💸 Send Money' : '🛒 Japan Prices'}
            </button>
          ))}
        </div>

        {activeTab === 'converter' && (
          <div>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{display:'flex',gap:'16px',alignItems:'center',flexWrap:'wrap',marginBottom:'20px'}}>
                <div style={{flex:1,minWidth:'200px'}}>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'8px'}}>Amount</label>
                  <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'14px',color:'white',fontSize:'20px',fontWeight:'700',outline:'none'}}/>
                </div>
                <div style={{flex:1,minWidth:'150px'}}>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'8px'}}>From</label>
                  <select value={from} onChange={e=>setFrom(e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'14px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                    {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>)}
                  </select>
                </div>
                <button onClick={swap} style={{background:'rgba(255,255,255,0.08)',border:'none',borderRadius:'50%',width:'44px',height:'44px',color:'white',fontSize:'18px',cursor:'pointer',flexShrink:0,marginTop:'20px'}}>⇄</button>
                <div style={{flex:1,minWidth:'150px'}}>
                  <label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'8px'}}>To</label>
                  <select value={to} onChange={e=>setTo(e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'14px',color:'white',fontSize:'14px',outline:'none',cursor:'pointer'}}>
                    {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{background:'#0D0907',borderRadius:'12px',padding:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.06)'}}>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'8px'}}>
                  {fromCurrency?.flag} {parseFloat(amount||'0').toLocaleString()} {from} =
                </p>
                <p style={{color:'#F0A830',fontSize:'36px',fontWeight:'800',marginBottom:'8px'}}>
                  {toCurrency?.symbol}{parseFloat(result).toLocaleString()} {to}
                </p>
                <p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>
                  1 {from} = {RATES[from]?.[to] || 1} {to}
                </p>
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>Quick Reference Rates (approximate)</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'10px'}}>
                {[
                  {from:'¥10,000 JPY',to:'≈ ৳7,200 BDT'},
                  {from:'¥10,000 JPY',to:'≈ ₨8,400 NPR'},
                  {from:'¥100,000 JPY',to:'≈ $670 USD'},
                  {from:'৳10,000 BDT',to:'≈ ¥13,900 JPY'},
                  {from:'₨10,000 NPR',to:'≈ ¥11,900 JPY'},
                  {from:'$100 USD',to:'≈ ¥14,950 JPY'},
                ].map((rate,i)=>(
                  <div key={i} style={{background:'#0D0907',borderRadius:'8px',padding:'10px',textAlign:'center'}}>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'600',marginBottom:'2px'}}>{rate.from}</div>
                    <div style={{color:'#F0A830',fontSize:'13px'}}>{rate.to}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transfer' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Send Money to Bangladesh & Nepal</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'8px'}}>Best services for sending money from Japan to Bangladesh and Nepal</p>
            {MONEY_TRANSFER.map((service,i)=>(
              <a key={i} href={service.url} target="_blank" rel="noopener noreferrer" style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid ' + (service.recommended?'rgba(46,200,122,0.3)':'rgba(255,255,255,0.08)'),textDecoration:'none',display:'block'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor=service.recommended?'rgba(46,200,122,0.3)':'rgba(255,255,255,0.08)')}>
                <div style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                  <span style={{fontSize:'32px'}}>{service.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px',flexWrap:'wrap'}}>
                      <h3 style={{color:'white',fontSize:'15px',fontWeight:'700'}}>{service.name}</h3>
                      {service.recommended && <span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>RECOMMENDED</span>}
                    </div>
                    <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6',marginBottom:'10px'}}>{service.desc}</p>
                    <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                      <span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.5)',padding:'3px 10px',borderRadius:'20px',fontSize:'11px'}}>Fee: {service.fee}</span>
                      <span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.5)',padding:'3px 10px',borderRadius:'20px',fontSize:'11px'}}>Speed: {service.speed}</span>
                    </div>
                  </div>
                  <span style={{color:'#4A8EFF',fontSize:'12px',flexShrink:0}}>Visit →</span>
                </div>
              </a>
            ))}

            <div style={{background:'rgba(240,168,48,0.1)',borderRadius:'12px',padding:'16px',border:'1px solid rgba(240,168,48,0.2)'}}>
              <h3 style={{color:'#F0A830',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>💡 Money Transfer Tips</h3>
              {[
                'Compare rates on comparison sites before transferring',
                'Transfer larger amounts to minimize fixed fees',
                'Set up rate alerts to transfer when rates are favorable',
                'Keep receipts of all transfers for tax purposes',
                'Use your recipient\'s bank account details for faster transfer',
                'Avoid airport exchange counters - rates are very poor',
              ].map((tip,i)=>(
                <div key={i} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
                  <span style={{color:'#F0A830',flexShrink:0}}>→</span>
                  <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prices' && (
          <div>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Everyday Prices in Japan</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>Common prices to help you budget for life in Japan</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:'10px',marginBottom:'24px'}}>
              {JAPAN_PRICES.map((item,i)=>(
                <div key={i} style={{background:'#1A2035',borderRadius:'10px',padding:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{item.item}</span>
                  <div style={{textAlign:'right',flexShrink:0,marginLeft:'10px'}}>
                    <div style={{color:'#F0A830',fontSize:'13px',fontWeight:'700'}}>{item.price}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{item.usd}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>Monthly Budget Estimate</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'10px'}}>
                {[
                  {type:'Budget Student',amount:'¥80,000-100,000',desc:'Share house, cook at home'},
                  {type:'Average Student',amount:'¥120,000-150,000',desc:'Share house, eat out sometimes'},
                  {type:'Comfortable',amount:'¥150,000-200,000',desc:'Private apartment, dining out'},
                  {type:'Tokyo Premium',amount:'¥200,000+',desc:'Central Tokyo, active lifestyle'},
                ].map(budget=>(
                  <div key={budget.type} style={{background:'#0D0907',borderRadius:'8px',padding:'14px',textAlign:'center'}}>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{budget.type}</div>
                    <div style={{color:'#F0A830',fontSize:'16px',fontWeight:'800',marginBottom:'4px'}}>{budget.amount}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{budget.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Need help budgeting for Japan?</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/cost-calculator" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Cost Calculator</a>
            <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura AI</a>
          </div>
        </div>
      </div>
    </main>
  )
}