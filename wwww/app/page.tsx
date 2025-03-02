import TableOfContents from "@/components/table-of-contents"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import ServicesSection from "@/components/services-section"
import BeforeAfterGallery from "@/components/gallery/before-after-gallery"
import OpenSourceSection from "@/components/community/open-source-section"
import PublicationsHub from "@/components/community/publications-hub"
import DiyKnowledgeBase from "@/components/community/diy-knowledge-base"
import AdvancedServiceCalculator from "@/components/pricing/advanced-service-calculator"
import AppointmentScheduler from "@/components/scheduling/appointment-scheduler"
import LawnAiPreview from "@/components/lawn-ai-preview"
import TestimonialsSection from "@/components/testimonials/modern-testimonials"
import NetworkOverview from "@/components/partnerships/network-overview"
import TokenInfo from "@/components/partnerships/token-info"
import CtaSection from "@/components/cta-section"
import AiHelpChat from "@/components/ai-help-chat"
import BrandIdentity from "@/components/products/brand-identity"
import HealthProducts from "@/components/products/health-products"
import FutureSolutions from "@/components/products/future-solutions"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="relative">
        <TableOfContents />
        <div className="relative z-10 space-y-20">
          <section id="hero" className="min-h-screen">
            <HeroSection />
          </section>

          <section id="features" className="gradient-section gradient-primary">
            <FeaturesSection />
          </section>

          <section id="services" className="gradient-section gradient-secondary">
            <ServicesSection />
          </section>

          <section id="brand-identity" className="gradient-section gradient-accent">
            <BrandIdentity />
          </section>

          <section id="health-products" className="gradient-section gradient-primary">
            <HealthProducts />
          </section>

          <section id="future-solutions" className="gradient-section gradient-secondary">
            <FutureSolutions />
          </section>

          <section id="gallery" className="gradient-section gradient-accent">
            <BeforeAfterGallery />
          </section>

          <section id="open-source" className="gradient-section gradient-primary">
            <OpenSourceSection />
          </section>

          <section id="publications" className="gradient-section gradient-secondary">
            <PublicationsHub />
          </section>

          <section id="knowledge-base" className="gradient-section gradient-accent">
            <DiyKnowledgeBase />
          </section>

          <section id="calculator" className="gradient-section gradient-primary">
            <AdvancedServiceCalculator />
          </section>

          <section id="scheduler" className="gradient-section gradient-secondary">
            <AppointmentScheduler />
          </section>

          <section id="ai-preview" className="gradient-section gradient-accent">
            <LawnAiPreview />
          </section>

          <section id="testimonials" className="gradient-section gradient-primary">
            <TestimonialsSection />
          </section>

          <section id="network" className="gradient-section gradient-secondary">
            <NetworkOverview />
          </section>

          <section id="token" className="gradient-section gradient-accent">
            <TokenInfo />
          </section>

          <section id="cta" className="gradient-section gradient-primary">
            <CtaSection />
          </section>
        </div>
        <AiHelpChat />
      </div>
    </main>
  )
}

