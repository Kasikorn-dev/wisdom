---
paths:
  - "src/env.js"
---

# Environment Variables

This project uses **@t3-oss/env-nextjs** for type-safe, validated environment variables. Never use `process.env` directly — use `env` from `src/env.js` instead.

## Config File

- **Location:** `src/env.js`
- **Schema:** `server` and `client` objects define what vars are required
- **Validation:** Runs at build time — invalid or missing vars cause build to fail

## Structure

```ts
export const env = createEnv({
  server: {
    // Server-only vars — never exposed to client
    DATABASE_URL: z.string().url(),
  },
  client: {
    // Client vars — must have NEXT_PUBLIC_ prefix
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    // Map process.env to the schema
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
```

## Adding a New Variable

1. Add the schema to `server` or `client`
2. Add the value to `runtimeEnv`

**Example — new server secret:**
```ts
server: {
  DATABASE_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().min(1),
},
runtimeEnv: {
  DATABASE_URL: process.env.DATABASE_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
},
```

**Example — new client var:**
```ts
client: {
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
},
runtimeEnv: {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
},
```

## Rules

| Rule | Reason |
|------|--------|
| Server vars: no prefix | Never sent to client bundle |
| Client vars: `NEXT_PUBLIC_` prefix | Required by Next.js to expose to browser |
| Use `env.VAR_NAME` | Type-safe, validated, fails fast if missing |
| Don't use `process.env.VAR_NAME` | No type safety, no validation |
