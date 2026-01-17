"use client";

import { useMemo, useState } from "react";

import { createPrimitiveMesh } from "../domain/primitives";
import { loadGltfAsset } from "../domain/loaders";
import { buildDefaultMaterial, buildTransformFromObject, useEditorStore } from "../../../shared/state/editorStore";

import type { PrimitiveType, SceneObject } from "../../../shared/domain/types";

const PRIMITIVES: { label: string; type: PrimitiveType }[] = [
  { label: "Box", type: "box" },
  { label: "Sphere", type: "sphere" },
  { label: "Cylinder", type: "cylinder" },
];

export function ObjectPanel() {
  const { three, objects, selectedId, addObject, selectObject, removeSelected } = useEditorStore();
  const [isLoadingAsset, setIsLoadingAsset] = useState(false);

  const selectedObject = useMemo(
    () => objects.find((item) => item.id === selectedId) ?? null,
    [objects, selectedId]
  );

  const handleAddPrimitive = (type: PrimitiveType) => {
    if (!three.scene) return;
    const mesh = createPrimitiveMesh(type);
    mesh.name = `${type}-${objects.length + 1}`;
    three.scene.add(mesh);

    const sceneObject: SceneObject = {
      id: crypto.randomUUID(),
      name: mesh.name,
      kind: "primitive",
      primitiveType: type,
      object: mesh,
      transform: buildTransformFromObject(mesh),
      material: buildDefaultMaterial(),
    };
    addObject(sceneObject);
  };

  const handleAssetUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !three.scene) return;
    setIsLoadingAsset(true);
    try {
      const object = await loadGltfAsset(file);
      object.name = file.name;
      three.scene.add(object);

      const sceneObject: SceneObject = {
        id: crypto.randomUUID(),
        name: file.name,
        kind: "asset",
        object,
        transform: buildTransformFromObject(object),
        material: buildDefaultMaterial(),
      };
      addObject(sceneObject);
    } finally {
      setIsLoadingAsset(false);
      event.target.value = "";
    }
  };

  return (
    <section className="panel">
      <h2>Objects</h2>
      <div className="panel-actions">
        {PRIMITIVES.map((primitive) => (
          <button
            key={primitive.type}
            className="btn"
            onClick={() => handleAddPrimitive(primitive.type)}
            disabled={!three.scene}
          >
            Add {primitive.label}
          </button>
        ))}
        <label className="file-input">
          <span>{isLoadingAsset ? "Importing..." : "Import GLTF/GLB"}</span>
          <input type="file" accept=".gltf,.glb" onChange={handleAssetUpload} disabled={!three.scene || isLoadingAsset} />
        </label>
        <button className="btn ghost" onClick={removeSelected} disabled={!selectedId}>
          Delete selected
        </button>
      </div>

      <div className="panel-list">
        {objects.length === 0 ? (
          <p className="panel-empty">No objects yet.</p>
        ) : (
          objects.map((item) => (
            <button
              key={item.id}
              className={`list-item ${item.id === selectedId ? "active" : ""}`}
              onClick={() => selectObject(item.id)}
            >
              <span>{item.name}</span>
              <span className="tag">{item.kind}</span>
            </button>
          ))
        )}
      </div>

      {selectedObject && (
        <div className="panel-meta">
          <div>
            <strong>Selected:</strong> {selectedObject.name}
          </div>
        </div>
      )}
    </section>
  );
}
