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
├── components/
│   ├── index.ts         # Export barrel — re-exports sub-components
│   └── course-list.tsx
├── hooks/               # Custom hooks
├── index.tsx            # Compose — imports components, hooks, types → CoursePage
├── types.ts             # TypeScript types for this feature
└── utils.ts             # Helper functions for this feature
```

**Two `index` files, different roles:**

| File | Role | Purpose |
|------|------|---------|
| `components/index.ts` | **Export** | Barrel — re-exports all sub-components |
| `features/<name>/index.tsx` | **Compose** | Imports from components, hooks, types → assembles one finished component (e.g. CoursePage) for the app |

### Step 3: Create Sub-Components + `components/index.ts`

Create sub-components in `components/`. Use **kebab-case** for file names. Add `components/index.ts` to **export** them.

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

**Example:** `src/features/course/components/index.ts` — Export barrel

```ts
export { CourseList } from "@/features/course/components/course-list";
export { CourseCard } from "@/features/course/components/course-card";  // future
```

### Step 4: Create Feature Root `index.tsx` (Compose)

Create `features/<name>/index.tsx` that **imports** from components/index, hooks, types and **composes** them into one finished component. This is the single component the app uses.

**Example:** `src/features/course/index.tsx`

```tsx
import { CourseList } from "@/features/course/components";
// import { useCourse } from "@/features/course/hooks";  // if needed

export function CoursePage() {
  return (
    <main className="container py-8">
      <CourseList />
      {/* Add other sections as needed */}
    </main>
  );
}
```

### Step 5: Create the Page Route

Create a page in `src/app/` that **imports and renders** the composed component from the feature root. Keep the page thin.

**Example:** `src/app/courses/page.tsx`

```tsx
import { CoursePage } from "@/features/course";

export default function CoursesPage() {
  return <CoursePage />;
}
```

**Rules:**
- Page only imports and renders — no complex logic
- Import from `@/features/<name>` (feature root) — NOT from `@/features/<name>/components`

### Step 6: Add Types (if needed)

**Example:** `src/features/course/types.ts`

```ts
export interface Course {
  id: string;
  name: string;
  createdAt: Date;
}
```

### Step 7: Add tRPC / Data (if needed)

If the feature needs API data, use the `add-trpc-router` skill to create the API. Then:
- Client components: `api.course.list.useQuery()`
- Server components: `serverCaller.course.list()`

---

## Checklist

- [ ] Feature folder: `src/features/<feature-name>/`
- [ ] `components/` and `hooks/` folders exist
- [ ] At least one sub-component created in `components/`
- [ ] `components/index.ts` exports all sub-components (barrel)
- [ ] Feature root `index.tsx` composes (imports from components, hooks, types)
- [ ] Page in `src/app/<route>/page.tsx`
- [ ] Page imports from `@/features/<name>` (feature root)
- [ ] `types.ts` and `utils.ts` added if needed

---

## Full Example: "course" Feature

```
src/features/course/
├── components/
│   ├── index.ts         # Export barrel
│   └── course-list.tsx
├── hooks/
├── index.tsx            # Compose → CoursePage
├── types.ts
└── utils.ts

src/app/courses/
└── page.tsx
```

---

## Common Mistakes to Avoid

1. **Putting logic in the page** — Keep `page.tsx` thin; put logic in components or hooks
2. **Wrong import path** — App imports from `@/features/<name>` (feature root), NOT from `@/features/<name>/components`
3. **Confusing the two indices** — `components/index.ts` = export barrel; `features/<name>/index.tsx` = compose (import + assemble)
4. **Shared components in feature** — If used by multiple features → `src/components/`. Feature-only → `src/features/<name>/components/`
