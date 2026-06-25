import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
const baseUrl = 'https://japanlifeguide.app'

const pages = [
'',
'/schools',
'/visa',
'/chat',
'/pricing',
'/jlpt-test',
'/learn-japanese',
'/cities',
'/prefectures',
'/scholarships',
'/halal',
'/jobs',
'/housing',
'/cost-calculator',
'/visa-calculator',
'/calendar',
'/blog',
'/community',
'/ranking',
'/compare',
'/visa-consult',
'/register',
'/login',
]

return pages.map(page => ({
url: baseUrl + page,
lastModified: new Date(),
changeFrequency: page === '' ? 'daily' : 'weekly',
priority: page === '' ? 1 : page === '/schools' ? 0.9 : 0.7,
}))
}