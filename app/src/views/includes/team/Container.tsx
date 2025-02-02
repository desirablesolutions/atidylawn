export function TeamContainer({ children}: { children: React.ReactNode }) {
    
    const styles = () => ({
        container: 'container mx-auto',
        heading: 'text-4xl font-thin text-center mb-12 text-green-700 dark:text-green-400',
        grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    })


    
    return (
            <section id="team" className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-4xl font-thin text-center mb-12 text-green-700 dark:text-green-400">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {children}
              </div>
            </div>
          </section>
    )
}