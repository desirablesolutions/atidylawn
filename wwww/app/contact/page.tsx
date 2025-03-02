import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { AppointmentScheduler } from "@/components/scheduling/appointment-scheduler"
import { SuccessMetrics } from "@/components/marketing/success-metrics"
import { CtaSection } from "@/components/cta-section"

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        icon={<Phone className="h-8 w-8" />}
        title="Contact Us"
        description="Get In Touch"
        image="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2940"
      >
        <p className="text-xl text-white/90 mb-8">We're here to help with all your lawn care needs</p>
      </PageHero>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-6 h-fit">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="How can we help?" className="min-h-[150px]" />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "(555) 123-4567",
                  description: "Monday to Friday, 9am to 6pm",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "contact@atidylawn.com",
                  description: "We'll respond within 24 hours",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  content: "123 Garden Street",
                  description: "Beverly Hills, CA 90210",
                },
                {
                  icon: Clock,
                  title: "Business Hours",
                  content: "Mon - Fri: 9:00 AM - 6:00 PM",
                  description: "Sat: 10:00 AM - 4:00 PM",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg h-fit">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      <p className="text-lg mb-1">{item.content}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AppointmentScheduler />
      <SuccessMetrics />
      <CtaSection />
    </main>
  )
}

