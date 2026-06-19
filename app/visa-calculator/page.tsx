'use client'
import { useState, useEffect } from 'react'

export default function VisaCalculatorPage() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<any>({})
  const [result, setResult] = useState<any>(null)

  function answer(key: string, value: any) {
    setAnswers((prev: any) => ({...prev, [key]: value}))
  }

  useEffect(() => {
    if (step === 3 && answers.purpose === 'visit' && !result) {
      calculateVisit()
    }
  }, [step, answers.purpose])

  function calculateVisit() {
    setResult({
      visa: 'Tourist/Short-term Visa',
      jp: '短期滞在ビザ',
      eligible: true,
      color: '#F0A830',
      icon: '✈️',
      message: 'You can apply for a Tourist Visa to visit Japan!',
      nextSteps: [
        'Prepare documents: passport, bank statement, return ticket',
        'Apply at Japanese Embassy in your country',
        'Wait 1-2 weeks for processing',
        'Visit Japan and explore schools!',
      ],
      requirements: [
        'Valid passport',
        'Bank statement',
        'Return flight ticket',
        'Hotel booking',
        'Proof of employment or enrollment at home',
      ],
      processingTime: '1-2 weeks',
      workRights: 'No work allowed on tourist visa',
    })
  }

  function calculate() {
    const a = answers

    // Student Visa Check
    if (a.purpose === 'study') {
      if (a.school_accepted === 'yes' && a.bank_amount === 'sufficient' && a.passport === 'valid') {
        setResult({
          visa: 'Student Visa',
          jp: '留学ビザ',
          eligible: true,
          color: '#2EC87A',
          icon: '🎓',
          message: 'You appear eligible for a Student Visa! Your next step is to apply through your language school.',
          nextSteps: [
            'Contact your accepted language school',
            'School will apply for Certificate of Eligibility (COE)',
            'Wait 4-8 weeks for COE',
            'Apply for visa at Japanese Embassy in your country',
            'Prepare for departure to Japan!',
          ],
          requirements: [
            'Acceptance letter from Japanese school ✅',
            'Bank statement showing sufficient funds ✅',
            'Valid passport ✅',
            'Medical certificate',
            'Academic certificates',
            'Passport photos',
          ],
          processingTime: '3-6 months total',
          workRights: 'Up to 28 hours/week with work permit',
        })
      } else {
        const missing = []
        if (a.school_accepted !== 'yes') missing.push('Acceptance letter from a Japanese language school')
        if (a.bank_amount !== 'sufficient') missing.push('Sufficient bank balance (¥2,000,000+)')
        if (a.passport !== 'valid') missing.push('Valid passport (6+ months validity)')
        setResult({
          visa: 'Student Visa',
          eligible: false,
          color: '#F0A830',
          icon: '⚠️',
          message: 'You may not be eligible yet. Please address the following requirements:',
          missing,
          nextSteps: [
            'Browse Japan Life Guide schools and apply',
            'Ensure bank account has sufficient funds',
            'Renew passport if needed',
            'Contact Sakura AI for personalized guidance',
          ],
        })
      }
      return
    }

    // SSW Visa Check
    if (a.purpose === 'work_ssw') {
      if (a.jlpt_level === 'n4_or_above' && a.skills_test === 'passed' && a.passport === 'valid') {
        setResult({
          visa: 'SSW Visa (Type 1)',
          jp: '特定技能1号',
          eligible: true,
          color: '#4A8EFF',
          icon: '🏭',
          message: 'You appear eligible for the SSW Visa! Start looking for registered SSW employers in Japan.',
          nextSteps: [
            'Find a registered SSW employer in Japan',
            'Sign employment contract',
            'Employer applies for your visa',
            'Wait for visa approval (2-3 months)',
            'Arrive in Japan and start working!',
          ],
          requirements: [
            'JLPT N4 or higher ✅',
            'Skills test certificate ✅',
            'Valid passport ✅',
            'Employment contract with SSW employer',
            'Health certificate',
          ],
          processingTime: '4-8 months total',
          workRights: 'Full-time work in designated industry',
        })
      } else {
        const missing = []
        if (a.jlpt_level !== 'n4_or_above') missing.push('JLPT N4 or higher certificate')
        if (a.skills_test !== 'passed') missing.push('SSW Skills Test certificate in your industry')
        if (a.passport !== 'valid') missing.push('Valid passport')
        setResult({
          visa: 'SSW Visa',
          eligible: false,
          color: '#F0A830',
          icon: '⚠️',
          message: 'You need to meet these requirements for SSW Visa:',
          missing,
          nextSteps: [
            'Study Japanese to reach JLPT N4 level (6-12 months)',
            'Register for SSW skills test in your industry',
            'Check JLPT test schedule in Bangladesh/Nepal',
            'Ask Sakura AI about SSW preparation',
          ],
        })
      }
      return
    }

    // Engineer Visa Check
    if (a.purpose === 'work_engineer') {
      if (a.degree === 'yes' && a.job_offer === 'yes' && a.passport === 'valid') {
        setResult({
          visa: 'Engineer / Specialist Visa',
          jp: '技術・人文知識・国際業務',
          eligible: true,
          color: '#A855F7',
          icon: '💻',
          message: 'You appear eligible for an Engineer/Specialist Visa!',
          nextSteps: [
            'Finalize employment contract with Japanese company',
            'Company applies for Certificate of Eligibility',
            'Apply for visa at Japanese Embassy',
            'Prepare for relocation to Japan',
          ],
          requirements: [
            'University degree in related field ✅',
            'Job offer from Japanese company ✅',
            'Valid passport ✅',
            'Degree certificate',
            'Employment contract',
          ],
          processingTime: '2-4 months',
          workRights: 'Full-time work in your specialty field',
        })
      } else {
        const missing = []
        if (a.degree !== 'yes') missing.push('University degree in IT, engineering, business or related field')
        if (a.job_offer !== 'yes') missing.push('Job offer from a Japanese company')
        if (a.passport !== 'valid') missing.push('Valid passport')
        setResult({
          visa: 'Engineer Visa',
          eligible: false,
          color: '#F0A830',
          icon: '⚠️',
          message: 'You need these requirements for Engineer Visa:',
          missing,
          nextSteps: [
            'Complete university degree if not done',
            'Search for Japanese companies on GaijinPot Jobs',
            'Improve Japanese to N2 level for better chances',
            'Ask Sakura AI about job hunting in Japan',
          ],
        })
      }
      return
    }
  }

  const totalSteps = answers.purpose === 'study' ? 4 :
    answers.purpose === 'work_ssw' ? 4 :
    answers.purpose === 'work_engineer' ? 4 : 2

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Visa Eligibility Calculator</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Find out which Japanese visa is right for you</p>
      </div>

      <div style={{maxWidth:'700px',margin:'0 auto',padding:'32px 20px'}}>
        {!result ? (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>

            <div style={{display:'flex',gap:'8px',marginBottom:'28px',alignItems:'center'}}>
              {Array.from({length: answers.purpose ? totalSteps : 1}).map((_,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',flex:1}}>
                  <div style={{width:'28px',height:'28px',borderRadius:'50%',background:step>i+1?'#2EC87A':step===i+1?'#C42020':'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:'700',flexShrink:0}}>
                    {step>i+1?'✓':i+1}
                  </div>
                  {i < (answers.purpose ? totalSteps : 1) - 1 && (
                    <div style={{flex:1,height:'2px',background:step>i+1?'#2EC87A':'rgba(255,255,255,0.1)'}}/>
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>What is your main purpose in Japan?</h2>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>Select the option that best describes your goal</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {value:'study',icon:'🎓',title:'Study at Language School',desc:'Learn Japanese at a language school in Japan'},
                    {value:'work_ssw',icon:'🏭',title:'Work (SSW Visa)',desc:'Factory, food service, nursing care, construction'},
                    {value:'work_engineer',icon:'💻',title:'Work (Engineer/IT)',desc:'IT engineer, business specialist, international work'},
                    {value:'visit',icon:'✈️',title:'Short Visit / Tourism',desc:'Visit Japan for a short time to explore'},
                  ].map(opt=>(
                    <button key={opt.value} onClick={()=>{answer('purpose', opt.value); setStep(2)}} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'16px',cursor:'pointer',display:'flex',gap:'14px',alignItems:'center',textAlign:'left'}}
                      onMouseEnter={e=>(e.currentTarget.style.borderColor='#C42020')}
                      onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.15)')}>
                      <span style={{fontSize:'28px'}}>{opt.icon}</span>
                      <div>
                        <div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{opt.title}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{opt.desc}</div>
                      </div>
                      <span style={{color:'#C42020',marginLeft:'auto',fontSize:'18px'}}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Do you have a valid passport?</h2>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>Your passport must have at least 6 months validity remaining</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {value:'valid',icon:'✅',title:'Yes, valid passport (6+ months)',desc:'My passport is valid for more than 6 months'},
                    {value:'expiring',icon:'⚠️',title:'Expiring soon (less than 6 months)',desc:'I need to renew my passport first'},
                    {value:'no',icon:'❌',title:'No passport yet',desc:'I do not have a passport yet'},
                  ].map(opt=>(
                    <button key={opt.value} onClick={()=>{answer('passport', opt.value); setStep(3)}} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'16px',cursor:'pointer',display:'flex',gap:'14px',alignItems:'center',textAlign:'left'}}
                      onMouseEnter={e=>(e.currentTarget.style.borderColor='#C42020')}
                      onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.15)')}>
                      <span style={{fontSize:'28px'}}>{opt.icon}</span>
                      <div>
                        <div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{opt.title}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={()=>setStep(1)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'13px',marginTop:'16px'}}>← Back</button>
              </div>
            )}

            {step === 3 && answers.purpose === 'study' && (
              <div>
                <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Have you been accepted by a Japanese language school?</h2>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>You need an acceptance letter to apply for a student visa</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {value:'yes',icon:'✅',title:'Yes, I have an acceptance letter',desc:'I have been accepted by a Japanese language school'},
                    {value:'applied',icon:'⏳',title:'Applied but waiting',desc:'I submitted my application and am waiting for response'},
                    {value:'no',icon:'🔍',title:'Not yet, still searching',desc:'I am still looking for a suitable school'},
                  ].map(opt=>(
                    <button key={opt.value} onClick={()=>{answer('school_accepted', opt.value); setStep(4)}} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'16px',cursor:'pointer',display:'flex',gap:'14px',alignItems:'center',textAlign:'left'}}
                      onMouseEnter={e=>(e.currentTarget.style.borderColor='#C42020')}
                      onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.15)')}>
                      <span style={{fontSize:'28px'}}>{opt.icon}</span>
                      <div>
                        <div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{opt.title}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={()=>setStep(2)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'13px',marginTop:'16px'}}>← Back</button>
              </div>
            )}

            {step === 3 && answers.purpose === 'work_ssw' && (
              <div>
                <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>What is your Japanese language level?</h2>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>SSW visa requires JLPT N4 or JFT-Basic</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {value:'n4_or_above',icon:'✅',title:'JLPT N4 or higher',desc:'I have passed JLPT N4, N3, N2, or N1'},
                    {value:'jft',icon:'✅',title:'JFT-Basic passed',desc:'I have passed the Japan Foundation Test (JFT-Basic)'},
                    {value:'studying',icon:'📚',title:'Currently studying (N5/below)',desc:'I am studying Japanese but have not passed N4 yet'},
                    {value:'none',icon:'❌',title:'No Japanese ability yet',desc:'I have not started studying Japanese'},
                  ].map(opt=>(
                    <button key={opt.value} onClick={()=>{answer('jlpt_level', opt.value); setStep(4)}} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'16px',cursor:'pointer',display:'flex',gap:'14px',alignItems:'center',textAlign:'left'}}
                      onMouseEnter={e=>(e.currentTarget.style.borderColor='#C42020')}
                      onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.15)')}>
                      <span style={{fontSize:'28px'}}>{opt.icon}</span>
                      <div>
                        <div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{opt.title}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={()=>setStep(2)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'13px',marginTop:'16px'}}>← Back</button>
              </div>
            )}

            {step === 3 && answers.purpose === 'work_engineer' && (
              <div>
                <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Do you have a university degree?</h2>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>Engineer visa requires a degree or 10 years experience</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {value:'yes',icon:'✅',title:'Yes, university degree',desc:'I have a Bachelor\'s degree or higher'},
                    {value:'experience',icon:'💼',title:'10+ years work experience',desc:'I have 10+ years in IT/engineering without a degree'},
                    {value:'no',icon:'❌',title:'No degree or less experience',desc:'I do not have a degree or 10 years experience'},
                  ].map(opt=>(
                    <button key={opt.value} onClick={()=>{answer('degree', opt.value); setStep(4)}} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'16px',cursor:'pointer',display:'flex',gap:'14px',alignItems:'center',textAlign:'left'}}
                      onMouseEnter={e=>(e.currentTarget.style.borderColor='#C42020')}
                      onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.15)')}>
                      <span style={{fontSize:'28px'}}>{opt.icon}</span>
                      <div>
                        <div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{opt.title}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={()=>setStep(2)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'13px',marginTop:'16px'}}>← Back</button>
              </div>
            )}

            {step === 3 && answers.purpose === 'visit' && (
              <div style={{textAlign:'center',padding:'40px'}}>
                <div style={{fontSize:'40px',marginBottom:'12px'}}>🌸</div>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px'}}>Calculating your visa eligibility...</p>
              </div>
            )}

            {step === 4 && answers.purpose === 'study' && (
              <div>
                <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>How much money is in your bank account?</h2>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>You need to show approximately ¥2,000,000 (about $13,000 USD)</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {value:'sufficient',icon:'✅',title:'¥2,000,000 or more',desc:'I have sufficient funds for visa application'},
                    {value:'partial',icon:'⚠️',title:'¥1,000,000 - ¥2,000,000',desc:'I have some funds but may need more'},
                    {value:'insufficient',icon:'❌',title:'Less than ¥1,000,000',desc:'I need to save more money before applying'},
                  ].map(opt=>(
                    <button key={opt.value} onClick={()=>{answer('bank_amount', opt.value); calculate()}} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'16px',cursor:'pointer',display:'flex',gap:'14px',alignItems:'center',textAlign:'left'}}
                      onMouseEnter={e=>(e.currentTarget.style.borderColor='#C42020')}
                      onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.15)')}>
                      <span style={{fontSize:'28px'}}>{opt.icon}</span>
                      <div>
                        <div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{opt.title}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={()=>setStep(3)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'13px',marginTop:'16px'}}>← Back</button>
              </div>
            )}

            {step === 4 && answers.purpose === 'work_ssw' && (
              <div>
                <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Have you passed the SSW Skills Test?</h2>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>Skills test is required for your chosen industry</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {value:'passed',icon:'✅',title:'Yes, I passed the skills test',desc:'I have a skills test certificate'},
                    {value:'registered',icon:'⏳',title:'Registered for the test',desc:'I am scheduled to take the skills test'},
                    {value:'no',icon:'❌',title:'Not yet',desc:'I have not taken the skills test yet'},
                  ].map(opt=>(
                    <button key={opt.value} onClick={()=>{answer('skills_test', opt.value); calculate()}} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'16px',cursor:'pointer',display:'flex',gap:'14px',alignItems:'center',textAlign:'left'}}
                      onMouseEnter={e=>(e.currentTarget.style.borderColor='#C42020')}
                      onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.15)')}>
                      <span style={{fontSize:'28px'}}>{opt.icon}</span>
                      <div>
                        <div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{opt.title}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={()=>setStep(3)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'13px',marginTop:'16px'}}>← Back</button>
              </div>
            )}

            {step === 4 && answers.purpose === 'work_engineer' && (
              <div>
                <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Do you have a job offer from a Japanese company?</h2>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>A job offer letter is required for the Engineer visa</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {value:'yes',icon:'✅',title:'Yes, I have a job offer',desc:'I have a written job offer from a Japanese company'},
                    {value:'interviewing',icon:'⏳',title:'Currently interviewing',desc:'I am in the interview process with Japanese companies'},
                    {value:'no',icon:'❌',title:'Not yet',desc:'I am still looking for a job in Japan'},
                  ].map(opt=>(
                    <button key={opt.value} onClick={()=>{answer('job_offer', opt.value); calculate()}} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'16px',cursor:'pointer',display:'flex',gap:'14px',alignItems:'center',textAlign:'left'}}
                      onMouseEnter={e=>(e.currentTarget.style.borderColor='#C42020')}
                      onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.15)')}>
                      <span style={{fontSize:'28px'}}>{opt.icon}</span>
                      <div>
                        <div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'2px'}}>{opt.title}</div>
                        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={()=>setStep(3)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'13px',marginTop:'16px'}}>← Back</button>
              </div>
            )}
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'2px solid ' + result.color + '50',textAlign:'center'}}>
              <div style={{fontSize:'56px',marginBottom:'12px'}}>{result.icon}</div>
              <h2 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'4px'}}>{result.visa}</h2>
              {result.jp && <p style={{color:result.color,fontSize:'14px',marginBottom:'12px'}}>{result.jp}</p>}
              <div style={{background:result.color+'20',borderRadius:'10px',padding:'14px',marginBottom:'16px',border:'1px solid ' + result.color + '40'}}>
                <p style={{color:'white',fontSize:'14px',lineHeight:'1.7',margin:0}}>{result.message}</p>
              </div>
              {result.processingTime && (
                <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
                  <span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.6)',padding:'4px 12px',borderRadius:'20px',fontSize:'12px'}}>⏱ {result.processingTime}</span>
                  {result.workRights && <span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.6)',padding:'4px 12px',borderRadius:'20px',fontSize:'12px'}}>💼 {result.workRights}</span>}
                </div>
              )}
            </div>

            {result.missing && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'#F0A830',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>⚠️ Missing Requirements</h3>
                {result.missing.map((item:string,i:number)=>(
                  <div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px'}}>
                    <span style={{color:'#C42020',flexShrink:0}}>✗</span>
                    <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {result.requirements && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>📋 Required Documents</h3>
                {result.requirements.map((item:string,i:number)=>(
                  <div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px'}}>
                    <span style={{color:'#2EC87A',flexShrink:0}}>→</span>
                    <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{item}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>🚀 Next Steps</h3>
              {result.nextSteps.map((step:string,i:number)=>(
                <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'10px'}}>
                  <div style={{width:'22px',height:'22px',borderRadius:'50%',background:result.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'11px',fontWeight:'700',flexShrink:0}}>{i+1}</div>
                  <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.6'}}>{step}</span>
                </div>
              ))}
            </div>

            <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
              <button onClick={()=>{setResult(null);setStep(1);setAnswers({})}} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'12px 20px',fontSize:'14px',cursor:'pointer',flex:1}}>
                Start Over
              </button>
              <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 20px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',flex:2,textAlign:'center'}}>
                Ask Sakura AI for More Details 🌸
              </a>
            </div>

            <a href="/visa" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 20px',borderRadius:'8px',fontSize:'14px',textAlign:'center',border:'1px solid rgba(255,255,255,0.15)'}}>
              Read Full Visa Guide →
            </a>
          </div>
        )}
      </div>
    </main>
  )
}