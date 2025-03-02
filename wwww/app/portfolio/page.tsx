import { Flower2 } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { BeforeAfterGallery } from "@/components/gallery/before-after-gallery"
import { CaseStudiesGrid } from "@/components/resources/case-studies-grid"
import { CtaSection } from "@/components/cta-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SuccessMetrics } from "@/components/marketing/success-metrics"
import { LawnAiPreview } from "@/components/lawn-ai-preview"

export default function PortfolioPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        icon={<Flower2 className="h-8 w-8" />}
        title="Our Portfolio"
        description="Transformations & Projects"
        image="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2942"
      >
        <p className="text-xl text-white/90 mb-8">Explore our collection of stunning landscape transformations</p>
      </PageHero>

      <BeforeAfterGallery />
      <LawnAiPreview />
      <CaseStudiesGrid />
      <SuccessMetrics />
      <TestimonialsSection />
      <CtaSection />
    </main>
  )
}

