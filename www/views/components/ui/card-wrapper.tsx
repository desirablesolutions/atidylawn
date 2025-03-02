"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  index?: number
  className?: string
  onHover?: () => void
  onLeave?: () => void
}

export function CardWrapper({ children, index = 0, className, onHover, onLeave, ...props }: CardWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("h-full", className)}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      {...props}
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/5",
          "border border-border/50 bg-background/50 backdrop-blur-sm",
        )}
      >
        {children}
      </Card>
    </motion.div>
  )
}

