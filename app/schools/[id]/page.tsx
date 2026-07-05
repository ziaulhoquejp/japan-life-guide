'use client'
import { useEffect, useState, use } from 'react'
import { supabase } from '../../../lib/supabase'

export default function SchoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [school, setSchool] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [newReview, setNewReview] = useState({rating: 5, comment: ''})
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  useEffect(() => {
    async function load() {
      const [schoolData, userData] = await Promise.all([
        supabase.from('schools').select('*').eq('id', id).single(),
        supabase.auth.getUser(),
      ])
      if (schoolData.data) setSchool(schoolData.data)
      if (userData.data.user) {
        setUser(userData.data.user)
        const { data: favData } = await supabase.from('favorites').select('id').eq('user_id', userData.data.user.id).eq('school_id', id).single()
        setIsFavorite(!!favData)
      }
      const { data: reviewData } = await supabase.from('reviews').select('*').eq('school_id', id).order('created_at', { ascending: false })
      if (reviewData) setReviews(reviewData)
      setLoading(false)
    }
    load()
  }, [id])

  async function toggleFavorite() {
    if (!user) { window.location.href = '/login'; return }
    if (isFavorite) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('school_id', id)
      setIsFavorite(false)
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, school_id: id })
      setIsFavorite(true)
    }
  }

  async function submitReview() {
    if (!user) { window.location.href = '/login'; return }
    setSubmittingReview(true)
    await supabase.from('reviews').insert({
      user_id: user.id,
      school_id: id,
      rating: newReview.rating,
      comment: newReview.comment,
    })
    setReviewSubmitted(true)
    setSubmittingReview(false)
    const { data } = await supabase.from('reviews').select('*').eq('school_id', id).order('created_at', { ascending: false })
    if (data) setReviews(data)
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>
  if (!school) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>School not found</div>

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum,r) => sum + r.rating, 0) / reviews.length).toFixed(1) : school.rating

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'linear-gradient(135deg,#1A2035,#0D1520)',padding:'32px 20px',borderBottom:'3px solid #C42020'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <a href="/schools" style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none',display:'inline-block',marginBottom:'16px'}}>← Back to Schools</a>

          {!school.data_verified && (
            <div style={{background:'rgba(240,168,48,0.1)',border:'1px solid rgba(240,168,48,0.3)',borderRadius:'8px',padding:'10px 14px',marginBottom:'14px',display:'flex',gap:'8px',alignItems:'flex-start'}}>
              <span style={{fontSize:'16px',flexShrink:0}}>⚠️</span>
              <p style={{color:'#F0A830',fontSize:'12px',margin:0,lineHeight:'1.6'}}>School information is for reference only. Please verify details directly with the school before applying.</p>
            </div>
          )}

          {school.data_verified && (
            <div style={{background:'rgba(46,200,122,0.1)',border:'1px solid rgba(46,200,122,0.3)',borderRadius:'8px',padding:'8px 14px',marginBottom:'14px',display:'flex',gap:'8px',alignItems:'center'}}>
              <span>✅</span>
              <p style={{color:'#2EC87A',fontSize:'12px',margin:0,fontWeight:'600'}}>Verified school data</p>
            </div>
          )}

          <div style={{display:'flex',gap:'16px',alignItems:'flex-start',flexWrap:'wrap'}}>
            <span style={{fontSize:'56px'}}>{school.icon || '🏫'}</span>
            <div style={{flex:1}}>
              <h1 style={{color:'white',fontSize:'24px',fontWeight:'700',marginBottom:'4px'}}>{school.name_en}</h1>
              {school.name_jp && <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'8px'}}>{school.name_jp}</p>}
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'12px'}}>
                <span style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.6)',padding:'4px 10px',borderRadius:'20px',fontSize:'12px'}}>📍 {school.city}</span>
                <span style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.6)',padding:'4px 10px',borderRadius:'20px',fontSize:'12px'}}>🗾 {school.region}</span>
                <span style={{background:'rgba(240,168,48,0.15)',color:'#F0A830',padding:'4px 10px',borderRadius:'20px',fontSize:'12px'}}>⭐ {avgRating}</span>
                {school.has_dorm && <span style={{background:'rgba(74,142,255,0.15)',color:'#4A8EFF',padding:'4px 10px',borderRadius:'20px',fontSize:'12px'}}>🏠 Dormitory</span>}
                {school.jlpt_prep && <span style={{background:'rgba(46,200,122,0.15)',color:'#2EC87A',padding:'4px 10px',borderRadius:'20px',fontSize:'12px'}}>📝 JLPT Prep</span>}
                {school.scholarship && <span style={{background:'rgba(168,85,247,0.15)',color:'#A855F7',padding:'4px 10px',borderRadius:'20px',fontSize:'12px'}}>🎓 Scholarship</span>}
              </div>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                <button onClick={toggleFavorite} style={{background: isFavorite ? 'rgba(196,32,32,0.2)' : 'rgba(255,255,255,0.08)',color: isFavorite ? '#FF8070' : 'white',border:'1px solid ' + (isFavorite ? 'rgba(196,32,32,0.3)' : 'rgba(255,255,255,0.15)'),borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
                  {isFavorite ? '❤️ Saved' : '🤍 Save School'}
                </button>
                <a href={'/apply?school=' + id} style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
                  Apply Now →
                </a>
                {school.website_url && (
                  <a href={school.website_url} target="_blank" rel="noopener noreferrer" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>
                    Official Website 🔗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {['overview','details','reviews','videos','apply'].map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {tab === 'overview' ? '📋 Overview' : tab === 'details' ? '📊 Details' : tab === 'reviews' ? `⭐ Reviews (${reviews.length})` : tab === 'videos' ? '🎥 Videos' : '📝 Apply'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && ({/* Videos Tab */}
{activeTab === 'videos' && (
<div>
<div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)',marginBottom:'16px'}}>
<h3 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>🎥 School Introduction Videos</h3>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'20px'}}>
Watch videos about {school.name_en} to learn more about campus life and facilities.
</p>
<div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
{[
{label:`${school.name_en} 学校紹介`, query:`${school.name_en} 学校紹介`},
{label:`${school.name_en} campus tour`, query:`${school.name_en} campus tour`},
{label:`${school.name_jp || school.name_en} 日本語学校`, query:`${school.name_jp || school.name_en} 日本語学校`},
].map((item, i) => (
<a key={i} href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.query)}`} target="_blank" rel="noopener noreferrer"
style={{background:'#0D0907',borderRadius:'10px',padding:'14px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',textDecoration:'none',border:'1px solid rgba(255,255,255,0.06)'}}>
<div style={{display:'flex',gap:'10px',alignItems:'center'}}>
<span style={{fontSize:'20px'}}>▶️</span>
<span style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{item.label}</span>
</div>
<span style={{color:'#FF0000',fontSize:'12px',fontWeight:'700'}}>YouTube →</span>
</a>
))}
</div>
<div style={{background:'rgba(255,0,0,0.1)',borderRadius:'10px',padding:'16px',border:'1px solid rgba(255,0,0,0.2)',textAlign:'center'}}>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>
🎥 Search for {school.name_en} videos on YouTube
</p>
<a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(school.name_en + ' japanese language school')}`}
target="_blank" rel="noopener noreferrer"
style={{background:'#FF0000',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>
🎥 Watch on YouTube
</a>
</div>
</div>
<div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'16px'}}>📺 Japan Study Guide Videos</h3>
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{[
{title:'How to apply for Student Visa', query:'japan student visa application process bangladesh nepal'},
{title:'Life in Japan as a foreign student', query:'life in japan as foreign student bangladesh nepal'},
{title:'Japanese language school guide', query:'japanese language school guide international students'},
{title:'Part-time jobs in Japan for students', query:'part time job japan international student'},
].map((item, i) => (
<a key={i} href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.query)}`}
target="_blank" rel="noopener noreferrer"
style={{background:'#0D0907',borderRadius:'8px',padding:'12px',display:'flex',gap:'10px',alignItems:'center',textDecoration:'none',border:'1px solid rgba(255,255,255,0.06)'}}>
<span style={{fontSize:'18px'}}>▶️</span>
<span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{item.title}</span>
</a>
))}
</div>
</div>
</div>
)}

          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px'}}>
              {[
                {label:'Annual Fee',value: school.annual_fee_jpy ? '¥' + school.annual_fee_jpy.toLocaleString() : 'Contact school',color:'#F0A830',icon:'💴'},
                {label:'Location',value: school.city + ', ' + school.region,color:'#4A8EFF',icon:'📍'},
                {label:'Rating',value: avgRating + ' / 5.0',color:'#F0A830',icon:'⭐'},
                {label:'Dormitory',value: school.has_dorm ? 'Available' : 'Not Available',color: school.has_dorm ? '#2EC87A' : '#FF8070',icon:'🏠'},
                {label:'JLPT Prep',value: school.jlpt_prep ? 'Yes' : 'No',color: school.jlpt_prep ? '#2EC87A' : '#FF8070',icon:'📝'},
                {label:'Scholarship',value: school.scholarship ? 'Available' : 'Not Available',color: school.scholarship ? '#2EC87A' : '#FF8070',icon:'🎓'},
              ].map(item => (
                <div key={item.label} style={{background:'#1A2035',borderRadius:'10px',padding:'14px',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px'}}>
                    <span>{item.icon}</span>
                    <span style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{item.label}</span>
                  </div>
                  <div style={{color:item.color,fontSize:'14px',fontWeight:'700'}}>{item.value}</div>
                </div>
              ))}
            </div>

            {school.address && (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'10px'}}>📍 Address</h3>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>{school.address}</p>
                <a href={'https://www.google.com/maps/search/' + encodeURIComponent(school.name_en + ' ' + school.city + ' Japan')} target="_blank" rel="noopener noreferrer" style={{color:'#4A8EFF',fontSize:'12px',textDecoration:'none',display:'inline-block',marginTop:'8px'}}>
                  View on Google Maps →
                </a>
              </div>
            )}

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>🔗 Quick Actions</h3>
              <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                <a href={'/apply?school=' + id} style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Apply Now</a>
                {school.website_url && <a href={school.website_url} target="_blank" rel="noopener noreferrer" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Visit Website</a>}
                <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura AI</a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>📊 School Details</h3>
              {[
                {label:'School Name (English)',value:school.name_en},
                {label:'School Name (Japanese)',value:school.name_jp || 'N/A'},
                {label:'City',value:school.city},
                {label:'Region',value:school.region},
                {label:'Annual Fee',value: school.annual_fee_jpy ? '¥' + school.annual_fee_jpy.toLocaleString() : 'Contact school'},
                {label:'Course Duration',value:school.course_duration || '1 year / 2 years'},
                {label:'Class Size',value:school.class_size || 'Contact school'},
                {label:'Accreditation',value:school.accreditation || 'MEXT Accredited'},
                {label:'Dormitory',value:school.has_dorm ? '✅ Available' : '❌ Not Available'},
                {label:'JLPT Preparation',value:school.jlpt_prep ? '✅ Yes' : '❌ No'},
                {label:'Scholarship',value:school.scholarship ? '✅ Available' : '❌ Not Available'},
                {label:'Data Status',value:school.data_verified ? '✅ Verified' : '⚠️ Reference only'},
              ].map(item => (
                <div key={item.label} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',flexWrap:'wrap',gap:'8px'}}>
                  <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>{item.label}</span>
                  <span style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{background:'rgba(240,168,48,0.1)',borderRadius:'12px',padding:'16px',border:'1px solid rgba(240,168,48,0.2)'}}>
              <p style={{color:'#F0A830',fontSize:'12px',lineHeight:'1.7'}}>
                ⚠️ Fee information shown is approximate. Contact the school directly for exact fees, course details, and enrollment requirements.
              </p>
              {school.website_url && (
                <a href={school.website_url} target="_blank" rel="noopener noreferrer" style={{color:'#F0A830',fontSize:'12px',fontWeight:'700',textDecoration:'none',display:'inline-block',marginTop:'8px'}}>
                  Visit Official Website →
                </a>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {!reviewSubmitted ? (
              <div style={{background:'#1A2035',borderRadius:'12px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <h3 style={{color:'white',fontSize:'15px',fontWeight:'700',marginBottom:'14px'}}>Write a Review</h3>
                <div style={{display:'flex',gap:'8px',marginBottom:'14px'}}>
                  {[1,2,3,4,5].map(star => (
                    <button key={star} onClick={()=>setNewReview(prev=>({...prev,rating:star}))} style={{background:'none',border:'none',fontSize:'24px',cursor:'pointer',color: star <= newReview.rating ? '#F0A830' : 'rgba(255,255,255,0.2)'}}>★</button>
                  ))}
                </div>
                <textarea value={newReview.comment} onChange={e=>setNewReview(prev=>({...prev,comment:e.target.value}))} placeholder="Share your experience with this school..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'13px',outline:'none',resize:'vertical',minHeight:'100px',marginBottom:'12px'}}/>
                <button onClick={submitReview} disabled={submittingReview||!user} style={{background:user?'#C42020':'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:user?'pointer':'not-allowed'}}>
                  {!user ? 'Sign in to review' : submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            ) : (
              <div style={{background:'rgba(46,200,122,0.1)',borderRadius:'12px',padding:'16px',textAlign:'center',border:'1px solid rgba(46,200,122,0.3)'}}>
                <p style={{color:'#2EC87A',fontWeight:'700'}}>✅ Review submitted! Thank you!</p>
              </div>
            )}

            {reviews.length === 0 ? (
              <div style={{textAlign:'center',padding:'32px',background:'#1A2035',borderRadius:'12px'}}>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No reviews yet. Be the first to review!</p>
              </div>
            ) : reviews.map(review => (
              <div key={review.id} style={{background:'#1A2035',borderRadius:'12px',padding:'18px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                  <span style={{color:'#F0A830'}}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                  <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px'}}>{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
                {review.comment && <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>{review.comment}</p>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'apply' && (
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
              <div style={{fontSize:'48px',marginBottom:'16px'}}>{school.icon || '🏫'}</div>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Apply to {school.name_en}</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'24px',lineHeight:'1.7'}}>
                Ready to start your Japan journey? Submit your application through Japan Life Guide.
              </p>
              <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
                <a href={'/apply?school=' + id} style={{background:'#C42020',color:'white',textDecoration:'none',padding:'14px 32px',borderRadius:'10px',fontSize:'15px',fontWeight:'700'}}>
                  Start Application →
                </a>
                {school.website_url && (
                  <a href={school.website_url} target="_blank" rel="noopener noreferrer" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'14px 32px',borderRadius:'10px',fontSize:'15px',border:'1px solid rgba(255,255,255,0.15)'}}>
                    Visit School Website
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}