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
};

export async function getBundles(): Promise<Bundle[]> {
  try {
    // Prefer direct import for static serving (Vercel)
    // This ensures data is available even if fs access fails
    return bundlesData as Bundle[];
  } catch (error) {
    console.error('Error reading bundles from import, falling back to fs:', error);
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (fsError) {
        console.error('Error reading bundles from fs:', fsError);
        return [];
    }
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
