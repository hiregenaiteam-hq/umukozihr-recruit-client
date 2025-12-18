"use client"

import { Button } from "@/components/ui/button"
import { Search, ArrowRight, Sparkles, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface NoResultsStateProps {
    searchTerm: string
    onClearSearch: () => void
}

export default function NoResultsState({ searchTerm, onClearSearch }: NoResultsStateProps) {
    const router = useRouter()

    if (searchTerm) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-xl">
                <div className="w-24 h-24 bg-umukozi-gradient-hero rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <Search className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No candidates found</h3>
                <p className="text-gray-600 mb-8 text-lg">Try adjusting your search terms or filters.</p>
                <Button
                    onClick={onClearSearch}
                    className="umukozi-btn-clean px-6 py-2.5"
                >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Clear Search
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-umukozi-gradient-subtle">
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-24 h-24 bg-umukozi-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Users className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">No Search Results</h2>
                    <p className="text-gray-600 mb-8 text-lg">Please perform a search to see candidates.</p>
                    <Button
                        onClick={() => router.push('/search')}
                        className="umukozi-btn-clean px-6 py-2.5"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Start New Search
                    </Button>
                </div>
            </div>
        </div>
    )
}
