import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug, updatePost } from "@/lib/posts-db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const currentViews = post.views || 0;
    const newViews = currentViews + 1;
    
    // In Vercel/serverless environment, file system is read-only.
    // We swallow the error to allow the application to continue running
    // and return the incremented value for the current session/client
    try {
      await updatePost(slug, { views: newViews });
    } catch (fsError) {
      console.warn("Could not save views to filesystem (expected on Vercel):", fsError);
    }

    return NextResponse.json({ views: newViews });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
