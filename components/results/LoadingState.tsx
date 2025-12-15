"use client"

import { useState, useEffect } from "react"

export default function LoadingState() {
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [candidatesFound, setCandidatesFound] = useState(0)
    const [isStreaming, setIsStreaming] = useState(true)

    const steps = [
        {
            text: "Analyzing your requirements...",
            duration: 2000,
            candidates: 0
        },
        {
            text: "Searching our talent database...",
            duration: 3000,
            candidates: 0
        },
        {
            text: "Finding matching candidates...",
            duration: 4000,
            candidates: 0
        },
        {
            text: "Calculating match scores...",
            duration: 3000,
            candidates: 0
        },
        {
            text: "Finalizing results...",
            duration: 2000,
            candidates: 0
        }
    ]

    useEffect(() => {
        let stepIndex = 0
        let progressInterval: NodeJS.Timeout
        let candidateInterval: NodeJS.Timeout
        let stepTimeout: NodeJS.Timeout

        const startStreaming = () => {
            // Progress animation
            progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval)
                        setIsStreaming(false)
                        return 100
                    }
                    return prev + Math.random() * 8 + 2
                })
            }, 200)

            // Candidate count animation
            candidateInterval = setInterval(() => {
                setCandidatesFound(prev => {
                    if (prev >= 47) return 47 // Don't go over expected count
                    return prev + Math.floor(Math.random() * 3) + 1
                })
            }, 300)

            // Step progression
            const runSteps = () => {
                if (stepIndex < steps.length) {
                    setCurrentStep(stepIndex)
                    stepTimeout = setTimeout(() => {
                        stepIndex++
                        runSteps()
                    }, steps[stepIndex].duration)
                }
            }
            runSteps()
        }

        startStreaming()

        return () => {
            clearInterval(progressInterval)
            clearInterval(candidateInterval)
            clearTimeout(stepTimeout)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
            <div className="flex items-center justify-center min-h-screen px-6">
                <div className="max-w-2xl w-full">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center animate-pulse">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-light text-slate-800">
                                Finding Your Perfect Candidates
                            </h1>
                        </div>
                        <p className="text-lg text-slate-600 max-w-xl mx-auto">
                            Our AI is actively searching and analyzing profiles in real-time
                        </p>
                    </div>

                    {/* Main Progress Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
                        {/* Progress Ring */}
                        <div className="flex items-center justify-center mb-8">
                            <div className="relative w-32 h-32">
                                {/* Outer ring */}
                                <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>
                                {/* Progress ring */}
                                <div
                                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-500 transition-all duration-500 ease-out"
                                    style={{
                                        transform: `rotate(${progress * 3.6}deg)`,
                                        filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.3))'
                                    }}
                                ></div>
                                {/* Inner content */}
                                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-orange-600">
                                            {Math.round(progress)}%
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">Complete</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Current Step */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span className="text-orange-700 font-medium">
                                    {steps[currentStep]?.text || "Processing..."}
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
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
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                <div className="text-2xl font-bold text-orange-600 mb-1">
                                    {candidatesFound}
                                </div>
                                <div className="text-sm text-slate-600">Candidates Found</div>
                                {isStreaming && (
                                    <div className="text-xs text-orange-500 mt-1 animate-pulse">
                                        Live updating...
                                    </div>
                                )}
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                <div className="text-2xl font-bold text-slate-600 mb-1">
                                    {Math.round(progress * 0.8)}%
                                </div>
                                <div className="text-sm text-slate-600">Match Quality</div>
                                <div className="text-xs text-slate-500 mt-1">
                                    AI analyzing...
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Activity Feed */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Live Search Activity
                        </h3>
                        <div className="space-y-3">
                            {isStreaming && (
                                <>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 animate-pulse">
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                        <span>Scanning candidate profiles...</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 animate-pulse" style={{ animationDelay: '0.5s' }}>
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                        <span>Matching skills and experience...</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 animate-pulse" style={{ animationDelay: '1s' }}>
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                        <span>Calculating relevance scores...</span>
                                    </div>
                                </>
                            )}
                            {!isStreaming && (
                                <div className="flex items-center gap-3 text-sm text-green-600">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                    <span>Search complete! Preparing your results...</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Estimated Time */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-500">
                            Usually takes 30-60 seconds • {Math.max(0, 60 - Math.round(progress * 0.6))}s remaining
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}