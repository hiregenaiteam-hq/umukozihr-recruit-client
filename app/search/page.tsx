"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import {
  StepHeader,
  VerticalStepper,
  StepNavigation,
  SearchSummary,
  FormField,
  TagAutocomplete,
  ExperienceRange,
  LocationAutocomplete,
  LoadingScreen
} from "@/components/search"
import AnimatedFormField from "@/components/search/AnimatedFormField"
import SuccessScreen from "@/components/search/SuccessScreen"

import {
  JOB_SUGGESTIONS,
  SKILL_SUGGESTIONS,
  INDUSTRY_SUGGESTIONS,
  EDUCATION_SUGGESTIONS,
  LOCATION_SUGGESTIONS,
  EXPERIENCE_RANGE,
  EXPERIENCE_PRESETS,
  SEARCH_STEPS
} from "@/lib/constants"
import { X, Check, Sparkles } from "lucide-react"

// IMPORTANT: uses apiFetch util provided by your codebase. Update the import path if needed.
import { apiFetch, normalizeError, parseValidationDetails, getCookie } from "@/lib/api"



// --- Types ---
type Toast = { type: "error" | "success"; message: string } | null





export default function PremiumSearchPage() {
  const router = useRouter()

  // Stepper state
  const [currentStep, setCurrentStep] = useState(1)

  // Selected fields with better defaults
  const [jobTitles, setJobTitles] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [industries, setIndustries] = useState<string[]>([])
  const [educations, setEducations] = useState<string[]>([])
  const [location, setLocation] = useState<string>("")
  // Remove search mode - always use database search

  // experience
  const [expMin, setExpMin] = useState<number>(EXPERIENCE_RANGE.DEFAULT_MIN)
  const [expMax, setExpMax] = useState<number>(EXPERIENCE_RANGE.DEFAULT_MAX)

  // UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<any>(null)
  const [toast, setToast] = useState<Toast>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const steps = [
    { id: 1, title: "Job Position", description: "What role are you hiring for?" },
    { id: 2, title: "Requirements", description: "Experience & education needed" },
    { id: 3, title: "Location & Industry", description: "Where and what business" },
    { id: 4, title: "Review & Search", description: "Review and find candidates" }
  ]

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return jobTitles.length > 0
      case 2:
        return true // Experience and education are optional
      case 3:
        return true // Location and industry are optional
      case 4:
        return jobTitles.length > 0
      default:
        return false
    }
  }

  // Build payload
  const payload = useMemo(() => {
    return {
      criteria: {
        job_titles: jobTitles,
        skills_keywords: skills,
        location_full: location,
        education_levels: educations,
        industry_keywords: industries,
        experience_years_min: Number(expMin),
        experience_years_max: Number(expMax),
      },
      search_mode: "database",
      // use_hardcoded_response: true, // Use hardcoded response for testing
    }
  }, [jobTitles, skills, location, educations, industries, expMin, expMax])

  const handleEditSection = (section: string) => {
    switch (section) {
      case 'job-position':
        setCurrentStep(1)
        break
      case 'requirements':
        setCurrentStep(2)
        break
      case 'location-industry':
        setCurrentStep(3)
        break
      default:
        break
    }
  }

  const submit = async (): Promise<void> => {
    // User-friendly validation
    if (payload.criteria.job_titles.length === 0) {
      setToast({ type: "error", message: "Please tell us what job position you're looking to fill." })
      return
    }

    if (payload.criteria.skills_keywords.length === 0) {
      setToast({ type: "error", message: "Adding some skills will help us find better matches for you." })
      return
    }

    if (!payload.criteria.location_full) {
      setToast({ type: "error", message: "Please specify the work location for this position." })
      return
    }

    if (payload.criteria.experience_years_min > payload.criteria.experience_years_max) {
      setToast({ type: "error", message: "Minimum experience cannot be greater than maximum experience." })
      return
    }

    setIsSubmitting(true)
    setIsLoading(true)
    setToast(null)
    setFieldErrors({})

    try {
      // Log the payload for debugging
      console.log("Submitting search with payload:", payload)

      // Use local API route to avoid CORS issues
      const token = getCookie("hg_token")
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }

      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await fetch("/api/search", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        credentials: "include", // This ensures cookies are sent with the request
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const data = await response.json()

      console.log("Search API response:", data)

      // Validate that we have actual results
      if (!data || !data.results || data.results.length === 0) {
        setToast({ type: "error", message: "No candidates found matching your criteria. Please try adjusting your search parameters." })
        return
      }

      // Store the search results in localStorage for the results page
      localStorage.setItem('searchResults', JSON.stringify(data))
      localStorage.setItem('searchCriteria', JSON.stringify(payload))

      // Store results for success screen
      setSearchResults(data)

      // Show success screen briefly before navigating
      setShowSuccess(true)

      // Navigate to results page after showing success
      setTimeout(() => {
        router.push("/results")
      }, 3000)
    } catch (err: unknown) {
      const norm = normalizeError(err)
      setToast({ type: "error", message: `${norm.title}: ${norm.description}` })

      // parse validation details if available
      try {
        const parsed = parseValidationDetails(err as any)
        if (Object.keys(parsed).length) setFieldErrors(parsed)
      } catch (e) {
        // ignore
      }
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  const handleContinueToResults = () => {
    router.push("/results")
  }

  // small helper to render toast
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4800)
    return () => clearTimeout(t)
  }, [toast])

  // Show success screen when search is complete
  if (showSuccess) {
    return (
      <SuccessScreen
        searchCriteria={{
          jobTitles,
          skills,
          location,
          industries
        }}
        searchResults={searchResults}
        onContinue={handleContinueToResults}
      />
    )
  }

  // Show loading screen when searching
  if (isLoading) {
    return (
      <LoadingScreen
        searchCriteria={{
          jobTitles,
          skills,
          location,
          industries
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,140,0,0.05)_1px,transparent_0)] bg-[length:24px_24px] opacity-20"></div>
      <div className="relative">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-4 font-inter">
              Find the perfect candidate
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter">
              Follow our simple steps to discover qualified candidates for your team
            </p>
          </div>

          {/* Vertical Stepper Layout */}
          <div className="flex gap-12 max-w-7xl mx-auto px-6">
            {/* Left Side - Vertical Stepper */}
            <VerticalStepper
              steps={steps}
              currentStep={currentStep}
              completedSections={new Set([
                ...(jobTitles.length > 0 ? ['job-position'] : []),
                ...(skills.length > 0 || educations.length > 0 || (expMin !== 0 || expMax !== 5) ? ['requirements'] : []),
                ...(location || industries.length > 0 ? ['location-industry'] : [])
              ])}
            />

            {/* Right Side - Step Content */}
            <div className="flex-1">
              <Card className="p-8 umukozi-card-clean min-h-[600px] relative overflow-visible">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-umukozi-orange/3 via-transparent to-umukozi-teal/3 pointer-events-none"></div>
                <div className="relative">
                  {/* Clean Progress Indicator */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-600 font-inter">Step {currentStep} of {steps.length}</span>
                      <span className="text-sm font-medium text-umukozi-orange font-inter">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-umukozi-orange h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Step 1: Job Position */}
                  {currentStep === 1 && (
                    <div className="space-y-12">
                      <StepHeader
                        title="What position are you hiring for?"
                        description="Tell us about the job role and required skills for your ideal candidate"
                      />

                      {/* Clean Job Position Section */}
                      <div className="space-y-12">
                        {/* Job Title Section */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md hover:border-umukozi-orange/30 transition-all duration-300 overflow-visible">
                          <div className="mb-6">
                            <h3 className="text-xl font-medium text-slate-900 mb-3 font-inter">
                              Job Title
                            </h3>
                            <p className="text-base text-gray-600">Select the primary role you're hiring for</p>
                          </div>

                          <FormField label="">
                            <TagAutocomplete
                              label=""
                              placeholder="e.g. Nurse, Teacher, Sales Representative"
                              suggestions={JOB_SUGGESTIONS as unknown as string[]}
                              selected={jobTitles}
                              setSelected={setJobTitles}
                              emptyMessage="No positions found"
                            />
                          </FormField>
                        </div>

                        {/* Required Skills Section */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md hover:border-umukozi-orange/30 transition-all duration-300 overflow-visible">
                          <div className="mb-6">
                            <h3 className="text-xl font-medium text-slate-900 mb-3 font-inter">
                              Required Skills
                            </h3>
                            <p className="text-base text-gray-600">What skills and competencies should your ideal candidate have?</p>
                          </div>

                          <FormField label="">
                            <TagAutocomplete
                              label=""
                              placeholder="e.g. Communication, Microsoft Office, Customer Service"
                              suggestions={SKILL_SUGGESTIONS as unknown as string[]}
                              selected={skills}
                              setSelected={setSkills}
                              emptyMessage="No skills found"
                            />
                          </FormField>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Requirements */}
                  {currentStep === 2 && (
                    <div className="space-y-12">
                      <StepHeader
                        title="Experience & Education Requirements"
                        description="Set the experience level and education requirements for your ideal candidate"
                      />

                      {/* Clean Requirements Section */}
                      <div className="space-y-12">
                        {/* Experience Range Section */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md hover:border-umukozi-orange/30 transition-all duration-300 overflow-visible">
                          <div className="mb-6">
                            <h3 className="text-xl font-medium text-slate-900 mb-3 font-inter">
                              Experience Range
                            </h3>
                            <p className="text-base text-gray-600">How many years of experience should your ideal candidate have?</p>
                          </div>

                          <FormField label="">
                            <ExperienceRange
                              min={expMin}
                              max={expMax}
                              onMinChange={setExpMin}
                              onMaxChange={setExpMax}
                            />
                          </FormField>
                        </div>

                        {/* Education Level Section */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md hover:border-umukozi-orange/30 transition-all duration-300 overflow-visible">
                          <div className="mb-6">
                            <h3 className="text-xl font-medium text-slate-900 mb-3 font-inter">
                              Education Level
                            </h3>
                            <p className="text-base text-gray-600">What educational qualifications are required for this role?</p>
                          </div>

                          <FormField label="">
                            <TagAutocomplete
                              label=""
                              placeholder="e.g. High School Diploma, Bachelor's Degree"
                              suggestions={EDUCATION_SUGGESTIONS as unknown as string[]}
                              selected={educations}
                              setSelected={setEducations}
                              emptyMessage="No education levels found"
                            />
                          </FormField>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Location & Industry */}
                  {currentStep === 3 && (
                    <div className="space-y-12">
                      <StepHeader
                        title="Location & Industry"
                        description="Where do you need the person and what industry are you in?"
                      />

                      {/* Clean Location & Industry Section */}
                      <div className="space-y-12">
                        {/* Work Location Section */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md hover:border-umukozi-orange/30 transition-all duration-300 overflow-visible">
                          <div className="mb-6">
                            <h3 className="text-xl font-medium text-slate-900 mb-3 font-inter">
                              Work Location
                            </h3>
                            <p className="text-base text-gray-600">Where will this person be working? Select a country or city.</p>
                          </div>

                          <FormField label="">
                            <LocationAutocomplete
                              value={location}
                              onChange={setLocation}
                              placeholder="Search for a country or city..."
                              label=""
                            />

                            {/* Quick Location Suggestions */}
                            <div className="mt-4">
                              <p className="text-sm text-gray-600 mb-3">Popular locations:</p>
                              <div className="flex flex-wrap gap-2">
                                {LOCATION_SUGGESTIONS.slice(0, 8).map((suggestion) => (
                                  <button
                                    key={suggestion}
                                    onClick={() => setLocation(suggestion)}
                                    className={`px-4 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 ${location === suggestion
                                      ? 'bg-umukozi-orange/10 text-umukozi-orange border-umukozi-orange'
                                      : 'bg-white text-gray-700 border-gray-200 hover:bg-umukozi-orange/5 hover:border-umukozi-orange/50'
                                      }`}
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </FormField>
                        </div>

                        {/* Industry Section */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md hover:border-umukozi-orange/30 transition-all duration-300 overflow-visible">
                          <div className="mb-6">
                            <h3 className="text-xl font-medium text-slate-900 mb-3 font-inter">
                              Industry
                            </h3>
                            <p className="text-base text-gray-600">What industry or business sector are you in?</p>
                          </div>

                          <FormField label="">
                            <TagAutocomplete
                              label=""
                              placeholder="e.g. Healthcare, Retail, Education"
                              suggestions={INDUSTRY_SUGGESTIONS as unknown as string[]}
                              selected={industries}
                              setSelected={setIndustries}
                              emptyMessage="No industries found"
                            />
                          </FormField>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Search */}
                  {currentStep === 4 && (
                    <div className="space-y-10">
                      <StepHeader
                        title="Review Your Search"
                        description="Review your criteria and find the perfect candidates for your team"
                      />

                      <SearchSummary
                        jobTitles={jobTitles}
                        skills={skills}
                        expMin={expMin}
                        expMax={expMax}
                        location={location}
                        educations={educations}
                        industries={industries}
                        onEditSection={handleEditSection}
                      />
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <StepNavigation
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    canProceed={canProceed}
                    isSubmitting={isSubmitting}
                    onPrevious={prevStep}
                    onNext={nextStep}
                    onSubmit={submit}
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Validation Errors */}
          {Object.keys(fieldErrors).length > 0 && (
            <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Please fix the following errors:</h3>
              <ul className="space-y-2">
                {Object.entries(fieldErrors).map(([k, v]) => (
                  <li key={k} className="text-red-700">
                    <span className="font-medium capitalize">{k.replace(/_/g, " ")}:</span> {v}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed right-8 bottom-8 p-6 rounded-lg shadow-lg border z-50 ${toast.type === "error"
            ? "bg-red-50 border-red-200 text-red-800"
            : "bg-green-50 border-green-200 text-green-800"
            }`}>
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${toast.type === "error" ? "bg-red-100" : "bg-green-100"
                }`}>
                {toast.type === "error" ? (
                  <X className="w-4 h-4 text-red-600" />
                ) : (
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </div>
              <div>
                <div className="font-semibold">
                  {toast.type === "error" ? "Error" : "Success"}
                </div>
                <div className="text-sm">{toast.message}</div>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}
