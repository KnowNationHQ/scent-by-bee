import { HeroSection } from "@/components/blocks/hero-section"
import { CategoryGrid } from "@/components/blocks/category-grid"
import { FeaturedProducts } from "@/components/blocks/featured-products"
import { Testimonials } from "@/components/blocks/testimonials"
import { Newsletter } from "@/components/blocks/newsletter"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </>
  )
}
