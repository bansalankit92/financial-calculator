import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallow crawling URLs with query parameters to reduce edge requests
        disallow: ['/*?*'],
      },
    ],
    sitemap: 'https://fincalculator.in/sitemap.xml',
  }
}

// Cache robots.txt for 24 hours
export const revalidate = 86400 