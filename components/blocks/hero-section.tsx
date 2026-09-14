"use client"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/60 to-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-2xl text-center animate-fade-in">
          <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs tracking-wide uppercase">
            Wholesale &amp; Retail
          </Badge>
          <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Authentic, Affordable, Luxury Perfumes
          </h1>
          <p className="mt-5 text-muted-foreground sm:text-lg">
            Premium fragrances that speak before you do. Nationwide delivery across Nigeria.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/shop" className={cn(buttonVariants({ size: "lg", className: "min-h-11 px-6" }))}>
              Shop the collection
            </Link>
            <a href="https://wa.me/2349036159129" target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg", variant: "outline", className: "min-h-11 px-6" }))}>
              DM to Order
            </a>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
