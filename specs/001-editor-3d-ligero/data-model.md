# Data Model — Editor 3D Ligero

## Entities
### Scene
- id
- name
- objects[]

### SceneObject
- id
- name
- type (primitive | asset)
- transform
- material
- metadata

### Transform
- position { x, y, z }
- rotation { x, y, z }
- scale { x, y, z }

### Material
- type (basic | standard)
- color
- roughness
- metalness
