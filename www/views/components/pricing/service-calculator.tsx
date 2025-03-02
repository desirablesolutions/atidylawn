"use client"

import { useState } from "react"
import { Check, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface CalculatorState {
  propertySize: number
  serviceType: string
  serviceFrequency: string
  additionalServices: string[]
}

const initialState: CalculatorState = {
  propertySize: 1000,
  serviceType: "basic",
  serviceFrequency: "weekly",
  additionalServices: [],
}

const serviceTypes = {
  basic: {
    name: "Basic Maintenance",
    baseRate: 0.05, // per sq ft
    description: "Regular mowing, edging, and blowing",
  },
  premium: {
    name: "Premium Care",
    baseRate: 0.08,
    description: "Includes fertilization and weed control",
  },
  complete: {
    name: "Complete Estate",
    baseRate: 0.12,
    description: "Comprehensive care with garden maintenance",
  },
}

const frequencies = {
  weekly: {
    name: "Weekly",
    multiplier: 1,
  },
  biweekly: {
    name: "Bi-Weekly",
    multiplier: 1.2,
  },
  monthly: {
    name: "Monthly",
    multiplier: 1.5,
  },
}

const additionalServices = [
  {
    id: "irrigation",
    name: "Irrigation System Maintenance",
    rate: 75,
  },
  {
    id: "fertilization",
    name: "Seasonal Fertilization",
    rate: 150,
  },
  {
    id: "pruning",
    name: "Tree & Shrub Pruning",
    rate: 200,
  },
  {
    id: "cleanup",
    name: "Seasonal Cleanup",
    rate: 250,
  },
]

export default function ServiceCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState)

  const calculateBasePrice = () => {
    const baseRate = serviceTypes[state.serviceType as keyof typeof serviceTypes].baseRate
    const frequencyMultiplier = frequencies[state.serviceFrequency as keyof typeof frequencies].multiplier
    return state.propertySize * baseRate * frequencyMultiplier
  }

  const calculateAdditionalServices = () => {
    return state.additionalServices.reduce((total, service) => {
      const serviceItem = additionalServices.find((item) => item.id === service)
      return total + (serviceItem?.rate || 0)
    }, 0)
  }

  const totalPrice = calculateBasePrice() + calculateAdditionalServices()

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-medium mb-4">Service Calculator</h2>
            <p className="text-lg text-muted-foreground">Get an instant estimate for your landscaping needs</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Property Size (sq ft)</Label>
                  <span className="text-sm text-muted-foreground">{state.propertySize.toLocaleString()} sq ft</span>
                </div>
                <Slider
                  value={[state.propertySize]}
                  onValueChange={([value]) => setState((prev) => ({ ...prev, propertySize: value }))}
                  min={500}
                  max={10000}
                  step={100}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select
                  value={state.serviceType}
                  onValueChange={(value) => setState((prev) => ({ ...prev, serviceType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(serviceTypes).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center">
                          <span>{value.name}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>{value.description}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Service Frequency</Label>
                <Select
                  value={state.serviceFrequency}
                  onValueChange={(value) => setState((prev) => ({ ...prev, serviceFrequency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(frequencies).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Additional Services</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {additionalServices.map((service) => (
                    <Button
                      key={service.id}
                      variant="outline"
                      className={`justify-start space-x-2 ${
                        state.additionalServices.includes(service.id) ? "border-primary" : ""
                      }`}
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          additionalServices: prev.additionalServices.includes(service.id)
                            ? prev.additionalServices.filter((id) => id !== service.id)
                            : [...prev.additionalServices, service.id],
                        }))
                      }
                    >
                      <Check
                        className={`h-4 w-4 ${
                          state.additionalServices.includes(service.id) ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span>{service.name}</span>
                      <span className="ml-auto text-muted-foreground">${service.rate}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <div className="w-full pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">Estimated Monthly Cost</span>
                  <span className="text-2xl font-serif font-medium">${Math.round(totalPrice).toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  *Final price may vary based on property specifics and seasonal factors
                </p>
              </div>
              <Button size="lg" className="w-full">
                Schedule a Consultation
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

