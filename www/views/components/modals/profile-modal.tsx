"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  User,
  LogOut,
  CreditCard,
  History,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Camera,
  Edit2,
  CheckCircle,
} from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { AutoSizer, List } from "react-virtualized"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

// Move static data outside component
const userData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Garden Lane, Beverly Hills, CA 90210",
  memberSince: "January 2023",
  plan: "Premium",
  nextService: "March 15, 2024",
  loyaltyPoints: 2500,
  pointsToNextTier: 500,
  totalSpent: "$3,450",
  lastLogin: "2 hours ago",
  preferences: {
    notifications: true,
    newsletter: true,
    serviceReminders: true,
  },
  upcomingServices: [
    {
      id: 1,
      service: "Lawn Maintenance",
      date: "2024-03-15",
      time: "10:00 AM",
      status: "confirmed",
    },
    {
      id: 2,
      service: "Garden Cleanup",
      date: "2024-03-22",
      time: "2:00 PM",
      status: "pending",
    },
  ],
}

const quickActions = [
  { label: "Schedule Service", icon: Calendar },
  { label: "View History", icon: History },
  { label: "Update Profile", icon: Edit2 },
  { label: "Get Support", icon: Shield },
]

const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const isMounted = useRef(false)
  const initializationRef = useRef(false)

  const [state, setState] = useState(() => ({
    activeTab: "overview",
    isLoading: true,
    userData: null,
  }))

  // Handle initialization and data fetching
  useEffect(() => {
    isMounted.current = true

    // Only run initialization once
    if (!initializationRef.current && isOpen) {
      initializationRef.current = true

      const controller = new AbortController()

      const fetchData = async () => {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500))

          if (isMounted.current) {
            setState((prev) => ({
              ...prev,
              userData,
              isLoading: false,
            }))
          }
        } catch (error) {
          if (isMounted.current) {
            console.error("Error fetching user data:", error)
            setState((prev) => ({ ...prev, isLoading: false }))
          }
        }
      }

      fetchData()

      return () => {
        controller.abort()
        isMounted.current = false
      }
    }
  }, [isOpen])

  const handleAction = useCallback((action: string) => {
    if (!isMounted.current) return
    // Handle action
  }, [])

  const handleClearAll = useCallback(() => {
    if (!isMounted.current) return
    // Clear all
  }, [])

  const handleMarkAllRead = useCallback(() => {
    if (!isMounted.current) return
    // Mark all as read
  }, [])

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  // SSR check
  if (typeof window === "undefined") return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-0 max-h-[50vh] overflow-hidden bg-background/95 backdrop-blur-xl border-none shadow-2xl">
        {state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.y, velocity.y)
              if (swipe > swipeConfidenceThreshold) {
                onClose()
              }
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6">
                <div className="absolute inset-0 bg-[url('/texture.png')] mix-blend-overlay opacity-20" />
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-white/20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-lg">JD</AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground"
                      >
                        <Camera className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-white truncate">{userData.name}</h2>
                        <Badge variant="secondary" className="bg-white/90 text-primary shrink-0">
                          {userData.plan}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/80 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        Member since {userData.memberSince}
                      </p>
                      <p className="text-sm text-white/80 flex items-center gap-1.5 mt-0.5">
                        <Clock className="h-3.5 w-3.5" />
                        Last active {userData.lastLogin}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-1 p-2 bg-gradient-to-b from-muted/80 to-muted/30">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-primary/10">
                      <action.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Content */}
              <ScrollArea className="flex-1 h-[calc(50vh-200px)]">
                <AutoSizer>
                  {({ height, width }) => (
                    <List height={height} width={width} itemCount={items.length} itemSize={100} overscanCount={5}>
                      {({ index, style }) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          style={style}
                        >
                          <div className="p-4 space-y-4">
                            {/* Loyalty Status */}
                            <Card className="p-4 bg-primary/5 border-primary/20">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium flex items-center gap-2">
                                  <Star className="h-4 w-4 text-primary" />
                                  Loyalty Status
                                </h3>
                                <Badge variant="secondary" className="bg-primary/10 text-primary">
                                  {userData.loyaltyPoints} pts
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Next Tier</span>
                                  <span>{userData.pointsToNextTier} points needed</span>
                                </div>
                                <Progress value={83} className="h-1.5" />
                              </div>
                            </Card>

                            {/* Upcoming Services */}
                            <Card className="p-4">
                              <h3 className="font-medium flex items-center gap-2 mb-3">
                                <Calendar className="h-4 w-4 text-primary" />
                                Upcoming Services
                              </h3>
                              <div className="space-y-3">
                                {userData.upcomingServices.map((service) => (
                                  <div
                                    key={service.id}
                                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                  >
                                    <div className="min-w-0">
                                      <p className="font-medium text-sm truncate">{service.service}</p>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="h-3 w-3" />
                                        {service.date}
                                        <Clock className="h-3 w-3" />
                                        {service.time}
                                      </div>
                                    </div>
                                    <Badge
                                      variant={service.status === "confirmed" ? "default" : "secondary"}
                                      className="ml-2 shrink-0"
                                    >
                                      {service.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </Card>

                            {/* Contact Information */}
                            <Card className="p-4">
                              <h3 className="font-medium flex items-center gap-2 mb-3">
                                <User className="h-4 w-4 text-primary" />
                                Contact Information
                              </h3>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="text-sm truncate">{userData.email}</span>
                                  </div>
                                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                                </div>
                                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="text-sm truncate">{userData.phone}</span>
                                  </div>
                                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                                </div>
                                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="text-sm truncate">{userData.address}</span>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </Card>

                            {/* Account Stats */}
                            <div className="grid grid-cols-2 gap-3">
                              <Card className="p-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <CreditCard className="h-4 w-4 text-primary" />
                                  <h3 className="font-medium text-sm">Total Spent</h3>
                                </div>
                                <p className="text-2xl font-semibold">{userData.totalSpent}</p>
                              </Card>
                              <Card className="p-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <Star className="h-4 w-4 text-primary" />
                                  <h3 className="font-medium text-sm">Avg. Rating</h3>
                                </div>
                                <p className="text-2xl font-semibold">4.9</p>
                              </Card>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </List>
                  )}
                </AutoSizer>
              </ScrollArea>

              {/* Footer */}
              <div className="p-4 border-t">
                <Button variant="destructive" className="w-full" onClick={onClose}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
}

