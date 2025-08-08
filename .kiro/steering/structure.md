# Project Structure

## Root Directory
```
hiregen-ai-webapp/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
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

## Development Patterns
- Server Components by default (Next.js 13+ App Router)
- Client Components marked with `"use client"`
- Shared utilities in `lib/` directory
- Custom hooks for reusable stateful logic