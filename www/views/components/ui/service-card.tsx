"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Star, Clock, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  service: {
    id: string | number
    title: string
    description: string
    image: string
    beforeImage?: string
    afterImage?: string
    rating: number
    reviewCount: number
    price: string
    duration?: string
    category?: string
    availability?: string
    location?: string
  }
  index?: number
  variant?: "default" | "compact"
  className?: string
}

export function ServiceCard({ service, index = 0, variant = "default", className }: ServiceCardProps) {
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
        {/* Main Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered && "scale-105")}
            onError={() => setImageError(true)}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          {/* Before & After Preview */}
          {service.beforeImage && service.afterImage && (
            <motion.div
              className="absolute inset-0 flex items-end p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2 text-white">
                <p className="font-medium">Before & After</p>
                <div className="flex gap-2">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden">
                    <Image src={service.beforeImage || "/placeholder.svg"} alt="Before" fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-1">
                      Before
                    </div>
                  </div>
                  <div className="relative w-24 h-24 rounded-md overflow-hidden">
                    <Image src={service.afterImage || "/placeholder.svg"} alt="After" fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-1">
                      After
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Category Badge */}
          {service.category && (
            <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm" variant="secondary">
              {service.category}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">{service.title}</h3>
            {variant === "default" && <p className="text-muted-foreground">{service.description}</p>}
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {service.duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{service.duration}</span>
              </div>
            )}
            {service.availability && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{service.availability}</span>
              </div>
            )}
            {service.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{service.location}</span>
              </div>
            )}
          </div>

          {/* Rating and Price */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{service.rating}</span>
              <span className="text-muted-foreground">({service.reviewCount} reviews)</span>
            </div>
            <div className="text-lg font-medium">{service.price}</div>
          </div>

          {/* Action Button */}
          <Button className="w-full group">
            Book Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

