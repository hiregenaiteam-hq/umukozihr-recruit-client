"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Save, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
    id: string;
    email: string;
    username: string | null;
    full_name: string | null;
    company: string | null;
    job_title: string | null;
}

interface AccountSettingsProps {
    user: UserData;
    onSave: (data: Partial<UserData>) => void;
}

export default function AccountSettings({ user, onSave }: AccountSettingsProps) {
    const [formData, setFormData] = useState({
        full_name: user.full_name || "",
        username: user.username || "",
        email: user.email || "",
        company: user.company || "",
        job_title: user.job_title || "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await onSave(formData);
            toast({
                title: "Account updated",
                description: "Your account information has been saved successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update account information. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-umukozi-orange/10 rounded-xl">
                            <User className="w-6 h-6 text-umukozi-orange" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 font-inter">Account Information</h2>
                            <p className="text-slate-600 font-inter">Update your personal details and profile information</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Profile Photo */}
                        <div className="space-y-4">
                            <Label className="text-base font-semibold text-slate-900">Profile Photo</Label>
                            <div className="flex items-center gap-6">
                                <Avatar className="w-20 h-20 border-4 border-umukozi-orange/20">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback className="bg-umukozi-orange/10 text-umukozi-orange text-2xl font-bold">
                                        {user.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button type="button" variant="outline" className="flex items-center gap-2">
                                        <Upload className="w-4 h-4" />
                                        Upload New Photo
                                    </Button>
                                    <p className="text-sm text-slate-500">JPG, PNG or GIF. Max size 2MB.</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="full_name" className="text-sm font-semibold text-slate-700">
                                    Full Name
                                </Label>
                                <Input
                                    id="full_name"
                                    value={formData.full_name}
                                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                                    className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-umukozi-orange/20 focus:border-umukozi-orange"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-semibold text-slate-700">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    value={formData.username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                    className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-umukozi-orange/20 focus:border-umukozi-orange"
                                    placeholder="Choose a username"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-umukozi-orange/20 focus:border-umukozi-orange"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-sm font-semibold text-slate-700">
                                    Company
                                </Label>
                                <Input
                                    id="company"
                                    value={formData.company}
                                    onChange={(e) => handleInputChange('company', e.target.value)}
                                    className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-umukozi-orange/20 focus:border-umukozi-orange"
                                    placeholder="Your company name"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="job_title" className="text-sm font-semibold text-slate-700">
                                    Job Title
                                </Label>
                                <Input
                                    id="job_title"
                                    value={formData.job_title}
                                    onChange={(e) => handleInputChange('job_title', e.target.value)}
                                    className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-umukozi-orange/20 focus:border-umukozi-orange"
                                    placeholder="Your current job title"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-slate-100">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-umukozi-orange hover:bg-umukozi-orange-dark text-white px-8 py-3 h-12 font-inter"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
