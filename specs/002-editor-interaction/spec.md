# Spec 002 — Editor Interaction Improvements

## 1. Summary
Improve editor interaction by enabling viewport navigation (zoom/orbit), direct object selection, transform control usability, and optional auto-rotation for previewing models. Ensure imported models are centered and scaled appropriately.

## 2. Goals
- Allow zoom/orbit/pan for better scene navigation.
- Select objects by clicking in the 3D viewport.
- Move/rotate/scale selected objects using gizmos reliably.
- Provide a toggle to auto-rotate the selected model for preview.
- Imported models appear centered and reasonably scaled.

## 3. Non-Goals
- Multi-selection.
- Advanced animation systems.
- Physics or constraints.

## 4. Users
- Indie developers
- Technical designers
- 3D graphics students

## 5. Key Use Cases
1. Click an object in the scene to select it.
2. Zoom in/out and orbit around the scene.
3. Manipulate the selected object with transform controls.
4. Enable auto-rotate for quick visual inspection.
5. Import a model that appears centered and scaled.

## 6. Functional Requirements
- Orbit/zoom/pan controls are available in the viewport.
- Clicking an object selects it and updates the side panels.
- Transform gizmos attach to the selected object and support move/rotate/scale.
- Auto-rotate toggle rotates the selected object smoothly.
- Imported models are centered at origin and scaled to a target size.

## 7. Non-Functional Requirements
- Smooth interaction at small scene sizes.
- No noticeable input lag when selecting or orbiting.

## 8. Edge Cases
- Clicking empty space clears selection.
- Auto-rotate with no selection does nothing.
- Large imported models are scaled down to fit.

## 9. Tech Constraints
- Platform: Web
- Stack: Three.js + TypeScript + Next.js
- Architecture: screaming architecture + vertical slices
- Quality: SOLID, DRY, KISS, POLA; Big-O awareness

## 10. Open Questions
- None.
