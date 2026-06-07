'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function getData() {
      const { data } = await supabase
        .from('reviews')
        .select('*, schools(name_en, name_jp, city, icon, region)')
        .order('created_at', { ascending: false })
      if (data) setReviews(data)
      setLoading(false)
    }
    getData()
  }, [])

  const filtered = reviews.filter(r => {
    const matchFilter = filter === 'all' || r.rating === parseInt(filter)
    const matchSearch = !search || r.schools?.name_en.toLowerCase().includes(search.toLowerCase()) || r.comment.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0'
  const ratingCounts = [5,4,3,2,1].map(r => ({rating:r, count:reviews.filter(rev=>rev.rating===r).length}))

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>School Reviews</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Real reviews from Bangladesh and Nepal students</p>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)',display:'grid',gridTemplateColumns:'auto 1fr',gap:'32px',alignItems:'center'}}>
          <div style={{textAlign:'center'}}>
            <div style={{color:'#F0A830',fontSize:'64px',fontWeight:'800',lineHeight:1}}>{avgRating}</div>
            <div style={{color:'#F0A830',fontSize:'24px',marginBottom:'4px'}}>{'★'.repeat(Math.round(parseFloat(avgRating)))}{'☆'.repeat(5-Math.round(parseFloat(avgRating)))}</div>
            <div style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>{reviews.length} total reviews</div>
          </div>
          <div>
            {ratingCounts.map(({rating, count})=>(
              <div key={rating} style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'6px'}}>
                <span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',width:'20px'}}>{rating}★</span>
                <div style={{flex:1,height:'8px',background:'rgba(255,255,255,0.1)',borderRadius:'4px',overflow:'hidden'}}>
                  <div style={{height:'100%',width:reviews.length?((count/reviews.length)*100)+'%':'0%',background:'#F0A830',borderRadius:'4px'}}/>
                </div>
                <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',width:'20px'}}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:'flex',gap:'10px',marginBottom:'16px',flexWrap:'wrap'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search reviews..." style={{flex:1,minWidth:'200px',background:'#1A2035',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
          <div style={{display:'flex',gap:'6px'}}>
            {['all','5','4','3','2','1'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?'#C42020':'#1A2035',border:'none',borderRadius:'8px',padding:'8px 12px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                {f==='all'?'All':f+'★'}
              </button>
            ))}
          </div>
        </div>

        <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',marginBottom:'16px'}}>{filtered.length} reviews found</p>

        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          {filtered.map(review=>(
            <div key={review.id} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                <div style={{fontSize:'36px',flexShrink:0}}>{review.schools?.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
                    <div>
                      <a href={'/schools/' + review.school_id} style={{color:'white',fontSize:'15px',fontWeight:'700',textDecoration:'none'}}>{review.schools?.name_en}</a>
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'2px'}}>📍 {review.schools?.city} · {review.schools?.region}</p>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{color:'#F0A830',fontSize:'18px'}}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                      <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{new Date(review.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.7',marginBottom:'12px'}}>{review.comment}</p>
                  <a href={'/schools/' + review.school_id} style={{color:'#C42020',fontSize:'12px',textDecoration:'none',fontWeight:'600'}}>
                    View School Details →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'48px'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>⭐</div>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>No reviews found</h2>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'20px'}}>Be the first to review a school!</p>
            <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>Browse Schools</a>
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>Share Your Experience!</h3>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Visit any school page to write a review and help other students!</p>
          <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Browse Schools to Review</a>
        </div>
      </div>
    </main>
  )
}