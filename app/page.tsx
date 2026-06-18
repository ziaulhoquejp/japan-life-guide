'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from './components/ShareButton'

const content = {
  en: {
    hero: 'Your Journey to Japan Starts Here',
    subtitle: 'Find language schools, navigate visas, get AI guidance — all in one place for Bangladesh and Nepal students',
    findSchools: 'Browse 700+ Schools',
    askSakura: 'Ask Sakura AI',
    stats: ['700+ Schools', '47 Prefectures', 'AI Powered', 'Free to Join'],
    features: [
      {icon:'🏫',title:'700+ Language Schools',desc:'Search and compare Japanese language schools across all 47 prefectures.',href:'/schools'},
      {icon:'🛂',title:'Visa Guide',desc:'Step-by-step visa guidance for student, SSW, and work visas.',href:'/visa'},
      {icon:'🌸',title:'Sakura AI Assistant',desc:'AI assistant in Bengali, Nepali, Japanese, and English 24/7.',href:'/chat'},
      {icon:'💼',title:'Jobs & Scholarships',desc:'Find part-time jobs, SSW opportunities, and MEXT scholarships.',href:'/jobs'},
      {icon:'🧮',title:'Smart Calculators',desc:'Calculate visa eligibility, monthly costs, and currency conversions.',href:'/visa-calculator'},
      {icon:'💬',title:'Community',desc:'Connect with Bangladesh and Nepal students in Japan.',href:'/community'},
      {icon:'🗾',title:'47 Prefectures Guide',desc:'Explore all 47 prefectures. Find costs, schools, and Muslim resources.',href:'/prefectures'},
      {icon:'🕌',title:'Muslim & Halal Guide',desc:'Find halal restaurants, mosques, and Muslim-friendly resources.',href:'/halal'},
      {icon:'📝',title:'JLPT Practice Tests',desc:'Practice for JLPT N5, N4, and N3 with free tests and flashcards.',href:'/jlpt-test'},
    ],
    cta: 'Start Free Today',
    browseSchools: 'Browse Schools',
    shareText: 'Share with friends:',
  },
  bn: {
    hero: 'Japan-e Apnar Jatra Shuru Hok',
    subtitle: 'Bhasha school khujun, visa navigate korun, AI guidance nun — Bangladesh o Nepal students-der jonno',
    findSchools: '700+ School Dekhun',
    askSakura: 'Sakura AI-ke Jiggesh Korun',
    stats: ['700+ School', '47 Jela', 'AI Powered', 'Binamulye'],
    features: [
      {icon:'🏫',title:'700+ Bhasha School',desc:'Japan-er 47 jela-r shokol school khujun ebong tulona korun.',href:'/schools'},
      {icon:'🛂',title:'Visa Guide',desc:'Student, SSW, ebong work visa-r jonno dhap-e-dhap guidance.',href:'/visa'},
      {icon:'🌸',title:'Sakura AI',desc:'Amader AI assistant Bangla, Nepali, Japanese, ebong English-e 24/7.',href:'/chat'},
      {icon:'💼',title:'Chakri & Bhritti',desc:'Part-time chakri, SSW shujogh, ebong MEXT scholarship khujun.',href:'/jobs'},
      {icon:'🧮',title:'Calculator',desc:'Visa eligibility, maashik khoroch, ebong currency conversion.',href:'/visa-calculator'},
      {icon:'💬',title:'Community',desc:'Japan-e Bangladesh ebong Nepal-er students-der shathe jukto hun.',href:'/community'},
      {icon:'🗾',title:'47 Jela Guide',desc:'Japan-er 47 jela explore korun.',href:'/prefectures'},
      {icon:'🕌',title:'Muslim & Halal Guide',desc:'Japan-e halal restaurant, mosque khujun.',href:'/halal'},
      {icon:'📝',title:'JLPT Practice',desc:'JLPT N5, N4, ebong N3 er jonno free practice test.',href:'/jlpt-test'},
    ],
    cta: 'Binamulye Shuru Korun',
    browseSchools: 'School Dekhun',
    shareText: 'Bondhudder shathe share korun:',
  },
  ne: {
    hero: 'Japan-ma Tapainko Yatra Suru Huncha',
    subtitle: 'Bhasha vidyalaya khojnuhos, visa navigate garnuhos — Bangladesh ra Nepal students-ka lagi',
    findSchools: '700+ Vidyalaya Herna',
    askSakura: 'Sakura AI-lai Sodhnuhos',
    stats: ['700+ Vidyalaya', '47 Pradesh', 'AI Powered', 'Nisulka'],
    features: [
      {icon:'🏫',title:'700+ Bhasha Vidyalaya',desc:'Japan-ka 47 pradesh-ka sabai vidyalaya khojnuhos.',href:'/schools'},
      {icon:'🛂',title:'Visa Guide',desc:'Student, SSW, ra work visa ko lagi kadam-kadam guidance.',href:'/visa'},
      {icon:'🌸',title:'Sakura AI',desc:'Hamro AI assistant Nepali, Bangla, Japanese, ra English-ma 24/7.',href:'/chat'},
      {icon:'💼',title:'Kaam ra Chaatravitti',desc:'Part-time kaam, SSW mauka, ra MEXT scholarship khojnuhos.',href:'/jobs'},
      {icon:'🧮',title:'Calculator',desc:'Visa eligibility, mahinawar kharcha, ra currency conversion.',href:'/visa-calculator'},
      {icon:'💬',title:'Samuday',desc:'Japan-ma Bangladesh ra Nepal-ka students-sanga jodinnuhos.',href:'/community'},
      {icon:'🗾',title:'47 Pradesh Guide',desc:'Japan-ka 47 pradesh explore garnuhos.',href:'/prefectures'},
      {icon:'🕌',title:'Muslim & Halal Guide',desc:'Japan-ma halal restaurant, masjid khojnuhos.',href:'/halal'},
      {icon:'📝',title:'JLPT Practice',desc:'JLPT N5, N4, ra N3 ko lagi nisulka practice test.',href:'/jlpt-test'},
    ],
    cta: 'Nisulka Suru Garnuhos',
    browseSchools: 'Vidyalaya Hernus',
    shareText: 'Saathiharu-sanga share garnuhos:',
  },
  jp: {
    hero: 'Nihon eno Tabi wa Koko kara Hajimaru',
    subtitle: 'Gogakko wo sagashi, biza wo navigate shi, AI guidance wo eru — Bangladesh Nepal no gakusei no tame ni',
    findSchools: '700+ Gakko wo Miru',
    askSakura: 'Sakura AI ni Kiku',
    stats: ['700+ Gakko', '47 Todofuken', 'AI Powered', 'Muryo'],
    features: [
      {icon:'🏫',title:'700+ Gogakko',desc:'Nihon 47 todofuken no gogakko wo kensaku dekimasu.',href:'/schools'},
      {icon:'🛂',title:'Biza Guide',desc:'Gakusei, SSW, rodo biza no step-by-step guidance.',href:'/visa'},
      {icon:'🌸',title:'Sakura AI',desc:'AI assistant ga Bengali, Nepali, Nihongo, Eigo de 24/7.',href:'/chat'},
      {icon:'💼',title:'Shigoto to Shogakukin',desc:'Arubaito, SSW kikai, MEXT shogakukin wo sagaseru.',href:'/jobs'},
      {icon:'🧮',title:'Calculator',desc:'Biza tekisei, seikatsuhi, tsuka henkan wo keisan.',href:'/visa-calculator'},
      {icon:'💬',title:'Community',desc:'Nihon ni iru Bangladesh Nepal no gakusei to tsunagaro.',href:'/community'},
      {icon:'🗾',title:'47 Todofuken Guide',desc:'Nihon no 47 todofuken wo explore.',href:'/prefectures'},
      {icon:'🕌',title:'Muslim & Halal Guide',desc:'Nihon no halal restaurant, mosque wo sagaseru.',href:'/halal'},
      {icon:'📝',title:'JLPT Practice',desc:'JLPT N5, N4, N3 no muryo practice test.',href:'/jlpt-test'},
    ],
    cta: 'Muryo de Hajimeru',
    browseSchools: 'Gakko wo Miru',
    shareText: 'Tomodachi ni share shite:',
  },
}

const COUNTERS = [
  {end:704,label:'Language Schools',icon:'🏫',suffix:'+'},
  {end:47,label:'Prefectures',icon:'🗾',suffix:''},
  {end:4,label:'Languages',icon:'🌍',suffix:''},
  {end:100,label:'Free to Join',icon:'🆓',suffix:'%'},
]

export default function Home() {
  const [lang, setLang] = useState<'en'|'bn'|'ne'|'jp'>('en')
  const [counts, setCounts] = useState(COUNTERS.map(()=>0))
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timers = COUNTERS.map((counter,i) => {
      const step = Math.ceil(counter.end / 50)
      let current = 0
      return setInterval(() => {
        current = Math.min(current + step, counter.end)
        setCounts(prev => {
          const next = [...prev]
          next[i] = current
          return next
        })
        if (current >= counter.end) clearInterval(timers[i])
      }, 30)
    })
    return () => timers.forEach(t => clearInterval(t))
  }, [])

  const t = content[lang]

  const langs = [
    {code:'en' as const,flag:'🇬🇧',label:'English'},
    {code:'bn' as const,flag:'🇧🇩',label:'বাংলা'},
    {code:'ne' as const,flag:'🇳🇵',label:'नेपाली'},
    {code:'jp' as const,flag:'🇯🇵',label:'日本語'},
  ]

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',overflow:'hidden'}}>

      {/* Hero Section */}
      <div style={{background:'linear-gradient(135deg, #0D0907 0%, #1A2035 50%, #0D0907 100%)',padding:'80px 20px',textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.06)',position:'relative'}}>

        {/* Decorative circles */}
        <div style={{position:'absolute',top:'20px',left:'10%',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(196,32,32,0.05)',filter:'blur(60px)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:'20px',right:'10%',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(74,142,255,0.05)',filter:'blur(40px)',pointerEvents:'none'}}/>

        <div style={{opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(20px)',transition:'all 0.8s ease'}}>
          <div style={{display:'flex',justifyContent:'center',gap:'8px',marginBottom:'32px',flexWrap:'wrap'}}>
            {langs.map(l=>(
              <button key={l.code} onClick={()=>setLang(l.code)} style={{background:lang===l.code?'rgba(196,32,32,0.3)':'rgba(255,255,255,0.08)',border:lang===l.code?'2px solid #C42020':'2px solid transparent',borderRadius:'8px',padding:'6px 12px',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',gap:'4px',color:'white',transition:'all 0.2s'}}>
                {l.flag} <span style={{fontSize:'11px'}}>{l.label}</span>
              </button>
            ))}
          </div>

          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'20px',padding:'6px 16px',marginBottom:'24px'}}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C42020',animation:'pulse 1.5s infinite'}}/>
            <span style={{color:'#FF8070',fontSize:'12px',fontWeight:'600'}}>700+ Schools · 47 Prefectures · AI Powered · Free</span>
          </div>

          <h1 style={{color:'white',fontSize:'clamp(28px, 5vw, 56px)',fontWeight:'800',lineHeight:'1.2',marginBottom:'20px',maxWidth:'800px',margin:'0 auto 20px'}}>
            {t.hero} 🌸
          </h1>

          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'clamp(14px, 2vw, 18px)',marginBottom:'36px',maxWidth:'600px',margin:'0 auto 36px',lineHeight:'1.7'}}>
            {t.subtitle}
          </p>

          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'48px'}}>
            <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'12px',fontWeight:'700',fontSize:'16px',boxShadow:'0 4px 20px rgba(196,32,32,0.4)',transition:'transform 0.2s',display:'inline-block'}}>
              {t.cta} 🌸
            </Link>
            <Link href="/schools" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'16px 32px',borderRadius:'12px',fontSize:'16px',border:'1px solid rgba(255,255,255,0.2)',display:'inline-block'}}>
              {t.findSchools} →
            </Link>
          </div>

          {/* Animated Counters */}
          <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
            {COUNTERS.map((counter,i)=>(
              <div key={counter.label} style={{textAlign:'center',background:'rgba(255,255,255,0.05)',borderRadius:'12px',padding:'14px 20px',border:'1px solid rgba(255,255,255,0.08)',minWidth:'120px'}}>
                <div style={{fontSize:'24px',marginBottom:'4px'}}>{counter.icon}</div>
                <div style={{color:'#C42020',fontSize:'22px',fontWeight:'800'}}>{counts[i]}{counter.suffix}</div>
                <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{counter.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{background:'#1A2035',padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
          {[
            {icon:'🔒',label:'Secure & Private'},
            {icon:'🆓',label:'Free to Join'},
            {icon:'🌸',label:'AI Powered'},
            {icon:'📱',label:'Mobile Friendly'},
            {icon:'🕌',label:'Muslim Friendly'},
            {icon:'⭐',label:'Trusted by BD & NP Students'},
          ].map(badge=>(
            <div key={badge.label} style={{display:'flex',alignItems:'center',gap:'6px',color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>
              <span>{badge.icon}</span><span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{padding:'64px 20px',maxWidth:'1200px',margin:'0 auto'}}>
        <h2 style={{color:'white',fontSize:'28px',fontWeight:'700',textAlign:'center',marginBottom:'8px'}}>Everything You Need 🌸</h2>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'15px',textAlign:'center',marginBottom:'40px'}}>All tools for your Japan journey in one place</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'20px'}}>
          {t.features.map((feature,i)=>(
            <Link key={i} href={feature.href} style={{textDecoration:'none'}}>
              <div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)',height:'100%',opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(20px)',transition:`all 0.5s ease ${i*0.1}s`,cursor:'pointer'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(196,32,32,0.4)';e.currentTarget.style.transform='translateY(-4px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';e.currentTarget.style.transform='translateY(0)'}}>
                <div style={{fontSize:'40px',marginBottom:'14px'}}>{feature.icon}</div>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>{feature.title}</h3>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.7',marginBottom:'12px'}}>{feature.desc}</p>
                <span style={{color:'#C42020',fontSize:'12px',fontWeight:'600'}}>Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{background:'#1A2035',padding:'48px 20px',borderTop:'1px solid rgba(255,255,255,0.06)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:'20px',textAlign:'center'}}>
          {[
            {value:'700+',label:'Language Schools',icon:'🏫'},
            {value:'47',label:'Prefectures',icon:'🗾'},
            {value:'4',label:'Languages',icon:'🌍'},
            {value:'24/7',label:'AI Assistant',icon:'🌸'},
            {value:'Free',label:'To Join',icon:'🆓'},
            {value:'100%',label:'Student Focused',icon:'🎓'},
          ].map(stat=>(
            <div key={stat.label} style={{padding:'16px'}}>
              <div style={{fontSize:'28px',marginBottom:'6px'}}>{stat.icon}</div>
              <div style={{color:'#C42020',fontSize:'24px',fontWeight:'800',marginBottom:'4px'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{padding:'64px 20px',maxWidth:'1000px',margin:'0 auto'}}>
        <h2 style={{color:'white',fontSize:'24px',fontWeight:'700',textAlign:'center',marginBottom:'32px'}}>What Students Say 💬</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px'}}>
          {[
            {name:'Rahman',country:'🇧🇩 Bangladesh',text:'Japan Life Guide helped me find the perfect school in Tokyo. The visa guide was so helpful!',rating:5},
            {name:'Priya',country:'🇳🇵 Nepal',text:'Sakura AI answered all my questions about SSW visa in Nepali. Amazing service!',rating:5},
            {name:'Karim',country:'🇧🇩 Bangladesh',text:'The halal food guide was exactly what I needed as a Muslim student in Japan.',rating:5},
            {name:'Bikash',country:'🇳🇵 Nepal',text:'I found my language school through Japan Life Guide. Now I am studying in Osaka!',rating:5},
            {name:'Fatima',country:'🇧🇩 Bangladesh',text:'The community helped me connect with other BD students. I felt so welcome!',rating:5},
            {name:'Rohan',country:'🇳🇵 Nepal',text:'The JLPT practice tests helped me pass N4. Thank you Japan Life Guide!',rating:5},
          ].map((testimonial,i)=>(
            <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{color:'#F0A830',fontSize:'16px',marginBottom:'10px'}}>{'★'.repeat(testimonial.rating)}</div>
              <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.7',marginBottom:'12px',fontStyle:'italic'}}>"{testimonial.text}"</p>
              <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'13px',fontWeight:'700'}}>{testimonial.name[0]}</div>
                <div>
                  <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{testimonial.name}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{testimonial.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{background:'linear-gradient(135deg, #C42020, #8B0000)',padding:'64px 20px',textAlign:'center'}}>
        <h2 style={{color:'white',fontSize:'32px',fontWeight:'800',marginBottom:'12px'}}>Ready to Start Your Japan Journey? 🎌</h2>
        <p style={{color:'rgba(255,255,255,0.8)',fontSize:'16px',marginBottom:'32px',maxWidth:'600px',margin:'0 auto 32px'}}>
          Join thousands of students from Bangladesh and Nepal who found their path to Japan
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'24px'}}>
          <Link href="/register" style={{background:'white',color:'#C42020',textDecoration:'none',padding:'16px 36px',borderRadius:'12px',fontWeight:'700',fontSize:'16px',display:'inline-block'}}>
            {t.cta} 🌸
          </Link>
          <Link href="/chat" style={{background:'rgba(255,255,255,0.2)',color:'white',textDecoration:'none',padding:'16px 36px',borderRadius:'12px',fontSize:'16px',border:'1px solid rgba(255,255,255,0.4)',display:'inline-block'}}>
            {t.askSakura} 🌸
          </Link>
        </div>
        <div>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginBottom:'12px'}}>{t.shareText}</p>
          <ShareButton />
        </div>
      </div>
    </main>
  )
}