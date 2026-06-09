# Zoe Design Forge — Website Build

**Client:** ZOE DESIGNS FORGE. | Architectural & Interior Consultants
**Domain:** zoeforge.com
**Built by:** MoonlightAI Solutions
**Date:** June 2026

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Static Generation)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **CMS:** Decap CMS (at `/admin` — git-based, ZDF team self-manages)
- **Deploy target:** Vercel

## Site Structure

| Route | Content |
|-------|---------|
| `/` | Home — Hero, About, Services, Portfolio, Team, Contact |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog posts |
| `/admin` | Decap CMS (content management) |

## To Run Locally

```bash
npm install
npm run dev
# opens at http://localhost:3000
```

## To Deploy to Vercel

```bash
npx vercel --prod
```

## CMS Setup (After Deploy)

1. Go to `zoeforge.com/admin`
2. Connect GitHub repo to Decap CMS (netlify.com/app/decap-cms)
3. Enable Git Gateway for authentication
4. ZDF team can now manage: Blog Posts, Portfolio Projects, Team, Services, Site Settings

## What's Ready

- ✅ Full multi-page site with 6 sections
- ✅ Animated cinematic background (auto-rotating project images)
- ✅ Filterable portfolio grid (10 project entries)
- ✅ Blog with 3 sample posts
- ✅ Enquiry form with project type + budget fields
- ✅ WhatsApp floating button
- ✅ SEO: Schema.org JSON-LD, OG tags, sitemap-ready
- ✅ CMS for non-technical team management
- ✅ Custom design system (brand orange #ff4d00, Playfair Display + Manrope)

## What's Needed Before Launch

1. Replace hero-bg.jpg with a high-res project photo
2. Add actual project images to public/images/projects/
3. Add actual scene images for each scroll section
4. Update phone number, email, WhatsApp, social links
5. Replace sample blog posts with real content
6. Deploy to Vercel
7. Set up Decap CMS Git Gateway
8. Install Google Analytics (GA4)
