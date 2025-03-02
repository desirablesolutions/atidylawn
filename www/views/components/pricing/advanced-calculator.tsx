"use client"

import { useState } from "react"
import { Check, HelpCircle, Calculator, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommandCombobox } from "@/components/ui/command"

interface CalculatorState {
  propertySize: number
  serviceType: string
  serviceFrequency: string
  additionalServices: string[]
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  propertyType: string
}

const initialState: CalculatorState = {
  propertySize: 1000,
  serviceType: "basic",
  serviceFrequency: "weekly",
  additionalServices: [],
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  propertyType: "residential",
}

const serviceTypes = {
  basic: {
    name: "Basic Maintenance",
    baseRate: 0.05,
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
  commercial: {
    name: "Commercial Services",
    baseRate: 0.15,
    description: "Full-service commercial property maintenance",
  },
}

const propertyTypes = {
  residential: {
    name: "Residential",
    multiplier: 1,
  },
  commercial: {
    name: "Commercial",
    multiplier: 1.2,
  },
  estate: {
    name: "Estate",
    multiplier: 1.5,
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

const additionalServices = {
  maintenance: [
    {
      id: "irrigation",
      name: "Irrigation System Maintenance",
      rate: 75,
      description: "Regular maintenance and adjustments of irrigation systems",
    },
    {
      id: "fertilization",
      name: "Seasonal Fertilization",
      rate: 150,
      description: "Professional fertilization treatment",
    },
    {
      id: "pruning",
      name: "Tree & Shrub Pruning",
      rate: 200,
      description: "Expert pruning and shaping services",
    },
    {
      id: "cleanup",
      name: "Seasonal Cleanup",
      rate: 250,
      description: "Thorough seasonal property cleanup",
    },
  ],
  design: [
    {
      id: "landscape-design",
      name: "Landscape Design",
      rate: 500,
      description: "Custom landscape design services",
    },
    {
      id: "hardscaping",
      name: "Hardscaping",
      rate: 1000,
      description: "Installation of paths, patios, and walls",
    },
    {
      id: "lighting",
      name: "Outdoor Lighting",
      rate: 300,
      description: "Professional lighting design and installation",
    },
  ],
  specialty: [
    {
      id: "water-features",
      name: "Water Features",
      rate: 800,
      description: "Custom water feature installation",
    },
    {
      id: "artificial-turf",
      name: "Artificial Turf",
      rate: 1500,
      description: "High-quality artificial turf installation",
    },
    {
      id: "smart-irrigation",
      name: "Smart Irrigation System",
      rate: 2000,
      description: "Advanced smart irrigation system installation",
    },
  ],
}

const states = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
]

export default function AdvancedCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState)
  const [activeTab, setActiveTab] = useState("maintenance")

  const calculateBasePrice = () => {
    const baseRate = serviceTypes[state.serviceType as keyof typeof serviceTypes].baseRate
    const frequencyMultiplier = frequencies[state.serviceFrequency as keyof typeof frequencies].multiplier
    const propertyMultiplier = propertyTypes[state.propertyType as keyof typeof propertyTypes].multiplier
    return state.propertySize * baseRate * frequencyMultiplier * propertyMultiplier
  }

  const calculateAdditionalServices = () => {
    return state.additionalServices.reduce((total, service) => {
      const serviceItem = Object.values(additionalServices)
        .flat()
        .find((item) => item.id === service)
      return total + (serviceItem?.rate || 0)
    }, 0)
  }

  const totalPrice = calculateBasePrice() + calculateAdditionalServices()

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-medium mb-4">Advanced Service Calculator</h2>
            <p className="text-lg text-muted-foreground">Get a detailed estimate for all your landscaping needs</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-6 w-6 mr-2" />
                Service Estimator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Property Details */}
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
                    <Label>Property Type</Label>
                    <Select
                      value={state.propertyType}
                      onValueChange={(value) => setState((prev) => ({ ...prev, propertyType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(propertyTypes).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Enhanced Address Fields */}
                  <div className="space-y-4 col-span-full">
                    <Label>Property Location</Label>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label>Street Address</Label>
                        <CommandCombobox
                          items={[
                            "123 Main St",
                            "456 Oak Ave",
                            // ... more suggestions
                          ]}
                          placeholder="Enter your street address"
                          onSelect={(value) =>
                            setState((prev) => ({
                              ...prev,
                              address: { ...prev.address, street: value },
                            }))
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input
                            placeholder="City"
                            value={state.address.city}
                            onChange={(e) =>
                              setState((prev) => ({
                                ...prev,
                                address: { ...prev.address, city: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Select
                            value={state.address.state}
                            onValueChange={(value) =>
                              setState((prev) => ({
                                ...prev,
                                address: { ...prev.address, state: value },
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state.code} value={state.code}>
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>ZIP Code</Label>
                          <Input
                            placeholder="ZIP"
                            value={state.address.zip}
                            onChange={(e) =>
                              setState((prev) => ({
                                ...prev,
                                address: { ...prev.address, zip: e.target.value },
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Configuration */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                {/* Additional Services Tabs */}
                <div className="space-y-4">
                  <Label>Additional Services</Label>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                      <TabsTrigger value="design">Design</TabsTrigger>
                      <TabsTrigger value="specialty">Specialty</TabsTrigger>
                    </TabsList>
                    {Object.entries(additionalServices).map(([key, services]) => (
                      <TabsContent key={key} value={key}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {services.map((service) => (
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
                              <div className="flex flex-col items-start text-left">
                                <span>{service.name}</span>
                                <span className="text-xs text-muted-foreground">{service.description}</span>
                              </div>
                              <span className="ml-auto font-medium">${service.rate}</span>
                            </Button>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <div className="w-full pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">Estimated Monthly Cost</span>
                  <span className="text-3xl font-serif font-medium">${Math.round(totalPrice).toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  *Final price may vary based on property specifics and seasonal factors
                </p>
              </div>
              <Button size="lg" className="w-full">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

