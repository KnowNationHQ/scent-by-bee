import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/lib/data"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="overflow-hidden border-0 bg-transparent p-0 ring-0 shadow-none transition-all duration-300 hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-xl bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={750}
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <Badge variant="secondary" className="absolute left-3 top-3 text-[10px] uppercase tracking-wider">
              {product.category}
            </Badge>
          </div>
          <div className="pt-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm font-medium text-muted-foreground">₦{product.price.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
