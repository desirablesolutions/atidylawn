"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Github,
  Star,
  GitFork,
  Users,
  Code2,
  BookOpen,
  GitPullRequest,
  MessageSquare,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Project {
  name: string
  description: string
  stars: number
  forks: number
  contributors: number
  language: string
  tags: string[]
  repoUrl: string
  demoUrl?: string
  documentation: string
  lastUpdate: string
  metrics: {
    downloads?: number
    issues?: number
    pullRequests?: number
  }
}

const projects: Project[] = [
  {
    name: "lawn-care-ai",
    description: "Open-source AI model for lawn health analysis and maintenance recommendations",
    stars: 342,
    forks: 89,
    contributors: 24,
    language: "Python",
    tags: ["AI", "Machine Learning", "Computer Vision"],
    repoUrl: "https://github.com/greenscape/lawn-care-ai",
    demoUrl: "https://demo.greenscape.ai",
    documentation: "https://docs.greenscape.ai",
    lastUpdate: "2024-02-15",
    metrics: {
      downloads: 12500,
      issues: 45,
      pullRequests: 12,
    },
  },
  {
    name: "smart-irrigation",
    description: "IoT-based smart irrigation system with weather integration",
    stars: 256,
    forks: 67,
    contributors: 18,
    language: "TypeScript",
    tags: ["IoT", "Hardware", "Automation"],
    repoUrl: "https://github.com/greenscape/smart-irrigation",
    documentation: "https://docs.greenscape.io/irrigation",
    lastUpdate: "2024-02-10",
    metrics: {
      downloads: 8900,
      issues: 32,
      pullRequests: 8,
    },
  },
  {
    name: "soil-analysis-kit",
    description: "DIY soil analysis toolkit with mobile app integration",
    stars: 189,
    forks: 45,
    contributors: 12,
    language: "JavaScript",
    tags: ["Mobile", "Hardware", "Analytics"],
    repoUrl: "https://github.com/greenscape/soil-analysis",
    demoUrl: "https://soil.greenscape.app",
    documentation: "https://docs.greenscape.io/soil",
    lastUpdate: "2024-02-05",
    metrics: {
      downloads: 6700,
      issues: 28,
      pullRequests: 5,
    },
  },
]

export default function OpenSourceSection() {
  const [activeTab, setActiveTab] = useState("projects")

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-serif font-medium mb-4">Open Source</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We believe in giving back to the community. Explore our open-source projects and contribute to the
                future of lawn care technology.
              </p>
            </motion.div>
          </div>

          <Tabs defaultValue="projects" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects" onClick={() => setActiveTab("projects")}>
                Projects
              </TabsTrigger>
              <TabsTrigger value="contribute" onClick={() => setActiveTab("contribute")}>
                How to Contribute
              </TabsTrigger>
              <TabsTrigger value="impact" onClick={() => setActiveTab("impact")}>
                Community Impact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-lg">{project.name}</span>
                          <Badge variant="secondary">{project.language}</Badge>
                        </CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-1">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{project.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="h-4 w-4" />
                            <span>{project.forks}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{project.contributors}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Downloads</span>
                            <span>{project.metrics.downloads?.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Open Issues</span>
                            <span>{project.metrics.issues}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Pull Requests</span>
                            <span>{project.metrics.pullRequests}</span>
                          </div>
                        </div>
                      </CardContent>

                      <div className="p-6 pt-0 mt-auto">
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" className="flex-1" asChild>
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                          {project.demoUrl && (
                            <Button variant="outline" className="flex-1" asChild>
                              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contribute" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      Code Contributions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Help improve our projects by submitting code changes, fixing bugs, or adding new features.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        View Guidelines
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Improve our documentation, write tutorials, or help translate content.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        Start Writing
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Community Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Help other users, participate in discussions, and share your experience.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        Join Community
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>Follow these steps to start contributing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <GitFork className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Fork the Repository</h4>
                        <p className="text-sm text-muted-foreground">Create your own copy of the project to work on</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Code2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Make Changes</h4>
                        <p className="text-sm text-muted-foreground">
                          Implement your changes following our coding standards
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <GitPullRequest className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Submit Pull Request</h4>
                        <p className="text-sm text-muted-foreground">
                          Create a pull request with a clear description of changes
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl font-medium">50K+</CardTitle>
                    <CardDescription>Monthly Downloads</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl font-medium">1.2K+</CardTitle>
                    <CardDescription>Community Contributors</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl font-medium">15+</CardTitle>
                    <CardDescription>Active Projects</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Success Stories</CardTitle>
                  <CardDescription>How our open source projects are making a difference</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-6">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Sparkles className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Community Garden Project</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Used our smart irrigation system to reduce water usage by 40% while maintaining healthy
                              plants.
                            </p>
                            <Badge variant="secondary">Case Study</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

