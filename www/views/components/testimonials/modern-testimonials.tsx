"use client"

import type React from "react"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Star, BadgeCheck, Plus, ChevronRight, Code2, Database, Globe2, Workflow, Users2, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  quote: string
  rating: number
  project: string
  duration: string
  verified: boolean
  tags: string[]
  location: string
  date: string
  propertyType: string
  serviceType: string
  likes: number
  helpful: boolean
  projectImages?: string[]
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop",
    quote:
      "GreenScape transformed our yard from an eyesore to the envy of the neighborhood. Their attention to detail and expertise is unmatched!",
    rating: 5,
    project: "Complete Landscape Redesign",
    duration: "3 weeks",
    verified: true,
    tags: ["Landscaping", "Garden Design"],
    location: "Beverly Hills, CA",
    date: "2024-02-15",
    propertyType: "Residential",
    serviceType: "Premium",
    likes: 24,
    helpful: false,
    projectImages: [
      "https://images.unsplash.com/photo-1558635924-b60e7f3b4796",
      "https://images.unsplash.com/photo-1592722212832-f7219ea510da",
    ],
  },
  // ... add more testimonials
]

const techStack = [
  {
    icon: Code2,
    title: "Open Source",
    description: "Built with modern open-source technologies",
    tags: ["Next.js", "React", "Node.js", "TypeScript"],
  },
  {
    icon: Database,
    title: "Interpros Integration",
    description: "Seamless business operations management",
    tags: ["CRM", "Scheduling", "Invoicing"],
  },
  {
    icon: Globe2,
    title: "API-First",
    description: "Modern API architecture for integrations",
    tags: ["REST", "GraphQL", "Webhooks"],
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description: "Streamlined business processes",
    tags: ["Automation", "Notifications", "Reports"],
  },
  {
    icon: Users2,
    title: "Professional Network",
    description: "Connected with industry experts",
    tags: ["Contractors", "Suppliers", "Experts"],
  },
  {
    icon: Network,
    title: "Real-time Updates",
    description: "Live project tracking and updates",
    tags: ["GPS", "Photos", "Timeline"],
  },
]

export default function ModernTestimonials() {
  const [activeFilter, setActiveFilter] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "story">("grid")
  const [activeStory, setActiveStory] = useState(0)
  const [showAddReview, setShowAddReview] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  const handleFilterClick = (filter: string) => {
    setActiveFilter((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const ReviewForm = () => {
    const [step, setStep] = useState(1)
    const [review, setReview] = useState({
      rating: 5,
      title: "",
      content: "",
      images: [] as File[],
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Handle submission
      setShowAddReview(false)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center">
                <h3 className="text-2xl font-medium mb-2">How was your experience?</h3>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setReview({ ...review, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={cn(
                          "h-8 w-8 transition-colors",
                          star <= review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground",
                        )}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
              <Button type="button" onClick={() => setStep(2)} className="w-full">
                Next
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Textarea
                placeholder="Share your experience..."
                value={review.content}
                onChange={(e) => setReview({ ...review, content: e.target.value })}
                className="min-h-[150px]"
              />
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    className="aspect-square"
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "file"
                      input.accept = "image/*"
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) {
                          setReview({ ...review, images: [...review.images, file] })
                        }
                      }
                      input.click()
                    }}
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Submit
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    )
  }

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-100, 100], [-10, 10])
    const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5])

    const handleDragEnd = () => {
      if (Math.abs(x.get()) > 100) {
        // Handle swipe action (like/dismiss)
      }
      x.set(0)
    }

    return (
      <motion.div
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="touch-none"
      >
        <Card className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="relative h-12 w-12">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="rounded-full object-cover"
              />
              {testimonial.verified && <BadgeCheck className="absolute -bottom-1 -right-1 h-5 w-5 text-primary" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{testimonial.name}</h4>
              <p className="text-sm text-muted-foreground truncate">{testimonial.location}</p>
            </div>
            <div className="flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
          </div>

          <p className="text-sm">{testimonial.quote}</p>

          {testimonial.projectImages && (
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-2">
                {testimonial.projectImages.map((image, i) => (
                  <Image
                    key={i}
                    src={image || "/placeholder.svg"}
                    alt="Project"
                    width={200}
                    height={150}
                    className="rounded-md object-cover"
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}

          <div className="flex flex-wrap gap-2">
            {testimonial.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleFilterClick(tag)}>
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-serif font-medium">Customer Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from our valued customers, powered by modern technology
            </p>
          </div>

          {/* Tech Stack Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <tech.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">{tech.title}</h3>
                      <p className="text-sm text-muted-foreground">{tech.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tech.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Reviews Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "story" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("story")}
                >
                  Stories
                </Button>
              </div>

              {isSmallScreen ? (
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Share Your Experience</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4">
                      <ReviewForm />
                    </div>
                  </DrawerContent>
                </Drawer>
              ) : (
                <Dialog open={showAddReview} onOpenChange={setShowAddReview}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Share Your Experience
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Share Your Experience</DialogTitle>
                    </DialogHeader>
                    <ReviewForm />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Filter Tags */}
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex gap-2">
                {Array.from(new Set(testimonials.flatMap((t) => t.tags))).map((tag) => (
                  <Badge
                    key={tag}
                    variant={activeFilter.includes(tag) ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => handleFilterClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Testimonials Grid/Story View */}
            <div className="relative" ref={containerRef}>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials
                    .filter((t) => activeFilter.length === 0 || t.tags.some((tag) => activeFilter.includes(tag)))
                    .map((testimonial) => (
                      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
              ) : (
                <div className="relative h-[600px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStory}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0"
                    >
                      <TestimonialCard testimonial={testimonials[activeStory]} />
                    </motion.div>
                  </AnimatePresence>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setActiveStory((prev) => (prev + 1) % testimonials.length)}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

