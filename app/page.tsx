export default function Home() {
return (
<main style={{
minHeight: '100vh',
background: '#0D0907',
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
justifyContent: 'center',
fontFamily: 'sans-serif',
}}>

{/* 日の丸 */}
<div style={{
width: '100px',
height: '100px',
borderRadius: '50%',
background: '#C42020',
boxShadow: '0 0 60px rgba(196,32,32,0.6)',
marginBottom: '32px',
}}/>

{/* タイトル */}
<h1 style={{
color: 'white',
fontSize: '48px',
fontWeight: '700',
marginBottom: '8px',
textAlign: 'center',
}}>
Japan Life Guide
</h1>

{/* 日本語 */}
<p style={{
color: 'rgba(255,255,255,0.4)',
fontSize: '16px',
letterSpacing: '4px',
marginBottom: '48px',
}}>
日本生活ガイド
</p>

{/* ボタン */}
<div style={{
display: 'flex',
gap: '16px',
flexWrap: 'wrap',
justifyContent: 'center',
}}>
<button style={{
background: '#C42020',
color: 'white',
border: 'none',
padding: '16px 32px',
borderRadius: '8px',
fontSize: '16px',
fontWeight: '700',
cursor: 'pointer',
}}>
学校を探す 🏫
</button>

<button style={{
background: 'transparent',
color: 'white',
border: '1px solid rgba(255,255,255,0.3)',
padding: '16px 32px',
borderRadius: '8px',
fontSize: '16px',
cursor: 'pointer',
}}>
ビザガイド 🛂
</button>
</div>

{/* 統計 */}
<div style={{
display: 'flex',
gap: '48px',
marginTop: '64px',
flexWrap: 'wrap',
justifyContent: 'center',
}}>
{[
['800+', '語学学校'],
['14K+', 'コミュニティ'],
['4', '言語対応'],
['47', '都道府県'],
].map(([num, label]) => (
<div key={label} style={{ textAlign: 'center' }}>
<div style={{
color: '#C8900A',
fontSize: '32px',
fontWeight: '700',
}}>
{num}
</div>
<div style={{
color: 'rgba(255,255,255,0.4)',
fontSize: '12px',
marginTop: '4px',
}}>
{label}
</div>
</div>
))}
</div>

</main>
)
}