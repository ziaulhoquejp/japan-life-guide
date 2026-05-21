'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
  const [school, setSchool] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function getData() {
      const [schoolData, reviewsData, userData] = await Promise.all([
        supabase.from('schools').select('*').eq('id', params.id).single(),
        supabase.from('reviews').select('*').eq('school_id', params.id).order('created_at', { ascending: false }),
        supabase.auth.getUser(),
      ])
      if (schoolData.data) setSchool(schoolData.data)
      if (reviewsData.data) setReviews(reviewsData.data)
      if (userData.data.user) setUser(userData.data.user)
      setLoading(false)
    }
    getData()
  }, [params.id])

  async function submitReview() {
    if (!user) { window.location.href = '/login'; return }
    setSubmitting(true)
    await supabase.from('reviews').insert({
      user_id: user.id,
      school_id: params.id,
      rating,
      comment,
    })
    const { data } = await supabase.from('reviews').select('*').eq('school_id', params.id).order('created_at', { ascending: false })
    if (data) setReviews(data)
    setComment('')
    setSubmitted(true)
    setSubmitting(false)
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>
  if (!school) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Not found</div>

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : school.rating

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <a href="/schools" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none',display:'block',marginBottom:'24px'}}>Back to Schools</a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',flexWrap:'wrap'}}>
          <div style={{fontSize:'64px'}}>{school.icon}</div>
          <div>
            <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'4px'}}>{school.name_en}</h1>
            <p style={{color:'#C42020',fontSize:'14px',marginBottom:'8px'}}>{school.name_jp}</p>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Location: {school.city}</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'40px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:'12px',marginBottom:'32px'}}>
          {[
            {label:'Annual Fee',value:'Yen ' + school.annual_fee_jpy.toLocaleString(),color:'#F0A830'},
            {label:'Rating',value:avgRating + ' stars',color:'#F0A830'},
            {label:'Region',value:school.region,color:'#4A8EFF'},
            {label:'Reviews',value:reviews.length + ' reviews',color:'#2EC87A'},
          ].map(stat=>(
            <div key={stat.label} style={{background:'#1A2035',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
              <div style={{color:stat.color,fontSize:'16px',fontWeight:'700'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'4px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'32px'}}>
          {school.has_dorm && <span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'6px 12px',borderRadius:'6px',fontSize:'13px'}}>Dormitory</span>}
          {school.jlpt_prep && <span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'6px 12px',borderRadius:'6px',fontSize:'13px'}}>JLPT Prep</span>}
          {school.scholarship && <span style={{background:'rgba(240,168,48,0.1)',color:'#F0A830',padding:'6px 12px',borderRadius:'6px',fontSize:'13px'}}>Scholarship</span>}
        </div>

        <div style={{display:'flex',gap:'12px',flexWrap:'wrap',marginBottom:'32px'}}>
          <button style={{background:'#C42020',color:'white',border:'none',borderRadius:'10px',padding:'14px 28px',fontSize:'15px',fontWeight:'700',cursor:'pointer'}}>
            Apply Now
          </button>
          <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'14px 28px',fontSize:'15px',textDecoration:'none'}}>
            Ask Sakura
          </a>
          <a href={'/compare?school=' + school.id} style={{background:'rgba(255,255,255,0.08)',color:'white',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'10px',padding:'14px 28px',fontSize:'15px',textDecoration:'none'}}>
            Compare
          </a>
        </div>

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginBottom:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>
            Reviews ({reviews.length})
          </h2>
          {reviews.length === 0 ? (
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No reviews yet. Be the first to review!</p>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {reviews.map(review=>(
                <div key={review.id} style={{background:'#0D0907',borderRadius:'8px',padding:'14px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                    <div style={{color:'#F0A830',fontSize:'16px'}}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                    </div>
                    <span style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                  <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.6'}}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {!submitted ? (
          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Write a Review</h2>
            <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
              {[1,2,3,4,5].map(star=>(
                <button key={star} onClick={()=>setRating(star)} style={{background:'none',border:'none',fontSize:'28px',cursor:'pointer',color:rating>=star?'#F0A830':'rgba(255,255,255,0.2)'}}>
                  ★
                </button>
              ))}
            </div>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Share your experience with this school..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'100px',marginBottom:'12px'}}/>
            <button onClick={submitReview} disabled={submitting||!comment.trim()} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        ) : (
          <div style={{background:'rgba(46,200,122,0.1)',border:'1px solid rgba(46,200,122,0.3)',borderRadius:'12px',padding:'24px',textAlign:'center'}}>
            <p style={{color:'#2EC87A',fontSize:'16px',fontWeight:'700'}}>Thank you for your review!</p>
          </div>
        )}
      </div>
    </main>
  )
}