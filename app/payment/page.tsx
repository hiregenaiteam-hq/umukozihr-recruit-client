"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Check, CreditCard, Shield, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

const plans = [
  {
    name: "Startup",
    price: 299,
    searches: 5,
    features: [
      "20 AI-powered searches per month",
      "Basic candidate profiles",
      "Email support",
      "Search history",
    ],
    popular: false,
    description: "For early stage pre-revenue startups",
  },
  {
    name: "Scale",
    price: 399,
    searches: 10,
    features: [
      "50 AI-powered searches per month",
      "Full candidate profiles with AI insights",
      "Priority support",
      "Team collaboration",
      "Advanced filters",
      "Export capabilities",
    ],
    popular: true,
    description: "For SMEs & HR managers",
  },
  {
    name: "Enterprise",
    price: 2000,
    searches: "Unlimited",
    features: [
      "Unlimited AI-powered searches",
      "Custom AI training",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "Advanced analytics",
      "White-label options",
    ],
    popular: false,
    description: "For enterprises & HR firms",
  },
];

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const router = useRouter()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setPaymentComplete(true)

    // Redirect after success
    setTimeout(() => {
      router.push("/search")
    }, 2000)
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome to HireGen!</h1>
          <p className="text-slate-600 mb-6">
            Your payment was successful. You can now start finding exceptional candidates with AI.
          </p>
          <Button onClick={() => router.push("/search")} className="w-full bg-blue-500 hover:bg-blue-600">
            Start Hiring
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-slate-600">Start finding exceptional candidates with AI-powered precision</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Plan Selection */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8 justify-center">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative p-6 w-[275px] cursor-pointer transition-all duration-200 ${
                    selectedPlan === index
                      ? "border-2 border-blue-500 shadow-2xl scale-105 z-20 -mt-2"
                      : "border-2 border-slate-200 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedPlan(index)}
                >
                  {plan.popular && (
                    <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
                        Most popular for SMEs & Growth Startups
                      </span>
                    </div>
                  )}
                  {plan.name === "Enterprise Plan" && (
                    <div className="mb-3 flex justify-center">
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-4 py-2 rounded-full text-center leading-tight">
                        <div className="flex flex-col items-center justify-center">
                          <span>1-year commitment</span>
                          <span className="text-[11px] font-normal">($24,000 billed annually)</span>
                        </div>
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                      <span className="text-slate-600">/month</span>
                    </div>
                    <p className="text-slate-600">
                      {typeof plan.searches === "string" ? plan.searches : plan.searches} searches
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            {/* Value Proposition */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Why Choose HireGen?</h3>
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
                  <h4 className="font-medium text-slate-900 mb-1">98% Accuracy</h4>
                  <p className="text-sm text-slate-600">AI-scored candidates, not random resumes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium text-slate-900 mb-1">Cost Effective</h4>
                  <p className="text-sm text-slate-600">$500/month vs $50,000 agency fees</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2 lg:ml-12">
            <Card className="p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Complete Your Order</h2>

              {/* Order Summary */}
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{plans[selectedPlan].name} Plan</span>
                    {plans[selectedPlan].name === "Enterprise Plan" ? (
                      <span className="font-medium text-slate-900">$2,000.00/mo</span>
                    ) : (
                      <span className="font-medium text-slate-900">${plans[selectedPlan].price}.00</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax</span>
                    <span className="font-medium text-slate-900">$0.00</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-slate-900">Total</span>
                      {plans[selectedPlan].name === "Enterprise Plan" ? (
                        <span className="text-lg font-bold text-slate-900">$24,000.00 <span className='text-base font-normal'>(1 year)</span></span>
                      ) : (
                        <span className="text-lg font-bold text-slate-900">${plans[selectedPlan].price}.00</span>
                      )}
                    </div>
                    {plans[selectedPlan].name === "Enterprise Plan" && (
                      <div className="text-xs text-yellow-700 mt-1">Enterprise plan is billed annually. 1-year commitment required.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <Label htmlFor="cardNumber" className="text-base font-medium text-slate-900">
                    Card Number
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="h-12 rounded-xl pl-12"
                      required
                    />
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-base font-medium text-slate-900">
                      Expiry Date
                    </Label>
                    <Input id="expiry" placeholder="MM/YY" className="mt-2 h-12 rounded-xl" required />
                  </div>
                  <div>
                    <Label htmlFor="cvc" className="text-base font-medium text-slate-900">
                      CVC
                    </Label>
                    <Input id="cvc" placeholder="123" className="mt-2 h-12 rounded-xl" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="name" className="text-base font-medium text-slate-900">
                    Cardholder Name
                  </Label>
                  <Input id="name" placeholder="John Doe" className="mt-2 h-12 rounded-xl" required />
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                      Processing Payment...
                    </div>
                  ) : (
                    `Start ${plans[selectedPlan].name} Plan - $${plans[selectedPlan].price}/month`
                  )}
                </Button>

                {/* Security Notice */}
                <div className="flex items-center justify-center text-sm text-slate-500 mt-4">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
