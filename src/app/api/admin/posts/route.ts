import { NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/posts-db';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPost = await createPost(body);
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create post' },
      { status: 500 }
    );
  }
}
