"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Upload, ImageIcon, Loader2, ArrowRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PreviewState {
  image: string | null
  isProcessing: boolean
  transformedImage: string | null
  options: {
    enhancement: number
    greenery: number
    cleanup: boolean
    seasonal: "spring" | "summer" | "fall" | "winter"
  }
}

export default function LawnAiPreview() {
  const isMounted = useRef(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [state, setState] = useState<PreviewState>({
    image: null,
    isProcessing: false,
    transformedImage: null,
    options: {
      enhancement: 50,
      greenery: 50,
      cleanup: true,
      seasonal: "summer",
    },
  })

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isMounted.current) return

    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (isMounted.current) {
          setState((prev) => ({
            ...prev,
            image: e.target?.result as string,
            transformedImage: null,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTransform = async () => {
    if (!isMounted.current || !state.image) return

    setState((prev) => ({ ...prev, isProcessing: true }))

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (isMounted.current) {
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          transformedImage: prev.image,
        }))
      }
    } catch (error) {
      if (isMounted.current) {
        setState((prev) => ({
          ...prev,
          isProcessing: false,
        }))
      }
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    if (!isMounted.current) return

    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (isMounted.current) {
          setState((prev) => ({
            ...prev,
            image: e.target?.result as string,
            transformedImage: null,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  if (typeof window === "undefined") return null

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-medium mb-4">AI Lawn Transformation Preview</h2>
            <p className="text-lg text-muted-foreground">
              Upload a photo of your lawn and see how our services can transform it
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lawn Visualizer</CardTitle>
              <CardDescription>
                See the potential of your outdoor space with our AI-powered visualization tool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image Upload Area */}
                <div className="space-y-4">
                  <Label>Upload Lawn Photo</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      state.image ? "border-primary" : "border-muted-foreground/25"
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    {state.image ? (
                      <div className="relative aspect-video">
                        <Image
                          src={state.image || "/placeholder.svg"}
                          alt="Uploaded lawn"
                          fill
                          className="object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setState((prev) => ({ ...prev, image: null, transformedImage: null }))
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="flex flex-col items-center justify-center py-8 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-1">
                          Drag and drop your photo here, or click to select
                        </p>
                        <p className="text-xs text-muted-foreground">Supports: JPG, PNG (max 10MB)</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Transformation Options */}
                  {state.image && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Enhancement Level</Label>
                          <Slider
                            value={[state.options.enhancement]}
                            onValueChange={([value]) =>
                              setState((prev) => ({ ...prev, options: { ...prev.options, enhancement: value } }))
                            }
                            min={0}
                            max={100}
                            step={1}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Greenery Intensity</Label>
                          <Slider
                            value={[state.options.greenery]}
                            onValueChange={([value]) =>
                              setState((prev) => ({ ...prev, options: { ...prev.options, greenery: value } }))
                            }
                            min={0}
                            max={100}
                            step={1}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Include Cleanup</Label>
                          <Switch
                            checked={state.options.cleanup}
                            onCheckedChange={(checked) =>
                              setState((prev) => ({ ...prev, options: { ...prev.options, cleanup: checked } }))
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Season Preview</Label>
                          <Tabs
                            value={state.options.seasonal}
                            onValueChange={(value: any) =>
                              setState((prev) => ({ ...prev, options: { ...prev.options, seasonal: value } }))
                            }
                          >
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="spring">Spring</TabsTrigger>
                              <TabsTrigger value="summer">Summer</TabsTrigger>
                              <TabsTrigger value="fall">Fall</TabsTrigger>
                              <TabsTrigger value="winter">Winter</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                      </div>

                      <Button className="w-full" onClick={handleTransform} disabled={state.isProcessing}>
                        {state.isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Preview Transformation
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Preview Area */}
                <div className="space-y-4">
                  <Label>Transformation Preview</Label>
                  <div className="border rounded-lg aspect-video relative overflow-hidden">
                    {state.transformedImage ? (
                      <Image
                        src={state.transformedImage || "/placeholder.svg"}
                        alt="Transformed lawn"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full bg-muted">
                        <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Transform your photo to see the preview</p>
                      </div>
                    )}
                  </div>

                  {state.transformedImage && (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">AI Recommendations</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Regular maintenance schedule suggested
                          </li>
                          <li className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Consider adding drought-resistant plants
                          </li>
                          <li className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Soil treatment recommended
                          </li>
                        </ul>
                      </div>

                      <Button className="w-full">Schedule Consultation</Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

