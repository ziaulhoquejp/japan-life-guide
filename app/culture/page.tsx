'use client'
import { useState } from 'react'

const CULTURE_TOPICS = [
  {
    id:1, icon:'🙇', title:'Bowing (お辞儀)', category:'Etiquette',
    color:'#C42020',
    desc:'Bowing is the most important greeting in Japan. The deeper the bow, the more respect you show.',
    details:[
      {situation:'Casual greeting',bow:'15 degrees',note:'Quick nod to friends and classmates'},
      {situation:'Meeting someone new',bow:'30 degrees',note:'Standard business and formal greeting'},
      {situation:'Thanking someone',bow:'30-45 degrees',note:'Show genuine gratitude'},
      {situation:'Apologizing',bow:'45-90 degrees',note:'Deep bow shows sincere apology'},
    ],
    tips:[
      'Don\'t bow while walking - stop first',
      'Maintain eye contact briefly then look down',
      'Never bow with hands in pockets',
      'Return bows when someone bows to you',
      'Foreigners are not expected to bow perfectly - any attempt is appreciated',
    ],
  },
  {
    id:2, icon:'👟', title:'Removing Shoes', category:'Home & School',
    color:'#4A8EFF',
    desc:'Always remove shoes when entering homes, many traditional restaurants, some schools, and places with a raised floor.',
    details:[
      {situation:'Entering a home',bow:'Always',note:'Change to slippers if provided'},
      {situation:'Traditional restaurants',bow:'Often',note:'Look for raised floor area (tatami)'},
      {situation:'Some schools',bow:'Sometimes',note:'Check for shoe lockers at entrance'},
      {situation:'Temples and shrines',bow:'Sometimes',note:'Signs will indicate'},
    ],
    tips:[
      'The entrance area (玄関 genkan) is where you remove shoes',
      'Point your shoes towards the door when you remove them',
      'Wear clean socks without holes!',
      'Slippers are not worn on tatami mats',
      'Separate toilet slippers are provided in many homes',
    ],
  },
  {
    id:3, icon:'🚂', title:'Train Etiquette', category:'Transport',
    color:'#2EC87A',
    desc:'Japanese trains have very specific rules of etiquette that everyone follows.',
    details:[
      {situation:'Phone calls',bow:'Never',note:'Phone calls are prohibited on trains'},
      {situation:'Eating',bow:'Generally no',note:'Acceptable on long-distance trains only'},
      {situation:'Priority seats',bow:'Always give up',note:'For elderly, pregnant, disabled'},
      {situation:'Noise level',bow:'Keep quiet',note:'Speak softly if necessary'},
    ],
    tips:[
      'Set phone to silent mode (manner mode)',
      'Do not eat on local trains',
      'Stand in line and wait for passengers to exit before boarding',
      'Backpacks should be held in front or stored overhead',
      'Avoid talking on phone - text instead',
      'Do not apply makeup on the train',
    ],
  },
  {
    id:4, icon:'🗑️', title:'Garbage Sorting', category:'Daily Life',
    color:'#F0A830',
    desc:'Japan has very strict garbage sorting rules. Breaking them can cause problems with neighbors.',
    details:[
      {situation:'Burnable (燃えるごみ)',bow:'Food waste, paper, clothes',note:'Usually collected 2x per week'},
      {situation:'Non-burnable (燃えないごみ)',bow:'Metal, glass, ceramics',note:'Usually 1x per month'},
      {situation:'Recyclable (資源ごみ)',bow:'Plastic bottles, cans, cardboard',note:'Separate by type'},
      {situation:'Large items (粗大ごみ)',bow:'Furniture, appliances',note:'Special collection - call city hall'},
    ],
    tips:[
      'Each city has different rules - check with your city hall',
      'Only put garbage out on the correct day',
      'Use designated garbage bags (指定ごみ袋)',
      'Wash plastic bottles and remove caps before recycling',
      'Cigarettes go in non-burnable garbage',
      'Ask your school or landlord to explain local rules',
    ],
  },
  {
    id:5, icon:'🍽️', title:'Dining Etiquette', category:'Food',
    color:'#A855F7',
    desc:'Japanese dining has many customs that show respect for the food and other diners.',
    details:[
      {situation:'Before eating',bow:'Say "Itadakimasu"',note:'Shows gratitude for the food'},
      {situation:'After eating',bow:'Say "Gochisousama"',note:'Thanks the person who prepared food'},
      {situation:'Chopsticks',bow:'Never stick in rice',note:'Reminds Japanese of funeral rites'},
      {situation:'Passing food',bow:'Use serving chopsticks',note:'Do not pass food chopstick to chopstick'},
    ],
    tips:[
      'Slurping noodles is acceptable and shows you enjoy the food',
      'It is polite to try everything on your plate',
      'Do not waste food - take only what you can eat',
      'Tipping is NOT done in Japan - it can be offensive',
      'Split bills (割り勘 warikan) is common among friends',
      'Pour drinks for others before pouring for yourself',
    ],
  },
  {
    id:6, icon:'🏢', title:'Workplace Culture', category:'Work',
    color:'#FF8070',
    desc:'Japanese workplace culture has unique customs important for part-time and full-time workers.',
    details:[
      {situation:'Arriving',bow:'Be early - 5 min before',note:'Being on time means arriving early'},
      {situation:'Greetings',bow:'Say "Ohayou gozaimasu"',note:'Morning greeting to all colleagues'},
      {situation:'Leaving',bow:'Say "Otsukaresama"',note:'Said when leaving or finishing work'},
      {situation:'Uniform',bow:'Wear correctly',note:'Follow uniform rules strictly'},
    ],
    tips:[
      'Punctuality is extremely important - never be late',
      'Say "Sumimasen" (excuse me) to get attention politely',
      'Accept instructions with "Hai, wakarimashita" (Yes, I understand)',
      'Do not leave before your manager without permission',
      'Clean your workspace before leaving',
      'Report problems to supervisor immediately',
    ],
  },
  {
    id:7, icon:'💰', title:'Money & Payment', category:'Daily Life',
    color:'#2EC87A',
    desc:'Japan is still largely a cash society, though digital payments are increasing.',
    details:[
      {situation:'Cash',bow:'Still widely used',note:'Always carry some cash'},
      {situation:'IC Cards',bow:'Suica, Pasmo',note:'For trains, convenience stores'},
      {situation:'PayPay',bow:'Popular app',note:'QR code payment widely accepted'},
      {situation:'Credit cards',bow:'Visa/Mastercard',note:'Major stores accept cards'},
    ],
    tips:[
      'Always carry cash - many small restaurants are cash only',
      'Get a Suica or Pasmo IC card for trains and convenience stores',
      'Download PayPay app for QR code payments',
      'Receive and give money/cards with two hands',
      'Do not tip - it is not customary in Japan',
      'Price on label includes tax (消費税)',
    ],
  },
  {
    id:8, icon:'🗣️', title:'Language Tips', category:'Language',
    color:'#4A8EFF',
    desc:'Some basic Japanese phrases and communication tips that will help in daily life.',
    details:[
      {situation:'Excuse me',bow:'Sumimasen (すみません)',note:'Most useful phrase in Japan'},
      {situation:'Thank you',bow:'Arigatou gozaimasu',note:'Formal - use with staff/teachers'},
      {situation:'Sorry',bow:'Moushiwake gozaimasen',note:'Very formal apology'},
      {situation:'I don\'t understand',bow:'Wakarimasen',note:'Polite way to say you don\'t understand'},
    ],
    tips:[
      'Japanese people appreciate any attempt to speak Japanese',
      'Use Google Translate camera mode for signs and menus',
      'Most young Japanese can read English even if they can\'t speak it',
      'Speak slowly and clearly if using English',
      'Avoid sarcasm - it is often misunderstood',
      'Practice at convenience stores - staff are patient',
    ],
  },
]

export default function CulturePage() {
  const [selected, setSelected] = useState<any>(CULTURE_TOPICS[0])
  const [category, setCategory] = useState('All')

  const categories = ['All', 'Etiquette', 'Home & School', 'Transport', 'Daily Life', 'Food', 'Work', 'Language']

  const filtered = CULTURE_TOPICS.filter(t => category === 'All' || t.category === category)

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Japanese Culture Guide</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'16px'}}>Essential cultural tips for Bangladesh and Nepal students in Japan</p>
        <div style={{background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'8px',padding:'10px 20px',display:'inline-block'}}>
          <p style={{color:'#FF8070',fontSize:'13px'}}>💡 Understanding Japanese culture helps you make friends and avoid misunderstandings!</p>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {categories.map(cat=>(
            <button key={cat} onClick={()=>setCategory(cat)} style={{background:category===cat?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'12px',marginBottom:'24px'}}>
          {filtered.map(topic=>(
            <div key={topic.id} onClick={()=>setSelected(topic)} style={{background:selected.id===topic.id?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (selected.id===topic.id?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'16px',cursor:'pointer',transition:'all 0.2s'}}>
              <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'8px'}}>
                <span style={{fontSize:'28px'}}>{topic.icon}</span>
                <div>
                  <h3 style={{color:'white',fontSize:'13px',fontWeight:'700'}}>{topic.title}</h3>
                  <span style={{background:topic.color+'20',color:topic.color,padding:'1px 6px',borderRadius:'4px',fontSize:'10px'}}>{topic.category}</span>
                </div>
              </div>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.5'}}>{topic.desc.slice(0,80)}...</p>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'2px solid ' + selected.color + '40'}}>
            <div style={{display:'flex',gap:'16px',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap'}}>
              <span style={{fontSize:'48px'}}>{selected.icon}</span>
              <div style={{flex:1}}>
                <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>{selected.title}</h2>
                <span style={{background:selected.color+'20',color:selected.color,padding:'3px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:'600'}}>{selected.category}</span>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.7',marginTop:'8px'}}>{selected.desc}</p>
              </div>
            </div>

            <div style={{marginBottom:'20px'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>📋 Situation Guide</h3>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {selected.details.map((detail:any,i:number)=>(
                  <div key={i} style={{background:'#0D0907',borderRadius:'8px',padding:'12px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',alignItems:'center'}}>
                    <span style={{color:'rgba(255,255,255,0.7)',fontSize:'12px'}}>{detail.situation}</span>
                    <span style={{color:selected.color,fontSize:'12px',fontWeight:'600'}}>{detail.bow}</span>
                    <span style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{detail.note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'10px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'#F0A830',fontSize:'13px',fontWeight:'700',marginBottom:'10px'}}>💡 Important Tips</h3>
              {selected.tips.map((tip:string,i:number)=>(
                <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                  <span style={{color:selected.color,flexShrink:0}}>→</span>
                  <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Have questions about Japanese culture?</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/community" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Community</a>
          </div>
        </div>
      </div>
    </main>
  )
}