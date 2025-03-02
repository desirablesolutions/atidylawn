"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1502685104226-e9b3b1c1c1c1",
    description: "John has over 15 years of experience in landscaping and lawn care.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1502767086633-1c4c1c1c1c1c",
    description: "Jane ensures that all operations run smoothly and efficiently.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1502767086633-1c4c1c1c1c1c",
    description: "Mike specializes in creating beautiful and functional outdoor spaces.",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Customer Relations",
    image: "https://images.unsplash.com/photo-1502767086633-1c4c1c1c1c1c",
    description: "Emily is dedicated to providing excellent customer service and support.",
  },
]

export const TeamSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-medium text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-4">
                <div className="relative h-32 w-32 mx-auto mb-4">
                  <Avatar>
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-sm mt-2">{member.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

