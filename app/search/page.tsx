"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Clock, Users, Target } from "lucide-react"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"

const suggestions = [
  "Senior React developer with 5+ years experience",
  "DevOps engineer with Kubernetes expertise",
  "Product manager for fintech startup",
  "UX designer with e-commerce background",
]

const stats = [
  { icon: Users, label: "10,000+ profiles analyzed", value: "10K+" },
  { icon: Target, label: "98% accuracy rate", value: "98%" },
  { icon: Clock, label: "Average 3 minutes to results", value: "3min" },
]

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/results")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">Just describe who you need</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our AI agents will find, score, and deliver the perfect candidates in minutes
          </p>
        </div>

        {/* Search Interface */}
        <Card className="bg-white shadow-xl border-0 rounded-3xl p-8 mb-12">
          <div className="space-y-6">
            <Textarea
              placeholder="Tell us about your ideal candidate..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[200px] text-lg leading-relaxed border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-2xl resize-none"
            />

            {/* AI Suggestions */}
            {query.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-slate-500 font-medium">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(suggestion)}
                      className="px-4 py-2 bg-slate-100 hover:bg-blue-500 hover:text-white text-slate-600 text-sm rounded-full transition-all duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                onClick={handleSearch}
                disabled={!query.trim() || isLoading}
                className="px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    AI Agents Working...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-3" />
                    Find My Candidates
                  </div>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6 text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
              </div>
              <p className="text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
