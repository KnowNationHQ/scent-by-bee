"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Confirmation() {
  const searchParams = useSearchParams()
  const order = searchParams.get("order") ?? "AU-000000"

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Order confirmed</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Thank you</h1>
      <p className="mt-4 text-muted-foreground">
        Your order number is <span className="font-semibold text-foreground">{order}</span>. A confirmation email is on its way.
      </p>
      <Link href="/shop" className={cn(buttonVariants({ className: "mt-8 min-h-11" }))}>
        Continue shopping
      </Link>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading…</div>}>
      <Confirmation />
    </Suspense>
  )
}
