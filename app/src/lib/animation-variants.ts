export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
}

export const slideIn = {
  initial: { x: 30, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -30, opacity: 0 },
}

export const rotateIn = {
  initial: { rotate: 15, scale: 0.9, opacity: 0 },
  animate: { rotate: 0, scale: 1, opacity: 1 },
  exit: { rotate: -15, scale: 0.9, opacity: 0 },
}

