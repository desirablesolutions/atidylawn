"use client"

import { useState } from "react"
import { submitToNotion } from "@/models/lib/notion"
import { Button } from "@/views/elements/button"
import { Input } from "@/views/elements/input"
import { Textarea } from "@/views/elements/textarea"
import { SERVICES } from "@/models/lib/constants"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    }

    const result = await submitToNotion(data)

    if (result.success) {
      setMessage("Thank you for your message! We'll be in touch soon.")
      e.currentTarget.reset()
    } else {
      setMessage("There was an error submitting your message. Please try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Input
          required
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border-green-700/20 focus:border-green-600 dark:border-green-400/20 
                   dark:focus:border-green-400"
        />
      </div>
      <div>
        <Input
          required
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full border-green-700/20 focus:border-green-600 dark:border-green-400/20 
                   dark:focus:border-green-400"
        />
      </div>
      <div>
        <select
          required
          name="service"
          className="w-full p-2 border rounded-md border-green-700/20 focus:border-green-600 
                   dark:border-green-400/20 dark:focus:border-green-400 bg-transparent"
        >
          <option value="">Select a Service</option>
          {SERVICES.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Textarea
          required
          name="message"
          placeholder="Your Message"
          className="w-full border-green-700/20 focus:border-green-600 dark:border-green-400/20 
                   dark:focus:border-green-400"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-700 hover:bg-green-600 text-white dark:bg-green-600 
                 dark:hover:bg-green-500"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      {message && <p className="text-center text-sm text-gray-600 dark:text-gray-400">{message}</p>}
    </form>
  )
}

