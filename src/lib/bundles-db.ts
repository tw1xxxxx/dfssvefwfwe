import fs from 'fs/promises';
import path from 'path';
import defaultBundles from './data/bundles.json';

const DB_PATH = path.join(process.cwd(), 'src/lib/data/bundles.json');

export type Bundle = {
  id: string;
  title: string;
  shortDescription?: string;
  images?: string[];
  includes: string[];
  tech: string[];
  visibleTags?: string[];
  metaKeywords?: string[];
  duration: string;
  price: string;
  description?: string;
  detailedFeatures?: string[];
  videoSettings?: {
    trimEnd?: number;
  };
  metaTitle?: string;
  metaDescription?: string;
};

export async function getBundles(): Promise<Bundle[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading bundles, falling back to bundled data:', error);
    return defaultBundles as Bundle[];
  }
}

export async function saveBundles(bundles: Bundle[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(bundles, null, 2), 'utf-8');
}

export async function getBundleById(id: string): Promise<Bundle | undefined> {
  const bundles = await getBundles();
  return bundles.find((b) => b.id === id);
}

export async function updateBundle(id: string, data: Partial<Bundle>): Promise<Bundle | null> {
  const bundles = await getBundles();
  const index = bundles.findIndex((b) => b.id === id);
  
  if (index === -1) return null;
  
  bundles[index] = { ...bundles[index], ...data };
  await saveBundles(bundles);
  return bundles[index];
}
