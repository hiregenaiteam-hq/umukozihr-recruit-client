"use client";

import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

interface UserData {
    id: string;
    email: string;
    username: string | null;
    full_name: string | null;
    company: string | null;
    job_title: string | null;
    is_active: boolean;
    is_verified: boolean;
    is_premium: boolean;
    subscription_tier: string;
    monthly_search_limit: number;
    monthly_searches_used: number;
    created_at: string;
}

interface AccountOverviewProps {
    user: UserData;
}

export default function AccountOverview({ user }: AccountOverviewProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
            <div className="flex items-center mb-6">
                <div className="p-3 bg-umukozi-orange/10 rounded-xl mr-4">
                    <User className="w-6 h-6 text-umukozi-orange" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 font-inter">Account Overview</h2>
                    <p className="text-slate-600 font-inter">Your personal information and account details</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <label className="text-sm font-semibold text-slate-600 font-inter uppercase tracking-wide">Full Name</label>
                        <p className="text-lg text-slate-900 font-inter mt-1">{user.full_name || "Not provided"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <label className="text-sm font-semibold text-slate-600 font-inter uppercase tracking-wide">Username</label>
                        <p className="text-lg text-slate-900 font-inter mt-1">{user.username || "Not set"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <label className="text-sm font-semibold text-slate-600 font-inter uppercase tracking-wide">Email</label>
                        <p className="text-lg text-slate-900 font-inter mt-1">{user.email}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <label className="text-sm font-semibold text-slate-600 font-inter uppercase tracking-wide">Company</label>
                        <p className="text-lg text-slate-900 font-inter mt-1">{user.company || "Not provided"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <label className="text-sm font-semibold text-slate-600 font-inter uppercase tracking-wide">Job Title</label>
                        <p className="text-lg text-slate-900 font-inter mt-1">{user.job_title || "Not provided"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <label className="text-sm font-semibold text-slate-600 font-inter uppercase tracking-wide">Member Since</label>
                        <p className="text-lg text-slate-900 font-inter mt-1">{formatDate(user.created_at)}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
