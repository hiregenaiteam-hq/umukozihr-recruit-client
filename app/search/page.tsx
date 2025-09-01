"use client"

import React, { useMemo, useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/Navbar"
import { Sparkles, X, Check, MapPin, Layers } from "lucide-react"

// IMPORTANT: uses apiFetch util provided by your codebase. Update the import path if needed.
import { apiFetch, normalizeError, parseValidationDetails } from "@/lib/api"

// --- Mock suggestion data (replace with real API calls as needed) ---
const JOB_SUGGESTIONS = [
  "Machine Learning Engineer",
  "Data Scientist",
  "Senior React Developer",
  "Backend Engineer",
  "DevOps Engineer",
  "Product Manager",
] as const
const SKILL_SUGGESTIONS = [
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Node.js",
  "TypeScript",
  "Docker",
  "Kubernetes",
  "React",
] as const
const INDUSTRY_SUGGESTIONS = ["technology", "software", "fintech", "healthcare", "education"] as const
const EDUCATION_SUGGESTIONS = ["High School", "Associate's", "Bachelor's", "Master's", "PhD"] as const
const LOCATION_SUGGESTIONS = ["Nigeria", "Ghana", "United States", "United Kingdom", "Kenya"] as const

// --- Small utility functions ---
const uniq = <T,>(arr: T[]) => Array.from(new Set(arr)) as T[]
const fuzzyFilter = (list: readonly string[], q?: string) => {
  const s = (q || "").trim().toLowerCase()
  if (!s) return Array.from(list)
  return Array.from(list).filter((item) => item.toLowerCase().includes(s))
}

// --- Types ---
type Toast = { type: "error" | "success"; message: string } | null

interface TagAutocompleteProps {
  label: string
  placeholder?: string
  suggestions: readonly string[]
  selected: string[]
  setSelected: (vals: string[]) => void
  emptyMessage?: string
}

// --- Reusable Autocomplete Tag Input ---
const TagAutocomplete: React.FC<TagAutocompleteProps> = ({
  label,
  placeholder,
  suggestions,
  selected,
  setSelected,
  emptyMessage = "No results",
}) => {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const filtered = useMemo(() => fuzzyFilter(suggestions, query), [suggestions, query])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  // open when there's input
  useEffect(() => {
    if (query) setOpen(true)
  }, [query])

  // close when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return
      if (!(e.target instanceof Node)) return
      if (!wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  const onSelect = (value: string) => {
    setSelected(uniq([...selected, value]))
    setQuery("")
    setOpen(false)
    inputRef.current?.focus()
  }

  const onRemove = (value: string) => {
    setSelected(selected.filter((p) => p !== value))
  }

  return (
    <div className="group relative" ref={wrapperRef}>
      <Label className="text-sm text-slate-600 mb-2 flex items-center gap-2">
        {label}
        <span className="text-xs text-slate-400">(type to search & press enter)</span>
      </Label>

      <div className="min-h-[56px] bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col gap-2 transition-shadow group-focus-within:shadow-md">
        <div className="flex flex-wrap gap-2">
          {selected.map((s) => (
            <div
              key={s}
              className="flex items-center bg-white px-3 py-1 rounded-full shadow-xs border border-slate-100 text-sm"
            >
              <span className="mr-2">{s}</span>
              <button
                aria-label={`Remove ${s}`}
                onClick={() => onRemove(s)}
                className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-slate-100"
                type="button"
              >
                <X className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          ))}

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                // if it matches an existing suggestion pick that, otherwise add typed text
                const match = suggestions.find((s) => s.toLowerCase() === query.trim().toLowerCase())
                onSelect(match || query.trim())
                e.preventDefault()
              }
              if (e.key === "Escape") setOpen(false)
            }}
            placeholder={placeholder}
            className="bg-transparent outline-none flex-1 min-w-[140px] text-sm text-slate-700"
            aria-label={label}
            type="text"
          />
        </div>

        {open && (
          <div className="mt-2 bg-white border border-slate-100 rounded-xl shadow-lg max-h-52 overflow-auto">
            {filtered.length === 0 ? (
              <div className="p-3 text-sm text-slate-500">{emptyMessage}</div>
            ) : (
              filtered.map((s) => (
                <button
                  key={s}
                  onClick={() => onSelect(s)}
                  className="w-full text-left p-3 hover:bg-slate-50 flex items-center gap-3"
                  type="button"
                >
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-slate-700">{s}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function PremiumSearchPage() {
  const router = useRouter()

  // Selected fields
  const [jobTitles, setJobTitles] = useState<string[]>(["Machine Learning"]) // default example
  const [skills, setSkills] = useState<string[]>(["Python", "FastAPI", "PostgreSQL"])
  const [industries, setIndustries] = useState<string[]>([])
  const [educations, setEducations] = useState<string[]>(["Bachelor's", "Master's"])
  const [location, setLocation] = useState<string>("Nigeria")
  const [searchMode, setSearchMode] = useState<string>("database")

  // experience
  const [expMin, setExpMin] = useState<number>(1)
  const [expMax, setExpMax] = useState<number>(10)

  // UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [toast, setToast] = useState<Toast>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

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
      search_mode: searchMode,
    }
  }, [jobTitles, skills, location, educations, industries, expMin, expMax, searchMode])

  const submit = async (): Promise<void> => {
    // basic validation
    if (payload.criteria.job_titles.length === 0) {
      setToast({ type: "error", message: "Please add at least one job title." })
      return
    }

    setIsSubmitting(true)
    setToast(null)
    setFieldErrors({})

    try {
      // Use apiFetch which will prefix baseUrl internally
      const data = await apiFetch("/search/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      // On success, navigate to results. You may want to pass an id returned from API.
      // router.push('/results') can't include complex object easily; stringify if needed
      router.push({ pathname: "/results", query: { q: JSON.stringify(payload) } } as any)
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
    }
  }

  // small helper to render toast
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4800)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Find the right candidate — faster</h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Fill the fields below (type to search). Selected items become chips. Refine experience ranges and hit
            &ldquo;Find Candidates&rdquo;.
          </p>
        </div>

        <Card className="p-6 rounded-3xl shadow-xl border-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <TagAutocomplete
                label="Job titles"
                placeholder="e.g. Machine Learning Engineer"
                suggestions={JOB_SUGGESTIONS as unknown as string[]}
                selected={jobTitles}
                setSelected={setJobTitles}
                emptyMessage="No job titles found"
              />

              <TagAutocomplete
                label="Skills & keywords"
                placeholder="e.g. Python, FastAPI"
                suggestions={SKILL_SUGGESTIONS as unknown as string[]}
                selected={skills}
                setSelected={setSkills}
                emptyMessage="No skills found"
              />

              <TagAutocomplete
                label="Industry"
                placeholder="e.g. technology"
                suggestions={INDUSTRY_SUGGESTIONS as unknown as string[]}
                selected={industries}
                setSelected={setIndustries}
                emptyMessage="No industries found"
              />

              <div className="grid grid-cols-2 gap-3">
                <TagAutocomplete
                  label="Education levels"
                  placeholder="e.g. Bachelor's"
                  suggestions={EDUCATION_SUGGESTIONS as unknown as string[]}
                  selected={educations}
                  setSelected={setEducations}
                  emptyMessage="No education levels found"
                />

                <div>
                  <Label className="text-sm text-slate-600 mb-2 flex items-center gap-2">Location</Label>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Country, city, or remote"
                        className="rounded-2xl"
                        aria-label="location"
                      />
                      <div className="mt-2 text-xs text-slate-500">Suggestions: {LOCATION_SUGGESTIONS.join(", ")}</div>
                    </div>
                    <button
                      onClick={() => setLocation("")}
                      className="px-3 py-2 bg-slate-100 rounded-full hover:bg-slate-200"
                      title="Clear"
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <Label className="text-sm text-slate-600 mb-2">Experience</Label>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>Minimum years</span>
                        <span>Maximum years</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={0}
                          max={30}
                          value={String(expMin)}
                          onChange={(e) => {
                            const val = Math.min(Number(e.target.value), expMax)
                            setExpMin(val)
                          }}
                          className="range-input w-full"
                        />
                        <input
                          type="range"
                          min={0}
                          max={30}
                          value={String(expMax)}
                          onChange={(e) => {
                            const val = Math.max(Number(e.target.value), expMin)
                            setExpMax(val)
                          }}
                          className="range-input w-full"
                        />
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <input
                          type="number"
                          min={0}
                          max={50}
                          value={expMin}
                          onChange={(e) => setExpMin(Math.min(Number(e.target.value || 0), expMax))}
                          className="w-[90px] rounded-lg p-2 border border-slate-200 text-sm"
                        />
                        <div className="text-xs text-slate-500">—</div>
                        <input
                          type="number"
                          min={0}
                          max={50}
                          value={expMax}
                          onChange={(e) => setExpMax(Math.max(Number(e.target.value || 0), expMin))}
                          className="w-[90px] rounded-lg p-2 border border-slate-200 text-sm"
                        />
                      </div>

                      <div className="mt-3 text-sm text-slate-600">Selected range: <strong>{expMin} — {expMax} years</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


           <div>
                <Label className="text-sm text-slate-600 mb-2">Search mode</Label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSearchMode("database")}
                    className={`px-4 py-2 rounded-2xl border ${searchMode === "database" ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold text-white" : "bg-white"}`}
                    type="button"
                  >
                    Database
                  </button>
                  <button
                    onClick={() => setSearchMode("profile")}
                    className={`px-4 py-2 rounded-2xl border ${searchMode === "profile" ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold text-white" : "bg-white"}`}
                    type="button"
                  >
                    Profile
                  </button>
                </div>
                <div className="mt-2 text-xs text-slate-500">Database mode searches our stored profiles. Profile mode searches a single profile source.</div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-slate-900 font-semibold">AI candidate finder</div>
                      <div className="text-xs text-slate-500">We score & surface the best matches</div>
                    </div>
                  </div>

                  <div>
                    <Button
                      onClick={submit}
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Searching...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Find Candidates
                        </div>
                      )}
                    </Button>
                  </div>
                </div>

                {/* <div className="mt-3 text-xs text-slate-500">Payload preview (for debugging):</div>
                <pre className="mt-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-700 max-h-40 overflow-auto">{JSON.stringify(payload, null, 2)}</pre> */}

                {Object.keys(fieldErrors).length > 0 && (
                  <div className="mt-3 text-sm text-red-600">
                    <strong>Validation issues:</strong>
                    <ul className="list-disc ml-5">
                      {Object.entries(fieldErrors).map(([k, v]) => (
                        <li key={k}>{k}: {v}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
        </Card>



        {/* metrics / trust */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-white shadow-sm flex items-center gap-4">
            <Sparkles className="w-7 h-7 text-blue-500" />
            <div>
              <div className="text-lg font-semibold">Lightning fast</div>
              <div className="text-sm text-slate-500">Most searches return results in under 2 minutes</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white shadow-sm flex items-center gap-4">
            <Layers className="w-7 h-7 text-blue-500" />
            <div>
              <div className="text-lg font-semibold">High accuracy</div>
              <div className="text-sm text-slate-500">We blend filters with ML ranking for better matches</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white shadow-sm flex items-center gap-4">
            <MapPin className="w-7 h-7 text-blue-500" />
            <div>
              <div className="text-lg font-semibold">Geo-aware</div>
              <div className="text-sm text-slate-500">Filter by country, region, or remote</div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className={`fixed right-6 bottom-6 p-4 rounded-xl shadow-lg ${toast.type === "error" ? "bg-red-50 border border-red-200" : "bg-emerald-50 border border-emerald-200"}`}>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold">{toast.type === "error" ? "Error" : "Success"}</div>
            <div className="text-sm text-slate-700">{toast.message}</div>
          </div>
        </div>
      )}
    </div>
  )
}
