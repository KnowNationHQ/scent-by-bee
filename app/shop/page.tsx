"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { categories, products } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/blocks/product-card"

function ShopContent() {
  const searchParams = useSearchParams()
  const active = searchParams.get("category") ?? "all"
  const filtered = active === "all" ? products : products.filter((p) => p.category === active)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Shop</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/shop">
          <Badge variant={active === "all" ? "default" : "secondary"} className="cursor-pointer px-3 py-1 text-xs transition-colors">
            All
          </Badge>
        </Link>
        {categories.map((c) => (
          <Link key={c.slug} href={`/shop?category=${c.slug}`}>
            <Badge variant={active === c.slug ? "default" : "secondary"} className="cursor-pointer px-3 py-1 text-xs transition-colors">
              {c.name}
            </Badge>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-3">
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
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10">Loading…</div>}>
      <ShopContent />
    </Suspense>
  )
}
