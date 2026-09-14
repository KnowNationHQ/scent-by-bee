import type { Metadata } from "next"
import { CartProvider } from "@/hooks/use-cart"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { WhatsAppFloat } from "@/components/layout/whatsapp-float"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "SCENT BY BEE — Authentic, Affordable Luxury Perfumes",
  description: "Authentic, Affordable, Luxury Perfumes. Wholesale & Retail. Nationwide Delivery. DM to Order.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  )
}
