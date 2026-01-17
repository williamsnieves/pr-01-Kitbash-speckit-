# Plan — Editor 3D Ligero

## Status
Draft — aligned with stack and architecture constraints.

## Architecture
- Screaming architecture + vertical slices.
- Feature-first structure: each feature owns UI + domain + adapters.
- Shared layer for core types, renderer setup, and utilities.
- Minimal coupling between features; communicate through well-defined interfaces.

## Implementation Phases (Vertical Slices)
1. Scene Core
   - Scene creation, camera, renderer, basic grid.
2. Objects
   - Add/delete primitives.
   - Object list and selection.
3. Transforms
   - Move/rotate/scale gizmos.
   - Transform panel with numeric inputs.
4. Materials
   - Simple material editing (color, roughness, metalness).
5. Export
   - Export pipeline using Three.js exporters.
   - Format selection and validation.
6. Polish
   - Responsiveness, errors, small performance optimizations.

## Testing Strategy
- High-value tests only.
- Focus on:
  - Transform application logic.
  - Export pipeline with minimal scenes.
  - Object creation/deletion state.
- Use AAA pattern; parameterize where it reduces duplication.

## Optimization Guidance
- Keep scene operations O(n) where possible.
- Avoid full scene traversal on every UI update.
- Cache derived data if traversal is required.

## Resolved Decisions
- Assets are imported via local file upload.
- "Simple materials" use basic PBR fields (color, roughness, metalness).
