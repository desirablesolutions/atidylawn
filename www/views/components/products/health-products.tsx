"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Leaf, Shield, Droplets, Sun, Wind, Sparkles, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const products = [
  {
    id: 1,
    name: "Organic Lawn Treatment",
    description: "100% natural, child and pet-safe lawn care solution",
    price: 39.99,
    category: "Treatments",
    benefits: ["Child-safe", "Pet-friendly", "Eco-conscious"],
    image: "/placeholder.svg?height=200&width=200",
    icon: Leaf,
  },
  {
    id: 2,
    name: "Air Quality Monitor",
    description: "Smart device to monitor your garden's air quality",
    price: 129.99,
    category: "Monitoring",
    benefits: ["Real-time data", "App integration", "Weather-resistant"],
    image: "/placeholder.svg?height=200&width=200",
    icon: Wind,
  },
  {
    id: 3,
    name: "UV Protection System",
    description: "Advanced UV protection for sensitive plants",
    price: 79.99,
    category: "Protection",
    benefits: ["UV blocking", "Temperature control", "Easy setup"],
    image: "/placeholder.svg?height=200&width=200",
    icon: Sun,
  },
  {
    id: 4,
    name: "Smart Irrigation Filter",
    description: "Purified water delivery system for healthier plants",
    price: 159.99,
    category: "Irrigation",
    benefits: ["Water purification", "Smart control", "Energy efficient"],
    image: "/placeholder.svg?height=200&width=200",
    icon: Droplets,
  },
]

const categories = [
  { name: "All", icon: Sparkles },
  { name: "Treatments", icon: Leaf },
  { name: "Monitoring", icon: Wind },
  { name: "Protection", icon: Shield },
  { name: "Irrigation", icon: Droplets },
]

export default function HealthProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = products.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory,
  )

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-40" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Health-Conscious Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovative products designed for a healthier, safer lawn care experience.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className="hover-lift"
                onClick={() => setSelectedCategory(category.name)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="product-card group">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge className="absolute top-2 right-2">{product.category}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{product.name}</h3>
                    <product.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{product.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Heart className="w-3 h-3 mr-1" />
                        {benefit}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    <Button size="sm" className="hover-lift">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

