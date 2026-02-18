import { NextResponse } from 'next/server';
import { updateBundle, getBundleById } from '@/lib/bundles-db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bundle = await getBundleById(id);
  
  if (!bundle) {
    return NextResponse.json({ error: 'Bundle not found' }, { status: 404 });
  }
  
  return NextResponse.json(bundle);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updated = await updateBundle(id, data);
    
    if (!updated) {
      return NextResponse.json({ error: 'Bundle not found' }, { status: 404 });
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
