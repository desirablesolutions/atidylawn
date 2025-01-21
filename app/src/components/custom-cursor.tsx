"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { debounce } from "@/lib/use-debounce"

interface CursorState {
  clicked: boolean
  hidden: boolean
  link: boolean
  input: boolean
  text: boolean
}

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 50, stiffness: 500, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const [cursorState, setCursorState] = useState<CursorState>({
    clicked: false,
    hidden: false,
    link: false,
    input: false,
    text: false,
  })

  // Debounced cursor movement
  const moveCursor = useCallback(
    debounce((e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }, 8),
    [cursorX, cursorY],
  )

  useEffect(() => {
    const handleMouseDown = () => setCursorState((prev) => ({ ...prev, clicked: true }))
    const handleMouseUp = () => setCursorState((prev) => ({ ...prev, clicked: false }))
    const handleMouseEnter = () => setCursorState((prev) => ({ ...prev, hidden: false }))
    const handleMouseLeave = () => setCursorState((prev) => ({ ...prev, hidden: true }))

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      const isInput =
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("input") ||
        target.closest("textarea")
      const isText = window.getSelection()?.toString().length !== 0

      setCursorState((prev) => ({
        ...prev,
        link: !!isLink,
        input: !!isInput,
        text: isText,
      }))
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleElementHover)
    document.addEventListener("selectstart", () => setCursorState((prev) => ({ ...prev, text: true })))
    document.addEventListener("selectionchange", () => {
      const isText = window.getSelection()?.toString().length !== 0
      setCursorState((prev) => ({ ...prev, text: isText }))
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleElementHover)
      document.removeEventListener("selectstart", () => {})
      document.removeEventListener("selectionchange", () => {})
    }
  }, [moveCursor])

  return (
    <>
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
        animate={{
          scale: cursorState.clicked ? 0.8 : cursorState.link ? 1.2 : 1,
          opacity: cursorState.hidden ? 0 : 1,
          borderColor: cursorState.input
            ? "rgb(147 197 253)"
            : cursorState.text
              ? "rgb(249 168 212)"
              : "rgb(34 197 94)",
        }}
        className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference
                   border-2 transition-colors duration-300 backdrop-blur-sm
                   w-8 h-8 -translate-x-4 -translate-y-4`}
      />
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
        animate={{
          scale: cursorState.clicked ? 1.2 : cursorState.link ? 0.5 : 1,
          opacity: cursorState.hidden ? 0 : cursorState.text ? 0 : 1,
        }}
        className="fixed pointer-events-none z-50 w-2 h-2 bg-green-500 dark:bg-green-400 
                   rounded-full mix-blend-difference transition-colors duration-300"
      />
    </>
  )
}

