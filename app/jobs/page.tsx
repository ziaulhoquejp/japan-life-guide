'use client'
import { useState } from 'react'

const JOB_CATEGORIES = [
  {
    id:1, icon:'🏭', name:'Factory Work', jp:'工場・製造業',
    color:'#4A8EFF', visa:'SSW / Student',
    avgSalary:'¥1,200-1,500/hour',
    desc:'Manufacturing and factory work is one of the most common jobs for international students and SSW visa holders in Japan.',
    jobs:[
      {title:'Assembly Line Worker',company:'Toyota / Honda suppliers',salary:'¥1,200-1,400/hr',hours:'Part-time or Full-time',location:'Aichi, Shizuoka, Kanagawa'},
      {title:'Food Factory Worker',company:'Various food manufacturers',salary:'¥1,100-1,300/hr',hours:'Part-time',location:'Nationwide'},
      {title:'Electronics Assembly',company:'Various manufacturers',salary:'¥1,200-1,400/hr',hours:'Part-time or Full-time',location:'Tokyo, Osaka, Nagoya'},
    ],
    tips:['Factory work often provides housing','Night shifts pay 25% more','Many factories have halal-friendly canteens','Language requirement is minimal'],
  },
  {
    id:2, icon:'🍔', name:'Food Service', jp:'飲食業',
    color:'#F0A830', visa:'SSW / Student',
    avgSalary:'¥1,000-1,200/hour',
    desc:'Restaurant and food service jobs are widely available across Japan. Great for improving Japanese language skills.',
    jobs:[
      {title:'Restaurant Staff',company:'Various restaurants',salary:'¥1,000-1,200/hr',hours:'Part-time',location:'Nationwide'},
      {title:'Convenience Store Staff',company:'7-Eleven, FamilyMart, Lawson',salary:'¥1,000-1,100/hr',hours:'Part-time',location:'Nationwide'},
      {title:'Fast Food Staff',company:'McDonald\'s, MOS Burger',salary:'¥1,000-1,200/hr',hours:'Part-time',location:'Nationwide'},
    ],
    tips:['Most common part-time job for students','Improves Japanese quickly','Convenience stores work 24/7','Some restaurants have English menus'],
  },
  {
    id:3, icon:'🏥', name:'Nursing Care', jp:'介護',
    color:'#2EC87A', visa:'SSW / Care Worker Visa',
    avgSalary:'¥1,200-1,600/hour',
    desc:'Japan has a severe shortage of nursing care workers. Good salary and stable employment with career growth opportunities.',
    jobs:[
      {title:'Care Worker',company:'Nursing homes nationwide',salary:'¥1,200-1,500/hr',hours:'Full-time',location:'Nationwide'},
      {title:'Home Care Assistant',company:'Home care agencies',salary:'¥1,300-1,600/hr',hours:'Part-time or Full-time',location:'Nationwide'},
      {title:'Hospital Assistant',company:'Various hospitals',salary:'¥1,200-1,400/hr',hours:'Part-time',location:'Nationwide'},
    ],
    tips:['High demand - easy to find jobs','Care worker visa available','Japanese N4 usually required','Training provided by most employers'],
  },
  {
    id:4, icon:'🏗', name:'Construction', jp:'建設業',
    color:'#FF8070', visa:'SSW',
    avgSalary:'¥1,500-2,000/hour',
    desc:'Construction industry has high demand for SSW visa workers. Physical work but good salary.',
    jobs:[
      {title:'Construction Worker',company:'Various construction companies',salary:'¥1,500-2,000/hr',hours:'Full-time',location:'Nationwide'},
      {title:'Painting Worker',company:'Painting contractors',salary:'¥1,400-1,800/hr',hours:'Full-time',location:'Nationwide'},
      {title:'Welding Worker',company:'Metal fabrication companies',salary:'¥1,600-2,200/hr',hours:'Full-time',location:'Nationwide'},
    ],
    tips:['Highest paying SSW category','Physical and outdoor work','Safety training required','Skills test available in Bangladesh and Nepal'],
  },
  {
    id:5, icon:'💻', name:'IT Engineer', jp:'ITエンジニア',
    color:'#A855F7', visa:'Engineer Visa',
    avgSalary:'¥250,000-500,000/month',
    desc:'Japan has a huge demand for IT engineers. University degree required but excellent salary and career prospects.',
    jobs:[
      {title:'Software Developer',company:'Various IT companies',salary:'¥300,000-500,000/mo',hours:'Full-time',location:'Tokyo, Osaka, Nagoya'},
      {title:'Web Developer',company:'Web agencies',salary:'¥250,000-400,000/mo',hours:'Full-time',location:'Major cities'},
      {title:'System Engineer',company:'IT consulting firms',salary:'¥280,000-450,000/mo',hours:'Full-time',location:'Tokyo, Osaka'},
    ],
    tips:['N2 Japanese strongly recommended','English-speaking companies available','Remote work options increasing','High demand - many job opportunities'],
  },
  {
    id:6, icon:'🌸', name:'Tourism & Hotel', jp:'観光・ホテル',
    color:'#C42020', visa:'SSW / Student',
    avgSalary:'¥1,000-1,300/hour',
    desc:'Tourism and hotel industry is growing in Japan. Good for students who want to practice Japanese with customers.',
    jobs:[
      {title:'Hotel Staff',company:'Various hotels',salary:'¥1,100-1,300/hr',hours:'Part-time or Full-time',location:'Tokyo, Osaka, Kyoto'},
      {title:'Tour Guide Assistant',company:'Tour companies',salary:'¥1,200-1,500/hr',hours:'Part-time',location:'Major tourist cities'},
      {title:'Airport Staff',company:'Airlines and ground handlers',salary:'¥1,200-1,400/hr',hours:'Part-time',location:'Tokyo, Osaka'},
    ],
    tips:['English skills very valuable','Good Japanese practice','Tips from foreign tourists','Growing industry with many opportunities'],
  },
]

const JOB_SITES = [
  {name:'GaijinPot Jobs',url:'https://jobs.gaijinpot.com',desc:'English-friendly job site for foreigners in Japan',icon:'💼'},
  {name:'Indeed Japan',url:'https://jp.indeed.com',desc:'Large job listing site with foreign-friendly filters',icon:'🔍'},
  {name:'Hello Work',url:'https://www.hellowork.mhlw.go.jp',desc:'Japanese government employment service - free to use',icon:'🏛'},
  {name:'Townwork',url:'https://townwork.net',desc:'Popular part-time job site (Japanese)',icon:'📋'},
  {name:'Baitoru',url:'https://www.baitoru.com',desc:'Part-time job site for students (Japanese)',icon:'🎓'},
  {name:'JLPT Job Sites',url:'https://jobs.gaijinpot.com',desc:'Jobs requiring Japanese language skills',icon:'📝'},
]

export default function JobsPage() {
  const [selected, setSelected] = useState<any>(JOB_CATEGORIES[0])
  const [activeTab, setActiveTab] = useState('categories')

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Jobs in Japan</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'16px'}}>Find part-time jobs and SSW opportunities for Bangladesh and Nepal students</p>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/visa" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Visa Guide</a>
          <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura AI</a>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {['categories','rules','sites'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {tab === 'categories' ? '💼 Job Categories' : tab === 'rules' ? '📋 Work Rules' : '🔗 Job Sites'}
            </button>
          ))}
        </div>

        {activeTab === 'categories' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'12px',marginBottom:'24px'}}>
              {JOB_CATEGORIES.map(cat=>(
                <div key={cat.id} onClick={()=>setSelected(cat)} style={{background:selected.id===cat.id?'rgba(196,32,32,0.15)':'#1A2035',border:'2px solid ' + (selected.id===cat.id?'#C42020':'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'16px',cursor:'pointer',textAlign:'center'}}>
                  <div style={{fontSize:'32px',marginBottom:'8px'}}>{cat.icon}</div>
                  <div style={{color:'white',fontSize:'12px',fontWeight:'700',marginBottom:'4px'}}>{cat.name}</div>
                  <div style={{color:cat.color,fontSize:'11px',marginBottom:'4px'}}>{cat.avgSalary}</div>
                  <div style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)',padding:'2px 6px',borderRadius:'20px',fontSize:'10px'}}>{cat.visa}</div>
                </div>
              ))}
            </div>

            {selected && (
              <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'2px solid ' + selected.color + '30'}}>
                <div style={{display:'flex',gap:'16px',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap'}}>
                  <span style={{fontSize:'48px'}}>{selected.icon}</span>
                  <div style={{flex:1}}>
                    <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'4px'}}>{selected.name}</h2>
                    <p style={{color:selected.color,fontSize:'13px',marginBottom:'8px'}}>{selected.jp} · {selected.visa} · Avg {selected.avgSalary}</p>
                    <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.7'}}>{selected.desc}</p>
                  </div>
                </div>

                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>Available Positions</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
                  {selected.jobs.map((job:any,i:number)=>(
                    <div key={i} style={{background:'#0D0907',borderRadius:'10px',padding:'16px',display:'flex',gap:'16px',alignItems:'flex-start',flexWrap:'wrap'}}>
                      <div style={{flex:1}}>
                        <h4 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{job.title}</h4>
                        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'6px'}}>{job.company}</p>
                        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                          <span style={{background:selected.color+'20',color:selected.color,padding:'2px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>{job.salary}</span>
                          <span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)',padding:'2px 8px',borderRadius:'20px',fontSize:'11px'}}>{job.hours}</span>
                          <span style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)',padding:'2px 8px',borderRadius:'20px',fontSize:'11px'}}>📍 {job.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'10px',padding:'14px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <p style={{color:'#F0A830',fontSize:'12px',fontWeight:'700',marginBottom:'8px'}}>💡 Tips for {selected.name}</p>
                  {selected.tips.map((tip:string,i:number)=>(
                    <div key={i} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
                      <span style={{color:selected.color,flexShrink:0}}>→</span>
                      <span style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'rules' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{background:'rgba(196,32,32,0.1)',borderRadius:'12px',padding:'20px',border:'1px solid rgba(196,32,32,0.3)'}}>
              <h2 style={{color:'#FF8070',fontSize:'16px',fontWeight:'700',marginBottom:'12px'}}>⚠️ Important Work Rules for Student Visa</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {[
                  {rule:'Maximum 28 hours per week during school',important:true},
                  {rule:'Up to 40 hours per week during school holidays (summer/winter)',important:false},
                  {rule:'Must apply for work permit (資格外活動許可) at immigration office after arriving',important:true},
                  {rule:'Working without permit is illegal and can result in visa cancellation',important:true},
                  {rule:'Cannot work in adult entertainment industry',important:true},
                  {rule:'Part-time work income must be reported on tax return',important:false},
                ].map((item,i)=>(
                  <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'8px',background:'#0D0907',borderRadius:'6px'}}>
                    <span style={{color:item.important?'#C42020':'#2EC87A',flexShrink:0}}>{item.important?'⚠️':'✓'}</span>
                    <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{item.rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>💰 Earning Potential</h2>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px'}}>
                {[
                  {hours:'20 hrs/week',wage:'¥1,100/hr',monthly:'¥88,000/month',desc:'Light part-time'},
                  {hours:'28 hrs/week',wage:'¥1,100/hr',monthly:'¥123,200/month',desc:'Maximum student visa'},
                  {hours:'40 hrs/week',wage:'¥1,200/hr',monthly:'¥192,000/month',desc:'Holiday period'},
                  {hours:'Full-time SSW',wage:'¥1,400/hr',monthly:'¥224,000/month',desc:'SSW visa holder'},
                ].map(item=>(
                  <div key={item.desc} style={{background:'#0D0907',borderRadius:'8px',padding:'14px',textAlign:'center'}}>
                    <div style={{color:'#2EC87A',fontSize:'16px',fontWeight:'700',marginBottom:'4px'}}>{item.monthly}</div>
                    <div style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginBottom:'4px'}}>{item.hours} × {item.wage}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>📋 How to Get Work Permit</h2>
              {[
                {step:'1',title:'Arrive in Japan',desc:'Get your residence card at the airport'},
                {step:'2',title:'Register at City Hall',desc:'Register your address within 14 days of arrival'},
                {step:'3',title:'Visit Immigration Office',desc:'Apply for work permit (資格外活動許可) - free of charge'},
                {step:'4',title:'Receive Stamp on Residence Card',desc:'Work permit stamp added to back of residence card'},
                {step:'5',title:'Start Working!',desc:'Show residence card to employer to prove work eligibility'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:'14px',alignItems:'flex-start',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:'700',flexShrink:0}}>{item.step}</div>
                  <div>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'600',marginBottom:'2px'}}>{item.title}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sites' && (
          <div>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'16px'}}>Job Search Websites</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'12px',marginBottom:'24px'}}>
              {JOB_SITES.map((site,i)=>(
                <a key={i} href={site.url} target="_blank" rel="noopener noreferrer" style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none',display:'block'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
                  <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
                    <span style={{fontSize:'28px'}}>{site.icon}</span>
                    <div>
                      <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{site.name}</h3>
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',lineHeight:'1.5',marginBottom:'8px'}}>{site.desc}</p>
                      <span style={{color:'#4A8EFF',fontSize:'11px'}}>Visit Website →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Have questions about working in Japan?</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
            <a href="/visa" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Visa Guide</a>
          </div>
        </div>
      </div>
    </main>
  )
}