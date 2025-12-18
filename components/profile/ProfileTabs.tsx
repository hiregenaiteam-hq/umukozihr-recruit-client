"use client";

import { User, Users } from "lucide-react";

interface ProfileTabsProps {
    activeTab: 'profile' | 'candidates';
    onTabChange: (tab: 'profile' | 'candidates') => void;
    candidatesCount: number;
}

export default function ProfileTabs({ activeTab, onTabChange, candidatesCount }: ProfileTabsProps) {
    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'candidates', label: 'My Candidates', icon: Users },
    ];

    return (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id as any)}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 flex items-center gap-2 relative ${activeTab === tab.id
                                ? "border-umukozi-orange text-umukozi-orange"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {tab.id === 'candidates' && candidatesCount > 0 && (
                                <span className="bg-umukozi-orange text-white text-xs px-2 py-1 rounded-full font-medium">
                                    {candidatesCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
