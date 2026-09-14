import type { Metadata } from "next"
import { AuthForm } from "@/components/blocks/auth-form"

export const metadata: Metadata = { title: "Sign in — SCENT BY BEE" }

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-center text-3xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">Demo only — authentication is not wired up.</p>
      <div className="mt-8">
        <AuthForm mode="login" />
      </div>
    </div>
  )
}
