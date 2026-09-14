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
    const order = `SB-${Math.floor(100000 + Math.random() * 900000)}`
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
          <Button type="submit" size="lg" className="w-full min-h-11 sm:w-auto">
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
                <span>₦{(p.price * item.qty).toLocaleString()}</span>
              </li>
            )
          })}
        </ul>
        <div className="mt-4 flex justify-between border-t pt-4">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Demo checkout — no payment is taken.{" "}
          <Link href="/cart" className="underline underline-offset-4">Back to cart</Link>
        </p>
      </aside>
    </div>
  )
}
