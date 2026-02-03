"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  MessageSquare,
  Building2,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Sparkles,
  Star,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingWizardProps {
  onComplete: () => void;
  onSkip: () => void;
  userName?: string;
}

interface Step {
  id: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  content: React.ReactNode;
}

export default function OnboardingWizard({
  onComplete,
  onSkip,
  userName,
}: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const steps: Step[] = [
    {
      id: "welcome",
      badge: "Welcome",
      title: userName ? `Hey ${userName.split(" ")[0]}!` : "Welcome!",
      description: "Let's take a quick 30-second tour of UmukoziHR Recruit. You'll be finding great candidates in no time.",
      icon: Sparkles,
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      content: (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-2">
                <Search className="w-8 h-8 text-orange-600" />
              </div>
              <span className="text-xs text-slate-500 font-medium">Search</span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <span className="text-xs text-slate-500 font-medium">Review</span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-2">
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              <span className="text-xs text-slate-500 font-medium">Analyze</span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <span className="text-xs text-slate-500 font-medium">Hire</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "search",
      badge: "Step 1",
      title: "Describe Who You Need",
      description: "Just type what you're looking for. Our AI understands natural language and finds matching candidates globally.",
      icon: Search,
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      content: (
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
            <p className="text-slate-700 text-sm leading-relaxed">
              "I need a <span className="text-orange-600 font-medium">senior backend engineer</span> with <span className="text-orange-600 font-medium">Python and AWS</span> experience, preferably someone who has worked at a <span className="text-orange-600 font-medium">fintech startup</span>..."
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Python</span>
            <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">AWS</span>
            <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Backend</span>
            <span className="px-3 py-1.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">5+ years exp</span>
            <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">Fintech</span>
          </div>
        </div>
      ),
    },
    {
      id: "results",
      badge: "Step 2",
      title: "Review Ranked Candidates",
      description: "Get a ranked list of candidates with match scores. See why each person is a good fit at a glance.",
      icon: Users,
      iconBg: "bg-gradient-to-br from-teal-500 to-teal-600",
      content: (
        <div className="space-y-3">
          {[
            { name: "Kwame Asante", role: "Senior Backend Engineer", match: 95, skills: ["Python", "AWS", "FastAPI"] },
            { name: "Ama Mensah", role: "Software Engineer", match: 88, skills: ["Python", "Django", "PostgreSQL"] },
            { name: "Kofi Boateng", role: "Backend Developer", match: 82, skills: ["Python", "Docker", "Redis"] },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {c.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900 text-sm truncate">{c.name}</span>
                  <span className="text-orange-600 font-bold text-sm flex-shrink-0 ml-2">{c.match}%</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{c.role}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {c.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "chat",
      badge: "Step 3",
      title: "Ask Your AI Assistant",
      description: "Compare candidates, get interview questions, or analyze your hiring patterns. Just ask!",
      icon: MessageSquare,
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      content: (
        <div className="bg-slate-900 rounded-xl p-5">
          <div className="space-y-3">
            <div className="flex justify-end">
              <div className="bg-orange-500 text-white px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">
                <p className="text-sm">Compare Kwame and Ama for me</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-slate-800 text-white px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                <p className="text-sm leading-relaxed">Kwame has stronger AWS and infrastructure skills (5 yrs), while Ama excels in Django and web frameworks. For a backend-heavy role, I'd recommend Kwame.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-orange-500 text-white px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">
                <p className="text-sm">What should I ask Kwame in an interview?</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "company",
      badge: "Step 4",
      title: "Set Up Your Company",
      description: "Tell us about your company. This helps us predict how likely candidates are to join you.",
      icon: Building2,
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      content: (
        <div className="bg-gradient-to-br from-orange-50 to-teal-50 rounded-xl p-5 border border-orange-100">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Your Company</h4>
              <p className="text-sm text-slate-500">Complete your profile for better matches</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
              <p className="text-xs text-slate-500 mb-1">Stage</p>
              <p className="text-sm font-semibold text-slate-900">Series A</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
              <p className="text-xs text-slate-500 mb-1">Team</p>
              <p className="text-sm font-semibold text-slate-900">25 people</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
              <p className="text-xs text-slate-500 mb-1">Remote</p>
              <p className="text-sm font-semibold text-slate-900">Hybrid</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-slate-700">Attractiveness Score</span>
              </div>
              <span className="text-xl font-bold text-orange-600">72/100</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-500 to-teal-500 h-2 rounded-full" style={{ width: '72%' }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">Higher score = candidates more likely to join</p>
          </div>
        </div>
      ),
    },
    {
      id: "ready",
      badge: "All Done!",
      title: "You're Ready to Go",
      description: "Start your first search and find great candidates. You can always revisit settings later.",
      icon: Rocket,
      iconBg: "bg-gradient-to-br from-green-500 to-green-600",
      content: (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <p className="text-slate-600 text-center max-w-sm">
            Click <span className="font-semibold text-orange-600">"Start Searching"</span> to find your first candidates!
          </p>
        </div>
      ),
    },
  ];

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Skip onboarding"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-teal-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${step.iconBg} rounded-xl mb-3`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <span className="block text-xs font-medium text-orange-600 uppercase tracking-wide mb-1">
                  {step.badge}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Step Content */}
              <div className="mb-6">{step.content}</div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={isFirstStep}
              className={isFirstStep ? "opacity-0 pointer-events-none" : ""}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentStep ? 1 : -1);
                    setCurrentStep(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentStep
                      ? "w-6 bg-orange-500"
                      : i < currentStep
                      ? "bg-orange-300"
                      : "bg-slate-200"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            <Button onClick={nextStep} className="bg-orange-500 hover:bg-orange-600">
              {isLastStep ? (
                <>
                  Start Searching
                  <Rocket className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
