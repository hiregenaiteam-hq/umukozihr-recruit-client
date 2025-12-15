"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import {
  SettingsHeader,
  SettingsTabs,
  AccountSettings,
  AIPreferences,
  NotificationSettings,
  BillingSettings,
} from "@/components/settings";

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

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUserData = localStorage.getItem('user_data');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUser(userData);
        } else {
          router.push('/auth');
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        router.push('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [router]);

  const handleAccountSave = async (data: Partial<UserData>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local storage
      const updatedUser = { ...user, ...data } as UserData;
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast({
        title: "Account updated",
        description: "Your account information has been saved successfully.",
      });
    } catch (error) {
      throw error;
    }
  };

  const handlePreferencesSave = (preferences: any) => {
    // Save AI preferences
    localStorage.setItem('ai_preferences', JSON.stringify(preferences));
    toast({
      title: "Preferences saved",
      description: "Your AI preferences have been updated.",
    });
  };

  const handleNotificationsSave = (notifications: any) => {
    // Save notification preferences
    localStorage.setItem('notification_preferences', JSON.stringify(notifications));
    toast({
      title: "Notifications updated",
      description: "Your notification preferences have been saved.",
    });
  };

  // Mock data for billing
  const currentPlan = {
    id: "professional",
    name: "Professional Plan",
    price: 399,
    searches: 50,
    description: "For SMEs & HR managers",
  };

  const searchesUsed = 23;

  const usageHistory = [
    { date: "Jan 15, 2024", searches: 8, cost: "$16.00" },
    { date: "Jan 14, 2024", searches: 3, cost: "$6.00" },
    { date: "Jan 13, 2024", searches: 12, cost: "$24.00" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-umukozi-orange/10">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-umukozi-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 font-inter">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-umukozi-orange/10">
      <Navbar />

      {/* Header */}
      <SettingsHeader onBack={() => router.back()} />

      {/* Tabs */}
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Account Tab */}
        {activeTab === "account" && (
          <AccountSettings user={user} onSave={handleAccountSave} />
        )}

        {/* AI Preferences Tab */}
        {activeTab === "preferences" && (
          <AIPreferences onSave={handlePreferencesSave} />
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <NotificationSettings onSave={handleNotificationsSave} />
        )}

        {/* Billing Tab */}
        {activeTab === "billing" && (
          <BillingSettings
            currentPlan={currentPlan}
            searchesUsed={searchesUsed}
            usageHistory={usageHistory}
          />
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-umukozi-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-umukozi-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Security Settings</h3>
              <p className="text-slate-600 mb-6">Password management and security preferences coming soon.</p>
              <button className="text-umukozi-orange hover:text-umukozi-orange-dark font-medium">
                Learn more about security →
              </button>
            </div>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-umukozi-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-umukozi-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Appearance Settings</h3>
              <p className="text-slate-600 mb-6">Theme and display preferences coming soon.</p>
              <button className="text-umukozi-orange hover:text-umukozi-orange-dark font-medium">
                Learn more about themes →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}