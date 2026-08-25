# EliteEnergy — static landing site

Plain HTML/CSS/JS. No build step, no dependencies to install.
Open `index.html` in a browser, or drop the whole folder on any static host
(Cloudflare Pages, Vercel, Netlify, S3, nginx).

## Structure

    index.html              Landing page
    terms.html              Terms of Service
    privacy.html            Privacy Policy
    risk-disclosure.html    Risk Disclosure & Disclaimer
    assets/                 Logo artwork (transparent PNG)
      ee-lockup.png         Mark + wordmark — nav and footer
      ee-mark.png           Gold E mark — favicon, bot avatar, final CTA
      ee-bot-badge.png      Round black badge — apple-touch-icon
    css/                    One stylesheet per page
    js/
      landing.js            Calculator, WebGL backdrop, scroll motion
      legal-config.js       ← EDIT THIS: operator identity for the legal pages
      legal-*.js            Per-page legal behaviour (TOC, numbering)

## Things to change before going live

1. **js/landing.js** — `CONFIG` at the top holds the Telegram links and the
   calculator's TRX rates:

       botUrl                 https://t.me/EliteEnergybot
       supportUrl             https://t.me/xeriy
       burnCostPerTransfer    6.5   TRX burned per transfer with no energy
       rentPricePerTransfer   3     TRX charged when renting

   These two rates drive the whole savings calculator. Keep them honest —
   the burn cost moves with network conditions.

2. **js/legal-config.js** — operator name, jurisdiction, contact email and
   `siteUrl`. Anything left `null` is hidden rather than shown as a
   placeholder. See LEGAL_INFORMATION_REQUIRED.md for what each field needs.

3. **Canonical URLs** — `index.html` still carries
   `https://eliteenergy.example` in its canonical, og:url and JSON-LD tags.
   Replace with your real domain. The legal pages build theirs from
   `siteUrl` in legal-config.js.

4. **og:image** — `index.html` references `/og-image.png`, which is not in
   this folder. Add a 1200x630 share image or remove the tags.

5. **Pricing tiers** in index.html are hard-coded markup (65K–327K energy,
   3–15 TRX). Update them there if your rates change.

## Third-party scripts

The landing page loads three libraries from CDN — three.js (WebGL backdrop),
GSAP + ScrollTrigger (scroll motion), and Lenis (smooth scroll). All motion is
additive: if the CDN is blocked, the page still renders and reveals content
through its own IntersectionObserver fallback. To self-host, download them into
`js/vendor/` and update the four `<script src>` tags in the `<head>`.

## Notes

- Dark theme only. Glass panels rely on `backdrop-filter`; blur is reduced
  below 900px because it is expensive on mobile GPUs.
- Reduced-motion is respected: the WebGL canvas is hidden and all
  scroll-driven animation is skipped.
- The Telegram chat mockup in the hero is static markup labelled
  "DEMO — ILLUSTRATIVE FLOW". It is not a live bot preview.
- The API section is marked "Coming soon"; the CTA points at support.
