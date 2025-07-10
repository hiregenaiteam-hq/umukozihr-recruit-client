"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Clock, MapPin, Building, MessageCircle, Bookmark, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

const candidates = [
  {
    id: 1,
    name: "Ava Patel",
    title: "Senior Frontend Engineer",
    company: "Shopify",
    location: "Toronto, Canada",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    score: 97,
    experience: "7 years",
    availability: "Immediate",
    salary: "$160-180k",
    skills: ["React", "TypeScript", "GraphQL", "Redux", "Jest"],
    status: "Actively looking",
  },
  {
    id: 2,
    name: "Lucas Moreau",
    title: "Full Stack Developer",
    company: "Google",
    location: "Paris, France",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    score: 94,
    experience: "8 years",
    availability: "2 weeks",
    salary: "$180-200k",
    skills: ["Node.js", "React", "GCP", "TypeScript", "Kubernetes"],
    status: "Open to opportunities",
  },
  {
    id: 3,
    name: "Sophie Dubois",
    title: "Lead UI/UX Designer",
    company: "Airbnb",
    location: "Berlin, Germany",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    score: 91,
    experience: "9 years",
    availability: "1 month",
    salary: "$140-160k",
    skills: ["Figma", "Sketch", "React", "Design Systems", "User Research"],
    status: "Passive",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Backend Engineer",
    company: "Netflix",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    score: 89,
    experience: "6 years",
    availability: "Immediate",
    salary: "$170-190k",
    skills: ["Python", "Go", "AWS", "Microservices", "PostgreSQL"],
    status: "Actively looking",
  },
  {
    id: 5,
    name: "Maria Rossi",
    title: "Product Manager",
    company: "Stripe",
    location: "Dublin, Ireland",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    score: 88,
    experience: "10 years",
    availability: "3 weeks",
    salary: "$200-220k",
    skills: ["Product Strategy", "Agile", "Jira", "Leadership", "Payments"],
    status: "Open to opportunities",
  },
]

export default function ResultsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof candidates)[0] | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Simulate AI processing
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          {/* AI Agent Visualization */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
              <div className="w-8 h-8 bg-green-500 rounded-full absolute top-4 left-1/2 transform -translate-x-1/2" />
              <div className="w-6 h-6 bg-amber-500 rounded-full absolute bottom-8 right-8" />
              <div className="w-6 h-6 bg-purple-500 rounded-full absolute bottom-8 left-8" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">AI Agents Working</h2>
            <div className="space-y-2">
              <p className="text-slate-600">Analyzing 50,000+ profiles...</p>
              <p className="text-slate-600">Scoring candidates against your criteria...</p>
              <p className="text-slate-600">Ranking top 1% matches...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Found 47 exceptional candidates</h1>
          <div className="flex items-center text-slate-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>Completed in 2 minutes 34 seconds</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results List */}
          <div className="lg:col-span-2 space-y-4">
            {candidates.map((candidate) => (
              <Card
                key={candidate.id}
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-2 ${
                  selectedCandidate?.id === candidate.id
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-slate-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedCandidate(candidate)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-slate-200 text-slate-600 text-lg font-medium">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{candidate.name}</h3>
                      <p className="text-slate-600 mb-1">{candidate.title}</p>
                      <div className="flex items-center text-sm text-slate-500 mb-3">
                        <Building className="w-4 h-4 mr-1" />
                        <span className="mr-4">{candidate.company}</span>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{candidate.location}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
                          <Badge
                            key={index}
                            variant={index < 2 ? "default" : "secondary"}
                            className={index < 2 ? "bg-blue-500 hover:bg-blue-600" : ""}
                          >
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <Badge variant="outline">+{candidate.skills.length - 3} more</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* AI Score */}
                  <div className="text-center">
                    <div className="relative w-16 h-16 mb-2">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          strokeDasharray={`${candidate.score}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-slate-900">{candidate.score}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">AI Match</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="p-8 sticky top-24 bg-slate-50/50">
              {selectedCandidate ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={selectedCandidate.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-slate-200 text-slate-600 text-2xl font-medium">
                        {selectedCandidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedCandidate.name}</h3>
                    <p className="text-slate-600">{selectedCandidate.title}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 mb-1">Experience</p>
                      <p className="font-medium text-slate-900">{selectedCandidate.experience}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Location</p>
                      <p className="font-medium text-slate-900">{selectedCandidate.location}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Availability</p>
                      <p className="font-medium text-slate-900">{selectedCandidate.availability}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Salary</p>
                      <p className="font-medium text-slate-900">{selectedCandidate.salary}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600"
                      onClick={() => router.push(`/profile/${selectedCandidate.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Profile
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Conversation
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Save to Folder
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500">Click any candidate to preview</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
