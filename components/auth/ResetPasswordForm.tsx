"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { verifyPasswordReset, requestPasswordReset } from "@/lib/api"
import { ArrowLeft, KeyRound, Loader2, Eye, EyeOff, CheckCircle } from "lucide-react"

type Props = {
  email: string
  onSuccess: () => void
  onBack: () => void
}

export default function ResetPasswordForm({ email, onSuccess, onBack }: Props) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (pastedData) {
      const newOtp = [...otp]
      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newOtp[i] = pastedData[i]
      }
      setOtp(newOtp)
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
    }
  }

  const handleResendCode = async () => {
    if (resendCooldown > 0 || isResending) return

    setIsResending(true)
    try {
      const result = await requestPasswordReset(email)
      if (result.success) {
        toast.success("New reset code sent!")
        setResendCooldown(60)
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error("Failed to resend code.")
    } finally {
      setIsResending(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const otpCode = otp.join("")
    if (otpCode.length !== 6) {
      toast.error("Please enter the 6-digit code.")
      return
    }

    if (!newPassword) {
      toast.error("Please enter your new password.")
      return
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }

    setIsLoading(true)

    try {
      const result = await verifyPasswordReset({
        email,
        otp: otpCode,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })

      if (result.success) {
        toast.success("Password reset successfully!")
        onSuccess()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!newPassword) return { strength: 0, text: "", color: "" }
    let strength = 0
    if (newPassword.length >= 8) strength++
    if (/[a-z]/.test(newPassword)) strength++
    if (/[A-Z]/.test(newPassword)) strength++
    if (/\d/.test(newPassword)) strength++
    if (/[^a-zA-Z0-9]/.test(newPassword)) strength++

    if (strength <= 2) return { strength, text: "Weak", color: "bg-red-500" }
    if (strength <= 3) return { strength, text: "Medium", color: "bg-yellow-500" }
    return { strength, text: "Strong", color: "bg-green-500" }
  }

  const passwordStrength = getPasswordStrength()

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
          Back
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-umukozi-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-umukozi-orange" />
          </div>
          <h3 className="text-2xl font-medium text-slate-900 mb-2 font-inter">Reset Password</h3>
          <p className="text-slate-600 font-inter text-sm">
            Enter the code sent to <span className="font-medium text-slate-900">{email}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* OTP Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 font-inter">Verification Code</label>
            <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20"
                />
              ))}
            </div>
            <div className="text-center mt-2">
              {resendCooldown > 0 ? (
                <p className="text-sm text-slate-500 font-inter">
                  Resend code in {resendCooldown}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="text-sm text-umukozi-orange hover:text-umukozi-orange-dark font-medium font-inter transition-colors disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend code"}
                </button>
              )}
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 font-inter">New Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 pr-10 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Password Strength */}
            {newPassword && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        level <= passwordStrength.strength ? passwordStrength.color : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs ${
                  passwordStrength.text === "Strong" ? "text-green-600" :
                  passwordStrength.text === "Medium" ? "text-yellow-600" : "text-red-600"
                }`}>
                  {passwordStrength.text}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 font-inter">Confirm Password</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 pr-10 rounded-lg border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Match indicator */}
            {confirmPassword && (
              <div className={`flex items-center gap-1 text-xs ${
                newPassword === confirmPassword ? "text-green-600" : "text-red-600"
              }`}>
                {newPassword === confirmPassword ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    <span>Passwords match</span>
                  </>
                ) : (
                  <span>Passwords do not match</span>
                )}
              </div>
            )}
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
                <span>Resetting...</span>
              </div>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
