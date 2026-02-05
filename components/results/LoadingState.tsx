"use client"

import { Loader2 } from "lucide-react"

/**
 * Simple loading state for the results page.
 * 
 * NOTE: This is ONLY used when loading cached search results from localStorage.
 * For actual search progress, see SearchProgressPanel.tsx which uses real SSE updates.
 * 
 * We intentionally do NOT show:
 * - Fake progress bars
 * - Fake "47 candidates found" animations
 * - Fake step progressions
 * 
 * This loading state appears for < 100ms while reading localStorage.
 */
export default function LoadingState() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                </div>
                <h2 className="text-xl font-medium text-slate-700 mb-2">
                    Loading Results
                </h2>
                <p className="text-sm text-slate-500">
                    Preparing your candidate list...
                </p>
            </div>
        </div>
    )
}