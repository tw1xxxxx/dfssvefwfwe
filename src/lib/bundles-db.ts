import fs from 'fs/promises';
import path from 'path';
// Import data directly for Vercel compatibility (read-only)
import bundlesData from './data/bundles.json';

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
  metaImage?: string;
};

export async function getBundles(): Promise<Bundle[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Error reading bundles from fs, falling back to import:', error);
    return bundlesData as Bundle[];
  }
}

export async function saveBundles(bundles: Bundle[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(bundles, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save bundles:', error);
    throw new Error('Failed to save data. Note: File system is read-only on Vercel.');
  }
}

export async function createBundle(bundle: Bundle): Promise<Bundle> {
  const bundles = await getBundles();
  bundles.push(bundle);
  await saveBundles(bundles);
  return bundle;
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
