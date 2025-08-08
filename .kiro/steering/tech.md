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

## Development Notes
- Uses App Router (not Pages Router)
- TypeScript strict mode enabled
- Tailwind configured with custom design system
- Component library based on Radix UI primitives
- Form validation with Zod schemas