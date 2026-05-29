'use client'
import { useState } from 'react'

const CULTURE_TOPICS = [
  {
    id:1,
    icon:'🙇',
    title:'Bowing (Ojigi)',
    category:'Etiquette',
    importance:'Essential',
    desc:'Bowing is the Japanese way of greeting, thanking, and apologizing. The deeper the bow, the more respect you show.',
    tips:[
      '15 degree bow - casual greeting',
      '30 degree bow - showing respect to teacher or boss',
      '45 degree bow - deep apology or gratitude',
      'Never bow while shaking hands - do one or the other',
      'In school, bow to your teacher when entering class',
    ]
  },
  {
    id:2,
    icon:'🚇',
    title:'Train Etiquette',
    category:'Transport',
    importance:'Essential',
    desc:'Japanese trains have strict unwritten rules that everyone follows. As a foreigner, following these rules will earn respect.',
    tips:[
      'No phone calls on the train - text only',
      'Keep your voice low',
      'Give up your seat for elderly, pregnant, or disabled people',
      'Stand on the left side of escalators (Tokyo) or right side (Osaka)',
      'Form a neat queue at the platform line markings',
    ]
  },
  {
    id:3,
    icon:'🍱',
    title:'Eating Etiquette',
    category:'Food',
    importance:'Important',
    desc:'Food is very important in Japanese culture. Following eating etiquette shows respect for the food and the people you are with.',
    tips:[
      'Say "Itadakimasu" before eating and "Gochisousama" after',
      'Do not stick chopsticks upright in rice - this is for funerals',
      'Do not pass food chopstick to chopstick - also a funeral custom',
      'Slurping noodles is acceptable and shows you enjoy the food',
      'Finish everything on your plate - wasting food is disrespectful',
    ]
  },
  {
    id:4,
    icon:'👟',
    title:'Removing Shoes',
    category:'Home Life',
    importance:'Essential',
    desc:'Always remove your shoes when entering a Japanese home, many traditional restaurants, and some schools.',
    tips:[
      'Look for the entrance area (genkan) - this is where you remove shoes',
      'Point shoes toward the door when you remove them',
      'Wear clean socks without holes - people will see them!',
      'Slippers are usually provided for inside the house',
      'Never wear slippers in tatami rooms',
    ]
  },
  {
    id:5,
    icon:'💴',
    title:'Money & Payments',
    category:'Daily Life',
    importance:'Important',
    desc:'Japan is still largely a cash society, though digital payments are growing. Understanding payment customs is important.',
    tips:[
      'Always carry cash - many small shops do not accept cards',
      'Use both hands to give or receive money and cards',
      'Money is placed in a tray at shops - do not hand it directly',
      'Tipping is NOT customary in Japan - it can be seen as rude',
      'IC cards (Suica, Pasmo) are used for trains and convenience stores',
    ]
  },
  {
    id:6,
    icon:'🏥',
    title:'Healthcare System',
    category:'Health',
    importance:'Essential',
    desc:'Japan has an excellent healthcare system. As a foreign resident, you must enroll in National Health Insurance.',
    tips:[
      'Enroll in National Health Insurance (Kokumin Kenkou Hoken) at city hall',
      'Insurance covers 70% of medical costs',
      'Premium is about 2,000-5,000 Yen per month for students',
      'Always carry your insurance card (Hoken-shou)',
      'For emergencies, call 119 for ambulance',
    ]
  },
  {
    id:7,
    icon:'🗑️',
    title:'Garbage Sorting',
    category:'Daily Life',
    importance:'Essential',
    desc:'Japan has very strict garbage sorting rules. Putting garbage in the wrong bin can cause problems with neighbors.',
    tips:[
      'Garbage is sorted into: burnable, non-burnable, plastic, glass, cans, cardboard',
      'Each neighborhood has specific garbage collection days',
      'Garbage must be put out on the correct day only',
      'Wash containers before putting in recycling',
      'Your school or ward office will give you a garbage sorting guide',
    ]
  },
  {
    id:8,
    icon:'😷',
    title:'Wearing Masks',
    category:'Health',
    importance:'Important',
    desc:'Wearing masks is common in Japan, especially when sick or during cold and flu season.',
    tips:[
      'Wear a mask if you have a cold or cough - it is polite to others',
      'Masks are sold cheaply at convenience stores and pharmacies',
      'Many Japanese wear masks even when healthy during flu season',
      'Remove mask when eating in restaurants',
    ]
  },
  {
    id:9,
    icon:'📱',
    title:'Technology & Apps',
    category:'Daily Life',
    importance:'Important',
    desc:'Japan has a unique tech culture. These apps and services will make your life much easier.',
    tips:[
      'LINE - Most popular messaging app in Japan (not WhatsApp)',
      'Google Maps - Best for navigation and train routes',
      'Navitime or Yahoo Transit - For train schedules',
      'PayPay or Suica - For cashless payments',
      'Mercari - For buying/selling secondhand items',
    ]
  },
  {
    id:10,
    icon:'🌸',
    title:'Seasons & Festivals',
    category:'Culture',
    importance:'Enjoyable',
    desc:'Japan has beautiful seasonal events and festivals. Participating will help you connect with Japanese culture.',
    tips:[
      'Hanami (Cherry Blossom viewing) in March-April - join your school event',
      'Obon festival in August - visit your school area matsuri',
      'Koyo (Autumn leaves) in October-November - visit parks',
      'New Year (Oshogatsu) in January - visit a shrine for Hatsumode',
      'Many festivals are free and open to everyone',
    ]
  },
]

export default function CulturePage() {
  const [selected, setSelected] = useState<any>(null)
  const [category, setCategory] = useState('All')

  const categories = ['All', 'Etiquette', 'Transport', 'Food', 'Home Life', 'Daily Life', 'Health', 'Culture']
  const filtered = category === 'All' ? CULTURE_TOPICS : CULTURE_TOPICS.filter(t => t.category === category)

  const importanceColor: any = {
    'Essential': '#C42020',
    'Important': '#F0A830',
    'Enjoyable': '#2EC87A',
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Japanese Culture Guide</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Essential customs and etiquette for living in Japan</p>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
          {categories.map(c=>(
            <button key={c} onClick={()=>setCategory(c)} style={{background:category===c?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {c}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'14px'}}>
          {filtered.map(topic=>(
            <div key={topic.id} onClick={()=>setSelected(selected?.id===topic.id?null:topic)} style={{background:selected?.id===topic.id?'rgba(196,32,32,0.1)':'#1A2035',border:'2px solid ' + (selected?.id===topic.id?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'14px',padding:'20px',cursor:'pointer',transition:'all 0.2s'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                <div style={{fontSize:'36px'}}>{topic.icon}</div>
                <span style={{background:importanceColor[topic.importance] + '20',color:importanceColor[topic.importance],padding:'3px 8px',borderRadius:'4px',fontSize:'10px',fontWeight:'700'}}>{topic.importance}</span>
              </div>
              <h2 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'4px'}}>{topic.title}</h2>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'8px'}}>{topic.category}</p>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6'}}>{topic.desc}</p>

              {selected?.id===topic.id && (
                <div style={{marginTop:'14px',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'14px'}}>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',fontWeight:'700',marginBottom:'8px',letterSpacing:'1px'}}>TIPS</p>
                  {topic.tips.map((tip,i)=>(
                    <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',marginBottom:'6px',color:'rgba(255,255,255,0.6)',fontSize:'12px',lineHeight:'1.5'}}>
                      <span style={{color:'#C42020',flexShrink:0}}>→</span>{tip}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Have questions about Japanese culture?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}