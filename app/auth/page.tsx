"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    router.push("/search")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-500/5 rounded-lg rotate-45 animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-amber-500/5 rounded-full animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl p-12 relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold text-slate-900">HireGen</h1>
          </div>
          <h2 className="text-xl text-slate-600 font-medium mb-2">Hiring shouldn't feel like guesswork</h2>
          <p className="text-slate-500 leading-relaxed">
            Describe what you need. Our AI finds the top 1% talent in minutes.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-slate-100 rounded-full p-1 mb-8 relative h-14 w-full max-w-md mx-auto">
          {/* Animated pill background */}
          <div
            className="absolute top-1 left-1 h-12 w-1/2 rounded-full bg-blue-500 shadow-sm transition-transform duration-500"
            style={{
              transform: isSignUp ? 'translateX(100%)' : 'translateX(0%)',
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)'
            }}
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-3 px-6 rounded-full text-sm font-medium z-10 transition-colors duration-200 ${
              !isSignUp ? 'text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-3 px-6 rounded-full text-sm font-medium z-10 transition-colors duration-200 ${
              isSignUp ? 'text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form with animated height */}
        <div
          className={`transition-all duration-500 overflow-hidden`}
          style={{ maxHeight: isSignUp ? 600 : 400 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Animated Name Field */}
            <div
              className={`transition-all duration-500 ${isSignUp ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
              style={{
                transitionProperty: 'opacity, transform',
              }}
            >
              {isSignUp && (
                <Input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-15 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base px-5"
                  required
                />
              )}
            </div>
            <div>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-15 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base px-5"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-15 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base px-5"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  AI agents activating...
                </div>
              ) : (
                "Continue with HireGen"
              )}
            </Button>
          </form>
        </div>

        {/* Trust signals */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">Used by 500+ companies worldwide</p>
        </div>
      </Card>
    </div>
  )
}
