import { ROUTES } from '@/constants/routes'
import { MetadataRoute } from 'next'

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
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
} 