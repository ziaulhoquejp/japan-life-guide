'use client'
import { useState } from 'react'

const SSW_INDUSTRIES = [
{id:'food_manufacturing', icon:'🍱', title:'Food Manufacturing', titleJP:'飲食料品製造業', desc:'Food processing, packaging, quality control'},
{id:'food_service', icon:'🍜', title:'Food Service', titleJP:'外食業', desc:'Restaurant, cafe, fast food service'},
{id:'nursing', icon:'🏥', title:'Nursing Care', titleJP:'介護', desc:'Elderly care, welfare facilities'},
{id:'building_cleaning', icon:'🧹', title:'Building Cleaning', titleJP:'ビルクリーニング', desc:'Commercial building cleaning'},
{id:'industrial_machinery', icon:'⚙️', title:'Industrial Machinery', titleJP:'産業機械製造業', desc:'Machine assembly, inspection'},
{id:'electronics', icon:'💡', title:'Electronics', titleJP:'電気・電子情報関連産業', desc:'Electronic device manufacturing'},
{id:'construction', icon:'🏗️', title:'Construction', titleJP:'建設業', desc:'Civil engineering, building work'},
{id:'automobile', icon:'🚗', title:'Automobile Repair', titleJP:'自動車整備', desc:'Car maintenance and repair'},
{id:'aviation', icon:'✈️', title:'Aviation', titleJP:'航空業', desc:'Airport ground handling'},
{id:'lodging', icon:'🏨', title:'Lodging', titleJP:'宿泊業', desc:'Hotel and inn service'},
{id:'agriculture', icon:'🌾', title:'Agriculture', titleJP:'農業', desc:'Crop cultivation, harvesting'},
{id:'fishery', icon:'🐟', title:'Fishery', titleJP:'漁業', desc:'Fishing and aquaculture'},
{id:'shipbuilding', icon:'🚢', title:'Shipbuilding', titleJP:'造船・舶用工業', desc:'Ship construction and repair'},
]

export default function SSWTestPage() {
const [selectedIndustry, setSelectedIndustry] = useState<any>(null)
const [testMode, setTestMode] = useState<'info'|'practice'|'results'>('info')
const [questions, setQuestions] = useState<any[]>([])
const [currentQ, setCurrentQ] = useState(0)
const [answers, setAnswers] = useState<number[]>([])
const [selectedAnswer, setSelectedAnswer] = useState<number|null>(null)
const [answered, setAnswered] = useState(false)
const [loading, setLoading] = useState(false)
const [results, setResults] = useState<any>(null)

async function startTest() {
if (!selectedIndustry) return
setLoading(true)
try {
const response = await fetch('/api/ssw-questions', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ industry: selectedIndustry }),
})
const data = await response.json()
setQuestions(data.questions || [])
setCurrentQ(0)
setAnswers([])
setSelectedAnswer(null)
setAnswered(false)
setTestMode('practice')
} catch (error) {
console.error(error)
}
setLoading(false)
}

function answerQuestion(optionIndex: number) {
if (answered) return
setSelectedAnswer(optionIndex)
setAnswered(true)
const newAnswers = [...answers, optionIndex]
setAnswers(newAnswers)

if (currentQ >= questions.length - 1) {
// Calculate results
const score = newAnswers.filter((ans, i) => ans === questions[i]?.correctAnswer).length
setResults({
score,
total: questions.length,
percentage: Math.round((score / questions.length) * 100),
passed: Math.round((score / questions.length) * 100) >= 65,
})
}
}

function nextQuestion() {
if (currentQ >= questions.length - 1) {
setTestMode('results')
} else {
setCurrentQ(prev => prev + 1)
setSelectedAnswer(null)
setAnswered(false)
}
}

function resetTest() {
setTestMode('info')
setSelectedIndustry(null)
setQuestions([])
setCurrentQ(0)
setAnswers([])
setResults(null)
}

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>🏭 SSW Skills Test Practice</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>特定技能技能評価試験対策 - Practice for Specified Skilled Worker exam</p>
<p style={{color:'#2EC87A',fontSize:'13px'}}>🤖 AI-generated questions · 13 industries · Free practice</p>
</div>

<div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>

{/* Info / Industry Selection */}
{testMode === 'info' && (
<div>
<div style={{background:'rgba(74,142,255,0.1)',borderRadius:'12px',padding:'20px',marginBottom:'24px',border:'1px solid rgba(74,142,255,0.2)'}}>
<h3 style={{color:'#4A8EFF',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>📋 About SSW Skills Test (特定技能技能評価試験)</h3>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
{[
{label:'Pass Score',value:'65% or above'},
{label:'Question Type',value:'Multiple choice'},
{label:'Language',value:'Japanese + figures'},
{label:'Duration',value:'60-90 minutes'},
].map(item => (
<div key={item.label} style={{background:'rgba(255,255,255,0.05)',borderRadius:'8px',padding:'10px'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'2px'}}>{item.label}</p>
<p style={{color:'white',fontSize:'13px',fontWeight:'700'}}>{item.value}</p>
</div>
))}
</div>
</div>

<h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'16px'}}>Select Your Industry</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'10px',marginBottom:'24px'}}>
{SSW_INDUSTRIES.map(industry => (
<button key={industry.id} onClick={()=>setSelectedIndustry(industry)} style={{background: selectedIndustry?.id===industry.id ? 'rgba(196,32,32,0.2)' : '#1A2035',border:'2px solid ' + (selectedIndustry?.id===industry.id ? '#C42020' : 'rgba(255,255,255,0.08)'),borderRadius:'12px',padding:'16px',cursor:'pointer',textAlign:'left'}}>
<div style={{fontSize:'28px',marginBottom:'8px'}}>{industry.icon}</div>
<div style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'2px'}}>{industry.title}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>{industry.titleJP}</div>
<div style={{color:'rgba(255,255,255,0.3)',fontSize:'10px'}}>{industry.desc}</div>
</button>
))}
</div>

{selectedIndustry && (
<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'12px',padding:'16px',marginBottom:'16px',border:'1px solid rgba(46,200,122,0.2)'}}>
<p style={{color:'#2EC87A',fontSize:'13px'}}>
✅ Selected: <strong>{selectedIndustry.title}</strong> ({selectedIndustry.titleJP})
</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginTop:'4px'}}>
AI will generate 10 practice questions for this industry
</p>
</div>
)}

<button onClick={startTest} disabled={!selectedIndustry||loading} style={{background: selectedIndustry ? '#C42020' : 'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'10px',padding:'16px',fontSize:'15px',fontWeight:'700',cursor: selectedIndustry ? 'pointer' : 'not-allowed',width:'100%'}}>
{loading ? '🤖 Generating questions...' : 'Start Practice Test 🏭'}
</button>
</div>
)}

{/* Practice Test */}
{testMode === 'practice' && questions.length > 0 && (
<div>
{/* Header */}
<div style={{background:'#1A2035',borderRadius:'12px',padding:'16px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
<div>
<span style={{color:'white',fontSize:'14px',fontWeight:'700'}}>{selectedIndustry?.icon} {selectedIndustry?.title}</span>
<span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginLeft:'10px'}}>Q{currentQ+1}/{questions.length}</span>
</div>
<span style={{color:'#2EC87A',fontSize:'13px',fontWeight:'700'}}>
Score: {answers.filter((ans,i) => ans === questions[i]?.correctAnswer).length}/{answers.length}
</span>
</div>
<div style={{height:'6px',background:'rgba(255,255,255,0.1)',borderRadius:'3px',overflow:'hidden'}}>
<div style={{width:((currentQ+1)/questions.length*100)+'%',height:'100%',background:'#C42020',borderRadius:'3px',transition:'width 0.3s'}}/>
</div>
</div>

{/* Question */}
<div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
{questions[currentQ]?.japanese && (
<p style={{color:'#F0A830',fontSize:'16px',fontWeight:'700',marginBottom:'8px',lineHeight:'1.6'}}>{questions[currentQ].japanese}</p>
)}
<p style={{color:'white',fontSize:'15px',lineHeight:'1.7',marginBottom:'20px'}}>{questions[currentQ]?.english || questions[currentQ]?.question}</p>

<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{(questions[currentQ]?.options || []).map((option: string, i: number) => {
const isCorrect = i === questions[currentQ]?.correctAnswer
const isSelected = i === selectedAnswer
let bg = '#0D0907'
let border = 'rgba(255,255,255,0.1)'
if (answered) {
if (isCorrect) { bg = 'rgba(46,200,122,0.15)'; border = '#2EC87A' }
else if (isSelected) { bg = 'rgba(196,32,32,0.15)'; border = '#C42020' }
}
return (
<button key={i} onClick={()=>answerQuestion(i)} disabled={answered} style={{background:bg,border:'2px solid '+border,borderRadius:'10px',padding:'14px 16px',color:'white',fontSize:'14px',cursor:answered?'default':'pointer',textAlign:'left',transition:'all 0.2s'}}>
<span style={{color:'rgba(255,255,255,0.4)',marginRight:'8px'}}>{String.fromCharCode(65+i)}.</span>
{option}
{answered && isCorrect && <span style={{color:'#2EC87A',marginLeft:'8px'}}>✓ Correct</span>}
{answered && isSelected && !isCorrect && <span style={{color:'#FF8070',marginLeft:'8px'}}>✗ Wrong</span>}
</button>
)
})}
</div>

{answered && questions[currentQ]?.explanation && (
<div style={{background:'rgba(74,142,255,0.1)',borderRadius:'10px',padding:'14px',marginTop:'16px',border:'1px solid rgba(74,142,255,0.2)'}}>
<p style={{color:'#4A8EFF',fontSize:'12px',fontWeight:'700',marginBottom:'4px'}}>💡 Explanation</p>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.6'}}>{questions[currentQ].explanation}</p>
</div>
)}
</div>

{answered && (
<button onClick={nextQuestion} style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',width:'100%'}}>
{currentQ < questions.length-1 ? 'Next Question →' : 'See Results 📊'}
</button>
)}
</div>
)}

{/* Results */}
{testMode === 'results' && results && (
<div>
<div style={{background:'#1A2035',borderRadius:'16px',padding:'40px',textAlign:'center',marginBottom:'20px',border:'2px solid ' + (results.passed ? 'rgba(46,200,122,0.4)' : 'rgba(196,32,32,0.4)')}}>
<div style={{fontSize:'56px',marginBottom:'16px'}}>{results.passed ? '🎉' : '📚'}</div>
<h2 style={{color: results.passed ? '#2EC87A' : '#F0A830',fontSize:'24px',fontWeight:'800',marginBottom:'8px'}}>
{results.passed ? 'Passed! 合格！' : 'Keep Studying! もっと頑張ろう！'}
</h2>
<div style={{fontSize:'48px',fontWeight:'800',color: results.passed ? '#2EC87A' : '#F0A830',marginBottom:'8px'}}>
{results.percentage}%
</div>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'15px',marginBottom:'8px'}}>
{results.score} / {results.total} correct answers
</p>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>
Pass mark: 65% · {selectedIndustry?.title} ({selectedIndustry?.titleJP})
</p>
</div>

{/* Question Review */}
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>📋 Question Review</h3>
<div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
{questions.map((q, i) => {
const isCorrect = answers[i] === q.correctAnswer
return (
<div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'10px',background:'#0D0907',borderRadius:'8px'}}>
<span style={{color: isCorrect ? '#2EC87A' : '#FF8070',fontSize:'16px',flexShrink:0}}>{isCorrect ? '✅' : '❌'}</span>
<div style={{flex:1}}>
<p style={{color:'white',fontSize:'13px',marginBottom:'4px'}}>{q.english || q.question}</p>
{!isCorrect && (
<p style={{color:'#2EC87A',fontSize:'12px'}}>Correct: {q.options?.[q.correctAnswer]}</p>
)}
</div>
</div>
)
})}
</div>
</div>

<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
<button onClick={startTest} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:1}}>
🔄 Try Again
</button>
<button onClick={resetTest} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px 24px',fontSize:'14px',cursor:'pointer',flex:1}}>
Change Industry
</button>
<a href="/jobs" style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',textDecoration:'none',padding:'14px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',flex:1,textAlign:'center',border:'1px solid rgba(46,200,122,0.3)'}}>
Find SSW Jobs 💼
</a>
</div>
</div>
)}
</div>
</main>
)
}

