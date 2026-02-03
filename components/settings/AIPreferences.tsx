"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Zap, Target, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

interface AIPreferencesProps {
    onSave: (preferences: Record<string, unknown>) => void;
}

export default function AIPreferences({ onSave }: AIPreferencesProps) {
    const [preferences, setPreferences] = useState({
        aggressiveSourcing: true,
        diversityPriority: true,
        remoteFirst: false,
        preferSenior: true,
        includeJunior: false,
        experienceWeight: 70,
        skillWeight: 80,
        locationWeight: 60,
    });

    const handleToggle = (key: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSliderChange = (key: string, value: number[]) => {
        setPreferences(prev => ({ ...prev, [key]: value[0] }));
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-umukozi-orange/10 rounded-xl">
                            <Zap className="w-6 h-6 text-umukozi-orange" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 font-inter">AI Search Preferences</h2>
                            <p className="text-slate-600 font-inter">Customize how our AI finds and ranks candidates</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Search Behavior */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-umukozi-orange" />
                            <h3 className="text-lg font-semibold text-slate-900">Search Behavior</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900">Aggressive Sourcing</p>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Include passive candidates who may not be actively looking for jobs
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.aggressiveSourcing}
                                    onCheckedChange={() => handleToggle('aggressiveSourcing')}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900">Diversity Priority</p>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Emphasize diverse candidate pools in search results
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.diversityPriority}
                                    onCheckedChange={() => handleToggle('diversityPriority')}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900">Remote-First</p>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Prioritize candidates who are open to remote work
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.remoteFirst}
                                    onCheckedChange={() => handleToggle('remoteFirst')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Experience Weighting */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-umukozi-orange" />
                            <h3 className="text-lg font-semibold text-slate-900">Experience Weighting</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900">Prefer Senior Candidates</p>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Weight experience more heavily in candidate scoring
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.preferSenior}
                                    onCheckedChange={() => handleToggle('preferSenior')}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900">Include Junior Talent</p>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Show promising junior candidates with growth potential
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.includeJunior}
                                    onCheckedChange={() => handleToggle('includeJunior')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Scoring Weights */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-umukozi-orange" />
                            <h3 className="text-lg font-semibold text-slate-900">Scoring Weights</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold text-slate-900">Experience Weight</span>
                                    <span className="text-umukozi-orange font-bold">{preferences.experienceWeight}%</span>
                                </div>
                                <Slider
                                    value={[preferences.experienceWeight]}
                                    onValueChange={(value) => handleSliderChange('experienceWeight', value)}
                                    max={100}
                                    step={5}
                                    className="w-full"
                                />
                            </div>

                            <div className="p-4 bg-slate-50 rounded-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold text-slate-900">Skills Weight</span>
                                    <span className="text-umukozi-orange font-bold">{preferences.skillWeight}%</span>
                                </div>
                                <Slider
                                    value={[preferences.skillWeight]}
                                    onValueChange={(value) => handleSliderChange('skillWeight', value)}
                                    max={100}
                                    step={5}
                                    className="w-full"
                                />
                            </div>

                            <div className="p-4 bg-slate-50 rounded-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold text-slate-900">Location Weight</span>
                                    <span className="text-umukozi-orange font-bold">{preferences.locationWeight}%</span>
                                </div>
                                <Slider
                                    value={[preferences.locationWeight]}
                                    onValueChange={(value) => handleSliderChange('locationWeight', value)}
                                    max={100}
                                    step={5}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
