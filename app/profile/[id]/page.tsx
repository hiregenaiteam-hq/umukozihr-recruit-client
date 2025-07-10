"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sparkles, MapPin, Building, MessageCircle, Bookmark, Share, Github, Linkedin, Mail, Paperclip, Send, Calendar as CalendarIcon, Phone, Video, VideoIcon } from "lucide-react"
import Navbar from "@/components/Navbar"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import dynamic from "next/dynamic"
import { useEffect } from "react"
import './calendar-custom.css';
import { useToast } from "@/hooks/use-toast"
const Calendar = dynamic(() => import("react-calendar"), { ssr: false })
import 'react-calendar/dist/Calendar.css';

// Realistic candidates array (same as results page, with extra fields for profile)
const candidates = [
  {
    id: 1,
    name: "Ava Patel",
    title: "Senior Frontend Engineer",
    company: "Shopify",
    location: "Toronto, Canada",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    score: 97,
    experience: "7 years",
    availability: "Immediate",
    salary: "$160-180k",
    skills: ["React", "TypeScript", "GraphQL", "Redux", "Jest", "Cypress", "Storybook", "Sass"],
    status: "Actively looking",
    summary:
      "Award-winning frontend engineer with a passion for building scalable, accessible web apps. Led the migration to TypeScript at Shopify, improving code quality and onboarding. Regular speaker at React conferences.",
    experience_timeline: [
      {
        title: "Senior Frontend Engineer",
        company: "Shopify",
        duration: "2020 - Present",
        description:
          "Led the migration to TypeScript, mentored 8+ engineers, and improved Lighthouse scores by 30%.",
      },
      {
        title: "Frontend Developer",
        company: "Atlassian",
        duration: "2017 - 2020",
        description:
          "Built reusable UI components, contributed to design system, and improved test coverage to 95%.",
      },
    ],
    contact: {
      email: "ava.patel@shopify.com",
      linkedin: "linkedin.com/in/avapatel",
      github: "github.com/avapatel",
    },
  },
  {
    id: 2,
    name: "Lucas Moreau",
    title: "Full Stack Developer",
    company: "Google",
    location: "Paris, France",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    score: 94,
    experience: "8 years",
    availability: "2 weeks",
    salary: "$180-200k",
    skills: ["Node.js", "React", "GCP", "TypeScript", "Kubernetes", "Docker", "GraphQL"],
    status: "Open to opportunities",
    summary:
      "Versatile full stack developer at Google, specializing in cloud-native apps and scalable APIs. Led the launch of a major internal tool used by 10,000+ employees.",
    experience_timeline: [
      {
        title: "Full Stack Developer",
        company: "Google",
        duration: "2019 - Present",
        description:
          "Architected and launched internal tools, improved CI/CD pipelines, and mentored junior devs.",
      },
      {
        title: "Backend Developer",
        company: "BlaBlaCar",
        duration: "2016 - 2019",
        description:
          "Built microservices, migrated legacy systems to GCP, and improved system reliability by 40%.",
      },
    ],
    contact: {
      email: "lucas.moreau@google.com",
      linkedin: "linkedin.com/in/lucasmoreau",
      github: "github.com/lucasmoreau",
    },
  },
  {
    id: 3,
    name: "Sophie Dubois",
    title: "Lead UI/UX Designer",
    company: "Airbnb",
    location: "Berlin, Germany",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    score: 91,
    experience: "9 years",
    availability: "1 month",
    salary: "$140-160k",
    skills: ["Figma", "Sketch", "React", "Design Systems", "User Research", "Prototyping", "Accessibility"],
    status: "Passive",
    summary:
      "Creative lead designer at Airbnb, focused on delightful user experiences and accessibility. Designed the new Airbnb mobile onboarding flow, increasing completion by 18%.",
    experience_timeline: [
      {
        title: "Lead UI/UX Designer",
        company: "Airbnb",
        duration: "2021 - Present",
        description:
          "Designed mobile onboarding, led accessibility initiatives, and mentored design interns.",
      },
      {
        title: "Product Designer",
        company: "SoundCloud",
        duration: "2017 - 2021",
        description:
          "Redesigned creator dashboard, improved NPS by 12 points, and ran user research studies.",
      },
    ],
    contact: {
      email: "sophie.dubois@airbnb.com",
      linkedin: "linkedin.com/in/sophiedubois",
      github: "github.com/sophiedubois",
    },
  },
  {
    id: 4,
    name: "David Kim",
    title: "Backend Engineer",
    company: "Netflix",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    score: 89,
    experience: "6 years",
    availability: "Immediate",
    salary: "$170-190k",
    skills: ["Python", "Go", "AWS", "Microservices", "PostgreSQL", "Redis", "gRPC"],
    status: "Actively looking",
    summary:
      "Backend engineer at Netflix, expert in distributed systems and microservices. Built the recommendation engine backend, handling millions of requests per day.",
    experience_timeline: [
      {
        title: "Backend Engineer",
        company: "Netflix",
        duration: "2020 - Present",
        description:
          "Built and scaled recommendation engine backend, improved latency by 25%.",
      },
      {
        title: "Software Engineer",
        company: "Dropbox",
        duration: "2017 - 2020",
        description:
          "Migrated legacy services to AWS, implemented monitoring and alerting systems.",
      },
    ],
    contact: {
      email: "david.kim@netflix.com",
      linkedin: "linkedin.com/in/davidkim",
      github: "github.com/davidkim",
    },
  },
  {
    id: 5,
    name: "Maria Rossi",
    title: "Product Manager",
    company: "Stripe",
    location: "Dublin, Ireland",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    score: 88,
    experience: "10 years",
    availability: "3 weeks",
    salary: "$200-220k",
    skills: ["Product Strategy", "Agile", "Jira", "Leadership", "Payments", "Roadmapping", "Stakeholder Management"],
    status: "Open to opportunities",
    summary:
      "Product manager at Stripe, specializing in payments and fintech. Launched Stripe's new invoicing product, driving $10M in new ARR.",
    experience_timeline: [
      {
        title: "Product Manager",
        company: "Stripe",
        duration: "2019 - Present",
        description:
          "Launched invoicing product, managed cross-functional teams, and drove $10M ARR.",
      },
      {
        title: "Business Analyst",
        company: "Accenture",
        duration: "2015 - 2019",
        description:
          "Analyzed business requirements, supported digital transformation projects for Fortune 500 clients.",
      },
    ],
    contact: {
      email: "maria.rossi@stripe.com",
      linkedin: "linkedin.com/in/mariarossi",
      github: "github.com/mariarossi",
    },
  },
]

const defaultMessages = [
  {
    id: 1,
    platform: "linkedin",
    content: "Hi! I saw your message about the React position. I'm definitely interested in learning more.",
    timestamp: "2 hours ago",
    isCandidate: true,
  },
  {
    id: 2,
    platform: "email",
    content: "Great! I'd love to schedule a quick call to discuss the role and your experience at Stripe.",
    timestamp: "1 hour ago",
    isCandidate: false,
  },
  {
    id: 3,
    platform: "whatsapp",
    content: "Sounds perfect! I'm available this week for a call.",
    timestamp: "30 minutes ago",
    isCandidate: true,
  },
]

export default function ProfilePage() {
  const params = useParams();
  const id = Number(params.id);
  const candidate = candidates.find((c) => c.id === id) || candidates[0];

  // Tabs state
  const [activeTab, setActiveTab] = useState<'profile' | 'messaging' | 'scheduling'>('profile');
  // Messaging state
  const [messages, setMessages] = useState(defaultMessages);
  const [newMessage, setNewMessage] = useState("");
  // Scheduling state
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [interviewType, setInterviewType] = useState("video");
  const [virtualType, setVirtualType] = useState("zoom");
  const timeSlots = [
    "Today 2:00 PM",
    "Today 4:00 PM",
    "Tomorrow 10:00 AM",
    "Tomorrow 2:00 PM",
    "Friday 9:00 AM",
    "Friday 3:00 PM",
  ];
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate 30-min time slots from 9am to 5pm
  function generateTimeSlots() {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      slots.push(`${hour}:00 AM`);
      slots.push(`${hour}:30 AM`);
    }
    slots[slots.indexOf('12:00 AM')] = '12:00 PM';
    slots[slots.indexOf('12:30 AM')] = '12:30 PM';
    for (let i = 13; i < 17; i++) {
      slots[slots.indexOf(`${i}:00 AM`)] = `${i - 12}:00 PM`;
      slots[slots.indexOf(`${i}:30 AM`)] = `${i - 12}:30 PM`;
    }
    return slots;
  }
  const dayTimeSlots = generateTimeSlots();

  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        platform: "email",
        content: newMessage,
        timestamp: "now",
        isCandidate: false,
      },
    ]);
    setNewMessage("");
  };

  const handleScheduleInterview = () => {
    if (!selectedTimeSlot || !selectedDate) return;
    toast({
      title: "Interview Scheduled!",
      description: `Interview for ${candidate.name} scheduled on ${selectedDate.toLocaleDateString()} at ${selectedTimeSlot} (${interviewType === 'video' ? (virtualType === 'zoom' ? 'Zoom' : 'Google Meet') : 'In Person'})`,
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "whatsapp":
        return <MessageCircle className="w-4 h-4 text-green-500" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4 text-blue-600" />;
      case "email":
        return <Mail className="w-4 h-4 text-gray-600" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Avatar className="w-32 h-32 border-4 border-white/20">
                <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-white/20 text-white text-4xl font-bold">SC</AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-4xl font-bold mb-2">{candidate.name}</h1>
                <p className="text-xl text-white/90 mb-2">{candidate.title}</p>
                <div className="flex items-center text-white/80">
                  <Building className="w-5 h-5 mr-2" />
                  <span className="mr-6">{candidate.company}</span>
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{candidate.location}</span>
                </div>
              </div>
            </div>

            {/* AI Score */}
            <div className="text-center">
              <div className="relative w-24 h-24 mb-2">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray={`${candidate.score}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{candidate.score}%</span>
                </div>
              </div>
              <p className="text-white/80 text-sm">AI Match Score</p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-8 flex space-x-4">
            <Button className="bg-white text-blue-600 hover:bg-white/90">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("messaging")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "messaging"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <MessageCircle className="w-4 h-4 mr-2 inline" />
              Messaging
            </button>
            <button
              onClick={() => setActiveTab("scheduling")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "scheduling"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <CalendarIcon className="w-4 h-4 mr-2 inline" />
              Schedule Interview
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* AI Analysis */}
              <Card className="p-8">
                <div className="flex items-center mb-6">
                  <Sparkles className="w-6 h-6 text-blue-500 mr-3" />
                  <h2 className="text-2xl font-bold text-slate-900">AI Analysis</h2>
                </div>
                <p className="text-slate-700 leading-relaxed text-lg">{candidate.summary}</p>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <p className="text-blue-800 font-medium">
                    <strong>Why they're a perfect match:</strong> Strong React expertise, proven leadership experience,
                    and track record of improving system performance aligns perfectly with your requirements.
                  </p>
                </div>
              </Card>

              {/* Experience Timeline */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Experience</h2>
                <div className="space-y-8">
                  {candidate.experience_timeline.map((exp, index) => (
                    <div key={index} className="relative pl-8">
                      <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 rounded-full" />
                      {index < candidate.experience_timeline.length - 1 && (
                        <div className="absolute left-2 top-6 w-0.5 h-16 bg-slate-200" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                        <p className="text-slate-500 text-sm mb-3">{exp.duration}</p>
                        <p className="text-slate-700">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Skills */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Technical Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {candidate.skills.map((skill, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-xl">
                      <h3 className="font-bold text-slate-900 mb-2">{skill}</h3>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${85 + Math.random() * 15}%` }} />
                      </div>
                      <p className="text-sm text-slate-500 mt-1">Expert</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-slate-400 mr-3" />
                    <span className="text-slate-600">{candidate.contact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="w-5 h-5 text-slate-400 mr-3" />
                    <span className="text-slate-600">{candidate.contact.linkedin}</span>
                  </div>
                  <div className="flex items-center">
                    <Github className="w-5 h-5 text-slate-400 mr-3" />
                    <span className="text-slate-600">{candidate.contact.github}</span>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Experience</span>
                    <span className="font-medium text-slate-900">{candidate.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Availability</span>
                    <span className="font-medium text-slate-900">{candidate.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Salary Range</span>
                    <span className="font-medium text-slate-900">{candidate.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{candidate.status}</Badge>
                  </div>
                </div>
              </Card>

              {/* Similar Candidates */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Similar Candidates</h3>
                <div className="space-y-3">
                  {[
                    { name: "Marcus Johnson", title: "Full Stack Engineer", score: 91 },
                    { name: "Emily Rodriguez", title: "Frontend Architect", score: 89 },
                    { name: "David Kim", title: "React Developer", score: 87 },
                  ].map((similar, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{similar.name}</p>
                        <p className="text-sm text-slate-600">{similar.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-blue-600">{similar.score}%</p>
                        <p className="text-xs text-slate-500">match</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Messaging Tab */}
        {activeTab === "messaging" && (
          <div className="max-w-4xl mx-auto">
            <Card className="h-[600px] flex flex-col">
              {/* Messages Header */}
              <div className="p-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">Unified Messaging</h2>
                <p className="text-sm text-slate-600">WhatsApp, LinkedIn, and Email in one place</p>
              </div>
              {/* Messages List */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isCandidate ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isCandidate ? "bg-slate-100 text-slate-900" : "bg-blue-500 text-white"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {getPlatformIcon(message.platform)}
                        <span className="text-xs ml-2 opacity-75">{message.timestamp}</span>
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Message Input */}
              <div className="p-4 border-t border-slate-200">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 min-h-[60px] resize-none"
                  />
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" variant="outline">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Messages will be sent via the candidate's preferred platform
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Scheduling Tab */}
        {activeTab === "scheduling" && (
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 flex flex-col lg:flex-row gap-8 items-start">
              {/* Calendar Picker */}
              <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col items-center">
                <CalendarIcon className="w-12 h-12 text-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Schedule Interview</h2>
                <p className="text-slate-600 mb-4 text-center">Choose a date for your interview with {candidate.name}</p>
                <Calendar
                  onChange={(value) => {
                    if (value instanceof Date) setSelectedDate(value);
                    else if (Array.isArray(value) && value[0] instanceof Date) setSelectedDate(value[0]);
                  }}
                  value={selectedDate}
                  minDate={new Date()}
                  tileDisabled={({ date, view }) => view === 'month' && date < new Date(new Date().setHours(0,0,0,0))}
                  className="hiregen-calendar"
                />
              </div>
              {/* Scheduling Form */}
              <div className="flex-1 w-full">
                <div className="space-y-6">
                  {selectedDate && (
                    <div>
                      <label className="text-base font-medium text-slate-900 mb-3 block">Available Time Slots</label>
                      <div className="grid grid-cols-2 gap-3">
                        {dayTimeSlots.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`p-3 text-left rounded-lg border-2 transition-all ${
                              selectedTimeSlot === slot
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-slate-200 hover:border-blue-300"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-base font-medium text-slate-900 mb-2 block">Interview Type</label>
                    <div className="flex space-x-4 mb-2">
                      <button
                        className={`flex-1 p-3 border-2 rounded-lg flex flex-col items-center ${
                          interviewType === "video"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                        onClick={() => setInterviewType("video")}
                      >
                        <VideoIcon className="w-5 h-5 mb-1" />
                        <span className="text-sm font-medium">Video Call</span>
                      </button>
                      <button
                        className={`flex-1 p-3 border-2 rounded-lg flex flex-col items-center ${
                          interviewType === "inperson"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                        onClick={() => setInterviewType("inperson")}
                      >
                        <Building className="w-5 h-5 mb-1" />
                        <span className="text-sm font-medium">In Person</span>
                      </button>
                    </div>
                    {interviewType === "video" && (
                      <div className="flex space-x-4 mb-2">
                        <button
                          className={`flex-1 p-3 border-2 rounded-lg flex flex-col items-center ${
                            virtualType === "zoom"
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-200 hover:border-blue-300"
                          }`}
                          onClick={() => setVirtualType("zoom")}
                        >
                          <Video className="w-5 h-5 mb-1" />
                          <span className="text-sm font-medium">Zoom</span>
                        </button>
                        <button
                          className={`flex-1 p-3 border-2 rounded-lg flex flex-col items-center ${
                            virtualType === "googlemeet"
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-200 hover:border-blue-300"
                          }`}
                          onClick={() => setVirtualType("googlemeet")}
                        >
                          <VideoIcon className="w-5 h-5 mb-1" />
                          <span className="text-sm font-medium">Google Meet</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-base font-medium text-slate-900 mb-2 block">Add a note (optional)</label>
                    <Textarea placeholder="Any specific topics or preparation notes..." className="min-h-[80px]" />
                  </div>
                  <Button
                    onClick={handleScheduleInterview}
                    disabled={!selectedTimeSlot || !selectedDate}
                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                  >
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Schedule Interview for {selectedTimeSlot && selectedDate ? `${selectedTimeSlot} on ${selectedDate.toLocaleDateString()}` : ""}
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    Calendar invite will be sent to both you and the candidate
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
