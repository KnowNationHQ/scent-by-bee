# SCENT BY BEE

**Authentic, Affordable, Luxury Perfumes**

A modern e-commerce storefront built for @chy.amaka's TikTok perfume business. Nationwide delivery across Nigeria with WhatsApp ordering.

🔗 **Live:** [scent-by-bee.vercel.app](https://scent-by-bee.vercel.app/)

## Features

- **Product Catalog** — 6 perfumes across 3 categories (EDP, EDT, Gift Sets)
- **Naira Pricing** — All prices in ₦ (₦45,000 – ₦130,000)
- **Shopping Cart** — Add/remove items, quantity control, persists in localStorage
- **Checkout Flow** — Order summary with SB- order prefix
- **WhatsApp Integration** — Floating button + "DM to Order" links to wa.me/2349036159129
- **Mobile-First Design** — Responsive across all devices with hamburger menu
- **Loading Animation** — Branded splash screen with spinner
- **OG Image** — Social sharing card for TikTok/WhatsApp
- **Promo Code** — BEE10 (10% off first order)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | Tailwind CSS v4, shadcn/ui (base-nova) |
| Components | Radix primitives, Lucide icons |
| Cart | Pure functions + React Context + localStorage |
| Language | TypeScript |
| Testing | Vitest |
| Hosting | Vercel (auto-deploy on push) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npx vitest run
```

## Project Structure

```
scent_by_bee/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── shop/               # Product listing
│   ├── products/[slug]/    # Product detail
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── login/              # Sign in
│   ├── register/           # Create account
│   ├── order-confirmation/ # Order success
│   └── loading.tsx         # Route transition loading
├── components/
│   ├── blocks/             # Feature components
│   ├── layout/             # Navbar, footer, WhatsApp float
│   └── ui/                 # shadcn primitives
├── hooks/                  # Cart context provider
├── lib/                    # Data, cart logic, utils
├── public/                 # Logo, OG image, product SVGs
└── docs/                   # Marketing message
```

## Products

| Product | Category | Price | Sizes |
|---|---|---|---|
| Velvet Oud | EDP | ₦85,000 | 30ml / 50ml / 100ml |
| Citrus Bloom | EDP | ₦72,000 | 30ml / 50ml / 100ml |
| Midnight Musk | EDT | ₦58,000 | 30ml / 50ml |
| Golden Sahara | EDT | ₦62,000 | 30ml / 50ml |
| The Discovery Set | Gift Set | ₦45,000 | 5 × 10ml |
| Duo Luxe | Gift Set | ₦130,000 | 2 × 50ml |

## Contact

| Channel | Details |
|---|---|
| WhatsApp | [wa.me/2349036159129](https://wa.me/2349036159129) |
| Phone | 09036159129 |
| Location | Lagos, Nigeria |
| Delivery | Nationwide |

## License

Private — built for SCENT BY BEE.
