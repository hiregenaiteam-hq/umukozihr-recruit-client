"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { apiFetch, parseValidationDetails, normalizeError } from "@/lib/api"
import baseUrl from "@/lib/config"
import {Eye, EyeOff } from "lucide-react"



type SignedUpPayload = { email: string; userId?: string | number | null }
type Props = {
  onSignedUp: (payload: SignedUpPayload) => void
}

export default function SignUpForm({ onSignedUp }: Props) {
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
    } catch (e: any) {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Full name"
        value={fullName}
        onChange={(e) => { setFullName(e.target.value); clearFieldError("full_name"); }}
        className="h-12 rounded-2xl px-4"
        required
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
        className="h-12 rounded-2xl px-4"
        required
      />
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => { setUsername(e.target.value); clearFieldError("username"); }}
        className="h-12 rounded-2xl px-4"
        required
      />
      {/* Password with visibility toggle */}
      <div className="relative">
        {fieldErrors["password"] && <p className="text-red-600 text-sm -mt-2">{fieldErrors["password"]}</p>}
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); clearFieldError("password") }}
          className="h-15 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base px-5 pr-12"
          required
        />
        <button
          type="button"
          aria-label={showPassword ? "Show password" : "Hide password"}
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
        >
          {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
      </div>

      {/* Confirm password only on signup */}
      <div className="relative">
        {fieldErrors["confirm_password"] && <p className="text-red-600 text-sm -mt-2">{fieldErrors["confirm_password"]}</p>}
        <Input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("confirm_password") }}
          className="h-15 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base px-5 pr-12"
          required
        />
        <button
          type="button"
          aria-label={showConfirm ? "Show confirm password" : "Hide confirm password"}
          onClick={() => setShowConfirm((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
        >
          {showConfirm ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
      </div>
      <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="h-12 rounded-2xl px-4" />
      <Input placeholder="Job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="h-12 rounded-2xl px-4" />
      <Input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} className="h-12 rounded-2xl px-4" />
      <Input placeholder="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 rounded-2xl px-4" />

      <Button type="submit" className="w-full h-12 rounded-2xl" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}
