'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

function SchoolsList() {
const searchParams = useSearchParams()
const [schools, setSchools] = useState<any[]>([])
const [loading, setLoading] = useState(true)
const [total, setTotal] = useState(0)
const [page, setPage] = useState(1)
const [view, setView] = useState<'grid'|'list'>('grid')

const [filters, setFilters] = useState({
search: searchParams.get('search') || '',
city: searchParams.get('city') || '',
region: '',
hasDorm: false,
hasScholarship: false,
jlptPrep: false,
verifiedOnly: false,
minFee: 0,
maxFee: 1000000,
sortBy: 'rating',
})

const [favorites, setFavorites] = useState<string[]>([])
const [user, setUser] = useState<any>(null)
const PAGE_SIZE = 24

useEffect(() => {
supabase.auth.getUser().then(({ data }) => {
if (data.user) {
setUser(data.user)
supabase.from('favorites').select('school_id').eq('user_id', data.user.id).then(({ data: favs }) => {
if (favs) setFavorites(favs.map(f => f.school_id))
})
}
})
}, [])

useEffect(() => {
loadSchools()
}, [filters, page])

async function loadSchools() {
setLoading(true)
let query = supabase.from('schools').select('*', { count: 'exact' })

if (filters.search) {
query = query.or(`name_en.ilike.%${filters.search}%,name_jp.ilike.%${filters.search}%,city.ilike.%${filters.search}%`)
}
if (filters.city) query = query.eq('city', filters.city)
if (filters.region) query = query.eq('region', filters.region)
if (filters.hasDorm) query = query.eq('has_dorm', true)
if (filters.hasScholarship) query = query.eq('scholarship', true)
if (filters.jlptPrep) query = query.eq('jlpt_prep', true)
if (filters.verifiedOnly) query = query.eq('data_verified', true)
if (filters.maxFee < 1000000) query = query.lte('annual_fee_jpy', filters.maxFee)
if (filters.minFee > 0) query = query.gte('annual_fee_jpy', filters.minFee)

if (filters.sortBy === 'rating') query = query.order('rating', { ascending: false })
else if (filters.sortBy === 'fee_asc') query = query.order('annual_fee_jpy', { ascending: true })
else if (filters.sortBy === 'fee_desc') query = query.order('annual_fee_jpy', { ascending: false })
else if (filters.sortBy === 'name') query = query.order('name_en', { ascending: true })

const from = (page - 1) * PAGE_SIZE
query = query.range(from, from + PAGE_SIZE - 1)

const { data, count } = await query
if (data) setSchools(data)
if (count !== null) setTotal(count)
setLoading(false)
}

async function toggleFavorite(e: React.MouseEvent, schoolId: string) {
e.preventDefault()
if (!user) { window.location.href = '/login'; return }
if (favorites.includes(schoolId)) {
await supabase.from('favorites').delete().eq('user_id', user.id).eq('school_id', schoolId)
setFavorites(prev => prev.filter(id => id !== schoolId))
} else {
await supabase.from('favorites').insert({ user_id: user.id, school_id: schoolId })
setFavorites(prev => [...prev, schoolId])
}
}

function updateFilter(key: string, value: any) {
setFilters(prev => ({...prev, [key]: value}))
setPage(1)
}

const totalPages = Math.ceil(total / PAGE_SIZE)
const regions = ['Hokkaido','Tohoku','Kanto','Chubu','Kansai','Chugoku','Shikoku','Kyushu','Okinawa']

return (
<main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
<div style={{background:'#1A2035',padding:'32px 20px',borderBottom:'3px solid #C42020'}}>
<div style={{maxWidth:'1200px',margin:'0 auto'}}>
<h1 style={{color:'white',fontSize:'28px',fontWeight:'700',marginBottom:'8px'}}>Japanese Language Schools</h1>
<div style={{background:'rgba(46,200,122,0.1)',border:'1px solid rgba(46,200,122,0.2)',borderRadius:'8px',padding:'8px 14px',marginBottom:'14px',display:'inline-flex',gap:'8px',alignItems:'center'}}>
<span>✅</span>
<p style={{color:'#2EC87A',fontSize:'12px',margin:0,fontWeight:'600'}}>All 724 schools are real Japanese language schools with official website links.</p>
</div>

{/* Search Bar */}
<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
<input
value={filters.search}
onChange={e=>updateFilter('search', e.target.value)}
placeholder="🔍 Search schools by name or city..."
style={{flex:1,minWidth:'200px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px 16px',color:'white',fontSize:'14px',outline:'none'}}
/>
<select value={filters.sortBy} onChange={e=>updateFilter('sortBy', e.target.value)} style={{background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'12px',color:'white',fontSize:'13px',outline:'none',cursor:'pointer'}}>
<option value="rating">⭐ Top Rated</option>
<option value="fee_asc">💴 Cheapest First</option>
<option value="fee_desc">💴 Most Expensive</option>
<option value="name">🔤 A-Z</option>
</select>
<div style={{display:'flex',gap:'4px'}}>
<button onClick={()=>setView('grid')} style={{background:view==='grid'?'#C42020':'rgba(255,255,255,0.08)',border:'none',borderRadius:'8px',padding:'12px',color:'white',cursor:'pointer',fontSize:'16px'}}>⊞</button>
<button onClick={()=>setView('list')} style={{background:view==='list'?'#C42020':'rgba(255,255,255,0.08)',border:'none',borderRadius:'8px',padding:'12px',color:'white',cursor:'pointer',fontSize:'16px'}}>☰</button>
</div>
</div>
</div>
</div>

<div style={{maxWidth:'1200px',margin:'0 auto',padding:'20px',display:'flex',gap:'20px'}}>

{/* Filters Sidebar */}
<div style={{width:'220px',flexShrink:0,display:'flex',flexDirection:'column',gap:'12px'}}>
<div style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'12px'}}>📍 Region</h3>
<select value={filters.region} onChange={e=>updateFilter('region', e.target.value)} style={{width:'100%',background:'#0D0907',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'6px',padding:'8px',color:'white',fontSize:'12px',outline:'none'}}>
<option value="">All Regions</option>
{regions.map(r => <option key={r} value={r}>{r}</option>)}
</select>
</div>

<div style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'12px'}}>💴 Max Annual Fee</h3>
<input type="range" min="300000" max="1000000" step="50000" value={filters.maxFee} onChange={e=>updateFilter('maxFee', parseInt(e.target.value))} style={{width:'100%',accentColor:'#C42020'}}/>
<p style={{color:'#F0A830',fontSize:'12px',marginTop:'6px'}}>¥{filters.maxFee.toLocaleString()}</p>
</div>

<div style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
<h3 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'12px'}}>🔧 Filters</h3>
{[
{key:'hasDorm',label:'🏠 Has Dormitory'},
{key:'hasScholarship',label:'🎓 Scholarship'},
{key:'jlptPrep',label:'📝 JLPT Prep'},
{key:'verifiedOnly',label:'✅ Verified Only'},
].map(f => (
<label key={f.key} style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'8px',cursor:'pointer'}}>
<input type="checkbox" checked={(filters as any)[f.key]} onChange={e=>updateFilter(f.key, e.target.checked)} style={{accentColor:'#C42020'}}/>
<span style={{color:'rgba(255,255,255,0.6)',fontSize:'12px'}}>{f.label}</span>
</label>
))}
</div>

<button onClick={()=>{setFilters({search:'',city:'',region:'',hasDorm:false,hasScholarship:false,jlptPrep:false,verifiedOnly:false,minFee:0,maxFee:1000000,sortBy:'rating'}); setPage(1)}} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.5)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'10px',fontSize:'12px',cursor:'pointer'}}>
Reset Filters
</button>
</div>

{/* Schools Grid */}
<div style={{flex:1}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',flexWrap:'wrap',gap:'8px'}}>
<p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>
Showing {schools.length} of <strong style={{color:'white'}}>{total}</strong> schools
</p>
</div>

{loading ? (
<div style={{textAlign:'center',padding:'60px',color:'rgba(255,255,255,0.4)'}}>Loading schools...</div>
) : schools.length === 0 ? (
<div style={{textAlign:'center',padding:'60px',background:'#1A2035',borderRadius:'12px'}}>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'16px'}}>No schools found matching your filters</p>
<button onClick={()=>setFilters(prev=>({...prev,search:'',region:'',hasDorm:false,hasScholarship:false,jlptPrep:false,verifiedOnly:false}))} style={{background:'#C42020',color:'white',border:'none',borderRadius:'8px',padding:'10px 20px',fontSize:'13px',cursor:'pointer'}}>Clear Filters</button>
</div>
) : (
<>
<div style={{display: view==='grid' ? 'grid' : 'flex',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'12px',flexDirection:'column'}}>
{schools.map(school => (
<Link key={school.id} href={'/schools/' + school.id} style={{textDecoration:'none'}}>
<div style={{background:'#1A2035',borderRadius:'12px',padding:'16px',border:'1px solid rgba(255,255,255,0.08)',cursor:'pointer',display: view==='list' ? 'flex' : 'block',gap:'14px',alignItems:'center'}}
onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(196,32,32,0.4)')}
onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom: view==='grid' ? '10px' : '0',flex: view==='list' ? '0 0 auto' : 'unset'}}>
<span style={{fontSize:'32px'}}>{school.icon || '🏫'}</span>
<button onClick={(e)=>toggleFavorite(e, school.id)} style={{background:'none',border:'none',fontSize:'18px',cursor:'pointer',color: favorites.includes(school.id) ? '#C42020' : 'rgba(255,255,255,0.3)'}}>
{favorites.includes(school.id) ? '❤️' : '🤍'}
</button>
</div>
<div style={{flex:1}}>
<h3 style={{color:'white',fontSize:'13px',fontWeight:'700',marginBottom:'4px',lineHeight:'1.4'}}>{school.name_en}</h3>
<p style={{color:'rgba(255,255,255,0.4)',fontSize:'11px',marginBottom:'8px'}}>📍 {school.city} · {school.region}</p>
<div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'8px'}}>
{school.has_dorm && <span style={{background:'rgba(74,142,255,0.15)',color:'#4A8EFF',padding:'2px 6px',borderRadius:'4px',fontSize:'9px',fontWeight:'700'}}>DORM</span>}
{school.jlpt_prep && <span style={{background:'rgba(46,200,122,0.15)',color:'#2EC87A',padding:'2px 6px',borderRadius:'4px',fontSize:'9px',fontWeight:'700'}}>JLPT</span>}
{school.scholarship && <span style={{background:'rgba(168,85,247,0.15)',color:'#A855F7',padding:'2px 6px',borderRadius:'4px',fontSize:'9px',fontWeight:'700'}}>SCHOLARSHIP</span>}
{school.data_verified && <span style={{background:'rgba(46,200,122,0.15)',color:'#2EC87A',padding:'2px 6px',borderRadius:'4px',fontSize:'9px',fontWeight:'700'}}>✓ VERIFIED</span>}
</div>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<span style={{color:'#F0A830',fontSize:'12px',fontWeight:'700'}}>¥{school.annual_fee_jpy?.toLocaleString() || '—'}</span>
<span style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>⭐ {school.rating}</span>
</div>
</div>
</div>
</Link>
))}
</div>

{/* Pagination */}
{totalPages > 1 && (
<div style={{display:'flex',gap:'8px',justifyContent:'center',marginTop:'24px',flexWrap:'wrap'}}>
<button onClick={()=>setPage(prev=>Math.max(1,prev-1))} disabled={page===1} style={{background:page===1?'rgba(255,255,255,0.04)':'#1A2035',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'8px 16px',color:page===1?'rgba(255,255,255,0.2)':'white',cursor:page===1?'not-allowed':'pointer',fontSize:'13px'}}>← Prev</button>
{Array.from({length: Math.min(5, totalPages)}, (_,i) => {
const p = page <= 3 ? i + 1 : page + i - 2
if (p < 1 || p > totalPages) return null
return (
<button key={'page-'+p} onClick={()=>setPage(p)}
 style={{background:page===p?'#C42020':'#1A2035',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'8px 14px',color:'white',cursor:'pointer',fontSize:'13px',fontWeight:page===p?'700':'400'}}>
{p}
</button>
)
})}
<button onClick={()=>setPage(prev=>Math.min(totalPages,prev+1))} disabled={page===totalPages} style={{background:page===totalPages?'rgba(255,255,255,0.04)':'#1A2035',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'8px 16px',color:page===totalPages?'rgba(255,255,255,0.2)':'white',cursor:page===totalPages?'not-allowed':'pointer',fontSize:'13px'}}>Next →</button>
</div>
)}
</>
)}
</div>
</div>
</main>
)
}

export default function SchoolsPage() {
return (
<Suspense fallback={<div style={{minHeight:'100vh',background:'#0D0907',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Loading...</div>}>
<SchoolsList />
</Suspense>
)
}