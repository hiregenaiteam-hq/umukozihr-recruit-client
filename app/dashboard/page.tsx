"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  getCurrentUser,
  getCompanyProfile,
  getUserSearchStats,
  calculateAttractivenessBreakdown,
  type UserProfile,
  type CompanyProfileResponse,
} from "@/lib/api";
import {
  Building2,
  Search,
  Users,
  TrendingUp,
  Star,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Settings,
  Sparkles,
  Target,
  Zap,
  Crown,
} from "lucide-react";

interface SearchStats {
  total_searches: number;
  monthly_searches: number;
  searches_this_week: number;
  last_search_date: string | null;
  average_searches_per_month: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfileResponse | null>(null);
  const [searchStats, setSearchStats] = useState<SearchStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setIsLoading(true);
      const [userData, profileData, statsData] = await Promise.all([
        getCurrentUser().catch(() => null),
        getCompanyProfile().catch(() => null),
        getUserSearchStats().catch(() => null),
      ]);

      if (userData) {
        setUser(userData);
        localStorage.setItem("user_data", JSON.stringify(userData));
      } else {
        // Check localStorage fallback
        const stored = localStorage.getItem("user_data");
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          router.push("/auth");
          return;
        }
      }

      setCompanyProfile(profileData);
      setSearchStats(statsData);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

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

  const getStageLabel = (stage: string | undefined) => {
    const labels: Record<string, string> = {
      "pre-seed": "Pre-Seed",
      "seed": "Seed",
      "series_a": "Series A",
      "series_b": "Series B",
      "series_c": "Series C",
      "growth": "Growth",
      "public": "Public",
    };
    return labels[stage || ""] || "Unknown";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-umukozi-orange/5">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-umukozi-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-umukozi-orange/5">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.full_name?.split(" ")[0] || user?.username || "there"}! 👋
          </h1>
          <p className="text-slate-600 mt-1">
            Here's how your company and recruitment efforts look today.
          </p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Attractiveness Score */}
          <Card className="bg-gradient-to-br from-umukozi-orange to-orange-600 text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Attractiveness</p>
                  <p className="text-4xl font-bold">{attractivenessScore}</p>
                  <p className="text-white/60 text-xs mt-1">/ 100 points</p>
                </div>
                <Star className="w-12 h-12 text-white/30" />
              </div>
            </CardContent>
          </Card>

          {/* Risk Level */}
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Risk Level</p>
                  <p className="text-2xl font-bold text-slate-900 capitalize">
                    {companyProfile?.risk_level || "Unknown"}
                  </p>
                  <Badge className={`mt-1 ${getRiskBadgeColor(companyProfile?.risk_level)}`}>
                    {companyProfile?.risk_level === "high" ? "High Risk" : 
                     companyProfile?.risk_level === "medium" ? "Moderate" : 
                     companyProfile?.risk_level === "low" ? "Low Risk" : "Not Set"}
                  </Badge>
                </div>
                <AlertTriangle className={`w-10 h-10 ${
                  companyProfile?.risk_level === "high" ? "text-red-400" :
                  companyProfile?.risk_level === "medium" ? "text-yellow-400" :
                  companyProfile?.risk_level === "low" ? "text-green-400" : "text-slate-300"
                }`} />
              </div>
            </CardContent>
          </Card>

          {/* Total Searches */}
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Total Searches</p>
                  <p className="text-4xl font-bold text-slate-900">
                    {searchStats?.total_searches || 0}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    {searchStats?.monthly_searches || 0} this month
                  </p>
                </div>
                <Search className="w-10 h-10 text-umukozi-teal/60" />
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Plan</p>
                  <p className="text-2xl font-bold text-slate-900 capitalize">
                    {user?.subscription_tier || "Free"}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    {user?.monthly_searches_used || 0} / {user?.monthly_search_limit || 5} searches
                  </p>
                </div>
                <Crown className={`w-10 h-10 ${user?.is_premium ? "text-yellow-500" : "text-slate-300"}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Score Breakdown */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-umukozi-orange" />
                Attractiveness Score Breakdown
              </CardTitle>
              <CardDescription>
                How attractive your company is to candidates. Higher score = better candidate willingness.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Overall Score</span>
                  <span className="text-lg font-bold text-umukozi-orange">{attractivenessScore}/100</span>
                </div>
                <Progress value={attractivenessScore} className="h-3" />
              </div>

              <div className="space-y-3">
                {breakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {item.earned ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                      )}
                      <div>
                        <span className={`font-medium ${item.earned ? "text-slate-900" : "text-slate-500"}`}>
                          {item.label}
                        </span>
                        {item.tip && !item.earned && (
                          <p className="text-xs text-slate-400">{item.tip}</p>
                        )}
                      </div>
                    </div>
                    <Badge className={item.earned ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}>
                      +{item.value}
                    </Badge>
                  </div>
                ))}
              </div>

              {attractivenessScore < 70 && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-900">Improve Your Score</p>
                      <p className="text-sm text-amber-700 mt-1">
                        Complete your company profile to boost your attractiveness score. 
                        Higher scores mean candidates are more likely to accept your opportunities!
                      </p>
                      <Button 
                        size="sm" 
                        className="mt-3 bg-amber-600 hover:bg-amber-700"
                        onClick={() => router.push("/settings?tab=company")}
                      >
                        Update Profile <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Company Info Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-umukozi-teal" />
                Your Company
              </CardTitle>
            </CardHeader>
            <CardContent>
              {companyProfile ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {companyProfile.company_name}
                    </h3>
                    {companyProfile.tagline && (
                      <p className="text-slate-500 text-sm mt-1">{companyProfile.tagline}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase">Industry</p>
                      <p className="font-medium text-slate-900">{companyProfile.industry}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase">Stage</p>
                      <p className="font-medium text-slate-900">{getStageLabel(companyProfile.stage)}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase">Team Size</p>
                      <p className="font-medium text-slate-900">{companyProfile.team_size} people</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase">Remote</p>
                      <p className="font-medium text-slate-900 capitalize">
                        {companyProfile.remote_policy.replace("_", " ")}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => router.push("/settings?tab=company")}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Company Profile
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-medium text-slate-900 mb-2">No Company Profile</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Set up your company profile to improve candidate willingness scores.
                  </p>
                  <Button onClick={() => router.push("/settings?tab=company")}>
                    <Zap className="w-4 h-4 mr-2" />
                    Create Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/search")}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-umukozi-orange/10 rounded-xl">
                  <Search className="w-6 h-6 text-umukozi-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">New Search</h3>
                  <p className="text-sm text-slate-500">Find your next great hire</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 ml-auto" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/profile")}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-umukozi-teal/10 rounded-xl">
                  <Users className="w-6 h-6 text-umukozi-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">My Candidates</h3>
                  <p className="text-sm text-slate-500">View saved candidates</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 ml-auto" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/settings")}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Settings</h3>
                  <p className="text-sm text-slate-500">Manage your account</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
