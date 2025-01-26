"use client"

import { useState } from "react"
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react"
import { useTheme } from "@/views/components/theme-context"
import { NAV_LINKS } from "@/controllers/lib/constants"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

type NavLink = {
  name: string
  href: string
}

type NavSection = {
  title: string
  links: NavLink[]
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navLinks = NAV_LINKS as unknown as NavSection[]

  return (
    <header
      className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 
                     border-b border-gray-200/50 dark:border-gray-800/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-thin tracking-wider text-green-700 dark:text-green-400 
                     hover:text-green-600 dark:hover:text-green-300 transition-colors"
          >
            A Tidy Lawn
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((section) => (
                <div
                  key={section.title}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(section.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="flex items-center space-x-1 text-gray-600 hover:text-green-600 
                                   dark:text-gray-300 dark:hover:text-green-400 transition-colors"
                  >
                    <span>{section.title}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === section.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-48 py-2 mt-1 bg-white/90 dark:bg-gray-900/90 
                                 backdrop-blur-md rounded-md shadow-lg border border-gray-200/50 
                                 dark:border-gray-800/50"
                      >
                        {section.links.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-green-600 
                                     hover:bg-gray-50 dark:text-gray-300 dark:hover:text-green-400 
                                     dark:hover:bg-gray-800/50"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </nav>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
          >
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((section) => (
                <div key={section.title} className="py-2">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === section.title ? null : section.title)}
                    className="flex items-center justify-between w-full text-left px-3 py-2 text-base 
                             font-thin text-gray-600 dark:text-gray-300"
                  >
                    <span>{section.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${activeDropdown === section.title ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === section.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4"
                      >
                        {section.links.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 
                                     dark:text-gray-300 dark:hover:text-green-400"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="px-3 py-2">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function ThemeToggle({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-500" />}
    </motion.button>
  )
}

