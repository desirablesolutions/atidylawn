"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"

interface UseBeforeAfterSliderProps {
  initialPosition?: number
  min?: number
  max?: number
}

export const useBeforeAfterSlider = ({ initialPosition = 50, min = 0, max = 100 }: UseBeforeAfterSliderProps = {}) => {
  const [sliderPosition, setSliderPosition] = useState(initialPosition)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const isMounted = useRef(false)

  const calculateSliderPosition = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || !isMounted.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const x = Math.max(min, Math.min(clientX - rect.left, rect.width))
      const percentage = (x / rect.width) * (max - min) + min
      return Math.min(Math.max(percentage, min), max)
    },
    [min, max],
  )

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current || !isMounted.current) return

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const newPosition = calculateSliderPosition(clientX)
      if (newPosition !== undefined) {
        setSliderPosition(newPosition)
      }
    },
    [calculateSliderPosition],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isMounted.current) return

      const STEP = 5
      let newPosition = sliderPosition

      switch (e.key) {
        case "ArrowLeft":
          newPosition = Math.max(min, sliderPosition - STEP)
          break
        case "ArrowRight":
          newPosition = Math.min(max, sliderPosition + STEP)
          break
        case "Home":
          newPosition = min
          break
        case "End":
          newPosition = max
          break
        default:
          return
      }

      setSliderPosition(newPosition)
      e.preventDefault()
    },
    [sliderPosition, min, max],
  )

  useEffect(() => {
    isMounted.current = true

    // Add global event listeners
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleMouseMove as (e: TouchEvent) => void)
    document.addEventListener("touchend", handleMouseUp)

    return () => {
      isMounted.current = false
      // Clean up event listeners
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleMouseMove as (e: TouchEvent) => void)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return {
    sliderPosition,
    sliderRef,
    handlers: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleMouseDown,
      onKeyDown: handleKeyDown,
    },
  }
}

