import { getAllPosts, getPostBySlug, getPostSlugs, getImageUrl } from "@/lib/blog";
import type { BlogPost, BlogPostWithBody, SanityImage } from "@/lib/blog";

const mockFetch = jest.fn();

jest.mock("next-sanity", () => ({
  groq: (strings: TemplateStringsArray, ...values: unknown[]) =>
    String.raw({ raw: strings }, ...values),
  PortableText: () => null,
}));

jest.mock("@/sanity/env", () => ({
  isSanityConfigured: true,
  projectId: "test-project",
  dataset: "production",
  apiVersion: "2024-01-01",
}));

jest.mock("@/sanity/lib/client", () => ({
  client: { fetch: (...args: unknown[]) => mockFetch(...args) },
}));

jest.mock("@/sanity/lib/image", () => ({
  urlFor: (source: SanityImage) => ({
    width: () => ({
      height: () => ({
        url: () => `https://cdn.sanity.io/images/test/${source.asset._ref}`,
      }),
    }),
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const samplePost: BlogPost = {
  _id: "post-1",
  slug: "test-post",
  title: "Test Post Title",
  date: "2026-06-01T00:00:00Z",
  author: "Jane Doe",
  category: "Architecture",
  excerpt: "A short excerpt about architecture.",
  image: { asset: { _ref: "image-abc-300x200-jpg" } },
  tags: ["design", "modern"],
};

const samplePost2: BlogPost = {
  _id: "post-2",
  slug: "minimal-post",
  title: "Minimal Post",
  date: "2026-01-15T00:00:00Z",
  author: "John Smith",
  category: "Interior Design",
  excerpt: "Minimal excerpt.",
  image: null,
  tags: [],
};

const samplePostWithBody: BlogPostWithBody = {
  ...samplePost,
  body: [
    {
      _type: "block",
      _key: "block-1",
      children: [{ _type: "span", _key: "span-1", text: "Introduction paragraph.", marks: [] }],
      markDefs: [],
      style: "normal",
    },
  ],
};

describe("getAllPosts", () => {
  it("returns posts from Sanity", async () => {
    mockFetch.mockResolvedValue([samplePost, samplePost2]);

    const posts = await getAllPosts();

    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("Test Post Title");
    expect(posts[0].slug).toBe("test-post");
    expect(posts[1].title).toBe("Minimal Post");
  });

  it("returns empty array when no posts exist", async () => {
    mockFetch.mockResolvedValue([]);

    const posts = await getAllPosts();
    expect(posts).toHaveLength(0);
  });

  it("uses the published posts query by default (scheduled publishing)", async () => {
    mockFetch.mockResolvedValue([samplePost]);

    await getAllPosts();

    const query = mockFetch.mock.calls[0][0] as string;
    expect(query).toContain("date <= now()");
  });

  it("uses the all posts query when includeScheduled is true", async () => {
    mockFetch.mockResolvedValue([samplePost]);

    await getAllPosts({ includeScheduled: true });

    const query = mockFetch.mock.calls[0][0] as string;
    expect(query).not.toContain("date <= now()");
  });

  it("defaults empty author and category to empty string", async () => {
    mockFetch.mockResolvedValue([{ ...samplePost, author: null, category: null }]);

    const posts = await getAllPosts();
    expect(posts[0].author).toBe("");
    expect(posts[0].category).toBe("");
  });

  it("defaults null tags to empty array", async () => {
    mockFetch.mockResolvedValue([{ ...samplePost, tags: null }]);

    const posts = await getAllPosts();
    expect(posts[0].tags).toEqual([]);
  });
});

describe("getPostBySlug", () => {
  it("returns post data with body for an existing slug", async () => {
    mockFetch.mockResolvedValue(samplePostWithBody);

    const result = await getPostBySlug("test-post");

    expect(result).not.toBeNull();
    expect(result!.post.title).toBe("Test Post Title");
    expect(result!.post.slug).toBe("test-post");
    expect(result!.post.author).toBe("Jane Doe");
    expect(result!.post.category).toBe("Architecture");
    expect(result!.post.tags).toEqual(["design", "modern"]);
    expect(result!.post.body).toHaveLength(1);
  });

  it("returns null for a non-existent slug", async () => {
    mockFetch.mockResolvedValue(null);

    const result = await getPostBySlug("non-existent");
    expect(result).toBeNull();
  });

  it("uses published query by default (enforces scheduled publishing)", async () => {
    mockFetch.mockResolvedValue(samplePostWithBody);

    await getPostBySlug("test-post");

    const query = mockFetch.mock.calls[0][0] as string;
    expect(query).toContain("date <= now()");
  });

  it("uses unfiltered query when includeScheduled is true", async () => {
    mockFetch.mockResolvedValue(samplePostWithBody);

    await getPostBySlug("test-post", { includeScheduled: true });

    const query = mockFetch.mock.calls[0][0] as string;
    expect(query).not.toContain("date <= now()");
  });

  it("passes slug as query parameter", async () => {
    mockFetch.mockResolvedValue(samplePostWithBody);

    await getPostBySlug("test-post");

    expect(mockFetch.mock.calls[0][1]).toEqual({ slug: "test-post" });
  });

  it("defaults empty author and category to empty string", async () => {
    mockFetch.mockResolvedValue({ ...samplePostWithBody, author: null, category: null });

    const result = await getPostBySlug("test-post");
    expect(result!.post.author).toBe("");
    expect(result!.post.category).toBe("");
  });
});

describe("getPostSlugs", () => {
  it("returns an array of slug strings", async () => {
    mockFetch.mockResolvedValue(["post-1", "post-2", "post-3"]);

    const slugs = await getPostSlugs();
    expect(slugs).toEqual(["post-1", "post-2", "post-3"]);
  });

  it("returns empty array when no posts exist", async () => {
    mockFetch.mockResolvedValue([]);

    const slugs = await getPostSlugs();
    expect(slugs).toEqual([]);
  });
});

describe("getImageUrl", () => {
  it("returns Sanity CDN URL for a valid image", () => {
    const image: SanityImage = { asset: { _ref: "image-abc-300x200-jpg" } };
    const url = getImageUrl(image);
    expect(url).toContain("cdn.sanity.io");
    expect(url).toContain("image-abc-300x200-jpg");
  });

  it("returns fallback URL when image is null", () => {
    const url = getImageUrl(null);
    expect(url).toBe("/images/hero-bg.jpg");
  });
});
