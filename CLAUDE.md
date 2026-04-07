# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Commands

```bash
pnpm dev      # Development server (http://localhost:3000)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
pnpm lint:fix # Fix ESLint issues
pnpm format   # Format with Prettier
```

## Stack

- **Next.js** 16.2.2 (App Router)
- **React** 19.2.4 (React Compiler enabled)
- **Tailwind CSS** v4.2.2 (CSS-based config)
- **TypeScript** 6 (strict mode)
- **shadcn/ui** + **lucide-react**

## Structure

```
src/
├── app/              # Pages: /, /about, /features, /pricing, /docs, /api-demo, /todo
│   ├── layout.tsx    # Root layout with Navbar
│   ├── page.tsx      # Home page
│   └── globals.css   # Tailwind v4 config + utilities
├── components/
│   ├── ui/           # shadcn: button, input, label
│   └── navbar.tsx    # Responsive nav with mobile menu
└── lib/
    ├── utils.ts      # cn() helper
    └── api/          # API utilities
        ├── client.ts # HTTP client (apiClient, createApi, ApiClientError)
        ├── hooks.ts  # useApi, useMutation, usePaginated, useManualApi
        ├── server.ts # CORS, response helpers, validation
        └── index.ts  # Centralized exports
```

## Conventions

### Styling (Tailwind v4)
- Config in `src/app/globals.css` using `@theme inline`
- Custom utilities: `.glass`, `.glow`, `.gradient-text`, `.mesh-gradient`, `.spotlight-card`
- Dark mode: toggle `.dark` class on document

### Components
- Use `cva` for variants, `cn()` for class merging
- Forward refs with `React.forwardRef`
- Use Radix UI primitives

### API (`src/lib/api`)
- **Client**: `apiClient.get/post/put/patch/delete`, `createApi(baseUrl)`
- **Hooks**: `useApi(url)`, `useMutation(url, method)`, `usePaginated(baseUrl, endpoint)`
- **Server**: `success()`, `error()`, `setCorsHeaders()`, `validateRequest()`

### Paths
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/lib/*` → `src/lib/*`

## Notes

- React Compiler enabled in `next.config.ts`
- No testing framework configured
- Navbar included in root layout, navigation: Home, Features, Pricing, API, Docs, About
