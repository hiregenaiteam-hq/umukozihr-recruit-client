"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Heart, Eye, MessageCircle } from "lucide-react";

interface Candidate {
    id: number;
    full_name: string;
    headline: string;
    picture_url: string | null;
    location_country: string;
    total_experience_duration_months: number;
    relevance_score: number;
    status?: 'new' | 'contacted' | 'interviewed' | 'hired' | 'rejected';
    isBookmarked?: boolean;
    isLiked?: boolean;
}

interface CandidateCardProps {
    candidate: Candidate;
    viewMode: 'grid' | 'list';
    onBookmark: (id: number) => void;
    onLike: (id: number) => void;
    onStatusChange: (id: number, status: string) => void;
    onContact: (id: number) => void;
    onViewProfile: (id: number) => void;
}

export default function CandidateCard({
    candidate,
    viewMode,
    onBookmark,
    onLike,
    onStatusChange,
    onContact,
    onViewProfile
}: CandidateCardProps) {
    const formatExperience = (months: number) => {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        if (years === 0) return `${remainingMonths} months`;
        if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
        return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
        if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
        if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
        return "text-red-600 bg-red-50 border-red-200";
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800';
            case 'contacted': return 'bg-yellow-100 text-yellow-800';
            case 'interviewed': return 'bg-purple-100 text-purple-800';
            case 'hired': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (viewMode === 'list') {
        return (
            <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={candidate.picture_url || "/placeholder-user.jpg"} />
                            <AvatarFallback className="bg-umukozi-orange/10 text-umukozi-orange font-semibold">
                                {candidate.full_name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">{candidate.full_name}</h3>
                                    <p className="text-slate-600 text-sm">{candidate.headline}</p>
                                    <p className="text-slate-500 text-xs mt-1">{candidate.location_country}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className={`${getScoreColor(candidate.relevance_score)} border`}>
                                        {candidate.relevance_score}%
                                    </Badge>
                                    <Button
                                        onClick={() => onBookmark(candidate.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="p-2"
                                    >
                                        <Bookmark className={`w-4 h-4 ${candidate.isBookmarked ? 'fill-current text-umukozi-orange' : 'text-slate-400'}`} />
                                    </Button>
                                    <Button
                                        onClick={() => onLike(candidate.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="p-2"
                                    >
                                        <Heart className={`w-4 h-4 ${candidate.isLiked ? 'fill-current text-red-500' : 'text-slate-400'}`} />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-6 text-sm text-slate-600">
                                    <span>Experience: {formatExperience(candidate.total_experience_duration_months)}</span>
                                    <select
                                        value={candidate.status || 'new'}
                                        onChange={(e) => onStatusChange(candidate.id, e.target.value)}
                                        className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(candidate.status || 'new')} border-0`}
                                    >
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="interviewed">Interviewed</option>
                                        <option value="hired">Hired</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() => onViewProfile(candidate.id)}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View
                                    </Button>
                                    <Button
                                        onClick={() => onContact(candidate.id)}
                                        size="sm"
                                        className="bg-umukozi-orange hover:bg-umukozi-orange-dark"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Contact
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={candidate.picture_url || "/placeholder-user.jpg"} />
                            <AvatarFallback className="bg-umukozi-orange/10 text-umukozi-orange font-semibold">
                                {candidate.full_name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-bold text-slate-900">{candidate.full_name}</h3>
                            <p className="text-sm text-slate-600">{candidate.headline}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => onBookmark(candidate.id)}
                            variant="ghost"
                            size="sm"
                            className="p-2"
                        >
                            <Bookmark className={`w-4 h-4 ${candidate.isBookmarked ? 'fill-current text-umukozi-orange' : 'text-slate-400'}`} />
                        </Button>
                        <Button
                            onClick={() => onLike(candidate.id)}
                            variant="ghost"
                            size="sm"
                            className="p-2"
                        >
                            <Heart className={`w-4 h-4 ${candidate.isLiked ? 'fill-current text-red-500' : 'text-slate-400'}`} />
                        </Button>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Match Score</span>
                        <Badge className={`${getScoreColor(candidate.relevance_score)} border`}>
                            {candidate.relevance_score}%
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Experience</span>
                        <span className="text-sm font-medium">{formatExperience(candidate.total_experience_duration_months)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Location</span>
                        <span className="text-sm font-medium">{candidate.location_country}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Status</span>
                        <select
                            value={candidate.status || 'new'}
                            onChange={(e) => onStatusChange(candidate.id, e.target.value)}
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(candidate.status || 'new')} border-0`}
                        >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="interviewed">Interviewed</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                    <Button
                        onClick={() => onViewProfile(candidate.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                    </Button>
                    <Button
                        onClick={() => onContact(candidate.id)}
                        size="sm"
                        className="flex-1 bg-umukozi-orange hover:bg-umukozi-orange-dark"
                    >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
