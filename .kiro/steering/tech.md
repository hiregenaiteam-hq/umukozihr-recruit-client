# Technology Stack

## Framework & Runtime
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Node.js** - Runtime environment

## Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Headless component primitives for accessibility
- **Lucide React** - Icon library
- **next-themes** - Dark/light mode support
- **Sonner** - Toast notifications

## Form Handling & Validation
- **React Hook Form 7.54.1** - Form state management
- **Zod 3.24.1** - Schema validation
- **@hookform/resolvers** - Form validation integration

## Package Management
- **pnpm** - Fast, disk space efficient package manager

## Build Configuration
- **ESLint & TypeScript errors ignored during builds** (development setup)
- **Image optimization disabled** (unoptimized: true)
- **PostCSS** - CSS processing

## Common Commands

### Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Project Setup
```bash
# Install pnpm globally if needed
npm install -g pnpm

# Clone and setup
git clone <repo>
cd hiregen-ai-webapp
pnpm install
pnpm dev
```

## API Integration
- **Base URL**: Environment configurable (https://agent-architecture.onrender.com/)
- **Authentication**: Bearer token with automatic refresh
- **API Version**: v1 (REST API with OpenAPI 3.1 spec)
- **Content Type**: application/json (form-encoded for auth)
- **Error Handling**: HTTP 422 for validation, 401/403 for auth errors

### Key API Endpoints
- **Auth**: `/api/v1/auths/login`, `/api/v1/auths/refresh`, `/api/v1/auths/logout`
- **Search**: `/api/v1/search/search`, `/api/v1/search/search/{id}/refine`
- **Core Signal**: `/api/v1/core-signal/search-talents`, `/api/v1/core-signal/talents`
- **Users**: `/api/v1/users/`, `/api/v1/users/{id}`
- **Subscriptions**: `/api/v1/subscriptions/me`
- **Chat**: `/api/v1/chat/chat` (progressive enhancement)

### Environment Variables
```bash
NEXT_PUBLIC_API_BASE_URL=https://agent-architecture.onrender.com
NEXT_PUBLIC_USE_LIVE_API=true
NEXT_PUBLIC_CHAT_AGENT_ENABLED=false
```

## Development Notes
- Uses App Router (not Pages Router)
- TypeScript strict mode enabled
- Tailwind configured with custom design system
- Component library based on Radix UI primitives
- Form validation with Zod schemas
- API client with retry logic and caching
- Feature flags for progressive enhancement