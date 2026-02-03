"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import {
  SettingsHeader,
  SettingsTabs,
  AccountSettings,
  CompanyProfile,
  AIPreferences,
  NotificationSettings,
  BillingSettings,
  HelpDocumentation,
} from "@/components/settings";
import {
  getCurrentUser,
  getMySubscription,
  getSubscriptionPlans,
  updateUserProfile,
  type UserProfile,
  type UserSubscription,
  type SubscriptionPlansResponse,
} from "@/lib/api";

function SettingsContent() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlansResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Handle tab from URL query parameter
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["account", "company", "preferences", "notifications", "billing", "security", "appearance", "help"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setIsLoading(true);
      
      // Try to load from API first
      const [userData, subscriptionData, plansData] = await Promise.all([
        getCurrentUser().catch(() => null),
        getMySubscription().catch(() => null),
        getSubscriptionPlans().catch(() => null),
      ]);

      if (userData) {
        setUser(userData);
        // Also update localStorage for other components
        localStorage.setItem('user_data', JSON.stringify(userData));
      } else {
        // Fallback to localStorage
        const storedUserData = localStorage.getItem('user_data');
        if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        } else {
          router.push('/auth');
          return;
        }
      }

      setSubscription(subscriptionData);
      setPlans(plansData);
    } catch (error) {
      console.error("Failed to load data:", error);
      // Try localStorage fallback
      const storedUserData = localStorage.getItem('user_data');
      if (storedUserData) {
        setUser(JSON.parse(storedUserData));
      } else {
        router.push('/auth');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleAccountSave = async (data: Partial<UserProfile>) => {
    try {
      // Filter out null/undefined values and prepare data for API
      const updateData: Record<string, string> = {};
      if (data.username) updateData.username = data.username;
      if (data.full_name) updateData.full_name = data.full_name;
      if (data.company) updateData.company = data.company;
      if (data.job_title) updateData.job_title = data.job_title;
      if (data.department) updateData.department = data.department;
      
      const updatedUser = await updateUserProfile(updateData);
      
      // Update local storage
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast({
        title: "Account updated",
        description: "Your account information has been saved successfully.",
      });
    } catch (error) {
      console.error("Failed to update account:", error);
      toast({
        title: "Update failed",
        description: "Failed to save your account information. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handlePreferencesSave = (preferences: Record<string, unknown>) => {
    // Save AI preferences
    localStorage.setItem('ai_preferences', JSON.stringify(preferences));
    toast({
      title: "Preferences saved",
      description: "Your AI preferences have been updated.",
    });
  };

  const handleNotificationsSave = (notifications: Record<string, boolean>) => {
    // Save notification preferences
    localStorage.setItem('notification_preferences', JSON.stringify(notifications));
    toast({
      title: "Notifications updated",
      description: "Your notification preferences have been saved.",
    });
  };

  // Build billing data from real subscription info
  const currentPlan = {
    id: user?.subscription_tier || "basic",
    name: plans?.plans?.[user?.subscription_tier?.toLowerCase() as keyof typeof plans.plans]?.name || user?.subscription_tier || "Basic",
    price: plans?.plans?.[user?.subscription_tier?.toLowerCase() as keyof typeof plans.plans]?.price || 0,
    currency: plans?.plans?.[user?.subscription_tier?.toLowerCase() as keyof typeof plans.plans]?.currency || "GHS",
    searches: user?.monthly_search_limit || 1,
    description: subscription?.status === "active" ? "Active subscription" : "Free tier",
  };

  const searchesUsed = user?.monthly_searches_used || 0;

  // Usage history will come from real API when available
  const usageHistory: { date: string; searches: number; cost: string }[] = [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-umukozi-orange/10">
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
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-umukozi-orange/10">
      <Navbar />

      {/* Header */}
      <SettingsHeader onBack={() => router.back()} />

      {/* Tabs */}
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Account Tab */}
        {activeTab === "account" && (
          <AccountSettings user={user as any} onSave={handleAccountSave as any} />
        )}

        {/* Company Profile Tab */}
        {activeTab === "company" && (
          <CompanyProfile />
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

        {/* Help & Documentation Tab */}
        {activeTab === "help" && (
          <HelpDocumentation />
        )}
      </main>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-umukozi-orange/10">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-umukozi-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading settings...</p>
          </div>
        </div>
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
}