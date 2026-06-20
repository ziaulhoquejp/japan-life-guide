'use client'
import { useState } from 'react'

const CATEGORIES = [
  {
    id:'greetings', icon:'👋', name:'Greetings', color:'#2EC87A',
    words:[
      {jp:'おはようございます',romaji:'Ohayou gozaimasu',en:'Good morning (formal)'},
      {jp:'こんにちは',romaji:'Konnichiwa',en:'Hello / Good afternoon'},
      {jp:'こんばんは',romaji:'Konbanwa',en:'Good evening'},
      {jp:'さようなら',romaji:'Sayounara',en:'Goodbye'},
      {jp:'ありがとうございます',romaji:'Arigatou gozaimasu',en:'Thank you (formal)'},
      {jp:'すみません',romaji:'Sumimasen',en:'Excuse me / Sorry'},
      {jp:'はじめまして',romaji:'Hajimemashite',en:'Nice to meet you'},
      {jp:'よろしくお願いします',romaji:'Yoroshiku onegaishimasu',en:'Please treat me well'},
    ]
  },
  {
    id:'numbers', icon:'🔢', name:'Numbers', color:'#4A8EFF',
    words:[
      {jp:'一 (いち)',romaji:'Ichi',en:'One (1)'},
      {jp:'二 (に)',romaji:'Ni',en:'Two (2)'},
      {jp:'三 (さん)',romaji:'San',en:'Three (3)'},
      {jp:'四 (よん/し)',romaji:'Yon/Shi',en:'Four (4)'},
      {jp:'五 (ご)',romaji:'Go',en:'Five (5)'},
      {jp:'十 (じゅう)',romaji:'Juu',en:'Ten (10)'},
      {jp:'百 (ひゃく)',romaji:'Hyaku',en:'Hundred (100)'},
      {jp:'千 (せん)',romaji:'Sen',en:'Thousand (1000)'},
    ]
  },
  {
    id:'school', icon:'🏫', name:'School Life', color:'#F0A830',
    words:[
      {jp:'学校',romaji:'Gakkou',en:'School'},
      {jp:'先生',romaji:'Sensei',en:'Teacher'},
      {jp:'学生',romaji:'Gakusei',en:'Student'},
      {jp:'授業',romaji:'Jugyou',en:'Class / Lesson'},
      {jp:'宿題',romaji:'Shukudai',en:'Homework'},
      {jp:'試験',romaji:'Shiken',en:'Exam / Test'},
      {jp:'教室',romaji:'Kyoushitsu',en:'Classroom'},
      {jp:'勉強する',romaji:'Benkyou suru',en:'To study'},
    ]
  },
  {
    id:'daily', icon:'🏠', name:'Daily Life', color:'#A855F7',
    words:[
      {jp:'家',romaji:'Ie',en:'House / Home'},
      {jp:'仕事',romaji:'Shigoto',en:'Work / Job'},
      {jp:'駅',romaji:'Eki',en:'Station'},
      {jp:'電車',romaji:'Densha',en:'Train'},
      {jp:'コンビニ',romaji:'Konbini',en:'Convenience store'},
      {jp:'スーパー',romaji:'Suupaa',en:'Supermarket'},
      {jp:'病院',romaji:'Byouin',en:'Hospital'},
      {jp:'銀行',romaji:'Ginkou',en:'Bank'},
    ]
  },
  {
    id:'food', icon:'🍱', name:'Food', color:'#FF8070',
    words:[
      {jp:'ご飯',romaji:'Gohan',en:'Rice / Meal'},
      {jp:'水',romaji:'Mizu',en:'Water'},
      {jp:'美味しい',romaji:'Oishii',en:'Delicious'},
      {jp:'いただきます',romaji:'Itadakimasu',en:'Said before eating'},
      {jp:'ごちそうさまでした',romaji:'Gochisousama deshita',en:'Said after eating'},
      {jp:'肉',romaji:'Niku',en:'Meat'},
      {jp:'野菜',romaji:'Yasai',en:'Vegetables'},
      {jp:'魚',romaji:'Sakana',en:'Fish'},
    ]
  },
  {
    id:'work', icon:'💼', name:'Work & Job Hunting', color:'#2EC87A',
    words:[
      {jp:'アルバイト',romaji:'Arubaito',en:'Part-time job'},
      {jp:'給料',romaji:'Kyuuryou',en:'Salary'},
      {jp:'面接',romaji:'Mensetsu',en:'Interview'},
      {jp:'履歴書',romaji:'Rirekisho',en:'Resume / CV'},
      {jp:'会社',romaji:'Kaisha',en:'Company'},
      {jp:'働く',romaji:'Hataraku',en:'To work'},
      {jp:'休み',romaji:'Yasumi',en:'Day off / Rest'},
      {jp:'残業',romaji:'Zangyou',en:'Overtime work'},
    ]
  },
  {
    id:'emergency', icon:'🆘', name:'Emergency', color:'#C42020',
    words:[
      {jp:'助けてください',romaji:'Tasukete kudasai',en:'Please help me'},
      {jp:'救急車',romaji:'Kyuukyuusha',en:'Ambulance'},
      {jp:'警察',romaji:'Keisatsu',en:'Police'},
      {jp:'病気',romaji:'Byouki',en:'Sick / Illness'},
      {jp:'痛い',romaji:'Itai',en:'It hurts / Painful'},
      {jp:'火事',romaji:'Kaji',en:'Fire'},
      {jp:'地震',romaji:'Jishin',en:'Earthquake'},
      {jp:'危ない',romaji:'Abunai',en:'Dangerous'},
    ]
  },
  {
    id:'numbers_time', icon:'⏰', name:'Time & Dates', color:'#4A8EFF',
    words:[
      {jp:'今日',romaji:'Kyou',en:'Today'},
      {jp:'明日',romaji:'Ashita',en:'Tomorrow'},
      {jp:'昨日',romaji:'Kinou',en:'Yesterday'},
      {jp:'今',romaji:'Ima',en:'Now'},
      {jp:'時間',romaji:'Jikan',en:'Time'},
      {jp:'月曜日',romaji:'Getsuyoubi',en:'Monday'},
      {jp:'週末',romaji:'Shuumatsu',en:'Weekend'},
      {jp:'何時ですか',romaji:'Nanji desu ka',en:'What time is it?'},
    ]
  },
]

export default function LearnJapanesePage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0])
  const [mode, setMode] = useState<'list'|'flashcard'|'quiz'>('list')
  const [cardIndex, setCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizOptions, setQuizOptions] = useState<string[]>([])
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')

  function startQuiz() {
    setMode('quiz')
    setQuizIndex(0)
    setQuizScore(0)
    generateQuizOptions(0)
  }

  function generateQuizOptions(index: number) {
    const correct = activeCategory.words[index].en
    const otherWords = activeCategory.words.filter((_,i) => i !== index).map(w => w.en)
    const wrongOptions = otherWords.sort(() => Math.random() - 0.5).slice(0, 3)
    const allOptions = [...wrongOptions, correct].sort(() => Math.random() - 0.5)
    setQuizOptions(allOptions)
    setQuizAnswered(false)
    setSelectedAnswer('')
  }

  function answerQuiz(answer: string) {
    if (quizAnswered) return
    setSelectedAnswer(answer)
    setQuizAnswered(true)
    if (answer === activeCategory.words[quizIndex].en) {
      setQuizScore(prev => prev + 1)
    }
  }

  function nextQuizQuestion() {
    if (quizIndex < activeCategory.words.length - 1) {
      const next = quizIndex + 1
      setQuizIndex(next)
      generateQuizOptions(next)
    } else {
      setMode('list')
    }
  }

  function switchCategory(cat: any) {
    setActiveCategory(cat)
    setMode('list')
    setCardIndex(0)
    setShowAnswer(false)
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Learn Japanese</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Essential vocabulary for daily life in Japan</p>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Category Selector */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))',gap:'8px',marginBottom:'24px'}}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={()=>switchCategory(cat)} style={{background: activeCategory.id===cat.id ? cat.color+'20' : '#1A2035',border:'2px solid ' + (activeCategory.id===cat.id ? cat.color : 'rgba(255,255,255,0.08)'),borderRadius:'10px',padding:'12px 8px',cursor:'pointer',textAlign:'center'}}>
              <div style={{fontSize:'22px',marginBottom:'4px'}}>{cat.icon}</div>
              <div style={{color:'white',fontSize:'10px',fontWeight:'700'}}>{cat.name}</div>
            </button>
          ))}
        </div>

        {/* Mode Selector */}
        <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
          {[
            {key:'list',label:'📋 List View'},
            {key:'flashcard',label:'🎴 Flashcards'},
            {key:'quiz',label:'❓ Quiz'},
          ].map(m => (
            <button key={m.key} onClick={()=> m.key === 'quiz' ? startQuiz() : (setMode(m.key as any), setCardIndex(0), setShowAnswer(false))} style={{background: mode===m.key ? activeCategory.color : '#1A2035',border:'none',borderRadius:'8px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {m.label}
            </button>
          ))}
        </div>

        {/* List View */}
        {mode === 'list' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'10px'}}>
            {activeCategory.words.map((word,i) => (
              <div key={i} style={{background:'#1A2035',borderRadius:'10px',padding:'14px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'4px'}}>{word.jp}</div>
                <div style={{color:activeCategory.color,fontSize:'13px',marginBottom:'4px'}}>{word.romaji}</div>
                <div style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>{word.en}</div>
              </div>
            ))}
          </div>
        )}

        {/* Flashcard View */}
        {mode === 'flashcard' && (
          <div>
            <div onClick={()=>setShowAnswer(!showAnswer)} style={{background:'#1A2035',borderRadius:'16px',padding:'48px 24px',textAlign:'center',border:'2px solid ' + activeCategory.color + '40',cursor:'pointer',minHeight:'200px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              {!showAnswer ? (
                <>
                  <div style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'12px'}}>{activeCategory.words[cardIndex].jp}</div>
                  <p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>Tap to reveal answer</p>
                </>
              ) : (
                <>
                  <div style={{color:activeCategory.color,fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>{activeCategory.words[cardIndex].romaji}</div>
                  <div style={{color:'white',fontSize:'18px'}}>{activeCategory.words[cardIndex].en}</div>
                </>
              )}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'16px'}}>
              <button onClick={()=>{setCardIndex(prev => prev > 0 ? prev - 1 : activeCategory.words.length - 1); setShowAnswer(false)}} style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 20px',color:'white',cursor:'pointer'}}>← Prev</button>
              <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>{cardIndex+1} / {activeCategory.words.length}</span>
              <button onClick={()=>{setCardIndex(prev => prev < activeCategory.words.length - 1 ? prev + 1 : 0); setShowAnswer(false)}} style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 20px',color:'white',cursor:'pointer'}}>Next →</button>
            </div>
          </div>
        )}

        {/* Quiz View */}
        {mode === 'quiz' && quizIndex < activeCategory.words.length && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'14px'}}>
              <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>Question {quizIndex+1} of {activeCategory.words.length}</span>
              <span style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700'}}>Score: {quizScore}/{activeCategory.words.length}</span>
            </div>
            <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px 24px',textAlign:'center',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'8px'}}>What does this mean?</p>
              <div style={{color:'white',fontSize:'28px',fontWeight:'700'}}>{activeCategory.words[quizIndex].jp}</div>
              <div style={{color:activeCategory.color,fontSize:'14px',marginTop:'6px'}}>{activeCategory.words[quizIndex].romaji}</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {quizOptions.map((opt,i) => {
                const isCorrect = opt === activeCategory.words[quizIndex].en
                const isSelected = opt === selectedAnswer
                let bg = '#1A2035'
                if (quizAnswered) {
                  if (isCorrect) bg = 'rgba(46,200,122,0.2)'
                  else if (isSelected) bg = 'rgba(196,32,32,0.2)'
                }
                return (
                  <button key={i} onClick={()=>answerQuiz(opt)} disabled={quizAnswered} style={{background:bg,border:'1px solid ' + (quizAnswered && isCorrect ? '#2EC87A' : quizAnswered && isSelected ? '#C42020' : 'rgba(255,255,255,0.1)'),borderRadius:'10px',padding:'14px',color:'white',fontSize:'14px',cursor: quizAnswered ? 'default' : 'pointer',textAlign:'left'}}>
                    {opt} {quizAnswered && isCorrect && '✓'} {quizAnswered && isSelected && !isCorrect && '✗'}
                  </button>
                )
              })}
            </div>
            {quizAnswered && (
              <button onClick={nextQuizQuestion} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',width:'100%',marginTop:'16px'}}>
                {quizIndex < activeCategory.words.length - 1 ? 'Next Question →' : 'See Results'}
              </button>
            )}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Ready to test your JLPT level?</p>
          <a href="/jlpt-test" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Try JLPT Practice Test</a>
        </div>
      </div>
    </main>
  )
}