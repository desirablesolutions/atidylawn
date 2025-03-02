"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Lawn Maintenance",
    description: "Regular mowing, edging, and maintenance to keep your lawn healthy and beautiful year-round.",
    image: "/placeholder.svg?height=600&width=800",
    beforeImage: "/placeholder.svg?height=300&width=400",
    afterImage: "/placeholder.svg?height=300&width=400",
    rating: 4.9,
    reviewCount: 124,
    price: "Starting at $49/visit",
    link: "/services/lawn-maintenance",
  },
  {
    title: "Landscaping",
    description: "Custom landscape design and installation to transform your outdoor living space.",
    image: "/placeholder.svg?height=600&width=800",
    beforeImage: "/placeholder.svg?height=300&width=400",
    afterImage: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    reviewCount: 98,
    price: "Starting at $1,500",
    link: "/services/landscaping",
  },
  {
    title: "Lawn Treatment",
    description: "Fertilization, weed control, and pest management programs for a lush, green lawn.",
    image: "/placeholder.svg?height=600&width=800",
    beforeImage: "/placeholder.svg?height=300&width=400",
    afterImage: "/placeholder.svg?height=300&width=400",
    rating: 4.7,
    reviewCount: 87,
    price: "Starting at $59/treatment",
    link: "/services/lawn-treatment",
  },
  {
    title: "Tree & Shrub Care",
    description: "Pruning, trimming, and maintenance services to keep your trees and shrubs healthy and shaped.",
    image: "/placeholder.svg?height=600&width=800",
    beforeImage: "/placeholder.svg?height=300&width=400",
    afterImage: "/placeholder.svg?height=300&width=400",
    rating: 4.9,
    reviewCount: 76,
    price: "Starting at $150",
    link: "/services/tree-shrub-care",
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive lawn care and landscaping services tailored to your specific needs and property.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-xl overflow-hidden shadow-sm border group hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white space-y-2">
                    <p className="font-medium">Before & After</p>
                    <div className="flex space-x-2">
                      <div className="relative w-24 h-24 rounded-md overflow-hidden">
                        <Image
                          src={service.beforeImage || "/placeholder.svg"}
                          alt="Before"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-1">
                          Before
                        </div>
                      </div>
                      <div className="relative w-24 h-24 rounded-md overflow-hidden">
                        <Image
                          src={service.afterImage || "/placeholder.svg"}
                          alt="After"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-1">
                          After
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{service.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({service.reviewCount} reviews)</span>
                  </div>
                  <div className="text-sm font-medium">{service.price}</div>
                </div>

                <Link href={service.link}>
                  <Button variant="outline" className="w-full group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

