export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold tracking-[0.15em]">
          <span className="text-foreground">SCENT</span>
          <span className="text-primary ml-1.5">BY BEE</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground tracking-wider">Affordable, Luxury Perfumes</p>
      </div>
    </div>
  )
}
