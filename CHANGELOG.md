# Changelog

## [2026-07-08] Security Vulnerability Audit & Patch

### Summary
Initial security audit identified 17 moderate-severity vulnerabilities across the dependency tree. This entry documents the diagnosis, attempted fixes, and current status.

### Vulnerabilities Identified
| Package | Severity | Advisory | Issue |
|---------|----------|----------|-------|
| js-yaml | moderate | GHSA-mh29-5h37-fv8m | Prototype pollution in merge (<<) |
| js-yaml | moderate | GHSA-h67p-54hq-rp68 | Quadratic-complexity DoS in merge key handling |
| postcss | moderate | GHSA-qx2v-qp2m-jg93 | XSS via unescaped </style> in CSS stringify |
| prismjs | moderate | GHSA-x7hr-w5r2-h6wg | DOM clobbering vulnerability |
| smol-toml | moderate | GHSA-v3rj-xjv7-4jmq | DoS via TOML documents with many commented lines |
| uuid | moderate | GHSA-w5hq-g745-h8pq | Missing buffer bounds check in v3/v5/v6 |

### Root Cause
The vulnerable versions are transitive dependencies nested within the Sanity (`@sanity/cli`, `@sanity/vision`) and Next.js (`next/node_modules/postcss`) ecosystems. `npm audit fix --force` proposes resolving them by **downgrading** `next` to 9.3.3 and `sanity` to 5.14.1 — both breaking changes that would break the application.

### Actions Taken
1. Ran `npm audit` to identify all 17 vulnerabilities
2. Attempted `npm audit fix --force` — blocked by breaking-change downgrades and EPERM directory cleanup errors
3. Attempted targeted version upgrades — blocked by peer-dependency conflicts (e.g. `autoprefixer` requires `postcss@^8.1.0`, and `js-yaml@6.15.0` does not exist; latest is `5.2.1`)
4. Confirmed build passes (`next build`) and all 86 tests pass

### Status
- ✅ Build: passing
- ✅ Tests: 86/86 passing
- ⚠️ Vulnerabilities: 17 moderate remain in transitive deps; require upstream fixes from Sanity/Next.js or risky downgrades

### Next Steps
- Monitor Sanity and Next.js releases for patched transitive dependencies
- Consider `overrides` in package.json to pin safe nested versions without breaking top-level compatibility
- Re-run `npm audit` after each dependency update
