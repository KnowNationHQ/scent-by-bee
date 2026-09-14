"use client"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/data"

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter()
  const { add } = useCart()
  const [size, setSize] = useState(product.sizes[0])
  const [color, setColor] = useState(product.colors[0])
  const [qty, setQty] = useState(1)

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12">
      <div className="overflow-hidden rounded-2xl bg-muted">
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
        <Badge variant="secondary" className="mb-3 w-fit px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
          {product.category}
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
        <p className="mt-3 text-2xl font-medium">₦{product.price.toLocaleString()}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

        <Separator className="my-6" />

        <div>
          <p className="text-sm font-medium">{product.colors.length > 1 ? "Variant" : "Style"}: <span className="text-muted-foreground">{color}</span></p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`min-h-10 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  color === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium">Size: <span className="text-muted-foreground">{size}</span></p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-h-10 rounded-lg border px-4 py-1.5 text-sm font-medium transition-all ${
                  size === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-sm font-medium">Qty</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="min-h-10 min-w-10 rounded-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
              -
            </Button>
            <span className="w-8 text-center font-medium">{qty}</span>
            <Button variant="outline" size="icon" className="min-h-10 min-w-10 rounded-lg" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
              +
            </Button>
          </div>
        </div>

        <Button
          size="lg"
          className="mt-8 min-h-12 w-full rounded-xl text-sm font-semibold sm:w-auto"
          onClick={() => {
            add({ slug: product.slug, size, color, qty })
            toast.success(`${product.name} added to cart`, {
              description: `${size} · ${color} · Qty ${qty}`,
              action: {
                label: "View cart",
                onClick: () => router.push("/cart"),
              },
            })
          }}
        >
          Add to cart
        </Button>
      </div>
    </div>
  )
}
