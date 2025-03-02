"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageHeroProps {
  icon: React.ReactNode
  title: string
  description: string
  image: string
  children?: React.ReactNode
}

export function PageHero({ icon, title, description, image, children }: PageHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className={cn("absolute inset-0 bg-cover bg-center", "transition-transform duration-500 hover:scale-105")}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white space-y-4 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">{icon}</div>
            <span className="text-lg font-medium">{title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{description}</h1>
          {children}
        </motion.div>
      </div>
    </section>
  )
}

