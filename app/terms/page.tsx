export default function TermsPage() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',padding:'60px 20px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Terms of Service</h1>
        <p style={{color:'rgba(255,255,255,0.4)',marginBottom:'40px'}}>Last updated: May 2025</p>

        {[
          {title:'1. Acceptance of Terms',text:'By using Japan Life Guide, you agree to these terms. If you do not agree, please do not use our service.'},
          {title:'2. Description of Service',text:'Japan Life Guide provides information about Japanese language schools, visa requirements, and job opportunities. We are an information platform, not a legal or immigration advisory service.'},
          {title:'3. User Accounts',text:'You must provide accurate information when creating an account. You are responsible for maintaining the security of your account and password.'},
          {title:'4. Subscriptions and Payments',text:'Pro subscriptions are billed monthly at 980 JPY. Lifetime access is available for 14800 JPY. Payments are processed by Stripe. Refunds are available within 14 days of purchase.'},
          {title:'5. AI Assistant',text:'Our AI assistant Sakura is powered by Claude (Anthropic). AI responses may contain errors. Always verify visa and immigration information with official sources.'},
          {title:'6. Limitation of Liability',text:'Japan Life Guide is not responsible for visa rejections, school admission decisions, or employment outcomes. Information is provided for general guidance only.'},
          {title:'7. Contact Us',text:'For questions about these terms, email us at legal@japanlifeguide.com'},
        ].map(section => (
          <div key={section.title} style={{marginBottom:'32px',paddingBottom:'32px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{color:'white',fontSize:'20px',fontWeight:'700',marginBottom:'12px'}}>{section.title}</h2>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'15px',lineHeight:'1.8'}}>{section.text}</p>
          </div>
        ))}
      </div>
    </main>
  )
}