# Contributing to Todo App

Thank you for your interest in contributing to the Todo App! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

### Our Pledge

We are committed to making participation in our project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socio-economic status, nationality, personal appearance
- Race, religion, or sexual identity and orientation

### Our Standards

**Positive Behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable Behavior:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Any other conduct which could reasonably be considered inappropriate

### Reporting Issues

If you encounter inappropriate behavior, please contact the project maintainers privately.

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 20+ installed
- PostgreSQL 15+ (or Docker)
- Git configured
- A GitHub account

### Setup Development Environment

1. **Fork the Repository**

   ```bash
   # Click "Fork" on GitHub
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/todo-app.git
   cd todo-app/backend
   ```

2. **Add Upstream Remote**

   ```bash
   git remote add upstream https://github.com/fulanzigler-blip/todo-app.git
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Set Up Database**

   ```bash
   # Copy environment file
   cp .env.example .env

   # Edit .env with your database credentials
   # Then:
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed  # Optional
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

   Verify it's working:
   ```bash
   curl http://localhost:3000/health
   ```

---

## Development Workflow

### Branch Strategy

We use Git Flow with these branches:

- **main**: Production-ready code
- **develop**: Development branch
- **feature/xxx**: Feature branches
- **bugfix/xxx**: Bug fix branches
- **hotfix/xxx**: Urgent production fixes

### Creating a Feature Branch

```bash
# Ensure you're on develop
git checkout develop

# Pull latest changes
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name
```

### Example Branch Names

- ✅ `feature/user-authentication`
- ✅ `feature/add-todo-filters`
- ✅ `bugfix/fix-pagination-error`
- ✅ `hotfix/security-update`

❌ Avoid:
- `feature1`
- `test-branch`
- `random-name`

### Syncing with Upstream

Before starting work, sync your fork:

```bash
# Fetch upstream changes
git fetch upstream

# Rebase your branch onto upstream/develop
git rebase upstream/develop
```

Before pushing, sync again:

```bash
# Update develop
git checkout develop
git pull upstream develop

# Rebase your feature branch
git checkout feature/your-feature
git rebase develop
```

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types - use proper interfaces/types
- Enable strict mode in `tsconfig.json`
- Use type inference where appropriate

**Example:**
```typescript
// ❌ Bad
function getData(id) {
  return fetch(`/api/${id}`);
}

// ✅ Good
async function getData(id: string): Promise<Response> {
  return fetch(`/api/${id}`);
}
```

### Naming Conventions

**Variables/Functions:** camelCase
```typescript
const todoCount = 10;
function getTodoById(id: string) { }
```

**Classes/Interfaces:** PascalCase
```typescript
class TodoService { }
interface TodoRequest { }
```

**Constants:** UPPER_SNAKE_CASE
```typescript
const MAX_TODO_LENGTH = 255;
const API_BASE_URL = '/api/v1';
```

**Private Methods:** Prefix with underscore
```typescript
private _validateInput(input: string): boolean { }
```

### Code Style

**Indentation:** 2 spaces
**Quotes:** Single quotes for strings, double quotes for JSON
**Semicolons:** Always use semicolons
**Line Length:** Max 100 characters

**Example:**
```typescript
export async function createTodo(
  data: CreateTodoInput
): Promise<Todo> {
  const todo = await prisma.todo.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
    },
  });

  return todo;
}
```

### Error Handling

Always handle errors gracefully:

```typescript
// ❌ Bad
export async function getTodo(id: string) {
  return prisma.todo.findUnique({ where: { id } });
}

// ✅ Good
export async function getTodo(id: string): Promise<Todo> {
  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo) {
    throw new AppError('Todo not found', 404);
  }

  return todo;
}
```

### Async/Await

Prefer async/await over .then():

```typescript
// ❌ Bad
fetch('/api/todos')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// ✅ Good
try {
  const response = await fetch('/api/todos');
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

### Comments

**When to add comments:**
- Complex business logic
- Non-obvious algorithms
- Workarounds or hacks
- API contract documentation

```typescript
// Calculate priority score based on multiple factors
// Algorithm: (priority * 10) - (days_until_due / 2)
// This weights priority higher than due date
function calculatePriorityScore(
  priority: number,
  dueDate: Date
): number {
  const daysUntilDue = differenceInDays(dueDate, new Date());
  return priority * 10 - daysUntilDue / 2;
}
```

### File Organization

```
src/
├── routes/          # API route definitions
├── services/        # Business logic
├── schemas/         # Validation schemas (Zod)
├── utils/           # Utility functions
├── types/           # TypeScript types
└── prisma/          # Prisma client setup
```

### Import Order

```typescript
// 1. External dependencies
import Fastify from 'fastify';
import { z } from 'zod';

// 2. Internal modules
import { todoService } from '../services/todo.service';
import { createTodoSchema } from '../schemas/todo.schema';

// 3. Types
import type { CreateTodoInput } from '../schemas/todo.schema';

// 4. Environment variables
const API_BASE = process.env.API_BASE_URL;
```

---

## Commit Guidelines

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks
- **ci**: CI/CD changes

### Examples

```bash
# Feature
feat(todos): add bulk delete endpoint

Add ability to delete multiple todos at once
via a single API call with array of IDs.

Closes #123

# Bug fix
fix(validation): handle empty description field

Previously, empty string was causing validation errors.
Now properly treats empty string as undefined.

Fixes #456

# Documentation
docs(readme): update installation instructions

Clarify Docker setup steps and add troubleshooting section.

# Refactor
refactor(service): extract todo validation logic

Move validation logic from routes to service layer
for better separation of concerns.

# Performance
perf(database): add index on completed field

Improves query performance for filtering active todos
by 40% in large datasets.
```

### Commit Checklist

Before committing, ensure:

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] TypeScript compiles without errors
- [ ] Commit message follows format
- [ ] Changes are logically grouped

---

## Pull Request Process

### Before Creating PR

1. **Update Your Branch**

   ```bash
   git checkout develop
   git pull upstream develop
   git checkout feature/your-feature
   git rebase develop
   ```

2. **Run Tests**

   ```bash
   npm test
   ```

3. **Build Project**

   ```bash
   npm run build
   ```

4. **Update Documentation**

   - Update relevant README sections
   - Add API documentation for new endpoints
   - Update CHANGELOG.md (if applicable)

### Creating Pull Request

1. Push to your fork
   ```bash
   git push origin feature/your-feature
   ```

2. Create PR on GitHub

3. Fill out PR template:
   - Description of changes
   - Related issues
   - Screenshots (if applicable)
   - Testing performed

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123
Related to #456

## Changes Made
- List major changes here
- With bullet points

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing performed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing

## Screenshots (if applicable)
Add screenshots or GIFs for UI changes
```

### Review Process

1. **Automated Checks**: CI runs automatically
2. **Code Review**: Maintainers review your code
3. **Feedback**: Address review comments
4. **Approval**: At least one maintainer approval needed
5. **Merge**: Maintainer merges your PR

### Handling Review Feedback

- Respond to all comments
- Make requested changes or discuss alternatives
- Push updates to your branch
- Request re-review

---

## Testing

### Writing Tests

We use Vitest for testing.

**Unit Test Example:**
```typescript
import { describe, it, expect } from 'vitest';
import { todoService } from '../services/todo.service';

describe('TodoService', () => {
  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const data = {
        title: 'Test todo',
        priority: 1,
      };

      const todo = await todoService.createTodo(data);

      expect(todo).toHaveProperty('id');
      expect(todo.title).toBe(data.title);
      expect(todo.priority).toBe(data.priority);
    });

    it('should throw error for invalid data', async () => {
      const data = {
        title: '', // Invalid: empty title
      };

      await expect(todoService.createTodo(data)).rejects.toThrow();
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test todo.service.test.ts
```

### Test Coverage

- Aim for >80% coverage
- Critical paths should have 100% coverage
- Add tests for bug fixes

---

## Documentation

### When to Update Documentation

- Adding new features
- Changing API endpoints
- Modifying configuration
- Updating dependencies
- Adding new scripts/commands

### Documentation Files

- **README.md**: Project overview and quick start
- **API.md**: API endpoint documentation
- **SETUP.md**: Installation and setup guide
- **USER_GUIDE.md**: End-user documentation
- **ARCHITECTURE.md**: System design and architecture
- **CONTRIBUTING.md**: This file

### Documentation Style

- Use clear, concise language
- Include code examples
- Use proper formatting (code blocks, tables, lists)
- Keep it up-to-date
- Use consistent terminology

---

## Reporting Issues

### Bug Reports

When reporting bugs, include:

1. **Clear title**: Brief description of the bug
2. **Description**: What happened and what you expected
3. **Steps to reproduce**: Detailed reproduction steps
4. **Environment**:
   - OS version
   - Node.js version
   - Browser version (if applicable)
   - Database version
5. **Screenshots/Logs**: Error messages or screenshots
6. **Additional context**: Any other relevant information

**Bug Report Template:**
```markdown
**Description**
Brief description of the bug.

**Expected Behavior**
What should happen.

**Actual Behavior**
What actually happens.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Environment**
- OS: [e.g., Ubuntu 22.04]
- Node.js: [e.g., v20.10.0]
- PostgreSQL: [e.g., v15.2]

**Screenshots/Logs**
[Attach screenshots or paste logs]

**Additional Context**
Any other relevant information.
```

### Feature Requests

When suggesting features:

1. **Problem**: What problem does this solve?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other approaches considered
4. **Additional Context**: Mockups, examples, use cases

**Feature Request Template:**
```markdown
**Is your feature request related to a problem?**
Clear description of the problem.

**Describe the solution you'd like**
Detailed description of the desired solution.

**Describe alternatives you've considered**
Any alternative solutions or features you considered.

**Additional context**
Mockups, examples, or any other context.
```

---

## Getting Help

### Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Pull Requests**: For code contributions

### Asking Questions

1. Search existing issues/discussions first
2. Include relevant code snippets
3. Describe what you've tried
4. Be patient - maintainers are volunteers

---

## Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes
- Project README

### Types of Contributions

- Code contributions
- Bug reports
- Feature suggestions
- Documentation improvements
- Translation help
- Testing and QA
- Community support

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

## Questions?

If you have questions about contributing:

1. Check this document
2. Review existing issues and PRs
3. Open a GitHub Discussion
4. Contact maintainers

Thank you for contributing! 🎉
