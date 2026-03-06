---
paths:
  - "**/*.{ts,tsx}"
---

# Naming Conventions

Consistent naming improves readability and helps tools (e.g. Biome) work correctly.

## 1. Files and Folders — `kebab-case`

Use lowercase with hyphens. This matches URL conventions and avoids case-sensitivity issues across OS.

| ✅ Correct | ❌ Wrong |
|-----------|----------|
| `user-profile/` | `UserProfile/` |
| `create-post.tsx` | `createPost.tsx` |
| `use-auth.ts` | `use_auth.ts` |
| `course-card.tsx` | `CourseCard.tsx` |

## 2. Components — `PascalCase`

React components must use PascalCase so they're distinguishable from HTML elements and plain functions.

| ✅ Correct | ❌ Wrong |
|-----------|----------|
| `UserProfile` | `userProfile` |
| `CreatePost` | `create_post` |
| `CourseCard` | `courseCard` |

```tsx
export function CourseCard({ course }: { course: Course }) {
  return <div>...</div>;
}
```

## 3. Functions and Hooks — `camelCase`

- Regular functions: `handleSubmit`, `fetchUserData`, `formatDate`
- Hooks: `useAuth`, `useCourseProgress` — must start with `use`

| ✅ Correct | ❌ Wrong |
|-----------|----------|
| `handleSubmit` | `HandleSubmit` |
| `useAuth` | `use_auth` |
| `getCourseById` | `GetCourseById` |

## 4. Constants — `UPPER_SNAKE_CASE` or `camelCase`

- Global config: `API_BASE_URL`, `MAX_RETRIES`
- In-scope constants: `camelCase` is also fine

```ts
export const MAX_RETRY_COUNT = 3;
const defaultPageSize = 10;
```
