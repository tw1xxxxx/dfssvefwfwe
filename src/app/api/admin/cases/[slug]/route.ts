import { NextResponse } from 'next/server';
import { getCaseBySlug, updateCase, deleteCase } from '@/lib/cases-db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);
  if (!item) {
    return NextResponse.json({ error: 'Case not found' }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const body = await request.json();
    const updated = await updateCase(slug, body);
    if (!updated) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update case' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const deleted = await deleteCase(slug);
  if (!deleted) {
    return NextResponse.json({ error: 'Case not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
