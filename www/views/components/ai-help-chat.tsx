"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  X,
  Search,
  Calendar,
  Calculator,
  FileText,
  Send,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  Leaf,
  User,
  DollarSign,
  PenToolIcon as Tool,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  status?: "thinking" | "complete"
  feedback?: "positive" | "negative"
  attachments?: string[]
}

interface QuickAction {
  icon: typeof Bot
  label: string
  description: string
  action: () => void
}

// Add to the state interface:
interface State {
  isOpen: boolean
  messages: Message[]
  input: string
  activeTab: string
  showCamera: boolean
}

const commonQuestions = [
  "What services do you offer?",
  "How much does lawn care cost?",
  "Can you help me schedule a service?",
  "What are some lawn care tips?",
]

export default function AiHelpChat() {
  const isMounted = useRef(false)
  const [state, setState] = useState<State>({
    isOpen: false,
    messages: [] as Message[],
    input: "",
    activeTab: "chat",
    showCamera: false,
  })

  // Move quickActions inside the component to access setState
  const quickActions: QuickAction[] = [
    {
      icon: Calendar,
      label: "Schedule Service",
      description: "Book a lawn care appointment",
      action: () => console.log("Schedule"),
    },
    {
      icon: Calculator,
      label: "Get Quote",
      description: "Calculate service costs",
      action: () => console.log("Quote"),
    },
    {
      icon: Search,
      label: "Lawn Care Tips",
      description: "DIY maintenance advice",
      action: () => console.log("Tips"),
    },
    {
      icon: FileText,
      label: "Services Info",
      description: "Learn about our services",
      action: () => console.log("Services"),
    },
    {
      icon: Camera,
      label: "Take Photos",
      description: "Analyze your lawn with AI",
      action: () => setState((prev) => ({ ...prev, showCamera: true })),
    },
  ]

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const handleSend = async () => {
    if (!isMounted.current || !state.input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: state.input,
      timestamp: new Date(),
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      input: "",
    }))

    // Add thinking message
    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Thinking...",
      timestamp: new Date(),
      status: "thinking",
    }

    if (isMounted.current) {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, thinkingMessage],
      }))
    }

    // Simulate AI response
    setTimeout(() => {
      if (isMounted.current) {
        setState((prev) => ({
          ...prev,
          messages: prev.messages
            .filter((msg) => msg.id !== thinkingMessage.id)
            .concat({
              id: (Date.now() + 2).toString(),
              role: "assistant",
              content: generateResponse(state.input),
              timestamp: new Date(),
              status: "complete",
            }),
        }))
      }
    }, 1500)
  }

  const generateResponse = (query: string): string => {
    // Simulate different responses based on query content
    if (query.toLowerCase().includes("cost") || query.toLowerCase().includes("price")) {
      return "Our service prices vary based on lawn size and service type. For a standard lawn (up to 5,000 sq ft), basic maintenance starts at $49/visit. Would you like me to help you calculate a custom quote?"
    }
    if (query.toLowerCase().includes("schedule") || query.toLowerCase().includes("book")) {
      return "I can help you schedule a service! We have availability this week. What day works best for you? I can also show you our real-time availability calendar."
    }
    return "I understand you're interested in our lawn care services. Could you tell me more about what you're looking for? I can provide specific information about our services, pricing, or maintenance tips."
  }

  const addFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)),
    }))
  }

  const handleOpenChange = (open: boolean) => {
    setState((prev) => ({ ...prev, isOpen: open }))
  }

  const CameraFrame = ({
    isOpen,
    onClose,
    onCapture,
  }: { isOpen: boolean; onClose: () => void; onCapture: (images: string[]) => void }) => {
    if (!isOpen) return null

    const handleCapture = () => {
      // Simulate image capture
      const images = ["image1.jpg", "image2.jpg"]
      onCapture(images)
      onClose()
    }

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Take Lawn Photos</h2>
          <p>Pretend you are taking photos of your lawn.</p>
          <button onClick={handleCapture} className="bg-blue-500 text-white px-4 py-2 rounded">
            Capture
          </button>
          <button onClick={onClose} className="ml-4">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-8 right-8 z-50">
        <Button
          size="lg"
          className={cn(
            "relative w-20 h-20 rounded-full shadow-lg overflow-hidden",
            "bg-gradient-to-br from-primary via-primary/90 to-primary/80",
            "hover:shadow-xl hover:shadow-primary/20 transition-all duration-500",
            "dark:from-primary/90 dark:via-primary/70 dark:to-primary/60",
            "dark:hover:shadow-primary/30",
          )}
          onClick={() => handleOpenChange(true)}
        >
          {/* Magical Orb Background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-foreground/0 via-primary-foreground/5 to-primary-foreground/10">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 30% 30%, rgba(var(--primary), 0.3) 0%, transparent 70%)",
                  "radial-gradient(circle at 70% 70%, rgba(var(--primary), 0.3) 0%, transparent 70%)",
                  "radial-gradient(circle at 30% 30%, rgba(var(--primary), 0.3) 0%, transparent 70%)",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Magical Sparkles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary-foreground"
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          ))}

          {/* AI Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Bot className="w-10 h-10 text-primary-foreground drop-shadow-lg" />
          </motion.div>

          {/* Orbital Ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-primary-foreground/20"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-primary-foreground"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          {/* Status Indicator */}
          <motion.div
            className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </Button>
      </motion.div>

      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-8 z-50 w-[400px]"
          >
            <Card className="shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-serif flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" />
                  AI Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setState((prev) => ({ ...prev, isOpen: false }))}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs
                  value={state.activeTab}
                  onValueChange={(value) => setState((prev) => ({ ...prev, activeTab: value }))}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="actions">Quick Actions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chat" className="p-4">
                    <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
                      {state.messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                          <Bot className="h-12 w-12 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium mb-2">Welcome to GreenScape AI Assistant</h4>
                            <p className="text-sm text-muted-foreground">
                              Ask me anything about lawn care, our services, or maintenance tips!
                            </p>
                          </div>
                          <div className="w-full max-w-sm">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Common Questions:</p>
                            <div className="flex flex-wrap gap-2">
                              {commonQuestions.map((question, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => {
                                    setState((prev) => ({ ...prev, input: question }))
                                    setState((prev) => ({ ...prev, activeTab: "chat" }))
                                  }}
                                >
                                  {question}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {state.messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
                                }`}
                              >
                                {message.status === "thinking" ? (
                                  <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Processing your request...</span>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex items-start gap-2 mb-2">
                                      {message.role === "assistant" ? (
                                        <div className="bg-primary/10 p-1 rounded">
                                          <Leaf className="h-4 w-4 text-primary" />
                                        </div>
                                      ) : (
                                        <div className="bg-primary-foreground/10 p-1 rounded">
                                          <User className="h-4 w-4" />
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        <p className="text-sm">{message.content}</p>
                                        {message.role === "assistant" && (
                                          <div className="flex flex-wrap gap-2 mt-2">
                                            {message.content.toLowerCase().includes("schedule") && (
                                              <Badge variant="outline" className="text-xs">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                Scheduling
                                              </Badge>
                                            )}
                                            {message.content.toLowerCase().includes("price") && (
                                              <Badge variant="outline" className="text-xs">
                                                <DollarSign className="h-3 w-3 mr-1" />
                                                Pricing
                                              </Badge>
                                            )}
                                            {message.content.toLowerCase().includes("maintenance") && (
                                              <Badge variant="outline" className="text-xs">
                                                <Tool className="h-3 w-3 mr-1" />
                                                Maintenance
                                              </Badge>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                      <p className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</p>
                                      {message.role === "assistant" && message.status === "complete" && (
                                        <div className="flex gap-1">
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => addFeedback(message.id, "positive")}
                                          >
                                            <ThumbsUp
                                              className={`h-4 w-4 ${
                                                message.feedback === "positive" ? "text-primary fill-primary" : ""
                                              }`}
                                            />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => addFeedback(message.id, "negative")}
                                          >
                                            <ThumbsDown
                                              className={`h-4 w-4 ${
                                                message.feedback === "negative"
                                                  ? "text-destructive fill-destructive"
                                                  : ""
                                              }`}
                                            />
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="actions" className="p-4">
                    <div className="grid gap-4">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start h-auto p-4"
                          onClick={action.action}
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-2 rounded-lg">
                              <action.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="font-medium">{action.label}</h4>
                              <p className="text-sm text-muted-foreground">{action.description}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    placeholder="Type your message..."
                    value={state.input}
                    onChange={(e) => setState((prev) => ({ ...prev, input: e.target.value }))}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!state.input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <CameraFrame
        isOpen={state.showCamera}
        onClose={() => setState((prev) => ({ ...prev, showCamera: false }))}
        onCapture={(images) => {
          // Add captured images to chat
          const message: Message = {
            id: Date.now().toString(),
            role: "user",
            content: "I've taken some photos of my lawn for analysis.",
            timestamp: new Date(),
            attachments: images,
          }

          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
            showCamera: false,
          }))

          // Simulate AI response
          setTimeout(() => {
            const response: Message = {
              id: (Date.now() + 1).toString(),
              role: "assistant",
              content:
                "I've analyzed your lawn photos. I can see some areas that might need attention. Would you like specific recommendations for each area?",
              timestamp: new Date(),
            }
            setState((prev) => ({
              ...prev,
              messages: [...prev.messages, response],
            }))
          }, 1500)
        }}
      />
    </>
  )
}

