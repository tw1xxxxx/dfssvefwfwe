import defaultBundles from './data/bundles.json';

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
  // In Vercel environment, we should rely on the bundled JSON data
  // rather than trying to read from the filesystem at runtime,
  // as the file paths might differ or be inaccessible.
  return defaultBundles as Bundle[];
}

export async function saveBundles(bundles: Bundle[]): Promise<void> {
  // In a real app with a backend, we would save to a database.
  // For this static site/demo, we can't persist changes to the filesystem in Vercel.
  console.warn('saveBundles called but filesystem is read-only in this environment.');
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
