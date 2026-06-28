'use client'
import { useState } from 'react'

const JOB_TYPES = [
{id:'ssw_food', label:'SSW - Food Service (飲食)', icon:'🍜'},
{id:'ssw_factory', label:'SSW - Factory (製造)', icon:'🏭'},
{id:'ssw_care', label:'SSW - Nursing Care (介護)', icon:'🏥'},
{id:'ssw_construction', label:'SSW - Construction (建設)', icon:'🏗️'},
{id:'engineer', label:'Engineer / IT (エンジニア)', icon:'💻'},
{id:'student', label:'Language School Interview (語学学校)', icon:'🏫'},
{id:'parttime', label:'Part-time Job (アルバイト)', icon:'⏰'},
]

const DIFFICULTY = [
{id:'beginner', label:'Beginner', icon:'🟢', desc:'Simple questions in English'},
{id:'intermediate', label:'Intermediate', icon:'🟡', desc:'Mix of English and Japanese'},
{id:'advanced', label:'Advanced', icon:'🔴', desc:'Full Japanese interview'},
]

export default function InterviewPracticePage() {
const [step, setStep] = useState<'setup'|'practice'|'feedback'>('setup')
const [jobType, setJobType] = useState('')
const [difficulty, setDifficulty] = useState('')
const [questions, setQuestions] = useState<any[]>([])
const [currentQ, setCurrentQ] = useState(0)
const [answers, setAnswers] = useState<string[]>([])
const [currentAnswer, setCurrentAnswer] = useState('')
const [loading, setLoading] = useState(false)
const [feedback, setFeedback] = useState<any[]>([])
const [overallFeedback, setOverallFeedback] = useState('')

async function generateQuestions() {
if (!jobType || !difficulty) return
setLoading(true)
try {
const response = await fetch('/api/interview-questions', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ jobType, difficulty }),
})
const data = await response.json()
setQuestions(data.questions || [])
setStep('practice')
setCurrentQ(0)
setAnswers([])
} catch (error) {
console.error(error)
}
setLoading(false)
}

async function submitAnswer() {
if (!currentAnswer.trim()) return
const newAnswers = [...answers, currentAnswer]
setAnswers(newAnswers)
setCurrentAnswer('')

if (currentQ < questions.length - 1) {
setCurrentQ(prev => prev + 1)
} else {
// Get feedback
setLoading(true)
try {
const response = await fetch('/api/interview-feedback', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ jobType, difficulty, questions, answers: newAnswers }),
})
const data = await response.json()
setFeedback(data.feedback || [])
setOverallFeedback(data.overall || '')
setStep('feedback')
} catch (error) {
console.error(error)
}
setLoading(false)
}
}

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>🎤 AI Interview Practice</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Practice Japanese job interviews with AI feedback in Bengali, Nepali & English</p>
</div>

<div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>

{/* Setup */}
{step === 'setup' && (
<div>
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>1. Select Job Type</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'10px'}}>
{JOB_TYPES.map(job => (
<button key={job.id} onClick={()=>setJobType(job.id)} style={{background: jobType===job.id ? 'rgba(196,32,32,0.2)' : '#0D0907',border:'2px solid ' + (jobType===job.id ? '#C42020' : 'rgba(255,255,255,0.08)'),borderRadius:'10px',padding:'14px',cursor:'pointer',textAlign:'left',display:'flex',gap:'10px',alignItems:'center'}}>
<span style={{fontSize:'24px'}}>{job.icon}</span>
<span style={{color:'white',fontSize:'12px',fontWeight:'600',lineHeight:'1.4'}}>{job.label}</span>
</button>
))}
</div>
</div>

<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>2. Select Difficulty</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'10px'}}>
{DIFFICULTY.map(d => (
<button key={d.id} onClick={()=>setDifficulty(d.id)} style={{background: difficulty===d.id ? 'rgba(196,32,32,0.2)' : '#0D0907',border:'2px solid ' + (difficulty===d.id ? '#C42020' : 'rgba(255,255,255,0.08)'),borderRadius:'10px',padding:'16px',cursor:'pointer',textAlign:'center'}}>
<div style={{fontSize:'24px',marginBottom:'8px'}}>{d.icon}</div>
<div style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{d.label}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{d.desc}</div>
</button>
))}
</div>
</div>

<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'12px',padding:'16px',marginBottom:'20px',border:'1px solid rgba(46,200,122,0.2)'}}>
<p style={{color:'#2EC87A',fontSize:'13px',lineHeight:'1.7'}}>
🤖 Our AI will generate 5 realistic interview questions based on your selection and provide detailed feedback on your answers in English, Bengali, or Nepali.
</p>
</div>

<button onClick={generateQuestions} disabled={!jobType||!difficulty||loading} style={{background: jobType&&difficulty ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'10px',padding:'16px',fontSize:'15px',fontWeight:'700',cursor: jobType&&difficulty ? 'pointer' : 'not-allowed',width:'100%'}}>
{loading ? '🤖 Generating questions...' : 'Start Interview Practice 🎤'}
</button>
</div>
)}

{/* Practice */}
{step === 'practice' && questions.length > 0 && (
<div>
{/* Progress */}
<div style={{background:'#1A2035',borderRadius:'12px',padding:'16px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
<span style={{color:'white',fontSize:'14px',fontWeight:'700'}}>Question {currentQ+1} of {questions.length}</span>
<span style={{color:'#C42020',fontSize:'14px',fontWeight:'700'}}>{Math.round(((currentQ)/questions.length)*100)}%</span>
</div>
<div style={{height:'6px',background:'rgba(255,255,255,0.1)',borderRadius:'3px',overflow:'hidden'}}>
<div style={{width:(currentQ/questions.length*100)+'%',height:'100%',background:'#C42020',borderRadius:'3px',transition:'width 0.3s'}}/>
</div>
</div>

{/* Question */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'16px'}}>
<div style={{width:'36px',height:'36px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'16px',fontWeight:'700',flexShrink:0}}>{currentQ+1}</div>
<div style={{flex:1}}>
{questions[currentQ]?.japanese && (
<p style={{color:'#F0A830',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>{questions[currentQ].japanese}</p>
)}
<p style={{color:'white',fontSize:'15px',lineHeight:'1.7'}}>{questions[currentQ]?.english || questions[currentQ]}</p>
{questions[currentQ]?.tip && (
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'8px',fontStyle:'italic'}}>💡 {questions[currentQ].tip}</p>
)}
</div>
</div>

<textarea
value={currentAnswer}
onChange={e=>setCurrentAnswer(e.target.value)}
placeholder="Type your answer here... (English, Bengali, or Nepali)"
style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'14px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'120px',lineHeight:'1.6'}}
/>
</div>

{/* Previous answers */}
{answers.length > 0 && (
<div style={{background:'rgba(255,255,255,0.04)',borderRadius:'12px',padding:'16px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.06)'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'10px'}}>Previous answers:</p>
{answers.map((ans, i) => (
<div key={i} style={{marginBottom:'8px'}}>
<p style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>Q{i+1}: {typeof questions[i] === 'string' ? questions[i].slice(0,50) : questions[i]?.english?.slice(0,50)}...</p>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',marginTop:'2px'}}>{ans.slice(0,100)}{ans.length>100?'...':''}</p>
</div>
))}
</div>
)}

<button onClick={submitAnswer} disabled={!currentAnswer.trim()||loading} style={{background: currentAnswer.trim() ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'10px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor: currentAnswer.trim() ? 'pointer' : 'not-allowed',width:'100%'}}>
{loading ? '🤖 Analyzing...' : currentQ < questions.length-1 ? 'Next Question →' : 'Get AI Feedback 🎤'}
</button>
</div>
)}

{/* Feedback */}
{step === 'feedback' && (
<div>
<div style={{background:'linear-gradient(135deg,rgba(46,200,122,0.2),rgba(46,200,122,0.05))',borderRadius:'16px',padding:'24px',marginBottom:'20px',border:'1px solid rgba(46,200,122,0.3)',textAlign:'center'}}>
<div style={{fontSize:'48px',marginBottom:'12px'}}>🎉</div>
<h2 style={{color:'#2EC87A',fontSize:'22px',fontWeight:'700',marginBottom:'8px'}}>Interview Complete!</h2>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.7'}}>{overallFeedback}</p>
</div>

<div style={{display:'flex',flexDirection:'column',gap:'14px',marginBottom:'24px'}}>
{feedback.map((fb, i) => (
<div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:'12px'}}>
<div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:'700',flexShrink:0}}>{i+1}</div>
<div style={{flex:1}}>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginBottom:'4px'}}>Question:</p>
<p style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{typeof questions[i] === 'string' ? questions[i] : questions[i]?.english}</p>
</div>
</div>
<div style={{background:'#0D0907',borderRadius:'8px',padding:'12px',marginBottom:'10px'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>Your answer:</p>
<p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{answers[i]}</p>
</div>
{fb.score && (
<div style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
<span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'2px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>Score: {fb.score}/10</span>
</div>
)}
{fb.feedback && <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7',marginBottom:'8px'}}>{fb.feedback}</p>}
{fb.better_answer && (
<div style={{background:'rgba(74,142,255,0.1)',borderRadius:'8px',padding:'12px',border:'1px solid rgba(74,142,255,0.2)'}}>
<p style={{color:'#4A8EFF',fontSize:'11px',fontWeight:'700',marginBottom:'4px'}}>💡 Better answer:</p>
<p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.6'}}>{fb.better_answer}</p>
</div>
)}
</div>
))}
</div>

<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
<button onClick={()=>{setStep('setup');setJobType('');setDifficulty('');setQuestions([]);setAnswers([]);setFeedback([]);setOverallFeedback('')}} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:1}}>
Practice Again 🔄
</button>
<a href="/jobs" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'14px 24px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)',flex:1,textAlign:'center'}}>
Browse Jobs 💼
</a>
</div>
</div>
)}
</div>
</main>
)
}

