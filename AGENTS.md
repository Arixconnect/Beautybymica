# Beauty by Mica project instructions

## Scope and ownership
- Phase 1 is the homepage and reusable foundation. Do not fill nine pages before client design approval.
- The owner explicitly requested a published, shareable client preview on 21 October 2026. This supersedes the initial brief's no-deployment gate for this preview only.
- Astra owns art direction, typography, composition, motion and visual review. Codex owns implementation, accessibility, localization, testing, SEO and security. Request a distinct Astra design review when available; never claim one otherwise. Client approval remains separate.
- Preserve existing work and commit source plus regenerated `docs/` together for this GitHub Pages deployment.

## Brand and content
- Exact core palette: #F5B8C1, #FFFFFF, #101010. No unrelated gold, beige or lavender.
- Distinctive editorial typography, generous spacing, restrained movement, concise copy, mobile booking access.
- Original circular logo and consented client photography have not been supplied. BM is explicitly provisional. AI cosmetics still life is labeled; it is never Mica's work or products.
- No invented portrait, transformation, service, price, qualification, review, contact, booking URL or private personal story.
- No actual bookings until confirmed Setmore/contact links are configured. No payments or unnecessary backend.
- English default; /en/, /pap/, /nl/, /es/. Translation dictionaries only. Draft translations remain labeled pending native review, especially Curaçao Papiamentu.
- Keep noindex enabled while content is provisional. Do not silently turn this into an indexed final business website.

## Quality gates
- Run lint, TypeScript and production export after material code changes.
- Test 375, 768, 1024 and 1440 widths; all locales; language selection; fragment navigation; keyboard menu, comparison slider and booking dialog.
- Check overflow, image loading, console errors, focus visibility and reduced motion.
- No trackers, remote fonts, secrets or user-data collection in this phase. Use minimal dependencies and audit them.
- Security policy hashes are generated against exact exported scripts. Regenerate after each build. GitHub Pages does not support application-defined response headers; do not claim full header control.
- Record only executed checks. Field Core Web Vitals and full WCAG conformance require separate evaluation.
