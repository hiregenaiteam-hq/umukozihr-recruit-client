"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Search,
  Users,
  MessageSquare,
  CreditCard,
  Settings,
  Shield,
  Zap,
  ChevronDown,
  ChevronRight,
  Play,
  BookOpen,
  HelpCircle,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  Database,
  Globe,
  FileText,
  RefreshCw,
} from "lucide-react";

// Import onboarding hook - wrapped in try/catch for safety
let useOnboarding: (() => { triggerOnboarding: () => void }) | null = null;
try {
  useOnboarding = require("@/components/OnboardingProvider").useOnboarding;
} catch (e) {
  // Onboarding provider not available
}

interface DocSection {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  subsections: {
    title: string;
    content: string[];
    tips?: string[];
    warning?: string;
  }[];
}

const documentationSections: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Play,
    description: "Everything you need to know to start finding talent",
    subsections: [
      {
        title: "Welcome to UmukoziHR Recruit",
        content: [
          "UmukoziHR Recruit is an AI-powered talent sourcing platform that helps you find the perfect candidates for your organization.",
          "Our platform uses advanced AI to search through millions of professional profiles, matching candidates based on skills, experience, location, and more.",
          "Whether you're hiring for one position or building an entire team, we've got you covered.",
        ],
      },
      {
        title: "Your Dashboard Overview",
        content: [
          "After logging in, you'll land on your profile dashboard where you can see:",
          "• Your recent searches and saved candidates",
          "• Quick access to start a new talent search",
          "• Your subscription status and remaining searches",
          "• The AI assistant chat for help and insights",
        ],
      },
      {
        title: "First Steps",
        content: [
          "1. Complete your profile settings with company information",
          "2. Set your AI preferences for search behavior",
          "3. Start your first talent search",
          "4. Review and save candidates you're interested in",
          "5. Use the chat assistant for deeper candidate analysis",
        ],
        tips: [
          "Pro tip: Complete your company profile to get better AI recommendations tailored to your industry.",
        ],
      },
    ],
  },
  {
    id: "talent-search",
    title: "Talent Search",
    icon: Search,
    description: "How to find the perfect candidates",
    subsections: [
      {
        title: "Starting a New Search",
        content: [
          "Navigate to the Search page from the main navigation or click 'Search' from your dashboard.",
          "The search process is organized into 4 simple steps:",
          "Step 1: Job Position - Enter the role you're hiring for and required skills",
          "Step 2: Requirements - Set experience level and education requirements",
          "Step 3: Location & Industry - Specify where you need talent and your business sector",
          "Step 4: Review & Search - Confirm your criteria and choose search mode",
        ],
      },
      {
        title: "Understanding Search Modes",
        content: [
          "We offer three search modes to suit different needs:",
          "",
          "🗄️ DATABASE MODE (Fastest)",
          "Searches our pre-indexed talent database. Best for quick searches when speed matters. Typical time: 30-60 seconds.",
          "",
          "🌐 LIVE MODE (Most Comprehensive)",
          "Real-time web scraping across LinkedIn, job boards, and professional networks. Finds the freshest talent. Typical time: 1-2 minutes.",
          "",
          "⚡ HYBRID MODE (Recommended)",
          "Combines both database and live search for comprehensive results. Best balance of speed and coverage. Typical time: 1-2 minutes.",
        ],
        tips: [
          "Use Hybrid mode for important searches - you get the best of both worlds.",
          "Database mode is great for quick preliminary searches.",
        ],
      },
      {
        title: "Search Tips for Better Results",
        content: [
          "• Be specific with job titles - 'Senior Software Engineer' works better than just 'Engineer'",
          "• Add 3-5 relevant skills for accurate matching",
          "• Use location wisely - country-level searches find more candidates",
          "• Set realistic experience ranges - too narrow limits results",
          "• Add industry context for better relevance scoring",
        ],
        warning:
          "Very narrow criteria may return few or no results. Start broad and refine if needed.",
      },
      {
        title: "Understanding Match Scores",
        content: [
          "Each candidate receives a match score from 0-100% based on:",
          "• Skills match - How many of your required skills they have",
          "• Experience match - Whether their years of experience fit your range",
          "• Location match - Proximity to your desired location",
          "• Industry relevance - Experience in your business sector",
          "",
          "90-100%: Excellent match - highly qualified",
          "70-89%: Good match - worth reviewing",
          "50-69%: Partial match - may have potential",
          "Below 50%: Limited match - consider refining search",
        ],
      },
    ],
  },
  {
    id: "viewing-candidates",
    title: "Viewing & Managing Candidates",
    icon: Users,
    description: "How to review and organize your candidates",
    subsections: [
      {
        title: "Results Page Overview",
        content: [
          "After a search completes, you'll see your results organized by match score.",
          "Each candidate card shows:",
          "• Profile photo and name",
          "• Current position and company",
          "• Match score with breakdown",
          "• Key skills that matched your criteria",
          "• Location and experience summary",
        ],
      },
      {
        title: "Candidate Profile Deep Dive",
        content: [
          "Click on any candidate to view their full profile:",
          "• Complete work history with dates",
          "• Education and certifications",
          "• Detailed skills breakdown",
          "• Why they matched your criteria",
          "• AI-generated insights about their fit",
          "",
          "Use the profile page to schedule interviews or add notes.",
        ],
      },
      {
        title: "Saving and Organizing Candidates",
        content: [
          "• Click the heart icon to save candidates to your shortlist",
          "• Saved candidates appear in your profile dashboard",
          "• You can compare multiple candidates side-by-side",
          "• Export candidate lists for your ATS or hiring team",
        ],
        tips: [
          "Save candidates early - search results may change over time as new talent is discovered.",
        ],
      },
    ],
  },
  {
    id: "ai-assistant",
    title: "AI Chat Assistant",
    icon: MessageSquare,
    description: "Your intelligent recruiting partner",
    subsections: [
      {
        title: "What the AI Assistant Can Do",
        content: [
          "The AI chat assistant (found in the bottom-right corner) can help you:",
          "• Analyze candidates in depth",
          "• Compare multiple candidates",
          "• Get insights on market trends",
          "• Suggest interview questions",
          "• Explain candidate qualifications",
          "• Recommend search refinements",
        ],
      },
      {
        title: "Example Questions to Ask",
        content: [
          '"Compare these two candidates for the Senior Developer role"',
          '"What interview questions should I ask this candidate?"',
          '"Analyze this candidate\'s career progression"',
          '"What skills is this candidate missing for our requirements?"',
          '"Suggest similar candidates to this one"',
          '"Summarize my search results"',
        ],
      },
      {
        title: "Getting the Best Responses",
        content: [
          "• Be specific in your questions",
          "• Provide context when asking about candidates",
          "• Ask follow-up questions to dive deeper",
          "• Use the assistant while viewing a candidate profile for contextual help",
        ],
        tips: [
          "The AI remembers your conversation, so you can have a natural back-and-forth dialogue.",
        ],
      },
    ],
  },
  {
    id: "subscriptions",
    title: "Plans & Billing",
    icon: CreditCard,
    description: "Understanding your subscription and searches",
    subsections: [
      {
        title: "Subscription Tiers",
        content: [
          "BASIC (Free)",
          "• 1 search per month",
          "• Database search only",
          "• Standard support",
          "• Perfect for trying out the platform",
          "",
          "PRO (GHS 3,215/month)",
          "• 20 searches per month",
          "• All search modes (Database, Live, Hybrid)",
          "• Priority support",
          "• Advanced filtering",
          "• Recommended for growing teams",
          "",
          "BUSINESS (GHS 4,291/month)",
          "• 30 searches per month",
          "• All search modes",
          "• Priority support with dedicated manager",
          "• Advanced analytics",
          "• Team collaboration features",
          "• Best for high-volume hiring",
        ],
      },
      {
        title: "How Searches Are Counted",
        content: [
          "• Each new search query counts as one search",
          "• Viewing results from the same search doesn't use additional searches",
          "• Refining an existing search uses a new search credit",
          "• Searches reset at the start of each billing month",
        ],
      },
      {
        title: "Upgrading Your Plan",
        content: [
          "1. Go to Settings → Billing",
          "2. Click 'Upgrade Plan'",
          "3. Select your desired plan",
          "4. Complete payment via Paystack",
          "5. Your new limits are active immediately",
        ],
        tips: [
          "Upgrades take effect immediately. You'll get the full month's searches even if you upgrade mid-month.",
        ],
      },
    ],
  },
  {
    id: "account-settings",
    title: "Account & Settings",
    icon: Settings,
    description: "Managing your account and preferences",
    subsections: [
      {
        title: "Account Information",
        content: [
          "In Settings → Account, you can update:",
          "• Your name and display information",
          "• Company name and job title",
          "• Department (helps with AI recommendations)",
          "• Contact information",
        ],
      },
      {
        title: "AI Preferences",
        content: [
          "Customize how the AI works for you:",
          "• Search result quantity vs quality balance",
          "• Preferred communication style",
          "• Industry focus areas",
          "• Default search parameters",
        ],
      },
      {
        title: "Notifications",
        content: [
          "Control what notifications you receive:",
          "• New candidate alerts for saved searches",
          "• Weekly talent insights",
          "• Product updates and new features",
          "• Billing and subscription reminders",
        ],
      },
      {
        title: "Security",
        content: [
          "Keep your account secure:",
          "• Change your password regularly",
          "• Enable two-factor authentication (coming soon)",
          "• Review active sessions",
          "• Manage API access (for integrations)",
        ],
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: HelpCircle,
    description: "Common issues and solutions",
    subsections: [
      {
        title: "Search Returns No Results",
        content: [
          "If your search returns no or few results:",
          "1. Broaden your location (country instead of city)",
          "2. Reduce required skills to 3-5 core ones",
          "3. Widen experience range",
          "4. Try Hybrid or Live search mode",
          "5. Remove very specific or niche job titles",
        ],
      },
      {
        title: "Search Taking Too Long",
        content: [
          "Live and Hybrid searches can take 1-2 minutes. If longer:",
          "• Try Database mode for faster results",
          "• Be more specific with criteria",
          "• Check your internet connection",
          "• Refresh the page and try again",
        ],
      },
      {
        title: "Login Issues",
        content: [
          "If you can't log in:",
          "• Verify your email address is correct",
          "• Use 'Forgot Password' to reset",
          "• Clear browser cache and cookies",
          "• Try a different browser",
          "• Contact support if issues persist",
        ],
      },
      {
        title: "Payment Problems",
        content: [
          "If payment fails:",
          "• Verify your card details",
          "• Ensure sufficient funds",
          "• Try a different payment method",
          "• Check for bank SMS verification",
          "• Contact your bank if blocked",
          "• Reach out to our support team",
        ],
      },
      {
        title: "Contact Support",
        content: [
          "Need more help? Reach us at:",
          "• Email: support@umukozi.com",
          "• In-app chat assistant",
          "• Response time: Within 24 hours (business days)",
        ],
      },
    ],
  },
];

const quickGuides = [
  {
    title: "Run Your First Search",
    steps: ["Go to Search page", "Enter job title & skills", "Set location", "Choose Hybrid mode", "Click Search"],
    icon: Search,
    time: "2 min",
  },
  {
    title: "Save a Candidate",
    steps: ["View search results", "Click on candidate card", "Click the heart icon", "Find them in your dashboard"],
    icon: Users,
    time: "30 sec",
  },
  {
    title: "Upgrade Your Plan",
    steps: ["Go to Settings", "Click Billing tab", "Select new plan", "Complete payment"],
    icon: CreditCard,
    time: "2 min",
  },
  {
    title: "Ask AI for Help",
    steps: ["Click chat bubble (bottom-right)", "Type your question", "Get instant insights"],
    icon: MessageSquare,
    time: "1 min",
  },
];

export default function HelpDocumentation() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["getting-started"]);
  const [expandedSubsections, setExpandedSubsections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Get onboarding trigger if available
  let triggerOnboarding: (() => void) | null = null;
  try {
    if (useOnboarding) {
      const onboarding = useOnboarding();
      triggerOnboarding = onboarding.triggerOnboarding;
    }
  } catch (e) {
    // Not in provider context
  }

  const handleReplayTutorial = () => {
    if (triggerOnboarding) {
      triggerOnboarding();
    } else {
      // Fallback: clear the onboarding flag and reload
      localStorage.removeItem("umukozi_onboarding_complete");
      window.location.reload();
    }
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSubsection = (id: string) => {
    setExpandedSubsections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const filteredSections = documentationSections.filter((section) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.subsections.some(
        (sub) =>
          sub.title.toLowerCase().includes(query) ||
          sub.content.some((c) => c.toLowerCase().includes(query))
      )
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-umukozi-orange/10 rounded-2xl mb-4">
          <BookOpen className="w-8 h-8 text-umukozi-orange" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Help & Documentation
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Everything you need to know about using UmukoziHR Recruit effectively.
          Find guides, tips, and answers to common questions.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-umukozi-orange focus:border-umukozi-orange transition-all"
          />
        </div>
      </div>

      {/* Quick Start Guides */}
      <Card className="p-6 bg-linear-to-br from-umukozi-orange/5 to-umukozi-teal/5 border-umukozi-orange/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-umukozi-orange" />
            Quick Start Guides
          </h3>
          <button
            onClick={handleReplayTutorial}
            className="flex items-center gap-2 px-4 py-2 bg-umukozi-orange/10 hover:bg-umukozi-orange/20 text-umukozi-orange rounded-lg transition-colors text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Replay Tutorial
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickGuides.map((guide, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-slate-200 hover:border-umukozi-orange/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-umukozi-orange/10 rounded-lg flex items-center justify-center">
                  <guide.icon className="w-5 h-5 text-umukozi-orange" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 text-sm">{guide.title}</h4>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {guide.time}
                  </span>
                </div>
              </div>
              <ol className="space-y-1">
                {guide.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="w-4 h-4 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-medium text-slate-500 shrink-0 mt-0.5">
                      {stepIndex + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Card>

      {/* Documentation Sections */}
      <div className="space-y-4">
        {filteredSections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-umukozi-orange/10 rounded-xl flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-umukozi-orange" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                  <p className="text-sm text-slate-600">{section.description}</p>
                </div>
              </div>
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {/* Section Content */}
            {expandedSections.includes(section.id) && (
              <div className="px-6 pb-6 space-y-4 border-t border-slate-100 pt-4">
                {section.subsections.map((subsection, subIndex) => {
                  const subId = `${section.id}-${subIndex}`;
                  const isExpanded = expandedSubsections.includes(subId);

                  return (
                    <div
                      key={subIndex}
                      className="border border-slate-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSubsection(subId)}
                        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-medium text-slate-800">{subsection.title}</span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-0 space-y-4">
                          {/* Content */}
                          <div className="space-y-2">
                            {subsection.content.map((paragraph, pIndex) => (
                              <p
                                key={pIndex}
                                className={`text-sm text-slate-600 ${
                                  paragraph === "" ? "h-2" : ""
                                }`}
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>

                          {/* Tips */}
                          {subsection.tips && subsection.tips.length > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                <div className="space-y-1">
                                  {subsection.tips.map((tip, tipIndex) => (
                                    <p key={tipIndex} className="text-sm text-blue-800">
                                      {tip}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Warning */}
                          {subsection.warning && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                                <p className="text-sm text-amber-800">{subsection.warning}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Still Need Help */}
      <Card className="p-6 bg-slate-900 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-umukozi-orange rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Still need help?</h3>
              <p className="text-slate-300">Our support team is here for you</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
              Email Support
            </button>
            <button className="px-4 py-2 bg-umukozi-orange hover:bg-umukozi-orange-dark rounded-lg text-sm font-medium transition-colors">
              Chat with AI Assistant
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
