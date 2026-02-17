import { NextResponse } from 'next/server';
import { getBundles, createBundle, type Bundle } from '@/lib/bundles-db';
import { randomUUID } from 'crypto';

export async function GET() {
  const bundles = await getBundles();
  return NextResponse.json(bundles);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.price || !body.duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newBundle: Bundle = {
      id: body.id || randomUUID(),
      title: body.title,
      shortDescription: body.shortDescription || '',
      images: body.images || [],
      includes: body.includes || [],
      tech: body.tech || [],
      visibleTags: body.visibleTags || [],
      metaKeywords: body.metaKeywords || [],
      duration: body.duration,
      price: body.price,
      description: body.description || '',
      detailedFeatures: body.detailedFeatures || [],
      videoSettings: body.videoSettings,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
    };

    await createBundle(newBundle);
    
    return NextResponse.json(newBundle, { status: 201 });
  } catch (error) {
    console.error('Error creating bundle:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
