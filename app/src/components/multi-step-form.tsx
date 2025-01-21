"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { SERVICES } from "@/lib/constants"
import { submitToNotion } from "@/lib/notion"
import { CheckCircle, Circle, Calendar, Clock, MapPin, CreditCard, Send, Users } from "lucide-react"
import { fadeInUp, staggerChildren, scaleIn } from "@/lib/animation-variants"

// Enhanced form data interface
interface FormData {
  // Personal Info
  name: string
  email: string
  phone: string
  // Address
  street: string
  city: string
  state: string
  zip: string
  propertySize: number
  // Service Selection
  selectedServices: string[]
  frequency: "weekly" | "biweekly" | "monthly" | "oneTime"
  startDate: string
  preferredTime: string[]
  // Additional Preferences
  pestControl: boolean
  organicProducts: boolean
  petFriendly: boolean
  notifications: ("email" | "sms" | "app")[]
  specialInstructions: string
  // Billing
  paymentMethod: "credit" | "debit" | "bank"
  cardNumber: string
  expiryDate: string
  cvv: string
  billingAddress: {
    sameAsService: boolean
    street?: string
    city?: string
    state?: string
    zip?: string
  }
}

const INITIAL_DATA: FormData = {
  name: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  propertySize: 0,
  selectedServices: [],
  frequency: "biweekly",
  startDate: "",
  preferredTime: [],
  pestControl: false,
  organicProducts: false,
  petFriendly: false,
  notifications: ["email"],
  specialInstructions: "",
  paymentMethod: "credit",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  billingAddress: {
    sameAsService: true,
  },
}

const TIME_SLOTS = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formProgress, setFormProgress] = useState(0)

  useEffect(() => {
    // Calculate form completion percentage
    const totalFields = Object.keys(INITIAL_DATA).length
    const filledFields = Object.entries(formData).filter(([key, value]) => {
      if (Array.isArray(value)) return value.length > 0
      if (typeof value === "object") return Object.keys(value).length > 0
      return value !== "" && value !== false
    }).length
    setFormProgress((filledFields / totalFields) * 100)
  }, [formData])

  const steps = [
    {
      title: "Personal Info",
      icon: <Users className="w-5 h-5" />,
      component: <PersonalInfo formData={formData} updateFields={updateFields} />,
    },
    {
      title: "Property Details",
      icon: <MapPin className="w-5 h-5" />,
      component: <PropertyDetails formData={formData} updateFields={updateFields} />,
    },
    {
      title: "Services",
      icon: <CheckCircle className="w-5 h-5" />,
      component: <ServiceSelection formData={formData} updateFields={updateFields} />,
    },
    {
      title: "Schedule",
      icon: <Calendar className="w-5 h-5" />,
      component: <Schedule formData={formData} updateFields={updateFields} />,
    },
    {
      title: "Preferences",
      icon: <Send className="w-5 h-5" />,
      component: <Preferences formData={formData} updateFields={updateFields} />,
    },
    {
      title: "Payment",
      icon: <CreditCard className="w-5 h-5" />,
      component: <BillingInfo formData={formData} updateFields={updateFields} />,
    },
  ]

  function updateFields(fields: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitToNotion({
        name: formData.name,
        email: formData.email,
        service: formData.selectedServices.join(", "),
        message: formData.specialInstructions, // Updated message field
      })

      if (result.success) {
        // Handle success
        setFormData(INITIAL_DATA)
        setCurrentStep(0)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }

    setIsSubmitting(false)
  }

  return (
    <motion.div className="max-w-4xl mx-auto" variants={staggerChildren} initial="initial" animate="animate">
      {/* Progress Overview */}
      <motion.div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg" variants={fadeInUp}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-thin">Form Progress</h3>
          <span className="text-green-500">{Math.round(formProgress)}% Complete</span>
        </div>
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-green-500 dark:bg-green-400"
            initial={{ width: 0 }}
            animate={{ width: `${formProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Steps Progress */}
      <motion.div className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" variants={staggerChildren}>
        {steps.map((step, index) => (
          <motion.button
            key={step.title}
            variants={scaleIn}
            onClick={() => setCurrentStep(index)}
            className={`p-4 rounded-lg transition-all duration-300 ${
              currentStep === index
                ? "bg-green-500 text-white shadow-lg scale-105"
                : currentStep > index
                  ? "bg-green-100 dark:bg-green-900 text-green-500"
                  : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              {step.icon}
              <span className="text-sm font-thin">{step.title}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Form */}
      <form onSubmit={onSubmit}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep].component}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.div className="mt-8 flex justify-between" variants={fadeInUp}>
            <Button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 0}
              variant="outline"
              className="w-32"
            >
              Previous
            </Button>

            <Button
              type="button"
              onClick={() => (currentStep === steps.length - 1 ? onSubmit() : setCurrentStep((prev) => prev + 1))}
              className="w-32 bg-green-500 hover:bg-green-600 text-white"
            >
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </motion.div>
        </div>
      </form>

      {/* Summary Panel */}
      <motion.div variants={fadeInUp} className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-xl font-thin mb-4">Service Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Selected Services</p>
            <p className="text-2xl font-thin">{formData.selectedServices.length}</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Property Size</p>
            <p className="text-2xl font-thin">{formData.propertySize} sq ft</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Frequency</p>
            <p className="text-2xl font-thin capitalize">{formData.frequency}</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Total</p>
            <p className="text-2xl font-thin">${calculateTotal(formData)}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Helper function to calculate total
function calculateTotal(formData: FormData): number {
  const basePrice = formData.selectedServices.length * 50
  const frequencyMultiplier = {
    weekly: 4,
    biweekly: 2,
    monthly: 1,
    oneTime: 1.5,
  }[formData.frequency]

  const sizeFactor = Math.max(1, formData.propertySize / 1000)

  return Math.round(basePrice * frequencyMultiplier * sizeFactor)
}

// Form Step Components with enhanced styling and animations...
function PersonalInfo({
  formData,
  updateFields,
}: { formData: FormData; updateFields: (fields: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => updateFields({ name: e.target.value })}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => updateFields({ email: e.target.value })}
        required
      />
      <Input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => updateFields({ phone: e.target.value })}
        required
      />
    </div>
  )
}

function PropertyDetails({
  formData,
  updateFields,
}: { formData: FormData; updateFields: (fields: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Street Address"
        value={formData.street}
        onChange={(e) => updateFields({ street: e.target.value })}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => updateFields({ city: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="State"
          value={formData.state}
          onChange={(e) => updateFields({ state: e.target.value })}
          required
        />
      </div>
      <Input
        type="text"
        placeholder="ZIP Code"
        value={formData.zip}
        onChange={(e) => updateFields({ zip: e.target.value })}
        required
      />
      <Slider
        label="Property Size (sq ft)"
        value={formData.propertySize}
        onChange={(value) => updateFields({ propertySize: value })}
        min={0}
        max={10000}
        step={100}
      />
    </div>
  )
}

function ServiceSelection({
  formData,
  updateFields,
}: { formData: FormData; updateFields: (fields: Partial<FormData>) => void }) {
  const toggleService = (serviceId: string) => {
    const current = formData.selectedServices
    const updated = current.includes(serviceId) ? current.filter((id) => id !== serviceId) : [...current, serviceId]
    updateFields({ selectedServices: updated })
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {SERVICES.map((service) => (
        <motion.div
          key={service.id}
          whileHover={{ scale: 1.02 }}
          className={`p-4 border rounded-lg cursor-pointer transition-colors
                     ${
                       formData.selectedServices.includes(service.id)
                         ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                         : "border-gray-200 dark:border-gray-700"
                     }`}
          onClick={() => toggleService(service.id)}
        >
          <h3 className="font-thin text-lg mb-2">{service.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{service.price}</p>
        </motion.div>
      ))}
    </div>
  )
}

function Schedule({
  formData,
  updateFields,
}: { formData: FormData; updateFields: (fields: Partial<FormData>) => void }) {
  const toggleTimeSlot = (timeSlot: string) => {
    const current = formData.preferredTime
    const updated = current.includes(timeSlot) ? current.filter((slot) => slot !== timeSlot) : [...current, timeSlot]
    updateFields({ preferredTime: updated })
  }

  return (
    <div className="space-y-4">
      <Input
        type="date"
        placeholder="Start Date"
        value={formData.startDate}
        onChange={(e) => updateFields({ startDate: e.target.value })}
        required
      />
      <div className="space-y-2">
        {TIME_SLOTS.map((timeSlot) => (
          <label key={timeSlot} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={timeSlot}
              checked={formData.preferredTime.includes(timeSlot)}
              onChange={() => toggleTimeSlot(timeSlot)}
              className="mr-2"
            />
            {timeSlot}
          </label>
        ))}
      </div>
      <select
        value={formData.frequency}
        onChange={(e) => updateFields({ frequency: e.target.value as FormData["frequency"] })}
        className="w-full p-2 border rounded-md"
      >
        <option value="weekly">Weekly</option>
        <option value="biweekly">Bi-weekly</option>
        <option value="monthly">Monthly</option>
        <option value="oneTime">One Time</option>
      </select>
    </div>
  )
}

function Preferences({
  formData,
  updateFields,
}: { formData: FormData; updateFields: (fields: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="pestControl"
          checked={formData.pestControl}
          onChange={(e) => updateFields({ pestControl: e.target.checked })}
          className="mr-2"
        />
        <label htmlFor="pestControl">Pest Control</label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="organicProducts"
          checked={formData.organicProducts}
          onChange={(e) => updateFields({ organicProducts: e.target.checked })}
          className="mr-2"
        />
        <label htmlFor="organicProducts">Organic Products</label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="petFriendly"
          checked={formData.petFriendly}
          onChange={(e) => updateFields({ petFriendly: e.target.checked })}
          className="mr-2"
        />
        <label htmlFor="petFriendly">Pet Friendly</label>
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Notification Preferences</p>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="email"
              checked={formData.notifications.includes("email")}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...formData.notifications, "email"]
                  : formData.notifications.filter((n) => n !== "email")
                updateFields({ notifications: updated })
              }}
              className="mr-2"
            />
            Email
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="sms"
              checked={formData.notifications.includes("sms")}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...formData.notifications, "sms"]
                  : formData.notifications.filter((n) => n !== "sms")
                updateFields({ notifications: updated })
              }}
              className="mr-2"
            />
            SMS
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="app"
              checked={formData.notifications.includes("app")}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...formData.notifications, "app"]
                  : formData.notifications.filter((n) => n !== "app")
                updateFields({ notifications: updated })
              }}
              className="mr-2"
            />
            App
          </label>
        </div>
      </div>
      <Textarea
        placeholder="Special Instructions"
        value={formData.specialInstructions}
        onChange={(e) => updateFields({ specialInstructions: e.target.value })}
      />
    </div>
  )
}

function BillingInfo({
  formData,
  updateFields,
}: { formData: FormData; updateFields: (fields: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Payment Method</p>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="credit"
              checked={formData.paymentMethod === "credit"}
              onChange={(e) => updateFields({ paymentMethod: "credit" })}
              className="mr-2"
            />
            Credit Card
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="debit"
              checked={formData.paymentMethod === "debit"}
              onChange={(e) => updateFields({ paymentMethod: "debit" })}
              className="mr-2"
            />
            Debit Card
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={formData.paymentMethod === "bank"}
              onChange={(e) => updateFields({ paymentMethod: "bank" })}
              className="mr-2"
            />
            Bank Transfer
          </label>
        </div>
      </div>
      {formData.paymentMethod === "credit" && (
        <>
          <Input
            type="text"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={(e) => updateFields({ cardNumber: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={(e) => updateFields({ expiryDate: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="CVV"
              value={formData.cvv}
              onChange={(e) => updateFields({ cvv: e.target.value })}
              required
            />
          </div>
        </>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="sameAsService"
          checked={formData.billingAddress.sameAsService}
          onChange={(e) =>
            updateFields({ billingAddress: { ...formData.billingAddress, sameAsService: e.target.checked } })
          }
          className="mr-2"
        />
        <label htmlFor="sameAsService">Billing address same as service address</label>
      </div>
      {!formData.billingAddress.sameAsService && (
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Street Address"
            value={formData.billingAddress.street || ""}
            onChange={(e) => updateFields({ billingAddress: { ...formData.billingAddress, street: e.target.value } })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="City"
              value={formData.billingAddress.city || ""}
              onChange={(e) => updateFields({ billingAddress: { ...formData.billingAddress, city: e.target.value } })}
              required
            />
            <Input
              type="text"
              placeholder="State"
              value={formData.billingAddress.state || ""}
              onChange={(e) => updateFields({ billingAddress: { ...formData.billingAddress, state: e.target.value } })}
              required
            />
          </div>
          <Input
            type="text"
            placeholder="ZIP Code"
            value={formData.billingAddress.zip || ""}
            onChange={(e) => updateFields({ billingAddress: { ...formData.billingAddress, zip: e.target.value } })}
            required
          />
        </div>
      )}
    </div>
  )
}

