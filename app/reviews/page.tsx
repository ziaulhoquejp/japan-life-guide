'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [ratingFilter, setRatingFilter] = useState(0)
  const [sortBy, setSortBy] = useState('recent')

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('reviews')
        .select('*, schools(name_en, city, icon)')
        .order('created_at', { ascending: false })
      if (data) setReviews(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = reviews
    .filter(r => !search || r.schools?.name_en?.toLowerCase().includes(search.toLowerCase()) || r.comment?.toLowerCase().includes(search.toLowerCase()))
    .filter(r => ratingFilter === 0 || r.rating === ratingFilter)
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      if (sortBy === 'highest') return b.rating - a.rating
      if (sortBy === 'lowest') return a.rating - b.rating
      return 0
    })

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0.0'

  const ratingCounts = [5,4,3,2,1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percent: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0,
  }))

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>School Reviews</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px'}}>Read honest reviews from students who attended Japanese language schools</p>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Rating Breakdown */}
        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',gap:'24px',alignItems:'center',flexWrap:'wrap'}}>
            <div style={{textAlign:'center'}}>
              <div style={{color:'#F0A830',fontSize:'40px',fontWeight:'800'}}>{avgRating}</div>
              <div style={{color:'#F0A830',fontSize:'16px',marginBottom:'4px'}}>{'★'.repeat(Math.round(Number(avgRating)))}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>{reviews.length} reviews</div>
            </div>
            <div style={{flex:1,minWidth:'200px'}}>
              {ratingCounts.map(r => (
                <div key={r.star} onClick={()=>setRatingFilter(ratingFilter === r.star ? 0 : r.star)} style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px',cursor:'pointer'}}>
                  <span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',width:'40px'}}>{r.star} ★</span>
                  <div style={{flex:1,height:'8px',background:'rgba(255,255,255,0.08)',borderRadius:'4px',overflow:'hidden'}}>
                    <div style={{width:r.percent+'%',height:'100%',background:'#F0A830',borderRadius:'4px'}}/>
                  </div>
                  <span style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',width:'24px'}}>{r.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{display:'flex',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search reviews or schools..." style={{flex:1,minWidth:'200px',background:'#1A2035',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        {ratingFilter > 0 && (
          <div style={{marginBottom:'16px'}}>
            <span style={{background:'rgba(240,168,48,0.2)',color:'#F0A830',padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'600',display:'inline-flex',gap:'6px',alignItems:'center'}}>
              {ratingFilter} ★ only
              <button onClick={()=>setRatingFilter(0)} style={{background:'none',border:'none',color:'#F0A830',cursor:'pointer',fontSize:'12px'}}>✕</button>
            </span>
          </div>
        )}

        {/* Reviews List */}
        {filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'48px',background:'#1A2035',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>⭐</div>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No reviews found matching your filters</p>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {filtered.map(review => (
              <div key={review.id} style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px',flexWrap:'wrap',gap:'8px'}}>
                  <a href={'/schools/' + review.school_id} style={{display:'flex',gap:'10px',alignItems:'center',textDecoration:'none'}}>
                    <span style={{fontSize:'24px'}}>{review.schools?.icon || '🏫'}</span>
                    <div>
                      <div style={{color:'white',fontSize:'13px',fontWeight:'700'}}>{review.schools?.name_en}</div>
                      <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{review.schools?.city}</div>
                    </div>
                  </a>
                  <div style={{textAlign:'right'}}>
                    <div style={{color:'#F0A830',fontSize:'14px'}}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                    <div style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{new Date(review.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                {review.comment && (
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Attended a school? Share your experience!</p>
          <a href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Find Your School to Review</a>
        </div>
      </div>
    </main>
  )
}