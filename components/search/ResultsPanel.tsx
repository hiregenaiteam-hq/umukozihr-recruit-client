"use client";

import { useState } from "react";
import { Users, MapPin, Briefcase, Star, ExternalLink, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Candidate {
  id: number;
  full_name: string;
  headline?: string;
  linkedin_url?: string;
  location_full?: string;
  active_experience_title?: string;
  inferred_skills?: string[];
  relevance_score?: number;
  matched_skills?: string[];
  willingness?: {
    score: number;
    reasons: string[];
  } | null;
}

interface ResultsPanelProps {
  candidates: Candidate[];
  isLoading: boolean;
  searchStatus: "idle" | "searching" | "clarifying" | "complete" | "error";
  totalFound?: number;
  onViewProfile: (id: number) => void;
  errorMessage?: string;
}

export default function ResultsPanel({
  candidates,
  isLoading,
  searchStatus,
  totalFound,
  onViewProfile,
  errorMessage,
}: ResultsPanelProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Idle state - no search yet
  if (searchStatus === "idle" && candidates.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          Ready to Search
        </h3>
        <p className="text-sm text-slate-500 max-w-xs">
          Describe who you're looking for in the chat, and candidates will appear here.
        </p>
      </div>
    );
  }

  // Loading state
  if (isLoading || searchStatus === "searching") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          Finding Candidates
        </h3>
        <p className="text-sm text-slate-500 max-w-xs">
          Searching across millions of profiles to find the best matches...
        </p>
        <div className="mt-4 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Clarifying state
  if (searchStatus === "clarifying") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-amber-50 rounded-2xl border border-amber-200">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-amber-600" />
        </div>
        <h3 className="text-lg font-semibold text-amber-800 mb-2">
          Need More Details
        </h3>
        <p className="text-sm text-amber-700 max-w-xs">
          Please answer the questions in the chat to help narrow down your search.
        </p>
      </div>
    );
  }

  // Error state
  if (searchStatus === "error") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-red-50 rounded-2xl border border-red-200">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-red-700 mb-2">
          Search Failed
        </h3>
        <p className="text-sm text-red-600 max-w-xs">
          {errorMessage || "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  // No results
  if (candidates.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          No Matches Found
        </h3>
        <p className="text-sm text-slate-500 max-w-xs">
          Try broadening your search criteria or adjusting the location.
        </p>
      </div>
    );
  }

  // Results list
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-teal-50 to-orange-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">
                {totalFound || candidates.length} Candidates
              </h3>
              <p className="text-xs text-slate-500">Ranked by relevance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {candidates.map((candidate, index) => (
          <div
            key={candidate.id}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              hoveredId === candidate.id
                ? "border-orange-300 bg-orange-50 shadow-md"
                : "border-slate-200 bg-white hover:border-orange-200 hover:shadow-sm"
            }`}
            onMouseEnter={() => setHoveredId(candidate.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onViewProfile(candidate.id)}
          >
            {/* Top Row: Rank + Name + Score */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {candidate.full_name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "?"}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">
                    {candidate.full_name}
                  </h4>
                  {candidate.active_experience_title && (
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {candidate.active_experience_title}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-orange-600 fill-orange-600" />
                <span className="text-xs font-bold text-orange-700">
                  {Math.round(candidate.relevance_score || 0)}%
                </span>
              </div>
            </div>

            {/* Location */}
            {candidate.location_full && (
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                <MapPin className="w-3 h-3" />
                {candidate.location_full}
              </div>
            )}

            {/* Skills */}
            {candidate.matched_skills && candidate.matched_skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {candidate.matched_skills.slice(0, 4).map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs bg-teal-100 text-teal-700 hover:bg-teal-200"
                  >
                    {skill}
                  </Badge>
                ))}
                {candidate.matched_skills.length > 4 && (
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                    +{candidate.matched_skills.length - 4}
                  </Badge>
                )}
              </div>
            )}

            {/* Willingness Score */}
            {candidate.willingness && (
              <div className="mt-2 p-2 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Willingness to join</span>
                  <span className={`font-semibold ${
                    candidate.willingness.score >= 70 ? "text-green-600" :
                    candidate.willingness.score >= 50 ? "text-amber-600" :
                    "text-red-600"
                  }`}>
                    {candidate.willingness.score}%
                  </span>
                </div>
              </div>
            )}

            {/* View Profile Link */}
            {candidate.linkedin_url && hoveredId === candidate.id && (
              <div className="mt-3 pt-2 border-t border-slate-100">
                <a
                  href={candidate.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  View LinkedIn <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
