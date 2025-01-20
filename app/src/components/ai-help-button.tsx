"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function AiHelpButton() {
  const [isFloating, setIsFloating] = useState(false)

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`
        fixed bottom-4 right-4 
        bg-gradient-to-r from-emerald-500/10 to-green-500/10
        border border-emerald-500/20
        shadow-[0_0_15px_rgba(16,185,129,0.2)]
        hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]
        transition-all duration-500
        ${isFloating ? "transform translate-y-[-8px]" : ""}
      `}
      onMouseEnter={() => setIsFloating(true)}
      onMouseLeave={() => setIsFloating(false)}
    >
      <Sparkles className="h-5 w-5 text-emerald-500" />
      <span className="sr-only">AI Help</span>
    </Button>
  )
}

