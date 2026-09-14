import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  { quote: "I've never received so many compliments on a scent. People literally stop me to ask what I'm wearing.", name: "Chidinma A.", tag: "Velvet Oud" },
  { quote: "Finally, fragrances that feel personal. Every bottle feels like it was made for me.", name: "Tolu B.", tag: "Citrus Bloom" },
  { quote: "Longevity is unreal. Eight hours in and I still catch whiffs of it throughout the day.", name: "Ngozi O.", tag: "Midnight Musk" },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What they&apos;re saying</h2>
      <p className="mt-1 text-sm text-muted-foreground">Real people, real scents</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <blockquote className="text-sm leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-4 flex items-center justify-between">
                <figcaption className="text-sm font-medium">{t.name}</figcaption>
                <span className="text-xs text-muted-foreground">{t.tag}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
