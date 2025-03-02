"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = ["All", "Residential", "Commercial", "Landscape Design", "Maintenance"]

const caseStudies = [
  {
    title: "Modern Backyard Transformation",
    description: "Complete redesign of a 2,500 sq ft backyard into a modern outdoor living space",
    image: "/placeholder.svg?height=400&width=600",
    category: "Residential",
    results: ["40% increase in property value", "Sustainable water management", "Year-round outdoor living space"],
    duration: "8 weeks",
    budget: "$75,000",
  },
  {
    title: "Corporate Campus Renovation",
    description: "Sustainable landscaping project for a tech company's 5-acre campus",
    image: "/placeholder.svg?height=400&width=600",
    category: "Commercial",
    results: ["30% reduction in water usage", "LEED certification achieved", "Enhanced employee satisfaction"],
    duration: "16 weeks",
    budget: "$250,000",
  },
  {
    title: "Drought-Resistant Garden Design",
    description: "xeriscaping project for a Mediterranean-style home",
    image: "/placeholder.svg?height=400&width=600",
    category: "Landscape Design",
    results: ["60% reduction in water bills", "Zero maintenance requirements", "Native plant preservation"],
    duration: "6 weeks",
    budget: "$45,000",
  },
  {
    title: "HOA Community Maintenance",
    description: "Year-round maintenance program for a 100-unit residential community",
    image: "/placeholder.svg?height=400&width=600",
    category: "Maintenance",
    results: [
      "20% reduction in maintenance costs",
      "Improved community satisfaction",
      "Standardized landscape quality",
    ],
    duration: "Ongoing",
    budget: "$120,000/year",
  },
  // Add more case studies as needed
]

export default function CaseStudiesGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visibleStudies, setVisibleStudies] = useState(4)

  const filteredStudies = caseStudies.filter(
    (study) => selectedCategory === "All" || study.category === selectedCategory,
  )

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-4xl font-serif font-medium mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              Explore our portfolio of transformative landscaping projects
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                {selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {categories.map((category) => (
                <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStudies.slice(0, visibleStudies).map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group">
                <CardHeader className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 right-4">{study.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-serif font-medium mb-2">{study.title}</h3>
                  <p className="text-muted-foreground mb-4">{study.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-muted-foreground">{study.duration}</p>
                    </div>
                    <div>
                      <p className="font-medium">Budget</p>
                      <p className="text-muted-foreground">{study.budget}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <div className="space-y-2">
                    <p className="font-medium">Key Results:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {visibleStudies < filteredStudies.length && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => setVisibleStudies((prev) => prev + 4)}>
              Load More Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

