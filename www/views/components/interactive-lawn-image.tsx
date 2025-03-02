"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function InteractiveLawnImage() {
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
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl">
      <motion.div
        ref={containerRef}
        className="relative aspect-[16/9] group"
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* High-quality lawn image */}
        <Image
          src="https://images.unsplash.com/photo-1558635924-b60e7f3b4796?q=80&w=2940&auto=format&fit=crop"
          alt="Beautiful maintained lawn"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
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

        {/* Content overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-serif font-medium mb-2">Professional Lawn Care Excellence</h3>
            <p className="text-white/90">Experience the difference of expert lawn maintenance and care</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

