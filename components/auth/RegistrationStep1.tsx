"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface RegistrationStep1Props {
    data: {
        fullName: string
        email: string
        username: string
        password: string
        confirmPassword: string
    }
    onUpdate: (data: Partial<RegistrationStep1Props['data']>) => void
    onNext: () => void
    fieldErrors: Record<string, string>
    clearFieldError: (field: string) => void
}

export default function RegistrationStep1({
    data,
    onUpdate,
    onNext,
    fieldErrors,
    clearFieldError
}: RegistrationStep1Props) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleNext = () => {
        onNext()
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Your Account</h3>
                <p className="text-gray-600 text-sm">Let's start with your basic information</p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Full Name *</label>
                <Input
                    placeholder="Enter your full name"
                    value={data.fullName}
                    onChange={(e) => { onUpdate({ fullName: e.target.value }); clearFieldError("full_name") }}
                    className="h-12 rounded-xl border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 text-base px-4 transition-all duration-200 hover:border-umukozi-orange/60"
                    required
                />
            </div>

            {/* Email */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Email Address *</label>
                {fieldErrors["email"] && <p className="text-red-500 text-sm">{fieldErrors["email"]}</p>}
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={(e) => { onUpdate({ email: e.target.value }); clearFieldError("email") }}
                    className="h-12 rounded-xl border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 text-base px-4 transition-all duration-200 hover:border-umukozi-orange/60"
                    required
                />
            </div>

            {/* Username */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Username *</label>
                <Input
                    placeholder="Choose a username"
                    value={data.username}
                    onChange={(e) => { onUpdate({ username: e.target.value }); clearFieldError("username") }}
                    className="h-12 rounded-xl border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 text-base px-4 transition-all duration-200 hover:border-umukozi-orange/60"
                    required
                />
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Password *</label>
                {fieldErrors["password"] && <p className="text-red-500 text-sm">{fieldErrors["password"]}</p>}
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={data.password}
                        onChange={(e) => { onUpdate({ password: e.target.value }); clearFieldError("password") }}
                        className="h-12 rounded-xl border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 text-base px-4 pr-12 transition-all duration-200 hover:border-umukozi-orange/60"
                        required
                    />
                    <button
                        type="button"
                        aria-label={showPassword ? "Show password" : "Hide password"}
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-umukozi-orange transition-colors duration-200"
                    >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Confirm Password *</label>
                {fieldErrors["confirm_password"] && <p className="text-red-500 text-sm">{fieldErrors["confirm_password"]}</p>}
                <div className="relative">
                    <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={data.confirmPassword}
                        onChange={(e) => { onUpdate({ confirmPassword: e.target.value }); clearFieldError("confirm_password") }}
                        className="h-12 rounded-xl border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 text-base px-4 pr-12 transition-all duration-200 hover:border-umukozi-orange/60"
                        required
                    />
                    <button
                        type="button"
                        aria-label={showConfirm ? "Show confirm password" : "Hide confirm password"}
                        onClick={() => setShowConfirm((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-umukozi-orange transition-colors duration-200"
                    >
                        {showConfirm ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Next Button */}
            <Button
                onClick={handleNext}
                className="w-full h-12 rounded-xl bg-umukozi-orange hover:bg-umukozi-orange-dark text-white font-semibold text-base transition-all duration-200 hover:shadow-md"
            >
                Continue to Profile
            </Button>
        </div>
    )
}
