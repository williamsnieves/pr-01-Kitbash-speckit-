"use client";

import { useState } from "react";

import { downloadBlob, exportScene, type ExportFormat } from "../domain/exporters";
import { useEditorStore } from "../../../shared/state/editorStore";

const FORMATS: { label: string; value: ExportFormat }[] = [
  { label: "GLTF (.gltf)", value: "gltf" },
  { label: "GLB (.glb)", value: "glb" },
  { label: "OBJ (.obj)", value: "obj" },
  { label: "STL (.stl)", value: "stl" },
  { label: "PLY (.ply)", value: "ply" },
  { label: "Collada (.dae)", value: "dae" },
];

export function ExportPanel() {
  const { three } = useEditorStore();
  const [format, setFormat] = useState<ExportFormat>("gltf");
  const [status, setStatus] = useState<string | null>(null);

  const handleExport = async () => {
    if (!three.scene) return;
    setStatus("Exporting...");
    try {
      const result = await exportScene(three.scene, format);
      downloadBlob(result);
      setStatus("Exported successfully.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Export failed unexpectedly."
      );
    } finally {
      setTimeout(() => setStatus(null), 2500);
    }
  };

  return (
    <section className="panel">
      <h2>Export</h2>
      <label className="panel-row">
        Format
        <select
          value={format}
          onChange={(event) => setFormat(event.target.value as ExportFormat)}
        >
          {FORMATS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <button className="btn primary" onClick={handleExport} disabled={!three.scene}>
        Export scene
      </button>
      {status && <p className="panel-status">{status}</p>}
    </section>
  );
}
