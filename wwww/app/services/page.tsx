import { Scissors } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ServicesSection } from "@/components/services-section"
import { AppointmentScheduler } from "@/components/scheduling/appointment-scheduler"
import { CtaSection } from "@/components/cta-section"
import { AdvancedServiceCalculator } from "@/components/pricing/advanced-service-calculator"
import { BenefitsShowcase } from "@/components/marketing/benefits-showcase"
import { SuccessMetrics } from "@/components/marketing/success-metrics"

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        icon={<Scissors className="h-8 w-8" />}
        title="Our Services"
        description="Professional Lawn Care Services"
        image="https://images.unsplash.com/photo-1558635924-b60e7f3b4796?q=80&w=2940"
      >
        <p className="text-xl text-white/90 mb-8">
          Expert landscaping and maintenance solutions tailored to your needs
        </p>
      </PageHero>

      <BenefitsShowcase />
      <ServicesSection />
      <AdvancedServiceCalculator />
      <SuccessMetrics />
      <AppointmentScheduler />
      <CtaSection />
    </main>
  )
}

