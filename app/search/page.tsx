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
  LoadingScreen,
  ClarificationDialog,
  PromptInput
} from "@/components/search"
import type { ClarificationValues } from "@/components/search"
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
import { apiFetch, normalizeError, parseValidationDetails, getCookie, ensureValidToken, clearAuthAndRedirect } from "@/lib/api"



// --- Types ---
type Toast = { type: "error" | "success"; message: string } | null

// Clarification response type
interface ClarificationResponse {
  needs_clarification: boolean
  clarification?: {
    missing_fields: string[]
    clarification_prompt: string
  }
}





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
  
  // Search mode: database (fast, internal DB), live (real-time scraper), hybrid (both)
  const [searchMode, setSearchMode] = useState<"database" | "live" | "hybrid">("hybrid")
  
  // Search input mode: prompt (AI-powered) or manual (step-by-step)
  const [searchInputMode, setSearchInputMode] = useState<"prompt" | "manual">("prompt")
  const [promptText, setPromptText] = useState<string>("")
  const [deepResearch, setDeepResearch] = useState<boolean>(false)
  const [promptSearchResults, setPromptSearchResults] = useState<any>(null)

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

  // Clarification dialog state
  const [showClarification, setShowClarification] = useState<boolean>(false)
  const [clarificationData, setClarificationData] = useState<ClarificationResponse["clarification"] | null>(null)

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
    // Get user_id and session_id from storage/cookies
    const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user_data') || '{}') : {}
    const sessionId = typeof document !== 'undefined' ? getCookie('session_id') : ''
    
    return {
      user_id: userData?.id || "",
      session_id: sessionId || "",
      search_mode: searchMode,
      max_results: 50,
      criteria: {
        job_titles: jobTitles,
        skills_keywords: skills,
        location_full: location,
        education_levels: educations,
        industry_keywords: industries,
        experience_years_min: Number(expMin),
        experience_years_max: Number(expMax),
      },
      include_detailed_profiles: false,
      save_search: true,
      search_description: `Search for ${jobTitles.join(', ')} in ${location || 'any location'}`
    }
  }, [jobTitles, skills, location, educations, industries, expMin, expMax, searchMode])

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

      // Ensure we have a valid token before making the request
      const token = await ensureValidToken()
      
      if (!token) {
        setToast({ type: "error", message: "Your session has expired. Please sign in again." })
        clearAuthAndRedirect()
        return
      }
      
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
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

      // NEW: Check if API needs clarification
      if (data.needs_clarification && data.clarification) {
        console.log("Clarification needed:", data.clarification)
        setClarificationData(data.clarification)
        setShowClarification(true)
        setIsLoading(false)
        return
      }

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

  // Submit prompt-based search
  const submitPromptSearch = async (): Promise<void> => {
    if (!promptText || promptText.trim().length < 10) {
      setToast({ type: "error", message: "Please describe who you're looking for in at least 10 characters." })
      return
    }

    setIsSubmitting(true)
    setIsLoading(true)
    setToast(null)

    try {
      const token = await ensureValidToken()
      
      if (!token) {
        setToast({ type: "error", message: "Your session has expired. Please sign in again." })
        clearAuthAndRedirect()
        return
      }
      
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }

      const promptPayload = {
        search_type: "prompt",
        prompt: promptText,
        use_deep_research: deepResearch,
      }

      console.log("Submitting prompt search:", promptPayload)

      const response = await fetch("/api/search", {
        method: "POST",
        headers,
        body: JSON.stringify(promptPayload),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const data = await response.json()
      console.log("Prompt search response:", data)

      // Check if API needs clarification
      if (data.needs_clarification && data.clarification) {
        console.log("Clarification needed:", data.clarification)
        setClarificationData(data.clarification)
        setShowClarification(true)
        setIsLoading(false)
        return
      }

      // Check for errors
      if (!data.success) {
        setToast({ type: "error", message: data.message || "Search failed. Please try again." })
        return
      }

      // Check if we have results
      if (!data.candidates || data.candidates.length === 0) {
        // Still redirect but show empty state on results page
        const emptyResults = {
          search_id: `prompt-${Date.now()}`,
          user_id: "",
          results: [],
          total_results: 0,
          search_duration: 0,
          timestamp: new Date().toISOString(),
          search_summary: data.message || "No candidates found matching your description.",
          recommendations: data.warnings || ["Try broadening your search criteria", "Use more specific locations or skills"],
          requirements: data.requirements,
        }
        
        localStorage.setItem('searchResults', JSON.stringify(emptyResults))
        localStorage.setItem('searchCriteria', JSON.stringify({ prompt: promptText, deepResearch }))
        
        setSearchResults(emptyResults)
        setShowSuccess(true)
        
        setTimeout(() => {
          router.push("/results")
        }, 1500)
        return
      }

      // Transform prompt results to match expected format for results page
      const transformedResults = {
        search_id: `prompt-${Date.now()}`,
        user_id: "",
        results: data.candidates.map((c: any, index: number) => ({
          id: index + 1,
          full_name: c.name || "Unknown",
          headline: c.title || c.experience_summary?.slice(0, 100) || "",
          linkedin_url: c.url,
          location_full: c.location || "",
          active_experience_title: c.title || "",
          inferred_skills: c.skills || [],
          rank_position: index + 1,
          relevance_score: (c.match_score || 0.5) * 100,
          skill_match_score: (c.match_score || 0.5) * 100,
          experience_score: 70,
          location_score: 70,
          job_title_score: 80,
          ranking_explanation: c.match_reasons?.join(", ") || "AI-matched candidate",
          matched_skills: c.skills?.slice(0, 5) || [],
          missing_skills: [],
          willingness: c.willingness || null,
        })),
        total_results: data.candidates.length,
        search_duration: 0,
        timestamp: new Date().toISOString(),
        search_summary: `AI found ${data.candidates.length} candidates`,
        recommendations: data.warnings || [],
      }

      // Store results
      localStorage.setItem('searchResults', JSON.stringify(transformedResults))
      localStorage.setItem('searchCriteria', JSON.stringify({ prompt: promptText, deepResearch }))

      setSearchResults(transformedResults)
      setShowSuccess(true)

      setTimeout(() => {
        router.push("/results")
      }, 3000)
    } catch (err: unknown) {
      const norm = normalizeError(err)
      setToast({ type: "error", message: `${norm.title}: ${norm.description}` })
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  // Handle clarification submission
  const handleClarificationSubmit = (values: ClarificationValues) => {
    setShowClarification(false)
    setClarificationData(null)

    // Update form fields with clarified values
    if (values.job_title && !jobTitles.includes(values.job_title)) {
      setJobTitles([...jobTitles, values.job_title])
    }
    if (values.location) {
      setLocation(values.location)
    }
    if (values.experience) {
      // Parse experience string like "5+ years" or "Senior"
      const match = values.experience.match(/(\d+)/)
      if (match) {
        setExpMin(parseInt(match[1]))
      }
    }

    // Show toast suggesting to try again
    setToast({ 
      type: "success", 
      message: "Details added! Please review and submit your search again." 
    })
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
        searchMode={searchMode}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,140,0,0.05)_1px,transparent_0)] bg-size-[24px_24px] opacity-20"></div>
      <div className="relative">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-4 font-inter">
              Find the perfect candidate
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter mb-8">
              Follow our simple steps to discover qualified candidates for your team
            </p>
            
            {/* Mode Toggle */}
            <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={() => setSearchInputMode("prompt")}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  searchInputMode === "prompt"
                    ? "bg-umukozi-orange text-white shadow-lg shadow-umukozi-orange/25"
                    : "bg-white text-slate-600 border border-gray-200 hover:border-umukozi-orange/50"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                AI Prompt
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Recommended</span>
              </button>
              <button
                onClick={() => setSearchInputMode("manual")}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  searchInputMode === "manual"
                    ? "bg-umukozi-orange text-white shadow-lg shadow-umukozi-orange/25"
                    : "bg-white text-slate-600 border border-gray-200 hover:border-umukozi-orange/50"
                }`}
              >
                Manual Fields
              </button>
            </div>
          </div>

          {/* Prompt Mode */}
          {searchInputMode === "prompt" && (
            <div className="max-w-3xl mx-auto px-6 mb-12">
              <PromptInput
                value={promptText}
                onChange={setPromptText}
                deepResearch={deepResearch}
                onDeepResearchChange={setDeepResearch}
                disabled={isSubmitting}
              />
              
              {/* Submit Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={submitPromptSearch}
                  disabled={isSubmitting || promptText.trim().length < 10}
                  className="px-8 py-4 bg-umukozi-orange text-white rounded-xl font-medium hover:bg-umukozi-orange/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-umukozi-orange/25"
                >
                  <Sparkles className="w-5 h-5" />
                  {isSubmitting ? "Searching..." : "Find Candidates"}
                </button>
              </div>
            </div>
          )}

          {/* Manual Mode - Vertical Stepper Layout */}
          {searchInputMode === "manual" && (
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
              <Card className="p-8 umukozi-card-clean min-h-150 relative overflow-visible">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-linear-to-br from-umukozi-orange/3 via-transparent to-umukozi-teal/3 pointer-events-none"></div>
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

                      {/* Search Mode Selection */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-medium text-slate-900 mb-4 font-inter">Search Mode</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button
                            onClick={() => setSearchMode("database")}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              searchMode === "database"
                                ? "border-umukozi-orange bg-umukozi-orange/10"
                                : "border-gray-200 hover:border-umukozi-orange/50"
                            }`}
                          >
                            <div className="font-medium text-slate-900">Database</div>
                            <div className="text-sm text-gray-600 mt-1">Fast search from our talent pool</div>
                          </button>
                          <button
                            onClick={() => setSearchMode("live")}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              searchMode === "live"
                                ? "border-umukozi-orange bg-umukozi-orange/10"
                                : "border-gray-200 hover:border-umukozi-orange/50"
                            }`}
                          >
                            <div className="font-medium text-slate-900 flex items-center gap-2">
                              Live Search
                              <span className="text-xs bg-umukozi-teal text-white px-2 py-0.5 rounded-full">Real-time</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Real-time talent discovery from the web</div>
                          </button>
                          <button
                            onClick={() => setSearchMode("hybrid")}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              searchMode === "hybrid"
                                ? "border-umukozi-orange bg-umukozi-orange/10"
                                : "border-gray-200 hover:border-umukozi-orange/50"
                            }`}
                          >
                            <div className="font-medium text-slate-900 flex items-center gap-2">
                              Hybrid
                              <span className="text-xs bg-umukozi-orange text-white px-2 py-0.5 rounded-full">Recommended</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Best of both: database + live sources</div>
                          </button>
                        </div>
                        {searchMode === "live" && (
                          <p className="mt-3 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                            Live search may take longer but finds the freshest talent from across the web.
                          </p>
                        )}
                      </div>

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
          )}

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

        {/* Clarification Dialog */}
        <ClarificationDialog
          isOpen={showClarification}
          onClose={() => setShowClarification(false)}
          missingFields={clarificationData?.missing_fields || []}
          clarificationPrompt={clarificationData?.clarification_prompt || ""}
          onSubmit={handleClarificationSubmit}
        />


      </div>
    </div>
  )
}
