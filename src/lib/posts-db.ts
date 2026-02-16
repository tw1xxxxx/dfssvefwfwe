import fs from 'fs/promises';
import path from 'path';
import defaultPosts from './data/posts.json';

const DB_PATH = path.join(process.cwd(), 'src/lib/data/posts.json');

export type PostContent = {
  type: "p" | "h2" | "li";
  text: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: PostContent[];
  coverImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  published?: boolean;
};

export async function getPosts(): Promise<Post[]> {
  // In Vercel environment, we should rely on the bundled JSON data
  // rather than trying to read from the filesystem at runtime,
  // as the file paths might differ or be inaccessible.
  return defaultPosts as Post[];
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((p) => p.published !== false);
}

export async function savePosts(posts: Post[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(posts, null, 2), 'utf-8');
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

export async function updatePost(slug: string, data: Partial<Post>): Promise<Post | null> {
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...data };
  await savePosts(posts);
  return posts[index];
}

export async function createPost(data: Post): Promise<Post> {
  const posts = await getPosts();
  if (posts.some(p => p.slug === data.slug)) {
    throw new Error(`Post with slug "${data.slug}" already exists`);
  }
  posts.push(data);
  await savePosts(posts);
  return data;
}

export async function deletePost(slug: string): Promise<boolean> {
  let posts = await getPosts();
  const initialLength = posts.length;
  posts = posts.filter(p => p.slug !== slug);
  if (posts.length === initialLength) return false;
  await savePosts(posts);
  return true;
}
