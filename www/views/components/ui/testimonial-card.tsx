"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { BadgeCheck, ThumbsUp, MapPin, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  testimonial: {
    id: string | number
    name: string
    role?: string
    image: string
    quote: string
    rating: number
    project?: string
    duration?: string
    verified?: boolean
    tags?: string[]
    location?: string
    date?: string
    likes?: number
    helpful?: boolean
  }
  index?: number
  variant?: "default" | "compact"
  className?: string
}

export function TestimonialCard({ testimonial, index = 0, variant = "default", className }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("h-full", className)}
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/5",
          "border border-border/50 bg-background/50 backdrop-blur-sm",
        )}
      >
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium truncate">{testimonial.name}</h4>
                {testimonial.verified && <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {testimonial.location && (
                  <>
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{testimonial.location}</span>
                  </>
                )}
                {testimonial.date && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("h-4 w-4", i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted")}
              />
            ))}
          </div>

          {/* Quote */}
          <p className="text-sm text-muted-foreground">{testimonial.quote}</p>

          {/* Tags */}
          {testimonial.tags && (
            <div className="flex flex-wrap gap-2">
              {testimonial.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Footer */}
          {(testimonial.project || testimonial.duration || testimonial.likes !== undefined) && (
            <div className="pt-4 border-t flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {testimonial.project && <span>{testimonial.project}</span>}
                {testimonial.duration && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span>{testimonial.duration}</span>
                  </>
                )}
              </div>
              {testimonial.likes !== undefined && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("text-muted-foreground hover:text-foreground", testimonial.helpful && "text-primary")}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{testimonial.likes}</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

