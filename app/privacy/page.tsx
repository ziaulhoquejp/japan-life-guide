export default function PrivacyPage() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif'}}>
      <div style={{background:'#1A2035',padding:'40px',borderBottom:'3px solid #C42020',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Privacy Policy</h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px'}}>Last updated: May 2025</p>
      </div>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'48px 20px'}}>
        {[
          {
            title:'1. Information We Collect',
            content:'We collect information you provide when registering (name, email), using our services (school favorites, reviews), and automatically (usage data, device info). We use Supabase for secure data storage.'
          },
          {
            title:'2. How We Use Your Information',
            content:'We use your information to provide and improve our services, send important updates about your Japan journey, personalize your experience, and process payments securely through Stripe.'
          },
          {
            title:'3. Data Security',
            content:'We implement industry-standard security measures including encryption, secure HTTPS connections, and regular security audits. Your payment information is processed securely by Stripe and never stored on our servers.'
          },
          {
            title:'4. Cookies',
            content:'We use essential cookies for authentication and preferences. We use Google Analytics to understand how users interact with our service. You can disable cookies in your browser settings.'
          },
          {
            title:'5. Third-Party Services',
            content:'We use Supabase (database), Stripe (payments), Resend (emails), Google Analytics (analytics), and Anthropic Claude (AI chat). Each service has their own privacy policy.'
          },
          {
            title:'6. Your Rights',
            content:'You have the right to access, correct, or delete your personal data. You can export your data or request account deletion by contacting us at hello@japanlifeguide.app.'
          },
          {
            title:'7. Children\'s Privacy',
            content:'Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.'
          },
          {
            title:'8. Changes to This Policy',
            content:'We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on our website.'
          },
          {
            title:'9. Contact Us',
            content:'If you have any questions about this Privacy Policy, please contact us at hello@japanlifeguide.app or through our contact page.'
          },
        ].map(section=>(
          <div key={section.title} style={{marginBottom:'32px'}}>
            <h2 style={{color:'white',fontSize:'18px',fontWeight:'700',marginBottom:'12px',borderLeft:'3px solid #C42020',paddingLeft:'12px'}}>{section.title}</h2>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:'1.8'}}>{section.content}</p>
          </div>
        ))}

        <div style={{background:'#1A2035',borderRadius:'12px',padding:'20px',textAlign:'center',border:'1px solid rgba(255,255,255,0.08)',marginTop:'40px'}}>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'12px'}}>Questions about your privacy?</p>
          <a href="/contact" style={{background:'#C42020',color:'white',textDecoration:'none',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700'}}>Contact Us</a>
        </div>
      </div>
    </main>
  )
}