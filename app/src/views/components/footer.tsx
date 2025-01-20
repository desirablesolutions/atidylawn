"use client"

import { motion } from "framer-motion"
import { ARTICLES, PRODUCTS, SERVICES, TEAM_MEMBERS, SITE_VERSION } from "@/models/lib/constants"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  RssIcon as RSS,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-thin text-green-700 dark:text-green-400">A Tidy Lawn</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your premier destination for professional landscaping services and sustainable outdoor solutions.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-thin text-green-700 dark:text-green-400">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">contact@atidylawn.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">1-800-TIDY-LAWN</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">123 Garden Street, Green City, ST 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Mon-Fri: 8am-6pm, Sat: 9am-4pm</span>
              </div>
            </div>
          </div>

          {/* Latest Articles */}
          <div className="space-y-4">
            <h3 className="text-lg font-thin text-green-700 dark:text-green-400">Latest Articles</h3>
            <div className="space-y-4">
              {ARTICLES.slice(0, 3).map((article) => (
                <motion.a key={article.id} href="#" className="flex items-start space-x-3 group" whileHover={{ x: 5 }}>
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{article.date}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-thin text-green-700 dark:text-green-400">Featured Products</h3>
            <div className="space-y-4">
              {PRODUCTS.slice(0, 3).map((product) => (
                <motion.a key={product.id} href="#" className="flex items-center space-x-3 group" whileHover={{ x: 5 }}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400">
                      {product.name}
                    </h4>
                    <p className="text-xs text-green-600 dark:text-green-400">{product.price}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-b border-gray-200/50 dark:border-gray-700/50 py-8 my-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-thin text-green-700 dark:text-green-400 mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get the latest landscaping tips, product updates, and exclusive offers delivered to your inbox.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-gray-200/50 dark:border-gray-700/50 
                         bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-green-500"
              />
              <motion.button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 
                         dark:bg-green-500 dark:hover:bg-green-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Services</h4>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-600 dark:text-gray-400 
                             dark:hover:text-green-400 flex items-center space-x-1 group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Blog", "Care Guides", "FAQ", "Videos", "Testimonials"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-600 dark:text-gray-400 
                             dark:hover:text-green-400 flex items-center space-x-1 group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Team", "Careers", "Partners", "Sustainability"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-600 dark:text-gray-400 
                             dark:hover:text-green-400 flex items-center space-x-1 group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-600 dark:text-gray-400 
                             dark:hover:text-green-400 flex items-center space-x-1 group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} A Tidy Lawn. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Version {SITE_VERSION}</span>
              <Link href="/rss" className="text-gray-400 hover:text-green-500 dark:hover:text-green-400">
                <RSS className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

