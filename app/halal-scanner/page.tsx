'use client'
import { useState, useRef, useCallback } from 'react'

const HARAM_INGREDIENTS = [
'pork', 'pig', 'lard', 'gelatin', 'alcohol', 'wine', 'beer', 'sake', 'mirin',
'ham', 'bacon', 'pepperoni', 'prosciutto', 'chorizo', 'ethanol', 'spirits',
'豚', 'ラード', 'ゼラチン', 'アルコール', '酒', 'ワイン', 'ビール', '日本酒',
'みりん', 'ハム', 'ベーコン', '豚肉', '豚骨', '豚脂', 'リキュール',
]

const DOUBTFUL_INGREDIENTS = [
'emulsifier', 'flavoring', 'natural flavor', 'vanilla extract', 'rennet',
'carmine', 'cochineal', 'l-cysteine', 'mono and diglycerides', 'glycerin',
'乳化剤', '香料', '天然香料', 'バニラエッセンス', 'カルミン', 'グリセリン',
'チーズ', 'バター', 'クリーム', '乳製品',
]

export default function HalalScannerPage() {
const [mode, setMode] = useState<'home'|'camera'|'upload'|'result'>('home')
const [image, setImage] = useState<string|null>(null)
const [analyzing, setAnalyzing] = useState(false)
const [result, setResult] = useState<any>(null)
const [cameraStream, setCameraStream] = useState<MediaStream|null>(null)
const videoRef = useRef<HTMLVideoElement>(null)
const canvasRef = useRef<HTMLCanvasElement>(null)
const fileInputRef = useRef<HTMLInputElement>(null)

async function startCamera() {
try {
const stream = await navigator.mediaDevices.getUserMedia({
video: { facingMode: 'environment' }
})
setCameraStream(stream)
setMode('camera')
setTimeout(() => {
if (videoRef.current) {
videoRef.current.srcObject = stream
videoRef.current.play()
}
}, 100)
} catch (err) {
alert('Camera access denied. Please use photo upload instead.')
setMode('upload')
}
}

function stopCamera() {
if (cameraStream) {
cameraStream.getTracks().forEach(track => track.stop())
setCameraStream(null)
}
}

function capturePhoto() {
if (!videoRef.current || !canvasRef.current) return
const canvas = canvasRef.current
const video = videoRef.current
canvas.width = video.videoWidth
canvas.height = video.videoHeight
canvas.getContext('2d')?.drawImage(video, 0, 0)
const imageData = canvas.toDataURL('image/jpeg', 0.8)
setImage(imageData)
stopCamera()
analyzeImage(imageData)
}

function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
const file = e.target.files?.[0]
if (!file) return
const reader = new FileReader()
reader.onload = (event) => {
const imageData = event.target?.result as string
setImage(imageData)
analyzeImage(imageData)
}
reader.readAsDataURL(file)
}

async function analyzeImage(imageData: string) {
setAnalyzing(true)
setMode('result')
try {
const base64Data = imageData.split(',')[1]
const response = await fetch('/api/halal-scan', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ image: base64Data }),
})
const data = await response.json()
setResult(data)
} catch (error) {
setResult({
status: 'error',
verdict: 'Analysis failed',
explanation: 'Could not analyze the image. Please try again.',
ingredients: [],
haram_found: [],
doubtful_found: [],
})
}
setAnalyzing(false)
}

function reset() {
stopCamera()
setMode('home')
setImage(null)
setResult(null)
setAnalyzing(false)
}

const verdictColor = result?.status === 'halal' ? '#2EC87A' : result?.status === 'haram' ? '#C42020' : '#F0A830'
const verdictIcon = result?.status === 'halal' ? '✅' : result?.status === 'haram' ? '❌' : '⚠'

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>🕌 Halal Scanner</h1>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>Scan ingredients to check if food is Halal</p>
<p style={{color:'#2EC87A',fontSize:'13px'}}>🤖 AI-powered · 📷 Camera or Photo · 🇯🇵 Japanese & English</p>
</div>

<div style={{maxWidth:'600px',margin:'0 auto',padding:'32px 20px'}}>

{/* Home */}
{mode === 'home' && (
<div>
<div style={{background:'rgba(46,200,122,0.1)',borderRadius:'12px',padding:'20px',marginBottom:'24px',border:'1px solid rgba(46,200,122,0.2)'}}>
<h3 style={{color:'#2EC87A',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>How to use:</h3>
<div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
{[
'📷 Take a photo of the ingredients list on the package',
'🤖 Our AI reads and analyzes all ingredients',
'✅ Get instant Halal/Haram verdict',
'📋 See which ingredients are problematic',
].map((tip,i) => (
<p key={i} style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{tip}</p>
))}
</div>
</div>

<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'24px'}}>
<button onClick={startCamera} style={{background:'#C42020',color:'white',border:'none',borderRadius:'14px',padding:'28px 20px',fontSize:'15px',fontWeight:'700',cursor:'pointer',textAlign:'center'}}>
<div style={{fontSize:'40px',marginBottom:'10px'}}>📷</div>
Use Camera
<div style={{color:'rgba(255,255,255,0.7)',fontSize:'12px',marginTop:'6px',fontWeight:'400'}}>Take photo now</div>
</button>
<button onClick={()=>fileInputRef.current?.click()} style={{background:'#1A2035',color:'white',border:'2px solid rgba(255,255,255,0.15)',borderRadius:'14px',padding:'28px 20px',fontSize:'15px',fontWeight:'700',cursor:'pointer',textAlign:'center'}}>
<div style={{fontSize:'40px',marginBottom:'10px'}}>🖼️</div>
Upload Photo
<div style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',marginTop:'6px',fontWeight:'400'}}>From your gallery</div>
</button>
<input ref={fileInputRef} type="file" accept="image/*" style={{display:'none'}} onChange={handleFileUpload}/>
</div>

{/* Common Haram Ingredients */}
<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>❌ Common Haram Ingredients in Japan</h3>
<div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
{['豚肉 (Pork)','ラード (Lard)','ゼラチン (Gelatin)','アルコール (Alcohol)','みりん (Mirin)','日本酒 (Sake)','ワイン (Wine)','豚骨 (Pork Bone)'].map(item => (
<span key={item} style={{background:'rgba(196,32,32,0.15)',color:'#FF8070',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>{item}</span>
))}
</div>
</div>

<div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>⚠️ Doubtful Ingredients</h3>
<div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
{['乳化剤 (Emulsifier)','香料 (Flavoring)','グリセリン (Glycerin)','カルミン (Carmine)','レンネット (Rennet)'].map(item => (
<span key={item} style={{background:'rgba(240,168,48,0.15)',color:'#F0A830',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>{item}</span>
))}
</div>
</div>
</div>
)}

{/* Camera */}
{mode === 'camera' && (
<div style={{textAlign:'center'}}>
<div style={{background:'#1A2035',borderRadius:'16px',overflow:'hidden',marginBottom:'16px',position:'relative'}}>
<video ref={videoRef} style={{width:'100%',display:'block'}} playsInline muted/>
<div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',border:'2px solid #2EC87A',borderRadius:'8px',width:'80%',height:'40%',pointerEvents:'none'}}/>
<p style={{position:'absolute',bottom:'10px',left:'0',right:'0',textAlign:'center',color:'white',fontSize:'12px',background:'rgba(0,0,0,0.5)',padding:'4px'}}>
Point camera at ingredients list
</p>
</div>
<canvas ref={canvasRef} style={{display:'none'}}/>
<div style={{display:'flex',gap:'10px'}}>
<button onClick={capturePhoto} style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'16px',fontSize:'15px',fontWeight:'700',cursor:'pointer',flex:2}}>
📷 Capture
</button>
<button onClick={()=>{stopCamera(); setMode('home')}} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'10px',padding:'16px',fontSize:'14px',cursor:'pointer',flex:1}}>
Cancel
</button>
</div>
</div>
)}

{/* Result */}
{mode === 'result' && (
<div>
{image && (
<div style={{marginBottom:'16px',borderRadius:'12px',overflow:'hidden'}}>
<img src={image} alt="Scanned" style={{width:'100%',maxHeight:'200px',objectFit:'cover'}}/>
</div>
)}

{analyzing ? (
<div style={{background:'#1A2035',borderRadius:'16px',padding:'40px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
<div style={{fontSize:'48px',marginBottom:'16px'}}>🤖</div>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>AI is analyzing...</h2>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>Reading ingredients and checking for Halal compliance</p>
</div>
) : result && (
<div>
{/* Verdict */}
<div style={{background: result.status === 'halal' ? 'rgba(46,200,122,0.1)' : result.status === 'haram' ? 'rgba(196,32,32,0.1)' : 'rgba(240,168,48,0.1)',borderRadius:'16px',padding:'28px',marginBottom:'16px',border:'1px solid ' + verdictColor + '40',textAlign:'center'}}>
<div style={{fontSize:'56px',marginBottom:'12px'}}>{verdictIcon}</div>
<h2 style={{color:verdictColor,fontSize:'24px',fontWeight:'800',marginBottom:'8px',textTransform:'uppercase'}}>
{result.status === 'halal' ? 'HALAL ✅' : result.status === 'haram' ? 'HARAM ❌' : 'DOUBTFUL ⚠️'}
</h2>
<p style={{color:'rgba(255,255,255,0.7)',fontSize:'14px',lineHeight:'1.7'}}>{result.explanation}</p>
</div>

{/* Haram Found */}
{result.haram_found?.length > 0 && (
<div style={{background:'rgba(196,32,32,0.1)',borderRadius:'12px',padding:'18px',marginBottom:'12px',border:'1px solid rgba(196,32,32,0.3)'}}>
<h3 style={{color:'#FF8070',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>❌ Haram Ingredients Found:</h3>
<div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
{result.haram_found.map((ing: string, i: number) => (
<span key={i} style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>{ing}</span>
))}
</div>
</div>
)}

{/* Doubtful Found */}
{result.doubtful_found?.length > 0 && (
<div style={{background:'rgba(240,168,48,0.1)',borderRadius:'12px',padding:'18px',marginBottom:'12px',border:'1px solid rgba(240,168,48,0.3)'}}>
<h3 style={{color:'#F0A830',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>⚠️ Doubtful Ingredients:</h3>
<div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
{result.doubtful_found.map((ing: string, i: number) => (
<span key={i} style={{background:'rgba(240,168,48,0.2)',color:'#F0A830',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>{ing}</span>
))}
</div>
</div>
)}

{/* All Ingredients */}
{result.ingredients?.length > 0 && (
<div style={{background:'#1A2035',borderRadius:'12px',padding:'18px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>📋 Detected Ingredients:</h3>
<div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
{result.ingredients.map((ing: string, i: number) => (
<span key={i} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.6)',padding:'3px 10px',borderRadius:'20px',fontSize:'11px'}}>{ing}</span>
))}
</div>
</div>
)}

{/* Advice */}
{result.advice && (
<div style={{background:'rgba(74,142,255,0.1)',borderRadius:'12px',padding:'16px',marginBottom:'16px',border:'1px solid rgba(74,142,255,0.2)'}}>
<p style={{color:'#4A8EFF',fontSize:'13px',fontWeight:'700',marginBottom:'6px'}}>💡 Advice:</p>
<p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>{result.advice}</p>
</div>
)}

<div style={{display:'flex',gap:'10px'}}>
<button onClick={reset} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:1}}>
🔄 Scan Again
</button>
<a href="/halal" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'14px',borderRadius:'8px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)',flex:1,textAlign:'center'}}>
🕌 Halal Guide
</a>
</div>
</div>
)}
</div>
)}
</div>
</main>
)
}

