"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Leaf,
  X,
  MessageSquare,
  Send,
  Sparkles,
  Calendar,
  Clock,
  ThermometerSun,
  Cloud,
  Droplets,
  Bug,
  TreesIcon as Plant,
  Wind,
} from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/views/elements/dialog"
import { Input } from "@/views/elements/input"
import { Button } from "@/views/elements/button"
import { fadeInUp, staggerChildren, rotateIn } from "@/models/lib/animation-variants"

interface Message {
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export function AIHelp() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "tips">("tips")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        type: "ai",
        content: "Thank you for your message. Our lawn care expert will assist you shortly.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 rounded-full shadow-lg group z-40 hover:shadow-green-500/20 dark:hover:shadow-green-400/20"
        variants={rotateIn}
        initial="initial"
        animate="animate"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <Leaf className="w-6 h-6 text-white group-hover:animate-bounce" />
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400/20 dark:bg-green-400/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg shadow-xl w-full max-w-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
                variants={staggerChildren}
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-green-500 animate-pulse" />
                    <h2 className="text-2xl font-thin text-green-700 dark:text-green-400">AI Lawn Assistant</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex border-b border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => setActiveTab("tips")}
                    className={`flex-1 p-4 text-sm font-thin transition-colors ${activeTab === "tips" ? "border-b-2 border-green-500 text-green-500" : "text-gray-500"}`}
                  >
                    Lawn Care Tips
                  </button>
                  <button
                    onClick={() => setActiveTab("chat")}
                    className={`flex-1 p-4 text-sm font-thin transition-colors ${activeTab === "chat" ? "border-b-2 border-green-500 text-green-500" : "text-gray-500"}`}
                  >
                    Chat with Expert
                  </button>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === "tips" ? (
                      <motion.div
                        key="tips"
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="space-y-6"
                      >
                        {[
                          {
                            title: "Seasonal Care Guide",
                            content: "Get customized lawn care tips based on your location and the current season.",
                            icon: "🌱",
                          },
                          {
                            title: "Water Management",
                            content: "Learn optimal watering schedules and techniques for your specific grass type.",
                            icon: "💧",
                          },
                          {
                            title: "Pest Control",
                            content: "Identify common lawn pests and get natural treatment recommendations.",
                            icon: "🐛",
                          },
                          {
                            title: "Soil Health",
                            content: "Understanding and improving your soil composition for optimal growth.",
                            icon: "🌍",
                          },
                        ].map((tip) => (
                          <motion.div
                            key={tip.title}
                            variants={fadeInUp}
                            className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors"
                          >
                            <div className="flex items-start space-x-4">
                              <span className="text-2xl">{tip.icon}</span>
                              <div>
                                <h3 className="font-thin text-lg mb-2">{tip.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.content}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="chat"
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="space-y-4"
                      >
                        <div className="h-80 overflow-y-auto space-y-4 mb-4">
                          {messages.map((message, index) => (
                            <motion.div
                              key={index}
                              variants={fadeInUp}
                              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] p-3 rounded-lg ${
                                  message.type === "user" ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs opacity-75 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                              </div>
                            </motion.div>
                          ))}
                          {isTyping && (
                            <motion.div variants={fadeInUp} className="flex justify-start">
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                                <div className="flex space-x-2">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1"
                          />
                          <Button onClick={handleSend} className="bg-green-500 hover:bg-green-600">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

