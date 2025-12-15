"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Search, Users, Crown, Shield } from "lucide-react";

interface UserData {
    is_active: boolean;
    is_verified: boolean;
    is_premium: boolean;
    subscription_tier: string;
}

interface ProfileSidebarProps {
    user: UserData;
    onNewSearch: () => void;
    onViewCandidates: () => void;
    onSettings: () => void;
}

export default function ProfileSidebar({ user, onNewSearch, onViewCandidates, onSettings }: ProfileSidebarProps) {
    return (
        <div className="space-y-6">
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
