# Constitution

## Purpose
This project follows Spec-Driven Development. The PRD is the source of truth for scope, goals, and constraints.

## Core Principles
- Build only what is in scope; out-of-scope items are explicitly excluded.
- Prefer simple, robust solutions over over-engineering.
- Maintain a clear path from PRD → spec → plan → tasks → implementation.
- Every major decision must be traceable to a requirement or assumption.

## Quality Bar
- Functional requirements must be testable.
- Non-functional requirements must be measurable or verifiable.
- Documentation must stay updated with implementation changes.

## Architecture Constraints
- Screaming architecture + vertical slices.
- Features own their UI, domain logic, and adapters.
- Cross-cutting concerns live in shared layers with minimal coupling.

## Coding Standards
- Apply SOLID, DRY, KISS, POLA.
- Prefer clear O(n) over clever O(n log n) unless necessary.
- Evaluate Big-O for core scene operations and export paths.

## Design Patterns
- Use patterns only when the problem justifies it.
- Favor simple composition before formal patterns.

## Testing Principles
- Tests focus on high-value paths.
- Use AAA pattern.
- Parameterize tests when it reduces duplication.

## Change Control
- Changes to scope require updates to the PRD and spec.
- Technical rules belong in the plan and research documents.
