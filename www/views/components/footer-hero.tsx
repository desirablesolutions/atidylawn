"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

export default function FooterHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
  }

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative h-[300px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558435186-d31d126391fa?q=80&w=3270&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundPosition: "center",
        }}
      />

      {/* Radial gradient overlay that follows mouse */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, transparent 20%, rgba(0,0,0,0.4) 80%)`,
        }}
      />

      {/* Blur effect that follows mouse */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]"
        style={{
          clipPath: `circle(15% at ${mousePosition.x}% ${mousePosition.y}%)`,
        }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white space-y-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-serif font-medium"
            >
              Transform Your Outdoor Space
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              Join thousands of satisfied customers who trust us with their lawn care needs
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}

