"use client"
import Link from "next/link"
import Image from "next/image"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { cartKey } from "@/lib/cart"
import { products } from "@/lib/data"

export default function CartPage() {
  const { items, updateQty, remove, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add something that smells incredible.</p>
        <Link href="/shop" className={cn(buttonVariants({ className: "mt-8 min-h-11" }))}>
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your cart</h1>
      <ul className="mt-8 space-y-4">
        {items.map((item) => {
          const p = products.find((x) => x.slug === item.slug)
          if (!p) return null
          const key = cartKey(item)
          return (
            <li key={key}>
              <Card className="border-border/50 bg-card/50">
                <CardContent className="flex gap-4 p-4">
                  <div className="w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:w-28">
                    <Image src={p.image} alt={p.name} width={200} height={250} className="aspect-[4/5] w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link href={`/products/${p.slug}`} className="font-medium hover:underline">
                        {p.name}
                      </Link>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        <Badge variant="secondary" className="text-[10px]">{item.size}</Badge>
                        <Badge variant="secondary" className="text-[10px]">{item.color}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="min-h-9 min-w-9 rounded-lg" onClick={() => updateQty(key, item.qty - 1)} aria-label="Decrease quantity">
                          −
                        </Button>
                        <span className="w-8 text-center font-medium">{item.qty}</span>
                        <Button variant="outline" size="icon" className="min-h-9 min-w-9 rounded-lg" onClick={() => updateQty(key, item.qty + 1)} aria-label="Increase quantity">
                          +
                        </Button>
                      </div>
                      <button onClick={() => remove(key)} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-medium">₦{(p.price * item.qty).toLocaleString()}</p>
                </CardContent>
              </Card>
            </li>
          )
        })}
      </ul>
      <Separator className="my-6" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg">
          Subtotal <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
        </p>
        <Link href="/checkout" className={cn(buttonVariants({ variant: "default", size: "lg", className: "min-h-11 px-6" }))}>
          Checkout
        </Link>
      </div>
    </div>
  )
}
