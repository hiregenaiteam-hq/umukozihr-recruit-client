"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  MessageSquare,
  CreditCard,
  Settings,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle,
  Sparkles,
  Target,
  Zap,
  Database,
  Globe,
  Brain,
  Play,
  ChevronRight,
} from "lucide-react";

interface OnboardingWizardProps {
  onComplete: () => void;
  onSkip: () => void;
  userName?: string;
}

interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  illustration: React.ReactNode;
  features?: { icon: React.ElementType; title: string; description: string }[];
  tip?: string;
}

const steps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to UmukoziHR Recruit",
    subtitle: "AI-Powered Talent Sourcing",
    description:
      "Find the perfect candidates for your team using our advanced AI-powered search technology. Let's take a quick tour of the platform.",
    icon: Sparkles,
    illustration: (
      <div className="relative w-full h-64 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-umukozi-orange/20 to-umukozi-teal/20 rounded-3xl"></div>
        <div className="relative flex items-center gap-8">
          <div className="w-20 h-20 bg-umukozi-orange rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
            <Search className="w-10 h-10 text-white" />
          </div>
          <ArrowRight className="w-8 h-8 text-slate-400" />
          <div className="w-20 h-20 bg-umukozi-teal rounded-2xl flex items-center justify-center shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "search",
    title: "Find Talent with Ease",
    subtitle: "Step 1: Talent Search",
    description:
      "Describe the role you're hiring for, and our AI will find matching candidates from millions of professional profiles.",
    icon: Search,
    illustration: (
      <div className="relative w-full h-64 bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-umukozi-orange/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-umukozi-orange" />
            </div>
            <div className="flex-1 h-8 bg-slate-100 rounded-lg animate-pulse"></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Python", "React", "AWS"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-umukozi-orange/10 text-umukozi-orange text-sm rounded-full text-center"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-slate-50 rounded-lg border border-slate-200 flex items-center px-3">
              <span className="text-sm text-slate-500">📍 Accra, Ghana</span>
            </div>
            <div className="flex-1 h-10 bg-slate-50 rounded-lg border border-slate-200 flex items-center px-3">
              <span className="text-sm text-slate-500">3-5 years exp</span>
            </div>
          </div>
        </div>
      </div>
    ),
    features: [
      {
        icon: Database,
        title: "Database Search",
        description: "Quick search from our talent pool",
      },
      {
        icon: Globe,
        title: "Live Search",
        description: "Real-time web scraping",
      },
      {
        icon: Zap,
        title: "Hybrid Mode",
        description: "Best of both worlds",
      },
    ],
  },
  {
    id: "results",
    title: "Review Your Matches",
    subtitle: "Step 2: Candidate Results",
    description:
      "Get a ranked list of candidates with match scores. Each profile shows skills, experience, and why they're a good fit.",
    icon: Users,
    illustration: (
      <div className="relative w-full h-64 bg-white rounded-2xl border border-slate-200 p-4 shadow-lg overflow-hidden">
        <div className="space-y-3">
          {[
            { name: "Kwame A.", score: 95, skills: ["Python", "ML"] },
            { name: "Ama K.", score: 88, skills: ["React", "Node"] },
            { name: "Kofi B.", score: 82, skills: ["AWS", "Docker"] },
          ].map((candidate, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-umukozi-orange to-umukozi-teal rounded-full flex items-center justify-center text-white font-medium">
                {candidate.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">{candidate.name}</span>
                  <span className="text-sm font-semibold text-umukozi-orange">
                    {candidate.score}% match
                  </span>
                </div>
                <div className="flex gap-1 mt-1">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-umukozi-orange/10 text-umukozi-orange text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    tip: "Click on any candidate to see their full profile and detailed match breakdown.",
  },
  {
    id: "chat",
    title: "Your AI Assistant",
    subtitle: "Step 3: Get Intelligent Help",
    description:
      "Ask questions, compare candidates, get interview suggestions, and analyze search patterns. The AI assistant is always ready to help.",
    icon: MessageSquare,
    illustration: (
      <div className="relative w-full h-64 bg-slate-900 rounded-2xl p-4 shadow-lg">
        <div className="space-y-3">
          <div className="flex justify-end">
            <div className="bg-umukozi-orange text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[200px]">
              <span className="text-sm">Compare these two candidates for me</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-100 px-4 py-2 rounded-2xl rounded-bl-md max-w-[250px]">
              <span className="text-sm">
                Based on your requirements, Kwame has stronger backend skills while Ama
                excels in frontend...
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-umukozi-orange text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[200px]">
              <span className="text-sm">What questions should I ask Kwame?</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2">
            <span className="text-slate-400 text-sm flex-1">Ask anything...</span>
            <Brain className="w-5 h-5 text-umukozi-orange" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "subscription",
    title: "Choose Your Plan",
    subtitle: "Step 4: Flexible Pricing",
    description:
      "Start free with 1 search per month, or upgrade to Pro or Business for more searches and features.",
    icon: CreditCard,
    illustration: (
      <div className="relative w-full h-64 flex items-center justify-center gap-4">
        {[
          { name: "Basic", price: "Free", searches: "1/mo", popular: false },
          { name: "Pro", price: "GHS 3,215", searches: "20/mo", popular: true },
          { name: "Business", price: "GHS 4,291", searches: "30/mo", popular: false },
        ].map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-xl p-4 border-2 shadow-lg ${
              plan.popular ? "border-umukozi-orange scale-110" : "border-slate-200"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-umukozi-orange text-white text-xs rounded-full">
                Popular
              </span>
            )}
            <div className="text-center">
              <h4 className="font-semibold text-slate-900">{plan.name}</h4>
              <p className="text-lg font-bold text-umukozi-orange mt-1">{plan.price}</p>
              <p className="text-xs text-slate-500 mt-1">{plan.searches} searches</p>
            </div>
          </div>
        ))}
      </div>
    ),
    tip: "You can always upgrade or downgrade your plan from Settings → Billing.",
  },
  {
    id: "ready",
    title: "You're All Set!",
    subtitle: "Let's Start Finding Talent",
    description:
      "You now know the basics of UmukoziHR Recruit. Ready to find your next great hire?",
    icon: CheckCircle,
    illustration: (
      <div className="relative w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-umukozi-orange/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Search className="w-6 h-6 text-umukozi-orange" />
              </div>
              <span className="text-xs text-slate-600">Search</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
            <div className="text-center">
              <div className="w-12 h-12 bg-umukozi-orange/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-umukozi-orange" />
              </div>
              <span className="text-xs text-slate-600">Review</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
            <div className="text-center">
              <div className="w-12 h-12 bg-umukozi-orange/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-6 h-6 text-umukozi-orange" />
              </div>
              <span className="text-xs text-slate-600">Analyze</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-slate-600">Hire</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function OnboardingWizard({
  onComplete,
  onSkip,
  userName,
}: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const nextStep = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">
        {/* Skip Button */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
          <div
            className="h-full bg-umukozi-orange transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 pt-8 pb-4">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentStep ? 1 : -1);
                setCurrentStep(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep
                  ? "w-6 bg-umukozi-orange"
                  : index < currentStep
                  ? "bg-umukozi-orange/50"
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-8 pb-8 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Step Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-umukozi-orange/10 rounded-2xl mb-4">
                  <step.icon className="w-7 h-7 text-umukozi-orange" />
                </div>
                <p className="text-sm text-umukozi-orange font-medium mb-1">{step.subtitle}</p>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {currentStep === 0 && userName ? `${step.title}, ${userName}!` : step.title}
                </h2>
                <p className="text-slate-600 max-w-lg mx-auto">{step.description}</p>
              </div>

              {/* Illustration */}
              <div className="mb-6">{step.illustration}</div>

              {/* Features Grid */}
              {step.features && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {step.features.map((feature, index) => (
                    <div key={index} className="text-center p-3 bg-slate-50 rounded-xl">
                      <feature.icon className="w-5 h-5 text-umukozi-orange mx-auto mb-2" />
                      <h4 className="text-sm font-medium text-slate-900">{feature.title}</h4>
                      <p className="text-xs text-slate-500">{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tip */}
              {step.tip && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6">
                  <p className="text-sm text-blue-800 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" />
                    {step.tip}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={prevStep}
              disabled={isFirstStep}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isFirstStep
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <span className="text-sm text-slate-400">
              {currentStep + 1} of {steps.length}
            </span>

            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2 bg-umukozi-orange text-white rounded-lg hover:bg-umukozi-orange-dark transition-colors"
            >
              {isLastStep ? (
                <>
                  <Play className="w-4 h-4" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
