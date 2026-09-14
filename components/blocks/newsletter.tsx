"use client"
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Newsletter() {
  const [done, setDone] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDone(true)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <Badge variant="secondary" className="mb-3 px-3 py-1 text-xs tracking-wide uppercase">
            Promo Code
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get 10% off your first order</h2>
          <p className="mt-2 text-sm text-muted-foreground">Use code <Badge variant="default" className="px-2 py-0.5 text-xs">BEE10</Badge> at checkout. New arrivals, scent drops, and exclusive offers.</p>
          {done ? (
            <div className="mt-6 flex items-center gap-2">
              <Badge variant="default" className="px-3 py-1 text-sm">BEE10</Badge>
              <span className="text-sm text-muted-foreground">Use at checkout</span>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <Input type="email" required placeholder="you@example.com" aria-label="Email address" className="h-11 flex-1" />
              <Button type="submit" className="min-h-11 px-6">Subscribe</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
