import { ROUTES } from '@/constants/routes'
import { MetadataRoute } from 'next'

// Static date for sitemap - update this when making significant changes
const LAST_MODIFIED = new Date('2025-01-28')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fincalculator.in'

  // Add your routes here
  const routes = [
    '',
    '/contact',
    ...Object.values(ROUTES),
    // Add more routes as needed
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}

// Cache sitemap for 24 hours
export const revalidate = 86400 