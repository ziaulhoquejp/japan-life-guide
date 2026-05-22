import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FeedbackButton from './components/FeedbackButton'
import PushNotification from './components/PushNotification'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Japan Life Guide — Study & Work in Japan',
  description: 'The complete guide for Bangladesh and Nepal students going to Japan.',
  keywords: 'Japan study, Japanese language school, student visa Japan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en">
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <Navbar />
        {children}
        <Footer /><FeedbackButton />
        <PushNotification />
      </body>
    </html>
  )
}