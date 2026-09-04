import type { MetadataRoute } from 'next'
import { guideSteps } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.heyneighborlabs.com'
  const staticPaths = ['', '/start', '/guide', '/block-party', '/ideas', '/resources', '/resources/first-block-party-kit', '/stories', '/workshop', '/share', '/partners']
  return [
    ...staticPaths.map((path) => ({ url: `${base}${path}`, changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : .8 })),
    ...guideSteps.map((step) => ({ url: `${base}/guide/${step.slug}`, changeFrequency: 'monthly' as const, priority: .8 })),
  ]
}
