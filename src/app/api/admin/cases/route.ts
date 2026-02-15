import { NextResponse } from 'next/server';
import { getCases, createCase } from '@/lib/cases-db';

export async function GET() {
  const cases = await getCases();
  return NextResponse.json(cases);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCase = await createCase(body);
    return NextResponse.json(newCase);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create case' },
      { status: 500 }
    );
  }
}
