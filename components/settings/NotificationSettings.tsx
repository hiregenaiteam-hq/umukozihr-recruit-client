"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, Smartphone, Globe } from "lucide-react";
import { useState } from "react";

interface NotificationSettingsProps {
    onSave: (notifications: any) => void;
}

export default function NotificationSettings({ onSave }: NotificationSettingsProps) {
    const [notifications, setNotifications] = useState({
        newCandidates: true,
        searchComplete: true,
        weeklyDigest: false,
        productUpdates: true,
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: false,
    });

    const handleToggle = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const notificationGroups = [
        {
            title: "Search & Candidates",
            icon: Bell,
            items: [
                {
                    key: "newCandidates",
                    title: "New Candidate Matches",
                    description: "Get notified when AI finds new candidates matching your searches",
                },
                {
                    key: "searchComplete",
                    title: "Search Completion",
                    description: "Receive alerts when your AI searches are complete",
                },
            ],
        },
        {
            title: "Updates & Insights",
            icon: Globe,
            items: [
                {
                    key: "weeklyDigest",
                    title: "Weekly Digest",
                    description: "Summary of your hiring activity and new opportunities",
                },
                {
                    key: "productUpdates",
                    title: "Product Updates",
                    description: "Learn about new features and improvements",
                },
            ],
        },
        {
            title: "Delivery Methods",
            icon: Mail,
            items: [
                {
                    key: "emailNotifications",
                    title: "Email Notifications",
                    description: "Receive notifications via email",
                },
                {
                    key: "pushNotifications",
                    title: "Push Notifications",
                    description: "Get real-time notifications in your browser",
                },
                {
                    key: "smsNotifications",
                    title: "SMS Notifications",
                    description: "Receive urgent notifications via text message",
                },
            ],
        },
    ];

    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-umukozi-orange/10 rounded-xl">
                            <Bell className="w-6 h-6 text-umukozi-orange" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 font-inter">Notification Preferences</h2>
                            <p className="text-slate-600 font-inter">Choose how and when you want to be notified</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    {notificationGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <group.icon className="w-5 h-5 text-umukozi-orange" />
                                <h3 className="text-lg font-semibold text-slate-900">{group.title}</h3>
                            </div>

                            <div className="space-y-4">
                                {group.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900">{item.title}</p>
                                            <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                                        </div>
                                        <Switch
                                            checked={notifications[item.key as keyof typeof notifications] as boolean}
                                            onCheckedChange={() => handleToggle(item.key as keyof typeof notifications)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
