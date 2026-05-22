'use client'
import { useState } from 'react'

export default function VisaCalculatorPage() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    purpose: '',
    duration: '',
    japaneseLevel: '',
    education: '',
    workExperience: '',
    savings: '',
  })
  const [result, setResult] = useState<any>(null)

  function update(key: string, value: string) {
    setAnswers(prev => ({...prev, [key]: value}))
  }

  function calculate() {
    let recommendedVisa = ''
    let eligibility = 0
    let tips: string[] = []
    let requirements: string[] = []

    if (answers.purpose === 'study') {
      recommendedVisa = 'Student Visa'
      eligibility = 85
      tips = [
        'Apply to language school at least 6 months before start date',
        'Bank statement must show at least 2,000,000 Yen',
        'COE processing takes 4-8 weeks',
        'You can work up to 28 hours per week',
      ]
      requirements = [
        'Valid passport (6+ months validity)',
        'Bank statement (2,000,000+ Yen)',
        'Academic certificates',
        'Acceptance letter from school',
        'Medical certificate',
        'Passport photos',
      ]
      if (answers.savings === 'low') { eligibility -= 20; tips.unshift('You need more savings! Minimum 2,000,000 Yen required.') }
      if (answers.japaneseLevel === 'none') tips.push('No Japanese needed - schools teach from zero!')
    } else if (answers.purpose === 'work_ssw') {
      recommendedVisa = 'SSW Visa (Specified Skilled Worker)'
      eligibility = 75
      tips = [
        'Pass the SSW skills test in your field',
        'Pass Japanese Language Proficiency Test N4 or higher',
        'Find a registered SSW employer in Japan',
        'Valid for up to 5 years',
      ]
      requirements = [
        'SSW skills test certificate',
        'JLPT N4 or higher',
        'Employment contract with registered employer',
        'Valid passport',
        'Health certificate',
      ]
    } else if (answers.purpose === 'work_engineer') {
      recommendedVisa = 'Engineer / Specialist Visa'
      eligibility = 70
      tips = [
        'Need a job offer from a Japanese company first',
        'University degree in related field required',
        'N3 Japanese or higher recommended',
        'Salary must meet minimum requirements',
      ]
      requirements = [
        'University degree certificate',
        'Employment contract from Japanese company',
        'Valid passport',
        'Company registration documents',
      ]
      if (answers.education === 'no_degree') eligibility -= 30
    } else if (answers.purpose === 'tourist') {
      recommendedVisa = 'Tourist Visa (Short-term Stay)'
      eligibility = 95
      tips = [
        'Bangladesh and Nepal citizens need to apply at Japanese Embassy',
        'Maximum stay is 90 days',
        'Cannot work on tourist visa',
        'Show proof of funds and return ticket',
      ]
      requirements = [
        'Valid passport',
        'Bank statement',
        'Return flight ticket',
        'Hotel booking or invitation letter',
        'Travel itinerary',
      ]
    }

    setResult({ recommendedVisa, eligibility, tips, requirements })
    setStep(4)
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Visa Calculator</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Find the right visa for your Japan journey</p>
        <div style={{display:'flex',justifyContent:'center',gap:'8px',marginTop:'20px'}}>
          {[1,2,3].map(s=>(
            <div key={s} style={{width:'32px',height:'32px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:'700',background:step>s?'#2EC87A':step===s?'#C42020':'rgba(255,255,255,0.1)',color:'white'}}>
              {step>s?'✓':s}
            </div>
          ))}
        </div>
      </div>

      <div style={{maxWidth:'600px',margin:'0 auto',padding:'40px 20px'}}>
        {step === 1 && (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'20px'}}>What is your purpose in Japan?</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {[
                {value:'study',icon:'🏫',label:'Study at Language School'},
                {value:'work_ssw',icon:'🏭',label:'Work (SSW - Factory, Farm, Care)'},
                {value:'work_engineer',icon:'💻',label:'Work (Engineer, IT, Business)'},
                {value:'tourist',icon:'✈️',label:'Tourism / Short Visit'},
              ].map(opt=>(
                <button key={opt.value} onClick={()=>{update('purpose',opt.value);setStep(2)}} style={{background:answers.purpose===opt.value?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (answers.purpose===opt.value?'#C42020':'rgba(255,255,255,0.15)'),borderRadius:'10px',padding:'16px',color:'white',fontSize:'14px',cursor:'pointer',display:'flex',alignItems:'center',gap:'12px',textAlign:'left'}}>
                  <span style={{fontSize:'24px'}}>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'20px'}}>What is your Japanese level?</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
              {[
                {value:'none',label:'No Japanese at all'},
                {value:'beginner',label:'Beginner (Hiragana/Katakana)'},
                {value:'n4',label:'N4 - Elementary'},
                {value:'n3',label:'N3 - Intermediate'},
                {value:'n2',label:'N2 - Upper Intermediate'},
                {value:'n1',label:'N1 - Advanced'},
              ].map(opt=>(
                <button key={opt.value} onClick={()=>update('japaneseLevel',opt.value)} style={{background:answers.japaneseLevel===opt.value?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (answers.japaneseLevel===opt.value?'#C42020':'rgba(255,255,255,0.15)'),borderRadius:'10px',padding:'14px',color:'white',fontSize:'13px',cursor:'pointer',textAlign:'left'}}>
                  {opt.label}
                </button>
              ))}
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>setStep(1)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px',cursor:'pointer',flex:1}}>Back</button>
              <button onClick={()=>setStep(3)} disabled={!answers.japaneseLevel} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontWeight:'700',cursor:'pointer',flex:2}}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'20px'}}>What are your savings?</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
              {[
                {value:'low',label:'Under 1,000,000 Yen'},
                {value:'medium',label:'1,000,000 - 2,000,000 Yen'},
                {value:'high',label:'2,000,000 - 4,000,000 Yen'},
                {value:'very_high',label:'Over 4,000,000 Yen'},
              ].map(opt=>(
                <button key={opt.value} onClick={()=>update('savings',opt.value)} style={{background:answers.savings===opt.value?'rgba(196,32,32,0.2)':'#0D0907',border:'1px solid ' + (answers.savings===opt.value?'#C42020':'rgba(255,255,255,0.15)'),borderRadius:'10px',padding:'14px',color:'white',fontSize:'13px',cursor:'pointer',textAlign:'left'}}>
                  {opt.label}
                </button>
              ))}
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>setStep(2)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px',cursor:'pointer',flex:1}}>Back</button>
              <button onClick={calculate} disabled={!answers.savings} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontWeight:'700',cursor:'pointer',flex:2}}>Calculate My Visa</button>
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'2px solid #C42020',textAlign:'center'}}>
              <div style={{fontSize:'48px',marginBottom:'16px'}}>🎌</div>
              <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'8px'}}>Recommended Visa</h2>
              <div style={{color:'#C42020',fontSize:'24px',fontWeight:'700',marginBottom:'16px'}}>{result.recommendedVisa}</div>
              <div style={{background:'#0D0907',borderRadius:'10px',padding:'16px',marginBottom:'16px'}}>
                <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'6px'}}>Eligibility Score</div>
                <div style={{height:'8px',background:'rgba(255,255,255,0.1)',borderRadius:'4px',overflow:'hidden',marginBottom:'6px'}}>
                  <div style={{height:'100%',width:result.eligibility + '%',background:result.eligibility>=80?'#2EC87A':result.eligibility>=60?'#F0A830':'#C42020',borderRadius:'4px'}}/>
                </div>
                <div style={{color:'white',fontSize:'20px',fontWeight:'700'}}>{result.eligibility}%</div>
              </div>
              <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
                <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontWeight:'700',fontSize:'14px'}}>Find Schools</a>
                <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura</a>
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>Requirements</h3>
              {result.requirements.map((req: string, i: number)=>(
                <div key={i} style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>
                  <span style={{color:'#C42020'}}>§</span>{req}
                </div>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>Tips</h3>
              {result.tips.map((tip: string, i: number)=>(
                <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.5'}}>
                  <span style={{color:'#2EC87A',flexShrink:0}}>✓</span>{tip}
                </div>
              ))}
            </div>

            <button onClick={()=>{setStep(1);setAnswers({purpose:'',duration:'',japaneseLevel:'',education:'',workExperience:'',savings:''});setResult(null)}} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'12px',fontSize:'14px',cursor:'pointer'}}>
              Start Over
            </button>
          </div>
        )}
      </div>
    </main>
  )
}