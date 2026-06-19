'use client'
import { useEffect, useState } from 'react'

const OFFICIAL_LINKS = [
  {name:'Immigration Services Agency',url:'https://www.moj.go.jp/isa/',desc:'Official visa and immigration updates',icon:'🏛'},
  {name:'JASSO',url:'https://www.jasso.or.jp/en/',desc:'Study in Japan official information',icon:'🎓'},
  {name:'MEXT',url:'https://www.mext.go.jp/en/',desc:'Ministry of Education announcements',icon:'📚'},
  {name:'MHLW (Labor)',url:'https://www.mhlw.go.jp/english/',desc:'Work visa and labor policy updates',icon:'💼'},
]

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [savedArticles, setSavedArticles] = useState<string[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/news')
      const data = await res.json()
      if (data.articles) {
        setArticles(data.articles)
      } else {
        setError(true)
      }
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  function toggleSave(url: string) {
    setSavedArticles(prev =>
      prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
    )
  }

  function timeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  function isUrgent(title: string) {
    const urgentWords = ['deadline', 'urgent', 'closing', 'last day', 'breaking', 'alert']
    return urgentWords.some(word => title.toLowerCase().includes(word))
  }

  const filtered = filter === 'saved'
    ? articles.filter(a => savedArticles.includes(a.url))
    : filter === 'urgent'
    ? articles.filter(a => isUrgent(a.title))
    : articles

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Japan News & Updates</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Live news about visas, immigration, and studying in Japan</p>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>

        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {[
              {key:'all',label:'All News'},
              {key:'urgent',label:'⚠️ Urgent'},
              {key:'saved',label:'🔖 Saved'},
            ].map(f=>(
              <button key={f.key} onClick={()=>setFilter(f.key)} style={{background:filter===f.key?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                {f.label}
              </button>
            ))}
          </div>
          <button onClick={fetchNews} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'8px 16px',color:'white',fontSize:'12px',cursor:'pointer'}}>
            🔄 Refresh
          </button>
        </div>

        {loading && (
          <div style={{textAlign:'center',padding:'60px'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🌸</div>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Loading latest news...</p>
          </div>
        )}

        {error && !loading && (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'32px',textAlign:'center',border:'1px solid rgba(196,32,32,0.2)'}}>
            <p style={{color:'#FF8070',fontSize:'14px',marginBottom:'16px'}}>Unable to load news right now. Please check the official sources below.</p>
            <button onClick={fetchNews} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>Try Again</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'48px'}}>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No articles found for this filter.</p>
          </div>
        )}

        {!loading && !error && (
          <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'32px'}}>
            {filtered.map((article, i) => (
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid ' + (isUrgent(article.title)?'rgba(196,32,32,0.3)':'rgba(255,255,255,0.08)')}}>
                <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'10px',flexWrap:'wrap'}}>
                  {isUrgent(article.title) && (
                    <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>⚠️ URGENT</span>
                  )}
                  <span style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{article.source?.name}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',marginLeft:'auto'}}>{timeAgo(article.publishedAt)}</span>
                </div>

                <h2 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'8px',lineHeight:'1.5'}}>{article.title}</h2>

                {article.description && (
                  <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6',marginBottom:'14px'}}>
                    {article.description.slice(0,150)}{article.description.length > 150 ? '...' : ''}
                  </p>
                )}

                <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'700'}}>
                    Read Full Article →
                  </a>
                  <button onClick={()=>toggleSave(article.url)} style={{background:'none',border:'none',color:savedArticles.includes(article.url)?'#F0A830':'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:'18px'}}>
                    {savedArticles.includes(article.url) ? '🔖' : '📑'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Official Sources */}
        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>🏛 Official Government Sources</h2>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'16px'}}>Always verify important visa and immigration information with official sources</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'10px'}}>
            {OFFICIAL_LINKS.map((link,i)=>(
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{background:'#0D0907',borderRadius:'10px',padding:'14px',textDecoration:'none',display:'flex',gap:'10px',alignItems:'center',border:'1px solid rgba(255,255,255,0.06)'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.3)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.06)')}>
                <span style={{fontSize:'24px'}}>{link.icon}</span>
                <div>
                  <div style={{color:'white',fontSize:'12px',fontWeight:'700'}}>{link.name}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'10px'}}>{link.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Have questions about recent news or policy changes?</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}