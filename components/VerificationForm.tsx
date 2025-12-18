"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { toast } from "react-toastify"
import { apiFetch, normalizeError } from "@/lib/api"

type Props = {
  email: string
  userId?: string | number | null
  digits?: number // default 6
  onVerified: () => void
  onCancel: () => void
  initialResendDelay?: number // seconds
}

export default function VerificationForm({
  email,
  userId,
  digits = 6,
  onVerified,
  onCancel,
  initialResendDelay = 60,
}: Props) {
  const [values, setValues] = useState<string[]>(Array(digits).fill(""))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(initialResendDelay)
  const [verificationEmail, setVerificationEmail] = useState(email || "")

  // success animation state
  const [success, setSuccess] = useState(false)

  // countdown effect (resend)
  useEffect(() => {
    setResendTimer(initialResendDelay)
    const t = setInterval(() => {
      setResendTimer((s) => {
        if (s <= 1) {
          clearInterval(t)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationEmail])

  useEffect(() => {
    // autofocus first input
    inputsRef.current[0]?.focus()
  }, [])

  const handleChange = (index: number, raw: string) => {
    const onlyDigits = raw.replace(/\D/g, "")
    if (!onlyDigits && raw !== "") return
    const next = [...values]
    next[index] = onlyDigits.slice(0, 1)
    setValues(next)
    if (onlyDigits && index < digits - 1) inputsRef.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && values[index] === "") {
      if (index > 0) inputsRef.current[index - 1]?.focus()
    } else if (e.key === "ArrowLeft") {
      if (index > 0) inputsRef.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight") {
      if (index < digits - 1) inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text")
    const onlyDigits = text.replace(/\D/g, "").slice(0, digits)
    if (!onlyDigits) return
    const arr = onlyDigits.split("")
    const next = Array(digits).fill("")
    for (let i = 0; i < arr.length; i++) next[i] = arr[i]
    setValues(next)
    const nextIndex = Math.min(arr.length, digits - 1)
    inputsRef.current[nextIndex]?.focus()
  }

  const code = values.join("")
  const isComplete = code.length === digits

  const verify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!verificationEmail) {
      toast.error("Email is required.")
      return
    }
    if (!isComplete) {
      toast.error("Please enter the full verification code.")
      return
    }
    setLoading(true)
    try {
      const payload: any = { email: verificationEmail.trim(), otp: code }
      if (userId) payload.user_id = userId
      await apiFetch(`/api/v1/users/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      // play success animation then call onVerified()
      setSuccess(true)
      // wait for animation duration (match CSS below)
      setTimeout(() => {
        setSuccess(false)
        onVerified()
      }, 1500) // 1.5s to allow animation to complete
    } catch (e: any) {
      const { title, description } = normalizeError(e)
      toast.error(`${title}: ${description}`)
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    if (!verificationEmail) {
      toast.error("No email to resend code to.")
      return
    }
    if (resendTimer > 0) {
      toast.info(`Please wait ${resendTimer}s before resending.`)
      return
    }
    setResendLoading(true)
    try {
      await apiFetch(`/api/v1/users/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: verificationEmail.trim() }),
      })
      toast.success("Verification code resent. Check your inbox.")
      // reset timer
      setResendTimer(initialResendDelay)
      const t = setInterval(() => {
        setResendTimer((s) => {
          if (s <= 1) {
            clearInterval(t)
            return 0
          }
          return s - 1
        })
      }, 1000)
    } catch (e: any) {
      const { title, description } = normalizeError(e)
      toast.error(`${title}: ${description}`)
    } finally {
      setResendLoading(false)
    }
  }

  // UI: if success, show animated checkmark overlay
  if (success) {
    return (
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl p-8 relative flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-28 h-28">
            {/* Animated circle + checkmark */}
            <svg className="w-28 h-28" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50" stroke="#10B981" strokeWidth="6" strokeDasharray="314" strokeDashoffset="314" />
              <path d="M38 62 L54 78 L82 46" stroke="#10B981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" strokeDashoffset="200" />
              {/* we'll animate via inline style below */}
            </svg>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold">Verified!</h4>
            <p className="text-sm text-slate-600">Thanks — your email has been confirmed.</p>
          </div>

        </div>

        {/* Inline styles to animate strokeDashoffset via CSS-in-JS */}
        <style>{`
          svg circle {
            transform-origin: 50% 50%;
            animation: circle-pop 700ms ease forwards;
          }
          svg path {
            animation: check-draw 800ms 300ms ease forwards;
          }
          @keyframes circle-pop {
            from { stroke-dashoffset: 314; opacity: 0.6; transform: scale(0.8) }
            to   { stroke-dashoffset: 0; opacity: 1; transform: scale(1) }
          }
          @keyframes check-draw {
            from { stroke-dashoffset: 200; opacity: 0 }
            to   { stroke-dashoffset: 0; opacity: 1 }
          }
        `}</style>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-lg bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl p-8 relative">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center mb-3">
          <Sparkles className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-2xl font-semibold">Verify your email</h3>
        </div>
        <p className="text-sm text-slate-600">Enter the code we sent to <strong>{verificationEmail}</strong>.</p>
      </div>

      <form onSubmit={verify} className="space-y-4">
        {/* <div>
          <label className="text-xs text-slate-500 block mb-1">Email</label>
          <Input
            type="email"
            value={verificationEmail}
            disabled
            className="h-12 rounded-2xl px-4 text-opacity-30"
            required
          />
        </div> */}

        <div>
          <label className="text-xs text-slate-500 block mb-2">Verification code</label>
          <div className="flex gap-2 justify-center">
            {Array.from({ length: digits }).map((_, i) => (
              <input
                key={i}
                ref={(el) => { inputsRef.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={values[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center border border-black focus:border-umukozi-orange focus:ring-umukozi-orange/20 rounded-lg text-xl focus:outline-none"
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="flex-1 h-12 rounded-2xl" disabled={loading || !isComplete}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
          <Button type="button" variant="ghost" className="h-12 rounded-2xl" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500 mt-2">
          <button
            type="button"
            className={`underline ${resendTimer > 0 ? "text-slate-400 cursor-not-allowed" : "text-slate-600"}`}
            onClick={resend}
            disabled={resendLoading || resendTimer > 0}
          >
            {resendLoading ? "Resending…" : resendTimer > 0 ? `Resend code (${resendTimer}s)` : "Resend code"}
          </button>

          <button
            type="button"
            className="underline text-slate-600"
            onClick={() => onCancel()}
          >
            I already verified — Sign in
          </button>
        </div>
      </form>
    </Card>
  )
}
