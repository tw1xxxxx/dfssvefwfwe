import { NextResponse } from 'next/server';
import { getSiteConfig, saveSiteConfig } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = await getSiteConfig();
  return NextResponse.json(config);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await saveSiteConfig(body);
    return NextResponse.json(body);
  } catch (error) {
    console.error('Error updating site config:', error);
    return NextResponse.json(
      { error: 'Failed to update site config' },
      { status: 500 }
    );
  }
}
