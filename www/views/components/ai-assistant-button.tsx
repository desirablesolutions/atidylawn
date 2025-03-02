"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, ShoppingCart, Calendar, Calculator, FileText, Send, Clock, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ServiceCalculator } from "@/components/pricing/service-calculator"
import { AppointmentScheduler } from "@/components/scheduling/appointment-scheduler"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface QuickAction {
  icon: typeof ShoppingCart
  label: string
  description: string
  action: () => void
  badge?: string
}

const initialMessage: Message = {
  role: "assistant",
  content: "Hello! I'm your GreenScape AI assistant. How can I help you today?",
  timestamp: new Date(),
}

export default function AiAssistantButton() {
  // Refs for mounting and cleanup
  const mountedRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // State with SSR-safe initial values
  const [state, setState] = useState({
    isOpen: false,
    messages: [] as Message[],
    input: "",
    activeModal: null as string | null,
    mounted: false,
  })

  // Initialize component after mount
  useEffect(() => {
    mountedRef.current = true
    setState((prev) => ({ ...prev, mounted: true, messages: [initialMessage] }))

    return () => {
      mountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Memoized handlers with mount checks
  const handleSend = useCallback(() => {
    if (!mountedRef.current || !state.input.trim()) return

    const newMessage: Message = {
      role: "user",
      content: state.input,
      timestamp: new Date(),
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      input: "",
    }))

    // Simulate AI response
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        const response: Message = {
          role: "assistant",
          content: "I'll help you with that request. What specific information would you like to know?",
          timestamp: new Date(),
        }
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, response],
        }))
      }
    }, 1000)
  }, [state.input])

  const handleModalChange = useCallback((modalId: string | null) => {
    if (mountedRef.current) {
      setState((prev) => ({ ...prev, activeModal: modalId }))
    }
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    if (mountedRef.current) {
      setState((prev) => ({ ...prev, isOpen: open }))
    }
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (mountedRef.current) {
      setState((prev) => ({ ...prev, input: e.target.value }))
    }
  }, [])

  // SSR check
  if (!state.mounted) return null

  // Quick actions with memoized handlers
  const quickActions: QuickAction[] = [
    {
      icon: ShoppingCart,
      label: "View Cart",
      description: "Check your cart items and checkout",
      action: () => handleModalChange("cart"),
      badge: "3 items",
    },
    {
      icon: Calendar,
      label: "Schedule Service",
      description: "Book your next lawn care appointment",
      action: () => handleModalChange("schedule"),
      badge: "Available",
    },
    {
      icon: Calculator,
      label: "Get Quote",
      description: "Calculate service costs instantly",
      action: () => handleModalChange("quote"),
      badge: "Available",
    },
    {
      icon: Clock,
      label: "Recent Orders",
      description: "View your service history",
      action: () => handleModalChange("orders"),
      badge: "2 active",
    },
    {
      icon: MapPin,
      label: "Service Areas",
      description: "Check if we service your location",
      action: () => handleModalChange("areas"),
    },
    {
      icon: FileText,
      label: "Services",
      description: "Explore our available services",
      action: () => handleModalChange("services"),
    },
  ]

  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-8 right-8 z-50">
        <Button
          size="lg"
          className="relative w-20 h-20 rounded-full shadow-lg overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-500"
          onClick={() => handleOpenChange(true)}
        >
          {/* Main Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Bot className="w-12 h-12 text-primary-foreground" />
          </motion.div>

          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-foreground/0 via-primary-foreground/5 to-primary-foreground/10" />

          {/* Pulsing Ring */}
          <motion.div
            className="absolute -inset-1 rounded-full border-2 border-primary-foreground/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          {/* Status Dot */}
          <motion.div
            className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </Button>
      </motion.div>

      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-8 z-50 w-[400px]"
          >
            <Card className="shadow-xl border-border/50 backdrop-blur-sm bg-background/95">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-serif">AI Assistant</CardTitle>
                  <Badge variant="secondary" className="font-medium">
                    Online
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => handleOpenChange(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-3 px-4 flex flex-col items-start gap-1 group relative overflow-hidden"
                      onClick={action.action}
                    >
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-2 w-full">
                        <action.icon className="h-4 w-4 text-primary" />
                        <span className="font-medium">{action.label}</span>
                        {action.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{action.description}</span>
                    </Button>
                  ))}
                </div>

                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {state.messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "assistant"
                              ? "bg-muted/50 backdrop-blur-sm"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {message.role === "assistant" && (
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkles className="h-3 w-3" />
                              <span className="text-xs font-medium">AI Assistant</span>
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={state.input}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="border-border/50 bg-background/50"
                  />
                  <Button size="icon" onClick={handleSend}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action Modals */}
      <Dialog open={state.activeModal !== null} onOpenChange={() => handleModalChange(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {state.activeModal === "cart" && "Shopping Cart"}
              {state.activeModal === "schedule" && "Schedule Service"}
              {state.activeModal === "quote" && "Service Quote Calculator"}
              {state.activeModal === "orders" && "Recent Orders"}
              {state.activeModal === "areas" && "Service Areas"}
              {state.activeModal === "services" && "Our Services"}
            </DialogTitle>
          </DialogHeader>

          {state.activeModal === "cart" && <div>Cart content here...</div>}
          {state.activeModal === "schedule" && <AppointmentScheduler />}
          {state.activeModal === "quote" && <ServiceCalculator />}
          {state.activeModal === "orders" && (
            <div className="space-y-4">
              <div className="space-y-4">
                {[1, 2].map((order) => (
                  <Card key={order}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Order #{Math.random().toString(36).substr(2, 9)}</CardTitle>
                        <Badge>In Progress</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service Type</span>
                          <span className="font-medium">Lawn Maintenance</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-medium">
                            {new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount</span>
                          <span className="font-medium">${(Math.random() * 200 + 100).toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {state.activeModal === "areas" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {["North Region", "South Region", "East Region", "West Region"].map((region) => (
                  <Card key={region}>
                    <CardHeader>
                      <CardTitle className="text-lg">{region}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Sample City {i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {state.activeModal === "services" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Lawn Maintenance",
                    description: "Regular mowing and edging services",
                    price: "From $50/visit",
                  },
                  {
                    title: "Garden Care",
                    description: "Plant care and maintenance",
                    price: "From $75/hour",
                  },
                  {
                    title: "Landscaping",
                    description: "Custom landscape design and installation",
                    price: "Custom quote",
                  },
                  {
                    title: "Tree Service",
                    description: "Tree trimming and removal",
                    price: "From $200/service",
                  },
                ].map((service) => (
                  <Card key={service.title}>
                    <CardHeader>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                      <Separator className="my-2" />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{service.price}</span>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

