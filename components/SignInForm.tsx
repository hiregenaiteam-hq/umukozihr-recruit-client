"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { loginAndGetToken, setCookie } from "@/lib/api"
import { Eye, EyeOff } from "lucide-react"


type NotVerifiedPayload = { email: string; userId?: string | number | null; message?: string }
type Props = {
  onSuccess?: () => void
  onNotVerified?: (payload: NotVerifiedPayload) => void
}

type ApiError = Error & {
  status?: number
  details?: unknown
}


export default function SignInForm({ onSuccess, onNotVerified }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // map of fieldName -> error message
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // helper to clear a specific field's error when user edits it
  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const copy = { ...prev }
      delete copy[field]
      return copy
    })
  }

  // parse server validation array like you posted and turn into fieldErrors map
  function parseValidationDetails(err: ApiError | unknown) {
    const out: Record<string, string> = {}
    try {
      const details = (err as ApiError).details as any
      const arr = details?.detail
      if (Array.isArray(arr)) {
        arr.forEach((d: any) => {
          // `loc` may be ["body","password"] or similar - take last segment as the field name
          const loc = d?.loc
          let key = "form"
          if (Array.isArray(loc) && loc.length > 0) {
            key = loc[loc.length - 1]
          } else if (typeof d?.loc === "string") {
            key = d.loc
          }
          // prefer msg, fallback to error or stringifying ctx
          const msg = d?.msg || d?.error || JSON.stringify(d?.ctx || "")
          out[key] = msg
        })
      }
    } catch {
      // ignore parse errors
    }
    return out
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // clear previous field errors before validating locally
    setFieldErrors({})

    if (!email || !password) {
      toast.error("Email and password are required.")
      return
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.")
      return
    }

    setIsLoading(true)


    try {
      const token = await loginAndGetToken(email, password)
      setCookie("hg_token", token, 7)
      toast.success("You’re now signed in.")
      // success - notify parent
      onSuccess?.()
    } catch (err: any) {
      // --- precise detection for your server error shape ---
      // apiFetch throws an ApiError where .details contains parsed response JSON.
      const details = err?.details ?? err // fallback
      const message = details?.message ?? err?.message ?? ""
      const statusVal = details?.status ?? null
      const emailFromServer = details?.email ?? details?.data?.email ?? null

      const isEmailNotVerified =
        typeof message === "string" &&
        /email not verified/i.test(message) &&
        (statusVal === "unauthorized" || err?.status === 401 || err?.status === 403)

      if (isEmailNotVerified) {
        const email = emailFromServer
        toast.info("Your email is not verified. A new verification code was sent.")
        onNotVerified?.({ email, userId: details?.user_id ?? details?.id ?? null, message })
        setIsLoading(false)
        return
      }


      // parse field-level validation errors (if present)
      const parsed = parseValidationDetails(e)
      if (Object.keys(parsed).length > 0) {
        setFieldErrors(parsed)
        // show a combined toast with all messages (or just first message if you prefer)
        toast.error(Object.values(parsed).join(" — "))
      }
      // otherwise fallback
      toast.error(message || "Sign in failed.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Email */}
      {fieldErrors["email"] && <p className="text-red-600 text-sm -mt-2">{fieldErrors["email"]}</p>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); clearFieldError("email") }}
        className="h-15 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base px-5"
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

      <Button type="submit" className="w-full h-12 rounded-2xl" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}
