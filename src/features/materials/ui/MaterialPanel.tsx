"use client";

import { applyMaterial, useEditorStore } from "../../../shared/state/editorStore";
import type { MaterialModel } from "../../../shared/domain/types";

export function MaterialPanel() {
  const { selectedId, getSelectedObject, updateSelectedMaterial } =
    useEditorStore();
  const selected = getSelectedObject();

  if (!selected || !selectedId) {
    return (
      <section className="panel">
        <h2>Material</h2>
        <p className="panel-empty">Select an object to edit materials.</p>
      </section>
    );
  }

  const { material } = selected;

  const handleMaterialChange = (partial: Partial<MaterialModel>) => {
    const next = { ...material, ...partial };
    applyMaterial(selected.object, next);
    updateSelectedMaterial(next);
  };

  return (
    <section className="panel">
      <h2>Material</h2>
      <div className="panel-group">
        <label>
          Color
          <input
            type="color"
            value={material.color}
            onChange={(event) =>
              handleMaterialChange({ color: event.target.value })
            }
          />
        </label>
        <label>
          Roughness
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={material.roughness}
            onChange={(event) =>
              handleMaterialChange({ roughness: Number(event.target.value) })
            }
          />
        </label>
        <label>
          Metalness
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={material.metalness}
            onChange={(event) =>
              handleMaterialChange({ metalness: Number(event.target.value) })
            }
          />
        </label>
      </div>
    </section>
  );
}
