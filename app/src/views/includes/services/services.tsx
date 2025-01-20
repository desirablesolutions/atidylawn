import { SERVICES } from "@/models/lib/constants"


export function Services() {

    return (
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
    )
}