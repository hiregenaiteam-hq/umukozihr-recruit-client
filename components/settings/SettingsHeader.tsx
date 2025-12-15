"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";

interface SettingsHeaderProps {
    onBack: () => void;
}

export default function SettingsHeader({ onBack }: SettingsHeaderProps) {
    return (
        <div className="bg-gradient-to-r from-umukozi-orange to-umukozi-orange-dark text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        onClick={onBack}
                        variant="ghost"
                        className="text-white hover:bg-white/10 p-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <SettingsIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white font-inter">Settings</h1>
                        <p className="text-white/90 font-inter">Manage your account and preferences</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
