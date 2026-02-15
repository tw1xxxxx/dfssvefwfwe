import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/lib/data/cases.json');

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  serviceType: "web" | "mobile" | "crm" | "automation";
  title: string;
  challenge: string;
  solution: string;
  result: string[];
  tech: string[];
  price: string;
  duration: string;
  tags: string[];
  imageUrl?: string;
  gallery?: string[];
  videoUrl?: string;
  fullDescription?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
};

export async function getCases(): Promise<CaseStudy[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading cases:', error);
    return [];
  }
}

export async function saveCases(cases: CaseStudy[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(cases, null, 2), 'utf-8');
}

export async function getCaseBySlug(slug: string): Promise<CaseStudy | undefined> {
  const cases = await getCases();
  return cases.find((c) => c.slug === slug);
}

export async function updateCase(slug: string, data: Partial<CaseStudy>): Promise<CaseStudy | null> {
  const cases = await getCases();
  const index = cases.findIndex((c) => c.slug === slug);
  
  if (index === -1) return null;
  
  cases[index] = { ...cases[index], ...data };
  await saveCases(cases);
  return cases[index];
}

export async function createCase(data: CaseStudy): Promise<CaseStudy> {
  const cases = await getCases();
  // Check if slug already exists
  if (cases.some(c => c.slug === data.slug)) {
    throw new Error(`Case with slug "${data.slug}" already exists`);
  }
  cases.push(data);
  await saveCases(cases);
  return data;
}

export async function deleteCase(slug: string): Promise<boolean> {
  let cases = await getCases();
  const initialLength = cases.length;
  cases = cases.filter(c => c.slug !== slug);
  if (cases.length === initialLength) return false;
  await saveCases(cases);
  return true;
}
