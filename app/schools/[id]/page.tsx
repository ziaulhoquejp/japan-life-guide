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
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    async function getData() {
      const [schoolData, reviewsData, userData] = await Promise.all([
        supabase.from('schools').select('*').eq('id', params.id).single(),
        supabase.from('reviews').select('*').eq('school_id', params.id).order('created_at', { ascending: false }),
        supabase.auth.getUser(),
      ])
      if (schoolData.data) setSchool(schoolData.data)
      if (reviewsData.data) setReviews(reviewsData.data)
      if (userData.data.user) {
        setUser(userData.data.user)
        const { data: favData } = await supabase.from('favorites').select('id').eq('user_id', userData.data.user.id).eq('school_id', params.id).single()
        if (favData) setIsFavorite(true)
      }
      setLoading(false)
    }
    getData()
  }, [params.id])

  async function toggleFavorite() {
    if (!user) { window.location.href = '/login'; return }
    if (isFavorite) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('school_id', params.id)
      setIsFavorite(false)
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, school_id: params.id })
      setIsFavorite(true)
    }
  }

  async function submitReview() {
    if (!user) { window.location.href = '/login'; return }
    setSubmitting(true)
    await supabase.from('reviews').insert({ user_id: user.id, school_id: params.id, rating, comment })
    const { data } = await supabase.from('reviews').select('*').eq('school_id', params.id).order('created_at', { ascending: false })
    if (data) setReviews(data)
    setComment('')
    setSubmitted(true)
    setSubmitting(false)
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Loading...</div>
  if (!school) return <div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'24px'}}>Not found</div>

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : school.rating

  const tabs = ['overview', 'reviews', 'requirements', 'location']

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020'}}>
        <a href="/schools" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none',display:'block',marginBottom:'20px',fontSize:'13px'}}>← Back to Schools</a>
        <div style={{display:'flex',gap:'20px',alignItems:'flex-start',flexWrap:'wrap'}}>
          <div style={{fontSize:'72px',flexShrink:0}}>{school.icon}</div>
          <div style={{flex:1}}>
            <h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>{school.name_en}</h1>
            <p style={{color:'#C42020',fontSize:'14px',marginBottom:'8px',letterSpacing:'1px'}}>{school.name_jp}</p>
            <div style={{display:'flex',gap:'12px',flexWrap:'wrap',marginBottom:'12px'}}>
              <span style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>📍 {school.city}</span>
              <span style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>🗾 {school.region}</span>
              <span style={{color:'#F0A830',fontSize:'13px'}}>⭐ {avgRating} ({reviews.length} reviews)</span>
            </div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {school.has_dorm && <span style={{background:'rgba(46,200,122,0.1)',color:'#2EC87A',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>🛏 Dormitory</span>}
              {school.jlpt_prep && <span style={{background:'rgba(74,142,255,0.1)',color:'#4A8EFF',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>📝 JLPT Prep</span>}
              {school.scholarship && <span style={{background:'rgba(240,168,48,0.1)',color:'#F0A830',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>🎓 Scholarship</span>}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'8px',flexShrink:0}}>
            <button onClick={toggleFavorite} style={{background:isFavorite?'rgba(196,32,32,0.2)':'rgba(255,255,255,0.08)',color:isFavorite?'#FF8070':'white',border:'1px solid ' + (isFavorite?'#C42020':'rgba(255,255,255,0.2)'),borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
              {isFavorite ? '❤️ Saved' : '🤍 Save'}
            </button>
            <a href={'/applications'} style={{background:'#C42020',color:'white',textDecoration:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',fontWeight:'700',textAlign:'center'}}>
              Apply Now
            </a>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:'12px',marginBottom:'28px'}}>
          {[
            {label:'Annual Fee',value:'¥' + school.annual_fee_jpy.toLocaleString(),color:'#F0A830'},
            {label:'Monthly Fee',value:'¥' + Math.round(school.annual_fee_jpy/12).toLocaleString(),color:'#F0A830'},
            {label:'Rating',value:'⭐ ' + avgRating,color:'#F0A830'},
            {label:'Reviews',value:reviews.length + ' reviews',color:'#2EC87A'},
            {label:'Region',value:school.region,color:'#4A8EFF'},
            {label:'Status',value:'Accepting',color:'#2EC87A'},
          ].map(stat=>(
            <div key={stat.label} style={{background:'#1A2035',borderRadius:'10px',padding:'14px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{color:stat.color,fontSize:'15px',fontWeight:'700',marginBottom:'4px'}}>{stat.value}</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {tabs.map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:activeTab===tab?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 18px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>About This School</h2>
              <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.8'}}>
                {school.name_en} is a Japanese language school located in {school.city}, {school.region} region of Japan.
                The school offers comprehensive Japanese language education designed for international students.
                {school.jlpt_prep && ' JLPT preparation courses are available for all levels from N5 to N1.'}
                {school.has_dorm && ' Dormitory accommodation is available for students.'}
                {school.scholarship && ' Scholarship opportunities are available for eligible students.'}
              </p>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>School Features</h2>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                {[
                  {icon:'🛏',label:'Dormitory',val:school.has_dorm},
                  {icon:'📝',label:'JLPT Preparation',val:school.jlpt_prep},
                  {icon:'🎓',label:'Scholarship Available',val:school.scholarship},
                  {icon:'✅',label:'MEXT Accredited',val:true},
                  {icon:'🌍',label:'International Students',val:true},
                  {icon:'📚',label:'Small Class Sizes',val:true},
                  {icon:'💼',label:'Job Support',val:true},
                  {icon:'🏥',label:'Health Insurance Help',val:true},
                ].map(f=>(
                  <div key={f.label} style={{display:'flex',gap:'10px',alignItems:'center',padding:'10px',background:'#0D0907',borderRadius:'8px'}}>
                    <span style={{fontSize:'18px'}}>{f.icon}</span>
                    <span style={{color:f.val?'white':'rgba(255,255,255,0.3)',fontSize:'13px'}}>{f.label}</span>
                    <span style={{marginLeft:'auto',color:f.val?'#2EC87A':'rgba(255,255,255,0.2)'}}>{f.val?'✓':'✗'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
              {school.website_url && (
  <a href={school.website_url} target="_blank" rel="noopener noreferrer" style={{background:'#2EC87A',color:'white',textDecoration:'none',borderRadius:'10px',padding:'14px 28px',fontSize:'15px',fontWeight:'700',textAlign:'center'}}>
    🌐 Official Website
  </a>
)}
              <a href={'/applications'} style={{background:'#C42020',color:'white',textDecoration:'none',borderRadius:'10px',padding:'14px 28px',fontSize:'15px',fontWeight:'700',flex:1,textAlign:'center'}}>
                Apply to This School
              </a>
              <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',borderRadius:'10px',padding:'14px 28px',fontSize:'15px',border:'1px solid rgba(255,255,255,0.15)',flex:1,textAlign:'center'}}>
                Ask Sakura AI
              </a>
              <a href={'/compare?school=' + school.id} style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',borderRadius:'10px',padding:'14px 28px',fontSize:'15px',border:'1px solid rgba(255,255,255,0.15)',flex:1,textAlign:'center'}}>
                Compare Schools
              </a>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
                <h2 style={{color:'white',fontSize:'18px',fontWeight:'700'}}>Reviews ({reviews.length})</h2>
                <div style={{textAlign:'right'}}>
                  <div style={{color:'#F0A830',fontSize:'28px',fontWeight:'700'}}>{avgRating}</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px'}}>out of 5</div>
                </div>
              </div>
              {reviews.length === 0 ? (
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No reviews yet. Be the first!</p>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  {reviews.map(review=>(
                    <div key={review.id} style={{background:'#0D0907',borderRadius:'10px',padding:'16px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                        <div style={{color:'#F0A830',fontSize:'18px'}}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
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
                    <button key={star} onClick={()=>setRating(star)} style={{background:'none',border:'none',fontSize:'32px',cursor:'pointer',color:rating>=star?'#F0A830':'rgba(255,255,255,0.2)'}}>★</button>
                  ))}
                </div>
                <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Share your experience..." style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'14px',outline:'none',resize:'vertical',minHeight:'100px',marginBottom:'12px'}}/>
                <button onClick={submitReview} disabled={submitting||!comment.trim()} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'12px 24px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            ) : (
              <div style={{background:'rgba(46,200,122,0.1)',border:'1px solid rgba(46,200,122,0.3)',borderRadius:'12px',padding:'20px',textAlign:'center'}}>
                <p style={{color:'#2EC87A',fontSize:'16px',fontWeight:'700'}}>Thank you for your review!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requirements' && (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Application Requirements</h2>
              {[
                {icon:'📘',req:'Valid passport (minimum 1 year validity remaining)'},
                {icon:'💰',req:'Bank statement showing minimum 2,000,000 Yen (about 1,500 USD)'},
                {icon:'🎓',req:'Academic certificates - graduation or enrollment certificate'},
                {icon:'📝',req:'Japanese language proficiency documents (if any)'},
                {icon:'🏥',req:'Medical certificate from licensed doctor'},
                {icon:'📸',req:'Passport photos (4.5cm x 3.5cm, white background)'},
                {icon:'📋',req:'Completed application form from the school'},
                {icon:'✉️',req:'Personal statement / motivation letter'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <span style={{fontSize:'20px',flexShrink:0}}>{item.icon}</span>
                  <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',lineHeight:'1.6'}}>{item.req}</span>
                </div>
              ))}
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Application Timeline</h2>
              {[
                {step:'1',label:'Apply to School',time:'6 months before start'},
                {step:'2',label:'Receive Acceptance Letter',time:'4-6 weeks after applying'},
                {step:'3',label:'School applies for COE',time:'4-8 weeks processing'},
                {step:'4',label:'Apply for Visa',time:'2-4 weeks processing'},
                {step:'5',label:'Book Flight to Japan',time:'1-2 months before start'},
                {step:'6',label:'Arrive in Japan',time:'1 week before school starts'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:'14px',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#C42020',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:'700',flexShrink:0}}>{item.step}</div>
                  <div style={{flex:1}}>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{item.label}</div>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Location Information</h2>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
                {[
                  {label:'City',value:school.city},
                  {label:'Region',value:school.region},
                  {label:'Country',value:'Japan'},
                  {label:'Nearest Station',value:'Central Station'},
                ].map(info=>(
                  <div key={info.label} style={{background:'#0D0907',borderRadius:'8px',padding:'12px'}}>
                    <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'4px'}}>{info.label}</div>
                    <div style={{color:'white',fontSize:'14px',fontWeight:'600'}}>{info.value}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'#0D0907',borderRadius:'10px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.06)'}}>
                <div style={{fontSize:'48px',marginBottom:'12px'}}>🗾</div>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>
                  Located in {school.city}, {school.region}, Japan
                </p>
                <iframe
  src={'https://maps.google.com/maps?q=' + encodeURIComponent(school.name_en + ' ' + school.city + ' Japan') + '&output=embed&z=14'}
  width="100%"
  height="300"
  style={{border:'none',borderRadius:'10px',marginBottom:'12px'}}
  loading="lazy"
/>
                <a href={'https://www.google.com/maps/search/' + encodeURIComponent(school.name_en + ' ' + school.city + ' Japan')} target="_blank" rel="noopener noreferrer" style={{background:'#4A8EFF',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>
                  View on Google Maps
                </a>
              </div>
            </div>

            <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',border:'1px solid rgba(255,255,255,0.08)'}}>
              <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>Area Information</h2>
              {[
                {icon:'🚇',label:'Transport',desc:'Well connected by train and bus. IC card (Suica/Pasmo) recommended.'},
                {icon:'🏪',label:'Convenience',desc:'Convenience stores, supermarkets, and restaurants nearby.'},
                {icon:'🏥',label:'Healthcare',desc:'Local clinics and hospitals accessible. National Health Insurance accepted.'},
                {icon:'🕌',label:'Muslim Facilities',desc:'Halal restaurants and mosques available in the area.'},
              ].map(item=>(
                <div key={item.label} style={{display:'flex',gap:'12px',padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <span style={{fontSize:'22px',flexShrink:0}}>{item.icon}</span>
                  <div>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'600',marginBottom:'2px'}}>{item.label}</div>
                    <div style={{color:'rgba(255,255,255,0.5)',fontSize:'12px'}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}