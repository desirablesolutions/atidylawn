"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Calculator, Ruler, DollarSign, Leaf, Sparkles, TreePine, Flower2, Droplets, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  propertySize: z.number().min(100).max(10000),
  propertyType: z.enum(["residential", "commercial", "estate"]),
  serviceFrequency: z.enum(["weekly", "biweekly", "monthly"]),
  services: z.array(z.string()),
  extras: z.array(z.string()),
  startDate: z.date(),
})

const services = [
  {
    id: "mowing",
    name: "Lawn Mowing",
    description: "Regular grass cutting and edging",
    basePrice: 45,
    icon: Leaf,
  },
  {
    id: "fertilization",
    name: "Fertilization",
    description: "Nutrient treatment for healthy growth",
    basePrice: 75,
    icon: Sparkles,
  },
  {
    id: "tree-care",
    name: "Tree Care",
    description: "Pruning and maintenance",
    basePrice: 120,
    icon: TreePine,
  },
  {
    id: "garden-care",
    name: "Garden Care",
    description: "Plant maintenance and weeding",
    basePrice: 90,
    icon: Flower2,
  },
  {
    id: "irrigation",
    name: "Irrigation",
    description: "Sprinkler system maintenance",
    basePrice: 60,
    icon: Droplets,
  },
]

const extras = [
  {
    id: "pest-control",
    name: "Pest Control",
    price: 85,
  },
  {
    id: "aeration",
    name: "Aeration",
    price: 120,
  },
  {
    id: "overseeding",
    name: "Overseeding",
    price: 150,
  },
  {
    id: "mulching",
    name: "Mulching",
    price: 95,
  },
]

export default function AdvancedServiceCalculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [propertySize, setPropertySize] = useState(1000)
  const [isCalculating, setIsCalculating] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertySize: 1000,
      propertyType: "residential",
      serviceFrequency: "biweekly",
      services: [],
      extras: [],
      startDate: new Date(),
    },
  })

  const calculateTotal = () => {
    setIsCalculating(true)

    // Simulate calculation delay
    setTimeout(() => {
      const baseTotal = selectedServices.reduce((total, serviceId) => {
        const service = services.find((s) => s.id === serviceId)
        return total + (service?.basePrice || 0)
      }, 0)

      const extrasTotal = selectedExtras.reduce((total, extraId) => {
        const extra = extras.find((e) => e.id === extraId)
        return total + (extra?.price || 0)
      }, 0)

      const sizeMultiplier = propertySize / 1000
      setIsCalculating(false)
      return (baseTotal + extrasTotal) * sizeMultiplier
    }, 500)
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-serif font-medium mb-4">Service Calculator</h2>
              <p className="text-lg text-muted-foreground">Get an instant estimate for your lawn care needs</p>
            </motion.div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-primary" />
                Calculate Your Service Package
              </CardTitle>
              <CardDescription>Customize your service package and get an instant estimate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Property Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Property Details</h3>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Property Size (sq ft)</Label>
                      <span className="text-sm text-muted-foreground">{propertySize.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <Slider
                        value={[propertySize]}
                        onValueChange={([value]) => setPropertySize(value)}
                        min={100}
                        max={10000}
                        step={100}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Property Type</Label>
                      <Select defaultValue="residential">
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="estate">Estate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Service Frequency</Label>
                      <Select defaultValue="biweekly">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Selection */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Select Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service.id)
                    return (
                      <motion.div key={service.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          className={`w-full justify-start space-x-4 h-auto p-4 ${
                            isSelected ? "border-primary bg-primary/5 dark:bg-primary/10" : ""
                          }`}
                          onClick={() =>
                            setSelectedServices((prev) =>
                              prev.includes(service.id)
                                ? prev.filter((id) => id !== service.id)
                                : [...prev, service.id],
                            )
                          }
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-2 rounded-lg ${
                                isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <service.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-medium">{service.name}</p>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${service.basePrice}/visit</p>
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Extras */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Additional Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {extras.map((extra) => {
                    const isSelected = selectedExtras.includes(extra.id)
                    return (
                      <motion.div key={extra.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          className={`w-full justify-between h-auto p-4 ${
                            isSelected ? "border-primary bg-primary/5 dark:bg-primary/10" : ""
                          }`}
                          onClick={() =>
                            setSelectedExtras((prev) =>
                              prev.includes(extra.id) ? prev.filter((id) => id !== extra.id) : [...prev, extra.id],
                            )
                          }
                        >
                          <span>{extra.name}</span>
                          <div className="flex items-center gap-2">
                            <span>${extra.price}</span>
                            {isSelected ? <Check className="h-4 w-4 text-primary" /> : <Plus className="h-4 w-4" />}
                          </div>
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <div className="w-full pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-medium">Estimated Total</span>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-3xl font-serif font-medium">
                      {isCalculating ? (
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          Calculating...
                        </motion.div>
                      ) : (
                        calculateTotal()?.toFixed(2)
                      )}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">*Final price may vary based on property assessment</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelectedServices([])
                    setSelectedExtras([])
                    setPropertySize(1000)
                  }}
                >
                  Reset Calculator
                </Button>
                <Button className="flex-1">Schedule Consultation</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

