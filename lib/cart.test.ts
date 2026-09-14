import { describe, expect, it } from "vitest"
import { addItem, updateQty, removeItem, subtotal, cartCount, cartKey } from "./cart"
import { products } from "./data"

const base = { slug: "velvet-oud", size: "50ml", color: "Original", qty: 1 }

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
