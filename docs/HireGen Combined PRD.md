# UmukoziHR PRD - AI-First Hiring Platform
## "Hiring shouldn't feel like guesswork"

### Core Product Vision

**The Problem**: Traditional hiring is broken. Companies spend weeks/months sourcing candidates, dealing with agencies that cost tens of thousands, referrals that miss, and candidates that oversell. It's gambling with your most critical business decisions.

**The Solution**: UmukoziHR uses a swarm of AI agents to eliminate the guesswork. Describe what you need in plain English, and our AI finds, scores, and presents the top 1% of talent in minutes, not weeks.

**Key Differentiator**: No forms, no job description templates, no ATS complexity. Just natural language input and AI-powered results.

---

## Product Positioning

### Target Users
- **HR Managers**: Tired of agency costs and endless sourcing
- **Startup Founders**: Need quality hires fast, can't afford mistakes
- **HR Firms**: Want to 10x their efficiency and win rates
- **Fortune 500**: Scale hiring without scaling headcount

### Value Proposition
1. **Speed**: Minutes to results, not weeks of sourcing
2. **Quality**: AI-scored top 1% candidates, not random resumes
3. **Truth**: Real profiles, real skills, real availability
4. **Simplicity**: Natural language input, no forms or jargon

---

## User Journey & Page Flow

### Primary Flow: Discovery to Hire
```
Auth → Search → Results → Profile → [Convert]
```

### Secondary Flows:
- **Settings**: Manage preferences, billing, integrations
- **Payment**: Upgrade plans, usage tracking

---

## Page-by-Page Specification

### 1. Authentication (`/auth`)
**Purpose**: Frictionless entry into the AI-powered hiring world

**Design Philosophy**: 
- Clean, confidence-inspiring
- No overwhelming feature lists
- Focus on the core promise: "End hiring guesswork"

**Layout**:
- **Canvas**: Full viewport with subtle animated background
- **Hero Message**: "Hiring shouldn't feel like guesswork"
- **Subtext**: "Describe what you need. Our AI finds the top 1% talent in minutes."
- **Auth Modal**: Centered, 400px width, minimal fields
- **Social Proof**: "Used by 500+ companies" with logos

**Visual Elements**:
- **Background**: Subtle gradient with floating geometric shapes (representing AI agents)
- **Logo**: UmukoziHR wordmark with AI-inspired accent
- **CTA**: "Start Finding Talent" (not "Sign Up")
- **Testimonial**: Single rotating quote from real users

**Micro-interactions**:
- Background shapes gently move/rotate
- Logo appears with subtle AI-like "thinking" animation
- Success state shows brief "AI agents activating..." message

---

### 2. Search (`/search`)
**Purpose**: Transform hiring intent into AI-powered action

**Core Principle**: Make the complex simple. One input field replaces entire job boards.

**Layout Architecture**:
- **Header**: Clean, minimal - UmukoziHR logo + user avatar
- **Main Focus**: Large, prominent search interface
- **Secondary**: Optional filters (collapsed by default)

**The Search Interface**:
- **Primary Input**: 
  - Large textarea (full width, 120px height)
  - Placeholder: "Describe who you're looking for... (e.g., 'Need a senior React developer who's built e-commerce platforms and can lead a team')"
  - Character count: Encouraging, not limiting
  - Auto-resize as user types

- **AI Status Indicator**: 
  - Shows "AI agents listening..." as they type
  - Real-time suggestions appear below input
  - "Understanding your needs..." feedback

- **Smart Suggestions**:
  - AI-generated example searches based on user's industry
  - "Try: 'DevOps engineer with Kubernetes experience for a fintech startup'"
  - Learn from user's previous searches

**Optional Filters** (Expandable):
- **Location**: Smart city/remote detection
- **Experience Level**: Slider, not rigid categories
- **Salary Range**: Optional, AI can infer from role description
- **Availability**: "Actively looking" vs "Open to opportunities"

**Search Button**:
- Large, prominent: "Find Top Talent"
- Shows estimated time: "Results in ~30 seconds"
- Loading state: "AI agents sourcing..." with progress dots

**Right Side (Desktop)**:
- **How It Works**: Brief 3-step visual
- **Recent Searches**: Quick access to previous queries
- **Success Stories**: Rotating mini-testimonials

---

### 3. Results (`/results`)
**Purpose**: Present AI-curated talent with confidence and transparency

**Layout**:
- **Header**: Search query prominently displayed, edit button
- **AI Summary**: Brief explanation of search strategy
- **Results Grid**: Card-based layout with clear hierarchy

**AI Transparency Panel**:
- "Here's how I found these candidates..."
- Shows search strategy: "Analyzed 50,000 profiles, scored by: technical skills (40%), leadership experience (30%), cultural fit (30%)"
- Confidence level: "High confidence in top 10 matches"

**Candidate Card Design**:
- **Layout**: Photo, name, current role, company, location
- **AI Score**: Prominent circular progress (not just percentage)
- **Score Breakdown**: Hover reveals why they scored high
- **Key Highlights**: AI-generated bullets of why they're a match
- **Status**: "Actively looking" / "Open to opportunities" / "Passive"

**AI Score Visualization**:
- **Overall Match**: Large circular progress, color-coded (90%+ green, 70-89% blue, 50-69% orange)
- **Breakdown**: Small progress bars for Technical, Experience, Culture fit
- **Confidence**: "High/Medium/Low AI confidence" indicator

**Results Actions**:
- **View Profile**: Primary action
- **Quick Message**: AI-generated intro template
- **Save**: Add to lists/projects
- **Pass**: Improve AI learning

**Infinite Scroll**:
- Loads 20 candidates initially
- "Found 247 more candidates..." with load more
- AI keeps scoring in background

**Search Refinement**:
- "Too senior?" / "Need more experience?" quick filters
- "Refine search" reopens search interface with current query
- AI suggests modifications: "Try: 'React developer with 3-5 years experience'"

---

### 4. Profile View (`/profile/:id`)
**Purpose**: Complete candidate intelligence powered by AI aggregation

**Hero Section**:
- **Full Background**: Subtle gradient, professional feel
- **Profile Image**: Large, centered (or professional placeholder)
- **Name & Title**: Prominent, current role highlighted
- **AI Match Score**: Large, prominent with breakdown
- **Quick Actions**: Message, Save, Share, Flag

**AI Intelligence Summary**:
- **Why They're a Match**: AI-generated paragraph explaining fit
- **Confidence Level**: How certain the AI is about this match
- **Key Strengths**: Bullet points of standout qualities
- **Potential Concerns**: Honest assessment of potential gaps

**Profile Sections**:

1. **Professional Summary**:
   - AI-aggregated from multiple sources
   - Not just LinkedIn - enriched from GitHub, personal sites, etc.
   - Highlighted keywords matching search intent

2. **Experience Deep-Dive**:
   - Timeline view with key achievements
   - AI-identified relevant projects/accomplishments
   - Technology stack evolution over time
   - Leadership/team experience highlighted

3. **Technical Profile** (for technical roles):
   - Skills matrix with proficiency levels
   - Project portfolio (if available)
   - GitHub activity summary
   - Technology preferences and expertise

4. **Cultural Fit Indicators**:
   - Work style preferences
   - Company size/stage preferences
   - Values alignment (inferred from public content)
   - Communication style

5. **Availability & Preferences**:
   - Job search status
   - Preferred role types
   - Compensation expectations (if available)
   - Location preferences

**Contact & Outreach**:
- **Smart Outreach**: AI-generated personalized message templates
- **Contact Methods**: Email, LinkedIn, etc. (respecting privacy)
- **Timing Intelligence**: Best time to reach out based on activity
- **Success Probability**: AI prediction of response likelihood

**Similar Candidates**:
- "Candidates with similar profiles"
- Quick comparison view
- "Also consider" recommendations

---

### 5. Settings (`/settings`)
**Purpose**: Control AI behavior and platform preferences

**Tab Structure**:
- **Search Preferences**: How AI should behave
- **Account**: Profile and billing
- **Integrations**: Connect with existing tools
- **Usage**: Track searches and limits

**Search Preferences**:
- **AI Aggressiveness**: Conservative vs Aggressive sourcing
- **Diversity Priorities**: Emphasize diverse candidate pools
- **Experience Weighting**: Prefer senior vs mid-level vs junior
- **Location Flexibility**: Remote vs on-site preferences
- **Industry Focus**: Preferred sectors/company types

**Account Management**:
- **Profile**: Company info, hiring focus areas
- **Team**: Add team members, role permissions
- **Billing**: Current plan, usage tracking
- **API Access**: For integrations

**Integrations**:
- **ATS Connections**: Push candidates to existing systems
- **Slack/Teams**: Notifications and sharing
- **Calendar**: Schedule interviews directly
- **Email**: Outreach tools integration

**Usage Dashboard**:
- **Searches This Month**: Progress toward limits
- **Success Metrics**: Hires made, response rates
- **AI Performance**: How well searches are matching intent
- **Cost Tracking**: Per-search costs, monthly spend

---

### 6. Payment (`/payment`)
**Purpose**: Transparent pricing tied to real value

**Layout**:
- **Split View**: Plans on left, summary on right
- **Value Focus**: Cost per hire vs traditional methods

**Pricing Strategy**:
- **Per-Search Model**: Pay for what you use
- **Monthly Plans**: Bulk discounts for regular users
- **Enterprise**: Custom pricing for high volume

**Plan Comparison**:
- **Starter**: 10 searches/month, basic profiles
- **Professional**: 50 searches/month, full profiles, team sharing
- **Enterprise**: Unlimited searches, API access, custom integrations

**Value Messaging**:
- "Replace $50,000 agency fees with $500/month"
- "Cost per hire: $200 vs $15,000 traditional"
- "ROI Calculator": Show savings vs current methods

**Payment UX**:
- **Stripe Integration**: Modern, secure payment
- **Invoice Options**: For enterprise customers
- **Usage-Based**: Add credits as needed
- **Refund Policy**: Risk-free trial period

---

## Design System & Visual Language

### Brand Identity
**Mission**: Make hiring feel like science, not guesswork

**Visual DNA**:
- **Primary**: UmukoziHR Blue (#4285F4) - Intelligence, trust, precision
- **Secondary**: 
  - Success Green (#00C853) - Successful hires, positive outcomes
  - Warning Amber (#FF8F00) - Attention, urgency in hiring
  - AI Purple (#6B46C1) - AI intelligence, advanced technology
- **Neutrals**: Clean grays for professional, enterprise feel

**Typography**:
- **Headlines**: SF Pro Display - Apple's premium, authoritative
- **Body**: Inter - Modern, highly legible for data-heavy interfaces
- **Technical**: SF Mono - Code, data, technical specifications

### Component System

**AI-First Components**:
- **AI Score Rings**: Circular progress with confidence indicators
- **Intelligence Cards**: Surfacing AI insights and reasoning
- **Search Suggestions**: Smart, contextual recommendations
- **Loading States**: "AI agents working..." with progress indication

**Interaction Patterns**:
- **Hover States**: Reveal AI reasoning and additional context
- **Progressive Disclosure**: Show complexity only when needed
- **Micro-feedback**: Immediate response to user actions
- **Confidence Indicators**: Always show AI certainty levels

### Animation Philosophy
**Principle**: Subtle intelligence, not flashy effects

**Core Animations**:
- **AI Thinking**: Gentle pulse/breathing effects during processing
- **Data Loading**: Smooth reveals that feel intelligent
- **Score Animations**: Circular progress that builds confidence
- **Card Transitions**: Smooth, responsive, professional

---

## Technical Considerations

### Performance Targets
- **Search Results**: < 30 seconds for initial results
- **Profile Loading**: < 2 seconds for full enriched profiles
- **Page Interactions**: < 100ms response time
- **AI Processing**: Real-time feedback during search

### AI Integration Points
- **Search Processing**: Natural language → structured queries
- **Candidate Scoring**: Multi-factor AI evaluation
- **Profile Enrichment**: Data aggregation from multiple sources
- **Personalization**: Learning from user behavior and preferences

### Privacy & Ethics
- **Data Sources**: Only publicly available information
- **Candidate Consent**: Clear opt-out mechanisms
- **Bias Detection**: AI monitoring for fair representation
- **Transparency**: Always explain AI decision-making

---

## Success Metrics

### Core KPIs
- **Time to Results**: Average seconds from search to quality candidates
- **Search Success Rate**: % of searches that lead to candidate contact
- **Hire Conversion**: % of contacted candidates who get hired
- **User Satisfaction**: Net Promoter Score, retention rates

### AI Performance Metrics
- **Match Accuracy**: How well AI scores correlate with user feedback
- **Search Quality**: Relevance of results to search intent
- **Profile Completeness**: % of profiles with comprehensive data
- **Prediction Accuracy**: How well AI predicts candidate interest/fit

---

## Competitive Advantage

### vs Traditional Agencies
- **Speed**: Minutes vs weeks
- **Cost**: Hundreds vs thousands
- **Quality**: AI-scored vs random outreach
- **Transparency**: Clear reasoning vs black box

### vs Job Boards
- **Proactive**: AI finds candidates vs waiting for applications
- **Quality**: Pre-screened vs unfiltered
- **Fit**: Intelligent matching vs keyword search
- **Availability**: Real-time status vs outdated profiles

### vs ATS Systems
- **Simplicity**: Natural language vs complex forms
- **Intelligence**: AI insights vs manual screening
- **Speed**: Instant results vs lengthy processes
- **Focus**: Hiring optimization vs process management

---

This PRD represents a fundamental shift from traditional hiring tools to AI-first candidate discovery. Every interaction reinforces the core message: hiring should be intelligent, fast, and confident - not guesswork.




# UmukoziHR Frontend PRD
## The Magic of Effortless Hiring

### Core Philosophy & Brand DNA

**Brand Promise**: "Hiring shouldn't feel like guesswork" - Every pixel reinforces effortless intelligence, instant clarity, and inevitable success.

**The Psychology**: We're not building software - we're crafting a sanctuary where overwhelmed hiring managers find peace, clarity, and confidence. Every interaction should feel like having a brilliant assistant who just *gets it*.

**Visual DNA**:
- **Primary**: UmukoziHR Blue (#4285F4) - The color of trust and intelligence
- **Secondary Palette**: 
  - Deep Sapphire (#1A237E) - Authority without aggression
  - Whisper Gray (#F8F9FA) - Calm, breathable space
  - Charcoal (#212529) - Sophisticated text
  - Success Mint (#00C853) - Gentle celebration
  - Warm Amber (#FF8F00) - Thoughtful attention
- **Typography**: 
  - Headlines: SF Pro Display (Apple's confidence)
  - Body: Inter (Human-readable perfection)
  - UI Elements: SF Pro Text (Familiar precision)
  - Code/Data: SF Mono (Technical trust)

**Motion Philosophy**: Every animation breathes. Nothing snaps, everything flows. Micro-interactions feel like gentle conversations, not mechanical responses.

---

## User Journey & Flow

**The Magic Moment**: 
1. Land → See the promise: "Just describe who you need"
2. Auth → Seamless, no friction
3. Search → Natural language input feels like talking to a smart friend
4. Results → Watch AI agents work their magic in real-time
5. Profile → Enriched, intelligent candidate insights
6. Connect → Effortless outreach orchestration

---

## Page-by-Page Pixel-Perfect Specification

### 1. Authentication (`/auth`)

**The First Impression - Absolute Serenity**

**Canvas Architecture**:
- **Viewport**: 100vw × 100vh, no scroll
- **Background**: Subtle radial gradient from #FAFBFC (center) to #F1F3F4 (edges)
- **Floating Elements**: 3 abstract geometric shapes (opacity 0.02), slow ambient motion
- **Modal Container**: 420px × auto, perfectly centered, floating 8px above background

**Authentication Card**:
- **Dimensions**: 420px width × dynamic height
- **Background**: Pure white (#FFFFFF) with subtle shadow (0 32px 64px rgba(0,0,0,0.08))
- **Border Radius**: 24px (premium, soft)
- **Internal Spacing**: 48px top/bottom, 40px left/right

**Logo & Brand Moment**:
- **UmukoziHR Logo**: 72px height, centered, 56px from top
- **Brand Promise**: "Hiring shouldn't feel like guesswork"
  - Font: Inter, 18px, #6C757D
  - Line Height: 1.5
  - Positioned 24px below logo
  - Letter Spacing: -0.01em (subtle tightening)

**Toggle Control** (Sign In / Sign Up):
- **Container**: 280px width, 52px height, centered
- **Background**: #F8F9FA with 1px border #E9ECEF
- **Border Radius**: 26px (pill-shaped perfection)
- **Active State**: #4285F4 background, white text, smooth 200ms transition
- **Typography**: SF Pro Text, 16px, Medium weight
- **Spacing**: 32px below brand promise

**Input Fields**:
- **Dimensions**: 340px width × 60px height
- **Spacing**: 20px vertical gap between fields
- **Border**: 1.5px solid #E9ECEF, radius 16px
- **Focus State**: 2px solid #4285F4, soft glow (0 0 0 4px rgba(66,133,244,0.1))
- **Padding**: 20px horizontal, 18px vertical
- **Placeholder**: 
  - Text: Inter, 16px, #9CA3AF
  - Examples: "your@email.com", "Create a secure password"
- **Active Text**: Inter, 16px, #212529, -0.01em letter spacing

**Primary CTA**:
- **Text**: "Continue with UmukoziHR"
- **Dimensions**: 340px width × 56px height
- **Background**: Linear gradient 135deg from #4285F4 to #1A237E
- **Typography**: SF Pro Display, 17px, Semibold, White
- **Border Radius**: 16px
- **Spacing**: 32px above from last input
- **Hover**: Lift 2px, shadow expansion, 150ms ease-out
- **Active**: Scale 0.98, 100ms ease-out

**Micro-Interactions**:
- **Entry Animation**: Logo scales from 0.9 to 1.0 over 600ms with gentle bounce
- **Input Focus**: Border color transition 200ms, label float animation
- **Error States**: Gentle shake (4px amplitude, 400ms) + red border
- **Success**: Subtle green checkmark animation in input

---

### 2. Search Page (`/search`)

**The Magic Begins - Natural Language Power**

**Layout Architecture**:
- **Header**: 88px height, background blur effect
- **Main Content**: Single column, 800px max width, centered
- **Vertical Rhythm**: 32px base spacing unit throughout

**Header Specification**:
- **Background**: rgba(255,255,255,0.8) with backdrop-blur(20px)
- **UmukoziHR Logo**: 44px height, 32px from left
- **User Avatar**: 44px diameter, 32px from right, subtle shadow
- **Border**: 1px solid rgba(0,0,0,0.05) on bottom

**Hero Section**:
- **Spacing**: 80px from header, 64px bottom margin
- **Headline**: "Just describe who you need"
  - Font: SF Pro Display, 48px, Bold
  - Color: #212529
  - Line Height: 1.1
  - Letter Spacing: -0.02em
- **Subheadline**: "Our AI agents will find, score, and deliver the perfect candidates in minutes"
  - Font: Inter, 22px, Regular
  - Color: #6C757D
  - Line Height: 1.5
  - Spacing: 16px below headline

**Natural Language Input**:
- **Container**: 100% width, minimum 200px height
- **Background**: Pure white with subtle border (1px solid #E9ECEF)
- **Border Radius**: 20px
- **Padding**: 32px all sides
- **Focus Ring**: 2px solid #4285F4 with 8px glow
- **Placeholder**: 
  - Text: "Tell us about your ideal candidate..."
  - Examples below: "I need a senior React developer with 5+ years experience who's worked at startups..."
  - Font: Inter, 18px, #9CA3AF
- **Active Text**: Inter, 18px, #212529, line-height 1.6

**AI Intelligence Indicators**:
- **Real-time Suggestions**: Floating pills below input
  - Background: #F8F9FA
  - Border: 1px solid #E9ECEF
  - Padding: 8px 16px
  - Font: Inter, 14px, #6C757D
  - Hover: #4285F4 background, white text
- **Character Intelligence**: Smart suggestions appear as you type
- **Language Detection**: Subtle indicator for non-English descriptions

**Search CTA**:
- **Text**: "Find My Candidates"
- **Dimensions**: 240px width × 56px height, centered
- **Background**: Linear gradient from #4285F4 to #1A237E
- **Typography**: SF Pro Display, 17px, Semibold, White
- **Icon**: Sparkles icon (20px) on left, 12px spacing
- **Spacing**: 40px above from input
- **Disabled State**: #E9ECEF background, #9CA3AF text
- **Loading State**: Animated gradient + "AI Agents Working..."

**Trust Signals**:
- **Stats Row**: Centered below CTA
  - "10,000+ profiles analyzed"
  - "98% accuracy rate"
  - "Average 3 minutes to results"
  - Font: Inter, 14px, #6C757D
  - Spacing: 32px gaps between stats

---

### 3. Results Page (`/results`)

**The Magic Happens - AI Agents in Action**

**Layout Architecture**:
- **Header**: Same as search page with breadcrumb
- **Loading State**: Full-screen AI agent visualization
- **Results Layout**: Two-column, 480px + 400px with 32px gap

**AI Agent Loading Experience**:
- **Background**: Subtle gradient overlay
- **Agent Visualization**: 
  - 3 floating orbs representing AI agents
  - Smooth orbital motion around central "candidate pool"
  - Colors: #4285F4, #00C853, #FF8F00 (each agent has specialty)
- **Status Messages**: 
  - "Analyzing 50,000+ profiles..."
  - "Scoring candidates against your criteria..."
  - "Ranking top 1% matches..."
  - Font: Inter, 18px, #212529
  - Fade in/out transitions, 2s intervals

**Results Header**:
- **Count**: "Found 47 exceptional candidates"
  - Font: SF Pro Display, 28px, Bold, #212529
- **Timing**: "Completed in 2 minutes 34 seconds"
  - Font: Inter, 16px, #6C757D
  - Icon: Stopwatch (16px) with 8px left margin
- **Filters**: Horizontal pills for refinement
  - "Top 10%", "Available Now", "Remote OK"
  - Background: #F8F9FA, active: #4285F4

**Candidate Cards**:
- **Dimensions**: 460px width × 180px height
- **Background**: White with 1px border #E9ECEF
- **Border Radius**: 20px
- **Padding**: 24px
- **Spacing**: 16px vertical gaps
- **Hover**: Lift 4px, shadow expansion, 200ms ease-out

**Card Layout**:
- **Avatar**: 80px diameter, left-aligned
- **Name**: SF Pro Display, 20px, Bold, #212529
- **Title**: Inter, 16px, #6C757D, 4px below name
- **Company**: Inter, 14px, #6C757D, 2px below title
- **AI Score**: 
  - Circular progress: 64px diameter, top-right
  - Progress: 6px stroke, #4285F4 fill
  - Percentage: SF Pro Display, 18px, Bold, centered
  - Label: "AI Match" below, Inter, 12px, #6C757D

**Skills Tags**:
- **Layout**: Horizontal flow, 8px gaps
- **Style**: 6px padding vertical, 12px horizontal
- **Background**: #F8F9FA
- **Border**: 1px solid #E9ECEF
- **Radius**: 12px
- **Font**: Inter, 12px, #6C757D
- **Highlight**: Top 3 skills get #4285F4 background, white text

**Right Panel Preview**:
- **Sticky Position**: Top 24px from viewport
- **Background**: #F8F9FA
- **Border Radius**: 20px
- **Padding**: 32px
- **Empty State**: 
  - Icon: Cursor pointer (48px)
  - Text: "Click any candidate to preview"
  - Font: Inter, 16px, #6C757D

**Preview Content** (when candidate selected):
- **Large Avatar**: 120px diameter, centered
- **Name**: SF Pro Display, 24px, Bold, #212529
- **Title**: Inter, 18px, #6C757D
- **Quick Stats**: 2×2 grid
  - Experience: "8 years"
  - Location: "San Francisco"
  - Availability: "2 weeks"
  - Salary: "$160-180k"
- **Action Buttons**:
  - "View Full Profile": Primary style
  - "Start Conversation": Secondary style
  - "Save to Folder": Tertiary style

---

### 4. Profile View (`/profile/:id`)

**The Complete Picture - AI-Enriched Intelligence**

**Hero Section**:
- **Height**: 400px
- **Background**: Subtle gradient from #4285F4 to #1A237E
- **Overlay**: rgba(0,0,0,0.2) for text legibility
- **Profile Avatar**: 200px diameter, centered, 6px white border
- **Name**: SF Pro Display, 42px, Bold, White
- **Current Role**: Inter, 24px, rgba(255,255,255,0.9)
- **Location**: Inter, 18px, rgba(255,255,255,0.7)
- **AI Match Score**: 
  - Large circular progress: 120px diameter
  - Position: Top-right, 40px from edges
  - White stroke, animated on page load

**Action Bar** (floating over hero):
- **Background**: rgba(255,255,255,0.15) with backdrop-blur(20px)
- **Border**: 1px solid rgba(255,255,255,0.2)
- **Radius**: 16px
- **Padding**: 16px 24px
- **Buttons**: 
  - "Message": Primary white button
  - "Save": Secondary outline button
  - "Share": Tertiary text button
  - Spacing: 12px gaps

**Content Section**:
- **Max Width**: 1000px, centered
- **Margin**: 64px top, 32px sides
- **Grid**: 2/3 main content, 1/3 sidebar

**AI Summary Card**:
- **Background**: White with subtle shadow
- **Border Radius**: 20px
- **Padding**: 32px
- **Header**: 
  - "AI Analysis" with sparkles icon
  - Font: SF Pro Display, 20px, Bold, #212529
- **Content**: 
  - Smart summary of candidate fit
  - Font: Inter, 16px, #6C757D, line-height 1.7
  - Highlighted keywords in #4285F4

**Experience Timeline**:
- **Vertical Line**: 2px solid #E9ECEF, left-aligned
- **Nodes**: 12px circles, #4285F4 fill
- **Cards**: 
  - Background: #F8F9FA
  - Border: 1px solid #E9ECEF
  - Radius: 16px
  - Padding: 24px
  - Connected to timeline with 2px lines

**Skills Matrix**:
- **Grid**: 3 columns on desktop
- **Skill Cards**:
  - Background: White
  - Border: 1px solid #E9ECEF
  - Radius: 16px
  - Padding: 20px
  - Skill name: SF Pro Text, 16px, Bold
  - Proficiency bar: 8px height, rounded
  - Years: Inter, 14px, #6C757D

**Sidebar Elements**:
- **Contact Card**: 
  - White background, 20px radius
  - Copyable elements with click feedback
  - Icons: 20px, #4285F4
- **Similar Candidates**: 
  - Mini cards with avatars
  - "View Profile" links
  - Hover effects

---

### 5. Settings Page (`/settings`)

**Control Center - Elegant Simplicity**

**Layout Architecture**:
- **Tab Navigation**: 80px height, sticky top
- **Content Area**: 900px max width, centered
- **Sidebar**: 240px width, secondary navigation

**Tab Design**:
- **Background**: White with bottom border #E9ECEF
- **Tab Items**:
  - Padding: 24px horizontal, 28px vertical
  - Font: Inter, 16px, #6C757D
  - Active: #4285F4 text, 3px bottom border
  - Hover: #F8F9FA background, 200ms transition

**Account Settings**:
- **Profile Photo**:
  - Upload zone: 200px square, dashed border
  - Drag state: #4285F4 border, background tint
  - Preview: Circular crop with edit overlay
- **Form Fields**:
  - Same styling as auth page
  - Two-column layout on desktop
  - Real-time validation feedback

**Preferences**:
- **Toggle Switches**:
  - Custom design: 56px width, 32px height
  - Track: #E9ECEF inactive, #4285F4 active
  - Thumb: 28px diameter, white with shadow
  - Smooth slide animation: 200ms ease-out
- **Notification Groups**:
  - Collapsible sections
  - Clear hierarchy with consistent spacing

**Billing**:
- **Current Plan Card**:
  - Highlighted with #4285F4 border
  - Usage meters: Progress bars with labels
  - Upgrade CTAs: Prominent but not pushy
- **Payment Methods**:
  - Credit card visualization
  - Masked numbers with brand detection
  - Edit/delete micro-interactions

---

### 6. Payment Page (`/payment`)

**Seamless Transaction - Trust Through Design**

**Layout Architecture**:
- **Split Screen**: 55% form, 45% summary
- **Form Section**: 640px max width
- **Summary**: Sticky positioning, elegant card

**Plan Selection**:
- **Cards**: 320px width × 440px height
- **Spacing**: 24px gaps
- **Design**:
  - Border: 2px solid #E9ECEF
  - Selected: 2px solid #4285F4 with glow
  - Hover: Subtle lift and shadow
  - Popular: #00C853 corner ribbon

**Payment Form**:
- **Credit Card Field**:
  - Single intelligent input
  - Real-time formatting and validation
  - Card type icons with smooth transitions
  - Error states: Red border + message
- **Security Indicators**:
  - SSL badge placement
  - Trust signals without clutter
  - Subtle security iconography

**Order Summary**:
- **Background**: #F8F9FA
- **Border**: 1px solid #E9ECEF
- **Radius**: 20px
- **Padding**: 32px
- **Price Breakdown**:
  - Clear line items
  - Prominent total with larger font
  - Tax calculations if applicable

**Success State**:
- **Celebration**: Subtle confetti animation
- **Confirmation**:
  - Large success icon (#00C853)
  - "Welcome to UmukoziHR!" headline
  - Clear next steps with CTAs
  - Smooth transition from payment form

---

## Global Design System

### Animation & Motion

**Easing Functions**:
- **Ease-out**: cubic-bezier(0.25, 0.46, 0.45, 0.94) - Natural deceleration
- **Ease-in-out**: cubic-bezier(0.42, 0, 0.58, 1) - Smooth both ways
- **Bounce**: cubic-bezier(0.68, -0.55, 0.265, 1.55) - Playful feedback

**Timing Scale**:
- **Instant**: 100ms - Button presses, toggles
- **Quick**: 200ms - Hover states, focus rings
- **Standard**: 300ms - Card animations, modal open
- **Slow**: 500ms - Page transitions, complex animations
- **Glacial**: 800ms - Loading states, progress indicators

**Micro-Interactions**:
- **Button Hover**: Scale 1.02, lift 2px, 150ms ease-out
- **Card Hover**: Lift 4px, shadow expansion, 200ms ease-out
- **Input Focus**: Border color change, glow appear, 200ms ease-out
- **Loading States**: Gentle pulse, 1.5s ease-in-out infinite

### Typography Scale

**Size Scale** (based on 1.25 ratio):
- **Hero**: 48px / 3rem
- **H1**: 36px / 2.25rem
- **H2**: 28px / 1.75rem
- **H3**: 24px / 1.5rem
- **H4**: 20px / 1.25rem
- **Body**: 16px / 1rem
- **Small**: 14px / 0.875rem
- **Caption**: 12px / 0.75rem

**Line Heights**:
- **Headlines**: 1.1 - 1.2
- **Body Text**: 1.6 - 1.8
- **UI Elements**: 1.4 - 1.5
- **Dense Text**: 1.5

**Letter Spacing**:
- **Large Headlines**: -0.02em
- **Body Text**: -0.01em
- **UI Elements**: 0
- **All Caps**: 0.05em

### Color Psychology

**Primary Blue (#4285F4)**:
- **Usage**: CTAs, links, progress, selection
- **Psychology**: Trust, intelligence, dependability
- **Accessibility**: 4.5:1 contrast on white

**Deep Sapphire (#1A237E)**:
- **Usage**: Gradients, authority elements, headers
- **Psychology**: Expertise, premium quality
- **Accessibility**: 7:1 contrast on white

**Success Mint (#00C853)**:
- **Usage**: Confirmations, positive feedback, completion
- **Psychology**: Achievement, growth, success
- **Accessibility**: 4.5:1 contrast on white

**Warm Amber (#FF8F00)**:
- **Usage**: Warnings, attention, highlights
- **Psychology**: Optimism, energy, focus
- **Accessibility**: 4.5:1 contrast on white

### Spacing System

**Base Unit**: 8px (0.5rem)

**Scale**:
- **2px**: Borders, dividers
- **4px**: Tight spacing, small gaps
- **8px**: Base unit, element spacing
- **16px**: Component spacing, padding
- **24px**: Section spacing, margins
- **32px**: Layout spacing, major gaps
- **48px**: Page sections, hero spacing
- **64px**: Major layout breaks
- **96px**: Page-level spacing

### Component Library

**Buttons**:
- **Primary**: Gradient background, white text, 16px radius
- **Secondary**: White background, blue border, blue text
- **Tertiary**: Transparent background, blue text, underline on hover
- **Sizes**: 
  - Small: 32px height, 12px padding
  - Medium: 40px height, 16px padding
  - Large: 48px height, 20px padding
  - Hero: 56px height, 24px padding

**Cards**:
- **Default**: White background, 1px border #E9ECEF, 16px radius
- **Elevated**: White background, shadow, 20px radius
- **Interactive**: Hover lift, shadow expansion, 200ms transition

**Form Elements**:
- **Input**: 56px height, 16px radius, 18px padding
- **Focus**: 2px solid #4285F4, 4px glow
- **Error**: 2px solid #DC3545, red glow
- **Success**: 2px solid #00C853, green glow

### Responsive Design

**Breakpoints**:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large**: 1440px+

**Mobile-First Approach**:
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions (44px minimum)
- Readable typography (16px minimum)

### Accessibility Excellence

**WCAG 2.1 AA Compliance**:
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Management**: Visible focus indicators, logical tab order
- **Semantic HTML**: Proper heading hierarchy, landmark regions
- **Alt Text**: Descriptive text for all images
- **Keyboard Navigation**: All interactive elements accessible

**Inclusive Design**:
- **Reduced Motion**: Respect prefers-reduced-motion
- **High Contrast**: Support for high contrast modes
- **Screen Readers**: ARIA labels, live regions for dynamic content
- **Color Blindness**: Don't rely on color alone for meaning

---

## Performance & Technical Excellence

### Loading Performance

**Critical Metrics**:
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.0s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1

**Optimization Strategy**:
- **Critical CSS**: Inline above-the-fold styles
- **Image Optimization**: WebP with fallbacks, lazy loading
- **Font Loading**: Preload critical fonts, font-display: swap
- **JavaScript**: Code splitting, lazy loading, tree shaking

### Browser Support

**Target Browsers**:
- **Chrome**: Last 2 versions (>95% coverage)
- **Safari**: Last 2 versions (iOS and desktop)
- **Firefox**: Last 2 versions
- **Edge**: Last 2 versions

**Progressive Enhancement**:
- **CSS Grid**: With flexbox fallback
- **Modern CSS**: With appropriate fallbacks
- **JavaScript**: Core functionality without JS
- **Feature Detection**: Not browser detection

---

This PRD represents the obsessive attention to detail that creates magical user experiences. Every pixel, every transition, every word is carefully crafted to make hiring feel effortless and intelligent. The interface doesn't just work—it delights, reassures, and empowers users to make confident hiring decisions.