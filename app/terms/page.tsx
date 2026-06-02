export default function TermsPage() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Terms of Service</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Last updated: May 2025</p>
      </div>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'48px 20px'}}>
        {[
          {
            title:'1. Acceptance of Terms',
            content:'By accessing and using Japan Life Guide, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.'
          },
          {
            title:'2. Description of Service',
            content:'Japan Life Guide provides information and tools to help students from Bangladesh and Nepal study and work in Japan. This includes school listings, visa guides, AI assistance, job listings, and community features.'
          },
          {
            title:'3. User Accounts',
            content:'You must register for an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.'
          },
          {
            title:'4. Free and Pro Plans',
            content:'We offer a free plan with basic features and a Pro plan at 980 Yen per month. Pro plan features are clearly marked on our pricing page. We reserve the right to modify pricing with 30 days notice.'
          },
          {
            title:'5. User Content',
            content:'You retain ownership of content you post (reviews, community posts). By posting, you grant us a license to display and distribute your content on our platform. You must not post false, harmful, or illegal content.'
          },
          {
            title:'6. Accuracy of Information',
            content:'We strive to provide accurate school and visa information, but this may change. Always verify important information with official sources such as the Japanese Embassy and school websites.'
          },
          {
            title:'7. AI Assistant',
            content:'Our Sakura AI assistant provides general guidance only. It is not a substitute for professional legal or immigration advice. For official visa matters, consult the Japanese Embassy or a qualified immigration lawyer.'
          },
          {
            title:'8. Prohibited Uses',
            content:'You may not use our service for illegal purposes, to spam or harass others, to scrape or copy our content without permission, or to impersonate others.'
          },
          {
            title:'9. Payments and Refunds',
            content:'Pro plan payments are processed by Stripe. Subscriptions auto-renew monthly. You may cancel at any time. Refunds are considered on a case-by-case basis within 7 days of payment.'
          },
          {
            title:'10. Limitation of Liability',
            content:'Japan Life Guide is not liable for decisions made based on our content. We provide information as a guide only. We are not responsible for visa rejections, school rejections, or other outcomes.'
          },
          {
            title:'11. Changes to Terms',
            content:'We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.'
          },
          {
            title:'12. Contact',
            content:'For questions about these Terms, contact us at hello@japanlifeguide.app.'
          },
        ].map(section=>(
          <div key={section.title} style={{marginBottom:'32px'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'12px',borderLeft:'3px solid #C42020',paddingLeft:'12px'}}>{section.title}</h2>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.8'}}>{section.content}</p>
          </div>
        ))}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)',marginTop:'40px'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Questions about our terms?</p>
          <a href="/contact" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Contact Us</a>
        </div>
      </div>
    </main>
  )
}