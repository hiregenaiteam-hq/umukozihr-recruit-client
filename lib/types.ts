/**
 * ELITE TYPE DEFINITIONS - Zero `any` types allowed
 * 
 * These are the backbone of our type-safe frontend.
 * Every single piece of data flowing through the app has a proper interface.
 */

// ==================== SEARCH TYPES ====================

export interface SearchCriteria {
  job_titles: string[]
  skills_keywords: string[]
  location_full: string
  education_levels?: string[]
  industry_keywords?: string[]
  experience_years_min: number
  experience_years_max: number
}

export interface SearchPayload {
  user_id: string
  session_id: string
  search_mode: "database" | "live" | "hybrid"
  max_results: number
  criteria: SearchCriteria
  include_detailed_profiles: boolean
  save_search: boolean
  search_description: string
}

export interface PromptSearchPayload {
  search_type: "prompt"
  prompt: string
  use_deep_research: boolean
}

export interface WillingnessScore {
  score: number
  likelihood: "very_unlikely" | "unlikely" | "possible" | "likely" | "very_likely"
  reasoning: string[]
  red_flags: string[]
  green_flags: string[]
}

export interface Candidate {
  id: number
  full_name: string
  headline: string
  linkedin_url: string
  location_full: string
  active_experience_title: string
  inferred_skills: string[]
  rank_position: number
  relevance_score: number
  skill_match_score: number
  experience_score: number
  location_score: number
  job_title_score: number
  ranking_explanation: string
  matched_skills: string[]
  missing_skills: string[]
  willingness: WillingnessScore | null
}

export interface SearchRequest {
  session_id?: string
  search_mode?: string
  criteria?: SearchCriteria
  prompt?: string
  use_deep_research?: boolean
}

export interface SearchResponse {
  search_id: string
  user_id: string
  results: Candidate[]
  total_results: number
  search_duration: number
  timestamp: string
  search_summary?: string
  recommendations?: string[]
  search_request: SearchRequest
  needs_clarification?: boolean
  clarification?: ClarificationRequest
  warnings?: string[]
}

export interface ClarificationRequest {
  missing_fields: string[]
  clarification_prompt: string
}

export interface ClarificationValues {
  job_title?: string
  location?: string
  experience?: string
  skills?: string
  [key: string]: string | undefined
}

// ==================== PROMPT SEARCH RESPONSE ====================

export interface PromptCandidate {
  url: string
  name: string
  title: string
  location: string
  current_company: string
  experience_summary: string
  years_of_experience: number
  skills: string[]
  match_score: number
  match_reasons: string[]
  total_score: number
  willingness?: WillingnessScore
}

export interface PromptSearchResponse {
  success: boolean
  message?: string
  candidates: PromptCandidate[]
  requirements?: {
    job_titles: string[]
    skills: string[]
    locations: string[]
    experience_years_min: number
    experience_years_max: number
  }
  warnings?: string[]
  needs_clarification?: boolean
  clarification?: ClarificationRequest
}

// ==================== USER & AUTH TYPES ====================

export interface UserProfile {
  id: string
  email: string
  username?: string
  full_name?: string
  company?: string
  company_website?: string
  job_title?: string
  department?: string
  phone?: string
  is_active: boolean
  is_verified: boolean
  is_premium: boolean
  subscription_tier: string
  monthly_search_limit: number
  monthly_searches_used: number
  created_at: string
  updated_at: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  full_name: string
  company?: string
  job_title?: string
}

export interface AuthResponse {
  access_token: string
  refresh_token?: string
  token_type: string
  expires_in: number
  user: UserProfile
}

export interface OTPVerificationRequest {
  email: string
  otp: string
}

export interface PasswordResetRequest {
  email: string
  otp: string
  current_password: string
  new_password: string
  confirm_password: string
}

// ==================== SETTINGS TYPES ====================

export interface AIPreferences {
  search_mode: "database" | "live" | "hybrid"
  deep_research_default: boolean
  auto_clarification: boolean
  result_count: number
}

export interface NotificationSettings {
  email_notifications: boolean
  search_complete_notifications: boolean
  new_candidate_notifications: boolean
  weekly_digest: boolean
}

export interface CompanyProfile {
  company_name: string
  tagline?: string
  industry: string
  headquarters: string
  stage: "pre-seed" | "seed" | "series_a" | "series_b" | "series_c" | "growth" | "public"
  team_size: number
  funding_raised: number
  monthly_revenue: number
  is_profitable: boolean
  compensation_philosophy: "market_rate" | "below_market_equity" | "equity_only"
  remote_policy: "remote_first" | "hybrid" | "office_only"
  mission: string
  bio: string
  unique_selling_points: string[]
  growth_potential: string
  attractiveness_score?: number
  risk_level?: "high" | "medium" | "low"
}

// ==================== SUBSCRIPTION TYPES ====================

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  searches: number
  description: string
  features: string[]
}

export interface UserSubscription {
  subscription_tier: string
  status: "active" | "inactive" | "cancelled" | "expired"
  current_period_start?: string
  current_period_end?: string
  cancel_at_period_end?: boolean
}

export interface SubscriptionPlansResponse {
  plans: {
    basic: SubscriptionPlan
    pro: SubscriptionPlan
    business: SubscriptionPlan
  }
}

// ==================== CHAT TYPES ====================

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  candidateData?: {
    name: string
    title: string
    linkedin_url: string
  }
}

export interface ChatWidgetProps {
  searchResults?: SearchResponse
  candidateData?: {
    name: string
    title: string
    linkedin_url: string
    skills?: string[]
    experience?: string
  }
}

// ==================== API ERROR TYPES ====================

export interface APIError {
  title: string
  description: string
  status?: number
  code?: string
}

export interface ValidationError {
  field: string
  message: string
}

// ==================== UTILITY TYPES ====================

export type LoadingState = "idle" | "loading" | "success" | "error"

export interface ToastMessage {
  type: "error" | "success" | "info" | "warning"
  message: string
}

// ==================== FORM TYPES ====================

export interface SearchFormData {
  jobTitles: string[]
  skills: string[]
  location: string
  industries: string[]
  educations: string[]
  expMin: number
  expMax: number
  searchMode: "database" | "live" | "hybrid"
}

export interface PromptSearchFormData {
  prompt: string
  deepResearch: boolean
}
