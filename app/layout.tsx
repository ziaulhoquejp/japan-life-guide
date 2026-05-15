import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

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
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}