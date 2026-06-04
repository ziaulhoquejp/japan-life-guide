'use client'
import { useState } from 'react'
import Link from 'next/link'
import ShareButton from './components/ShareButton'

const content = {
  en: {
    hero: 'Your Journey to Japan Starts Here',
    subtitle: 'Find language schools, navigate visas, get AI guidance — all in one place',
    findSchools: 'Find Schools',
    askSakura: 'Ask Sakura AI',
    stats: ['500+ Schools', '4 Languages', 'AI Powered', 'Free to Join'],
    features: [
      {icon:'🏫',title:'500+ Language Schools',desc:'Search and compare Japanese language schools across Japan with detailed info on fees, dorms, and JLPT prep.'},
      {icon:'🛂',title:'Visa Guide',desc:'Step-by-step visa guidance for student, SSW, and work visas. Know exactly what documents you need.'},
      {icon:'🌸',title:'Sakura AI',desc:'Our AI assistant answers your questions in Bengali, Nepali, Japanese, and English 24/7.'},
      {icon:'💼',title:'Jobs & Scholarships',desc:'Find part-time jobs, SSW opportunities, and scholarships available for Bangladesh and Nepal students.'},
      {icon:'🧮',title:'Smart Calculators',desc:'Calculate your visa eligibility, monthly living costs, and currency conversions instantly.'},
      {icon:'💬',title:'Community',desc:'Connect with other Bangladesh and Nepal students in Japan. Share experiences and get advice.'},
    ],
    cta: 'Start Free Today',
    browsSchools: 'Browse Schools',
    shareText: 'Share with friends:',
  },
  bn: {
    hero: 'Japan-e Apnar Jatra Shuru Hok',
    subtitle: 'Bhasha school khujun, visa navigate korun, AI guidance nun — shob ek jaygay',
    findSchools: 'School Khujun',
    askSakura: 'Sakura AI-ke Jiggesh Korun',
    stats: ['500+ School', '4 Bhasha', 'AI Powered', 'Binamulye'],
    features: [
      {icon:'🏫',title:'250+ Bhasha School',desc:'Japan-er shokol school khujun ebong tulona korun. Fees, dorm, ebong JLPT er detail janan.'},
      {icon:'🛂',title:'Visa Guide',desc:'Student, SSW, ebong work visa-r jonno dhap-e-dhap guidance. Exactly ki ki document lagbe janan.'},
      {icon:'🌸',title:'Sakura AI',desc:'Amader AI assistant Bangla, Nepali, Japanese, ebong English-e 24/7 proshno-r uttor dey.'},
      {icon:'💼',title:'Chakri & Bhritti',desc:'Part-time chakri, SSW shujogh, ebong Bangladesh students-der jonno scholarship khujun.'},
      {icon:'🧮',title:'Calculator',desc:'Visa eligibility, maashik khoroch, ebong currency conversion tatkhonik hishab korun.'},
      {icon:'💬',title:'Community',desc:'Japan-e Bangladesh ebong Nepal-er onyanyo students-der shathe jukto hun.'},
    ],
    cta: 'Binamulye Shuru Korun',
    browsSchools: 'School Dekhun',
    shareText: 'Bondhudder shathe share korun:',
  },
  ne: {
    hero: 'Japan-ma Tapainko Yatra Suru Huncha',
    subtitle: 'Bhasha vidyalaya khojnuhos, visa navigate garnuhos, AI guidance linuhos',
    findSchools: 'Vidyalaya Khojnuhos',
    askSakura: 'Sakura AI-lai Sodhnuhos',
    stats: ['500+ Vidyalaya', '4 Bhasha', 'AI Powered', 'Nisulka'],
    features: [
      {icon:'🏫',title:'250+ Bhasha Vidyalaya',desc:'Japan-ka sabai vidyalaya khojnuhos ra tulana garnuhos. Shulk, dorm, ra JLPT ko detail thaha paaunuhos.'},
      {icon:'🛂',title:'Visa Guide',desc:'Student, SSW, ra work visa ko lagi kadam-kadam guidance. Kun-kun kagajaat chaincha thaha paaunuhos.'},
      {icon:'🌸',title:'Sakura AI',desc:'Hamro AI assistant Bangla, Nepali, Japanese, ra English-ma 24/7 prashna-ko jawab dincha.'},
      {icon:'💼',title:'Kaam ra Chaatravitti',desc:'Part-time kaam, SSW mauka, ra Nepal students-ka lagi scholarship khojnuhos.'},
      {icon:'🧮',title:'Calculator',desc:'Visa eligibility, mahinawar kharcha, ra currency conversion tatkaal hisab garnuhos.'},
      {icon:'💬',title:'Samuday',desc:'Japan-ma Bangladesh ra Nepal-ka anya students-sanga jodinnuhos.'},
    ],
    cta: 'Nisulka Suru Garnuhos',
    browsSchools: 'Vidyalaya Hernus',
    shareText: 'Saathiharu-sanga share garnuhos:',
  },
  jp: {
    hero: 'Nihon eno Tabi wa Koko kara Hajimaru',
    subtitle: 'Gogakko wo sagashi, biza wo navigate shi, AI guidance wo eru',
    findSchools: 'Gakko wo Sagasu',
    askSakura: 'Sakura AI ni Kiku',
    stats: ['500+ Gakko', '4 Gengo', 'AI Powered', 'Muryo'],
    features: [
      {icon:'🏫',title:'250+ Gogakko',desc:'Nihon zenkoku no gogakko wo kensaku, hikaku dekimasu. Jugyoryo, dorm, JLPT junbi no joho mo.'},
      {icon:'🛂',title:'Biza Guide',desc:'Gakusei, SSW, rodo biza no step-by-step guidance. Hitsuyona shorui ga wakaru.'},
      {icon:'🌸',title:'Sakura AI',desc:'AI assistant ga Bengali, Nepali, Nihongo, Eigo de 24/7 shitsumon ni kotaeru.'},
      {icon:'💼',title:'Shigoto to Shogakukin',desc:'Arubaito, SSW kikai, Bangladesh Nepal gakusei muke shogakukin wo sagaseru.'},
      {icon:'🧮',title:'Calculator',desc:'Biza tekisei, seikatsuhi, tsuka henkan wo sokuseki keisan.'},
      {icon:'💬',title:'Community',desc:'Nihon ni iru Bangladesh Nepal no gakusei to tsunagaro.'},
    ],
    cta: 'Muryo de Hajimeru',
    browsSchools: 'Gakko wo Miru',
    shareText: 'Tomodachi ni share shite:',
  },
}

export default function Home() {
  const [lang, setLang] = useState<'en'|'bn'|'ne'|'jp'>('en')
  const t = content[lang]

  const langs = [
    {code:'en' as const,flag:'🇬🇧'},
    {code:'bn' as const,flag:'🇧🇩'},
    {code:'ne' as const,flag:'🇳🇵'},
    {code:'jp' as const,flag:'🇯🇵'},
  ]

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'linear-gradient(135deg, #0D0907 0%, #1A2035 50%, #0D0907 100%)',padding:'80px 20px',textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.06)',position:'relative'}}>
        <div style={{display:'flex',justifyContent:'center',gap:'8px',marginBottom:'32px'}}>
          {langs.map(l=>(
            <button key={l.code} onClick={()=>setLang(l.code)} style={{background:lang===l.code?'rgba(196,32,32,0.3)':'rgba(255,255,255,0.08)',border:lang===l.code?'2px solid #C42020':'2px solid transparent',borderRadius:'8px',padding:'6px 12px',cursor:'pointer',fontSize:'20px',transition:'all 0.2s'}}>
              {l.flag}
            </button>
          ))}
        </div>

        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'20px',padding:'6px 16px',marginBottom:'24px'}}>
          <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C42020',animation:'pulse 1.5s infinite'}}/>
          <span style={{color:'#FF8070',fontSize:'12px',fontWeight:'600'}}>250+ Schools · AI Powered · Free</span>
        </div>

        <h1 style={{color:'white',fontSize:'clamp(28px, 5vw, 52px)',fontWeight:'800',lineHeight:'1.2',marginBottom:'20px',maxWidth:'800px',margin:'0 auto 20px'}}>
          {t.hero}
        </h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'clamp(14px, 2vw, 18px)',marginBottom:'36px',maxWidth:'600px',margin:'0 auto 36px',lineHeight:'1.7'}}>
          {t.subtitle}
        </p>

        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'48px'}}>
          <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'14px 28px',borderRadius:'10px',fontWeight:'700',fontSize:'15px',boxShadow:'0 4px 20px rgba(196,32,32,0.4)'}}>
            {t.cta} 🌸
          </Link>
          <Link href="/schools" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'14px 28px',borderRadius:'10px',fontSize:'15px',border:'1px solid rgba(255,255,255,0.15)'}}>
            {t.browsSchools} →
          </Link>
        </div>

        <div style={{display:'flex',gap:'24px',justifyContent:'center',flexWrap:'wrap'}}>
          {t.stats.map((stat,i)=>(
            <div key={i} style={{textAlign:'center'}}>
              <div style={{color:'white',fontSize:'18px',fontWeight:'700'}}>{stat}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'64px 20px',maxWidth:'1200px',margin:'0 auto'}}>
        <h2 style={{color:'white',fontSize:'28px',fontWeight:'700',textAlign:'center',marginBottom:'40px'}}>
          Everything You Need 🌸
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'20px'}}>
          {t.features.map((feature,i)=>(
            <div key={i} style={{background:'#1A2035',borderRadius:'16px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)',transition:'border-color 0.2s'}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
              <div style={{fontSize:'40px',marginBottom:'14px'}}>{feature.icon}</div>
              <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>{feature.title}</h3>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.7'}}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'#1A2035',padding:'64px 20px',textAlign:'center',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <h2 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'12px'}}>Ready to Start? 🎌</h2>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'32px'}}>Join thousands of students from Bangladesh and Nepal</p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'32px'}}>
          <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'14px 32px',borderRadius:'10px',fontWeight:'700',fontSize:'15px'}}>
            {t.cta} 🌸
          </Link>
          <Link href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'14px 32px',borderRadius:'10px',fontSize:'15px',border:'1px solid rgba(255,255,255,0.15)'}}>
            {t.askSakura} 🌸
          </Link>
        </div>
        <div style={{marginTop:'16px'}}>
          <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',marginBottom:'12px'}}>{t.shareText}</p>
          <ShareButton />
        </div>
      </div>
    </main>
  )
}