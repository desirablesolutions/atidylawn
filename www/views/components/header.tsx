"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Home,
  Flower2,
  Scissors,
  Sprout,
  Phone,
  Info,
  ShoppingCart,
  UserCircle,
  FileText,
  Calendar,
  BookOpen,
  Users,
  MessageSquare,
  PenToolIcon,
  Droplets,
  TreePine,
  HelpCircle,
  MapPin,
  Send,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import CartModal from "@/components/cart-modal"
import { ThemeToggle } from "@/components/theme-toggle"

// Add imports for new components
import SearchModal from "@/components/modals/search-modal"
import ProfileModal from "@/components/modals/profile-modal"
import NotificationsModal from "@/components/modals/notifications-modal"

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    description: "Return to the homepage",
  },
  {
    title: "Services",
    href: "/services",
    icon: Scissors,
    description: "Explore our lawn care services",
    dropdown: [
      { title: "Lawn Maintenance", href: "/services/lawn-maintenance", icon: PenToolIcon },
      { title: "Landscaping", href: "/services/landscaping", icon: PenToolIcon },
      { title: "Irrigation Systems", href: "/services/irrigation", icon: Droplets },
      { title: "Tree & Shrub Care", href: "/services/tree-shrub-care", icon: TreePine },
    ],
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
    description: "Learn about our company",
    dropdown: [
      { title: "Our Story", href: "/about/story", icon: BookOpen },
      { title: "Our Team", href: "/about/team", icon: Users },
      { title: "Testimonials", href: "/about/testimonials", icon: MessageSquare },
    ],
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    icon: Flower2,
    description: "View our recent projects",
  },
  {
    title: "Resources",
    href: "/resources",
    icon: Sprout,
    description: "Lawn care tips and guides",
    dropdown: [
      { title: "Lawn Care Tips", href: "/resources/tips", icon: HelpCircle },
      { title: "Seasonal Guides", href: "/resources/guides", icon: Calendar },
      { title: "FAQs", href: "/resources/faqs", icon: FileText },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Phone,
    description: "Get in touch with us",
  },
]

// Quick Action Modals Content
const QuickContactForm = () => (
  <form className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Your name" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Your email" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="How can we help?" />
    </div>
    <Button type="submit" className="w-full">
      Send Message
      <Send className="ml-2 h-4 w-4" />
    </Button>
  </form>
)

const QuickSchedule = () => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="service">Service Type</Label>
      <select id="service" className="w-full p-2 border rounded-md">
        <option>Lawn Maintenance</option>
        <option>Landscaping</option>
        <option>Irrigation</option>
        <option>Tree Care</option>
      </select>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="date">Preferred Date</Label>
        <Input id="date" type="date" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="time">Preferred Time</Label>
        <select id="time" className="w-full p-2 border rounded-md">
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </div>
    </div>
    <Button className="w-full">
      Schedule Now
      <Calendar className="ml-2 h-4 w-4" />
    </Button>
  </div>
)

const QuickEstimate = () => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="property-size">Property Size (sq ft)</Label>
      <Input id="property-size" type="number" placeholder="Enter size" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <div className="flex gap-2">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <Input id="location" placeholder="Enter your zip code" />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="frequency">Service Frequency</Label>
      <select id="frequency" className="w-full p-2 border rounded-md">
        <option>Weekly</option>
        <option>Bi-Weekly</option>
        <option>Monthly</option>
      </select>
    </div>
    <Button className="w-full">
      Get Estimate
      <FileText className="ml-2 h-4 w-4" />
    </Button>
  </div>
)

const notifications = [
  {
    id: 1,
    title: "Spring Special Offer",
    description: "Get 20% off on spring cleanup services",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    title: "New Service Available",
    description: "Try our new garden design consultation",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 3,
    title: "Appointment Reminder",
    description: "Your lawn service is scheduled for tomorrow",
    time: "2 days ago",
    unread: false,
  },
]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [modals, setModals] = useState({
    search: false,
    profile: false,
    cart: false,
    notifications: false,
  })
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const [cartCount, setCartCount] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setModals((prev) => ({ ...prev, search: true }))
      }
      // Escape to close all modals
      if (e.key === "Escape") {
        setModals({
          search: false,
          profile: false,
          cart: false,
          notifications: false,
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const toggleModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }))
  }

  if (!mounted) return null

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
              >
                <Scissors
                  className={`h-6 w-6 transition-colors duration-300 ${isScrolled ? "text-primary" : "text-white"}`}
                />
              </motion.div>
              <span
                className={`text-base font-medium whitespace-nowrap transition-colors duration-300 ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                A Tidy Lawn
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.title} className="relative group">
                  {item.dropdown ? (
                    <div className="flex items-center">
                      <button
                        className={`px-2 py-1.5 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground flex items-center transition-colors duration-300 ${
                          isScrolled ? "text-foreground" : "text-white"
                        }`}
                      >
                        <item.icon
                          className={`h-4 w-4 mr-1.5 transition-colors duration-300 ${
                            isScrolled ? "text-primary" : "text-white"
                          }`}
                        />
                        {item.title}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                      <div className="absolute top-full left-0 mt-1 w-64 hidden group-hover:block">
                        <div className="bg-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="p-4 border-b">
                            <div className="flex items-center">
                              <item.icon className="h-5 w-5 text-primary" />
                              <div className="ml-3">
                                <p className="text-sm font-medium text-foreground">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          </div>
                          <div className="py-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                              >
                                <subItem.icon className="h-4 w-4 mr-2 text-primary" />
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-2 py-1.5 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground flex items-center transition-colors duration-300 ${
                        isScrolled ? "text-foreground" : "text-white"
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 mr-1.5 transition-colors duration-300 ${
                          isScrolled ? "text-primary" : "text-white"
                        }`}
                      />
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="sm"
                className={`transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
                onClick={() => toggleModal("search")}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
                <kbd className="ml-2 hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className={`transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
                onClick={() => toggleModal("notifications")}
              >
                <div className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
                </div>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className={`relative transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
                onClick={() => toggleModal("cart")}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Cart</span>
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>

              {/* Profile */}
              <Button
                variant="ghost"
                size="sm"
                className={`transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
                onClick={() => toggleModal("profile")}
              >
                <UserCircle className="h-4 w-4" />
                <span className="sr-only">Profile</span>
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle isScrolled={isScrolled} />

              {/* Book Now Button */}
              <Button
                size="sm"
                className="hidden md:flex bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
              >
                Book Now
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`md:hidden transition-colors duration-300 ${
                      isScrolled ? "text-foreground" : "text-white"
                    }`}
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between border-b pb-4">
                      <Link href="/" className="flex items-center space-x-2">
                        <Scissors className="h-6 w-6 text-primary" />
                        <span className="text-lg font-bold">A Tidy Lawn</span>
                      </Link>
                      <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                      </SheetClose>
                    </div>

                    <nav className="flex-1 py-4">
                      <ul className="space-y-2">
                        {navItems.map((item) => (
                          <li key={item.title}>
                            {item.dropdown ? (
                              <div className="space-y-2">
                                <div className="flex items-center px-2 py-2 rounded-md hover:bg-accent">
                                  <item.icon className="h-5 w-5 text-primary mr-3" />
                                  <span className="font-medium">{item.title}</span>
                                </div>
                                <ul className="pl-10 space-y-1">
                                  {item.dropdown.map((subItem) => (
                                    <li key={subItem.title}>
                                      <Link
                                        href={subItem.href}
                                        className="flex items-center px-2 py-1 text-sm rounded-md hover:bg-accent"
                                      >
                                        <subItem.icon className="h-4 w-4 text-primary mr-2" />
                                        {subItem.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <Link href={item.href} className="flex items-center px-2 py-2 rounded-md hover:bg-accent">
                                <item.icon className="h-5 w-5 text-primary mr-3" />
                                <span className="font-medium">{item.title}</span>
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <div className="border-t pt-4">
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Add Modals */}
      <AnimatePresence>
        {/* Search Modal */}
        <SearchModal isOpen={modals.search} onClose={() => toggleModal("search")} searchInputRef={searchInputRef} />

        {/* Profile Modal */}
        <ProfileModal isOpen={modals.profile} onClose={() => toggleModal("profile")} />

        {/* Cart Modal */}
        <CartModal isOpen={modals.cart} onClose={() => toggleModal("cart")} />

        {/* Notifications Modal */}
        <NotificationsModal isOpen={modals.notifications} onClose={() => toggleModal("notifications")} />
      </AnimatePresence>
    </>
  )
}

