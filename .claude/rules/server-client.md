---
paths:
  - "**/*.{ts,tsx}"
---

# Server vs Client Components

Next.js uses **React Server Components (RSC)** by default. Understanding when to use Server vs Client Components is critical for performance and correctness.

## Default: Server Component

- **Every** component is a Server Component unless you add `"use client"`
- Server Components run **only on the server** — they never ship JavaScript to the browser for that component
- They can access:
  - Database directly
  - Server-only APIs and secrets
  - File system
  - Async/await at the top level

```tsx
// No "use client" — this is a Server Component
export default async function CoursesPage() {
  const courses = await db.query.courses.findMany(); // Direct DB access
  return <CourseList courses={courses} />;
}
```

## When to Use Client Components (`"use client"`)

Add `"use client"` at the **top of the file** when you need:

| Need | Example |
|------|---------|
| React hooks | `useState`, `useEffect`, `useCallback`, `useMemo` |
| Event handlers | `onClick`, `onChange`, `onSubmit` |
| Browser APIs | `window`, `localStorage`, `document` |
| Client-only libraries | `api` from tRPC (React Query), `useForm` from react-hook-form |

```tsx
"use client";

import { api } from "@/trpc/react";

export function CourseList() {
  const { data } = api.course.list.useQuery(); // Hook — must be client
  const [filter, setFilter] = useState(""); // useState — must be client

  return (
    <div>
      <input onChange={(e) => setFilter(e.target.value)} />
      <ul>{data?.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
    </div>
  );
}
```

## Best Practices

1. **Prefer Server Components** — they reduce bundle size and improve initial load
2. **Push "use client" down** — only wrap the part that needs client features, not the whole page
3. **Composition pattern** — Server Component fetches data, passes to Client Component as props

```tsx
// src/app/courses/page.tsx (Server)
export default async function Page() {
  const courses = await serverCaller.course.list();
  return <CourseListWithFilters initialCourses={courses} />;
}

// src/features/course/components/course-list-with-filters.tsx (Client)
"use client";
export function CourseListWithFilters({ initialCourses }) {
  const [filter, setFilter] = useState("");
  // ...
}
```
