"use client"

import type React from "react"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Star,
  BadgeCheck,
  ThumbsUp,
  Camera,
  Filter,
  Search,
  Plus,
  X,
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  metrics?: {
    propertyValue?: string
    waterSavings?: string
    maintenanceCost?: string
  }
  socialProof?: {
    platform: string
    link: string
    followers: number
  }
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
    metrics: {
      propertyValue: "+15%",
      waterSavings: "30%",
      maintenanceCost: "-25%",
    },
  },
  {
    id: 2,
    name: "Michael Thompson",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&auto=format&fit=crop",
    quote:
      "We've been using GreenScape for our commercial property maintenance for over 2 years. They're reliable, professional, and our grounds have never looked better.",
    rating: 5,
    project: "Commercial Maintenance",
    duration: "Ongoing",
    verified: true,
    tags: ["Commercial", "Maintenance"],
    location: "Los Angeles, CA",
    date: "2024-02-10",
    propertyType: "Commercial",
    serviceType: "Enterprise",
    likes: 18,
    helpful: false,
  },
  {
    id: 3,
    name: "Jennifer Davis",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop",
    quote:
      "The lawn treatment program has completely eliminated our weed problems and our grass is now thick and green. Worth every penny!",
    rating: 4,
    project: "Lawn Treatment Program",
    duration: "6 months",
    verified: true,
    tags: ["Lawn Care", "Weed Control"],
    location: "San Diego, CA",
    date: "2024-02-05",
    propertyType: "Residential",
    serviceType: "Standard",
    likes: 12,
    helpful: false,
  },
]

const filters = {
  propertyType: ["All", "Residential", "Commercial", "Estate"],
  serviceType: ["All", "Standard", "Premium", "Enterprise"],
  rating: ["All", "5 Stars", "4 Stars", "3 Stars"],
}

export default function TestimonialsSection() {
  const [activeFilter, setActiveFilter] = useState({
    propertyType: "All",
    serviceType: "All",
    rating: "All",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddReview, setShowAddReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    review: "",
    name: "",
    location: "",
    propertyType: "Residential",
    serviceType: "Standard",
    image: null as File | null,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [sortBy, setSortBy] = useState("recent")

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle review submission
    setShowAddReview(false)
    // Reset form
    setNewReview({
      rating: 5,
      title: "",
      review: "",
      name: "",
      location: "",
      propertyType: "Residential",
      serviceType: "Standard",
      image: null,
    })
  }

  const filteredTestimonials = testimonials
    .filter((testimonial) => {
      if (activeFilter.propertyType !== "All" && testimonial.propertyType !== activeFilter.propertyType) return false
      if (activeFilter.serviceType !== "All" && testimonial.serviceType !== activeFilter.serviceType) return false
      if (activeFilter.rating !== "All" && testimonial.rating !== Number.parseInt(activeFilter.rating)) return false
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        return (
          testimonial.name.toLowerCase().includes(searchLower) ||
          testimonial.quote.toLowerCase().includes(searchLower) ||
          testimonial.location.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "rating":
          return b.rating - a.rating
        case "helpful":
          return b.likes - a.likes
        default:
          return 0
      }
    })

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-0"
            >
              <h2 className="text-4xl font-serif font-medium mb-4">Customer Stories</h2>
              <p className="text-lg text-muted-foreground">
                Read what our satisfied customers have to say about their experience
              </p>
            </motion.div>

            <Dialog open={showAddReview} onOpenChange={setShowAddReview}>
              <DialogTrigger asChild>
                <Button className="md:ml-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Share Your Experience
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddReview} className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          type="button"
                          variant="ghost"
                          className="p-0 h-8 w-8"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= newReview.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"
                            }`}
                          />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Your Name"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Location"
                        value={newReview.location}
                        onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      value={newReview.propertyType}
                      onValueChange={(value) => setNewReview({ ...newReview, propertyType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {filters.propertyType
                          .filter((type) => type !== "All")
                          .map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={newReview.serviceType}
                      onValueChange={(value) => setNewReview({ ...newReview, serviceType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Service Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {filters.serviceType
                          .filter((type) => type !== "All")
                          .map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Input
                    placeholder="Review Title"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  />

                  <Textarea
                    placeholder="Share your experience..."
                    value={newReview.review}
                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    className="min-h-[100px]"
                  />

                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setNewReview({ ...newReview, image: e.target.files?.[0] || null })}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      {newReview.image ? "Change Photo" : "Add Photo"}
                    </Button>
                    {newReview.image && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{newReview.image.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto"
                          onClick={() => setNewReview({ ...newReview, image: null })}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Review
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                <TabsTrigger value="all">All Reviews</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
                <TabsTrigger value="photos">With Photos</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="h-[600px] rounded-lg border p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="bg-card rounded-lg p-6 shadow-sm border">
                    <div className="flex items-start gap-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium truncate">{testimonial.name}</h4>
                          {testimonial.verified && <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{testimonial.location}</span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.quote}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {testimonial.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{testimonial.project}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                        <span>{testimonial.duration}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          // Handle helpful toggle
                        }}
                      >
                        <ThumbsUp
                          className={`h-4 w-4 mr-1 ${testimonial.helpful ? "text-primary fill-primary" : ""}`}
                        />
                        <span>{testimonial.likes}</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  )
}

