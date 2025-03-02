"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CarouselProps {
  children: React.ReactNode
  className?: string
  itemWidth?: string // e.g., "33.333%" for 3 items
  gap?: number
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showDots?: boolean
}

export function Carousel({
  children,
  className,
  itemWidth = "33.333%",
  gap = 24,
  autoPlay = false,
  interval = 5000,
  showArrows = true,
  showDots = false,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollLeft, setScrollLeft] = React.useState(0)

  const childrenArray = React.Children.toArray(children)
  const itemCount = childrenArray.length

  // Handle auto play
  React.useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      handleNext()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval])

  const scrollToIndex = (index: number) => {
    if (isAnimating || !containerRef.current) return

    setIsAnimating(true)
    const container = containerRef.current
    const cardWidth = container.offsetWidth * (Number.parseFloat(itemWidth) / 100)
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

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + itemCount) % itemCount
    scrollToIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % itemCount
    scrollToIndex(newIndex)
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current!.offsetLeft)
    setScrollLeft(containerRef.current!.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - containerRef.current!.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current!.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (!containerRef.current) return

    const container = containerRef.current
    const cardWidth = container.offsetWidth * (Number.parseFloat(itemWidth) / 100)
    const nearestIndex = Math.round(container.scrollLeft / (cardWidth + gap))
    scrollToIndex(nearestIndex)
  }

  return (
    <div className={cn("relative group", className)}>
      <div
        ref={containerRef}
        className={cn("overflow-hidden scroll-smooth", isDragging ? "cursor-grabbing" : "cursor-grab")}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="grid auto-cols-[calc(33.333%-16px)] grid-flow-col gap-6"
          style={{
            gridAutoColumns: `calc(${itemWidth} - ${gap / 2}px)`,
            gap: `${gap}px`,
          }}
        >
          {children}
        </div>
      </div>

      {showArrows && (
        <>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-10",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "bg-background/80 backdrop-blur-sm hover:bg-background",
            )}
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-10",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "bg-background/80 backdrop-blur-sm hover:bg-background",
            )}
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                i === currentIndex ? "bg-primary w-4" : "bg-primary/50",
              )}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

