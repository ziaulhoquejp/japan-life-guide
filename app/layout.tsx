import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FeedbackButton from './components/FeedbackButton'
import PushNotification from './components/PushNotification'
import ThemeToggle from './components/ThemeToggle'
import ServiceWorker from './components/ServiceWorker'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Japan Life Guide — Study & Work in Japan',
  description: 'Complete guide for Bangladesh and Nepal students going to Japan. Find language schools, visa guides, jobs, scholarships and AI assistance.',
  keywords: 'Japan study, Japanese language school, student visa Japan, Bangladesh Japan, Nepal Japan, SSW visa, JLPT, scholarships Japan',
  authors: [{ name: 'Japan Life Guide' }],
  creator: 'Japan Life Guide',
  publisher: 'Japan Life Guide',
  metadataBase: new URL('https://japanlifeguide.app'),
  openGraph: {
    title: 'Japan Life Guide — Study & Work in Japan',
    description: 'Complete guide for Bangladesh and Nepal students going to Japan. 200+ schools, AI chat, visa guide, jobs and scholarships.',
    url: 'https://japanlifeguide.app',
    siteName: 'Japan Life Guide',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Japan Life Guide — Study & Work in Japan',
    description: 'Complete guide for Bangladesh and Nepal students going to Japan.',
    creator: '@japanlifeguide',
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C42020" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Japan Life Guide" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        {gaId && (
          <>
            <Script src={'https://www.googletagmanager.com/gtag/js?id=' + gaId} strategy="afterInteractive"/>
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
        <Footer />
        <FeedbackButton />
        <PushNotification />
        <ThemeToggle />
        <ServiceWorker />
      </body>
    </html>
  )
}