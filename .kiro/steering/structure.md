# Project Structure

## Root Directory
```
hiregen-ai-webapp/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
│   ├── api/                # API client and services
│   ├── store/              # State management
│   ├── types/              # TypeScript type definitions
│   └── config/             # Configuration and feature flags
├── public/                 # Static assets
├── styles/                 # Global styles
└── docs/                   # Project documentation
```

## App Directory (Next.js App Router)
```
app/
├── layout.tsx              # Root layout component
├── page.tsx                # Home page (redirects to /auth)
├── globals.css             # Global styles
├── auth/                   # Authentication pages
├── search/                 # Search interface
├── results/                # Search results display
├── profile/                # Candidate profile pages
├── settings/               # User settings
└── payment/                # Payment and billing
```

## Components Structure
```
components/
├── ui/                     # Base UI components (Radix-based)
├── Navbar.tsx              # Navigation component
└── theme-provider.tsx      # Theme context provider
```

## Key Files
- **app/layout.tsx** - Root layout with metadata and global providers
- **components/Navbar.tsx** - Main navigation with HireGen branding
- **tailwind.config.ts** - Tailwind configuration with custom design system
- **package.json** - Dependencies and scripts
- **tsconfig.json** - TypeScript configuration

## Naming Conventions
- **Pages**: Use route-based naming in `app/` directory
- **Components**: PascalCase for component files
- **Utilities**: camelCase in `lib/` directory
- **Types**: Define in component files or separate `.types.ts` files

## Routing
- Uses Next.js App Router (file-based routing)
- Dynamic routes: `[id]` for parameters
- Route groups: `(auth)` for organization without affecting URL structure
- Nested layouts supported through `layout.tsx` files

## Asset Organization
- **public/**: Static images and assets
- **styles/**: Global CSS files
- **components/ui/**: Reusable UI primitives
- **hooks/**: Custom React hooks for shared logic

## API Integration Structure
```
lib/api/
├── client.ts               # Main API client configuration
├── auth.ts                 # Authentication manager
├── services/               # Service-specific API methods
│   ├── search.ts           # Search API endpoints
│   ├── users.ts            # User management endpoints
│   ├── subscriptions.ts    # Subscription endpoints
│   ├── coreSignal.ts       # Core Signal (LinkedIn) endpoints
│   ├── chat.ts             # Chat agent endpoints
│   └── monitoring.ts       # System monitoring endpoints
├── types/                  # API response types
├── cache.ts                # Request caching and deduplication
├── errors.ts               # Error handling and classification
└── mock/                   # Mock data for development
```

## State Management Structure
```
lib/store/
├── index.ts                # Store configuration
├── slices/                 # State slices
│   ├── auth.ts             # Authentication state
│   ├── search.ts           # Search state and results
│   ├── candidates.ts       # Candidate data
│   └── ui.ts               # UI state (loading, errors)
└── middleware/             # Store middleware (persistence, etc.)
```

## Custom Hooks Structure
```
hooks/
├── useAuth.ts              # Authentication hook
├── useSearch.ts            # Search functionality hook
├── useChat.ts              # Chat agent hook
├── useSubscription.ts      # Subscription management hook
├── useCandidates.ts        # Candidate data hook
└── api/                    # API-specific hooks
    ├── useSearchQuery.ts   # Search API queries
    ├── useUserQuery.ts     # User API queries
    └── useCacheQuery.ts    # Cache management queries
```

## Development Patterns
- Server Components by default (Next.js 13+ App Router)
- Client Components marked with `"use client"`
- Shared utilities in `lib/` directory
- Custom hooks for reusable stateful logic
- API client with automatic retry and error handling
- Progressive enhancement with feature flags
- Mock data fallbacks for development
- Type-safe API responses with generated TypeScript types