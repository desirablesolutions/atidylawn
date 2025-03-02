"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, Clock, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Simulated availability data
const availabilityData = {
  "2024-03-01": { morning: 5, afternoon: 3, evening: 2 },
  "2024-03-02": { morning: 2, afternoon: 4, evening: 1 },
  "2024-03-03": { morning: 0, afternoon: 1, evening: 3 },
  // Add more dates...
}

const timeSlots = [
  { id: "morning", label: "Morning", time: "8:00 AM - 12:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM - 4:00 PM" },
  { id: "evening", label: "Evening", time: "4:00 PM - 8:00 PM" },
]

interface AvailabilityHeatMapProps {
  date: Date
  availability: Record<string, number>
}

function AvailabilityHeatMap({ date, availability }: AvailabilityHeatMapProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {timeSlots.map((slot) => {
        const count = availability[slot.id] || 0
        const opacity = Math.min(count / 5, 1) // Max 5 agents

        return (
          <motion.div
            key={slot.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105",
              "border border-border",
              count === 0 ? "bg-destructive/10" : "bg-primary/10",
            )}
            style={{
              opacity: count === 0 ? 0.5 : opacity + 0.3,
            }}
          >
            <div className="text-sm font-medium">{slot.label}</div>
            <div className="text-xs text-muted-foreground">{slot.time}</div>
            <div className="mt-2 flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">
                {count} {count === 1 ? "agent" : "agents"}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function AvailabilityChart() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const getAvailability = (date: Date) => {
    return (
      availabilityData[formatDate(date)] || {
        morning: Math.floor(Math.random() * 6),
        afternoon: Math.floor(Math.random() * 6),
        evening: Math.floor(Math.random() * 6),
      }
    )
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-medium mb-4">Service Availability</h2>
            <p className="text-lg text-muted-foreground">
              Check our team's availability and book your preferred time slot
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Available Time Slots
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>

                  <div className="mt-6">
                    <AvailabilityHeatMap date={date} availability={getAvailability(date)} />
                  </div>
                </div>

                <div className="w-full md:w-72 space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <h4 className="font-medium mb-2">Service Area Coverage</h4>
                    <div className="aspect-square relative rounded-lg overflow-hidden border">
                      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center" />
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      We currently serve the greater metropolitan area within a 30-mile radius
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Availability Legend</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-primary/40" />
                        <span>High Availability</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-primary/20" />
                        <span>Medium Availability</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-destructive/10" />
                        <span>No Availability</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" disabled={!selectedTimeSlot}>
                    Book Appointment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

