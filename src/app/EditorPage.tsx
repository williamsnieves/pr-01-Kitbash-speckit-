"use client";

import { EditorProvider } from "../shared/state/editorStore";
import { SceneCanvas } from "../shared/renderer/SceneCanvas";
import { ObjectPanel } from "../features/objects/ui/ObjectPanel";
import { TransformPanel } from "../features/transforms/ui/TransformPanel";
import { MaterialPanel } from "../features/materials/ui/MaterialPanel";
import { ExportPanel } from "../features/export/ui/ExportPanel";
import { TransformGizmo } from "../features/transforms/ui/TransformGizmo";

export function EditorPage() {
  return (
    <EditorProvider>
      <div className="editor-layout">
        <aside className="sidebar">
          <ObjectPanel />
          <TransformPanel />
          <MaterialPanel />
          <ExportPanel />
        </aside>
        <main className="viewport">
          <SceneCanvas />
          <TransformGizmo />
        </main>
      </div>
    </EditorProvider>
  );
}
