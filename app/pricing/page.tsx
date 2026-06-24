'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '¥0',
    period: 'forever',
    color: '#4A8EFF',
    icon: '🆓',
    description: 'Perfect for exploring Japan Life Guide',
    features: [
      {text:'Browse 724+ verified schools', included: true},
      {text:'Basic school search & filters', included: true},
      {text:'Visa guide & calculator', included: true},
      {text:'JLPT practice tests', included: true},
      {text:'Community access', included: true},
      {text:'Halal & city guides', included: true},
      {text:'Sakura AI (10 messages/day)', included: true},
      {text:'Save up to 3 favorite schools', included: true},
      {text:'1 school application', included: true},
      {text:'Unlimited AI chat', included: false},
      {text:'Unlimited favorites', included: false},
      {text:'Unlimited applications', included: false},
      {text:'Priority support', included: false},
    ],
    cta: 'Get Started Free',
    href: '/register',
  },
  {
    id: 'pro_monthly',
    name: 'Pro',
    price: '¥980',
    period: 'per month',
    color: '#C42020',
    icon: '💎',
    description: 'For serious Japan-bound students',
    popular: true,
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    features: [
      {text:'Everything in Free', included: true},
      {text:'Unlimited Sakura AI chat', included: true},
      {text:'Unlimited favorite schools', included: true},
      {text:'Unlimited school applications', included: true},
      {text:'Compare up to 4 schools', included: true},
      {text:'Priority email support', included: true},
      {text:'Early access to new features', included: true},
      {text:'Ad-free experience', included: true},
    ],
    cta: 'Start Pro Monthly',
    href: '/register',
  },
  {
    id: 'pro_yearly',
    name: 'Pro Annual',
    price: '¥7,980',
    period: 'per year',
    savings: 'Save ¥3,780!',
    color: '#F0A830',
    icon: '⭐',
    description: 'Best value for committed students',
    priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    features: [
      {text:'Everything in Pro Monthly', included: true},
      {text:'2 months free (save 32%)', included: true},
      {text:'Annual receipt for visa documents', included: true},
      {text:'VIP community badge', included: true},
    ],
    cta: 'Start Pro Annual',
    href: '/register',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '¥29,800',
    period: 'one-time',
    color: '#A855F7',
    icon: '♾️',
    description: 'Pay once, use forever',
    priceId: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID,
    features: [
      {text:'Everything in Pro', included: true},
      {text:'Lifetime access - never pay again', included: true},
      {text:'All future features included', included: true},
      {text:'Founding member badge', included: true},
      {text:'Direct feedback channel', included: true},
    ],
    cta: 'Get Lifetime Access',
    href: '/register',
  },
]

const FAQ = [
  {q:'Can I cancel anytime?', a:'Yes! You can cancel your Pro subscription anytime. You will keep access until the end of your billing period.'},
  {q:'Is there a free trial?', a:'The Free plan is available forever with no credit card required. Try all basic features before upgrading.'},
  {q:'What payment methods are accepted?', a:'We accept all major credit cards (Visa, Mastercard, American Express) via Stripe secure payment.'},
  {q:'Can I get a refund?', a:'Yes, we offer a 7-day money-back guarantee if you are not satisfied with Pro features.'},
  {q:'Do I need Pro to use Sakura AI?', a:'Free users get 10 messages per day. Pro users get unlimited Sakura AI access.'},
  {q:'Is my payment information secure?', a:'Yes! All payments are processed by Stripe, a world-leading payment platform. We never store your card details.'},
]

export default function PricingPage() {
  const [user, setUser] = useState<any>(null)
  const [currentPlan, setCurrentPlan] = useState('free')
  const [loading, setLoading] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number|null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
        supabase.from('profiles').select('plan').eq('id', data.user.id).single().then(({ data: profile }) => {
          if (profile?.plan) setCurrentPlan(profile.plan)
        })
      }
    })
  }, [])

  async function handleCheckout(priceId: string) {
    if (!user) { window.location.href = '/register'; return }
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId: user.id }),
      })
      const { url } = await response.json()
      if (url) window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
    }
    setLoading(false)
  }

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'48px 20px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'800',marginBottom:'8px'}}>Simple, Transparent Pricing</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'16px'}}>Start free, upgrade when you need more</p>
        <div style={{display:'inline-flex',gap:'8px',background:'rgba(255,255,255,0.06)',borderRadius:'20px',padding:'6px 16px'}}>
          <span style={{color:'#2EC87A',fontSize:'13px',fontWeight:'600'}}>✅ No credit card required for free plan</span>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'48px 20px'}}>

        {/* Plans Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'16px',marginBottom:'48px'}}>
          {PLANS.map(plan => (
            <div key={plan.id} style={{background:'#1A2035',borderRadius:'16px',padding:'28px',border:'2px solid ' + (plan.popular ? plan.color : 'rgba(255,255,255,0.08)'),position:'relative',display:'flex',flexDirection:'column'}}>
              {plan.popular && (
                <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#C42020',color:'white',padding:'4px 16px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',whiteSpace:'nowrap'}}>
                  MOST POPULAR
                </div>
              )}
              {plan.savings && (
                <div style={{position:'absolute',top:'-12px',right:'16px',background:'#F0A830',color:'black',padding:'4px 10px',borderRadius:'20px',fontSize:'10px',fontWeight:'700'}}>
                  {plan.savings}
                </div>
              )}
              {currentPlan === plan.id.replace('_monthly','').replace('_yearly','') && (
                <div style={{background:'rgba(46,200,122,0.1)',border:'1px solid rgba(46,200,122,0.3)',borderRadius:'6px',padding:'4px 10px',marginBottom:'12px',textAlign:'center'}}>
                  <span style={{color:'#2EC87A',fontSize:'11px',fontWeight:'700'}}>✅ Current Plan</span>
                </div>
              )}

              <div style={{fontSize:'32px',marginBottom:'10px'}}>{plan.icon}</div>
              <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>{plan.name}</h2>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginBottom:'16px'}}>{plan.description}</p>

              <div style={{marginBottom:'20px'}}>
                <span style={{color:plan.color,fontSize:'32px',fontWeight:'800'}}>{plan.price}</span>
                <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginLeft:'4px'}}>/ {plan.period}</span>
              </div>

              <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'24px',flex:1}}>
                {plan.features.map((feature,i) => (
                  <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start'}}>
                    <span style={{color: feature.included ? '#2EC87A' : 'rgba(255,255,255,0.2)',flexShrink:0,fontSize:'14px'}}>{feature.included ? '✓' : '✗'}</span>
                    <span style={{color: feature.included ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',fontSize:'12px',lineHeight:'1.5'}}>{feature.text}</span>
                  </div>
                ))}
              </div>

              {plan.priceId ? (
                <button onClick={()=>{
console.log('priceId:', plan.priceId)
handleCheckout(plan.priceId!)
}}
 disabled={loading} style={{background: plan.popular ? '#C42020' : plan.color + '20',color: plan.popular ? 'white' : plan.color,border: plan.popular ? 'none' : '1px solid ' + plan.color,borderRadius:'10px',padding:'12px',fontSize:'13px',fontWeight:'700',cursor:'pointer',width:'100%'}}>
                  {loading ? 'Loading...' : plan.cta}
                </button>
              ) : (
                <a href={user ? '/dashboard' : plan.href} style={{background:'rgba(74,142,255,0.15)',color:'#4A8EFF',border:'1px solid rgba(74,142,255,0.3)',borderRadius:'10px',padding:'12px',fontSize:'13px',fontWeight:'700',textAlign:'center',textDecoration:'none',display:'block'}}>
                  {user ? 'Current Plan' : plan.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div style={{background:'#1A2035',borderRadius:'16px',padding:'28px',marginBottom:'40px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'20px',textAlign:'center'}}>Feature Comparison</h2>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr>
                  <th style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',textAlign:'left',padding:'10px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>Feature</th>
                  {['Free','Pro','Lifetime'].map(p => (
                    <th key={p} style={{color:'white',fontSize:'12px',textAlign:'center',padding:'10px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {feature:'School Search', free:'✅', pro:'✅', lifetime:'✅'},
                  {feature:'Sakura AI Chat', free:'10/day', pro:'Unlimited', lifetime:'Unlimited'},
                  {feature:'Favorite Schools', free:'3 max', pro:'Unlimited', lifetime:'Unlimited'},
                  {feature:'Applications', free:'1 max', pro:'Unlimited', lifetime:'Unlimited'},
                  {feature:'Compare Schools', free:'2 schools', pro:'4 schools', lifetime:'4 schools'},
                  {feature:'Visa Calculator', free:'✅', pro:'✅', lifetime:'✅'},
                  {feature:'JLPT Tests', free:'✅', pro:'✅', lifetime:'✅'},
                  {feature:'Community', free:'✅', pro:'✅', lifetime:'✅'},
                  {feature:'Priority Support', free:'❌', pro:'✅', lifetime:'✅'},
                  {feature:'Future Features', free:'❌', pro:'✅', lifetime:'✅'},
                ].map((row,i) => (
                  <tr key={i} style={{background: i%2===0 ? 'transparent' : 'rgba(255,255,255,0.02)'}}>
                    <td style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',padding:'12px',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>{row.feature}</td>
                    <td style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',textAlign:'center',padding:'12px',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>{row.free}</td>
                    <td style={{color:'#2EC87A',fontSize:'12px',textAlign:'center',padding:'12px',borderBottom:'1px solid rgba(255,255,255,0.04)',fontWeight:'600'}}>{row.pro}</td>
                    <td style={{color:'#A855F7',fontSize:'12px',textAlign:'center',padding:'12px',borderBottom:'1px solid rgba(255,255,255,0.04)',fontWeight:'600'}}>{row.lifetime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div style={{marginBottom:'40px'}}>
          <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'20px',textAlign:'center'}}>Frequently Asked Questions</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {FAQ.map((faq,i) => (
              <div key={i} style={{background:'#1A2035',borderRadius:'10px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
                <button onClick={()=>setExpandedFaq(expandedFaq===i?null:i)} style={{width:'100%',background:'none',border:'none',padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
                  <span style={{color:'white',fontSize:'14px',fontWeight:'600',textAlign:'left'}}>{faq.q}</span>
                  <span style={{color:'#C42020',fontSize:'18px',fontWeight:'700',flexShrink:0}}>{expandedFaq===i?'−':'+'}</span>
                </button>
                {expandedFaq===i && (
                  <div style={{padding:'0 20px 16px'}}>
                    <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',lineHeight:'1.7',margin:0}}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{background:'linear-gradient(135deg,rgba(196,32,32,0.2),rgba(139,0,0,0.2))',borderRadius:'16px',padding:'32px',textAlign:'center',border:'1px solid rgba(196,32,32,0.3)'}}>
          <h3 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'8px'}}>Start Your Japan Journey Today! 🌸</h3>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginBottom:'20px'}}>Join thousands of students from Bangladesh and Nepal</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/register" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 28px',borderRadius:'10px',fontSize:'14px',fontWeight:'700'}}>Get Started Free</a>
            <a href="/chat" style={{background:'rgba(255,255,255,0.08)',color:'white',textDecoration:'none',padding:'12px 28px',borderRadius:'10px',fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)'}}>Ask Sakura AI</a>
          </div>
        </div>
      </div>
    </main>
  )
}