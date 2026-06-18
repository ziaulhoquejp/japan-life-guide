'use client'
import { useState } from 'react'

const FAQS = [
  {
    category:'Visa',
    icon:'🛂',
    questions:[
      {
        q:'What visa do I need to study at a Japanese language school?',
        a:'You need a Student Visa (留学ビザ). Your language school will help you apply for a Certificate of Eligibility (COE) first, then you apply for the visa at the Japanese Embassy in your country. The process takes 3-6 months so start early.',
      },
      {
        q:'How much money do I need in my bank account for a student visa?',
        a:'You need to show approximately 2,000,000 Yen (about $13,000 USD or 1,400,000 BDT or 1,700,000 NPR) in your bank account. The money should be in your account for at least 3-6 months before application.',
      },
      {
        q:'Can I work on a student visa in Japan?',
        a:'Yes! You can work up to 28 hours per week during school and up to 40 hours per week during school holidays. You must apply for a work permit (資格外活動許可) at the immigration office after arriving in Japan.',
      },
      {
        q:'What is the SSW visa and who can apply?',
        a:'The Specified Skilled Worker (SSW) visa allows you to work full-time in 14 specific industries including factory work, food service, and nursing care. You need to pass a skills test and JLPT N4 or higher. No degree required.',
      },
      {
        q:'How long does the visa process take?',
        a:'The total process usually takes 3-6 months: 2-4 weeks for school application, 4-8 weeks for COE processing, 1-2 weeks for visa application. Start at least 6 months before your intended start date.',
      },
      {
        q:'Can I extend my student visa?',
        a:'Yes, student visas can be renewed as long as you are enrolled in school and maintaining good academic attendance (usually 80%+ attendance required). Your school will help with the renewal process.',
      },
    ],
  },
  {
    category:'Schools',
    icon:'🏫',
    questions:[
      {
        q:'How do I choose the right Japanese language school?',
        a:'Consider: location (city preference), annual fees (¥400,000-900,000), dormitory availability, JLPT preparation courses, scholarship opportunities, and school size. Use Japan Life Guide to compare schools by all these factors.',
      },
      {
        q:'How much does Japanese language school cost?',
        a:'Annual fees range from ¥400,000 to ¥900,000 depending on the school and location. Tokyo schools tend to be more expensive (¥600,000-900,000) while schools in smaller cities are more affordable (¥400,000-600,000).',
      },
      {
        q:'What documents do I need to apply to a language school?',
        a:'You typically need: passport copy, academic certificates (graduation/enrollment), bank statement, passport photos, completed application form, and sometimes a personal statement. Your school will provide a checklist.',
      },
      {
        q:'When should I apply to language school?',
        a:'Japanese language schools have 4 intakes per year: January, April, July, and October. Apply at least 6 months before your intended start date. April intake (spring) is most popular.',
      },
      {
        q:'Do I need Japanese ability to enter language school?',
        a:'Most language schools accept complete beginners! That is the purpose of language schools. However, some advanced courses require basic Japanese ability. Check with individual schools.',
      },
      {
        q:'What is the difference between N1, N2, N3, N4, N5 JLPT levels?',
        a:'JLPT has 5 levels: N5 (beginner) → N4 (elementary) → N3 (intermediate) → N2 (upper-intermediate) → N1 (advanced). N4 is required for SSW visa. N2 is recommended for most jobs. Language schools help you reach your target level.',
      },
    ],
  },
  {
    category:'Life in Japan',
    icon:'🌸',
    questions:[
      {
        q:'How much does it cost to live in Japan as a student?',
        a:'Monthly costs vary by city: Tokyo ¥120,000-160,000, Osaka ¥90,000-130,000, smaller cities ¥75,000-110,000. This includes rent, food, transport, and utilities. Part-time work (up to 28 hrs/week) can cover most expenses.',
      },
      {
        q:'How do I find accommodation in Japan?',
        a:'Best options: (1) School dormitory - cheapest and easiest, apply when enrolling. (2) Share house - no guarantor needed, fully furnished, ¥30,000-60,000/month. (3) Apartment - more expensive, requires guarantor. Use GaijinPot or Sakura House websites.',
      },
      {
        q:'Is Japan safe for international students?',
        a:'Japan is one of the safest countries in the world. Crime rates are very low. However, earthquakes are common - download the Safety tips app for emergency alerts. Follow your school\'s safety guidelines.',
      },
      {
        q:'How do I open a bank account in Japan?',
        a:'You can open a bank account at Japan Post Bank (ゆうちょ銀行) or major banks after 6 months of residence. Bring your residence card, passport, and My Number card. Some banks like Rakuten Bank can be opened online.',
      },
      {
        q:'How do I get a SIM card in Japan?',
        a:'Get a SIM card at the airport (IIJmio, Mobal) or at electronics stores (Yodobashi, BIC Camera). Popular affordable plans: IIJmio, MVNO services from ¥1,000-3,000/month. Bring your passport.',
      },
      {
        q:'What is My Number (マイナンバー)?',
        a:'My Number is Japan\'s national identification number. You receive a My Number notification letter after registering at city hall. It is needed for bank accounts, insurance, taxes, and various government services.',
      },
    ],
  },
  {
    category:'Muslim Life',
    icon:'🕌',
    questions:[
      {
        q:'Is it easy to find halal food in Japan?',
        a:'It is getting easier every year! Major cities like Tokyo, Osaka, and Nagoya have many halal restaurants. Use the HalalNavi app to find options near you. Many convenience store items (vegetarian, fish) are also acceptable.',
      },
      {
        q:'Are there mosques in Japan?',
        a:'Yes! Japan has over 100 mosques. Tokyo Camii in Yoyogi-Uehara is the largest. Major cities all have at least one mosque. Use the Japan Life Guide Halal section or Muslim Pro app to find mosques near you.',
      },
      {
        q:'Can I observe Ramadan while studying in Japan?',
        a:'Yes! Inform your school about Ramadan in advance. Most Japanese schools and workplaces are understanding. Community iftars are organized at mosques. The summer Ramadan can be challenging due to long days.',
      },
      {
        q:'Is Friday prayer (Jumu\'ah) possible while in school?',
        a:'Yes, but you need to inform your school in advance. Most schools will accommodate requests for Friday prayers. Friday prayers are usually at 12:30pm at mosques. Check with your school administration.',
      },
    ],
  },
  {
    category:'Money & Work',
    icon:'💰',
    questions:[
      {
        q:'How much can I earn working part-time in Japan?',
        a:'Minimum wage is around ¥1,000-1,500/hour depending on the prefecture. Working 28 hours/week at ¥1,100/hour = about ¥123,000/month. Common jobs: convenience store, restaurant, factory, teaching English.',
      },
      {
        q:'How do I send money back to Bangladesh or Nepal?',
        a:'Best options: Wise (TransferWise) for best exchange rates, Remitly for speed, Western Union for cash pickup. Avoid airport exchanges. Japan Post Bank also offers international transfers but rates are not the best.',
      },
      {
        q:'Do I need to pay taxes in Japan?',
        a:'Yes, if you earn income in Japan you need to file a tax return (確定申告) every year in February-March. Your employer deducts some taxes automatically. Students can often get a refund. Ask your school for guidance.',
      },
      {
        q:'What is the minimum wage in Japan?',
        a:'Japan\'s minimum wage varies by prefecture. Tokyo is highest at around ¥1,113/hour (2024). The national average is around ¥1,004/hour. Night shifts (after 10pm) pay 25% extra.',
      },
    ],
  },
  {
    category:'After School',
    icon:'🎓',
    questions:[
      {
        q:'What can I do after finishing language school?',
        a:'Options include: (1) Apply to Japanese university or vocational school, (2) Change to SSW visa for full-time work, (3) Apply for Engineer/work visa if you have a degree, (4) Return home with Japanese skills for better job opportunities.',
      },
      {
        q:'Can I get permanent residency in Japan?',
        a:'Yes! After 10 years of legal residence in Japan, you can apply for permanent residency (永住権). Some visa categories allow faster PR (Engineer visa holders with high income). PR allows you to work in any industry.',
      },
      {
        q:'Can I bring my family to Japan?',
        a:'Student visa holders cannot bring family initially. After getting a work visa (Engineer or other), you can apply for a Dependent visa for spouse and children. SSW Type 1 does not allow family, but SSW Type 2 does.',
      },
    ],
  },
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [openQuestion, setOpenQuestion] = useState<string|null>(null)
  const [search, setSearch] = useState('')

  const categories = ['All', ...FAQS.map(f=>f.category)]

  const filtered = FAQS.filter(f => selectedCategory === 'All' || f.category === selectedCategory)

  const searchFiltered = search ? FAQS.map(section => ({
    ...section,
    questions: section.questions.filter(q =>
      q.q.toLowerCase().includes(search.toLowerCase()) ||
      q.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(section => section.questions.length > 0) : filtered

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Frequently Asked Questions</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'20px'}}>Answers to common questions about studying and working in Japan</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search questions..." style={{width:'100%',maxWidth:'500px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'10px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none'}}/>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        {!search && (
          <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
            {categories.map(cat=>(
              <button key={cat} onClick={()=>setSelectedCategory(cat)} style={{background:selectedCategory===cat?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                {FAQS.find(f=>f.category===cat)?.icon || '📋'} {cat}
              </button>
            ))}
          </div>
        )}

        {searchFiltered.map((section,si)=>(
          <div key={si} style={{marginBottom:'28px'}}>
            {(!search) && (
              <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'14px'}}>
                <span style={{fontSize:'24px'}}>{section.icon}</span>
                <h2 style={{color:'white',fontSize:'20px',fontWeight:'700'}}>{section.category}</h2>
                <span style={{color:'rgba(255,255,255,0.3)',fontSize:'13px'}}>({section.questions.length} questions)</span>
              </div>
            )}
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {section.questions.map((faq,i)=>(
                <div key={i} style={{background:'#1A2035',borderRadius:'12px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <button onClick={()=>setOpenQuestion(openQuestion===`${si}-${i}`?null:`${si}-${i}`)} style={{width:'100%',background:'none',border:'none',padding:'18px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',gap:'12px'}}>
                    <span style={{color:'white',fontSize:'14px',fontWeight:'600',textAlign:'left',lineHeight:'1.4'}}>{faq.q}</span>
                    <span style={{color:'#C42020',fontSize:'18px',flexShrink:0,fontWeight:'700'}}>{openQuestion===`${si}-${i}`?'−':'+'}</span>
                  </button>
                  {openQuestion===`${si}-${i}` && (
                    <div style={{padding:'0 20px 18px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                      <p style={{color:'rgba(255,255,255,0.7)',fontSize:'14px',lineHeight:'1.8',marginTop:'14px'}}>{faq.a}</p>
                      <div style={{display:'flex',gap:'8px',marginTop:'12px',flexWrap:'wrap'}}>
                        <a href="/chat" style={{color:'#C42020',fontSize:'12px',textDecoration:'none',fontWeight:'600'}}>Ask Sakura for more details →</a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {searchFiltered.length === 0 && (
          <div style={{textAlign:'center',padding:'48px'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🔍</div>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>No results found</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>Try different keywords or ask Sakura AI!</p>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>Ask Sakura AI</a>
          </div>
        )}

        <div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.2),rgba(139,0,0,0.2))',borderRadius:'12px',padding:'24px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
          <h3 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>Still have questions? 🌸</h3>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'16px'}}>Ask Sakura AI in Bengali, Nepali, or English - available 24/7!</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>Ask Sakura AI 🌸</a>
            <a href="/contact" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)'}}>Contact Us</a>
          </div>
        </div>
      </div>
    </main>
  )
}