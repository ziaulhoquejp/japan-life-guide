'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [schools, setSchools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSchool, setSelectedSchool] = useState('all')
  const [selectedRating, setSelectedRating] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [helpfulVotes, setHelpfulVotes] = useState<string[]>([])

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (userData.user) setUser(userData.user)

      const [reviewsData, schoolsData] = await Promise.all([
        supabase.from('reviews')
          .select('*, schools(name_en, name_jp, city, icon)')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase.from('schools')
          .select('id, name_en, city')
          .eq('data_verified', true)
          .order('rating', { ascending: false })
          .limit(50),
      ])

      if (reviewsData.data) setReviews(reviewsData.data)
      if (schoolsData.data) setSchools(schoolsData.data)
      setLoading(false)
    }
    load()
  }, [])

  async function markHelpful(reviewId: string) {
    if (!user) { window.location.href = '/login'; return }
    if (helpfulVotes.includes(reviewId)) return
    setHelpfulVotes(prev => [...prev, reviewId])
    setReviews(prev => prev.map(r => r.id === reviewId ? {...r, helpful: (r.helpful || 0) + 1} : r))
  }

  const filtered = reviews.filter(r => {
    const matchSchool = selectedSchool === 'all' || r.school_id === selectedSchool
    const matchRating = selectedRating === 0 || r.rating === selectedRating
    return matchSchool && matchRating
  })

  const avgRating = filtered.length > 0
    ? (filtered.reduce((sum, r) => sum + r.rating, 0) / filtered.length).toFixed(1)
    : '0.0'

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: filtered.filter(r => r.rating === star).length,
    percent: filtered.length > 0 ? Math.round((filtered.filter(r => r.rating === star).length / filtered.length) * 100) : 0,
  }))

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>⭐ School Reviews</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'8px'}}>Real reviews from Bangladesh and Nepal students</p>
        <div style={{display:'inline-flex',gap:'12px',flexWrap:'wrap',justifyContent:'center'}}>
          <span style={{background:'rgba(240,168,48,0.2)',color:'#F0A830',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>⭐ {avgRating} Average Rating</span>
          <span style={{background:'rgba(74,142,255,0.2)',color:'#4A8EFF',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>📝 {filtered.length} Reviews</span>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>

        {/* Rating Summary */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'24px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'24px',alignItems:'center'}}>
            <div style={{textAlign:'center'}}>
              <div style={{color:'#F0A830',fontSize:'56px',fontWeight:'800',lineHeight:'1'}}>{avgRating}</div>
              <div style={{color:'#F0A830',fontSize:'20px',marginTop:'8px'}}>{'★'.repeat(Math.round(parseFloat(avgRating)))}{'☆'.repeat(5-Math.round(parseFloat(avgRating)))}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'4px'}}>{filtered.length} reviews</div>
            </div>
            <div>
              {ratingCounts.map(({star, count, percent}) => (
                <div key={star} style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'6px'}}>
                  <span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',width:'20px'}}>{star}★</span>
                  <div style={{flex:1,height:'8px',background:'rgba(255,255,255,0.1)',borderRadius:'4px',overflow:'hidden'}}>
                    <div style={{width:percent+'%',height:'100%',background:'#F0A830',borderRadius:'4px',transition:'width 0.5s'}}/>
                  </div>
                  <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',width:'30px'}}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{display:'flex',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
          <select value={selectedSchool} onChange={e=>setSelectedSchool(e.target.value)} style={{background:'#1A2035',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'8px 12px',color:'white',fontSize:'13px',outline:'none'}}>
            <option value="all">All Schools</option>
            {schools.map(s => (
              <option key={s.id} value={s.id}>{s.name_en} - {s.city}</option>
            ))}
          </select>

          <div style={{display:'flex',gap:'6px'}}>
            {[0,5,4,3,2,1].map(star => (
              <button key={star} onClick={()=>setSelectedRating(star)} style={{background:selectedRating===star?'rgba(240,168,48,0.2)':'#1A2035',border:'1px solid '+(selectedRating===star?'#F0A830':'rgba(255,255,255,0.1)'),borderRadius:'8px',padding:'8px 12px',color:selectedRating===star?'#F0A830':'rgba(255,255,255,0.5)',fontSize:'12px',cursor:'pointer'}}>
                {star === 0 ? 'All' : `${star}★`}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        {filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'48px',background:'#1A2035',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>No reviews yet!</p>
            <Link href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>
              Browse Schools & Review 🏫
            </Link>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {filtered.map(review => (
              <div key={review.id} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                {/* School Info */}
                {review.schools && (
                  <Link href={`/schools/${review.school_id}`} style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'14px',textDecoration:'none'}}>
                    <span style={{fontSize:'24px'}}>{review.schools.icon || '🏫'}</span>
                    <div>
                      <p style={{color:'#C42020',fontSize:'13px',fontWeight:'700'}}>{review.schools.name_en}</p>
                      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>📍 {review.schools.city}</p>
                    </div>
                  </Link>
                )}

                {/* Rating & Date */}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                  <div style={{color:'#F0A830',fontSize:'18px'}}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                  </div>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>
                    {new Date(review.created_at).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'})}
                  </span>
                </div>

                {/* Comment */}
                <p style={{color:'rgba(255,255,255,0.7)',fontSize:'14px',lineHeight:'1.7',marginBottom:'14px'}}>
                  {review.comment || 'No comment provided.'}
                </p>

                {/* Helpful */}
                <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                  <button onClick={()=>markHelpful(review.id)} disabled={helpfulVotes.includes(review.id)} style={{background: helpfulVotes.includes(review.id) ? 'rgba(46,200,122,0.2)' : 'rgba(255,255,255,0.06)',border:'1px solid '+(helpfulVotes.includes(review.id)?'rgba(46,200,122,0.4)':'rgba(255,255,255,0.1)'),borderRadius:'20px',padding:'4px 12px',color: helpfulVotes.includes(review.id)?'#2EC87A':'rgba(255,255,255,0.4)',fontSize:'12px',cursor: helpfulVotes.includes(review.id)?'default':'pointer'}}>
                    👍 Helpful {review.helpful ? `(${review.helpful})` : ''}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Write Review CTA */}
        <div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.15),rgba(196,32,32,0.05))',borderRadius:'14px',padding:'24px',marginTop:'24px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
          <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>Share Your Experience! 🌸</h3>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'16px'}}>Help other students from Bangladesh and Nepal choose the right school</p>
          <Link href="/schools" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>
            Write a Review ⭐
          </Link>
        </div>
      </div>
    </main>
  )
}