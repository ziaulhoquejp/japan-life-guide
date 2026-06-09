'use client'
import { useState } from 'react'

const TESTS = {
  N5: [
    {q:'What does "ありがとう" mean?',options:['Good morning','Thank you','Goodbye','Sorry'],answer:'Thank you'},
    {q:'What does "すみません" mean?',options:['Thank you','Yes','Excuse me','No'],answer:'Excuse me'},
    {q:'What does "えき" mean?',options:['Hospital','School','Train station','Restaurant'],answer:'Train station'},
    {q:'What does "みず" mean?',options:['Food','Water','Tea','Juice'],answer:'Water'},
    {q:'What does "せんせい" mean?',options:['Student','Teacher','Friend','Parent'],answer:'Teacher'},
    {q:'What does "がっこう" mean?',options:['Hospital','Park','School','Library'],answer:'School'},
    {q:'What does "にほん" mean?',options:['China','Korea','Japan','America'],answer:'Japan'},
    {q:'What does "たべる" mean?',options:['To drink','To eat','To sleep','To walk'],answer:'To eat'},
    {q:'What does "おおきい" mean?',options:['Small','Tall','Big','Fast'],answer:'Big'},
    {q:'What does "あかい" mean?',options:['Blue','Green','White','Red'],answer:'Red'},
  ],
  N4: [
    {q:'What does "でんしゃ" mean?',options:['Bus','Taxi','Train','Bicycle'],answer:'Train'},
    {q:'What does "びょういん" mean?',options:['Library','Hospital','School','Park'],answer:'Hospital'},
    {q:'What does "しごと" mean?',options:['Holiday','School','Work','Home'],answer:'Work'},
    {q:'What does "きゅうりょう" mean?',options:['Holiday','Salary','Interview','Contract'],answer:'Salary'},
    {q:'What does "アルバイト" mean?',options:['Full-time job','Part-time job','Boss','Interview'],answer:'Part-time job'},
    {q:'What does "やさい" mean?',options:['Meat','Fish','Vegetables','Fruit'],answer:'Vegetables'},
    {q:'What does "はやい" mean?',options:['Slow','Fast','Late','Early'],answer:'Fast'},
    {q:'What does "たかい" mean?',options:['Cheap','Far','Expensive/Tall','Near'],answer:'Expensive/Tall'},
    {q:'What does "むずかしい" mean?',options:['Easy','Fun','Difficult','Boring'],answer:'Difficult'},
    {q:'What does "べんきょう" mean?',options:['Work','Study','Rest','Play'],answer:'Study'},
  ],
  N3: [
    {q:'What does "けいざい" mean?',options:['Politics','Economy','Culture','Society'],answer:'Economy'},
    {q:'What does "かんきょう" mean?',options:['Technology','Environment','History','Science'],answer:'Environment'},
    {q:'What does "じんこう" mean?',options:['Population','Income','Export','Import'],answer:'Population'},
    {q:'What does "せいふ" mean?',options:['Company','University','Government','Hospital'],answer:'Government'},
    {q:'What does "ほうりつ" mean?',options:['Rule','Law','Policy','Order'],answer:'Law'},
    {q:'What does "ぎじゅつ" mean?',options:['Science','Art','Technology','Culture'],answer:'Technology'},
    {q:'What does "かいぎ" mean?',options:['Party','Meeting','Interview','Ceremony'],answer:'Meeting'},
    {q:'What does "しんぱい" mean?',options:['Happy','Angry','Worried','Surprised'],answer:'Worried'},
    {q:'What does "きけん" mean?',options:['Safe','Danger','Easy','Convenient'],answer:'Danger'},
    {q:'What does "ざんぎょう" mean?',options:['Day off','Overtime','Lunch break','Holiday'],answer:'Overtime'},
  ],
}

export default function JLPTTestPage() {
  const [level, setLevel] = useState<'N5'|'N4'|'N3'>('N5')
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<string|null>(null)
  const [done, setDone] = useState(false)
  const [results, setResults] = useState<{q:string,correct:string,chosen:string,ok:boolean}[]>([])
  const [showResults, setShowResults] = useState(false)

  const questions = TESTS[level]

  function startTest() {
    setStarted(true)
    setCurrent(0)
    setScore(0)
    setAnswered(null)
    setDone(false)
    setResults([])
    setShowResults(false)
  }

  function answer(choice: string) {
    if (answered) return
    setAnswered(choice)
    const correct = questions[current].answer
    const isCorrect = choice === correct
    if (isCorrect) setScore(prev=>prev+1)
    setResults(prev=>[...prev,{q:questions[current].q,correct,chosen:choice,ok:isCorrect}])
    setTimeout(()=>{
      setAnswered(null)
      if (current+1 >= questions.length) {
        setDone(true)
      } else {
        setCurrent(prev=>prev+1)
      }
    }, 800)
  }

  const percentage = Math.round((score/questions.length)*100)
  const passed = percentage >= 60

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>JLPT Practice Test</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Test your Japanese knowledge before the real exam!</p>
      </div>

      <div style={{maxWidth:'700px',margin:'0 auto',padding:'32px 20px'}}>
        {!started ? (
          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'20px'}}>Select JLPT Level</h2>
              <div style={{display:'flex',gap:'12px',marginBottom:'20px',flexWrap:'wrap'}}>
                {(['N5','N4','N3'] as const).map(l=>(
                  <button key={l} onClick={()=>setLevel(l)} style={{flex:1,minWidth:'80px',background:level===l?'#C42020':'#0D0907',border:'2px solid ' + (level===l?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'10px',padding:'16px',color:'white',cursor:'pointer',textAlign:'center'}}>
                    <div style={{fontSize:'24px',fontWeight:'700',marginBottom:'4px'}}>{l}</div>
                    <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>{l==='N5'?'Beginner':l==='N4'?'Elementary':'Intermediate'}</div>
                  </button>
                ))}
              </div>
              <div style={{background:'#0D0907',borderRadius:'10px',padding:'16px',marginBottom:'20px'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                  {[
                    {label:'Questions',value:'10'},
                    {label:'Time Limit',value:'No limit'},
                    {label:'Pass Score',value:'60%'},
                    {label:'Level',value:level==='N5'?'Beginner':level==='N4'?'Elementary':'Intermediate'},
                  ].map(info=>(
                    <div key={info.label} style={{textAlign:'center'}}>
                      <div style={{color:'white',fontSize:'16px',fontWeight:'700'}}>{info.value}</div>
                      <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{info.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={startTest} style={{width:'100%',background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'16px',fontSize:'16px',fontWeight:'700',cursor:'pointer'}}>
                Start {level} Test 🌸
              </button>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'12px'}}>JLPT Level Guide</h3>
              {[
                {level:'N5',desc:'Basic Japanese. Can understand simple phrases and expressions.',required:'For language school entrance'},
                {level:'N4',desc:'Elementary Japanese. Can understand basic conversations.',required:'Required for SSW visa'},
                {level:'N3',desc:'Intermediate Japanese. Can understand everyday situations.',required:'Recommended for work visa'},
                {level:'N2',desc:'Upper intermediate. Can understand complex topics.',required:'Required for most jobs'},
                {level:'N1',desc:'Advanced Japanese. Near-native level.',required:'Required for professional work'},
              ].map(item=>(
                <div key={item.level} style={{display:'flex',gap:'12px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'3px 8px',borderRadius:'4px',fontSize:'12px',fontWeight:'700',flexShrink:0,height:'fit-content'}}>{item.level}</span>
                  <div>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'600',marginBottom:'2px'}}>{item.desc}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{item.required}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : done ? (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'40px',textAlign:'center',border:'2px solid ' + (passed?'rgba(46,200,122,0.3)':'rgba(196,32,32,0.3)')}}>
              <div style={{fontSize:'64px',marginBottom:'16px'}}>{passed?'🎉':'📚'}</div>
              <h2 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'8px'}}>{passed?'Passed!':'Keep Studying!'}</h2>
              <div style={{color:passed?'#2EC87A':'#C42020',fontSize:'52px',fontWeight:'800',marginBottom:'8px'}}>{score}/{questions.length}</div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'8px'}}>{percentage}% correct</div>
              <div style={{color:passed?'#2EC87A':'#F0A830',fontSize:'14px',fontWeight:'600',marginBottom:'24px'}}>
                {passed?`Great job! You passed ${level}!`:`You need 60% to pass. Try again!`}
              </div>
              <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
                <button onClick={startTest} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>Try Again</button>
                <button onClick={()=>setShowResults(!showResults)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',cursor:'pointer'}}>{showResults?'Hide':'Show'} Results</button>
                <button onClick={()=>setStarted(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',cursor:'pointer'}}>Change Level</button>
              </div>
            </div>

            {showResults && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>Answer Review</h3>
                {results.map((r,i)=>(
                  <div key={i} style={{background:r.ok?'rgba(46,200,122,0.05)':'rgba(196,32,32,0.05)',borderRadius:'8px',padding:'12px',marginBottom:'8px',border:'1px solid ' + (r.ok?'rgba(46,200,122,0.2)':'rgba(196,32,32,0.2)')}}>
                    <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',marginBottom:'6px'}}>{i+1}. {r.q}</p>
                    <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                      <span style={{color:'#2EC87A',fontSize:'12px'}}>✓ {r.correct}</span>
                      {!r.ok && <span style={{color:'#C42020',fontSize:'12px'}}>✗ Your answer: {r.chosen}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Want to practice more Japanese?</p>
              <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
                <a href="/learn-japanese" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Flashcards</a>
                <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Practice with Sakura</a>
              </div>
            </div>
          </div>
        ) : (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>{level}</span>
              <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>Question {current+1} of {questions.length}</span>
              <span style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700'}}>Score: {score}</span>
            </div>

            <div style={{height:'6px',background:'rgba(255,255,255,0.1)',borderRadius:'3px',marginBottom:'28px',overflow:'hidden'}}>
              <div style={{height:'100%',width:((current)/questions.length*100)+'%',background:'#C42020',borderRadius:'3px',transition:'width 0.3s'}}/>
            </div>

            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'28px',textAlign:'center',lineHeight:'1.4'}}>{questions[current].q}</h2>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
              {questions[current].options.map((option,i)=>{
                const isCorrect = option === questions[current].answer
                const isSelected = answered === option
                const isAnswered = answered !== null
                return (
                  <button key={i} onClick={()=>answer(option)} style={{background:isAnswered?(isCorrect?'rgba(46,200,122,0.3)':isSelected?'rgba(196,32,32,0.3)':'#0D0907'):'#0D0907',border:'2px solid ' + (isAnswered?(isCorrect?'#2EC87A':isSelected?'#C42020':'rgba(255,255,255,0.1)'):'rgba(255,255,255,0.2)'),borderRadius:'10px',padding:'16px',color:'white',fontSize:'14px',cursor:isAnswered?'default':'pointer',fontWeight:'500',transition:'all 0.2s',textAlign:'left'}}>
                    <span style={{color:'rgba(255,255,255,0.4)',marginRight:'8px'}}>{String.fromCharCode(65+i)}.</span>
                    {option}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}