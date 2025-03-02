import { Sprout } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { PublicationsHub } from "@/components/community/publications-hub"
import { DiyKnowledgeBase } from "@/components/community/diy-knowledge-base"
import { OpenSourceSection } from "@/components/community/open-source-section"
import { CtaSection } from "@/components/cta-section"
import { NetworkOverview } from "@/components/partnerships/network-overview"
import { TokenInfo } from "@/components/partnerships/token-info"

export default function ResourcesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        icon={<Sprout className="h-8 w-8" />}
        title="Resources"
        description="Lawn Care Knowledge Hub"
        image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2940"
      >
        <p className="text-xl text-white/90 mb-8">
          Expert guides, tips, and resources for maintaining a beautiful lawn
        </p>
      </PageHero>

      <DiyKnowledgeBase />
      <PublicationsHub />
      <OpenSourceSection />
      <NetworkOverview />
      <TokenInfo />
      <CtaSection />
    </main>
  )
}

