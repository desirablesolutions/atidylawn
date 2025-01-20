export interface ServiceItem {
  id: string
  name: string
  price: number
  description: string
}

export interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  selectedServices: string[]
  totalPrice: number
}

export const services: ServiceItem[] = [
  {
    id: "lawn-mowing",
    name: "Lawn Mowing",
    price: 50,
    description: "Regular lawn mowing service",
  },
  {
    id: "hedge-trimming",
    name: "Hedge Trimming",
    price: 75,
    description: "Professional hedge and shrub trimming",
  },
  {
    id: "leaf-removal",
    name: "Leaf Removal",
    price: 60,
    description: "Complete yard leaf cleanup",
  },
  {
    id: "fertilization",
    name: "Fertilization",
    price: 85,
    description: "Lawn fertilization treatment",
  },
  {
    id: "weed-control",
    name: "Weed Control",
    price: 65,
    description: "Comprehensive weed management",
  },
]

