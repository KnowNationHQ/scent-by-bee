# Aurelia E-commerce Storefront Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first fashion storefront ("Aurelia") with homepage, category-filtered shop, product detail, cart, fake checkout, order confirmation, and static auth pages, following the shadcnspace workflow (shadcn/ui + shadcn-space blocks + centralized product data).

**Architecture:** Next.js App Router site. `lib/data.ts` is the single source of truth for products/categories. Cart state lives in a React Context (`hooks/use-cart.tsx`) persisted to localStorage, with pure reducer functions in `lib/cart.ts` (unit-tested). Category filtering uses `useSearchParams` on `/shop`. All storefront sections are modular components under `components/blocks/`.

**Tech Stack:** Next.js (App Router, TS), Tailwind CSS v4, shadcn/ui, `motion` (framer-motion), `lucide-react` icons, `vitest` for the cart unit test, shadcn-space registry for optional blocks.

## Global Constraints

- Project root: `C:\Users\hp\ecommerce-store`
- TypeScript strict; no `any`
- Product data lives ONLY in `lib/data.ts`; never hardcode products in components
- Cart item key = `slug|size|color` via `cartKey()` in `lib/cart.ts`
- Mobile-first CSS: default styles target <640px, enhance with `sm/md/lg`
- Minimum tap target 44px on interactive elements
- No code comments
- Verification per task: `npm run lint` and `npm run test` pass; full `npm run build` at the end
- Commit after every task with conventional commit messages

## File Structure

```
app/
├── layout.tsx                  # root layout: CartProvider + Navbar + Footer
├── page.tsx                    # homepage: hero, categories, featured, testimonials, newsletter
├── shop/page.tsx               # product grid + ?category= filter
├── products/[slug]/page.tsx    # server page rendering client ProductDetail
├── cart/page.tsx               # cart line items
├── checkout/page.tsx           # shipping form
├── order-confirmation/page.tsx # fake order number
├── login/page.tsx              # static auth
├── register/page.tsx           # static auth
├── globals.css                 # shadcn-generated (do not hand-edit)
├── favicon.ico
components/
├── ui/                         # shadcn/ui primitives (installed, not authored)
├── layout/
│   ├── navbar.tsx              # responsive navbar + mobile sheet drawer
│   └── footer.tsx
└── blocks/
    ├── hero-section.tsx
    ├── category-grid.tsx
    ├── featured-products.tsx
    ├── product-card.tsx
    ├── testimonials.tsx
    ├── newsletter.tsx
    ├── product-detail.tsx      # client: gallery, size/color, qty, add-to-cart
    └── auth-form.tsx           # shared login/register form
hooks/use-cart.tsx              # CartProvider + useCart
lib/
├── data.ts                     # Product type, categories, products, helpers
├── cart.ts                     # pure cart reducer functions
├── cart.test.ts                # vitest unit tests
scripts/generate-images.mjs     # generates placeholder SVGs into public/products/
public/products/*.svg           # generated placeholders
docs/superpowers/specs/2026-08-01-aurelia-ecommerce-design.md  # spec (exists)
```

---

### Task 1: Scaffold Next.js + shadcn/ui project

**Files:**
- Create: everything create-next-app + shadcn generate
- Modify: none

**Interfaces:**
- Produces: a working Next.js + Tailwind + shadcn/ui app that boots with `npm run dev`

- [ ] **Step 1: Move the spec out so create-next-app accepts an empty-enough dir**

```powershell
Move-Item -Force docs "C:\Users\hp\AppData\Local\Temp\opencode\aurelia-docs"
```

- [ ] **Step 2: Scaffold the app (run in the project root)**

```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
```

Expected: files scaffolded, `npm run dev` boots.

- [ ] **Step 3: Restore the spec**

```powershell
Move-Item -Force "C:\Users\hp\AppData\Local\Temp\opencode\aurelia-docs" docs
```

- [ ] **Step 4: Init shadcn/ui (base style)**

```powershell
npx shadcn@latest init -y -b base
```

Expected: `components.json`, `components/ui/*`, CSS vars in `globals.css`.

- [ ] **Step 5: Install the UI primitives needed later**

```powershell
npx shadcn@latest add -y button card input label sheet dialog badge separator accordion
```

- [ ] **Step 6: Install app dependencies**

```powershell
npm i motion
npm i -D vitest
```

- [ ] **Step 7: Add the shadcn-space registry to `components.json`**

Edit `components.json` to add (keep existing keys):

```json
{
  "registries": {
    "@shadcn-space": "https://.shadcn.space/r/{name}.json"
  }
}
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + shadcn/ui app"
```

---

### Task 2: Generate placeholder product images

**Files:**
- Create: `scripts/generate-images.mjs`
- Create: `public/products/*.svg` (generated)

**Interfaces:**
- Produces: one `public/products/<slug>.svg` per product (600×750, name text on neutral background), plus `public/products/shirt.svg`, `pants.svg`, `jacket.svg` for category cards

- [ ] **Step 1: Write the generator script**

`scripts/generate-images.mjs`:

```js
import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const products = [
  ["minimal-linen-shirt", "Minimal Linen Shirt"],
  ["oxford-button-down", "Oxford Button-Down"],
  ["relaxed-pleat-trouser", "Relaxed Pleat Trouser"],
  ["cargo-pant", "Cargo Pant"],
  ["bomber-jacket", "Bomber Jacket"],
  ["wool-overcoat", "Wool Overcoat"],
  ["shirt", "Shirts"],
  ["pants", "Pants"],
  ["jacket", "Jackets"],
]

const svg = (label) => `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
  <rect width="600" height="750" fill="#e7e5e4"/>
  <circle cx="300" cy="320" r="120" fill="#d6d3d1"/>
  <text x="300" y="520" font-family="Georgia, serif" font-size="40" fill="#44403c" text-anchor="middle">${label}</text>
</svg>`

const dir = resolve("public", "products")
mkdirSync(dir, { recursive: true })
for (const [slug, name] of products) writeFileSync(resolve(dir, `${slug}.svg`), svg(name))
console.log(`Wrote ${products.length} SVGs to ${dir}`)
```

- [ ] **Step 2: Run it**

```powershell
node scripts/generate-images.mjs
```

Expected: `Wrote 9 SVGs to ...\public\products`

- [ ] **Step 3: Commit**

```bash
git add scripts public/products
git commit -m "feat: add placeholder product images"
```

---

### Task 3: Product data layer

**Files:**
- Create: `lib/data.ts`

**Interfaces:**
- Produces:
  - `type Product = { id: string; name: string; category: string; price: number; slug: string; image: string; description: string; sizes: string[]; colors: string[] }`
  - `export const categories: { name: string; slug: string; image: string }[]`
  - `export const products: Product[]`
  - `export function getProductBySlug(slug: string): Product | undefined`
  - `export function getProductsByCategory(slug: string): Product[]`
- Consumes: nothing (Task 4+ import these)

- [ ] **Step 1: Write `lib/data.ts`**

```ts
export type Product = {
  id: string
  name: string
  category: string
  price: number
  slug: string
  image: string
  description: string
  sizes: string[]
  colors: string[]
}

export const categories = [
  { name: "Shirts", slug: "shirts", image: "/products/shirt.svg" },
  { name: "Pants", slug: "pants", image: "/products/pants.svg" },
  { name: "Jackets", slug: "jackets", image: "/products/jacket.svg" },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Minimal Linen Shirt",
    category: "shirts",
    price: 48,
    slug: "minimal-linen-shirt",
    image: "/products/minimal-linen-shirt.svg",
    description: "Breathable European linen with a relaxed, boxy cut.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sage", "Sand", "White"],
  },
  {
    id: "2",
    name: "Oxford Button-Down",
    category: "shirts",
    price: 65,
    slug: "oxford-button-down",
    image: "/products/oxford-button-down.svg",
    description: "A crisp cotton oxford, made to be worn for years.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "White"],
  },
  {
    id: "3",
    name: "Relaxed Pleat Trouser",
    category: "pants",
    price: 72,
    slug: "relaxed-pleat-trouser",
    image: "/products/relaxed-pleat-trouser.svg",
    description: "Double-pleated trousers in a softly structured wool blend.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Khaki", "Charcoal"],
  },
  {
    id: "4",
    name: "Cargo Pant",
    category: "pants",
    price: 58,
    slug: "cargo-pant",
    image: "/products/cargo-pant.svg",
    description: "Heavy cotton twill with deep utility pockets.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Olive", "Black"],
  },
  {
    id: "5",
    name: "Bomber Jacket",
    category: "jackets",
    price: 120,
    slug: "bomber-jacket",
    image: "/products/bomber-jacket.svg",
    description: "A classic ribbed bomber in water-resistant nylon.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"],
  },
  {
    id: "6",
    name: "Wool Overcoat",
    category: "jackets",
    price: 180,
    slug: "wool-overcoat",
    image: "/products/wool-overcoat.svg",
    description: "A longline overcoat in 100% wool with a concealed placket.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Grey"],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug)
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add centralized product data layer"
```

---

### Task 4: Pure cart logic + unit tests (TDD)

**Files:**
- Create: `lib/cart.ts`
- Create: `lib/cart.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json` (add `test` script)

**Interfaces:**
- Produces:
  - `export type CartItem = { slug: string; size: string; color: string; qty: number }`
  - `export function cartKey(item: Pick<CartItem, "slug" | "size" | "color">): string`
  - `export function addItem(cart: CartItem[], item: CartItem): CartItem[]`
  - `export function updateQty(cart: CartItem[], key: string, qty: number): CartItem[]`
  - `export function removeItem(cart: CartItem[], key: string): CartItem[]`
  - `export function subtotal(cart: CartItem[], products: Product[]): number`
  - `export function cartCount(cart: CartItem[]): number`
- Consumes: `lib/data.ts` (`Product`)

- [ ] **Step 1: Write the failing test**

`vitest.config.ts`:

```ts
import { fileURLToPath } from "node:url"
import { resolve } from "node:path"
import { defineConfig } from "vitest/config"

const root = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  test: { environment: "node" },
  resolve: { alias: { "@": resolve(root, ".") } },
})
```

`lib/cart.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { addItem, updateQty, removeItem, subtotal, cartCount, cartKey } from "./cart"
import { products } from "./data"

const base = { slug: "minimal-linen-shirt", size: "M", color: "Sage", qty: 1 }

describe("cart", () => {
  it("adds a new item", () => {
    const cart = addItem([], base)
    expect(cart).toHaveLength(1)
    expect(cart[0].qty).toBe(1)
  })

  it("merges duplicates by slug+size+color", () => {
    const cart = addItem(addItem([], base), { ...base, qty: 2 })
    expect(cart).toHaveLength(1)
    expect(cart[0].qty).toBe(3)
  })

  it("keeps different sizes as separate lines", () => {
    const cart = addItem(addItem([], base), { ...base, size: "L" })
    expect(cart).toHaveLength(2)
  })

  it("updateQty to 0 removes the line", () => {
    const cart = addItem([], base)
    expect(updateQty(cart, cartKey(base), 0)).toHaveLength(0)
  })

  it("updateQty sets the quantity", () => {
    const cart = addItem([], base)
    expect(updateQty(cart, cartKey(base), 5)[0].qty).toBe(5)
  })

  it("removeItem removes the line", () => {
    const cart = addItem([], base)
    expect(removeItem(cart, cartKey(base))).toHaveLength(0)
  })

  it("computes subtotal and count", () => {
    const cart = addItem([], base)
    const p = products.find((x) => x.slug === base.slug)!
    expect(subtotal(cart, products)).toBe(p.price)
    expect(cartCount(cart)).toBe(1)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run`
Expected: FAIL — `lib/cart.ts` doesn't exist / import errors.

- [ ] **Step 3: Add the `test` script to `package.json`**

```json
"scripts": {
  "test": "vitest run"
}
```

- [ ] **Step 4: Write the implementation**

`lib/cart.ts`:

```ts
import type { Product } from "./data"

export type CartItem = { slug: string; size: string; color: string; qty: number }

export function cartKey(item: Pick<CartItem, "slug" | "size" | "color">): string {
  return `${item.slug}|${item.size}|${item.color}`
}

export function addItem(cart: CartItem[], item: CartItem): CartItem[] {
  const key = cartKey(item)
  const existing = cart.find((i) => cartKey(i) === key)
  if (existing) return cart.map((i) => (cartKey(i) === key ? { ...i, qty: i.qty + item.qty } : i))
  return [...cart, item]
}

export function updateQty(cart: CartItem[], key: string, qty: number): CartItem[] {
  if (qty <= 0) return cart.filter((i) => cartKey(i) !== key)
  return cart.map((i) => (cartKey(i) === key ? { ...i, qty } : i))
}

export function removeItem(cart: CartItem[], key: string): CartItem[] {
  return cart.filter((i) => cartKey(i) !== key)
}

export function subtotal(cart: CartItem[], products: Product[]): number {
  return cart.reduce((sum, i) => {
    const p = products.find((x) => x.slug === i.slug)
    return sum + (p?.price ?? 0) * i.qty
  }, 0)
}

export function cartCount(cart: CartItem[]): number {
  return cart.reduce((sum, i) => sum + i.qty, 0)
}
```

- [ ] **Step 5: Run to verify it passes**

Run: `npm run test`
Expected: 7 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts lib/cart.ts lib/cart.test.ts package.json
git commit -m "feat: add cart reducer logic with unit tests"
```

---

### Task 5: Cart context + root layout + navbar + footer

**Files:**
- Create: `hooks/use-cart.tsx`
- Create: `components/layout/navbar.tsx`
- Create: `components/layout/footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces:
  - `export function CartProvider({ children }: { children: ReactNode })`
  - `export function useCart(): { items: CartItem[]; add(item: CartItem): void; updateQty(key: string, qty: number): void; remove(key: string): void; clear(): void; subtotal: number; count: number }`
- Consumes: `lib/cart.ts`, `lib/data.ts`

- [ ] **Step 1: Write `hooks/use-cart.tsx`**

```tsx
"use client"
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { addItem, updateQty, removeItem, subtotal, cartCount, type CartItem } from "@/lib/cart"
import { products } from "@/lib/data"

type CartContextValue = {
  items: CartItem[]
  add: (item: CartItem) => void
  updateQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  subtotal: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "aurelia-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      add: (item) => setItems((prev) => addItem(prev, item)),
      updateQty: (key, qty) => setItems((prev) => updateQty(prev, key, qty)),
      remove: (key) => setItems((prev) => removeItem(prev, key)),
      clear: () => setItems([]),
      subtotal: subtotal(items, products),
      count: cartCount(items),
    }),
    [items]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
```

- [ ] **Step 2: Write `components/layout/navbar.tsx`**

```tsx
"use client"
import Link from "next/link"
import { Menu, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/login", label: "Sign in" },
]

export function Navbar() {
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="mt-8 flex flex-col gap-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="min-h-11 rounded px-2 py-2.5 text-lg font-medium hover:bg-muted">
                  {l.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="text-xl font-semibold tracking-tight">
          Aurelia
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="min-h-11 leading-[44px] text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/cart" className="relative inline-flex min-h-11 items-center gap-2 px-2" aria-label={`Cart, ${count} items`}>
          <ShoppingBag className="h-5 w-5" />
          <span className="text-sm font-medium">{count}</span>
        </Link>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Write `components/layout/footer.tsx`**

```tsx
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">Aurelia</p>
          <p className="mt-2 text-sm text-muted-foreground">Considered clothing, made to last.</p>
        </div>
        <div>
          <p className="text-sm font-medium">Shop</p>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/shop">All products</Link></li>
            {["shirts", "pants", "jackets"].map((c) => (
              <li key={c}><Link href={`/shop?category=${c}`} className="capitalize">{c}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Account</p>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/login">Sign in</Link></li>
            <li><Link href="/register">Create account</Link></li>
            <li><Link href="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Support</p>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/shop">FAQ</Link></li>
            <li><Link href="/shop">Contact</Link></li>
            <li><Link href="/shop">Shipping &amp; returns</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © 2026 Aurelia. Demo storefront — no real orders are processed.
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Update `app/layout.tsx`**

```tsx
import type { Metadata } from "next"
import { CartProvider } from "@/hooks/use-cart"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "Aurelia",
  description: "Considered clothing, made to last.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add hooks components/layout app/layout.tsx
git commit -m "feat: add cart context, navbar, footer, root layout"
```

---

### Task 6: Product card + homepage sections

**Files:**
- Create: `components/blocks/product-card.tsx`
- Create: `components/blocks/hero-section.tsx`
- Create: `components/blocks/category-grid.tsx`
- Create: `components/blocks/featured-products.tsx`
- Create: `components/blocks/testimonials.tsx`
- Create: `components/blocks/newsletter.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces:
  - `export function ProductCard({ product }: { product: Product })`
  - `export function HeroSection()`
  - `export function CategoryGrid()`
  - `export function FeaturedProducts()`
  - `export function Testimonials()`
  - `export function Newsletter()`
- Consumes: `lib/data.ts`

- [ ] **Step 1: Write `components/blocks/product-card.tsx`**

```tsx
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/data"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={750}
          className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground">${product.price}</p>
      </div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.category}</p>
    </Link>
  )
}
```

- [ ] **Step 2: Write `components/blocks/hero-section.tsx`**

```tsx
import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:py-24 lg:flex-row lg:items-center lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">New season</p>
          <h1 className="mt-2 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Considered clothing, made to last.
          </h1>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Small-batch essentials in natural fabrics. Designed to be worn, washed, and kept.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/shop">Shop the collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/shop?category=shirts">Explore shirts</Link>
            </Button>
          </div>
        </motion.div>
        <div className="w-full lg:flex-1">
          <div className="overflow-hidden rounded-xl bg-stone-200">
            <div className="flex aspect-[4/3] items-center justify-center text-4xl text-stone-500">Aurelia</div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Write `components/blocks/category-grid.tsx`**

```tsx
import Link from "next/link"
import Image from "next/image"
import { categories } from "@/lib/data"

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-2xl font-semibold tracking-tight">Shop by category</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {categories.map((c) => (
          <Link key={c.slug} href={`/shop?category=${c.slug}`} className="group">
            <div className="overflow-hidden rounded-lg bg-muted">
              <Image
                src={c.image}
                alt={c.name}
                width={600}
                height={750}
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:aspect-[4/5]"
              />
            </div>
            <p className="mt-3 text-center font-medium">{c.name}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Write `components/blocks/featured-products.tsx`**

```tsx
import { products } from "@/lib/data"
import { ProductCard } from "./product-card"

export function FeaturedProducts() {
  const featured = products.slice(0, 4)
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Featured</h2>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Write `components/blocks/testimonials.tsx`**

```tsx
const testimonials = [
  { quote: "Best shirt I've owned in years. The linen holds up beautifully.", name: "Mara K." },
  { quote: "Honest materials, honest prices. Everything I've bought still looks new.", name: "Jonas T." },
  { quote: "Fit is spot on and shipping was quick. Will order again.", name: "Priya S." },
]

export function Testimonials() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-semibold tracking-tight">What customers say</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-lg border bg-background p-6">
              <blockquote className="text-muted-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Write `components/blocks/newsletter.tsx`**

```tsx
"use client"
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [done, setDone] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDone(true)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-xl border bg-background p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold tracking-tight">Get 10% off your first order</h2>
        <p className="mt-2 text-sm text-muted-foreground">Sign up for new arrivals and private sales.</p>
        {done ? (
          <p className="mt-6 font-medium">Thanks — your code is AURELIA10.</p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input type="email" required placeholder="you@example.com" aria-label="Email address" />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Write `app/page.tsx`**

```tsx
import { HeroSection } from "@/components/blocks/hero-section"
import { CategoryGrid } from "@/components/blocks/category-grid"
import { FeaturedProducts } from "@/components/blocks/featured-products"
import { Testimonials } from "@/components/blocks/testimonials"
import { Newsletter } from "@/components/blocks/newsletter"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </>
  )
}
```

- [ ] **Step 8: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. `npm run dev` shows hero, categories, featured grid, testimonials, newsletter.

- [ ] **Step 9: Commit**

```bash
git add components/blocks app/page.tsx
git commit -m "feat: add homepage with hero, categories, featured, testimonials, newsletter"
```

---

### Task 7: Shop page with category filter

**Files:**
- Create: `app/shop/page.tsx`

**Interfaces:**
- Consumes: `lib/data.ts`, `components/blocks/product-card.tsx`
- Route: `/shop?category=<slug>`; `?category=all` or no param shows everything

- [ ] **Step 1: Write `app/shop/page.tsx`**

```tsx
"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { categories, products } from "@/lib/data"
import { ProductCard } from "@/components/blocks/product-card"

function ShopContent() {
  const searchParams = useSearchParams()
  const active = searchParams.get("category") ?? "all"
  const filtered = active === "all" ? products : products.filter((p) => p.category === active)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Shop</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium ${
            active === "all" ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?category=${c.slug}`}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium capitalize ${
              active === c.slug ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-muted-foreground">No products in this category yet.</p>
      )}
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10">Loading…</div>}>
      <ShopContent />
    </Suspense>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. `/shop`, `/shop?category=shirts` render filtered grids.

- [ ] **Step 3: Commit**

```bash
git add app/shop/page.tsx
git commit -m "feat: add shop page with category filtering"
```

---

### Task 8: Product detail page

**Files:**
- Create: `components/blocks/product-detail.tsx`
- Create: `app/products/[slug]/page.tsx`

**Interfaces:**
- Produces: `export function ProductDetail({ product }: { product: Product })` — client component; on add: `add({ slug, size, color, qty })` then `router.push("/cart")`
- Consumes: `lib/data.ts`, `hooks/use-cart.tsx`
- Route: `/products/<slug>`; unknown slug → 404 (`notFound()`)

- [ ] **Step 1: Write `components/blocks/product-detail.tsx`**

```tsx
"use client"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/data"

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter()
  const { add } = useCart()
  const [size, setSize] = useState(product.sizes[0])
  const [color, setColor] = useState(product.colors[0])
  const [qty, setQty] = useState(1)

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-12">
      <div className="overflow-hidden rounded-xl bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={750}
          priority
          className="aspect-[4/5] w-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">{product.category}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
        <p className="mt-3 text-2xl">${product.price}</p>
        <p className="mt-4 text-muted-foreground">{product.description}</p>

        <div className="mt-8">
          <p className="text-sm font-medium">Color: {color}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium ${
                  color === c ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium">Size: {size}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-h-11 rounded border px-4 py-2 text-sm font-medium ${
                  size === s ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm font-medium">Qty</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
              −
            </Button>
            <span className="w-8 text-center">{qty}</span>
            <Button variant="outline" size="icon" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
              +
            </Button>
          </div>
        </div>

        <Button
          size="lg"
          className="mt-8 sm:w-auto"
          onClick={() => {
            add({ slug: product.slug, size, color, qty })
            router.push("/cart")
          }}
        >
          Add to cart
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `app/products/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/data"
import { ProductDetail } from "@/components/blocks/product-detail"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. `/products/minimal-linen-shirt` shows detail; `/products/nope` → 404.

- [ ] **Step 4: Commit**

```bash
git add components/blocks/product-detail.tsx app/products
git commit -m "feat: add product detail page with add to cart"
```

---

### Task 9: Cart page

**Files:**
- Create: `app/cart/page.tsx`

**Interfaces:**
- Consumes: `hooks/use-cart.tsx`, `lib/cart.ts`, `lib/data.ts`

- [ ] **Step 1: Write `app/cart/page.tsx`**

```tsx
"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { cartKey } from "@/lib/cart"
import { products } from "@/lib/data"

export default function CartPage() {
  const { items, updateQty, remove, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add something you will actually wear.</p>
        <Button asChild className="mt-8">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Your cart</h1>
      <ul className="mt-8 divide-y">
        {items.map((item) => {
          const p = products.find((x) => x.slug === item.slug)
          if (!p) return null
          const key = cartKey(item)
          return (
            <li key={key} className="flex gap-4 py-6">
              <div className="w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-28">
                <Image src={p.image} alt={p.name} width={200} height={250} className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/products/${p.slug}`} className="font-medium hover:underline">
                    {p.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {item.size} · {item.color}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => updateQty(key, item.qty - 1)} aria-label="Decrease quantity">
                      −
                    </Button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => updateQty(key, item.qty + 1)} aria-label="Increase quantity">
                      +
                    </Button>
                  </div>
                  <button onClick={() => remove(key)} className="min-h-11 px-2 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-medium">${(p.price * item.qty).toFixed(2)}</p>
            </li>
          )
        })}
      </ul>
      <div className="mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg">
          Subtotal <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </p>
        <Button asChild size="lg">
          <Link href="/checkout">Checkout</Link>
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. Add a product, verify line items, qty +/-, remove, subtotal, empty state.

- [ ] **Step 3: Commit**

```bash
git add app/cart/page.tsx
git commit -m "feat: add cart page"
```

---

### Task 10: Checkout + order confirmation

**Files:**
- Create: `app/checkout/page.tsx`
- Create: `app/order-confirmation/page.tsx`

**Interfaces:**
- Produces: checkout validates fields → generates `AU-<6 digits>` order number → `clear()` cart → `router.push("/order-confirmation?order=...")`
- Consumes: `hooks/use-cart.tsx`, `lib/data.ts`

- [ ] **Step 1: Write `app/checkout/page.tsx`**

```tsx
"use client"
import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/lib/data"
import { cartKey } from "@/lib/cart"

const fields = ["name", "email", "address", "city", "zip"] as const
type Field = (typeof fields)[number]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clear } = useCart()
  const [form, setForm] = useState<Record<Field, string>>({ name: "", email: "", address: "", city: "", zip: "" })
  const [error, setError] = useState("")

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const missing = fields.find((f) => !form[f].trim())
    if (missing) {
      setError(`Please fill in ${missing}.`)
      return
    }
    const order = `AU-${Math.floor(100000 + Math.random() * 900000)}`
    clear()
    router.push(`/order-confirmation?order=${order}`)
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Street address</Label>
            <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP / Postcode</Label>
              <Input id="zip" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} required />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Place order
          </Button>
        </form>
      </div>

      <aside className="h-fit rounded-xl border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => {
            const p = products.find((x) => x.slug === item.slug)
            if (!p) return null
            return (
              <li key={cartKey(item)} className="flex justify-between gap-2">
                <span>
                  {p.name} <span className="text-muted-foreground">× {item.qty}</span>
                </span>
                <span>${(p.price * item.qty).toFixed(2)}</span>
              </li>
            )
          })}
        </ul>
        <div className="mt-4 flex justify-between border-t pt-4">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Demo checkout — no payment is taken.{" "}
          <Link href="/cart" className="underline underline-offset-4">Back to cart</Link>
        </p>
      </aside>
    </div>
  )
}
```

- [ ] **Step 2: Write `app/order-confirmation/page.tsx`**

```tsx
"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

function Confirmation() {
  const searchParams = useSearchParams()
  const order = searchParams.get("order") ?? "AU-000000"

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Order confirmed</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Thank you</h1>
      <p className="mt-4 text-muted-foreground">
        Your order number is <span className="font-semibold text-foreground">{order}</span>. A confirmation email is on its way.
      </p>
      <Button asChild className="mt-8">
        <Link href="/shop">Continue shopping</Link>
      </Button>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading…</div>}>
      <Confirmation />
    </Suspense>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. Empty-form submit shows "Please fill in name."; valid submit → confirmation with order number; cart empty afterward.

- [ ] **Step 4: Commit**

```bash
git add app/checkout app/order-confirmation
git commit -m "feat: add checkout and order confirmation pages"
```

---

### Task 11: Auth pages

**Files:**
- Create: `components/blocks/auth-form.tsx`
- Create: `app/login/page.tsx`
- Create: `app/register/page.tsx`

**Interfaces:**
- Produces: `export function AuthForm({ mode }: { mode: "login" | "register" })` — client, non-functional (shows success message), mobile-first single column
- Consumes: shadcn `Input`, `Label`, `Button`

- [ ] **Step 1: Write `components/blocks/auth-form.tsx`**

```tsx
"use client"
import Link from "next/link"
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [done, setDone] = useState(false)
  const isLogin = mode === "login"

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDone(true)
  }

  if (done) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{isLogin ? "Welcome back" : "Account created"}</h1>
        <p className="mt-2 text-muted-foreground">This is a demo storefront — no real account was created.</p>
        <Button asChild className="mt-6">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-sm space-y-4">
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required placeholder="Jordan Lee" />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required placeholder="••••••••" />
      </div>
      <Button type="submit" className="w-full">{isLogin ? "Sign in" : "Create account"}</Button>
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "New to Aurelia?" : "Already have an account?"}{" "}
        <Link href={isLogin ? "/register" : "/login"} className="font-medium text-foreground underline underline-offset-4">
          {isLogin ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </form>
  )
}
```

- [ ] **Step 2: Write `app/login/page.tsx`**

```tsx
import type { Metadata } from "next"
import { AuthForm } from "@/components/blocks/auth-form"

export const metadata: Metadata = { title: "Sign in — Aurelia" }

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-center text-3xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">Demo only — authentication is not wired up.</p>
      <div className="mt-8">
        <AuthForm mode="login" />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Write `app/register/page.tsx`**

```tsx
import type { Metadata } from "next"
import { AuthForm } from "@/components/blocks/auth-form"

export const metadata: Metadata = { title: "Create account — Aurelia" }

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-center text-3xl font-semibold tracking-tight">Create account</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">Demo only — authentication is not wired up.</p>
      <div className="mt-8">
        <AuthForm mode="register" />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. `/login` and `/register` render and switch between each other.

- [ ] **Step 5: Commit**

```bash
git add components/blocks/auth-form.tsx app/login app/register
git commit -m "feat: add login and register pages"
```

---

### Task 12: Build verification + final polish

**Files:**
- Modify: none required (only if build surfaces issues)

**Interfaces:**
- Verifies the whole site compiles and tests pass

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`
Expected: 7 tests PASS.

- [ ] **Step 2: Run lint and typecheck**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: builds with all routes generated, no errors.

- [ ] **Step 4: Mobile smoke test**

Run: `npm run dev` and check at ~375px viewport:
- Navbar hamburger opens the sheet drawer
- Product grid is 2 columns; category cards 2-up
- Product detail add-to-cart visible and tappable
- Cart and checkout single-column; buttons ≥44px
Expected: all usable with touch; no horizontal overflow.

- [ ] **Step 5: Fix any build/lint issues found (if none, skip)**

Repeat Step 1–3 until clean.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: verify build, lint, and tests pass"
```

---

## Self-Review

**Spec coverage:**
- Homepage sections (hero, category cards, featured, testimonials, newsletter) → Task 6
- Shop + category filter via `useSearchParams` → Task 7
- Product detail with gallery/pricing/size/color → Task 8
- Cart page (qty +/-, remove, subtotal, empty state) → Task 9
- Checkout + order confirmation (clears cart, fake order number) → Task 10
- Login/register static pages → Task 11
- Centralized `lib/data.ts` → Task 3
- Cart Context + localStorage → Task 5
- Mobile-first responsive + 44px targets → baked into every component; verified in Task 12
- One vitest cart test → Task 4
- shadcn-space registry configured → Task 1 (block install optional; all sections hand-built so no external registry dependency is required)

**Placeholder scan:** All tasks contain concrete code and exact commands; no TBD/TODO.

**Type consistency:** `CartItem`, `cartKey`, `addItem`, `updateQty`, `removeItem`, `subtotal`, `cartCount` defined in Task 4 and consumed identically in Tasks 5, 8, 9, 10. `Product` type and `getProductBySlug` from Task 3 used consistently in Tasks 8, 9, 10. `motion/react` import matches `motion` v12+ package.
