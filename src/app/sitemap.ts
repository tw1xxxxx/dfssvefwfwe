import { MetadataRoute } from 'next';
import { getBundles } from '@/lib/bundles-db';
import { getCases } from '@/lib/cases-db';
import { getPosts } from '@/lib/posts-db';
import { getSiteConfig } from '@/lib/site-config';

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getSiteConfig();
  const baseUrl = config.url || 'https://alpha.dev';
  
  const [bundles, cases, posts] = await Promise.all([
    getBundles(),
    getCases(),
    getPosts(),
  ]);

  const bundleUrls = bundles.map((bundle) => ({
    url: `${baseUrl}/bundles/${bundle.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const caseUrls = cases.map((item) => ({
    url: `${baseUrl}/cases/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...bundleUrls,
    ...caseUrls,
    ...postUrls,
  ];
}
