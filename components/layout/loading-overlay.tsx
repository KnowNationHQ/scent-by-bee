"use client"
import { useEffect, useState } from "react"

export function LoadingOverlay() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ transitionDelay: visible ? "0ms" : "0ms" }}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-[3px] border-primary/15" />
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-primary" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold tracking-[0.15em]">
            <span className="text-foreground">SCENT</span>
            <span className="text-primary ml-1.5">BY BEE</span>
          </p>
          <p className="mt-2 text-xs tracking-[0.3em] text-muted-foreground uppercase">Affordable, Luxury Perfumes</p>
        </div>
      </div>
    </div>
  )
}
