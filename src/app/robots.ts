import { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/site-config';

export const revalidate = 60;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getSiteConfig();
  const baseUrl = config.url || 'https://alpha.dev';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
