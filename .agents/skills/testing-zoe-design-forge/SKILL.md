---
name: testing-zoe-design-forge
description: Run and verify the Jest + React Testing Library test suite for zoe-design-forge. Use when testing unit tests, checking coverage, or validating test quality.
---

# Testing zoe-design-forge

## Prerequisites

- Node.js 22+
- `npm install` completed

## Run Tests

```bash
npm test          # Run all tests
npm run test:coverage  # Run with coverage report
npx jest <pattern>     # Run specific test file (e.g. npx jest blog, npx jest site-data)
```

## Test Structure

Tests live in `src/__tests__/`:

| File | What it tests |
|------|---------------|
| `blog.test.ts` | Frontmatter parsing, `getAllPosts`, `getPostBySlug` (uses mocked `fs`) |
| `site-data.test.ts` | Data integrity for `brand`, `services`, `team`, `projects` |
| `Header.test.tsx` | Nav items, mobile toggle, logo rendering |
| `Footer.test.tsx` | Contact info, social links, copyright year |
| `Hero.test.tsx` | Logo, slogan, CTAs, WhatsApp button |
| `About.test.tsx` | Stats, services cards, process steps |
| `Contact.test.tsx` | Form fields, submission flow, thank-you state |
| `Team.test.tsx` | Member info, qualifications, initials avatars |
| `Portfolio.test.tsx` | Category filtering, project detail expansion |

## Jest Configuration

- Config: `jest.config.js` (uses `next/jest`)
- Setup: `jest.setup.ts` (loads `@testing-library/jest-dom`)
- Environment: `jsdom`
- Path alias: `@/*` maps to `src/*`

## Verifying Tests Are Adversarial

To confirm tests actually catch bugs (not vacuous):

1. **Site data:** Change `brand.name` in `src/data/site.ts` → run `npx jest site-data` → should fail
2. **Blog parser:** Change frontmatter regex in `src/lib/blog.ts` (e.g. `---` → `###`) → run `npx jest blog` → should fail
3. **Always revert** changes after adversarial testing

## Regression Checks

After any test infrastructure changes, verify:
- `npm run dev` still serves HTTP 200 at localhost:3000
- `npm run build` completes with exit code 0
- `npx tsc --noEmit --skipLibCheck` passes (TypeScript check)

## Notes

- No CI is configured on this repo — tests must be run locally
- Framer Motion components are mocked in test files (motion.div, motion.img, etc.)
- `next/link` is mocked as a plain `<a>` tag in component tests
- The `fs` module is fully mocked in `blog.test.ts` — tests don't touch real files

## Devin Secrets Needed

None — no secrets required for testing.
