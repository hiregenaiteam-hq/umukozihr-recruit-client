"use client"

import React, { useEffect, useState } from "react"
import { CheckCircle, Users, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessScreenProps {
    searchCriteria: {
        jobTitles: string[]
        skills: string[]
        location: string
        industries: string[]
    }
    searchResults?: {
        total_results: number
        results: any[]
    }
    onContinue: () => void
}

export default function SuccessScreen({ searchCriteria, searchResults, onContinue }: SuccessScreenProps) {
    const [showAnimation, setShowAnimation] = useState(false)

    useEffect(() => {
        // Trigger animation after component mounts
        const timer = setTimeout(() => setShowAnimation(true), 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-umukozi-teal/5 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full text-center">
                {/* Success Animation */}
                <div className="mb-8">
                    <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 transition-all duration-1000 ${showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>

                    {/* Animated rings */}
                    <div className="relative">
                        <div className={`absolute inset-0 w-24 h-24 border-4 border-green-200 rounded-full mx-auto transition-all duration-1000 ${showAnimation ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
                        <div className={`absolute inset-0 w-24 h-24 border-4 border-green-300 rounded-full mx-auto transition-all duration-1000 delay-300 ${showAnimation ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
                    </div>
                </div>

                {/* Success Message */}
                <div className={`transition-all duration-1000 delay-500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Search Complete!
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        We found <span className="font-bold text-umukozi-orange">{searchResults?.total_results || 0}</span> amazing candidates for your <span className="font-semibold text-umukozi-orange">{searchCriteria.jobTitles.join(", ")}</span> position
                    </p>
                </div>

                {/* Search Summary */}
                <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8 transition-all duration-1000 delay-700 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex items-center justify-center mb-6">
                        <Users className="w-8 h-8 text-umukozi-orange mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">Your Search Results</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Position</h3>
                            <div className="flex flex-wrap gap-2">
                                {searchCriteria.jobTitles.map((title, index) => (
                                    <span key={index} className="px-3 py-1 bg-umukozi-orange/10 text-umukozi-orange text-sm rounded-full">
                                        {title}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                            <p className="text-gray-600">{searchCriteria.location}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {searchCriteria.skills.slice(0, 3).map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-umukozi-teal/10 text-umukozi-teal text-sm rounded-full">
                                        {skill}
                                    </span>
                                ))}
                                {searchCriteria.skills.length > 3 && (
                                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-full">
                                        +{searchCriteria.skills.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Industries</h3>
                            <div className="flex flex-wrap gap-2">
                                {searchCriteria.industries.slice(0, 2).map((industry, index) => (
                                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                                        {industry}
                                    </span>
                                ))}
                                {searchCriteria.industries.length > 2 && (
                                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-full">
                                        +{searchCriteria.industries.length - 2} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                <div className={`transition-all duration-1000 delay-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Button
                        onClick={onContinue}
                        className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-umukozi-orange to-umukozi-teal hover:from-umukozi-orange/90 hover:to-umukozi-teal/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        View Candidates
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>

                {/* Fun Message */}
                <div className={`mt-8 transition-all duration-1000 delay-1200 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-sm text-gray-500">
                        🎉 Ready to meet your next great hire!
                    </p>
                </div>
            </div>
        </div>
    )
}
