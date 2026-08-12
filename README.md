# Pacific Scaffolding Pty Ltd

Kwikstage scaffolding sales website — Next.js 16 on Cloudflare Workers via
[OpenNext](https://opennext.js.org/cloudflare).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
|--------|--------------|
| `npm run dev` | Next.js dev server |
| `npm run lint` | ESLint over `src/` |
| `npm run build` | Next.js production build |
| `npm run preview` | Build + run the real Workers runtime locally |
| `npm run deploy` | Build + deploy the Worker to Cloudflare |

Pushing to `main` deploys automatically via `.github/workflows/deploy.yml`.

## Structure

```
src/
  app/
    page.tsx            # Full single-page site
    layout.tsx          # Metadata
    globals.css         # All site styling (design tokens under :root)
    api/quote/route.ts  # Quote enquiry endpoint
  components/           # Header, shop bar, product grid, cart drawer, quote form
  lib/
    products.ts         # Product catalogue + gallery images
    cartStore.ts        # localStorage-backed cart (useSyncExternalStore)
public/images/          # Product photography
```

## Before going live

These are deliberate placeholders, not oversights:

1. **Pricing** — every product shows `PRICE TBC`. Real prices live in
   `src/lib/products.ts`.
2. **Quote delivery** — `src/app/api/quote/route.ts` validates enquiries and
   writes them to the Worker logs (`npx wrangler tail`). It does **not** yet email
   or store them. Wire up D1 for storage and Cloudflare Email Service for
   delivery before launch, or enquiries will only be visible in logs.
3. **Product photography** — the images in `public/images/` came from the design
   mockup and are third-party sourced. Replace them with photography Pacific
   Scaffolding owns or has licensed.
4. **Supply Nation section** — currently placeholder copy; swap in the real
   registration details.
5. **Cart** — collects an enquiry list, not a payment. There is no checkout,
   stock level, or delivery pricing.

## Images

`next.config.ts` sets `images.unoptimized` because Workers has no `sharp`
binary. If image optimisation becomes necessary, use Cloudflare Images.
