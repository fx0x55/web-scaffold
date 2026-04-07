# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting and formatting
npm run lint          # Run ESLint on src/
npm run lint:fix      # Fix ESLint issues
npm run format        # Format with Prettier
```

## Technology Stack

- **Next.js**: 16.2.2 with App Router (src/app/)
- **React**: 19.2.3 with React Compiler enabled (next.config.ts)
- **Tailwind CSS**: v4.2.2 with CSS-based configuration
- **TypeScript**: 5 with strict mode enabled
- **shadcn/ui**: Component system using Radix UI primitives

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with Geist font
│   ├── page.tsx      # Home page
│   └── globals.css   # Tailwind v4 config + custom styles
├── components/ui/    # shadcn/ui components (button, input, label)
└── lib/
    └── utils.ts      # cn() helper for Tailwind class merging
```

## Key Conventions

### Styling (Tailwind CSS v4)

Tailwind v4 uses CSS-based configuration in `src/app/globals.css`:

- Theme variables defined as CSS custom properties in `:root`
- Use `@theme inline` to map CSS variables to Tailwind theme keys
- Custom utilities: `.glass`, `.glow`, `.gradient-text`, `.mesh-gradient`, `.spotlight-card`
- Dark mode: toggle `.dark` class on document element

### Component Patterns

Components follow shadcn/ui conventions:
- Use `cva` (class-variance-authority) for variant management
- Use `cn()` utility from `@/lib/utils` for conditional class merging
- Forward refs with `React.forwardRef`
- Use Radix UI primitives for accessibility

### Path Aliases

TypeScript path mapping in `tsconfig.json`:
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/lib/*` → `src/lib/*`

### ESLint Configuration

Flat config in `eslint.config.mjs`:
- Uses `eslint-config-next` for web vitals and TypeScript
- Prettier integration via `eslint-config-prettier`
- Custom rules: `@typescript-eslint/no-unused-vars` (warn), `no-console` (warn, allows warn/error)

## Important Notes

- React Compiler is enabled in `next.config.ts`
- No testing framework is currently configured
- Dependabot is configured to update dependencies weekly (ignores major versions)
