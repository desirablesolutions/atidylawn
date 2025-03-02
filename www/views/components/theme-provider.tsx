"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { theme } = useTheme()

  return (
    <NextThemesProvider
      {...props}
      enableSystem
      defaultTheme="system"
      attribute="class"
      enableColorScheme
      storageKey="theme"
      disableTransitionOnChange={false}
    >
      <motion.div
        initial={false}
        animate={{
          backgroundColor: theme === "dark" ? "var(--background)" : "var(--background)",
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </NextThemesProvider>
  )
}

