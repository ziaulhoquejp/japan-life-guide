'use client'
import { useState } from 'react'

export default function RecruitPage() {
const [step, setStep] = useState(1)
const [submitting, setSubmitting] = useState(false)
const [submitted, setSubmitted] = useState(false)
const [form, setForm] = useState({
companyName: '',
companyNameJP: '',
contactName: '',
email: '',
phone: '',
industry: '',
location: '',
jobType: '',
salary: '',
japaneseRequired: '',
numberOfPositions: '',
jobDescription: '',
requirements: '',
benefits: '',
})

function update(field: string, value: string) {
setForm(prev => ({...prev, [field]: value}))
}

async function handleSubmit() {
setSubmitting(true)
try {
await fetch('/api/company-register', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(form),
})
setSubmitted(true)
} catch (error) {
console.error(error)
}
setSubmitting(false)
}

if (submitted) {
return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
<div style={{background:'#1A2035',borderRadius:'16px',padding:'40px',maxWidth:'500px',textAlign:'center',border:'1px solid rgba(46,200,122,0.3)'}}>
<div style={{fontSize:'56px',marginBottom:'16px'}}>🎉</div>
<h2 style={{color:'#2EC87A',fontSize:'22px',fontWeight:'700',marginBottom:'8px'}}>求人掲載申請を受け付けました！</h2>
<p style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>Application Received!</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px',lineHeight:'1.7'}}>
担当者より2営業日以内にご連絡いたします。<br/>
Our team will contact you within 2 business days.
</p>
<a href="/" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 28px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>
Back to Home
</a>
</div>
</main>
)
}

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
<h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>求人掲載・採用支援</h1>
<p style={{color:'white',fontSize:'18px',fontWeight:'600',marginBottom:'8px'}}>Post a Job / Recruit Foreign Workers</p>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'12px'}}>バングラデシュ・ネパール人材のご紹介 · Licensed Recruitment Agency</p>
<div style={{display:'inline-flex',gap:'16px',flexWrap:'wrap',justifyContent:'center'}}>
<span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>✅ 有料職業紹介許可取得済み</span>
<span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>✅ 登録支援機関許可取得済み</span>
</div>
</div>

<div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>

{/* Benefits for Companies */}
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px',marginBottom:'32px'}}>
{[
{icon:'🌏',title:'多国籍人材',desc:'バングラデシュ・ネパール優秀人材をご紹介'},
{icon:'🛂',title:'ビザサポート',desc:'在留資格手続きを全面サポート'},
{icon:'🌸',title:'登録支援',desc:'入国後の生活・就労サポート対応'},
{icon:'💴',title:'成功報酬型',desc:'採用が決まってからのお支払い'},
].map((item,i) => (
<div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
<div style={{fontSize:'28px',marginBottom:'8px'}}>{item.icon}</div>
<div style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{item.title}</div>
<div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',lineHeight:'1.5'}}>{item.desc}</div>
</div>
))}
</div>

{/* Progress */}
<div style={{display:'flex',gap:'8px',marginBottom:'24px'}}>
{[1,2,3].map(s => (
<div key={s} style={{flex:1,height:'4px',borderRadius:'2px',background: s <= step ? '#C42020' : 'rgba(255,255,255,0.1)'}}/>
))}
</div>

<div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>

{/* Step 1: Company Info */}
{step === 1 && (
<div>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'6px'}}>1. 会社情報 / Company Information</h2>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'20px'}}>Step 1 of 3</p>
<div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>会社名（日本語）Company Name (Japanese)</label>
<input value={form.companyNameJP} onChange={e=>update('companyNameJP', e.target.value)} placeholder="株式会社〇〇" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>Company Name (English)</label>
<input value={form.companyName} onChange={e=>update('companyName', e.target.value)} placeholder="ABC Co., Ltd." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>担当者名 Contact Person Name</label>
<input value={form.contactName} onChange={e=>update('contactName', e.target.value)} placeholder="山田 太郎" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>メールアドレス Email *</label>
<input value={form.email} onChange={e=>update('email', e.target.value)} placeholder="hr@company.co.jp" type="email" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>電話番号 Phone</label>
<input value={form.phone} onChange={e=>update('phone', e.target.value)} placeholder="03-XXXX-XXXX" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>所在地 Location</label>
<input value={form.location} onChange={e=>update('location', e.target.value)} placeholder="東京都新宿区" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
</div>
<button onClick={()=>{
if (!form.email) return
setStep(2)
}} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',width:'100%'}}>
次へ Continue →
</button>
</div>
)}

{/* Step 2: Job Details */}
{step === 2 && (
<div>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'6px'}}>2. 求人情報 / Job Details</h2>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'20px'}}>Step 2 of 3</p>
<div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>業種 Industry</label>
<select value={form.industry} onChange={e=>update('industry', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">選択してください...</option>
<option value="製造業">製造業 Manufacturing</option>
<option value="飲食業">飲食業 Food Service</option>
<option value="介護">介護 Nursing Care</option>
<option value="建設業">建設業 Construction</option>
<option value="IT・テクノロジー">IT・テクノロジー</option>
<option value="農業">農業 Agriculture</option>
<option value="宿泊業">宿泊業 Lodging</option>
<option value="その他">その他 Other</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>雇用形態 Job Type</label>
<select value={form.jobType} onChange={e=>update('jobType', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">選択してください...</option>
<option value="SSW特定技能1号">特定技能1号 SSW Type 1</option>
<option value="SSW特定技能2号">特定技能2号 SSW Type 2</option>
<option value="技術・人文知識・国際業務">技術・人文知識・国際業務</option>
<option value="正社員">正社員 Full-time</option>
<option value="アルバイト">アルバイト Part-time</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>給与 Salary</label>
<input value={form.salary} onChange={e=>update('salary', e.target.value)} placeholder="月給 200,000円〜" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>日本語要件 Japanese Required</label>
<select value={form.japaneseRequired} onChange={e=>update('japaneseRequired', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}>
<option value="">選択してください...</option>
<option value="不問">不問 Not required</option>
<option value="N5程度">N5程度</option>
<option value="N4以上">N4以上</option>
<option value="N3以上">N3以上</option>
<option value="N2以上">N2以上</option>
</select>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>募集人数 Number of Positions</label>
<input value={form.numberOfPositions} onChange={e=>update('numberOfPositions', e.target.value)} placeholder="5名" style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none'}}/>
</div>
</div>
<div style={{display:'flex',gap:'10px'}}>
<button onClick={()=>setStep(1)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',cursor:'pointer',flex:1}}>← 戻る Back</button>
<button onClick={()=>setStep(3)} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:2}}>次へ Continue →</button>
</div>
</div>
)}

{/* Step 3: Details */}
{step === 3 && (
<div>
<h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'6px'}}>3. 詳細情報 / Additional Details</h2>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'20px'}}>Step 3 of 3</p>
<div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>仕事内容 Job Description</label>
<textarea value={form.jobDescription} onChange={e=>update('jobDescription', e.target.value)} placeholder="仕事内容を詳しく記載してください..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'100px'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>応募要件 Requirements</label>
<textarea value={form.requirements} onChange={e=>update('requirements', e.target.value)} placeholder="必要なスキル・経験・資格など..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'80px'}}/>
</div>
<div>
<label style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',display:'block',marginBottom:'6px'}}>待遇・福利厚生 Benefits</label>
<textarea value={form.benefits} onChange={e=>update('benefits', e.target.value)} placeholder="社会保険完備、寮あり、交通費支給など..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'80px'}}/>
</div>
</div>

<div style={{background:'rgba(240,168,48,0.1)',borderRadius:'10px',padding:'14px',marginBottom:'16px',border:'1px solid rgba(240,168,48,0.2)'}}>
<p style={{color:'#F0A830',fontSize:'12px',lineHeight:'1.7'}}>
⚠️ 送信後、担当者より2営業日以内にご連絡いたします。<br/>
成功報酬型のため、採用が決まるまで費用は一切かかりません。
</p>
</div>

<div style={{display:'flex',gap:'10px'}}>
<button onClick={()=>setStep(2)} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',cursor:'pointer',flex:1}}>← 戻る</button>
<button onClick={handleSubmit} disabled={submitting} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'14px',fontWeight:'700',cursor:'pointer',flex:2}}>
{submitting ? '送信中...' : '求人を申請する 🌸'}
</button>
</div>
</div>
)}
</div>

<div style={{background:'rgba(255,255,255,0.04)',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.06)'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'8px'}}>お急ぎの場合はメールまたはお電話でお問い合わせください</p>
<p style={{color:'white',fontSize:'14px',fontWeight:'600'}}>📧 hello@japanlifeguide.app</p>
</div>
</div>
</main>
)
}