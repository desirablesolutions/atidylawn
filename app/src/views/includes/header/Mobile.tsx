import { useState } from "react"
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react"
import { useTheme } from "@/views/components/theme-context"
import { NAV_LINKS } from "@/controllers/lib/constants"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link



export function Mobile() {

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    return (
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
    )
}