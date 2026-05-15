export default function PrivacyPage() {
  return (
    <main style={{minHeight:'100vh',background:'#0D0907',fontFamily:'sans-serif',padding:'60px 20px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <h1 style={{color:'white',fontSize:'36px',fontWeight:'700',marginBottom:'8px'}}>Privacy Policy</h1>
        <p style={{color:'rgba(255,255,255,0.4)',marginBottom:'40px'}}>Last updated: May 2025</p>

        {[
          {title:'1. Information We Collect',text:'We collect information you provide when creating an account, including your name, email address, and country of origin. We also collect usage data to improve our services.'},
          {title:'2. How We Use Your Information',text:'We use your information to provide and improve Japan Life Guide services, send important updates about your visa applications, and personalize your experience.'},
          {title:'3. Data Storage',text:'Your data is stored securely using Supabase (PostgreSQL). We use industry-standard encryption to protect your personal information.'},
          {title:'4. AI Chat Data',text:'Conversations with Sakura AI are stored for 90 days to provide context. We do not use your conversations to train AI models without your consent.'},
          {title:'5. Payment Information',text:'Payment processing is handled by Stripe. We do not store your credit card information on our servers.'},
          {title:'6. Your Rights',text:'You have the right to access, correct, or delete your personal data. Contact us at privacy@japanlifeguide.com to exercise these rights.'},
          {title:'7. Contact Us',text:'For privacy concerns, email us at privacy@japanlifeguide.com. We respond within 30 days.'},
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