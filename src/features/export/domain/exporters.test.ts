import { describe, expect, it } from "vitest";
import { BoxGeometry, Mesh, MeshStandardMaterial, Object3D, Scene } from "three";

import { buildExportScene, exportScene } from "./exporters";

describe("buildExportScene", () => {
  it("removes non-exportable nodes", () => {
    const scene = new Scene();
    const helper = new Object3D();
    helper.userData.exportable = false;
    scene.add(helper);

    const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial());
    mesh.userData.exportable = true;
    scene.add(mesh);

    const exportScene = buildExportScene(scene);

    expect(exportScene.children.some((child) => child.userData.exportable === false)).toBe(false);
    expect(exportScene.children.some((child) => child.type === "Mesh")).toBe(true);
  });
});

describe("exportScene", () => {
  it("throws when scene has no exportable objects", async () => {
    const scene = new Scene();
    const helper = new Object3D();
    helper.userData.exportable = false;
    scene.add(helper);

    await expect(exportScene(scene, "gltf")).rejects.toThrow(
      "Scene has no exportable objects."
    );
  });
});
