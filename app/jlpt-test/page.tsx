'use client'
import { useState } from 'react'

const QUESTIONS: any = {
  N5: [
    {q:'これは＿＿＿です。(わたし)',options:['私','僕','彼','君'],answer:'私',explanation:'私 (watashi) means "I/me" - the most common and polite way to refer to yourself.'},
    {q:'今日は＿＿＿曜日です。(月)',options:['月','火','水','木'],answer:'月',explanation:'月曜日 (Getsuyoubi) means Monday.'},
    {q:'＿＿＿を食べますか。',options:['何','誰','どこ','いつ'],answer:'何',explanation:'何 (nani) means "what" - used to ask what someone is eating.'},
    {q:'すみません、トイレは＿＿＿ですか。',options:['どこ','何','誰','いつ'],answer:'どこ','explanation':'どこ (doko) means "where" - asking for location.'},
    {q:'毎朝７時に＿＿＿ます。(起きる)',options:['起き','起きり','起くり','起き'],answer:'起き',explanation:'起きます (okimasu) means "to wake up" - present tense form.'},
    {q:'これは＿＿＿のペンですか。',options:['だれ','どこ','いつ','なに'],answer:'だれ',explanation:'だれ (dare) means "who" - asking whose pen it is.'},
    {q:'昨日、映画を＿＿＿。',options:['見ました','見ます','見る','見て'],answer:'見ました',explanation:'見ました (mimashita) is the past tense of 見る (to see/watch).'},
    {q:'駅まで＿＿＿で行きます。(バス)',options:['バス','タクシー','電車','車'],answer:'バス',explanation:'バス (basu) means "bus" - one of several transportation options.'},
  ],
  N4: [
    {q:'雨が降って＿＿＿、傘を持って行きます。',options:['いるので','いるから','いると','いれば'],answer:'いるので',explanation:'ので indicates reason/cause - "because it is raining".'},
    {q:'この本を＿＿＿いただけますか。',options:['貸して','貸す','貸した','貸そう'],answer:'貸して',explanation:'貸していただけますか is a polite request to borrow something.'},
    {q:'彼は日本語が＿＿＿話せます。',options:['上手に','上手','上手な','上手で'],answer:'上手に',explanation:'上手に (jouzu ni) is the adverb form meaning "skillfully".'},
    {q:'宿題を＿＿＿、寝てもいいです。',options:['終わったら','終わって','終わると','終わるなら'],answer:'終わったら',explanation:'たら form indicates "after finishing" or conditional.'},
    {q:'子供の時、よく公園で＿＿＿。',options:['遊んでいました','遊びます','遊んだ','遊ぶ'],answer:'遊んでいました',explanation:'ていました indicates a habitual past action.'},
    {q:'先生に質問を＿＿＿と思います。',options:['しよう','する','した','して'],answer:'しよう',explanation:'しようと思います means "I am thinking of doing/asking".'},
    {q:'このレストランは＿＿＿そうです。',options:['おいしい','おいしいな','おいしく','おいしいで'],answer:'おいしい',explanation:'そうです after an adjective indicates "it looks/seems".'},
    {q:'もし時間が＿＿＿、手伝ってください。',options:['あったら','あると','あって','ある'],answer:'あったら',explanation:'あったら is conditional form meaning "if you have time".'},
  ],
  N3: [
    {q:'彼の説明を聞いて＿＿＿理解できた。',options:['ようやく','まさか','せっかく','わざわざ'],answer:'ようやく',explanation:'ようやく (youyaku) means "finally/at last" after some difficulty.'},
    {q:'この問題は複雑＿＿＿、時間がかかりそうです。',options:['なので','だから','すぎて','すぎる'],answer:'すぎて',explanation:'すぎて indicates "too much/excessive" - the problem is too complex.'},
    {q:'忙しい＿＿＿、彼は毎日運動しています。',options:['にもかかわらず','について','によって','として'],answer:'にもかかわらず',explanation:'にもかかわらず means "despite/even though" - despite being busy.'},
    {q:'この資料は会議の＿＿＿に配布されます。',options:['際','時に','とき','うちに'],answer:'際',explanation:'際 (sai) is a formal way to say "at the time of/on the occasion of".'},
    {q:'環境問題に＿＿＿、私たちにできることは何でしょうか。',options:['関して','について','として','とって'],answer:'関して',explanation:'に関して means "regarding/concerning" environmental issues.'},
    {q:'彼女は仕事が忙しい＿＿＿、家族との時間も大切にしている。',options:['一方で','反面','ところが','にしては'],answer:'一方で',explanation:'一方で means "on the other hand" - balancing work and family.'},
    {q:'この計画は予算＿＿＿実現が難しい。',options:['の関係で','によって','に従って','をもとに'],answer:'の関係で',explanation:'の関係で means "due to/because of" - budget constraints.'},
    {q:'彼は経験が浅い＿＿＿、よく頑張っている。',options:['わりに','くせに','というより','にしては'],answer:'わりに',explanation:'わりに means "considering/relatively" - doing well considering little experience.'},
  ],
}

export default function JLPTTestPage() {
  const [level, setLevel] = useState<'N5'|'N4'|'N3'|null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [userAnswers, setUserAnswers] = useState<any[]>([])

  function startTest(selectedLevel: 'N5'|'N4'|'N3') {
    setLevel(selectedLevel)
    setCurrentQ(0)
    setScore(0)
    setShowResults(false)
    setReviewMode(false)
    setUserAnswers([])
    setAnswered(false)
    setSelectedAnswer('')
  }

  function answerQuestion(option: string) {
    if (answered) return
    setSelectedAnswer(option)
    setAnswered(true)
    const question = QUESTIONS[level!][currentQ]
    const isCorrect = option === question.answer
    if (isCorrect) setScore(prev => prev + 1)
    setUserAnswers(prev => [...prev, {question: question.q, userAnswer: option, correctAnswer: question.answer, isCorrect, explanation: question.explanation}])
  }

  function nextQuestion() {
    if (currentQ < QUESTIONS[level!].length - 1) {
      setCurrentQ(prev => prev + 1)
      setAnswered(false)
      setSelectedAnswer('')
    } else {
      setShowResults(true)
    }
  }

  function restart() {
    setLevel(null)
    setShowResults(false)
    setReviewMode(false)
  }

  if (!level) {
    return (
      <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
        <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
          <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>JLPT Practice Test</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Test your Japanese ability with free practice questions</p>
        </div>

        <div style={{maxWidth:'700px',margin:'0 auto',padding:'48px 20px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'16px'}}>
            {[
              {level:'N5' as const,color:'#2EC87A',desc:'Beginner level - Basic greetings, numbers, simple sentences',questions:8},
              {level:'N4' as const,color:'#F0A830',desc:'Elementary level - Required for SSW visa, basic grammar',questions:8},
              {level:'N3' as const,color:'#C42020',desc:'Intermediate level - Complex grammar, business Japanese',questions:8},
            ].map(item => (
              <button key={item.level} onClick={()=>startTest(item.level)} style={{background:'#1A2035',border:'2px solid ' + item.color + '40',borderRadius:'16px',padding:'28px 20px',cursor:'pointer',textAlign:'center'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor=item.color)}
                onMouseLeave={e=>(e.currentTarget.style.borderColor=item.color+'40')}>
                <div style={{color:item.color,fontSize:'32px',fontWeight:'800',marginBottom:'10px'}}>{item.level}</div>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',lineHeight:'1.6',marginBottom:'10px'}}>{item.desc}</p>
                <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{item.questions} questions</span>
              </button>
            ))}
          </div>

          <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'32px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Want to study vocabulary first?</p>
            <a href="/learn-japanese" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Learn Japanese Vocabulary</a>
          </div>
        </div>
      </main>
    )
  }

  if (showResults) {
    const percentage = Math.round((score / QUESTIONS[level].length) * 100)
    const passed = percentage >= 60

    if (reviewMode) {
      return (
        <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
          <div style={{background:'#1A2035',padding:'32px 20px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
            <h1 style={{color:'white',fontSize:'24px',fontWeight:'700'}}>Review Your Answers - {level}</h1>
          </div>
          <div style={{maxWidth:'700px',margin:'0 auto',padding:'32px 20px'}}>
            {userAnswers.map((ans,i) => (
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',marginBottom:'12px',border:'1px solid ' + (ans.isCorrect ? 'rgba(46,200,122,0.3)' : 'rgba(196,32,32,0.3)')}}>
                <p style={{color:'white',fontSize:'14px',marginBottom:'8px'}}>{i+1}. {ans.question}</p>
                <p style={{color: ans.isCorrect ? '#2EC87A' : '#C42020',fontSize:'13px',marginBottom:'4px'}}>
                  Your answer: {ans.userAnswer} {ans.isCorrect ? '✓' : '✗'}
                </p>
                {!ans.isCorrect && <p style={{color:'#2EC87A',fontSize:'13px',marginBottom:'8px'}}>Correct answer: {ans.correctAnswer}</p>}
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',lineHeight:'1.6'}}>{ans.explanation}</p>
              </div>
            ))}
            <button onClick={restart} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',width:'100%',marginTop:'16px'}}>
              Try Another Level
            </button>
          </div>
        </main>
      )
    }

    return (
      <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
        <div style={{background:'#1A2035',borderRadius:'20px',padding:'40px',maxWidth:'440px',textAlign:'center',border:'2px solid ' + (passed ? 'rgba(46,200,122,0.4)' : 'rgba(240,168,48,0.4)')}}>
          <div style={{fontSize:'56px',marginBottom:'16px'}}>{passed ? '🎉' : '📚'}</div>
          <h2 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'8px'}}>
            {passed ? 'Great Job!' : 'Keep Practicing!'}
          </h2>
          <div style={{fontSize:'48px',fontWeight:'800',color: passed ? '#2EC87A' : '#F0A830',marginBottom:'8px'}}>
            {percentage}%
          </div>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px'}}>
            You scored {score} out of {QUESTIONS[level].length} on {level}
          </p>
          <div style={{display:'flex',gap:'10px',flexDirection:'column'}}>
            <button onClick={()=>setReviewMode(true)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'12px',fontSize:'14px',cursor:'pointer'}}>
              Review Answers
            </button>
            <button onClick={()=>startTest(level)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
              Try Again
            </button>
            <button onClick={restart} style={{background:'none',color:'rgba(255,255,255,0.4)',border:'none',fontSize:'13px',cursor:'pointer'}}>
              Try Different Level
            </button>
          </div>
        </div>
      </main>
    )
  }

  const question = QUESTIONS[level][currentQ]

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'24px 20px',borderBottom:'3px solid #C42020'}}>
        <div style={{maxWidth:'700px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{color:'#C42020',fontSize:'18px',fontWeight:'800'}}>{level}</span>
          <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>Question {currentQ+1} of {QUESTIONS[level].length}</span>
        </div>
        <div style={{maxWidth:'700px',margin:'8px auto 0',height:'4px',background:'rgba(255,255,255,0.1)',borderRadius:'2px',overflow:'hidden'}}>
          <div style={{width:((currentQ+1)/QUESTIONS[level].length*100)+'%',height:'100%',background:'#C42020',transition:'width 0.3s'}}/>
        </div>
      </div>

      <div style={{maxWidth:'700px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'white',fontSize:'18px',lineHeight:'1.7'}}>{question.q}</p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {question.options.map((opt: string, i: number) => {
            const isCorrect = opt === question.answer
            const isSelected = opt === selectedAnswer
            let bg = '#1A2035'
            let border = 'rgba(255,255,255,0.1)'
            if (answered) {
              if (isCorrect) { bg = 'rgba(46,200,122,0.15)'; border = '#2EC87A' }
              else if (isSelected) { bg = 'rgba(196,32,32,0.15)'; border = '#C42020' }
            }
            return (
              <button key={i} onClick={()=>answerQuestion(opt)} disabled={answered} style={{background:bg,border:'2px solid '+border,borderRadius:'10px',padding:'16px',color:'white',fontSize:'15px',cursor: answered ? 'default' : 'pointer',textAlign:'left'}}>
                {opt} {answered && isCorrect && ' ✓'} {answered && isSelected && !isCorrect && ' ✗'}
              </button>
            )
          })}
        </div>

        {answered && (
          <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'10px',padding:'14px',marginTop:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <p style={{color:'#F0A830',fontSize:'12px',fontWeight:'700',marginBottom:'4px'}}>💡 Explanation</p>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{question.explanation}</p>
          </div>
        )}

        {answered && (
          <button onClick={nextQuestion} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',width:'100%',marginTop:'16px'}}>
            {currentQ < QUESTIONS[level].length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    </main>
  )
}