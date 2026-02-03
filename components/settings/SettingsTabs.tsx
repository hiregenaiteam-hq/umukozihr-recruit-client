"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Zap, Bell, CreditCard, Shield, Palette, BookOpen, Building2 } from "lucide-react";

interface SettingsTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
    const tabs = [
        { id: "account", label: "Account", icon: User },
        { id: "company", label: "Company Profile", icon: Building2 },
        { id: "preferences", label: "AI Preferences", icon: Zap },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "security", label: "Security", icon: Shield },
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "help", label: "Help & Docs", icon: BookOpen },
    ];

    return (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
                <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-8 bg-slate-50 border-0 h-auto p-1">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-umukozi-orange data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
                            >
                                <tab.icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
}
