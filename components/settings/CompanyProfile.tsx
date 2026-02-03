"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Sparkles, TrendingUp, Users, DollarSign, MapPin, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getCompanyProfile, updateCompanyProfile } from "@/lib/api";

interface CompanyProfileProps {
  onSave?: (profile: CompanyProfileData) => void;
}

interface CompanyProfileData {
  company_name: string;
  tagline?: string;
  industry: string;
  headquarters: string;
  stage: "pre-seed" | "seed" | "series_a" | "series_b" | "series_c" | "growth" | "public";
  team_size: number;
  funding_raised: number;
  monthly_revenue: number;
  is_profitable: boolean;
  compensation_philosophy: "market_rate" | "below_market_equity" | "equity_only";
  remote_policy: "remote_first" | "hybrid" | "office_only";
  mission: string;
  bio: string;
  unique_selling_points: string[];
  growth_potential: string;
}

export default function CompanyProfile({ onSave }: CompanyProfileProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [attractiveness, setAttractiveness] = useState(0);
  const [riskLevel, setRiskLevel] = useState<string>("medium");

  // Form state with proper types
  const [formData, setFormData] = useState<CompanyProfileData>({
    company_name: "",
    tagline: "",
    industry: "",
    headquarters: "",
    stage: "pre-seed",
    team_size: 1,
    funding_raised: 0,
    monthly_revenue: 0,
    is_profitable: false,
    compensation_philosophy: "equity_only",
    remote_policy: "remote_first",
    mission: "",
    bio: "",
    unique_selling_points: [],
    growth_potential: "",
  });

  useEffect(() => {
    loadCompanyProfile();
  }, []);

  const loadCompanyProfile = async () => {
    setIsLoading(true);
    try {
      const data = await getCompanyProfile();
      
      if (data) {
        setFormData({
          company_name: data.company_name || "",
          tagline: data.tagline || "",
          industry: data.industry || "",
          headquarters: data.headquarters || "",
          stage: data.stage || "pre-seed",
          team_size: data.team_size || 1,
          funding_raised: data.funding_raised || 0,
          monthly_revenue: data.monthly_revenue || 0,
          is_profitable: data.is_profitable || false,
          compensation_philosophy: data.compensation_philosophy || "equity_only",
          remote_policy: data.remote_policy || "remote_first",
          mission: data.mission || "",
          bio: data.bio || "",
          unique_selling_points: data.unique_selling_points || [],
          growth_potential: data.growth_potential || "",
        });
        setAttractiveness(data.attractiveness_score || 0);
        setRiskLevel(data.risk_level || "medium");
      }
    } catch (error) {
      console.error('Error loading company profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Filter out USP entries that are empty
      const cleanedUSPs = formData.unique_selling_points.filter(usp => usp.trim() !== "");

      const profileData = {
        ...formData,
        unique_selling_points: cleanedUSPs,
      };

      const result = await updateCompanyProfile(profileData);
      
      setAttractiveness(result.attractiveness_score || 0);
      setRiskLevel(result.risk_level || "medium");

      toast({
        title: "Company profile saved",
        description: `Your company profile has been updated successfully. Attractiveness score: ${result.attractiveness_score}/100`,
      });

      if (onSave) {
        onSave(profileData);
      }
    } catch (error: unknown) {
      console.error('Error saving company profile:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save your company profile. Please try again.";
      toast({
        title: "Save failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addUSP = () => {
    setFormData(prev => ({
      ...prev,
      unique_selling_points: [...prev.unique_selling_points, ""],
    }));
  };

  const updateUSP = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      unique_selling_points: prev.unique_selling_points.map((usp, i) => 
        i === index ? value : usp
      ),
    }));
  };

  const removeUSP = (index: number) => {
    setFormData(prev => ({
      ...prev,
      unique_selling_points: prev.unique_selling_points.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-umukozi-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading company profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-teal-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Why Company Profile Matters</h3>
              <p className="text-sm text-slate-700 mb-3">
                Your company profile is used to calculate <strong>willingness scores</strong> - how likely candidates are to actually join YOUR company.
                A detailed profile helps us find candidates who are genuinely excited about your opportunity.
              </p>
              {attractiveness > 0 && (
                <div className="flex items-center gap-4 mt-4 p-3 bg-white rounded-lg border border-orange-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{attractiveness}/100</div>
                    <div className="text-xs text-slate-600">Attractiveness Score</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${
                      riskLevel === 'high' ? 'text-red-600' : 
                      riskLevel === 'medium' ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {riskLevel.toUpperCase()}
                    </div>
                    <div className="text-xs text-slate-600">Risk Level</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-500" />
              Basic Information
            </CardTitle>
            <CardDescription>Core details about your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                  placeholder="UmukoziHR"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="HR Tech, FinTech, HealthTech"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                placeholder="Building Africa's talent infrastructure"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headquarters">Headquarters *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="headquarters"
                  value={formData.headquarters}
                  onChange={(e) => setFormData(prev => ({ ...prev, headquarters: e.target.value }))}
                  placeholder="Accra, Ghana"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stage & Team */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Stage & Team
            </CardTitle>
            <CardDescription>Where you are in your journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Company Stage *</Label>
                <Select
                  value={formData.stage}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value as CompanyProfileData["stage"] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series_a">Series A</SelectItem>
                    <SelectItem value="series_b">Series B</SelectItem>
                    <SelectItem value="series_c">Series C</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team_size">Team Size *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="team_size"
                    type="number"
                    min="1"
                    value={formData.team_size}
                    onChange={(e) => setFormData(prev => ({ ...prev, team_size: parseInt(e.target.value) || 1 }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="funding_raised">Total Funding Raised (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="funding_raised"
                    type="number"
                    min="0"
                    value={formData.funding_raised}
                    onChange={(e) => setFormData(prev => ({ ...prev, funding_raised: parseFloat(e.target.value) || 0 }))}
                    placeholder="0"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly_revenue">Monthly Revenue (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="monthly_revenue"
                    type="number"
                    min="0"
                    value={formData.monthly_revenue}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthly_revenue: parseFloat(e.target.value) || 0 }))}
                    placeholder="0"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compensation & Culture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-orange-500" />
              Compensation & Work Style
            </CardTitle>
            <CardDescription>How you compensate and where people work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="compensation_philosophy">Compensation Philosophy *</Label>
                <Select
                  value={formData.compensation_philosophy}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, compensation_philosophy: value as CompanyProfileData["compensation_philosophy"] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market_rate">Market Rate (Salary + Benefits)</SelectItem>
                    <SelectItem value="below_market_equity">Below Market + Equity</SelectItem>
                    <SelectItem value="equity_only">Equity Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remote_policy">Remote Policy *</Label>
                <Select
                  value={formData.remote_policy}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, remote_policy: value as CompanyProfileData["remote_policy"] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote_first">Remote First</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="office_only">Office Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission & Bio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-orange-500" />
              Mission & Story
            </CardTitle>
            <CardDescription>Tell candidates why they should join you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea
                id="mission"
                value={formData.mission}
                onChange={(e) => setFormData(prev => ({ ...prev, mission: e.target.value }))}
                placeholder="What are you trying to achieve?"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Company Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell your story. What problem are you solving? Why does it matter? What makes your team special?"
                rows={4}
              />
              <p className="text-xs text-slate-500">More detail = better candidate matching</p>
            </div>

            <div className="space-y-2">
              <Label>Unique Selling Points</Label>
              <p className="text-sm text-slate-600 mb-2">Why should top talent join you?</p>
              <div className="space-y-2">
                {formData.unique_selling_points.map((usp, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={usp}
                      onChange={(e) => updateUSP(index, e.target.value)}
                      placeholder="e.g., Backed by YC, Working with Fortune 500 clients"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeUSP(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addUSP}
                  className="w-full"
                >
                  + Add USP
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="growth_potential">Growth Potential</Label>
              <Textarea
                id="growth_potential"
                value={formData.growth_potential}
                onChange={(e) => setFormData(prev => ({ ...prev, growth_potential: e.target.value }))}
                placeholder="What opportunities for growth exist? (e.g., TAM size, expansion plans, leadership opportunities)"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={isSaving}
            className="bg-gradient-to-r from-umukozi-orange to-umukozi-teal hover:opacity-90 min-w-[200px]"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Company Profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
