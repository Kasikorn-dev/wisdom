---
paths:
  - "**/*.{ts,tsx}"
---

# Validation (Zod)

This project uses **Zod** for schema validation. Use it for tRPC inputs, form validation, and API contracts.

## tRPC Input Validation

Every tRPC procedure that accepts input **must** use `.input()` with a Zod schema.

```ts
.input(z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  age: z.number().int().min(0).optional(),
}))
```

**Full example:**
```ts
create: publicProcedure
  .input(z.object({
    title: z.string().min(1, "Title is required").max(200),
    email: z.string().email("Invalid email"),
    status: z.enum(["draft", "published"]).default("draft"),
  }))
  .mutation(async ({ ctx, input }) => {
    // input is fully typed and validated
  }),
```

## Reusable Schemas

For schemas used in multiple places, define them once and reuse.

**Create:** `src/lib/validations/user.ts`
```ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const updateUserSchema = createUserSchema.partial();
```

**Use in router:**
```ts
import { createUserSchema } from "@/lib/validations/user";

create: publicProcedure
  .input(createUserSchema)
  .mutation(...),
```

## Common Zod Methods

| Method | Example | Usage |
|--------|---------|-------|
| `.min(n)` | `z.string().min(1)` | Minimum length or value |
| `.max(n)` | `z.string().max(255)` | Maximum length or value |
| `.email()` | `z.string().email()` | Valid email format |
| `.optional()` | `z.string().optional()` | Field can be undefined |
| `.default(x)` | `z.string().default("")` | Default when undefined |
| `.refine()` | `z.string().refine((s) => s.length > 0)` | Custom validation |

```ts
z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```
