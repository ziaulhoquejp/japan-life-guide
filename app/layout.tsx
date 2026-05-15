import type { Metadata } from 'next'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Japan Life Guide — Study & Work in Japan',
  description: 'The complete guide for Bangladesh and Nepal students going to Japan. Find language schools, visa info, jobs, and community support.',
  keywords: 'Japan study, Japanese language school, student visa Japan, work in Japan, Bangladesh Japan, Nepal Japan',
  openGraph: {
    title: 'Japan Life Guide',
    description: 'Your complete guide to studying and working in Japan',
    type: 'website',
    locale: 'en_US',
    siteName: 'Japan Life Guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Japan Life Guide',
    description: 'Your complete guide to studying and working in Japan',
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
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}