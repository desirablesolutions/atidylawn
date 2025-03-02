"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Coins, ArrowUpRight, ArrowDownRight, Users, Lock, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const tokenData = [
  { date: "Jan", price: 1.2 },
  { date: "Feb", price: 1.5 },
  { date: "Mar", price: 1.8 },
  { date: "Apr", price: 2.1 },
  { date: "May", price: 2.3 },
  { date: "Jun", price: 2.45 },
]

const tokenMetrics = {
  currentPrice: 2.45,
  change24h: 5.2,
  marketCap: 12500000,
  volume24h: 750000,
  circulatingSupply: 5000000,
  totalSupply: 10000000,
}

const tokenUtility = [
  {
    title: "Network Access",
    description: "Stake LAWN tokens to access network features and benefits",
    icon: Lock,
  },
  {
    title: "Governance Rights",
    description: "Participate in network decisions and proposals",
    icon: Users,
  },
  {
    title: "Revenue Sharing",
    description: "Earn a share of network transaction fees",
    icon: Wallet,
  },
  {
    title: "Service Discounts",
    description: "Get reduced fees on network services",
    icon: Coins,
  },
]

interface TokenState {
  mounted: boolean
}

export default function TokenInfo() {
  const isMounted = useRef(false)
  const [state, setState] = useState<TokenState>({
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
    <section id="token" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-4">
                LAWN Token
              </Badge>
              <h2 className="text-4xl font-serif font-medium mb-4">Network Value Token</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                LAWN token powers our landscaping network, providing utility, governance, and value capture for all
                participants.
              </p>
            </motion.div>
          </div>

          {/* Token Price Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-primary" />
                    LAWN/USD
                  </CardTitle>
                  <CardDescription>Token price history</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${tokenMetrics.currentPrice}</div>
                  <div className="flex items-center gap-2">
                    {tokenMetrics.change24h >= 0 ? (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
                        <ArrowUpRight className="h-4 w-4 mr-1" />+{tokenMetrics.change24h}%
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-500/10 text-red-500">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        {tokenMetrics.change24h}%
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">24h</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tokenData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Token Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">Market Cap</div>
                <div className="text-2xl font-bold">${(tokenMetrics.marketCap / 1000000).toFixed(1)}M</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">24h Volume</div>
                <div className="text-2xl font-bold">${(tokenMetrics.volume24h / 1000).toFixed(1)}K</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">Circulating Supply</div>
                <div className="text-2xl font-bold">{(tokenMetrics.circulatingSupply / 1000000).toFixed(1)}M LAWN</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">Total Supply</div>
                <div className="text-2xl font-bold">{(tokenMetrics.totalSupply / 1000000).toFixed(1)}M LAWN</div>
              </CardContent>
            </Card>
          </div>

          {/* Token Utility */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-medium mb-4">Token Utility</h3>
              <p className="text-muted-foreground">How LAWN token powers our network</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tokenUtility.map((utility, index) => (
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
                          <utility.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">{utility.title}</h4>
                          <p className="text-sm text-muted-foreground">{utility.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-medium mb-2">Start Your Network Journey</h3>
                  <p className="text-muted-foreground">Get LAWN tokens to access network benefits and earn rewards</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary text-primary-foreground">
                    Buy LAWN
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    View Documentation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

