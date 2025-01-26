export type Theme = "light" | "dark"

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  price: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

export interface FormData {
  name: string
  email: string
  service: string
  message: string
}

