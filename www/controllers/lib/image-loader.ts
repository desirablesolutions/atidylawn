// Collection of high-quality Unsplash images for different categories
export const images = {
  lawn: [
    "https://images.unsplash.com/photo-1558635924-b60e7f3b4796?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592722212832-f7219ea510da?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558435186-d31d126391fa?q=80&w=2940&auto=format&fit=crop",
  ],
  garden: [
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2942&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584479898061-15742e14f50d?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2940&auto=format&fit=crop",
  ],
  tools: [
    "https://images.unsplash.com/photo-1617600433693-0f7c7c870e49?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583900985737-944cd9cb7b23?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591134106085-8bbdc61a2ab5?q=80&w=2940&auto=format&fit=crop",
  ],
  merchandise: [
    "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2940&auto=format&fit=crop",
  ],
  branding: [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
  ],
  team: [
    "https://images.unsplash.com/photo-1601158935942-52255782d322?q=80&w=2936&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603201667141-5324c62746bc?q=80&w=2896&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop",
  ],
  testimonials: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop",
  ],
  beforeAfter: [
    {
      before: "https://images.unsplash.com/photo-1558635924-b60e7f3b4796",
      after: "https://images.unsplash.com/photo-1592722212832-f7219ea510da",
    },
    {
      before: "https://images.unsplash.com/photo-1558435186-d31d126391fa",
      after: "https://images.unsplash.com/photo-1604762524889-3b2a380a7a0e",
    },
  ],
}

// Image loading with error handling and fallback
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous" // Prevent CORS issues
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

// Get random image from category
export const getRandomImage = (category: keyof typeof images): string => {
  const categoryImages = images[category]
  if (Array.isArray(categoryImages)) {
    return categoryImages[Math.floor(Math.random() * categoryImages.length)]
  }
  return images.lawn[0] // Fallback to first lawn image
}

// Preload images for a category
export const preloadImages = async (category: keyof typeof images) => {
  const categoryImages = images[category]
  if (Array.isArray(categoryImages)) {
    return Promise.all(categoryImages.map(loadImage))
  }
  return []
}

// Get before/after pair
export const getBeforeAfterPair = () => {
  return images.beforeAfter[Math.floor(Math.random() * images.beforeAfter.length)]
}

