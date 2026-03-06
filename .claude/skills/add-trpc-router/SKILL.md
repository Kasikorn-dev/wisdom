---
name: add-trpc-router
description: Adds a new tRPC router with procedures and Zod validation. Use when the user wants to add an API endpoint, create a tRPC router, add a new API route, or expose backend endpoints for a domain (e.g. course, user, lesson).
---

# Add tRPC Router

This skill guides you through adding a new tRPC router in the Wisdom project. tRPC provides type-safe API endpoints — the client gets full TypeScript types automatically.

---

## When to Use This Skill

- User says: "add API for X", "create tRPC router", "add endpoint for courses"
- Feature needs to fetch or mutate data from the server
- Exposing new backend logic to the frontend

---

## Step-by-Step Workflow

### Step 1: Choose the Router Name

- Use **kebab-case** for the file name (e.g. `course.ts`, `user-profile.ts`)
- One router per domain

### Step 2: Create the Router File

Create `src/server/api/routers/<domain>.ts`

**Template:**

```ts
import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { <table> } from "@/server/db/schemas";

export const <domain>Router = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.<table>.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.<table>.findFirst({
        where: eq(<table>.id, input.id),
      });
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(<table>).values({
        name: input.name,
      });
    }),
});
```

**Replace:**
- `<domain>` — e.g. `course` → `courseRouter`
- `<table>` — table name from schema (e.g. `courses`)

### Step 3: Input Validation (Required)

**Every procedure that accepts input MUST use `.input()` with Zod.**

```ts
// ✅ Correct
create: publicProcedure
  .input(z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
  }))
  .mutation(async ({ ctx, input }) => {
    // input is typed and validated
  }),

// ❌ Wrong — no validation
create: publicProcedure.mutation(async ({ ctx, input }) => {
  // input is undefined!
}),
```

**Common Zod patterns:**
- `z.string().min(1)` — required string
- `z.string().email()` — valid email
- `z.string().uuid()` — UUID format
- `z.number().int().min(0)` — non-negative integer
- `z.string().optional()` — optional field

### Step 4: Register in Root Router

Edit `src/server/api/root.ts`:

```ts
import { courseRouter } from "@/server/api/routers/course";

export const appRouter = createTRPCRouter({
  post: postRouter,
  course: courseRouter,  // Add here
});
```

### Step 5: Use in Frontend

**Server Component:**
```ts
import { serverCaller } from "@/trpc/server";

const courses = await serverCaller.course.list();
```

**Client Component:**
```tsx
"use client";

import { api } from "@/trpc/react";

const { data } = api.course.list.useQuery();
```

---

## Checklist

- [ ] Router file: `src/server/api/routers/<domain>.ts`
- [ ] All procedures with input use `.input(z.object({ ... }))`
- [ ] Router registered in `root.ts`
- [ ] Import schema from `@/server/db/schemas` (or schema table)

---

## Full Example: course Router

**src/server/api/routers/course.ts:**

```ts
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { courses } from "@/server/db/schemas";

export const courseRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.courses.findMany();
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(courses).values({ name: input.name });
    }),
});
```

**root.ts:**
```ts
import { courseRouter } from "@/server/api/routers/course";

export const appRouter = createTRPCRouter({
  post: postRouter,
  course: courseRouter,
});
```

---

## Common Mistakes to Avoid

1. **Missing schema** — Create the schema first with `add-db-schema` skill if the table doesn't exist
2. **No input validation** — Always use `.input()` for procedures that accept data
3. **Wrong import** — Use `@/server/api/trpc` for `createTRPCRouter`, `publicProcedure`
4. **Forgetting to register** — Must add router to `root.ts` or it won't be available
