"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Play, ArrowRight, CheckCircle, Lock, Video, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Guide {
  id: string
  title: string
  description: string
  type: "video" | "article"
  duration: number
  level: "beginner" | "intermediate" | "advanced"
  category: string
  thumbnail: string
  progress?: number
  locked?: boolean
  chapters?: {
    title: string
    duration: number
    completed?: boolean
  }[]
}

const guides: Guide[] = [
  {
    id: "1",
    title: "Spring Lawn Care Essentials",
    description: "Learn the fundamentals of spring lawn maintenance",
    type: "video",
    duration: 45,
    level: "beginner",
    category: "Seasonal Care",
    thumbnail: "https://images.unsplash.com/photo-1558635924-b60e7f3b4796",
    progress: 60,
    chapters: [
      { title: "Introduction to Spring Care", duration: 5, completed: true },
      { title: "Soil Preparation", duration: 10, completed: true },
      { title: "Fertilization Techniques", duration: 15, completed: false },
      { title: "Watering Schedule", duration: 15, completed: false },
    ],
  },
  {
    id: "2",
    title: "Advanced Irrigation Systems",
    description: "Master the setup and maintenance of smart irrigation",
    type: "article",
    duration: 30,
    level: "advanced",
    category: "Technology",
    thumbnail: "https://images.unsplash.com/photo-1592722212832-f7219ea510da",
    locked: true,
  },
  {
    id: "3",
    title: "Natural Pest Control",
    description: "Eco-friendly solutions for common lawn pests",
    type: "video",
    duration: 35,
    level: "intermediate",
    category: "Maintenance",
    thumbnail: "https://images.unsplash.com/photo-1558435186-d31d126391fa",
    progress: 20,
  },
]

export default function DiyKnowledgeBase() {
  const [isMounted, setIsMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  // Add state management for loading and error states
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Replace the existing useEffect with this improved version
  useEffect(() => {
    let isComponentMounted = true

    const initializeComponent = async () => {
      try {
        // Simulate any async initialization if needed
        await new Promise((resolve) => setTimeout(resolve, 100))

        if (isComponentMounted) {
          setIsMounted(true)
          setIsLoading(false)
        }
      } catch (err) {
        if (isComponentMounted) {
          setError(err instanceof Error ? err : new Error("Failed to initialize component"))
          setIsLoading(false)
        }
      }
    }

    initializeComponent()

    return () => {
      isComponentMounted = false
    }
  }, [])

  // Add error handling in the render
  if (error) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center text-destructive">
            <h3 className="text-lg font-medium">Error loading content</h3>
            <p className="text-sm">{error.message}</p>
          </div>
        </div>
      </section>
    )
  }

  if (isLoading || !isMounted) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto" />
              <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[400px] bg-muted rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const GuideCard = ({ guide }: { guide: Guide }) => (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image src={guide.thumbnail || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
        {guide.locked && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        {guide.type === "video" && !guide.locked && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon" className="absolute inset-0 m-auto">
                <Play className="h-8 w-8" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0">
              <div className="aspect-video bg-black">
                <div className="w-full h-full flex items-center justify-center text-white">
                  Video Player Placeholder
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="capitalize">
            {guide.level}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {guide.type === "video" ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
            {guide.duration} min
          </div>
        </div>
        <CardTitle className="line-clamp-2">{guide.title}</CardTitle>
        <CardDescription className="line-clamp-2">{guide.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {guide.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span>{guide.progress}%</span>
            </div>
            <Progress value={guide.progress} />
          </div>
        )}

        {guide.chapters && (
          <ScrollArea className="h-[100px]">
            <div className="space-y-2">
              {guide.chapters.map((chapter, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {chapter.completed ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border" />
                    )}
                    <span>{chapter.title}</span>
                  </div>
                  <span className="text-muted-foreground">{chapter.duration} min</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <Button className="w-full" variant={guide.locked ? "outline" : "default"}>
          {guide.locked ? "Unlock Access" : "Continue Learning"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-serif font-medium mb-4">DIY Knowledge Base</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn lawn care techniques from our expert guides and tutorials
              </p>
            </motion.div>
          </div>

          <Tabs defaultValue="featured" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="featured" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GuideCard guide={guide} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button variant="outline" size="lg">
              View All Guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

