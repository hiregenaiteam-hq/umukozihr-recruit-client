// Willingness Score - Assessment of how likely a candidate is to join
export interface WillingnessScore {
  score: number; // 0-20
  career_stage_fit: number;
  compensation_fit: number;
  risk_tolerance: number;
  reasoning: string[];
  red_flags: string[];
  green_flags: string[];
  likelihood: 'very_unlikely' | 'unlikely' | 'possible' | 'likely' | 'very_likely';
}

export interface Candidate {
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
  // NEW: Willingness scoring from deep search
  willingness_score?: WillingnessScore;
  total_score?: number; // Combined: hard + soft + willingness
  experience: Array<{
    active_experience: boolean;
    position_title: string;
    company_name: string;
    company_industry: string | null;
    date_from: string;
    date_to: string | null;
    duration_months: number;
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

export interface SearchRequest {
  session_id?: string;
  search_mode?: string;
  // For structured searches
  criteria?: {
    job_titles: string[];
    skills_keywords: string[];
    location_full: string;
    experience_years_min: number;
    experience_years_max: number;
  };
  // For prompt-based searches
  prompt?: string;
  use_deep_research?: boolean;
}

// Clarification request when required fields are missing
export interface ClarificationRequest {
  needs_clarification: boolean;
  missing_fields: string[];
  clarification_prompt: string;
}

export interface SearchResponse {
  search_id: string;
  total_results: number;
  results: Candidate[];
  search_request: SearchRequest;
  search_summary?: string;
  recommendations?: string[];
  // NEW: Clarification flow from deep search
  needs_clarification?: boolean;
  clarification?: ClarificationRequest;
  warnings?: string[];
}
