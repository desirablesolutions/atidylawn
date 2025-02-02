export const SITE_VERSION = "1.0.0"

export const SERVICES = [
  {
    id: "1",
    title: "Lawn Maintenance",
    description: "Regular mowing, edging, and maintenance for a perfectly manicured lawn",
    icon: "grass",
    price: "From $50/visit",
  },
  {
    id: "2",
    title: "Landscape Design",
    description: "Custom landscape design and implementation for your dream outdoor space",
    icon: "flower",
    price: "From $500",
  },
  {
    id: "3",
    title: "Tree Service",
    description: "Professional tree trimming, removal, and maintenance services",
    icon: "tree",
    price: "From $200",
  },
  {
    id: "4",
    title: "Irrigation Systems",
    description: "Installation and maintenance of efficient irrigation systems",
    icon: "droplet",
    price: "From $300",
  },
]

export const TEAM_MEMBERS = [
  {
    id: "1",
    name: "Joshua Desir",
    role: "Lead Landscaper",
    image: "/placeholder.svg?height=400&width=400",
    bio: "15 years of experience in landscape design and maintenance",
    specialties: ["Design", "Installation", "Maintenance"],
    certifications: ["Landscaper"],
  },
  {
    id: "2",
    name: "Jeffrey Desir",
    role: "Contributor",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Award-winning landscape designer with a focus on sustainable practices",
    specialties: ["Sustainable Design", "Native Plants", "Water Conservation"],
    certifications: ["IT Certified", "Ecological Landscaping"],
  },
  {
    id: "3",
    name: "J.A.R.V.E.I.S",
    role: "AGI",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Expert in plant health and organic gardening methods",
    specialties: ["Plant Care", "Organic Methods", "Disease Management"],
    certifications: ["Master Gardener", "Plant Health Care Specialist"],
  },
\
]

export const ARTICLES = [
  {
    id: "1",
    title: "Spring Lawn Care Tips",
    excerpt: "Essential tips for preparing your lawn for the spring season",
    image: "/placeholder.svg?height=200&width=300",
    author: "John Smith",
    date: "2024-01-15",
    category: "Seasonal Care",
  },
  {
    id: "2",
    title: "Water Conservation Guide",
    excerpt: "How to maintain a beautiful lawn while saving water",
    image: "/placeholder.svg?height=200&width=300",
    author: "Sarah Johnson",
    date: "2024-01-10",
    category: "Sustainability",
  },
  {
    id: "3",
    title: "Natural Pest Control",
    excerpt: "Eco-friendly solutions for common lawn pests",
    image: "/placeholder.svg?height=200&width=300",
    author: "Mike Wilson",
    date: "2024-01-05",
    category: "Maintenance",
  },
]

export const PRODUCTS = [
  {
    id: "1",
    name: "Organic Lawn Fertilizer",
    description: "All-natural fertilizer for healthy grass growth",
    price: "$29.99",
    image: "/placeholder.svg?height=200&width=200",
    category: "Fertilizers",
  },
  {
    id: "2",
    name: "Premium Grass Seed Mix",
    description: "Blend of high-quality grass seeds for your climate",
    price: "$24.99",
    image: "/placeholder.svg?height=200&width=200",
    category: "Seeds",
  },
  {
    id: "3",
    name: "Smart Sprinkler Controller",
    description: "WiFi-enabled sprinkler system for optimal watering",
    price: "$149.99",
    image: "/placeholder.svg?height=200&width=200",
    category: "Equipment",
  },
]

export const NAV_LINKS = [
  {
    title: "Services",
    links: [
      { name: "Lawn Maintenance", href: "#services" },
      { name: "Landscape Design", href: "#services" },
      { name: "Tree Service", href: "#services" },
      { name: "Irrigation", href: "#services" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "Our Team", href: "#team" },
      { name: "Company History", href: "#about" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "Careers", href: "#careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "#blog" },
      { name: "Care Guides", href: "#guides" },
      { name: "FAQ", href: "#faq" },
      { name: "Products", href: "#products" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Get Quote", href: "#contact" },
      { name: "Support", href: "#support" },
      { name: "Emergency", href: "#emergency" },
      { name: "Locations", href: "#locations" },
    ],
  },
] as const

