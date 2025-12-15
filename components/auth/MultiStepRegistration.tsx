"use client"

import React, { useState } from "react"
import { toast } from "react-toastify"
import RegistrationStep1 from "./RegistrationStep1"
import RegistrationStep2 from "./RegistrationStep2"
import StepIndicator from "./StepIndicator"
import { registerUser } from "@/lib/api"

interface MultiStepRegistrationProps {
    onSignedUp: (data: { email: string; userId?: string | number }) => void
}

interface RegistrationData {
    // Step 1
    fullName: string
    email: string
    username: string
    password: string
    confirmPassword: string
    // Step 2
    company: string
    jobTitle: string
    department: string
    phone: string
}

export default function MultiStepRegistration({ onSignedUp }: MultiStepRegistrationProps) {
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const [formData, setFormData] = useState<RegistrationData>({
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        company: "",
        jobTitle: "",
        department: "",
        phone: ""
    })

    const stepLabels = ["Account", "Profile"]

    const updateFormData = (newData: Partial<RegistrationData>) => {
        setFormData(prev => ({ ...prev, ...newData }))
    }

    const clearFieldError = (field: string) => {
        if (fieldErrors[field]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const validateStep1 = (): boolean => {
        const errors: Record<string, string> = {}

        if (!formData.fullName.trim()) {
            errors.full_name = "Full name is required"
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Please enter a valid email address"
        }

        if (!formData.username.trim()) {
            errors.username = "Username is required"
        } else if (formData.username.length < 3) {
            errors.username = "Username must be at least 3 characters"
        }

        if (!formData.password) {
            errors.password = "Password is required"
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters"
        }

        if (!formData.confirmPassword) {
            errors.confirm_password = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirm_password = "Passwords do not match"
        }

        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleStep1Next = () => {
        if (validateStep1()) {
            setCurrentStep(2)
        }
    }

    const handleStep2Next = async () => {
        setIsLoading(true)
        try {
            const response = await registerUser({
                full_name: formData.fullName,
                email: formData.email,
                username: formData.username,
                password: formData.password,
                company: formData.company || undefined,
                job_title: formData.jobTitle || undefined,
                department: formData.department || undefined,
                phone: formData.phone || undefined
            })

            if (response.success) {
                toast.success("Account created successfully! Please check your email for verification.")
                onSignedUp({
                    email: formData.email,
                    userId: response.user?.id
                })
            } else {
                toast.error(response.message || "Registration failed. Please try again.")
            }
        } catch (error) {
            console.error("Registration error:", error)
            toast.error("Registration failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleBack = () => {
        setCurrentStep(1)
    }

    return (
        <div className="w-full">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h3 className="text-2xl font-medium text-slate-900 mb-2 font-inter">Join Umukozi HR</h3>
                    <p className="text-slate-600 font-inter">Create your professional account</p>
                </div>

                {/* Step Indicator */}
                <div className="flex justify-center">
                    <StepIndicator
                        currentStep={currentStep}
                        totalSteps={2}
                        stepLabels={stepLabels}
                    />
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                    {currentStep === 1 && (
                        <RegistrationStep1
                            data={{
                                fullName: formData.fullName,
                                email: formData.email,
                                username: formData.username,
                                password: formData.password,
                                confirmPassword: formData.confirmPassword
                            }}
                            onUpdate={updateFormData}
                            onNext={handleStep1Next}
                            fieldErrors={fieldErrors}
                            clearFieldError={clearFieldError}
                        />
                    )}

                    {currentStep === 2 && (
                        <RegistrationStep2
                            data={{
                                company: formData.company,
                                jobTitle: formData.jobTitle,
                                department: formData.department,
                                phone: formData.phone
                            }}
                            onUpdate={updateFormData}
                            onNext={handleStep2Next}
                            onBack={handleBack}
                        />
                    )}
                </div>

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-umukozi-orange/30 border-t-umukozi-orange rounded-full animate-spin"></div>
                            <span className="text-umukozi-orange font-medium">Creating account...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
