"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import { motion } from "framer-motion"
import { Command } from "cmdk"
import {
  Search,
  Calendar,
  History,
  Filter,
  ArrowRight,
  X,
  ChevronRight,
  Scissors,
  Leaf,
  MapPin,
  DollarSign,
} from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  searchInputRef: RefObject<HTMLInputElement>
}

// Simplified data structure
const quickActions = [
  {
    id: "schedule",
    title: "Schedule Service",
    description: "Book a lawn care appointment",
    icon: Calendar,
    href: "/book",
    metadata: { type: "Quick Action", time: "5 min" },
  },
  {
    id: "quote",
    title: "Get Quote",
    description: "Instant price estimate",
    icon: DollarSign,
    href: "/quote",
    metadata: { type: "Quick Action", time: "2 min" },
  },
  {
    id: "location",
    title: "Find Location",
    description: "Service areas near you",
    icon: MapPin,
    href: "/locations",
    metadata: { type: "Quick Action", time: "1 min" },
  },
]

const services = [
  {
    id: "mowing",
    title: "Lawn Mowing",
    description: "Regular maintenance service",
    icon: Scissors,
    href: "/services/mowing",
    metadata: { price: "From $45", duration: "45 min" },
  },
  {
    id: "landscaping",
    title: "Landscaping",
    description: "Custom garden design",
    icon: Leaf,
    href: "/services/landscaping",
    metadata: { price: "From $299", duration: "Varies" },
  },
]

const recentSearches = ["Spring cleanup pricing", "Weekly mowing schedule", "Garden maintenance tips"]

export default function SearchModal({ isOpen, onClose, searchInputRef }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  // Focus management
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, searchInputRef])

  const handleSearch = (value: string) => {
    if (isMounted.current) {
      setQuery(value)
    }
  }

  // SSR check
  if (typeof window === "undefined") return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[600px] p-0 gap-0 bg-background/95 backdrop-blur-xl border-none shadow-2xl">
        <Command className="rounded-lg border-0">
          {/* Search Header */}
          <div className="flex items-center gap-2 p-4 border-b">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                className="w-full h-10 pl-9 pr-4 rounded-md bg-muted/50 border-none focus:ring-1 focus:ring-primary/20 transition-all text-base"
                placeholder="Search services, prices, locations..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-muted/50"
                onClick={() => handleSearch("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <ScrollArea className="h-[min(65vh,600px)] overflow-y-auto px-4">
            {/* Quick Actions */}
            <div className="py-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
              <div className="grid gap-2">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    onClick={() => {
                      onClose()
                      window.location.href = action.href
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left w-full group"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-base">{action.title}</div>
                      <div className="text-sm text-muted-foreground truncate">{action.description}</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="h-5">
                        {action.metadata.time}
                      </Badge>
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="py-4 border-t">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Services</h3>
              <div className="grid gap-2">
                {services.map((service) => (
                  <motion.button
                    key={service.id}
                    onClick={() => {
                      onClose()
                      window.location.href = service.href
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left w-full group"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-base">{service.title}</div>
                      <div className="text-sm text-muted-foreground truncate">{service.description}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-xs">
                      <Badge variant="secondary" className="h-5">
                        {service.metadata.price}
                      </Badge>
                      <span className="text-muted-foreground">{service.metadata.duration}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="py-4 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-muted/50 transition-colors px-3 py-1 text-sm"
                      onClick={() => handleSearch(search)}
                    >
                      <History className="h-3 w-3 mr-1" />
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Filter className="h-3 w-3" />
                <span>Filter with arrow keys</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                <span>Select with Enter</span>
              </div>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

