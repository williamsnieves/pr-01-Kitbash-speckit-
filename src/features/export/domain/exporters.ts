import type { Object3D, Scene } from "three";
import {
  ColladaExporter,
  GLTFExporter,
  OBJExporter,
  PLYExporter,
  STLExporter,
} from "three-stdlib";

export type ExportFormat = "gltf" | "glb" | "obj" | "stl" | "ply" | "dae";

export type ExportResult = {
  filename: string;
  blob: Blob;
};

export function buildExportScene(scene: Scene): Scene {
  const clone = scene.clone(true);
  const toRemove: Object3D[] = [];

  clone.traverse((object) => {
    if (object.userData.exportable === false) {
      toRemove.push(object);
    }
  });

  toRemove.forEach((object) => {
    object.parent?.remove(object);
  });

  return clone;
}

function hasExportableObjects(scene: Scene) {
  return scene.children.some((child) => child.userData.exportable !== false);
}

export async function exportScene(
  scene: Scene,
  format: ExportFormat
): Promise<ExportResult> {
  if (!hasExportableObjects(scene)) {
    throw new Error("Scene has no exportable objects.");
  }

  const exportScene = buildExportScene(scene);

  switch (format) {
    case "gltf":
    case "glb": {
      const exporter = new GLTFExporter();
      const result = await new Promise<ArrayBuffer | object>((resolve) => {
        exporter.parse(
          exportScene,
          (data) => resolve(data),
          (error) => {
            throw error;
          },
          { binary: format === "glb" }
        );
      });

      const blob =
        result instanceof ArrayBuffer
          ? new Blob([result], { type: "model/gltf-binary" })
          : new Blob([JSON.stringify(result, null, 2)], {
              type: "model/gltf+json",
            });
      return {
        filename: `scene.${format === "glb" ? "glb" : "gltf"}`,
        blob,
      };
    }
    case "obj": {
      const exporter = new OBJExporter();
      const result = exporter.parse(exportScene);
      return { filename: "scene.obj", blob: new Blob([result]) };
    }
    case "stl": {
      const exporter = new STLExporter();
      const result = exporter.parse(exportScene);
      return { filename: "scene.stl", blob: new Blob([result]) };
    }
    case "ply": {
      const exporter = new PLYExporter();
      const result = exporter.parse(exportScene);
      return { filename: "scene.ply", blob: new Blob([result]) };
    }
    case "dae": {
      const exporter = new ColladaExporter();
      const result = exporter.parse(exportScene);
      return { filename: "scene.dae", blob: new Blob([result.data]) };
    }
    default:
      throw new Error("Unsupported format.");
  }
}

export function downloadBlob(result: ExportResult) {
  const url = URL.createObjectURL(result.blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = result.filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
