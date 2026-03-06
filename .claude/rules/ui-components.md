---
paths:
  - "src/components/**/*.{ts,tsx}"
---

# UI Components (shadcn/ui)

This project uses **shadcn/ui** — a collection of copy-paste React components built on Radix UI and Tailwind.

## Installing a Component

```bash
pnpm dlx shadcn@latest add <component-name>
```

**Examples:**
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add input
```

## File Location

- Installed components live in: `src/components/ui/`
- Import from: `@/components/ui/<component-name>`

**Note:** `ui/` = low-level primitives. For layout (Navbar, Footer) use `@/components/layout`. For shared composed components use `@/components/shared`.

## Usage Examples

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function CourseForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Course name" />
        <Button>Save</Button>
      </CardContent>
    </Card>
  );
}
```

## Customization

- Components are **yours** — they're copied into the project, not installed as a dependency
- Edit `src/components/ui/*.tsx` directly to customize
- Use Tailwind classes and the `cn()` utility for conditional styling
