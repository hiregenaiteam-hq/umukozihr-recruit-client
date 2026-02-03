"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { apiFetch, parseValidationDetails, normalizeError } from "@/lib/api"
import baseUrl from "@/lib/config"
import { Eye, EyeOff } from "lucide-react"



type SignedUpPayload = { email: string; userId?: string | number | null }
type Props = {
  onSignedUp: (payload: SignedUpPayload) => void
  onSwitchToSignIn?: () => void
}

export default function SignUpForm({ onSignedUp, onSwitchToSignIn }: Props) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [company, setCompany] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [department, setDepartment] = useState("")
  const [phone, setPhone] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const copy = { ...prev }
      delete copy[field]
      return copy
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({})

    if (!email || !fullName || !username || !password) {
      toast.error("Please complete required fields.")
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.")
      return
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.")
      return
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }

    setIsLoading(true)
    try {
      const payload = {
        email: email.trim(),
        username: username.trim(),
        password,
        full_name: fullName.trim(),
        company: company.trim(),
        job_title: jobTitle.trim(),
        department: department.trim(),
        phone: phone.trim(),
      }

      const data = await apiFetch(`${baseUrl}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      toast.success("Account created. Please verify your email.")
      onSignedUp({ email: payload.email, userId: data?.id ?? null })
    } catch (e: unknown) {
      const parsed = parseValidationDetails(e)
      if (Object.keys(parsed).length > 0) {
        setFieldErrors(parsed)
        toast.error(Object.values(parsed).join(" — "))
      } else {
        const { title, description } = normalizeError(e)
        toast.error(`${title}: ${description}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Join Umukozi HR</h3>
          <p className="text-gray-600">Create your professional account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                {fieldErrors["full_name"] && (
                  <p className="text-sm text-red-600">{fieldErrors["full_name"]}</p>
                )}
                <Input
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); clearFieldError("full_name"); }}
                  className={`h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 ${fieldErrors["full_name"] ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address *</label>
                {fieldErrors["email"] && (
                  <p className="text-sm text-red-600">{fieldErrors["email"]}</p>
                )}
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
                  className={`h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 ${fieldErrors["email"] ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  required
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username *</label>
                {fieldErrors["username"] && (
                  <p className="text-sm text-red-600">{fieldErrors["username"]}</p>
                )}
                <Input
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); clearFieldError("username"); }}
                  className={`h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 ${fieldErrors["username"] ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password *</label>
                {fieldErrors["password"] && (
                  <p className="text-sm text-red-600">{fieldErrors["password"]}</p>
                )}
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearFieldError("password") }}
                    className={`h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 pr-10 ${fieldErrors["password"] ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                      }`}
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Show password" : "Hide password"}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password *</label>
                {fieldErrors["confirm_password"] && (
                  <p className="text-sm text-red-600">{fieldErrors["confirm_password"]}</p>
                )}
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("confirm_password") }}
                    className={`h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 pr-10 ${fieldErrors["confirm_password"] ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                      }`}
                    required
                  />
                  <button
                    type="button"
                    aria-label={showConfirm ? "Show confirm password" : "Hide confirm password"}
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirm ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Company */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company</label>
                <Input
                  placeholder="Your company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20"
                />
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Job Title</label>
                <Input
                  placeholder="Your job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20"
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <Input
                  placeholder="Your department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 rounded-lg bg-umukozi-orange hover:bg-umukozi-orange-dark text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </Button>


          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="text-umukozi-orange hover:text-umukozi-orange-dark font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}