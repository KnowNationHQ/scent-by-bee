import { products } from "@/lib/data"
import { ProductCard } from "./product-card"

export function FeaturedProducts() {
  const featured = products.slice(0, 4)
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured</h2>
          <p className="mt-1 text-sm text-muted-foreground">Our most-loved scents</p>
        </div>
        <a href="/shop" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          View all
        </a>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
