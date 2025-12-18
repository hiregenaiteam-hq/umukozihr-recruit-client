"use client";

import { Card } from "@/components/ui/card";
import { Search, Users, Star, TrendingUp } from "lucide-react";

interface UserData {
    monthly_search_limit: number;
    monthly_searches_used: number;
}

interface UsageStatsProps {
    user: UserData;
    candidatesCount: number;
}

export default function UsageStats({ user, candidatesCount }: UsageStatsProps) {
    const usagePercentage = Math.round((user.monthly_searches_used / user.monthly_search_limit) * 100);

    const stats = [
        {
            icon: Search,
            value: user.monthly_searches_used,
            label: "Searches Used",
            color: "from-umukozi-orange/10 to-umukozi-orange/5",
            borderColor: "border-umukozi-orange/20",
            iconColor: "text-umukozi-orange"
        },
        {
            icon: Users,
            value: candidatesCount,
            label: "Candidates Found",
            color: "from-blue-50 to-blue-100/50",
            borderColor: "border-blue-200",
            iconColor: "text-blue-600"
        },
        {
            icon: Star,
            value: `${usagePercentage}%`,
            label: "Usage Rate",
            color: "from-umukozi-orange/20 to-umukozi-orange/10",
            borderColor: "border-umukozi-orange/30",
            iconColor: "text-umukozi-orange"
        }
    ];

    return (
        <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
            <div className="flex items-center mb-6">
                <div className="p-3 bg-umukozi-orange/10 rounded-xl mr-4">
                    <TrendingUp className="w-6 h-6 text-umukozi-orange" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 font-inter">Usage Statistics</h2>
                    <p className="text-slate-600 font-inter">Your activity and platform usage</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`text-center p-6 bg-gradient-to-br ${stat.color} rounded-2xl border ${stat.borderColor} hover:shadow-lg transition-all duration-200`}
                    >
                        <div className={`w-12 h-12 ${stat.iconColor} mx-auto mb-4 rounded-xl bg-white/50 flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-3xl font-bold text-slate-900 font-inter mb-1">{stat.value}</p>
                        <p className="text-slate-600 font-inter text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}
