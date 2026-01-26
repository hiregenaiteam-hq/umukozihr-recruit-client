"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Mail, Edit3, LogOut, Search, Crown, Shield, ShieldCheck } from "lucide-react";

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
    is_admin?: boolean;
    admin_role?: string | null;
}

interface ProfileHeroProps {
    user: UserData;
    onNewSearch: () => void;
    onEditProfile: () => void;
    onLogout: () => void;
}

export default function ProfileHero({ user, onNewSearch, onEditProfile, onLogout }: ProfileHeroProps) {
    const getUserInitials = (user: UserData) => {
        if (!user) return "U";

        if (user.full_name && user.full_name.trim()) {
            const names = user.full_name.trim().split(" ").filter(name => name.length > 0);
            if (names.length >= 2) {
                return (names[0][0] + names[names.length - 1][0]).toUpperCase();
            }
            if (names.length === 1) {
                return names[0][0].toUpperCase();
            }
        }

        if (user.username && user.username.trim()) {
            return user.username.substring(0, 2).toUpperCase();
        }

        if (user.email && user.email.trim()) {
            return user.email.substring(0, 2).toUpperCase();
        }

        return "U";
    };

    return (
        <div className="relative bg-gradient-to-r from-umukozi-orange to-umukozi-orange-dark text-white overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32" />

            <div className="relative max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
                            <AvatarFallback className="bg-white/20 text-white text-4xl font-bold font-inter">
                                {getUserInitials(user)}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <h1 className="text-4xl font-light text-white mb-2 font-inter">
                                {user.full_name || user.username || "User"}
                            </h1>
                            <p className="text-xl text-white/90 mb-2 font-inter">
                                {user.job_title || "Professional"}
                            </p>
                            <div className="flex items-center text-white/80 font-inter">
                                {user.company && (
                                    <>
                                        <Building className="w-5 h-5 mr-2" />
                                        <span className="mr-6">{user.company}</span>
                                    </>
                                )}
                                <Mail className="w-5 h-5 mr-2" />
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="text-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                            <div className="flex items-center justify-center mb-2">
                                {user.is_admin ? (
                                    <ShieldCheck className="w-8 h-8 text-emerald-300" />
                                ) : user.is_premium ? (
                                    <Crown className="w-8 h-8 text-yellow-300" />
                                ) : (
                                    <Shield className="w-8 h-8 text-white/80" />
                                )}
                            </div>
                            <p className="text-white/90 text-sm font-inter">
                                {user.is_admin ? "Admin" : user.is_premium ? "Premium" : "Free"} Account
                            </p>
                            <div className="flex flex-col items-center gap-1 mt-2">
                                {user.is_admin && (
                                    <Badge className="bg-emerald-400 text-emerald-900">
                                        {user.admin_role || 'Admin'}
                                    </Badge>
                                )}
                                <Badge className={`${user.is_premium ? 'bg-yellow-400 text-yellow-900' : 'bg-white/20 text-white'}`}>
                                    {user.subscription_tier}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="mt-8 flex flex-wrap gap-4">
                    <Button
                        onClick={onNewSearch}
                        className="bg-white text-umukozi-orange hover:bg-white/90 font-inter shadow-lg"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Start New Search
                    </Button>
                    <Button
                        onClick={onEditProfile}
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent font-inter backdrop-blur-sm"
                    >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                    <Button
                        onClick={onLogout}
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent font-inter backdrop-blur-sm"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
