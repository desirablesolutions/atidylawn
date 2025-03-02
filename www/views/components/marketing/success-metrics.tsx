"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, Users, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CounterProps {
  end: number
  duration: number
  suffix?: string
}

const Counter = ({ end, duration, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = timestamp - startTimeRef.current

      if (progress < duration) {
        countRef.current = Math.min(end, Math.floor((progress / duration) * end))
        setCount(countRef.current)
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      startTimeRef.current = null
    }
  }, [end, duration])

  return (
    <span className="text-4xl font-serif font-medium">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const metrics = [
  {
    icon: Users,
    metric: <Counter end={5000} duration={2000} suffix="+" />,
    label: "Happy Clients",
    description: "Trusted by homeowners and businesses",
  },
  {
    icon: Star,
    metric: <Counter end={4.9} duration={2000} />,
    label: "Customer Rating",
    description: "Based on 10,000+ reviews",
  },
  {
    icon: ThumbsUp,
    metric: <Counter end={98} duration={2000} suffix="%" />,
    label: "Satisfaction Rate",
    description: "Consistently exceeding expectations",
  },
  {
    icon: Trophy,
    metric: <Counter end={25} duration={2000} />,
    label: "Industry Awards",
    description: "Recognition for excellence",
  },
]

export default function SuccessMetrics() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-medium mb-4">Our Impact in Numbers</h2>
          <p className="text-lg text-muted-foreground">
            Delivering exceptional results and creating beautiful outdoor spaces for our valued clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mb-4 mx-auto p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                    <item.icon className="h-8 w-8 stroke-[1.5] text-primary" />
                  </div>
                  <div className="mb-2">{item.metric}</div>
                  <h3 className="text-xl font-serif font-medium mb-2">{item.label}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

