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
const STORAGE_KEY = "scent-by-bee-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional load-once on mount; lazy init would cause a hydration mismatch
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
