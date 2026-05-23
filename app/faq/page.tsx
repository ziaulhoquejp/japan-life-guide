'use client'
import { useState } from 'react'

const FAQS = [
  {
    category: 'Visa',
    questions: [
      {q:'How long does it take to get a student visa for Japan?',a:'The process takes 3-6 months total. School application takes 1-2 months, COE processing takes 4-8 weeks, and Embassy processing takes 1-2 weeks. Start early!'},
      {q:'How much money do I need in my bank account?',a:'You need at least 2,000,000 Yen (about 1,500 USD or 170,000 BDT) in your bank account. The money should be in the account for at least 3-6 months.'},
      {q:'Can I work while studying in Japan?',a:'Yes! Student visa holders can work up to 28 hours per week. You need to apply for a work permit at immigration. During school holidays, you can work up to 40 hours per week.'},
      {q:'What documents do I need for a student visa?',a:'You need: valid passport, bank statement, academic certificates, acceptance letter from school, medical certificate, passport photos, and visa application form.'},
      {q:'Can I extend my student visa in Japan?',a:'Yes, you can extend your visa while in Japan. Apply at the local immigration office 3 months before your visa expires.'},
    ]
  },
  {
    category: 'Schools',
    questions: [
      {q:'What is the cheapest Japanese language school?',a:'Schools in rural areas like Tohoku or Hokkaido start from about 400,000 Yen per year. Schools in Tokyo and Osaka are more expensive, starting from 550,000 Yen.'},
      {q:'Do I need to know Japanese before applying?',a:'No! Most language schools accept complete beginners. You will start from hiragana and katakana on day one.'},
      {q:'What is the difference between JLPT N5 and N1?',a:'N5 is beginner level, N4 is elementary, N3 is intermediate, N2 is upper intermediate, and N1 is advanced. Most jobs require N2 or higher.'},
      {q:'How long do language school courses last?',a:'Most courses are 1-2 years. You can choose 6 months, 1 year, 1.5 years, or 2 years depending on your goals.'},
      {q:'What is a COE (Certificate of Eligibility)?',a:'COE is a document that your school applies for on your behalf. It proves that Japan Immigration has approved your visa. You need it to apply for your visa at the Embassy.'},
    ]
  },
  {
    category: 'Life in Japan',
    questions: [
      {q:'How much does it cost to live in Japan as a student?',a:'Budget about 80,000-120,000 Yen per month for rent, food, transport, and daily expenses. Tokyo is more expensive than other cities.'},
      {q:'Is Japan safe for Bangladesh and Nepal students?',a:'Yes! Japan is one of the safest countries in the world. Crime rates are very low and people are generally helpful to foreigners.'},
      {q:'What should I do first when I arrive in Japan?',a:'Register at your city hall within 14 days of arrival, get a residence card, open a bank account (Japan Post Bank is easiest), get a SIM card, and start school orientation.'},
      {q:'Can I bring my family to Japan on a student visa?',a:'Your spouse and children can apply for a dependent visa. However, you need to prove you have enough income to support them.'},
      {q:'Is food in Japan halal-friendly?',a:'Major cities like Tokyo and Osaka have many halal restaurants. Look for the halal mark or ask restaurants. Convenience stores have some halal-friendly options too.'},
    ]
  },
  {
    category: 'SSW Visa',
    questions: [
      {q:'What is the SSW (Specified Skilled Worker) visa?',a:'SSW visa allows you to work in 14 designated industries in Japan including manufacturing, food service, nursing care, and construction. Valid for up to 5 years.'},
      {q:'How do I qualify for an SSW visa?',a:'You need to pass a skills test in your chosen industry AND pass the Japanese Language Proficiency Test (JLPT) N4 level or higher.'},
      {q:'Can SSW visa holders bring their family?',a:'SSW Type 1 (most workers) cannot bring family. SSW Type 2 (skilled workers) can bring spouse and children.'},
      {q:'What industries are available for SSW visa?',a:'14 industries: nursing care, building cleaning, machine parts manufacturing, industrial machinery, electric/electronic, construction, shipbuilding, automobile repair, aviation, accommodation, agriculture, fisheries, food/beverage, and food service.'},
    ]
  },
  {
    category: 'Scholarships',
    questions: [
      {q:'How can I get a scholarship to study in Japan?',a:'Apply for MEXT (Japanese Government Scholarship), JASSO scholarship, or your school\'s own scholarship. Start applying 1 year before your planned start date.'},
      {q:'What is the MEXT scholarship amount?',a:'MEXT scholarship covers tuition, provides 117,000-145,000 Yen per month for living expenses, and includes round-trip airfare. It is highly competitive.'},
      {q:'Can Bangladesh and Nepal students get Japanese scholarships?',a:'Yes! Both Bangladesh and Nepal students are eligible for MEXT, JASSO, and various private scholarships. Check with the Japanese Embassy in your country.'},
    ]
  },
]

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState('Visa')
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const allQuestions = FAQS.flatMap(cat => cat.questions.map(q => ({...q, category: cat.category})))
  const searchResults = search ? allQuestions.filter(q => q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase())) : []

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>FAQ</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'20px'}}>Frequently Asked Questions about studying and working in Japan</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search questions..." style={{width:'100%',maxWidth:'500px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'10px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none'}}/>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'40px 20px'}}>
        {search ? (
          <div>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>{searchResults.length} results found</p>
            {searchResults.map((item,i)=>(
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',marginBottom:'10px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <button onClick={()=>setOpenQuestion(openQuestion===i?null:i)} style={{width:'100%',background:'none',border:'none',padding:'18px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
                  <span style={{color:'white',fontSize:'14px',fontWeight:'600',textAlign:'left'}}>{item.q}</span>
                  <span style={{color:'#C42020',fontSize:'18px',flexShrink:0,marginLeft:'12px'}}>{openQuestion===i?'−':'+'}</span>
                </button>
                {openQuestion===i && (
                  <div style={{padding:'0 20px 18px'}}>
                    <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>{item.a}</p>
                    <span style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'3px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',marginTop:'8px',display:'inline-block'}}>{item.category}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
              {FAQS.map(cat=>(
                <button key={cat.category} onClick={()=>setOpenCategory(cat.category)} style={{background:openCategory===cat.category?'#C42020':'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'20px',padding:'8px 18px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
                  {cat.category}
                </button>
              ))}
            </div>

            {FAQS.filter(cat=>cat.category===openCategory).map(cat=>(
              <div key={cat.category}>
                {cat.questions.map((item,i)=>(
                  <div key={i} style={{background:'#1A2035',borderRadius:'12px',marginBottom:'10px',border:'1px solid rgba(255,255,255,0.08)'}}>
                    <button onClick={()=>setOpenQuestion(openQuestion===i?null:i)} style={{width:'100%',background:'none',border:'none',padding:'18px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
                      <span style={{color:'white',fontSize:'14px',fontWeight:'600',textAlign:'left'}}>{item.q}</span>
                      <span style={{color:'#C42020',fontSize:'18px',flexShrink:0,marginLeft:'12px'}}>{openQuestion===i?'−':'+'}</span>
                    </button>
                    {openQuestion===i && (
                      <div style={{padding:'0 20px 18px'}}>
                        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>{item.a}</p>
                        <a href="/chat" style={{display:'inline-block',marginTop:'12px',color:'#C42020',fontSize:'12px',textDecoration:'none'}}>
                          Ask Sakura AI for more details →
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginTop:'32px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{fontSize:'32px',marginBottom:'12px'}}>🌸</div>
          <h3 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>Still have questions?</h3>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'16px'}}>Ask Sakura AI or contact us directly!</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/contact" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Contact Us</a>
          </div>
        </div>
      </div>
    </main>
  )
}