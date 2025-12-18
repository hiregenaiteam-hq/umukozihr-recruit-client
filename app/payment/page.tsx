"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Shield, Zap, Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { 
  getSubscriptionPlans, 
  initiatePaystackSubscription,
  getCurrentUser,
  type SubscriptionPlan,
  type UserProfile 
} from "@/lib/api"

type TierKey = "basic" | "pro" | "business";

type PlanDisplay = {
  key: TierKey;
  name: string;
  price: number;
  currency: string;
  monthly_searches: number;
  features: string[];
  popular: boolean;
  description: string;
};

// Currency conversion helper (GHS to USD approximate)
const GHS_TO_USD = 0.083; // ~12 GHS = 1 USD

function formatPrice(price: number, currency: string): string {
  if (currency === "GHS") {
    return `₵${price.toLocaleString()}`;
  }
  return `$${price.toLocaleString()}`;
}

export default function PaymentPage() {
  const [plans, setPlans] = useState<PlanDisplay[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setIsLoading(true);
      setError(null);

      // Load plans and user data in parallel
      const [plansResponse, userData] = await Promise.all([
        getSubscriptionPlans(),
        getCurrentUser().catch(() => null), // User may not be logged in
      ]);

      setUser(userData);

      // Transform backend plans to display format
      const planList: PlanDisplay[] = [
        {
          key: "basic",
          name: plansResponse.plans.basic.name,
          price: plansResponse.plans.basic.price,
          currency: plansResponse.plans.basic.currency,
          monthly_searches: plansResponse.plans.basic.monthly_searches,
          features: plansResponse.plans.basic.features,
          popular: false,
          description: "Try before you commit",
        },
        {
          key: "pro",
          name: plansResponse.plans.pro.name,
          price: plansResponse.plans.pro.price,
          currency: plansResponse.plans.pro.currency,
          monthly_searches: plansResponse.plans.pro.monthly_searches,
          features: plansResponse.plans.pro.features,
          popular: true,
          description: "For growing teams",
        },
        {
          key: "business",
          name: plansResponse.plans.business.name,
          price: plansResponse.plans.business.price,
          currency: plansResponse.plans.business.currency,
          monthly_searches: plansResponse.plans.business.monthly_searches,
          features: plansResponse.plans.business.features,
          popular: false,
          description: "For enterprises & HR firms",
        },
      ];

      setPlans(planList);

      // Pre-select Pro by default, or current tier if user has one
      if (userData?.subscription_tier) {
        const currentTierIndex = planList.findIndex(
          (p) => p.key === userData.subscription_tier.toLowerCase()
        );
        if (currentTierIndex >= 0) {
          // Select next tier up if possible
          setSelectedPlan(Math.min(currentTierIndex + 1, planList.length - 1));
        }
      }
    } catch (err) {
      console.error("Failed to load plans:", err);
      setError("Failed to load subscription plans. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubscribe() {
    const plan = plans[selectedPlan];
    if (!plan) return;

    // Basic tier is free - no payment needed
    if (plan.key === "basic") {
      router.push("/search");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      // Call backend to initiate Paystack subscription
      const response = await initiatePaystackSubscription(plan.key as "pro" | "business");

      // Redirect to Paystack checkout
      if (response.authorization_url) {
        window.location.href = response.authorization_url;
      } else {
        throw new Error("No authorization URL received");
      }
    } catch (err: any) {
      console.error("Subscription initiation failed:", err);
      setError(
        err?.message || "Failed to initiate payment. Please try again."
      );
      setIsProcessing(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-600">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error && plans.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <Card className="max-w-md w-full p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-900 mb-2">Unable to Load Plans</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Button onClick={loadData} className="bg-blue-500 hover:bg-blue-600">
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/30">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-slate-600">
            Start finding exceptional candidates with AI-powered precision
          </p>
          {user && (
            <p className="text-sm text-slate-500 mt-2">
              Current plan: <span className="font-semibold capitalize">{user.subscription_tier}</span>
              {" "}&bull;{" "}
              {user.monthly_searches_used} / {user.monthly_search_limit} searches used
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={plan.key}
              className={`relative p-6 cursor-pointer transition-all duration-200 ${
                selectedPlan === index
                  ? "border-2 border-blue-500 shadow-xl scale-105 z-10"
                  : "border-2 border-slate-200 hover:border-blue-300"
              } ${
                user?.subscription_tier?.toLowerCase() === plan.key
                  ? "bg-blue-50/50"
                  : ""
              }`}
              onClick={() => setSelectedPlan(index)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {user?.subscription_tier?.toLowerCase() === plan.key && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-6 pt-2">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-bold text-slate-900">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-slate-900">
                        {formatPrice(plan.price, plan.currency)}
                      </span>
                      <span className="text-slate-600">/month</span>
                    </>
                  )}
                </div>
                <p className="text-slate-600">
                  {plan.monthly_searches} searches/month
                </p>
                <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Subscribe Button */}
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleSubscribe}
            disabled={isProcessing || (user?.subscription_tier?.toLowerCase() === plans[selectedPlan]?.key)}
            className="w-full h-14 bg-linear-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <Loader2 className="w-5 h-5 animate-spin mr-3" />
                Redirecting to Payment...
              </div>
            ) : plans[selectedPlan]?.price === 0 ? (
              "Continue with Free Plan"
            ) : user?.subscription_tier?.toLowerCase() === plans[selectedPlan]?.key ? (
              "This is your current plan"
            ) : (
              `Subscribe to ${plans[selectedPlan]?.name} - ${formatPrice(plans[selectedPlan]?.price || 0, plans[selectedPlan]?.currency || "GHS")}/month`
            )}
          </Button>

          {/* Security Notice */}
          <div className="flex items-center justify-center text-sm text-slate-500 mt-4">
            <Shield className="w-4 h-4 mr-2" />
            <span>Secured by Paystack - 256-bit SSL encryption</span>
          </div>
        </div>

        {/* Value Proposition */}
        <Card className="p-6 bg-blue-50 border-blue-200 mt-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Why Choose UmukoziHR Recruit?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-slate-900 mb-1">10x Faster</h4>
              <p className="text-sm text-slate-600">Minutes vs weeks of traditional sourcing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-slate-900 mb-1">AI-Powered Matching</h4>
              <p className="text-sm text-slate-600">Smart candidate scoring and ranking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-slate-900 mb-1">Cost Effective</h4>
              <p className="text-sm text-slate-600">Fraction of traditional agency costs</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
