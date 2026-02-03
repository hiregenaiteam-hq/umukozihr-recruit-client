"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Star,
  AlertTriangle,
  Crown,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { calculateAttractivenessBreakdown, type CompanyProfileResponse } from "@/lib/api";

interface ScoreBreakdownProps {
  companyProfile: CompanyProfileResponse | null;
  searchStats?: {
    total_searches: number;
    monthly_searches: number;
  } | null;
  user?: {
    subscription_tier?: string;
    is_premium?: boolean;
    monthly_searches_used?: number;
    monthly_search_limit?: number;
  } | null;
}

export default function ScoreBreakdown({ companyProfile, searchStats, user }: ScoreBreakdownProps) {
  const router = useRouter();
  const { total: attractivenessScore, breakdown } = calculateAttractivenessBreakdown(companyProfile);

  const getRiskBadgeColor = (risk: string | undefined) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Attractiveness Score */}
        <Card className="bg-gradient-to-br from-umukozi-orange to-orange-600 text-white border-0">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wide">Attractiveness</p>
                <p className="text-3xl font-bold">{attractivenessScore}</p>
                <p className="text-white/60 text-xs">/100</p>
              </div>
              <Star className="w-8 h-8 text-white/30" />
            </div>
          </CardContent>
        </Card>

        {/* Risk Level */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide">Risk Level</p>
                <p className="text-xl font-bold text-slate-900 capitalize">
                  {companyProfile?.risk_level || "—"}
                </p>
                <Badge className={`mt-1 text-xs ${getRiskBadgeColor(companyProfile?.risk_level)}`}>
                  {companyProfile?.risk_level === "high" ? "High" : 
                   companyProfile?.risk_level === "medium" ? "Med" : 
                   companyProfile?.risk_level === "low" ? "Low" : "N/A"}
                </Badge>
              </div>
              <AlertTriangle className={`w-7 h-7 ${
                companyProfile?.risk_level === "high" ? "text-red-400" :
                companyProfile?.risk_level === "medium" ? "text-yellow-400" :
                companyProfile?.risk_level === "low" ? "text-green-400" : "text-slate-300"
              }`} />
            </div>
          </CardContent>
        </Card>

        {/* Total Searches */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide">Searches</p>
                <p className="text-3xl font-bold text-slate-900">
                  {searchStats?.total_searches || 0}
                </p>
                <p className="text-slate-400 text-xs">
                  {searchStats?.monthly_searches || 0} this month
                </p>
              </div>
              <Search className="w-7 h-7 text-umukozi-teal/60" />
            </div>
          </CardContent>
        </Card>

        {/* Plan */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide">Plan</p>
                <p className="text-xl font-bold text-slate-900 capitalize">
                  {user?.subscription_tier || "Free"}
                </p>
                <p className="text-slate-400 text-xs">
                  {user?.monthly_searches_used || 0}/{user?.monthly_search_limit || 5}
                </p>
              </div>
              <Crown className={`w-7 h-7 ${user?.is_premium ? "text-yellow-500" : "text-slate-300"}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Score Breakdown Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-umukozi-orange" />
            Attractiveness Score Breakdown
          </CardTitle>
          <CardDescription>
            Higher score = candidates more likely to accept your offers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Overall Score</span>
              <span className="text-lg font-bold text-umukozi-orange">{attractivenessScore}/100</span>
            </div>
            <Progress value={attractivenessScore} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {item.earned ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${item.earned ? "text-slate-900" : "text-slate-500"}`}>
                    {item.label}
                  </span>
                </div>
                <Badge className={`text-xs ${item.earned ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  +{item.value}
                </Badge>
              </div>
            ))}
          </div>

          {attractivenessScore < 70 && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-amber-900 text-sm">Boost Your Score</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Complete your company profile for better candidate responses.
                  </p>
                  <Button 
                    size="sm" 
                    className="mt-2 bg-amber-600 hover:bg-amber-700 h-8 text-xs"
                    onClick={() => router.push("/settings?tab=company")}
                  >
                    Update Profile <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
