"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { requestPasswordReset } from "@/lib/api"
import { ArrowLeft, Mail, Loader2 } from "lucide-react"

type Props = {
  onCodeSent: (email: string) => void
  onBack: () => void
}

export default function ForgotPasswordForm({ onCodeSent, onBack }: Props) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address.")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.")
      return
    }

    setIsLoading(true)

    try {
      const result = await requestPasswordReset(email)

      if (result.success) {
        toast.success("Reset code sent! Check your email.")
        onCodeSent(email)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to send reset code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="space-y-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-umukozi-orange transition-colors font-inter text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-umukozi-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-umukozi-orange" />
          </div>
          <h3 className="text-2xl font-medium text-slate-900 mb-2 font-inter">Forgot Password?</h3>
          <p className="text-slate-600 font-inter text-sm">
            No worries! Enter your email and we'll send you a reset code.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 font-inter">Email Address</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20"
              required
              autoFocus
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 rounded-lg bg-umukozi-orange hover:bg-umukozi-orange-dark text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              "Send Reset Code"
            )}
          </Button>
        </form>

        {/* Help Text */}
        <p className="text-center text-sm text-slate-500 font-inter">
          Remember your password?{" "}
          <button
            type="button"
            onClick={onBack}
            className="text-umukozi-orange hover:text-umukozi-orange-dark font-medium transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
