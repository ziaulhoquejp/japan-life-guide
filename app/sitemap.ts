import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://japanlifeguide.app'

  const pages = [
    { url: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/schools', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/visa', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/chat', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/jobs', priority: 0.8, changeFrequency: 'daily' as const },
    { url: '/scholarships', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/visa-calculator', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/cost-calculator', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/housing', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/prefectures', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/learn-japanese', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/news', priority: 0.8, changeFrequency: 'daily' as const },
    { url: '/faq', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/community', priority: 0.7, changeFrequency: 'daily' as const },
    { url: '/compare', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/apply', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/halal', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/culture', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/emergency', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/currency', priority: 0.6, changeFrequency: 'daily' as const },
    { url: '/flights', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/insurance', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/pricing', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'monthly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'monthly' as const },
  ]

  return pages.map(page => ({
    url: baseUrl + page.url,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}