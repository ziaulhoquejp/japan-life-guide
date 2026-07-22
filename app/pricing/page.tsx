'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    nameJP: '無料プラン',
    price: 0,
    priceDisplay: '¥0',
    period: 'forever',
    color: '#4A8EFF',
    icon: '🆓',
    features: [
      '✅ Browse 724+ verified schools',
      '✅ Basic visa information',
      '✅ Sakura AI (10 messages/day)',
      '✅ JLPT practice (5 tests/day)',
      '✅ Job listings view',
      '✅ Community access',
      '✅ Halal food guide',
      '❌ Unlimited AI chat',
      '❌ Priority support',
      '❌ Advanced SSW test',
      '❌ Bulk school inquiry',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    id: 'monthly',
    name: 'Pro Monthly',
    nameJP: '月額プロプラン',
    price: 980,
    priceDisplay: '¥980',
    period: '/month',
    color: '#C42020',
    icon: '💎',
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    features: [
      '✅ Everything in Free',
      '✅ Unlimited Sakura AI chat',
      '✅ Unlimited JLPT practice',
      '✅ Unlimited SSW test practice',
      '✅ AI Interview practice (unlimited)',
      '✅ AI Motivation letter generator',
      '✅ Bulk school inquiry (up to 10)',
      '✅ Visa document checker',
      '✅ Priority support',
      '✅ Exclusive study materials',
      '✅ Early access to new features',
    ],
    cta: 'Start Pro Plan',
    popular: true,
  },
  {
    id: 'yearly',
    name: 'Pro Annual',
    nameJP: '年額プロプラン',
    price: 7980,
    priceDisplay: '¥7,980',
    period: '/year',
    originalPrice: '¥11,760',
    savings: 'Save 32%!',
    color: '#F0A830',
    icon: '🌟',
    priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    features: [
      '✅ Everything in Pro Monthly',
      '✅ 2 months FREE vs monthly',
      '✅ Priority visa consultation',
      '✅ Resume review service',
      '✅ Company referral service',
      '✅ Dedicated support',
    ],
    cta: 'Start Annual Plan',
    popular: false,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    nameJP: '買い切りプラン',
    price: 29800,
    priceDisplay: '¥29,800',
    period: 'one-time',
    color: '#A855F7',
    icon: '👑',
    priceId: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID,
    features: [
      '✅ Everything in Pro Annual',
      '✅ Lifetime access (pay once!)',
      '✅ All future features included',
      '✅ VIP support',
      '✅ Job placement assistance',
      '✅ Visa application support',
    ],
    cta: 'Get Lifetime Access',
    popular: false,
  },
]

const FAQ = [
  {q:'Is Japan Life Guide really free?', a:'Yes! The basic plan is completely free. You can browse schools, get visa information, and use Sakura AI (limited). Pro plans unlock unlimited features.'},
  {q:'Can I cancel anytime?', a:'Yes! Monthly and annual plans can be cancelled anytime. You will keep access until the end of your billing period.'},
  {q:'What payment methods are accepted?', a:'We accept all major credit cards (Visa, Mastercard, American Express) and debit cards through our secure Stripe payment system.'},
  {q:'Is my payment secure?', a:'Yes! All payments are processed by Stripe, the world\'s most trusted payment platform. We never store your card details.'},
  {q:'Do you offer student discounts?', a:'Yes! Students can earn free Pro access by referring friends. 5 referrals = 1 month Pro FREE! Visit /referral to learn more.'},
  {q:'What happens after I upgrade?', a:'Your account upgrades instantly. All Pro features become available immediately after payment.'},
]

export default function PricingPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number|null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
        supabase.from('profiles').select('*').eq('id', data.user.id).single().then(({ data: p }) => {
          if (p) setProfile(p)
        })
      }
    })
  }, [])

  async function handleCheckout(plan: any) {
  if (plan.id === 'free') {
    window.location.href = '/register'
    return
  }
  window.open('https://japanlifeguide.app/pricing', '_blank')
}


  const isPro = profile?.plan === 'pro' || profile?.plan === 'lifetime'

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'60px 20px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'800',marginBottom:'8px'}}>Simple, Transparent Pricing</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'18px',marginBottom:'16px'}}>Choose the plan that works for your Japan journey</p>
        <div style={{display:'inline-flex',gap:'12px',flexWrap:'wrap',justifyContent:'center'}}>
          <span style={{background:'rgba(46,200,122,0.2)',color:'#2EC87A',padding:'6px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:'700'}}>✅ Cancel anytime</span>
          <span style={{background:'rgba(74,142,255,0.2)',color:'#4A8EFF',padding:'6px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:'700'}}>🔒 Secure payment</span>
          <span style={{background:'rgba(196,32,32,0.2)',color:'#FF8070',padding:'6px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:'700'}}>🌸 Free plan available</span>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'48px 20px'}}>

        {isPro && (
          <div style={{background:'rgba(46,200,122,0.1)',borderRadius:'12px',padding:'16px',marginBottom:'24px',border:'1px solid rgba(46,200,122,0.3)',textAlign:'center'}}>
            <p style={{color:'#2EC87A',fontSize:'15px',fontWeight:'700'}}>🎉 You are already on the {profile?.plan} plan! Enjoy all Pro features!</p>
          </div>
        )}

        {/* Plans Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'16px',marginBottom:'48px'}}>
          {PLANS.map(plan => (
            <div key={plan.id} style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(255,255,255,0.08)',position:'relative',display:'flex',flexDirection:'column'}}>

              {plan.popular && (
                <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#C42020',color:'white',padding:'4px 16px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',whiteSpace:'nowrap'}}>
                  ⭐ MOST POPULAR
                </div>
              )}

              {plan.savings && (
                <div style={{position:'absolute',top:'-12px',right:'16px',background:'#F0A830',color:'#0D0907',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>
                  {plan.savings}
                </div>
              )}

              <div style={{marginBottom:'20px'}}>
                <div style={{fontSize:'36px',marginBottom:'8px'}}>{plan.icon}</div>
                <h3 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'2px'}}>{plan.name}</h3>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'12px'}}>{plan.nameJP}</p>
                <div style={{display:'flex',alignItems:'baseline',gap:'4px'}}>
                  <span style={{color:plan.color,fontSize:'36px',fontWeight:'800'}}>{plan.priceDisplay}</span>
                  <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <p style={{color:'rgba(255,255,255,0.3)',fontSize:'12px',textDecoration:'line-through'}}>{plan.originalPrice}/year</p>
                )}
              </div>

              <div style={{flex:1,marginBottom:'20px'}}>
                {plan.features.map((feature, i) => (
                  <p key={i} style={{color: feature.startsWith('✅') ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',fontSize:'12px',lineHeight:'1.8',marginBottom:'2px'}}>
                    {feature}
                  </p>
                ))}
              </div>

              <button
                onClick={() => plan.id === 'free' ? window.location.href = '/register' : handleCheckout(plan)}
                disabled={loading || (isPro && plan.id !== 'free')}
                style={{
                  background: plan.popular ? plan.color : 'rgba(255,255,255,0.08)',
                  color: 'white',
                  border: plan.popular ? 'none' : `1px solid ${plan.color}`,
                  borderRadius:'10px',
                  padding:'14px',
                  fontSize:'14px',
                  fontWeight:'700',
                  cursor: loading || (isPro && plan.id !== 'free') ? 'not-allowed' : 'pointer',
                  opacity: isPro && plan.id !== 'free' ? 0.5 : 1,
                  width:'100%',
                }}
              >
                {loading ? '⏳ Processing...' : isPro && plan.id !== 'free' ? '✅ Current Plan' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Referral Banner */}
        <div style={{background:'linear-gradient(135deg,rgba(240,168,48,0.15),rgba(240,168,48,0.05))',borderRadius:'16px',padding:'32px',marginBottom:'48px',border:'1px solid rgba(240,168,48,0.3)',textAlign:'center'}}>
          <div style={{fontSize:'40px',marginBottom:'12px'}}>🎁</div>
          <h3 style={{color:'#F0A830',fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Get Pro for FREE!</h3>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',marginBottom:'16px',lineHeight:'1.7'}}>
            Refer 5 friends and get 1 month Pro FREE!<br/>
            Refer 10 friends and get 3 months FREE!<br/>
            Refer 20 friends and get LIFETIME access FREE!
          </p>
          <a href="/referral" style={{background:'#F0A830',color:'#0D0907',textDecoration:'none',padding:'12px 28px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>
            Start Referring Friends 🎁
          </a>
        </div>

        {/* FAQ */}
        <div>
          <h2 style={{color:'white',fontSize:'24px',fontWeight:'700',textAlign:'center',marginBottom:'32px'}}>Frequently Asked Questions</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {FAQ.map((item, i) => (
              <div key={i} style={{background:'#1A2035',borderRadius:'12px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:'100%',background:'none',border:'none',padding:'18px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
                  <span style={{color:'white',fontSize:'14px',fontWeight:'600',textAlign:'left'}}>{item.q}</span>
                  <span style={{color:'#C42020',fontSize:'18px',flexShrink:0,marginLeft:'12px'}}>{openFaq===i?'−':'+'}</span>
                </button>
                {openFaq===i && (
                  <div style={{padding:'0 20px 18px'}}>
                    <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7'}}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{textAlign:'center',marginTop:'48px'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'16px'}}>Still have questions? Ask Sakura AI!</p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 28px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',display:'inline-block'}}>
            Ask Sakura AI 🌸
          </a>
        </div>
      </div>
    </main>
  )
}