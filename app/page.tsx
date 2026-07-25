'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

export default function HomePage() {
  const [stats, setStats] = useState({ schools: 724, users: 0, applications: 0, jobs: 0 })
  const [displayStats, setDisplayStats] = useState({ schools: 0, users: 0, applications: 0, jobs: 0 })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    async function loadStats() {
      const [usersData, appsData, jobsData] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('applications').select('id', { count: 'exact', head: true }),
        supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('is_active', true),
      ])
      const newStats = {
        schools: 724,
        users: usersData.count || 0,
        applications: appsData.count || 0,
        jobs: jobsData.count || 0,
      }
      setStats(newStats)

      const duration = 2000
      const steps = 60
      const interval = duration / steps
      let step = 0
      const timer = setInterval(() => {
        step++
        const eased = 1 - Math.pow(1 - step / steps, 3)
        setDisplayStats({
          schools: Math.round(newStats.schools * eased),
          users: Math.round(newStats.users * eased),
          applications: Math.round(newStats.applications * eased),
          jobs: Math.round(newStats.jobs * eased),
        })
        if (step >= steps) clearInterval(timer)
      }, interval)
    }
    loadStats()

    // Auto rotate testimonials
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(testimonialTimer)
  }, [])

  const FEATURES = [
    {icon:'🏫',title:'724+ Verified Schools',desc:'Browse real Japanese language schools with verified information and direct links',href:'/schools',color:'#C42020'},
    {icon:'🛂',title:'Visa Guide',desc:'Complete guide for Student, SSW, and Engineer visas with eligibility calculator',href:'/visa',color:'#4A8EFF'},
    {icon:'🌸',title:'Sakura AI Assistant',desc:'24/7 AI in Bengali, Nepali, Japanese & English. Ask anything about Japan!',href:'/chat',color:'#FF8070'},
    {icon:'💼',title:'Job Matching',desc:'Real jobs in Japan with licensed recruitment service. SSW, Engineer & more.',href:'/jobs',color:'#2EC87A'},
    {icon:'🕌',title:'Halal & Muslim Guide',desc:'Find halal food, mosques, and Muslim-friendly resources across all of Japan',href:'/halal',color:'#F0A830'},
    {icon:'🏭',title:'SSW Skills Test',desc:'Practice for Specified Skilled Worker exam with AI questions for 13 industries',href:'/ssw-test',color:'#C42020'},
    {icon:'🎤',title:'Interview Practice',desc:'Practice Japanese job interviews with AI feedback in Bengali and Nepali',href:'/interview-practice',color:'#2EC87A'},
    {icon:'📝',title:'JLPT Practice',desc:'Free practice tests for N5, N4, N3 with detailed explanations and scoring',href:'/jlpt-test',color:'#4A8EFF'},
    {icon:'📄',title:'Motivation Letter AI',desc:'Generate professional Japanese motivation letters for schools and jobs',href:'/motivation-letter',color:'#F0A830'},
    {icon:'✅',title:'Visa Document Checker',desc:'AI checks if your visa documents are complete and ready to submit',href:'/visa-check',color:'#A855F7'},
    {icon:'🪪',title:'Document Tracker',desc:'Track visa and residence card expiry with automatic reminders',href:'/visa-tracker',color:'#C42020'},
    {icon:'📷',title:'Halal Scanner',desc:'Scan food ingredients with camera to instantly check halal compliance',href:'/halal-scanner',color:'#2EC87A'},
  ]

  const TESTIMONIALS = [
    {name:'Rahman A.',country:'🇧🇩 Bangladesh',text:'Japan Life Guide helped me find the perfect language school in Tokyo. Sakura AI answered all my questions in Bengali!',role:'Language School Student, Tokyo'},
    {name:'Priya S.',country:'🇳🇵 Nepal',text:'I got my SSW visa with help from Japan Life Guide. The visa calculator and document checker were incredibly helpful!',role:'SSW Worker, Osaka'},
    {name:'Karim M.',country:'🇧🇩 Bangladesh',text:'The halal food guide and halal scanner are amazing. I can easily find halal food near my school!',role:'Student, Nagoya'},
    {name:'Sita R.',country:'🇳🇵 Nepal',text:'The AI interview practice helped me prepare for my job interview. I got the job and moved to Japan!',role:'Engineer, Tokyo'},
    {name:'Rahim H.',country:'🇧🇩 Bangladesh',text:'Japan Life Guide\'s job matching service found me a great SSW job in just 2 weeks. Highly recommended!',role:'Factory Worker, Aichi'},
  ]

  const STEPS = [
    {step:'1',icon:'📱',title:'Download the App',desc:'Available on mobile. Download and study Japan anytime!',color:'#C42020'},
    {step:'2',icon:'🏫',title:'Find Your School or Job',desc:'Browse 724+ schools and real job listings in Japan',color:'#4A8EFF'},
    {step:'3',icon:'🌸',title:'Ask Sakura AI',desc:'Get instant answers in Bengali or Nepali about Japan',color:'#2EC87A'},
    {step:'4',icon:'✈️',title:'Come to Japan!',desc:'We support you from application to arrival in Japan',color:'#F0A830'},
  ]

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#1A2035 0%,#0D1520 60%,#1A0A0A 100%)',padding:'80px 20px',textAlign:'center',borderBottom:'3px solid #C42020',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,opacity:0.06,backgroundImage:'radial-gradient(circle at 20% 50%, #C42020 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4A8EFF 0%, transparent 40%), radial-gradient(circle at 50% 80%, #2EC87A 0%, transparent 40%)'}}/>
        <div style={{position:'relative',maxWidth:'800px',margin:'0 auto'}}>
          <div style={{display:'inline-flex',gap:'8px',background:'rgba(196,32,32,0.1)',border:'1px solid rgba(196,32,32,0.3)',borderRadius:'20px',padding:'6px 16px',marginBottom:'20px'}}>
            <span style={{color:'#FF8070',fontSize:'12px',fontWeight:'700'}}>🌸 #1 Japan Study & Work Guide for BD & NP Students</span>
          </div>
          <h1 style={{color:'white',fontSize:'clamp(28px,5vw,54px)',fontWeight:'800',lineHeight:'1.2',marginBottom:'16px'}}>
            Your Complete Guide to<br/>
            <span style={{color:'#C42020'}}>Study & Work in Japan</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'clamp(14px,2vw,18px)',lineHeight:'1.8',marginBottom:'32px',maxWidth:'600px',margin:'0 auto 32px'}}>
            Find 724+ verified Japanese language schools, get visa guidance, and chat with Sakura AI in Bengali (বাংলা), Nepali (नेपाली), and English. 完全無料！
          </p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'24px'}}>
            <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'16px 36px',borderRadius:'12px',fontSize:'16px',fontWeight:'700',display:'inline-block',boxShadow:'0 4px 20px rgba(196,32,32,0.4)'}}>
              🌸 Get Started Free
            </Link>
            <Link href="/chat" style={{background:'rgba(255,255,255,0.1)',color:'white',textDecoration:'none',padding:'16px 36px',borderRadius:'12px',fontSize:'16px',border:'1px solid rgba(255,255,255,0.2)',display:'inline-block',backdropFilter:'blur(10px)'}}>
              Ask Sakura AI 🤖
            </Link>
          </div>
          <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
            {['🆓 Free to join','🤖 AI-powered','🇧🇩 Bengali','🇳🇵 Nepali','📱 Mobile App'].map(badge => (
              <span key={badge} style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{badge}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{background:'#1A2035',padding:'40px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'20px'}}>
          {[
            {label:'Verified Schools',value:displayStats.schools,suffix:'+',color:'#C42020',icon:'🏫'},
            {label:'Students Registered',value:displayStats.users,suffix:'+',color:'#2EC87A',icon:'👤'},
            {label:'Applications Sent',value:displayStats.applications,suffix:'+',color:'#F0A830',icon:'📝'},
            {label:'Active Jobs',value:displayStats.jobs,suffix:'+',color:'#4A8EFF',icon:'💼'},
          ].map(stat => (
            <div key={stat.label} style={{textAlign:'center'}}>
              <div style={{fontSize:'28px',marginBottom:'6px'}}>{stat.icon}</div>
              <div style={{color:stat.color,fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',lineHeight:'1'}}>
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'60px 20px'}}>
        <h2 style={{color:'white',fontSize:'28px',fontWeight:'700',textAlign:'center',marginBottom:'8px'}}>How It Works</h2>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',textAlign:'center',marginBottom:'40px'}}>From Bangladesh or Nepal to Japan in 4 simple steps</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'16px'}}>
          {STEPS.map((step, i) => (
            <div key={i} style={{background:'#1A2035',borderRadius:'16px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center',position:'relative'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',background:step.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'18px',fontWeight:'800',margin:'0 auto 12px'}}>
                {step.step}
              </div>
              <div style={{fontSize:'32px',marginBottom:'10px'}}>{step.icon}</div>
              <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>{step.title}</h3>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6'}}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div style={{background:'#1A2035',padding:'60px 20px',borderTop:'1px solid rgba(255,255,255,0.06)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <h2 style={{color:'white',fontSize:'28px',fontWeight:'700',textAlign:'center',marginBottom:'8px'}}>Everything You Need</h2>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',textAlign:'center',marginBottom:'40px'}}>All tools to make your Japan dream a reality</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'14px'}}>
            {FEATURES.map(feature => (
              <Link key={feature.href} href={feature.href} style={{background:'#0D0907',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.06)',textDecoration:'none',display:'block',transition:'border-color 0.2s'}}>
                <div style={{fontSize:'32px',marginBottom:'10px'}}>{feature.icon}</div>
                <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'6px'}}>{feature.title}</h3>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',lineHeight:'1.6',marginBottom:'10px'}}>{feature.desc}</p>
                <span style={{color:feature.color,fontSize:'12px',fontWeight:'600'}}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials - Auto rotating */}
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'60px 20px'}}>
        <h2 style={{color:'white',fontSize:'28px',fontWeight:'700',textAlign:'center',marginBottom:'8px'}}>Student Stories 🌸</h2>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',textAlign:'center',marginBottom:'40px'}}>Real experiences from Bangladesh and Nepal students</p>

        {/* Featured Testimonial */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(196,32,32,0.2)',marginBottom:'16px',textAlign:'center'}}>
          <div style={{fontSize:'32px',marginBottom:'16px'}}>💬</div>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:'16px',lineHeight:'1.8',marginBottom:'20px',fontStyle:'italic'}}>
            "{TESTIMONIALS[currentTestimonial].text}"
          </p>
          <div style={{display:'flex',gap:'12px',alignItems:'center',justifyContent:'center'}}>
            <div style={{width:'44px',height:'44px',borderRadius:'50%',background:'linear-gradient(135deg,#C42020,#FF8070)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'18px',fontWeight:'700'}}>
              {TESTIMONIALS[currentTestimonial].name[0]}
            </div>
            <div style={{textAlign:'left'}}>
              <div style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{TESTIMONIALS[currentTestimonial].name} {TESTIMONIALS[currentTestimonial].country}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{TESTIMONIALS[currentTestimonial].role}</div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{display:'flex',gap:'8px',justifyContent:'center'}}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={()=>setCurrentTestimonial(i)} style={{width: i === currentTestimonial ? '24px' : '8px',height:'8px',borderRadius:'4px',background: i === currentTestimonial ? '#C42020' : 'rgba(255,255,255,0.2)',border:'none',cursor:'pointer',transition:'all 0.3s'}}/>
          ))}
        </div>
      </div>

      {/* For Companies */}
      <div style={{background:'#1A2035',padding:'60px 20px',borderTop:'1px solid rgba(255,255,255,0.06)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{background:'#0D0907',borderRadius:'16px',padding:'32px',border:'1px solid rgba(46,200,122,0.2)'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px',alignItems:'center'}}>
              <div>
                <span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',display:'inline-block',marginBottom:'16px'}}>FOR COMPANIES 企業様へ</span>
                <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'12px'}}>外国人材採用をサポート</h2>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.8',marginBottom:'20px'}}>
                  バングラデシュ・ネパールの優秀な人材をご紹介。有料職業紹介許可・登録支援機関許可取得済み。成功報酬型。
                </p>
                <div style={{display:'flex',flexDirection:'column',gap:'6px',marginBottom:'20px'}}>
                  {['✅ 有料職業紹介許可取得済み','✅ 登録支援機関許可取得済み','✅ 成功報酬型','✅ ビザ手続きサポート'].map(item => (
                    <p key={item} style={{color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>{item}</p>
                  ))}
                </div>
                <Link href="/recruit" style={{background:'#2EC87A',color:'#0D0907',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'inline-block'}}>
                  求人を掲載する →
                </Link>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                {['🏭 製造業','🍜 飲食業','🏥 介護','🏗️ 建設業','💻 IT','🌾 農業'].map(item => (
                  <div key={item} style={{background:'#1A2035',borderRadius:'10px',padding:'14px',textAlign:'center',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App Banner */}
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'60px 20px'}}>
        <div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.15),rgba(74,142,255,0.1))',borderRadius:'20px',padding:'40px',textAlign:'center',border:'1px solid rgba(196,32,32,0.2)'}}>
          <div style={{fontSize:'56px',marginBottom:'16px'}}>📱</div>
          <h2 style={{color:'white',fontSize:'24px',fontWeight:'800',marginBottom:'8px'}}>Download Japan Life Guide App!</h2>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px',lineHeight:'1.7'}}>
            Study and work in Japan from your smartphone.<br/>
            Android available now. iOS coming soon!
          </p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://japanlifeguide.app" style={{background:'#2EC87A',color:'#0D0907',textDecoration:'none',padding:'14px 32px',borderRadius:'12px',fontSize:'15px',fontWeight:'700',display:'inline-flex',alignItems:'center',gap:'8px'}}>
  📱 Download App
            </a>
            <span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.3)',padding:'14px 32px',borderRadius:'12px',fontSize:'15px',display:'inline-flex',alignItems:'center',gap:'8px',border:'1px solid rgba(255,255,255,0.08)'}}>
              🍎 App Store (Coming Soon)
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.2),rgba(139,0,0,0.1))',padding:'80px 20px',textAlign:'center',borderTop:'1px solid rgba(196,32,32,0.2)'}}>
        <h2 style={{color:'white',fontSize:'clamp(24px,4vw,40px)',fontWeight:'800',marginBottom:'12px'}}>
          Start Your Japan Journey Today! 🌸
        </h2>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'32px',lineHeight:'1.7'}}>
          Join {stats.users > 0 ? stats.users.toLocaleString() + '+' : 'thousands of'} students from Bangladesh and Nepal
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'18px 40px',borderRadius:'12px',fontSize:'17px',fontWeight:'700',display:'inline-block',boxShadow:'0 4px 20px rgba(196,32,32,0.4)'}}>
            🌸 Join Free Now
          </Link>
          <Link href="/chat" style={{background:'rgba(255,255,255,0.1)',color:'white',textDecoration:'none',padding:'18px 40px',borderRadius:'12px',fontSize:'17px',border:'1px solid rgba(255,255,255,0.2)',display:'inline-block'}}>
            Ask Sakura AI
          </Link>
        </div>
      </div>
    </main>
  )
}