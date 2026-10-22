# Content and SEO

## Supplied business facts
Beauty by Mica is a personal makeup artistry brand with a private studio in Marie Pampoen, Curaçao. Source: owner-supplied master brief, 21 October 2026. Audience: international visitors and local clients. No further credentials or service claims have been confirmed.

## Pending client materials
- Original high-resolution logo and approval of its simplified web variants.
- Consented photographs of Mica and her actual work; genuine comparable before/after pair.
- Confirmed service names, durations, prices, currencies and policies. Bridal/events remain conditional.
- Exact Setmore URL, WhatsApp number/link, Instagram profile, public contact details and opening hours.
- Approval of copy and native review of all draft translations, particularly Curaçao Papiamentu.
- Client design approval before building the remaining pages.

## Preview disclosures
Persistent design-preview bar; visible AI concept captions; provisional moodboard categories; explicit comparison demo label; safe booking dialog; provisional wordmark/footer statement. No fabricated reviews, client transformations, portrait, map address, phone number or booking links. No personal background story is published.

## Architecture
Implemented: localized homepage in English (default), Papiamentu, Dutch and Spanish. Main UI and metadata live in typed dictionaries in `lib/i18n.ts`. Translation status is visible. The selector preserves the homepage section fragment. HTML lang, canonical, alternate languages and x-default are generated per route.
Future routes: About Mica, Makeup Services, Signature Looks, Portfolio, Bridal & Events (conditional), Book an Appointment, Visiting Curaçao, Contact & FAQ. For now nav links point to existing sections, never empty future pages.

## SEO / GEO
Semantic headings, descriptive image alternatives, static HTML, per-language title/description, Open Graph and Twitter image, four-language sitemap, truthful WebSite/Organization JSON-LD. No fake ratings, business profile or detailed address.
Relevant search themes for approved content: makeup artist Curaçao, Willemstad, Marie Pampoen, professional makeup Curaçao. Write concise verifiable answers in future service/contact pages; rankings and AI citations are not promised.
Every preview page has noindex/nofollow; robots disallows crawling. The sitemap is prepared for the eventual approved launch. The origin is configurable with NEXT_PUBLIC_SITE_URL and the deployment subpath with NEXT_PUBLIC_BASE_PATH.

## Privacy and security
No forms, payments, analytics, embedded maps or third-party font requests. The preview does not collect personal details. Booking links are null until confirmed. Future external links must use validated https URLs and safe rel attributes for new tabs.
Static export receives a restrictive CSP with SHA-256 hashes for exact inline scripts, self-hosted resources, object-src none, base-uri self and form-action none. Inline styles remain allowed for Next and the interactive slider. Referrer policy is supplied as a meta tag. GitHub Pages controls HTTP response headers; frame-ancestors, Permissions-Policy and X-Content-Type-Options must be configured on a future header-capable host. No claim of a comprehensive security audit.
