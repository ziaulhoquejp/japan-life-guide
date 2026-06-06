'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function PricingPage() {
  const [loading, setLoading] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly'|'yearly'>('monthly')

  async function handleCheckout(plan: string) {
    if (plan === 'free') {
      window.location.href = '/register'
      return
    }
    setLoading(true)
    const { data: userData } = await supabase.auth.getUser()
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userData.user?.id,
        email: userData.user?.email,
        plan,
        billingPeriod,
      }),
    })
    const data = await response.json()
    if (data.url) window.location.href = data.url
    setLoading(false)
  }

  const plans = [
    {
      id:'free',
      name:'Free',
      price:0,
      yearlyPrice:0,
      color:'#4A8EFF',
      icon:'🌸',
      desc:'Perfect for exploring Japan Life Guide',
      features:[
        {label:'Browse 500+ language schools',included:true},
        {label:'Basic visa information',included:true},
        {label:'Community forum access',included:true},
        {label:'Job and scholarship listings',included:true},
        {label:'Cultural and life guides',included:true},
        {label:'Sakura AI (10 messages/day)',included:true},
        {label:'Unlimited Sakura AI chat',included:false},
        {label:'Priority school matching',included:false},
        {label:'Application tracking',included:false},
        {label:'Visa document checklist',included:false},
        {label:'Email alerts & reminders',included:false},
      ],
      cta:'Get Started Free',
      popular:false,
    },
    {
      id:'pro',
      name:'Pro',
      price:980,
      yearlyPrice:7980,
      color:'#C42020',
      icon:'💎',
      desc:'Everything you need for your Japan journey',
      features:[
        {label:'Browse 500+ language schools',included:true},
        {label:'Full visa guide & calculator',included:true},
        {label:'Community forum access',included:true},
        {label:'Job and scholarship listings',included:true},
        {label:'Cultural and life guides',included:true},
        {label:'Unlimited Sakura AI chat',included:true},
        {label:'Priority school matching',included:true},
        {label:'Application tracking system',included:true},
        {label:'Visa document checklist',included:true},
        {label:'Email alerts & reminders',included:true},
        {label:'Early access to new features',included:true},
      ],
      cta:'Start Pro Plan',
      popular:true,
    },
    {
      id:'lifetime',
      name:'Lifetime',
      price:29800,
      yearlyPrice:29800,
      color:'#F0A830',
      icon:'🏆',
      desc:'One-time payment, lifetime access',
      features:[
        {label:'Everything in Pro',included:true},
        {label:'Lifetime access - no monthly fees',included:true},
        {label:'Priority customer support',included:true},
        {label:'Exclusive community badge',included:true},
        {label:'Early access to all features',included:true},
        {label:'Input on new features',included:true},
        {label:'School application assistance',included:true},
        {label:'Direct visa consultation',included:true},
        {label:'Dedicated success manager',included:true},
        {label:'Exclusive BD & NP alumni network',included:true},
        {label:'Job referral network',included:true},
      ],
      cta:'Get Lifetime Access',
      popular:false,
    },
  ]

  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'60px 20px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'12px'}}>Simple, Transparent Pricing</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'16px',marginBottom:'28px'}}>Start free, upgrade when you are ready</p>

        <div style={{display:'inline-flex',background:'#0D0907',borderRadius:'10px',padding:'4px',border:'1px solid rgba(255,255,255,0.1)'}}>
          <button onClick={()=>setBillingPeriod('monthly')} style={{background:billingPeriod==='monthly'?'#C42020':'transparent',color:'white',border:'none',borderRadius:'8px',padding:'8px 20px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            Monthly
          </button>
          <button onClick={()=>setBillingPeriod('yearly')} style={{background:billingPeriod==='yearly'?'#C42020':'transparent',color:'white',border:'none',borderRadius:'8px',padding:'8px 20px',fontSize:'13px',fontWeight:'600',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
            Yearly
            <span style={{background:'#2EC87A',color:'white',padding:'2px 6px',borderRadius:'4px',fontSize:'10px',fontWeight:'700'}}>SAVE 32%</span>
          </button>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'48px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:'20px',marginBottom:'48px'}}>
          {plans.map(plan=>(
            <div key={plan.id} style={{background:'#1A2035',borderRadius:'16px',overflow:'hidden',border:'2px solid ' + (plan.popular?plan.color:'rgba(255,255,255,0.08)'),position:'relative'}}>
              {plan.popular && (
                <div style={{background:'#C42020',color:'white',textAlign:'center',padding:'8px',fontSize:'12px',fontWeight:'700',letterSpacing:'1px'}}>
                  MOST POPULAR
                </div>
              )}
              <div style={{padding:'28px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
                  <span style={{fontSize:'32px'}}>{plan.icon}</span>
                  <div>
                    <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'2px'}}>{plan.name}</h2>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>{plan.desc}</p>
                  </div>
                </div>

                <div style={{marginBottom:'24px'}}>
                  {plan.price === 0 ? (
                    <div style={{color:'white',fontSize:'36px',fontWeight:'700'}}>Free</div>
                  ) : plan.id === 'lifetime' ? (
                    <div>
                      <span style={{color:'white',fontSize:'36px',fontWeight:'700'}}>¥{plan.price.toLocaleString()}</span>
                      <span style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}> one-time</span>
                    </div>
                  ) : (
                    <div>
                      <span style={{color:'white',fontSize:'36px',fontWeight:'700'}}>
                        ¥{billingPeriod==='monthly'?plan.price.toLocaleString():Math.round(plan.yearlyPrice/12).toLocaleString()}
                      </span>
                      <span style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>/month</span>
                      {billingPeriod==='yearly' && (
                        <div style={{color:'#2EC87A',fontSize:'12px',marginTop:'4px'}}>¥{plan.yearlyPrice.toLocaleString()}/year · Save ¥{(plan.price*12-plan.yearlyPrice).toLocaleString()}</div>
                      )}
                    </div>
                  )}
                </div>

                <button onClick={()=>handleCheckout(plan.id)} disabled={loading} style={{width:'100%',background:plan.popular?plan.color:'rgba(255,255,255,0.08)',color:'white',border:'1px solid ' + (plan.popular?'transparent':'rgba(255,255,255,0.2)'),borderRadius:'10px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:'pointer',marginBottom:'24px'}}>
                  {loading?'Loading...':plan.cta}
                </button>

                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {plan.features.map((feature,i)=>(
                    <div key={i} style={{display:'flex',gap:'10px',alignItems:'center'}}>
                      <span style={{color:feature.included?'#2EC87A':'rgba(255,255,255,0.2)',fontSize:'14px',flexShrink:0}}>{feature.included?'✓':'✗'}</span>
                      <span style={{color:feature.included?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.3)',fontSize:'13px'}}>{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:'#1A2035',borderRadius:'16px',padding:'32px',marginBottom:'32px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2 style={{color:'white',fontSize:'22px',fontWeight:'700',marginBottom:'20px',textAlign:'center'}}>Frequently Asked Questions</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'16px'}}>
            {[
              {q:'Can I cancel anytime?',a:'Yes! You can cancel your Pro subscription anytime. You will keep access until the end of your billing period.'},
              {q:'Is there a free trial?',a:'Yes! Our Free plan gives you access to most features. Upgrade to Pro when you need unlimited AI chat and advanced features.'},
              {q:'What payment methods?',a:'We accept all major credit and debit cards through Stripe. Safe and secure payment processing.'},
              {q:'Is my data safe?',a:'Yes! We use Supabase for secure data storage with encryption. We never share your personal data with third parties.'},
              {q:'Can I get a refund?',a:'We offer refunds within 7 days of payment if you are not satisfied. Contact us at hello@japanlifeguide.app.'},
              {q:'Do you offer student discounts?',a:'Contact us at hello@japanlifeguide.app with proof of enrollment and we will work something out!'},
            ].map((faq,i)=>(
              <div key={i} style={{background:'#0D0907',borderRadius:'10px',padding:'16px'}}>
                <h3 style={{color:'white',fontSize:'14px',fontWeight:'700',marginBottom:'6px'}}>{faq.q}</h3>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',lineHeight:'1.6'}}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:'center'}}>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'16px'}}>
            Still have questions? Ask our AI assistant!
          </p>
          <a href="/chat" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'12px 28px',borderRadius:'8px',fontSize:'14px',fontWeight:'700'}}>
            Ask Sakura AI 🌸
          </a>
        </div>
      </div>
    </main>
  )
}