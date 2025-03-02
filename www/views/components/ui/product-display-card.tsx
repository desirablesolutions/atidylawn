"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Share2, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProductDisplayCardProps {
  product: {
    id: string | number
    name: string
    description: string
    price: number | string
    image: string
    category: string
    features?: string[]
    rating?: number
    reviews?: number
    icon?: React.ElementType
    inStock?: boolean
    badges?: string[]
    metrics?: {
      [key: string]: string | number
    }
    additionalInfo?: {
      [key: string]: string | number
    }
  }
  variant?: "default" | "compact" | "feature" | "service"
  className?: string
  index?: number
  onAction?: () => void
  actionLabel?: string
}

export function ProductDisplayCard({
  product,
  variant = "default",
  className,
  index = 0,
  onAction,
  actionLabel = "Add to Cart",
}: ProductDisplayCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const Icon = product.icon || ShoppingBag

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("h-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            className={cn("object-cover transition-transform duration-500", isHovered && "scale-105")}
          />
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
              <Icon className="h-5 w-5 text-primary flex-shrink-0 ml-4" />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>

          {/* Features/Badges */}
          {product.features && (
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, i) => (
                <Badge key={i} variant="secondary" className="bg-primary/5 text-primary">
                  {feature}
                </Badge>
              ))}
            </div>
          )}

          {/* Metrics Display */}
          {product.metrics && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(product.metrics).map(([key, value], i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price and Rating */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-1">
              <div className="text-2xl font-semibold">${product.price}</div>
              {product.rating && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 1 }}
                        animate={{
                          scale: i < Math.floor(product.rating) && isHovered ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.2, delay: i * 0.1 }}
                      >
                        <Star
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted",
                          )}
                        />
                      </motion.div>
                    ))}
                  </span>
                  {product.reviews && <span>({product.reviews})</span>}
                </div>
              )}
            </div>
            <Button
              className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={onAction}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          </div>

          {/* Additional Info (shown on hover) */}
          <AnimatePresence>
            {isHovered && product.additionalInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                  {Object.entries(product.additionalInfo).map(([key, value], i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-primary">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

