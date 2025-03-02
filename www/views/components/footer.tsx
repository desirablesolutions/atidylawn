"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Leaf,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle,
  Send,
  Scissors,
  TreesIcon as Tree,
  Sprout,
  Droplets,
  PenToolIcon as Tool,
  Home,
  FileText,
  BookOpen,
  Users,
  HelpCircle,
  Star,
  Shield,
  Zap,
  Truck,
  Sparkles,
  MessageCircle,
  BarChart,
  ThumbsUp,
  Globe,
  Lightbulb,
  Database,
  Code2,
  Puzzle,
  Activity,
  Building2,
  Handshake,
  Building,
  FileCodeIcon as FileContract,
  BarChartIcon as ChartBar,
  PresentationIcon as PresentationChart,
  Lock,
  Eye,
  Map,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Add the import at the top of the file
import FooterHero from "@/components/footer-hero"

const iconAnimation = {
  rest: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

const linkAnimation = {
  rest: {
    x: 0,
  },
  hover: {
    x: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

interface FooterLinkProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}

const FooterLink = ({ href, icon, children }: FooterLinkProps) => (
  <motion.div initial="rest" whileHover="hover" animate="rest">
    <Link href={href} className="footer-link group">
      <motion.div
        variants={{
          rest: { scale: 1, rotate: 0 },
          hover: { scale: 1.2, rotate: 10 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="footer-icon-wrapper"
      >
        {icon}
      </motion.div>
      <motion.span
        variants={{
          rest: { x: 0, opacity: 0.7 },
          hover: { x: 10, opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {children}
      </motion.span>
    </Link>
  </motion.div>
)

// Mock FooterHero component
// const FooterHero = () => (
//   <div className="bg-primary text-white py-12 text-center">
//     <h2 className="text-3xl font-semibold">Footer Hero Section</h2>
//     <p className="mt-4">This is a placeholder for the FooterHero component.</p>
//   </div>
// );

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const footerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  // Update the useEffect section
  useEffect(() => {
    const isComponentMounted = true

    // Initialize email subscription state
    if (email && !isSubscribed) {
      setIsSubscribed(false)
      setEmail("")
    }

    // Initialize IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        if (isComponentMounted && entries[0].isIntersecting) {
          // Safe state update after mount
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    // Cleanup function
    return () => {
      observer.disconnect()
    }
  }, [email, isSubscribed]) // Empty dependency array since we only want this to run once on mount

  // Update the handleSubscribe function
  const handleSubscribe = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (email) {
        setIsSubscribed(true)
        setEmail("")
      }
    },
    [email],
  )

  // Update the isInView usage
  const isInViewCheck = useInView(footerRef, {
    once: true,
    amount: 0.1,
    fallback: true, // Provide a fallback value for SSR
  })

  const b2bLinks = [
    {
      icon: Building2,
      href: "/b2b/solutions",
      label: "Business Solutions",
    },
    {
      icon: Handshake,
      href: "/b2b/partnerships",
      label: "Partnership Program",
    },
    {
      icon: Building,
      href: "/b2b/commercial",
      label: "Commercial Services",
    },
    {
      icon: Users,
      href: "/b2b/property-managers",
      label: "Property Managers",
    },
    {
      icon: FileContract,
      href: "/b2b/contracts",
      label: "Service Contracts",
    },
    {
      icon: ChartBar,
      href: "/b2b/case-studies",
      label: "Success Stories",
    },
    {
      icon: PresentationChart,
      href: "/b2b/roi-calculator",
      label: "ROI Calculator",
    },
  ]

  return (
    <footer ref={footerRef} className="bg-background">
      <FooterHero />
      <div className="border-t pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Update the footer grid to include B2B section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* Company Info & Newsletter - spans 3 columns */}
            <div className="md:col-span-3 space-y-8">
              {/* Update the logo section in the footer */}
              <Link href="/" className="flex items-center space-x-2">
                <Scissors className="h-6 w-6 stroke-[1.5] text-primary" />
                <span className="text-2xl font-normal">A Tidy Lawn</span>
              </Link>

              <p className="text-muted-foreground text-lg font-light leading-relaxed">
                Your comprehensive resource for professional landscaping, lawn care, and outdoor living solutions.
                Transform your space with expert guidance and services.
              </p>

              <div className="space-y-6">
                <h4 className="text-base font-medium">Get Expert Tips & Updates</h4>
                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center p-4 bg-primary/10 rounded-lg text-primary"
                  >
                    <CheckCircle className="h-5 w-5 stroke-[1.5] mr-2" />
                    <span>Thank you for subscribing!</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-background pl-10"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 stroke-[1.5] text-muted-foreground" />
                    </div>
                    <Button type="submit" className="w-full group">
                      Subscribe for Updates
                      <Send className="ml-2 h-4 w-4 stroke-[1.5] transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-medium">Connect With Us</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Instagram, href: "#" },
                    { icon: Youtube, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="social-icon"
                      whileHover={{ y: -3, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <social.icon className="h-full w-full stroke-[1.5]" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Links Grid - spans 9 columns */}
            <div className="md:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Column 1: Services & Resources */}
                <div className="space-y-8">
                  {/* Professional Services */}
                  <div className="space-y-6">
                    <h4 className="text-base font-medium flex items-center">
                      <Scissors className="h-5 w-5 stroke-[1.5] text-primary mr-2" />
                      Professional Services
                    </h4>
                    <ul className="space-y-3">
                      <FooterLink href="/services/lawn-care" icon={<Sprout className="h-4 w-4 stroke-[1.5]" />}>
                        Lawn Care & Maintenance
                      </FooterLink>
                      <FooterLink href="/services/landscaping" icon={<Tool className="h-4 w-4 stroke-[1.5]" />}>
                        Landscape Design
                      </FooterLink>
                      <FooterLink href="/services/irrigation" icon={<Droplets className="h-4 w-4 stroke-[1.5]" />}>
                        Irrigation Systems
                      </FooterLink>
                      <FooterLink href="/services/tree-care" icon={<Tree className="h-4 w-4 stroke-[1.5]" />}>
                        Tree & Shrub Care
                      </FooterLink>
                    </ul>
                  </div>

                  {/* Resources & Learning */}
                  <div className="space-y-6">
                    <h4 className="text-base font-medium flex items-center">
                      <BookOpen className="h-5 w-5 stroke-[1.5] text-primary mr-2" />
                      Resources
                    </h4>
                    <ul className="space-y-3">
                      <FooterLink href="/resources/guides" icon={<FileText className="h-4 w-4 stroke-[1.5]" />}>
                        Care Guides
                      </FooterLink>
                      <FooterLink href="/resources/blog" icon={<Lightbulb className="h-4 w-4 stroke-[1.5]" />}>
                        Expert Blog
                      </FooterLink>
                      <FooterLink href="/resources/calculator" icon={<BarChart className="h-4 w-4 stroke-[1.5]" />}>
                        Cost Calculator
                      </FooterLink>
                    </ul>
                  </div>
                </div>

                {/* Column 2: Company & Support */}
                <div className="space-y-8">
                  {/* Company Info */}
                  <div className="space-y-6">
                    <h4 className="text-base font-medium flex items-center">
                      <Home className="h-5 w-5 stroke-[1.5] text-primary mr-2" />
                      Company
                    </h4>
                    <ul className="space-y-3">
                      <FooterLink href="/about" icon={<Users className="h-4 w-4 stroke-[1.5]" />}>
                        About Us
                      </FooterLink>
                      <FooterLink href="/careers" icon={<Sparkles className="h-4 w-4 stroke-[1.5]" />}>
                        Careers
                      </FooterLink>
                      <FooterLink href="/contact" icon={<MessageCircle className="h-4 w-4 stroke-[1.5]" />}>
                        Contact
                      </FooterLink>
                      <FooterLink href="/sustainability" icon={<Globe className="h-4 w-4 stroke-[1.5]" />}>
                        Sustainability
                      </FooterLink>
                    </ul>
                  </div>

                  {/* Support */}
                  <div className="space-y-6">
                    <h4 className="text-base font-medium flex items-center">
                      <HelpCircle className="h-5 w-5 stroke-[1.5] text-primary mr-2" />
                      Support
                    </h4>
                    <ul className="space-y-3">
                      <FooterLink href="/support" icon={<HelpCircle className="h-4 w-4 stroke-[1.5]" />}>
                        Help Center
                      </FooterLink>
                      <FooterLink href="/reviews" icon={<Star className="h-4 w-4 stroke-[1.5]" />}>
                        Reviews
                      </FooterLink>
                      <FooterLink href="/faq" icon={<FileText className="h-4 w-4 stroke-[1.5]" />}>
                        FAQs
                      </FooterLink>
                    </ul>
                  </div>
                </div>

                {/* Column 3: B2B & Technical */}
                <div className="space-y-8">
                  {/* B2B & Partnerships */}
                  <div className="space-y-6">
                    <h4 className="text-base font-medium flex items-center">
                      <Building2 className="h-5 w-5 stroke-[1.5] text-primary mr-2" />
                      Business Solutions
                    </h4>
                    <ul className="space-y-3">
                      <FooterLink href="/b2b/solutions" icon={<Building2 className="h-4 w-4 stroke-[1.5]" />}>
                        Enterprise Services
                      </FooterLink>
                      <FooterLink href="/b2b/partnerships" icon={<Handshake className="h-4 w-4 stroke-[1.5]" />}>
                        Partner Program
                      </FooterLink>
                      <FooterLink href="/b2b/commercial" icon={<Building className="h-4 w-4 stroke-[1.5]" />}>
                        Commercial Services
                      </FooterLink>
                      <FooterLink href="/b2b/case-studies" icon={<ChartBar className="h-4 w-4 stroke-[1.5]" />}>
                        Success Stories
                      </FooterLink>
                    </ul>
                  </div>

                  {/* Technical */}
                  <div className="space-y-6">
                    <h4 className="text-base font-medium flex items-center">
                      <Database className="h-5 w-5 stroke-[1.5] text-primary mr-2" />
                      Technical
                    </h4>
                    <ul className="space-y-3">
                      <FooterLink href="/technical/api" icon={<Code2 className="h-4 w-4 stroke-[1.5]" />}>
                        API Access
                      </FooterLink>
                      <FooterLink href="/technical/integrations" icon={<Puzzle className="h-4 w-4 stroke-[1.5]" />}>
                        Integrations
                      </FooterLink>
                      <FooterLink href="/technical/status" icon={<Activity className="h-4 w-4 stroke-[1.5]" />}>
                        System Status
                      </FooterLink>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 pt-8 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Licensed & Insured",
                  description: "Full coverage for your peace of mind",
                },
                {
                  icon: Zap,
                  title: "Fast Response",
                  description: "Quick quotes and service scheduling",
                },
                {
                  icon: ThumbsUp,
                  title: "Satisfaction Guaranteed",
                  description: "100% satisfaction on all services",
                },
                {
                  icon: Truck,
                  title: "Service Coverage",
                  description: "Serving all metropolitan areas",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-primary/10 p-2 rounded-full">
                    <feature.icon className="h-5 w-5 stroke-[1.5] text-primary" />
                  </div>
                  <div>
                    <h5 className="font-medium">{feature.title}</h5>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-16 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <Leaf className="h-5 w-5 stroke-[1.5] text-primary" />
                {/* Update the copyright section */}
                <span className="text-xs text-muted-foreground">
                  &copy; {new Date().getFullYear()} A Tidy Lawn. All rights reserved.
                </span>
              </div>

              {/* Update the bottom links section to be more compact */}
              <div className="flex items-center divide-x divide-border">
                {[
                  { href: "/terms", label: "Terms", icon: FileText },
                  { href: "/privacy", label: "Privacy", icon: Shield },
                  { href: "/cookies", label: "Cookies", icon: Lock },
                  { href: "/accessibility", label: "Accessibility", icon: Eye },
                  { href: "/sitemap", label: "Sitemap", icon: Map },
                ].map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-xs px-3 hover:text-primary transition-colors inline-flex items-center gap-1.5 whitespace-nowrap first:pl-0 last:pr-0"
                  >
                    <link.icon className="h-3 w-3" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Remove the emergency contact section */}
        </div>
      </div>
    </footer>
  )
}

