---
name: add-db-schema
description: Adds a new database schema/table using Drizzle ORM and Supabase. Use when the user wants to add a new table, create a database schema, add a new entity to the database, or define a new data model (e.g. courses, lessons, enrollments).
---

# Add Database Schema

This skill guides you through adding a new database schema in the Wisdom project. The project uses **Drizzle ORM** with **Supabase** (PostgreSQL).

---

## When to Use This Skill

- User says: "add table for X", "create schema for courses", "add database model"
- New feature needs to store data
- Adding a new entity (courses, lessons, enrollments, etc.)

---

## Step-by-Step Workflow

### Step 1: Choose the Schema Name

- Use **kebab-case** for the file name (e.g. `courses.ts`, `user-profiles.ts`)
- Table name: singular or plural (e.g. `"course"` or `"courses"`)

### Step 2: Create the Schema File

Create `src/server/db/schemas/<domain>.ts`

**Template (simple table):**

```ts
import { uuid, varchar } from "drizzle-orm/pg-core";
import { baseSchema, createTable } from "../lib/utils";

export const <tableName> = createTable("<table_name>", {
  id: uuid("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  ...baseSchema,
});
```

**Example — courses table:**

```ts
import { uuid, varchar, text } from "drizzle-orm/pg-core";
import { baseSchema, createTable } from "../lib/utils";

export const courses = createTable("course", {
  id: uuid("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  ...baseSchema,
});
```

### Step 3: Use Available Helpers

From `../lib/utils`:

| Helper | Purpose |
|--------|---------|
| `createTable` | Creates table with project conventions |
| `baseSchema` | Adds `createdAt`, `updatedAt`, `createdBy`, `updatedBy` columns |

**Common column types:**
- `uuid("id")` — UUID primary key
- `varchar("name", { length: 255 })` — string with max length
- `text("description")` — long text
- `integer("count")` — integer
- `boolean("is_active")` — boolean
- `timestamp("published_at")` — date/time

### Step 4: Export in Schemas Index

Edit `src/server/db/schemas/index.ts`:

```ts
export * from "./users";
export * from "./courses";  // Add this line
```

### Step 5: Generate and Run Migration

```bash
pnpm db:generate
pnpm db:migrate
```

Or for quick prototyping (dev only):
```bash
pnpm db:push
```

---

## Checklist

- [ ] Schema file: `src/server/db/schemas/<domain>.ts`
- [ ] Using `createTable` from `../lib/utils`
- [ ] `baseSchema` added
- [ ] Exported in `schemas/index.ts`
- [ ] Run `pnpm db:generate` and `pnpm db:migrate`

---

## Full Example: courses Schema

**src/server/db/schemas/courses.ts:**

```ts
import { uuid, varchar, text } from "drizzle-orm/pg-core";
import { baseSchema, createTable } from "../lib/utils";

export const courses = createTable("course", {
  id: uuid("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  ...baseSchema,
});
```

**schemas/index.ts:**
```ts
export * from "./users";
export * from "./courses";
```

**Then run:**
```bash
pnpm db:generate
pnpm db:migrate
```

---

## With RLS Policies (Supabase)

If you need Row Level Security (RLS):

```ts
import { sql } from "drizzle-orm";
import { pgPolicy, uuid, varchar } from "drizzle-orm/pg-core";
import { baseSchema, createTable } from "../lib/utils";

export const courses = createTable(
  "course",
  {
    id: uuid("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    ...baseSchema,
  },
  (t) => [
    pgPolicy("courses_read_policy", {
      as: "permissive",
      for: "select",
      to: ["authenticated"],
      using: sql`true`,
    }),
  ]
);
```

---

## Common Mistakes to Avoid

1. **Using pgTable directly** — Use `createTable` from `../lib/utils` for consistency
2. **Forgetting to export** — Must add to `schemas/index.ts`
3. **Skipping migration** — Run `pnpm db:generate` and `pnpm db:migrate` after schema changes
4. **Wrong import path** — Import from `../lib/utils` (relative to schemas folder)
