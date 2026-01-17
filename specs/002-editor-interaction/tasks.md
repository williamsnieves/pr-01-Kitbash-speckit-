# Tasks — Editor Interaction Improvements

## User Story 1 — Navigate the viewport
- Add OrbitControls to the scene canvas.
- Disable OrbitControls while TransformControls are dragging.
- Verify zoom/orbit/pan behavior.

## User Story 2 — Select objects in scene
- Add raycast selection on pointer click.
- Map picked mesh to SceneObject by id.
- Clear selection on empty click.

## User Story 3 — Normalize imported models
- Center imported models at origin using bounding box.
- Scale imported models to target size (e.g. 2 units).
- Preserve transforms on selection/transform.

## User Story 4 — Auto-rotate preview
- Add toggle UI for auto-rotate.
- Rotate selected object on render tick.
- No rotation when no selection.
