"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import {
    MapPin,
    Building,
    Building2,
    Bookmark,
    ExternalLink,
    Star,
    CheckCircle,
    TrendingUp,
    Heart,
    AlertTriangle,
    Info
} from "lucide-react"
import { Candidate } from "./types"

interface CompanyContext {
    company_name: string;
    attractiveness_score: number;
    stage: string;
    compensation_philosophy: string;
    risk_level: string;
}

interface CandidateCardProps {
    candidate: Candidate
    onSelect: (candidate: Candidate) => void
    companyContext?: CompanyContext | null
}

const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
        "pre-seed": "Pre-Seed",
        "seed": "Seed",
        "series_a": "Series A",
        "series_b": "Series B",
        "series_c": "Series C",
        "growth": "Growth",
        "public": "Public",
    };
    return labels[stage] || stage;
};

const getCompensationLabel = (compensation: string) => {
    const labels: Record<string, string> = {
        "market_rate": "Market Rate",
        "below_market_equity": "Below Market + Equity",
        "equity_only": "Equity Only",
    };
    return labels[compensation] || compensation;
};

export default function CandidateCard({ candidate, onSelect, companyContext }: CandidateCardProps) {
    const formatExperience = (months: number) => {
        if (months < 12) return `${months} months`
        const years = Math.floor(months / 12)
        const remainingMonths = months % 12
        if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`
        return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} months`
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-umukozi-orange bg-umukozi-orange/10 border-umukozi-orange/20 shadow-sm'
        if (score >= 60) return 'text-umukozi-orange bg-umukozi-orange/10 border-umukozi-orange/20 shadow-sm'
        if (score >= 40) return 'text-umukozi-orange bg-umukozi-orange/10 border-umukozi-orange/20 shadow-sm'
        return 'text-gray-600 bg-gray-100 border-gray-200 shadow-sm'
    }

    const getWillingnessColor = (likelihood: string | undefined) => {
        switch (likelihood) {
            case 'very_likely':
            case 'likely':
                return 'text-green-600 bg-green-50 border-green-200'
            case 'possible':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200'
            case 'unlikely':
            case 'very_unlikely':
                return 'text-red-600 bg-red-50 border-red-200'
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200'
        }
    }

    const getWillingnessLabel = (likelihood: string | undefined) => {
        switch (likelihood) {
            case 'very_likely': return 'Very Likely to Join'
            case 'likely': return 'Likely to Join'
            case 'possible': return 'Possibly Interested'
            case 'unlikely': return 'Unlikely to Join'
            case 'very_unlikely': return 'Very Unlikely'
            default: return 'Not Assessed'
        }
    }

    const getScoreIcon = (score: number) => {
        if (score >= 80) return <CheckCircle className="w-4 h-4 text-umukozi-orange" />
        if (score >= 60) return <Star className="w-4 h-4 text-umukozi-orange" />
        if (score >= 40) return <TrendingUp className="w-4 h-4 text-umukozi-orange" />
        return <TrendingUp className="w-4 h-4 text-gray-600" />
    }

    return (
        <Card
            className="group cursor-pointer bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden rounded-lg"
            onClick={() => onSelect(candidate)}
        >
            {/* Header with Avatar and Score */}
            <div className="relative p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        {candidate.picture_url ? (
                            <img
                                src={candidate.picture_url}
                                alt={candidate.full_name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center border-2 border-gray-100">
                                <span className="text-white font-semibold text-lg">
                                    {candidate.full_name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Score Badge */}
                    <div className={`px-3 py-1.5 rounded-full border ${getScoreColor(candidate.relevance_score)}`}>
                        <div className="flex items-center gap-1.5">
                            {getScoreIcon(candidate.relevance_score)}
                            <span className="font-semibold text-sm">{candidate.relevance_score.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>

                {/* Name and Headline */}
                <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-200">
                        {candidate.full_name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {candidate.headline}
                    </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{candidate.location_full}</span>
                </div>
            </div>

            {/* Content */}
            <CardContent className="px-6 pb-6">
                {/* Current Role */}
                {candidate.active_experience_title && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Building className="w-4 h-4 text-gray-500" />
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Role</span>
                        </div>
                        <p className="font-medium text-sm text-gray-900 mb-1">{candidate.active_experience_title}</p>
                        {candidate.experience[0]?.company_name && (
                            <p className="text-sm text-gray-600">{candidate.experience[0].company_name}</p>
                        )}
                    </div>
                )}

                {/* Experience and Skills Match */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900">
                            {formatExperience(candidate.total_experience_duration_months)}
                        </div>
                        <div className="text-xs text-gray-500">Experience</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900">
                            {candidate.skill_match_score.toFixed(2)}%
                        </div>
                        <div className="text-xs text-gray-500">Skills Match</div>
                    </div>
                </div>

                {/* Willingness Score - Show when available from deep search */}
                {candidate.willingness_score && (
                    <div className={`mb-4 p-3 rounded-lg border ${getWillingnessColor(candidate.willingness_score.likelihood)}`}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-wide">Willingness to Join</span>
                                {/* Company Context Tooltip */}
                                {companyContext && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <Info className="w-3.5 h-3.5" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="max-w-xs p-3 bg-white border shadow-lg">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 pb-2 border-b">
                                                        <Building2 className="w-4 h-4 text-umukozi-orange" />
                                                        <span className="font-semibold text-sm">Based on {companyContext.company_name}</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                                        <div>
                                                            <span className="text-gray-500">Attractiveness:</span>
                                                            <span className="ml-1 font-medium">{companyContext.attractiveness_score}/100</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Stage:</span>
                                                            <span className="ml-1 font-medium">{getStageLabel(companyContext.stage)}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Compensation:</span>
                                                            <span className="ml-1 font-medium">{getCompensationLabel(companyContext.compensation_philosophy)}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Risk:</span>
                                                            <span className={`ml-1 font-medium capitalize ${
                                                                companyContext.risk_level === 'high' ? 'text-red-600' :
                                                                companyContext.risk_level === 'medium' ? 'text-yellow-600' : 'text-green-600'
                                                            }`}>{companyContext.risk_level}</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 pt-1 border-t">
                                                        Score reflects how likely this candidate would join YOUR company.
                                                    </p>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                            <span className="font-bold">{candidate.willingness_score.score}/20</span>
                        </div>
                        <p className="text-sm font-medium">{getWillingnessLabel(candidate.willingness_score.likelihood)}</p>
                        {candidate.willingness_score.reasoning.length > 0 && (
                            <p className="text-xs mt-1 opacity-80">{candidate.willingness_score.reasoning[0]}</p>
                        )}
                        {candidate.willingness_score.red_flags.length > 0 && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-red-600">
                                <AlertTriangle className="w-3 h-3" />
                                <span>{candidate.willingness_score.red_flags[0]}</span>
                            </div>
                        )}
                        {/* Green flags */}
                        {candidate.willingness_score.green_flags && candidate.willingness_score.green_flags.length > 0 && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                                <CheckCircle className="w-3 h-3" />
                                <span>{candidate.willingness_score.green_flags[0]}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Skills */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Top Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {candidate.inferred_skills.slice(0, 4).map((skill, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs px-2 py-1 bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition-colors duration-200"
                            >
                                {skill}
                            </Badge>
                        ))}
                        {candidate.inferred_skills.length > 4 && (
                            <Badge variant="outline" className="text-xs text-gray-500 border-gray-300 px-2 py-1">
                                +{candidate.inferred_skills.length - 4} more
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium"
                        onClick={(e) => {
                            e.stopPropagation()
                            window.open(candidate.linkedin_url, '_blank')
                        }}
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Profile
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
                        onClick={(e) => {
                            e.stopPropagation()
                            // Handle save functionality
                        }}
                    >
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
