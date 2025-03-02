"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Calendar, Clock, MessageCircle, Star, Settings2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

const demoNotifications = [
  {
    id: 1,
    type: "appointment",
    title: "Upcoming Service",
    message: "Your lawn care service is scheduled for tomorrow at 10 AM",
    time: "2 hours ago",
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    type: "review",
    title: "Service Completed",
    message: "How was your recent lawn care service? Leave a review!",
    time: "1 day ago",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    message: "Your lawn care specialist has sent you a message",
    time: "2 days ago",
    icon: MessageCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
]

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-0 gap-0 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="p-6 pb-0 space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
              <Badge variant="secondary" className="ml-2 font-normal">
                3 new
              </Badge>
            </DialogTitle>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        </DialogHeader>

        <ScrollArea className="h-[400px] p-6">
          <AnimatePresence>
            <div className="space-y-4">
              {demoNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="notification-card glass-card p-4 rounded-lg"
                >
                  <div className="flex gap-4">
                    <div className={cn("p-2 rounded-full", notification.bgColor)}>
                      <notification.icon className={cn("h-5 w-5", notification.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-base font-medium leading-none mb-1">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                  <div className="notification-glow" />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </ScrollArea>

        <div className="p-4 border-t bg-muted/50">
          <Button variant="outline" size="sm" className="w-full" onClick={onClose}>
            <Settings2 className="mr-2 h-4 w-4" />
            Manage Notifications
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

