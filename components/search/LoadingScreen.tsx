"use client"

import React, { useState, useEffect } from "react"
import { Search, Users, Zap, Target, Brain, CheckCircle } from "lucide-react"

interface LoadingScreenProps {
    searchCriteria: {
        jobTitles: string[]
        skills: string[]
        location: string
        industries: string[]
    }
}

const searchSteps = [
    {
        icon: Brain,
        title: "Analyzing Requirements",
        description: "Processing your job criteria and skill requirements",
        duration: 2000
    },
    {
        icon: Search,
        title: "Database Search",
        description: "Scanning our talent database for matching profiles",
        duration: 3000
    },
    {
        icon: Target,
        title: "Skill Matching",
        description: "Matching candidates based on skills and experience",
        duration: 2500
    },
    {
        icon: Zap,
        title: "AI Analysis",
        description: "Running AI algorithms to calculate match scores",
        duration: 2000
    },
    {
        icon: Users,
        title: "Finalizing Results",
        description: "Preparing your personalized candidate recommendations",
        duration: 1500
    }
]

export default function LoadingScreen({ searchCriteria }: LoadingScreenProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [progress, setProgress] = useState(0)
    const [candidatesFound, setCandidatesFound] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [liveActivity, setLiveActivity] = useState<string[]>([])

    const activities = [
        "Scanning candidate profiles...",
        "Analyzing skill matches...",
        "Calculating relevance scores...",
        "Filtering by location...",
        "Checking availability...",
        "Verifying credentials...",
        "Ranking candidates...",
        "Preparing results..."
    ]

    useEffect(() => {
        let stepIndex = 0
        let progressInterval: NodeJS.Timeout
        let candidateInterval: NodeJS.Timeout
        let activityInterval: NodeJS.Timeout
        let stepTimeout: NodeJS.Timeout

        const startSearch = () => {
            // Progress animation
            progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval)
                        setIsComplete(true)
                        return 100
                    }
                    return prev + Math.random() * 6 + 3
                })
            }, 150)

            // Candidate count animation
            candidateInterval = setInterval(() => {
                setCandidatesFound(prev => {
                    if (prev >= 47) return 47
                    return prev + Math.floor(Math.random() * 2) + 1
                })
            }, 400)

            // Live activity updates
            let activityIndex = 0
            activityInterval = setInterval(() => {
                setLiveActivity(prev => {
                    const newActivity = activities[activityIndex % activities.length]
                    activityIndex++
                    return [...prev.slice(-2), newActivity] // Keep last 3 activities
                })
            }, 1500)

            // Step progression
            const runSteps = () => {
                if (stepIndex < searchSteps.length) {
                    setCurrentStep(stepIndex)
                    stepTimeout = setTimeout(() => {
                        stepIndex++
                        runSteps()
                    }, searchSteps[stepIndex].duration)
                }
            }
            runSteps()
        }

        startSearch()

        return () => {
            clearInterval(progressInterval)
            clearInterval(candidateInterval)
            clearInterval(activityInterval)
            clearTimeout(stepTimeout)
        }
    }, [])

    const CurrentStepIcon = searchSteps[currentStep]?.icon || Search

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center animate-pulse">
                            <Search className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-light text-slate-800">
                            Finding Your Perfect Candidates
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Our AI is actively searching and analyzing profiles in real-time
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Side - Progress */}
                    <div className="space-y-6">
                        {/* Main Progress Card */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                            {/* Progress Ring */}
                            <div className="flex items-center justify-center mb-6">
                                <div className="relative w-24 h-24">
                                    <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>
                                    <div
                                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-500 transition-all duration-500 ease-out"
                                        style={{
                                            transform: `rotate(${progress * 3.6}deg)`,
                                            filter: 'drop-shadow(0 0 15px rgba(249, 115, 22, 0.3))'
                                        }}
                                    ></div>
                                    <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <div className="text-xl font-bold text-orange-600">
                                            {Math.round(progress)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Current Step */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
                                    <CurrentStepIcon className="w-5 h-5 text-orange-600" />
                                    <span className="text-orange-700 font-medium">
                                        {searchSteps[currentStep]?.title || "Processing..."}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 mt-2">
                                    {searchSteps[currentStep]?.description || "Please wait..."}
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                                    <span>Search Progress</span>
                                    <span className="font-medium">{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 ease-out relative"
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Live Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-2xl font-bold text-orange-600 mb-1">
                                        {candidatesFound}
                                    </div>
                                    <div className="text-sm text-slate-600">Candidates Found</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-2xl font-bold text-slate-600 mb-1">
                                        {Math.round(progress * 0.9)}%
                                    </div>
                                    <div className="text-sm text-slate-600">Match Quality</div>
                                </div>
                            </div>
                        </div>

                        {/* Search Criteria */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5 text-orange-600" />
                                Your Search Criteria
                            </h3>
                            <div className="space-y-3">
                                {searchCriteria.jobTitles.length > 0 && (
                                    <div>
                                        <span className="text-sm font-medium text-slate-600">Position:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {searchCriteria.jobTitles.slice(0, 2).map((title, index) => (
                                                <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                                    {title}
                                                </span>
                                            ))}
                                            {searchCriteria.jobTitles.length > 2 && (
                                                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                                    +{searchCriteria.jobTitles.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {searchCriteria.skills.length > 0 && (
                                    <div>
                                        <span className="text-sm font-medium text-slate-600">Skills:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {searchCriteria.skills.slice(0, 3).map((skill, index) => (
                                                <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                            {searchCriteria.skills.length > 3 && (
                                                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                                    +{searchCriteria.skills.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {searchCriteria.location && (
                                    <div className="text-sm text-slate-600">
                                        📍 {searchCriteria.location}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Live Activity */}
                    <div className="space-y-6">
                        {/* Live Activity Feed */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Live Search Activity
                            </h3>
                            <div className="space-y-4">
                                {liveActivity.map((activity, index) => (
                                    <div key={index} className="flex items-center gap-3 text-sm text-slate-600 animate-fadeIn">
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                                        <span>{activity}</span>
                                    </div>
                                ))}
                                {isComplete && (
                                    <div className="flex items-center gap-3 text-sm text-green-600 animate-fadeIn">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Search complete! Preparing your results...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Step Progress */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Search Steps</h3>
                            <div className="space-y-3">
                                {searchSteps.map((step, index) => {
                                    const StepIcon = step.icon
                                    const isActive = index === currentStep
                                    const isCompleted = index < currentStep

                                    return (
                                        <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-orange-50 border border-orange-200' :
                                            isCompleted ? 'bg-green-50 border border-green-200' :
                                                'bg-slate-50'
                                            }`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-orange-500 animate-pulse' :
                                                isCompleted ? 'bg-green-500' :
                                                    'bg-slate-300'
                                                }`}>
                                                <StepIcon className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className={`text-sm font-medium ${isActive ? 'text-orange-700' :
                                                    isCompleted ? 'text-green-700' :
                                                        'text-slate-600'
                                                    }`}>
                                                    {step.title}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {step.description}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Estimated Time */}
                        <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20">
                            <p className="text-sm text-slate-600">
                                Usually takes 30-60 seconds • {Math.max(0, 60 - Math.round(progress * 0.6))}s remaining
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}