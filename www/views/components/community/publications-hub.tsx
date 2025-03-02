"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Clock,
  Calendar,
  Filter,
  Search,
  Download,
  ExternalLink,
  BookMarked,
  FileText,
  Newspaper,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Publication {
  id: string
  title: string
  type: "article" | "research" | "blog"
  authors: string[]
  date: string
  readingTime: number
  tags: string[]
  abstract: string
  url: string
  downloads?: number
  citations?: number
  journal?: string
}

const publications: Publication[] = [
  {
    id: "1",
    title: "Advanced Techniques in Sustainable Lawn Care: A Comprehensive Study",
    type: "research",
    authors: ["Dr. Sarah Johnson", "Dr. Michael Smith"],
    date: "2024-02-15",
    readingTime: 25,
    tags: ["Sustainability", "Research", "Lawn Care"],
    abstract: "This study explores innovative approaches to sustainable lawn maintenance...",
    url: "#",
    downloads: 1250,
    citations: 45,
    journal: "Journal of Environmental Horticulture",
  },
  {
    id: "2",
    title: "The Future of Smart Irrigation Systems",
    type: "article",
    authors: ["James Wilson"],
    date: "2024-02-10",
    readingTime: 12,
    tags: ["Technology", "Irrigation", "Innovation"],
    abstract: "Exploring the latest developments in smart irrigation technology...",
    url: "#",
    downloads: 850,
  },
  {
    id: "3",
    title: "Seasonal Lawn Care Guide: Spring Edition",
    type: "blog",
    authors: ["Emily Davis"],
    date: "2024-02-05",
    readingTime: 8,
    tags: ["Seasonal", "Tips", "Maintenance"],
    abstract: "Essential tips and tricks for maintaining your lawn during spring...",
    url: "#",
  },
]

export default function PublicationsHub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedTag, setSelectedTag] = useState<string>("all")

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || pub.type === selectedType
    const matchesTag = selectedTag === "all" || pub.tags.includes(selectedTag)
    return matchesSearch && matchesType && matchesTag
  })

  const allTags = Array.from(new Set(publications.flatMap((pub) => pub.tags)))

  const PublicationCard = ({ publication }: { publication: Publication }) => {
    const TypeIcon = {
      research: BookMarked,
      article: FileText,
      blog: Newspaper,
    }[publication.type]

    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl">{publication.title}</CardTitle>
              <CardDescription>{publication.authors.join(", ")}</CardDescription>
            </div>
            <TypeIcon className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{publication.abstract}</p>

          <div className="flex flex-wrap gap-2">
            {publication.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(publication.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {publication.readingTime} min read
            </div>
            {publication.downloads && (
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                {publication.downloads}
              </div>
            )}
          </div>

          {publication.type === "research" && (
            <div className="flex items-center justify-between text-sm border-t pt-4">
              <span className="text-muted-foreground">{publication.journal}</span>
              <Badge variant="outline">{publication.citations} citations</Badge>
            </div>
          )}

          <Button variant="outline" className="w-full" asChild>
            <a href={publication.url} target="_blank" rel="noopener noreferrer">
              Read Full{" "}
              {publication.type === "research" ? "Paper" : publication.type === "article" ? "Article" : "Post"}
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-serif font-medium mb-4">Publications</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our latest research papers, articles, and blog posts about lawn care and landscaping
              </p>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search publications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="research">Research Papers</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="blog">Blog Posts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex gap-2">
                <Badge
                  variant={selectedTag === "all" ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag("all")}
                >
                  All Tags
                </Badge>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </ScrollArea>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPublications.map((publication) => (
                <motion.div
                  key={publication.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PublicationCard publication={publication} />
                </motion.div>
              ))}
            </div>

            {filteredPublications.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No publications found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

