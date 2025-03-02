"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ZoomIn, Calendar, Clock, MapPin, Award, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BeforeAfterSlider } from "@/components/ui/before-after-slider"

interface Project {
  id: string
  title: string
  description: string
  category: string
  before: string
  after: string
  date: string
  duration: string
  location: string
  metrics: {
    satisfaction: number
    valueIncrease: string
    maintenanceReduction: string
  }
  tags: string[]
}

const projects: Project[] = [
  {
    id: "1",
    title: "Modern Garden Transformation",
    description: "Complete backyard redesign with sustainable landscaping",
    category: "landscaping",
    before: "https://images.unsplash.com/photo-1558635924-b60e7f3b4796",
    after: "https://images.unsplash.com/photo-1592722212832-f7219ea510da",
    date: "2024-01-15",
    duration: "3 weeks",
    location: "Beverly Hills, CA",
    metrics: {
      satisfaction: 98,
      valueIncrease: "15%",
      maintenanceReduction: "30%",
    },
    tags: ["Modern", "Sustainable", "Low-maintenance"],
  },
  {
    id: "2",
    title: "Drought-Resistant Landscape",
    description: "Water-efficient design with native plants",
    category: "xeriscaping",
    before: "https://images.unsplash.com/photo-1558435186-d31d126391fa",
    after: "https://images.unsplash.com/photo-1604762524889-3b2a380a7a0e",
    date: "2024-02-01",
    duration: "2 weeks",
    location: "Phoenix, AZ",
    metrics: {
      satisfaction: 95,
      valueIncrease: "12%",
      maintenanceReduction: "40%",
    },
    tags: ["Drought-resistant", "Native plants", "Eco-friendly"],
  },
  // Add more projects as needed
]

const categories = ["all", "landscaping", "xeriscaping", "maintenance", "renovation"]

export default function BeforeAfterGallery() {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  if (!mounted) {
    return null // or a loading state
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-4xl font-serif font-medium mb-4">Transformation Gallery</h2>
            <p className="text-lg text-muted-foreground">Explore our before and after transformations</p>
          </motion.div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden cursor-pointer group">
                      <div className="relative">
                        <BeforeAfterSlider
                          beforeImage={
                            <Image
                              src={project.before || "/placeholder.svg"}
                              alt="Before"
                              fill
                              className="object-cover"
                            />
                          }
                          afterImage={
                            <Image
                              src={project.after || "/placeholder.svg"}
                              alt="After"
                              fill
                              className="object-cover"
                            />
                          }
                          height="h-64"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ZoomIn className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <BeforeAfterSlider
                          beforeImage={
                            <Image
                              src={project.before || "/placeholder.svg"}
                              alt="Before"
                              fill
                              className="object-cover rounded-lg"
                            />
                          }
                          afterImage={
                            <Image
                              src={project.after || "/placeholder.svg"}
                              alt="After"
                              fill
                              className="object-cover rounded-lg"
                            />
                          }
                          height="h-[400px]"
                        />
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-serif font-medium mb-2">{project.title}</h3>
                          <p className="text-muted-foreground">{project.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{project.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{project.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{project.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Premium Service</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium">Project Metrics</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <Card className="p-4 text-center">
                              <ThumbsUp className="h-5 w-5 text-primary mx-auto mb-2" />
                              <div className="text-2xl font-medium mb-1">{project.metrics.satisfaction}%</div>
                              <div className="text-xs text-muted-foreground">Satisfaction</div>
                            </Card>
                            <Card className="p-4 text-center">
                              <Award className="h-5 w-5 text-primary mx-auto mb-2" />
                              <div className="text-2xl font-medium mb-1">{project.metrics.valueIncrease}</div>
                              <div className="text-xs text-muted-foreground">Value Increase</div>
                            </Card>
                            <Card className="p-4 text-center">
                              <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                              <div className="text-2xl font-medium mb-1">{project.metrics.maintenanceReduction}</div>
                              <div className="text-xs text-muted-foreground">Less Maintenance</div>
                            </Card>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium">Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full">Schedule a Consultation</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

