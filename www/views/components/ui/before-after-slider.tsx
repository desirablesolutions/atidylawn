"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBeforeAfterSlider } from "@/hooks/use-before-after-slider"

interface BeforeAfterSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  beforeImage: React.ReactNode
  afterImage: React.ReactNode
  initialPosition?: number
  sliderColor?: string
  showArrows?: boolean
  arrowColor?: string
  height?: string
  width?: string
}

export const BeforeAfterSlider = React.forwardRef<HTMLDivElement, BeforeAfterSliderProps>(
  (
    {
      beforeImage,
      afterImage,
      initialPosition = 50,
      sliderColor = "white",
      showArrows = true,
      arrowColor = "primary",
      height = "h-64",
      width = "w-full",
      className,
      ...props
    },
    ref,
  ) => {
    const { sliderPosition, sliderRef, handlers } = useBeforeAfterSlider({
      initialPosition,
    })

    return (
      <div
        ref={ref}
        className={cn("relative select-none touch-none", height, width, className)}
        {...props}
        {...handlers}
        role="slider"
        aria-valuenow={sliderPosition}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        {/* After Image */}
        <div className="absolute inset-0">{afterImage}</div>

        {/* Before Image with clip-path */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          {beforeImage}
        </div>

        {/* Slider Line */}
        <div
          ref={sliderRef}
          className="absolute top-0 bottom-0 w-0.5 cursor-ew-resize"
          style={{
            left: `${sliderPosition}%`,
            backgroundColor: sliderColor,
          }}
        >
          {showArrows && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
                "w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
                "bg-white",
              )}
            >
              <ChevronLeft className={`h-4 w-4 text-${arrowColor}`} />
              <ChevronRight className={`h-4 w-4 text-${arrowColor}`} />
            </div>
          )}
        </div>
      </div>
    )
  },
)

BeforeAfterSlider.displayName = "BeforeAfterSlider"

