---
name: create-feature
description: Creates a new feature following feature-based architecture. Use when the user wants to add a new feature, create a feature folder, scaffold feature structure, or build a new domain/module (e.g. course, lesson, enrollment).
---

# Create New Feature

This skill guides you through creating a new feature in the Wisdom project using **Feature-Based Architecture**. Each feature is self-contained with its own components, hooks, types, and utilities.

---

## When to Use This Skill

- User says: "create feature X", "add feature for Y", "scaffold course feature"
- Adding a new domain/module (courses, lessons, enrollments, etc.)
- Building a new section of the app that deserves its own folder

---

## Step-by-Step Workflow

### Step 1: Choose the Feature Name

- Use **kebab-case** (e.g. `course`, `lesson-list`, `user-profile`)
- Keep it singular for the folder name: `course` not `courses`

### Step 2: Create the Folder Structure

Create this structure under `src/features/<feature-name>/`:

```
src/features/<feature-name>/
├── components/          # UI components
├── hooks/               # Custom hooks
├── types.ts             # TypeScript types for this feature
└── utils.ts             # Helper functions for this feature
```

**What each part is for:**

| Folder/File | Purpose | When to add |
|-------------|---------|-------------|
| `components/` | Feature-specific UI | Always create |
| `hooks/` | Logic hooks (useState, data fetching) | Always create |
| `types.ts` | Interfaces, types | Add when you have data shapes |
| `utils.ts` | Helper functions | Add when you have reusable logic |

### Step 3: Create the Main Component

Create at least one component in `components/`. Use **kebab-case** for file names.

**Example:** `src/features/course/components/course-list.tsx`

```tsx
"use client";

export function CourseList() {
  return (
    <div>
      <h2>Courses</h2>
      {/* Add content */}
    </div>
  );
}
```

**Naming:** Component = PascalCase (`CourseList`), file = kebab-case (`course-list.tsx`)

### Step 4: Create the Page Route

Create a page in `src/app/` that **imports and renders** the feature component. Keep the page thin.

**Example:** `src/app/courses/page.tsx`

```tsx
import { CourseList } from "@/features/course/components/course-list";

export default function CoursesPage() {
  return (
    <main className="container py-8">
      <CourseList />
    </main>
  );
}
```

**Rules:**
- Page only imports and composes — no complex logic
- Import from `@/features/<name>/components/`

### Step 5: Add Types (if needed)

**Example:** `src/features/course/types.ts`

```ts
export interface Course {
  id: string;
  name: string;
  createdAt: Date;
}
```

### Step 6: Add tRPC / Data (if needed)

If the feature needs API data, use the `add-trpc-router` skill to create the API. Then:
- Client components: `api.course.list.useQuery()`
- Server components: `serverCaller.course.list()`

---

## Checklist

- [ ] Feature folder: `src/features/<feature-name>/`
- [ ] `components/` and `hooks/` folders exist
- [ ] At least one component created
- [ ] Page in `src/app/<route>/page.tsx`
- [ ] Page imports from `@/features/<name>/`
- [ ] `types.ts` and `utils.ts` added if needed

---

## Full Example: "course" Feature

```
src/features/course/
├── components/
│   └── course-list.tsx
├── hooks/
├── types.ts
└── utils.ts

src/app/courses/
└── page.tsx
```

---

## Common Mistakes to Avoid

1. **Putting logic in the page** — Keep `page.tsx` thin; put logic in components or hooks
2. **Wrong import path** — Use `@/features/<name>/` not `@/app/` or relative paths
3. **Shared components in feature** — If used by multiple features → `src/components/`. Feature-only → `src/features/<name>/components/`
