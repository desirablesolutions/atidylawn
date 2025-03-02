"use client"

import { motion } from "framer-motion"
import { TreesIcon as Plant, Shield, Sun, Droplets, Users, Clock, Award, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: Plant,
    title: "Expert Landscaping",
    description: "Professional design and maintenance by certified experts",
    metric: "15+ Years Experience",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Complete coverage and liability protection for your property",
    metric: "$2M Coverage",
  },
  {
    icon: Sun,
    title: "Sustainable Practices",
    description: "Eco-friendly methods and materials for your landscape",
    metric: "100% Eco-Friendly",
  },
  {
    icon: Droplets,
    title: "Smart Irrigation",
    description: "Water-efficient systems and monitoring",
    metric: "40% Water Savings",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Consistent crew assigned to your property",
    metric: "95% Staff Retention",
  },
  {
    icon: Clock,
    title: "Timely Service",
    description: "Punctual and reliable maintenance schedules",
    metric: "98% On-Time Rate",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "Satisfaction guaranteed on all services",
    metric: "100% Guaranteed",
  },
  {
    icon: Leaf,
    title: "Year-Round Care",
    description: "Comprehensive seasonal maintenance programs",
    metric: "4-Season Service",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function BenefitsShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-medium mb-4">Why Choose GreenScape?</h2>
          <p className="text-lg text-muted-foreground">
            Experience the difference with our comprehensive landscaping solutions and unmatched expertise.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <benefit.icon className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-4">{benefit.description}</p>
                  <div className="text-sm font-medium text-primary">{benefit.metric}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

