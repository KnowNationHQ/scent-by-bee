import type { Metadata } from "next"
import { CartProvider } from "@/hooks/use-cart"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { WhatsAppFloat } from "@/components/layout/whatsapp-float"
import { LoadingOverlay } from "@/components/layout/loading-overlay"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://scent-by-bee.vercel.app"),
  title: "SCENT BY BEE — Authentic, Affordable Luxury Perfumes",
  description: "Authentic, Affordable, Luxury Perfumes. Wholesale & Retail. Nationwide Delivery. DM to Order.",
  openGraph: {
    title: "SCENT BY BEE — Authentic, Affordable Luxury Perfumes",
    description: "Authentic, Affordable, Luxury Perfumes. Wholesale & Retail. Nationwide Delivery. DM to Order.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    type: "website",
    locale: "en_NG",
    siteName: "SCENT BY BEE",
  },
  twitter: {
    card: "summary_large_image",
    title: "SCENT BY BEE — Authentic, Affordable Luxury Perfumes",
    description: "Authentic, Affordable, Luxury Perfumes. Wholesale & Retail. Nationwide Delivery. DM to Order.",
    images: ["/og-image.svg"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <LoadingOverlay />
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
