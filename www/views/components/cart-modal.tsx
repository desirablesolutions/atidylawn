"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Trash2, Plus, Minus, Calendar, Clock, Leaf, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  date?: Date
  time?: string
  type: "one-time" | "recurring"
  frequency?: "weekly" | "bi-weekly" | "monthly"
  image: string
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Lawn Maintenance",
      description: "Professional lawn mowing and edging service",
      price: 49.99,
      quantity: 1,
      type: "recurring",
      frequency: "weekly",
      image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "2",
      name: "Garden Cleanup",
      description: "Complete garden cleanup and debris removal",
      price: 149.99,
      quantity: 1,
      type: "one-time",
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&auto=format&fit=crop&q=60",
    },
  ])

  const updateQuantity = (id: string, change: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const updateDate = (id: string, date: Date) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, date } : item)))
  }

  const updateTime = (id: string, time: string) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, time } : item)))
  }

  const updateFrequency = (id: string, frequency: "weekly" | "bi-weekly" | "monthly") => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, frequency } : item)))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[500px] overflow-hidden flex flex-col">
        <SheetHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-2xl font-serif">
              <Leaf className="h-6 w-6 text-primary" />
              Your Cart
            </SheetTitle>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{cartItems.length} items in cart</span>
            {cartItems.length > 0 && (
              <Button variant="ghost" size="sm" className="h-auto p-0 text-sm">
                Clear all
              </Button>
            )}
          </div>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <Leaf className="h-12 w-12 text-muted-foreground/20" />
              <AlertCircle className="absolute bottom-0 right-0 h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xl font-medium">Your cart is empty</p>
            <p className="text-muted-foreground text-center max-w-[250px]">
              Looks like you haven't added any services to your cart yet.
            </p>
            <Button onClick={onClose} className="mt-4">
              Browse Services
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-6 py-6">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="space-y-3"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 96px, 96px"
                        />
                        <Badge
                          variant={item.type === "recurring" ? "default" : "secondary"}
                          className="absolute top-2 right-2"
                        >
                          {item.type === "recurring" ? "Recurring" : "One-time"}
                        </Badge>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium leading-none">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <div className="ml-auto">
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {item.date ? format(item.date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={item.date}
                            onSelect={(date) => date && updateDate(item.id, date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <Select value={item.time} onValueChange={(value) => updateTime(item.id, value)}>
                        <SelectTrigger className="w-[140px]">
                          <Clock className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {item.type === "recurring" && (
                      <Select
                        value={item.frequency}
                        onValueChange={(value: "weekly" | "bi-weekly" | "monthly") => updateFrequency(item.id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly Service</SelectItem>
                          <SelectItem value="bi-weekly">Bi-Weekly Service</SelectItem>
                          <SelectItem value="monthly">Monthly Service</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    <Separator />
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-6">
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>${(subtotal * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(subtotal * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${(subtotal * 1.13).toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="rounded-lg border bg-card p-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Satisfaction Guaranteed</p>
                    <p className="text-xs text-muted-foreground">
                      Not satisfied? Get a full refund within 7 days of service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

