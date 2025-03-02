"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Award, Users, Calendar, Leaf, UserCheck } from "lucide-react"

const features = [
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Timely Service",
    description: "We value your time and always arrive on schedule for all appointments and services.",
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Licensed & Insured",
    description: "Our team is fully licensed and insured, providing you with peace of mind and protection.",
  },
  {
    icon: <UserCheck className="h-10 w-10 text-primary" />,
    title: "Expert Care",
    description: "Our specialists have years of experience and training in lawn care and landscaping.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Dedicated Team",
    description: "A consistent team of professionals who understand your property's specific needs.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Flexible Scheduling",
    description: "We work around your schedule to provide convenient service times.",
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary" />,
    title: "Eco-Friendly",
    description: "Environmentally responsible practices and products that are safe for your family and pets.",
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GreenScape</h2>
          <p className="text-lg text-muted-foreground">
            We deliver exceptional lawn care and landscaping services with a focus on quality, reliability, and customer
            satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card hover:bg-accent/10 rounded-xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="mb-4 p-3 bg-primary/10 inline-block rounded-lg">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

