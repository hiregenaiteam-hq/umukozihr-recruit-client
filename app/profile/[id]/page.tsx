"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  MapPin,
  Building,
  MessageCircle,
  Bookmark,
  Share,
  Github,
  Linkedin,
  Mail,
  Phone,
  Calendar,
  Star,
  Award,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  GraduationCap,
  Target,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Download,
  Eye,
  Heart,
  Send,
  Video,
  UserPlus,
  FileText,
  BarChart3,
  Zap
} from "lucide-react"
import Navbar from "@/components/Navbar"
import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ChatWidget } from "@/components/chat"

// Import the actual candidate data from the response samples
import responseSamples from "../../../Response-samples.json"

interface Candidate {
  id: number;
  full_name: string;
  headline: string;
  linkedin_url: string;
  picture_url: string | null;
  primary_professional_email: string | null;
  location_full: string;
  location_country: string;
  active_experience_title: string;
  inferred_skills: string[];
  total_experience_duration_months: number;
  is_working: boolean;
  relevance_score: number;
  skill_match_score: number;
  experience_score: number;
  location_score: number;
  matched_skills: string[];
  missing_skills: string[];
  experience: Array<{
    active_experience: boolean;
    position_title: string;
    company_name: string;
    company_industry: string | null;
    date_from: string;
    date_to: string | null;
    duration_months: number;
    description?: string | null;
  }>;
  education: Array<{
    degree: string;
    institution_name: string;
    date_from_year: number;
    date_to_year: number | null;
  }>;
  certification_details: Array<{
    title: string;
    issuer: string;
    date_from: string;
  }>;
}

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'skills' | 'contact'>('overview')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    const candidateId = Number(params.id)

    // Find candidate from the response samples
    const foundCandidate = responseSamples.results.find(c => c.id === candidateId)

    if (foundCandidate) {
      setCandidate(foundCandidate)
    } else {
      // Fallback to first candidate if not found
      setCandidate(responseSamples.results[0])
    }

    setIsLoading(false)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-umukozi-orange mx-auto mb-4"></div>
            <p className="text-slate-600">Loading candidate profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Candidate Not Found</h2>
            <p className="text-slate-600 mb-6">The candidate you're looking for doesn't exist.</p>
            <Button onClick={() => router.back()} className="bg-umukozi-orange hover:bg-umukozi-orange-dark">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const formatExperience = (months: number) => {
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    if (years === 0) return `${remainingMonths} months`
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200"
    if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: `${candidate.full_name} has been ${isBookmarked ? 'removed from' : 'added to'} your bookmarks.`,
    })
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${candidate.full_name} has been ${isLiked ? 'removed from' : 'added to'} your favorites.`,
    })
  }

  const handleContact = () => {
    toast({
      title: "Contact initiated",
      description: `You've started a conversation with ${candidate.full_name}.`,
    })
  }

  const handleSchedule = () => {
    toast({
      title: "Interview scheduled",
      description: `Interview with ${candidate.full_name} has been scheduled.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <Navbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-umukozi-orange to-umukozi-orange-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32" />

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Candidate Info */}
            <div className="flex items-start lg:items-center gap-6">
              <Avatar className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-white/20 shadow-xl">
                <AvatarImage src={candidate.picture_url || "/placeholder-user.jpg"} />
                <AvatarFallback className="bg-white/20 text-white text-2xl lg:text-4xl font-bold">
                  {candidate.full_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{candidate.full_name}</h1>
                <p className="text-xl lg:text-2xl text-white/90 mb-3">{candidate.headline}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white/80">
                  <div className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    <span>{candidate.active_experience_title}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{candidate.location_full}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{formatExperience(candidate.total_experience_duration_months)} experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Score & Actions */}
            <div className="flex flex-col lg:items-end gap-6">
              {/* AI Match Score */}
              <div className="text-center">
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 mb-3">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
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
                      strokeDasharray={`${candidate.relevance_score}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl lg:text-2xl font-bold">{candidate.relevance_score}%</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm font-medium">AI Match Score</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleContact}
                  className="bg-white text-umukozi-orange hover:bg-white/90 font-medium"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button
                  onClick={handleSchedule}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button
                  onClick={handleBookmark}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                <Button
                  onClick={handleLike}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current text-red-400' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'skills', label: 'Skills & Match', icon: Target },
              { id: 'contact', label: 'Contact & Actions', icon: MessageCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id
                  ? "border-umukozi-orange text-umukozi-orange"
                  : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Analysis */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-umukozi-orange/5 to-umukozi-orange/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-umukozi-orange/10 rounded-lg">
                        <Sparkles className="w-6 h-6 text-umukozi-orange" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">AI Analysis</h2>
                        <p className="text-slate-600">Why this candidate is a great match</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setIsChatOpen(true)}
                      className="bg-umukozi-orange hover:bg-umukozi-orange-dark text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat with AI
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed text-lg">
                      This candidate demonstrates exceptional expertise in machine learning and software engineering,
                      with a proven track record of building scalable solutions. Their experience at Babban Gona
                      shows strong technical leadership and the ability to deliver impactful projects.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">Strengths</span>
                        </div>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Strong Python expertise</li>
                          <li>• Machine Learning experience</li>
                          <li>• Current role relevance</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-yellow-600" />
                          <span className="font-semibold text-yellow-800">Growth Areas</span>
                        </div>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• FastAPI experience</li>
                          <li>• PostgreSQL knowledge</li>
                          <li>• Additional certifications</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">Potential</span>
                        </div>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• High growth trajectory</li>
                          <li>• Leadership potential</li>
                          <li>• Cultural fit</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-slate-900">Quick Stats</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-umukozi-orange mb-1">{candidate.relevance_score}%</div>
                      <div className="text-sm text-slate-600">Match Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-umukozi-orange mb-1">{candidate.skill_match_score}%</div>
                      <div className="text-sm text-slate-600">Skills Match</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-umukozi-orange mb-1">{candidate.experience_score}%</div>
                      <div className="text-sm text-slate-600">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-umukozi-orange mb-1">{candidate.location_score}%</div>
                      <div className="text-sm text-slate-600">Location</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <h3 className="text-lg font-bold text-slate-900">Contact Information</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {candidate.primary_professional_email && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600">{candidate.primary_professional_email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <a
                      href={candidate.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Availability Status */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <h3 className="text-lg font-bold text-slate-900">Availability</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Status</span>
                      <Badge className={`${candidate.is_working ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {candidate.is_working ? 'Currently Working' : 'Available'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Experience</span>
                      <span className="font-medium">{formatExperience(candidate.total_experience_duration_months)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Location</span>
                      <span className="font-medium">{candidate.location_country}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleContact} className="w-full bg-umukozi-orange hover:bg-umukozi-orange-dark">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button onClick={handleSchedule} variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share className="w-4 h-4 mr-2" />
                    Share Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-slate-900">Work Experience</h2>
                <p className="text-slate-600">Professional journey and achievements</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="relative pl-8">
                      <div className="absolute left-0 top-2 w-4 h-4 bg-umukozi-orange rounded-full" />
                      {index < candidate.experience.length - 1 && (
                        <div className="absolute left-2 top-6 w-0.5 h-16 bg-slate-200" />
                      )}
                      <div className="bg-slate-50 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{exp.position_title}</h3>
                            <p className="text-umukozi-orange font-semibold">{exp.company_name}</p>
                            <p className="text-slate-500 text-sm">
                              {exp.date_from} - {exp.date_to || 'Present'}
                            </p>
                          </div>
                          {exp.active_experience && (
                            <Badge className="bg-green-100 text-green-800">Current</Badge>
                          )}
                        </div>
                        {exp.company_industry && (
                          <p className="text-slate-600 mb-3">Industry: {exp.company_industry}</p>
                        )}
                        <p className="text-slate-700">Duration: {exp.duration_months} months</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            {candidate.education && candidate.education.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-slate-900">Education</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-umukozi-orange" />
                        <div>
                          <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                          <p className="text-slate-600">{edu.institution_name}</p>
                          <p className="text-sm text-slate-500">
                            {edu.date_from_year} - {edu.date_to_year || 'Present'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {candidate.certification_details && candidate.certification_details.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-slate-900">Certifications</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.certification_details.map((cert, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                        <Award className="w-6 h-6 text-umukozi-orange" />
                        <div>
                          <h3 className="font-semibold text-slate-900">{cert.title}</h3>
                          <p className="text-slate-600">{cert.issuer}</p>
                          <p className="text-sm text-slate-500">{cert.date_from}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Skills Match Analysis */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-slate-900">Skills Analysis</h2>
                <p className="text-slate-600">How well this candidate matches your requirements</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Matched Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Matched Skills ({candidate.matched_skills.length})
                    </h3>
                    <div className="space-y-3">
                      {candidate.matched_skills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium text-green-800">{skill}</span>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Missing Skills ({candidate.missing_skills.length})
                    </h3>
                    <div className="space-y-3">
                      {candidate.missing_skills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                          <span className="font-medium text-red-800">{skill}</span>
                          <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All Skills */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-slate-900">All Skills</h2>
                <p className="text-slate-600">Complete skill set and expertise areas</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {candidate.inferred_skills.map((skill, index) => {
                    const isMatched = candidate.matched_skills.includes(skill)
                    const isMissing = candidate.missing_skills.includes(skill)

                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${isMatched
                          ? 'bg-green-50 border-green-200'
                          : isMissing
                            ? 'bg-red-50 border-red-200'
                            : 'bg-slate-50 border-slate-200'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-slate-900">{skill}</h3>
                          {isMatched && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {isMissing && <XCircle className="w-4 h-4 text-red-600" />}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${isMatched ? 'bg-green-500' : 'bg-slate-400'
                              }`}
                            style={{ width: `${85 + Math.random() * 15}%` }}
                          />
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          {isMatched ? 'Matched' : isMissing ? 'Missing' : 'Available'}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Contact Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-slate-900">Contact & Actions</h2>
                <p className="text-slate-600">Reach out and manage this candidate</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button onClick={handleContact} className="w-full bg-umukozi-orange hover:bg-umukozi-orange-dark h-12">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                      <Button onClick={handleSchedule} variant="outline" className="w-full h-12">
                        <Calendar className="w-5 h-5 mr-2" />
                        Schedule Interview
                      </Button>
                      <Button variant="outline" className="w-full h-12">
                        <Video className="w-5 h-5 mr-2" />
                        Video Call
                      </Button>
                      <Button variant="outline" className="w-full h-12">
                        <FileText className="w-5 h-5 mr-2" />
                        Request CV
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>
                    <div className="space-y-3">
                      {candidate.primary_professional_email && (
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <Mail className="w-5 h-5 text-slate-400" />
                          <span className="text-slate-600">{candidate.primary_professional_email}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <Linkedin className="w-5 h-5 text-blue-600" />
                        <a
                          href={candidate.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-slate-900">Notes & Comments</h3>
                <p className="text-slate-600">Add your observations and notes about this candidate</p>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add your notes about this candidate..."
                  className="min-h-[120px] resize-none"
                />
                <div className="flex justify-end mt-4">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Save Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Chat Widget */}
      <ChatWidget
        candidateId={candidate?.id}
        candidateName={candidate?.full_name}
        candidateData={candidate}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  )
}