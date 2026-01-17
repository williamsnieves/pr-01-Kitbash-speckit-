# Tasks — Editor 3D Ligero

## Phase 0 — Project Setup
- Initialize Next.js (TypeScript) app and base tooling.
- Add Three.js dependency and verify minimal render in dev.
- Create screaming architecture layout and vertical slice folders:
  - `src/features/*` for feature slices.
  - `src/shared/*` for core renderer, domain types, and utilities.
- Add basic lint rules aligned to SOLID/DRY/KISS/POLA.

## User Story 1 — Create a scene
- [P] Implement renderer bootstrap in `src/shared/renderer/*`.
- [P] Add scene domain types in `src/shared/domain/*`.
- Wire the renderer to a canvas in `src/app/page.tsx`.
- Add grid helper and default camera positioning.
- Add minimal scene state store (React context + reducer).
- Add a small test for scene state init (AAA).

## User Story 2 — Add and manage objects
- Add primitives creation utilities in `src/features/objects/domain`.
- Add local asset upload (file input) and import into scene.
- Create object list UI in `src/features/objects/ui`.
- Implement selection state (single select).
- Add delete action and empty-scene handling.
- Tests: create/delete object state (AAA, parameterized).

## User Story 3 — Transform objects
- Add transform controls (Three.js `TransformControls`).
- Create transform panel with numeric inputs.
- Sync gizmos with selected object transform.
- Tests: transform application logic (AAA).

## User Story 4 — Apply materials
- Add simple material model (color, roughness, metalness).
- Implement material panel for selected object.
- Apply material updates to selected object.
- Tests: material update logic (AAA).

## User Story 5 — Export scene
- Create export service in `src/features/export/domain`.
- Implement exporter adapters for GLTF/GLB, OBJ, STL, PLY, Collada.
- Add format selector + export button UI.
- Validate empty scene export behavior.
- Tests: export pipeline for minimal scene (AAA, parameterized).

## User Story 6 — Polish
- Add responsive layout and small UX hints.
- Validate performance for small scenes; avoid O(n²) loops.
- Add error boundaries or simple user feedback on export failures.
