# Lead Scout

A web app that finds local businesses, scores their websites on SEO and design quality, and lets David sort by grade to prioritize outreach.

**Status:** Planning

**Key Date:** First sale target — end of May 2026

---

## Problem It Solves

Finding weak-website businesses to pitch is manual and slow. This automates discovery and scoring so David walks into every conversation knowing exactly why a prospect needs him.

## Target Client

David (internal tool now — natural SaaS candidate later if the scorer is good)

---

## In Scope

- Search businesses by location + category via Google Places API
- Pull every business returned, check if they have a website
- Score each website across two equal categories: SEO and Design Quality (see scoring breakdown below)
- Display results as a sortable list with letter grades (A–F) and category breakdowns
- Flag businesses with no website as automatic leads (no site = easiest pitch)
- Click into any result to see the full breakdown of what's wrong

## Scoring Breakdown — SEO (50% of total grade)

- Title tag (present, correct length, not generic)
- Meta description (present, right length)
- H1 tag (present, one per page)
- Image alt text coverage
- HTTPS enforced
- Mobile viewport meta tag
- Sitemap and robots.txt present
- Schema markup (basic structured data)
- Page load time (via server-side fetch timing)

## Scoring Breakdown — Design Quality (50% of total grade)

- Mobile responsiveness signals (viewport tag, responsive CSS patterns)
- Page weight (bloated pages = bad design signal)
- Render-blocking scripts or CSS
- Contact info present and findable
- Copyright year (outdated = neglected site)
- Broken images or missing resources
- Basic accessibility (lang attribute, ARIA landmarks)
- Social proof signals (reviews, testimonials detected in HTML)

## Out of Scope

- Pixel-level visual rendering or screenshots (too expensive for v1)
- Automated outreach
- CRM or lead tracking
- Any paid scoring APIs — scoring engine is built custom

---

## Tech Stack

- **Frontend:** HTML + Tailwind
- **Backend:** Vercel Serverless Functions (free tier — ~100k calls/month)
- **Google Places API** — business discovery ($200/month free credit)
- **Custom scoring engine** — JS module, core IP of the product
- **Hosting:** Vercel (free)

## Estimated Timeline

4-6 weeks. Scoring engine takes the most iteration — plan for it.

## Success Criteria

Type "restaurants, Lansdale PA," get a full list sorted by grade, immediately identify F-rated businesses worth pitching.

---

## Portfolio / Pitch Notes

"Built a full-stack web app that combines Google Places data with a custom website scoring engine — analyzes SEO and design quality across 15+ signals and grades businesses automatically. Originally built as a prospecting tool; designed with SaaS expansion in mind."
