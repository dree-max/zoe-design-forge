import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";
import {
  postsQuery,
  allPostsIncludingScheduledQuery,
  postBySlugQuery,
  postBySlugIncludingScheduledQuery,
  postSlugsQuery,
} from "@/sanity/lib/queries";
import type { PortableTextBlock } from "next-sanity";

export interface SanityImage {
  asset: { _ref: string };
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  image: SanityImage | null;
  tags: string[];
}

export interface BlogPostWithBody extends BlogPost {
  body: PortableTextBlock[];
}

export function getImageUrl(image: SanityImage | null): string {
  if (!image) return "/images/hero-bg.jpg";
  return urlFor(image).width(800).height(450).url();
}

export async function getAllPosts({ includeScheduled = false } = {}): Promise<BlogPost[]> {
  if (!isSanityConfigured) return [];

  const query = includeScheduled ? allPostsIncludingScheduledQuery : postsQuery;
  const posts = await client.fetch<BlogPost[]>(query);
  return posts.map((post) => ({
    ...post,
    author: post.author || "",
    category: post.category || "",
    tags: post.tags || [],
  }));
}

export async function getPostBySlug(
  slug: string,
  { includeScheduled = false } = {},
): Promise<{ post: BlogPostWithBody } | null> {
  if (!isSanityConfigured) return null;

  const query = includeScheduled ? postBySlugIncludingScheduledQuery : postBySlugQuery;
  const post = await client.fetch<BlogPostWithBody | null>(query, { slug });
  if (!post) return null;
  return {
    post: {
      ...post,
      author: post.author || "",
      category: post.category || "",
      tags: post.tags || [],
    },
  };
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  return client.fetch<string[]>(postSlugsQuery);
}
