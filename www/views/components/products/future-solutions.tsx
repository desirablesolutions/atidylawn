"use client"

import { useState } from "react"
import { BotIcon as Robot, Cpu, Satellite, Battery, Cloud, Sparkles, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductDisplayCard } from "@/components/ui/product-display-card"

const products = [
  {
    id: 1,
    name: "AI Lawn Analyzer",
    description: "Smart device that analyzes soil health and provides real-time recommendations",
    price: 299.99,
    category: "Smart Tech",
    features: ["AI-powered", "Real-time analysis", "Mobile app"],
    image: "/placeholder.svg?height=400&width=600",
    icon: Robot,
    rating: 4.8,
    reviews: 124,
    metrics: {
      "Analysis Time": "30 seconds",
      "Battery Life": "12 hours",
    },
    additionalInfo: {
      Warranty: "2 years",
      Support: "24/7 Live Chat",
      Updates: "Free for life",
    },
  },
  {
    id: 2,
    name: "Solar Smart Sprinkler",
    description: "Self-powered intelligent irrigation system",
    price: 199.99,
    category: "Automation",
    features: ["Solar powered", "Weather adaptive", "Water efficient"],
    image: "/placeholder.svg?height=400&width=600",
    icon: Battery,
    rating: 4.9,
    reviews: 89,
    metrics: {
      "Water Savings": "Up to 40%",
      Coverage: "2500 sq ft",
    },
    additionalInfo: {
      Installation: "Professional included",
      "Smart Home": "Compatible",
      Warranty: "5 years",
    },
  },
  {
    id: 3,
    name: "Eco Shield System",
    description: "Advanced environmental protection for your garden",
    price: 449.99,
    category: "Protection",
    features: ["Climate control", "Pest detection", "Automated response"],
    image: "/placeholder.svg?height=400&width=600",
    icon: Shield,
    rating: 4.7,
    reviews: 156,
    metrics: {
      Protection: "99.9%",
      "Response Time": "< 1 min",
    },
    additionalInfo: {
      Coverage: "Full yard",
      Monitoring: "24/7",
      Updates: "Automatic",
    },
  },
  {
    id: 4,
    name: "Garden Cloud Hub",
    description: "Central control system for all your smart garden devices",
    price: 379.99,
    category: "Control",
    features: ["Cloud sync", "Voice control", "Multi-device"],
    image: "/placeholder.svg?height=400&width=600",
    icon: Cloud,
    rating: 4.6,
    reviews: 92,
    metrics: {
      Devices: "Up to 32",
      Range: "300 ft",
    },
    additionalInfo: {
      Storage: "Unlimited",
      Backup: "Automatic",
      Security: "Enterprise-grade",
    },
  },
]

const categories = [
  { name: "All", icon: Sparkles },
  { name: "Smart Tech", icon: Cpu },
  { name: "Automation", icon: Robot },
  { name: "Protection", icon: Shield },
  { name: "Control", icon: Satellite },
]

export default function FutureSolutions() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = products.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory,
  )

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-40" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Future of Lawn Care</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Revolutionary solutions combining technology and nature for smarter, more sustainable lawn care.
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
          {filteredProducts.map((product, index) => (
            <ProductDisplayCard
              key={product.id}
              product={product}
              index={index}
              onAction={() => console.log(`Add to cart: ${product.name}`)}
              actionLabel="Pre-order Now"
              variant="feature"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

