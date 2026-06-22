import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && date <= now()] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    author,
    category,
    excerpt,
    image,
    tags
  }
`;

export const allPostsIncludingScheduledQuery = groq`
  *[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    author,
    category,
    excerpt,
    image,
    tags
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && date <= now()][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    author,
    category,
    excerpt,
    image,
    tags,
    body
  }
`;

export const postBySlugIncludingScheduledQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    author,
    category,
    excerpt,
    image,
    tags,
    body
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && date <= now()].slug.current
`;
