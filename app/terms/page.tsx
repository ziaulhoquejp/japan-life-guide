export default function TermsPage() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',padding:'40px 20px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Terms of Service</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'40px'}}>Last updated: June 2025</p>

        {[
          {
            title:'1. Acceptance of Terms',
            content:'By accessing and using Japan Life Guide (japanlifeguide.app), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
          },
          {
            title:'2. Description of Service',
            content:'Japan Life Guide provides information and tools to help students from Bangladesh, Nepal, and other countries research and apply to Japanese language schools. Our services include school search, visa guidance, AI chat assistance (Sakura AI), community forums, and related educational content.'
          },
          {
            title:'3. User Accounts',
            content:'To access certain features of our service, you must register for an account. You agree to provide accurate, current and complete information during registration. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.'
          },
          {
            title:'4. Free and Pro Plans',
            content:'Japan Life Guide offers both free and paid (Pro) subscription plans. Free plan users have access to basic features including school search and limited AI chat. Pro plan subscribers (¥980/month or ¥7,980/year) have access to unlimited AI chat, priority school matching, application tracking, and other premium features. Lifetime plan subscribers pay a one-time fee of ¥29,800 for permanent access to Pro features.'
          },
          {
            title:'5. Payment and Refunds',
            content:'Pro subscriptions are billed monthly or annually through Stripe. You may cancel your subscription at any time. Upon cancellation, you will retain access to Pro features until the end of your current billing period. We offer refunds within 7 days of purchase if you are not satisfied with our service. Please contact us at hello@japanlifeguide.app for refund requests.'
          },
          {
            title:'6. Affiliate Program',
            content:'Japan Life Guide offers an affiliate program where users can earn rewards by referring new Pro subscribers. Rewards are credited to your account when referred users upgrade to a paid plan. Minimum withdrawal amount is ¥5,000. Japan Life Guide reserves the right to modify or terminate the affiliate program at any time.'
          },
          {
            title:'7. Accuracy of Information',
            content:'While we strive to provide accurate and up-to-date information about Japanese language schools, visa requirements, and related topics, we cannot guarantee the accuracy, completeness, or timeliness of all information. School fees, visa requirements, and other details may change. Always verify important information directly with schools and official government sources.'
          },
          {
            title:'8. AI Chat (Sakura AI)',
            content:'Our AI assistant (Sakura AI) is powered by Anthropic Claude and is designed to provide helpful information about studying in Japan. However, Sakura AI responses should not be considered as legal, financial, or official immigration advice. Always consult with qualified professionals for important decisions regarding visas and immigration.'
          },
          {
            title:'9. User Content',
            content:'By submitting reviews, community posts, or other content to Japan Life Guide, you grant us a non-exclusive, royalty-free license to use, display, and distribute that content in connection with our services. You are responsible for ensuring that your content does not violate any laws or third-party rights.'
          },
          {
            title:'10. Prohibited Activities',
            content:'You agree not to: (a) use our service for any illegal purpose; (b) submit false or misleading information; (c) attempt to gain unauthorized access to our systems; (d) spam or harass other users; (e) scrape or copy our content without permission; (f) use our service to promote competing services.'
          },
          {
            title:'11. Limitation of Liability',
            content:'Japan Life Guide shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our service. Our total liability shall not exceed the amount paid by you for our service in the past 12 months.'
          },
          {
            title:'12. Changes to Terms',
            content:'We reserve the right to modify these terms at any time. We will notify users of significant changes via email or by posting a notice on our website. Your continued use of our service after changes constitutes your acceptance of the new terms.'
          },
          {
            title:'13. Contact Information',
            content:'If you have any questions about these Terms of Service, please contact us at hello@japanlifeguide.app or through our contact page at japanlifeguide.app/contact.'
          },
        ].map((section,i)=>(
          <div key={i} style={{marginBottom:'32px'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'12px'}}>{section.title}</h2>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.8'}}>{section.content}</p>
          </div>
        ))}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'40px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Questions about our terms?</p>
          <a href="/contact" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Contact Us</a>
        </div>
      </div>
    </main>
  )
}