"use client"

import { Label } from "@/components/ui/label"
import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addDays, startOfWeek, addWeeks } from "date-fns"
import { Calendar, Clock, ChevronLeft, ChevronRight, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Availability {
  date: Date
  slots: {
    time: string
    available: boolean
    spots: number
  }[]
}

interface AppointmentState {
  selectedDate: Date | undefined
  selectedTime: string
  currentWeek: number
  availability: Availability[]
}

export default function AppointmentScheduler() {
  const isMounted = useRef(false)
  const [state, setState] = useState<AppointmentState>({
    selectedDate: undefined,
    selectedTime: "",
    currentWeek: 0,
    availability: [],
  })

  // Generate availability data
  const generateAvailability = useCallback((date: Date) => {
    const slots = []
    const startHour = 8
    const endHour = 17

    for (let hour = startHour; hour <= endHour; hour++) {
      const isAvailable = Math.random() > 0.3
      slots.push({
        time: `${hour}:00`,
        available: isAvailable,
        spots: isAvailable ? Math.floor(Math.random() * 3) + 1 : 0,
      })
    }

    return slots
  }, [])

  // Generate week availability
  const generateWeekAvailability = useCallback(
    (weekOffset: number) => {
      const week = []
      const startDate = startOfWeek(addWeeks(new Date(), weekOffset))

      for (let i = 0; i < 7; i++) {
        const date = addDays(startDate, i)
        week.push({
          date,
          slots: generateAvailability(date),
        })
      }

      return week
    },
    [generateAvailability],
  )

  // Initialize availability data
  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      const initialAvailability = generateWeekAvailability(state.currentWeek)
      setState((prev) => ({ ...prev, availability: initialAvailability }))
    }
    return () => {
      isMounted.current = false
    }
  }, [state.currentWeek, generateWeekAvailability])

  const handleDateSelect = (date: Date | undefined) => {
    if (!isMounted.current) return
    setState((prev) => ({
      ...prev,
      selectedDate: date,
      selectedTime: "",
    }))
  }

  const handleTimeSelect = (time: string) => {
    if (!isMounted.current) return
    setState((prev) => ({
      ...prev,
      selectedTime: time,
    }))
  }

  const handleWeekChange = (offset: number) => {
    if (!isMounted.current) return
    setState((prev) => ({
      ...prev,
      currentWeek: prev.currentWeek + offset,
    }))
  }

  if (typeof window === "undefined") return null

  return (
    <section className="py-20 bg-muted/30">
      {/* Rest of the JSX remains the same, but update the event handlers */}
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-serif font-medium mb-4">Schedule Your Service</h2>
              <p className="text-lg text-muted-foreground">Choose your preferred date and time for service</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Calendar Column */}
            <Card className="lg:col-span-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Select Date & Time
                </CardTitle>
                <CardDescription>Available time slots for your service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Week Navigator */}
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="icon" onClick={() => handleWeekChange(-1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <h4 className="font-medium">
                      {format(startOfWeek(addWeeks(new Date(), state.currentWeek)), "MMMM d")} -{" "}
                      {format(addDays(startOfWeek(addWeeks(new Date(), state.currentWeek)), 6), "MMMM d, yyyy")}
                    </h4>
                  </div>
                  <Button variant="outline" size="icon" onClick={() => handleWeekChange(1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-4">
                  {generateWeekAvailability(state.currentWeek).map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">{format(day.date, "EEE")}</p>
                        <Button
                          variant={state.selectedDate?.toDateString() === day.date.toDateString() ? "default" : "ghost"}
                          className="w-full"
                          onClick={() => handleDateSelect(day.date)}
                        >
                          {format(day.date, "d")}
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {day.slots.slice(0, 3).map((slot, slotIndex) => (
                          <div
                            key={slotIndex}
                            className={`h-1 rounded-full ${slot.available ? "bg-primary" : "bg-muted-foreground/20"}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Time Slots */}
                <AnimatePresence mode="wait">
                  {state.selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="font-medium">Available Times</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Array.from({ length: 9 }, (_, i) => i + 8).map((hour, index) => {
                          const time = `${hour}:00`
                          const isAvailable = Math.random() > 0.3
                          return (
                            <motion.div
                              key={time}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Button
                                variant={state.selectedTime === time ? "default" : "outline"}
                                className="w-full"
                                disabled={!isAvailable}
                                onClick={() => handleTimeSelect(time)}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                {time}
                              </Button>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Summary Column */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Review your appointment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Selected Service</Label>
                  <Select defaultValue="maintenance">
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Lawn Maintenance</SelectItem>
                      <SelectItem value="mowing">Lawn Mowing</SelectItem>
                      <SelectItem value="cleanup">Garden Cleanup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <Badge variant="outline">
                      {state.selectedDate ? format(state.selectedDate, "MMMM d, yyyy") : "Not selected"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <Badge variant="outline">{state.selectedTime || "Not selected"}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">3 service providers available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Service area: 5 mile radius</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Booking Progress</Label>
                  <Progress value={66} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service selected</span>
                    <span>Date & time</span>
                    <span>Confirm</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={!state.selectedDate || !state.selectedTime}>
                  Confirm Booking
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

