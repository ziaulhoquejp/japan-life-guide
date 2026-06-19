'use client'
import { useState } from 'react'

const BLOG_POSTS = [
  {
    id:1,
    title:'Complete Guide: How to Apply for a Japanese Student Visa from Bangladesh',
    excerpt:'Step-by-step guide covering document preparation, COE application, and the entire visa process for Bangladeshi students.',
    category:'Visa',
    readTime:'8 min read',
    date:'June 2026',
    icon:'🛂',
    color:'#4A8EFF',
    content:`Applying for a Japanese student visa from Bangladesh requires careful preparation and understanding of the process. Here is everything you need to know.

**Step 1: Choose Your Language School**

Before anything else, you need to be accepted by a Japanese language school. Use Japan Life Guide to browse over 700 verified schools across all 47 prefectures. Consider factors like location, fees, dormitory availability, and JLPT preparation programs.

**Step 2: Prepare Required Documents**

You will need:
- Valid passport (6+ months validity)
- Academic certificates (SSC, HSC, or Bachelor's degree)
- Bank statement showing approximately 2,000,000 Yen
- Passport photos
- Completed application form from the school

**Step 3: Submit School Application**

Send your documents to your chosen school. Processing typically takes 2-4 weeks. The school will review your application and may request an interview (often via video call).

**Step 4: School Applies for Certificate of Eligibility (COE)**

Once accepted, your school applies for a COE on your behalf at the regional Immigration Bureau in Japan. This is the most time-consuming step, taking 4-8 weeks.

**Step 5: Apply for Visa at Japanese Embassy**

Once you receive the COE, take it along with your passport and other documents to the Japanese Embassy in Dhaka. Visa processing usually takes 1-2 weeks.

**Step 6: Prepare for Departure**

Book your flight, arrange accommodation, and prepare for your new life in Japan!

**Important Tips:**
- Start the process at least 6 months before your intended start date
- Ensure your bank statement shows consistent funds, not just a recent large deposit
- Keep copies of all documents
- Use Japan Life Guide's Visa Calculator to check your eligibility before applying`,
  },
  {
    id:2,
    title:'How to Find Halal Food in Japan: A Muslim Student\'s Survival Guide',
    excerpt:'Practical tips for finding halal restaurants, groceries, and prayer spaces as a Muslim student in Japan.',
    category:'Muslim Life',
    readTime:'6 min read',
    date:'June 2026',
    icon:'🕌',
    color:'#2EC87A',
    content:`Finding halal food in Japan has become much easier in recent years, but it still requires some knowledge and preparation. Here is a complete guide for Muslim students.

**Understanding Halal Certification in Japan**

Japan has a growing halal certification system, though it is not as standardized as in Muslim-majority countries. Look for the ハラール (halal) label or certification stickers from organizations like the Japan Halal Association.

**Best Cities for Halal Food**

Tokyo, Osaka, and Nagoya have the most halal restaurants and grocery stores due to larger Muslim communities. Tokyo Camii in Yoyogi-Uehara is not just a mosque but also has a halal market nearby.

**Grocery Shopping Tips**

SHIZUOKA MART (静岡マート) is an excellent resource for Muslim students in the Shizuoka area, offering Indonesian, Bangladeshi, Pakistani, Nepali, Thai, and Filipino groceries with online ordering available at www.shizuokamart.com.

Major cities also have international supermarkets carrying halal products. Don Quijote stores increasingly stock halal items in their international food sections.

**Convenience Store Survival**

When halal restaurants are not available, convenience stores offer some safe options:
- Onigiri with tuna or vegetable fillings
- Plain bread items (check ingredients)
- Fresh fruit and vegetables
- Avoid items containing mirin (contains alcohol) or pork

**Useful Apps**

Download HalalNavi and Muslim Pro to find halal restaurants, prayer times, and qibla direction wherever you are in Japan.

**Mosque Locations**

Major mosques include Tokyo Camii (largest in Japan), Masjid Osaka Ibaraki, and Nagoya Mosque. Most welcome visitors and many have community iftars during Ramadan.

**Final Tips**

Always carry a small prayer mat, inform your school about Friday prayer needs in advance, and don't hesitate to ask the Japan Life Guide community for restaurant recommendations in your area.`,
  },
  {
    id:3,
    title:'SSW Visa vs Student Visa: Which Path is Right for You?',
    excerpt:'Comparing the Specified Skilled Worker visa and Student visa to help you choose the best route to Japan.',
    category:'Visa',
    readTime:'7 min read',
    date:'June 2026',
    icon:'⚖️',
    color:'#F0A830',
    content:`Choosing between an SSW (Specified Skilled Worker) visa and a Student visa is one of the most important decisions for those planning to come to Japan. Let's compare both paths.

**Student Visa Overview**

The Student visa is ideal if your primary goal is learning Japanese language and culture, with the flexibility to work part-time (up to 28 hours/week) while studying.

Pros:
- No specific skills test required
- Flexible career path after graduation
- Can transition to university, vocational school, or work visa
- Good for building strong Japanese language foundation

Cons:
- Requires significant upfront funds (~2,000,000 Yen)
- Limited working hours during studies
- Tuition costs (400,000-900,000 Yen annually)

**SSW Visa Overview**

The SSW visa allows full-time work immediately in 14 designated industries including food service, construction, nursing care, and manufacturing.

Pros:
- Full-time work from day one
- No school tuition fees
- Direct path to stable income
- Some industries lead to SSW Type 2 (allows family, permanent path)

Cons:
- Requires passing industry-specific skills test
- Requires JLPT N4 or JFT-Basic minimum
- Limited to specific industries
- SSW Type 1 does not allow bringing family

**Which Should You Choose?**

Choose Student Visa if:
- You want to deeply learn Japanese first
- You are unsure about long-term career plans
- You eventually want to attend Japanese university
- You have sufficient funds for the first year

Choose SSW Visa if:
- You already have intermediate Japanese (N4+)
- You want to start earning immediately
- You have skills in a designated SSW industry
- You prefer a more direct work pathway

**Use Our Visa Calculator**

Not sure which visa fits your situation? Use the Japan Life Guide Visa Calculator to get a personalized recommendation based on your current qualifications and goals.`,
  },
  {
    id:4,
    title:'Budgeting for Life in Japan: Real Costs for International Students',
    excerpt:'A realistic breakdown of monthly expenses for students in Tokyo, Osaka, and smaller Japanese cities.',
    category:'Finance',
    readTime:'6 min read',
    date:'June 2026',
    icon:'💰',
    color:'#A855F7',
    content:`Understanding the real cost of living in Japan is essential for proper financial planning. Here is an honest breakdown based on different cities and lifestyles.

**Tokyo: The Most Expensive Option**

Monthly costs in Tokyo typically range from 120,000 to 160,000 Yen including:
- Share house rent: 40,000-60,000 Yen
- Food: 25,000-35,000 Yen
- Transportation: 10,000-12,000 Yen
- Utilities and phone: 13,000-15,000 Yen

**Osaka and Other Major Cities**

Osaka, Nagoya, and Fukuoka offer 20-30% lower costs than Tokyo while still providing good job opportunities and school options. Expect 90,000-130,000 Yen monthly.

**Smaller Cities: The Budget-Friendly Option**

Cities like Sendai, Hiroshima, or Shizuoka can cost as little as 75,000-110,000 Yen monthly, making them attractive for students on a tighter budget.

**Housing Options Comparison**

School Dormitory: Often the cheapest option at 20,000-45,000 Yen monthly, but availability is limited.

Share House: No guarantor needed, bills usually included, ranging 30,000-60,000 Yen.

Private Apartment: Most expensive option requiring a guarantor, ranging 40,000-80,000 Yen plus separate utilities.

**How Part-Time Work Helps**

With the legal limit of 28 hours per week at approximately 1,100 Yen/hour, students can earn roughly 123,000 Yen monthly, which can cover most living expenses in smaller cities or supplement income in larger ones.

**Money-Saving Tips**

- Cook at home using supermarket ingredients rather than eating out
- Use student discounts on transportation passes
- Buy seasonal/discounted items at supermarkets in the evening
- Consider share houses over private apartments initially

**Use Our Cost Calculator**

For a personalized budget estimate based on your chosen city and lifestyle, try the Japan Life Guide Cost Calculator tool.`,
  },
  {
    id:5,
    title:'JLPT N4 in 6 Months: A Realistic Study Plan',
    excerpt:'How to efficiently prepare for JLPT N4, the level required for SSW visa eligibility.',
    category:'Study Tips',
    readTime:'5 min read',
    date:'June 2026',
    icon:'📝',
    color:'#FF8070',
    content:`JLPT N4 is a crucial milestone, especially for those pursuing the SSW visa pathway. Here is a realistic 6-month study plan to help you succeed.

**Understanding JLPT N4 Requirements**

N4 tests basic Japanese ability including approximately 300 kanji, 1,500 vocabulary words, and basic grammar patterns. The test covers reading, listening, and language knowledge.

**Months 1-2: Foundation Building**

Focus on hiragana, katakana, and basic kanji (50-80 characters). Use apps like Anki for spaced repetition. Study 1-2 hours daily, focusing on:
- Basic greetings and self-introduction
- Numbers, dates, and time expressions
- Simple present and past tense verbs

**Months 3-4: Vocabulary and Grammar Expansion**

Increase to 2 hours daily. Use the Genki textbook series (widely recommended) and focus on:
- 150-200 additional kanji
- N4-level grammar patterns (te-form, potential form, conditional)
- Listening practice with NHK Easy News

**Months 5-6: Test Preparation**

Shift focus to practice tests and weak areas. Recommended resources:
- Official JLPT practice tests
- Mock exams under timed conditions
- Review all kanji and vocabulary regularly

**Daily Study Schedule (2 hours)**

- 30 minutes: New vocabulary and kanji
- 30 minutes: Grammar study
- 30 minutes: Listening practice
- 30 minutes: Reading practice and review

**Test Day Tips**

- Arrive early to the test center
- Bring required documents (passport, exam voucher)
- Manage time carefully during the test - do not spend too long on any single question
- Listening section requires full concentration - practice with similar audio quality beforehand

**Free Practice Resources**

Use the Japan Life Guide JLPT Practice Test tool for free N5, N4, and N3 level practice questions with detailed explanations.

**After Passing N4**

N4 opens doors to SSW visa eligibility. Consider continuing to N3 for better job opportunities and deeper cultural understanding.`,
  },
  {
    id:6,
    title:'Finding Housing in Japan Without a Guarantor: Complete Guide',
    excerpt:'Practical solutions for international students who don\'t have a Japanese guarantor for apartment rental.',
    category:'Housing',
    readTime:'6 min read',
    date:'June 2026',
    icon:'🏠',
    color:'#2EC87A',
    content:`One of the biggest challenges for international students is finding housing without a Japanese guarantor (保証人). Here are practical solutions.

**Understanding the Guarantor System**

Traditional Japanese apartment rentals require a guarantor who agrees to cover rent if you cannot pay. This is difficult for international students who don't have Japanese connections.

**Solution 1: Share Houses**

Share houses are the easiest option as they typically do not require a guarantor. Companies like Sakura House and Oakhouse specialize in foreigner-friendly accommodations with all bills included.

**Solution 2: School Dormitories**

Many language schools offer dormitory housing, completely eliminating the guarantor issue. Apply for dormitory housing when you apply to your school, as spots are limited.

**Solution 3: Guarantor Companies (保証会社)**

For private apartments, guarantor companies can act as your guarantor for a fee (usually equivalent to 0.5-1 month's rent plus annual renewal fees). Your real estate agent can recommend these services.

**Solution 4: UR Housing**

UR (Urban Renaissance) housing is government-managed and does not require a guarantor or key money, making it an excellent option once you have residency. Apply at ur-net.go.jp.

**Solution 5: Company or School Guarantee**

Some companies and schools offer guarantor services for their students or employees. Ask your language school if they provide this service.

**Documents You Will Need**

Regardless of which option you choose, prepare:
- Residence card (在留カード)
- Passport
- Proof of income or enrollment
- Bank statement
- Emergency contact information

**Red Flags to Avoid**

Be cautious of agencies asking for unusually high upfront fees or those unwilling to provide clear contract terms in a language you understand. Always read contracts carefully, using translation apps if needed.

**Final Recommendation**

For your first 6-12 months in Japan, share houses or school dormitories offer the easiest path. Once settled with a stable income and Japanese bank account, transitioning to a private apartment with a guarantor company becomes much simpler.`,
  },
]

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(p=>p.category)))]

  const filtered = BLOG_POSTS.filter(p => {
    const matchCategory = category === 'All' || p.category === category
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  if (selectedPost) {
    return (
      <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
        <div style={{background:'#1A2035',padding:'32px 20px',borderBottom:'3px solid ' + selectedPost.color}}>
          <div style={{maxWidth:'800px',margin:'0 auto'}}>
            <button onClick={()=>setSelectedPost(null)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'13px',marginBottom:'16px'}}>← Back to Blog</button>
            <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'12px'}}>
              <span style={{fontSize:'32px'}}>{selectedPost.icon}</span>
              <span style={{background:selectedPost.color+'20',color:selectedPost.color,padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>{selectedPost.category}</span>
            </div>
            <h1 style={{color:'white',fontSize:'26px',fontWeight:'700',marginBottom:'12px',lineHeight:'1.4'}}>{selectedPost.title}</h1>
            <div style={{display:'flex',gap:'12px',color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>
              <span>{selectedPost.date}</span>
              <span>·</span>
              <span>{selectedPost.readTime}</span>
            </div>
          </div>
        </div>

        <div style={{maxWidth:'800px',margin:'0 auto',padding:'32px 20px'}}>
          <div style={{color:'rgba(255,255,255,0.7)',fontSize:'15px',lineHeight:'1.9',whiteSpace:'pre-line'}}>
            {selectedPost.content.split('**').map((part:string, i:number) =>
              i % 2 === 1 ? <strong key={i} style={{color:'white',display:'block',marginTop:'20px',marginBottom:'8px',fontSize:'17px'}}>{part}</strong> : <span key={i}>{part}</span>
            )}
          </div>

          <div style={{background:'#1A2035',borderRadius:'12px',padding:'24px',marginTop:'32px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)'}}>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'16px'}}>Have more questions about this topic?</p>
            <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>Ask Sakura AI 🌸</a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Japan Life Guide Blog</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'16px',marginBottom:'20px'}}>In-depth guides for Bangladesh and Nepal students in Japan</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search articles..." style={{width:'100%',maxWidth:'400px',background:'#0D0907',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 14px',color:'white',fontSize:'13px',outline:'none'}}/>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {categories.map(cat=>(
            <button key={cat} onClick={()=>setCategory(cat)} style={{background:category===cat?'#C42020':'#1A2035',border:'none',borderRadius:'20px',padding:'8px 16px',color:'white',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'18px'}}>
          {filtered.map(post=>(
            <div key={post.id} onClick={()=>setSelectedPost(post)} style={{background:'#1A2035',borderRadius:'14px',padding:'22px',border:'1px solid rgba(255,255,255,0.08)',cursor:'pointer'}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor=post.color+'60')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.08)')}>
              <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'12px'}}>
                <span style={{fontSize:'28px'}}>{post.icon}</span>
                <span style={{background:post.color+'20',color:post.color,padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{post.category}</span>
              </div>
              <h2 style={{color:'white',fontSize:'16px',fontWeight:'700',marginBottom:'10px',lineHeight:'1.5'}}>{post.title}</h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6',marginBottom:'14px'}}>{post.excerpt}</p>
              <div style={{display:'flex',gap:'10px',color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'48px'}}>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>No articles found. Try a different search.</p>
          </div>
        )}

        <div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.2),rgba(139,0,0,0.2))',borderRadius:'12px',padding:'24px',marginTop:'32px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
          <h3 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>Need personalized guidance? 🌸</h3>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'16px'}}>Ask Sakura AI for advice specific to your situation</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>Ask Sakura AI</a>
        </div>
      </div>
    </main>
  )
}