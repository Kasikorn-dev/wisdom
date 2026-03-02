---
name: commit-message
description: Generates conventional commit messages by analyzing git diff. Use when the user asks for help writing a commit message, wants to commit changes, needs a commit message, or asks to summarize staged changes for git.
---

# Generate Commit Message

This skill helps you write clear, consistent commit messages using **Conventional Commits** format. The message should describe what changed and why.

---

## When to Use This Skill

- User says: "write commit message", "help me commit", "what should I write for this commit"
- User has staged changes and wants a message
- Reviewing git diff to summarize changes

---

## Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Required:**
- `type` — What kind of change
- `description` — Short summary (imperative mood, lowercase, no period)

**Optional:**
- `scope` — Area of codebase (e.g. course, auth, db)
- `body` — Detailed explanation
- `footer` — Breaking changes, issue refs

---

## Step-by-Step Workflow

### Step 1: Analyze the Git Diff

Run `git diff --staged` or `git status` to see what changed.

### Step 2: Choose the Type

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change, no feature/fix |
| `perf` | Performance improvement |
| `test` | Adding/updating tests |
| `chore` | Build, config, deps |
| `ci` | CI/CD changes |

### Step 3: Choose the Scope (optional)

Use the main area affected:
- `course` — course feature
- `auth` — authentication
- `db` — database/schema
- `api` — tRPC/API
- `ui` — components, styling

### Step 4: Write the Description

- **Imperative mood:** "add" not "added", "fix" not "fixed"
- **Lowercase** (except proper nouns)
- **No period** at the end
- **~50 chars** for the first line

### Step 5: Add Body (if needed)

Use when the change needs more context. Separate from header with blank line.

---

## Examples

**New feature:**
```
feat(course): add course list page
```

**Bug fix:**
```
fix(auth): correct validation for email field
```

**Database change:**
```
feat(db): add courses schema
```

**Refactor:**
```
refactor(trpc): extract validation schemas to lib
```

**Multiple changes:**
```
feat(course): add course list and create form

- Add CourseList component
- Add create course mutation
- Add courses page route
```

**Breaking change:**
```
feat(api)!: change course list response format

BREAKING CHANGE: list now returns paginated result
```

---

## Checklist

- [ ] Type matches the change
- [ ] Scope is relevant (or omitted)
- [ ] Description is imperative, lowercase
- [ ] First line is concise (~50 chars)

---

## Common Mistakes to Avoid

1. **Past tense** — "added" → use "add"
2. **Too vague** — "fix stuff" → "fix email validation"
3. **Too long** — Keep first line under 72 chars
4. **Wrong type** — Use `feat` for new features, `fix` for bugs
