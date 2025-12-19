# UmukoziHR Recruit

**AI-Powered Talent Sourcing Platform**

> Find the perfect candidates for your team using advanced AI-powered search technology.

![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![License](https://img.shields.io/badge/License-Proprietary-red)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Search Modes](#search-modes)
- [Subscription Tiers](#subscription-tiers)
- [Key Components](#key-components)
- [Development](#development)
- [Deployment](#deployment)

---

## Overview

UmukoziHR Recruit is an enterprise-grade talent sourcing platform that helps HR professionals and recruiters find qualified candidates using AI-powered search technology. The platform combines database search with live web scraping to deliver comprehensive candidate results.

### Key Capabilities

- **AI-Powered Search** - Find candidates based on skills, experience, location, and more
- **Multiple Search Modes** - Database, Live (real-time scraping), and Hybrid search
- **AI Chat Assistant** - Get insights, compare candidates, and generate interview questions
- **Subscription Management** - Paystack-integrated billing with multiple tiers
- **Enterprise Ready** - Full onboarding, documentation, and support features

---

## Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Talent Search** | Multi-step search wizard with job titles, skills, experience, location, and industry filters |
| **Search Modes** | Database (fast), Live (real-time web scraping), Hybrid (both) |
| **Candidate Profiles** | Detailed profiles with match scores, skills breakdown, and work history |
| **AI Chat Assistant** | Conversational AI for candidate analysis, comparisons, and insights |
| **Saved Candidates** | Shortlist and organize candidates for later review |

### User Experience

| Feature | Description |
|---------|-------------|
| **Onboarding Wizard** | 6-step interactive walkthrough for new users |
| **Help & Documentation** | Comprehensive in-app user manual with searchable guides |
| **Real-time Loading States** | Animated progress indicators during searches |
| **Responsive Design** | Works on desktop, tablet, and mobile |

### Billing & Subscription

| Feature | Description |
|---------|-------------|
| **Paystack Integration** | Secure payment processing for Ghana (GHS) |
| **Tiered Plans** | Basic (free), Pro, and Business subscriptions |
| **Usage Tracking** | Monthly search limits with real-time usage display |

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.1.0 (App Router with Turbopack)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Animations:** Framer Motion
- **State Management:** React hooks + localStorage

### Backend Integration
- **API:** RESTful API on AWS App Runner
- **Authentication:** OAuth2 password grant (Bearer tokens)
- **Payments:** Paystack API

### Development Tools
- **Package Manager:** pnpm
- **Build Tool:** Turbopack
- **Linting:** ESLint + TypeScript

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd umukozihr-recruit-client
   ```

2. **Install pnpm (if needed):**
   ```bash
   npm install -g pnpm
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

5. **Start development server:**
   ```bash
   pnpm dev
   ```

6. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
umukozihr-recruit-client/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes (proxy to backend)
│   │   ├── chat/route.ts         # Chat API proxy
│   │   └── search/route.ts       # Search API proxy
│   ├── auth/page.tsx             # Login/Register page
│   ├── payment/page.tsx          # Subscription checkout
│   ├── profile/                  # User dashboard
│   │   ├── page.tsx              # Main profile
│   │   └── [id]/page.tsx         # Candidate profile view
│   ├── results/page.tsx          # Search results
│   ├── search/page.tsx           # Search wizard
│   ├── settings/page.tsx         # User settings
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   ├── chat/                     # AI chat widget
│   ├── profile/                  # Profile page components
│   ├── results/                  # Search results components
│   ├── search/                   # Search wizard components
│   ├── settings/                 # Settings page components
│   │   ├── HelpDocumentation.tsx # In-app user manual
│   │   └── ...
│   ├── ui/                       # shadcn/ui components
│   ├── Navbar.tsx                # Main navigation
│   ├── OnboardingProvider.tsx    # Onboarding context
│   └── OnboardingWizard.tsx      # First-time user wizard
│
├── lib/                          # Utilities and configuration
│   ├── constants/                # App constants
│   ├── api.ts                    # API functions
│   ├── config.ts                 # Environment config
│   └── utils.ts                  # Utility functions
│
├── hooks/                        # Custom React hooks
├── docs/                         # Product documentation
├── .env.local                    # Environment variables (not in git)
├── middleware.ts                 # Next.js middleware
├── tailwind.config.ts            # Tailwind configuration
└── package.json                  # Dependencies
```

---

## Environment Variables

Create a `.env.local` file with the following:

```env
# Backend API URL (AWS App Runner)
NEXT_PUBLIC_API_BASE_URL=https://sppue2hk7i.eu-west-1.awsapprunner.com

# Paystack Payment Integration
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxx
```

---

## API Integration

### Backend Endpoints

The frontend integrates with the following backend API groups:

| Group | Base Path | Description |
|-------|-----------|-------------|
| **Auth** | `/api/v1/auths/*` | Login, logout, refresh tokens, user profile |
| **Users** | `/api/v1/users/*` | Registration, email verification, password reset |
| **Search** | `/api/v1/search/*` | Talent search, results, history, reports |
| **Subscriptions** | `/api/v1/subscriptions/*` | Plans, Paystack integration, billing |
| **Chat** | `/api/v1/chat/*` | AI assistant, conversation history |
| **Agents** | `/api/v1/agents/*` | System status, health checks |
| **Core Signal** | `/api/v1/core-signal/*` | Live LinkedIn data scraping |

### Authentication Flow

1. User submits credentials to `/api/v1/auths/login`
2. Backend returns `access_token` and `refresh_token`
3. Token stored in cookie (`hg_token`)
4. All subsequent requests include `Authorization: Bearer <token>`

---

## Search Modes

The platform supports three search modes:

| Mode | Description | Typical Time |
|------|-------------|--------------|
| **Database** | Searches pre-indexed talent database | 30-60 seconds |
| **Live** | Real-time web scraping (LinkedIn, job boards) | 1-2 minutes |
| **Hybrid** | Combines database + live sources | 1-2 minutes |

### Search API Request

```typescript
{
  criteria: {
    job_titles: ["Software Engineer"],
    skills_keywords: ["Python", "React"],
    location_full: "Accra, Ghana",
    experience_years_min: 2,
    experience_years_max: 8,
  },
  search_mode: "hybrid", // "database" | "live" | "hybrid"
  max_results: 50
}
```

---

## Subscription Tiers

| Tier | Price | Monthly Searches | Features |
|------|-------|------------------|----------|
| **Basic** | Free | 1 | Database search only |
| **Pro** | GHS 3,215/mo | 20 | All search modes, priority support |
| **Business** | GHS 4,291/mo | 30 | All features + analytics + team collaboration |

Payments processed via **Paystack** (Ghana).

---

## Key Components

### OnboardingWizard

First-time user walkthrough with 6 steps:
1. Welcome
2. Talent Search overview
3. Results explanation
4. AI Assistant introduction
5. Subscription plans
6. Getting started

### HelpDocumentation

Comprehensive in-app manual with:
- Searchable documentation
- Quick start guides
- Section-by-section feature explanations
- Troubleshooting guide
- "Replay Tutorial" button

### ChatWidget

AI-powered assistant that can:
- Analyze candidate profiles
- Compare multiple candidates
- Suggest interview questions
- Provide market insights

---

## Development

### Commands

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type check
pnpm type-check
```

### Code Style

- **TypeScript** - Strict mode enabled
- **Tailwind CSS v4** - Use canonical class names (`bg-linear-to-*`, `shrink-0`)
- **Components** - Functional components with hooks
- **API Calls** - Use `apiFetch` from `lib/api.ts`

---

## Deployment

### Recommended Platforms

- **Vercel** (recommended for Next.js)
- **AWS Amplify**
- **Render**

### Build Settings

```
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install
```

### Environment Variables

Set the following in your deployment platform:
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`

---

## Support

- **In-App Help:** Settings → Help & Docs
- **Email:** support@umukozi.com
- **Documentation:** See `docs/` folder

---

## License

Proprietary - UmukoziHR © 2025. All rights reserved.
