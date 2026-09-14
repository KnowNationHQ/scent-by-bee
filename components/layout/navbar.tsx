"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, ShoppingBag, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/login", label: "Sign in" },
]

export function Navbar() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:h-16 sm:px-6">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="mx-auto lg:mx-0 lg:mr-auto">
          <img src="/logo.svg" alt="SCENT BY BEE" className="h-7 sm:h-8" />
        </Link>

        <nav className="hidden items-center gap-1 lg:ml-6 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="min-h-11 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/cart" className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center" aria-label={`Cart, ${count} items`}>
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <Badge variant="secondary" className="absolute -right-0.5 -top-0.5 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
              {count}
            </Badge>
          )}
        </Link>
      </div>

      {open && (
        <nav className="border-t border-border/50 bg-background px-4 pb-4 pt-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block min-h-11 rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="block min-h-11 rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted"
          >
            Cart {count > 0 && `(${count})`}
          </Link>
        </nav>
      )}
    </header>
  )
}
