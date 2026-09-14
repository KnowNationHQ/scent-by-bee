# Aurelia — Fashion Storefront Design

**Date:** 2026-08-01
**Status:** Approved by user

## Goal

Build a complete, mobile-first e-commerce storefront ("Aurelia", fashion/clothing) with cart and checkout, following the workflow from the shadcnspace article "How to Build an E-commerce Website using Shadcn UI": shadcn/ui foundation + shadcn-space registry blocks + centralized product data + AI-assisted implementation. No real backend, no payments.

## Scope

In scope:
- Storefront pages: homepage, shop with category filtering, product detail, cart, checkout, order confirmation, login, register
- Cart with localStorage persistence
- Fake checkout form that clears the cart and shows an order confirmation
- Mobile-first responsive UI/UX across all pages
- Centralized product data layer

Out of scope:
- Real auth / accounts
- Payments (Stripe etc.)
- Admin/product management backend
- Reviews, wishlists, recommendations

## Tech Stack

- Next.js App Router + TypeScript + Tailwind CSS
- Bootstrap via `npx shadcn@latest init --preset b0 --base base --template next`
- shadcn-space registry added to `components.json` (`registries."@shadcn-space"`) for ecommerce blocks: product-category, product-listing, product-overview, checkout, hero, testimonials, footer, login, register
- `motion` (framer-motion) for lightweight hover/transition effects
- React Context + localStorage for cart state

Project lives at `C:\Users\hp\ecommerce-store`.

## Data Model

Single source of truth in `lib/data.ts` (per article, no hardcoded product info in components).

```ts
export type Product = {
  id: string;
  name: string;
  category: string;        // slug of category: "shirts" | "pants" | "jackets"
  price: number;
  slug: string;
  image: string;           // path under /products/
  description: string;
  sizes: string[];
  colors: string[];
};

export const categories: { name: string; slug: string; image: string }[];
export const products: Product[];
export const getProductBySlug = (slug: string) => Product | undefined;
export const getProductsByCategory = (slug: string) => Product[];
```

## Pages & Routes

| Route | Purpose |
|---|---|
| `/` | navbar, hero, category cards, featured products, testimonials, newsletter, footer |
| `/shop` | product grid + `?category=` filter via `useSearchParams` |
| `/products/[slug]` | product overview: gallery, price, size/color pickers, add-to-cart |
| `/cart` | line items, qty +/-, remove, subtotal |
| `/checkout` | shipping form with client validation |
| `/order-confirmation` | displays fake order number passed via route state |
| `/login` | static auth page |
| `/register` | static auth page |

## Cart & Checkout

- `hooks/use-cart.tsx` — React Context provider with `localStorage` persistence
- Cart item: `{ slug, size, color, qty }`; keyed/merged by slug+size+color
- Actions: `add`, `updateQty`, `remove`, `clear`, derived `subtotal` and `count`
- Checkout: form fields (name, email, address), client validation, on valid submit clears cart, generates a fake order number, and navigates to `/order-confirmation` (order number passed via route state)
- No payments, no server

## Mobile-First UI/UX

- Tailwind responsive built bottom-up: mobile default, desktop at `sm/md/lg` breakpoints
- Nav: hamburger + slide-over drawer on mobile; full navbar at `lg+`; sticky with backdrop blur
- Product grid: 2 columns mobile → 3–4 desktop; touch-friendly tap targets
- Product page: swipeable gallery on mobile; large size/color pickers; add-to-cart fixed to bottom on mobile
- Cart/checkout: single-column full-width fields on mobile, min 44px tap targets; summary stacks below
- Category cards: 2-up grid mobile, horizontal scroll row larger screens
- Hero: stacked text-over-image mobile, side-by-side desktop
- Accessibility: focus-visible states, aria labels on icon buttons, alt text everywhere

## Component Structure

```
components/
├── ui/            # shadcn/ui primitives
├── shadcn-space/  # integrated registry blocks
├── blocks/        # larger storefront sections
└── layout/        # navbar, footer
hooks/use-cart.tsx
lib/data.ts
```

## Testing

- One vitest test file covering cart logic: add, merge by slug+size+color, updateQty, remove, subtotal, localStorage persistence
- Verification: `npm run build` and lint must pass before completion
