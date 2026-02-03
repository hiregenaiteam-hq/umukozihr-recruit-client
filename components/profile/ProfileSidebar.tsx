"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Settings, Search, Users, Crown, Building2, Star, TrendingUp, AlertTriangle } from "lucide-react";

interface UserData {
    is_active: boolean;
    is_verified: boolean;
    is_premium: boolean;
    subscription_tier: string;
}

interface CompanyProfile {
    company_name: string;
    industry: string;
    stage: string;
    team_size: number;
    remote_policy: string;
    attractiveness_score?: number;
    risk_level?: "high" | "medium" | "low";
}

interface ProfileSidebarProps {
    user: UserData;
    companyProfile?: CompanyProfile | null;
    onNewSearch: () => void;
    onViewCandidates: () => void;
    onSettings: () => void;
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

const getRiskBadgeColor = (risk: string | undefined) => {
    switch (risk) {
        case "low": return "bg-green-100 text-green-700 border-green-200";
        case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
        case "high": return "bg-red-100 text-red-700 border-red-200";
        default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
};

export default function ProfileSidebar({ user, companyProfile, onNewSearch, onViewCandidates, onSettings }: ProfileSidebarProps) {
    const attractivenessScore = companyProfile?.attractiveness_score || 0;

    return (
        <div className="space-y-6">
            {/* Company Score Card */}
            {companyProfile ? (
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-umukozi-orange/5 to-orange-50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-umukozi-orange/10 rounded-lg">
                            <Building2 className="w-5 h-5 text-umukozi-orange" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{companyProfile.company_name}</h3>
                            <p className="text-xs text-slate-500">{companyProfile.industry}</p>
                        </div>
                    </div>

                    {/* Attractiveness Score */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-umukozi-orange" />
                                <span className="text-sm font-medium text-slate-700">Attractiveness</span>
                            </div>
                            <span className="text-lg font-bold text-umukozi-orange">{attractivenessScore}/100</span>
                        </div>
                        <Progress value={attractivenessScore} className="h-2" />
                    </div>

                    {/* Company Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="p-2 bg-white/60 rounded-lg text-center">
                            <p className="text-xs text-slate-500">Stage</p>
                            <p className="font-medium text-slate-900 text-sm">{getStageLabel(companyProfile.stage)}</p>
                        </div>
                        <div className="p-2 bg-white/60 rounded-lg text-center">
                            <p className="text-xs text-slate-500">Team</p>
                            <p className="font-medium text-slate-900 text-sm">{companyProfile.team_size}</p>
                        </div>
                    </div>

                    {/* Risk Level */}
                    <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className={`w-4 h-4 ${
                                companyProfile.risk_level === "high" ? "text-red-500" :
                                companyProfile.risk_level === "medium" ? "text-yellow-500" : "text-green-500"
                            }`} />
                            <span className="text-sm text-slate-600">Risk Level</span>
                        </div>
                        <Badge className={`text-xs ${getRiskBadgeColor(companyProfile.risk_level)}`}>
                            {companyProfile.risk_level?.toUpperCase() || "N/A"}
                        </Badge>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-3 text-umukozi-orange hover:text-umukozi-orange-dark hover:bg-umukozi-orange/10"
                        onClick={onSettings}
                    >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Improve Score
                    </Button>
                </Card>
            ) : (
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-slate-50 to-white border-dashed border-2 border-slate-200">
                    <div className="text-center">
                        <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <h3 className="font-bold text-slate-700 mb-1">No Company Profile</h3>
                        <p className="text-xs text-slate-500 mb-3">
                            Set up your company to improve candidate willingness
                        </p>
                        <Button size="sm" onClick={onSettings} className="bg-umukozi-orange hover:bg-umukozi-orange-dark">
                            Create Profile
                        </Button>
                    </div>
                </Card>
            )}

            {/* Account Status */}
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900 mb-4 font-inter">Account Status</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600 font-inter font-medium">Status</span>
                        <Badge className={`${user.is_active ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'} border`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600 font-inter font-medium">Verification</span>
                        <Badge className={`${user.is_verified ? 'bg-umukozi-orange/20 text-umukozi-orange border-umukozi-orange/30' : 'bg-yellow-100 text-yellow-800 border-yellow-200'} border`}>
                            {user.is_verified ? 'Verified' : 'Pending'}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600 font-inter font-medium">Plan</span>
                        <Badge className={`${user.is_premium ? 'bg-umukozi-orange/20 text-umukozi-orange border-umukozi-orange/30' : 'bg-slate-100 text-slate-800 border-slate-200'} border`}>
                            {user.is_premium ? 'Premium' : 'Free'}
                        </Badge>
                    </div>
                </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900 mb-4 font-inter">Quick Actions</h3>
                <div className="space-y-3">
                    <Button
                        onClick={onNewSearch}
                        className="w-full justify-start font-inter bg-umukozi-orange hover:bg-umukozi-orange-dark text-white shadow-md"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        New Search
                    </Button>
                    <Button
                        onClick={onViewCandidates}
                        className="w-full justify-start font-inter"
                        variant="outline"
                    >
                        <Users className="w-4 h-4 mr-2" />
                        My Candidates
                    </Button>
                    <Button
                        onClick={onSettings}
                        className="w-full justify-start font-inter"
                        variant="outline"
                    >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                    </Button>
                </div>
            </Card>

            {/* Premium Info */}
            {user.is_premium && (
                <Card className="p-6 bg-gradient-to-br from-umukozi-orange/10 to-umukozi-orange/5 border-umukozi-orange/30 shadow-lg">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-umukozi-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Crown className="w-8 h-8 text-umukozi-orange" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 font-inter">Premium Member</h3>
                        <p className="text-sm text-slate-600 font-inter mb-4">
                            You have access to all premium features and unlimited searches.
                        </p>
                        <Button
                            size="sm"
                            className="bg-umukozi-orange hover:bg-umukozi-orange-dark text-white font-inter"
                        >
                            Manage Subscription
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
