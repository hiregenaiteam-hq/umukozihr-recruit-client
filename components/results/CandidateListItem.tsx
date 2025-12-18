"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    MapPin,
    Building,
    Bookmark,
    ExternalLink,
    MessageCircle,
    Star,
    CheckCircle,
    TrendingUp,
    Calendar
} from "lucide-react"
import { Candidate } from "./types"

interface CandidateListItemProps {
    candidate: Candidate
    onSelect: (candidate: Candidate) => void
}

export default function CandidateListItem({ candidate, onSelect }: CandidateListItemProps) {
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
            <CardContent className="p-6">
                <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        {candidate.picture_url ? (
                            <img
                                src={candidate.picture_url}
                                alt={candidate.full_name}
                                className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center border-2 border-gray-100">
                                <span className="text-white font-semibold text-xl">
                                    {candidate.full_name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-200">
                                    {candidate.full_name}
                                </h3>
                                <p className="text-gray-600 mb-3 leading-relaxed">{candidate.headline}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border">
                                        <MapPin className="w-4 h-4 text-orange-500" />
                                        <span className="text-gray-600">{candidate.location_full}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border">
                                        <Calendar className="w-4 h-4 text-orange-500" />
                                        <span className="text-gray-600">{formatExperience(candidate.total_experience_duration_months)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right ml-4">
                                <div className={`px-4 py-3 rounded-lg border ${getScoreColor(candidate.relevance_score)}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        {getScoreIcon(candidate.relevance_score)}
                                        <span className="font-semibold text-xl">{candidate.relevance_score.toFixed(2)}%</span>
                                    </div>
                                    <p className="text-xs text-gray-600">Match Score</p>
                                </div>
                            </div>
                        </div>

                        {/* Current Role */}
                        {candidate.active_experience_title && (
                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Building className="w-4 h-4 text-gray-500" />
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Role</span>
                                </div>
                                <p className="font-medium text-gray-900 mb-1">{candidate.active_experience_title}</p>
                                {candidate.experience[0]?.company_name && (
                                    <p className="text-sm text-gray-600">{candidate.experience[0].company_name}</p>
                                )}
                            </div>
                        )}

                        {/* Skills */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Star className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Top Skills</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {candidate.inferred_skills.slice(0, 8).map((skill, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="text-sm px-3 py-1.5 bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition-colors duration-200"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                                {candidate.inferred_skills.length > 8 && (
                                    <Badge variant="outline" className="text-sm text-gray-500 border-gray-300 px-3 py-1.5">
                                        +{candidate.inferred_skills.length - 8} more
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button
                                size="sm"
                                className="bg-orange-600 hover:bg-orange-700 text-white font-medium"
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
                                className="border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-500 transition-colors duration-200"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // Handle save functionality
                                }}
                            >
                                <Bookmark className="w-4 h-4 mr-2" />
                                Save
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // Handle message functionality
                                }}
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
