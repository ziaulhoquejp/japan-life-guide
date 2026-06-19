import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.NEWS_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Japan immigration and study abroad related news
    const queries = [
      'Japan student visa',
      'Japan immigration policy',
      'study in Japan',
      'Japan work visa SSW',
    ]

    const allArticles: any[] = []

    for (const query of queries) {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.articles) {
        allArticles.push(...data.articles)
      }
    }

    // Remove duplicates by title
    const uniqueArticles = allArticles.filter((article, index, self) =>
      index === self.findIndex(a => a.title === article.title)
    )

    // Sort by date
    uniqueArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return NextResponse.json({ articles: uniqueArticles.slice(0, 20) })
  } catch (error) {
    console.error('News API error:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}