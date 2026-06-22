import fs from "fs";
import path from "path";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

jest.mock("fs");
jest.mock("path");

const mockedFs = jest.mocked(fs);
const mockedPath = jest.mocked(path);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockReaddirSync = mockedFs.readdirSync as jest.Mock<any>;

const sampleMarkdown = `---
title: "Test Post Title"
date: "2026-06-01"
author: "Jane Doe"
category: "Architecture"
excerpt: "A short excerpt about architecture."
image: "/images/test.jpg"
tags: ["design", "modern"]
---

## Introduction

This is the body of the blog post.

### Section One

Some content here with **bold text**.
`;

const sampleMarkdownMinimal = `---
title: "Minimal Post"
date: "2026-01-15"
author: "John Smith"
category: "Interior Design"
excerpt: "Minimal excerpt."
image: "/images/minimal.jpg"
tags: []
---

Short body.
`;

const sampleMarkdownNoFrontmatter = `Just some plain text without frontmatter.`;

const sampleMarkdownEmptyTags = `---
title: "No Tags Post"
date: "2026-03-10"
author: "Alice"
category: "Landscape"
excerpt: "No tags here."
image: "/images/no-tags.jpg"
---

Content without tags field.
`;

const sampleMarkdownWithColonInValue = `---
title: "Post With Colon: A Special Case"
date: "2026-05-20"
author: "Bob"
category: "Design"
excerpt: "Testing colons: they should work."
image: "/images/colon.jpg"
tags: ["test"]
---

Body text.
`;

beforeEach(() => {
  jest.clearAllMocks();
  mockedPath.join.mockImplementation((...args: string[]) => args.join("/"));
});

describe("getAllPosts", () => {
  it("returns posts sorted by date (newest first)", () => {
    mockReaddirSync.mockReturnValue([
      "old-post.md",
      "new-post.md",
    ]);
    mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
      const p = String(filePath);
      if (p.includes("old-post.md")) return sampleMarkdownMinimal;
      if (p.includes("new-post.md")) return sampleMarkdown;
      return "";
    });

    const posts = getAllPosts();

    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("Test Post Title");
    expect(posts[0].date).toBe("2026-06-01");
    expect(posts[1].title).toBe("Minimal Post");
    expect(posts[1].date).toBe("2026-01-15");
  });

  it("filters out non-.md files", () => {
    mockReaddirSync.mockReturnValue([
      "post.md",
      "index.json",
      "readme.txt",
    ]);
    mockedFs.readFileSync.mockReturnValue(sampleMarkdown);

    const posts = getAllPosts();
    expect(posts).toHaveLength(1);
  });

  it("returns empty array when no posts exist", () => {
    mockReaddirSync.mockReturnValue([]);

    const posts = getAllPosts();
    expect(posts).toHaveLength(0);
  });

  it("uses slug as fallback title when title is missing from frontmatter", () => {
    mockReaddirSync.mockReturnValue([
      "no-frontmatter.md",
    ]);
    mockedFs.readFileSync.mockReturnValue(sampleMarkdownNoFrontmatter);

    const posts = getAllPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("no-frontmatter");
    expect(posts[0].slug).toBe("no-frontmatter");
  });

  it("handles posts without tags field", () => {
    mockReaddirSync.mockReturnValue([
      "no-tags.md",
    ]);
    mockedFs.readFileSync.mockReturnValue(sampleMarkdownEmptyTags);

    const posts = getAllPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].tags).toEqual([]);
  });

  it("handles colons in frontmatter values", () => {
    mockReaddirSync.mockReturnValue([
      "colon-post.md",
    ]);
    mockedFs.readFileSync.mockReturnValue(sampleMarkdownWithColonInValue);

    const posts = getAllPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("Post With Colon: A Special Case");
  });

  it("strips quotes from frontmatter values", () => {
    mockReaddirSync.mockReturnValue([
      "post.md",
    ]);
    mockedFs.readFileSync.mockReturnValue(sampleMarkdown);

    const posts = getAllPosts();
    expect(posts[0].author).toBe("Jane Doe");
    expect(posts[0].category).toBe("Architecture");
  });

  it("parses tags array from frontmatter", () => {
    mockReaddirSync.mockReturnValue([
      "post.md",
    ]);
    mockedFs.readFileSync.mockReturnValue(sampleMarkdown);

    const posts = getAllPosts();
    expect(posts[0].tags).toEqual(["design", "modern"]);
  });

  it("uses default image when image is missing", () => {
    const noImageMarkdown = `---
title: "No Image"
date: "2026-02-01"
author: "Test"
category: "Test"
excerpt: "No image"
tags: []
---

Body.
`;
    mockReaddirSync.mockReturnValue([
      "no-image.md",
    ]);
    mockedFs.readFileSync.mockReturnValue(noImageMarkdown);

    const posts = getAllPosts();
    expect(posts[0].image).toBe("/images/hero-bg.jpg");
  });

  it("hides future-dated posts by default (scheduled publishing)", () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const futureMarkdown = `---
title: "Future Post"
date: "${futureDate.toISOString().split("T")[0]}"
author: "Test"
category: "Test"
excerpt: "Scheduled"
image: "/images/test.jpg"
tags: []
---

Future body.
`;
    mockReaddirSync.mockReturnValue([
      "future-post.md",
      "old-post.md",
    ]);
    mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
      const p = String(filePath);
      if (p.includes("future-post.md")) return futureMarkdown;
      if (p.includes("old-post.md")) return sampleMarkdownMinimal;
      return "";
    });

    const posts = getAllPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("Minimal Post");
  });

  it("includes future-dated posts when includeScheduled is true", () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const futureMarkdown = `---
title: "Future Post"
date: "${futureDate.toISOString().split("T")[0]}"
author: "Test"
category: "Test"
excerpt: "Scheduled"
image: "/images/test.jpg"
tags: []
---

Future body.
`;
    mockReaddirSync.mockReturnValue([
      "future-post.md",
      "old-post.md",
    ]);
    mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
      const p = String(filePath);
      if (p.includes("future-post.md")) return futureMarkdown;
      if (p.includes("old-post.md")) return sampleMarkdownMinimal;
      return "";
    });

    const posts = getAllPosts({ includeScheduled: true });
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("Future Post");
  });
});

describe("getPostBySlug", () => {
  it("returns post data and content for an existing slug", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(sampleMarkdown);

    const result = getPostBySlug("test-post");

    expect(result).not.toBeNull();
    expect(result!.post.title).toBe("Test Post Title");
    expect(result!.post.slug).toBe("test-post");
    expect(result!.post.author).toBe("Jane Doe");
    expect(result!.post.category).toBe("Architecture");
    expect(result!.post.tags).toEqual(["design", "modern"]);
    expect(result!.content).toContain("## Introduction");
    expect(result!.content).toContain("This is the body of the blog post.");
  });

  it("returns null for a non-existent slug", () => {
    mockedFs.existsSync.mockReturnValue(false);

    const result = getPostBySlug("non-existent");
    expect(result).toBeNull();
  });

  it("returns content body separated from frontmatter", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(sampleMarkdown);

    const result = getPostBySlug("test-post");
    expect(result!.content).not.toContain("---");
    expect(result!.content).toContain("Section One");
  });

  it("handles post with colon in title", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(sampleMarkdownWithColonInValue);

    const result = getPostBySlug("colon-post");
    expect(result!.post.title).toBe("Post With Colon: A Special Case");
    expect(result!.post.excerpt).toBe("Testing colons: they should work.");
  });
});
