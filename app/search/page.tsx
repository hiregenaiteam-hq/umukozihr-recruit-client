"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
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
  SearchChat,
  ResultsPanel,
  WorkflowProgress
} from "@/components/search"

import {
  JOB_SUGGESTIONS,
  SKILL_SUGGESTIONS,
  INDUSTRY_SUGGESTIONS,
  EDUCATION_SUGGESTIONS,
  LOCATION_SUGGESTIONS,
  EXPERIENCE_RANGE,
  SEARCH_STEPS
} from "@/lib/constants"
import { X, Check, Sparkles, ListFilter, MessageSquare } from "lucide-react"

import {
  SearchCriteria,
  SearchPayload,
  SearchResponse,
  PromptSearchPayload,
  PromptSearchResponse,
  PromptCandidate,
  Candidate,
  ClarificationRequest,
  ClarificationValues,
  ToastMessage
} from "@/lib/types"
import { apiFetch, normalizeError, parseValidationDetails, getCookie, ensureValidToken, clearAuthAndRedirect } from "@/lib/api"

type SearchStatus = "idle" | "searching" | "clarifying" | "complete" | "error"

interface TransformedCandidate {
  id: number
  full_name: string
  headline?: string
  linkedin_url?: string
  location_full?: string
  active_experience_title?: string
  inferred_skills?: string[]
  relevance_score?: number
  matched_skills?: string[]
  willingness?: {
    score: number
    reasons: string[]
  } | null
}

export default function ChatSearchPage() {
  const router = useRouter()

  // Search mode: chat or manual form
  const [searchMode, setSearchMode] = useState<"chat" | "manual">("chat")
  
  // Search status for results panel
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  
  // Candidates for results panel
  const [candidates, setCandidates] = useState<TransformedCandidate[]>([])
  const [totalFound, setTotalFound] = useState<number>(0)
  
  // Clarification state
  const [originalPrompt, setOriginalPrompt] = useState("") // Track original prompt for clarification
  const [clarificationData, setClarificationData] = useState<{
    missing_fields: string[]
    clarification_prompt: string
  } | null>(null)
  
  // Workflow status state
  const [workflowStatus, setWorkflowStatus] = useState<{
    current_step: string
    step_progress: number
    step_message: string
  } | null>({ current_step: "idle", step_progress: 0, step_message: "Ready to search" })
  
  // Manual form state
  const [currentStep, setCurrentStep] = useState(1)
  const [jobTitles, setJobTitles] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [industries, setIndustries] = useState<string[]>([])
  const [educations, setEducations] = useState<string[]>([])
  const [location, setLocation] = useState<string>("")
  const [expMin, setExpMin] = useState<number>(EXPERIENCE_RANGE.DEFAULT_MIN)
  const [expMax, setExpMax] = useState<number>(EXPERIENCE_RANGE.DEFAULT_MAX)
  const [searchType, setSearchType] = useState<"database" | "live" | "hybrid">("hybrid")

  // UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [toast, setToast] = useState<ToastMessage | null>(null)
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
        return true
      case 3:
        return true
      case 4:
        return jobTitles.length > 0
      default:
        return false
    }
  }

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
    }
  }

  // Transform candidates from API response
  const transformCandidates = (data: PromptCandidate[]): TransformedCandidate[] => {
    return data.map((c, index) => ({
      id: index + 1,
      full_name: c.name || "Unknown",
      headline: c.title || c.experience_summary?.slice(0, 100) || "",
      linkedin_url: c.url,
      location_full: c.location || "",
      active_experience_title: c.title || "",
      inferred_skills: c.skills || [],
      relevance_score: (c.match_score || 0.5) * 100,
      matched_skills: c.skills?.slice(0, 5) || [],
      willingness: c.willingness ? {
        score: c.willingness.score,
        reasons: c.willingness.reasoning || []
      } : null,
    }))
  }

  // Handle chat search with SSE streaming
  const handleChatSearch = useCallback(async (prompt: string, deepResearch: boolean) => {
    if (!prompt || prompt.trim().length < 10) {
      setToast({ type: "error", message: "Please describe who you're looking for in at least 10 characters." })
      return
    }

    // Store original prompt if this is the first attempt (not a clarification response)
    if (!clarificationData) {
      setOriginalPrompt(prompt)
    }

    setSearchStatus("searching")
    setClarificationData(null)
    setErrorMessage("")
    setWorkflowStatus({ current_step: "analyzing", step_progress: 0.1, step_message: "Preparing your search..." })

    try {
      const token = await ensureValidToken()
      
      if (!token) {
        setToast({ type: "error", message: "Your session has expired. Please sign in again." })
        clearAuthAndRedirect()
        return
      }
      
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
        "Authorization": `Bearer ${token}`
      }

      const promptPayload = {
        search_type: "prompt",
        prompt: prompt,
        use_deep_research: deepResearch,
      }

      console.log("[SSE Search] Starting:", promptPayload)

      // Use SSE streaming endpoint
      const response = await fetch("/api/search/stream", {
        method: "POST",
        headers,
        body: JSON.stringify(promptPayload),
        credentials: "include",
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[SSE Search] Error:", response.status, errorText)
        throw new Error(`Request failed: ${response.status}`)
      }

      if (!response.body) {
        throw new Error("No response body")
      }

      // Read SSE stream
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) {
          console.log("[SSE Search] Stream ended")
          break
        }

        buffer += decoder.decode(value, { stream: true })
        
        // Process complete SSE events from buffer
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6).trim()
            if (!jsonStr) continue
            
            try {
              const event = JSON.parse(jsonStr)
              console.log("[SSE Search] Event:", event.type, event)
              
              if (event.type === "progress") {
                setWorkflowStatus({
                  current_step: event.step,
                  step_progress: event.progress,
                  step_message: event.message
                })
              } 
              else if (event.type === "clarification") {
                console.log("[SSE Search] Clarification needed:", event.clarification)
                setClarificationData(event.clarification)
                setSearchStatus("clarifying")
                setWorkflowStatus(null)
                return // Exit early for clarification
              }
              else if (event.type === "complete") {
                console.log("[SSE Search] Complete:", event.candidates?.length, "candidates")
                
                if (!event.candidates || event.candidates.length === 0) {
                  setCandidates([])
                  setTotalFound(0)
                  setSearchStatus("complete")
                  setWorkflowStatus(null)
                  setToast({ 
                    type: "error", 
                    message: event.warnings?.[0] || "No candidates found. Try broadening your search criteria." 
                  })
                  return
                }

                const transformed = transformCandidates(event.candidates)
                setCandidates(transformed)
                setTotalFound(event.candidates.length)
                setSearchStatus("complete")
                setWorkflowStatus(null)
                
                setToast({ 
                  type: "success", 
                  message: `Found ${event.candidates.length} candidate${event.candidates.length > 1 ? 's' : ''}! Check the results panel →` 
                })
                
                // Store for results page navigation
                localStorage.setItem('searchResults', JSON.stringify({
                  search_id: event.search_id || `prompt-${Date.now()}`,
                  results: transformed,
                  total_results: event.candidates.length,
                  timestamp: new Date().toISOString(),
                  search_metadata: event.search_metadata,
                  company_context: event.company_context,
                }))
                return // Exit after complete
              }
              else if (event.type === "error") {
                console.error("[SSE Search] Error event:", event.message)
                setErrorMessage(event.message || "Search failed. Please try again.")
                setSearchStatus("error")
                setWorkflowStatus(null)
                setToast({ type: "error", message: event.message || "Search failed. Please try again." })
                return
              }
            } catch (parseErr) {
              console.warn("[SSE Search] Parse error:", jsonStr, parseErr)
            }
          }
        }
      }

      // If we reach here without a complete/error event, handle gracefully
      if (searchStatus === "searching") {
        setSearchStatus("error")
        setWorkflowStatus(null)
        setErrorMessage("Search stream ended unexpectedly")
        setToast({ type: "error", message: "Search stream ended unexpectedly. Please try again." })
      }

    } catch (err: unknown) {
      const norm = normalizeError(err)
      setErrorMessage(`${norm.title}: ${norm.description}`)
      setSearchStatus("error")
      setWorkflowStatus(null)
      setToast({ type: "error", message: `${norm.title}: ${norm.description}` })
    }
  }, [clarificationData, searchStatus])

  // Handle clarification response
  const handleClarificationResponse = useCallback((response: string) => {
    // Combine original prompt with clarification response for complete context
    const clarifiedPrompt = originalPrompt 
      ? `${originalPrompt}. ${response}` 
      : response
    
    console.log("Clarification response:", { original: originalPrompt, response, combined: clarifiedPrompt })
    
    // Re-search with complete prompt
    handleChatSearch(clarifiedPrompt, false)
  }, [handleChatSearch, originalPrompt])

  // Handle manual form submit
  const handleManualSubmit = async () => {
    if (jobTitles.length === 0) {
      setToast({ type: "error", message: "Please tell us what job position you're looking to fill." })
      return
    }

    if (!location) {
      setToast({ type: "error", message: "Please specify the work location for this position." })
      return
    }

    setIsSubmitting(true)
    setSearchStatus("searching")
    setErrorMessage("")
    setWorkflowStatus({ current_step: "analyzing", step_progress: 0.1, step_message: "Preparing your search..." })

    try {
      const token = await ensureValidToken()
      
      if (!token) {
        setToast({ type: "error", message: "Your session has expired. Please sign in again." })
        clearAuthAndRedirect()
        return
      }

      const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user_data') || '{}') : {}
      const sessionId = typeof document !== 'undefined' ? getCookie('session_id') : ''
      
      const payload = {
        user_id: userData?.id || "",
        session_id: sessionId || "",
        search_mode: searchType,
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

      console.log("Submitting manual search:", payload)

      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const data = await response.json()
      console.log("Manual search response:", data)

      // Check if API needs clarification
      if (data.needs_clarification && data.clarification) {
        setClarificationData(data.clarification)
        setSearchStatus("clarifying")
        setWorkflowStatus(null) // Clear workflow status during clarification
        setIsSubmitting(false)
        return
      }

      // Validate results
      if (!data || !data.results || data.results.length === 0) {
        setCandidates([])
        setTotalFound(0)
        setSearchStatus("complete")
        setWorkflowStatus(null) // Clear workflow status
        setIsSubmitting(false)
        return
      }

      // Transform and display
      const transformed = data.results.map((r: Candidate, index: number) => ({
        id: r.id || index + 1,
        full_name: r.full_name,
        headline: r.headline,
        linkedin_url: r.linkedin_url,
        location_full: r.location_full,
        active_experience_title: r.active_experience_title,
        inferred_skills: r.inferred_skills,
        relevance_score: r.relevance_score,
        matched_skills: r.matched_skills,
        willingness: r.willingness,
      }))

      setCandidates(transformed)
      setTotalFound(data.total_results || transformed.length)
      setSearchStatus("complete")
      setWorkflowStatus(null) // Clear workflow status

      // Store for results page
      localStorage.setItem('searchResults', JSON.stringify(data))
      localStorage.setItem('searchCriteria', JSON.stringify(payload))

    } catch (err: unknown) {
      const norm = normalizeError(err)
      setErrorMessage(`${norm.title}: ${norm.description}`)
      setSearchStatus("error")
      setWorkflowStatus(null) // Clear workflow status on error
      try {
        const parsed = parseValidationDetails(err as Error & { body?: unknown })
        if (Object.keys(parsed).length) setFieldErrors(parsed)
      } catch {
        // ignore
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle view profile click
  const handleViewProfile = (id: number) => {
    router.push(`/profile/${id}`)
  }

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4800)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Main Content - Split View */}
      <div className="h-[calc(100vh-64px)] flex">
        {/* Left Panel - Chat or Form */}
        <div className="w-1/2 border-r border-slate-200 flex flex-col">
          {/* Mode Toggle */}
          <div className="px-6 py-4 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
              <button
                onClick={() => setSearchMode("chat")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  searchMode === "chat"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Chat
                <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">AI</span>
              </button>
              <button
                onClick={() => setSearchMode("manual")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  searchMode === "manual"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ListFilter className="w-4 h-4" />
                Manual Fields
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden p-4">
            {searchMode === "chat" ? (
              <SearchChat
                onSearch={handleChatSearch}
                onClarificationResponse={handleClarificationResponse}
                isSearching={searchStatus === "searching"} // Enable input when clarifying
                clarificationData={clarificationData}
                workflowStatus={workflowStatus}
              />
            ) : (
              <ManualSearchForm
                steps={steps}
                currentStep={currentStep}
                jobTitles={jobTitles}
                setJobTitles={setJobTitles}
                skills={skills}
                setSkills={setSkills}
                industries={industries}
                setIndustries={setIndustries}
                educations={educations}
                setEducations={setEducations}
                location={location}
                setLocation={setLocation}
                expMin={expMin}
                setExpMin={setExpMin}
                expMax={expMax}
                setExpMax={setExpMax}
                searchType={searchType}
                setSearchType={setSearchType}
                canProceed={canProceed}
                isSubmitting={isSubmitting}
                onPrevious={prevStep}
                onNext={nextStep}
                onSubmit={handleManualSubmit}
                onEditSection={handleEditSection}
              />
            )}
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="w-1/2 p-4 bg-slate-100/50">
          <ResultsPanel
            candidates={candidates}
            isLoading={isSubmitting || searchStatus === "searching"}
            searchStatus={searchStatus}
            totalFound={totalFound}
            onViewProfile={handleViewProfile}
            errorMessage={errorMessage}
            workflowStatus={workflowStatus}
          />
        </div>
      </div>

      {/* Workflow Progress Indicator */}
      {workflowStatus && (
        <WorkflowProgress
          currentStep={workflowStatus.current_step}
          progress={workflowStatus.step_progress}
          message={workflowStatus.step_message}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed right-8 bottom-8 p-6 rounded-lg shadow-lg border z-50 ${
          toast.type === "error"
            ? "bg-red-50 border-red-200 text-red-800"
            : "bg-green-50 border-green-200 text-green-800"
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              toast.type === "error" ? "bg-red-100" : "bg-green-100"
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
  )
}

// Manual Search Form Component
interface ManualSearchFormProps {
  steps: { id: number; title: string; description: string }[]
  currentStep: number
  jobTitles: string[]
  setJobTitles: (v: string[]) => void
  skills: string[]
  setSkills: (v: string[]) => void
  industries: string[]
  setIndustries: (v: string[]) => void
  educations: string[]
  setEducations: (v: string[]) => void
  location: string
  setLocation: (v: string) => void
  expMin: number
  setExpMin: (v: number) => void
  expMax: number
  setExpMax: (v: number) => void
  searchType: "database" | "live" | "hybrid"
  setSearchType: (v: "database" | "live" | "hybrid") => void
  canProceed: () => boolean
  isSubmitting: boolean
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  onEditSection: (section: string) => void
}

function ManualSearchForm({
  steps,
  currentStep,
  jobTitles,
  setJobTitles,
  skills,
  setSkills,
  industries,
  setIndustries,
  educations,
  setEducations,
  location,
  setLocation,
  expMin,
  setExpMin,
  expMax,
  setExpMax,
  searchType,
  setSearchType,
  canProceed,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
  onEditSection
}: ManualSearchFormProps) {
  return (
    <div className="h-full overflow-y-auto">
      <Card className="p-6 bg-white border-slate-200">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Step {currentStep} of {steps.length}</span>
            <span className="text-sm font-medium text-orange-600">{Math.round((currentStep / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Job Position */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <StepHeader
              title="What position are you hiring for?"
              description="Tell us about the role and required skills"
            />
            
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-medium text-slate-900 mb-3">Job Title</h4>
                <TagAutocomplete
                  label=""
                  placeholder="e.g. Software Engineer, Product Manager"
                  suggestions={JOB_SUGGESTIONS as unknown as string[]}
                  selected={jobTitles}
                  setSelected={setJobTitles}
                  emptyMessage="No positions found"
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-medium text-slate-900 mb-3">Required Skills</h4>
                <TagAutocomplete
                  label=""
                  placeholder="e.g. Python, React, Communication"
                  suggestions={SKILL_SUGGESTIONS as unknown as string[]}
                  selected={skills}
                  setSelected={setSkills}
                  emptyMessage="No skills found"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Requirements */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <StepHeader
              title="Experience & Education"
              description="Set the requirements for your ideal candidate"
            />
            
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-medium text-slate-900 mb-3">Experience Range</h4>
                <ExperienceRange
                  min={expMin}
                  max={expMax}
                  onMinChange={setExpMin}
                  onMaxChange={setExpMax}
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-medium text-slate-900 mb-3">Education Level</h4>
                <TagAutocomplete
                  label=""
                  placeholder="e.g. Bachelor's Degree"
                  suggestions={EDUCATION_SUGGESTIONS as unknown as string[]}
                  selected={educations}
                  setSelected={setEducations}
                  emptyMessage="No education levels found"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location & Industry */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <StepHeader
              title="Location & Industry"
              description="Where do you need the person?"
            />
            
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-medium text-slate-900 mb-3">Work Location</h4>
                <LocationAutocomplete
                  value={location}
                  onChange={setLocation}
                  placeholder="Search for a country or city..."
                  label=""
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {LOCATION_SUGGESTIONS.slice(0, 6).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                        location === loc
                          ? 'bg-orange-100 border-orange-300 text-orange-700'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-orange-200'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-medium text-slate-900 mb-3">Industry</h4>
                <TagAutocomplete
                  label=""
                  placeholder="e.g. Technology, Healthcare"
                  suggestions={INDUSTRY_SUGGESTIONS as unknown as string[]}
                  selected={industries}
                  setSelected={setIndustries}
                  emptyMessage="No industries found"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <StepHeader
              title="Review Your Search"
              description="Review your criteria and start searching"
            />
            
            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <h4 className="font-medium text-slate-900 mb-3">Search Mode</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "database", label: "Database", desc: "Fast, internal" },
                  { key: "live", label: "Live", desc: "Real-time web" },
                  { key: "hybrid", label: "Hybrid", desc: "Best of both" },
                ].map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => setSearchType(mode.key as typeof searchType)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      searchType === mode.key
                        ? "border-orange-300 bg-orange-50"
                        : "border-slate-200 hover:border-orange-200"
                    }`}
                  >
                    <div className="font-medium text-sm text-slate-900">{mode.label}</div>
                    <div className="text-xs text-slate-500">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <SearchSummary
              jobTitles={jobTitles}
              skills={skills}
              expMin={expMin}
              expMax={expMax}
              location={location}
              educations={educations}
              industries={industries}
              onEditSection={onEditSection}
            />
          </div>
        )}

        {/* Navigation */}
        <StepNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          canProceed={canProceed}
          isSubmitting={isSubmitting}
          onPrevious={onPrevious}
          onNext={onNext}
          onSubmit={onSubmit}
        />
      </Card>
    </div>
  )
}
