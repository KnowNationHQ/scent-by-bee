"use client"
import Link from "next/link"
import { useState, type FormEvent } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [done, setDone] = useState(false)
  const isLogin = mode === "login"

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDone(true)
  }

  if (done) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{isLogin ? "Welcome back" : "Account created"}</h1>
        <p className="mt-2 text-muted-foreground">This is a demo storefront — no real account was created.</p>
        <Link href="/shop" className={cn(buttonVariants({ className: "mt-6 min-h-11" }))}>
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-sm space-y-4">
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required placeholder="Jordan Lee" />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required placeholder="••••••••" />
      </div>
      <Button type="submit" className="w-full min-h-11">{isLogin ? "Sign in" : "Create account"}</Button>
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "New to SCENT BY BEE?" : "Already have an account?"}{" "}
        <Link href={isLogin ? "/register" : "/login"} className="min-h-11 px-1 inline-flex items-center font-medium text-foreground underline underline-offset-4">
          {isLogin ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </form>
  )
}
