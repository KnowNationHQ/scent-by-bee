"use client"
import { useEffect, useState } from "react"

export function LoadingOverlay() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-[3px] border-primary/15" />
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-primary" />
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold tracking-[0.15em]">
            <span className="text-foreground">SCENT</span>
            <span className="text-primary ml-1.5">BY BEE</span>
          </p>
          <p className="mt-1.5 text-xs tracking-[0.25em] text-muted-foreground uppercase">Affordable, Luxury Perfumes</p>
        </div>
      </div>
    </div>
  )
}
