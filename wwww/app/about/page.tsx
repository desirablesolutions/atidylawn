import { Info, Users, Star, Award } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TeamSection } from "@/components/team-section"
import { CtaSection } from "@/components/cta-section"
import { NetworkOverview } from "@/components/partnerships/network-overview"
import { SuccessMetrics } from "@/components/marketing/success-metrics"
import { OpenSourceSection } from "@/components/community/open-source-section"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        icon={<Info className="h-8 w-8" />}
        title="About Us"
        description="Our Story & Mission"
        image="https://images.unsplash.com/photo-1601158935942-52255782d322?q=80&w=2936"
      >
        <p className="text-xl text-white/90 mb-8">
          Dedicated to creating and maintaining beautiful outdoor spaces since 2010
        </p>
      </PageHero>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: "Happy Clients", value: "5,000+" },
              { icon: Star, label: "Client Rating", value: "4.9/5" },
              { icon: Award, label: "Years Experience", value: "13+" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />
      <NetworkOverview />
      <TestimonialsSection />
      <SuccessMetrics />
      <OpenSourceSection />
      <CtaSection />
    </main>
  )
}

