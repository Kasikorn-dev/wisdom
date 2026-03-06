# Wisdom Project

An **education platform** built with modern web technologies.

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 15 | App Router, Turbopack |
| Language | TypeScript 5 | Strict mode enabled |
| API | tRPC v11 | Type-safe API layer |
| Data Fetching | TanStack Query v5 | React Query for client-side data |
| ORM | Drizzle ORM v0.41 | With drizzle-kit for migrations |
| Database | Supabase | PostgreSQL hosted |
| Auth | Supabase Auth | Sign in, sign up, sessions |
| UI | React 19 + shadcn/ui | Component library |
| Styling | Tailwind CSS v4 | With PostCSS |
| Validation | Zod v3 | Schema validation |
| Serialization | SuperJSON | Dates, Maps, etc. in tRPC |
| Linter/Formatter | Biome v2 | Fast, all-in-one |
| Package Manager | pnpm | Fast, disk-efficient |
| Env Validation | @t3-oss/env-nextjs | Type-safe env vars |

## Path Alias

- `@/` maps to `src/`
- Example: `import { db } from "@/server/db"`

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:push` | Push schema to database |
| `pnpm db:generate` | Generate migration from schema |

---

# Feature-Based Architecture

This project uses **Feature-Based Architecture** — code is organized by feature/domain, not by technical layer (e.g. "all components together").

## Why Feature-Based?

- **Colocation**: Related code lives together (components, hooks, types for one feature)
- **Scalability**: Easy to add/remove features without touching unrelated code
- **Clarity**: Clear ownership — "course" feature owns its UI, logic, and types

## Directory Structure

```
src/
├── app/              # Next.js App Router — routing ONLY, minimal logic
├── features/         # Business logic + feature-specific UI (one folder per feature)
├── components/       # Shared UI used across multiple features
│   ├── layout/       # Page shell (Navbar, Footer, Sidebar)
│   ├── ui/           # Low-level primitives (shadcn/ui)
│   └── shared/       # Reusable components used by 2+ features
├── lib/              # Shared utilities, helpers, non-feature-specific code
└── server/           # Database, tRPC, API setup
```

## Rules by Directory

### 1. `src/features/<feature-name>/`

Put all feature-specific code here. Each feature folder typically contains:

| Subfolder/File | Purpose | Example |
|---------------|---------|---------|
| `components/` | UI components used only in this feature | `course-card.tsx`, `lesson-list.tsx` |
| `hooks/` | Custom hooks for this feature's logic | `useCourseProgress.ts` |
| `utils.ts` | Helper functions for this feature | `formatLessonDuration()` |
| `types.ts` | TypeScript types/interfaces | `Course`, `Lesson` |

**Two `index` files, different roles:**

| File | Role | Purpose |
|------|------|---------|
| `components/index.ts` | **Export** | Barrel file — re-exports all sub-components for internal use |
| `features/<name>/index.tsx` | **Compose** | Imports from components, hooks, types → assembles one **finished component** that the app uses |

**App imports only from feature root** — `@/features/home` exports `HomePage`. Never import from `@/features/home/components` in app.

**Import rule:** Use `@/` path alias only — no relative imports (`./`, `../`).

### 2. `src/app/` — Routing Only

- `page.tsx` files should **import and render** the composed component from `src/features/<name>`
- Do NOT put complex logic or large UI directly in `app/`
- Keep pages thin — they render the feature's composed component

### 3. `src/components/` — Shared UI

| Subfolder | Purpose | Examples |
|-----------|---------|----------|
| **layout/** | Page shell — defines where content goes | Navbar, Footer, Sidebar |
| **ui/** | Low-level primitives (shadcn/ui) | Button, Input, Dialog, Card |
| **shared/** | Reusable components used by multiple features | ConfirmDialog, EmptyState, ErrorBoundary |

**Rule:** If a component is used in **one feature only** → put it in `src/features/<name>/components/`

### 4. `src/lib/` — Shared Utilities

- Helper functions, formatters, constants not tied to a specific feature
- Examples: `formatDate`, `cn` (classnames utility), API clients

### 5. `src/server/` — Server Logic

- Database schema and connection
- tRPC routers and context
- Server-only code
