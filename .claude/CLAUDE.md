# Wisdom Project — Claude Instructions

## Tech Stack
- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript 5
- **API Layer:** tRPC v11
- **Data Fetching:** TanStack Query (React Query) v5
- **ORM:** Drizzle ORM v0.41 + drizzle-kit
- **Database:** PostgreSQL (via `postgres` driver, table prefix: `wisdom_`)
- **UI:** React 19
- **Styling:** Tailwind CSS v4 + PostCSS
- **Validation:** Zod v3
- **Serialization:** SuperJSON
- **Linter/Formatter:** Biome v2
- **Package Manager:** pnpm
- **Env Validation:** @t3-oss/env-nextjs

---

# Feature-Based Architecture Rules
This workspace follows a strict Feature-Based Architecture. All changes must adhere to these rules.

## Directory Structure
- **Core Logic:** All business logic and feature-specific UI MUST go in `src/features/<feature-name>/`.
  - `components/`: UI components specific to the feature.
  - `hooks/`: logic hooks specific to the feature.
  - `utils.ts` / `types.ts`: Helpers and types specific to the feature.
- **Routing:** `src/app/` is for Next.js App Router definitions ONLY.
  - Pages (`page.tsx`) should import components from `src/features/`.
  - Do NOT put complex logic or heavy UI components directly in `src/app/`.
- **Shared UI:** Generic, reusable UI components go in `src/components/`.
- **Shared Utilities:** Non-feature-specific helpers go in `src/lib/`.
- **Server Logic:** Database and tRPC setup stays in `src/server/`.

## Naming Conventions
- **Files/Folders:** Use `kebab-case` (e.g., `user-profile/`, `create-post.tsx`).
- **Components:** Use `PascalCase` (e.g., `UserProfile`, `CreatePost`).
- **Functions/Hooks:** Use `camelCase` (e.g., `handleSubmit`, `useAuth`).

## Data Fetching (tRPC)
- **Server Components:** Import `serverCaller` from `@/trpc/server` — direct function call, no HTTP.
- **Client Components:** Import `api` from `@/trpc/react` — React hooks via HTTP `/api/trpc`.
- **NEVER** mix these imports.

## Database (Drizzle)
- Schema file: `src/server/db/schema.ts`.
- All table names must be prefixed with `wisdom_`.
- Run migrations via `pnpm db:migrate`, push schema via `pnpm db:push`.
