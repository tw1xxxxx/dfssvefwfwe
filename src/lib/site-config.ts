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
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading site config, falling back to bundled data:', error);
    return defaultConfig as SiteConfig;
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
}
