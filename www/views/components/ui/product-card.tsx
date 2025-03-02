"use client"

import { useState } from "react"

import type * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Share2, ShoppingBag, Shield, Clock, Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string | number
    name: string
    description: string
    price: number
    image: string
    category: string
    features: string[]
    rating: number
    reviews: number
    icon: React.ElementType
    inStock?: boolean
  }
  index?: number
  variant?: "default" | "compact"
  className?: string
}

export function ProductCard({ product, index = 0, variant = "default", className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("h-full", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/5",
          "border border-border/50 bg-background/50 backdrop-blur-sm",
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-105",
              variant === "compact" && "aspect-[3/2]",
            )}
            onError={() => setImageError(true)}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          {/* Category Badge */}
          <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm" variant="secondary">
            {product.category}
          </Badge>

          {/* Quick Actions */}
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

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold line-clamp-2 flex-1">{product.name}</h3>
              <product.icon className="h-5 w-5 text-primary flex-shrink-0 ml-4" />
            </div>
            {variant === "default" && (
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            )}
          </div>

          {/* Features */}
          {variant === "default" && (
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, i) => (
                <Badge key={i} variant="secondary" className="bg-primary/5 text-primary">
                  {feature}
                </Badge>
              ))}
            </div>
          )}

          {/* Price and Rating */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-1">
              <div className="text-2xl font-semibold">${product.price}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.svg
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted",
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      initial={{ scale: 1 }}
                      animate={{
                        scale: i < Math.floor(product.rating) && isHovered ? 1.2 : 1,
                      }}
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

          {/* Additional Info (shown on hover) */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Fast shipping available</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Quality guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>Bulk discounts available</span>
              </div>
            </div>
          </motion.div>

          {/* Mobile View More Button */}
          <Button variant="ghost" className="w-full md:hidden mt-4 group">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

