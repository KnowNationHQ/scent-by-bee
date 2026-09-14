import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { categories } from "@/lib/data"

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Shop by mood</h2>
      <p className="mt-1 text-sm text-muted-foreground">Find your vibe</p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {categories.map((c) => (
          <Link key={c.slug} href={`/shop?category=${c.slug}`} className="group relative">
            <div className="relative overflow-hidden rounded-2xl bg-muted">
              <Image
                src={c.image}
                alt={c.name}
                width={600}
                height={750}
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="bg-white/90 text-foreground backdrop-blur-sm">
                  {c.name}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
