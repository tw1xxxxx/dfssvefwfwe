import fs from 'fs/promises';
import path from 'path';
import defaultConfig from './data/site-config.json';

const CONFIG_PATH = path.join(process.cwd(), 'src/lib/data/site-config.json');

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
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
}
