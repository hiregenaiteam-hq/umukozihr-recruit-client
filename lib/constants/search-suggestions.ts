// Search Constants - Static suggestion data for all industries

export const JOB_SUGGESTIONS = [
  // Healthcare
  "Nurse",
  "Doctor",
  "Pharmacist",
  "Physical therapist",
  "Medical assistant",
  "Dentist",
  "Veterinarian",
  // Education
  "Teacher",
  "Principal",
  "Professor",
  "Tutor",
  "School counselor",
  "Librarian",
  "Administrator",
  // Business & Finance
  "Accountant",
  "Financial analyst",
  "Sales representative",
  "Marketing manager",
  "HR manager",
  "Operations manager",
  // Technology (but simplified)
  "Software developer",
  "IT support",
  "Data analyst",
  "Web designer",
  "System administrator",
  "Machine learning engineer",
  "Machine learning",
  // Retail & Service
  "Store manager",
  "Cashier",
  "Customer service",
  "Sales associate",
  "Restaurant manager",
  "Chef",
  // Skilled Trades
  "Electrician",
  "Plumber",
  "Mechanic",
  "Carpenter",
  "Welder",
  "HVAC technician",
  // Transportation
  "Driver",
  "Pilot",
  "Logistics coordinator",
  "Delivery driver",
  "Truck driver",
  // Creative & Media
  "Graphic designer",
  "Writer",
  "Photographer",
  "Video editor",
  "Social media manager",
  // Legal & Professional
  "Lawyer",
  "Paralegal",
  "Consultant",
  "Project manager",
  "Business analyst",
  // General
  "Administrative assistant",
  "Receptionist",
  "Security guard",
  "Janitor",
  "Maintenance worker",
] as const;

export const SKILL_SUGGESTIONS = [
  // Communication & Soft Skills
  "Communication",
  "Leadership",
  "Teamwork",
  "Problem solving",
  "Customer service",
  "Time management",
  "Public speaking",
  "Writing",
  "Negotiation",
  "Conflict resolution",
  "Mentoring",
  "Training",

  // Technical Skills (simplified)
  "Microsoft Office",
  "Excel",
  "PowerPoint",
  "Word",
  "Google Workspace",
  "Email",
  "Internet",
  "Social media",
  "Basic computer skills",
  "Data entry",
  "Typing",
  "Research",
  "Python",
  "FastAPI",
  "PostgreSQL",

  // Industry-Specific Skills
  "Sales",
  "Marketing",
  "Accounting",
  "Bookkeeping",
  "Project management",
  "Event planning",
  "Teaching",
  "Training",
  "Coaching",
  "Counseling",
  "Medical knowledge",
  "First aid",
  "Cooking",
  "Food safety",
  "Inventory management",
  "Quality control",
  "Safety procedures",

  // Languages
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Arabic",
  "Portuguese",
  "Multilingual",

  // Certifications & Licenses
  "CPR certified",
  "First aid",
  "Driver's license",
  "CDL",
  "Professional license",
  "Certification",
] as const;

export const INDUSTRY_SUGGESTIONS = [
  "Healthcare",
  "Education",
  "Finance",
  "Retail",
  "Food & beverage",
  "Manufacturing",
  "Construction",
  "Transportation",
  "Technology",
  "Real estate",
  "Legal",
  "Government",
  "Non-profit",
  "Entertainment",
  "Sports",
  "Travel",
  "Automotive",
  "Agriculture",
  "Energy",
  "Telecommunications",
  "Media",
  "Consulting",
  "Insurance",
  "Banking",
] as const;

export const EDUCATION_SUGGESTIONS = [
  "High school diploma",
  "GED",
  "Associate degree",
  "Bachelor's degree",
  "Master's degree",
  "PhD",
  "Trade school",
  "Certificate program",
  "On-the-job training",
  "Apprenticeship",
  "Professional license",
  "No formal education required",
  "Bachelor's",
  "Master's",
] as const;

export const LOCATION_SUGGESTIONS = [
  "Nigeria",
  "Ghana",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "South Africa",
  "Kenya",
  "Australia",
  "Singapore",
  "Netherlands",
  "India",
  "Brazil",
  "Japan",
  "China",
  "Italy",
  "Spain",
  "Mexico",
  "Egypt",
] as const;

// Experience range constants
export const EXPERIENCE_RANGE = {
  MIN: 0,
  MAX: 30,
  DEFAULT_MIN: 0,
  DEFAULT_MAX: 5,
} as const;

// Quick preset experience levels
export const EXPERIENCE_PRESETS = [
  {
    label: "Entry Level",
    min: 0,
    max: 2,
    color: "from-green-400 to-emerald-500",
  },
  { label: "Mid Level", min: 3, max: 7, color: "from-blue-400 to-cyan-500" },
  {
    label: "Senior Level",
    min: 8,
    max: 15,
    color: "from-purple-400 to-indigo-500",
  },
  {
    label: "Expert Level",
    min: 16,
    max: 30,
    color: "from-pink-400 to-rose-500",
  },
] as const;

// Step configuration
export const SEARCH_STEPS = [
  {
    id: 1,
    title: "Job Position",
    description: "What role are you hiring for?",
    icon: "Briefcase",
  },
  {
    id: 2,
    title: "Requirements",
    description: "Experience & education needed",
    icon: "GraduationCap",
  },
  {
    id: 3,
    title: "Location & Industry",
    description: "Where and what business",
    icon: "MapPin",
  },
  {
    id: 4,
    title: "Review & Search",
    description: "Review and find candidates",
    icon: "Users",
  },
] as const;
