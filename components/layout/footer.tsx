import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/logo.svg" alt="SCENT BY BEE" className="h-7 mb-2" />
          <p className="text-sm text-muted-foreground">Authentic, Affordable, Luxury Perfumes</p>
          <p className="text-sm text-muted-foreground">Wholesale &amp; Retail</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/shop" className="transition-colors hover:text-foreground">All products</Link></li>
            {["edp", "edt", "gift-sets"].map((c) => (
              <li key={c}><Link href={`/shop?category=${c}`} className="transition-colors hover:text-foreground capitalize">{c === "edp" ? "Eau de Parfum" : c === "edt" ? "Eau de Toilette" : "Gift Sets"}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Account</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/login" className="transition-colors hover:text-foreground">Sign in</Link></li>
            <li><Link href="/register" className="transition-colors hover:text-foreground">Create account</Link></li>
            <li><Link href="/cart" className="transition-colors hover:text-foreground">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Lagos, Nigeria</li>
            <li>09036159129</li>
            <li>
              <a href="https://wa.me/2349036159129" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                WhatsApp
              </a>
            </li>
            <li className="pt-1 text-xs">Nationwide Delivery</li>
          </ul>
        </div>
      </div>
      <Separator />
      <p className="py-6 text-center text-xs text-muted-foreground">
        &copy; 2026 scent_by_bee. Authentic, Affordable, Luxury Perfumes.
      </p>
    </footer>
  )
}
