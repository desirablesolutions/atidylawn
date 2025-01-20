import { TEAM_MEMBERS } from "@/models/lib/constants"

export function Team() {
    return (
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
                      <img
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
        
    )
}