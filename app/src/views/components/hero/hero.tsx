export type HeroProps = Partial<{
  title: string,
  subtitle: string, 
}>


export const defaultProps: HeroProps = {
  title: 'Landscaping Services',
  subtitle: 'We provide professional landscaping services for residential and commercial properties.'
} as const  

export function Hero(props: HeroProps) {

  const { title, subtitle } = props; 

    return (
      
          <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-thin mb-6 text-green-700 dark:text-green-400">
             {title ? title : defaultProps.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {subtitle ?  subtitle: defaultProps.subtitle}
            </p>
          </div>
        </section>
    )
}

Hero.defaultProps = defaultProps; 
