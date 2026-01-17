# Plan — Editor Interaction Improvements

## Status
Draft.

## Implementation Phases
1. Viewport navigation
   - Add OrbitControls for zoom/orbit/pan.
   - Disable orbit while dragging transform gizmos.
2. Selection
   - Add raycaster selection on click.
   - Clear selection on empty clicks.
3. Import normalization
   - Center imported models at origin.
   - Scale to a target size.
4. Auto-rotation
   - Toggle for auto-rotate on selected object.
   - Rotate on render tick with time delta.

## Testing Strategy
- High-value tests only.
- Validate selection logic (raycast hits map to object).
- Validate import normalization (center + scale).
