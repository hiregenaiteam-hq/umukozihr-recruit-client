"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, User, Bell, CreditCard, Zap, Upload } from "lucide-react"
import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    newCandidates: true,
    searchComplete: true,
    weeklyDigest: false,
    productUpdates: true,
  })

  // Pricing tiers
  const plans = [
    {
      id: "startup",
      name: "Startup Plan",
      price: 299,
      searches: 20,
      description: "For early stage pre-revenue startups",
    },
    {
      id: "professional",
      name: "Professional Plan",
      price: 399,
      searches: 50,
      description: "For SMEs & HR managers",
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 2000,
      searches: "Unlimited",
      description: "For enterprises & HR firms",
    },
  ];

  // Simulate current plan (change index to test different plans)
  const currentPlanIndex = 1; // 0: Startup, 1: Professional, 2: Enterprise
  const currentPlan = plans[currentPlanIndex];
  const searchesUsed = 23; // Simulated usage

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">Manage your account and AI preferences</p>
        </div>

        <Tabs defaultValue="account" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200">
            <TabsTrigger value="account" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              AI Preferences
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Information</h2>

              <div className="space-y-6">
                {/* Profile Photo */}
                <div>
                  <Label className="text-base font-medium text-slate-900 mb-3 block">Profile Photo</Label>
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="flex items-center bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Photo
                    </Button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-base font-medium text-slate-900">
                      First Name
                    </Label>
                    <Input id="firstName" defaultValue="John" className="mt-2 h-12 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-base font-medium text-slate-900">
                      Last Name
                    </Label>
                    <Input id="lastName" defaultValue="Doe" className="mt-2 h-12 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base font-medium text-slate-900">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@company.com"
                      className="mt-2 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-base font-medium text-slate-900">
                      Company
                    </Label>
                    <Input id="company" defaultValue="TechCorp Inc." className="mt-2 h-12 rounded-xl" />
                  </div>
                </div>

                <Button className="bg-blue-500 hover:bg-blue-600">Save Changes</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">AI Search Preferences</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Search Behavior</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Aggressive Sourcing</p>
                        <p className="text-sm text-slate-600">
                          Include passive candidates who may not be actively looking
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Diversity Priority</p>
                        <p className="text-sm text-slate-600">Emphasize diverse candidate pools in search results</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Remote-First</p>
                        <p className="text-sm text-slate-600">Prioritize remote-friendly candidates</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Experience Weighting</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Prefer Senior Candidates</p>
                        <p className="text-sm text-slate-600">Weight experience more heavily in scoring</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Include Junior Talent</p>
                        <p className="text-sm text-slate-600">Show promising junior candidates with growth potential</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Notification Preferences</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">New Candidate Matches</p>
                    <p className="text-sm text-slate-600">
                      Get notified when AI finds new candidates matching your searches
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newCandidates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newCandidates: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Search Completion</p>
                    <p className="text-sm text-slate-600">Receive alerts when your AI searches are complete</p>
                  </div>
                  <Switch
                    checked={notifications.searchComplete}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, searchComplete: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Weekly Digest</p>
                    <p className="text-sm text-slate-600">Summary of your hiring activity and new opportunities</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyDigest: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Product Updates</p>
                    <p className="text-sm text-slate-600">Learn about new features and improvements</p>
                  </div>
                  <Switch
                    checked={notifications.productUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, productUpdates: checked }))}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <div className="space-y-6">
              {/* Current Plan */}
              <Card className="p-8 border-2 border-blue-500">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{currentPlan.name}</h2>
                    <p className="text-slate-600">{currentPlan.searches} searches per month</p>
                    <p className="text-xs text-slate-400 mt-1">{currentPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-slate-900">${currentPlan.price.toLocaleString()}</p>
                    <p className="text-slate-600">per month</p>
                  </div>
                </div>

                {typeof currentPlan.searches === "number" && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Searches Used</span>
                        <span>{searchesUsed} / {currentPlan.searches}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(searchesUsed / currentPlan.searches) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                )}

                <Link href="/payment" passHref legacyBehavior>
                  <a tabIndex={0} className="w-full block">
                    <Button variant="outline" className="w-full bg-transparent">
                      Upgrade Plan
                    </Button>
                  </a>
                </Link>
              </Card>

              {/* Payment Method */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h2>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center mr-4">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-slate-600">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </Card>

              {/* Usage History */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Usage</h2>

                <div className="space-y-4">
                  {[
                    { date: "Jan 15, 2024", searches: 8, cost: "$16.00" },
                    { date: "Jan 14, 2024", searches: 3, cost: "$6.00" },
                    { date: "Jan 13, 2024", searches: 12, cost: "$24.00" },
                  ].map((usage, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{usage.date}</p>
                        <p className="text-sm text-slate-600">{usage.searches} searches</p>
                      </div>
                      <p className="font-medium text-slate-900">{usage.cost}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
