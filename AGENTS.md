# AGENTS.md

## Project overview
This repo follows Spec-Driven Development (Spec Kit). PRD → spec → plan → tasks → implementation.

## Setup commands
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Run tests: `npm test`

## Architecture rules
- Screaming architecture + vertical slices.
- Features own UI, domain logic, and adapters.
- Shared layer only for cross-cutting concerns.

## Quality rules
- Apply SOLID, DRY, KISS, POLA.
- Consider Big-O for core scene operations and export.
- Use design patterns only when the problem truly requires it.

## Testing rules
- High-value tests only.
- AAA pattern.
- Parameterize tests when it reduces duplication.

## Git workflow
- Branch naming: `spec/001-*`, `plan/001-*`, `tasks/001-*`, `impl/001-*`, `fix/*`.
- Before any implementation work, create and switch to the spec-specific branch.
- Keep commits focused and small.
- Use Conventional Commits for messages.
- PR titles follow Conventional Commits format.
- Push after local checks pass.

## References
- Spec Kit docs: https://github.com/github/spec-kit
- Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/#specification
