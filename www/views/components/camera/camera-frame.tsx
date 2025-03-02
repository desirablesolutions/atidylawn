"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, X, ImageIcon, Check, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CameraFrameProps {
  isOpen: boolean
  onClose: () => void
  onCapture: (images: string[]) => void
}

interface CapturedImage {
  url: string
  type: "lawn" | "garden" | "damage" | "other"
  confidence: number
}

export function CameraFrame({ isOpen, onClose, onCapture }: CameraFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)

  // Initialize camera
  const initializeCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Prefer back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCameraPermission(true)
        setError(null)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraPermission(false)
      setError("Unable to access camera. Please check permissions.")
    }
  }, [])

  // Cleanup function
  const cleanup = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setCapturedImages([])
    setError(null)
  }, [])

  // Handle dialog open/close
  const handleOpenChange = (open: boolean) => {
    if (open) {
      initializeCamera()
    } else {
      cleanup()
      onClose()
    }
  }

  // Capture image
  const captureImage = async () => {
    if (!videoRef.current) return

    const canvas = document.createElement("canvas")
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Capture frame
    ctx.drawImage(videoRef.current, 0, 0)
    const imageUrl = canvas.toDataURL("image/jpeg")

    setIsProcessing(true)

    try {
      // Simulate AI analysis (replace with actual AI processing)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate image classification
      const types: ("lawn" | "garden" | "damage" | "other")[] = ["lawn", "garden", "damage", "other"]
      const randomType = types[Math.floor(Math.random() * types.length)]
      const randomConfidence = Math.random() * (1 - 0.7) + 0.7 // Random confidence between 0.7 and 1

      setCapturedImages((prev) => [
        ...prev,
        {
          url: imageUrl,
          type: randomType,
          confidence: randomConfidence,
        },
      ])
    } catch (err) {
      setError("Error processing image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle save
  const handleSave = () => {
    onCapture(capturedImages.map((img) => img.url))
    onClose()
    cleanup()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogHeader className="p-6">
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Lawn Analysis Camera
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          {/* Camera View */}
          <div className="relative aspect-video bg-black">
            {cameraPermission === false ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
                <AlertCircle className="h-12 w-12 text-red-500" />
                <p className="text-center max-w-[250px]">
                  Camera access denied. Please check your browser permissions and try again.
                </p>
              </div>
            ) : (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            )}

            {/* Capture Button */}
            {cameraPermission && (
              <Button
                size="lg"
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
                onClick={captureImage}
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Camera className="h-4 w-4 mr-2" />}
                Capture
              </Button>
            )}
          </div>

          {/* Captured Images */}
          {capturedImages.length > 0 && (
            <div className="p-4 border-t">
              <h4 className="font-medium mb-4">Captured Images</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {capturedImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-video rounded-lg overflow-hidden group"
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Captured ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute top-2 right-2">
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-6 w-6 rounded-full"
                          onClick={() => setCapturedImages((prev) => prev.filter((_, i) => i !== index))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "w-full justify-center",
                            image.type === "damage" && "bg-red-500/20 text-red-500",
                            image.type === "lawn" && "bg-green-500/20 text-green-500",
                            image.type === "garden" && "bg-blue-500/20 text-blue-500",
                          )}
                        >
                          {image.type.charAt(0).toUpperCase() + image.type.slice(1)} (
                          {Math.round(image.confidence * 100)}%)
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-4 right-4 bg-destructive text-destructive-foreground p-4 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={capturedImages.length === 0} className="min-w-[100px]">
            {capturedImages.length > 0 ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Save {capturedImages.length} {capturedImages.length === 1 ? "Image" : "Images"}
              </>
            ) : (
              <>
                <ImageIcon className="h-4 w-4 mr-2" />
                No Images
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

