"use client"

import { SERVICES, TEAM_MEMBERS, SITE_VERSION } from "@/models/lib/constants"
import { GrapeIcon as Grass, Users, Info, Phone, Flower, TreesIcon as Tree, Droplet } from "lucide-react"
import Image from "next/image"
import { Contact  } from "@/views/includes/contact/contact"

import { MultiStepForm } from "@/views/components/multi-step-form"

const icons = {
  grass: Grass,
  flower: Flower,
  tree: Tree,
  droplet: Droplet,
}

export default function Home() {
  return (
    <>
   
    {/* Hero Section */}
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-thin mb-6 text-green-700 dark:text-green-400">
          Your One-Stop Shop for Perfect Lawns
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Professional landscaping services, products, and expertise - all in one place.
        </p>
      </div>
    </section>

    {/* Services Section */}
    <section id="services" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-4xl font-thin text-center mb-12 text-green-700 dark:text-green-400">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons]
            return (
              <div
                key={service.id}
                className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md 
                         transition-shadow duration-300 border border-transparent hover:border-green-500 
                         dark:hover:border-green-400"
              >
                <Icon className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                <h3 className="text-xl font-thin mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                <p className="text-green-600 dark:text-green-400">{service.price}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>

    {/* Team Section */}
    <section id="team" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-thin text-center mb-12 text-green-700 dark:text-green-400">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md 
                       transition-shadow duration-300"
            >
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-thin mb-2">{member.name}</h3>
              <p className="text-green-600 dark:text-green-400 mb-2">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* About Section */}
    <section id="about" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-4xl font-thin text-center mb-12 text-green-700 dark:text-green-400">
          About A Tidy Lawn
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            A Tidy Lawn is your comprehensive solution for all landscaping needs. We combine expertise, quality
            products, and professional service to transform your outdoor spaces into beautiful, sustainable
            environments.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Our team of experienced professionals is dedicated to providing exceptional service and maintaining the
            highest standards in the industry.
          </p>
        </div>
      </div>
    </section>

  <Contact/>

  </>
  )
}

