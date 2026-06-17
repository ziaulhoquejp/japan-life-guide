export default function PrivacyPage() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',padding:'40px 20px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Privacy Policy</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'40px'}}>Last updated: June 2025</p>

        {[
          {
            title:'1. Information We Collect',
            content:'We collect information you provide directly to us, such as when you create an account, submit an application, or contact us. This includes: name, email address, country of origin, educational background, Japanese language level, and preferences for studying in Japan. We also automatically collect certain information when you use our service, including log data, device information, and usage patterns through Google Analytics.'
          },
          {
            title:'2. How We Use Your Information',
            content:'We use the information we collect to: (a) provide, maintain, and improve our services; (b) match you with appropriate Japanese language schools; (c) send you emails about your account, applications, and our services; (d) respond to your comments and questions; (e) analyze usage patterns to improve our service; (f) process payments through Stripe; (g) prevent fraud and ensure security.'
          },
          {
            title:'3. Information Sharing',
            content:'We do not sell your personal information to third parties. We may share your information with: (a) Japanese language schools when you submit an application or inquiry; (b) service providers who assist us in operating our website (Supabase, Stripe, Resend, Vercel, Anthropic); (c) law enforcement when required by law. We ensure all third-party providers maintain appropriate security standards.'
          },
          {
            title:'4. Data Storage and Security',
            content:'Your data is stored securely using Supabase (PostgreSQL database) with encryption at rest and in transit. We use Row Level Security (RLS) to ensure users can only access their own data. Payment information is handled entirely by Stripe and is never stored on our servers. We implement industry-standard security measures to protect your personal information.'
          },
          {
            title:'5. Cookies and Tracking',
            content:'We use cookies and similar tracking technologies to track activity on our service and hold certain information. We use Google Analytics to analyze usage patterns. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Our service uses Supabase for authentication, which may set cookies necessary for login functionality.'
          },
          {
            title:'6. AI Chat (Sakura AI)',
            content:'Our AI assistant is powered by Anthropic Claude. When you use Sakura AI, your messages are sent to Anthropic\'s API for processing. We do not store your chat history permanently. Please do not share sensitive personal information such as passport numbers or financial details in the chat. Anthropic\'s privacy policy applies to data processed by their API.'
          },
          {
            title:'7. Your Rights',
            content:'You have the right to: (a) access the personal information we hold about you; (b) correct inaccurate information; (c) request deletion of your account and data; (d) opt out of marketing emails; (e) export your data. To exercise these rights, please contact us at hello@japanlifeguide.app. We will respond to your request within 30 days.'
          },
          {
            title:'8. Data Retention',
            content:'We retain your personal information for as long as your account is active or as needed to provide services. If you delete your account, we will delete your personal information within 30 days, except where we are required to retain it for legal purposes. Review data and application data may be retained in anonymized form.'
          },
          {
            title:'9. Children\'s Privacy',
            content:'Our service is not directed to children under 16 years of age. We do not knowingly collect personal information from children under 16. If we discover that a child under 16 has provided us with personal information, we will delete it immediately.'
          },
          {
            title:'10. International Data Transfers',
            content:'Your information may be transferred to and processed in countries other than your own, including Japan, the United States, and other countries where our service providers operate. We ensure appropriate safeguards are in place for international data transfers in compliance with applicable data protection laws.'
          },
          {
            title:'11. Changes to This Policy',
            content:'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.'
          },
          {
            title:'12. Contact Us',
            content:'If you have any questions about this Privacy Policy or our data practices, please contact us at: hello@japanlifeguide.app or through our contact page at japanlifeguide.app/contact. We take privacy seriously and will respond to your inquiry within 48 hours.'
          },
        ].map((section,i)=>(
          <div key={i} style={{marginBottom:'32px'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'12px'}}>{section.title}</h2>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.8'}}>{section.content}</p>
          </div>
        ))}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',marginTop:'40px',border:'1px solid rgba(255,255,255,0.08)',textAlign:'center'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Questions about our privacy policy?</p>
          <a href="/contact" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Contact Us</a>
        </div>
      </div>
    </main>
  )
}