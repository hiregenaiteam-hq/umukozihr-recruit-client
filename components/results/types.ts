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
  criteria: {
    job_titles: string[];
    skills_keywords: string[];
    location_full: string;
    experience_years_min: number;
    experience_years_max: number;
  };
}

export interface SearchResponse {
  search_id: string;
  total_results: number;
  results: Candidate[];
  search_request: SearchRequest;
}
