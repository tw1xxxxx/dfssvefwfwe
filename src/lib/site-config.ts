import defaultConfig from './data/site-config.json';

export type SiteConfig = {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  url?: string;
};

export async function getSiteConfig(): Promise<SiteConfig> {
  // In Vercel environment, we should rely on the bundled JSON data
  // rather than trying to read from the filesystem at runtime,
  // as the file paths might differ or be inaccessible.
  return defaultConfig as SiteConfig;
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  // In a real app with a backend, we would save to a database.
  // For this static site/demo, we can't persist changes to the filesystem in Vercel.
  console.warn('saveSiteConfig called but filesystem is read-only in this environment.');
}
