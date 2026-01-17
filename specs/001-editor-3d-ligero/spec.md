# Spec 001 — Editor 3D Ligero (Kitbash + Export)

## 1. Summary
A lightweight 3D scene editor that lets users combine basic primitives and simple assets, apply basic transforms and materials, and export the scene to standard formats (GLTF/GLB, OBJ, STL, PLY, Collada).

## 2. Goals
- Enable users to create a basic 3D scene from scratch.
- Provide object creation, deletion, and organization.
- Support move/rotate/scale transforms.
- Allow assigning simple materials.
- Export the entire scene to standard file formats.

## 3. Non-Goals
- Physics simulation.
- Complex animation systems.
- Advanced rendering features.

## 4. Users
- Indie developers
- Technical designers
- 3D graphics students

## 5. Key Use Cases
1. Create a new scene.
2. Add and transform objects.
3. Apply simple materials.
4. Export the scene.

## 6. Functional Requirements
- Create/delete/organize objects in a scene.
- Manipulate 3D transforms (move/rotate/scale).
- Assign basic materials.
- Import optional assets via local file upload.
- Export the full scene.

## 7. Non-Functional Requirements
- Responsive UI.
- Consistent export output.
- Acceptable performance on small scenes.

## 8. Inputs/Outputs
### Inputs
- User actions.
- Optional basic assets.

### Outputs
- Exported scene file in standard formats (GLTF/GLB, OBJ, STL, PLY, Collada).

## 9. Edge Cases
- Empty scene.
- Export without objects.
- Extreme transforms.

## 10. Assumptions
- Single-user usage.
- No real-time collaboration.
- Assets are provided via local file upload.

## 11. Risks
- UI complexity.
- File format handling.
- Large format coverage for exports.

## 12. Tech Constraints
- Platform: Web.
- Stack: Three.js + TypeScript + Next.js.
- Architecture: screaming architecture + vertical slices.
- Testing: high-value tests only, AAA pattern, parameterized when useful.
- Quality: SOLID, DRY, KISS, POLA; Big-O awareness; apply design patterns only when needed.

## 13. Open Questions
- None.
