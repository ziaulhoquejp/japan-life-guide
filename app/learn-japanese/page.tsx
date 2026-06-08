'use client'
import { useState } from 'react'

const LESSONS = [
  {
    id:1, category:'Hiragana', icon:'あ', desc:'Learn the basic Japanese alphabet',
    words:[
      {jp:'あ',romaji:'a',en:'a'},{jp:'い',romaji:'i',en:'i'},{jp:'う',romaji:'u',en:'u'},
      {jp:'え',romaji:'e',en:'e'},{jp:'お',romaji:'o',en:'o'},{jp:'か',romaji:'ka',en:'ka'},
      {jp:'き',romaji:'ki',en:'ki'},{jp:'く',romaji:'ku',en:'ku'},{jp:'け',romaji:'ke',en:'ke'},
      {jp:'こ',romaji:'ko',en:'ko'},{jp:'さ',romaji:'sa',en:'sa'},{jp:'し',romaji:'shi',en:'shi'},
    ]
  },
  {
    id:2, category:'Greetings', icon:'👋', desc:'Essential greetings for daily life',
    words:[
      {jp:'おはようございます',romaji:'Ohayou gozaimasu',en:'Good morning'},
      {jp:'こんにちは',romaji:'Konnichiwa',en:'Hello'},
      {jp:'こんばんは',romaji:'Konbanwa',en:'Good evening'},
      {jp:'ありがとう',romaji:'Arigatou',en:'Thank you'},
      {jp:'すみません',romaji:'Sumimasen',en:'Excuse me'},
      {jp:'はい',romaji:'Hai',en:'Yes'},
      {jp:'いいえ',romaji:'Iie',en:'No'},
      {jp:'わかりました',romaji:'Wakarimashita',en:'I understand'},
      {jp:'もう一度',romaji:'Mou ichido',en:'Once more'},
      {jp:'どうぞよろしく',romaji:'Douzo yoroshiku',en:'Nice to meet you'},
      {jp:'さようなら',romaji:'Sayounara',en:'Goodbye'},
      {jp:'おやすみ',romaji:'Oyasumi',en:'Good night'},
    ]
  },
  {
    id:3, category:'School Life', icon:'🏫', desc:'Useful phrases for language school',
    words:[
      {jp:'せんせい',romaji:'Sensei',en:'Teacher'},
      {jp:'がくせい',romaji:'Gakusei',en:'Student'},
      {jp:'きょうしつ',romaji:'Kyoushitsu',en:'Classroom'},
      {jp:'しゅくだい',romaji:'Shukudai',en:'Homework'},
      {jp:'しけん',romaji:'Shiken',en:'Exam'},
      {jp:'わかりません',romaji:'Wakarimasen',en:'I do not understand'},
      {jp:'もう一度おねがいします',romaji:'Mou ichido onegaishimasu',en:'Please say again'},
      {jp:'にほんご',romaji:'Nihongo',en:'Japanese language'},
      {jp:'えいご',romaji:'Eigo',en:'English language'},
      {jp:'べんきょう',romaji:'Benkyou',en:'Study'},
      {jp:'としょかん',romaji:'Toshokan',en:'Library'},
      {jp:'きゅうけい',romaji:'Kyuukei',en:'Break time'},
    ]
  },
  {
    id:4, category:'Daily Life', icon:'🌸', desc:'Essential phrases for everyday situations',
    words:[
      {jp:'どこですか',romaji:'Doko desu ka',en:'Where is it?'},
      {jp:'いくらですか',romaji:'Ikura desu ka',en:'How much is it?'},
      {jp:'これをください',romaji:'Kore wo kudasai',en:'Please give me this'},
      {jp:'トイレはどこですか',romaji:'Toire wa doko desu ka',en:'Where is the toilet?'},
      {jp:'えき',romaji:'Eki',en:'Train station'},
      {jp:'でんしゃ',romaji:'Densha',en:'Train'},
      {jp:'バス',romaji:'Basu',en:'Bus'},
      {jp:'びょういん',romaji:'Byouin',en:'Hospital'},
      {jp:'たすけてください',romaji:'Tasukete kudasai',en:'Please help me'},
      {jp:'けいさつ',romaji:'Keisatsu',en:'Police'},
      {jp:'スーパー',romaji:'Suupaa',en:'Supermarket'},
      {jp:'コンビニ',romaji:'Konbini',en:'Convenience store'},
    ]
  },
  {
    id:5, category:'Work', icon:'💼', desc:'Phrases for part-time work',
    words:[
      {jp:'はじめまして',romaji:'Hajimemashite',en:'Nice to meet you (first time)'},
      {jp:'よろしくおねがいします',romaji:'Yoroshiku onegaishimasu',en:'Please treat me well'},
      {jp:'しごと',romaji:'Shigoto',en:'Work'},
      {jp:'きゅうりょう',romaji:'Kyuuryou',en:'Salary'},
      {jp:'アルバイト',romaji:'Arubaito',en:'Part-time job'},
      {jp:'やすみ',romaji:'Yasumi',en:'Day off'},
      {jp:'おつかれさまです',romaji:'Otsukaresama desu',en:'Good work'},
      {jp:'ざんぎょう',romaji:'Zangyou',en:'Overtime'},
      {jp:'めんせつ',romaji:'Mensetsu',en:'Interview'},
      {jp:'けいやく',romaji:'Keiyaku',en:'Contract'},
      {jp:'じかん',romaji:'Jikan',en:'Time'},
      {jp:'いそがしい',romaji:'Isogashii',en:'Busy'},
    ]
  },
  {
    id:6, category:'Numbers', icon:'🔢', desc:'Count in Japanese',
    words:[
      {jp:'いち',romaji:'Ichi',en:'1'},{jp:'に',romaji:'Ni',en:'2'},
      {jp:'さん',romaji:'San',en:'3'},{jp:'し・よん',romaji:'Shi/Yon',en:'4'},
      {jp:'ご',romaji:'Go',en:'5'},{jp:'ろく',romaji:'Roku',en:'6'},
      {jp:'しち・なな',romaji:'Shichi/Nana',en:'7'},{jp:'はち',romaji:'Hachi',en:'8'},
      {jp:'く・きゅう',romaji:'Ku/Kyuu',en:'9'},{jp:'じゅう',romaji:'Juu',en:'10'},
      {jp:'ひゃく',romaji:'Hyaku',en:'100'},{jp:'せん',romaji:'Sen',en:'1000'},
    ]
  },
  {
    id:7, category:'Food', icon:'🍜', desc:'Japanese food vocabulary',
    words:[
      {jp:'ラーメン',romaji:'Raamen',en:'Ramen noodles'},
      {jp:'すし',romaji:'Sushi',en:'Sushi'},
      {jp:'てんぷら',romaji:'Tenpura',en:'Tempura'},
      {jp:'おにぎり',romaji:'Onigiri',en:'Rice ball'},
      {jp:'みず',romaji:'Mizu',en:'Water'},
      {jp:'おちゃ',romaji:'Ocha',en:'Green tea'},
      {jp:'たまご',romaji:'Tamago',en:'Egg'},
      {jp:'やさい',romaji:'Yasai',en:'Vegetables'},
      {jp:'さかな',romaji:'Sakana',en:'Fish'},
      {jp:'とりにく',romaji:'Toriniku',en:'Chicken'},
      {jp:'いただきます',romaji:'Itadakimasu',en:'Let us eat (before meal)'},
      {jp:'ごちそうさま',romaji:'Gochisousama',en:'Thank you for the meal'},
    ]
  },
  {
    id:8, category:'Emergency', icon:'🆘', desc:'Emergency phrases in Japanese',
    words:[
      {jp:'たすけて',romaji:'Tasukete',en:'Help!'},
      {jp:'きゅうきゅうしゃ',romaji:'Kyuukyuusha',en:'Ambulance'},
      {jp:'かじ',romaji:'Kaji',en:'Fire'},
      {jp:'どろぼう',romaji:'Dorobou',en:'Thief'},
      {jp:'いたい',romaji:'Itai',en:'It hurts'},
      {jp:'びょうき',romaji:'Byouki',en:'Sick'},
      {jp:'くすり',romaji:'Kusuri',en:'Medicine'},
      {jp:'アレルギー',romaji:'Arerugii',en:'Allergy'},
      {jp:'ハラル',romaji:'Hararu',en:'Halal'},
      {jp:'パスポート',romaji:'Pasupooto',en:'Passport'},
      {jp:'たいしかん',romaji:'Taishikan',en:'Embassy'},
      {jp:'ほけん',romaji:'Hoken',en:'Insurance'},
    ]
  },
]

export default function LearnJapanesePage() {
  const [selectedLesson, setSelectedLesson] = useState(LESSONS[0])
  const [flipped, setFlipped] = useState<number[]>([])
  const [quiz, setQuiz] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [answered, setAnswered] = useState<string|null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [progress, setProgress] = useState<{[key:number]:number}>({})

  function toggleFlip(i: number) {
    setFlipped(prev => prev.includes(i) ? prev.filter(x=>x!==i) : [...prev, i])
  }

  function startQuiz() {
    setQuiz(true)
    setQuizIndex(0)
    setScore(0)
    setQuizDone(false)
    setAnswered(null)
  }

  function answerQuiz(answer: string) {
    const correct = selectedLesson.words[quizIndex].en
    setAnswered(answer)
    const isCorrect = answer === correct
    if (isCorrect) setScore(prev=>prev+1)
    setTimeout(() => {
      setAnswered(null)
      if (quizIndex + 1 >= selectedLesson.words.length) {
        setQuizDone(true)
        const newScore = isCorrect ? score + 1 : score
        setProgress(prev=>({...prev,[selectedLesson.id]:Math.round((newScore/selectedLesson.words.length)*100)}))
        setTotalScore(prev=>prev+(isCorrect?1:0))
      } else {
        setQuizIndex(prev=>prev+1)
      }
    }, 800)
  }

  function getOptions(currentIndex: number) {
    const correct = selectedLesson.words[currentIndex]
    const others = selectedLesson.words.filter((_,i)=>i!==currentIndex).sort(()=>Math.random()-0.5).slice(0,3)
    return [...others, correct].sort(()=>Math.random()-0.5)
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Learn Japanese</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Essential words and phrases for your Japan journey</p>
        {totalScore > 0 && (
          <div style={{marginTop:'12px',display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(240,168,48,0.1)',border:'1px solid rgba(240,168,48,0.3)',borderRadius:'20px',padding:'6px 16px'}}>
            <span style={{color:'#F0A830',fontSize:'14px',fontWeight:'700'}}>Total Score: {totalScore} points 🏆</span>
          </div>
        )}
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
          {LESSONS.map(lesson=>(
            <button key={lesson.id} onClick={()=>{setSelectedLesson(lesson);setFlipped([]);setQuiz(false);setQuizDone(false)}} style={{background:selectedLesson.id===lesson.id?'#C42020':'#1A2035',border:'1px solid ' + (selectedLesson.id===lesson.id?'#C42020':'rgba(255,255,255,0.15)'),borderRadius:'10px',padding:'10px 16px',color:'white',fontSize:'13px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',position:'relative'}}>
              <span>{lesson.icon}</span>
              <span>{lesson.category}</span>
              {progress[lesson.id] && (
                <span style={{background:'#2EC87A',color:'white',padding:'2px 6px',borderRadius:'10px',fontSize:'10px',fontWeight:'700'}}>{progress[lesson.id]}%</span>
              )}
            </button>
          ))}
        </div>

        {!quiz ? (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',flexWrap:'wrap',gap:'12px'}}>
              <div>
                <h2 style={{color:'white',fontSize:'20px',fontWeight:'700'}}>{selectedLesson.category}</h2>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>{selectedLesson.desc} · {selectedLesson.words.length} words</p>
              </div>
              <div style={{display:'flex',gap:'8px'}}>
                <button onClick={()=>setFlipped(selectedLesson.words.map((_,i)=>i))} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'8px 14px',fontSize:'12px',cursor:'pointer'}}>
                  Show All
                </button>
                <button onClick={()=>setFlipped([])} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'8px 14px',fontSize:'12px',cursor:'pointer'}}>
                  Hide All
                </button>
                <button onClick={startQuiz} style={{background:'#2EC87A',color:'white',border:'none',borderRadius:'8px',padding:'8px 16px',fontSize:'12px',fontWeight:'700',cursor:'pointer'}}>
                  Start Quiz
                </button>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))',gap:'12px'}}>
              {selectedLesson.words.map((word,i)=>(
                <div key={i} onClick={()=>toggleFlip(i)} style={{background:flipped.includes(i)?'#C42020':'#1A2035',borderRadius:'12px',padding:'20px',textAlign:'center',cursor:'pointer',border:'1px solid rgba(255,255,255,0.08)',transition:'all 0.2s',minHeight:'110px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'8px'}}>
                  {flipped.includes(i) ? (
                    <>
                      <div style={{color:'white',fontSize:'15px',fontWeight:'700'}}>{word.en}</div>
                      <div style={{color:'rgba(255,255,255,0.7)',fontSize:'12px'}}>{word.romaji}</div>
                    </>
                  ) : (
                    <>
                      <div style={{color:'white',fontSize:'22px',fontWeight:'700'}}>{word.jp}</div>
                      <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Tap to reveal</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : quizDone ? (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'48px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize:'64px',marginBottom:'16px'}}>{score >= selectedLesson.words.length * 0.8 ? '🎉' : score >= selectedLesson.words.length * 0.5 ? '👍' : '📚'}</div>
            <h2 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'8px'}}>Quiz Complete!</h2>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'8px'}}>Your Score:</p>
            <div style={{color:'#F0A830',fontSize:'52px',fontWeight:'700',marginBottom:'8px'}}>{score}/{selectedLesson.words.length}</div>
            <div style={{color:score>=selectedLesson.words.length*0.8?'#2EC87A':'#F0A830',fontSize:'16px',fontWeight:'600',marginBottom:'24px'}}>
              {score>=selectedLesson.words.length*0.8?'Excellent! Gambatte!':score>=selectedLesson.words.length*0.5?'Good job! Keep practicing!':'Keep studying! You can do it!'}
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
              <button onClick={startQuiz} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>Try Again</button>
              <button onClick={()=>setQuiz(false)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',cursor:'pointer'}}>Back to Flashcards</button>
              <a href="/chat" style={{background:'#2EC87A',color:'white',textDecoration:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700'}}>Practice with Sakura</a>
            </div>
          </div>
        ) : (
          <div style={{background:'#1A2035',borderRadius:'16px',padding:'40px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>Question {quizIndex+1} of {selectedLesson.words.length}</span>
              <span style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700'}}>Score: {score}</span>
            </div>
            <div style={{height:'4px',background:'rgba(255,255,255,0.1)',borderRadius:'2px',marginBottom:'32px',overflow:'hidden'}}>
              <div style={{height:'100%',width:((quizIndex)/selectedLesson.words.length*100)+'%',background:'#C42020',borderRadius:'2px',transition:'width 0.3s'}}/>
            </div>
            <div style={{color:'white',fontSize:'52px',fontWeight:'700',marginBottom:'8px'}}>{selectedLesson.words[quizIndex].jp}</div>
            <div style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'32px'}}>{selectedLesson.words[quizIndex].romaji}</div>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',marginBottom:'16px'}}>What does this mean?</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',maxWidth:'400px',margin:'0 auto'}}>
              {getOptions(quizIndex).map((option,i)=>{
                const isCorrect = option.en === selectedLesson.words[quizIndex].en
                const isAnswered = answered !== null
                const isSelected = answered === option.en
                return (
                  <button key={i} onClick={()=>!isAnswered&&answerQuiz(option.en)} style={{background:isAnswered?(isCorrect?'rgba(46,200,122,0.3)':isSelected?'rgba(196,32,32,0.3)':'#0D0907'):'#0D0907',border:'2px solid ' + (isAnswered?(isCorrect?'#2EC87A':isSelected?'#C42020':'rgba(255,255,255,0.1)'):'rgba(255,255,255,0.2)'),borderRadius:'10px',padding:'14px',color:'white',fontSize:'14px',cursor:isAnswered?'default':'pointer',fontWeight:'500',transition:'all 0.2s'}}>
                    {option.en}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Want to practice Japanese conversation?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Practice with Sakura AI</a>
        </div>
      </div>
    </main>
  )
}