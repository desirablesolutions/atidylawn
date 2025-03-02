"use client"

import { DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Home,
  Sparkles,
  Scissors,
  ImageIcon,
  Code2,
  BookOpen,
  GraduationCap,
  Calculator,
  Calendar,
  Wand2,
  MessageSquare,
  Network,
  Coins,
  Rocket,
  Search,
  HelpCircle,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

// Move sections data outside component to prevent re-creation on render
const sections = [
  { id: "hero", title: "Home", level: 1, icon: Home },
  { id: "features", title: "Features", level: 1, icon: Sparkles },
  {
    id: "services",
    title: "Services",
    level: 1,
    icon: Scissors,
    quickAction: {
      title: "Quick Service Inquiry",
      description: "Get quick information about our services",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service-type">Service Type</Label>
            <select className="w-full p-2 border rounded-md" id="service-type">
              <option value="lawn-maintenance">Lawn Maintenance</option>
              <option value="landscaping">Landscaping</option>
              <option value="tree-service">Tree Service</option>
              <option value="irrigation">Irrigation</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-message">Message</Label>
            <Textarea id="service-message" placeholder="Tell us about your needs..." />
          </div>
          <Button className="w-full">Submit Inquiry</Button>
        </div>
      ),
    },
  },
  {
    id: "gallery",
    title: "Gallery",
    level: 1,
    icon: ImageIcon,
    quickAction: {
      title: "View Latest Projects",
      description: "Browse our recent transformations",
      content: (
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ),
    },
  },
  { id: "open-source", title: "Open Source", level: 1, icon: Code2 },
  { id: "publications", title: "Publications", level: 2, icon: BookOpen },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    level: 2,
    icon: GraduationCap,
    quickAction: {
      title: "Quick Tips",
      description: "Get instant lawn care advice",
      content: (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search tips..." />
          </div>
          <div className="space-y-4">
            {["Watering Tips", "Mowing Height", "Fertilization", "Weed Control"].map((tip) => (
              <div key={tip} className="p-4 border rounded-lg">
                <h4 className="font-medium">{tip}</h4>
                <p className="text-sm text-muted-foreground">Quick guide for {tip.toLowerCase()}...</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  },
  {
    id: "calculator",
    title: "Calculator",
    level: 1,
    icon: Calculator,
    quickAction: {
      title: "Quick Estimate",
      description: "Get a rough estimate for your lawn care needs",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lawn-size">Lawn Size (sq ft)</Label>
            <Input type="number" id="lawn-size" placeholder="Enter lawn size..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-frequency">Service Frequency</Label>
            <select className="w-full p-2 border rounded-md" id="service-frequency">
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <Button className="w-full">Calculate Estimate</Button>
        </div>
      ),
    },
  },
  {
    id: "scheduler",
    title: "Appointments",
    level: 1,
    icon: Calendar,
    quickAction: {
      title: "Quick Schedule",
      description: "Book a service appointment",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appointment-date">Preferred Date</Label>
            <Input type="date" id="appointment-date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointment-time">Preferred Time</Label>
            <select className="w-full p-2 border rounded-md" id="appointment-time">
              <option value="morning">Morning (8AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 4PM)</option>
              <option value="evening">Evening (4PM - 8PM)</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointment-notes">Notes</Label>
            <Textarea id="appointment-notes" placeholder="Any special instructions..." />
          </div>
          <Button className="w-full">Schedule Now</Button>
        </div>
      ),
    },
  },
  { id: "ai-preview", title: "AI Preview", level: 1, icon: Wand2 },
  {
    id: "testimonials",
    title: "Testimonials",
    level: 1,
    icon: MessageSquare,
    quickAction: {
      title: "Share Your Experience",
      description: "Leave a review about our services",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="review-title">Title</Label>
            <Input id="review-title" placeholder="Summary of your experience..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="review-content">Your Review</Label>
            <Textarea id="review-content" placeholder="Tell us about your experience..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="review-rating">Rating</Label>
            <select className="w-full p-2 border rounded-md" id="review-rating">
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Stars
                </option>
              ))}
            </select>
          </div>
          <Button className="w-full">Submit Review</Button>
        </div>
      ),
    },
  },
  { id: "network", title: "Network", level: 1, icon: Network },
  { id: "token", title: "Token", level: 2, icon: Coins },
  {
    id: "cta",
    title: "Get Started",
    level: 1,
    icon: Rocket,
    quickAction: {
      title: "Contact Us",
      description: "Get in touch with our team",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" placeholder="Your name..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input type="email" id="contact-email" placeholder="Your email..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea id="contact-message" placeholder="How can we help?" />
          </div>
          <Button className="w-full">Send Message</Button>
        </div>
      ),
    },
  },
]

export default function TableOfContents() {
  // Use refs for values that don't need to trigger re-renders
  const isMounted = useRef(false)
  const observersRef = useRef<IntersectionObserver[]>([])
  const scrollTimeout = useRef<NodeJS.Timeout>()

  // Initialize state with default values
  const [state, setState] = useState({
    isCollapsed: true, // Start collapsed by default
    activeSection: "",
    activeModal: null as string | null,
    lastScrollY: 0,
  })

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    if (!isMounted.current) return

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }

    scrollTimeout.current = setTimeout(() => {
      if (!isMounted.current) return

      const currentScrollY = window.scrollY
      setState((prev) => ({
        ...prev,
        lastScrollY: currentScrollY,
      }))
    }, 100)
  }, [])

  // Setup observers and event listeners
  useEffect(() => {
    isMounted.current = true

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (!isMounted.current) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setState((prev) => ({ ...prev, activeSection: entry.target.id }))
        }
      })
    }

    const setupObservers = () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0.2,
          })
          observer.observe(element)
          observersRef.current.push(observer)
        }
      })
    }

    // Delayed setup to ensure DOM is ready
    const initTimer = setTimeout(setupObservers, 100)
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => {
      isMounted.current = false
      clearTimeout(initTimer)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      observersRef.current.forEach((observer) => observer.disconnect())
      observersRef.current = []

      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  // Safe state updater
  const toggleCollapsed = useCallback(() => {
    if (!isMounted.current) return
    setState((prev) => ({ ...prev, isCollapsed: !prev.isCollapsed }))
  }, [])

  // Memoized scroll to section handler
  const scrollToSection = useCallback((sectionId: string) => {
    if (!isMounted.current) return

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
      setState((prev) => ({ ...prev, isCollapsed: true })) // Collapse after navigation
    }
  }, [])

  // SSR check
  if (typeof window === "undefined") return null

  return (
    <>
      {/* Fixed floating button */}
      <motion.button
        onClick={toggleCollapsed}
        className={cn(
          "fixed left-0 top-1/2 -translate-y-1/2 z-[100]",
          "bg-background/95 backdrop-blur-sm border shadow-lg",
          "rounded-r-full p-3 hover:bg-accent transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary",
        )}
        animate={{
          rotate: state.isCollapsed ? 0 : 180,
        }}
        transition={{ duration: 0.2 }}
      >
        <ChevronRight className="h-5 w-5" />
      </motion.button>

      {/* Table of Contents Panel */}
      <AnimatePresence>
        {!state.isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-[99] w-[300px] macos-blur neumorphic"
          >
            <ScrollArea className="h-full py-20 px-4">
              <nav className="relative space-y-1">
                {/* Vertical line */}
                <div className="absolute left-[17px] top-[30px] bottom-8 w-px bg-border/50" />

                {sections.map((section) => (
                  <Dialog
                    key={section.id}
                    open={state.activeModal === section.id}
                    onOpenChange={(open) => {
                      if (!isMounted.current) return
                      setState((prev) => ({ ...prev, activeModal: open ? section.id : null }))
                    }}
                  >
                    <DialogTrigger asChild>
                      <button
                        onClick={() => {
                          if (!isMounted.current) return
                          if (section.quickAction) {
                            setState((prev) => ({ ...prev, activeModal: section.id }))
                          } else {
                            scrollToSection(section.id)
                          }
                        }}
                        className={cn(
                          "group flex items-center gap-3 w-full py-1.5 px-2 rounded-md",
                          "transition-all duration-300",
                          "relative",
                          section.level > 1 && "ml-4",
                          state.activeSection === section.id ? "bg-accent/5 text-primary" : "hover:bg-accent/5",
                        )}
                      >
                        {/* Horizontal line for sub-items */}
                        {section.level > 1 && <div className="absolute -left-4 top-1/2 w-3 h-px bg-border/50" />}

                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "relative z-10 p-1 rounded-md",
                            state.activeSection === section.id
                              ? "bg-primary/10"
                              : "bg-muted/30 group-hover:bg-primary/5",
                          )}
                        >
                          <section.icon
                            className={cn(
                              "h-3.5 w-3.5",
                              state.activeSection === section.id
                                ? "text-primary"
                                : "text-muted-foreground group-hover:text-primary",
                            )}
                          />
                        </motion.div>

                        <span
                          className={cn(
                            "text-sm flex-1",
                            state.activeSection === section.id
                              ? "text-primary font-medium"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        >
                          {section.title}
                        </span>

                        {section.quickAction && (
                          <HelpCircle className="h-3 w-3 text-muted-foreground/50 group-hover:text-primary/50" />
                        )}
                      </button>
                    </DialogTrigger>
                    {section.quickAction && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{section.quickAction.title}</DialogTitle>
                          <DialogDescription>{section.quickAction.description}</DialogDescription>
                        </DialogHeader>
                        {section.quickAction.content}
                      </DialogContent>
                    )}
                  </Dialog>
                ))}
              </nav>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

