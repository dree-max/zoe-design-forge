import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
  tags: string[];
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: "" };

  const fm: Record<string, string | string[]> = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...vals] = line.split(":");
    if (key && vals.length) {
      const val = vals.join(":").trim();
      if (val.startsWith("[") && val.endsWith("]")) {
        fm[key.trim()] = val.slice(1, -1).split(",").map((t) => t.trim().replace(/^"|"$/g, ""));
      } else {
        fm[key.trim()] = val.replace(/^"|"$/g, "");
      }
    }
  });

  return { data: fm, content: match[2] };
}

function toBlogPost(slug: string, data: Record<string, string | string[]>): BlogPost {
  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    author: (data.author as string) || "",
    category: (data.category as string) || "",
    excerpt: (data.excerpt as string) || "",
    image: (data.image as string) || "/images/hero-bg.jpg",
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
}

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts({ includeScheduled = false } = {}): BlogPost[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data } = parseFrontmatter(raw);
    return toBlogPost(slug, data);
  });

  const sorted = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (includeScheduled) return sorted;

  const now = new Date();
  return sorted.filter((post) => !post.date || new Date(post.date) <= now);
}

export function getPostBySlug(slug: string, { includeScheduled = false } = {}): { post: BlogPost; content: string } | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);
  const post = toBlogPost(slug, data);

  if (!includeScheduled && post.date && new Date(post.date) > new Date()) {
    return null;
  }

  return { post, content };
}
