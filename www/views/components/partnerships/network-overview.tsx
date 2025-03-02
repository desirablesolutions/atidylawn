"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Network,
  Coins,
  BarChart,
  Globe2,
  Shield,
  Zap,
  ArrowRight,
  Building2,
  Wallet,
  Lock,
  CheckCircle,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sprout, TreesIcon as Plant, TreesIcon as Tree } from "lucide-react"

interface NetworkStats {
  partnersCount: number
  totalValue: number
  activeProjects: number
  networkGrowth: number
  tokenPrice: number
  marketCap: number
}

const networkStats: NetworkStats = {
  partnersCount: 150,
  totalValue: 5000000,
  activeProjects: 1200,
  networkGrowth: 25,
  tokenPrice: 2.45,
  marketCap: 12500000,
}

const partnershipTiers = [
  {
    name: "Seed",
    tokenRequirement: "1,000 LAWN",
    benefits: ["Network Listing", "Basic API Access", "Community Forum Access", "Standard Support"],
    icon: Sprout,
  },
  {
    name: "Growth",
    tokenRequirement: "5,000 LAWN",
    benefits: ["Enhanced Visibility", "Priority API Access", "Lead Sharing", "Premium Support", "Shared Resources"],
    icon: Plant,
  },
  {
    name: "Enterprise",
    tokenRequirement: "25,000 LAWN",
    benefits: [
      "Featured Placement",
      "Unlimited API Access",
      "Revenue Sharing",
      "Dedicated Support",
      "Network Governance",
      "Custom Integration",
    ],
    icon: Tree,
  },
]

interface NetworkState {
  selectedTier: string | null
  mounted: boolean
}

export default function NetworkOverview() {
  const isMounted = useRef(false)
  const [state, setState] = useState<NetworkState>({
    selectedTier: null,
    mounted: false,
  })

  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      setState((prev) => ({ ...prev, mounted: true }))
    }
    return () => {
      isMounted.current = false
    }
  }, [])

  if (!state.mounted) {
    return null
  }

  return (
    <section id="network" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-4">
                Partnership Network
              </Badge>
              <h2 className="text-4xl font-serif font-medium mb-4">Join the Future of Landscaping</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with industry leaders, share resources, and grow your business with our blockchain-powered
                landscaping network.
              </p>
            </motion.div>
          </div>

          {/* Network Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-primary" />
                  Network Partners
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold">{networkStats.partnersCount}</div>
                <Progress value={75} className="h-2" />
                <p className="text-sm text-muted-foreground">Growing at {networkStats.networkGrowth}% monthly</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-primary" />
                  LAWN Token
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold">${networkStats.tokenPrice}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Market Cap: ${(networkStats.marketCap / 1000000).toFixed(1)}M</Badge>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
                    +12.5%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Network Value
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold">${(networkStats.totalValue / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-muted-foreground">{networkStats.activeProjects} Active Projects</div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe2,
                title: "Global Network",
                description: "Connect with partners worldwide and expand your service coverage",
              },
              {
                icon: Shield,
                title: "Verified Partners",
                description: "All network members are vetted and maintain high quality standards",
              },
              {
                icon: Zap,
                title: "Resource Optimization",
                description: "Share equipment and resources to reduce operational costs",
              },
              {
                icon: Wallet,
                title: "Token Economics",
                description: "Earn LAWN tokens through network participation and governance",
              },
              {
                icon: Building2,
                title: "Enterprise Solutions",
                description: "Access large-scale projects and corporate clients",
              },
              {
                icon: Lock,
                title: "Secure Platform",
                description: "Blockchain-powered contracts and secure transactions",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Partnership Tiers */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-medium mb-4">Partnership Tiers</h3>
              <p className="text-muted-foreground">Choose the tier that best fits your business needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnershipTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`relative ${state.selectedTier === tier.name ? "border-primary" : ""}`}>
                    {index === 2 && (
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-secondary text-white">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <tier.icon className="h-5 w-5 text-primary" />
                        {tier.name}
                      </CardTitle>
                      <CardDescription>Required Stake: {tier.tokenRequirement}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" variant={index === 2 ? "default" : "outline"}>
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Apply for {tier.name} Partnership</DialogTitle>
                          </DialogHeader>
                          {/* Add partnership application form here */}
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Network Success</h3>
              <p className="text-muted-foreground">
                Join hundreds of successful landscaping businesses already benefiting from our network.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Partner Satisfaction", value: 95 },
                  { label: "Project Success Rate", value: 98 },
                  { label: "Resource Utilization", value: 85 },
                ].map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.label}</span>
                      <span className="font-medium">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Partner Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "250+ Cross-Network Projects Completed",
                  "$2.5M+ in Shared Resources Savings",
                  "35% Average Revenue Growth",
                  "Expanded Service Coverage by 180%",
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-medium">Ready to Join the Network?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take the first step towards transforming your landscaping business with blockchain technology and network
              effects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white">
                Apply for Partnership
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

