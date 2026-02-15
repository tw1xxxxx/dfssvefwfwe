import { NextResponse } from 'next/server';
import { getBundles } from '@/lib/bundles-db';

export async function GET() {
  const bundles = await getBundles();
  return NextResponse.json(bundles);
}
