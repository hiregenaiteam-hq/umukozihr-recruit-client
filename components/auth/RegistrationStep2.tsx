"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface RegistrationStep2Props {
    data: {
        company: string
        jobTitle: string
        department: string
        phone: string
    }
    onUpdate: (data: Partial<RegistrationStep2Props['data']>) => void
    onNext: () => void
    onBack: () => void
}

export default function RegistrationStep2({
    data,
    onUpdate,
    onNext,
    onBack
}: RegistrationStep2Props) {
    const handleNext = () => {
        onNext()
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Information</h3>
                <p className="text-gray-600 text-sm">Tell us about your work details</p>
            </div>

            {/* Company */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Company</label>
                <Input
                    placeholder="Your company name"
                    value={data.company}
                    onChange={(e) => onUpdate({ company: e.target.value })}
                    className="h-12 rounded-xl border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 text-base px-4 transition-all duration-200 hover:border-umukozi-orange/60"
                />
            </div>

            {/* Job Title */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Job Title</label>
                <Input
                    placeholder="Your job title"
                    value={data.jobTitle}
                    onChange={(e) => onUpdate({ jobTitle: e.target.value })}
                    className="h-12 rounded-xl border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 text-base px-4 transition-all duration-200 hover:border-umukozi-orange/60"
                />
            </div>

            {/* Department */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Department</label>
                <Input
                    placeholder="Your department"
                    value={data.department}
                    onChange={(e) => onUpdate({ department: e.target.value })}
                    className="h-12 rounded-xl border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 text-base px-4 transition-all duration-200 hover:border-umukozi-orange/60"
                />
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Phone Number</label>
                <Input
                    type="tel"
                    placeholder="Your phone number"
                    value={data.phone}
                    onChange={(e) => onUpdate({ phone: e.target.value })}
                    className="h-12 rounded-xl border-gray-300 focus:border-umukozi-orange focus:ring-umukozi-orange/20 text-base px-4 transition-all duration-200 hover:border-umukozi-orange/60"
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-4 pt-4">
                <Button
                    type="button"
                    onClick={onBack}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                    Back
                </Button>
                <Button
                    onClick={handleNext}
                    className="flex-1 h-12 rounded-xl bg-umukozi-orange hover:bg-umukozi-orange-dark text-white font-semibold text-base transition-all duration-200 hover:shadow-md"
                >
                    Complete Registration
                </Button>
            </div>
        </div>
    )
}
