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
