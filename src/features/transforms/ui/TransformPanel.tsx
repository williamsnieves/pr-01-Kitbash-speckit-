"use client";

import { buildTransformFromObject, useEditorStore } from "../../../shared/state/editorStore";
import type { Transform } from "../../../shared/domain/types";

type Axis = "x" | "y" | "z";

export function TransformPanel() {
  const { selectedId, getSelectedObject, updateSelectedTransform } = useEditorStore();
  const selected = getSelectedObject();

  if (!selected || !selectedId) {
    return (
      <section className="panel">
        <h2>Transform</h2>
        <p className="panel-empty">Select an object to edit transforms.</p>
      </section>
    );
  }

  const { transform } = selected;

  const handleTransformChange = (
    group: keyof Transform,
    axis: Axis,
    value: number
  ) => {
    const next: Transform = {
      ...transform,
      [group]: { ...transform[group], [axis]: value },
    };
    selected.object[group][axis] = value;
    updateSelectedTransform(buildTransformFromObject(selected.object));
  };

  return (
    <section className="panel">
      <h2>Transform</h2>
      <div className="panel-grid">
        {(["position", "rotation", "scale"] as const).map((group) => (
          <div key={group} className="panel-group">
            <h3>{group}</h3>
            <div className="panel-row">
              {(["x", "y", "z"] as const).map((axis) => (
                <label key={`${group}-${axis}`}>
                  {axis.toUpperCase()}
                  <input
                    type="number"
                    step={group === "rotation" ? 0.1 : 0.05}
                    value={Number(transform[group][axis].toFixed(3))}
                    onChange={(event) =>
                      handleTransformChange(
                        group,
                        axis,
                        Number(event.target.value)
                      )
                    }
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
