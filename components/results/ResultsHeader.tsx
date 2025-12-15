"use client"

import { Button } from "@/components/ui/button"
import {
    MapPin,
    Briefcase,
    Grid3X3,
    List,
    Search,
    Sparkles,
    MessageCircle
} from "lucide-react"
import { SearchRequest } from "./types"

interface ResultsHeaderProps {
    totalResults: number
    searchRequest: SearchRequest
    viewMode: 'grid' | 'list'
    onViewModeChange: (mode: 'grid' | 'list') => void
    searchTerm: string
    onSearchTermChange: (term: string) => void
    onChatOpen?: () => void
}

export default function ResultsHeader({
    totalResults,
    searchRequest,
    viewMode,
    onViewModeChange,
    searchTerm,
    onSearchTermChange,
    onChatOpen
}: ResultsHeaderProps) {
    return (
        <div className="mb-8">
            {/* Main Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-light text-slate-800">
                        {totalResults} Perfect Matches Found
                    </h1>
                </div>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    AI-curated candidates based on your specific requirements
                </p>
            </div>

            {/* Search Criteria Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-white/20">
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <span className="text-orange-700 font-medium">{searchRequest.criteria.location_full}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full border border-teal-100">
                        <Briefcase className="w-4 h-4 text-teal-600" />
                        <span className="text-teal-700 font-medium">{searchRequest.criteria.experience_years_min}-{searchRequest.criteria.experience_years_max} years experience</span>
                    </div>
                </div>
            </div>

            {/* Search and View Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search candidates by name, skills, or experience..."
                        value={searchTerm}
                        onChange={(e) => onSearchTermChange(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 placeholder:text-slate-400 shadow-sm"
                    />
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    {/* Chat with AI Button */}
                    {onChatOpen && (
                        <Button
                            onClick={onChatOpen}
                            className="bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Chat with AI
                        </Button>
                    )}

                    {/* View Toggle */}
                    <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-slate-200 shadow-sm">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewModeChange('grid')}
                            className={`px-4 py-2 font-medium transition-all duration-200 rounded-lg ${viewMode === 'grid'
                                ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-sm'
                                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                                }`}
                        >
                            <Grid3X3 className="w-4 h-4 mr-2" />
                            Grid
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewModeChange('list')}
                            className={`px-4 py-2 font-medium transition-all duration-200 rounded-lg ${viewMode === 'list'
                                ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-sm'
                                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                                }`}
                        >
                            <List className="w-4 h-4 mr-2" />
                            List
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
