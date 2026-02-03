"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import {
  CandidateCard,
  CandidateListItem,
  ResultsHeader,
  LoadingState,
  NoResultsState
} from "@/components/results"
import { Candidate, SearchResponse } from "@/components/results/types"
import { ChatWidget } from "@/components/chat"

function ResultsContent() {
  const [searchData, setSearchData] = useState<SearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Handle candidate selection and navigation
  const handleCandidateSelect = (candidate: Candidate) => {
    // Set selected candidate for chat context
    setSelectedCandidate(candidate)
    // Navigate to profile page with candidate ID
    router.push(`/profile/${candidate.id}`)
  }

  // Handle candidate selection for chat (without navigation)
  const handleCandidateSelectForChat = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setIsChatOpen(true)
  }

  useEffect(() => {
    // Get search data from localStorage (set by the search page)
    const storedResults = localStorage.getItem('searchResults')
    const storedCriteria = localStorage.getItem('searchCriteria')

    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults)
        setSearchData(parsedResults)
        setFilteredCandidates(parsedResults.results || [])
      } catch (error) {
        console.error('Error parsing stored search results:', error)
        // Clear invalid data and show no results state
        localStorage.removeItem('searchResults')
        localStorage.removeItem('searchCriteria')
        setSearchData(null)
        setFilteredCandidates([])
      }
    } else {
      // No stored results - user likely navigated directly to results page
      setSearchData(null)
      setFilteredCandidates([])
    }

    setIsLoading(false)
  }, [])

  // Filter candidates based on search term
  useEffect(() => {
    if (!searchData) return

    const filtered = searchData.results.filter(candidate => {
      const searchLower = searchTerm.toLowerCase()
      return (
        candidate.full_name?.toLowerCase().includes(searchLower) ||
        candidate.headline?.toLowerCase().includes(searchLower) ||
        candidate.active_experience_title?.toLowerCase().includes(searchLower) ||
        candidate.inferred_skills?.some(skill =>
          skill?.toLowerCase().includes(searchLower)
        )
      )
    })
    setFilteredCandidates(filtered)
  }, [searchTerm, searchData])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-umukozi-gradient-subtle">
        <Navbar />
        <LoadingState />
      </div>
    )
  }

  if (!searchData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-orange-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 shadow-xl border border-white/20">
            <div className="w-24 h-24 bg-linear-to-r from-orange-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-light text-slate-800 mb-6">No Search Results Found</h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              It looks like you haven't performed a search yet, or your search results have expired.
            </p>
            <div className="space-y-6">
              <button
                onClick={() => router.push('/search')}
                className="inline-flex items-center px-10 py-4 bg-linear-to-r from-orange-500 to-teal-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Start New Search
              </button>
              <p className="text-sm text-slate-500">
                Search for candidates based on your specific requirements
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-orange-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Results Header */}
        <ResultsHeader
          totalResults={searchData.total_results}
          searchRequest={searchData.search_request}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onChatOpen={() => setIsChatOpen(true)}
        />

        {/* Results Content */}
        <div className="space-y-8">
          {/* Results Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <CandidateCard
                    candidate={candidate}
                    onSelect={handleCandidateSelect}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <CandidateListItem
                    candidate={candidate}
                    onSelect={handleCandidateSelect}
                  />
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredCandidates.length === 0 && searchData && (
            <div className="text-center py-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 shadow-xl border border-white/20 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-linear-to-r from-orange-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                  </svg>
                </div>
                <h2 className="text-3xl font-light text-slate-800 mb-6">No Candidates Found</h2>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                  {searchTerm ?
                    `No candidates match your search term "${searchTerm}". Try adjusting your search criteria.` :
                    "No candidates were found matching your search criteria. Try adjusting your requirements."
                  }
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="inline-flex items-center px-8 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-all duration-200 hover:scale-105"
                    >
                      Clear Search
                    </button>
                  )}
                  <button
                    onClick={() => router.push('/search')}
                    className="inline-flex items-center px-8 py-3 bg-linear-to-r from-orange-500 to-teal-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Start New Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Chat Widget */}
      <ChatWidget
        candidateId={selectedCandidate?.id}
        candidateName={selectedCandidate?.full_name}
        candidateData={selectedCandidate}
        sessionId={searchData?.search_request?.session_id}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/30">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}