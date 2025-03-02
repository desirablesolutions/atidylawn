"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Paintbrush,
  ShoppingBag,
  Palette,
  Scissors,
  ShirtIcon as TShirt,
  Package,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Tag,
  Truck,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "Eco-Friendly Uniform Collection",
    description: "Sustainable workwear made from recycled materials",
    price: 89.99,
    category: "Merchandise",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop",
    icon: TShirt,
    features: ["100% Recycled", "Moisture-Wicking", "UV Protection"],
    colors: ["#2B4C7E", "#567EBB", "#606C38"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    name: "Brand Design Package",
    description: "Complete brand identity design for lawn care businesses",
    price: 499.99,
    category: "Design Services",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop",
    icon: Palette,
    features: ["Logo Design", "Brand Guidelines", "Marketing Materials"],
    deliverables: ["5 Logo Concepts", "Style Guide", "Business Cards"],
    timeline: "2 weeks",
    revisions: "Unlimited",
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "Custom Tool Collection",
    description: "Branded professional lawn care tools",
    price: 299.99,
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1617600433693-0f7c7c870e49?q=80&w=1974&auto=format&fit=crop",
    icon: Scissors,
    features: ["Professional Grade", "Ergonomic Design", "Lifetime Warranty"],
    tools: ["Pruning Shears", "Hedge Trimmers", "Garden Trowel"],
    material: "Stainless Steel",
    warranty: "Lifetime",
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: 4,
    name: "Eco Marketing Kit",
    description: "Sustainable marketing materials and templates",
    price: 149.99,
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop",
    icon: Leaf,
    features: ["Recycled Materials", "Digital Assets", "Print Templates"],
    includes: ["Brochures", "Business Cards", "Social Media Kit"],
    format: "Print & Digital",
    support: "30 Days",
    rating: 4.6,
    reviews: 92,
    inStock: true,
  },
  {
    id: 5,
    name: "Staff Apparel Bundle",
    description: "Professional uniform set for your team",
    price: 199.99,
    category: "Merchandise",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2072&auto=format&fit=crop",
    icon: TShirt,
    features: ["Team Branding", "All Seasons", "Custom Embroidery"],
    includes: ["Polos", "Caps", "Safety Vests"],
    customization: "Available",
    minOrder: 5,
    rating: 4.9,
    reviews: 78,
    inStock: true,
  },
  {
    id: 6,
    name: "Vehicle Branding Kit",
    description: "Professional vehicle wraps and decals",
    price: 899.99,
    category: "Design Services",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    icon: Package,
    features: ["Custom Design", "Professional Install", "Weather-Resistant"],
    coverage: "Full Wrap",
    warranty: "5 Years",
    installation: "Included",
    rating: 4.8,
    reviews: 45,
    inStock: true,
  },
]

const categories = [
  { name: "All", icon: Package },
  { name: "Merchandise", icon: TShirt },
  { name: "Design Services", icon: Paintbrush },
  { name: "Equipment", icon: Scissors },
  { name: "Marketing", icon: Leaf },
]

const ProductCard = ({ product, index }: { product: (typeof products)[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/5",
          "border border-border/50 bg-background/50 backdrop-blur-sm",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          {/* Category Badge */}
          <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm" variant="secondary">
            {product.category}
          </Badge>

          {/* Quick Action Buttons */}
          <motion.div
            className="absolute top-4 left-4 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/90 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/90 backdrop-blur-sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold line-clamp-2">{product.name}</h3>
              <product.icon className="h-5 w-5 text-primary flex-shrink-0" />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {product.features.map((feature, i) => (
              <Badge key={i} variant="secondary" className="bg-primary/5 text-primary">
                {feature}
              </Badge>
            ))}
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-1">
              <div className="text-2xl font-semibold">${product.price}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.svg
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      initial={{ scale: 1 }}
                      animate={{ scale: i < Math.floor(product.rating) && isHovered ? 1.2 : 1 }}
                      transition={{ duration: 0.2, delay: i * 0.1 }}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </motion.svg>
                  ))}
                </span>
                <span>({product.reviews})</span>
              </div>
            </div>
            <Button className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Free shipping on orders over $500</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>Bulk pricing available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

const Carousel = ({ children }: { children: React.ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (isAnimating || !containerRef.current) return

    setIsAnimating(true)
    const container = containerRef.current
    const cards = container.children
    const cardWidth = cards[0].getBoundingClientRect().width
    const gap = 24 // Matches the gap in the grid
    const scrollPosition = index * (cardWidth + gap)

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    })

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    setCurrentIndex(index)
  }

  const next = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    const totalCards = container.children.length
    const nextIndex = (currentIndex + 1) % totalCards
    scrollToIndex(nextIndex)
  }

  const prev = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    const totalCards = container.children.length
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards
    scrollToIndex(prevIndex)
  }

  return (
    <div className="relative group">
      <div ref={containerRef} className="overflow-hidden scroll-smooth">
        <div className="grid grid-flow-col auto-cols-[calc(33.333%-16px)] gap-6">{children}</div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-10",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-background/80 backdrop-blur-sm",
        )}
        onClick={prev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-10",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-background/80 backdrop-blur-sm",
        )}
        onClick={next}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function BrandIdentity() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = products.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory,
  )

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-40" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Brand Identity Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elevate your lawn care business with our premium branded merchandise and professional design services.
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

        {/* Products Carousel */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="flex gap-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-6 w-16 bg-muted rounded" />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Carousel>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </Carousel>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

