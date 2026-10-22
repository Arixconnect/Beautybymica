# Beauty by Mica

Mobile-first, four-language homepage design preview. Next.js App Router, TypeScript and Tailwind CSS. Creative direction: Astra. Implementation: Codex.

## Development

Node.js 22+ and pnpm. Run `pnpm install`, then `pnpm dev`; open `/en/`. For the GitHub Pages build use `NEXT_PUBLIC_BASE_PATH=/Beautybymica pnpm build`. Set `NEXT_PUBLIC_SITE_URL` when the public origin changes. See `.env.example`.

- `pnpm lint` — ESLint.
- `pnpm typecheck` — TypeScript.
- `pnpm build` — production static export plus CSP, root redirect, robots and sitemap.
- `pnpm audit --prod` — runtime dependency audit.
- `node scripts/prepare-pages.mjs` — copy the verified export to `docs/` for publication.

The package lock pins the resolved dependencies. Rebuild before every deployment; never edit generated `docs/` files by hand.

## Structure

`app/[lang]/` contains static locale documents and metadata. `components/home.tsx` contains reusable homepage pieces and accessible interactions. `lib/i18n.ts` contains typed translation dictionaries. `lib/config.ts` contains links, site origin and future currency configuration. `public/` holds local fonts and optimized concept imagery. `scripts/postbuild.mjs` adds static hosting and security output. `docs/` is the exact deployable build for GitHub Pages (main branch, /docs).

Read AGENTS.md, DESIGN_SYSTEM.md and CONTENT_AND_SEO.md before extending the site.

## Preview limitations

This is the phase-1 homepage for design approval, published at the owner's explicit request. Booking is a clearly labeled preview dialog. Original logo, authentic portfolio photos, service details and booking/contact/social links remain pending. BM branding and AI cosmetics imagery are provisional. Translations need native review. Search indexing stays disabled. No backend, analytics, payments or personal data collection.

GitHub Pages provides HTTPS but does not permit custom application response headers. A hashed meta CSP is emitted for the static preview; a future full production host should add the response headers described in CONTENT_AND_SEO.md. Do not claim field Core Web Vitals or a full WCAG audit from local checks.

## Deployment

Build with `NEXT_PUBLIC_BASE_PATH=/Beautybymica`, run checks, inspect the static export, run `node scripts/prepare-pages.mjs`, and commit source plus `docs/`. Pages publishes from `main` → `/docs`. Wait for the Pages deployment and verify the public URL before reporting it live.

No domain purchase or paid hosting is required for this client preview.
