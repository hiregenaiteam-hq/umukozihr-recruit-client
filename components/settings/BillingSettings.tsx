"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Crown, TrendingUp, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";

interface BillingSettingsProps {
    currentPlan: {
        id: string;
        name: string;
        price: number;
        currency?: string;
        searches: number | string;
        description: string;
    };
    searchesUsed: number;
    usageHistory: Array<{
        date: string;
        searches: number;
        cost: string;
    }>;
}

function formatPrice(price: number, currency?: string): string {
    if (currency === "GHS") {
        return `₵${price.toLocaleString()}`;
    }
    return `$${price.toLocaleString()}`;
}

export default function BillingSettings({ currentPlan, searchesUsed, usageHistory }: BillingSettingsProps) {
    const usagePercentage = typeof currentPlan.searches === "number"
        ? (searchesUsed / currentPlan.searches) * 100
        : 0;

    return (
        <div className="space-y-6">
            {/* Current Plan */}
            <Card className="border-2 border-umukozi-orange shadow-lg bg-linear-to-br from-umukozi-orange/5 to-white">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-umukozi-orange/10 rounded-xl">
                                <Crown className="w-6 h-6 text-umukozi-orange" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 font-inter">{currentPlan.name}</h2>
                                <p className="text-slate-600 font-inter">{currentPlan.searches} searches per month</p>
                                <p className="text-xs text-slate-500 mt-1">{currentPlan.description}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-slate-900 font-inter">
                                {currentPlan.price === 0 ? "Free" : formatPrice(currentPlan.price, currentPlan.currency)}
                            </p>
                            {currentPlan.price > 0 && (
                                <p className="text-slate-600 font-inter">per month</p>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {typeof currentPlan.searches === "number" && (
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-700">Searches Used</span>
                                <span className="text-sm font-bold text-slate-900">
                                    {searchesUsed} / {currentPlan.searches}
                                </span>
                            </div>
                            <Progress
                                value={usagePercentage}
                                className="h-3 bg-slate-200"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>0</span>
                                <span className="text-umukozi-orange font-medium">{Math.round(usagePercentage)}% used</span>
                                <span>{currentPlan.searches}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Link href="/payment" passHref legacyBehavior>
                            <Button className="bg-umukozi-orange hover:bg-umukozi-orange-dark text-white flex-1">
                                <Crown className="w-4 h-4 mr-2" />
                                Upgrade Plan
                            </Button>
                        </Link>
                        <Button variant="outline" className="flex-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            Change Billing
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-0 shadow-lg bg-linear-to-br from-white to-slate-50/50">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-umukozi-orange/10 rounded-xl">
                            <CreditCard className="w-6 h-6 text-umukozi-orange" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 font-inter">Payment Method</h2>
                            <p className="text-slate-600 font-inter">Manage your payment information</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-linear-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">VISA</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">•••• •••• •••• 4242</p>
                                <p className="text-sm text-slate-600">Expires 12/25</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            Edit
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Usage History */}
            <Card className="border-0 shadow-lg bg-linear-to-br from-white to-slate-50/50">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-umukozi-orange/10 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-umukozi-orange" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 font-inter">Recent Usage</h2>
                            <p className="text-slate-600 font-inter">Your search activity and costs</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {usageHistory.map((usage, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-umukozi-orange/10 rounded-lg flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-umukozi-orange" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{usage.date}</p>
                                        <p className="text-sm text-slate-600">{usage.searches} searches</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900">{usage.cost}</p>
                                    <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
