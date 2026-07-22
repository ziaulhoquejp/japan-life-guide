'use client'
import { useState, useEffect } from 'react'

const OFFLINE_QUESTIONS = {
  n5: [
    {q:'What does 「ありがとう」mean?', options:['Thank you','Goodbye','Hello','Sorry'], answer:0, jp:'ありがとう', explanation:'ありがとう means "Thank you" in Japanese.'},
    {q:'How do you say "water" in Japanese?', options:['みず (mizu)','ひ (hi)','き (ki)','つち (tsuchi)'], answer:0, jp:'水 (みず)', explanation:'Water is みず (mizu) in Japanese.'},
    {q:'What does 「いくらですか」mean?', options:['How much is it?','Where is it?','What is it?','When is it?'], answer:0, jp:'いくらですか', explanation:'いくらですか means "How much is it?"'},
    {q:'How do you say "I eat" in Japanese?', options:['たべます','のみます','みます','いきます'], answer:0, jp:'食べます', explanation:'食べます (たべます) means "I eat"'},
    {q:'What is 「でんしゃ」?', options:['Train','Bus','Car','Airplane'], answer:0, jp:'電車 (でんしゃ)', explanation:'電車 (でんしゃ) means "train"'},
    {q:'What does 「おはようございます」mean?', options:['Good morning','Good evening','Good night','Goodbye'], answer:0, jp:'おはようございます', explanation:'おはようございます means "Good morning"'},
    {q:'How do you say "school" in Japanese?', options:['がっこう','びょういん','ぎんこう','えき'], answer:0, jp:'学校 (がっこう)', explanation:'学校 (がっこう) means "school"'},
    {q:'What does 「なんじですか」mean?', options:['What time is it?','How old are you?','Where are you?','What is your name?'], answer:0, jp:'何時ですか', explanation:'何時ですか (なんじですか) means "What time is it?"'},
    {q:'What is 「えき」?', options:['Station','Hospital','Bank','School'], answer:1, jp:'駅 (えき)', explanation:'駅 (えき) means "station"'},
    {q:'How do you say "I understand" in Japanese?', options:['わかります','しりません','できます','います'], answer:0, jp:'分かります', explanation:'分かります (わかります) means "I understand"'},
  ],
  n4: [
    {q:'What does 「けいけん」mean?', options:['Experience','Knowledge','Practice','Skill'], answer:0, jp:'経験 (けいけん)', explanation:'経験 means "experience"'},
    {q:'How do you say "to explain" in Japanese?', options:['せつめいする','しょうかいする','れんらくする','かくにんする'], answer:0, jp:'説明する', explanation:'説明する (せつめいする) means "to explain"'},
    {q:'What is 「しんぱい」?', options:['Worry/Concern','Happy','Angry','Surprised'], answer:0, jp:'心配 (しんぱい)', explanation:'心配 means "worry" or "concern"'},
    {q:'What does 「むずかしい」mean?', options:['Difficult','Easy','Interesting','Boring'], answer:0, jp:'難しい (むずかしい)', explanation:'難しい means "difficult"'},
    {q:'How do you say "to work" in Japanese?', options:['はたらく','あそぶ','やすむ','まつ'], answer:0, jp:'働く (はたらく)', explanation:'働く (はたらく) means "to work"'},
    {q:'What is 「りょこう」?', options:['Travel','Study','Work','Exercise'], answer:0, jp:'旅行 (りょこう)', explanation:'旅行 means "travel"'},
    {q:'What does 「たのしい」mean?', options:['Fun/Enjoyable','Difficult','Boring','Scary'], answer:0, jp:'楽しい (たのしい)', explanation:'楽しい means "fun" or "enjoyable"'},
    {q:'How do you say "neighborhood" in Japanese?', options:['きんじょ','まち','むら','くに'], answer:0, jp:'近所 (きんじょ)', explanation:'近所 means "neighborhood"'},
    {q:'What does 「せわになる」mean?', options:['To be taken care of','To work','To study','To play'], answer:0, jp:'お世話になる', explanation:'お世話になる means "to be in someone\'s care"'},
    {q:'What is 「やくそく」?', options:['Promise/Appointment','Schedule','Meeting','Contract'], answer:0, jp:'約束 (やくそく)', explanation:'約束 means "promise" or "appointment"'},
  ],
  n3: [
    {q:'What does 「こうりゅう」mean?', options:['Exchange/Interaction','Communication','Meeting','Relationship'], answer:0, jp:'交流 (こうりゅう)', explanation:'交流 means "exchange" or "interaction"'},
    {q:'What is 「しょるい」?', options:['Documents','Books','Letters','Reports'], answer:0, jp:'書類 (しょるい)', explanation:'書類 means "documents"'},
    {q:'How do you say "to achieve" in Japanese?', options:['たっせいする','かんりする','うけいれる','すすめる'], answer:0, jp:'達成する (たっせいする)', explanation:'達成する means "to achieve"'},
    {q:'What does 「きょうちょう」mean?', options:['Cooperation/Emphasis','Competition','Conflict','Independence'], answer:0, jp:'強調 (きょうちょう)', explanation:'強調 means "emphasis"'},
    {q:'What is 「ちょうさ」?', options:['Investigation/Survey','Research','Study','Report'], answer:0, jp:'調査 (ちょうさ)', explanation:'調査 means "investigation" or "survey"'},
    {q:'What does 「けってい」mean?', options:['Decision','Plan','Schedule','Policy'], answer:0, jp:'決定 (けってい)', explanation:'決定 means "decision"'},
    {q:'How do you say "to consider" in Japanese?', options:['かんがえる','おもう','しる','わかる'], answer:0, jp:'考える (かんがえる)', explanation:'考える means "to think" or "to consider"'},
    {q:'What is 「じっし」?', options:['Implementation','Plan','Research','Report'], answer:0, jp:'実施 (じっし)', explanation:'実施 means "implementation" or "execution"'},
    {q:'What does 「たいど」mean?', options:['Attitude','Action','Behavior','Response'], answer:0, jp:'態度 (たいど)', explanation:'態度 means "attitude"'},
    {q:'What is 「もくひょう」?', options:['Goal/Target','Plan','Schedule','Result'], answer:0, jp:'目標 (もくひょう)', explanation:'目標 means "goal" or "target"'},
  ],
}

export default function OfflinePracticePage() {
  const [selectedLevel, setSelectedLevel] = useState<'n5'|'n4'|'n3'|null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number|null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [wrongAnswers, setWrongAnswers] = useState<any[]>([])
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    setIsOffline(!navigator.onLine)
    window.addEventListener('online', () => setIsOffline(false))
    window.addEventListener('offline', () => setIsOffline(true))
  }, [])

  function startLevel(level: 'n5'|'n4'|'n3') {
    setSelectedLevel(level)
    setCurrentQ(0)
    setSelectedAnswer(null)
    setAnswered(false)
    setScore(0)
    setFinished(false)
    setWrongAnswers([])
  }

  function answerQuestion(optionIndex: number) {
    if (answered || !selectedLevel) return
    setSelectedAnswer(optionIndex)
    setAnswered(true)
    const questions = OFFLINE_QUESTIONS[selectedLevel]
    const isCorrect = optionIndex === questions[currentQ].answer
    if (isCorrect) {
      setScore(prev => prev + 1)
    } else {
      setWrongAnswers(prev => [...prev, questions[currentQ]])
    }
  }

  function nextQuestion() {
    if (!selectedLevel) return
    const questions = OFFLINE_QUESTIONS[selectedLevel]
    if (currentQ >= questions.length - 1) {
      setFinished(true)
    } else {
      setCurrentQ(prev => prev + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    }
  }

  function reset() {
    setSelectedLevel(null)
    setFinished(false)
    setScore(0)
    setWrongAnswers([])
  }

  const questions = selectedLevel ? OFFLINE_QUESTIONS[selectedLevel] : []
  const currentQuestion = questions[currentQ]

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>📝 Offline JLPT Practice</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>Practice Japanese even without internet connection!</p>
        <div style={{display:'inline-flex',gap:'12px',flexWrap:'wrap',justifyContent:'center'}}>
          <span style={{background: isOffline ? 'rgba(240,168,48,0.2)' : 'rgba(46,200,122,0.2)',color: isOffline ? '#F0A830' : '#2EC87A',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>
            {isOffline ? '📡 Offline Mode' : '✅ Online'}
          </span>
          <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>
            🆓 No internet needed
          </span>
        </div>
      </div>

      <div style={{maxWidth:'700px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Level Selection */}
        {!selectedLevel && (
          <div>
            <div style={{background:'rgba(74,142,255,0.1)',borderRadius:'12px',padding:'16px',marginBottom:'24px',border:'1px solid rgba(74,142,255,0.2)'}}>
              <p style={{color:'#4A8EFF',fontSize:'13px',lineHeight:'1.7'}}>
                📱 This practice works <strong>completely offline</strong>! No internet needed. 
                All questions are stored on your device. Perfect for practicing on the train or anywhere!
              </p>
            </div>

            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'20px'}}>Select JLPT Level</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'14px',marginBottom:'32px'}}>
              {[
                {level:'n5' as const, icon:'🔰', title:'JLPT N5', desc:'Beginner - 10 questions', color:'#2EC87A'},
                {level:'n4' as const, icon:'⭐', title:'JLPT N4', desc:'Elementary - 10 questions', color:'#4A8EFF'},
                {level:'n3' as const, icon:'⭐⭐', title:'JLPT N3', desc:'Intermediate - 10 questions', color:'#F0A830'},
              ].map(item => (
                <button
                  key={item.level}
                  type="button"
                  onClick={()=>startLevel(item.level)}
                  style={{background:'#1A2035',borderRadius:'14px',padding:'24px',border:`2px solid ${item.color}30`,cursor:'pointer',textAlign:'center'}}
                >
                  <div style={{fontSize:'36px',marginBottom:'10px'}}>{item.icon}</div>
                  <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'4px'}}>{item.title}</h3>
                  <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginBottom:'12px'}}>{item.desc}</p>
                  <span style={{background:item.color+'20',color:item.color,padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>
                    Start Practice →
                  </span>
                </button>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Want more AI-generated questions?</p>
              <a href="/jlpt-test" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',display:'inline-block'}}>
                Online JLPT Practice (AI) 🤖
              </a>
            </div>
          </div>
        )}

        {/* Practice Questions */}
        {selectedLevel && !finished && currentQuestion && (
          <div>
            {/* Progress */}
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'16px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                <span style={{color:'white',fontSize:'14px',fontWeight:'700'}}>Question {currentQ+1}/{questions.length}</span>
                <span style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700'}}>Score: {score}/{currentQ + (answered ? 1 : 0)}</span>
              </div>
              <div style={{height:'6px',background:'rgba(255,255,255,0.1)',borderRadius:'3px',overflow:'hidden'}}>
                <div style={{width:((currentQ+1)/questions.length*100)+'%',height:'100%',background:'#C42020',borderRadius:'3px'}}/>
              </div>
            </div>

            {/* Question */}
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
              {currentQuestion.jp && (
                <p style={{color:'#F0A830',fontSize:'22px',fontWeight:'700',marginBottom:'8px',textAlign:'center'}}>{currentQuestion.jp}</p>
              )}
              <p style={{color:'white',fontSize:'16px',lineHeight:'1.7',marginBottom:'24px',textAlign:'center'}}>{currentQuestion.q}</p>

              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {currentQuestion.options.map((option, i) => {
                  const isCorrect = i === currentQuestion.answer
                  const isSelected = i === selectedAnswer
                  let bg = '#0D0907'
                  let border = 'rgba(255,255,255,0.1)'
                  if (answered) {
                    if (isCorrect) { bg = 'rgba(46,200,122,0.15)'; border = '#2EC87A' }
                    else if (isSelected) { bg = 'rgba(196,32,32,0.15)'; border = '#C42020' }
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={()=>answerQuestion(i)}
                      disabled={answered}
                      style={{background:bg,border:`2px solid ${border}`,borderRadius:'10px',padding:'14px 16px',color:'white',fontSize:'14px',cursor:answered?'default':'pointer',textAlign:'left',WebkitAppearance:'none'}}
                    >
                      <span style={{color:'rgba(255,255,255,0.4)',marginRight:'8px'}}>{String.fromCharCode(65+i)}.</span>
                      {option}
                      {answered && isCorrect && <span style={{color:'#2EC87A',marginLeft:'8px'}}>✓</span>}
                      {answered && isSelected && !isCorrect && <span style={{color:'#FF8070',marginLeft:'8px'}}>✗</span>}
                    </button>
                  )
                })}
              </div>

              {answered && (
                <div style={{background:'rgba(74,142,255,0.1)',borderRadius:'10px',padding:'14px',marginTop:'16px',border:'1px solid rgba(74,142,255,0.2)'}}>
                  <p style={{color:'#4A8EFF',fontSize:'12px',fontWeight:'700',marginBottom:'4px'}}>💡 Explanation</p>
                  <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{currentQuestion.explanation}</p>
                </div>
              )}
            </div>

            {answered && (
              <button
                type="button"
                onClick={nextQuestion}
                style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'16px',fontSize:'15px',fontWeight:'700',cursor:'pointer',width:'100%',WebkitAppearance:'none'}}
              >
                {currentQ < questions.length-1 ? 'Next Question →' : 'See Results 📊'}
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {finished && selectedLevel && (
          <div>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'40px',textAlign:'center',marginBottom:'20px',border:`2px solid ${score >= 7 ? 'rgba(46,200,122,0.4)' : 'rgba(240,168,48,0.4)'}`}}>
              <div style={{fontSize:'56px',marginBottom:'16px'}}>{score >= 7 ? '🎉' : '📚'}</div>
              <h2 style={{color: score >= 7 ? '#2EC87A' : '#F0A830',fontSize:'24px',fontWeight:'800',marginBottom:'8px'}}>
                {score >= 7 ? 'Excellent! よくできました！' : 'Keep practicing! もっと頑張ろう！'}
              </h2>
              <div style={{fontSize:'48px',fontWeight:'800',color: score >= 7 ? '#2EC87A' : '#F0A830',marginBottom:'8px'}}>
                {score}/{questions.length}
              </div>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px'}}>
                {Math.round(score/questions.length*100)}% correct · JLPT {selectedLevel.toUpperCase()}
              </p>
            </div>

            {wrongAnswers.length > 0 && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>📋 Review Wrong Answers</h3>
                {wrongAnswers.map((q, i) => (
                  <div key={i} style={{padding:'12px',background:'#0D0907',borderRadius:'8px',marginBottom:'8px',border:'1px solid rgba(196,32,32,0.2)'}}>
                    <p style={{color:'#F0A830',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{q.jp}</p>
                    <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginBottom:'4px'}}>{q.q}</p>
                    <p style={{color:'#2EC87A',fontSize:'12px'}}>✓ {q.options[q.answer]}</p>
                  </div>
                ))}
              </div>
            )}

            <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
              <button
                type="button"
                onClick={()=>startLevel(selectedLevel)}
                style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:1,WebkitAppearance:'none'}}
              >
                🔄 Try Again
              </button>
              <button
                type="button"
                onClick={reset}
                style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px 24px',fontSize:'14px',cursor:'pointer',flex:1,WebkitAppearance:'none'}}
              >
                Change Level
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}