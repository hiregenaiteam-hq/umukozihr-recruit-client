"use client"

import React from "react"
import { Check } from "lucide-react"

interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
    stepLabels: string[]
}

export default function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-center space-x-4 mb-8">
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1
                const isCompleted = stepNumber < currentStep
                const isCurrent = stepNumber === currentStep
                const isUpcoming = stepNumber > currentStep

                return (
                    <div key={stepNumber} className="flex items-center">
                        {/* Step Circle */}
                        <div className="flex items-center justify-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${isCompleted
                                    ? "bg-umukozi-orange text-white"
                                    : isCurrent
                                        ? "bg-umukozi-orange text-white ring-4 ring-umukozi-orange/20"
                                        : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {isCompleted ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    stepNumber
                                )}
                            </div>
                        </div>

                        {/* Step Label */}
                        <div className="ml-2 hidden sm:block">
                            <p
                                className={`text-xs font-medium ${isCompleted || isCurrent ? "text-umukozi-orange" : "text-gray-500"
                                    }`}
                            >
                                {stepLabels[index]}
                            </p>
                        </div>

                        {/* Connector Line */}
                        {stepNumber < totalSteps && (
                            <div
                                className={`w-8 h-0.5 mx-2 transition-all duration-200 ${isCompleted ? "bg-umukozi-orange" : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
