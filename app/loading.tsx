export default function Loading() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',flexDirection:'column',gap:'20px'}}>
      <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'#C42020',boxShadow:'0 0 40px rgba(196,32,32,0.6)',animation:'pulse 1.5s infinite'}}/>
      <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',letterSpacing:'2px'}}>
        Loading... 🌸
      </p>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </main>
  )
}