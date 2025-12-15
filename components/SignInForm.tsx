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
  onSwitchToSignUp?: () => void
}

type ApiError = Error & {
  status?: number
  details?: unknown
}


export default function SignInForm({ onSuccess, onNotVerified, onSwitchToSignUp }: Props) {
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
      const loginData = await loginAndGetToken(email, password)
      const token = loginData?.token || loginData?.access_token || loginData?.accessToken

      // Set all required cookies for the external API
      setCookie("hg_token", token || "", 7)
      if (loginData?.access_token) {
        setCookie("access_token", loginData.access_token, 7)
      }
      if (loginData?.refresh_token) {
        setCookie("refresh_token", loginData.refresh_token, 7)
      }
      if (loginData?.session_id) {
        setCookie("session_id", loginData.session_id, 7)
      }

      // Store user data in localStorage for easy access
      if (loginData) {
        const userData = {
          id: loginData.id,
          email: loginData.email,
          username: loginData.username,
          full_name: loginData.full_name,
          company: loginData.company,
          job_title: loginData.job_title,
          is_active: loginData.is_active,
          is_verified: loginData.is_verified,
          is_premium: loginData.is_premium,
          subscription_tier: loginData.subscription_tier
        }
        localStorage.setItem('user_data', JSON.stringify(userData))
      }

      toast.success("You're now signed in.")
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
    <div className="w-full">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-medium text-slate-900 mb-2 font-inter">Welcome back</h3>
          <p className="text-slate-600 font-inter">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 font-inter">Email</label>
            {fieldErrors["email"] && (
              <p className="text-sm text-red-600 font-inter">{fieldErrors["email"]}</p>
            )}
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFieldError("email") }}
              className={`h-11 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 ${fieldErrors["email"] ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                }`}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 font-inter">Password</label>
            {fieldErrors["password"] && (
              <p className="text-sm text-red-600 font-inter">{fieldErrors["password"]}</p>
            )}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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


          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 rounded-lg bg-umukozi-orange hover:bg-umukozi-orange-dark text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>


          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-sm text-slate-600 font-inter">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="text-umukozi-orange hover:text-umukozi-orange-dark font-medium transition-colors font-inter"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}